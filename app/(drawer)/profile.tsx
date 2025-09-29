// Localização: neuroflow/app/(drawer)/profile.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '../../firebaseconfig';
import { signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import type { UserProfile } from '../../types';
import AppHeader from '../../components/AppHeader';
import { darkTheme } from '../../constants/Colors';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubscribeProfile = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setProfile(doc.data() as UserProfile);
          } else {
            console.log("Documento de perfil não encontrado!");
          }
        });
        return () => unsubscribeProfile();
      } else {
        setUser(null);
        setProfile(null);
        router.replace('/(auth)/login');
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const handleLogout = async () => {
    Alert.alert( "Sair", "Você tem certeza que deseja sair?",
      [{ text: "Cancelar", style: "cancel" },
       { text: "Sair", style: "destructive", onPress: async () => {
          try {
            await signOut(auth);
            router.replace('/(auth)/login');
          } catch (error) {
            Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
          }
        }}
      ]
    );
  };

  if (!user || !profile) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={darkTheme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Meu Perfil" />
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.displayName ? profile.displayName[0].toUpperCase() : user.email![0].toUpperCase()}
            </Text>
          </View>
          <Text style={styles.nameText}>{profile.displayName}</Text>
          <Text style={styles.emailText}>{user.email}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkTheme.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkTheme.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: darkTheme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: darkTheme.card,
  },
  avatarText: {
    color: darkTheme.text,
    fontSize: 50,
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkTheme.text,
  },
  emailText: {
    fontSize: 16,
    color: darkTheme.textSecondary,
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: darkTheme.danger,
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 30,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
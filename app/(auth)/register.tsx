import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseconfig';
import { NeuroFlowLogo } from '../../components/Icons';
import { darkTheme } from '../../constants/Colors';

export default function RegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }
        setLoading(true); 
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, "users", user.uid), {
              displayName: name,
              email: user.email,
            });
            Alert.alert('Sucesso!', 'Sua conta foi criada. Por favor, faça o login.',
                [{ text: 'OK', onPress: () => router.push('/(auth)/login') }]
            );
        } catch (error: any) {
            let errorMessage = 'Ocorreu um erro ao registrar.';
            if (error.code === 'auth/email-already-in-use') errorMessage = 'Este e-mail já está em uso.';
            if (error.code === 'auth/weak-password') errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
            Alert.alert('Erro', errorMessage);
        } finally {
            setLoading(false); 
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.content}>
                <View style={styles.header}>
                    <NeuroFlowLogo width={80} height={80} />
                    <Text style={styles.title}>Crie sua Conta</Text>
                </View>
                
                <TextInput
                    style={styles.input}
                    placeholder="Seu nome"
                    placeholderTextColor={darkTheme.textSecondary}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor={darkTheme.textSecondary}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Crie uma senha"
                    placeholderTextColor={darkTheme.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirme sua senha"
                    placeholderTextColor={darkTheme.textSecondary}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />

                <TouchableOpacity 
                    style={[styles.button, loading ? styles.buttonDisabled : null]} 
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color={darkTheme.text} /> : <Text style={styles.buttonText}>Cadastrar</Text>}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.back()} disabled={loading}>
                    <Text style={styles.linkText}>Já tem uma conta? Faça Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkTheme.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: darkTheme.text,
        marginTop: 10,
    },
    input: {
        backgroundColor: darkTheme.card,
        color: darkTheme.text,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: darkTheme.card,
    },
    button: {
        backgroundColor: darkTheme.primary,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDisabled: {
        backgroundColor: '#3A5F8E',
    },
    buttonText: {
        color: darkTheme.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    linkText: {
        color: darkTheme.primary,
        marginTop: 20,
        fontSize: 16,
        textAlign: 'center',
    },
});
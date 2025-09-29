import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { HomeIcon, CalendarIcon, ProfileIcon, NeuroFlowLogo } from '../../components/Icons';
import { darkTheme } from '../../constants/Colors';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: darkTheme.background}}>
      <View style={styles.drawerHeader}>
        <NeuroFlowLogo width={40} height={40} />
        <Text style={styles.drawerHeaderText}>NEUROFLOW</Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}


export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />} 
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '75%',
        },
        drawerLabelStyle: {
          color: darkTheme.text,
          fontSize: 16,
        },
        drawerActiveTintColor: darkTheme.primary,
        drawerInactiveTintColor: darkTheme.textSecondary,
        drawerActiveBackgroundColor: darkTheme.card, 
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Minhas Tarefas',
          title: 'Minhas Tarefas',
          drawerIcon: ({ color, size }: { color: string, size: number }) => (
            <HomeIcon color={color} width={size} height={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="calendar"
        options={{
          drawerLabel: 'Calendário',
          title: 'Calendário',
          drawerIcon: ({ color, size }: { color: string, size: number }) => (
            <CalendarIcon color={color} width={size} height={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Meu Perfil',
          title: 'Meu Perfil',
          drawerIcon: ({ color, size }: { color: string, size: number }) => (
            <ProfileIcon color={color} width={size} height={size} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: darkTheme.card,
  },
  drawerHeaderText: {
    color: darkTheme.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
  }
});
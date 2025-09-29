// Localização: neuroflow/app/(drawer)/calendar.tsx

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { auth, db } from '../../firebaseconfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import type { Task } from '../../types';
import AppHeader from '../../components/AppHeader';
import { darkTheme } from '../../constants/Colors';

LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';

export default function CalendarScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace('/(auth)/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    const tasksCollectionRef = collection(db, 'users', user.uid, 'tasks');
    const unsubscribeTasks = onSnapshot(tasksCollectionRef, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[];
      setTasks(tasksData);
      setLoading(false);
    });
    return () => unsubscribeTasks();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={darkTheme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Calendário" />
      <View style={styles.calendarWrapper}>
        <Calendar
          theme={{
            backgroundColor: darkTheme.background,
            calendarBackground: darkTheme.card,
            textSectionTitleColor: darkTheme.textSecondary,
            selectedDayBackgroundColor: darkTheme.primary,
            selectedDayTextColor: darkTheme.text,
            todayTextColor: darkTheme.primary,
            dayTextColor: darkTheme.text,
            textDisabledColor: '#55557E',
            arrowColor: darkTheme.primary,
            monthTextColor: darkTheme.text,
            textMonthFontWeight: 'bold',
            indicatorColor: darkTheme.primary,
          }}
          style={styles.calendar}
        />
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
  calendarWrapper: {
    padding: 15,
  },
  calendar: {
    borderRadius: 10,
  },
});
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AppHeader from '@/components/AppHeader';
import TaskItem from '@/components/TaskItem';
import TaskModal from '@/components/TaskModal';
import { PlusIcon } from '@/components/Icons';
import type { Task } from '../../types';
import { auth, db } from '../../firebaseconfig';
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { darkTheme } from '../../constants/Colors';

export default function HomeScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
        router.replace('/(auth)/login');
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    setLoading(true);
    const tasksCollectionRef = collection(db, 'users', currentUser.uid, 'tasks');
    const unsubscribeTasks = onSnapshot(tasksCollectionRef, (querySnapshot) => {
      const tasksData: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(tasksData);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar tarefas: ", error);
      setLoading(false);
    });
    return () => unsubscribeTasks();
  }, [currentUser]);

  const handleSaveTask = async (taskData: Omit<Task, 'id'> | Task) => {
    if (!currentUser) return;

    try {
      if ('id' in taskData && taskData.id) {
        const taskDocRef = doc(db, 'users', currentUser.uid, 'tasks', taskData.id);
        const { id, ...dataToUpdate } = taskData;
        await updateDoc(taskDocRef, dataToUpdate);
      } else {
        const tasksCollectionRef = collection(db, 'users', currentUser.uid, 'tasks');
        await addDoc(tasksCollectionRef, taskData);
      }
      setModalVisible(false);
      setSelectedTask(null);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!currentUser) return;
    Alert.alert(
        "Deletar Tarefa",
        "Você tem certeza que quer deletar esta tarefa?",
        [
            { text: "Cancelar", style: "cancel" },
            { text: "Deletar", style: "destructive", onPress: async () => {
                try {
                    await deleteDoc(doc(db, 'users', currentUser.uid, 'tasks', taskId));
                } catch (error) {
                    console.error('Erro ao deletar tarefa:', error);
                    Alert.alert('Erro', 'Não foi possível deletar a tarefa.');
                }
            }}
        ]
    );
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const openAddModal = () => {
    setSelectedTask(null);
    setModalVisible(true);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={darkTheme.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}> 
      <AppHeader title="Minhas Tarefas" />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onEdit={() => openEditModal(item)}
            onDelete={() => handleDeleteTask(item.id!)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma tarefa ainda.</Text>
            <Text style={styles.emptySubText}>Clique no '+' para adicionar sua primeira tarefa!</Text>
          </View>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={openAddModal}>
        <PlusIcon width={28} height={28} color={darkTheme.text} />
      </TouchableOpacity>

      <TaskModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedTask(null);
        }}
        onSubmit={handleSaveTask}
        task={selectedTask}
      />
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
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: darkTheme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: darkTheme.textSecondary,
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: darkTheme.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
});
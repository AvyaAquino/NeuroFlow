import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EditIcon, TrashIcon } from './Icons';
import type { Task } from '../types'; 

interface TaskItemProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}

const priorityColors = {
  Baixa: '#22C55E',
  Média: '#F59E0B',
  Alta: '#EF4444',
};

export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.priorityIndicator, { backgroundColor: priorityColors[task.priority] }]} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <Text style={styles.category}>{task.category}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
          <EditIcon color="#6B7280" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
          <TrashIcon color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    priorityIndicator: {
        width: 6,
        height: '100%',
        borderRadius: 3,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#111827',
    },
    description: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    category: {
        fontSize: 12,
        color: '#6B7280',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginTop: 8,
        alignSelf: 'flex-start',
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 15,
        padding: 5,
    },
});
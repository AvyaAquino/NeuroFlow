import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import type { Task, Priority } from '../types';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, 'id'> | Task) => void;
  task: Task | null;
}

export default function TaskModal({ visible, onClose, onSubmit, task }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<Priority>('Baixa');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCategory(task.category);
      setPriority(task.priority);
    } else {
      // Limpa os campos quando não há tarefa selecionada (modo de criação)
      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('Baixa');
    }
  }, [task]);

  const handleSubmit = () => {
    if (!title) {
      Alert.alert('Erro', 'O título é obrigatório.');
      return;
    }

    const taskData = { title, description, category, priority };
    if (task && task.id) {
      // Se estamos editando, passamos o objeto Task completo com o ID
      onSubmit({ ...taskData, id: task.id });
    } else {
      // Se estamos criando, passamos o objeto sem o ID
      onSubmit(taskData);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição (opcional)"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Categoria (opcional)"
            value={category}
            onChangeText={setCategory}
          />

          <Text style={styles.label}>Prioridade</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={priority}
              onValueChange={(itemValue) => setPriority(itemValue as Priority)}
              style={styles.picker}
            >
              <Picker.Item label="Baixa" value="Baixa" />
              <Picker.Item label="Média" value="Média" />
              <Picker.Item label="Alta" value="Alta" />
            </Picker>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{task ? 'Salvar' : 'Adicionar'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#F3F4F6',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    label: {
        fontSize: 16,
        color: '#374151',
        marginBottom: 10,
    },
    pickerContainer: {
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        marginBottom: 20,
    },
    picker: {
        // Estilos podem ser necessários para Android/iOS
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#D1D5DB',
        marginRight: 10,
    },
    submitButton: {
        backgroundColor: '#3B82F6',
        marginLeft: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { tasksViewModel } from '../../di/container';
import { Task } from '../../model/entities/Task';

export default function TaskDetails() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { id } = route.params;
  const [task, setTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const t = await tasksViewModel.findById(id);
      setTask(t);
    })();
  }, [id]);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Tarefa não encontrada.</Text>
      </View>
    );
  }

  const confirmDelete = () => {
    Alert.alert('Excluir', 'Você realmente deseja excluir esta tarefa?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await tasksViewModel.delete(id);
          navigation.navigate('List');
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.description}>{task.description || '— No description —'}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Excluir tarefa" color="#d32f2f" onPress={confirmDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  description: { fontSize: 15, color: '#444' },
});

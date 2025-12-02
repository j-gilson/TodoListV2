import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';
import { tasksViewModel } from '../../di/container';
import { useNavigation } from '@react-navigation/native';

export default function TaskList() {
  const navigation = useNavigation<any>();
  const [tasks, setTasks] = useState(tasksViewModel.tasks);

  useEffect(() => {
    (async () => {
      await tasksViewModel.load();
      setTasks([...tasksViewModel.tasks]);
    })();
  }, []);

  // Updates when returning to this screen
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await tasksViewModel.load();
      setTasks([...tasksViewModel.tasks]);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas tarefas</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Create')}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>+adicionar</Text>
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.empty}>
          <Text>Nenhuma tarefa criada.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={i => i.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onPress={() => navigation.navigate('Details', { id: item.id })}
            />
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f6f6f6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700' },
  button: { backgroundColor: '#2196F3', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  empty: { alignItems: 'center', marginTop: 40 }
});

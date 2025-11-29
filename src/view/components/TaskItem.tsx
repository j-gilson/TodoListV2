import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Task } from '../../model/entities/Task';

interface Props {
  task: Task;
  onPress: () => void;
}

export default function TaskItem({ task, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View>
        <Text style={styles.title}>{task.title}</Text>
        {task.description ? (
          <Text numberOfLines={1} style={styles.description}>
            {task.description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff' },
  title: { fontWeight: '700', fontSize: 16 },
  description: { color: '#666', marginTop: 4 }
});

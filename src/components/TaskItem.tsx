import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface Task {
  id: string;
  name: string;
  description: string;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.taskName}>{task.name}</Text>
      <Text style={styles.taskDescription}>{task.description}</Text>
      <View style={styles.deleteButton}>
        <Button title="Delete" onPress={() => onDelete(task.id)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  taskName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  taskDescription: {
    color: '#555',
    marginTop: 4,
  },
  deleteButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
});

export default TaskItem;

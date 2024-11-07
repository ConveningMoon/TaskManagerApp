import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../features/tasks/tasksSlice';
import { RootState } from '../store/store';
import TaskItem from '../components/TaskItem';

const MainScreen = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const descriptionInputRef = useRef<TextInput>(null);

  // Move focus to description field
  const handleNameSubmitEditing = () => {
    descriptionInputRef.current?.focus();
  };

  // Add a new task
  const handleAddTask = () => {
    if (name.trim() && description.trim()) {
      dispatch(addTask({ name, description }));
      setName('');
      setDescription('');
      Keyboard.dismiss();
    }
  };

  // Delete a task
  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <View style={styles.container}>
      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Task Name"
        value={name}
        onChangeText={setName}
        returnKeyType="next"
        onSubmitEditing={handleNameSubmitEditing}
        blurOnSubmit={false}
      />
      <TextInput
        ref={descriptionInputRef}
        style={styles.input}
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Task" onPress={handleAddTask} />

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.taskList}
        renderItem={({ item }) => (
          <TaskItem task={item} onDelete={handleDeleteTask} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    borderRadius: 4,
  },
  taskList: {
    marginTop: 16,
  },
});

export default MainScreen;

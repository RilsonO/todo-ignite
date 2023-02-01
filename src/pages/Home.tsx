import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find((item) => item.title === newTaskTitle)) {
      Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome.'
      );
      return;
    }

    setTasks((prev) => [
      ...prev,
      {
        id: Number(new Date().getTime()),
        title: newTaskTitle,
        done: false,
      },
    ]);
  }

  function handleEditTask(taskId: number, newTaskTitle: string) {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === taskId) {
          return {
            id: item.id,
            title: newTaskTitle,
            done: item.done,
          };
        }
        return item;
      })
    );
  }

  function handleToggleTaskDone(id: number) {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            id: item.id,
            title: item.title,
            done: !item.done,
          };
        }
        return item;
      })
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Confirmação',
      'Deseja realmente excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            setTasks((prev) => prev.filter((item) => item.id !== id));
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});

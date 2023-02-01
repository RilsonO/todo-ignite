import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks((prev) => [
      ...prev,
      {
        id: Number(new Date().getTime()),
        title: newTaskTitle,
        done: false,
      },
    ]);
    //TODO - add new task
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
    setTasks((prev) => prev.filter((item) => item.id !== id));
    //TODO - remove task from state
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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

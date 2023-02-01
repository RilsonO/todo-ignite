import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ItemWrapper } from './ItemWrapper';

import { TaskItem, Task } from './TaskItem';

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, newTaskTitle: string) => void;
}

export function TasksList({ tasks, ...rest }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem task={item} {...rest} />
          </ItemWrapper>
        );
      }}
      style={styles.flatlist}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  flatlist: {
    marginTop: 32,
  },
});

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onPress?: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onPress,
}) => {
  const containerContent = (
    <>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={onToggle}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View
          style={[
            styles.checkbox,
            task.status === "DONE" && styles.checkboxChecked,
          ]}
        >
          {task.status === "DONE" && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            task.status === "DONE" && styles.titleDone,
          ]}
        >
          {task.title}
        </Text>
        {task.description && (
          <Text style={styles.description}>{task.description}</Text>
        )}
        {task.dueDate && (
          <Text style={styles.dueDate}>תאריך יעד: {task.dueDate}</Text>
        )}
      </View>
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        {containerContent}
      </TouchableOpacity>
    );
  }

  return <View style={styles.container}>{containerContent}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2196F3",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#2196F3",
  },
  checkmark: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  titleDone: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 12,
    color: "#999",
  },
});


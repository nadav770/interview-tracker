import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ImageBackground,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { TaskItem } from "../components/TaskItem";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BACKGROUND_IMAGE_URL } from "../config/backgroundImage";
import { Task } from "../types/task";

export const TasksScreen: React.FC = () => {
  const { tasks, setTasks } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "OPEN",
  });

  const handleAddTask = () => {
    if (!newTask.title) {
      Alert.alert("שגיאה", "נא למלא את כותרת המשימה");
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      dueDate: newTask.dueDate,
      status: "OPEN",
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "", status: "OPEN" });
    setModalVisible(false);
  };

  const handleToggleTask = (taskId: string) => {
    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            status: task.status === "OPEN" ? ("DONE" as const) : ("OPEN" as const),
          }
        : task
    );
    setTasks(updatedTasks);
  };

  const openTasks = tasks.filter((task) => task.status === "OPEN");
  const doneTasks = tasks.filter((task) => task.status === "DONE");

  return (
    <View style={styles.container}>
      <Header title="משימות" />
      <ImageBackground
        source={BACKGROUND_IMAGE_URL}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ הוסף משימה</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={[...openTasks, ...doneTasks]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={() => handleToggleTask(item.id)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>אין משימות עדיין</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </ImageBackground>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>הוסף משימה חדשה</Text>

            <TextInput
              style={styles.input}
              placeholder="כותרת המשימה"
              value={newTask.title}
              onChangeText={(text) => setNewTask({ ...newTask, title: text })}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="תיאור (אופציונלי)"
              value={newTask.description}
              onChangeText={(text) =>
                setNewTask({ ...newTask, description: text })
              }
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            <TextInput
              style={styles.input}
              placeholder="תאריך יעד (YYYY-MM-DD) (אופציונלי)"
              value={newTask.dueDate}
              onChangeText={(text) =>
                setNewTask({ ...newTask, dueDate: text })
              }
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>ביטול</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddTask}
              >
                <Text style={styles.modalButtonText}>שמור</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  backgroundImageStyle: {
    opacity: 0.5,
    resizeMode: "cover",
  },
  addButtonContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: "flex-end",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: 16,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    textAlign: "right",
    backgroundColor: "#fff",
  },
  textArea: {
    height: 80,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  saveButton: {
    backgroundColor: "#2196F3",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});


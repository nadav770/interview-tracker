import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { Task } from "../types/task";

const TASKS_STORAGE_KEY = "@interview_tracker:tasks";

// Helper to get storage - use localStorage on web, AsyncStorage on native
const getStorage = () => {
  if (Platform.OS === "web") {
    return {
      getItem: (key: string): Promise<string | null> => {
        try {
          return Promise.resolve(localStorage.getItem(key));
        } catch (error) {
          console.error("Error reading from localStorage:", error);
          return Promise.resolve(null);
        }
      },
      setItem: (key: string, value: string): Promise<void> => {
        try {
          localStorage.setItem(key, value);
          return Promise.resolve();
        } catch (error) {
          console.error("Error writing to localStorage:", error);
          return Promise.resolve();
        }
      },
    };
  }
  return AsyncStorage;
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const storage = getStorage();
    const data = await storage.getItem(TASKS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    const storage = getStorage();
    await storage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};


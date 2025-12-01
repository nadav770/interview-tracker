import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { PracticeItem } from "../types/practice";

const PRACTICE_STORAGE_KEY = "@interview_tracker:practice";

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

export const loadPracticeItems = async (): Promise<PracticeItem[]> => {
  try {
    const storage = getStorage();
    const data = await storage.getItem(PRACTICE_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading practice items:", error);
    return [];
  }
};

export const savePracticeItems = async (
  items: PracticeItem[]
): Promise<void> => {
  try {
    const storage = getStorage();
    await storage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving practice items:", error);
  }
};


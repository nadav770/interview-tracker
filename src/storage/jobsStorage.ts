import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { Job } from "../types/job";

const JOBS_STORAGE_KEY = "@interview_tracker:jobs";

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

export const loadJobs = async (): Promise<Job[]> => {
  try {
    const storage = getStorage();
    const data = await storage.getItem(JOBS_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading jobs:", error);
    return [];
  }
};

export const saveJobs = async (jobs: Job[]): Promise<void> => {
  try {
    const storage = getStorage();
    await storage.setItem(JOBS_STORAGE_KEY, JSON.stringify(jobs));
  } catch (error) {
    console.error("Error saving jobs:", error);
  }
};


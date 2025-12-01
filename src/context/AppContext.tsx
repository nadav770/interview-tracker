import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Job } from "../types/job";
import { Task } from "../types/task";
import { PracticeItem } from "../types/practice";
import { saveJobs } from "../storage/jobsStorage";
import { saveTasks } from "../storage/tasksStorage";
import { savePracticeItems } from "../storage/practiceStorage";

interface AppContextType {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  practiceItems: PracticeItem[];
  setPracticeItems: (items: PracticeItem[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [jobs, setJobsState] = useState<Job[]>([]);
  const [tasks, setTasksState] = useState<Task[]>([]);
  const [practiceItems, setPracticeItemsState] = useState<PracticeItem[]>([]);

  const setJobs = useCallback((newJobs: Job[]) => {
    setJobsState(newJobs);
    saveJobs(newJobs);
  }, []);

  const setTasks = useCallback((newTasks: Task[]) => {
    setTasksState(newTasks);
    saveTasks(newTasks);
  }, []);

  const setPracticeItems = useCallback((newItems: PracticeItem[]) => {
    setPracticeItemsState(newItems);
    savePracticeItems(newItems);
  }, []);

  return (
    <AppContext.Provider
      value={{
        jobs,
        setJobs,
        tasks,
        setTasks,
        practiceItems,
        setPracticeItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};


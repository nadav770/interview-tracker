export type TaskStatus = "OPEN" | "DONE";

export type Task = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
};


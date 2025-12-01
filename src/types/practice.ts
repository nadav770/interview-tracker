export type PracticeTopic =
  | "DATA_STRUCTURES"
  | "ALGORITHMS"
  | "OOP"
  | "SQL"
  | "SYSTEM_DESIGN";

export type PracticeItem = {
  id: string;
  topic: PracticeTopic;
  title: string;
  date: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  notes?: string;
};


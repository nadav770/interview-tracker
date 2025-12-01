export type JobStatus =
  | "APPLIED"
  | "HR_CALL"
  | "TECH_INTERVIEW"
  | "HOME_ASSIGNMENT"
  | "OFFER"
  | "REJECTED";

export type Job = {
  id: string;
  companyName: string;
  roleTitle: string;
  status: JobStatus;
  appliedDate?: string;
  nextInterviewDate?: string;
  notes?: string;
};


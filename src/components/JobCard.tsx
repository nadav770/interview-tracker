import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Job, JobStatus } from "../types/job";

interface JobCardProps {
  job: Job;
  onPress: () => void;
}

const statusLabels: Record<JobStatus, string> = {
  APPLIED: "הוגש",
  HR_CALL: "שיחת HR",
  TECH_INTERVIEW: "ראיון טכני",
  HOME_ASSIGNMENT: "מטלה ביתית",
  OFFER: "הצעה",
  REJECTED: "נדחה",
};

const statusColors: Record<JobStatus, string> = {
  APPLIED: "#4CAF50",
  HR_CALL: "#2196F3",
  TECH_INTERVIEW: "#FF9800",
  HOME_ASSIGNMENT: "#9C27B0",
  OFFER: "#00BCD4",
  REJECTED: "#F44336",
};

export const JobCard: React.FC<JobCardProps> = ({ job, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.companyName}>{job.companyName}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColors[job.status] },
          ]}
        >
          <Text style={styles.statusText}>{statusLabels[job.status]}</Text>
        </View>
      </View>
      <Text style={styles.roleTitle}>{job.roleTitle}</Text>
      {job.appliedDate && (
        <Text style={styles.date}>הוגש: {job.appliedDate}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  roleTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
});


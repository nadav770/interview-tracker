import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PracticeItem, PracticeTopic } from "../types/practice";

interface PracticeItemCardProps {
  item: PracticeItem;
}

const topicLabels: Record<PracticeTopic, string> = {
  DATA_STRUCTURES: "מבני נתונים",
  ALGORITHMS: "אלגוריתמים",
  OOP: "תכנות מונחה עצמים",
  SQL: "SQL",
  SYSTEM_DESIGN: "עיצוב מערכות",
};

const difficultyColors: Record<string, string> = {
  EASY: "#4CAF50",
  MEDIUM: "#FF9800",
  HARD: "#F44336",
};

const difficultyLabels: Record<string, string> = {
  EASY: "קל",
  MEDIUM: "בינוני",
  HARD: "קשה",
};

export const PracticeItemCard: React.FC<PracticeItemCardProps> = ({
  item,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.topic}>{topicLabels[item.topic]}</Text>
        {item.difficulty && (
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: difficultyColors[item.difficulty] },
            ]}
          >
            <Text style={styles.difficultyText}>
              {difficultyLabels[item.difficulty]}
            </Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      {item.notes && <Text style={styles.notes}>{item.notes}</Text>}
    </View>
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
  topic: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2196F3",
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  difficultyText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  notes: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
});


import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerContent}>
        <Text style={styles.footerText}>
          Developed by nadav hakmon - Software Developer
        </Text>
        <View style={styles.footerLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "rgba(26, 35, 126, 0.95)",
    borderTopWidth: 2,
    borderTopColor: "#2196F3",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  footerContent: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  footerLine: {
    marginTop: 8,
    width: 60,
    height: 2,
    backgroundColor: "#2196F3",
    borderRadius: 1,
  },
});


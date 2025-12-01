import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useAppContext } from "../context/AppContext";
import { StatCard } from "../components/StatCard";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BACKGROUND_IMAGE_URL } from "../config/backgroundImage";

export const DashboardScreen: React.FC = () => {
  const { jobs, tasks, practiceItems } = useAppContext();

  // Safety check
  if (!jobs || !tasks || !practiceItems) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>טוען נתונים...</Text>
      </View>
    );
  }

  const stats = useMemo(() => {
    const activeJobs = jobs.filter(
      (job) => job.status !== "REJECTED" && job.status !== "OFFER"
    ).length;
    const openTasks = tasks.filter((task) => task.status === "OPEN").length;
    
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const practiceThisWeek = practiceItems.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= weekAgo;
    }).length;

    return {
      totalJobs: jobs.length,
      activeJobs,
      openTasks,
      practiceThisWeek,
    };
  }, [jobs, tasks, practiceItems]);

  return (
    <View style={styles.container}>
      <Header title="דשבורד" />
      <ImageBackground
        source={BACKGROUND_IMAGE_URL}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.contentWrapper}>
            <Text style={styles.sectionTitle}>סטטיסטיקות</Text>
            <View style={styles.statsContainer}>
              <StatCard 
                title="סה״כ משרות" 
                value={stats.totalJobs} 
                icon="💼"
                color="#1a237e"
              />
              <StatCard 
                title="משרות פעילות" 
                value={stats.activeJobs} 
                icon="📈"
                color="#2196F3"
              />
            </View>

            <View style={styles.statsContainer}>
              <StatCard 
                title="משימות פתוחות" 
                value={stats.openTasks} 
                icon="✅"
                color="#4CAF50"
              />
              <StatCard 
                title="תרגולים השבוע" 
                value={stats.practiceThisWeek} 
                icon="📚"
                color="#FF9800"
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  backgroundImageStyle: {
    opacity: 0.5,
    resizeMode: "cover",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  contentWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: 20,
    textAlign: "right",
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 16,
    marginHorizontal: -4,
  },
});


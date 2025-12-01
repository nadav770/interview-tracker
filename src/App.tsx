import React, { useEffect, ErrorInfo, Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { AppProvider, useAppContext } from "./context/AppContext";
import { RootNavigator } from "./navigation/RootNavigator";
import { loadJobs } from "./storage/jobsStorage";
import { loadTasks } from "./storage/tasksStorage";
import { loadPracticeItems } from "./storage/practiceStorage";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>שגיאה באפליקציה</Text>
          <Text style={styles.errorText}>
            {this.state.error?.message || "שגיאה לא ידועה"}
          </Text>
          <Text style={styles.errorStack}>
            {this.state.error?.stack?.substring(0, 200)}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const AppContent: React.FC = () => {
  const { setJobs, setTasks, setPracticeItems } = useAppContext();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        const [jobs, tasks, practiceItems] = await Promise.all([
          loadJobs().catch((err) => {
            console.error("Error loading jobs:", err);
            return [];
          }),
          loadTasks().catch((err) => {
            console.error("Error loading tasks:", err);
            return [];
          }),
          loadPracticeItems().catch((err) => {
            console.error("Error loading practice:", err);
            return [];
          }),
        ]);

        if (isMounted) {
          setJobs(jobs);
          setTasks(tasks);
          setPracticeItems(practiceItems);
          setError(null);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading data:", err);
          setError(err instanceof Error ? err.message : "Unknown error");
          setLoading(false);
        }
      }
    };

    loadData();
    
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once on mount

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>טוען...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>שגיאה בטעינת הנתונים: {error}</Text>
      </View>
    );
  }

  try {
    return <RootNavigator />;
  } catch (err) {
    console.error("Error rendering RootNavigator:", err);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          שגיאה בטעינת הניווט: {err instanceof Error ? err.message : "Unknown"}
        </Text>
      </View>
    );
  }
};

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <StatusBar style="auto" />
        <AppContent />
      </AppProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  errorTitle: {
    color: "#F44336",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  errorText: {
    color: "#F44336",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  errorStack: {
    color: "#999",
    fontSize: 12,
    textAlign: "center",
    marginTop: 10,
  },
});


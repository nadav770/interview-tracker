import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppContext } from "../context/AppContext";
import { JobCard } from "../components/JobCard";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BACKGROUND_IMAGE_URL } from "../config/backgroundImage";
import { Job, JobStatus } from "../types/job";
import { RootStackParamList } from "../navigation/RootNavigator";

type JobsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Jobs"
>;

export const JobsScreen: React.FC = () => {
  const navigation = useNavigation<JobsScreenNavigationProp>();
  const { jobs, setJobs } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>({
    companyName: "",
    roleTitle: "",
    status: "APPLIED",
  });

  const handleAddJob = () => {
    if (!newJob.companyName || !newJob.roleTitle) {
      Alert.alert("שגיאה", "נא למלא את כל השדות הנדרשים");
      return;
    }

    const job: Job = {
      id: Date.now().toString(),
      companyName: newJob.companyName,
      roleTitle: newJob.roleTitle,
      status: newJob.status || "APPLIED",
      appliedDate: new Date().toISOString().split("T")[0],
    };

    setJobs([...jobs, job]);
    setNewJob({ companyName: "", roleTitle: "", status: "APPLIED" });
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header title="משרות" />
      <ImageBackground
        source={BACKGROUND_IMAGE_URL}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ הוסף משרה</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <JobCard
              job={item}
              onPress={() =>
                navigation.navigate("JobDetails", { jobId: item.id })
              }
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>אין משרות עדיין</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      </ImageBackground>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>הוסף משרה חדשה</Text>

            <TextInput
              style={styles.input}
              placeholder="שם החברה"
              value={newJob.companyName}
              onChangeText={(text) =>
                setNewJob({ ...newJob, companyName: text })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="תפקיד"
              value={newJob.roleTitle}
              onChangeText={(text) =>
                setNewJob({ ...newJob, roleTitle: text })
              }
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>ביטול</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleAddJob}
              >
                <Text style={styles.modalButtonText}>שמור</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  addButtonContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  addButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: "flex-end",
    shadowColor: "#2196F3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: 16,
    borderRadius: 16,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    textAlign: "right",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  saveButton: {
    backgroundColor: "#2196F3",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});


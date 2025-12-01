import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { WebPicker } from "../components/WebPicker";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppContext } from "../context/AppContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BACKGROUND_IMAGE_URL } from "../config/backgroundImage";
import { Job, JobStatus } from "../types/job";
import { RootStackParamList } from "../navigation/RootNavigator";

type JobDetailsScreenRouteProp = RouteProp<RootStackParamList, "JobDetails">;
type JobDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "JobDetails"
>;

export const JobDetailsScreen: React.FC = () => {
  const navigation = useNavigation<JobDetailsScreenNavigationProp>();
  const route = useRoute<JobDetailsScreenRouteProp>();
  const { jobId } = route.params || {};
  const { jobs, setJobs } = useAppContext();

  const job = jobs.find((j) => j.id === jobId);
  const [formData, setFormData] = useState<Job | null>(null);

  useEffect(() => {
    if (job) {
      setFormData({ ...job });
    }
  }, [job]);

  if (!jobId) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>מזהה משרה לא נמצא</Text>
      </View>
    );
  }

  if (!job || !formData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>משרה לא נמצאה</Text>
      </View>
    );
  }

  const handleSave = () => {
    if (!formData.companyName || !formData.roleTitle) {
      Alert.alert("שגיאה", "נא למלא את כל השדות הנדרשים");
      return;
    }

    const updatedJobs = jobs.map((j) => (j.id === jobId ? formData : j));
    setJobs(updatedJobs);
    Alert.alert("הצלחה", "המשרה נשמרה בהצלחה", [
      { text: "אישור", onPress: () => navigation.goBack() },
    ]);
  };

  const handleDelete = () => {
    Alert.alert("מחיקת משרה", "האם אתה בטוח שברצונך למחוק משרה זו?", [
      { text: "ביטול", style: "cancel" },
      {
        text: "מחק",
        style: "destructive",
        onPress: () => {
          const updatedJobs = jobs.filter((j) => j.id !== jobId);
          setJobs(updatedJobs);
          navigation.goBack();
        },
      },
    ]);
  };

  const statusOptions: JobStatus[] = [
    "APPLIED",
    "HR_CALL",
    "TECH_INTERVIEW",
    "HOME_ASSIGNMENT",
    "OFFER",
    "REJECTED",
  ];

  const statusLabels: Record<JobStatus, string> = {
    APPLIED: "הוגש",
    HR_CALL: "שיחת HR",
    TECH_INTERVIEW: "ראיון טכני",
    HOME_ASSIGNMENT: "מטלה ביתית",
    OFFER: "הצעה",
    REJECTED: "נדחה",
  };

  return (
    <View style={styles.container}>
      <Header title="פרטי משרה" />
      <ImageBackground
        source={BACKGROUND_IMAGE_URL}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>שם החברה</Text>
          <TextInput
            style={styles.input}
            value={formData.companyName}
            onChangeText={(text) =>
              setFormData({ ...formData, companyName: text })
            }
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>תפקיד</Text>
          <TextInput
            style={styles.input}
            value={formData.roleTitle}
            onChangeText={(text) =>
              setFormData({ ...formData, roleTitle: text })
            }
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>סטטוס</Text>
          <View style={styles.pickerContainer}>
            <WebPicker<JobStatus>
              selectedValue={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value as JobStatus })
              }
              style={styles.picker}
            >
              {statusOptions.map((status) => {
                const Item = WebPicker.Item;
                return (
                  <Item
                    key={status}
                    label={statusLabels[status]}
                    value={status}
                  />
                );
              })}
            </WebPicker>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>תאריך הגשה</Text>
          <TextInput
            style={styles.input}
            value={formData.appliedDate || ""}
            onChangeText={(text) =>
              setFormData({ ...formData, appliedDate: text })
            }
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>תאריך ראיון הבא</Text>
          <TextInput
            style={styles.input}
            value={formData.nextInterviewDate || ""}
            onChangeText={(text) =>
              setFormData({ ...formData, nextInterviewDate: text })
            }
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>הערות</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.notes || ""}
            onChangeText={(text) =>
              setFormData({ ...formData, notes: text })
            }
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>שמור</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>מחק משרה</Text>
        </TouchableOpacity>
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
  form: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    textAlign: "right",
  },
  textArea: {
    height: 100,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  saveButton: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#F44336",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
    textAlign: "center",
    marginTop: 32,
  },
});


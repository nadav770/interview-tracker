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
import { WebPicker } from "../components/WebPicker";
import { useAppContext } from "../context/AppContext";
import { PracticeItemCard } from "../components/PracticeItemCard";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { BACKGROUND_IMAGE_URL } from "../config/backgroundImage";
import { PracticeItem, PracticeTopic } from "../types/practice";

export const PracticeScreen: React.FC = () => {
  const { practiceItems, setPracticeItems } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState<Partial<PracticeItem>>({
    title: "",
    topic: "ALGORITHMS",
    date: new Date().toISOString().split("T")[0],
    difficulty: undefined,
  });

  const handleAddItem = () => {
    if (!newItem.title || !newItem.topic || !newItem.date) {
      Alert.alert("שגיאה", "נא למלא את כל השדות הנדרשים");
      return;
    }

    const item: PracticeItem = {
      id: Date.now().toString(),
      title: newItem.title,
      topic: newItem.topic,
      date: newItem.date,
      difficulty: newItem.difficulty,
      notes: newItem.notes,
    };

    setPracticeItems([...practiceItems, item]);
    setNewItem({
      title: "",
      topic: "ALGORITHMS",
      date: new Date().toISOString().split("T")[0],
      difficulty: undefined,
    });
    setModalVisible(false);
  };

  const topicOptions: PracticeTopic[] = [
    "DATA_STRUCTURES",
    "ALGORITHMS",
    "OOP",
    "SQL",
    "SYSTEM_DESIGN",
  ];

  const topicLabels: Record<PracticeTopic, string> = {
    DATA_STRUCTURES: "מבני נתונים",
    ALGORITHMS: "אלגוריתמים",
    OOP: "תכנות מונחה עצמים",
    SQL: "SQL",
    SYSTEM_DESIGN: "עיצוב מערכות",
  };

  const difficultyOptions = ["EASY", "MEDIUM", "HARD"];

  return (
    <View style={styles.container}>
      <Header title="תרגול" />
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
            <Text style={styles.addButtonText}>+ הוסף תרגול</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={practiceItems.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PracticeItemCard item={item} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>אין תרגולים עדיין</Text>
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
            <Text style={styles.modalTitle}>הוסף תרגול חדש</Text>

            <TextInput
              style={styles.input}
              placeholder="כותרת (למשל: Two Sum)"
              value={newItem.title}
              onChangeText={(text) => setNewItem({ ...newItem, title: text })}
            />

            <View style={styles.field}>
              <Text style={styles.label}>נושא</Text>
              <View style={styles.pickerContainer}>
                <WebPicker<PracticeTopic>
                  selectedValue={newItem.topic || "ALGORITHMS"}
                  onValueChange={(value) =>
                    setNewItem({ ...newItem, topic: value as PracticeTopic })
                  }
                  style={styles.picker}
                >
                  {topicOptions.map((topic) => {
                    const Item = WebPicker.Item;
                    return (
                      <Item
                        key={topic}
                        label={topicLabels[topic]}
                        value={topic}
                      />
                    );
                  })}
                </WebPicker>
              </View>
            </View>

            <TextInput
              style={styles.input}
              placeholder="תאריך (YYYY-MM-DD)"
              value={newItem.date}
              onChangeText={(text) => setNewItem({ ...newItem, date: text })}
            />

            <View style={styles.field}>
              <Text style={styles.label}>רמת קושי (אופציונלי)</Text>
              <View style={styles.pickerContainer}>
                <WebPicker
                  selectedValue={newItem.difficulty || ""}
                  onValueChange={(value) =>
                    setNewItem({
                      ...newItem,
                      difficulty: value as "EASY" | "MEDIUM" | "HARD" | undefined,
                    })
                  }
                  style={styles.picker}
                >
                  {(() => {
                    const Item = WebPicker.Item;
                    return (
                      <>
                        <Item label="ללא" value="" />
                        {difficultyOptions.map((diff) => (
                          <Item
                            key={diff}
                            label={
                              diff === "EASY"
                                ? "קל"
                                : diff === "MEDIUM"
                                ? "בינוני"
                                : "קשה"
                            }
                            value={diff}
                          />
                        ))}
                      </>
                    );
                  })()}
                </WebPicker>
              </View>
            </View>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="הערות (אופציונלי)"
              value={newItem.notes}
              onChangeText={(text) => setNewItem({ ...newItem, notes: text })}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
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
                onPress={handleAddItem}
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
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "right",
  },
  field: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
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
    marginBottom: 12,
    fontSize: 16,
    textAlign: "right",
    backgroundColor: "#fff",
  },
  textArea: {
    height: 80,
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


import React from "react";
import { Platform, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface WebPickerProps<T = string> {
  selectedValue: T;
  onValueChange: (value: T) => void;
  children: React.ReactNode;
  style?: any;
}

// Helper component for Picker.Item compatibility
export const WebPickerItem = ({ label, value }: { label: string; value: string }) => {
  return null; // This is just for TypeScript compatibility - actual rendering happens in WebPicker
};

function WebPickerComponent<T extends string = string>({
  selectedValue,
  onValueChange,
  children,
  style,
}: WebPickerProps<T>) {
  if (Platform.OS === "web") {
    // Use native HTML select on web
    const options: Array<{ label: string; value: string }> = [];
    
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props.value !== undefined) {
        options.push({
          label: child.props.label || String(child.props.value),
          value: String(child.props.value),
        });
      }
    });

    return (
      <View style={[styles.webContainer, style]}>
        <select
          value={String(selectedValue || "")}
          onChange={(e) => onValueChange(e.target.value as T)}
          style={{
            width: "100%",
            height: 50,
            padding: 12,
            fontSize: 16,
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
          } as any}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </View>
    );
  }

  // Use native Picker on mobile
  return (
    <View style={style}>
      <Picker selectedValue={String(selectedValue || "")} onValueChange={(value) => onValueChange(value as T)}>
        {children}
      </Picker>
    </View>
  );
}

// Add Item property for compatibility
const WebPicker = WebPickerComponent as typeof WebPickerComponent & { Item: typeof WebPickerItem };
WebPicker.Item = WebPickerItem;

export { WebPicker };

const styles = StyleSheet.create({
  webContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
});


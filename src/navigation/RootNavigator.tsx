import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DashboardScreen } from "../screens/DashboardScreen";
import { JobsScreen } from "../screens/JobsScreen";
import { JobDetailsScreen } from "../screens/JobDetailsScreen";
import { TasksScreen } from "../screens/TasksScreen";
import { PracticeScreen } from "../screens/PracticeScreen";

export type RootStackParamList = {
  Dashboard: undefined;
  Jobs: undefined;
  JobDetails: { jobId: string };
  Tasks: undefined;
  Practice: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer
        linking={{
          enabled: true,
          prefixes: [],
        }}
      >
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
            animation: "slide_from_right",
            gestureEnabled: true,
            animationTypeForReplace: "push",
          }}
        >
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Jobs" component={JobsScreen} />
          <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
          <Stack.Screen name="Tasks" component={TasksScreen} />
          <Stack.Screen name="Practice" component={PracticeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};


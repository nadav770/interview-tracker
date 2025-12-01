# Interview Tracker

אפליקציית React Native עם Expo לניהול תהליך חיפוש עבודה בהייטק.

## תכונות

- **מעקב משרות**: ניהול משרות ותהליכי גיוס
- **משימות**: מעקב אחר משימות שצריך לבצע
- **תרגול טכני**: מעקב אחר תרגולים כמו LeetCode
- **דשבורד**: סטטיסטיקות כלליות

## התקנה

```bash
npm install
```

## הרצה

```bash
npx expo start
```

לאחר מכן לחץ על `i` ל-iOS או `a` ל-Android, או סרוק את ה-QR code עם אפליקציית Expo Go.

## מבנה הפרויקט

```
src/
  App.tsx
  navigation/
    RootNavigator.tsx
  context/
    AppContext.tsx
  screens/
    DashboardScreen.tsx
    JobsScreen.tsx
    JobDetailsScreen.tsx
    TasksScreen.tsx
    PracticeScreen.tsx
  components/
    JobCard.tsx
    TaskItem.tsx
    PracticeItemCard.tsx
    StatCard.tsx
  storage/
    jobsStorage.ts
    tasksStorage.ts
    practiceStorage.ts
  types/
    job.ts
    task.ts
    practice.ts
```

## טכנולוגיות

- React Native
- Expo
- TypeScript
- React Navigation
- AsyncStorage
- Context API


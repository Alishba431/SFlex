# FLEX Pulse

Software for Mobile Devices · Assignment 1 · React Native (Expo)

## Problem

FLEX shows attendance and marks as raw numbers, so every student ends up doing the same calculations by hand:

- *Can I miss tomorrow's class, or will I drop below 80%?*
- *I'm already short. How many classes do I need to attend to recover?*
- *What do I need in the remaining assessments to get a B+?*

## Solution

FLEX Pulse does these calculations automatically and shows the answer next to each course. When attendance or marks change, the whole app updates: the dashboard, the charts, the warnings and the advice.

## Features

- **Dashboard:** average attendance, number of courses at risk and average marks, plus a "Needs attention" list of courses near or below 80%.
- **Charts (react-native-chart-kit):**
  - **Bar chart:** attendance per course, coloured by status.
  - **Pie chart:** how many courses are Safe / Borderline / At risk.
- **Courses list:** search by code or name, filter by status, sorted by lowest attendance first.
- **Attendance tracker:** mark Present or Absent. The app tells you how many classes you can still miss, or how many you need to attend to recover.
- **Quizzes & assignments lists:** add as many quizzes and assignments as you need (e.g. 7/10, 45/50), or remove them. Every item counts equally: the average percentage is scaled to the category weight (Quizzes 10%, Assignments 10%).
- **Marks form:** enter Sessional 1 (15), Sessional 2 (15), Project (10) and Final (40). Each entry is validated to be a number between 0 and that assessment's weight.
- **Grade planner:** pick a target grade and see how many marks you need from the remaining assessments, including when the grade is already secured or no longer possible.
- **Pastel theme** with status colours: mint = safe, peach = borderline, pink = at risk.

## Project structure

```
App.js                  state + switching screens (no navigation library)
src/
  constants.js          attendance limits, FAST weightages, grade scale
  data.js               student info + courses array
  calculations.js       attendance and grade functions
  theme.js              pastel colours + chart config
  screens/
    HomeScreen.js       dashboard + charts
    CoursesScreen.js    search, filter, course list
    CourseScreen.js     one course: attendance, planner, marks form
  components/
    Header, Card, StatBox, ProgressBar, FilterChip, EmptyState,
    CourseCard, AttendanceBox, ScoreList, MarksForm, GradePlanner
```

## Screen switching

`App.js` stores the current screen in state (`'home'`, `'courses'` or `'course'`) and uses `if / else` to decide which screen to render. Buttons call `setScreen(...)` to switch screens.

## Formulas (`src/calculations.js`)

- **Classes you can miss:** `floor(attended × 100 / 80 − held)`
- **Classes needed to recover:** `ceil((80 × held − 100 × attended) / 20)`
- **Required % for a grade:** `(gradeMin − marksObtained) / remainingWeight × 100`

## How to run

**Requirements:** Node.js (LTS) on your computer and the **Expo Go** app on your phone. The project uses Expo SDK 57.

1. Clone the repository and open the project folder:
   ```
   git clone <repo-url>
   cd smd-assignment1
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npx expo start
   ```
   On Windows PowerShell, if `npx` is blocked, use `npx.cmd expo start`.
4. Scan the QR code with **Expo Go** on Android, or with the **Camera** app on iPhone. The phone and the computer must be on the same Wi-Fi network.

**Troubleshooting**
- If Expo Go asks you to log in, run `npx expo login` on the computer and log into Expo Go with the same account.
- If you change the structure of the data in `src/data.js`, press `r` in the terminal for a full reload.


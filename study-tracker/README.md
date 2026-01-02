# Study Tracker - User Guide

## 🎯 New Features Added

### 1. **Better Data Storage**
- **File-Based Storage**: Your data is now saved to downloadable JSON files
- **Automatic Backup**: Click "💾 Save to File" to create backups
- **Load Data**: Use "📁 Load from File" to restore from saved files
- **No More Lost Data**: Files persist even when you clear browser cache/cookies

### 2. **Subject Sorting**
- **Sort by Subject Code**: Alphabetical by course code (e.g., CS111, MATH110)
- **Sort by Name**: Alphabetical by course name
- **Sort by Credits**: Highest credits first
- **Sort by Status**: In Progress → Not Started → Completed
- **Custom Order**: Uses the order you define in the code

### 3. **Edit Placeholder Subjects**
Located in `script.js` around lines 6-70, the `defaultSubjects` array contains:

```javascript
{
    id: 'pc101',           // Unique ID (lowercase)
    code: 'PC101',         // Course code
    name: 'Life Skills',   // Course name
    credits: 3,            // Number of credits
    status: 'not-started', // Don't change this
    prerequisites: [],     // Array of prerequisite codes
    order: 1              // For custom sorting
}
```

## 🛠️ How to Edit Placeholder Subjects

1. **Open script.js** in any text editor
2. **Find defaultSubjects array** (around line 6)
3. **Modify existing subjects** or add new ones
4. **Save the file**
5. **Refresh the app** in your browser
6. **Click "🔧 Reset to Default Subjects"** to load changes

## 📊 Sorting Options Explained

- **Subject Code**: CS111, ENG111, MATH110, PC101, etc.
- **Subject Name**: Alphabetical by full name
- **Credits**: 3-credit courses first, then 1-credit, etc.
- **Status**: Shows In Progress subjects first (most important)
- **Custom Order**: Uses the `order` property you set in the code

## 💾 Data Management Best Practices

1. **Regular Backups**: Click "💾 Save to File" weekly
2. **Before Major Changes**: Always export your data first
3. **File Naming**: Files are automatically named with date (e.g., `study-tracker-2026-01-02.json`)
4. **Safe Editing**: Use "📝 Show Editing Guide" for detailed instructions

## 🔄 Current Default Subjects

The app comes pre-loaded with these placeholder subjects:
- PC101 - Life Skills (3 credits)
- REL250A - Jesus Christ & His Everlasting Gospel (1 credit)
- MATH110 - College Algebra (3 credits)
- ENG111 - English Composition (3 credits)
- CS111 - Introduction to Programming (3 credits)
- WEB170-430 - Web Development sequence (3 credits each)

## 🎓 Certificate Tracking

All certificates automatically track your progress and become available when you complete required subjects:
- PathwayConnect Certificate
- Web & Computer Programming Certificate
- Web Development Certificate
- Associate Degree
- Software Development Certificate
- Bachelor's Degree

## 🚨 Important Notes

- **Backup First**: Always export your data before making changes
- **Prerequisites**: The app enforces prerequisite requirements
- **Custom Order**: Set the `order` property to control custom sorting
- **File Format**: Save files as `.json` for compatibility

Your study tracker now has persistent, reliable storage and flexible organization options!
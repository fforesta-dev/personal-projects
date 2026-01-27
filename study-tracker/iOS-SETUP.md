# Study Tracker iOS App Setup - Cloud Build

Build your Study Tracker as a native iOS app without needing Xcode! Uses Ionic Cloud Build.

## Prerequisites
- Node.js installed (https://nodejs.org)
- Free Ionic account (https://ionic.io)
- Apple Developer account (free tier works for personal apps)

## Setup Steps

### 1. Install Ionic CLI globally
```bash
npm install -g @ionic/cli
```

### 2. Navigate to your study-tracker folder
```bash
cd "C:\Users\Francesco\Documents\BYU\PERSONAL PROJECTS\personal-projects\study-tracker"
```

### 3. Install dependencies
```bash
npm install
```

### 4. Login to Ionic
```bash
ionic login
```
Enter your Ionic credentials (or create a free account at https://ionic.io/signup)

### 5. Start Cloud Build
```bash
ionic cloud build --native ios
```

When prompted:
- **Certificate signing request**: Create a new one
- **Team ID**: Leave blank (will use your Apple Developer Team)
- **Provisioning profile**: Select or create new

### 6. Download the .ipa file
After the build completes (5-15 minutes), you'll get an `.ipa` file.

### 7. Install on iPhone using TestFlight
1. Download the `.ipa` file to your computer
2. Use **Apple Configurator 2** (free from App Store on Mac) or **Windows Device Portal** to install it
3. Or email the `.ipa` to yourself and open it on your iPhone

## Alternative: Quick TestFlight Upload
If you have an Apple Developer account:
1. Get the `.ipa` from the cloud build
2. Use **Transporter** app to upload to TestFlight
3. Share the TestFlight link with yourself

## Updating Your App
Edit your code, then run:
```bash
ionic cloud build --native ios
```

## Notes
- The app works offline thanks to the service worker
- Your data stays on your device
- Cloud builds are cached for faster rebuilds
- Free tier has monthly build limits

---

**Troubleshooting**:
- If build fails, check your Apple Developer certificates
- Make sure your Bundle ID matches Apple's requirements (com.personal.studytracker)
- For detailed help: https://ionic.io/docs/appflow/builds

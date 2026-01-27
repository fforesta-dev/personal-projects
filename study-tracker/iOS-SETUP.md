# Study Tracker iOS App Setup

Your study-tracker is now ready to become an iOS app! Follow these steps to deploy it to your iPhone.

## Prerequisites
- Mac with Xcode installed (required for iOS development)
- Node.js installed
- An Apple Developer account (free tier works for personal use)

## Setup Steps

### 1. Initialize Capacitor (run from the study-tracker folder)
```bash
npm init -y
npm install @capacitor/core @capacitor/cli
npx cap init --web-dir . --npm-client npm
```

When prompted:
- **App name**: Study Tracker
- **App Package ID**: com.personal.studytracker (or similar)

### 2. Add iOS Platform
```bash
npm install @capacitor/ios
npx cap add ios
```

### 3. Open in Xcode
```bash
npx cap open ios
```

This will open Xcode with your iOS project.

### 4. Configure in Xcode
1. Select the project in the left sidebar
2. Go to **Signing & Capabilities**
3. Select your team (or create a free Apple Developer account)
4. Change the bundle identifier if needed (com.personal.studytracker)

### 5. Deploy to Your iPhone
1. Connect your iPhone via USB
2. In Xcode, select your device from the device dropdown (top left)
3. Click the **Play** button to build and run on your device
4. On your iPhone, trust the developer certificate:
   - Go to **Settings > General > Device Management**
   - Tap your Apple ID and trust the app

## Syncing Changes
Whenever you update your web code:
```bash
npx cap sync
```
Then rebuild in Xcode.

## Adding Icons
Replace images in `ios/App/App/Assets.xcassets/AppIcon.appiconset/` with your custom icons (various sizes provided by Xcode template).

## Notes
- The app works offline thanks to the service worker
- Your data is stored locally on your device
- The password protection works on the iPhone app too

---

For more details, visit: https://capacitorjs.com/docs/getting-started

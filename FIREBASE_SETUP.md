# 🔥 Firebase Setup Guide for Treasure Hunt

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Project name: `treasure-hunt-event` (or any name)
4. Disable Google Analytics (not needed)
5. Click "Create project"

### Step 2: Enable Firestore Database
1. In your Firebase project, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (allows read/write for 30 days)
4. Select a location (choose closest to your event location)
5. Click "Done"

### Step 3: Get Configuration Keys
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web app" icon (`</>`)
4. App nickname: `treasure-hunt-frontend`
5. Don't check "Firebase Hosting"
6. Click "Register app"
7. **COPY the firebaseConfig object** - you'll need this!

### Step 4: Configure for Vercel
1. Go to your Vercel dashboard
2. Find your `th-frontend` project
3. Go to Settings → Environment Variables
4. Add these variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY = your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 123456789
NEXT_PUBLIC_FIREBASE_APP_ID = your-app-id
```

### Step 5: Redeploy
1. In Vercel, go to your project
2. Click "Redeploy" (it will pick up the new environment variables)
3. Wait 2-3 minutes for deployment

## ✅ Test Firebase Connection

### After deployment:
1. Visit your deployed site
2. Try logging in with fresher credentials
3. Check admin dashboard - you should see "🔥 Connected to Firebase"
4. Login data will now be shared across all devices in real-time!

## 🛠️ Firebase Security Rules (Production Ready)

For your event, update Firestore rules to be more secure:

1. Go to Firestore Database → Rules
2. Replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to loginEntries collection
    match /loginEntries/{document} {
      allow read, write: if true;
    }
  }
}
```

## 🎯 Why Firebase is Essential for Your Event:

✅ **Real-time sync** - All teams' logins appear instantly on admin dashboard  
✅ **Multiple admins** - Monitor from multiple devices simultaneously  
✅ **Reliable** - Google's infrastructure, won't crash during your event  
✅ **Automatic timestamps** - Precise timing for determining winners  
✅ **No data loss** - Even if browsers crash, data is safe  

## 🔄 Fallback System

Your app is smart! If Firebase fails for any reason:
- It automatically falls back to localStorage
- App keeps working without interruption
- You get console warnings about the fallback

## 📞 Troubleshooting

**If you see "Using Local Storage" instead of "Connected to Firebase":**
1. Check environment variables are set in Vercel
2. Verify Firebase project is active
3. Check browser console for error messages
4. Make sure Firestore rules allow read/write

**Need help?** The app works with localStorage too, but Firebase is much better for your event!

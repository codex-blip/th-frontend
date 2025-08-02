import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id"
};

// Initialize Firebase with better error handling
let db: Firestore | undefined;
let auth: Auth | undefined;

try {
  // Check if we have real Firebase config (not demo values)
  const hasRealConfig = firebaseConfig.apiKey !== "demo-api-key" && 
                       firebaseConfig.projectId !== "demo-project-id";
  
  if (hasRealConfig) {
    console.log('🔥 Initializing Firebase with config:', {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain
    });
    
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    
    console.log('✅ Firebase initialized successfully');
  } else {
    console.warn('⚠️ Using demo Firebase config - localStorage fallback will be used');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.log('📱 App will use localStorage fallback');
  db = undefined;
  auth = undefined;
}

export { db, auth };

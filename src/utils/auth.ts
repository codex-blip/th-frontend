import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LoginEntry, User } from '@/types';

// Predefined users
export const USERS: User[] = [
  {
    username: 'ksi',
    password: 'zerikon',
    type: 'fresher'
  },
  {
    username: 'max1112',
    password: 'moelester',
    type: 'admin'
  }
];

export const authenticateUser = (username: string, password: string): User | null => {
  return USERS.find(user => user.username === username && user.password === password) || null;
};

// Session management
export const setUserSession = (user: User): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }
};

export const getUserSession = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = sessionStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
};

export const clearUserSession = (): void => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('currentUser');
  }
};

export const isAdminAuthenticated = (): boolean => {
  const user = getUserSession();
  return user?.type === 'admin';
};

export const formatIST = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

// Firebase-based storage with localStorage fallback
export const saveLoginEntry = async (teamCaptainEntry: string, type: 'fresher' | 'admin'): Promise<void> => {
  const timestamp = Date.now();
  const entry: LoginEntry = {
    teamCaptainEntry,
    timestamp,
    formattedTime: formatIST(timestamp),
    type
  };

  try {
    // Try Firebase first (only if db is available)
    if (db) {
      await addDoc(collection(db, 'loginEntries'), entry);
      console.log('✅ Login entry saved to Firebase:', entry);
      return;
    } else {
      throw new Error('Firebase not initialized');
    }
  } catch (error) {
    console.warn('⚠️ Firebase failed, using localStorage fallback:', error);
    
    // Fallback to localStorage if Firebase fails
    try {
      const existingEntries = localStorage.getItem('treasure_hunt_logins');
      const entries: LoginEntry[] = existingEntries ? JSON.parse(existingEntries) : [];
      
      const entryWithId = {
        ...entry,
        id: `entry_${timestamp}_${Math.random().toString(36).substr(2, 9)}`
      };
      
      entries.push(entryWithId);
      localStorage.setItem('treasure_hunt_logins', JSON.stringify(entries));
      console.log('✅ Login entry saved to localStorage:', entryWithId);
    } catch (localError) {
      console.error('❌ Both Firebase and localStorage failed:', localError);
      throw localError;
    }
  }
};

export const getLoginEntries = async (): Promise<LoginEntry[]> => {
  try {
    // Try Firebase first (only if db is available)
    if (db) {
      const q = query(collection(db, 'loginEntries'), orderBy('timestamp', 'asc'));
      const querySnapshot = await getDocs(q);
      const firebaseEntries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as LoginEntry));
      
      console.log('✅ Loaded entries from Firebase:', firebaseEntries.length);
      return firebaseEntries;
    } else {
      throw new Error('Firebase not initialized');
    }
  } catch (error) {
    console.warn('⚠️ Firebase failed, using localStorage fallback:', error);
    
    // Fallback to localStorage if Firebase fails
    try {
      const existingEntries = localStorage.getItem('treasure_hunt_logins');
      const entries: LoginEntry[] = existingEntries ? JSON.parse(existingEntries) : [];
      console.log('✅ Loaded entries from localStorage:', entries.length);
      return entries.sort((a, b) => a.timestamp - b.timestamp);
    } catch (localError) {
      console.error('❌ Both Firebase and localStorage failed:', localError);
      return [];
    }
  }
};

// Utility function to clear all entries (for testing)
export const clearAllEntries = async (): Promise<void> => {
  try {
    // Clear Firebase first if available
    if (db) {
      const q = query(collection(db, 'loginEntries'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      // Delete all documents
      const deletePromises = querySnapshot.docs.map(docSnap => 
        deleteDoc(doc(db!, 'loginEntries', docSnap.id))
      );
      
      await Promise.all(deletePromises);
      console.log(`🧹 Cleared ${querySnapshot.docs.length} entries from Firebase`);
    }
  } catch (error) {
    console.error('❌ Error clearing Firebase entries:', error);
  }
  
  // Also clear localStorage as backup
  localStorage.removeItem('treasure_hunt_logins');
  console.log('🧹 All localStorage entries cleared');
};

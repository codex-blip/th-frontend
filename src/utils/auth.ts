import { LoginEntry, User } from '@/types';

// Predefined users
export const USERS: User[] = [
  {
    username: 'esportz@ismp',
    password: 'iitropargoat',
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

// Temporary localStorage-based storage (will work immediately)
// TODO: Replace with Firebase once configured
export const saveLoginEntry = async (teamCaptainEntry: string, type: 'fresher' | 'admin'): Promise<void> => {
  const timestamp = Date.now();
  const entry: LoginEntry = {
    id: `entry_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
    teamCaptainEntry,
    timestamp,
    formattedTime: formatIST(timestamp),
    type
  };

  try {
    // Get existing entries from localStorage
    const existingEntries = localStorage.getItem('treasure_hunt_logins');
    const entries: LoginEntry[] = existingEntries ? JSON.parse(existingEntries) : [];
    
    // Add new entry
    entries.push(entry);
    
    // Save back to localStorage
    localStorage.setItem('treasure_hunt_logins', JSON.stringify(entries));
    
    console.log('✅ Login entry saved successfully:', entry);
  } catch (error) {
    console.error('❌ Error saving login entry:', error);
    throw error;
  }
};

export const getLoginEntries = async (): Promise<LoginEntry[]> => {
  try {
    const existingEntries = localStorage.getItem('treasure_hunt_logins');
    const entries: LoginEntry[] = existingEntries ? JSON.parse(existingEntries) : [];
    
    // Sort by timestamp (earliest first)
    return entries.sort((a, b) => a.timestamp - b.timestamp);
  } catch (error) {
    console.error('❌ Error fetching login entries:', error);
    return [];
  }
};

// Utility function to clear all entries (for testing)
export const clearAllEntries = (): void => {
  localStorage.removeItem('treasure_hunt_logins');
  console.log('🧹 All login entries cleared');
};

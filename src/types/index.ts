export interface LoginEntry {
  id?: string;
  teamCaptainEntry: string;
  timestamp: number;
  formattedTime: string;
  type: 'fresher' | 'admin';
}

export interface User {
  username: string;
  password: string;
  type: 'fresher' | 'admin';
}

'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function FirebaseTest() {
  const [status, setStatus] = useState<'testing' | 'firebase' | 'localStorage' | 'error'>('testing');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const testFirebase = async () => {
      try {
        if (!db) {
          setStatus('localStorage');
          setErrorMessage('Firebase not initialized - using localStorage fallback');
          return;
        }

        // Try to add a test document
        const testDoc = {
          test: true,
          timestamp: Date.now(),
          message: 'Firebase connection test'
        };

        const docRef = await addDoc(collection(db, 'test'), testDoc);
        console.log('✅ Firebase test successful, document ID:', docRef.id);
        setStatus('firebase');
      } catch (error: unknown) {
        console.error('❌ Firebase test failed:', error);
        setStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unknown Firebase error');
      }
    };

    testFirebase();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'firebase': return 'text-green-400';
      case 'localStorage': return 'text-orange-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'firebase': return '🔥';
      case 'localStorage': return '📱';
      case 'error': return '❌';
      default: return '🔍';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'firebase': return 'Firebase Connected Successfully!';
      case 'localStorage': return 'Using localStorage (Firebase not configured)';
      case 'error': return 'Firebase Connection Error';
      default: return 'Testing Firebase connection...';
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
      <div className={`text-center ${getStatusColor()}`}>
        <div className="text-2xl mb-2">{getStatusIcon()}</div>
        <div className="font-medium">{getStatusText()}</div>
        {errorMessage && (
          <div className="text-red-300 text-sm mt-2 bg-red-500/10 border border-red-500/20 rounded p-2">
            <strong>Error:</strong> {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

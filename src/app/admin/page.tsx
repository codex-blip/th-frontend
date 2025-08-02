'use client';

import { useEffect, useState } from 'react';
import { getLoginEntries, clearAllEntries } from '@/utils/auth';
import { LoginEntry } from '@/types';
import { Shield, Clock, Users, Trophy, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const [loginEntries, setLoginEntries] = useState<LoginEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'firebase' | 'localStorage' | 'unknown'>('unknown');

  const fetchEntries = async () => {
    try {
      setRefreshing(true);
      const entries = await getLoginEntries();
      setLoginEntries(entries);
      
      // Detect connection method based on console logs or try a simple test
      if (entries.length > 0 && entries[0].id && entries[0].id.startsWith('entry_')) {
        setConnectionStatus('localStorage');
      } else {
        setConnectionStatus('firebase');
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
      setConnectionStatus('localStorage');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setCurrentTime(istTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const fresherEntries = loginEntries.filter(entry => entry.type === 'fresher');
  const adminEntries = loginEntries.filter(entry => entry.type === 'admin');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-3 rounded-full">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300">Treasure Hunt Event Monitor</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchEntries}
                disabled={refreshing}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => {
                  if (confirm('Clear all login entries? This cannot be undone!')) {
                    clearAllEntries();
                    fetchEntries();
                  }
                }}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                🧹 Clear Data
              </button>
              <Link 
                href="/"
                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                Home
              </Link>
            </div>
          </div>

          {/* Current Time Display */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-medium text-lg">Current Time (IST):</span>
              <span className="text-yellow-300 font-mono text-xl">{currentTime}</span>
            </div>
            <div className="text-center mt-2">
              <span className={`px-3 py-1 rounded-full text-xs border ${
                connectionStatus === 'firebase' 
                  ? 'bg-green-500/20 text-green-300 border-green-500/30' 
                  : connectionStatus === 'localStorage'
                  ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
                  : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
              }`}>
                {connectionStatus === 'firebase' ? '� Connected to Firebase' : 
                 connectionStatus === 'localStorage' ? '�📱 Using Local Storage (Setup Firebase for production)' : 
                 '🔍 Checking connection...'}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-full w-fit mx-auto mb-3">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{fresherEntries.length}</h3>
            <p className="text-gray-300">Fresher Logins</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-gradient-to-r from-purple-500 to-violet-600 p-3 rounded-full w-fit mx-auto mb-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{adminEntries.length}</h3>
            <p className="text-gray-300">Admin Logins</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-3 rounded-full w-fit mx-auto mb-3">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">{loginEntries.length}</h3>
            <p className="text-gray-300">Total Entries</p>
          </div>
        </div>

        {/* Login Entries Table */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              Login History (Chronological Order)
            </h2>
            <p className="text-gray-300 mt-1">First entry wins! 🏆</p>
          </div>

          <div className="overflow-x-auto">
            {loginEntries.length > 0 ? (
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">Rank</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Team Captain Entry No.</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Login Time (IST)</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Type</th>
                    <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {loginEntries.map((entry, index) => (
                    <tr key={entry.id || index} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && entry.type === 'fresher' ? (
                            <div className="flex items-center gap-2">
                              <Trophy className="w-5 h-5 text-yellow-400" />
                              <span className="text-yellow-400 font-bold">#{index + 1} WINNER!</span>
                            </div>
                          ) : entry.type === 'fresher' ? (
                            <span className="text-white font-medium">#{index + 1}</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`font-mono text-lg ${entry.type === 'admin' ? 'text-purple-300' : 'text-white font-semibold'}`}>
                            {entry.teamCaptainEntry}
                          </span>
                          {entry.type === 'fresher' && (
                            <span className="text-gray-400 text-xs">Team Captain</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-300 font-mono text-sm">
                          {entry.formattedTime}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          entry.type === 'admin' 
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                            : 'bg-green-500/20 text-green-300 border border-green-500/30'
                        }`}>
                          {entry.type === 'admin' ? '👑 Admin' : '🎯 Fresher'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {index === 0 && entry.type === 'fresher' ? (
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full text-xs font-medium">
                            🏆 FIRST PLACE
                          </span>
                        ) : entry.type === 'fresher' ? (
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-xs font-medium">
                            ✅ Participated
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-500/20 text-gray-300 border border-gray-500/30 rounded-full text-xs font-medium">
                            🔧 Admin Access
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-xl">No login entries yet</p>
                  <p className="text-sm">Waiting for treasure hunters to join...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>🎯 Treasure Hunt Event Dashboard • Live Updates • Good Luck to All Teams! 🏆</p>
        </div>
      </div>
    </div>
  );
}

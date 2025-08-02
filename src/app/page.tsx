'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateUser, saveLoginEntry, setUserSession } from '@/utils/auth';
import { MapPin, Key, Users, Trophy } from 'lucide-react';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teamCaptainEntry, setTeamCaptainEntry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = authenticateUser(username, password);
      
      if (!user) {
        setError('Invalid credentials! Check your username and password.');
        setLoading(false);
        return;
      }

      if (user.type === 'fresher' && !teamCaptainEntry.trim()) {
        setError('⚠️ Team Captain Entry Number is required to identify your team as winners!');
        setLoading(false);
        return;
      }

      // Save login entry (Firebase with localStorage fallback)
      await saveLoginEntry(teamCaptainEntry || 'Admin Login', user.type);
      
      // Set user session
      setUserSession(user);
      
      console.log('✅ Login successful for:', user.type, teamCaptainEntry || 'Admin Login');

      // Redirect based on user type
      if (user.type === 'admin') {
        router.push('/admin');
      } else {
        router.push('/success');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-10 left-1/4 w-28 h-28 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-orange-400 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full">
              <MapPin className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">� Golden Quest</h1>
          <p className="text-gray-300 text-lg">Ultimate Fresher Challenge!</p>
          <div className="flex justify-center items-center gap-2 mt-3 text-yellow-300">
            <Trophy className="w-5 h-5" />
            <span className="text-sm font-medium">First to login wins!</span>
            <Trophy className="w-5 h-5" />
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Instructions Box */}
          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mb-6">
            <h3 className="text-blue-300 font-semibold mb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              How to Win
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Use the credentials from your treasure hunt clues</li>
              <li>• <strong>Enter your team captain&apos;s entry number</strong></li>
              <li>• First team to login successfully wins! 🏆</li>
            </ul>
          </div>

          <div>
            <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
              <Key className="w-4 h-4" />
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
              <Key className="w-4 h-4" />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Team Captain Entry Field - Always visible for better UX */}
          <div>
            <label className="flex items-center gap-2 text-white text-sm font-medium mb-2">
              <Users className="w-4 h-4" />
              Team Captain Entry No.
              <span className="text-yellow-300 text-xs">(Required for Freshers)</span>
            </label>
            <input
              type="text"
              value={teamCaptainEntry}
              onChange={(e) => setTeamCaptainEntry(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
              placeholder="Enter team captain entry number (e.g., 2023CSB001)"
            />
            <p className="text-gray-400 text-xs mt-1">
              💡 This helps us identify your team when you win!
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </div>
            ) : (
              'Start Your Adventure! 🗝️'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-xs">
          <p>🏆 Good luck, treasure hunters! 🏆</p>
        </div>
      </div>
    </div>
  );
}

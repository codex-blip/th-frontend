'use client';

import { Trophy, PartyPopper, Star, Home } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const [currentTime, setCurrentTime] = useState('');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 flex items-center justify-center p-4">
      {/* Celebratory animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/4 right-20 w-24 h-24 bg-pink-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 bg-purple-400 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-orange-400 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-36 h-36 bg-blue-400 rounded-full opacity-30 animate-bounce"></div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative z-10 text-center">
        {/* Success Animation */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-full animate-bounce">
            <Trophy className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-white mb-4">
          🎉 Congratulations! 🎉
        </h1>
        
        <div className="flex justify-center items-center gap-2 mb-4">
          <PartyPopper className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-semibold text-yellow-300">
            You&apos;ve Successfully Logged In!
          </h2>
          <PartyPopper className="w-6 h-6 text-yellow-400" />
        </div>

        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          The answer’s been quietly waiting, veiled in plain sight.<br />
          <span className="text-300 font-semibold">Only those who notice the unseen will find where to go next. 🕵️‍♂️</span>
        </p>

        {/* Current Time Display */}
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-medium">Login Time (IST)</span>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-yellow-300 font-mono text-lg">{currentTime}</p>
        </div>

        {/* Achievement Badge */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-4 mb-6">
          <h3 className="text-white font-semibold mb-2">🏅 Achievement Unlocked</h3>
          <p className="text-gray-300 text-sm">Treasure Hunt Participant</p>
        </div>

        {/* Back to Home */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
        >
          <Home className="w-5 h-5" />
          Back to Login
        </Link>

        <div className="mt-6 text-center text-gray-400 text-xs">
          <p>🎯 Best of luck to all teams! 🎯</p>
        </div>
      </div>
    </div>
  );
}

'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Eye, EyeOff, Trophy, Users, Clock, Crown } from 'lucide-react'

interface User {
  id: number
  username: string
  team_captain_entry: string
  login_time: string
  is_admin: boolean
}

interface LoginResponse {
  success: boolean
  message: string
  is_admin: boolean
  token?: string
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  // Form states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [teamCaptainEntry, setTeamCaptainEntry] = useState('')

  const API_BASE_URL = 'http://localhost:8000'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await axios.post<LoginResponse>(`${API_BASE_URL}/api/login`, {
        username,
        password,
        team_captain_entry: teamCaptainEntry
      })

      if (response.data.success) {
        setIsLoggedIn(true)
        setIsAdmin(response.data.is_admin)
        setSuccess(response.data.message)
        
        if (response.data.is_admin) {
          fetchUsers()
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(`${API_BASE_URL}/api/admin/users`)
      setUsers(response.data)
    } catch (err: any) {
      setError('Failed to fetch users')
    }
  }

  const declareWinner = async (userId: number) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/admin/declare-winner`, {
        user_id: userId
      })
      setSuccess(response.data.message)
      fetchUsers() // Refresh the list
    } catch (err: any) {
      setError('Failed to declare winner')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsAdmin(false)
    setUsers([])
    setUsername('')
    setPassword('')
    setTeamCaptainEntry('')
    setError('')
    setSuccess('')
  }

  const formatTime = (timeString: string) => {
    const date = new Date(timeString)
    return date.toLocaleString()
  }

  if (isLoggedIn && isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Crown className="h-8 w-8 text-orange-500" />
                <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
            {success && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600">Total Participants</p>
                  <p className="text-2xl font-bold text-gray-800">{users.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600">Latest Login</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {users.length > 0 ? formatTime(users[0].login_time) : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="text-sm text-gray-600">Ready to Declare</p>
                  <p className="text-2xl font-bold text-gray-800">Winner</p>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Registered Participants</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Team Captain Entry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Login Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.team_captain_entry}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatTime(user.login_time)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => declareWinner(user.id)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs transition-colors"
                        >
                          Declare Winner
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {users.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No participants have logged in yet.
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (isLoggedIn && !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center">
            <Trophy className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h1>
            <p className="text-gray-600 mb-6">You have successfully logged into the treasure hunt!</p>
            {success && (
              <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <Trophy className="h-16 w-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Treasure Hunt</h1>
          <p className="text-gray-600">Enter your credentials to begin the adventure!</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="teamCaptainEntry" className="block text-sm font-medium text-gray-700 mb-2">
              Team Captain Entry Number
            </label>
            <input
              type="text"
              id="teamCaptainEntry"
              value={teamCaptainEntry}
              onChange={(e) => setTeamCaptainEntry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter team captain entry number"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="loading-spinner mr-2"></div>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>This is a treasure hunt event login system.</p>
          <p className="mt-1">Guess the correct credentials to proceed!</p>
        </div>
      </div>
    </div>
  )
} 
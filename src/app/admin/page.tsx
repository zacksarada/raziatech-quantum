'use client'

import { useState, useEffect } from 'react'
import { 
  Download, Users, Mail, Building, Calendar, 
  RefreshCw, Database, ExternalLink, CheckCircle 
} from 'lucide-react'

interface Stats {
  total: number
  storage: string
  supabase_connected: boolean
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    storage: 'checking...',
    supabase_connected: false
  })
  const [isLoading, setIsLoading] = useState(true)
  const [testResult, setTestResult] = useState<string>('')

  const fetchStats = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/waitlist')
      if (response.ok) {
        const data = await response.json()
        setStats({
          total: data.total_subscribers || 0,
          storage: data.storage || 'none',
          supabase_connected: data.storage === 'supabase'
        })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const testDatabase = async () => {
    setTestResult('Testing...')
    try {
      const testData = {
        email: `test-${Date.now()}@raziaquantum.com`,
        name: 'Database Test',
        company: 'RaziaTech',
        role: 'System Admin',
        industry: 'Technology'
      }

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      })

      const result = await response.json()
      setTestResult(`✅ ${result.message} (Storage: ${result.storage})`)
      
      // Refresh stats
      setTimeout(fetchStats, 1000)
      
    } catch (error) {
      setTestResult('❌ Test failed')
    }
  }

  const openSupabase = () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://supabase.com'
    window.open(url.replace('.supabase.co', '.supabase.co/dashboard/project/_/editor'), '_blank')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">RaziaTech Quantum Admin</h1>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm ${stats.supabase_connected ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                {stats.supabase_connected ? '✅ Supabase Connected' : '⚠️ No Database'}
              </span>
              <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                Storage: {stats.storage}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchStats}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={openSupabase}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Supabase
            </button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Subscribers</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-10 h-10 text-cyan-400 opacity-50" />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                {1000 - stats.total} spots remaining
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Database Status</p>
                <p className="text-xl font-bold">
                  {stats.supabase_connected ? 'Connected' : 'Not Connected'}
                </p>
              </div>
              <Database className={`w-10 h-10 ${stats.supabase_connected ? 'text-green-400' : 'text-yellow-400'} opacity-50`} />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                {stats.storage} storage
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">API Status</p>
                <p className="text-xl font-bold text-green-400">Live</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400 opacity-50" />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <a 
                href="/api/waitlist" 
                target="_blank"
                className="text-cyan-400 text-sm hover:underline"
              >
                Test Endpoint →
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Quick Actions</p>
                <button
                  onClick={testDatabase}
                  className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm"
                >
                  Test Database
                </button>
              </div>
              <Mail className="w-10 h-10 text-purple-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Test Results */}
        {testResult && (
          <div className={`p-4 rounded-xl mb-6 ${testResult.includes('✅') ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'}`}>
            <p className={testResult.includes('✅') ? 'text-green-400' : 'text-yellow-400'}>
              {testResult}
            </p>
          </div>
        )}

        {/* Setup Guide */}
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
            <Database className="w-5 h-5" />
            Database Setup Guide
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 text-cyan-400">Step 1: Supabase Setup</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
                <li>Go to supabase.com → Your Project</li>
                <li>Copy Project URL from Settings → API</li>
                <li>Copy Service Role Key (not anon key)</li>
                <li>Add to Vercel Environment Variables</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium mb-3 text-cyan-400">Step 2: Create Table</h4>
              <pre className="bg-gray-900 p-3 rounded text-xs overflow-x-auto text-gray-300">
{`CREATE TABLE waitlist_subscribers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL,
  industry VARCHAR(50) NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending'
);`}
              </pre>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
            <h4 className="font-medium mb-2">Current Environment Status:</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">SUPABASE_URL:</span>
                <code className="block mt-1 px-2 py-1 bg-gray-800 rounded truncate">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set'}
                </code>
              </div>
              <div>
                <span className="text-gray-400">SUPABASE_KEY:</span>
                <code className="block mt-1 px-2 py-1 bg-gray-800 rounded truncate">
                  {process.env.SUPABASE_SERVICE_ROLE_KEY ? '*** Set ***' : 'Not set'}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <a
            href="https://supabase.com/docs/guides/database"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Database className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="font-semibold">Supabase Docs</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Learn how to manage your database
            </p>
          </a>

          <a
            href="/api/waitlist"
            target="_blank"
            className="block p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-purple-500/50 transition group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-semibold">API Test</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Check API endpoint status
            </p>
          </a>

          <button
            onClick={testDatabase}
            className="block p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-green-500/50 transition group text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Mail className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-semibold">Test Integration</h3>
            </div>
            <p className="text-gray-400 text-sm">
              Submit test data to database
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

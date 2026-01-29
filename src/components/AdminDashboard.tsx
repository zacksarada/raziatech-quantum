// src/components/AdminDashboard.tsx - FIXED VERSION
'use client'

import { useState, useEffect } from 'react'
import { 
  Download, Users, Mail, Building, Calendar, 
  Filter, Search, BarChart3, RefreshCw, 
  TrendingUp, Cpu, Shield, Globe, Zap,
  Eye, EyeOff, Trash2, Edit3, CheckCircle,
  AlertCircle, UserCheck, Database, Cloud,
  ArrowUpRight, ChevronRight, PieChart,
  Activity, Target, Clock, Sparkles
} from 'lucide-react'

interface Subscriber {
  id: number
  email: string
  name: string
  company: string
  role: string
  industry: string
  subscribed_at: string
  status: 'pending' | 'verified' | 'active'
  last_seen?: string
  signup_source?: string
}

interface ActivityItem {
  id: number
  email: string
  action: string
  timestamp: string
}

interface Stats {
  total: number
  today: number
  week: number
  month: number
  growth_rate: number
  unique_companies: number
  active_subscribers: number
  by_industry: Record<string, number>
  by_role: Record<string, number>
  by_source: Record<string, number>
  recent_activity: ActivityItem[]
}

interface ApiResponse {
  subscribers?: Subscriber[]
  recent_activity?: ActivityItem[]
}

export default function AdminDashboard() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [stats, setStats] = useState<Stats>({
    total: 0,
    today: 0,
    week: 0,
    month: 0,
    growth_rate: 0,
    unique_companies: 0,
    active_subscribers: 0,
    by_industry: {},
    by_role: {},
    by_source: {},
    recent_activity: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [selectedSubscribers, setSelectedSubscribers] = useState<number[]>([])
  const [showAnalytics, setShowAnalytics] = useState(true)

  useEffect(() => {
    fetchData()
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/waitlist?admin=true')
      if (response.ok) {
        const data: ApiResponse = await response.json()
        const subscribers = data.subscribers || []
        
        // Calculate stats
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        
        const todaySubs = subscribers.filter((s: Subscriber) => 
          new Date(s.subscribed_at) >= today
        )
        
        const weekSubs = subscribers.filter((s: Subscriber) => 
          new Date(s.subscribed_at) >= weekAgo
        )
        
        const monthSubs = subscribers.filter((s: Subscriber) => 
          new Date(s.subscribed_at) >= monthAgo
        )
        
        const companies = new Set(subscribers.map((s: Subscriber) => s.company))
        const activeSubs = subscribers.filter(s => s.status === 'active')
        
        const industries: Record<string, number> = {}
        const roles: Record<string, number> = {}
        const sources: Record<string, number> = {}
        
        subscribers.forEach((s: Subscriber) => {
          industries[s.industry] = (industries[s.industry] || 0) + 1
          roles[s.role] = (roles[s.role] || 0) + 1
          const source = s.signup_source || 'direct'
          sources[source] = (sources[source] || 0) + 1
        })
        
        // Growth rate calculation
        const growthRate = monthSubs.length > 0 
          ? Math.round((todaySubs.length / (monthSubs.length / 30)) * 100)
          : 0
        
        setStats({
          total: subscribers.length,
          today: todaySubs.length,
          week: weekSubs.length,
          month: monthSubs.length,
          growth_rate: Math.min(growthRate, 500), // Cap at 500%
          unique_companies: companies.size,
          active_subscribers: activeSubs.length,
          by_industry: industries,
          by_role: roles,
          by_source: sources,
          recent_activity: data.recent_activity || []
        })
        
        setSubscribers(subscribers)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const exportToCSV = () => {
    const headers = ['Email', 'Name', 'Company', 'Role', 'Industry', 'Status', 'Source', 'Date']
    const csvData = filteredSubscribers.map(sub => [
      sub.email,
      sub.name,
      sub.company,
      sub.role,
      sub.industry,
      sub.status,
      sub.signup_source || 'direct',
      new Date(sub.subscribed_at).toISOString()
    ])
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `quantum-waitlist-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportToJSON = () => {
    const data = {
      export_date: new Date().toISOString(),
      subscribers: filteredSubscribers,
      stats: stats
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `quantum-waitlist-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const toggleSelectSubscriber = (id: number) => {
    setSelectedSubscribers(prev => 
      prev.includes(id) 
        ? prev.filter(subId => subId !== id)
        : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedSubscribers.length === filteredSubscribers.length) {
      setSelectedSubscribers([])
    } else {
      setSelectedSubscribers(filteredSubscribers.map(s => s.id))
    }
  }

  const deleteSelected = async () => {
    if (!confirm(`Delete ${selectedSubscribers.length} subscribers?`)) return
    
    try {
      const response = await fetch('/api/admin/subscribers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedSubscribers })
      })
      
      if (response.ok) {
        setSubscribers(prev => prev.filter(s => !selectedSubscribers.includes(s.id)))
        setSelectedSubscribers([])
        fetchData()
      }
    } catch (error) {
      console.error('Error deleting subscribers:', error)
    }
  }

  const filteredSubscribers = subscribers.filter(sub => 
    (filterIndustry === 'all' || sub.industry === filterIndustry) &&
    (filterStatus === 'all' || sub.status === filterStatus) &&
    (search === '' || 
      sub.email.toLowerCase().includes(search.toLowerCase()) ||
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.company.toLowerCase().includes(search.toLowerCase()))
  )

  const industries = Array.from(new Set(subscribers.map(s => s.industry))).sort()
  const sources = Array.from(new Set(subscribers.map(s => s.signup_source || 'direct'))).sort()

  const StatusBadge = ({ status }: { status: string }) => {
    const config = {
      pending: { color: 'bg-yellow-500/20 text-yellow-400', icon: <Clock className="w-3 h-3" /> },
      verified: { color: 'bg-blue-500/20 text-blue-400', icon: <CheckCircle className="w-3 h-3" /> },
      active: { color: 'bg-green-500/20 text-green-400', icon: <UserCheck className="w-3 h-3" /> }
    }
    
    const cfg = config[status as keyof typeof config] || config.pending
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${cfg.color}`}>
        {cfg.icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 font-medium">Loading quantum dashboard...</p>
          <p className="text-gray-600 text-sm">Connecting to Supabase database</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-12 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center animate-quantum">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  Quantum Admin Dashboard
                </h1>
                <p className="text-gray-400 text-sm">Real-time monitoring and analytics</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchData}
              className="px-4 py-2.5 bg-gray-900/50 hover:bg-gray-800/50 rounded-xl flex items-center gap-2 transition-all hover:scale-105 border border-gray-800"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <div className="relative group">
              <button className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all hover:scale-105">
                <Download className="w-4 h-4" />
                Export
                <ChevronRight className="w-4 h-4 rotate-90" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-800 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <button
                  onClick={exportToCSV}
                  className="w-full px-4 py-3 text-left hover:bg-gray-800/50 rounded-xl flex items-center gap-2"
                >
                  <Database className="w-4 h-4" />
                  CSV Export
                </button>
                <button
                  onClick={exportToJSON}
                  className="w-full px-4 py-3 text-left hover:bg-gray-800/50 rounded-xl flex items-center gap-2"
                >
                  <Cloud className="w-4 h-4" />
                  JSON Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {showAnalytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50 quantum-glass group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Subscribers</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Users className="w-10 h-10 text-cyan-400/30 group-hover:text-cyan-400/50 transition-colors" />
              </div>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <TrendingUp className="w-4 h-4" />
                +{stats.today} today
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50 quantum-glass group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Active Companies</p>
                  <p className="text-3xl font-bold">{stats.unique_companies}</p>
                </div>
                <Building className="w-10 h-10 text-purple-400/30 group-hover:text-purple-400/50 transition-colors" />
              </div>
              <div className="text-sm text-gray-400">
                {Math.round((stats.unique_companies / stats.total) * 100)}% conversion
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50 quantum-glass group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Growth Rate</p>
                  <p className="text-3xl font-bold">{stats.growth_rate}%</p>
                </div>
                <Activity className="w-10 h-10 text-green-400/30 group-hover:text-green-400/50 transition-colors" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Sparkles className="w-4 h-4" />
                {stats.week} this week
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50 quantum-glass group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Active Users</p>
                  <p className="text-3xl font-bold">{stats.active_subscribers}</p>
                </div>
                <UserCheck className="w-10 h-10 text-blue-400/30 group-hover:text-blue-400/50 transition-colors" />
              </div>
              <div className="text-sm text-gray-400">
                {Math.round((stats.active_subscribers / stats.total) * 100)}% active rate
              </div>
            </div>
          </div>
        )}

        {/* Filters & Controls */}
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50 quantum-glass mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search quantum subscribers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All Industries</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-gray-900/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="active">Active</option>
                </select>
              </div>
              
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-gray-400" />
                <button
                  onClick={() => setViewMode(viewMode === 'table' ? 'cards' : 'table')}
                  className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white hover:bg-gray-800/50 transition-colors"
                >
                  {viewMode === 'table' ? 'Card View' : 'Table View'}
                </button>
              </div>
              
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white hover:bg-gray-800/50 transition-colors flex items-center gap-2"
              >
                {showAnalytics ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                Analytics
              </button>
            </div>
          </div>
          
          {selectedSubscribers.length > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-xl border border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-300">
                  {selectedSubscribers.length} subscribers selected
                </span>
              </div>
              <button
                onClick={deleteSelected}
                className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </button>
            </div>
          )}
        </div>

        {/* Data Display */}
        {viewMode === 'table' ? (
          <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-800/50 quantum-glass overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/30">
                  <tr>
                    <th className="py-4 px-6 text-left">
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.length === filteredSubscribers.length && filteredSubscribers.length > 0}
                        onChange={selectAll}
                        className="rounded border-gray-600 bg-gray-800"
                      />
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Name & Email</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Company & Role</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Industry</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Status</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Date</th>
                    <th className="py-4 px-6 text-left text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-800/20 transition-colors group">
                      <td className="py-4 px-6">
                        <input
                          type="checkbox"
                          checked={selectedSubscribers.includes(subscriber.id)}
                          onChange={() => toggleSelectSubscriber(subscriber.id)}
                          className="rounded border-gray-600 bg-gray-800"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-white">{subscriber.name}</div>
                          <div className="text-cyan-400 text-sm">{subscriber.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{subscriber.company}</span>
                        </div>
                        <div className="text-gray-400 text-sm mt-1">{subscriber.role}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-gray-300">
                          {subscriber.industry}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <StatusBadge status={subscriber.status} />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {new Date(subscriber.subscribed_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-gray-800/50 rounded-lg">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => toggleSelectSubscriber(subscriber.id)}
                            className="p-2 hover:bg-gray-800/50 rounded-lg"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredSubscribers.length === 0 && (
              <div className="py-16 text-center">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">No subscribers found</p>
                <p className="text-gray-600">
                  {search ? 'Try a different search query' : 'Start promoting your waitlist!'}
                </p>
              </div>
            )}
            
            {filteredSubscribers.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-800/50 flex justify-between items-center">
                <div className="text-gray-400 text-sm">
                  Showing {filteredSubscribers.length} of {subscribers.length} quantum subscribers
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-sm text-gray-400 hover:text-white">← Previous</button>
                  <span className="text-sm text-gray-400">Page 1 of 1</span>
                  <button className="text-sm text-gray-400 hover:text-white">Next →</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // Card View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredSubscribers.map((subscriber) => (
              <div 
                key={subscriber.id}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50 quantum-glass hover:border-cyan-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{subscriber.name}</h3>
                    <p className="text-cyan-400 text-sm">{subscriber.email}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedSubscribers.includes(subscriber.id)}
                    onChange={() => toggleSelectSubscriber(subscriber.id)}
                    className="rounded border-gray-600 bg-gray-800"
                  />
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{subscriber.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{subscriber.role}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{subscriber.industry}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                  <StatusBadge status={subscriber.status} />
                  <div className="text-gray-500 text-sm">
                    {new Date(subscriber.subscribed_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Charts */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Industry Distribution */}
          <div className="lg:col-span-2 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50 quantum-glass">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-cyan-400" />
                Industry Distribution
              </h3>
              <select className="bg-gray-900/50 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-white">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>
            </div>
            <div className="space-y-4">
              {Object.entries(stats.by_industry)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([industry, count], index) => (
                  <div key={industry} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-cyan-500' :
                        index === 1 ? 'bg-purple-500' :
                        index === 2 ? 'bg-green-500' :
                        'bg-gray-600'
                      }`} />
                      <span className="text-gray-300">{industry}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                          style={{ width: `${(count / stats.total) * 100}%` }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm w-10 text-right">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Source & Status */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50 quantum-glass">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Signup Sources
              </h3>
              <div className="space-y-3">
                {Object.entries(stats.by_source)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 4)
                  .map(([source, count]) => (
                    <div key={source} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{source}</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50 quantum-glass">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {stats.recent_activity.slice(0, 3).map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm text-white">{activity.action}</div>
                      <div className="text-xs text-gray-400">{activity.email}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Database Info */}
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-gray-800/50 quantum-glass">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              Database Information
            </h3>
            <a 
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-900/50 hover:bg-gray-800/50 rounded-xl flex items-center gap-2 transition-colors text-sm"
            >
              Open Supabase
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-900/30 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Table Size</div>
              <div className="text-xl font-bold text-white">{subscribers.length} rows</div>
            </div>
            <div className="p-4 bg-gray-900/30 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Data Size</div>
              <div className="text-xl font-bold text-white">
                {Math.round(subscribers.length * 0.5)} KB
              </div>
            </div>
            <div className="p-4 bg-gray-900/30 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Last Updated</div>
              <div className="text-xl font-bold text-white">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-800/50">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.open('/api/waitlist', '_blank')}
                className="px-4 py-2 bg-gray-900/50 hover:bg-gray-800/50 rounded-xl transition-colors text-sm"
              >
                Test API
              </button>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-xl transition-colors text-sm"
              >
                Backup Data
              </button>
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-xl transition-colors text-sm"
              >
                Force Sync
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
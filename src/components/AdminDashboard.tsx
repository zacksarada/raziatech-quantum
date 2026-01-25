'use client'

import { useState, useEffect } from 'react'
import { 
  Download, Users, Mail, Building, Calendar, 
  Filter, Search, BarChart3, RefreshCw 
} from 'lucide-react'

interface Subscriber {
  id: number
  email: string
  name: string
  company: string
  role: string
  industry: string
  subscribed_at: string
  status: string
}

interface Stats {
  total: number
  today: number
  unique_companies: number
  by_industry: Record<string, number>
  by_role: Record<string, number>
}

export default function AdminDashboard() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [stats, setStats] = useState<Stats>({
    total: 0,
    today: 0,
    unique_companies: 0,
    by_industry: {},
    by_role: {}
  })
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('all')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Fetch dari API khusus admin
      const response = await fetch('/api/admin/subscribers')
      if (response.ok) {
        const data = await response.json()
        setSubscribers(data.subscribers || [])
        setStats(data.stats || {
          total: 0,
          today: 0,
          unique_companies: 0,
          by_industry: {},
          by_role: {}
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      // Fallback: direct Supabase fetch untuk testing
      await fetchDirectFromSupabase()
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDirectFromSupabase = async () => {
    try {
      const response = await fetch('/api/waitlist?admin=true')
      if (response.ok) {
        const data = await response.json()
        // Process data untuk stats
        const today = new Date().toISOString().split('T')[0]
        const todaySubs = data.subscribers?.filter((s: Subscriber) => 
          s.subscribed_at.startsWith(today)
        ) || []
        
        const companies = new Set(data.subscribers?.map((s: Subscriber) => s.company) || [])
        const industries: Record<string, number> = {}
        const roles: Record<string, number> = {}
        
        data.subscribers?.forEach((s: Subscriber) => {
          industries[s.industry] = (industries[s.industry] || 0) + 1
          roles[s.role] = (roles[s.role] || 0) + 1
        })
        
        setStats({
          total: data.subscribers?.length || 0,
          today: todaySubs.length,
          unique_companies: companies.size,
          by_industry: industries,
          by_role: roles
        })
        
        setSubscribers(data.subscribers || [])
      }
    } catch (error) {
      console.error('Direct fetch failed:', error)
    }
  }

  const exportToCSV = () => {
    const headers = ['Email', 'Name', 'Company', 'Role', 'Industry', 'Date', 'Status']
    const csvData = subscribers
      .filter(sub => 
        (filterIndustry === 'all' || sub.industry === filterIndustry) &&
        (search === '' || 
          sub.email.toLowerCase().includes(search.toLowerCase()) ||
          sub.name.toLowerCase().includes(search.toLowerCase()) ||
          sub.company.toLowerCase().includes(search.toLowerCase()))
      )
      .map(sub => [
        sub.email,
        sub.name,
        sub.company,
        sub.role,
        sub.industry,
        new Date(sub.subscribed_at).toLocaleDateString(),
        sub.status
      ])
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `waitlist-export-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const filteredSubscribers = subscribers.filter(sub => 
    (filterIndustry === 'all' || sub.industry === filterIndustry) &&
    (search === '' || 
      sub.email.toLowerCase().includes(search.toLowerCase()) ||
      sub.name.toLowerCase().includes(search.toLowerCase()) ||
      sub.company.toLowerCase().includes(search.toLowerCase()))
  )

  const industries = Array.from(new Set(subscribers.map(s => s.industry))).sort()

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard data...</p>
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
            <h1 className="text-3xl font-bold mb-2">Waitlist Analytics Dashboard</h1>
            <p className="text-gray-400">
              Real-time monitoring of waitlist signups
              <span className="ml-2 px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded">
                Supabase Connected
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center gap-2 hover:opacity-90"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Stats Grid */}
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
              <p className="text-green-400 text-sm">
                +{stats.today} today
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Unique Companies</p>
                <p className="text-3xl font-bold">{stats.unique_companies}</p>
              </div>
              <Building className="w-10 h-10 text-purple-400 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Top Industry</p>
                <p className="text-xl font-bold">
                  {Object.entries(stats.by_industry).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                </p>
              </div>
              <BarChart3 className="w-10 h-10 text-green-400 opacity-50" />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                {Object.entries(stats.by_industry).sort((a, b) => b[1] - a[1])[0]?.[1] || 0} signups
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Avg. Growth/Day</p>
                <p className="text-3xl font-bold">
                  {Math.round(stats.total / 30)} {/* Assume 30 days */}
                </p>
              </div>
              <Mail className="w-10 h-10 text-yellow-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by email, name, or company..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterIndustry}
                  onChange={(e) => setFilterIndustry(e.target.value)}
                  className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white"
                >
                  <option value="all">All Industries</option>
                  {industries.map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-900/50 rounded-xl border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Name</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Email</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Company</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Role</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Industry</th>
                  <th className="py-4 px-6 text-left text-gray-300 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredSubscribers.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-gray-800/30 transition">
                    <td className="py-4 px-6">
                      <div className="font-medium">{subscriber.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-cyan-400">{subscriber.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        <span>{subscriber.company}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                        {subscriber.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-gray-800/50 rounded-full text-sm">
                        {subscriber.industry}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {new Date(subscriber.subscribed_at).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubscribers.length === 0 && (
            <div className="py-12 text-center">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">No subscribers found</p>
              <p className="text-gray-600 text-sm mt-2">
                {search ? 'Try a different search term' : 'Waitlist is empty'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredSubscribers.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-800 flex justify-between items-center">
              <div className="text-gray-400 text-sm">
                Showing {filteredSubscribers.length} of {subscribers.length} subscribers
              </div>
            </div>
          )}
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Industry Distribution */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h3 className="font-semibold mb-4">Industry Distribution</h3>
            <div className="space-y-3">
              {Object.entries(stats.by_industry)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([industry, count]) => (
                  <div key={industry} className="flex items-center justify-between">
                    <span className="text-gray-300">{industry}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500 rounded-full"
                          style={{ width: `${(count / stats.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-400 text-sm">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Role Distribution */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h3 className="font-semibold mb-4">Top Roles</h3>
            <div className="space-y-3">
              {Object.entries(stats.by_role)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([role, count]) => (
                  <div key={role} className="flex items-center justify-between">
                    <span className="text-gray-300">{role}</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                      {count}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-4">Database Management</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://supabase.com/dashboard/project/${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', '').replace('.supabase.co', '')}/editor`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
            >
              Open Supabase Editor
            </a>
            <button
              onClick={() => window.open('/api/waitlist', '_blank')}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
            >
              Test API Endpoint
            </button>
            <button
              onClick={exportToCSV}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
            >
              Backup to CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

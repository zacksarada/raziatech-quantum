'use client';

import { useEffect, useState } from 'react';
import { 
  Users, TrendingUp, Mail, Calendar, 
  BarChart3, Settings, Home, RefreshCw,
  Download, AlertCircle, Brain, Code, Building,
  PieChart, Filter, Briefcase, Globe, UserCheck,
  X, CheckCircle, Trash2
} from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  subscribed_at: string;
  status: string;
  company_size?: string | null;
  use_case?: string | null;
  // Fields from your API response
  position?: number;
  referral_code?: string;
  email_sent?: boolean;
  email_opened?: boolean;
}

interface Analytics {
  total_subscribers: number;
  today_signups: number;
  remaining_spots: number;
  emails_sent: number;
  emails_opened: number;
  open_rate: number;
  interest_distribution: Record<string, number>;
  daily_signups: Array<{ date: string; count: number }>;
}

interface DashboardData {
  success: boolean;
  data: Subscriber[];
  total: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  analytics: Analytics;
  timestamp: string;
}

export default function AdminPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [secret, setSecret] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const savedSecret = localStorage.getItem('admin_secret');
    if (savedSecret) {
      setSecret(savedSecret);
      fetchAdminData(savedSecret);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchAdminData = async (adminSecret?: string) => {
    try {
      setError(null);
      const currentSecret = adminSecret || secret;
      
      if (!currentSecret) {
        const inputSecret = prompt('Enter admin secret:');
        if (!inputSecret) {
          setLoading(false);
          return;
        }
        setSecret(inputSecret);
        localStorage.setItem('admin_secret', inputSecret);
        await fetchAdminData(inputSecret);
        return;
      }

      console.log('Fetching data with secret...');
      const response = await fetch(`/api/waitlist?secret=${currentSecret}&admin=true`);
      
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('admin_secret');
          setSecret('');
          setError('Unauthorized: Invalid admin secret');
          return;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setDashboardData(result);
      
    } catch (error: any) {
      console.error('Fetch error:', error);
      setError(error.message || 'Failed to fetch data');
      if (error.message.includes('Unauthorized')) {
        localStorage.removeItem('admin_secret');
        setSecret('');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber?')) return;
    
    try {
      const response = await fetch(`/api/waitlist?secret=${secret}&id=${id}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      
      if (result.success) {
        // Refresh data
        fetchAdminData(secret);
        setDeleteConfirm(null);
      } else {
        alert(result.error || 'Failed to delete subscriber');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting subscriber');
    }
  };

  const exportToCSV = () => {
    if (!dashboardData?.data || dashboardData.data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['ID', 'Email', 'Name', 'Role', 'Company', 'Industry', 'Status', 'Subscription Date', 'Position', 'Referral Code'];
    
    const csv = [
      headers.join(','),
      ...dashboardData.data.map(s => [
        s.id,
        `"${s.email}"`,
        `"${s.name}"`,
        `"${s.role}"`,
        `"${s.company || ''}"`,
        `"${s.industry || ''}"`,
        `"${s.status}"`,
        `"${s.subscribed_at}"`,
        s.position || 0,
        `"${s.referral_code || ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raziaquantum-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIndustryColor = (industry: string) => {
    const colors: Record<string, string> = {
      'Technology': 'bg-blue-100 text-blue-800',
      'Finance': 'bg-green-100 text-green-800',
      'Healthcare': 'bg-purple-100 text-purple-800',
      'Education': 'bg-yellow-100 text-yellow-800',
      'Manufacturing': 'bg-orange-100 text-orange-800',
      'Retail': 'bg-pink-100 text-pink-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    return colors[industry] || colors['Other'];
  };

  const getStatusIcon = (status: string) => {
    return status === 'confirmed' ? 
      <CheckCircle className="w-4 h-4 text-green-500" /> : 
      <X className="w-4 h-4 text-gray-400" />;
  };

  // Get unique industries for filter
  const industries = dashboardData?.data 
    ? Array.from(new Set(dashboardData.data.map(s => s.industry).filter(Boolean)))
    : [];

  // Filter subscribers
  const filteredSubscribers = dashboardData?.data?.filter(subscriber => {
    const matchesIndustry = selectedIndustry === 'all' || subscriber.industry === selectedIndustry;
    const matchesSearch = !searchTerm || 
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesIndustry && matchesSearch;
  }) || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
          <div className="flex items-center gap-3 text-red-600 mb-4">
            <AlertCircle size={24} />
            <h2 className="text-xl font-bold">Error Loading Dashboard</h2>
          </div>
          <p className="text-gray-700 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchAdminData();
              }}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('admin_secret');
                setSecret('');
                setError(null);
                setLoading(true);
              }}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              Reset & Login Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RaziaTech Quantum Admin Dashboard</h1>
              <p className="text-gray-600">
                {dashboardData?.analytics?.total_subscribers || 0} subscribers • 
                {dashboardData?.analytics?.remaining_spots || 1000} spots remaining
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => fetchAdminData()}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                <RefreshCw size={20} />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                disabled={!dashboardData?.data || dashboardData.data.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  !dashboardData?.data || dashboardData.data.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <Download size={20} />
                Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        {dashboardData?.analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Subscribers</p>
                  <p className="text-3xl font-bold">{dashboardData.analytics.total_subscribers}</p>
                </div>
                <Users className="text-blue-500" size={32} />
              </div>
              <p className="text-green-600 text-sm mt-2">
                +{dashboardData.analytics.today_signups} today
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Daily Signups</p>
                  <p className="text-3xl font-bold">{dashboardData.analytics.today_signups}</p>
                  <p className="text-gray-600 text-sm">last 24 hours</p>
                </div>
                <TrendingUp className="text-green-500" size={32} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Email Performance</p>
                  <p className="text-3xl font-bold">{dashboardData.analytics.open_rate}%</p>
                  <p className="text-gray-600 text-sm">open rate</p>
                </div>
                <Mail className="text-purple-500" size={32} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Remaining Spots</p>
                  <p className="text-3xl font-bold">{dashboardData.analytics.remaining_spots}</p>
                  <p className="text-gray-600 text-sm">out of 1000</p>
                </div>
                <Calendar className="text-orange-500" size={32} />
              </div>
            </div>
          </div>
        )}

        {/* Industry Filter & Search */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold">Waitlist Subscribers</h2>
              <p className="text-gray-600">Manage and filter your waitlist</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select 
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
                >
                  <option value="all">All Industries ({dashboardData?.data?.length || 0})</option>
                  {industries.map(industry => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by email, name, company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm w-full md:w-64"
                />
                <svg className="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscriber
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company & Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscribers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      <Users className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2">No subscribers found</p>
                      {searchTerm && (
                        <p className="text-sm">Try a different search term</p>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {subscriber.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {subscriber.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm text-gray-900">
                              {subscriber.company || 'No company'}
                            </div>
                            <div className="text-xs text-gray-500">
                              {subscriber.role}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getIndustryColor(subscriber.industry)}`}>
                          <Globe className="w-3 h-3 mr-1" />
                          {subscriber.industry}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {getStatusIcon(subscriber.status)}
                          <span className={`ml-2 text-sm ${
                            subscriber.status === 'confirmed' ? 'text-green-700' : 'text-gray-700'
                          }`}>
                            {subscriber.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(subscriber.subscribed_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => window.open(`mailto:${subscriber.email}`, '_blank')}
                            className="text-blue-600 hover:text-blue-900"
                            title="Send email"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(subscriber.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete subscriber"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {deleteConfirm === subscriber.id && (
                          <div className="absolute mt-2 bg-white border rounded-lg shadow-lg p-4 z-10">
                            <p className="text-sm mb-2">Delete this subscriber?</p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDeleteSubscriber(subscriber.id)}
                                className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {dashboardData?.pagination && dashboardData.pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-gray-700">
                Showing page {dashboardData.pagination.page} of {dashboardData.pagination.totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchAdminData(secret)}
                  disabled={dashboardData.pagination.page === 1}
                  className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => fetchAdminData(secret)}
                  disabled={dashboardData.pagination.page === dashboardData.pagination.totalPages}
                  className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Analytics Summary */}
        {dashboardData?.analytics && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Industry Distribution */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-4">Industry Distribution</h3>
              <div className="space-y-3">
                {Object.entries(
                  dashboardData.data.reduce((acc: Record<string, number>, sub) => {
                    const industry = sub.industry || 'Unknown';
                    acc[industry] = (acc[industry] || 0) + 1;
                    return acc;
                  }, {})
                ).map(([industry, count]) => {
                  const percentage = Math.round((count / dashboardData.data.length) * 100);
                  return (
                    <div key={industry} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{industry}</span>
                      <div className="flex items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className={`h-2 rounded-full ${getIndustryColor(industry).split(' ')[0]}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">
                          {count} ({percentage}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily Activity */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-4">Recent Signups (Last 7 Days)</h3>
              <div className="space-y-3">
                {dashboardData.analytics.daily_signups.map((day) => (
                  <div key={day.date} className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                    <div className="flex items-center">
                      <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ 
                            width: `${(day.count / Math.max(...dashboardData.analytics.daily_signups.map(d => d.count))) * 100}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8 text-right">{day.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => window.location.href = '/admin/analytics'}
              className="p-4 border rounded-lg hover:bg-gray-50 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">View Detailed Analytics</p>
                  <p className="text-sm text-gray-600">Charts, graphs & insights</p>
                </div>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
            </button>
            
            <button
              onClick={() => {
                localStorage.removeItem('admin_secret');
                window.location.href = '/admin';
              }}
              className="p-4 border rounded-lg hover:bg-gray-50 text-left"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Logout</p>
                  <p className="text-sm text-gray-600">Clear admin session</p>
                </div>
                <Settings className="w-5 h-5 text-gray-400" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
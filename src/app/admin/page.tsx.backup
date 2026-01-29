'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, TrendingUp, Mail, Calendar, 
  BarChart3, Settings, Home, RefreshCw,
  Download, AlertCircle
} from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed_at: string;
  referral_source: string;
  email_sent: boolean;
  referral_code?: string;
  referrer_code?: string | null;
  email_opened?: boolean;
  referral_count?: number;
}

interface Stats {
  total: number;
  today: number;
  week: number;
  month: number;
  growth: number;
}

export default function AdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    today: 0,
    week: 0,
    month: 0,
    growth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [secret, setSecret] = useState('');

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
      const response = await fetch(`/api/waitlist?secret=${currentSecret}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('API Response:', result);
      
      // Handle API errors
      if (result.error) {
        setError(`API Error: ${result.error}`);
        localStorage.removeItem('admin_secret');
        setSecret('');
        return;
      }

      let subscribersData: Subscriber[] = [];
      
      // Format 1: New format with success field
      if (result.success && Array.isArray(result.data)) {
        subscribersData = result.data;
        console.log('Using new format, found:', subscribersData.length, 'subscribers');
      } 
      // Format 2: Old format (direct array)
      else if (Array.isArray(result)) {
        subscribersData = result;
        console.log('Using old array format, found:', subscribersData.length, 'subscribers');
      }
      // Format 3: Raw format query param
      else if (result.format === 'raw' && Array.isArray(result.data)) {
        subscribersData = result.data;
      }
      else {
        console.error('Unexpected API response format:', result);
        setError('Unexpected API response format');
        return;
      }

      setSubscribers(subscribersData);
      calculateStats(subscribersData);
      
    } catch (error: any) {
      console.error('Fetch error:', error);
      setError(error.message || 'Failed to fetch data');
      localStorage.removeItem('admin_secret');
      setSecret('');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data: Subscriber[]) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const todayCount = data.filter(s => new Date(s.subscribed_at) >= today).length;
    const weekCount = data.filter(s => new Date(s.subscribed_at) >= weekAgo).length;
    const monthCount = data.filter(s => new Date(s.subscribed_at) >= monthAgo).length;

    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const yesterdayCount = data.filter(s => {
      const date = new Date(s.subscribed_at);
      return date >= new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()) && date < today;
    }).length;

    const growth = yesterdayCount > 0 ? Math.round((todayCount / yesterdayCount - 1) * 100) : (todayCount > 0 ? 100 : 0);

    setStats({
      total: data.length,
      today: todayCount,
      week: weekCount,
      month: monthCount,
      growth: Math.min(Math.max(growth, 0), 100), // Cap at 100%
    });
  };

  const exportToCSV = () => {
    if (subscribers.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['ID', 'Email', 'Name', 'Subscribed At', 'Referral Source', 'Email Sent', 'Email Opened', 'Referral Code', 'Referrer Code', 'Referral Count'];
    
    const csv = [
      headers.join(','),
      ...subscribers.map(s => [
        s.id,
        `"${s.email}"`,
        `"${s.name || ''}"`,
        `"${s.subscribed_at}"`,
        `"${s.referral_source || ''}"`,
        s.email_sent ? 'Yes' : 'No',
        s.email_opened ? 'Yes' : 'No',
        `"${s.referral_code || ''}"`,
        `"${s.referrer_code || ''}"`,
        s.referral_count || 0
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-export-${new Date().toISOString().split('T')[0]}.csv`;
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
              <h1 className="text-2xl font-bold text-gray-900">RaziaTech Quantum Admin</h1>
              <p className="text-gray-600">Manage waitlist subscribers</p>
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
                disabled={subscribers.length === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  subscribers.length === 0
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Total Subscribers</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <Users className="text-blue-500" size={32} />
            </div>
            <p className="text-green-600 text-sm mt-2">
              +{stats.today} today
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">This Week</p>
                <p className="text-3xl font-bold">{stats.week}</p>
                <p className="text-gray-600 text-sm">new signups</p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">This Month</p>
                <p className="text-3xl font-bold">{stats.month}</p>
              </div>
              <Calendar className="text-purple-500" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Growth Rate</p>
                <p className="text-3xl font-bold">{stats.growth}%</p>
                <p className="text-gray-600 text-sm">vs yesterday</p>
              </div>
              <BarChart3 className="text-orange-500" size={32} />
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/analytics" className="block">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BarChart3 className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Analytics</h3>
                  <p className="text-gray-600">Detailed metrics & reports</p>
                </div>
              </div>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{stats.total} Subscribers</h3>
                <p className="text-gray-600">Manage waitlist members</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Mail className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Status</h3>
                <p className="text-gray-600">
                  {subscribers.filter(s => s.email_sent).length} sent
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Subscribers Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
          <div className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Recent Subscribers</h2>
                <p className="text-gray-600">Latest waitlist signups</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {subscribers.length} total • {stats.today} today
                </span>
              </div>
            </div>
          </div>
          
          {subscribers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="mx-auto text-gray-300" size={48} />
              <p className="text-gray-500 mt-4">No subscribers yet</p>
              <p className="text-gray-400 text-sm">Subscribers will appear here when they join</p>
            </div>
          ) : (
            <div className="divide-y">
              {subscribers.slice(0, 10).map((subscriber) => (
                <div key={subscriber.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <p className="font-medium text-gray-900">{subscriber.email}</p>
                        {subscriber.referral_code && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            Ref: {subscriber.referral_code}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-gray-600 text-sm">
                          {subscriber.name || 'Anonymous'}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600 text-sm">
                          {formatDate(subscriber.subscribed_at)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        subscriber.email_sent 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {subscriber.email_sent ? 'Email Sent' : 'Pending'}
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {subscriber.referral_source || 'direct'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {subscribers.length > 10 && (
            <div className="px-6 py-4 border-t text-center">
              <p className="text-gray-600">
                Showing 10 of {subscribers.length} subscribers
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats & Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4">📈 Performance Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Daily Average:</span>
                <span className="font-semibold">{stats.week > 0 ? Math.round(stats.week / 7) : 0}/day</span>
              </div>
              <div className="flex justify-between">
                <span>Weekly Growth:</span>
                <span className="font-semibold text-green-600">+{stats.growth}%</span>
              </div>
              <div className="flex justify-between">
                <span>Target Progress:</span>
                <span className="font-semibold">{stats.total}/1000 ({(stats.total/10).toFixed(1)}%)</span>
              </div>
              <div className="pt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${Math.min(stats.total/10, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-4">🚀 Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => window.open('https://resend.com', '_blank')}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition flex items-center justify-between"
              >
                <span>📧 Configure Email Service</span>
                <span className="text-gray-400 text-sm">Resend</span>
              </button>
              <button 
                onClick={exportToCSV}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition flex items-center justify-between"
              >
                <span>📥 Export Full Dataset</span>
                <span className="text-gray-400 text-sm">CSV Format</span>
              </button>
              <button 
                onClick={() => {
                  localStorage.removeItem('admin_secret');
                  setSecret('');
                  setSubscribers([]);
                  setStats({ total: 0, today: 0, week: 0, month: 0, growth: 0 });
                }}
                className="w-full text-left p-3 border rounded-lg hover:bg-gray-50 transition flex items-center justify-between"
              >
                <span>🔐 Logout / Change Secret</span>
                <span className="text-gray-400 text-sm">Clear session</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
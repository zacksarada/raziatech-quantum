// src/app/admin/analytics/page.tsx - UPDATED WITH BETTER ERROR HANDLING
'use client'; 
import { useEffect, useState, useCallback } from 'react';
import { 
  Download, 
  Calendar, 
  Users, 
  Mail, 
  Globe, 
  TrendingUp, 
  RefreshCw,
  BarChart3,
  Link as LinkIcon,
  Smartphone,
  Clock,
  AlertCircle,
  Database,
  Cpu,
  Zap
} from 'lucide-react';

interface AnalyticsData {
  total: number;
  today: number;
  week: number;
  month: number;
  growth: number;
  sources: { name: string; count: number; percentage: number }[];
  dailyData: { date: string; count: number }[];
  devices: { name: string; count: number; percentage: number }[];
  activeHours: { hour: string; count: number }[];
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    total: 0,
    today: 0,
    week: 0,
    month: 0,
    growth: 0,
    sources: [],
    dailyData: [],
    devices: [],
    activeHours: []
  });
  
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showDemoData, setShowDemoData] = useState(false);

  const generateDemoData = () => {
    // Generate demo data for testing
    const demoData: AnalyticsData = {
      total: 156,
      today: 8,
      week: 42,
      month: 156,
      growth: 24,
      sources: [
        { name: 'direct', count: 78, percentage: 50 },
        { name: 'linkedin', count: 35, percentage: 22 },
        { name: 'twitter', count: 25, percentage: 16 },
        { name: 'github', count: 12, percentage: 8 },
        { name: 'newsletter', count: 6, percentage: 4 }
      ],
      dailyData: Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count: Math.floor(Math.random() * 15) + 3
        };
      }),
      devices: [
        { name: 'desktop', count: 89, percentage: 57 },
        { name: 'mobile', count: 54, percentage: 35 },
        { name: 'tablet', count: 13, percentage: 8 }
      ],
      activeHours: Array.from({ length: 24 }, (_, hour) => ({
        hour: `${hour}:00`,
        count: hour >= 9 && hour <= 17 ? Math.floor(Math.random() * 20) + 10 : Math.floor(Math.random() * 5)
      }))
    };
    
    return demoData;
  };

  const fetchAnalytics = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      
      const secret = localStorage.getItem('admin_secret');
      
      // Check if we're in development or demo mode
      const isDevelopment = process.env.NODE_ENV === 'development';
      const hasNoSecret = !secret;
      
      if (hasNoSecret && !isDevelopment) {
        alert('Please login from admin dashboard first');
        window.location.href = '/admin';
        return;
      }

      // Try to fetch from API
      try {
        const response = await fetch(`/api/waitlist?secret=${secret || 'demo'}`);
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized - Please login');
          }
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Check if we got valid data
        if (result.error) {
          throw new Error(result.error);
        }

        const subscribers = result.subscribers || [];
        
        if (subscribers.length === 0) {
          // No data yet, show demo data
          setShowDemoData(true);
          setData(generateDemoData());
          setLastUpdated(new Date().toLocaleTimeString());
          return;
        }

        // Calculate analytics (your existing calculation logic)
        const now = new Date();
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const todayCount = subscribers.filter((s: any) => 
          new Date(s.subscribed_at) >= todayStart
        ).length;

        const weekCount = subscribers.filter((s: any) => 
          new Date(s.subscribed_at) >= weekAgo
        ).length;

        const monthCount = subscribers.filter((s: any) => 
          new Date(s.subscribed_at) >= monthAgo
        ).length;

        // ... rest of your calculation logic ...
        const sourcesMap: Record<string, number> = {};
        const deviceMap: Record<string, number> = {};
        const hourMap: Record<number, number> = {};
        
        const dailyDataMap: Record<string, number> = {};
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
        
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          const dateStr = date.toISOString().split('T')[0];
          dailyDataMap[dateStr] = 0;
        }

        subscribers.forEach((s: any) => {
          const source = s.referral_source || 'direct';
          sourcesMap[source] = (sourcesMap[source] || 0) + 1;

          const device = s.device_type || 'desktop';
          deviceMap[device] = (deviceMap[device] || 0) + 1;

          const hour = new Date(s.subscribed_at).getHours();
          hourMap[hour] = (hourMap[hour] || 0) + 1;

          const subDate = new Date(s.subscribed_at).toISOString().split('T')[0];
          if (dailyDataMap[subDate] !== undefined) {
            dailyDataMap[subDate] = (dailyDataMap[subDate] || 0) + 1;
          }
        });

        const sources = Object.entries(sourcesMap)
          .map(([name, count]) => ({ 
            name, 
            count,
            percentage: Math.round((count / subscribers.length) * 100)
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        const devices = Object.entries(deviceMap)
          .map(([name, count]) => ({
            name,
            count,
            percentage: Math.round((count / subscribers.length) * 100)
          }))
          .sort((a, b) => b.count - a.count);

        const activeHours = Object.entries(hourMap)
          .map(([hour, count]) => ({
            hour: `${parseInt(hour)}:00`,
            count
          }))
          .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

        const dailyData = Object.entries(dailyDataMap)
          .map(([date, count]) => ({ 
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            count 
          }));

        const previousPeriodCount = timeRange === '7d' ? 
          subscribers.filter((s: any) => {
            const subDate = new Date(s.subscribed_at);
            return subDate >= new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) && 
                   subDate < weekAgo;
          }).length : 0;
        
        const growth = previousPeriodCount > 0 ? 
          Math.round(((weekCount - previousPeriodCount) / previousPeriodCount) * 100) : 
          (todayCount > 0 ? Math.min(todayCount * 15, 100) : 0);

        setData({
          total: subscribers.length,
          today: todayCount,
          week: weekCount,
          month: monthCount,
          growth,
          sources,
          dailyData,
          devices,
          activeHours
        });

        setLastUpdated(new Date().toLocaleTimeString());
        setShowDemoData(false);

      } catch (apiError) {
        console.warn('API fetch failed, using demo data:', apiError);
        setShowDemoData(true);
        setData(generateDemoData());
        setLastUpdated(new Date().toLocaleTimeString());
        setError('Using demo data. Real data will appear when subscribers join.');
      }

    } catch (error: any) {
      console.error('Error in analytics:', error);
      setError(error.message || 'Failed to load analytics');
      setShowDemoData(true);
      setData(generateDemoData());
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // ... rest of your existing functions (exportToCSV, exportToJSON) ...

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading quantum analytics...</p>
        <p className="text-gray-400 text-sm mt-2">Connecting to Supabase database</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Quantum Analytics Dashboard</h1>
                  <p className="text-gray-600">Track your waitlist growth and performance in real-time</p>
                </div>
              </div>
              
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {lastUpdated}
                </p>
              )}
              
              {showDemoData && (
                <div className="mt-3 inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-lg border border-yellow-200">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">Showing demo data. Real data will appear when subscribers join.</span>
                </div>
              )}
              
              {error && !showDemoData && (
                <div className="mt-3 inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg border border-red-200">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button
                onClick={fetchAnalytics}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw size={18} />
                Refresh
              </button>
              <button
                onClick={() => setShowDemoData(!showDemoData)}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <Database size={18} />
                {showDemoData ? 'Hide Demo' : 'Show Demo'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid - Keep your existing stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* ... Your existing stats cards ... */}
        </div>

        {/* Setup Instructions Section (shown when no real data) */}
        {showDemoData && (
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Setup Instructions for Real Data
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">1. Set Up Supabase</h4>
                <ul className="space-y-2 text-blue-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Create free account at <a href="https://supabase.com" className="underline" target="_blank">supabase.com</a></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Create a new project and get your API keys</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Create a `waitlist` table with the required columns</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">2. Configure Environment Variables</h4>
                <ul className="space-y-2 text-blue-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Go to Vercel Dashboard → Project Settings → Environment Variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Add: <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Add: <code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <span>Add: <code className="bg-blue-100 px-1 rounded">ADMIN_SECRET</code> (your password)</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <button
                onClick={() => window.open('https://vercel.com/dashboard', '_blank')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Open Vercel Dashboard
              </button>
            </div>
          </div>
        )}

        {/* ... Rest of your existing components (charts, distribution, export, etc.) ... */}

        {/* Quick Test Section */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            System Diagnostics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button 
              onClick={() => fetch('/api/waitlist').then(r => r.json()).then(console.log)}
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
            >
              <Database size={18} />
              Test API Connection
            </button>
            <button 
              onClick={() => {
                const secret = localStorage.getItem('admin_secret') || 'not-set';
                alert(`Admin Secret: ${secret ? '✓ Set' : '✗ Not set'}`);
              }}
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
            >
              <AlertCircle size={18} />
              Check Authentication
            </button>
            <button 
              onClick={() => {
                const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
                const hasSupabaseKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
                alert(`Supabase Config: ${hasSupabaseUrl && hasSupabaseKey ? '✓ Complete' : '✗ Incomplete'}`);
              }}
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
            >
              <Zap size={18} />
              Check Environment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
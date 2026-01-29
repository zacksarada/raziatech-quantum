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
  Clock
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

  const fetchAnalytics = useCallback(async () => {
    try {
      const secret = localStorage.getItem('admin_secret');
      if (!secret) {
        alert('Please login from admin dashboard first');
        window.location.href = '/admin';
        return;
      }

      const response = await fetch(`/api/waitlist?secret=${secret}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const subscribers = await response.json();

      // Calculate analytics
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

      // Calculate sources distribution
      const sourcesMap: Record<string, number> = {};
      const deviceMap: Record<string, number> = {};
      const hourMap: Record<number, number> = {};
      
      // Generate daily data for the selected time range
      const dailyDataMap: Record<string, number> = {};
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        dailyDataMap[dateStr] = 0;
      }

      subscribers.forEach((s: any) => {
        // Track sources
        const source = s.referral_source || 'direct';
        sourcesMap[source] = (sourcesMap[source] || 0) + 1;

        // Track devices
        const device = s.device_type || 'desktop';
        deviceMap[device] = (deviceMap[device] || 0) + 1;

        // Track hours
        const hour = new Date(s.subscribed_at).getHours();
        hourMap[hour] = (hourMap[hour] || 0) + 1;

        // Track daily counts
        const subDate = new Date(s.subscribed_at).toISOString().split('T')[0];
        if (dailyDataMap[subDate] !== undefined) {
          dailyDataMap[subDate] = (dailyDataMap[subDate] || 0) + 1;
        }
      });

      // Prepare sources data with percentages
      const sources = Object.entries(sourcesMap)
        .map(([name, count]) => ({ 
          name, 
          count,
          percentage: Math.round((count / subscribers.length) * 100)
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Prepare devices data
      const devices = Object.entries(deviceMap)
        .map(([name, count]) => ({
          name,
          count,
          percentage: Math.round((count / subscribers.length) * 100)
        }))
        .sort((a, b) => b.count - a.count);

      // Prepare active hours data
      const activeHours = Object.entries(hourMap)
        .map(([hour, count]) => ({
          hour: `${parseInt(hour)}:00`,
          count
        }))
        .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

      // Prepare daily data
      const dailyData = Object.entries(dailyDataMap)
        .map(([date, count]) => ({ 
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count 
        }));

      // Calculate growth percentage
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
    } catch (error) {
      console.error('Error fetching analytics:', error);
      alert('Failed to fetch analytics data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const exportToCSV = () => {
    const headers = ['Date', 'Total Subscribers', 'Daily Signups', 'Weekly Signups', 'Monthly Signups', 'Growth %'];
    const csvData = [
      [new Date().toISOString().split('T')[0], data.total, data.today, data.week, data.month, data.growth]
    ];
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const jsonData = {
      exportDate: new Date().toISOString(),
      analytics: data,
      summary: {
        averageDaily: data.week > 0 ? Math.round(data.week / 7) : 0,
        conversionRate: "100%",
        targetProgress: Math.round((data.total / 1000) * 100)
      }
    };
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading analytics...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your waitlist growth and performance in real-time</p>
              {lastUpdated && (
                <p className="text-sm text-gray-500 mt-1">
                  Last updated: {lastUpdated}
                </p>
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
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Subscribers</p>
                <p className="text-2xl font-bold mt-1">{data.total.toLocaleString()}</p>
                <p className="text-gray-600 text-sm mt-1">All-time signups</p>
              </div>
              <Users className="text-blue-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Today</p>
                <p className="text-2xl font-bold mt-1">{data.today}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp size={14} className="text-green-500 mr-1" />
                  <span className="text-green-600 text-sm">+{data.growth}%</span>
                </div>
              </div>
              <Calendar className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">This Week</p>
                <p className="text-2xl font-bold mt-1">{data.week}</p>
                <p className="text-gray-600 text-sm mt-1">
                  Avg: {data.week > 0 ? Math.round(data.week / 7) : 0}/day
                </p>
              </div>
              <TrendingUp className="text-purple-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold mt-1">{data.month}</p>
                <p className="text-gray-600 text-sm mt-1">
                  {Math.round((data.month / data.total) * 100)}% of total
                </p>
              </div>
              <BarChart3 className="text-orange-500" size={24} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Email Coverage</p>
                <p className="text-2xl font-bold mt-1">100%</p>
                <p className="text-gray-600 text-sm mt-1">All subscribers</p>
              </div>
              <Mail className="text-red-500" size={24} />
            </div>
          </div>
        </div>

        {/* Charts and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Daily Signups Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">📈 Daily Signups Trend</h2>
              <span className="text-sm text-gray-500">{timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : '90 days'}</span>
            </div>
            <div className="h-64">
              {data.dailyData.length > 0 ? (
                <div className="flex items-end h-48 gap-1 mt-4">
                  {data.dailyData.map((day, index) => {
                    const maxCount = Math.max(...data.dailyData.map(d => d.count));
                    const height = maxCount > 0 ? (day.count / maxCount) * 100 : 0;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all hover:opacity-80"
                          style={{ height: `${height}%` }}
                          title={`${day.date}: ${day.count} signups`}
                        />
                        <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                          {day.date}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">
                  No data available for the selected period
                </div>
              )}
            </div>
          </div>

          {/* Sources Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">🌐 Traffic Sources</h2>
            <div className="space-y-4">
              {data.sources.length > 0 ? data.sources.map((source, index) => (
                <div key={source.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-green-500' : 
                        index === 2 ? 'bg-purple-500' : 
                        index === 3 ? 'bg-orange-500' : 'bg-gray-300'
                      }`} />
                      <span className="capitalize font-medium">{source.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold mr-2">{source.count}</span>
                      <span className="text-gray-500 text-sm">({source.percentage}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-blue-500' : 
                        index === 1 ? 'bg-green-500' : 
                        index === 2 ? 'bg-purple-500' : 
                        index === 3 ? 'bg-orange-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
              )) : (
                <div className="text-gray-500 text-center py-4">No source data available</div>
              )}
            </div>
          </div>
        </div>

        {/* Device & Time Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Device Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Smartphone className="text-gray-500 mr-2" size={20} />
              <h2 className="text-xl font-semibold">📱 Device Distribution</h2>
            </div>
            <div className="space-y-4">
              {data.devices.length > 0 ? data.devices.map((device, index) => (
                <div key={device.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      device.name === 'mobile' ? 'bg-blue-100 text-blue-600' :
                      device.name === 'tablet' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {device.name === 'mobile' ? '📱' : device.name === 'tablet' ? '📱' : '💻'}
                    </div>
                    <div>
                      <span className="capitalize font-medium">{device.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{device.count}</div>
                    <div className="text-sm text-gray-500">{device.percentage}%</div>
                  </div>
                </div>
              )) : (
                <div className="text-gray-500 text-center py-4">No device data available</div>
              )}
            </div>
          </div>

          {/* Active Hours */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Clock className="text-gray-500 mr-2" size={20} />
              <h2 className="text-xl font-semibold">⏰ Peak Activity Hours</h2>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {Array.from({ length: 24 }).map((_, hour) => {
                const hourData = data.activeHours.find(h => parseInt(h.hour) === hour);
                const count = hourData?.count || 0;
                const maxCount = Math.max(...data.activeHours.map(h => h.count), 1);
                const intensity = Math.round((count / maxCount) * 100);
                
                return (
                  <div key={hour} className="text-center">
                    <div className="text-xs text-gray-500 mb-1">{hour}:00</div>
                    <div 
                      className={`w-full rounded-lg transition-all ${
                        intensity > 70 ? 'bg-green-500' :
                        intensity > 40 ? 'bg-green-400' :
                        intensity > 20 ? 'bg-green-300' :
                        'bg-green-100'
                      }`}
                      style={{ height: `${Math.max(intensity / 2, 4)}px` }}
                      title={`${hour}:00 - ${count} signups`}
                    />
                    <div className="text-xs font-medium mt-1">{count}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Export Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Export Analytics</h2>
              <p className="text-gray-600">Download comprehensive reports for further analysis</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-600 transition-all"
              >
                <Download size={18} />
                Export CSV
              </button>
              <button
                onClick={exportToJSON}
                className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Download size={18} />
                Export JSON
              </button>
            </div>
          </div>
        </div>

        {/* Insights & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
            <h3 className="font-semibold text-lg mb-4 text-blue-800">💡 Growth Insights</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Daily Average Growth:</span>
                <span className="font-semibold text-blue-900">
                  {data.week > 0 ? Math.round(data.week / 7) : 0} signups/day
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Weekly Growth Rate:</span>
                <span className={`font-semibold ${data.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {data.growth >= 0 ? '+' : ''}{data.growth}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Target Progress (1,000):</span>
                <span className="font-semibold text-blue-900">
                  {Math.round((data.total / 1000) * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-700">Top Source:</span>
                <span className="font-semibold text-blue-900 capitalize">
                  {data.sources[0]?.name || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
            <h3 className="font-semibold text-lg mb-4 text-green-800">🚀 Recommendations</h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Promote on {data.sources[0]?.name === 'direct' ? 'social media' : data.sources[0]?.name} channels to boost signups</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Launch referral program with existing {data.total} subscribers</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Target {1000 - data.total} more subscribers to reach goal</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Schedule announcements during peak hours (check activity chart)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4">⚡ Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => navigator.clipboard.writeText(window.location.origin + '/join')}
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
            >
              <LinkIcon size={18} />
              Copy Join Link
            </button>
            <button 
              onClick={() => window.location.href = '/admin/subscribers'}
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
            >
              <Users size={18} />
              View Subscribers
            </button>
            <button 
              onClick={() => window.location.href = 'mailto:?subject=Join%20Our%20Waitlist'}
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition-colors"
            >
              <Mail size={18} />
              Email Campaign
            </button>
            <button 
              onClick={fetchAnalytics}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 p-3 rounded-lg transition-colors"
            >
              <RefreshCw size={18} />
              Update Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
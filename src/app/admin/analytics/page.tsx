'use client';

import { useEffect, useState } from 'react';
import { Users, TrendingUp, Mail, Calendar, Download } from 'lucide-react';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    week: 0,
    month: 0,
    growth: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Simulated data - nanti integrasi dengan Supabase
    setStats({
      total: 24,
      today: 3,
      week: 15,
      month: 24,
      growth: 25,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">📊 Analytics Dashboard</h1>
      
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
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Today</p>
              <p className="text-3xl font-bold">{stats.today}</p>
              <p className="text-green-600 text-sm">+{stats.growth}%</p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">This Week</p>
              <p className="text-3xl font-bold">{stats.week}</p>
            </div>
            <Calendar className="text-purple-500" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Email Sent</p>
              <p className="text-3xl font-bold">{stats.total}</p>
              <p className="text-gray-600 text-sm">100% coverage</p>
            </div>
            <Mail className="text-orange-500" size={32} />
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Export Data</h2>
            <p className="text-gray-600">Download subscriber data for analysis</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">
            <Download size={20} />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}

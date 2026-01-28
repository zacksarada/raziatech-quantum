'use client';

import Link from 'next/link';
import { BarChart3, Users, Settings, Home } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="bg-white w-64 min-h-screen p-6 shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">RaziaTech Admin</h1>
          <p className="text-gray-600">Welcome back!</p>
        </div>

        <nav className="space-y-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-600">
            <Home size={20} />
            Dashboard
          </Link>
          
          <Link href="/admin/analytics" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            <BarChart3 size={20} />
            Analytics
          </Link>
          
          <Link href="/admin/subscribers" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            <Users size={20} />
            Subscribers
          </Link>
          
          <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
            <Settings size={20} />
            Settings
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-6xl">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">Total Subscribers</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div>
                  <p className="text-gray-600">Today's Signups</p>
                  <p className="text-3xl font-bold">3</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                  📧 Send Email Update
                </button>
                <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                  📊 View Analytics
                </button>
                <button className="w-full text-left p-3 border rounded-lg hover:bg-gray-50">
                  📥 Export Data
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border-b">
                <div>
                  <p className="font-medium">john@example.com</p>
                  <p className="text-sm text-gray-600">Joined just now</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">New</span>
              </div>
              <div className="flex justify-between items-center p-3 border-b">
                <div>
                  <p className="font-medium">sarah@company.com</p>
                  <p className="text-sm text-gray-600">30 minutes ago</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

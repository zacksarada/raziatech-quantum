import AdminDashboard from '@/components/AdminDashboard'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  // Simple protection - bisa diganti dengan NextAuth nanti
  if (process.env.NODE_ENV === 'production') {
    redirect('/')
  }

  return <AdminDashboard />
}

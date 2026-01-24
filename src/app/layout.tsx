// src/app/layout.tsx - UPDATE VERSION
import './globals.css'
import { Analytics } from '@vercel/analytics/react'  // <-- TAMBAH INI

export const metadata = {
  title: 'RaziaTech Quantum',
  description: 'Quantum Computing Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
        <Analytics />  {/* <-- TAMBAH INI */}
      </body>
    </html>
  )
}

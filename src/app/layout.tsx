import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RaziaTech Quantum - Quantum Computing Platform',
  description: 'Enterprise-grade quantum computing solutions with 128-qubit processors, quantum encryption, and real-time analytics.',
  keywords: ['quantum computing', 'quantum encryption', 'AI', 'enterprise technology', 'Indonesia'],
  openGraph: {
    title: 'RaziaTech Quantum',
    description: 'Transform your business with quantum computing',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}

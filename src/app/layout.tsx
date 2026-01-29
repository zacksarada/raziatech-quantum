// src/app/layout.tsx - SIMPLIFIED VERSION
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

// SEO Metadata
export const metadata = {
  title: {
    default: 'RaziaTech Quantum | Enterprise Quantum Computing Solutions',
    template: '%s | RaziaTech Quantum'
  },
  description: 'Leading Indonesian quantum computing provider. 128-Qubit processors, quantum-safe encryption, and real-time AI analytics for enterprises. Accelerate your digital transformation.',
  keywords: [
    'quantum computing',
    'enterprise AI',
    'quantum encryption',
    'Indonesia technology',
    'quantum processors',
    'cloud quantum',
    'quantum machine learning',
    'cybersecurity',
    'data analytics',
    'quantum software'
  ],
  authors: [{ name: 'RaziaTech Quantum' }],
  creator: 'RaziaTech Quantum',
  publisher: 'RaziaTech Quantum',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://raziaquantum.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://raziaquantum.com',
    title: 'RaziaTech Quantum | Enterprise Quantum Computing Solutions',
    description: 'Leading Indonesian quantum computing provider. 128-Qubit processors, quantum-safe encryption, and real-time AI analytics.',
    siteName: 'RaziaTech Quantum',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RaziaTech Quantum - Quantum Computing Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RaziaTech Quantum',
    description: 'Enterprise Quantum Computing Solutions',
    images: ['/twitter-image.png'],
    creator: '@RaziaTech',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Viewport settings
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "RaziaTech Quantum",
              "url": "https://raziaquantum.com",
              "logo": "https://raziaquantum.com/logo.png",
              "description": "Leading provider of quantum computing solutions for enterprises",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Indonesia"
              },
              "sameAs": [
                "https://twitter.com/RaziaTech",
                "https://linkedin.com/company/raziaquantum"
              ]
            })
          }}
        />
        
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      
      <body className={`
        ${inter.className}
        bg-black 
        text-white 
        antialiased 
        selection:bg-cyan-500/20
        selection:text-white
        overflow-x-hidden
        min-h-screen
        quantum-scrollbar
      `}>
        {/* Simple Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-1 z-50">
          <div id="scroll-progress" className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300" style={{ width: '0%' }} />
        </div>

        {children}
        
        {/* Scroll Progress Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const progressBar = document.getElementById('scroll-progress');
                if (progressBar) {
                  window.addEventListener('scroll', function() {
                    const totalHeight = document.body.scrollHeight - window.innerHeight;
                    const progress = (window.scrollY / totalHeight) * 100;
                    progressBar.style.width = progress + '%';
                  });
                }
              });
            `
          }}
        />
        
        {/* Error Boundary Fallback Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e.target.tagName === 'IMG') {
                  e.target.src = '/placeholder-image.png';
                }
              });
            `
          }}
        />
      </body>
    </html>
  )
}
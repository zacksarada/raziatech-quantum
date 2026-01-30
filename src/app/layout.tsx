// src/app/layout.tsx - UPDATED FOR DIGITAL PRODUCTS MARKETPLACE
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { CartProvider } from '@/contexts/CartContext'

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

// SEO Metadata - UPDATED FOR DIGITAL PRODUCTS
export const metadata = {
  title: {
    default: 'RaziaTech | Digital Products Marketplace',
    template: '%s | RaziaTech Marketplace'
  },
  description: 'Premium digital products marketplace for developers and creators. Sell and buy code templates, ebooks, services, and digital assets. Start your digital business today.',
  keywords: [
    'digital products',
    'code templates',
    'ebooks',
    'online courses',
    'affiliate marketing',
    'digital marketplace',
    'SaaS templates',
    'React templates',
    'Next.js templates',
    'digital downloads',
    'creator economy',
    'passive income'
  ],
  authors: [{ name: 'RaziaTech' }],
  creator: 'RaziaTech',
  publisher: 'RaziaTech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://raziatech-quantum.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://raziatech-quantum.vercel.app',
    title: 'RaziaTech | Digital Products Marketplace',
    description: 'Premium digital products marketplace for developers and creators',
    siteName: 'RaziaTech Marketplace',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RaziaTech Digital Products Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RaziaTech Marketplace',
    description: 'Digital Products for Developers & Creators',
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
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
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
              "@type": "WebSite",
              "name": "RaziaTech Digital Products Marketplace",
              "url": "https://raziatech-quantum.vercel.app",
              "description": "Marketplace for premium digital products, templates, and services",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://raziatech-quantum.vercel.app/products?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* E-commerce Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "RaziaTech",
              "url": "https://raziatech-quantum.vercel.app",
              "logo": "https://raziatech-quantum.vercel.app/logo.png",
              "description": "Digital products marketplace for developers and creators",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ID"
              },
              "sameAs": [
                "https://twitter.com/RaziaTech",
                "https://linkedin.com/company/razia-tech"
              ]
            })
          }}
        />
        
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      
      <body className={`
        ${inter.className}
        bg-white 
        text-gray-900 
        antialiased 
        selection:bg-blue-500/20
        selection:text-blue-900
        overflow-x-hidden
        min-h-screen
        flex flex-col
      `}>
        {/* Simple Scroll Progress Indicator */}
        <div className="fixed top-0 left-0 w-full h-0.5 z-50">
          <div id="scroll-progress" className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300" style={{ width: '0%' }} />
        </div>

        {/* Navigation - Will be created */}
        <Navigation />
        
        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Footer - Will be created */}
        <Footer />

        {/* Floating Cart Button (for mobile) */}
        <button
          id="floating-cart"
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-40 md:hidden"
          onClick={() => window.location.href = '/cart'}
          aria-label="View cart"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span id="cart-count" className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            0
          </span>
        </button>
        
        {/* Scroll Progress Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                // Scroll progress
                const progressBar = document.getElementById('scroll-progress');
                if (progressBar) {
                  window.addEventListener('scroll', function() {
                    const totalHeight = document.body.scrollHeight - window.innerHeight;
                    const progress = (window.scrollY / totalHeight) * 100;
                    progressBar.style.width = progress + '%';
                  });
                }
                
                // Cart count update
                function updateCartCount() {
                  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
                  const cartElement = document.getElementById('cart-count');
                  if (cartElement) {
                    cartElement.textContent = cartCount;
                    cartElement.style.display = cartCount > 0 ? 'flex' : 'none';
                  }
                }
                
                updateCartCount();
                window.addEventListener('storage', updateCartCount);
                
                // Floating cart visibility
                const floatingCart = document.getElementById('floating-cart');
                let lastScrollTop = 0;
                window.addEventListener('scroll', function() {
                  if (!floatingCart) return;
                  
                  const scrollTop = window.scrollY || document.documentElement.scrollTop;
                  
                  if (scrollTop > lastScrollTop) {
                    // Scrolling down
                    floatingCart.style.transform = 'translateY(100px)';
                  } else {
                    // Scrolling up
                    floatingCart.style.transform = 'translateY(0)';
                  }
                  lastScrollTop = scrollTop;
                });
              });
              
              // Error handling for images
              window.addEventListener('error', function(e) {
                if (e.target.tagName === 'IMG') {
                  e.target.src = '/placeholder-product.png';
                  e.target.alt = 'Product image not available';
                }
              });
            `
          }}
        />
      </body>
    </html>
  )
}
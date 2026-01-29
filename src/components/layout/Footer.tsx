// src/components/layout/Footer.tsx
'use client';

import { Heart, Zap, Mail, MapPin, Phone, Github, Twitter, Linkedin, ArrowUpRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
    setIsVisible(true)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/raziaquantum", label: "GitHub", color: "hover:text-gray-300" },
    { icon: Twitter, href: "https://twitter.com/raziaquantum", label: "Twitter", color: "hover:text-cyan-400" },
    { icon: Linkedin, href: "https://linkedin.com/company/raziaquantum", label: "LinkedIn", color: "hover:text-blue-400" },
    { icon: Mail, href: "mailto:contact@raziatech-quantum.com", label: "Email", color: "hover:text-red-400" },
  ]

  const quickLinks = [
    { label: "Technology", href: "/#technology" },
    { label: "Use Cases", href: "/#use-cases" },
    { label: "Pricing", href: "/pricing" },
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/api-docs" },
  ]

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Security", href: "/security" },
    { label: "Compliance", href: "/compliance" },
  ]

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "News", href: "/news" },
    { label: "Partners", href: "/partners" },
  ]

  return (
    <footer className="relative border-t border-gray-800/50 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Quantum Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="h-14 w-14 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center animate-quantum">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  RaziaTech Quantum
                </h3>
                <p className="text-sm text-cyan-400 font-medium mt-1">Enterprise Quantum Solutions</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Transforming Indonesian enterprises with quantum computing. 
              Accelerating innovation through quantum-powered solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-900/50 rounded-xl border border-gray-800 text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/10 group`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Quick Links
              </span>
              <ArrowUpRight className="w-4 h-4 text-gray-500" />
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                Company
              </span>
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  Legal
                </span>
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1 inline-flex items-center gap-2 group text-sm"
                    >
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 pt-4 border-t border-gray-800/50">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-white">Email</p>
                  <a 
                    href="mailto:contact@raziatech-quantum.com" 
                    className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    contact@raziatech-quantum.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 mt-1" />
                <div>
                  <p className="text-sm font-medium text-white">Location</p>
                  <p className="text-sm text-gray-400">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mb-12 p-8 rounded-2xl bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800/50 quantum-glass">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3 text-white">
              Stay Updated with Quantum Innovations
            </h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest in quantum computing, 
              industry insights, and exclusive updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-gray-900/70 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 quantum-btn relative overflow-hidden"
              >
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-gray-500 text-sm flex items-center justify-center md:justify-start gap-2">
              <span>© {currentYear} RaziaTech Quantum. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="text-gray-600">Quantum computing for Indonesia's future</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">All systems operational</span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
              <span>by the RaziaTech Quantum Team</span>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:scale-110 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 z-40 opacity-0 group hover:opacity-100"
          aria-label="Back to top"
        >
          <ArrowUpRight className="w-5 h-5 transform rotate-270" />
        </button>
      </div>

      {/* Quantum Circuit Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20"></div>
      
      {/* Floating Quantum Particles */}
      <div className="absolute bottom-20 left-1/4">
        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-50"></div>
      </div>
      <div className="absolute bottom-32 right-1/3">
        <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-30"></div>
      </div>
    </footer>
  )
}

// ChevronRight component for the links
const ChevronRight = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)
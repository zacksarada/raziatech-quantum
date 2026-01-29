// src/components/layout/Navigation.tsx
'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Zap, ArrowRight, ChevronDown, Sparkles, Shield, Cpu, Lock } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    {
      label: 'Technology',
      href: '/#technology',
      icon: <Cpu className="w-4 h-4" />,
      dropdown: [
        { label: 'Quantum Processors', href: '/technology/processors' },
        { label: 'Quantum Software', href: '/technology/software' },
        { label: 'Quantum Networks', href: '/technology/networks' },
        { label: 'Research & Development', href: '/technology/research' },
      ]
    },
    {
      label: 'Solutions',
      href: '/#solutions',
      icon: <Sparkles className="w-4 h-4" />,
      dropdown: [
        { label: 'Financial Services', href: '/solutions/finance' },
        { label: 'Healthcare & Pharma', href: '/solutions/healthcare' },
        { label: 'Logistics & Supply Chain', href: '/solutions/logistics' },
        { label: 'Cybersecurity', href: '/solutions/security' },
      ]
    },
    {
      label: 'Resources',
      href: '/resources',
      icon: <Shield className="w-4 h-4" />,
      dropdown: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Blog', href: '/blog' },
        { label: 'Whitepapers', href: '/whitepapers' },
      ]
    },
    {
      label: 'Pricing',
      href: '/pricing',
      icon: <Lock className="w-4 h-4" />
    }
  ]

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl shadow-black/50' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group relative z-50"
              onClick={() => setIsOpen(false)}
            >
              <div className="relative">
                <div className="h-10 w-10 lg:h-12 lg:w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center animate-quantum group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  RaziaTech Quantum
                </span>
                <span className="text-[10px] lg:text-xs text-cyan-400 font-medium tracking-wider">
                  ENTERPRISE QUANTUM SOLUTIONS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => (
                <div 
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white transition-all duration-300 group-hover:bg-gray-900/50 rounded-xl"
                  >
                    <span className="text-cyan-400 opacity-70 group-hover:opacity-100">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {item.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute left-0 top-full pt-2 w-64 animate-in fade-in slide-in-from-top-5 duration-300">
                      <div className="bg-gradient-to-b from-gray-900 to-black/95 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl shadow-black/50 p-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.label}
                            href={dropdownItem.href}
                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/30 rounded-xl transition-all duration-300 group/item"
                          >
                            <div className="h-2 w-2 bg-cyan-500 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                            <span className="flex-1 font-medium">{dropdownItem.label}</span>
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link 
                href="/login" 
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link href="/#waitlist">
                <button className="relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 group quantum-btn overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Join Waitlist
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg bg-gray-900/50 text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 pt-20 bg-black/95 backdrop-blur-xl">
          <div className="h-full overflow-y-auto">
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/50">
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 text-lg font-medium text-gray-300 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-cyan-400">{item.icon}</span>
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="p-1"
                      >
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`} />
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="ml-8 space-y-2 py-2 border-l border-gray-800">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block p-3 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 bg-cyan-500 rounded-full"></div>
                            {dropdownItem.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-6 border-t border-gray-800 space-y-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 px-4 text-center text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-colors font-medium">
                    Sign In
                  </button>
                </Link>
                <Link href="/#waitlist" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 quantum-btn relative overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Join Waitlist
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="pt-8 space-y-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-gray-900/50 to-black/50 border border-gray-800/50">
                  <p className="text-sm text-gray-400 mb-2">Need help?</p>
                  <p className="text-cyan-400 font-medium">contact@raziatech-quantum.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-40">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ 
            width: `${Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)}%` 
          }}
        />
      </div>
    </>
  )
}

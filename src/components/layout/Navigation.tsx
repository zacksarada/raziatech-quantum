'use client'

import { useState } from 'react'
import { Menu, X, Zap } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold text-white">RaziaTech Quantum</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition">Testimonials</a>
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:scale-105 transition-transform">
              Join Waitlist
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col gap-4 pt-4">
              <a href="#features" className="text-gray-300 hover:text-white">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white">Pricing</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white">Testimonials</a>
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold w-fit">
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

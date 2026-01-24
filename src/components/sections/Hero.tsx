// src/components/sections/Hero.tsx
'use client'

import { ArrowRight, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Quantum-Ready Platform</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              Transformasi Digital
            </span>
            <br />
            <span className="text-white">dengan Teknologi Kuantum</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            RaziaTech Quantum menghadirkan solusi komputasi kuantum revolusioner untuk 
            akselerasi bisnis dan transformasi digital perusahaan Anda.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]">
              Mulai Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-gray-800/50 border border-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-700/50 transition-all duration-300">
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Jadwalkan Demo
              </span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center p-4 rounded-lg bg-gray-900/30">
              <div className="text-2xl font-bold text-blue-400">1000x</div>
              <div className="text-sm text-gray-400">Lebih Cepat</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-900/30">
              <div className="text-2xl font-bold text-purple-400">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-900/30">
              <div className="text-2xl font-bold text-green-400">256-bit</div>
              <div className="text-sm text-gray-400">Quantum Safe</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-gray-900/30">
              <div className="text-2xl font-bold text-pink-400">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// src/components/sections/Hero.tsx
'use client'

import { Zap, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Quantum Computing untuk Masa Depan
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            RaziaTech Quantum menghadirkan solusi komputasi kuantum revolusioner untuk transformasi digital bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2">
              Mulai Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="bg-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition">
              Demo Produk
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

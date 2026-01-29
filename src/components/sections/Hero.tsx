// src/components/sections/optimized/Hero.tsx - PROVEN CONVERSION DESIGN
'use client'

import { useState, useEffect } from 'react'
import { 
  ArrowRight, Zap, Sparkles, Brain, Code, GraduationCap, 
  Users, Rocket, CheckCircle, Shield, Clock, TrendingUp 
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    // Animated counter for social proof
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev < 2847) {
          return prev + Math.ceil(2847 / 50) // Animate to 2847 in 2 seconds
        }
        return prev
      })
    }, 40)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-gray-950 via-black to-gray-950">
      {/* Particle Background */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{ 
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              opacity: 0 
            }}
            animate={{ 
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Top Trust Bar - LIKE STRIPE/DUB.CO */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-green-400">Live Platform</span>
              </div>
              <span className="text-gray-500 mx-2">•</span>
              <span className="text-xs text-gray-400">No waiting list</span>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white">{count.toLocaleString()}+ developers</span>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white">94% completion rate</span>
            </div>
          </div>
          
          {/* Main Content Grid - LIKE MIDJOURNEY/VERCEL */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Headline & CTA */}
            <div>
              {/* Badge - LIKE VERCEL */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 rounded-full mb-8 border border-blue-800/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <Code className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-sm font-semibold text-blue-300">The Future of Learning is Human+AI</span>
              </motion.div>
              
              {/* Headline - LIKE LINEAR */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight"
              >
                <span className="block text-white mb-3">
                  Quantum Programming
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-size-200">
                  Made Accessible
                </span>
              </motion.h1>
              
              {/* Subtitle - LIKE NOTION */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed"
              >
                Go from zero to quantum hero with AI-powered tutorials, 
                real IBM Quantum hardware access, and a community of 
                <span className="text-white font-medium"> 2,847+ developers</span>.
              </motion.p>
              
              {/* CTA Buttons - LIKE RAYCAST */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-bold text-white hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/10 to-purple-600/0 animate-shimmer" />
                  <span className="relative z-10">Start Learning Free</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group px-8 py-4 rounded-xl font-semibold text-gray-300 hover:text-white border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:scale-[1.02]">
                  <Rocket className="w-5 h-5" />
                  <span>Watch Demo (2 min)</span>
                </button>
              </motion.div>
              
              {/* Social Proof - LIKE CAL.COM */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8"
              >
                <p className="text-sm text-gray-500 mb-4">Trusted by developers at</p>
                <div className="flex flex-wrap items-center gap-6">
                  {['Google', 'Microsoft', 'IBM', 'MIT', 'Stanford'].map((company, i) => (
                    <div key={i} className="text-gray-400 hover:text-white transition-colors cursor-default">
                      {company}
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Features List - LIKE GITHUB COPILOT */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-4"
              >
                {[
                  { icon: CheckCircle, text: "No quantum physics degree required", color: "text-green-500" },
                  { icon: Clock, text: "Build your first quantum app in 30 days", color: "text-blue-500" },
                  { icon: Shield, text: "Run code on real IBM quantum processors", color: "text-purple-500" },
                  { icon: Zap, text: "AI explains quantum concepts in plain English", color: "text-yellow-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Right Column - Interactive Preview - LIKE FIGMA/CODE SANDBOX */}
            <div className="relative">
              {/* Interactive Card - LIKE V0.DEV */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 overflow-hidden shadow-2xl shadow-blue-500/10"
              >
                {/* Card Header */}
                <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-sm text-gray-500">quantum_circuit.py</div>
                </div>
                
                {/* Code Preview */}
                <div className="p-6 font-mono text-sm">
                  <div className="text-gray-500"># Your first quantum circuit</div>
                  <div className="text-purple-400">from</div>
                  <div className="text-blue-400 ml-4">qiskit</div>
                  <div className="text-purple-400 ml-4">import</div>
                  <div className="text-yellow-400">QuantumCircuit</div>
                  <br />
                  <div className="text-gray-400"># Create a quantum circuit with 2 qubits</div>
                  <div className="text-blue-400">qc</div>
                  <div className="text-gray-300"> = </div>
                  <div className="text-yellow-400">QuantumCircuit</div>
                  <div className="text-gray-300">(</div>
                  <div className="text-green-400">2</div>
                  <div className="text-gray-300">)</div>
                  <br />
                  <div className="text-gray-400"># Add a Hadamard gate to create superposition</div>
                  <div className="text-blue-400">qc</div>
                  <div className="text-gray-300">.</div>
                  <div className="text-yellow-400">h</div>
                  <div className="text-gray-300">(</div>
                  <div className="text-green-400">0</div>
                  <div className="text-gray-300">)</div>
                </div>
                
                {/* Live Preview */}
                <div className="px-6 pb-6">
                  <div className="text-xs text-gray-500 mb-2">LIVE PREVIEW</div>
                  <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                    <div className="flex items-center justify-center gap-8 mb-4">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mb-2">
                          |0⟩
                        </div>
                        <div className="text-xs text-gray-400">Qubit 0</div>
                      </div>
                      <div className="text-2xl text-gray-600">→</div>
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mb-2">
                          |+⟩
                        </div>
                        <div className="text-xs text-gray-400">Superposition</div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-gray-400">
                      H gate applied • 50% |0⟩ + 50% |1⟩
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Elements - LIKE MIDJOURNEY */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✨ AI-Powered
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                ⚡ Live Results
              </motion.div>
            </div>
          </div>
          
          {/* Bottom Stats - LIKE GUMROAD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-20 pt-10 border-t border-gray-800/50"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "4.9/5", label: "Student Rating", icon: Sparkles, color: "from-yellow-500 to-orange-500" },
                { value: "30 days", label: "To First App", icon: Clock, color: "from-blue-500 to-cyan-500" },
                { value: "100%", label: "Job Relevance", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
                { value: "$0", label: "Free to Start", icon: GraduationCap, color: "from-purple-500 to-pink-500" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Add to globals.css */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  )
}
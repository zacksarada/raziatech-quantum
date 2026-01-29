// src/app/page.tsx - QUANTUM ENHANCED VERSION
'use client';

import { 
  ArrowRight, Zap, Sparkles, Cpu, ShieldCheck, 
  LineChart, Globe, Brain, Server, ChevronRight,
  Users, Clock, BarChart3, Lock, Cloud,
  Rocket, Target, Gem, Award, Star
} from 'lucide-react'
import WaitlistForm from '@/components/WaitlistForm'
import { useEffect, useState } from 'react'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [spotsRemaining, setSpotsRemaining] = useState(87)

  useEffect(() => {
    // Animation trigger
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    // Scroll progress
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const features = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "128-Qubit Quantum Processor",
      description: "Enterprise-grade quantum processing dengan error correction terdepan untuk komputasi yang stabil dan akurat",
      stats: "1000x faster",
      color: "from-cyan-500 to-blue-500",
      gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
      delay: "0"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Quantum-Safe Encryption",
      description: "Enkripsi post-quantum 256-bit dengan algoritma lattice-based untuk keamanan masa depan",
      stats: "Unhackable",
      color: "from-purple-500 to-pink-500",
      gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
      delay: "100"
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: "Real-Time Quantum Analytics",
      description: "Analisis data kompleks secara real-time dengan AI kuantum untuk insights instan",
      stats: "Real-time",
      color: "from-green-500 to-emerald-500",
      gradient: "linear-gradient(135deg, #10b981, #059669)",
      delay: "200"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Quantum Network",
      description: "Akses ke 12 data center quantum worldwide dengan latensi terendah",
      stats: "Global",
      color: "from-orange-500 to-red-500",
      gradient: "linear-gradient(135deg, #f97316, #ef4444)",
      delay: "300"
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Quantum Machine Learning",
      description: "Algoritma ML kuantum untuk prediksi akurat dan optimasi kompleks",
      stats: "AI-Powered",
      color: "from-indigo-500 to-violet-500",
      gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      delay: "400"
    },
    {
      icon: <Server className="w-8 h-8" />,
      title: "Hybrid Quantum-Classical",
      description: "Platform hybrid untuk transisi bertahap dari komputasi klasik ke kuantum",
      stats: "Hybrid",
      color: "from-yellow-500 to-amber-500",
      gradient: "linear-gradient(135deg, #eab308, #f59e0b)",
      delay: "500"
    }
  ]

  const testimonials = [
    {
      name: "Dr. Ahmad Wijaya",
      role: "CTO, Bank Nasional Indonesia",
      content: "RaziaTech Quantum mengubah cara kami melakukan risk analysis. 100x lebih cepat dari sistem sebelumnya.",
      rating: 5,
      icon: "🏦"
    },
    {
      name: "Sarah Putri",
      role: "Head of R&D, Telkom Indonesia",
      content: "Platform quantum mereka membantu kami optimize jaringan 5G dengan efisiensi belum pernah terjadi.",
      rating: 5,
      icon: "📡"
    },
    {
      name: "Michael Chen",
      role: "CEO, GoTo Logistics",
      content: "Route optimization dengan quantum computing mengurangi biaya logistik kami sebesar 30%.",
      rating: 5,
      icon: "🚚"
    }
  ]

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Quantum Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrollProgress > 5 ? 'bg-black/90 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-12 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center animate-quantum">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-lg opacity-30"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  RaziaTech Quantum
                </span>
                <div className="text-xs text-cyan-400 font-medium tracking-wider">ENTERPRISE QUANTUM SOLUTIONS</div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <a href="#technology" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 hover:text-cyan-400">Technology</a>
              <a href="#use-cases" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 hover:text-cyan-400">Use Cases</a>
              <a href="#waitlist" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 hover:text-cyan-400">Waitlist</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 hover:text-cyan-400">Contact</a>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#waitlist">
                <button className="relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 flex items-center gap-2 group quantum-btn overflow-hidden">
                  <span className="relative z-10">Join Waitlist</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-40 px-4 overflow-hidden">
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="quantum-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className={`inline-flex items-center gap-3 bg-gray-900/50 px-5 py-3 rounded-full mb-8 border border-gray-800 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-sm font-medium text-cyan-300 tracking-wide">QUANTUM-READY PLATFORM • LIMITED BETA ACCESS</span>
            </div>
            
            {/* Main Headline */}
            <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-gradient-x">
                Quantum Computing
              </span>
              <span className="block text-white mt-6">for Indonesian Enterprises</span>
            </h1>
            
            {/* Subtitle */}
            <p className={`text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Transform your business with enterprise-grade quantum solutions. 
              From financial optimization to logistics planning, we deliver 
              <span className="text-cyan-400 font-semibold mx-2">1000x faster computation</span> 
              with quantum advantage.
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-20 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <a href="#waitlist" className="group">
                <button className="relative px-12 py-5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-2xl shadow-cyan-500/30 quantum-btn overflow-hidden">
                  <span className="relative z-10">Join Waitlist</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </a>
              <a href="#demo" className="group">
                <button className="px-12 py-5 bg-gray-900/50 text-white font-semibold rounded-xl border-2 border-gray-700 hover:border-cyan-500 transition-all duration-300 text-lg backdrop-blur-sm group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Schedule Demo
                  </span>
                </button>
              </a>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { 
                  value: '128-Qubit', 
                  label: 'Quantum Processor', 
                  icon: '⚡',
                  color: 'text-cyan-400',
                  bg: 'from-cyan-500/10 to-cyan-500/5'
                },
                { 
                  value: '99.9%', 
                  label: 'Uptime SLA', 
                  icon: '🔄',
                  color: 'text-green-400',
                  bg: 'from-green-500/10 to-green-500/5'
                },
                { 
                  value: '256-bit', 
                  label: 'Quantum Encryption', 
                  icon: '🔒',
                  color: 'text-purple-400',
                  bg: 'from-purple-500/10 to-purple-500/5'
                },
                { 
                  value: '24/7', 
                  label: 'Expert Support', 
                  icon: '👨‍💻',
                  color: 'text-pink-400',
                  bg: 'from-pink-500/10 to-pink-500/5'
                }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-8 rounded-3xl bg-gradient-to-b ${stat.bg} backdrop-blur-sm border border-gray-800/50 hover:border-${stat.color.split('-')[1]}-500/50 transition-all duration-500 group hover:scale-105 hover:shadow-2xl hover:shadow-${stat.color.split('-')[1]}-500/20 ${
                    isVisible ? `opacity-100 translate-y-0` : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 600}ms` }}
                >
                  <div className={`text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>{stat.icon}</div>
                  <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm text-gray-400 tracking-wide font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="technology" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Enterprise <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Quantum Technology</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Built for scalability, security, and performance. Our platform delivers 
              quantum advantage for your most complex business challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-b from-gray-900/20 to-black/20 p-8 rounded-3xl border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 quantum-glass"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className="relative mb-6">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  <span className="text-xs font-semibold bg-gray-800/50 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {feature.stats}
                  </span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-800/30">
                  <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 group/btn">
                    Learn more
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                  <div className="text-xs text-gray-500 font-mono">Q{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-32 px-4 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full mb-6 border border-gray-800">
              <Target className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">REAL-WORLD APPLICATIONS</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Transform Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Business</span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Quantum computing solving real business challenges across industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "💳",
                title: "Financial Services",
                description: "Risk analysis, portfolio optimization, fraud detection with quantum algorithms",
                metrics: "100x faster risk analysis"
              },
              {
                icon: "🚚",
                title: "Logistics & Supply Chain",
                description: "Route optimization, inventory management, supply chain resilience",
                metrics: "30% cost reduction"
              },
              {
                icon: "💊",
                title: "Pharmaceutical Research",
                description: "Drug discovery, molecular simulation, protein folding",
                metrics: "Years reduced to months"
              },
              {
                icon: "🌱",
                title: "Agriculture & Food Security",
                description: "Crop optimization, climate modeling, supply chain efficiency",
                metrics: "40% yield improvement"
              },
              {
                icon: "🏭",
                title: "Manufacturing",
                description: "Production optimization, quality control, predictive maintenance",
                metrics: "50% less downtime"
              },
              {
                icon: "🛡️",
                title: "Cybersecurity",
                description: "Quantum-safe encryption, threat detection, network security",
                metrics: "Unbreakable encryption"
              }
            ].map((useCase, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-900/30 to-black/30 p-8 rounded-3xl border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/10 quantum-glass group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{useCase.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                <p className="text-gray-400 mb-6">{useCase.description}</p>
                <div className="text-sm font-semibold text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-full inline-block">
                  {useCase.metrics}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full mb-6 border border-gray-800">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-300">TRUSTED BY INDUSTRY LEADERS</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              What Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Clients Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-900/30 to-black/30 p-8 rounded-3xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-500 hover:scale-105 quantum-glass group"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-3xl">{testimonial.icon}</div>
                  <div>
                    <h4 className="text-xl font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-32 px-4 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-cyan-900/20 px-5 py-3 rounded-full mb-8 border border-cyan-800/50 backdrop-blur-sm">
                <Rocket className="w-5 h-5 text-cyan-400 animate-bounce-soft" />
                <span className="text-sm font-medium text-cyan-300 tracking-wide">LIMITED EARLY ACCESS • JOIN THE QUANTUM REVOLUTION</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Join the <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 animate-gradient-x">Quantum Revolution</span>
              </h2>
              
              <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
                Be among the first 100 enterprises to access RaziaTech Quantum.
                Exclusive early access includes priority onboarding, special pricing,
                and direct influence on our product roadmap.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-8 border border-gray-800/50 quantum-glass">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Reserve Your Spot</h3>
                      <p className="text-gray-400">Early adopters get exclusive benefits</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400">{spotsRemaining}</div>
                      <div className="text-sm text-gray-400">spots remaining</div>
                    </div>
                  </div>
                  <WaitlistForm />
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                {[
                  {
                    icon: "🎯",
                    title: "Priority Access",
                    description: "First in line for platform access with dedicated onboarding support",
                    color: "text-cyan-400",
                    bg: "from-cyan-500/10 to-cyan-500/5"
                  },
                  {
                    icon: "💰",
                    title: "Special Pricing",
                    description: "Exclusive rates locked in for 24 months for early adopters",
                    color: "text-purple-400",
                    bg: "from-purple-500/10 to-purple-500/5"
                  },
                  {
                    icon: "💡",
                    title: "Influence Roadmap",
                    description: "Direct input on feature development and priority requests",
                    color: "text-green-400",
                    bg: "from-green-500/10 to-green-500/5"
                  },
                  {
                    icon: "👨‍💼",
                    title: "Dedicated Support",
                    description: "24/7 access to quantum experts and technical support team",
                    color: "text-pink-400",
                    bg: "from-pink-500/10 to-pink-500/5"
                  }
                ].map((benefit, index) => (
                  <div 
                    key={index}
                    className={`bg-gradient-to-br ${benefit.bg} p-6 rounded-2xl border border-gray-800/50 hover:border-${benefit.color.split('-')[1]}-500/30 transition-all duration-300 hover:scale-105 quantum-glass`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`text-2xl ${benefit.color}`}>{benefit.icon}</div>
                      <div>
                        <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                        <p className="text-gray-400 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Touch</span>
              </h2>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto">
                Interested in quantum solutions for your business? 
                Contact us for a consultation with our quantum experts.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-gray-900/30 to-black/30 rounded-3xl p-8 border border-gray-800/50 quantum-glass">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: <Mail className="w-6 h-6" />,
                      title: "Email",
                      content: "contact@raziatech-quantum.com",
                      sub: "Response within 24 hours"
                    },
                    {
                      icon: <Users className="w-6 h-6" />,
                      title: "Sales Team",
                      content: "+62 21 1234 5678",
                      sub: "Available Mon-Fri, 9AM-6PM WIB"
                    },
                    {
                      icon: <Globe className="w-6 h-6" />,
                      title: "Location",
                      content: "Jakarta, Indonesia",
                      sub: "Serving enterprises across Indonesia"
                    },
                    {
                      icon: <Clock className="w-6 h-6" />,
                      title: "Support Hours",
                      content: "24/7 Quantum Support",
                      sub: "Round-the-clock technical assistance"
                    }
                  ].map((info, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-800/20 transition-colors">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
                        <div className="text-cyan-400">{info.icon}</div>
                      </div>
                      <div>
                        <div className="font-semibold mb-1">{info.title}</div>
                        <div className="text-gray-300 mb-1">{info.content}</div>
                        <div className="text-sm text-gray-500">{info.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900/30 to-black/30 rounded-3xl p-8 border border-gray-800/50 quantum-glass">
                <h3 className="text-2xl font-bold mb-6">Schedule a Consultation</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Company</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your quantum computing needs..."
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 quantum-btn relative overflow-hidden"
                  >
                    <span className="relative z-10">Send Message</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 hover:opacity-100 transition-opacity"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12 px-4 bg-black">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="h-12 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Zap className="h-7 w-7 text-white" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-lg opacity-20"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                    RaziaTech Quantum
                  </span>
                  <div className="text-sm text-cyan-400 font-medium">Indonesia's Quantum Pioneer</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Enterprise quantum computing solutions for Indonesian businesses.
                Transforming complexity into opportunity with quantum technology.
              </p>
              <div className="flex gap-4">
                {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="text-gray-500 hover:text-white transition-all duration-300 hover:scale-110 hover:text-cyan-400"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            {['Quick Links', 'Resources', 'Legal'].map((category, index) => (
              <div key={category}>
                <h4 className="text-lg font-bold mb-4 text-white">{category}</h4>
                <ul className="space-y-2 text-gray-400">
                  {category === 'Quick Links' ? (
                    <>
                      <li><a href="#technology" className="hover:text-white transition hover:text-cyan-400">Technology</a></li>
                      <li><a href="#use-cases" className="hover:text-white transition hover:text-cyan-400">Use Cases</a></li>
                      <li><a href="#waitlist" className="hover:text-white transition hover:text-cyan-400">Waitlist</a></li>
                      <li><a href="#contact" className="hover:text-white transition hover:text-cyan-400">Contact</a></li>
                    </>
                  ) : category === 'Resources' ? (
                    <>
                      <li><a href="#" className="hover:text-white transition hover:text-cyan-400">Documentation</a></li>
                      <li><a href="#" className="hover:text-white transition hover:text-cyan-400">API Reference</a></li>
                      <li><a href="#" className="hover:text-white transition hover:text-cyan-400">Blog</a></li>
                      <li><a href="#" className="hover:text-white transition hover:text-cyan-400">Newsletter</a></li>
                    </>
                  ) : (
                    <>
                      <li><a href="#" className="hover:text-white transition hover:text-cyan-400">Privacy Policy</a></li>
                      <li><a href="#" className="hover:text-white transition hover:text-cyan-400">Terms of Service</a></li>
                      <li><a href="#" className="hover:text-white transition hover:text-cyan-400">Cookie Policy</a></li>
                      <li><a href="#" className="hover:text-white transition hover:text-cyan-400">Security</a></li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} RaziaTech Quantum. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Made with ⚡ for the quantum future
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

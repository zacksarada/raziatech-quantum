// src/app/page.tsx - ULTIMATE VERSION
import { 
  ArrowRight, Shield, Zap, Globe, Cpu, BarChart, 
  Lock, Users, Clock, Award, ChevronRight, Sparkles,
  Server, Key, LineChart, Cloud, ShieldCheck, Brain
} from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "128-Qubit Quantum Processor",
      description: "Enterprise-grade quantum processing dengan error correction terdepan",
      stats: "1000x faster",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Quantum-Safe Encryption",
      description: "Enkripsi post-quantum 256-bit untuk keamanan masa depan",
      stats: "Unhackable",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: "Real-Time Quantum Analytics",
      description: "Analisis data kompleks secara real-time dengan AI kuantum",
      stats: "Real-time",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Quantum Network",
      description: "Akses ke 12 data center quantum worldwide",
      stats: "Global",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Quantum Machine Learning",
      description: "Algoritma ML kuantum untuk prediksi akurat",
      stats: "AI-Powered",
      color: "from-indigo-500 to-violet-500"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Hybrid Quantum-Classical",
      description: "Platform hybrid untuk transisi bertahap",
      stats: "Hybrid",
      color: "from-yellow-500 to-amber-500"
    }
  ]

  const testimonials = [
    {
      name: "Bank Neo Commerce",
      role: "CTO",
      content: "Optimasi portfolio kami meningkat 300% dengan quantum computing.",
      avatar: "BN"
    },
    {
      name: "Telkom Indonesia",
      role: "Head of Innovation",
      content: "Route optimization mengurangi biaya logistik kami 40%.",
      avatar: "TI"
    },
    {
      name: "Pertamina",
      role: "Data Science Director",
      content: "Prediksi maintenance equipment menjadi 95% akurat.",
      avatar: "PT"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                  RaziaTech Quantum
                </span>
                <div className="text-xs text-cyan-400 font-medium">ENTERPRISE QUANTUM SOLUTIONS</div>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <a href="#solutions" className="text-gray-300 hover:text-white transition hover:scale-105">Solutions</a>
              <a href="#technology" className="text-gray-300 hover:text-white transition hover:scale-105">Technology</a>
              <a href="#industries" className="text-gray-300 hover:text-white transition hover:scale-105">Industries</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition hover:scale-105">Pricing</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition hover:scale-105">Contact</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="hidden md:block px-5 py-2 text-gray-300 hover:text-white transition">
                Sign In
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 flex items-center gap-2 group">
                <span>Join Waitlist</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full mb-8 border border-gray-800">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Quantum-Ready Platform Launch</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                Quantum Computing
              </span>
              <span className="block text-white mt-4">for Indonesian Enterprises</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Transform your business with enterprise-grade quantum solutions. 
              From financial optimization to logistics planning, we deliver 
              <span className="text-cyan-400 font-semibold"> 1000x faster computation</span> with quantum advantage.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="group px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-2xl shadow-cyan-500/20">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-10 py-4 bg-gray-900/50 text-white font-semibold rounded-xl border-2 border-gray-700 hover:border-cyan-500 transition-all duration-300 text-lg backdrop-blur-sm">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Schedule Enterprise Demo
                </span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: '128-Qubit', label: 'Quantum Processor', icon: '⚡' },
                { value: '99.9%', label: 'Uptime SLA', icon: '🔄' },
                { value: '256-bit', label: 'Quantum Encryption', icon: '🔒' },
                { value: '24/7', label: 'Expert Support', icon: '👨‍💻' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border border-gray-800 hover:border-cyan-500/50 transition-all group">
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="technology" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Quantum Technology</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Built for scalability, security, and performance. Our platform delivers 
              quantum advantage for your most complex business challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-gradient-to-b from-gray-900/30 to-black/30 p-8 rounded-3xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}>
                  {feature.icon}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <span className="text-xs font-semibold bg-gray-800 px-3 py-1 rounded-full">
                    {feature.stats}
                  </span>
                </div>
                <p className="text-gray-400 mb-6">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="text-xs text-gray-500">Q{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Industry Leaders</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Join 50+ enterprises that have transformed their operations with 
              RaziaTech Quantum solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-900/50 to-black/50 p-8 rounded-3xl border border-gray-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl flex items-center justify-center text-xl font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{testimonial.name}</div>
                    <div className="text-cyan-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 italic mb-6">"{testimonial.content}"</p>
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust Logos */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-6 gap-8 opacity-50">
            {['BCA', 'Mandiri', 'Telkom', 'Pertamina', 'Tokopedia', 'Gojek'].map((logo, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-2xl font-bold text-gray-400">{logo}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-12 border border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready for <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Quantum Transformation</span>?
            </h2>
            
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Join the quantum revolution. Get started with a free trial or 
              schedule a personalized demo with our quantum experts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-transform text-lg shadow-2xl shadow-cyan-500/30">
                Start 30-Day Free Trial
              </button>
              <button className="px-12 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-gray-700 hover:border-cyan-500 transition-colors text-lg">
                Contact Quantum Experts
              </button>
            </div>
            
            <p className="text-gray-500 text-sm mt-8">
              No credit card required • Enterprise SLA included • 24/7 support
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 bg-black">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">RaziaTech Quantum</span>
                  <div className="text-sm text-cyan-400">Indonesia's Quantum Pioneer</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Enterprise quantum computing solutions for Indonesian businesses. 
                Transforming complexity into opportunity.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'YouTube'].map((social) => (
                  <a key={social} href="#" className="text-gray-500 hover:text-white transition">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            {['Product', 'Solutions', 'Resources', 'Company'].map((section) => (
              <div key={section}>
                <h4 className="text-lg font-bold mb-4 text-white">{section}</h4>
                <ul className="space-y-2 text-gray-400">
                  {Array(4).fill(0).map((_, i) => (
                    <li key={i}>
                      <a href="#" className="hover:text-white transition">{section} Link {i + 1}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} RaziaTech Quantum. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
              <a href="#" className="hover:text-white transition">Compliance</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

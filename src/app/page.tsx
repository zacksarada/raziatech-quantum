// src/app/page.tsx - SIMPLIFIED VERSION
import { 
  ArrowRight, Zap, Sparkles, Cpu, ShieldCheck, 
  LineChart, Globe, Brain, Server, ChevronRight 
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
              <a href="#technology" className="text-gray-300 hover:text-white transition hover:scale-105">Technology</a>
              <a href="#solutions" className="text-gray-300 hover:text-white transition hover:scale-105">Solutions</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition hover:scale-105">Contact</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 flex items-center gap-2 group">
                <span>Contact Sales</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-900/50 px-4 py-2 rounded-full mb-8 border border-gray-800">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Quantum-Ready Platform</span>
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
                  Schedule Demo
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

      {/* Simple Contact Section */}
      <section id="contact" className="py-24 px-4 bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Touch</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Interested in quantum solutions for your business? 
              Contact us for a consultation.
            </p>
            
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-8 border border-gray-800">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-4">Contact Info</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-cyan-400 font-semibold">Email</div>
                      <div className="text-gray-300">contact@raziatech-quantum.com</div>
                    </div>
                    <div>
                      <div className="text-cyan-400 font-semibold">Location</div>
                      <div className="text-gray-300">Jakarta, Indonesia</div>
                    </div>
                    <div>
                      <div className="text-cyan-400 font-semibold">Business Hours</div>
                      <div className="text-gray-300">Mon-Fri, 9AM-6PM WIB</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
                  <div className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <textarea 
                      placeholder="Your message" 
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 bg-black">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">RaziaTech Quantum</span>
                  <div className="text-sm text-cyan-400">Indonesia's Quantum Pioneer</div>
                </div>
              </div>
              <p className="text-gray-400">
                Enterprise quantum computing solutions for Indonesian businesses.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#technology" className="hover:text-white transition">Technology</a></li>
                <li><a href="#solutions" className="hover:text-white transition">Solutions</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 hover:text-white transition">LinkedIn</a>
                <a href="#" className="text-gray-500 hover:text-white transition">Twitter</a>
                <a href="#" className="text-gray-500 hover:text-white transition">GitHub</a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} RaziaTech Quantum. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

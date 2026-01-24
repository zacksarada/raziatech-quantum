// src/app/page.tsx
import { ArrowRight, Shield, Zap, Globe, Cpu, BarChart, Lock, Users, Clock, Award, ChevronRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                RaziaTech Quantum
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#solutions" className="text-gray-300 hover:text-white transition">Solutions</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
            </div>
            <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2">
              <span>Join Waitlist</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full mb-8 border border-gray-700">
              <span className="text-cyan-400">✨</span>
              <span className="text-sm">Quantum-Ready Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                Transformasi Digital
              </span>
              <span className="block text-white">dengan Teknologi Kuantum</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Enterprise-grade quantum computing solutions dengan processor 128-qubit, 
              enkripsi kuantum, dan analitik real-time untuk percepatan bisnis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="group px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg">
                <span>Join Waitlist - Free Early Access</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-4 bg-gray-800/50 text-white font-semibold rounded-xl border-2 border-gray-700 hover:border-cyan-500 transition-all duration-300 text-lg">
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  View Product Demo
                </span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { value: '1000x', label: 'Faster Processing', color: 'text-cyan-400' },
                { value: '128-Qubit', label: 'Quantum Processor', color: 'text-purple-400' },
                { value: '99.9%', label: 'Uptime SLA', color: 'text-green-400' },
                { value: '256-bit', label: 'Quantum Safe', color: 'text-pink-400' }
              ].map((stat, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800">
                  <div className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Quantum <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Features</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Teknologi kuantum terdepan untuk menyelesaikan masalah bisnis yang paling kompleks
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-8 h-8" />,
                title: "128-Qubit Processor",
                desc: "Processor kuantum dengan error correction terbaik di industri",
                gradient: "from-cyan-500 to-blue-500",
                features: ["Quantum Supremacy", "Error Correction", "Parallel Processing"]
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Quantum Encryption",
                desc: "Enkripsi post-quantum yang tahan serangan komputer kuantum",
                gradient: "from-purple-500 to-pink-500",
                features: ["256-bit Security", "Zero Trust", "Quantum Key Distribution"]
              },
              {
                icon: <BarChart className="w-8 h-8" />,
                title: "Real-time Analytics",
                desc: "Analisis data kompleks secara real-time dengan AI kuantum",
                gradient: "from-green-500 to-emerald-500",
                features: ["Predictive Analytics", "Quantum ML", "Big Data Processing"]
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Global Network",
                desc: "12 data center worldwide dengan jaringan kuantum terdedikasi",
                gradient: "from-orange-500 to-red-500",
                features: ["Low Latency", "Global Coverage", "Multi-region"]
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Enterprise Ready",
                desc: "Solusi yang sudah teruji untuk perusahaan besar",
                gradient: "from-indigo-500 to-violet-500",
                features: ["SLA 99.9%", "24/7 Support", "Custom Solutions"]
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Compliance Certified",
                desc: "Memenuhi standar keamanan dan regulasi internasional",
                gradient: "from-yellow-500 to-amber-500",
                features: ["ISO 27001", "GDPR", "HIPAA Compliant"]
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-gray-900/30 p-8 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 mb-6">{feature.desc}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300">
                      <ChevronRight className="w-4 h-4 text-cyan-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-12 border border-gray-800">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Siap Bertransformasi dengan <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Quantum?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Bergabunglah dengan 500+ perusahaan yang sudah menggunakan RaziaTech Quantum untuk akselerasi bisnis mereka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-12 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-transform text-lg">
                Start Free Trial
              </button>
              <button className="px-12 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-gray-700 hover:border-cyan-500 transition-colors text-lg">
                Contact Sales
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-6">No credit card required • Free for 30 days</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold">RaziaTech Quantum</span>
              </div>
              <p className="text-gray-400">
                Enterprise quantum computing solutions for the future.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Solutions</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} RaziaTech Quantum. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-white transition">Twitter</a>
              <a href="#" className="text-gray-500 hover:text-white transition">LinkedIn</a>
              <a href="#" className="text-gray-500 hover:text-white transition">GitHub</a>
              <a href="#" className="text-gray-500 hover:text-white transition">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

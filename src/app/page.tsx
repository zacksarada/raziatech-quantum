import { Zap, Shield, Cpu, Globe } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full">
            <Zap className="h-5 w-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300">QUANTUM COMPUTING PLATFORM</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              RaziaTech Quantum
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Enterprise-grade quantum computing solutions with 128-qubit processors, 
            quantum encryption, and real-time analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform">
              Join Waitlist
            </button>
            <button className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 hover:border-cyan-500 transition-colors">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Quantum <span className="text-cyan-400">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: 'Quantum Encryption',
                desc: 'Unbreakable security using quantum key distribution'
              },
              {
                icon: <Cpu className="h-8 w-8" />,
                title: '128-Qubit Processor',
                desc: 'High-performance quantum computing power'
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: 'Real-time Analytics',
                desc: 'Process petabytes with sub-millisecond latency'
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: 'Global Network',
                desc: 'Quantum mesh network across 10+ cities'
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '208+', label: 'Devices Connected' },
              { value: '98.7%', label: 'Uptime' },
              { value: '10+', label: 'Cities Covered' },
              { value: '24/7', label: 'Monitoring' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready for Quantum Computing?
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Join the waitlist and be the first to experience the power of quantum computing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

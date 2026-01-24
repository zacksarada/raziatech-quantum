export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg" />
              <span className="text-xl font-bold">RaziaTech Quantum</span>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-semibold">
              Join Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              RaziaTech Quantum 🚀
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
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

      {/* Features */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quantum Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Quantum Encryption', '128-Qubit Processor', 'Real-time Analytics'].map((feature, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-2">{feature}</h3>
                <p className="text-gray-400">Advanced quantum computing capabilities</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>© 2024 RaziaTech Quantum. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

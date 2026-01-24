// src/components/sections/Features.tsx
import { Cpu, Shield, Zap, Globe, BarChart, Lock } from 'lucide-react'

const features = [
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Quantum Processing",
    description: "Processor 128-qubit dengan error correction terdepan di industri",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Quantum-Safe Security",
    description: "Enkripsi post-quantum yang tahan terhadap serangan komputer kuantum",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Pemrosesan data kompleks dalam milidetik dengan algoritma kuantum",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Network",
    description: "Akses ke jaringan kuantum global melalui 12 data center worldwide",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: "AI Quantum",
    description: "Machine learning kuantum untuk prediksi dan optimisasi bisnis",
    gradient: "from-red-500 to-rose-500"
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Compliance Ready",
    description: "Memenuhi standar keamanan ISO 27001, GDPR, dan regulasi lainnya",
    gradient: "from-indigo-500 to-violet-500"
  }
]

export default function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Teknologi <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Masa Depan</span> untuk Bisnis Anda
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Platform kuantum terlengkap dengan fitur-fitur canggih untuk memecahkan masalah bisnis paling kompleks
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-gray-900/30 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} mb-4`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <button className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

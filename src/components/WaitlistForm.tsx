// src/components/WaitlistForm.tsx - UPDATED VERSION
'use client'

import { useState } from 'react'
import { Send, CheckCircle, Brain, Code, Rocket } from 'lucide-react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [interest, setInterest] = useState('learning') // Default to learning
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          name,
          referral_source: 'website',
          interest // Send interest to API
        }),
      })

      const data = await response.json()
      
      if (data.success) {
        setSubmitted(true)
        setEmail('')
        setName('')
        // Track conversion
        console.log('Waitlist signup successful:', data)
      } else {
        alert(data.error || 'Something went wrong')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to submit. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center p-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">You're on the list! 🎉</h3>
        <p className="text-gray-300 mb-4">
          Welcome to the quantum learning community! We'll email you when early access begins.
        </p>
        <div className="text-sm text-gray-400">
          Check your inbox for confirmation
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          Join Quantum Learning Platform
        </h3>
        <p className="text-gray-400">
          Get early access to tutorials, AI assistant, and IBM Quantum hardware.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What interests you most?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            {[
              { id: 'learning', label: 'Learning', icon: Brain, color: 'from-blue-500 to-cyan-500' },
              { id: 'development', label: 'Development', icon: Code, color: 'from-purple-500 to-pink-500' },
              { id: 'enterprise', label: 'Enterprise', icon: Rocket, color: 'from-green-500 to-emerald-500' }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setInterest(option.id)}
                className={`p-3 rounded-xl border-2 transition-all ${
                  interest === option.id 
                    ? `border-white bg-gradient-to-r ${option.color}`
                    : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
                }`}
              >
                <option.icon className={`w-5 h-5 mx-auto mb-2 ${
                  interest === option.id ? 'text-white' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  interest === option.id ? 'text-white' : 'text-gray-400'
                }`}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name (Optional)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Join Early Access
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          By joining, you agree to our Terms and Privacy Policy. 
          No spam, ever.
        </p>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [industry, setIndustry] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In production, replace with actual API call:
    // await fetch('/api/waitlist', { method: 'POST', body: JSON.stringify({ email, company, industry }) })
    
    console.log('Submitted:', { email, company, industry })
    setSubmitted(true)
    setLoading(false)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
      setCompany('')
      setIndustry('')
    }, 3000)
  }

  return (
    <div className="max-w-md mx-auto">
      {submitted ? (
        <div className="text-center p-8 rounded-2xl bg-gradient-to-b from-green-900/20 to-emerald-900/20 border border-green-800">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-gray-300">
            We've added <span className="font-semibold text-green-400">{email}</span> to our waitlist.
          </p>
          <p className="text-gray-400 mt-2 text-sm">We'll contact you soon about early access.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Work Email *
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="you@company.com"
            />
          </div>
          
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Your company"
            />
          </div>
          
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
              Industry
            </label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            >
              <option value="">Select your industry</option>
              <option value="finance">Banking & Finance</option>
              <option value="telco">Telecommunications</option>
              <option value="logistics">Logistics & Supply Chain</option>
              <option value="energy">Energy & Utilities</option>
              <option value="healthcare">Healthcare</option>
              <option value="ecommerce">E-commerce & Retail</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="government">Government</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <span>Join Waitlist for Early Access</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            By joining, you agree to receive updates about RaziaTech Quantum.
            No spam, unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { Send, CheckCircle, Loader2, AlertCircle, Users } from 'lucide-react'

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    company: '',
    role: '',
    industry: '',
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [remainingSpots, setRemainingSpots] = useState(0)
  const [totalSubscribers, setTotalSubscribers] = useState(0)

  const industries = [
    'Banking & Finance',
    'Telecommunications',
    'Logistics & Supply Chain',
    'Healthcare & Biotech',
    'Energy & Utilities',
    'E-commerce & Retail',
    'Manufacturing',
    'Government',
    'Technology',
    'Other'
  ]

  // Fetch initial data
  useEffect(() => {
    fetchWaitlistStats()
  }, [])

  const fetchWaitlistStats = async () => {
    try {
      const response = await fetch('/api/waitlist')
      if (response.ok) {
        const data = await response.json()
        setTotalSubscribers(data.total_subscribers || 0)
        // Calculate remaining spots (misal total 1000 spots)
        const maxSpots = 1000
        setRemainingSpots(Math.max(0, maxSpots - (data.total_subscribers || 0)))
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err)
      // Default values if API fails
      setRemainingSpots(247)
      setTotalSubscribers(753)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name.trim()) {
      setError('Name is required')
      return
    }
    
    if (!formData.email.trim()) {
      setError('Email is required')
      return
    }
    
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address')
      return
    }
    
    if (!formData.company.trim()) {
      setError('Company name is required')
      return
    }
    
    if (!formData.role.trim()) {
      setError('Role is required')
      return
    }
    
    if (!formData.industry) {
      setError('Please select your industry')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          // Email already exists
          setError(result.message || 'This email is already on our waitlist!')
          return
        }
        throw new Error(result.error || 'Failed to submit form')
      }

      // Success
      console.log('Waitlist submission successful:', result)
      
      // Update stats
      fetchWaitlistStats()
      
      setIsSuccess(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({
          email: '',
          name: '',
          company: '',
          role: '',
          industry: '',
        })
      }, 5000)
      
    } catch (err) {
      console.error('Submission error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/10 to-emerald-900/10"></div>
        
        <div className="relative p-8 rounded-2xl border border-green-800/30 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Welcome to the Quantum Revolution!
            </h3>
            
            <p className="text-gray-300 mb-2">
              Thank you <span className="font-semibold text-green-400">{formData.name}</span>!
            </p>
            
            <p className="text-gray-400 mb-4">
              We've added <span className="font-semibold text-cyan-300">{formData.email}</span> to our exclusive waitlist.
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700">
              <Users className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">
                You're number <span className="font-bold text-white">{totalSubscribers + 1}</span> on the list
              </span>
            </div>
            
            <p className="text-sm text-gray-500 mt-6">
              We'll contact you soon about early access opportunities.
              Check your email for confirmation.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Banner */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-gray-900/30 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <Users className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Subscribers</p>
              <p className="text-2xl font-bold text-white">{totalSubscribers}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-gray-900/30 border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <AlertCircle className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Spots Remaining</p>
              <p className="text-2xl font-bold text-white">{remainingSpots}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 rounded-xl bg-red-900/20 border border-red-800/50">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="John Doe"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Work Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="john@company.com"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="Your company"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Your Role *
            </label>
            <input
              type="text"
              id="role"
              name="role"
              required
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              placeholder="CTO, Head of Innovation, etc."
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-300 mb-2">
            Industry *
          </label>
          <select
            id="industry"
            name="industry"
            required
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all disabled:opacity-50"
            disabled={isSubmitting}
          >
            <option value="">Select your industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <span className="relative z-10">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Join Exclusive Waitlist
                  <Send className="w-5 h-5 inline ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Only {remainingSpots} spots remaining for early access
            </p>
          </div>
        </div>

        <div className="text-center pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            By joining, you agree to receive updates about RaziaTech Quantum.
            <br />
            We respect your privacy. No spam, unsubscribe anytime.
          </p>
        </div>
      </form>
    </div>
  )
}

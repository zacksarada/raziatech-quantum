// src/app/page.tsx - DIGITAL PRODUCTS MARKETPLACE VERSION
'use client';

import { 
  ArrowRight, Sparkles, ShoppingBag, Code, 
  BookOpen, DollarSign, TrendingUp, Users,
  Star, Shield, Zap, Rocket, Target, Gem,
  CheckCircle, CreditCard, Download, Clock,
  Globe, BarChart3, Award, Heart, Mail
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [productsSold, setProductsSold] = useState(1287)
  const [affiliateEarnings, setAffiliateEarnings] = useState('$42,589')

  useEffect(() => {
    // Animation trigger
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    // Scroll progress
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }
    
    // Animated counters
    const soldInterval = setInterval(() => {
      setProductsSold(prev => prev + Math.floor(Math.random() * 3))
    }, 3000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearTimeout(timer)
      clearInterval(soldInterval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const productCategories = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Code Templates",
      description: "Ready-to-use templates for SaaS, e-commerce, dashboards, and more",
      count: "42+ templates",
      color: "from-blue-500 to-cyan-500",
      link: "/products?type=template"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Ebooks & Courses",
      description: "Learn digital product creation, marketing, and growth strategies",
      count: "28+ resources",
      color: "from-purple-500 to-pink-500",
      link: "/products?type=ebook"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Digital Services",
      description: "Custom development, consulting, and done-for-you solutions",
      count: "15+ services",
      color: "from-green-500 to-emerald-500",
      link: "/products?type=service"
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Affiliate Tools",
      description: "Complete affiliate management systems and marketing tools",
      count: "8+ tools",
      color: "from-yellow-500 to-orange-500",
      link: "/affiliate"
    }
  ]

  const topProducts = [
    {
      name: "Next.js 14 SaaS Starter",
      category: "Code Template",
      price: 89,
      discount: 129,
      sales: 142,
      rating: 4.9,
      commission: "30%",
      badge: "Best Seller"
    },
    {
      name: "Digital Product Launch Guide",
      category: "Ebook",
      price: 27,
      discount: 47,
      sales: 89,
      rating: 4.8,
      commission: "40%",
      badge: "Popular"
    },
    {
      name: "Affiliate System Pro",
      category: "Service",
      price: 147,
      discount: 197,
      sales: 42,
      rating: 5.0,
      commission: "25%",
      badge: "New"
    }
  ]

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure Payments",
      description: "Stripe & PayPal integration with fraud protection",
      color: "text-green-600"
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "Instant Access",
      description: "Digital products delivered immediately after purchase",
      color: "text-blue-600"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "24/7 Support",
      description: "Round-the-clock customer and creator support",
      color: "text-purple-600"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Marketplace",
      description: "Sell to customers worldwide with local payment methods",
      color: "text-yellow-600"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Developer",
      role: "Indie Maker",
      content: "Sold my first Next.js template here and made $5,000 in the first month!",
      earnings: "$25k+ total",
      image: "👩‍💻"
    },
    {
      name: "Mike Creator",
      role: "Course Creator",
      content: "The affiliate program helped me earn passive income while focusing on content creation.",
      earnings: "$12k+ in commissions",
      image: "🎓"
    },
    {
      name: "Lisa Entrepreneur",
      role: "Startup Founder",
      content: "Found perfect tools to launch my SaaS. The quality exceeded expectations.",
      earnings: "3 products purchased",
      image: "🚀"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[80px] animate-pulse delay-1000"></div>
      </div>

      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-0.5 z-50 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrollProgress > 5 ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RaziaTech
                </span>
                <div className="text-xs text-gray-600 font-medium">Digital Products Marketplace</div>
              </div>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 font-medium">
                Products
              </Link>
              <Link href="/affiliate" className="text-gray-700 hover:text-purple-600 transition-all duration-300 hover:scale-105 font-medium">
                Affiliate Program
              </Link>
              <Link href="/sell" className="text-gray-700 hover:text-green-600 transition-all duration-300 hover:scale-105 font-medium">
                Sell Your Product
              </Link>
              <Link href="/waitlist" className="text-gray-700 hover:text-pink-600 transition-all duration-300 hover:scale-105 font-medium">
                Waitlist
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ShoppingBag className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link href="/login">
                <button className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium">
                  Sign In
                </button>
              </Link>
              <Link href="/waitlist">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-4 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            {/* Badge */}
            <div className={`inline-flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 px-5 py-3 rounded-full mb-8 border border-blue-200 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700 tracking-wide">PREMIUM DIGITAL PRODUCTS • START EARNING TODAY</span>
            </div>
            
            {/* Main Headline */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <span className="block text-gray-900">Buy & Sell</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-4">
                Digital Products
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className={`text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Join thousands of creators earning from their digital products.
              Sell code templates, ebooks, courses, and services. Earn commissions as an affiliate.
              Everything you need to succeed in the digital economy.
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Link href="/products" className="group">
                <button className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-xl shadow-blue-500/20 overflow-hidden">
                  <span className="relative z-10">Browse Products</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              </Link>
              <Link href="/sell" className="group">
                <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 text-lg shadow-lg hover:shadow-xl">
                  <span className="flex items-center justify-center gap-3">
                    <DollarSign className="w-5 h-5" />
                    Start Selling
                  </span>
                </button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { 
                  value: productsSold.toLocaleString(), 
                  label: 'Products Sold', 
                  icon: '📦',
                  color: 'text-blue-600',
                  trend: '+42 this week'
                },
                { 
                  value: '150+', 
                  label: 'Active Creators', 
                  icon: '👩‍💻',
                  color: 'text-purple-600',
                  trend: 'Growing daily'
                },
                { 
                  value: affiliateEarnings, 
                  label: 'Affiliate Earnings', 
                  icon: '💰',
                  color: 'text-green-600',
                  trend: 'Paid to creators'
                },
                { 
                  value: '4.9★', 
                  label: 'Average Rating', 
                  icon: '⭐',
                  color: 'text-yellow-600',
                  trend: 'Customer satisfaction'
                }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500 group hover:scale-105 ${
                    isVisible ? `opacity-100 translate-y-0` : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 600}ms` }}
                >
                  <div className={`text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 ${stat.color}`}>{stat.icon}</div>
                  <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                  <div className="text-sm font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500">{stat.trend}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Explore <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Categories</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Find exactly what you need in our curated digital product categories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productCategories.map((category, index) => (
              <Link 
                key={index}
                href={category.link}
                className="group bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:scale-105 hover:border-transparent"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${category.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{category.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-blue-600">{category.count}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Products */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Top Selling <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Products</span>
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Most popular digital products loved by our community
              </p>
            </div>
            <Link href="/products" className="mt-4 md:mt-0">
              <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center gap-2">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {topProducts.map((product, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                      {product.category}
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                      {product.badge}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{product.rating} ({product.sales} sales)</span>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                      {product.discount && (
                        <span className="text-lg text-gray-400 line-through">${product.discount}</span>
                      )}
                    </div>
                    <div className="text-sm text-green-600 font-semibold mt-1">
                      {product.commission} affiliate commission
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
                      Buy Now
                    </button>
                    <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our Platform</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Everything you need to buy, sell, and earn from digital products
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-500 hover:scale-105 hover:shadow-lg"
              >
                <div className={`inline-flex p-3 rounded-lg bg-blue-50 mb-4 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Program CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white">
            <DollarSign className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Earn Up to <span className="text-yellow-300">45% Commission</span>
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join our affiliate program and earn passive income by promoting digital products you love.
              Get paid monthly via PayPal, bank transfer, or cryptocurrency.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { value: '45%', label: 'Max Commission Rate' },
                { value: '$10k+', label: 'Highest Earner Monthly' },
                { value: '30 days', label: 'Cookie Duration' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
            <Link href="/affiliate">
              <button className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl">
                Become an Affiliate - It's Free!
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Success <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              See what our creators and affiliates are saying
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-500 hover:scale-105"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl">{testimonial.image}</div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full inline-block">
                  {testimonial.earnings}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Rocket className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Digital Journey</span> Today
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Whether you want to buy amazing digital products, sell your creations,
              or earn as an affiliate - we have everything you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/waitlist">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-2xl">
                  Join Free Waitlist
                </button>
              </Link>
              <Link href="/products">
                <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                  Explore Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">RaziaTech</span>
                  <div className="text-sm text-gray-400">Digital Products Marketplace</div>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                Premium marketplace for digital products, templates, and services.
                Empowering creators and entrepreneurs worldwide.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'Instagram', 'YouTube'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="text-gray-400 hover:text-white transition-colors hover:scale-110"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            {['Marketplace', 'For Creators', 'Legal'].map((category) => (
              <div key={category}>
                <h4 className="text-lg font-bold mb-4">{category}</h4>
                <ul className="space-y-2 text-gray-400">
                  {category === 'Marketplace' ? (
                    <>
                      <li><Link href="/products" className="hover:text-white transition-colors">Browse Products</Link></li>
                      <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                      <li><Link href="/affiliate" className="hover:text-white transition-colors">Affiliate Program</Link></li>
                      <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                    </>
                  ) : category === 'For Creators' ? (
                    <>
                      <li><Link href="/sell" className="hover:text-white transition-colors">Sell Your Product</Link></li>
                      <li><Link href="/creator-dashboard" className="hover:text-white transition-colors">Creator Dashboard</Link></li>
                      <li><Link href="/resources" className="hover:text-white transition-colors">Creator Resources</Link></li>
                      <li><Link href="/community" className="hover:text-white transition-colors">Community</Link></li>
                    </>
                  ) : (
                    <>
                      <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                      <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                      <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
                      <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
                    </>
                  )}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} RaziaTech Marketplace. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              Made with <Heart className="w-4 h-4 text-red-500" /> for digital creators
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

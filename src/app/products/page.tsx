'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, Tag, Zap, Book, Settings, 
  Filter, Search, Star, TrendingUp, ArrowRight
} from 'lucide-react';

// Mock data - nanti diganti dengan API
const MOCK_PRODUCTS = [
  {
    id: '1',
    slug: 'nextjs-saas-starter',
    name: 'Next.js 14 SaaS Starter Kit',
    short_description: 'Complete SaaS template with authentication, dashboard, and payments',
    description: 'Launch your SaaS faster with this production-ready Next.js 14 template. Includes authentication, admin dashboard, Stripe payments, and Supabase backend.',
    price: 89,
    compare_at_price: 129,
    type: 'template',
    category: 'Code Templates',
    tags: ['nextjs', 'saas', 'starter', 'typescript'],
    features: [
      'Authentication with NextAuth.js',
      'Stripe Payments Integration',
      'Admin Dashboard',
      'Responsive Design',
      'Supabase Backend',
      'Email Templates',
      'API Routes'
    ],
    thumbnail_url: null,
    gallery_urls: [],
    sales_count: 42,
    affiliate_commission: 30,
    created_at: '2024-01-29T10:00:00Z'
  },
  {
    id: '2',
    slug: 'digital-product-launch-guide',
    name: 'Digital Product Launch Guide',
    short_description: 'Step-by-step guide to launch and sell your digital products',
    description: 'Complete blueprint for launching digital products. Includes marketing strategies, pricing models, email sequences, and growth hacking techniques.',
    price: 27,
    compare_at_price: 47,
    type: 'ebook',
    category: 'Ebooks',
    tags: ['guide', 'marketing', 'launch', 'digital'],
    features: [
      'Launch Checklist',
      'Email Templates',
      'Pricing Strategy',
      'Marketing Plan',
      'Affiliate Recruitment',
      'Social Media Strategy'
    ],
    thumbnail_url: null,
    gallery_urls: [],
    sales_count: 18,
    affiliate_commission: 40,
    created_at: '2024-01-28T10:00:00Z'
  },
  {
    id: '3',
    slug: 'affiliate-system-setup',
    name: 'Affiliate System Setup',
    short_description: 'Complete affiliate management system with tracking and payouts',
    description: 'Ready-to-deploy affiliate system with dashboard, commission tracking, automated payouts, and marketing tools. Built with Next.js and Supabase.',
    price: 147,
    compare_at_price: 197,
    type: 'service',
    category: 'Services',
    tags: ['affiliate', 'system', 'automation', 'tracking'],
    features: [
      'Affiliate Dashboard',
      'Commission Tracking',
      'Payout Automation',
      'Marketing Materials',
      'Real-time Analytics',
      'Customizable Commission'
    ],
    thumbnail_url: null,
    gallery_urls: [],
    sales_count: 8,
    affiliate_commission: 25,
    created_at: '2024-01-27T10:00:00Z'
  },
  {
    id: '4',
    slug: 'react-component-library',
    name: 'Premium React Component Library',
    short_description: '100+ customizable React components for modern web apps',
    description: 'Beautifully designed React components with TypeScript support. Perfect for building admin dashboards, SaaS applications, and internal tools.',
    price: 67,
    compare_at_price: 97,
    type: 'template',
    category: 'Code Templates',
    tags: ['react', 'components', 'ui', 'typescript'],
    features: [
      '100+ Components',
      'Fully Customizable',
      'Dark/Light Mode',
      'TypeScript Support',
      'Responsive Design',
      'Storybook Docs'
    ],
    thumbnail_url: null,
    gallery_urls: [],
    sales_count: 25,
    affiliate_commission: 35,
    created_at: '2024-01-26T10:00:00Z'
  },
  {
    id: '5',
    slug: 'e-commerce-masterclass',
    name: 'E-commerce Masterclass',
    short_description: 'Learn how to build and scale profitable online stores',
    description: 'Comprehensive course covering everything from product selection to scaling. Includes case studies, templates, and one-on-one coaching sessions.',
    price: 97,
    compare_at_price: 147,
    type: 'ebook',
    category: 'Ebooks',
    tags: ['ecommerce', 'course', 'business', 'scaling'],
    features: [
      'Video Course (10+ hours)',
      'Business Templates',
      'Case Studies',
      'Coaching Sessions',
      'Community Access',
      'Lifetime Updates'
    ],
    thumbnail_url: null,
    gallery_urls: [],
    sales_count: 15,
    affiliate_commission: 45,
    created_at: '2024-01-25T10:00:00Z'
  },
  {
    id: '6',
    slug: 'custom-api-development',
    name: 'Custom API Development Service',
    short_description: 'Professional API development and integration service',
    description: 'Need a custom API for your application? Our team will build secure, scalable, and well-documented APIs tailored to your business needs.',
    price: 499,
    compare_at_price: 699,
    type: 'service',
    category: 'Services',
    tags: ['api', 'development', 'backend', 'custom'],
    features: [
      'REST/GraphQL APIs',
      'API Documentation',
      'Authentication Setup',
      'Database Design',
      'Performance Optimization',
      'Deployment & Maintenance'
    ],
    thumbnail_url: null,
    gallery_urls: [],
    sales_count: 3,
    affiliate_commission: 20,
    created_at: '2024-01-24T10:00:00Z'
  }
];

interface Product {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  type: string;
  category: string;
  tags: string[];
  features: string[];
  thumbnail_url: string | null;
  gallery_urls: string[];
  sales_count: number;
  affiliate_commission: number;
  created_at: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [loading, setLoading] = useState(false);

  // Extract unique categories and types
  const categories = ['all', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];
  const types = ['all', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.type)))];

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(product => product.type === selectedType);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'sales':
        filtered.sort((a, b) => b.sales_count - a.sales_count);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedType, searchQuery, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'template': return <Zap className="w-4 h-4" />;
      case 'ebook': return <Book className="w-4 h-4" />;
      case 'service': return <Settings className="w-4 h-4" />;
      default: return <Tag className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'template': return 'from-blue-500 to-cyan-500';
      case 'ebook': return 'from-purple-500 to-pink-500';
      case 'service': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalSales = products.reduce((sum, p) => sum + p.sales_count, 0);
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales_count), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Digital Products <span className="text-yellow-300">Marketplace</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              Discover premium digital products, templates, and services for developers, creators, and entrepreneurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative max-w-xl mx-auto w-full">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products, templates, ebooks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
                <Filter className="inline w-5 h-5 mr-2" />
                Advanced Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalProducts}</div>
              <div className="text-sm text-gray-600">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{totalSales}</div>
              <div className="text-sm text-gray-600">Total Sales</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{formatPrice(totalRevenue)}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedCategory === category
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Product Type</h4>
                <div className="space-y-2">
                  {types.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedType === type
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {type !== 'all' && (
                        <span className="mr-2">
                          {getTypeIcon(type)}
                        </span>
                      )}
                      {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="sales">Best Selling</option>
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedType('all');
                  setSearchQuery('');
                  setSortBy('newest');
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
              >
                Reset All Filters
              </button>
            </div>

            {/* Affiliate CTA */}
            <div className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-3">Earn Commissions!</h3>
              <p className="text-green-100 mb-4 text-sm">
                Join our affiliate program and earn up to 45% commission on every sale.
              </p>
              <Link
                href="/affiliate"
                className="inline-flex items-center justify-center w-full bg-white text-green-700 font-semibold py-2 rounded-lg hover:bg-green-50 transition"
              >
                Become an Affiliate
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Products' : selectedCategory}
                </h2>
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>
              <div className="flex items-center gap-4 mt-2 sm:mt-0">
                <span className="text-sm text-gray-600">
                  {searchQuery && `Results for "${searchQuery}"`}
                </span>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedType('all');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                  >
                    {/* Product Header */}
                    <div className="relative">
                      {/* Type Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className={`flex items-center px-3 py-1.5 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getTypeColor(product.type)}`}>
                          {getTypeIcon(product.type)}
                          <span className="ml-1.5 capitalize">{product.type}</span>
                        </div>
                      </div>

                      {/* Sales Badge */}
                      {product.sales_count > 10 && (
                        <div className="absolute top-4 right-4 z-10">
                          <div className="flex items-center px-3 py-1.5 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium">
                            <TrendingUp className="w-3 h-3 mr-1.5" />
                            Best Seller
                          </div>
                        </div>
                      )}

                      {/* Image/Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getTypeColor(product.type)} flex items-center justify-center`}>
                            <ShoppingBag className="w-12 h-12 text-white" />
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      {/* Category */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">
                          {product.category}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-700 ml-1">4.8</span>
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        <Link href={`/products/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>

                      {/* Short Description */}
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.short_description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {product.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                            +{product.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Features Preview */}
                      <div className="mb-4">
                        <ul className="space-y-1.5">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-700">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                              {formatPrice(product.price)}
                            </span>
                            {product.compare_at_price && (
                              <span className="text-sm text-gray-400 line-through">
                                {formatPrice(product.compare_at_price)}
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-green-600 font-medium">
                            {product.affiliate_commission}% affiliate commission
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">
                            {product.sales_count} sold
                          </div>
                          <Link
                            href={`/products/${product.slug}`}
                            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 font-medium transition-all"
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Stats Summary */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Marketplace Stats
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-blue-600">{products.filter(p => p.type === 'template').length}</div>
                  <div className="text-sm text-gray-600">Code Templates</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-purple-600">{products.filter(p => p.type === 'ebook').length}</div>
                  <div className="text-sm text-gray-600">Ebooks & Courses</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-green-600">{products.filter(p => p.type === 'service').length}</div>
                  <div className="text-sm text-gray-600">Services</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-yellow-600">
                    {formatPrice(products.reduce((sum, p) => sum + p.affiliate_commission, 0) / products.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg Commission</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Selling?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are building their digital product businesses with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/waitlist"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 font-semibold text-lg"
            >
              Join Waitlist (Free)
            </Link>
            <Link
              href="/products"
              className="px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 font-semibold text-lg"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
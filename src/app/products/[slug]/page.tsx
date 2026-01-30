'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { 
  ShoppingBag, Tag, Check, Star, 
  Download, Share2, ArrowLeft,
  Users, CreditCard, Shield
} from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_at_price: number | null;
  type: string;
  category: string;
  tags: string[];
  features: string[];
  file_url: string | null;
  thumbnail_url: string | null;
  gallery_urls: string[];
  sales_count: number;
  affiliate_commission: number;
  created_at: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (params.slug) {
      fetchProduct(params.slug as string);
    }
  }, [params.slug]);

  const fetchProduct = async (slug: string) => {
    try {
      setLoading(true);
      // We'll fetch all and filter for now
      // Later: create /api/products/[slug] endpoint
      const response = await fetch('/api/products');
      const result = await response.json();
      
      if (result.success) {
        const foundProduct = result.products.find((p: Product) => p.slug === slug);
        setProduct(foundProduct || null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Simple cart functionality (localStorage)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.thumbnail_url
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${quantity} ${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * quantity;
  const savings = product.compare_at_price 
    ? product.compare_at_price - product.price 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/products" className="hover:text-blue-600">Products</Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
              <div className="aspect-square relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                {product.thumbnail_url ? (
                  <Image
                    src={product.thumbnail_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <ShoppingBag className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                      <span className="text-blue-600 font-semibold text-lg">
                        {product.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.gallery_urls.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.gallery_urls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${
                      selectedImage === index 
                        ? 'border-blue-500' 
                        : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={url}
                      alt={`${product.name} ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Category & Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <Tag className="w-3 h-3 mr-1" />
                {product.category}
              </span>
              {product.tags.map(tag => (
                <span 
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
              <span className="text-sm text-gray-500 ml-auto">
                <Users className="w-4 h-4 inline mr-1" />
                {product.sales_count} sold
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-lg text-gray-600 mb-6">
              {product.short_description}
            </p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">
                      {formatPrice(product.compare_at_price)}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                      Save {formatPrice(savings)}
                    </span>
                  </>
                )}
              </div>
              <div className="text-green-600 font-medium mt-2">
                <Star className="w-4 h-4 inline mr-1" />
                Affiliate commission: {product.affiliate_commission}%
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What's Included
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 border-x w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  Total: {formatPrice(totalPrice)}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium text-lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </button>
                <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-xl">
              <div className="text-center">
                <Download className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Instant Download</div>
              </div>
              <div className="text-center">
                <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Secure Payment</div>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Money Back Guarantee</div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
          <div className="prose prose-lg max-w-none bg-white p-6 rounded-xl shadow">
            <p className="text-gray-700 whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>

        {/* Affiliate CTA */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center border border-green-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Earn {product.affiliate_commission}% Commission!
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join our affiliate program and earn commissions for every sale you refer.
            Perfect for content creators, bloggers, and influencers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/affiliate"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-medium"
            >
              Become an Affiliate
            </Link>
            <button className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 font-medium border border-green-200">
              Get Affiliate Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
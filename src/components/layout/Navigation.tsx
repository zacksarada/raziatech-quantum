'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, User, Search, Menu, X,
  Home, BookOpen, Code, DollarSign,
  ChevronDown, LogOut, Settings
} from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: ShoppingBag },
    { name: 'Templates', href: '/products?type=template', icon: Code },
    { name: 'Ebooks', href: '/products?type=ebook', icon: BookOpen },
    { name: 'Affiliate', href: '/affiliate', icon: DollarSign },
  ];

  useEffect(() => {
    // Check cart
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    setCartCount(count);

    // Check if admin
    const secret = localStorage.getItem('admin_secret');
    setIsAdmin(!!secret);

    // Listen for cart updates
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCount = updatedCart.reduce((sum: number, item: any) => sum + item.quantity, 0);
      setCartCount(updatedCount);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_secret');
    window.location.href = '/';
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">RZ</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  RaziaTech
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.href.includes('?') && pathname.startsWith(item.href.split('?')[0]));
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center
                      ${isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg relative"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg flex items-center"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <User className="w-4 h-4 mr-3" />
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <ShoppingBag className="w-4 h-4 mr-3" />
                      My Orders
                    </Link>
                    <Link
                      href="/affiliate/dashboard"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <DollarSign className="w-4 h-4 mr-3" />
                      Affiliate Dashboard
                    </Link>
                    
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="flex items-center px-4 py-2 text-blue-600 hover:bg-blue-50 border-t border-gray-100"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 border-t border-gray-100 mt-2"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      flex items-center px-4 py-3 rounded-lg text-base font-medium
                      ${isActive 
                        ? 'text-blue-600 bg-blue-50' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}

              {/* Mobile User Links */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                >
                  <User className="w-5 h-5 mr-3" />
                  My Profile
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  Cart ({cartCount})
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </>
  );
}

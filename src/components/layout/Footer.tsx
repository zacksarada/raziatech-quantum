import Link from 'next/link';
import { 
  Facebook, Twitter, Instagram, Linkedin, 
  Github, Mail, MapPin, Phone, Heart
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Products: [
      { name: 'Code Templates', href: '/products?type=template' },
      { name: 'Ebooks & Courses', href: '/products?type=ebook' },
      { name: 'Services', href: '/products?type=service' },
      { name: 'Bundles', href: '/products?category=Bundles' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Refund Policy', href: '/refund-policy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    Earn: [
      { name: 'Affiliate Program', href: '/affiliate' },
      { name: 'Sell Your Product', href: '/sell' },
      { name: 'Creator Resources', href: '/resources' },
      { name: 'Commission Rates', href: '/commissions' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/RaziaTech' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/RaziaTech' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/RaziaTech' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/razia-tech' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/razia-tech' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">RZ</span>
              </div>
              <span className="text-2xl font-bold text-white">RaziaTech</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Premium digital products marketplace for developers, creators, and entrepreneurs. 
              Join thousands of successful digital product sellers and buyers.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-400">
                Get the latest product updates and marketplace news
              </p>
            </div>
            <form className="flex w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64 text-white"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-r-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Jakarta, Indonesia</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            <a href="mailto:hello@raziatech.com" className="hover:text-white">
              hello@raziatech.com
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            <a href="tel:+6281234567890" className="hover:text-white">
              +62 812 3456 7890
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {currentYear} RaziaTech Marketplace. All rights reserved.
          </div>
          <div className="flex items-center text-sm text-gray-400">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> in Indonesia
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
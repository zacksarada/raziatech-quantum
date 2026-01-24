import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center text-gray-500 text-sm">
          <p className="flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> by RaziaTech Team
          </p>
          <p className="mt-2">© {new Date().getFullYear()} RaziaTech Quantum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

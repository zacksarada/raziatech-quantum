// src/app/layout.tsx - ULTRA SIMPLE
import './globals.css'

export const metadata = {
  title: 'RaziaTech',
  description: 'Marketplace',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white border-b h-16 flex items-center px-4">
            <h1 className="text-xl font-bold text-blue-600">RaziaTech</h1>
          </header>
          <main>{children}</main>
          <footer className="bg-gray-100 border-t h-16 flex items-center justify-center">
            <p className="text-gray-600">© 2024</p>
          </footer>
        </div>
      </body>
    </html>
  )
}

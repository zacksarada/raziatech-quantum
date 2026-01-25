// src/app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'RaziaTech Quantum - Enterprise Quantum Computing',
  description: 'Quantum computing solutions for Indonesian enterprises. 128-Qubit processors, quantum encryption, real-time analytics.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}

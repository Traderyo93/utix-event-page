import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'UTIX: The Future of Ticketing - Investor Presentation',
  description: 'Join us for an exclusive online event showcasing how UTIX is revolutionising the $65B+ ticketing industry with MFSA-regulated blockchain technology, fraud-proof smart contract tickets, and nearly 50% lower fees.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

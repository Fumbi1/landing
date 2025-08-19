import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Digital Solutions for Waldorf Schools',
  description: 'Modern digital solutions aligned with Waldorf pedagogy. Easy to use, simplified, and safe systems for school administration.',
  keywords: 'Waldorf schools, digital solutions, school management, education technology, pedagogy',
  authors: [{ name: 'Digital Solutions Team' }],
  creator: 'Digital Solutions',
  publisher: 'Digital Solutions',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://waldorf-digital-solutions.com',
    title: 'Digital Solutions for Waldorf Schools',
    description: 'Modern digital solutions aligned with Waldorf pedagogy',
    siteName: 'Waldorf Digital Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Solutions for Waldorf Schools',
    description: 'Modern digital solutions aligned with Waldorf pedagogy',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
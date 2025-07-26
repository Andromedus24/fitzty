import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientRoot from './ClientRoot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://fitzty.com'),
  title: 'Fitzty - Fashion-First Social Media',
  description: 'A fashion-first social media experience blending TikTok\'s algorithmic virality, Instagram\'s UX, Bitmoji avatars, and powerful AI fashion utilities.',
  keywords: 'fashion, social media, avatar, AI, style, outfit, clothing',
  authors: [{ name: 'Fitzty Team' }],
  openGraph: {
    title: 'Fitzty - Fashion-First Social Media',
    description: 'A fashion-first social media experience blending TikTok\'s algorithmic virality, Instagram\'s UX, Bitmoji avatars, and powerful AI fashion utilities.',
    url: 'https://fitzty.com',
    siteName: 'Fitzty',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fitzty - Fashion-First Social Media',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitzty - Fashion-First Social Media',
    description: 'A fashion-first social media experience blending TikTok\'s algorithmic virality, Instagram\'s UX, Bitmoji avatars, and powerful AI fashion utilities.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  )
} 
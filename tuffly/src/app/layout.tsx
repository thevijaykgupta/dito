import './globals.css';
import type { Metadata, Viewport } from 'next'
import { AuthProvider } from '@/context/AuthContext'
import { MaintenanceProvider } from '@/context/MaintenanceContext'
import { EmotionProvider } from '@/context/EmotionContext'
import { DataProvider } from '@/context/DataContext'
import React from 'react'
import ClientLayoutWrapper from './ClientLayoutWrapper'

export const metadata: Metadata = {
  title: 'Tuffly - Campus Marketplace',
  description: 'Buy and sell items within your campus community. The ultimate student marketplace with instant delivery, secure payments, and exclusive student deals.',
  manifest: '/manifest.json',
  keywords: 'campus marketplace, student trading, buy sell rent, university marketplace, student deals',
  authors: [{ name: 'Tuffly Team' }],
  creator: 'Tuffly',
  publisher: 'Tuffly',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#FFD700',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* iOS-specific meta tags and SEO */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Tuffly" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <title>Tuffly - Campus Marketplace</title>
        <meta name="description" content="Buy, sell, rent, and confess anonymously on Tuffly, the ultimate campus marketplace." />
        <meta property="og:title" content="Tuffly - Campus Marketplace" />
        <meta property="og:description" content="Buy, sell, rent, and confess anonymously on Tuffly, the ultimate campus marketplace." />
        <meta property="og:image" content="/images/products/logo_whitee.png" />
        <meta name="keywords" content="campus, marketplace, buy, sell, rent, confession, IIT, college, student" />
        <link rel="canonical" href="https://tuffly.vercel.app/" />
        <link rel="apple-touch-startup-image" href="/images/products/logo_whitee.png" />
        <link rel="apple-touch-icon" href="/images/products/logo_whitee.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/images/products/logo_whitee.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/products/logo_whitee.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/images/products/logo_whitee.png" />
      </head>
      <body>
          <AuthProvider>
            <DataProvider>
            <EmotionProvider>
              <MaintenanceProvider>
                <ClientLayoutWrapper>
                  {children}
                </ClientLayoutWrapper>
              </MaintenanceProvider>
            </EmotionProvider>
            </DataProvider>
          </AuthProvider>
      </body>
    </html>
  )
} 

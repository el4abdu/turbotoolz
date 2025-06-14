import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import MotionBackground from '@/components/MotionBackground';
import LoadingScreen from '@/components/LoadingScreen';
import AdBlockDetector from '@/components/AdBlockDetector';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Ensure text remains visible during font loading
});

export const metadata: Metadata = {
  title: 'TurboToolz - Fast Web Tools',
  description: 'Collection of useful web tools for everyday tasks',
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/logo.svg" as="image" type="image/svg+xml" />
        
        {/* Early ad blocker detection */}
        <script src="/early-detector.js" async></script>
      </head>
      <body className={`${inter.className} bg-light dark:bg-dark min-h-screen`}>
        <ThemeProvider>
          <LoadingScreen />
          <div className="fixed inset-0 overflow-hidden z-[-1]">
            <MotionBackground />
          </div>
          <div className="flex flex-col min-h-screen relative z-0">
            <Header />
            <main className="flex-grow pt-24">{children}</main>
            <Footer />
          </div>
          <AdBlockDetector />
        </ThemeProvider>
      </body>
    </html>
  )
} 
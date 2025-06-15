import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import AdBlockDetector from '@/components/AdBlockDetector';
import { ThemeProvider } from '@/components/ThemeProvider';
import AdBanner from '@/components/AdBanner';
import SideBanner from '@/components/SideBanner';
import { NotificationProvider } from '@/components/NotificationContainer';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'TurboToolz - Online Tools for Developers and Creators',
  description: 'A collection of free online tools for developers, designers, and content creators.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.png', sizes: '192x192' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180' },
  },
  manifest: '/manifest.json',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script src="/early-detector.js" async></script>
      </head>
      <body className={`${inter.className} bg-light dark:bg-dark min-h-screen flex flex-col`}>
        <ThemeProvider>
          <NotificationProvider>
            <LoadingScreen />
            <div className="fixed inset-0 overflow-hidden z-[-1]">
              <div className="absolute inset-0 bg-gradient-to-br from-light to-white dark:from-dark dark:to-gray-900"></div>
              <div className="absolute inset-0 opacity-20 dark:opacity-40">
                <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"></div>
                <div className="absolute top-[40%] right-[15%] w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-[10%] left-[35%] w-80 h-80 bg-accent/20 rounded-full filter blur-3xl"></div>
              </div>
            </div>
            <AdBlockDetector />
            <Header />
            <div className="flex-grow flex">
              <div className="hidden lg:block w-[160px] xl:w-[200px]">
                <SideBanner />
              </div>
              <div className="flex-grow">
                {children}
              </div>
              <div className="hidden lg:block w-[160px] xl:w-[200px]">
                <SideBanner />
              </div>
            </div>
            <Footer />
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 
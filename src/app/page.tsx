'use client';

import React, { useEffect, useRef } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import AdPlaceholder from '@/components/AdPlaceholder';

export default function Home() {
  const { theme } = useTheme();
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observerRef.current?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });
    
    return () => {
      if (observerRef.current) {
        animatedElements.forEach((el) => {
          observerRef.current?.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full filter blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 animate-on-scroll slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark dark:text-light mb-6 leading-tight">
                Powerful <span className="text-primary">Web Tools</span> for Everyday Tasks
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                TurboToolz provides free, fast, and secure online tools to help you with your daily tasks.
                No registration required, no data stored.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/qr-code" variant="primary" size="lg" className="backdrop-blur-sm hover:scale-105 transition-transform">
                  Try QR Code Generator
                </Button>
                <Button href="/password-generator" variant="secondary" size="lg" className="backdrop-blur-sm hover:scale-105 transition-transform">
                  Try Password Generator
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2 animate-on-scroll slide-up delay-200">
              <div className="relative">
                {/* Glassmorphic card with improved design */}
                <div className="glass p-8 rounded-2xl shadow-xl backdrop-blur-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">TurboToolz</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Your toolbox for the web</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-xl flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center">
                          <span className="text-primary text-2xl font-bold">QR</span>
                        </div>
                      </div>
                      <div className="bg-secondary/10 dark:bg-secondary/20 p-4 rounded-xl flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-secondary/20 dark:bg-secondary/30 rounded-lg flex items-center justify-center">
                          <span className="text-secondary text-2xl font-bold">PW</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-accent/10 dark:bg-accent/20 p-3 rounded-lg text-center transform transition-transform hover:scale-105 cursor-pointer">
                      <p className="text-sm text-dark dark:text-light">More tools coming soon!</p>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-primary/20 dark:bg-primary/30 animate-pulse-slow"></div>
                  <div className="absolute bottom-8 left-8 w-8 h-8 rounded-full bg-secondary/20 dark:bg-secondary/30 animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute top-1/2 left-1/3 w-4 h-4 rounded-full bg-accent/30 dark:bg-accent/40 animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/10 dark:bg-accent/20 rounded-xl transform rotate-12 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-xl transform -rotate-12 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ad Section */}
      <section className="py-8 bg-light/30 dark:bg-dark/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <AdPlaceholder width="728px" height="90px" className="ad-banner" />
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-light/50 dark:bg-dark/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">Featured Tools</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Discover our collection of powerful web tools designed to make your online tasks easier and more efficient.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* QR Code Generator Card */}
            <Card variant="glass" className="p-6 animate-on-scroll slide-up delay-100 backdrop-blur-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xl font-bold">QR</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark dark:text-light mb-2 flex items-center">
                    QR Code Generator
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-white animate-pulse">
                      Coming Soon
                    </span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Quickly generate QR codes for URLs, text, contact information, and more. 
                    Customize colors and download in multiple formats.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">Generate QR codes from URLs, text, and more</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">Customize colors and styles</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">Download in multiple formats (PNG, SVG, PDF)</span>
                    </li>
                  </ul>
                  <Button href="/qr-code" variant="primary" className="hover:scale-105 transition-transform">Learn more</Button>
                </div>
              </div>
            </Card>

            {/* Password Generator Card */}
            <Card variant="glass" className="p-6 animate-on-scroll slide-up delay-200 backdrop-blur-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/20 dark:bg-secondary/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary text-xl font-bold">PW</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark dark:text-light mb-2 flex items-center">
                    Password Generator
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-accent text-white animate-pulse">
                      Coming Soon
                    </span>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Create strong, secure passwords with customizable options. 
                    Include special characters, numbers, and control password length.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-secondary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">Generate strong, secure passwords</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-secondary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">Customize password length and complexity</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-secondary mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600 dark:text-gray-400">Check password strength and security</span>
                    </li>
                  </ul>
                  <Button href="/password-generator" variant="secondary" className="hover:scale-105 transition-transform">Learn more</Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Sidebar Ad */}
          <div className="mt-12 flex justify-center md:justify-end">
            <AdPlaceholder width="300px" height="250px" className="ad-sidebar" />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Card variant="neomorphic" className="p-8 md:p-12 max-w-4xl mx-auto text-center animate-on-scroll slide-up backdrop-blur-md hover:shadow-2xl transition-all duration-500">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">Ready to Boost Your Productivity?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Start using our free online tools today and make your daily tasks easier and more efficient.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/qr-code" variant="primary" size="lg" className="hover:scale-105 transition-transform">Get Started with QR Codes</Button>
              <Button href="/password-generator" variant="accent" size="lg" className="hover:scale-105 transition-transform">Try Password Generator</Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
} 
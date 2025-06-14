'use client';

import React from 'react';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';

export default function QRCodePage() {
  return (
    <>
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-light mb-6 fade-in">
                QR Code Generator
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 fade-in delay-100">
                This feature is coming soon! We're working hard to bring you a powerful QR code generator.
              </p>
            </div>
            
            {/* Feature Preview */}
            <Card variant="glass" className="p-8 md:p-12 mb-12 fade-in delay-200">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-48 h-48 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center p-4 relative">
                    <div className="w-full h-full bg-white dark:bg-dark/80 rounded-xl flex items-center justify-center">
                      <span className="text-primary text-5xl font-bold">QR</span>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary/30 rounded-full"></div>
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-secondary/30 rounded-full"></div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">
                    Features Coming Soon
                  </h2>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-semibold text-dark dark:text-light">Multiple Content Types</h3>
                        <p className="text-gray-600 dark:text-gray-400">Generate QR codes from URLs, text, contact info, and more</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-semibold text-dark dark:text-light">Customization Options</h3>
                        <p className="text-gray-600 dark:text-gray-400">Customize QR code colors and styles to match your brand</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-semibold text-dark dark:text-light">Multiple Export Formats</h3>
                        <p className="text-gray-600 dark:text-gray-400">Download in multiple formats (PNG, SVG, PDF)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-semibold text-dark dark:text-light">Logo Integration</h3>
                        <p className="text-gray-600 dark:text-gray-400">Add your logo to the center of QR codes for branding</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            {/* Newsletter Signup */}
            <Card variant="neomorphic" className="p-8 text-center fade-in delay-300">
              <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">
                Be the First to Know
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Want to be notified when our QR code generator is ready? Sign up for updates!
              </p>
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-dark/50 text-dark dark:text-light focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="primary">
                    Notify Me
                  </Button>
                </div>
              </div>
            </Card>
            
            <div className="text-center mt-12">
              <Button href="/" variant="ghost">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 
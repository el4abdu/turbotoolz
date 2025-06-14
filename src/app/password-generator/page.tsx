'use client';

import React from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';

export default function PasswordGeneratorPage() {
  return (
    <>
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-light mb-6 fade-in">
                Password Generator
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 fade-in delay-100">
                This feature is coming soon! We're working hard to bring you a powerful password generator.
              </p>
            </div>
            
            {/* Ad Banner - Top */}
            <div className="mb-12">
              <AdBanner className="max-w-2xl mx-auto" />
            </div>
            
            {/* Feature Preview */}
            <Card variant="glass" className="p-8 md:p-12 mb-12 fade-in delay-200">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-48 h-48 bg-secondary/10 dark:bg-secondary/20 rounded-2xl flex items-center justify-center p-4 relative">
                    <div className="w-full h-full bg-white dark:bg-dark/80 rounded-xl flex items-center justify-center">
                      <span className="text-secondary text-5xl font-bold">PW</span>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-secondary/30 rounded-full"></div>
                    <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-accent/30 rounded-full"></div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">
                    Features Coming Soon
                  </h2>
                  <ul className="space-y-4 mb-8">
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-semibold text-dark dark:text-light">Strong Password Generation</h3>
                        <p className="text-gray-600 dark:text-gray-400">Generate cryptographically secure passwords instantly</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-semibold text-dark dark:text-light">Customizable Options</h3>
                        <p className="text-gray-600 dark:text-gray-400">Adjust password length and character types (special characters, numbers, etc.)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-semibold text-dark dark:text-light">Password Strength Meter</h3>
                        <p className="text-gray-600 dark:text-gray-400">Visual indicator of password strength and security</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary mr-3 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <div>
                        <h3 className="font-semibold text-dark dark:text-light">One-Click Copy</h3>
                        <p className="text-gray-600 dark:text-gray-400">Copy passwords to clipboard with a single click</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            {/* Ad Banner - Middle */}
            <div className="mb-12">
              <AdBanner className="max-w-2xl mx-auto" />
            </div>
            
            {/* Password Tips */}
            <Card variant="neomorphic" className="p-8 fade-in delay-300">
              <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">
                Password Security Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 dark:bg-dark/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-dark dark:text-light mb-2 flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Use Unique Passwords
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Never reuse passwords across multiple sites or services. Each account should have its own unique password.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-dark/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-dark dark:text-light mb-2 flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Length Matters
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Longer passwords are generally more secure. Aim for at least 12 characters when possible.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-dark/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-dark dark:text-light mb-2 flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Mix Character Types
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Include a mix of uppercase letters, lowercase letters, numbers, and special characters.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-dark/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-dark dark:text-light mb-2 flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Use a Password Manager
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Consider using a password manager to securely store and generate complex passwords.
                  </p>
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

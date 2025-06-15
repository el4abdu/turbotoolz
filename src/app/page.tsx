'use client';

import React, { useEffect, useRef } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import AdPlaceholder from '@/components/AdPlaceholder';
import AdBanner from '@/components/AdBanner';
import QRCodeIcon from '@/components/icons/QRCodeIcon';
import PasswordIcon from '@/components/icons/PasswordIcon';

// Create a SpeedTestIcon component
const SpeedTestIcon = ({ className = "w-6 h-6" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4V2M12 22V20M20 12H22M2 12H4M19.07 5L17.66 6.41M6.34 17.66L4.93 19.07M18.36 18.36L19.78 19.78M4.22 4.22L5.64 5.64" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" 
        stroke="currentColor" strokeWidth="2" />
      <path d="M12 12L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

// Create a TodoListIcon component
const TodoListIcon = ({ className = "w-6 h-6" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// Create a CalculatorIcon component
const CalculatorIcon = ({ className = "w-6 h-6" }) => {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 7H15M9 17H9.01M12 17H12.01M15 17H15.01M9 14H9.01M12 14H12.01M15 14H15.01M9 11H9.01M12 11H12.01M15 11H15.01M7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21Z" 
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

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
                <Button href="/todo-list" variant="secondary" size="lg" className="backdrop-blur-sm hover:scale-105 transition-transform">
                  Try To-Do List
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
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <Link href="/qr-code" className="bg-primary/10 dark:bg-primary/20 p-4 rounded-xl flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-primary/20 dark:bg-primary/30 rounded-lg flex items-center justify-center">
                          <QRCodeIcon className="w-10 h-10 text-primary" />
                        </div>
                      </Link>
                      <Link href="/todo-list" className="bg-amber-500/10 dark:bg-amber-500/20 p-4 rounded-xl flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-amber-500/20 dark:bg-amber-500/30 rounded-lg flex items-center justify-center">
                          <TodoListIcon className="w-10 h-10 text-amber-500" />
                        </div>
                      </Link>
                      <Link href="/calculator" className="bg-indigo-500/10 dark:bg-indigo-500/20 p-4 rounded-xl flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-lg flex items-center justify-center">
                          <CalculatorIcon className="w-10 h-10 text-indigo-500" />
                        </div>
                      </Link>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <Link href="/password-generator" className="bg-secondary/10 dark:bg-secondary/20 p-4 rounded-xl flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-secondary/20 dark:bg-secondary/30 rounded-lg flex items-center justify-center">
                          <PasswordIcon className="w-10 h-10 text-secondary" />
                        </div>
                      </Link>
                      <Link href="/speed-test" className="bg-accent/10 dark:bg-accent/20 p-4 rounded-xl flex items-center justify-center transform transition-transform hover:scale-105 cursor-pointer">
                        <div className="w-16 h-16 bg-accent/20 dark:bg-accent/30 rounded-lg flex items-center justify-center">
                          <SpeedTestIcon className="w-10 h-10 text-accent" />
                        </div>
                      </Link>
                      <div className="bg-gray-100/30 dark:bg-gray-800/30 p-4 rounded-xl flex items-center justify-center">
                        <p className="text-sm text-dark dark:text-light">More soon!</p>
                      </div>
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
      
      {/* Ad Section - First Ad Banner */}
      <section className="py-6 bg-light/30 dark:bg-dark/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <AdBanner className="max-w-2xl" />
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* QR Code Generator Card */}
            <Card variant="glass" className="p-8 animate-on-scroll slide-up delay-100 backdrop-blur-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-primary/20 dark:bg-primary/30 rounded-xl flex items-center justify-center mb-4">
                  <QRCodeIcon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-dark dark:text-light mb-2 flex items-center">
                  QR Code Generator
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white animate-pulse">
                    New
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Quickly generate QR codes for URLs, text, contact information, and more.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="font-medium text-dark dark:text-light">Multiple Types</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Generate QR codes from URLs, text, and more</p>
                </div>
                <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="font-medium text-dark dark:text-light">Customization</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Customize colors and styles</p>
                </div>
              </div>
              
              <Button href="/qr-code" variant="primary" className="w-full hover:scale-105 transition-transform">Try QR Code Generator</Button>
            </Card>

            {/* To-Do List Card */}
            <Card variant="glass" className="p-8 animate-on-scroll slide-up delay-200 backdrop-blur-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-amber-500/20 dark:bg-amber-500/30 rounded-xl flex items-center justify-center mb-4">
                  <TodoListIcon className="w-12 h-12 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-dark dark:text-light mb-2 flex items-center">
                  To-Do List
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white animate-pulse">
                    New
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Stay organized with a simple and effective task management tool.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="font-medium text-dark dark:text-light">Auto-Save</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tasks are saved to your browser</p>
                </div>
                <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="font-medium text-dark dark:text-light">Filters</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Filter by active or completed tasks</p>
                </div>
              </div>
              
              <Button href="/todo-list" variant="custom" className="w-full bg-amber-500 hover:bg-amber-600 text-white hover:scale-105 transition-transform">Try To-Do List</Button>
            </Card>
            
            {/* Calculator Card */}
            <Card variant="glass" className="p-8 animate-on-scroll slide-up delay-300 backdrop-blur-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-xl flex items-center justify-center mb-4">
                  <CalculatorIcon className="w-12 h-12 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold text-dark dark:text-light mb-2 flex items-center">
                  Calculator
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white animate-pulse">
                    New
                  </span>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                  Perform calculations with our easy-to-use online calculator.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="font-medium text-dark dark:text-light">Basic Operations</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Addition, subtraction, multiplication, division</p>
                </div>
                <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="font-medium text-dark dark:text-light">History</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Track your calculation history</p>
                </div>
              </div>
              
              <Button href="/calculator" variant="custom" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white hover:scale-105 transition-transform">Try Calculator</Button>
            </Card>
          </div>
          
          {/* Second Ad Banner */}
          <div className="mt-12">
            <AdBanner className="max-w-2xl mx-auto" />
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
              <Button href="/todo-list" variant="secondary" size="lg" className="hover:scale-105 transition-transform">Try To-Do List</Button>
              <Button href="/calculator" variant="accent" size="lg" className="hover:scale-105 transition-transform">Try Calculator</Button>
            </div>
          </Card>
        </div>
      </section>
      
      {/* All Tools Section */}
      <section className="py-20 bg-gradient-to-b from-light/20 to-light/40 dark:from-dark/20 dark:to-dark/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">All Available Tools</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our complete collection of free online tools to help with your everyday tasks
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {/* QR Code Generator */}
            <Link href="/qr-code" className="group">
              <Card variant="glass" className="h-full p-6 text-center hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/20 dark:bg-primary/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <QRCodeIcon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-light mb-2">QR Code Generator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Generate custom QR codes for URLs, text, and more</p>
                </div>
              </Card>
            </Link>
            
            {/* Password Generator */}
            <Link href="/password-generator" className="group">
              <Card variant="glass" className="h-full p-6 text-center hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-secondary/20 dark:bg-secondary/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <PasswordIcon className="w-10 h-10 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-light mb-2">Password Generator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Create strong, secure passwords with custom options</p>
                </div>
              </Card>
            </Link>
            
            {/* Speed Test */}
            <Link href="/speed-test" className="group">
              <Card variant="glass" className="h-full p-6 text-center hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-accent/20 dark:bg-accent/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <SpeedTestIcon className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-light mb-2">Speed Test</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Test your internet connection speed</p>
                </div>
              </Card>
            </Link>
            
            {/* To-Do List */}
            <Link href="/todo-list" className="group">
              <Card variant="glass" className="h-full p-6 text-center hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-amber-500/20 dark:bg-amber-500/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <TodoListIcon className="w-10 h-10 text-amber-500" />
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-light mb-2">To-Do List</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage and organize your daily tasks</p>
                </div>
              </Card>
            </Link>
            
            {/* Calculator */}
            <Link href="/calculator" className="group">
              <Card variant="glass" className="h-full p-6 text-center hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-indigo-500/20 dark:bg-indigo-500/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <CalculatorIcon className="w-10 h-10 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-light mb-2">Calculator</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Perform calculations with our easy-to-use calculator</p>
                </div>
              </Card>
            </Link>
            
            {/* Coming Soon - File Converter */}
            <div className="opacity-60">
              <Card variant="glass" className="h-full p-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-300/20 dark:bg-gray-700/30 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-light mb-2">File Converter</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Coming soon</p>
                  <span className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500 text-white">
                    Soon
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer CTA Section */}
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
              <Button href="/todo-list" variant="secondary" size="lg" className="hover:scale-105 transition-transform">Try To-Do List</Button>
              <Button href="/calculator" variant="accent" size="lg" className="hover:scale-105 transition-transform">Try Calculator</Button>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
} 
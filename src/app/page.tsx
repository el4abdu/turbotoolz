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
import FileConverterIcon from '@/components/icons/FileConverterIcon';
import SpeedTestIcon from '@/components/icons/SpeedTestIcon';
import TodoIcon from '@/components/icons/TodoIcon';
import CalculatorIcon from '@/components/icons/CalculatorIcon';
import DataVisualizerIcon from '@/components/icons/DataVisualizerIcon';

// Tool interface
interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  url: string;
  isNew?: boolean;
  comingSoon?: boolean;
}

// Define tools
const tools: Tool[] = [
  {
    id: 'qr-code',
    name: 'QR Code Generator',
    description: 'Generate custom QR codes for websites, text, and more',
    icon: <QRCodeIcon className="w-10 h-10" />,
    url: '/qr-code-generator',
  },
  {
    id: 'password',
    name: 'Password Generator',
    description: 'Create strong, secure passwords with custom options',
    icon: <PasswordIcon className="w-10 h-10" />,
    url: '/password-generator',
  },
  {
    id: 'speed-test',
    name: 'Speed Test',
    description: 'Check your internet connection speed and performance',
    icon: <SpeedTestIcon className="w-10 h-10" />,
    url: '/speed-test',
  },
  {
    id: 'todo',
    name: 'To-Do List',
    description: 'Stay organized with a simple and effective task manager',
    icon: <TodoIcon className="w-10 h-10" />,
    url: '/todo',
  },
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Perform calculations with history tracking and advanced functions',
    icon: <CalculatorIcon className="w-10 h-10" />,
    url: '/calculator',
  },
  {
    id: 'file-converter',
    name: 'File Converter',
    description: 'Convert files between different formats with ease',
    icon: <FileConverterIcon className="w-10 h-10" />,
    url: '/file-converter',
    isNew: true,
  },
  {
    id: 'data-visualizer',
    name: 'Data Visualizer',
    description: 'Create beautiful charts and graphs from your data',
    icon: <DataVisualizerIcon className="w-10 h-10" />,
    url: '/data-visualizer',
    comingSoon: true,
  },
];

// Featured tools to highlight
const featuredTools = tools.filter(tool => !tool.comingSoon).slice(0, 3);

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
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-dark dark:text-light mb-6 animate-fade-in">
              <span className="text-primary">Turbo</span>Toolz
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 animate-fade-in animation-delay-200">
              Your all-in-one toolkit for everyday online tasks
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in animation-delay-400">
              <Button
                as={Link}
                href="#all-tools"
                variant="primary"
                size="lg"
                className="px-8"
              >
                Explore Tools
              </Button>
              <Button
                as={Link}
                href="/about"
                variant="outline"
                size="lg"
                className="px-8"
              >
                Learn More
              </Button>
            </div>
            
            {/* Tool Count Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-in animation-delay-600">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-bold text-primary mb-1">{tools.filter(t => !t.comingSoon).length}</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Tools Available</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-bold text-primary mb-1">100%</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Free to Use</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Availability</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 backdrop-blur">
                <div className="text-3xl font-bold text-primary mb-1">Fast</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">Performance</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">
                Featured Tools
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover our most popular tools that help thousands of users every day
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTools.map((tool) => (
                <Link 
                  key={tool.id} 
                  href={tool.url}
                  className="group"
                >
                  <Card 
                    variant="glass" 
                    className="h-full p-6 transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]"
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-4 p-3 bg-primary/10 dark:bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center text-primary">
                        {tool.icon}
                      </div>
                      <h3 className="text-xl font-bold text-dark dark:text-light mb-2 group-hover:text-primary transition-colors">
                        {tool.name}
                        {tool.isNew && (
                          <span className="ml-2 text-xs font-medium bg-primary text-white px-2 py-1 rounded-full">
                            NEW
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                        {tool.description}
                      </p>
                      <div className="mt-auto">
                        <span className="text-primary font-medium flex items-center group-hover:translate-x-1 transition-transform">
                          Try it now
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Ad Banner */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <AdBanner className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* All Tools Section */}
      <section id="all-tools" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">
                All Tools
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explore our complete collection of free online tools
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Link 
                  key={tool.id} 
                  href={tool.comingSoon ? '#' : tool.url}
                  className={`group ${tool.comingSoon ? 'cursor-not-allowed' : ''}`}
                >
                  <Card 
                    variant="neomorphic" 
                    className={`p-4 transition-all duration-300 ${
                      !tool.comingSoon ? 'group-hover:shadow-md group-hover:scale-[1.01]' : 'opacity-70'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="mr-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {tool.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-dark dark:text-light group-hover:text-primary transition-colors flex items-center">
                          {tool.name}
                          {tool.isNew && (
                            <span className="ml-2 text-xs font-medium bg-primary text-white px-2 py-0.5 rounded-full">
                              NEW
                            </span>
                          )}
                          {tool.comingSoon && (
                            <span className="ml-2 text-xs font-medium bg-gray-500 text-white px-2 py-0.5 rounded-full">
                              COMING SOON
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark dark:text-light mb-4">
                Why Choose TurboToolz?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We're committed to providing high-quality tools that make your online tasks easier
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card variant="glass" className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-light mb-2">Fast & Efficient</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    All tools are optimized for speed and performance
                  </p>
                </div>
              </Card>
              
              <Card variant="glass" className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-light mb-2">Secure & Private</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your data never leaves your device for most tools
                  </p>
                </div>
              </Card>
              
              <Card variant="glass" className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-light mb-2">Easy to Use</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Simple, intuitive interfaces for all skill levels
                  </p>
                </div>
              </Card>
              
              <Card variant="glass" className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-dark dark:text-light mb-2">Always Free</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    No hidden fees or premium features
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card variant="gradient" className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to boost your productivity?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Start using our free online tools today and simplify your daily tasks
              </p>
              <Button
                as={Link}
                href="#all-tools"
                variant="light"
                size="lg"
                className="px-8"
              >
                Get Started Now
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
} 
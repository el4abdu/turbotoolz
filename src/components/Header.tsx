"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const toolsMenuRef = useRef<HTMLLIElement>(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle online status
  useEffect(() => {
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Set initial status
    setOnlineStatus(navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Handle click outside of tools menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
        setIsToolsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Define navigation items
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'File Converter', href: '/file-converter' },
    { name: 'Data Visualizer', href: '/data-visualizer' },
    { name: 'Image Editor', href: '/image-editor' },
    { name: 'Text Tools', href: '/text-tools' },
    { name: 'About', href: '/about' },
  ];

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-dark/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center"
          >
            <Logo className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold text-primary">TurboToolz</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 items-center">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={`text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors relative group py-2 ${pathname === item.href ? 'text-primary dark:text-primary' : ''}`}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                </li>
              ))}
              
              {/* Tools Dropdown */}
              <li className="relative" ref={toolsMenuRef}>
                <button 
                  onClick={() => setIsToolsMenuOpen(!isToolsMenuOpen)}
                  className="flex items-center text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors relative group py-2"
                >
                  <span>Tools</span>
                  <svg className={`ml-1 w-4 h-4 transition-transform duration-200 ${isToolsMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </button>
                
                {/* Tools Menu */}
                {isToolsMenuOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
                    <div className="p-2">
                      {navItems.map((item) => (
                        <Link 
                          key={item.href}
                          href={item.href}
                          className={`flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${pathname === item.href ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                          onClick={() => setIsToolsMenuOpen(false)}
                        >
                          <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-md text-blue-500 dark:text-blue-300 mr-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-dark dark:text-light">{item.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Create custom QR codes</div>
                          </div>
                          <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                            New
                          </span>
                        </Link>
                      ))}
                      
                      <Link 
                        href="/password-generator" 
                        className={`flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${pathname === '/password-generator' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                        onClick={() => setIsToolsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-green-100 dark:bg-green-900 rounded-md text-green-500 dark:text-green-300 mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-dark dark:text-light">Password Generator</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Create strong passwords</div>
                        </div>
                        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                          New
                        </span>
                      </Link>
                      
                      <Link 
                        href="/speed-test" 
                        className={`flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${pathname === '/speed-test' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                        onClick={() => setIsToolsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-purple-100 dark:bg-purple-900 rounded-md text-purple-500 dark:text-purple-300 mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-dark dark:text-light">Speed Test</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Check your internet speed</div>
                        </div>
                      </Link>
                      
                      <Link 
                        href="/todo-list" 
                        className={`flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${pathname === '/todo-list' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                        onClick={() => setIsToolsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-amber-100 dark:bg-amber-900 rounded-md text-amber-500 dark:text-amber-300 mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-dark dark:text-light">To-Do List</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Manage your tasks</div>
                        </div>
                        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                          New
                        </span>
                      </Link>
                      
                      <Link 
                        href="/calculator" 
                        className={`flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${pathname === '/calculator' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                        onClick={() => setIsToolsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-indigo-100 dark:bg-indigo-900 rounded-md text-indigo-500 dark:text-indigo-300 mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-dark dark:text-light">Calculator</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Perform calculations</div>
                        </div>
                        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                          New
                        </span>
                      </Link>
                      
                      <Link 
                        href="/file-converter" 
                        className={`flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${pathname === '/file-converter' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                        onClick={() => setIsToolsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-teal-100 dark:bg-teal-900 rounded-md text-teal-500 dark:text-teal-300 mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-dark dark:text-light">File Converter</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Convert between file formats</div>
                        </div>
                        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                          New
                        </span>
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 p-3">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Coming Soon</div>
                      <div className="flex items-center p-2 rounded-md text-gray-500 dark:text-gray-400">
                        <div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Data Visualizer</div>
                          <div className="text-xs">Create charts and graphs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              
              <li>
                <Link 
                  href="/speed-test" 
                  className={`text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors relative group py-2 ${pathname === '/speed-test' ? 'text-primary dark:text-primary' : ''}`}
                >
                  Speed Test
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${pathname === '/speed-test' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              </li>
              
              {/* Status Indicator */}
              <li>
                <div className="flex items-center">
                  <div className={`w-2.5 h-2.5 rounded-full mr-1.5 ${onlineStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{onlineStatus ? 'Online' : 'Offline'}</span>
                </div>
              </li>
              
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-dark dark:text-light focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 h-auto' 
            : 'opacity-0 -translate-y-4 h-0 overflow-hidden'
        }`}
      >
        <nav className="bg-white/90 dark:bg-dark/90 backdrop-blur-md shadow-lg px-4 py-6">
          {/* Status Indicator */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${onlineStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">{onlineStatus ? 'Online' : 'Offline'}</span>
            </div>
          </div>
          
          <ul className="space-y-4">
            <li>
              <Link 
                href="/" 
                className={`block text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-2 ${pathname === '/' ? 'text-primary dark:text-primary font-medium' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            
            {/* Tools Section */}
            <li className="py-2">
              <div className="text-sm uppercase text-gray-500 dark:text-gray-400 font-medium mb-2">Tools</div>
              <ul className="space-y-3 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className={`flex items-center text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-1 ${pathname === item.href ? 'text-primary dark:text-primary' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                      </svg>
                      {item.name}
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                        New
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
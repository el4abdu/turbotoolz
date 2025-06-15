"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const toolsMenuRef = useRef<HTMLLIElement>(null);
  const { theme } = useTheme();
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
            className="relative group"
          >
            <div className="w-36 h-12 relative">
              {theme === 'dark' ? (
                // Dark mode logo (white version)
                <svg className="w-full h-full" viewBox="0 0 888 484.74" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M130.21,360.61v-50.2h179.4v50.2H254.24V516.69h-69V360.61Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                  <path d="M421.65,363.2h69V515.07H424.56l-.32-10q-8.43,5.84-21.38,9.55a105.5,105.5,0,0,1-29.14,3.73q-26.24,0-41.12-15.06t-14.9-43.88V363.2h69v89.37q0,15.23,15.22,15.22a26.64,26.64,0,0,0,11.17-2.59,23.62,23.62,0,0,0,8.59-6.15Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                  <path d="M604,364.49A110.39,110.39,0,0,1,632.77,360v51.16q-8.1.33-17.81,1.62a159.13,159.13,0,0,0-18.46,2.91,66.51,66.51,0,0,0-14.89,4.21v95.21h-69V363.2H581l.32,10.68Q589.71,368.71,604,364.49Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                  <path d="M803.91,377.93q19.59,18,19.59,60.07,0,40.49-19.43,60.39t-51.81,19.92q-14.25,0-24.77-3.73a73.25,73.25,0,0,1-19.6-10.52l-3.23,11H645.07v-216h69v68.33a56.75,56.75,0,0,1,16.51-5.51A101,101,0,0,1,749.67,360Q784.31,360,803.91,377.93Zm-55.86,84.35q5.18-6.79,5.18-23.47T748.05,416q-5.19-6.15-15.55-6.15-11.32,0-18.45,6.15v46a35,35,0,0,0,8.25,5.18,24.88,24.88,0,0,0,10.2,1.94Q742.87,469.08,748.05,462.28Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                  <path d="M995.22,380Q972.22,360,925.6,360T856.3,380q-22.66,20.09-22.66,59.1t22.5,59.1q22.5,20.09,69.46,20.08t69.78-20.08q22.83-20.07,22.83-59.1T995.22,380Zm-95.54.06h52.51v32.23l-2,57.13H901.66l-2-57.13ZM953.51,503H898.36V481h55.15Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                  <path d="M333.47,282.84C337,222.62,380.27,148,464.76,121.26c86.1-27.25,169.62,9.49,210.67,64.6-9.14,3.54-18.19,7.07-27.25,10.55-11.32,4.35-22.72,8.53-34,13.08-2.91,1.18-4.37,.62-6.3-1.61-24.72-28.41-55.88-46.15-93.29-52-48.19-7.54-91.3,4.75-128.41,36-27.83,23.4-44.91,53.28-52,88.7A18,18,0,0,1,333.47,282.84Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                  <path d="M689.86,196.7c-1.26.92-2.51,1.88-3.8,2.77q-70.44,48.14-140.83,96.32a13.7,13.7,0,0,0-4.38,5.17,30.41,30.41,0,0,1-37.34,15.75,29.69,29.69,0,0,1-19.32-35.56c3.84-14.72,18.68-24.15,34.07-21.87a15,15,0,0,0,7.2-.75Q605.27,228.05,685,197.38c1.46-.56,2.94-1,4.41-1.56Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                  <path d="M634.61,251.72l58.86-40.19c4.3,11.05,8.81,21.33,12.31,31.93A170.83,170.83,0,0,1,714,298.35c0,3.67-.86,5.24-4.94,5.2-19.74-.16-39.49-.08-59.23-.07-2.35,0-4.56,0-4.72-3.27A154.08,154.08,0,0,0,634.61,251.72Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                  <line x1="622.15" y1="451.86" x2="863.03" y2="451.86" stroke="#ffffff" strokeWidth="5" strokeMiterlimit="10"/>
                  <line x1="622.15" y1="461.86" x2="863.03" y2="461.86" stroke="#ffffff" strokeWidth="5" strokeMiterlimit="10"/>
                  <line x1="65.63" y1="451.86" x2="306.52" y2="451.86" stroke="#ffffff" strokeWidth="5" strokeMiterlimit="10"/>
                  <line x1="65.63" y1="461.86" x2="306.52" y2="461.86" stroke="#ffffff" strokeWidth="5" strokeMiterlimit="10"/>
                </svg>
              ) : (
                // Light mode logo (dark version)
                <svg className="w-full h-full" viewBox="0 0 888 484.74" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M130.21,360.61v-50.2h179.4v50.2H254.24V516.69h-69V360.61Z" transform="translate(-130.21 -112.06)" fill="#1F2937"/>
                  <path d="M421.65,363.2h69V515.07H424.56l-.32-10q-8.43,5.84-21.38,9.55a105.5,105.5,0,0,1-29.14,3.73q-26.24,0-41.12-15.06t-14.9-43.88V363.2h69v89.37q0,15.23,15.22,15.22a26.64,26.64,0,0,0,11.17-2.59,23.62,23.62,0,0,0,8.59-6.15Z" transform="translate(-130.21 -112.06)" fill="#1F2937"/>
                  <path d="M604,364.49A110.39,110.39,0,0,1,632.77,360v51.16q-8.1.33-17.81,1.62a159.13,159.13,0,0,0-18.46,2.91,66.51,66.51,0,0,0-14.89,4.21v95.21h-69V363.2H581l.32,10.68Q589.71,368.71,604,364.49Z" transform="translate(-130.21 -112.06)" fill="#1F2937"/>
                  <path d="M803.91,377.93q19.59,18,19.59,60.07,0,40.49-19.43,60.39t-51.81,19.92q-14.25,0-24.77-3.73a73.25,73.25,0,0,1-19.6-10.52l-3.23,11H645.07v-216h69v68.33a56.75,56.75,0,0,1,16.51-5.51A101,101,0,0,1,749.67,360Q784.31,360,803.91,377.93Zm-55.86,84.35q5.18-6.79,5.18-23.47T748.05,416q-5.19-6.15-15.55-6.15-11.32,0-18.45,6.15v46a35,35,0,0,0,8.25,5.18,24.88,24.88,0,0,0,10.2,1.94Q742.87,469.08,748.05,462.28Z" transform="translate(-130.21 -112.06)" fill="#1F2937"/>
                  <path d="M995.22,380Q972.22,360,925.6,360T856.3,380q-22.66,20.09-22.66,59.1t22.5,59.1q22.5,20.09,69.46,20.08t69.78-20.08q22.83-20.07,22.83-59.1T995.22,380Zm-95.54.06h52.51v32.23l-2,57.13H901.66l-2-57.13ZM953.51,503H898.36V481h55.15Z" transform="translate(-130.21 -112.06)" fill="#1F2937"/>
                  <path d="M333.47,282.84C337,222.62,380.27,148,464.76,121.26c86.1-27.25,169.62,9.49,210.67,64.6-9.14,3.54-18.19,7.07-27.25,10.55-11.32,4.35-22.72,8.53-34,13.08-2.91,1.18-4.37,.62-6.3-1.61-24.72-28.41-55.88-46.15-93.29-52-48.19-7.54-91.3,4.75-128.41,36-27.83,23.4-44.91,53.28-52,88.7A18,18,0,0,1,333.47,282.84Z" transform="translate(-130.21 -112.06)" fill="#4F46E5"/>
                  <path d="M689.86,196.7c-1.26.92-2.51,1.88-3.8,2.77q-70.44,48.14-140.83,96.32a13.7,13.7,0,0,0-4.38,5.17,30.41,30.41,0,0,1-37.34,15.75,29.69,29.69,0,0,1-19.32-35.56c3.84-14.72,18.68-24.15,34.07-21.87a15,15,0,0,0,7.2-.75Q605.27,228.05,685,197.38c1.46-.56,2.94-1,4.41-1.56Z" transform="translate(-130.21 -112.06)" fill="#3B82F6"/>
                  <path d="M634.61,251.72l58.86-40.19c4.3,11.05,8.81,21.33,12.31,31.93A170.83,170.83,0,0,1,714,298.35c0,3.67-.86,5.24-4.94,5.2-19.74-.16-39.49-.08-59.23-.07-2.35,0-4.56,0-4.72-3.27A154.08,154.08,0,0,0,634.61,251.72Z" transform="translate(-130.21 -112.06)" fill="#F59E0B"/>
                  <line x1="622.15" y1="451.86" x2="863.03" y2="451.86" stroke="#1F2937" strokeWidth="5" strokeMiterlimit="10"/>
                  <line x1="622.15" y1="461.86" x2="863.03" y2="461.86" stroke="#1F2937" strokeWidth="5" strokeMiterlimit="10"/>
                  <line x1="65.63" y1="451.86" x2="306.52" y2="451.86" stroke="#1F2937" strokeWidth="5" strokeMiterlimit="10"/>
                  <line x1="65.63" y1="461.86" x2="306.52" y2="461.86" stroke="#1F2937" strokeWidth="5" strokeMiterlimit="10"/>
                </svg>
              )}
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 items-center">
              <li>
                <Link 
                  href="/" 
                  className={`text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors relative group py-2 ${pathname === '/' ? 'text-primary dark:text-primary' : ''}`}
                >
                  Home
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              </li>
              
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
                      <Link 
                        href="/qr-code" 
                        className={`flex items-center p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${pathname === '/qr-code' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                        onClick={() => setIsToolsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900 rounded-md text-blue-500 dark:text-blue-300 mr-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-dark dark:text-light">QR Code Generator</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Create custom QR codes</div>
                        </div>
                        <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                          New
                        </span>
                      </Link>
                      
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
                <li>
                  <Link 
                    href="/qr-code" 
                    className={`flex items-center text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-1 ${pathname === '/qr-code' ? 'text-primary dark:text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>
                    </svg>
                    QR Code Generator
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/password-generator" 
                    className={`flex items-center text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-1 ${pathname === '/password-generator' ? 'text-primary dark:text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                    Password Generator
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/speed-test" 
                    className={`flex items-center text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-1 ${pathname === '/speed-test' ? 'text-primary dark:text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Speed Test
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/todo-list" 
                    className={`flex items-center text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-1 ${pathname === '/todo-list' ? 'text-primary dark:text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                    To-Do List
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/calculator" 
                    className={`flex items-center text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-1 ${pathname === '/calculator' ? 'text-primary dark:text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    Calculator
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/file-converter" 
                    className={`flex items-center text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-1 ${pathname === '/file-converter' ? 'text-primary dark:text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                    </svg>
                    File Converter
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                      New
                    </span>
                  </Link>
                </li>
                <li className="text-gray-400 dark:text-gray-500">
                  <div className="flex items-center py-1">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                    Data Visualizer
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-500 text-white">
                      Soon
                    </span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
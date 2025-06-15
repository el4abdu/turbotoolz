"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { useTheme } from './ThemeProvider';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
                  className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors relative group py-2"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/qr-code" 
                  className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors relative group py-2"
                >
                  QR Code
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                    New
                  </span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/password-generator" 
                  className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors relative group py-2"
                >
                  Password Generator
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                    New
                  </span>
                </Link>
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
          <ul className="space-y-4">
            <li>
              <Link 
                href="/" 
                className="block text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/qr-code" 
                className="block text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                QR Code
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                  New
                </span>
              </Link>
            </li>
            <li>
              <Link 
                href="/password-generator" 
                className="block text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Password Generator
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-500 text-white">
                  New
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
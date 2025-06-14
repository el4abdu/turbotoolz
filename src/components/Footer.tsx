"use client";

import React from 'react';
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

const Footer = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-1">
            <Link href="/" className="inline-block">
              <div className="w-32 h-10 relative mb-4">
                {theme === 'dark' ? (
                  // Dark mode logo (white version)
                  <svg className="w-full h-full" viewBox="0 0 888 484.74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M130.21,360.61v-50.2h179.4v50.2H254.24V516.69h-69V360.61Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                    <path d="M421.65,363.2h69V515.07H424.56l-.32-10q-8.43,5.84-21.38,9.55a105.5,105.5,0,0,1-29.14,3.73q-26.24,0-41.12-15.06t-14.9-43.88V363.2h69v89.37q0,15.23,15.22,15.22a26.64,26.64,0,0,0,11.17-2.59,23.62,23.62,0,0,0,8.59-6.15Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                    <path d="M604,364.49A110.39,110.39,0,0,1,632.77,360v51.16q-8.1.33-17.81,1.62a159.13,159.13,0,0,0-18.46,2.91,66.51,66.51,0,0,0-14.89,4.21v95.21h-69V363.2H581l.32,10.68Q589.71,368.71,604,364.49Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                    <path d="M803.91,377.93q19.59,18,19.59,60.07,0,40.49-19.43,60.39t-51.81,19.92q-14.25,0-24.77-3.73a73.25,73.25,0,0,1-19.6-10.52l-3.23,11H645.07v-216h69v68.33a56.75,56.75,0,0,1,16.51-5.51A101,101,0,0,1,749.67,360Q784.31,360,803.91,377.93Zm-55.86,84.35q5.18-6.79,5.18-23.47T748.05,416q-5.19-6.15-15.55-6.15-11.32,0-18.45,6.15v46a35,35,0,0,0,8.25,5.18,24.88,24.88,0,0,0,10.2,1.94Q742.87,469.08,748.05,462.28Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                    <path d="M995.22,380Q972.22,360,925.6,360T856.3,380q-22.66,20.09-22.66,59.1t22.5,59.1q22.5,20.09,69.46,20.08t69.78-20.08q22.83-20.07,22.83-59.1T995.22,380Zm-95.54.06h52.51v32.23l-2,57.13H901.66l-2-57.13ZM953.51,503H898.36V481h55.15Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
                    <path d="M333.47,282.84C337,222.62,380.27,148,464.76,121.26c86.1-27.25,169.62,9.49,210.67,64.6-9.14,3.54-18.19,7.07-27.25,10.55-11.32,4.35-22.72,8.53-34,13.08-2.91,1.18-4.37.62-6.3-1.61-24.72-28.41-55.88-46.15-93.29-52-48.19-7.54-91.3,4.75-128.41,36-27.83,23.4-44.91,53.28-52,88.7A18,18,0,0,1,333.47,282.84Z" transform="translate(-130.21 -112.06)" fill="#ffffff"/>
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
                    <path d="M333.47,282.84C337,222.62,380.27,148,464.76,121.26c86.1-27.25,169.62,9.49,210.67,64.6-9.14,3.54-18.19,7.07-27.25,10.55-11.32,4.35-22.72,8.53-34,13.08-2.91,1.18-4.37.62-6.3-1.61-24.72-28.41-55.88-46.15-93.29-52-48.19-7.54-91.3,4.75-128.41,36-27.83,23.4-44.91,53.28-52,88.7A18,18,0,0,1,333.47,282.84Z" transform="translate(-130.21 -112.06)" fill="#4F46E5"/>
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
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Powerful web tools for everyday tasks. Fast, free, and secure online utilities.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-dark dark:text-light mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/qr-code" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link 
                  href="/password-generator" 
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  Password Generator
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-dark dark:text-light mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/turbotoolz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark dark:bg-light text-light dark:text-dark flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://twitter.com/turbotoolz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark dark:bg-light text-light dark:text-dark flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a 
                href="mailto:contact@turbotoolz.com" 
                className="w-10 h-10 rounded-full bg-dark dark:bg-light text-light dark:text-dark flex items-center justify-center hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} TurboToolz. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link 
                href="/privacy" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
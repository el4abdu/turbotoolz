'use client';

import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import AdBanner from '@/components/AdBanner';

// Define types for our content tabs
type TabType = 'url' | 'text' | 'email' | 'phone' | 'direct';
type DownloadFormat = 'png' | 'svg';

export default function QRCodePage() {
  // QR Code states
  const [qrValue, setQrValue] = useState<string>('https://turbotoolz.com');
  const [qrSize, setQrSize] = useState<number>(200);
  const [qrFgColor, setQrFgColor] = useState<string>('#000000');
  const [qrBgColor, setQrBgColor] = useState<string>('#ffffff');
  const [qrLevel, setQrLevel] = useState<'L' | 'M' | 'Q' | 'H'>('Q');
  const [qrIncludeMargin, setQrIncludeMargin] = useState<boolean>(true);
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [showLogo, setShowLogo] = useState<boolean>(false);
  const [logoSize, setLogoSize] = useState<number>(50);
  
  // Form states
  const [inputValue, setInputValue] = useState<string>('https://turbotoolz.com');
  const [activeTab, setActiveTab] = useState<TabType>('url');
  
  // Download functionality
  const qrRef = useRef<SVGSVGElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  
  const handleTabChange = (tab: TabType): void => {
    setActiveTab(tab);
    
    // Set default values based on tab
    switch(tab) {
      case 'url':
        setInputValue('https://turbotoolz.com');
        break;
      case 'text':
        setInputValue('Hello from TurboToolz!');
        break;
      case 'email':
        setInputValue('example@email.com');
        break;
      case 'phone':
        setInputValue('+1234567890');
        break;
      case 'direct':
        setInputValue('https://turbotoolz.com');
        break;
      default:
        setInputValue('');
    }
    
    handleGenerateQR();
  };
  
  const handleGenerateQR = (): void => {
    let finalValue = inputValue;
    
    // Format value based on type
    switch(activeTab) {
      case 'email':
        finalValue = `mailto:${inputValue}`;
        break;
      case 'phone':
        finalValue = `tel:${inputValue}`;
        break;
      default:
        finalValue = inputValue;
    }
    
    setQrValue(finalValue);
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create object URL for the uploaded file
    const objectUrl = URL.createObjectURL(file);
    setLogoUrl(objectUrl);
    setShowLogo(true);
    
    // Set error correction to high when using logo
    setQrLevel('H');
  };
  
  const removeLogo = (): void => {
    setShowLogo(false);
    setLogoUrl('');
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };
  
  const downloadQRCode = (format: DownloadFormat): void => {
    if (!qrRef.current) return;
    
    const canvas = document.createElement('canvas');
    const svgElement = qrRef.current;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = () => {
      canvas.width = qrSize;
      canvas.height = qrSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Apply background (transparent or colored)
      if (!isTransparent) {
        ctx.fillStyle = qrBgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        // For transparent background, we don't fill the background
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      
      // Draw QR code
      ctx.drawImage(img, 0, 0, qrSize, qrSize);
      
      // Draw logo if enabled
      if (showLogo && logoUrl) {
        const logoImg = new Image();
        logoImg.onload = () => {
          // Calculate logo position (center)
          const logoX = (canvas.width - logoSize) / 2;
          const logoY = (canvas.height - logoSize) / 2;
          
          // Draw white background for logo
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(logoX - 5, logoY - 5, logoSize + 10, logoSize + 10);
          
          // Draw logo
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize);
          
          // Create download link
          let downloadLink = document.createElement('a');
          
          if (format === 'png') {
            downloadLink.href = canvas.toDataURL('image/png');
            downloadLink.download = 'qrcode.png';
          } else if (format === 'svg') {
            downloadLink.href = svgUrl;
            downloadLink.download = 'qrcode.svg';
          }
          
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        };
        logoImg.src = logoUrl;
      } else {
        // No logo, proceed with download
        let downloadLink = document.createElement('a');
        
        if (format === 'png') {
          downloadLink.href = canvas.toDataURL('image/png');
          downloadLink.download = 'qrcode.png';
        } else if (format === 'svg') {
          downloadLink.href = svgUrl;
          downloadLink.download = 'qrcode.svg';
        }
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    };
    
    img.src = svgUrl;
  };

  return (
    <>
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-light mb-6 fade-in">
                QR Code Generator
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 fade-in delay-100">
                Create custom QR codes for your website, business, or personal use
              </p>
            </div>
            
            {/* QR Code Generator */}
            <Card variant="glass" className="p-8 md:p-8 mb-12 fade-in delay-200">
              <div className="flex flex-col md:flex-row gap-8">
                {/* QR Code Display */}
                <div className="md:w-1/2 flex flex-col items-center justify-center">
                  <div 
                    className={`${isTransparent ? 'bg-transparent' : 'bg-white'} p-4 rounded-xl shadow-md mb-6 flex items-center justify-center relative`}
                    style={{
                      backgroundImage: isTransparent ? 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABZ0RVh0Q3JlYXRpb24gVGltZQAxMC8yOS8xMiKqq3kAAAAcdEVYdFNvZnR3YXJlAEFkb2JlIEZpcmV3b3JrcyBDUzVxteM2AAAAHklEQVQ4jWP8//8/AyWAiYFCMGrAqAGjBowaMGoABQYAAM0ATfTeYNEAAAAASUVORK5CYII=")' : 'none'
                    }}
                  >
                    <QRCodeSVG
                      ref={qrRef}
                      value={qrValue}
                      size={qrSize}
                      fgColor={qrFgColor}
                      bgColor={isTransparent ? 'transparent' : qrBgColor}
                      level={qrLevel}
                      includeMargin={qrIncludeMargin}
                    />
                    {showLogo && logoUrl && (
                      <div 
                        className="absolute"
                        style={{
                          width: `${logoSize}px`,
                          height: `${logoSize}px`,
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          backgroundColor: '#FFFFFF',
                          padding: '5px',
                          borderRadius: '4px'
                        }}
                      >
                        <img 
                          src={logoUrl} 
                          alt="Logo" 
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                        />
                      </div>
                    )}
            </div>
            
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="primary" 
                        className="flex-1"
                        onClick={() => downloadQRCode('png')}
                      >
                        Download PNG
                      </Button>
                      <Button 
                        variant="secondary" 
                        className="flex-1"
                        onClick={() => downloadQRCode('svg')}
                      >
                        Download SVG
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* QR Code Settings */}
                <div className="md:w-1/2">
                  <h2 className="text-xl font-bold text-dark dark:text-light mb-4">
                    Create Your QR Code
                  </h2>
                  
                  {/* Content Type Tabs */}
                  <div className="mb-6">
                    <div className="flex border-b border-gray-300 dark:border-gray-700 overflow-x-auto">
                      <button
                        className={`px-4 py-2 ${activeTab === 'url' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400'}`}
                        onClick={() => handleTabChange('url')}
                      >
                        URL
                      </button>
                      <button
                        className={`px-4 py-2 ${activeTab === 'text' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400'}`}
                        onClick={() => handleTabChange('text')}
                      >
                        Text
                      </button>
                      <button
                        className={`px-4 py-2 ${activeTab === 'email' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400'}`}
                        onClick={() => handleTabChange('email')}
                      >
                        Email
                      </button>
                      <button
                        className={`px-4 py-2 ${activeTab === 'phone' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400'}`}
                        onClick={() => handleTabChange('phone')}
                      >
                        Phone
                      </button>
                      <button
                        className={`px-4 py-2 ${activeTab === 'direct' ? 'border-b-2 border-primary text-primary' : 'text-gray-600 dark:text-gray-400'}`}
                        onClick={() => handleTabChange('direct')}
                      >
                        Direct Link
                      </button>
                    </div>
                  </div>
                  
                  {/* Input Field */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {activeTab === 'url' ? 'Website URL' : 
                       activeTab === 'text' ? 'Text Content' :
                       activeTab === 'email' ? 'Email Address' :
                       activeTab === 'phone' ? 'Phone Number' : 'Direct Link URL'}
                    </label>
                    <input
                      type={activeTab === 'email' ? 'email' : 'text'}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      placeholder={
                        activeTab === 'url' ? 'https://example.com' : 
                        activeTab === 'text' ? 'Enter your text here' :
                        activeTab === 'email' ? 'example@email.com' : 
                        activeTab === 'phone' ? '+1234567890' :
                        'https://turbotoolz.com/direct-link'
                      }
                    />
                    {activeTab === 'direct' && (
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Direct links open immediately when scanned, without user confirmation
                      </p>
                    )}
                  </div>
                  
                  {/* Logo Upload */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Add Logo (Optional)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        ref={logoInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                      />
                      {showLogo && (
                        <button
                          onClick={removeLogo}
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    {showLogo && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Logo Size: {logoSize}px
                        </label>
                        <input
                          type="range"
                          min="20"
                          max="100"
                          value={logoSize}
                          onChange={(e) => setLogoSize(parseInt(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* QR Code Options */}
                  <div className="space-y-4">
                    {/* Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Size: {qrSize}px
                      </label>
                      <input
                        type="range"
                        min="100"
                        max="400"
                        value={qrSize}
                        onChange={(e) => setQrSize(parseInt(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    {/* Colors */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Foreground Color
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={qrFgColor}
                            onChange={(e) => setQrFgColor(e.target.value)}
                            className="w-10 h-10 rounded border border-gray-300 dark:border-gray-700 mr-2"
                          />
                          <input
                            type="text"
                            value={qrFgColor}
                            onChange={(e) => setQrFgColor(e.target.value)}
                            className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Background Color
                        </label>
                        <div className="flex items-center">
                          <input
                            type="color"
                            value={qrBgColor}
                            onChange={(e) => setQrBgColor(e.target.value)}
                            disabled={isTransparent}
                            className={`w-10 h-10 rounded border border-gray-300 dark:border-gray-700 mr-2 ${isTransparent ? 'opacity-50 cursor-not-allowed' : ''}`}
                          />
                          <input
                            type="text"
                            value={qrBgColor}
                            onChange={(e) => setQrBgColor(e.target.value)}
                            disabled={isTransparent}
                            className={`flex-1 px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${isTransparent ? 'opacity-50 cursor-not-allowed' : ''}`}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Transparent Background */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="transparentBg"
                        checked={isTransparent}
                        onChange={(e) => setIsTransparent(e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="transparentBg" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Transparent Background
                      </label>
                    </div>
                    
                    {/* Error Correction */}
                      <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Error Correction Level
                      </label>
                      <select
                        value={qrLevel}
                        onChange={(e) => setQrLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      >
                        <option value="L">Low (7%)</option>
                        <option value="M">Medium (15%)</option>
                        <option value="Q">Quartile (25%)</option>
                        <option value="H">High (30%)</option>
                      </select>
                      {showLogo && qrLevel !== 'H' && (
                        <p className="mt-1 text-sm text-amber-600 dark:text-amber-400">
                          High error correction recommended when using a logo
                        </p>
                      )}
                    </div>
                    
                    {/* Include Margin */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="includeMargin"
                        checked={qrIncludeMargin}
                        onChange={(e) => setQrIncludeMargin(e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="includeMargin" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Include Margin
                      </label>
                    </div>
                      </div>
                  
                  <Button 
                    variant="primary" 
                    className="w-full mt-6"
                    onClick={handleGenerateQR}
                  >
                    Generate QR Code
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Ad Banner - Bottom */}
            <div className="mb-12">
              <AdBanner className="max-w-2xl mx-auto" />
            </div>
            
            {/* Features Section */}
            <Card variant="neomorphic" className="p-8 mb-12 fade-in delay-300">
              <h2 className="text-2xl font-bold text-dark dark:text-light mb-6 text-center">
                Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Fast Generation</h3>
                    <p className="text-gray-600 dark:text-gray-400">Create QR codes instantly with our lightning-fast generator</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Customizable Colors</h3>
                    <p className="text-gray-600 dark:text-gray-400">Personalize your QR codes with custom colors to match your brand</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Multiple Formats</h3>
                    <p className="text-gray-600 dark:text-gray-400">Download your QR codes in PNG or SVG formats</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Error Correction</h3>
                    <p className="text-gray-600 dark:text-gray-400">Adjust error correction levels for better scanning reliability</p>
                  </div>
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
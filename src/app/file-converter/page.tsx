'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import Card from '@/components/Card';
import AdBanner from '@/components/AdBanner';
import Button from '@/components/Button';

// Define supported conversion types
type ConversionType = 'image' | 'document' | 'audio';
type FileFormat = string;

interface FormatOption {
  value: string;
  label: string;
}

interface ConversionOption {
  type: ConversionType;
  name: string;
  icon: React.ReactNode;
  fromFormats: FormatOption[];
  toFormats: FormatOption[];
}

export default function FileConverterPage() {
  const [selectedType, setSelectedType] = useState<ConversionType | null>(null);
  const [fromFormat, setFromFormat] = useState<FileFormat>('');
  const [toFormat, setToFormat] = useState<FileFormat>('');
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedFileUrl, setConvertedFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Define conversion options
  const conversionOptions: ConversionOption[] = [
    {
      type: 'image',
      name: 'Image Converter',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
      ),
      fromFormats: [
        { value: 'jpg', label: 'JPG' },
        { value: 'png', label: 'PNG' },
        { value: 'gif', label: 'GIF' },
        { value: 'bmp', label: 'BMP' },
        { value: 'webp', label: 'WebP' },
        { value: 'svg', label: 'SVG' },
      ],
      toFormats: [
        { value: 'jpg', label: 'JPG' },
        { value: 'png', label: 'PNG' },
        { value: 'gif', label: 'GIF' },
        { value: 'webp', label: 'WebP' },
        { value: 'svg', label: 'SVG' },
      ],
    },
    {
      type: 'document',
      name: 'Document Converter',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      fromFormats: [
        { value: 'pdf', label: 'PDF' },
        { value: 'docx', label: 'DOCX' },
        { value: 'doc', label: 'DOC' },
        { value: 'txt', label: 'TXT' },
        { value: 'rtf', label: 'RTF' },
      ],
      toFormats: [
        { value: 'pdf', label: 'PDF' },
        { value: 'docx', label: 'DOCX' },
        { value: 'txt', label: 'TXT' },
        { value: 'rtf', label: 'RTF' },
      ],
    },
    {
      type: 'audio',
      name: 'Audio Converter',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
        </svg>
      ),
      fromFormats: [
        { value: 'mp3', label: 'MP3' },
        { value: 'wav', label: 'WAV' },
        { value: 'ogg', label: 'OGG' },
        { value: 'flac', label: 'FLAC' },
        { value: 'aac', label: 'AAC' },
      ],
      toFormats: [
        { value: 'mp3', label: 'MP3' },
        { value: 'wav', label: 'WAV' },
        { value: 'ogg', label: 'OGG' },
        { value: 'flac', label: 'FLAC' },
      ],
    },
  ];

  const handleTypeSelect = (type: ConversionType) => {
    setSelectedType(type);
    setFromFormat('');
    setToFormat('');
    setFile(null);
    setConvertedFileUrl(null);
    setError(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setConvertedFileUrl(null);
    }
  };

  const handleConvert = async () => {
    if (!file || !fromFormat || !toFormat) {
      setError('Please select a file and conversion formats');
      return;
    }

    setIsConverting(true);
    setError(null);

    try {
      // In a real application, we would send the file to a backend service
      // For this demo, we'll simulate a conversion with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create a fake converted file URL
      // In a real app, this would be the URL to the converted file from the server
      const fakeConvertedUrl = URL.createObjectURL(file);
      setConvertedFileUrl(fakeConvertedUrl);
    } catch (err) {
      setError('An error occurred during conversion. Please try again.');
      console.error('Conversion error:', err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedFileUrl) {
      const a = document.createElement('a');
      a.href = convertedFileUrl;
      a.download = `converted-file.${toFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const selectedOption = selectedType ? conversionOptions.find(option => option.type === selectedType) : null;

  return (
    <>
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-light mb-6 fade-in">
                File Converter
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 fade-in delay-100">
                Convert your files between different formats easily and securely
              </p>
            </div>
            
            {/* Conversion Type Selection */}
            <Card variant="glass" className="p-6 mb-8 fade-in delay-200">
              <h2 className="text-xl font-bold text-dark dark:text-light mb-4">Select Conversion Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {conversionOptions.map((option) => (
                  <button
                    key={option.type}
                    onClick={() => handleTypeSelect(option.type)}
                    className={`flex flex-col items-center p-6 rounded-lg transition-all ${
                      selectedType === option.type
                        ? 'bg-primary/20 dark:bg-primary/30 border-2 border-primary'
                        : 'bg-white/50 dark:bg-gray-800/50 border-2 border-transparent hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                      selectedType === option.type
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {option.icon}
                    </div>
                    <span className="font-medium text-dark dark:text-light">{option.name}</span>
                  </button>
                ))}
              </div>
            </Card>
            
            {/* Conversion Options */}
            {selectedType && (
              <Card variant="neomorphic" className="p-6 mb-8 fade-in delay-300">
                <h2 className="text-xl font-bold text-dark dark:text-light mb-6">Conversion Options</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* From Format */}
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Convert from:</label>
                    <select
                      value={fromFormat}
                      onChange={(e) => setFromFormat(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select format</option>
                      {selectedOption?.fromFormats.map((format) => (
                        <option key={format.value} value={format.value}>
                          {format.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* To Format */}
                  <div>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Convert to:</label>
                    <select
                      value={toFormat}
                      onChange={(e) => setToFormat(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                      disabled={!fromFormat}
                    >
                      <option value="">Select format</option>
                      {selectedOption?.toFormats
                        .filter((format) => format.value !== fromFormat)
                        .map((format) => (
                          <option key={format.value} value={format.value}>
                            {format.label}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                
                {/* File Upload */}
                <div className="mb-6">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Upload file:</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {file ? (
                          <>
                            <svg className="w-8 h-8 text-primary mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{file.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </>
                        ) : (
                          <>
                            <svg className="w-8 h-8 text-gray-500 dark:text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="text-sm text-gray-700 dark:text-gray-300">Click to upload or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Max file size: 100MB</p>
                          </>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept={fromFormat ? `.${fromFormat}` : undefined}
                        disabled={!fromFormat || !toFormat}
                      />
                    </label>
                  </div>
                </div>
                
                {/* Error Message */}
                {error && (
                  <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}
                
                {/* Convert Button */}
                <Button
                  onClick={handleConvert}
                  disabled={!file || !fromFormat || !toFormat || isConverting}
                  variant="primary"
                  className="w-full"
                >
                  {isConverting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Converting...
                    </div>
                  ) : (
                    'Convert File'
                  )}
                </Button>
              </Card>
            )}
            
            {/* Conversion Result */}
            {convertedFileUrl && (
              <Card variant="neomorphic" className="p-6 mb-8 fade-in delay-400">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-dark dark:text-light mb-2">Conversion Complete!</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Your file has been successfully converted.</p>
                  
                  <Button onClick={handleDownload} variant="primary" className="mb-4">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Download Converted File
                  </Button>
                  
                  <Button onClick={() => setConvertedFileUrl(null)} variant="ghost">
                    Convert Another File
                  </Button>
                </div>
              </Card>
            )}
            
            {/* Ad Banner */}
            <div className="mb-12">
              <AdBanner className="max-w-2xl mx-auto" />
            </div>
            
            {/* Features */}
            <Card variant="neomorphic" className="p-8 mb-12 fade-in delay-400">
              <h2 className="text-2xl font-bold text-dark dark:text-light mb-6 text-center">
                Features
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Multiple Formats</h3>
                    <p className="text-gray-600 dark:text-gray-400">Convert between various image, document, and audio formats</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Secure Conversion</h3>
                    <p className="text-gray-600 dark:text-gray-400">Your files are processed securely and not stored on our servers</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Fast Processing</h3>
                    <p className="text-gray-600 dark:text-gray-400">Quick conversion with optimized algorithms</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Cloud Processing</h3>
                    <p className="text-gray-600 dark:text-gray-400">No software installation required, everything is done in the cloud</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

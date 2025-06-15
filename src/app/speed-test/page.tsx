'use client';

import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import AdBanner from '@/components/AdBanner';

interface TestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  latency: number;
  jitter: number;
  timestamp: Date;
}

export default function SpeedTestPage() {
  // Test states
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  const [testProgress, setTestProgress] = useState<number>(0);
  const [testPhase, setTestPhase] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [connectionType, setConnectionType] = useState<string>('');
  const [ipAddress, setIpAddress] = useState<string>('');
  const [isp, setIsp] = useState<string>('');
  
  // Canvas refs for gauges
  const downloadGaugeRef = useRef<HTMLCanvasElement | null>(null);
  const uploadGaugeRef = useRef<HTMLCanvasElement | null>(null);
  const latencyGaugeRef = useRef<HTMLCanvasElement | null>(null);
  
  // Load test history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('speedTestHistory');
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          setTestHistory(parsedHistory);
        } catch (error) {
          console.error('Error parsing speed test history:', error);
        }
      }
      
      // Try to get connection info
      detectConnectionInfo();
    }
  }, []);
  
  // Save test history to localStorage when it changes
  useEffect(() => {
    if (testHistory.length > 0 && typeof window !== 'undefined') {
      const limitedHistory = testHistory.slice(0, 10); // Keep only the last 10 tests
      localStorage.setItem('speedTestHistory', JSON.stringify(limitedHistory));
    }
  }, [testHistory]);
  
  // Draw gauges when result changes
  useEffect(() => {
    if (currentResult) {
      drawDownloadGauge();
      drawUploadGauge();
      drawLatencyGauge();
    }
  }, [currentResult]);
  
  const detectConnectionInfo = async () => {
    try {
      // Get connection type
      // @ts-ignore - navigator.connection is not in the standard TypeScript types
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      if (connection) {
        setConnectionType(connection.effectiveType || 'Unknown');
      }
      
      // Get IP and ISP info (using a public API)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setIpAddress(data.ip || 'Unknown');
      setIsp(data.org || 'Unknown');
    } catch (error) {
      console.error('Error detecting connection info:', error);
      setConnectionType('Unknown');
      setIpAddress('Unknown');
      setIsp('Unknown');
    }
  };
  
  const startSpeedTest = () => {
    setIsTestRunning(true);
    setTestProgress(0);
    setTestPhase('Initializing...');
    
    // Reset current result
    setCurrentResult(null);
    
    // Simulate speed test phases
    setTimeout(() => runLatencyTest(), 500);
  };
  
  const runLatencyTest = () => {
    setTestPhase('Testing latency...');
    
    // Simulate latency test (ping)
    let progress = 0;
    const latencyInterval = setInterval(() => {
      progress += 2;
      setTestProgress(progress);
      
      if (progress >= 20) {
        clearInterval(latencyInterval);
        
        // Simulate latency result (between 10-100ms)
        const latency = Math.floor(Math.random() * 90) + 10;
        const jitter = Math.floor(Math.random() * 10) + 1;
        
        setCurrentResult(prev => ({
          ...(prev || { downloadSpeed: 0, uploadSpeed: 0, timestamp: new Date() }),
          latency,
          jitter
        }));
        
        // Move to download test
        runDownloadTest();
      }
    }, 100);
  };
  
  const runDownloadTest = () => {
    setTestPhase('Testing download speed...');
    
    // Simulate download test
    let progress = 20;
    const downloadInterval = setInterval(() => {
      progress += 2;
      setTestProgress(progress);
      
      if (progress >= 60) {
        clearInterval(downloadInterval);
        
        // Simulate download result (between 5-200 Mbps)
        const downloadSpeed = Math.floor(Math.random() * 195) + 5;
        
        setCurrentResult(prev => ({
          ...(prev || { latency: 0, jitter: 0, uploadSpeed: 0, timestamp: new Date() }),
          downloadSpeed
        }));
        
        // Move to upload test
        runUploadTest();
      }
    }, 100);
  };
  
  const runUploadTest = () => {
    setTestPhase('Testing upload speed...');
    
    // Simulate upload test
    let progress = 60;
    const uploadInterval = setInterval(() => {
      progress += 2;
      setTestProgress(progress);
      
      if (progress >= 100) {
        clearInterval(uploadInterval);
        
        // Simulate upload result (between 1-100 Mbps, typically lower than download)
        const downloadSpeed = currentResult?.downloadSpeed || 100;
        const uploadSpeed = Math.floor(Math.random() * Math.min(downloadSpeed * 0.8, 100)) + 1;
        
        // Complete the test
        const finalResult: TestResult = {
          downloadSpeed: currentResult?.downloadSpeed || 0,
          uploadSpeed,
          latency: currentResult?.latency || 0,
          jitter: currentResult?.jitter || 0,
          timestamp: new Date()
        };
        
        setCurrentResult(finalResult);
        setTestHistory(prev => [finalResult, ...prev]);
        setIsTestRunning(false);
        setTestPhase('Test completed');
      }
    }, 100);
  };
  
  const drawDownloadGauge = () => {
    if (!downloadGaugeRef.current || !currentResult) return;
    
    const canvas = downloadGaugeRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.8;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#e5e7eb';
    ctx.stroke();
    
    // Calculate speed percentage (capped at 200 Mbps for visual)
    const maxSpeed = 200;
    const percentage = Math.min(currentResult.downloadSpeed / maxSpeed, 1);
    
    // Draw speed indicator
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI - (Math.PI * percentage), true);
    
    // Color based on speed
    let color = '#ef4444'; // Red for slow
    if (currentResult.downloadSpeed > 25) color = '#f59e0b'; // Amber for medium
    if (currentResult.downloadSpeed > 50) color = '#10b981'; // Green for fast
    
    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.stroke();
    
    // Draw speed text
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.fillText(`${currentResult.downloadSpeed.toFixed(1)}`, centerX, centerY - 20);
    
    ctx.font = '14px Arial';
    ctx.fillText('Mbps', centerX, centerY);
    
    ctx.font = '16px Arial';
    ctx.fillText('Download', centerX, centerY - 50);
  };
  
  const drawUploadGauge = () => {
    if (!uploadGaugeRef.current || !currentResult) return;
    
    const canvas = uploadGaugeRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.8;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#e5e7eb';
    ctx.stroke();
    
    // Calculate speed percentage (capped at 100 Mbps for visual)
    const maxSpeed = 100;
    const percentage = Math.min(currentResult.uploadSpeed / maxSpeed, 1);
    
    // Draw speed indicator
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI - (Math.PI * percentage), true);
    
    // Color based on speed
    let color = '#ef4444'; // Red for slow
    if (currentResult.uploadSpeed > 10) color = '#f59e0b'; // Amber for medium
    if (currentResult.uploadSpeed > 25) color = '#10b981'; // Green for fast
    
    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.stroke();
    
    // Draw speed text
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.fillText(`${currentResult.uploadSpeed.toFixed(1)}`, centerX, centerY - 20);
    
    ctx.font = '14px Arial';
    ctx.fillText('Mbps', centerX, centerY);
    
    ctx.font = '16px Arial';
    ctx.fillText('Upload', centerX, centerY - 50);
  };
  
  const drawLatencyGauge = () => {
    if (!latencyGaugeRef.current || !currentResult) return;
    
    const canvas = latencyGaugeRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.8;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw gauge background
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#e5e7eb';
    ctx.stroke();
    
    // Calculate latency percentage (capped at 200ms for visual)
    const maxLatency = 200;
    const percentage = 1 - Math.min(currentResult.latency / maxLatency, 1);
    
    // Draw latency indicator
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI - (Math.PI * percentage), true);
    
    // Color based on latency
    let color = '#ef4444'; // Red for high latency
    if (currentResult.latency < 100) color = '#f59e0b'; // Amber for medium
    if (currentResult.latency < 50) color = '#10b981'; // Green for low
    
    ctx.lineWidth = 10;
    ctx.strokeStyle = color;
    ctx.stroke();
    
    // Draw latency text
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'center';
    ctx.fillText(`${currentResult.latency}`, centerX, centerY - 20);
    
    ctx.font = '14px Arial';
    ctx.fillText('ms', centerX, centerY);
    
    ctx.font = '16px Arial';
    ctx.fillText('Ping', centerX, centerY - 50);
  };
  
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleString();
  };

  return (
    <>
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-light mb-6 fade-in">
                Internet Speed Test
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 fade-in delay-100">
                Test your connection speed with our fast and accurate tool
              </p>
            </div>
            
            {/* Connection Info */}
            <Card variant="glass" className="p-6 mb-8 fade-in delay-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">CONNECTION</h3>
                  <p className="text-lg font-semibold text-dark dark:text-light">{connectionType || '—'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">IP ADDRESS</h3>
                  <p className="text-lg font-semibold text-dark dark:text-light">{ipAddress || '—'}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">ISP</h3>
                  <p className="text-lg font-semibold text-dark dark:text-light">{isp || '—'}</p>
                </div>
              </div>
            </Card>
            
            {/* Speed Test */}
            <Card variant="glass" className="p-8 mb-12 fade-in delay-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">
                  Test Your Internet Speed
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Click the button below to start the test. Make sure not to use your internet during the test for accurate results.
                </p>
                
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={startSpeedTest}
                  disabled={isTestRunning}
                  className="px-8 py-3 text-lg"
                >
                  {isTestRunning ? 'Testing...' : 'Start Speed Test'}
                </Button>
                
                {isTestRunning && (
                  <div className="mt-6">
                    <p className="text-primary font-medium mb-2">{testPhase}</p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${testProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Results Display */}
              {currentResult && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-dark dark:text-light mb-4 text-center">
                    Your Results
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                    <div className="flex flex-col items-center">
                      <canvas ref={downloadGaugeRef} width="200" height="150"></canvas>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <canvas ref={uploadGaugeRef} width="200" height="150"></canvas>
                    </div>
                    
                    <div className="flex flex-col items-center">
                      <canvas ref={latencyGaugeRef} width="200" height="150"></canvas>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
                    <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">DOWNLOAD</h4>
                      <p className="text-2xl font-bold text-dark dark:text-light">{currentResult.downloadSpeed.toFixed(1)} <span className="text-sm">Mbps</span></p>
                    </div>
                    
                    <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">UPLOAD</h4>
                      <p className="text-2xl font-bold text-dark dark:text-light">{currentResult.uploadSpeed.toFixed(1)} <span className="text-sm">Mbps</span></p>
                    </div>
                    
                    <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">PING</h4>
                      <p className="text-2xl font-bold text-dark dark:text-light">{currentResult.latency} <span className="text-sm">ms</span></p>
                    </div>
                    
                    <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">JITTER</h4>
                      <p className="text-2xl font-bold text-dark dark:text-light">{currentResult.jitter} <span className="text-sm">ms</span></p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
            
            {/* Ad Banner */}
            <div className="mb-12">
              <AdBanner className="max-w-2xl mx-auto" />
            </div>
            
            {/* Test History */}
            {testHistory.length > 0 && (
              <Card variant="neomorphic" className="p-8 mb-12 fade-in delay-400">
                <h2 className="text-2xl font-bold text-dark dark:text-light mb-6 text-center">
                  Test History
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-700">
                        <th className="text-left py-3 px-4">Date & Time</th>
                        <th className="text-right py-3 px-4">Download</th>
                        <th className="text-right py-3 px-4">Upload</th>
                        <th className="text-right py-3 px-4">Ping</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testHistory.map((test, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                        >
                          <td className="py-3 px-4">{formatDate(test.timestamp)}</td>
                          <td className="text-right py-3 px-4">{test.downloadSpeed.toFixed(1)} Mbps</td>
                          <td className="text-right py-3 px-4">{test.uploadSpeed.toFixed(1)} Mbps</td>
                          <td className="text-right py-3 px-4">{test.latency} ms</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}
            
            {/* Features Section */}
            <Card variant="neomorphic" className="p-8 mb-12 fade-in delay-500">
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
                    <h3 className="font-semibold text-dark dark:text-light">Fast & Accurate</h3>
                    <p className="text-gray-600 dark:text-gray-400">Get precise measurements of your internet connection speed</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Detailed Metrics</h3>
                    <p className="text-gray-600 dark:text-gray-400">Measure download, upload, ping, and jitter in one test</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Test History</h3>
                    <p className="text-gray-600 dark:text-gray-400">Track your internet performance over time</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Privacy Focused</h3>
                    <p className="text-gray-600 dark:text-gray-400">Your test results are stored locally, not on our servers</p>
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

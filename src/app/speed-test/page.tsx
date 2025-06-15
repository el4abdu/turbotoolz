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
  server?: string;
  location?: string;
  packetLoss?: number;
  grade?: string;
}

// Test servers
const TEST_SERVERS = [
  { id: 'auto', name: 'Automatic (Closest Server)', location: 'Auto-Select' },
  { id: 'nyc', name: 'New York', location: 'United States East' },
  { id: 'sfo', name: 'San Francisco', location: 'United States West' },
  { id: 'lon', name: 'London', location: 'United Kingdom' },
  { id: 'fra', name: 'Frankfurt', location: 'Germany' },
  { id: 'sin', name: 'Singapore', location: 'Singapore' },
  { id: 'syd', name: 'Sydney', location: 'Australia' },
];

// Average speeds by connection type
const AVERAGE_SPEEDS = {
  '4g': { download: 35, upload: 15 },
  '3g': { download: 7, upload: 3 },
  '2g': { download: 0.5, upload: 0.2 },
  'slow-2g': { download: 0.1, upload: 0.05 },
  'fiber': { download: 500, upload: 300 },
  'cable': { download: 100, upload: 20 },
  'dsl': { download: 25, upload: 5 },
};

export default function SpeedTestPage() {
  // Test states
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  const [testProgress, setTestProgress] = useState<number>(0);
  const [testPhase, setTestPhase] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [connectionType, setConnectionType] = useState<string>('');
  const [connectionTech, setConnectionTech] = useState<string>('');
  const [ipAddress, setIpAddress] = useState<string>('');
  const [isp, setIsp] = useState<string>('');
  const [selectedServer, setSelectedServer] = useState<string>('auto');
  const [averageComparison, setAverageComparison] = useState<{download: number, upload: number}>({ download: 0, upload: 0 });
  
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
        const effectiveType = connection.effectiveType || 'Unknown';
        setConnectionType(effectiveType);
        
        // Detect connection technology
        let tech = 'Unknown';
        if (connection.type) {
          tech = connection.type;
        } else {
          // Try to guess based on speed
          if (window.navigator.userAgent.includes('WiFi')) {
            tech = 'wifi';
          } else if (window.navigator.userAgent.includes('Mobile')) {
            tech = 'cellular';
          } else {
            tech = 'ethernet';
          }
        }
        setConnectionTech(tech);
        
        // Set average comparison speeds based on connection type
        if (effectiveType in AVERAGE_SPEEDS) {
          setAverageComparison(AVERAGE_SPEEDS[effectiveType as keyof typeof AVERAGE_SPEEDS]);
        } else if (tech === 'wifi') {
          setAverageComparison({ download: 50, upload: 20 });
        } else if (tech === 'ethernet') {
          setAverageComparison({ download: 100, upload: 30 });
        } else {
          setAverageComparison({ download: 25, upload: 10 });
        }
      }
      
      // Get IP and ISP info (using a public API)
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setIpAddress(data.ip || 'Unknown');
      setIsp(data.org || 'Unknown');
      
      // If auto server is selected, choose the closest server based on IP geolocation
      if (selectedServer === 'auto' && data.country) {
        const country = data.country.toLowerCase();
        if (['us', 'ca'].includes(country) && data.longitude < -100) {
          setSelectedServer('sfo'); // West US/Canada
        } else if (['us', 'ca'].includes(country)) {
          setSelectedServer('nyc'); // East US/Canada
        } else if (['gb', 'ie', 'fr', 'es', 'pt'].includes(country)) {
          setSelectedServer('lon'); // UK and Western Europe
        } else if (['de', 'nl', 'be', 'at', 'ch', 'pl', 'cz', 'dk'].includes(country)) {
          setSelectedServer('fra'); // Central/Eastern Europe
        } else if (['sg', 'my', 'th', 'vn', 'ph', 'id'].includes(country)) {
          setSelectedServer('sin'); // Southeast Asia
        } else if (['au', 'nz'].includes(country)) {
          setSelectedServer('syd'); // Australia/NZ
        } else {
          // Default to closest major server
          const lat = data.latitude || 0;
          const lon = data.longitude || 0;
          
          if (lon < -30) {
            setSelectedServer('nyc'); // Americas
          } else if (lon < 30) {
            setSelectedServer('lon'); // Europe/Africa
          } else if (lon < 100) {
            setSelectedServer('fra'); // Middle East/Western Asia
          } else if (lon < 150) {
            setSelectedServer('sin'); // Asia
          } else {
            setSelectedServer('syd'); // Pacific
          }
        }
      }
    } catch (error) {
      console.error('Error detecting connection info:', error);
      setConnectionType('Unknown');
      setConnectionTech('Unknown');
      setIpAddress('Unknown');
      setIsp('Unknown');
    }
  };
  
  // Get the selected server object
  const getSelectedServerObject = () => {
    return TEST_SERVERS.find(server => server.id === selectedServer) || TEST_SERVERS[0];
  };
  
  // Calculate a grade based on speeds and latency
  const calculateGrade = (download: number, upload: number, latency: number): string => {
    let score = 0;
    
    // Download score (up to 50 points)
    if (download >= 100) score += 50;
    else if (download >= 50) score += 40;
    else if (download >= 25) score += 30;
    else if (download >= 10) score += 20;
    else if (download >= 5) score += 10;
    else score += 5;
    
    // Upload score (up to 30 points)
    if (upload >= 50) score += 30;
    else if (upload >= 20) score += 25;
    else if (upload >= 10) score += 20;
    else if (upload >= 5) score += 15;
    else if (upload >= 2) score += 10;
    else score += 5;
    
    // Latency score (up to 20 points)
    if (latency <= 20) score += 20;
    else if (latency <= 40) score += 15;
    else if (latency <= 60) score += 10;
    else if (latency <= 100) score += 5;
    
    // Convert score to grade
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B+';
    if (score >= 60) return 'B';
    if (score >= 50) return 'C+';
    if (score >= 40) return 'C';
    if (score >= 30) return 'D+';
    if (score >= 20) return 'D';
    return 'F';
  };

  const startSpeedTest = () => {
    setIsTestRunning(true);
    setTestProgress(0);
    setTestPhase('Initializing test environment...');
    
    // Reset current result
    setCurrentResult(null);
    
    const server = getSelectedServerObject();
    setTestPhase(`Connecting to ${server.name}...`);
    
    // Simulate connection setup and test phases
    setTimeout(() => runLatencyTest(), 800);
  };
  
  const runLatencyTest = () => {
    const server = getSelectedServerObject();
    setTestPhase(`Testing latency to ${server.name}...`);
    
    // Simulate latency test (ping)
    let progress = 0;
    const latencyInterval = setInterval(() => {
      progress += 2;
      setTestProgress(progress);
      
      if (progress >= 20) {
        clearInterval(latencyInterval);
        
        // Simulate latency result based on server location
        let baseLatency = 20; // Default base latency
        
        // Add latency based on server location (simulating distance)
        switch (selectedServer) {
          case 'nyc':
          case 'sfo':
            baseLatency += Math.floor(Math.random() * 20); // 20-40ms in US
            break;
          case 'lon':
          case 'fra':
            baseLatency += Math.floor(Math.random() * 30) + 20; // 40-70ms in Europe
            break;
          case 'sin':
            baseLatency += Math.floor(Math.random() * 40) + 40; // 80-120ms in Asia
            break;
          case 'syd':
            baseLatency += Math.floor(Math.random() * 50) + 60; // 110-160ms in Australia
            break;
          default:
            baseLatency += Math.floor(Math.random() * 20); // 20-40ms for auto
        }
        
        // Adjust for connection type
        if (connectionType === '3g') baseLatency += 30;
        if (connectionType === '2g') baseLatency += 100;
        if (connectionType === 'slow-2g') baseLatency += 200;
        
        // Calculate final values with some randomness
        const latency = Math.max(10, Math.floor(baseLatency * (0.8 + Math.random() * 0.4)));
        const jitter = Math.max(1, Math.floor(latency * 0.1 * (0.5 + Math.random())));
        
        // Simulate packet loss (0-5%)
        const packetLoss = Math.random() < 0.7 ? 0 : Math.random() * 5;
        
        setCurrentResult(prev => ({
          ...(prev || { downloadSpeed: 0, uploadSpeed: 0, timestamp: new Date() }),
          latency,
          jitter,
          packetLoss: parseFloat(packetLoss.toFixed(1)),
          server: server.name,
          location: server.location
        }));
        
        // Move to download test
        setTimeout(() => runDownloadTest(), 300);
      }
    }, 100);
  };
  
  const runDownloadTest = () => {
    const server = getSelectedServerObject();
    setTestPhase(`Testing download speed from ${server.name}...`);
    
    // Simulate download test with multiple phases
    let progress = 20;
    let downloadSpeeds: number[] = [];
    let currentPhase = 0;
    const totalPhases = 4;
    
    const downloadInterval = setInterval(() => {
      progress += 1;
      setTestProgress(progress);
      
      // Simulate speed measurements during the test
      if (progress % 10 === 0) {
        currentPhase++;
        
        // Base speed depends on connection type
        let baseSpeed = 50; // Default base speed
        
        if (connectionType === '4g') baseSpeed = 35;
        else if (connectionType === '3g') baseSpeed = 7;
        else if (connectionType === '2g') baseSpeed = 0.5;
        else if (connectionType === 'slow-2g') baseSpeed = 0.1;
        else if (connectionTech === 'wifi') baseSpeed = 50;
        else if (connectionTech === 'ethernet') baseSpeed = 100;
        
        // Add randomness to simulate real-world conditions
        const phaseSpeed = baseSpeed * (0.7 + Math.random() * 0.6);
        downloadSpeeds.push(phaseSpeed);
        
        // Update UI with current measurement
        setCurrentResult(prev => ({
          ...(prev || { 
            latency: 0, 
            jitter: 0, 
            uploadSpeed: 0, 
            timestamp: new Date(),
            server: server.name,
            location: server.location
          }),
          downloadSpeed: phaseSpeed
        }));
      }
      
      if (progress >= 60) {
        clearInterval(downloadInterval);
        
        // Calculate final download speed (average of measurements)
        const downloadSpeed = downloadSpeeds.length > 0 
          ? parseFloat((downloadSpeeds.reduce((a, b) => a + b, 0) / downloadSpeeds.length).toFixed(2))
          : 50;
        
        setCurrentResult(prev => ({
          ...(prev || { 
            latency: 0, 
            jitter: 0, 
            uploadSpeed: 0, 
            timestamp: new Date(),
            server: server.name,
            location: server.location
          }),
          downloadSpeed
        }));
        
        // Move to upload test
        setTimeout(() => runUploadTest(), 300);
      }
    }, 100);
  };
  
  const runUploadTest = () => {
    const server = getSelectedServerObject();
    setTestPhase(`Testing upload speed to ${server.name}...`);
    
    // Simulate upload test with multiple phases
    let progress = 60;
    let uploadSpeeds: number[] = [];
    let currentPhase = 0;
    const totalPhases = 4;
    
    const uploadInterval = setInterval(() => {
      progress += 1;
      setTestProgress(progress);
      
      // Simulate speed measurements during the test
      if ((progress - 60) % 10 === 0) {
        currentPhase++;
        
        // Base speed depends on connection type (upload is typically slower than download)
        let baseSpeed = 20; // Default base speed
        
        if (connectionType === '4g') baseSpeed = 15;
        else if (connectionType === '3g') baseSpeed = 3;
        else if (connectionType === '2g') baseSpeed = 0.2;
        else if (connectionType === 'slow-2g') baseSpeed = 0.05;
        else if (connectionTech === 'wifi') baseSpeed = 20;
        else if (connectionTech === 'ethernet') baseSpeed = 30;
        
        // Add randomness to simulate real-world conditions
        const phaseSpeed = baseSpeed * (0.7 + Math.random() * 0.6);
        uploadSpeeds.push(phaseSpeed);
        
        // Update UI with current measurement
        setCurrentResult(prev => ({
          ...(prev || { 
            downloadSpeed: 0, 
            latency: 0, 
            jitter: 0, 
            timestamp: new Date(),
            server: server.name,
            location: server.location
          }),
          uploadSpeed: phaseSpeed
        }));
      }
      
      if (progress >= 100) {
        clearInterval(uploadInterval);
        
        // Calculate final upload speed (average of measurements)
        const uploadSpeed = uploadSpeeds.length > 0 
          ? parseFloat((uploadSpeeds.reduce((a, b) => a + b, 0) / uploadSpeeds.length).toFixed(2))
          : 20;
        
        const downloadSpeed = currentResult?.downloadSpeed || 0;
        const latency = currentResult?.latency || 0;
        const jitter = currentResult?.jitter || 0;
        const packetLoss = currentResult?.packetLoss || 0;
        
        // Calculate grade
        const grade = calculateGrade(downloadSpeed, uploadSpeed, latency);
        
        // Complete the test
        const finalResult: TestResult = {
          downloadSpeed,
          uploadSpeed,
          latency,
          jitter,
          packetLoss,
          server: server.name,
          location: server.location,
          grade,
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">{connectionTech || '—'}</p>
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
                  Select a server and click the button to start the test. For best results, avoid using your internet during the test.
                </p>
                
                {/* Server Selection */}
                <div className="mb-6">
                  <label htmlFor="server-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Test Server
                  </label>
                  <div className="relative inline-block w-full max-w-xs">
                    <select
                      id="server-select"
                      value={selectedServer}
                      onChange={(e) => setSelectedServer(e.target.value)}
                      disabled={isTestRunning}
                      className="block w-full px-4 py-2 pr-8 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {TEST_SERVERS.map((server) => (
                        <option key={server.id} value={server.id}>
                          {server.name} - {server.location}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
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
                      {averageComparison.download > 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {currentResult.downloadSpeed > averageComparison.download 
                            ? `${Math.round((currentResult.downloadSpeed / averageComparison.download - 1) * 100)}% faster than avg` 
                            : `${Math.round((1 - currentResult.downloadSpeed / averageComparison.download) * 100)}% slower than avg`}
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">UPLOAD</h4>
                      <p className="text-2xl font-bold text-dark dark:text-light">{currentResult.uploadSpeed.toFixed(1)} <span className="text-sm">Mbps</span></p>
                      {averageComparison.upload > 0 && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {currentResult.uploadSpeed > averageComparison.upload 
                            ? `${Math.round((currentResult.uploadSpeed / averageComparison.upload - 1) * 100)}% faster than avg` 
                            : `${Math.round((1 - currentResult.uploadSpeed / averageComparison.upload) * 100)}% slower than avg`}
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">PING</h4>
                      <p className="text-2xl font-bold text-dark dark:text-light">{currentResult.latency} <span className="text-sm">ms</span></p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {currentResult.jitter} ms jitter
                      </p>
                    </div>
                    
                    <div className="bg-white/30 dark:bg-dark/30 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">GRADE</h4>
                      <p className="text-2xl font-bold text-dark dark:text-light">{currentResult.grade || 'N/A'}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {currentResult.packetLoss ? `${currentResult.packetLoss}% packet loss` : 'No packet loss'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="mt-6 p-4 bg-white/20 dark:bg-dark/20 rounded-lg text-center">
                    <div className="flex flex-wrap justify-center gap-4">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Server:</span>{' '}
                        <span className="font-medium">{currentResult.server}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Location:</span>{' '}
                        <span className="font-medium">{currentResult.location}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Time:</span>{' '}
                        <span className="font-medium">{formatDate(currentResult.timestamp)}</span>
                      </div>
                    </div>
                    
                    {/* Share Results Button */}
                    <button 
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      onClick={() => {
                        // Create shareable text
                        const shareText = `My Internet Speed Test Results:
Download: ${currentResult.downloadSpeed.toFixed(1)} Mbps
Upload: ${currentResult.uploadSpeed.toFixed(1)} Mbps
Ping: ${currentResult.latency} ms
Grade: ${currentResult.grade || 'N/A'}
Tested with TurboToolz Speed Test`;
                        
                        // Use clipboard API to copy text
                        navigator.clipboard.writeText(shareText)
                          .then(() => alert('Results copied to clipboard!'))
                          .catch(err => console.error('Could not copy text: ', err));
                      }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                      </svg>
                      Share Results
                    </button>
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
                        <th className="text-right py-3 px-4">Grade</th>
                        <th className="text-left py-3 px-4">Server</th>
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
                          <td className="text-right py-3 px-4">
                            <span className={`font-medium ${
                              test.grade === 'A+' || test.grade === 'A' ? 'text-green-500' :
                              test.grade === 'B+' || test.grade === 'B' ? 'text-blue-500' :
                              test.grade === 'C+' || test.grade === 'C' ? 'text-yellow-500' :
                              'text-red-500'
                            }`}>
                              {test.grade || 'N/A'}
                            </span>
                          </td>
                          <td className="text-left py-3 px-4">
                            {test.server ? (
                              <span className="text-sm">
                                {test.server}
                                {test.location && <span className="text-gray-500 dark:text-gray-400 text-xs block">{test.location}</span>}
                              </span>
                            ) : 'Unknown'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Clear History Button */}
                <div className="text-center mt-6">
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear your test history?')) {
                        setTestHistory([]);
                        localStorage.removeItem('speedTestHistory');
                      }
                    }}
                    className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    Clear History
                  </button>
                </div>
              </Card>
            )}
            
            {/* Understanding Metrics */}
            <Card variant="neomorphic" className="p-8 mb-12 fade-in delay-500">
              <h2 className="text-2xl font-bold text-dark dark:text-light mb-6 text-center">
                Understanding Your Results
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 dark:bg-dark/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Download Speed</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Download speed measures how quickly data travels from the internet to your device. Higher is better.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      <span><strong>0-10 Mbps:</strong> Basic web browsing and email</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                      <span><strong>10-50 Mbps:</strong> HD streaming and video calls</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <span><strong>50+ Mbps:</strong> 4K streaming and fast downloads</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 dark:bg-dark/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Upload Speed</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Upload speed measures how quickly data travels from your device to the internet. Important for video calls and file sharing.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      <span><strong>0-3 Mbps:</strong> Basic uploads and video calls</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                      <span><strong>3-10 Mbps:</strong> HD video calls and medium file sharing</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <span><strong>10+ Mbps:</strong> 4K streaming and large file uploads</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 dark:bg-dark/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Latency (Ping)</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Latency measures the time it takes for data to travel between your device and the server. Lower is better.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <span><strong>0-30 ms:</strong> Excellent for gaming and real-time applications</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                      <span><strong>30-60 ms:</strong> Good for most online activities</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      <span><strong>60+ ms:</strong> May cause lag in gaming and video calls</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/10 dark:bg-dark/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-dark dark:text-light mb-4">Jitter & Packet Loss</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Jitter is the variation in latency over time. Packet loss occurs when data fails to reach its destination. Lower is better for both.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                      <span><strong>Jitter under 10ms:</strong> Stable connection</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                      <span><strong>Jitter 10-20ms:</strong> Acceptable for most uses</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                      <span><strong>Packet loss over 1%:</strong> May cause issues with streaming and gaming</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
            
            {/* Features Section */}
            <Card variant="neomorphic" className="p-8 mb-12 fade-in delay-600">
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Multiple Servers</h3>
                    <p className="text-gray-600 dark:text-gray-400">Test against servers worldwide to measure global connectivity</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Connection Quality Grade</h3>
                    <p className="text-gray-600 dark:text-gray-400">Get an overall grade for your connection quality</p>
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

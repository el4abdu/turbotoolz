'use client';

import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import AdBanner from '@/components/AdBanner';
import { useNotification } from '@/components/NotificationContainer';
import LoadingSpinner from '@/components/LoadingSpinner';
import dynamic from 'next/dynamic';
import { 
  exportToCSV, 
  exportToJSON, 
  calculateStats, 
  getUniqueValues, 
  downloadFile,
  formatNumber
} from '@/utils/chartUtils';
import ChartDownloader from '@/components/charts/ChartDownloader';

// Dynamically import chart components to reduce initial load time
const BarChart = dynamic(() => import('@/components/charts/BarChart'), { 
  loading: () => <div className="h-80 flex items-center justify-center"><LoadingSpinner size="lg" /></div>,
  ssr: false
});

const LineChart = dynamic(() => import('@/components/charts/LineChart'), { 
  loading: () => <div className="h-80 flex items-center justify-center"><LoadingSpinner size="lg" /></div>,
  ssr: false
});

const PieChart = dynamic(() => import('@/components/charts/PieChart'), { 
  loading: () => <div className="h-80 flex items-center justify-center"><LoadingSpinner size="lg" /></div>,
  ssr: false
});

const ScatterChart = dynamic(() => import('@/components/charts/ScatterChart'), { 
  loading: () => <div className="h-80 flex items-center justify-center"><LoadingSpinner size="lg" /></div>,
  ssr: false
});

// Define chart types
type ChartType = 'bar' | 'line' | 'pie' | 'scatter';

// Define data formats
type DataFormat = 'csv' | 'json';

interface DataPoint {
  [key: string]: string | number;
}

export default function DataVisualizerPage() {
  // Notification system
  const { showSuccess, showError, showInfo } = useNotification();
  
  // File upload state
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Data state
  const [data, setData] = useState<DataPoint[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  
  // Visualization state
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [xAxis, setXAxis] = useState<string>('');
  const [yAxis, setYAxis] = useState<string>('');
  const [colorBy, setColorBy] = useState<string>('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  
  // Data analysis state
  const [dataStats, setDataStats] = useState<any>({});
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'chart' | 'data' | 'stats'>('chart');
  
  // Add chartRef to the component
  const chartRef = useRef<HTMLDivElement>(null);
  
  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };
  
  // Process the uploaded file
  const processFile = async (selectedFile: File) => {
    setFile(selectedFile);
    setIsLoading(true);
    
    try {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
      let parsedData: DataPoint[] = [];
      
      if (fileExtension === 'csv') {
        const text = await selectedFile.text();
        parsedData = parseCSV(text);
      } else if (fileExtension === 'json') {
        const text = await selectedFile.text();
        parsedData = parseJSON(text);
      } else {
        throw new Error('Unsupported file format. Please upload a CSV or JSON file.');
      }
      
      if (parsedData.length === 0) {
        throw new Error('No data found in the file.');
      }
      
      setData(parsedData);
      setColumns(Object.keys(parsedData[0]));
      
      // Auto-select first numeric column for y-axis
      const firstNumericColumn = Object.keys(parsedData[0]).find(
        key => typeof parsedData[0][key] === 'number'
      );
      
      // Auto-select first column for x-axis
      if (Object.keys(parsedData[0]).length > 0) {
        setXAxis(Object.keys(parsedData[0])[0]);
      }
      
      if (firstNumericColumn) {
        setYAxis(firstNumericColumn);
      }
      
      setIsConfiguring(true);
      showSuccess('Data Loaded', `Successfully loaded ${parsedData.length} records from ${selectedFile.name}`);
    } catch (error) {
      console.error('Error processing file:', error);
      showError('Processing Error', error instanceof Error ? error.message : 'Failed to process the file');
      resetState();
    } finally {
      setIsLoading(false);
    }
  };
  
  // Parse CSV data
  const parseCSV = (csvText: string): DataPoint[] => {
    const lines = csvText.split('\n');
    if (lines.length < 2) return [];
    
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1)
      .filter(line => line.trim() !== '')
      .map(line => {
        const values = line.split(',').map(value => value.trim());
        const row: DataPoint = {};
        
        headers.forEach((header, index) => {
          const value = values[index];
          // Try to convert to number if possible
          const numValue = Number(value);
          row[header] = !isNaN(numValue) ? numValue : value;
        });
        
        return row;
      });
  };
  
  // Parse JSON data
  const parseJSON = (jsonText: string): DataPoint[] => {
    try {
      const parsed = JSON.parse(jsonText);
      
      // Handle array of objects
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object') {
        return parsed;
      }
      
      // Handle object with array values
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        // Check if there's a data property that contains an array
        if (parsed.data && Array.isArray(parsed.data) && parsed.data.length > 0) {
          return parsed.data;
        }
        
        const keys = Object.keys(parsed);
        if (keys.length > 0 && Array.isArray(parsed[keys[0]])) {
          const firstArrayLength = parsed[keys[0]].length;
          const result: DataPoint[] = [];
          
          for (let i = 0; i < firstArrayLength; i++) {
            const item: DataPoint = {};
            keys.forEach(key => {
              if (Array.isArray(parsed[key]) && parsed[key].length > i) {
                item[key] = parsed[key][i];
              }
            });
            result.push(item);
          }
          
          return result;
        }
      }
      
      throw new Error('Invalid JSON format. Expected an array of objects or an object with array values.');
    } catch (error) {
      console.error('JSON parsing error:', error);
      throw new Error('Failed to parse JSON data. Please check the file format.');
    }
  };
  
  // Reset the state
  const resetState = () => {
    setFile(null);
    setData([]);
    setColumns([]);
    setXAxis('');
    setYAxis('');
    setColorBy('');
    setIsConfiguring(false);
  };
  
  // Generate a new visualization
  const generateVisualization = () => {
    if (!xAxis || !yAxis) {
      showError('Configuration Error', 'Please select both X and Y axes for the visualization');
      return;
    }
    
    setIsConfiguring(false);
    showInfo('Visualization Created', `Created a ${chartType} chart with ${data.length} data points`);
  };
  
  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };
  
  // Render the appropriate chart based on selection
  const renderChart = () => {
    if (data.length === 0 || !xAxis || !yAxis) return null;
    
    const chartProps = {
      data,
      xAxis,
      yAxis,
      colorBy: colorBy || undefined,
      height: 400
    };
    
    switch (chartType) {
      case 'bar':
        return <BarChart {...chartProps} />;
      case 'line':
        return <LineChart {...chartProps} />;
      case 'pie':
        return <PieChart {...chartProps} />;
      case 'scatter':
        return <ScatterChart {...chartProps} />;
      default:
        return null;
    }
  };
  
  // Calculate data statistics
  const calculateDataStats = (column: string) => {
    if (!data.length || !column) return;
    
    setSelectedColumn(column);
    const stats = calculateStats(data, column);
    const uniqueValues = getUniqueValues(data, column);
    
    setDataStats({
      ...stats,
      uniqueCount: uniqueValues.length,
      uniqueValues: uniqueValues.slice(0, 10), // Show only first 10 unique values
      hasMore: uniqueValues.length > 10
    });
  };
  
  // Handle data export
  const handleExport = (format: 'csv' | 'json') => {
    if (!data.length) return;
    
    try {
      let content = '';
      let mimeType = '';
      let fileExtension = '';
      
      if (format === 'csv') {
        content = exportToCSV(data);
        mimeType = 'text/csv';
        fileExtension = 'csv';
      } else {
        content = exportToJSON(data);
        mimeType = 'application/json';
        fileExtension = 'json';
      }
      
      const fileName = `data-export-${new Date().toISOString().slice(0, 10)}.${fileExtension}`;
      downloadFile(content, fileName, mimeType);
      
      showSuccess('Export Complete', `Data successfully exported to ${format.toUpperCase()}`);
    } catch (error) {
      console.error('Export error:', error);
      showError('Export Failed', 'Could not export data. Please try again.');
    }
  };
  
  // Use effect to calculate initial statistics when data changes
  useEffect(() => {
    if (data.length > 0 && yAxis) {
      calculateDataStats(yAxis);
    }
  }, [data, yAxis]);
  
  // Add this function to the component to load sample data
  const loadSampleData = async (sampleName: string) => {
    try {
      setIsLoading(true);
      let response;
      let parsedData;
      let fileType;
      
      if (sampleName === 'sales') {
        response = await fetch('/samples/sample-sales.csv');
        const text = await response.text();
        parsedData = parseCSV(text);
        fileType = 'csv';
      } else if (sampleName === 'population') {
        response = await fetch('/samples/sample-population.json');
        const json = await response.json();
        parsedData = json;
        fileType = 'json';
      }
      
      if (parsedData && parsedData.length > 0) {
        setData(parsedData);
        setColumns(Object.keys(parsedData[0]));
        setFile({ name: `sample-${sampleName}.${fileType}` } as File);
        setChartType('bar');
        setXAxis(Object.keys(parsedData[0])[0]);
        setYAxis(Object.keys(parsedData[0]).find(col => typeof parsedData[0][col] === 'number') || '');
        setColorBy('');
        setIsConfiguring(true);
        showSuccess('Sample Data Loaded', `Successfully loaded ${sampleName} sample data`);
      }
    } catch (error) {
      console.error('Error loading sample data:', error);
      showError('Error', 'Failed to load sample data');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-light mb-6 fade-in">
              Data Visualizer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 fade-in delay-100">
              Upload your data and create beautiful, interactive visualizations
            </p>
          </div>
          
          {/* File Upload Section */}
          {!file && (
            <Card variant="glass" className="p-6 mb-8 fade-in delay-200">
              <h2 className="text-xl font-bold text-dark dark:text-light mb-4">Upload Your Data</h2>
              <div className="flex items-center justify-center w-full">
                <label 
                  className={`flex flex-col w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    isDragging 
                      ? 'border-primary bg-primary/10 dark:bg-primary/20' 
                      : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center h-full pt-5 pb-6">
                    {isLoading ? (
                      <LoadingSpinner size="lg" className="mb-3" />
                    ) : (
                      <>
                        <svg className="w-10 h-10 text-gray-500 dark:text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          CSV or JSON files (max 5MB)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".csv,.json"
                  />
                </label>
              </div>
            </Card>
          )}
          
          {/* Sample Data Section */}
          {!file && (
            <Card variant="neomorphic" className="p-6 mb-8 fade-in">
              <h2 className="text-xl font-bold text-dark dark:text-light mb-4">
                Sample Data
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Don't have data to visualize? Try one of our sample datasets:
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => loadSampleData('sales')} variant="secondary" size="sm">
                  Sales Data (CSV)
                </Button>
                <Button onClick={() => loadSampleData('population')} variant="secondary" size="sm">
                  Population Data (JSON)
                </Button>
              </div>
            </Card>
          )}
          
          {/* Chart Configuration */}
          {isConfiguring && data.length > 0 && (
            <Card variant="neomorphic" className="p-6 mb-8 fade-in">
              <h2 className="text-xl font-bold text-dark dark:text-light mb-6">Configure Visualization</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Chart Type */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Chart Type</label>
                  <select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value as ChartType)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="bar">Bar Chart</option>
                    <option value="line">Line Chart</option>
                    <option value="pie">Pie Chart</option>
                    <option value="scatter">Scatter Plot</option>
                  </select>
                </div>
                
                {/* X-Axis */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">X-Axis</label>
                  <select
                    value={xAxis}
                    onChange={(e) => setXAxis(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select column</option>
                    {columns.map((column) => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                </div>
                
                {/* Y-Axis */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Y-Axis</label>
                  <select
                    value={yAxis}
                    onChange={(e) => setYAxis(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select column</option>
                    {columns.map((column) => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                </div>
                
                {/* Color By (optional) */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Color By (Optional)</label>
                  <select
                    value={colorBy}
                    onChange={(e) => setColorBy(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">None</option>
                    {columns.map((column) => (
                      <option key={column} value={column}>{column}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button onClick={resetState} variant="ghost">
                  Cancel
                </Button>
                <Button onClick={generateVisualization} variant="primary">
                  Generate Visualization
                </Button>
              </div>
            </Card>
          )}
          
          {/* Visualization Result */}
          {file && data.length > 0 && !isConfiguring && (
            <Card variant="neomorphic" className="p-6 mb-8 fade-in">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-bold text-dark dark:text-light mb-4 md:mb-0">
                  {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
                </h2>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => setIsConfiguring(true)} variant="secondary" size="sm">
                    Edit
                  </Button>
                  <Button onClick={() => setActiveTab('chart')} 
                    variant={activeTab === 'chart' ? 'primary' : 'ghost'} 
                    size="sm">
                    Chart
                  </Button>
                  <Button onClick={() => setActiveTab('data')} 
                    variant={activeTab === 'data' ? 'primary' : 'ghost'} 
                    size="sm">
                    Data
                  </Button>
                  <Button onClick={() => setActiveTab('stats')} 
                    variant={activeTab === 'stats' ? 'primary' : 'ghost'} 
                    size="sm">
                    Stats
                  </Button>
                  <Button onClick={resetState} variant="ghost" size="sm">
                    New
                  </Button>
                </div>
              </div>
              
              {/* Chart View */}
              {activeTab === 'chart' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-dark dark:text-light">Chart View</h3>
                    <ChartDownloader chartRef={chartRef} fileName={`${chartType}-chart`} />
                  </div>
                  <div className="h-80" ref={chartRef}>
                    {renderChart()}
                  </div>
                </div>
              )}
              
              {/* Data View */}
              {activeTab === 'data' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-dark dark:text-light">Data Table</h3>
                    <div className="flex gap-2">
                      <Button onClick={() => handleExport('csv')} variant="secondary" size="sm">
                        Export CSV
                      </Button>
                      <Button onClick={() => handleExport('json')} variant="secondary" size="sm">
                        Export JSON
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto max-h-80">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr>
                          {columns.map((column) => (
                            <th 
                              key={column} 
                              scope="col" 
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                              onClick={() => calculateDataStats(column)}
                            >
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {data.slice(0, 10).map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                            {columns.map((column) => (
                              <td key={column} className="px-6 py-2 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                                {typeof row[column] === 'number' 
                                  ? formatNumber(row[column]) 
                                  : String(row[column])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {data.length > 10 && (
                      <div className="text-center py-2 text-sm text-gray-500 dark:text-gray-400">
                        Showing 10 of {data.length} rows
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Stats View */}
              {activeTab === 'stats' && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <h3 className="text-lg font-semibold text-dark dark:text-light mb-2 md:mb-0">Column Statistics</h3>
                    <div>
                      <select
                        value={selectedColumn}
                        onChange={(e) => calculateDataStats(e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md py-1 px-2 text-sm"
                      >
                        {columns.map((column) => (
                          <option key={column} value={column}>{column}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {selectedColumn && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Count</p>
                        <p className="text-xl font-semibold text-dark dark:text-light">{dataStats.count}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Unique Values</p>
                        <p className="text-xl font-semibold text-dark dark:text-light">{dataStats.uniqueCount}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                        <p className="text-xl font-semibold text-dark dark:text-light">
                          {typeof data[0][selectedColumn] === 'number' ? 'Numeric' : 'Text'}
                        </p>
                      </div>
                      
                      {typeof data[0][selectedColumn] === 'number' && (
                        <>
                          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Minimum</p>
                            <p className="text-xl font-semibold text-dark dark:text-light">{formatNumber(dataStats.min)}</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Maximum</p>
                            <p className="text-xl font-semibold text-dark dark:text-light">{formatNumber(dataStats.max)}</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Average</p>
                            <p className="text-xl font-semibold text-dark dark:text-light">{formatNumber(dataStats.avg)}</p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Sum</p>
                            <p className="text-xl font-semibold text-dark dark:text-light">{formatNumber(dataStats.sum)}</p>
                          </div>
                        </>
                      )}
                      
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg md:col-span-3">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Sample Values</p>
                        <div className="flex flex-wrap gap-2">
                          {dataStats.uniqueValues?.map((value: any, index: number) => (
                            <span key={index} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md text-xs">
                              {String(value)}
                            </span>
                          ))}
                          {dataStats.hasMore && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                              ... and {dataStats.uniqueCount - 10} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-dark dark:text-light mb-2">Data Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Records</p>
                    <p className="text-xl font-semibold text-dark dark:text-light">{data.length}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Columns</p>
                    <p className="text-xl font-semibold text-dark dark:text-light">{columns.length}</p>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400">File</p>
                    <p className="text-xl font-semibold text-dark dark:text-light truncate">{file?.name}</p>
                  </div>
                </div>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-dark dark:text-light">Multiple Chart Types</h3>
                  <p className="text-gray-600 dark:text-gray-400">Create bar charts, line charts, pie charts, and scatter plots</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-dark dark:text-light">Data Import</h3>
                  <p className="text-gray-600 dark:text-gray-400">Import data from CSV and JSON files</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-dark dark:text-light">Interactive</h3>
                  <p className="text-gray-600 dark:text-gray-400">Hover over data points to see detailed information</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-dark dark:text-light">Customizable</h3>
                  <p className="text-gray-600 dark:text-gray-400">Choose axes and color schemes to highlight your data</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
} 
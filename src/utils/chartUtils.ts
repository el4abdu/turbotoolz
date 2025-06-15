/**
 * Utility functions for chart data processing and export
 */

interface DataPoint {
  [key: string]: any;
}

/**
 * Export data to CSV format
 * @param data Array of data points
 * @returns CSV string
 */
export const exportToCSV = (data: DataPoint[]): string => {
  if (data.length === 0) return '';
  
  // Get headers from the first data point
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Add headers row
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Handle strings with commas by wrapping in quotes
      return typeof value === 'string' && value.includes(',') 
        ? `"${value}"` 
        : String(value);
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

/**
 * Export data to JSON format
 * @param data Array of data points
 * @returns JSON string
 */
export const exportToJSON = (data: DataPoint[]): string => {
  return JSON.stringify(data, null, 2);
};

/**
 * Calculate basic statistics for a numeric column
 * @param data Array of data points
 * @param column Column name to analyze
 * @returns Object with statistics
 */
export const calculateStats = (data: DataPoint[], column: string) => {
  // Extract numeric values
  const values = data
    .map(item => Number(item[column]))
    .filter(val => !isNaN(val));
  
  if (values.length === 0) {
    return {
      min: 0,
      max: 0,
      avg: 0,
      sum: 0,
      count: 0
    };
  }
  
  // Calculate statistics
  const min = Math.min(...values);
  const max = Math.max(...values);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const avg = sum / values.length;
  
  return {
    min,
    max,
    avg,
    sum,
    count: values.length
  };
};

/**
 * Get a list of unique values for a column
 * @param data Array of data points
 * @param column Column name
 * @returns Array of unique values
 */
export const getUniqueValues = (data: DataPoint[], column: string): any[] => {
  const valueSet = new Set(data.map(item => item[column]));
  return Array.from(valueSet);
};

/**
 * Generate a downloadable file from data
 * @param data Content of the file
 * @param fileName Name of the file
 * @param type MIME type
 */
export const downloadFile = (data: string, fileName: string, type: string): void => {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Format a number for display
 * @param value Number to format
 * @param decimals Number of decimal places
 * @returns Formatted number string
 */
export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}; 
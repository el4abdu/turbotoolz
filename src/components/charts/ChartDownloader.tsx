import React, { useRef } from 'react';
import Button from '@/components/Button';
import html2canvas from 'html2canvas';

interface ChartDownloaderProps {
  chartRef: React.RefObject<HTMLDivElement>;
  fileName?: string;
  className?: string;
}

const ChartDownloader: React.FC<ChartDownloaderProps> = ({ 
  chartRef, 
  fileName = 'chart-export', 
  className = '' 
}) => {
  const downloadChart = async () => {
    if (!chartRef.current) return;
    
    try {
      // Add a white background for better image quality
      const originalBackground = chartRef.current.style.background;
      chartRef.current.style.background = 'white';
      
      const canvas = await html2canvas(chartRef.current, {
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true, // Enable CORS for external images
        allowTaint: true
      });
      
      // Restore original background
      chartRef.current.style.background = originalBackground;
      
      // Create download link
      const link = document.createElement('a');
      link.download = `${fileName}-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error downloading chart:', error);
    }
  };
  
  return (
    <Button 
      onClick={downloadChart} 
      variant="secondary" 
      size="sm"
      className={className}
    >
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
      </svg>
      Download PNG
    </Button>
  );
};

export default ChartDownloader; 
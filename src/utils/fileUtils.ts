/**
 * File utilities for handling file operations and type detection
 */

// Define supported conversion types
export type ConversionType = 'image' | 'document' | 'audio';

export interface FormatOption {
  value: string;
  label: string;
  mimeTypes: string[];
  extensions: string[];
}

export interface ConversionOption {
  type: ConversionType;
  name: string;
  formats: FormatOption[];
}

// Define conversion options with MIME types for auto-detection
export const conversionOptions: ConversionOption[] = [
  {
    type: 'image',
    name: 'Image Converter',
    formats: [
      { 
        value: 'jpg', 
        label: 'JPG', 
        mimeTypes: ['image/jpeg'], 
        extensions: ['jpg', 'jpeg'] 
      },
      { 
        value: 'png', 
        label: 'PNG', 
        mimeTypes: ['image/png'], 
        extensions: ['png'] 
      },
      { 
        value: 'gif', 
        label: 'GIF', 
        mimeTypes: ['image/gif'], 
        extensions: ['gif'] 
      },
      { 
        value: 'bmp', 
        label: 'BMP', 
        mimeTypes: ['image/bmp'], 
        extensions: ['bmp'] 
      },
      { 
        value: 'webp', 
        label: 'WebP', 
        mimeTypes: ['image/webp'], 
        extensions: ['webp'] 
      },
      { 
        value: 'svg', 
        label: 'SVG', 
        mimeTypes: ['image/svg+xml'], 
        extensions: ['svg'] 
      },
    ],
  },
  {
    type: 'document',
    name: 'Document Converter',
    formats: [
      { 
        value: 'pdf', 
        label: 'PDF', 
        mimeTypes: ['application/pdf'], 
        extensions: ['pdf'] 
      },
      { 
        value: 'docx', 
        label: 'DOCX', 
        mimeTypes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'], 
        extensions: ['docx'] 
      },
      { 
        value: 'doc', 
        label: 'DOC', 
        mimeTypes: ['application/msword'], 
        extensions: ['doc'] 
      },
      { 
        value: 'txt', 
        label: 'TXT', 
        mimeTypes: ['text/plain'], 
        extensions: ['txt'] 
      },
      { 
        value: 'rtf', 
        label: 'RTF', 
        mimeTypes: ['application/rtf', 'text/rtf'], 
        extensions: ['rtf'] 
      },
    ],
  },
  {
    type: 'audio',
    name: 'Audio Converter',
    formats: [
      { 
        value: 'mp3', 
        label: 'MP3', 
        mimeTypes: ['audio/mpeg'], 
        extensions: ['mp3'] 
      },
      { 
        value: 'wav', 
        label: 'WAV', 
        mimeTypes: ['audio/wav', 'audio/x-wav'], 
        extensions: ['wav'] 
      },
      { 
        value: 'ogg', 
        label: 'OGG', 
        mimeTypes: ['audio/ogg'], 
        extensions: ['ogg'] 
      },
      { 
        value: 'flac', 
        label: 'FLAC', 
        mimeTypes: ['audio/flac'], 
        extensions: ['flac'] 
      },
      { 
        value: 'aac', 
        label: 'AAC', 
        mimeTypes: ['audio/aac'], 
        extensions: ['aac'] 
      },
    ],
  },
];

/**
 * Detect file type and format based on MIME type or extension
 * @param file File to detect type for
 * @returns Object containing detected type and format
 */
export const detectFileType = (file: File): { type: ConversionType | null; format: string } => {
  const mimeType = file.type;
  
  // First try to detect by MIME type
  for (const option of conversionOptions) {
    for (const format of option.formats) {
      if (format.mimeTypes.includes(mimeType)) {
        return { type: option.type, format: format.value };
      }
    }
  }
  
  // If MIME type detection fails, try by file extension
  const extension = file.name.split('.').pop()?.toLowerCase() || '';
  for (const option of conversionOptions) {
    for (const format of option.formats) {
      if (format.extensions.includes(extension)) {
        return { type: option.type, format: format.value };
      }
    }
  }
  
  return { type: null, format: '' };
};

/**
 * Get appropriate accept string for file input based on conversion type
 * @param type Conversion type
 * @returns Accept string for file input
 */
export const getAcceptString = (type: ConversionType | null): string => {
  if (!type) return '';
  
  const option = conversionOptions.find(opt => opt.type === type);
  if (!option) return '';
  
  const mimeTypes = option.formats.flatMap(format => format.mimeTypes);
  return mimeTypes.join(',');
};

/**
 * Format file size in a human-readable way
 * @param bytes Size in bytes
 * @returns Formatted size string
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
};

/**
 * Convert a PDF file to text using PDF.js
 * @param file PDF file to convert
 * @returns Promise resolving to the extracted text
 */
export const convertPdfToText = async (file: File): Promise<string> => {
  try {
    // Check if it's actually a PDF
    if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
      throw new Error('Not a PDF file');
    }
    
    // Load PDF.js dynamically
    const pdfjsLib = await import('pdfjs-dist');
    
    // Set worker source (needed for PDF.js to work)
    // Use CDN worker instead of local import to avoid build issues
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
    // Read the file
    const arrayBuffer = await file.arrayBuffer();
    const typedArray = new Uint8Array(arrayBuffer);
    
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: typedArray });
    const pdfDocument = await loadingTask.promise;
    
    // Get total number of pages
    const numPages = pdfDocument.numPages;
    let fullText = `Extracted text from ${file.name}\n\n`;
    
    // Extract text from each page
    for (let i = 1; i <= numPages; i++) {
      const page = await pdfDocument.getPage(i);
      const textContent = await page.getTextContent();
      
      // Join all the text items
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      
      fullText += `--- Page ${i} ---\n${pageText}\n\n`;
    }
    
    return fullText;
  } catch (error) {
    console.error('Error converting PDF to text:', error);
    
    // Return a more user-friendly error message
    if (error instanceof Error) {
      if (error.message.includes('worker')) {
        return 'Error: PDF.js worker could not be loaded. Please try again.';
      } else if (error.message.includes('PDF')) {
        return 'Error: The file appears to be corrupted or not a valid PDF.';
      }
      return `Error converting PDF to text: ${error.message}`;
    }
    
    return 'Error converting PDF to text. Please try again.';
  }
};

/**
 * Convert file from one format to another
 * @param file File to convert
 * @param fromFormat Source format
 * @param toFormat Target format
 * @returns Promise resolving to the converted file or blob
 */
export const convertFile = async (
  file: File,
  fromFormat: string,
  toFormat: string
): Promise<Blob | null> => {
  try {
    // Special case for PDF to TXT conversion
    if (fromFormat === 'pdf' && toFormat === 'txt') {
      const text = await convertPdfToText(file);
      return new Blob([text], { type: 'text/plain' });
    }
    
    // For other conversions, we would implement specific conversion logic
    // For this demo, we'll just return the original file
    console.log(`Converting ${fromFormat} to ${toFormat}`);
    
    // Simulate conversion time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return file;
  } catch (error) {
    console.error('Conversion error:', error);
    return null;
  }
}; 
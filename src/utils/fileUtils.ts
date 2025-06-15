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
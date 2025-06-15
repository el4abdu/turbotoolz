'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';
import AdBanner from '@/components/AdBanner';
import { useRouter } from 'next/navigation';

// Password history interface
interface PasswordHistoryItem {
  password: string;
  strength: number;
  date: string;
  userRating?: number;
}

// Password analysis interface
interface PasswordAnalysis {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasCommonWord: boolean;
  isLongEnough: boolean;
  hasSequentialChars: boolean;
  hasRepeatingChars: boolean;
  score: number;
}

export default function PasswordGeneratorPage() {
  const router = useRouter();
  // Password configuration state
  const [passwordLength, setPasswordLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeSimilarChars, setExcludeSimilarChars] = useState(false);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false);
  const [useEasyToRemember, setUseEasyToRemember] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordAnalysis, setPasswordAnalysis] = useState<PasswordAnalysis | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Custom password input
  const [customPassword, setCustomPassword] = useState('');
  const [isCustomMode, setIsCustomMode] = useState(false);
  
  // Password history
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  
  // Advanced options
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Character sets
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const similarChars = 'iIlL1oO0';
  const ambiguousChars = '{}[]()/\\\'"`~,;:.<>';
  
  // Common words to avoid in passwords (simplified list)
  const commonWords = ['password', 'admin', '123456', 'welcome', 'qwerty', 'letmein'];

  // Load password history from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('passwordHistory');
      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          setPasswordHistory(parsedHistory);
        } catch (error) {
          console.error('Error parsing password history:', error);
        }
      }
      
      generatePassword();
    }
  }, []);

  // Generate password on settings change
  useEffect(() => {
    if (!isCustomMode) {
      generatePassword();
    }
  }, [passwordLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilarChars, avoidAmbiguous, useEasyToRemember, isCustomMode]);

  // Update password and strength when custom password changes
  useEffect(() => {
    if (isCustomMode && customPassword) {
      setPassword(customPassword);
      analyzePassword(customPassword);
    }
  }, [customPassword, isCustomMode]);

  // Save password history to localStorage when it changes
  useEffect(() => {
    if (passwordHistory.length > 0 && typeof window !== 'undefined') {
      // Limit history to 10 items to keep localStorage size reasonable
      const limitedHistory = passwordHistory.slice(0, 10);
      localStorage.setItem('passwordHistory', JSON.stringify(limitedHistory));
    }
  }, [passwordHistory]);

  // Generate password function
  const generatePassword = () => {
    setErrorMessage('');
    setUserRating(null);
    
    // Validate at least one character type is selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      setErrorMessage('Please select at least one character type');
      setPassword('');
      return;
    }

    // Build character pool based on settings
    let charPool = '';
    if (includeUppercase) charPool += uppercaseChars;
    if (includeLowercase) charPool += lowercaseChars;
    if (includeNumbers) charPool += numberChars;
    if (includeSymbols) charPool += symbolChars;

    // Remove similar characters if option is selected
    if (excludeSimilarChars) {
      for (const char of similarChars) {
        charPool = charPool.replace(new RegExp(char, 'g'), '');
      }
    }
    
    // Remove ambiguous characters if option is selected
    if (avoidAmbiguous) {
      for (const char of ambiguousChars) {
        charPool = charPool.replace(new RegExp('\\' + char, 'g'), '');
      }
    }

    let newPassword = '';
    
    // Generate an easy-to-remember password if selected
    if (useEasyToRemember && passwordLength >= 8) {
      // Simple pattern: word + number + symbol + word
      const words = ['apple', 'banana', 'cherry', 'orange', 'grape', 'lemon', 'melon', 'peach', 'plum', 'mango'];
      const word1 = words[Math.floor(Math.random() * words.length)];
      const word2 = words[Math.floor(Math.random() * words.length)];
      const num = Math.floor(Math.random() * 100);
      const sym = symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
      
      newPassword = word1 + num + sym + word2;
      
      // Capitalize some letters
      if (includeUppercase) {
        newPassword = newPassword.charAt(0).toUpperCase() + newPassword.slice(1);
      }
      
      // Trim or pad to the desired length
      if (newPassword.length > passwordLength) {
        newPassword = newPassword.substring(0, passwordLength);
      } else {
        while (newPassword.length < passwordLength) {
          const randomChar = charPool.charAt(Math.floor(Math.random() * charPool.length));
          newPassword += randomChar;
        }
      }
    } else {
      // Generate password with standard algorithm
      let hasUppercase = !includeUppercase;
      let hasLowercase = !includeLowercase;
      let hasNumber = !includeNumbers;
      let hasSymbol = !includeSymbols;

      // First pass: ensure we have at least one of each selected type
      if (includeUppercase) {
        newPassword += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
        hasUppercase = true;
      }
      if (includeLowercase) {
        newPassword += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
        hasLowercase = true;
      }
      if (includeNumbers) {
        newPassword += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
        hasNumber = true;
      }
      if (includeSymbols) {
        newPassword += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
        hasSymbol = true;
      }

      // Fill the rest of the password
      while (newPassword.length < passwordLength) {
        const randomChar = charPool.charAt(Math.floor(Math.random() * charPool.length));
        newPassword += randomChar;
      }

      // Shuffle the password
      newPassword = shuffleString(newPassword);
      
      // Trim to exact length (in case we added too many chars in the first pass)
      newPassword = newPassword.slice(0, passwordLength);
    }
    
    setPassword(newPassword);
    analyzePassword(newPassword);
    
    // Add to history
    addToHistory(newPassword);
  };

  // Add password to history
  const addToHistory = (pwd: string) => {
    const newHistoryItem: PasswordHistoryItem = {
      password: pwd,
      strength: passwordStrength,
      date: new Date().toLocaleString(),
    };
    
    setPasswordHistory(prev => [newHistoryItem, ...prev]);
  };

  // Rate a password and save the rating
  const ratePassword = (rating: number) => {
    setUserRating(rating);
    
    // Update the rating in history if the current password exists there
    setPasswordHistory(prev => 
      prev.map(item => 
        item.password === password 
          ? { ...item, userRating: rating } 
          : item
      )
    );
  };

  // Copy specific password from history
  const copyHistoryPassword = (pwd: string) => {
    navigator.clipboard.writeText(pwd).then(() => {
      // You could add a visual indicator here if needed
      alert('Password copied to clipboard!');
    });
  };

  // Delete password from history
  const deleteHistoryPassword = (index: number) => {
    setPasswordHistory(prev => {
      const newHistory = [...prev];
      newHistory.splice(index, 1);
      return newHistory;
    });
  };

  // Clear all password history
  const clearAllHistory = () => {
    if (confirm('Are you sure you want to delete all password history?')) {
      setPasswordHistory([]);
      localStorage.removeItem('passwordHistory');
    }
  };

  // Fisher-Yates shuffle algorithm
  const shuffleString = (str: string): string => {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  };

  // Analyze password strength and characteristics
  const analyzePassword = (pwd: string): void => {
    if (!pwd) {
      setPasswordStrength(0);
      setPasswordAnalysis(null);
      return;
    }
    
    // Check for various password characteristics
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);
    const isLongEnough = pwd.length >= 12;
    
    // Check for sequential characters (e.g., "abc", "123")
    const hasSequentialChars = /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789/i.test(pwd);
    
    // Check for repeating characters (e.g., "aaa", "111")
    const hasRepeatingChars = /(.)\1{2,}/.test(pwd);
    
    // Check if the password contains common words
    let hasCommonWord = false;
    for (const word of commonWords) {
      if (pwd.toLowerCase().includes(word)) {
        hasCommonWord = true;
        break;
      }
    }
    
    // Calculate base strength (0-100)
    let strength = 0;
    
    // Length contribution (up to 40 points)
    strength += Math.min(40, pwd.length * 2.5);
    
    // Character variety contribution (up to 40 points)
    const varietyCount = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;
    strength += varietyCount * 10;
    
    // Penalize for weaknesses
    if (hasSequentialChars) strength -= 10;
    if (hasRepeatingChars) strength -= 10;
    if (hasCommonWord) strength -= 20;
    
    // Ensure strength is between 0-100
    strength = Math.max(0, Math.min(100, strength));
    
    // Save analysis
    const analysis: PasswordAnalysis = {
      hasUppercase: hasUpper,
      hasLowercase: hasLower,
      hasNumber: hasNumber,
      hasSymbol: hasSymbol,
      hasCommonWord,
      isLongEnough,
      hasSequentialChars,
      hasRepeatingChars,
      score: strength
    };
    
    setPasswordStrength(strength);
    setPasswordAnalysis(analysis);
  };

  // Calculate password strength (0-100)
  const calculatePasswordStrength = (pwd: string): void => {
    analyzePassword(pwd);
  };

  // Copy password to clipboard
  const copyToClipboard = () => {
    if (!password) return;
    
    navigator.clipboard.writeText(password).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Export passwords to TXT file
  const exportToGitHub = async () => {
    // Prepare the data in text format
    let textContent = "TurboToolz Password History\n";
    textContent += "=============================\n\n";
    
    passwordHistory.forEach((item, index) => {
      textContent += `Password ${index + 1}: ${item.password}\n`;
      textContent += `Strength: ${item.strength}%\n`;
      textContent += `Date: ${item.date}\n`;
      if (item.userRating) {
        textContent += `User Rating: ${item.userRating}/5\n`;
      }
      textContent += "-----------------------------\n\n";
    });
    
    textContent += "Generated by TurboToolz Password Generator\n";
    textContent += `Export Date: ${new Date().toLocaleString()}`;
    
    // Create and download the text file
    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(textContent);
    const exportFileName = 'password_history.txt';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
    
    // Show a toast or notification that the export was successful
    alert('Password history exported successfully!');
  };

  // Get strength label and color
  const getStrengthInfo = () => {
    if (passwordStrength >= 80) return { label: 'Very Strong', color: 'bg-green-500' };
    if (passwordStrength >= 60) return { label: 'Strong', color: 'bg-emerald-500' };
    if (passwordStrength >= 40) return { label: 'Medium', color: 'bg-yellow-500' };
    if (passwordStrength >= 20) return { label: 'Weak', color: 'bg-orange-500' };
    return { label: 'Very Weak', color: 'bg-red-500' };
  };

  // Toggle between generated and custom password modes
  const toggleCustomMode = () => {
    setIsCustomMode(!isCustomMode);
    if (!isCustomMode) {
      setCustomPassword(password);
    }
  };

  // Make password stronger with more advanced improvements
  const makeStronger = () => {
    let strongerPassword = isCustomMode ? customPassword : password;
    
    // If password is empty, generate a new one
    if (!strongerPassword) {
      generatePassword();
      return;
    }
    
    // Analyze current password
    const hasUpper = /[A-Z]/.test(strongerPassword);
    const hasLower = /[a-z]/.test(strongerPassword);
    const hasNumber = /[0-9]/.test(strongerPassword);
    const hasSymbol = /[^A-Za-z0-9]/.test(strongerPassword);
    const isShort = strongerPassword.length < 12;
    
    // Create improvement plan
    let improvements = [];
    
    // Add missing character types
    if (!hasUpper) improvements.push('uppercase');
    if (!hasLower) improvements.push('lowercase');
    if (!hasNumber) improvements.push('number');
    if (!hasSymbol) improvements.push('symbol');
    
    // Add length if needed
    if (isShort) improvements.push('length');
    
    // Apply improvements
    if (improvements.length > 0) {
      // First, handle length increase if needed
      if (isShort) {
        const additionalChars = 12 - strongerPassword.length;
        const allChars = uppercaseChars + lowercaseChars + numberChars + symbolChars;
        for (let i = 0; i < additionalChars; i++) {
          strongerPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }
      }
      
      // Then replace characters to ensure all required types
      let positions = getRandomPositions(strongerPassword.length, improvements.length);
      
      improvements.forEach((improvement, index) => {
        const pos = positions[index];
        let replacementChar = '';
        
        switch (improvement) {
          case 'uppercase':
            replacementChar = uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
            break;
          case 'lowercase':
            replacementChar = lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
            break;
          case 'number':
            replacementChar = numberChars.charAt(Math.floor(Math.random() * numberChars.length));
            break;
          case 'symbol':
            replacementChar = symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
            break;
        }
        
        if (replacementChar && pos < strongerPassword.length) {
          strongerPassword = 
            strongerPassword.substring(0, pos) + 
            replacementChar + 
            strongerPassword.substring(pos + 1);
        }
      });
      
      // Shuffle the result for extra security
      strongerPassword = shuffleString(strongerPassword);
    }
    
    if (isCustomMode) {
      setCustomPassword(strongerPassword);
    } else {
      setPassword(strongerPassword);
    }
    
    calculatePasswordStrength(strongerPassword);
    addToHistory(strongerPassword);
  };
  
  // Helper function to get random unique positions in a string
  const getRandomPositions = (length: number, count: number): number[] => {
    const positions: number[] = [];
    while (positions.length < count && positions.length < length) {
      const pos = Math.floor(Math.random() * length);
      if (!positions.includes(pos)) {
        positions.push(pos);
      }
    }
    return positions;
  };

  const strengthInfo = getStrengthInfo();

  return (
    <>
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-light mb-6 fade-in">
                Password Generator
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 fade-in delay-100">
                Create strong, secure passwords with our powerful generator tool
              </p>
            </div>
            
            {/* Ad Banner - Top */}
            <div className="mb-12">
              <AdBanner className="max-w-2xl mx-auto" />
            </div>
            
            {/* Password Generator */}
            <Card variant="glass" className="p-8 md:p-8 mb-12 fade-in delay-200">
              {/* Mode Toggle */}
              <div className="flex justify-end mb-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                    {isCustomMode ? 'Custom Password' : 'Generated Password'}
                  </span>
                  <button
                    onClick={toggleCustomMode}
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-700"
                  >
                    <span
                      className={`${
                        isCustomMode ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </button>
                </div>
              </div>
              
              {/* Password Display */}
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <h2 className="text-xl font-bold text-dark dark:text-light">Your Password</h2>
                  {errorMessage && (
                    <span className="ml-auto text-sm text-red-500">{errorMessage}</span>
                  )}
                </div>
                <div className="relative">
                  <div className="flex items-center">
                    {isCustomMode ? (
                      <input
                        type="text"
                        value={customPassword}
                        onChange={(e) => setCustomPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg text-lg font-mono"
                        placeholder="Enter your custom password"
                      />
                    ) : (
                      <input
                        type="text"
                        value={password}
                        readOnly
                        className="w-full px-4 py-3 bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg text-lg font-mono"
                      />
                    )}
                    <button
                      onClick={copyToClipboard}
                      className="absolute right-3 p-2 text-gray-500 hover:text-primary transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Password Strength Meter */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Password Strength:</span>
                    <span className="text-sm font-medium">{strengthInfo.label}</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${strengthInfo.color} transition-all duration-300`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                </div>

                {/* User Rating */}
                <div className="mt-4">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Rate this password:</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => ratePassword(star)}
                          className={`p-1 focus:outline-none ${
                            userRating && userRating >= star
                              ? 'text-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Password Settings */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-dark dark:text-light mb-4">Password Settings</h3>
                
                {/* Password Length */}
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <label htmlFor="length" className="text-gray-700 dark:text-gray-300">Length: {passwordLength}</label>
                    <span className="text-gray-500 text-sm">(8-64 characters)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      id="length"
                      min="8"
                      max="64"
                      value={passwordLength}
                      onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <input
                      type="number"
                      min="8"
                      max="64"
                      value={passwordLength}
                      onChange={(e) => setPasswordLength(parseInt(e.target.value))}
                      className="w-16 px-2 py-1 bg-white/70 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-md text-center"
                    />
                  </div>
                </div>
                
                {/* Character Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="uppercase"
                      checked={includeUppercase}
                      onChange={(e) => setIncludeUppercase(e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                    <label htmlFor="uppercase" className="ml-2 text-gray-700 dark:text-gray-300">
                      Include Uppercase Letters (A-Z)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lowercase"
                      checked={includeLowercase}
                      onChange={(e) => setIncludeLowercase(e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                    <label htmlFor="lowercase" className="ml-2 text-gray-700 dark:text-gray-300">
                      Include Lowercase Letters (a-z)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="numbers"
                      checked={includeNumbers}
                      onChange={(e) => setIncludeNumbers(e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                    <label htmlFor="numbers" className="ml-2 text-gray-700 dark:text-gray-300">
                      Include Numbers (0-9)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="symbols"
                      checked={includeSymbols}
                      onChange={(e) => setIncludeSymbols(e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                    <label htmlFor="symbols" className="ml-2 text-gray-700 dark:text-gray-300">
                      Include Symbols (!@#$%^&*)
                    </label>
                  </div>
                  <div className="flex items-center md:col-span-2">
                    <input
                      type="checkbox"
                      id="similar"
                      checked={excludeSimilarChars}
                      onChange={(e) => setExcludeSimilarChars(e.target.checked)}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                    <label htmlFor="similar" className="ml-2 text-gray-700 dark:text-gray-300">
                      Exclude Similar Characters (i, l, 1, L, o, 0, O)
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
                <Button 
                  onClick={generatePassword}
                  variant="primary"
                  size="lg"
                  className="px-8 hover:scale-105 transition-transform"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  Generate New Password
                </Button>
                
                <Button 
                  onClick={makeStronger}
                  variant="secondary"
                  size="lg"
                  className="px-8"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                  </svg>
                  Make Stronger
                </Button>
                
                <Button 
                  onClick={exportToGitHub}
                  variant="accent"
                  size="lg"
                  className="px-8"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Export as TXT
                </Button>
              </div>
              
              {/* Password History Toggle */}
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center text-primary hover:text-primary-dark transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 transition-transform ${showHistory ? 'rotate-90' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Password History ({passwordHistory.length})</span>
                  </button>
                  
                  {passwordHistory.length > 0 && (
                    <button
                      onClick={clearAllHistory}
                      className="text-sm text-red-500 hover:text-red-700 transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </div>
              
              {/* Password History */}
              {showHistory && (
                <div className="mt-4 bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 max-h-60 overflow-y-auto">
                  {passwordHistory.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center">No password history yet</p>
                  ) : (
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {passwordHistory.map((item, index) => (
                        <li key={index} className="py-3 first:pt-0 last:pb-0">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="font-mono text-sm mb-2 md:mb-0">{item.password}</div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-1 ${
                                  item.strength >= 80 ? 'bg-green-500' :
                                  item.strength >= 60 ? 'bg-emerald-500' :
                                  item.strength >= 40 ? 'bg-yellow-500' :
                                  item.strength >= 20 ? 'bg-orange-500' :
                                  'bg-red-500'
                                }`}></div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{item.strength}%</span>
                              </div>
                              
                              {item.userRating && (
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-500 dark:text-gray-400 mr-1">Rating:</span>
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <svg 
                                        key={star}
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={`h-3 w-3 ${star <= item.userRating! ? 'text-yellow-400' : 'text-gray-300'}`} 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <span className="text-xs text-gray-500 dark:text-gray-400">{item.date}</span>
                              
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => copyHistoryPassword(item.password)}
                                  className="p-1 text-gray-500 hover:text-primary transition-colors"
                                  title="Copy password"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => deleteHistoryPassword(index)}
                                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                                  title="Delete password"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </Card>
            
            {/* Ad Banner - Middle */}
            <div className="mb-12">
              <AdBanner className="max-w-2xl mx-auto" />
            </div>
            
            {/* Password Tips */}
            <Card variant="neomorphic" className="p-8 fade-in delay-300">
              <h2 className="text-2xl font-bold text-dark dark:text-light mb-4">
                Password Security Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/50 dark:bg-dark/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-dark dark:text-light mb-2 flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Use Unique Passwords
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Never reuse passwords across multiple sites or services. Each account should have its own unique password.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-dark/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-dark dark:text-light mb-2 flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Length Matters
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Longer passwords are generally more secure. Aim for at least 12 characters when possible.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-dark/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-dark dark:text-light mb-2 flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Mix Character Types
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Include a mix of uppercase letters, lowercase letters, numbers, and special characters.
                  </p>
                </div>
                <div className="bg-white/50 dark:bg-dark/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-dark dark:text-light mb-2 flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Use a Password Manager
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Consider using a password manager to securely store and generate complex passwords.
                  </p>
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
 
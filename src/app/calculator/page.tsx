'use client';

import React, { useState } from 'react';
import Card from '@/components/Card';
import AdBanner from '@/components/AdBanner';

export default function CalculatorPage() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
      addToHistory(`${firstOperand} ${operator} ${inputValue} = ${result}`);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (): number => {
    if (firstOperand === null || operator === null) return parseFloat(display);
    
    const inputValue = parseFloat(display);
    let result = 0;

    switch (operator) {
      case '+':
        result = firstOperand + inputValue;
        break;
      case '-':
        result = firstOperand - inputValue;
        break;
      case '*':
        result = firstOperand * inputValue;
        break;
      case '/':
        result = firstOperand / inputValue;
        break;
      default:
        return inputValue;
    }

    return Math.round(result * 1000000) / 1000000; // Handle floating point precision
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null) return;

    const inputValue = parseFloat(display);
    const result = performCalculation();
    
    setDisplay(String(result));
    addToHistory(`${firstOperand} ${operator} ${inputValue} = ${result}`);
    
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const addToHistory = (calculation: string) => {
    setHistory(prev => {
      const newHistory = [...prev, calculation];
      // Keep only the last 10 calculations
      if (newHistory.length > 10) {
        return newHistory.slice(newHistory.length - 10);
      }
      return newHistory;
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleBackspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(-value));
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  return (
    <>
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-light mb-6 fade-in">
                Calculator
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 fade-in delay-100">
                A powerful calculator for your everyday needs
              </p>
            </div>
            
            {/* Calculator */}
            <Card variant="neomorphic" className="mb-8 fade-in delay-200">
              {/* Display */}
              <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-t-lg border-b border-gray-200 dark:border-gray-700">
                <div className="text-right text-4xl font-mono text-dark dark:text-light overflow-x-auto whitespace-nowrap py-2">
                  {display}
                </div>
              </div>
              
              {/* Keypad */}
              <div className="grid grid-cols-4 gap-1 p-2 bg-gray-100 dark:bg-gray-900 rounded-b-lg">
                {/* Row 1 */}
                <button 
                  onClick={clearDisplay} 
                  className="bg-red-500 hover:bg-red-600 text-white text-xl font-semibold p-4 rounded-lg transition-colors"
                >
                  AC
                </button>
                <button 
                  onClick={handleBackspace} 
                  className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  ⌫
                </button>
                <button 
                  onClick={handlePercent} 
                  className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  %
                </button>
                <button 
                  onClick={() => handleOperator('/')} 
                  className="bg-primary hover:bg-primary-dark text-white text-xl p-4 rounded-lg transition-colors"
                >
                  ÷
                </button>
                
                {/* Row 2 */}
                <button 
                  onClick={() => inputDigit('7')} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  7
                </button>
                <button 
                  onClick={() => inputDigit('8')} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  8
                </button>
                <button 
                  onClick={() => inputDigit('9')} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  9
                </button>
                <button 
                  onClick={() => handleOperator('*')} 
                  className="bg-primary hover:bg-primary-dark text-white text-xl p-4 rounded-lg transition-colors"
                >
                  ×
                </button>
                
                {/* Row 3 */}
                <button 
                  onClick={() => inputDigit('4')} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  4
                </button>
                <button 
                  onClick={() => inputDigit('5')} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  5
                </button>
                <button 
                  onClick={() => inputDigit('6')} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  6
                </button>
                <button 
                  onClick={() => handleOperator('-')} 
                  className="bg-primary hover:bg-primary-dark text-white text-xl p-4 rounded-lg transition-colors"
                >
                  -
                </button>
                
                {/* Row 4 */}
                <button 
                  onClick={() => inputDigit('1')} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  1
                </button>
                <button 
                  onClick={() => inputDigit('2')} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  2
                </button>
                <button 
                  onClick={() => inputDigit('3')} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  3
                </button>
                <button 
                  onClick={() => handleOperator('+')} 
                  className="bg-primary hover:bg-primary-dark text-white text-xl p-4 rounded-lg transition-colors"
                >
                  +
                </button>
                
                {/* Row 5 */}
                <button 
                  onClick={handlePlusMinus} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  ±
                </button>
                <button 
                  onClick={() => inputDigit('0')} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  0
                </button>
                <button 
                  onClick={inputDecimal} 
                  className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-dark dark:text-light text-xl p-4 rounded-lg transition-colors"
                >
                  .
                </button>
                <button 
                  onClick={handleEquals} 
                  className="bg-green-500 hover:bg-green-600 text-white text-xl p-4 rounded-lg transition-colors"
                >
                  =
                </button>
              </div>
            </Card>
            
            {/* History */}
            <Card variant="glass" className="mb-8 fade-in delay-300">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-dark dark:text-light">Calculation History</h2>
                {history.length > 0 && (
                  <button 
                    onClick={clearHistory}
                    className="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Clear History
                  </button>
                )}
              </div>
              <div className="p-4 max-h-60 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No calculations yet
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {history.map((item, index) => (
                      <li 
                        key={index} 
                        className="text-dark dark:text-light font-mono p-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Card>
            
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Basic Operations</h3>
                    <p className="text-gray-600 dark:text-gray-400">Addition, subtraction, multiplication, and division</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Calculation History</h3>
                    <p className="text-gray-600 dark:text-gray-400">Keep track of your recent calculations</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Percentage Calculation</h3>
                    <p className="text-gray-600 dark:text-gray-400">Easily calculate percentages with a single button</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary mr-4 mt-0.5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold text-dark dark:text-light">Modern Design</h3>
                    <p className="text-gray-600 dark:text-gray-400">Clean interface with light and dark mode support</p>
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

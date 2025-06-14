"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';

const MotionBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Delay canvas initialization to prioritize main content loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isLoaded) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles - reduce count for better performance
    const particleCount = Math.min(30, Math.max(15, Math.floor(window.innerWidth / 50)));
    const particles: Particle[] = [];
    
    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      pulse: number;
      pulseSpeed: number;
    }
    
    // Colors based on theme
    const getColors = () => {
      return theme === 'dark' 
        ? ['#4F46E5', '#3B82F6', '#F59E0B'] // Dark theme colors
        : ['#4F46E5', '#3B82F6', '#F59E0B']; // Light theme colors
    };
    
    // Initialize particles
    const initParticles = () => {
      particles.length = 0; // Clear existing particles
      const colors = getColors();
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.4 + 0.1,
          pulse: 0,
          pulseSpeed: 0.02 + Math.random() * 0.01
        });
      }
    };
    
    // Animation variables
    let animationFrameId: number;
    let lastTime = 0;
    const targetFPS = 30; // Lower FPS for better performance
    const frameInterval = 1000 / targetFPS;
    
    // Animation loop with frame rate control
    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Control frame rate
      const elapsed = timestamp - lastTime;
      if (elapsed < frameInterval) return;
      lastTime = timestamp - (elapsed % frameInterval);
      
      // Clear canvas with a semi-transparent fill to create trail effect
      ctx.fillStyle = theme === 'dark' 
        ? 'rgba(17, 24, 39, 0.1)' // Dark background
        : 'rgba(249, 250, 251, 0.1)'; // Light background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x > canvas.width) particle.x = 0;
        else if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        else if (particle.y < 0) particle.y = canvas.height;
        
        // Pulsing effect
        particle.pulse += particle.pulseSpeed;
        const pulseFactor = Math.sin(particle.pulse) * 0.5 + 0.5;
        const size = particle.size * (0.8 + pulseFactor * 0.3);
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        
        // Simplified rendering for better performance
        ctx.fillStyle = `${particle.color}${Math.floor((particle.opacity + pulseFactor * 0.1) * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Connect particles within a certain distance - only connect some particles for better performance
        if (Math.random() > 0.7) {
          connectParticles(particle);
        }
      });
    };
    
    // Connect nearby particles with lines
    const connectParticles = (particle: Particle) => {
      const maxDistance = 120;
      
      particles.forEach(otherParticle => {
        if (particle === otherParticle) return;
        
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = (1 - distance / maxDistance) * 0.3;
          
          ctx.beginPath();
          ctx.strokeStyle = `${particle.color}${Math.floor(opacity * 40).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.stroke();
        }
      });
    };
    
    // Initialize and start animation
    initParticles();
    animationFrameId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isLoaded]); // Re-run effect when theme changes or component is loaded
  
  return (
    <>
      {isLoaded && (
        <canvas 
          ref={canvasRef} 
          className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
      )}
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </>
  );
};

export default MotionBackground; 
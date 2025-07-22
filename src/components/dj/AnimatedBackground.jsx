import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Audio visualization bars
    const bars = Array.from({ length: 50 }, (_, i) => ({
      x: (window.innerWidth / 50) * i,
      height: Math.random() * 200 + 50,
      speed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
    }));
    
    let time = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(147, 51, 234, 0.1)');
      gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.1)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated bars
      bars.forEach((bar, i) => {
        const height = Math.sin(time + bar.phase) * bar.height + bar.height;
        const opacity = Math.sin(time * 2 + i * 0.1) * 0.3 + 0.4;
        
        const barGradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - height);
        barGradient.addColorStop(0, `rgba(147, 51, 234, ${opacity})`);
        barGradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity})`);
        barGradient.addColorStop(1, `rgba(236, 72, 153, ${opacity})`);
        
        ctx.fillStyle = barGradient;
        ctx.fillRect(bar.x, canvas.height - height, window.innerWidth / 50 - 2, height);
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Canvas uses only inline styles for fixed, full-viewport, zIndex 0 */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }}
      />
      {/* DJ Silhouettes and particles use default z-index (behind content) */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 opacity-10"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-xl"></div>
        </motion.div>
        <motion.div
          className="absolute bottom-20 left-10 w-24 h-24 opacity-10"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-xl"></div>
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 opacity-5"
          animate={{
            y: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-lg"></div>
        </motion.div>
      </div>
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1 h-1 bg-white rounded-full opacity-20 pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </>
  );
}

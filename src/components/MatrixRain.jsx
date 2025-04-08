import React, { useEffect, useRef } from 'react';
import './MatrixRain.css';

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const interactionRadius = 30;
  const frameRate = 35;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Fonction pour ajuster la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Ajuster la taille de la police selon la largeur de l'écran
      const fontSize = window.innerWidth < 768 ? 10 : 14; // Plus petit sur mobile
      const columns = Math.floor(canvas.width / fontSize);
      
      return { fontSize, columns };
    };

    let { fontSize, columns } = resizeCanvas();
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const charArray = chars.split('');
    
    let drops = Array(columns).fill(1);
    let frozenChars = Array(columns).fill('');
    let isActive = Array(columns).fill(true);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;
      
      drops.forEach((y, i) => {
        const x = i * fontSize;
        
        const distance = Math.sqrt(
          Math.pow(x - mousePos.current.x, 2) + 
          Math.pow(y * fontSize - mousePos.current.y, 2)
        );

        if (distance < interactionRadius) {
          if (!frozenChars[i]) {
            frozenChars[i] = charArray[Math.floor(Math.random() * charArray.length)];
          }
          ctx.fillStyle = '#00ff88';
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 5;
          ctx.fillText(frozenChars[i], x, y * fontSize);
          isActive[i] = false;
        } else {
          frozenChars[i] = '';
          isActive[i] = true;
          ctx.fillStyle = '#0F0';
          ctx.shadowBlur = 0;
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          ctx.fillText(char, x, y * fontSize);
        }

        if (isActive[i]) {
          if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          } else {
            drops[i]++;
          }
        }
      });
    };

    const interval = setInterval(draw, frameRate);

    // Gestionnaire de redimensionnement
    const handleResize = () => {
      const { fontSize: newFontSize, columns: newColumns } = resizeCanvas();
      fontSize = newFontSize;
      
      // Réinitialiser les tableaux avec la nouvelle taille
      if (columns !== newColumns) {
        columns = newColumns;
        drops = Array(columns).fill(1);
        frozenChars = Array(columns).fill('');
        isActive = Array(columns).fill(true);
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      mousePos.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mousePos.current = { x: -100, y: -100 };
    };

    // Écouteurs d'événements
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchend', handleMouseLeave);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchend', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="matrix-rain"
        style={{ cursor: 'none' }}
      />
      <div className="matrix-overlay" />
    </>
  );
};

export default MatrixRain;
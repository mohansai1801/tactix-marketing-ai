import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tactixLogo from '../assets/tactix-logo.png';

const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 500);
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const navTimer = setTimeout(() => navigate('/login'), 3000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div 
      className={`min-h-screen gradient-navy flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="animate-float">
          <img 
            src={tactixLogo} 
            alt="TACTIX Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain animate-logo-pulse"
          />
        </div>

        {/* Brand Name */}
        <h1 
          className={`font-display font-bold text-5xl md:text-7xl text-primary-foreground mt-6 tracking-tight transition-all duration-700 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          TACTIX
        </h1>

        {/* Tagline */}
        <p 
          className={`text-primary-foreground/70 text-lg md:text-xl mt-3 font-medium tracking-wide transition-all duration-700 delay-200 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Insight for Growth
        </p>

        {/* Loading indicator */}
        <div 
          className={`mt-12 flex gap-2 transition-all duration-500 delay-500 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default SplashPage;

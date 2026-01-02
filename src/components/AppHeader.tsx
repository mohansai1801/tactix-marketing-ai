import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import tactixLogo from '../assets/tactix-logo.png';

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <header className="bg-primary/95 backdrop-blur-xl border-b border-secondary/30 px-6 py-4 sticky top-0 z-40">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Brand */}
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-xl gradient-navy flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <img 
                src={tactixLogo} 
                alt="TACTIX" 
                className="w-8 h-8" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-primary-foreground tracking-wide">
                TACTIX
              </span>
              <span className="text-[10px] text-accent font-medium tracking-widest uppercase">
                Insights for Growth
              </span>
            </div>
          </button>

          {/* Right: Profile */}
          <button
            onClick={() => navigate('/profile')}
            className={`flex items-center gap-2 p-2 rounded-xl transition-all duration-300 ${
              isProfilePage 
                ? 'bg-accent/20' 
                : 'hover:bg-secondary/50'
            }`}
          >
            <div className="w-10 h-10 rounded-full gradient-accent flex items-center justify-center shadow-md">
              <User className="w-5 h-5 text-accent-foreground" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

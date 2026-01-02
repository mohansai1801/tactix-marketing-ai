import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import tactixLogo from '../assets/tactix-logo.png';

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';

  return (
    <header className="gradient-navy px-6 pt-6 pb-4 sticky top-0 z-40">
      <div className="container max-w-4xl mx-auto">
        <div className="flex items-center justify-between page-transition">
          {/* Left: Logo + Brand */}
          <button 
            onClick={() => navigate('/home')}
            className="flex items-center gap-3 group"
          >
            <img 
              src={tactixLogo} 
              alt="TACTIX" 
              className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" 
            />
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
            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${
              isProfilePage 
                ? 'bg-accent/20' 
                : 'hover:bg-secondary/30'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-cyan-accent flex items-center justify-center shadow-glow">
              <User className="w-5 h-5 text-primary-foreground" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

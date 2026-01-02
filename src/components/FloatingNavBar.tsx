import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, BarChart3, Sparkles } from 'lucide-react';

const FloatingNavBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="floating-nav">
      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
        
        {/* Generate Ideas Button */}
        <NavLink
          to="/generate"
          className={`nav-item mx-1 ${isActive('/generate') ? 'active' : ''}`}
        >
          <div className="relative">
            <Sparkles className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-accent rounded-full animate-pulse" />
          </div>
          <span className="text-xs mt-1 font-medium">Ideas</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default FloatingNavBar;

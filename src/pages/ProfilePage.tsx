import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  LogOut, 
  Settings, 
  Bell, 
  Shield,
  HelpCircle,
  ChevronRight,
  Crown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useAgents } from '../contexts/AgentContext';
import FloatingNavBar from '../components/FloatingNavBar';
import tactixLogo from '../assets/tactix-logo.png';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { resetOnboarding, isComplete } = useOnboarding();
  const { hasProAccess } = useAgents();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    resetOnboarding();
    navigate('/login');
  };

  const menuItems = [
    { icon: Settings, label: 'Account Settings', action: () => {} },
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="gradient-navy px-6 pt-8 pb-20">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center gap-3 page-transition">
            <img src={tactixLogo} alt="TACTIX" className="w-10 h-10" />
            <span className="font-display font-bold text-xl text-primary-foreground">Profile</span>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-6 -mt-12">
        {/* Profile Card */}
        <div className="glass-card p-6 mb-6 slide-up">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center">
              <User className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-xl text-foreground">
                  {user?.displayName || 'User'}
                </h2>
                {hasProAccess && (
                  <span className="flex items-center gap-1 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                    <Crown className="w-3 h-3" /> Pro
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Upgrade Banner (if not pro) */}
          {!hasProAccess && (
            <button
              onClick={() => navigate('/payment')}
              className="w-full mt-6 p-4 rounded-xl bg-gradient-to-r from-accent/10 to-cyan-accent/10 border border-accent/20 flex items-center justify-between group hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Crown className="w-6 h-6 text-accent" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Upgrade to Pro</p>
                  <p className="text-xs text-muted-foreground">Unlock all AI agents</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-accent group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <div className="glass-card divide-y divide-border slide-up stagger-1">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <span className="text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 glass-card p-4 flex items-center justify-center gap-2 text-destructive hover:bg-destructive/5 transition-colors slide-up stagger-2"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>

        {/* App Info */}
        <div className="text-center mt-8 slide-up stagger-3">
          <p className="text-sm text-muted-foreground">TACTIX v1.0.0</p>
          <p className="text-xs text-muted-foreground mt-1">
            AI-Powered Marketing Automation
          </p>
        </div>
      </main>

      <FloatingNavBar />
    </div>
  );
};

export default ProfilePage;

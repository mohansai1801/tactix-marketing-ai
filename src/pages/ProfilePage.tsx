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
  Crown,
  Edit3,
  Sparkles,
  Zap,
  ExternalLink,
  Check
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useAgents } from '../contexts/AgentContext';
import FloatingNavBar from '../components/FloatingNavBar';
import AppHeader from '../components/AppHeader';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { resetOnboarding, isComplete, data } = useOnboarding();
  const { hasProAccess, agents } = useAgents();

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

  const handleEditPreferences = () => {
    resetOnboarding();
    navigate('/onboarding');
  };

  const activeAgents = agents.filter(a => a.isActive).length;

  const menuItems = [
    { icon: Edit3, label: 'Edit Preferences', sublabel: 'Update your business profile', action: handleEditPreferences },
    { icon: Settings, label: 'Account Settings', sublabel: 'Manage your account', action: () => {} },
    { icon: Bell, label: 'Notifications', sublabel: '3 new updates', badge: '3', action: () => {} },
    { icon: Shield, label: 'Privacy & Security', sublabel: 'Secure your data', action: () => {} },
    { icon: HelpCircle, label: 'Help & Support', sublabel: 'Get assistance', action: () => {} },
  ];

  const stats = [
    { label: 'Active Agents', value: activeAgents, icon: Zap },
    { label: 'Total Ideas', value: 156, icon: Sparkles },
    { label: 'Days Active', value: 12, icon: Check },
  ];

  const getBusinessLabel = (value: string) => {
    const labels: Record<string, string> = {
      saas: 'SaaS', ecommerce: 'E-commerce', agency: 'Agency',
      coach: 'Coach', creator: 'Creator', marketplace: 'Marketplace',
    };
    return labels[value] || value;
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />

      <main className="container max-w-4xl mx-auto px-6 pt-6">
        {/* Profile Hero */}
        <div className="relative mb-6 slide-up">
          <div className="glass-card p-6 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl gradient-accent flex items-center justify-center shadow-lg">
                    <User className="w-10 h-10 text-accent-foreground" />
                  </div>
                  {hasProAccess && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-display font-bold text-2xl text-foreground">
                      {user?.displayName || 'User'}
                    </h2>
                    {hasProAccess && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 text-xs font-bold uppercase tracking-wider">
                        Pro
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-3">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user?.email}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      {getBusinessLabel(data.businessType)}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">
                      {data.primaryGoal}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6 slide-up stagger-1">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card p-4 text-center">
              <stat.icon className="w-5 h-5 text-accent mx-auto mb-2" />
              <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Upgrade Banner (if not pro) */}
        {!hasProAccess && (
          <div className="slide-up stagger-2 mb-6">
            <button
              onClick={() => navigate('/payment')}
              className="w-full p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl" />
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center shadow-lg">
                    <Crown className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div className="text-left">
                    <p className="font-display font-bold text-lg text-primary-foreground">Upgrade to Pro</p>
                    <p className="text-sm text-primary-foreground/70">Unlock all AI agents from ₹199</p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-primary-foreground/70 group-hover:translate-x-1 group-hover:text-accent transition-all duration-300" />
              </div>
            </button>
          </div>
        )}

        {/* Menu Items */}
        <div className="glass-card overflow-hidden slide-up stagger-3">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={item.action}
              className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors border-b border-border last:border-0 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                  <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
                <div className="text-left">
                  <span className="font-medium text-foreground block">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.sublabel}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-bold">
                    {item.badge}
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-3 mt-6 slide-up stagger-4">
          <button className="glass-card p-4 text-left hover:bg-muted/50 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Terms of Service</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
            <p className="text-xs text-muted-foreground">Read our terms</p>
          </button>
          <button className="glass-card p-4 text-left hover:bg-muted/50 transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Privacy Policy</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
            <p className="text-xs text-muted-foreground">How we protect you</p>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 glass-card p-4 flex items-center justify-center gap-3 text-destructive hover:bg-destructive/5 transition-colors slide-up stagger-5 group"
        >
          <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span className="font-semibold">Sign Out</span>
        </button>

        {/* App Info */}
        <div className="text-center mt-8 mb-4 slide-up stagger-6">
          <p className="text-sm font-medium text-muted-foreground">TACTIX</p>
          <p className="text-xs text-muted-foreground mt-1">
            Version 1.0.0 • AI-Powered Marketing
          </p>
        </div>
      </main>

      <FloatingNavBar />
    </div>
  );
};

export default ProfilePage;

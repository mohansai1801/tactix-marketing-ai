import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, FileText, Sparkles, ChevronRight, Zap, ArrowUpRight, Activity, Target, Rocket } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useAgents } from '../contexts/AgentContext';
import FloatingNavBar from '../components/FloatingNavBar';
import AppHeader from '../components/AppHeader';
import AgentCard from '../components/AgentCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { data, isComplete } = useOnboarding();
  const { agents } = useAgents();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isComplete) {
      navigate('/onboarding');
    }
  }, [isAuthenticated, isComplete, navigate]);

  const getBusinessLabel = (value: string) => {
    const labels: Record<string, string> = {
      saas: 'SaaS',
      ecommerce: 'E-commerce',
      agency: 'Agency',
      coach: 'Coach',
      creator: 'Creator',
      marketplace: 'Marketplace',
    };
    return labels[value] || value;
  };

  const getGoalLabel = (value: string) => {
    const labels: Record<string, string> = {
      awareness: 'brand awareness',
      leads: 'lead generation',
      sales: 'sales conversions',
      community: 'community growth',
    };
    return labels[value] || value;
  };

  const quickStats = [
    { label: 'Active Campaigns', value: '3', icon: Activity, trend: '+2 this week' },
    { label: 'Leads Generated', value: '47', icon: Target, trend: '+12% growth' },
    { label: 'AI Actions', value: '156', icon: Zap, trend: 'Automated' },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />

      {/* Hero Welcome Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative px-6 pt-8 pb-8">
          <div className="container max-w-4xl mx-auto">
            <div className="slide-up">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Live Dashboard
                </span>
              </div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
                Welcome back, <span className="text-primary-foreground font-extrabold">{user?.displayName?.split(' ')[0] || 'Marketer'}</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl">
                Your <span className="text-foreground font-medium">{getBusinessLabel(data.businessType)}</span> strategy is optimized for{' '}
                <span className="text-accent font-semibold">{getGoalLabel(data.primaryGoal)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 -mt-2">
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-3 slide-up stagger-1">
            {quickStats.map((stat, idx) => (
              <div 
                key={idx}
                className="glass-card p-4 text-center hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-[10px] text-accent mt-1">{stat.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-6 mt-8">
        {/* Primary Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard?tab=insights')}
            className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(135deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-7 h-7 text-primary-foreground" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-primary-foreground/60 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
              <h3 className="font-display font-bold text-xl text-primary-foreground mb-2">
                Market Analysis
              </h3>
              <p className="text-sm text-primary-foreground/70">
                AI insights on trends, competitors & opportunities
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate('/dashboard?tab=content')}
            className="group glass-card p-6 text-left hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors duration-500" />
            
            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center group-hover:bg-accent/10 transition-colors duration-300">
                  <FileText className="w-7 h-7 text-muted-foreground group-hover:text-accent transition-colors duration-300" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                Strategy Report
              </h3>
              <p className="text-sm text-muted-foreground">
                Personalized marketing plan based on your profile
              </p>
            </div>
          </button>
        </div>

        {/* Generate Ideas CTA */}
        <div className="relative mb-10 slide-up stagger-2">
          <div className="glass-card p-6 relative overflow-hidden border-accent/20 hover:border-accent/40 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
            
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center shadow-lg animate-pulse-glow">
                  <Sparkles className="w-8 h-8 text-accent-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-xl text-foreground">
                      AI Idea Generator
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider">
                      New
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    Get fresh marketing ideas tailored to your business
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/generate')}
                className="btn-accent px-6 py-3.5 rounded-xl flex items-center gap-2 whitespace-nowrap"
              >
                <Rocket className="w-5 h-5" />
                Generate Ideas
              </button>
            </div>
          </div>
        </div>

        {/* Agents Marketplace */}
        <section className="slide-up stagger-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-display font-bold text-2xl text-foreground">
                  AI Agents
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-semibold">
                  {agents.length} available
                </span>
              </div>
              <p className="text-muted-foreground">
                Activate agents to supercharge your marketing
              </p>
            </div>
            <button className="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View all
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {agents.map((agent, idx) => (
              <div 
                key={agent.id} 
                className="fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <AgentCard agent={agent} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <FloatingNavBar />
    </div>
  );
};

export default HomePage;

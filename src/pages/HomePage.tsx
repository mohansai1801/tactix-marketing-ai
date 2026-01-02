import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, FileText, Sparkles, ChevronRight, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useAgents } from '../contexts/AgentContext';
import FloatingNavBar from '../components/FloatingNavBar';
import AgentCard from '../components/AgentCard';
import tactixLogo from '../assets/tactix-logo.png';

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

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <header className="gradient-navy px-6 pt-8 pb-16">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8 page-transition">
            <div className="flex items-center gap-3">
              <img src={tactixLogo} alt="TACTIX" className="w-10 h-10" />
              <span className="font-display font-bold text-xl text-primary-foreground">TACTIX</span>
            </div>
          </div>

          {/* Welcome Section */}
          <div className="slide-up">
            <p className="text-accent text-sm font-medium mb-2">Welcome back,</p>
            <h1 className="font-display font-bold text-3xl text-primary-foreground mb-4">
              {user?.displayName || 'Marketer'} 👋
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              Your {getBusinessLabel(data.businessType)} business is set up for{' '}
              <span className="text-accent font-medium">{getGoalLabel(data.primaryGoal)}</span>.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-6 -mt-8">
        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          <button
            onClick={() => navigate('/dashboard?tab=insights')}
            className="glass-card p-6 text-left group hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
              Generate Market Analysis
            </h3>
            <p className="text-sm text-muted-foreground">
              AI-powered insights on trends, competitors, and opportunities
            </p>
          </button>

          <button
            onClick={() => navigate('/dashboard?tab=content')}
            className="glass-card p-6 text-left group hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-xl gradient-navy flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">
              View Strategy Report
            </h3>
            <p className="text-sm text-muted-foreground">
              Your personalized marketing strategy based on your profile
            </p>
          </button>
        </div>

        {/* Generate Ideas CTA */}
        <div className="glass-card p-6 mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-foreground">
                  Need fresh ideas?
                </h3>
                <p className="text-sm text-muted-foreground">
                  AI will generate marketing suggestions tailored to your business
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/generate')}
              className="btn-accent px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Generate
            </button>
          </div>
        </div>

        {/* Agents Marketplace */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-2xl text-foreground">
                AI Agents Marketplace
              </h2>
              <p className="text-muted-foreground mt-1">
                Activate agents to supercharge your marketing
              </p>
            </div>
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

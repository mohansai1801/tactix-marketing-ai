import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, ArrowLeft, Zap, Brain, MessageSquare, BarChart3, Share2 } from 'lucide-react';
import { useAgents } from '../contexts/AgentContext';
import { useToast } from '../hooks/use-toast';
import tactixLogo from '../assets/tactix-logo.png';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const { grantProAccess, hasProAccess } = useAgents();
  const { toast } = useToast();

  React.useEffect(() => {
    if (hasProAccess) {
      navigate('/home');
    }
  }, [hasProAccess, navigate]);

  const handleGrantAccess = () => {
    grantProAccess();
    toast({
      title: "Add-ons Unlocked!",
      description: "All AI agents are now available. Enjoy your demo!",
    });
    navigate('/home');
  };

  const addons = [
    { 
      name: 'Content Generation Agent', 
      price: '₹199', 
      icon: MessageSquare,
      features: ['AI-powered content creation', 'Multi-platform templates', 'Brand voice consistency']
    },
    { 
      name: 'Lead Generation Agent', 
      price: '₹299', 
      icon: Zap,
      features: ['Smart lead scoring', 'Email outreach automation', 'CRM integration ready']
    },
    { 
      name: 'Social Media Agent', 
      price: '₹249', 
      icon: Share2,
      features: ['Auto-scheduling', 'Cross-platform posting', 'Engagement optimization']
    },
    { 
      name: 'Analytics Agent', 
      price: '₹349', 
      icon: BarChart3,
      features: ['Performance tracking', 'ROI predictions', 'Custom reports']
    },
  ];

  return (
    <div className="min-h-screen gradient-navy">
      <div className="container max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 page-transition">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-3">
            <img src={tactixLogo} alt="TACTIX" className="w-10 h-10" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl text-primary-foreground">TACTIX</span>
              <span className="text-[10px] text-accent font-medium tracking-widest uppercase">
                Insights for Growth
              </span>
            </div>
          </div>
          <div className="w-20" />
        </div>

        {/* Title */}
        <div className="text-center mb-12 slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <Brain className="w-4 h-4" />
            Pay Per Add-on
          </div>
          <h1 className="font-display font-bold text-4xl text-primary-foreground mb-4">
            Unlock AI Agents
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-md mx-auto">
            Choose the agents you need. Starting from just ₹199 per agent.
          </p>
        </div>

        {/* Free Agent Card */}
        <div className="glass-card-dark p-6 mb-6 slide-up stagger-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-primary-foreground">
                  Market Intelligence Agent
                </h3>
                <p className="text-sm text-primary-foreground/60">Always included free</p>
              </div>
            </div>
            <span className="text-accent font-display font-bold text-xl">FREE</span>
          </div>
        </div>

        {/* Add-on Cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {addons.map((addon, idx) => (
            <div 
              key={addon.name}
              className="glass-card-dark p-6 relative overflow-hidden slide-up"
              style={{ animationDelay: `${(idx + 2) * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <addon.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-primary-foreground">
                      {addon.name}
                    </h3>
                  </div>
                  <span className="font-display font-bold text-xl text-accent">{addon.price}</span>
                </div>
                <ul className="space-y-2">
                  {addon.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center slide-up stagger-4">
          <button 
            onClick={handleGrantAccess}
            className="btn-accent px-10 py-4 rounded-xl inline-flex items-center gap-3 text-lg font-medium"
          >
            <Sparkles className="w-6 h-6" />
            Unlock All Add-ons (Demo)
          </button>
          <p className="text-primary-foreground/40 text-sm mt-4">
            Demo mode — no real payment required
          </p>
        </div>

        {/* Trust badges */}
        <div className="text-center text-primary-foreground/40 text-sm mt-10 slide-up stagger-5">
          <p>🔒 Secure payments • 💳 Cancel anytime • 🤝 30-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

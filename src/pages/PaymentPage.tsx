import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Crown, Zap, ArrowLeft } from 'lucide-react';
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
      title: "🎉 Pro Access Granted!",
      description: "All AI agents are now unlocked. Enjoy your demo!",
    });
    navigate('/home');
  };

  const freePlan = [
    'Market Intelligence Agent',
    'Basic analytics',
    'Community support',
    '100 AI credits/month',
  ];

  const proPlan = [
    'All 5 AI Agents unlocked',
    'Content Generation Agent',
    'Lead Generation Agent',
    'Social Media Automation',
    'Analytics & Optimization',
    'Priority support',
    'Unlimited AI credits',
    'Custom integrations',
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
            <span className="font-display font-bold text-xl text-primary-foreground">TACTIX</span>
          </div>
          <div className="w-20" />
        </div>

        {/* Title */}
        <div className="text-center mb-12 slide-up">
          <h1 className="font-display font-bold text-4xl text-primary-foreground mb-4">
            Unlock All AI Agents
          </h1>
          <p className="text-primary-foreground/60 text-lg max-w-md mx-auto">
            Upgrade to Pro and let AI handle your entire marketing stack
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Free Plan */}
          <div className="glass-card-dark p-8 slide-up stagger-1">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6 text-primary-foreground/60" />
              <h3 className="font-display font-semibold text-xl text-primary-foreground">Free</h3>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-display font-bold text-primary-foreground">₹0</span>
              <span className="text-primary-foreground/60">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {freePlan.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-primary-foreground/80">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 rounded-xl border border-primary-foreground/30 text-primary-foreground/70 font-medium">
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="glass-card-dark p-8 relative overflow-hidden slide-up stagger-2">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-6 h-6 text-accent" />
                <h3 className="font-display font-semibold text-xl text-primary-foreground">Pro</h3>
                <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                  Popular
                </span>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-primary-foreground">₹2,999</span>
                <span className="text-primary-foreground/60">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {proPlan.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-primary-foreground/80">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleGrantAccess}
                className="w-full btn-accent py-4 rounded-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Grant Demo Access
              </button>
              <p className="text-center text-primary-foreground/40 text-sm mt-4">
                Demo mode — no real payment required
              </p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="text-center text-primary-foreground/40 text-sm slide-up stagger-3">
          <p>🔒 Secure payments • 💳 Cancel anytime • 🤝 30-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

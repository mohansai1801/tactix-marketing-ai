import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useAuth } from '../contexts/AuthContext';
import StepperProgress from '../components/StepperProgress';
import OptionButton from '../components/OptionButton';
import tactixLogo from '../assets/tactix-logo.png';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { 
    data, 
    currentStage, 
    updateData, 
    nextStage, 
    prevStage, 
    completeOnboarding 
  } = useOnboarding();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleNext = () => {
    if (currentStage === 5) {
      completeOnboarding();
      navigate('/home');
    } else {
      nextStage();
    }
  };

  const renderStage = () => {
    switch (currentStage) {
      case 1:
        return <Stage1 data={data} updateData={updateData} />;
      case 2:
        return <Stage2 data={data} updateData={updateData} />;
      case 3:
        return <Stage3 data={data} updateData={updateData} />;
      case 4:
        return <Stage4 data={data} updateData={updateData} />;
      case 5:
        return <Stage5 data={data} updateData={updateData} />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStage) {
      case 1:
        return data.businessType && data.problemSolved && data.primaryGoal;
      case 2:
        return data.idealCustomer && data.activeChannel && data.customerStage;
      case 3:
        return data.brandVoice && data.contentPreference;
      case 4:
        return data.differentiator && data.mainOffer;
      case 5:
        return data.marketingExperience && data.monthlyBudget && data.weeklyTime;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen gradient-navy">
      <div className="container max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 page-transition">
          <img src={tactixLogo} alt="TACTIX" className="w-10 h-10 mr-3" />
          <span className="font-display font-bold text-xl text-primary-foreground">TACTIX</span>
        </div>

        {/* Stepper */}
        <div className="mb-10">
          <StepperProgress currentStep={currentStage} totalSteps={5} />
        </div>

        {/* Content */}
        <div className="glass-card-dark p-8 slide-up min-h-[400px]">
          {renderStage()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={prevStage}
            disabled={currentStage === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              currentStage === 1 
                ? 'opacity-0 cursor-default' 
                : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-secondary/30'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="btn-accent px-8 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStage === 5 ? 'Complete Setup' : 'Continue'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Stage Components
interface StageProps {
  data: any;
  updateData: (field: any, value: string) => void;
}

const Stage1: React.FC<StageProps> = ({ data, updateData }) => {
  const businessTypes = [
    { value: 'saas', label: 'SaaS', icon: '💻' },
    { value: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { value: 'agency', label: 'Agency', icon: '🏢' },
    { value: 'coach', label: 'Coach', icon: '🎯' },
    { value: 'creator', label: 'Creator', icon: '✨' },
    { value: 'marketplace', label: 'Marketplace', icon: '🏪' },
  ];

  const goals = [
    { value: 'awareness', label: 'Brand awareness', icon: '📢' },
    { value: 'leads', label: 'Lead generation', icon: '🎯' },
    { value: 'sales', label: 'Sales conversions', icon: '💰' },
    { value: 'community', label: 'Community growth', icon: '👥' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display font-bold text-2xl text-primary-foreground mb-2">
          Business Identity
        </h2>
        <p className="text-primary-foreground/60">Tell us about your business</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          What best describes your business?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {businessTypes.map((type) => (
            <OptionButton
              key={type.value}
              selected={data.businessType === type.value}
              onClick={() => updateData('businessType', type.value)}
              icon={type.icon}
            >
              {type.label}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          What problem do you solve in one sentence?
        </label>
        <textarea
          value={data.problemSolved}
          onChange={(e) => updateData('problemSolved', e.target.value)}
          className="w-full bg-secondary/30 border border-secondary/50 rounded-xl px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          placeholder="e.g., We help small businesses automate their marketing..."
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          What is your primary goal right now?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {goals.map((goal) => (
            <OptionButton
              key={goal.value}
              selected={data.primaryGoal === goal.value}
              onClick={() => updateData('primaryGoal', goal.value)}
              icon={goal.icon}
            >
              {goal.label}
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stage2: React.FC<StageProps> = ({ data, updateData }) => {
  const customers = [
    { value: 'founders', label: 'Founders', icon: '🚀' },
    { value: 'students', label: 'Students', icon: '📚' },
    { value: 'smes', label: 'SMEs', icon: '🏢' },
    { value: 'enterprises', label: 'Enterprises', icon: '🏛️' },
    { value: 'creators', label: 'Creators', icon: '🎨' },
    { value: 'consumers', label: 'Consumers', icon: '👤' },
  ];

  const channels = [
    { value: 'instagram', label: 'Instagram', icon: '📸' },
    { value: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { value: 'twitter', label: 'Twitter/X', icon: '🐦' },
    { value: 'email', label: 'Email', icon: '📧' },
  ];

  const stages = [
    { value: 'discovering', label: 'Just discovering', icon: '🔍' },
    { value: 'comparing', label: 'Comparing solutions', icon: '⚖️' },
    { value: 'ready', label: 'Ready to buy', icon: '✅' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display font-bold text-2xl text-primary-foreground mb-2">
          Target Audience
        </h2>
        <p className="text-primary-foreground/60">Who are you trying to reach?</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          Who is your ideal customer?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {customers.map((item) => (
            <OptionButton
              key={item.value}
              selected={data.idealCustomer === item.value}
              onClick={() => updateData('idealCustomer', item.value)}
              icon={item.icon}
            >
              {item.label}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          Where are they most active online?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {channels.map((item) => (
            <OptionButton
              key={item.value}
              selected={data.activeChannel === item.value}
              onClick={() => updateData('activeChannel', item.value)}
              icon={item.icon}
            >
              {item.label}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          What stage are they in?
        </label>
        <div className="grid grid-cols-1 gap-3">
          {stages.map((item) => (
            <OptionButton
              key={item.value}
              selected={data.customerStage === item.value}
              onClick={() => updateData('customerStage', item.value)}
              icon={item.icon}
            >
              {item.label}
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stage3: React.FC<StageProps> = ({ data, updateData }) => {
  const voices = [
    { value: 'professional', label: 'Professional', icon: '👔' },
    { value: 'friendly', label: 'Friendly', icon: '😊' },
    { value: 'bold', label: 'Bold', icon: '💪' },
    { value: 'minimal', label: 'Minimal', icon: '✨' },
    { value: 'educational', label: 'Educational', icon: '📖' },
  ];

  const contentPrefs = [
    { value: 'short-viral', label: 'Short & viral', icon: '🔥' },
    { value: 'deep-informative', label: 'Deep & informative', icon: '📊' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display font-bold text-2xl text-primary-foreground mb-2">
          Brand Voice
        </h2>
        <p className="text-primary-foreground/60">How should your brand communicate?</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          How should your brand sound?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {voices.map((item) => (
            <OptionButton
              key={item.value}
              selected={data.brandVoice === item.value}
              onClick={() => updateData('brandVoice', item.value)}
              icon={item.icon}
            >
              {item.label}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          Content preference?
        </label>
        <div className="grid grid-cols-1 gap-3">
          {contentPrefs.map((item) => (
            <OptionButton
              key={item.value}
              selected={data.contentPreference === item.value}
              onClick={() => updateData('contentPreference', item.value)}
              icon={item.icon}
            >
              {item.label}
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stage4: React.FC<StageProps> = ({ data, updateData }) => {
  const differentiators = [
    { value: 'price', label: 'Price', icon: '💵' },
    { value: 'speed', label: 'Speed', icon: '⚡' },
    { value: 'quality', label: 'Quality', icon: '⭐' },
    { value: 'technology', label: 'Technology', icon: '🔧' },
    { value: 'support', label: 'Support', icon: '🤝' },
  ];

  const offers = [
    { value: 'free-trial', label: 'Free trial', icon: '🎁' },
    { value: 'demo', label: 'Demo', icon: '🖥️' },
    { value: 'consultation', label: 'Consultation', icon: '📞' },
    { value: 'product', label: 'Product purchase', icon: '🛍️' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display font-bold text-2xl text-primary-foreground mb-2">
          Differentiation
        </h2>
        <p className="text-primary-foreground/60">What makes you stand out?</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          What makes you different from competitors?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {differentiators.map((item) => (
            <OptionButton
              key={item.value}
              selected={data.differentiator === item.value}
              onClick={() => updateData('differentiator', item.value)}
              icon={item.icon}
            >
              {item.label}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          What is your main offer?
        </label>
        <div className="grid grid-cols-2 gap-3">
          {offers.map((item) => (
            <OptionButton
              key={item.value}
              selected={data.mainOffer === item.value}
              onClick={() => updateData('mainOffer', item.value)}
              icon={item.icon}
            >
              {item.label}
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stage5: React.FC<StageProps> = ({ data, updateData }) => {
  const experiences = [
    { value: 'no', label: 'No marketing experience', icon: '🆕' },
    { value: 'organic', label: 'Yes (organic)', icon: '🌱' },
    { value: 'ads', label: 'Yes (with ads)', icon: '📺' },
  ];

  const budgets = [
    { value: '0', label: '₹0 (Bootstrap)', icon: '💪' },
    { value: '1k-5k', label: '₹1k – ₹5k', icon: '💰' },
    { value: '5k+', label: '₹5k+', icon: '💎' },
  ];

  const times = [
    { value: 'minimal', label: '< 1 hour/week', icon: '⏰' },
    { value: 'moderate', label: '1–3 hours/week', icon: '📅' },
    { value: 'automated', label: 'Fully automated', icon: '🤖' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display font-bold text-2xl text-primary-foreground mb-2">
          Resources & Reality
        </h2>
        <p className="text-primary-foreground/60">Let's understand your constraints</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          Have you done any marketing before?
        </label>
        <div className="grid grid-cols-1 gap-3">
          {experiences.map((item) => (
            <OptionButton
              key={item.value}
              selected={data.marketingExperience === item.value}
              onClick={() => updateData('marketingExperience', item.value)}
              icon={item.icon}
            >
              {item.label}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          Monthly marketing budget?
        </label>
        <div className="grid grid-cols-1 gap-3">
          {budgets.map((item) => (
            <OptionButton
              key={item.value}
              selected={data.monthlyBudget === item.value}
              onClick={() => updateData('monthlyBudget', item.value)}
              icon={item.icon}
            >
              {item.label}
            </OptionButton>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-foreground/80 mb-3">
          Time available per week?
        </label>
        <div className="grid grid-cols-1 gap-3">
          {times.map((item) => (
            <OptionButton
              key={item.value}
              selected={data.weeklyTime === item.value}
              onClick={() => updateData('weeklyTime', item.value)}
              icon={item.icon}
            >
              {item.label}
            </OptionButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;

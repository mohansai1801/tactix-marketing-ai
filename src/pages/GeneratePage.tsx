import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Check, 
  Lightbulb,
  Instagram,
  Linkedin,
  Mail,
  MessageSquare,
  Wand2,
  Rocket,
  ArrowRight,
  Zap,
  Star,
  TrendingUp,
  Brain
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useToast } from '../hooks/use-toast';
import FloatingNavBar from '../components/FloatingNavBar';
import AppHeader from '../components/AppHeader';

const GeneratePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isComplete, data } = useOnboarding();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isComplete) {
      navigate('/onboarding');
    }
  }, [isAuthenticated, isComplete, navigate]);

  const categories = [
    { id: 'all', label: 'All Ideas', icon: Sparkles },
    { id: 'social', label: 'Social', icon: Instagram },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'content', label: 'Content', icon: MessageSquare },
  ];

  const generateIdeas = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2500));

    const generatedIdeas = [
      {
        id: '1',
        type: 'social',
        icon: Instagram,
        gradient: 'from-pink-500 to-rose-500',
        bgGlow: 'bg-pink-500/20',
        title: 'Instagram Carousel',
        content: `Create a carousel post: "5 ${data.primaryGoal === 'leads' ? 'Lead Gen' : 'Growth'} Hacks for ${data.businessType === 'saas' ? 'SaaS' : data.businessType} Founders" with actionable tips and bold visuals.`,
        hook: 'Start with: "Most marketers waste 80% of their budget on..."',
        engagement: '12.4K avg reach',
        difficulty: 'Easy',
      },
      {
        id: '2',
        type: 'social',
        icon: Linkedin,
        gradient: 'from-blue-500 to-cyan-500',
        bgGlow: 'bg-blue-500/20',
        title: 'LinkedIn Thought Leadership',
        content: `Write a personal story about your journey solving ${data.problemSolved || 'your customers\' biggest problem'}. End with 3 lessons learned.`,
        hook: 'Start with: "3 years ago, I made a mistake that cost me..."',
        engagement: '8.2K avg impressions',
        difficulty: 'Medium',
      },
      {
        id: '3',
        type: 'email',
        icon: Mail,
        gradient: 'from-accent to-amber-400',
        bgGlow: 'bg-accent/20',
        title: 'Email Outreach Campaign',
        content: `Cold email targeting ${data.idealCustomer || 'your ideal customers'}: Focus on their pain point, offer a quick win, and include a soft CTA for a 15-min call.`,
        hook: 'Subject: "Quick question about your marketing..."',
        engagement: '34% open rate',
        difficulty: 'Easy',
      },
      {
        id: '4',
        type: 'content',
        icon: MessageSquare,
        gradient: 'from-emerald-500 to-teal-500',
        bgGlow: 'bg-emerald-500/20',
        title: 'Content Pillar Strategy',
        content: `Create a content series around "${data.differentiator === 'technology' ? 'Tech Innovation' : data.differentiator === 'speed' ? 'Speed to Value' : 'Your Unique Edge'}" with 4 posts: Problem, Solution, Case Study, How-To.`,
        hook: 'Start with the problem post to hook your audience',
        engagement: '3.1K avg shares',
        difficulty: 'Advanced',
      },
    ];

    setIdeas(generatedIdeas);
    setIsGenerating(false);
    
    toast({
      title: "Ideas generated!",
      description: "4 fresh marketing ideas ready for you.",
    });
  };

  const copyToClipboard = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied!",
      description: "Idea copied to clipboard.",
    });
  };

  const filteredIdeas = selectedCategory === 'all' 
    ? ideas 
    : ideas.filter(idea => idea.type === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-emerald-400 bg-emerald-500/10';
      case 'Medium': return 'text-amber-400 bg-amber-500/10';
      case 'Advanced': return 'text-rose-400 bg-rose-500/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />

      {/* Hero Section with Navy Gradient */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative px-6 pt-10 pb-20">
          <div className="container max-w-4xl mx-auto">
            <div className="slide-up text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-6">
                <Brain className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/90 text-sm font-medium">AI-Powered Marketing Ideas</span>
              </div>
              
              <h1 className="font-display font-bold text-4xl md:text-5xl text-primary-foreground mb-4 leading-tight">
                Generate <span className="text-accent">Brilliant</span> Ideas
              </h1>
              <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8">
                Let AI analyze your business profile and create personalized marketing strategies that drive real results.
              </p>

              {/* Stats Row */}
              <div className="flex items-center justify-center gap-8 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-accent">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-bold text-xl">2.4x</span>
                  </div>
                  <p className="text-primary-foreground/50 text-xs">Better Engagement</p>
                </div>
                <div className="w-px h-8 bg-primary-foreground/20" />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-accent">
                    <Star className="w-4 h-4" />
                    <span className="font-bold text-xl">15K+</span>
                  </div>
                  <p className="text-primary-foreground/50 text-xs">Ideas Generated</p>
                </div>
                <div className="w-px h-8 bg-primary-foreground/20" />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-accent">
                    <Zap className="w-4 h-4" />
                    <span className="font-bold text-xl">3sec</span>
                  </div>
                  <p className="text-primary-foreground/50 text-xs">Generation Time</p>
                </div>
              </div>

              {/* Main Generate Button */}
              <button
                onClick={generateIdeas}
                disabled={isGenerating}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 disabled:opacity-70 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(45 92% 55%) 100%)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-6 h-6 animate-spin text-primary" />
                    <span className="text-primary">Generating Magic...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-primary">Generate Ideas</span>
                    <Rocket className="w-5 h-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </>
                )}
              </button>
              
              <p className="text-primary-foreground/50 text-sm mt-4">
                Tailored for your <span className="text-accent">{data.businessType || 'business'}</span> targeting <span className="text-accent">{data.idealCustomer || 'your audience'}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container max-w-4xl mx-auto px-6 -mt-8">
        {/* Category Filter */}
        {ideas.length > 0 && (
          <div className="glass-card p-2 mb-6 slide-up">
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? 'gradient-accent text-primary shadow-lg'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ideas Grid */}
        {filteredIdeas.length > 0 && (
          <div className="grid gap-4">
            {filteredIdeas.map((idea, idx) => (
              <div 
                key={idea.id} 
                className="group glass-card p-0 overflow-hidden fade-in hover:scale-[1.01] transition-all duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Gradient Top Bar */}
                <div className={`h-1 bg-gradient-to-r ${idea.gradient}`} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${idea.gradient} flex items-center justify-center shadow-lg`}>
                        <idea.icon className="w-7 h-7 text-white" />
                        <div className={`absolute inset-0 ${idea.bgGlow} rounded-2xl blur-xl opacity-50`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-bold text-lg text-foreground">
                            {idea.title}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor(idea.difficulty)}`}>
                            {idea.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-accent" />
                            {idea.engagement}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(idea.id, `${idea.content}\n\n${idea.hook}`)}
                      className="p-3 rounded-xl bg-muted/50 hover:bg-accent hover:text-primary transition-all duration-300"
                    >
                      {copiedId === idea.id ? (
                        <Check className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <p className="text-foreground/80 leading-relaxed mb-4">{idea.content}</p>

                  <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-accent/5 to-transparent rounded-xl border border-accent/10">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-accent mb-1">Pro Tip</p>
                      <p className="text-sm text-muted-foreground">{idea.hook}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="mt-4 w-full py-3 rounded-xl bg-muted/30 hover:bg-accent hover:text-primary font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <span>Use This Idea</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {ideas.length === 0 && !isGenerating && (
          <div className="text-center py-20 slide-up">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border">
                <Sparkles className="w-16 h-16 text-muted-foreground" />
              </div>
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-3">
              Ready to Get Inspired?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
              Click the button above to unlock AI-powered marketing ideas crafted specifically for your business goals.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Platform-specific</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>Data-driven</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Personalized</span>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isGenerating && ideas.length === 0 && (
          <div className="text-center py-20 slide-up">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-full h-full rounded-full gradient-accent flex items-center justify-center animate-spin-slow">
                <Brain className="w-16 h-16 text-primary" />
              </div>
            </div>
            <h3 className="font-display font-bold text-2xl text-foreground mb-3">
              AI is Thinking...
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Analyzing your business profile and crafting personalized marketing strategies.
            </p>
          </div>
        )}
      </main>

      <FloatingNavBar />
    </div>
  );
};

export default GeneratePage;
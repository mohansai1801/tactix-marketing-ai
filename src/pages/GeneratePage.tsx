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
  MessageSquare
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

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isComplete) {
      navigate('/onboarding');
    }
  }, [isAuthenticated, isComplete, navigate]);

  const generateIdeas = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const generatedIdeas = [
      {
        id: '1',
        type: 'instagram',
        icon: Instagram,
        color: 'text-pink-500',
        bgColor: 'bg-pink-500/10',
        title: 'Instagram Carousel',
        content: `Create a carousel post: "5 ${data.primaryGoal === 'leads' ? 'Lead Gen' : 'Growth'} Hacks for ${data.businessType === 'saas' ? 'SaaS' : data.businessType} Founders" with actionable tips and bold visuals.`,
        hook: 'Start with: "Most marketers waste 80% of their budget on..."',
      },
      {
        id: '2',
        type: 'linkedin',
        icon: Linkedin,
        color: 'text-blue-600',
        bgColor: 'bg-blue-600/10',
        title: 'LinkedIn Thought Leadership',
        content: `Write a personal story about your journey solving ${data.problemSolved || 'your customers\' biggest problem'}. End with 3 lessons learned.`,
        hook: 'Start with: "3 years ago, I made a mistake that cost me..."',
      },
      {
        id: '3',
        type: 'email',
        icon: Mail,
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        title: 'Email Outreach Campaign',
        content: `Cold email targeting ${data.idealCustomer || 'your ideal customers'}: Focus on their pain point, offer a quick win, and include a soft CTA for a 15-min call.`,
        hook: 'Subject: "Quick question about your marketing..."',
      },
      {
        id: '4',
        type: 'content',
        icon: MessageSquare,
        color: 'text-green-500',
        bgColor: 'bg-green-500/10',
        title: 'Content Pillar Strategy',
        content: `Create a content series around "${data.differentiator === 'technology' ? 'Tech Innovation' : data.differentiator === 'speed' ? 'Speed to Value' : 'Your Unique Edge'}" with 4 posts: Problem, Solution, Case Study, How-To.`,
        hook: 'Start with the problem post to hook your audience',
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

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />

      {/* Hero Section */}
      <div className="gradient-navy px-6 pb-16 -mt-1">
        <div className="container max-w-4xl mx-auto slide-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-primary-foreground">
                Fresh Marketing Ideas
              </h1>
              <p className="text-primary-foreground/60">
                AI-powered suggestions tailored to your business
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container max-w-4xl mx-auto px-6 -mt-8">
        {/* Generate Button */}
        <div className="glass-card p-6 mb-6 text-center slide-up">
          <button
            onClick={generateIdeas}
            disabled={isGenerating}
            className="btn-accent px-8 py-4 rounded-xl flex items-center justify-center gap-3 mx-auto disabled:opacity-70"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating Ideas...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate New Ideas
              </>
            )}
          </button>
          <p className="text-sm text-muted-foreground mt-3">
            Based on your {data.businessType || 'business'} profile targeting {data.idealCustomer || 'your audience'}
          </p>
        </div>

        {/* Ideas List */}
        {ideas.length > 0 && (
          <div className="space-y-4">
            {ideas.map((idea, idx) => (
              <div 
                key={idea.id} 
                className="glass-card p-6 fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${idea.bgColor} flex items-center justify-center`}>
                      <idea.icon className={`w-5 h-5 ${idea.color}`} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {idea.title}
                      </h3>
                      <span className="text-xs text-muted-foreground capitalize">
                        {idea.type} strategy
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(idea.id, `${idea.content}\n\n${idea.hook}`)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    {copiedId === idea.id ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
                </div>

                <p className="text-foreground/80 mb-4">{idea.content}</p>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-accent">💡 Tip:</span> {idea.hook}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {ideas.length === 0 && !isGenerating && (
          <div className="text-center py-16 slide-up">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground mb-2">
              Ready to get inspired?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Click the button above to generate AI-powered marketing ideas 
              tailored specifically for your business.
            </p>
          </div>
        )}
      </main>

      <FloatingNavBar />
    </div>
  );
};

export default GeneratePage;

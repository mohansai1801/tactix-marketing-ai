import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Check,
  ArrowLeft,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  FileText,
  Wand2,
  Hash,
  Lightbulb,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';
import FloatingNavBar from '../components/FloatingNavBar';
import AppHeader from '../components/AppHeader';

interface GeneratedPost {
  headline: string;
  content: string;
  hashtags: string[];
  callToAction: string;
  tips: string[];
  imageUrl?: string;
  imagePrompt?: string;
}

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'from-pink-500 to-purple-500' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'from-blue-600 to-blue-400' },
  { id: 'twitter', name: 'Twitter/X', icon: Twitter, color: 'from-gray-800 to-gray-600' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-400' },
  { id: 'email', name: 'Email', icon: Mail, color: 'from-accent to-amber-400' },
  { id: 'blog', name: 'Blog Post', icon: FileText, color: 'from-emerald-500 to-teal-500' },
];

const tones = [
  { id: 'professional', name: 'Professional', emoji: '💼' },
  { id: 'casual', name: 'Casual', emoji: '😊' },
  { id: 'witty', name: 'Witty', emoji: '😏' },
  { id: 'inspirational', name: 'Inspirational', emoji: '✨' },
  { id: 'educational', name: 'Educational', emoji: '📚' },
];

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaContent, setIdeaContent] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const generatePost = async () => {
    if (!ideaTitle.trim() || !ideaContent.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter both a title and content for your idea.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedPost(null);

    try {
      const { data, error } = await supabase.functions.invoke('create-post', {
        body: {
          ideaTitle,
          ideaContent,
          platform: selectedPlatform,
          tone: selectedTone,
        },
      });

      if (error) throw new Error(error.message);

      if (data?.post) {
        setGeneratedPost(data.post);
        toast({
          title: "Post created!",
          description: `Your ${selectedPlatform} post is ready.`,
        });
      }
    } catch (error) {
      console.error('Error generating post:', error);
      toast({
        title: "Generation failed",
        description: "Could not create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedPost) return;
    
    const fullContent = `${generatedPost.headline}\n\n${generatedPost.content}\n\n${generatedPost.hashtags.map(h => `#${h}`).join(' ')}`;
    navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Post copied to clipboard.",
    });
  };

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-navy" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-pulse" />
        
        <div className="relative px-6 pt-6 pb-12">
          <div className="container max-w-4xl mx-auto">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
            
            <div className="slide-up text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-4">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-primary-foreground/90 text-sm font-medium">AI Post Creator</span>
              </div>
              
              <h1 className="font-display font-bold text-3xl md:text-4xl text-primary-foreground mb-3">
                Create the <span className="text-accent">Perfect</span> Post
              </h1>
              <p className="text-primary-foreground/70 text-base max-w-xl mx-auto">
                Transform your marketing ideas into platform-optimized, ready-to-publish content.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container max-w-4xl mx-auto px-6 -mt-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="glass-card p-6 slide-up">
            <h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-accent" />
              Your Idea
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Idea Title</label>
                <input
                  type="text"
                  value={ideaTitle}
                  onChange={(e) => setIdeaTitle(e.target.value)}
                  placeholder="e.g., Instagram Growth Hack"
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Idea Content</label>
                <textarea
                  value={ideaContent}
                  onChange={(e) => setIdeaContent(e.target.value)}
                  placeholder="Describe your marketing idea or paste a generated idea here..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                />
              </div>

              {/* Platform Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Platform</label>
                <div className="grid grid-cols-3 gap-2">
                  {platforms.map((platform) => (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                        selectedPlatform === platform.id
                          ? 'border-accent bg-accent/10'
                          : 'border-border bg-muted/30 hover:bg-muted/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                        <platform.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-medium text-foreground">{platform.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Tone</label>
                <div className="flex flex-wrap gap-2">
                  {tones.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => setSelectedTone(tone.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                        selectedTone === tone.id
                          ? 'border-accent bg-accent/10 text-foreground'
                          : 'border-border bg-muted/30 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span>{tone.emoji}</span>
                      {tone.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generatePost}
                disabled={isGenerating || !ideaTitle.trim() || !ideaContent.trim()}
                className="w-full py-4 rounded-xl font-bold text-primary transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
                style={{ background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(45 92% 55%) 100%)' }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Creating Your Post...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Post
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="glass-card p-6 slide-up" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                {selectedPlatformData && (
                  <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${selectedPlatformData.color} flex items-center justify-center`}>
                    <selectedPlatformData.icon className="w-3 h-3 text-white" />
                  </div>
                )}
                Generated Post
              </h2>
              {generatedPost && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-accent hover:text-primary text-sm font-medium transition-all duration-300"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>

            {generatedPost ? (
              <div className="space-y-4">
                {/* Generated Image */}
                {generatedPost.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-border">
                    <img 
                      src={generatedPost.imageUrl} 
                      alt="Generated post image"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Headline */}
                {generatedPost.headline && (
                  <div className="p-4 bg-accent/5 rounded-xl border border-accent/10">
                    <p className="font-bold text-foreground">{generatedPost.headline}</p>
                  </div>
                )}

                {/* Content */}
                <div className="p-4 bg-muted/30 rounded-xl">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">{generatedPost.content}</p>
                </div>

                {/* Hashtags */}
                {generatedPost.hashtags && generatedPost.hashtags.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                      <Hash className="w-3 h-3" /> Hashtags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {generatedPost.hashtags.map((tag, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                {generatedPost.callToAction && (
                  <div className="flex items-center gap-2 p-3 bg-emerald-500/10 rounded-xl">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-foreground">
                      <strong>CTA:</strong> {generatedPost.callToAction}
                    </span>
                  </div>
                )}

                {/* Tips */}
                {generatedPost.tips && generatedPost.tips.length > 0 && (
                  <div className="p-4 bg-gradient-to-r from-accent/5 to-transparent rounded-xl border border-accent/10">
                    <p className="text-xs font-semibold text-accent mb-2 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" /> Pro Tips
                    </p>
                    <ul className="space-y-1">
                      {generatedPost.tips.map((tip, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  {isGenerating ? 'AI is creating your post...' : 'Your generated post will appear here'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <FloatingNavBar />
    </div>
  );
};

export default CreatePostPage;

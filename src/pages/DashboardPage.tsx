import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  TrendingUp, 
  FileText, 
  Users, 
  Zap,
  Instagram,
  Linkedin,
  Mail,
  Clock,
  CheckCircle,
  Send,
  BarChart3,
  Calendar,
  ArrowUpRight,
  Copy,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import FloatingNavBar from '../components/FloatingNavBar';
import AppHeader from '../components/AppHeader';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();
  const { isComplete } = useOnboarding();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'insights');

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isComplete) {
      navigate('/onboarding');
    }
  }, [isAuthenticated, isComplete, navigate]);

  const tabs = [
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'automation', label: 'Auto', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />

      {/* Enhanced Tabs */}
      <div className="bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="flex gap-1 py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {activeTab === tab.id && (
                  <div className="absolute inset-0 gradient-accent rounded-xl animate-scale-in" />
                )}
                <tab.icon className={`relative w-4 h-4 ${activeTab === tab.id ? 'text-accent-foreground' : ''}`} />
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container max-w-4xl mx-auto px-6 py-6">
        {activeTab === 'insights' && <InsightsTab />}
        {activeTab === 'content' && <ContentTab />}
        {activeTab === 'leads' && <LeadsTab />}
        {activeTab === 'automation' && <AutomationTab />}
      </main>

      <FloatingNavBar />
    </div>
  );
};

// Insights Tab
const InsightsTab: React.FC = () => {
  const trends = [
    { keyword: 'AI Marketing', growth: '+156%', volume: '2.4M', hot: true },
    { keyword: 'Marketing Automation', growth: '+89%', volume: '1.8M', hot: true },
    { keyword: 'Content Strategy', growth: '+67%', volume: '980K', hot: false },
    { keyword: 'Lead Generation', growth: '+45%', volume: '1.2M', hot: false },
  ];

  const competitorGaps = [
    { gap: 'Video content on Instagram Reels', difficulty: 'Easy', impact: 'High' },
    { gap: 'LinkedIn thought leadership posts', difficulty: 'Medium', impact: 'High' },
    { gap: 'Email nurture sequences', difficulty: 'Medium', impact: 'Medium' },
    { gap: 'Interactive webinars', difficulty: 'Hard', impact: 'High' },
  ];

  const platforms = [
    { name: 'LinkedIn', score: 92, reason: 'Best for B2B reach', icon: Linkedin, color: 'text-blue-600' },
    { name: 'Instagram', score: 78, reason: 'Visual engagement', icon: Instagram, color: 'text-pink-500' },
    { name: 'Email', score: 85, reason: 'High conversion rate', icon: Mail, color: 'text-accent' },
  ];

  const bestTimes = [
    { day: 'Tuesday', time: '10:00 AM', engagement: 'Highest', percent: '28%' },
    { day: 'Thursday', time: '2:00 PM', engagement: 'High', percent: '24%' },
    { day: 'Wednesday', time: '11:00 AM', engagement: 'High', percent: '21%' },
  ];

  return (
    <div className="space-y-6 slide-up">
      {/* Simulated Badge */}
      <div className="bg-accent/5 border border-accent/20 rounded-2xl px-5 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Google Trends Analysis</p>
          <p className="text-xs text-muted-foreground">Simulated demo data • Updated 2h ago</p>
        </div>
      </div>

      {/* Trending Keywords */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Trending Keywords
          </h3>
          <span className="text-xs text-muted-foreground">Last 30 days</span>
        </div>
        <div className="space-y-3">
          {trends.map((trend, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 rounded-xl transition-colors duration-300 group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                {trend.hot && (
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                )}
                <span className="font-medium text-foreground group-hover:text-accent transition-colors">{trend.keyword}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm text-muted-foreground">{trend.volume}</span>
                <span className="text-sm font-semibold text-green-500 bg-green-500/10 px-2.5 py-1 rounded-lg">{trend.growth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Gaps */}
      <div className="glass-card p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Opportunity Gaps
        </h3>
        <div className="space-y-3">
          {competitorGaps.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <span className="text-foreground">{item.gap}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  item.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                  item.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {item.difficulty}
                </span>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  item.impact === 'High' ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
                }`}>
                  {item.impact} Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Platforms */}
      <div className="glass-card p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-5">
          Recommended Platforms
        </h3>
        <div className="space-y-4">
          {platforms.map((platform, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${platform.color}`}>
                <platform.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">{platform.name}</span>
                  <span className="text-sm font-bold text-accent">{platform.score}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-accent rounded-full transition-all duration-500"
                    style={{ width: `${platform.score}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{platform.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Posting Times */}
      <div className="glass-card p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Optimal Posting Schedule
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {bestTimes.map((time, idx) => (
            <div key={idx} className={`relative text-center p-5 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
              idx === 0 ? 'bg-accent/10 border-2 border-accent/30' : 'bg-muted/30'
            }`}>
              {idx === 0 && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase">
                  Best
                </span>
              )}
              <p className="font-semibold text-foreground text-lg">{time.day}</p>
              <p className="text-accent font-bold text-xl mt-1">{time.time}</p>
              <p className="text-xs text-muted-foreground mt-2">{time.percent} engagement</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Content Tab
const ContentTab: React.FC = () => {
  const instagramPosts = [
    { title: 'Growth Hack Tips', caption: '🚀 5 AI tools every marketer needs in 2024...', type: 'Carousel', readyToPost: true },
    { title: 'Behind the Scenes', caption: '✨ Our team crushing Q4 goals...', type: 'Reel', readyToPost: false },
  ];

  const linkedinPosts = [
    { title: 'Thought Leadership', content: 'The future of marketing isn\'t about more content—it\'s about smarter content...', engagement: '2.4K views' },
    { title: 'Industry Insights', content: 'Just analyzed 1000+ marketing campaigns. Here\'s what works...', engagement: '1.8K views' },
  ];

  const emailCopies = [
    { subject: 'You\'re missing out on 40% more leads', preview: 'Hi [Name], I noticed your competitors are using...', openRate: '32%' },
    { subject: 'Quick win for your marketing', preview: 'What if I told you there\'s one simple change...', openRate: '28%' },
  ];

  return (
    <div className="space-y-6 slide-up">
      {/* Instagram Posts */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <Instagram className="w-5 h-5 text-pink-500" />
            Instagram Content
          </h3>
          <button className="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Create new <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {instagramPosts.map((post, idx) => (
            <div key={idx} className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <span className="font-semibold text-foreground">{post.title}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-pink-500/10 text-pink-500 px-2 py-0.5 rounded-full">
                        {post.type}
                      </span>
                      {post.readyToPost && (
                        <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Ready
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-muted rounded-lg transition-all">
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground pl-15">{post.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LinkedIn Posts */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <Linkedin className="w-5 h-5 text-blue-600" />
            LinkedIn Posts
          </h3>
          <button className="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Create new <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {linkedinPosts.map((post, idx) => (
            <div key={idx} className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group">
              <div className="flex items-start justify-between mb-2">
                <span className="font-semibold text-foreground">{post.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{post.engagement}</span>
                  <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-muted rounded-lg transition-all">
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{post.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Email Copies */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent" />
            Email Templates
          </h3>
          <button className="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            Create new <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {emailCopies.map((email, idx) => (
            <div key={idx} className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-semibold text-foreground block">
                    {email.subject}
                  </span>
                  <span className="text-xs text-green-500 mt-1">
                    {email.openRate} predicted open rate
                  </span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-muted rounded-lg transition-all">
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{email.preview}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Leads Tab
const LeadsTab: React.FC = () => {
  const leads = [
    { name: 'Sarah Johnson', company: 'TechStart Inc', role: 'Marketing Director', score: 92, status: 'Hot', avatar: 'SJ' },
    { name: 'Mike Chen', company: 'GrowthCo', role: 'Founder', score: 85, status: 'Warm', avatar: 'MC' },
    { name: 'Emily Davis', company: 'Scale Labs', role: 'Head of Growth', score: 78, status: 'Warm', avatar: 'ED' },
    { name: 'Alex Turner', company: 'Digital First', role: 'CMO', score: 71, status: 'New', avatar: 'AT' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Warm': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="space-y-6 slide-up">
      {/* Simulated Badge */}
      <div className="bg-accent/5 border border-accent/20 rounded-2xl px-5 py-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
          <Users className="w-5 h-5 text-accent-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Lead Intelligence</p>
          <p className="text-xs text-muted-foreground">Simulated CRM data • 4 qualified leads</p>
        </div>
      </div>

      {/* Lead Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-foreground">47</p>
          <p className="text-xs text-muted-foreground">Total Leads</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-green-500">12</p>
          <p className="text-xs text-muted-foreground">Qualified</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-display font-bold text-accent">84%</p>
          <p className="text-xs text-muted-foreground">Response Rate</p>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground">
            Qualified Leads
          </h3>
          <button className="text-accent text-sm font-medium flex items-center gap-1">
            Export <ExternalLink className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {leads.map((lead, idx) => (
            <div key={idx} className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-navy flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    {lead.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-accent transition-colors">{lead.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {lead.role} at {lead.company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-accent">{lead.score}</span>
                    <p className="text-[10px] text-muted-foreground">Score</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Outreach */}
      <div className="glass-card p-6">
        <h3 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          AI-Generated Outreach
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-muted/30 rounded-xl relative group">
            <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-2 hover:bg-muted rounded-lg transition-all">
              <Copy className="w-4 h-4 text-muted-foreground" />
            </button>
            <p className="text-xs text-accent mb-2 font-medium">For Sarah Johnson</p>
            <p className="text-sm text-foreground/80 italic leading-relaxed">
              "Hi Sarah, I noticed TechStart is scaling rapidly. We've helped similar companies 
              increase their marketing ROI by 40% with AI automation. Would love to share how..."
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-xl relative group">
            <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 p-2 hover:bg-muted rounded-lg transition-all">
              <Copy className="w-4 h-4 text-muted-foreground" />
            </button>
            <p className="text-xs text-accent mb-2 font-medium">For Mike Chen</p>
            <p className="text-sm text-foreground/80 italic leading-relaxed">
              "Hey Mike, fellow founder here. Saw your recent post about growth challenges. 
              We built something that might help..."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Automation Tab
const AutomationTab: React.FC = () => {
  const scheduled = [
    { platform: 'Instagram', content: 'Growth tips carousel', time: 'Tomorrow, 10:00 AM', icon: Instagram, color: 'text-pink-500' },
    { platform: 'LinkedIn', content: 'Thought leadership post', time: 'Thursday, 2:00 PM', icon: Linkedin, color: 'text-blue-600' },
  ];

  const posted = [
    { platform: 'Instagram', content: 'Behind the scenes reel', time: '2 hours ago', engagement: '234 likes', icon: Instagram, color: 'text-pink-500' },
    { platform: 'LinkedIn', content: 'Industry insights', time: 'Yesterday', engagement: '1.2K views', icon: Linkedin, color: 'text-blue-600' },
  ];

  const outreach = [
    { recipient: 'Sarah Johnson', status: 'Delivered', time: '1 hour ago' },
    { recipient: 'Mike Chen', status: 'Opened', time: '3 hours ago' },
    { recipient: 'Emily Davis', status: 'Replied', time: 'Yesterday' },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Replied': return 'bg-green-500/10 text-green-500';
      case 'Opened': return 'bg-blue-500/10 text-blue-500';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 slide-up">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <Clock className="w-5 h-5 text-accent mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-foreground">2</p>
          <p className="text-xs text-muted-foreground">Scheduled</p>
        </div>
        <div className="glass-card p-4 text-center">
          <CheckCircle className="w-5 h-5 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground">Posted</p>
        </div>
        <div className="glass-card p-4 text-center">
          <Send className="w-5 h-5 text-accent mx-auto mb-2" />
          <p className="text-2xl font-display font-bold text-foreground">8</p>
          <p className="text-xs text-muted-foreground">Outreach Sent</p>
        </div>
      </div>

      {/* Scheduled */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            Scheduled Posts
          </h3>
          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">2 upcoming</span>
        </div>
        <div className="space-y-3">
          {scheduled.map((item, idx) => (
            <div key={idx} className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{item.content}</p>
                <p className="text-sm text-muted-foreground">{item.platform}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-accent">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Posted */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Recently Posted
          </h3>
        </div>
        <div className="space-y-3">
          {posted.map((item, idx) => (
            <div key={idx} className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{item.content}</p>
                <p className="text-sm text-muted-foreground">{item.platform} • {item.time}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-green-500">{item.engagement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outreach Sent */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
            <Send className="w-5 h-5 text-accent" />
            Outreach Status
          </h3>
        </div>
        <div className="space-y-3">
          {outreach.map((item, idx) => (
            <div key={idx} className="p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-navy flex items-center justify-center text-primary-foreground font-medium text-sm">
                  {item.recipient.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.recipient}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusStyle(item.status)}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

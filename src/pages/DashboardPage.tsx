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
  Calendar
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
    { id: 'insights', label: 'Market Insights', icon: TrendingUp },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'automation', label: 'Automation', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />

      {/* Tabs */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
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
    { keyword: 'AI Marketing', growth: '+156%', volume: '2.4M' },
    { keyword: 'Marketing Automation', growth: '+89%', volume: '1.8M' },
    { keyword: 'Content Strategy', growth: '+67%', volume: '980K' },
    { keyword: 'Lead Generation', growth: '+45%', volume: '1.2M' },
  ];

  const competitorGaps = [
    'Video content on Instagram Reels',
    'LinkedIn thought leadership posts',
    'Email nurture sequences',
    'Interactive webinars',
  ];

  const platforms = [
    { name: 'LinkedIn', score: 92, reason: 'Best for B2B reach' },
    { name: 'Instagram', score: 78, reason: 'Visual engagement' },
    { name: 'Email', score: 85, reason: 'High conversion rate' },
  ];

  const bestTimes = [
    { day: 'Tuesday', time: '10:00 AM', engagement: 'Highest' },
    { day: 'Thursday', time: '2:00 PM', engagement: 'High' },
    { day: 'Wednesday', time: '11:00 AM', engagement: 'High' },
  ];

  return (
    <div className="space-y-6 slide-up">
      {/* Simulated Badge */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg px-4 py-2 text-sm text-accent flex items-center gap-2">
        <BarChart3 className="w-4 h-4" />
        Google Trends Analysis (Simulated Demo Data)
      </div>

      {/* Trending Keywords */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-accent" />
          Trending Keywords
        </h3>
        <div className="space-y-3">
          {trends.map((trend, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium text-foreground">{trend.keyword}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{trend.volume} searches</span>
                <span className="text-sm font-medium text-green-500">{trend.growth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Gaps */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
          Competitor Gaps Identified
        </h3>
        <div className="space-y-2">
          {competitorGaps.map((gap, idx) => (
            <div key={idx} className="flex items-center gap-3 text-foreground/80">
              <div className="w-2 h-2 rounded-full bg-accent" />
              {gap}
            </div>
          ))}
        </div>
      </div>

      {/* Best Platforms */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
          Recommended Platforms
        </h3>
        <div className="space-y-3">
          {platforms.map((platform, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <span className="font-medium text-foreground">{platform.name}</span>
                <p className="text-sm text-muted-foreground">{platform.reason}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full gradient-accent rounded-full"
                    style={{ width: `${platform.score}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-accent">{platform.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Posting Times */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Best Posting Times
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {bestTimes.map((time, idx) => (
            <div key={idx} className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="font-medium text-foreground">{time.day}</p>
              <p className="text-accent font-semibold">{time.time}</p>
              <p className="text-xs text-muted-foreground mt-1">{time.engagement}</p>
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
    {
      title: 'Growth Hack Tips',
      caption: '🚀 5 AI tools every marketer needs in 2024...',
      type: 'Carousel',
    },
    {
      title: 'Behind the Scenes',
      caption: '✨ Our team crushing Q4 goals...',
      type: 'Reel',
    },
  ];

  const linkedinPosts = [
    {
      title: 'Thought Leadership',
      content: 'The future of marketing isn\'t about more content—it\'s about smarter content...',
    },
    {
      title: 'Industry Insights',
      content: 'Just analyzed 1000+ marketing campaigns. Here\'s what works...',
    },
  ];

  const emailCopies = [
    {
      subject: 'You\'re missing out on 40% more leads',
      preview: 'Hi [Name], I noticed your competitors are using...',
    },
    {
      subject: 'Quick win for your marketing',
      preview: 'What if I told you there\'s one simple change...',
    },
  ];

  return (
    <div className="space-y-6 slide-up">
      {/* Instagram Posts */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
          <Instagram className="w-5 h-5 text-pink-500" />
          Instagram Posts
        </h3>
        <div className="space-y-3">
          {instagramPosts.map((post, idx) => (
            <div key={idx} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{post.title}</span>
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                  {post.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{post.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LinkedIn Posts */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
          <Linkedin className="w-5 h-5 text-blue-600" />
          LinkedIn Posts
        </h3>
        <div className="space-y-3">
          {linkedinPosts.map((post, idx) => (
            <div key={idx} className="p-4 bg-muted/50 rounded-lg">
              <span className="font-medium text-foreground block mb-2">{post.title}</span>
              <p className="text-sm text-muted-foreground">{post.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Email Copies */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-accent" />
          Email Outreach Copies
        </h3>
        <div className="space-y-3">
          {emailCopies.map((email, idx) => (
            <div key={idx} className="p-4 bg-muted/50 rounded-lg">
              <span className="font-medium text-foreground block mb-1">
                Subject: {email.subject}
              </span>
              <p className="text-sm text-muted-foreground">{email.preview}</p>
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
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc',
      role: 'Marketing Director',
      score: 92,
      status: 'Hot',
    },
    {
      name: 'Mike Chen',
      company: 'GrowthCo',
      role: 'Founder',
      score: 85,
      status: 'Warm',
    },
    {
      name: 'Emily Davis',
      company: 'Scale Labs',
      role: 'Head of Growth',
      score: 78,
      status: 'Warm',
    },
    {
      name: 'Alex Turner',
      company: 'Digital First',
      role: 'CMO',
      score: 71,
      status: 'New',
    },
  ];

  return (
    <div className="space-y-6 slide-up">
      {/* Simulated Badge */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg px-4 py-2 text-sm text-accent flex items-center gap-2">
        <Users className="w-4 h-4" />
        Lead Profiles (Simulated - Apollo/CRM Integration Demo)
      </div>

      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
          Qualified Leads
        </h3>
        <div className="space-y-3">
          {leads.map((lead, idx) => (
            <div key={idx} className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full gradient-navy flex items-center justify-center text-primary-foreground font-medium">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-foreground">{lead.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {lead.role} at {lead.company}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  lead.status === 'Hot' 
                    ? 'bg-red-100 text-red-600' 
                    : lead.status === 'Warm'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-blue-100 text-blue-600'
                }`}>
                  {lead.status}
                </span>
                <span className="text-sm font-medium text-accent">{lead.score}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Outreach Messages */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">
          Generated Outreach Messages
        </h3>
        <div className="space-y-3">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-foreground/80 italic">
              "Hi Sarah, I noticed TechStart is scaling rapidly. We've helped similar companies 
              increase their marketing ROI by 40% with AI automation. Would love to share how..."
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-foreground/80 italic">
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
    { platform: 'Instagram', content: 'Growth tips carousel', time: 'Tomorrow, 10:00 AM' },
    { platform: 'LinkedIn', content: 'Thought leadership post', time: 'Thursday, 2:00 PM' },
  ];

  const posted = [
    { platform: 'Instagram', content: 'Behind the scenes reel', time: '2 hours ago', engagement: '234 likes' },
    { platform: 'LinkedIn', content: 'Industry insights', time: 'Yesterday', engagement: '1.2K views' },
  ];

  const outreach = [
    { recipient: 'Sarah Johnson', status: 'Delivered', time: '1 hour ago' },
    { recipient: 'Mike Chen', status: 'Opened', time: '3 hours ago' },
    { recipient: 'Emily Davis', status: 'Replied', time: 'Yesterday' },
  ];

  return (
    <div className="space-y-6 slide-up">
      {/* Scheduled */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          Scheduled Posts
        </h3>
        <div className="space-y-3">
          {scheduled.map((item, idx) => (
            <div key={idx} className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{item.content}</p>
                <p className="text-sm text-muted-foreground">{item.platform}</p>
              </div>
              <span className="text-sm text-accent">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Posted */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Recently Posted
        </h3>
        <div className="space-y-3">
          {posted.map((item, idx) => (
            <div key={idx} className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{item.content}</p>
                <p className="text-sm text-muted-foreground">{item.platform} • {item.time}</p>
              </div>
              <span className="text-sm text-green-500">{item.engagement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Outreach Sent */}
      <div className="glass-card p-6">
        <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
          <Send className="w-5 h-5 text-accent" />
          Outreach Status
        </h3>
        <div className="space-y-3">
          {outreach.map((item, idx) => (
            <div key={idx} className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{item.recipient}</p>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                item.status === 'Replied' 
                  ? 'bg-green-100 text-green-600' 
                  : item.status === 'Opened'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600'
              }`}>
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

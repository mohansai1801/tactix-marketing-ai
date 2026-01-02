import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock,
  Target,
  BarChart3,
  Zap,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import FloatingNavBar from '../components/FloatingNavBar';
import AppHeader from '../components/AppHeader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AnalyticsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isComplete } = useOnboarding();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (!isComplete) {
      navigate('/onboarding');
    }
  }, [isAuthenticated, isComplete, navigate]);

  const reachData = [
    { name: 'Week 1', value: 2400 },
    { name: 'Week 2', value: 3200 },
    { name: 'Week 3', value: 4800 },
    { name: 'Week 4', value: 5600 },
    { name: 'Week 5', value: 7200 },
    { name: 'Week 6', value: 9100 },
  ];

  const contentPerformance = [
    { name: 'Carousel', engagement: 85 },
    { name: 'Reels', engagement: 92 },
    { name: 'Stories', engagement: 65 },
    { name: 'Posts', engagement: 55 },
  ];

  const metrics = [
    { 
      label: 'Predicted Reach Growth', 
      value: '+156%', 
      icon: TrendingUp, 
      color: 'text-green-500',
      subtext: 'vs last month'
    },
    { 
      label: 'Engagement Rate', 
      value: '8.4%', 
      icon: Target, 
      color: 'text-accent',
      subtext: 'Above industry avg (3.2%)'
    },
    { 
      label: 'Leads Generated', 
      value: '47', 
      icon: Users, 
      color: 'text-blue-500',
      subtext: 'This month'
    },
    { 
      label: 'Impressions', 
      value: '28.5K', 
      icon: Eye, 
      color: 'text-purple-500',
      subtext: 'Total reach'
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />

      <main className="container max-w-4xl mx-auto px-6 py-6">
        {/* Simulated Badge */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-4 py-3 mb-6 flex items-center gap-3 slide-up">
          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <p className="text-sm text-amber-600">
            <strong>AI-Predicted Analytics</strong> — Demo simulation based on your profile and industry benchmarks
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6 slide-up">
          {metrics.map((metric, idx) => (
            <div 
              key={idx} 
              className="glass-card p-5"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <p className={`text-2xl font-display font-bold ${metric.color}`}>{metric.value}</p>
              <p className="text-sm text-foreground font-medium mt-1">{metric.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{metric.subtext}</p>
            </div>
          ))}
        </div>

        {/* Reach Growth Chart */}
        <div className="glass-card p-6 mb-6 slide-up stagger-2">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" />
            Predicted Reach Growth
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reachData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Performance */}
        <div className="glass-card p-6 mb-6 slide-up stagger-3">
          <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            Content Performance Comparison
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar 
                  dataKey="engagement" 
                  fill="hsl(var(--accent))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Insights */}
        <div className="grid md:grid-cols-2 gap-4 slide-up stagger-4">
          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Best Platform
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <span className="text-3xl">💼</span>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-accent">LinkedIn</p>
                <p className="text-sm text-muted-foreground">92% match score for your audience</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              Best Posting Time
            </h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                <span className="text-3xl">🕐</span>
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-accent">Tuesday 10 AM</p>
                <p className="text-sm text-muted-foreground">Peak engagement window</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FloatingNavBar />
    </div>
  );
};

export default AnalyticsPage;

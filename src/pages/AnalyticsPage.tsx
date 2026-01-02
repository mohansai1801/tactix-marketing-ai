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
  ArrowUpRight,
  ArrowDownRight,
  Linkedin,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import FloatingNavBar from '../components/FloatingNavBar';
import AppHeader from '../components/AppHeader';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Area, AreaChart } from 'recharts';

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
    { name: 'W1', value: 2400, previous: 2000 },
    { name: 'W2', value: 3200, previous: 2400 },
    { name: 'W3', value: 4800, previous: 3200 },
    { name: 'W4', value: 5600, previous: 4000 },
    { name: 'W5', value: 7200, previous: 5200 },
    { name: 'W6', value: 9100, previous: 6800 },
  ];

  const contentPerformance = [
    { name: 'Carousel', engagement: 85, fill: 'hsl(var(--accent))' },
    { name: 'Reels', engagement: 92, fill: 'hsl(340, 82%, 52%)' },
    { name: 'Stories', engagement: 65, fill: 'hsl(var(--muted-foreground))' },
    { name: 'Posts', engagement: 55, fill: 'hsl(var(--muted-foreground))' },
  ];

  const metrics = [
    { 
      label: 'Reach Growth', 
      value: '+156%', 
      icon: TrendingUp, 
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      trend: 'up',
      change: '+23%'
    },
    { 
      label: 'Engagement', 
      value: '8.4%', 
      icon: Target, 
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      trend: 'up',
      change: '+1.2%'
    },
    { 
      label: 'Leads', 
      value: '47', 
      icon: Users, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      trend: 'up',
      change: '+12'
    },
    { 
      label: 'Impressions', 
      value: '28.5K', 
      icon: Eye, 
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      trend: 'down',
      change: '-5%'
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-28">
      <AppHeader />

      <main className="container max-w-4xl mx-auto px-6 py-6">
        {/* Header with Badge */}
        <div className="flex items-center justify-between mb-6 slide-up">
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">Analytics</h1>
            <p className="text-sm text-muted-foreground">AI-predicted performance metrics</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-accent">AI Predicted</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-6 slide-up stagger-1">
          {metrics.map((metric, idx) => (
            <div 
              key={idx} 
              className="glass-card p-5 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${metric.bgColor} flex items-center justify-center`}>
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {metric.change}
                </div>
              </div>
              <p className={`text-3xl font-display font-bold ${metric.color}`}>{metric.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Reach Growth Chart */}
        <div className="glass-card p-6 mb-6 slide-up stagger-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-accent" />
              Reach Growth Prediction
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/30" />
                <span className="text-xs text-muted-foreground">Previous</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reachData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000}K`}
                />
                <Tooltip 
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent"
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Performance */}
        <div className="glass-card p-6 mb-6 slide-up stagger-3">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Content Type Performance
            </h3>
            <span className="text-xs text-muted-foreground">Engagement rate %</span>
          </div>
          <div className="space-y-4">
            {contentPerformance.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-20 text-sm text-muted-foreground">{item.name}</span>
                <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden relative">
                  <div 
                    className="h-full rounded-lg transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                    style={{ 
                      width: `${item.engagement}%`,
                      background: idx === 1 ? 'linear-gradient(90deg, hsl(340, 82%, 52%), hsl(330, 82%, 60%))' : 
                                 idx === 0 ? 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--cyan-accent)))' :
                                 'hsl(var(--muted-foreground))'
                    }}
                  >
                    <span className="text-xs font-bold text-white">{item.engagement}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Insights */}
        <div className="grid md:grid-cols-2 gap-4 slide-up stagger-4">
          <div className="glass-card p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Linkedin className="w-5 h-5 text-blue-600" />
                <h3 className="font-display font-bold text-lg text-foreground">
                  Best Platform
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <Linkedin className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-accent">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">92% match for your audience</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-accent" />
                <h3 className="font-display font-bold text-lg text-foreground">
                  Best Time
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-accent">Tue 10 AM</p>
                  <p className="text-sm text-muted-foreground">Peak engagement window</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Heatmap Placeholder */}
        <div className="glass-card p-6 mt-6 slide-up stagger-5">
          <h3 className="font-display font-bold text-lg text-foreground mb-5 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Weekly Engagement Pattern
          </h3>
          <div className="grid grid-cols-7 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="text-center">
                <span className="text-xs text-muted-foreground block mb-2">{day}</span>
                <div className="space-y-1">
                  {[0.3, 0.5, 0.8, 0.9, 0.7, 0.4, 0.2].map((opacity, hourIdx) => (
                    <div 
                      key={hourIdx}
                      className="h-6 rounded"
                      style={{ 
                        background: `hsl(var(--accent) / ${idx === 1 && hourIdx === 2 ? 1 : opacity * (idx === 1 ? 1.2 : idx === 3 ? 1 : 0.6)})` 
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent/20" />
              <span className="text-xs text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent/50" />
              <span className="text-xs text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-accent" />
              <span className="text-xs text-muted-foreground">High</span>
            </div>
          </div>
        </div>
      </main>

      <FloatingNavBar />
    </div>
  );
};

export default AnalyticsPage;

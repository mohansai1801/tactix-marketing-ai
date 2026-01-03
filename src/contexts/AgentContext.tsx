import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type AgentStatus = 'active' | 'available' | 'coming-soon';

export interface Agent {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  isPremium: boolean;
  status: AgentStatus;
  features: string[];
}

interface AgentContextType {
  agents: Agent[];
  hasProAccess: boolean;
  activateAgent: (id: string) => void;
  deactivateAgent: (id: string) => void;
  grantProAccess: () => void;
}

const defaultAgents: Agent[] = [
  {
    id: 'create-post',
    name: 'Create the Post',
    description: 'Generate stunning marketing posts and content from your ideas using AI-powered creation.',
    icon: '✨',
    isActive: true,
    isPremium: false,
    status: 'active',
    features: ['AI Content Generation', 'Social Media Posts', 'Marketing Copy'],
  },
  {
    id: 'market-intelligence',
    name: 'Market Intelligence Agent',
    description: 'Analyze market trends, competitor insights, and discover opportunities in real-time.',
    icon: '📊',
    isActive: false,
    isPremium: true,
    status: 'coming-soon',
    features: ['Google Trends Analysis', 'Competitor Monitoring', 'Market Gap Detection'],
  },
  {
    id: 'content-generation',
    name: 'Content Generation Agent',
    description: 'AI-powered content creation for all your marketing channels.',
    icon: '✍️',
    isActive: false,
    isPremium: true,
    status: 'coming-soon',
    features: ['Social Media Posts', 'Email Campaigns', 'Blog Articles'],
  },
  {
    id: 'lead-generation',
    name: 'Lead Generation Agent',
    description: 'Identify and qualify potential leads with smart outreach automation.',
    icon: '🎯',
    isActive: false,
    isPremium: true,
    status: 'coming-soon',
    features: ['Lead Scoring', 'Email Outreach', 'CRM Integration'],
  },
  {
    id: 'social-automation',
    name: 'Social Media Automation Agent',
    description: 'Schedule, post, and engage across all social platforms automatically.',
    icon: '📱',
    isActive: false,
    isPremium: true,
    status: 'coming-soon',
    features: ['Multi-Platform Posting', 'Engagement Tracking', 'Best Time Optimization'],
  },
  {
    id: 'analytics-optimization',
    name: 'Analytics & Optimization Agent',
    description: 'Deep analytics with AI-driven recommendations for continuous improvement.',
    icon: '📈',
    isActive: false,
    isPremium: true,
    status: 'coming-soon',
    features: ['Performance Dashboards', 'A/B Testing', 'ROI Tracking'],
  },
];

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgents must be used within an AgentProvider');
  }
  return context;
};

interface AgentProviderProps {
  children: ReactNode;
}

export const AgentProvider: React.FC<AgentProviderProps> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>(defaultAgents);
  const [hasProAccess, setHasProAccess] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('tactix_agents');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge stored data with default agents to ensure new fields exist
      const mergedAgents = defaultAgents.map(defaultAgent => {
        const storedAgent = parsed.agents?.find((a: Agent) => a.id === defaultAgent.id);
        return storedAgent ? { ...defaultAgent, isActive: storedAgent.isActive } : defaultAgent;
      });
      setAgents(mergedAgents);
      setHasProAccess(parsed.hasProAccess || false);
    }
  }, []);

  const saveToStorage = (newAgents: Agent[], proAccess: boolean) => {
    localStorage.setItem('tactix_agents', JSON.stringify({ agents: newAgents, hasProAccess: proAccess }));
  };

  const activateAgent = (id: string) => {
    const agent = agents.find(a => a.id === id);
    if (agent?.isPremium && !hasProAccess) {
      return; // Redirect to payment page
    }
    if (agent?.status === 'coming-soon') {
      return; // Can't activate coming soon agents
    }
    
    const updated = agents.map(a => 
      a.id === id ? { ...a, isActive: true } : a
    );
    setAgents(updated);
    saveToStorage(updated, hasProAccess);
  };

  const deactivateAgent = (id: string) => {
    const updated = agents.map(a => 
      a.id === id ? { ...a, isActive: false } : a
    );
    setAgents(updated);
    saveToStorage(updated, hasProAccess);
  };

  const grantProAccess = () => {
    setHasProAccess(true);
    const updated = agents.map(a => 
      a.status !== 'coming-soon' ? { ...a, isActive: true } : a
    );
    setAgents(updated);
    saveToStorage(updated, true);
  };

  return (
    <AgentContext.Provider value={{ agents, hasProAccess, activateAgent, deactivateAgent, grantProAccess }}>
      {children}
    </AgentContext.Provider>
  );
};

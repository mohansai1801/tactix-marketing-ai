import React from 'react';
import { Lock, Check, ChevronRight, Clock, Sparkles } from 'lucide-react';
import { useAgents, Agent } from '../contexts/AgentContext';
import { useNavigate } from 'react-router-dom';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const { hasProAccess, activateAgent, deactivateAgent } = useAgents();
  const navigate = useNavigate();

  const handleToggle = () => {
    // Coming soon agents can't be activated
    if (agent.status === 'coming-soon') {
      return;
    }
    
    if (agent.isPremium && !hasProAccess) {
      navigate('/payment');
      return;
    }
    
    // For the create-post agent, navigate to the create post page
    if (agent.id === 'create-post') {
      navigate('/create-post');
      return;
    }
    
    if (agent.isActive) {
      deactivateAgent(agent.id);
    } else {
      activateAgent(agent.id);
    }
  };

  const isLocked = agent.isPremium && !hasProAccess && agent.status !== 'coming-soon';
  const isComingSoon = agent.status === 'coming-soon';

  return (
    <div className={`agent-card group ${isComingSoon ? 'opacity-70' : isLocked ? 'opacity-90' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
            isComingSoon ? 'bg-muted' : 'gradient-navy'
          }`}>
            {agent.icon}
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">
              {agent.name}
            </h3>
            {isComingSoon ? (
              <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-medium mt-1">
                <Clock className="w-3 h-3" /> Coming Soon
              </span>
            ) : agent.isPremium && !hasProAccess ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Lock className="w-3 h-3" /> Pro Feature
              </span>
            ) : !agent.isPremium ? (
              <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
                <Sparkles className="w-3 h-3" /> AI Powered
              </span>
            ) : null}
          </div>
        </div>
        
        {agent.isActive && !isLocked && !isComingSoon && (
          <span className="flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
            <Check className="w-3 h-3" /> Active
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

      <div className="space-y-2 mb-4">
        {agent.features.map((feature, idx) => (
          <div key={idx} className={`flex items-center gap-2 text-sm ${
            isComingSoon ? 'text-muted-foreground' : 'text-foreground/80'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isComingSoon ? 'bg-muted-foreground' : 'bg-accent'}`} />
            {feature}
          </div>
        ))}
      </div>

      <button
        onClick={handleToggle}
        disabled={isComingSoon}
        className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
          isComingSoon 
            ? 'bg-muted/50 text-muted-foreground cursor-not-allowed'
            : isLocked 
              ? 'bg-muted text-muted-foreground hover:bg-muted/80' 
              : agent.id === 'create-post'
                ? 'btn-accent'
                : agent.isActive 
                  ? 'bg-secondary/20 text-secondary hover:bg-secondary/30' 
                  : 'btn-accent'
        }`}
      >
        {isComingSoon ? (
          <>
            <Clock className="w-4 h-4" />
            About to Build
          </>
        ) : isLocked ? (
          <>
            <Lock className="w-4 h-4" />
            Unlock Agent
          </>
        ) : agent.id === 'create-post' ? (
          <>
            <Sparkles className="w-4 h-4" />
            Create Post
            <ChevronRight className="w-4 h-4" />
          </>
        ) : agent.isActive ? (
          'Deactivate'
        ) : (
          <>
            Activate Agent
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default AgentCard;

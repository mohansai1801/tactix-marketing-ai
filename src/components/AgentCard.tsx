import React from 'react';
import { Lock, Check, ChevronRight } from 'lucide-react';
import { useAgents, Agent } from '../contexts/AgentContext';
import { useNavigate } from 'react-router-dom';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  const { hasProAccess, activateAgent, deactivateAgent } = useAgents();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (agent.isPremium && !hasProAccess) {
      navigate('/payment');
      return;
    }
    
    if (agent.isActive) {
      deactivateAgent(agent.id);
    } else {
      activateAgent(agent.id);
    }
  };

  const isLocked = agent.isPremium && !hasProAccess;

  return (
    <div className={`agent-card group ${isLocked ? 'opacity-90' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gradient-navy flex items-center justify-center text-2xl">
            {agent.icon}
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground group-hover:text-accent transition-colors">
              {agent.name}
            </h3>
            {agent.isPremium && !hasProAccess && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Lock className="w-3 h-3" /> Pro Feature
              </span>
            )}
            {!agent.isPremium && (
              <span className="text-xs text-accent font-medium">Free</span>
            )}
          </div>
        </div>
        
        {agent.isActive && !isLocked && (
          <span className="flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-full">
            <Check className="w-3 h-3" /> Active
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>

      <div className="space-y-2 mb-4">
        {agent.features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
            {feature}
          </div>
        ))}
      </div>

      <button
        onClick={handleToggle}
        className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
          isLocked 
            ? 'bg-muted text-muted-foreground hover:bg-muted/80' 
            : agent.isActive 
              ? 'bg-secondary/20 text-secondary hover:bg-secondary/30' 
              : 'btn-accent'
        }`}
      >
        {isLocked ? (
          <>
            <Lock className="w-4 h-4" />
            Unlock Agent
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

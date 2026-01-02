import React from 'react';

interface OptionButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: string;
}

const OptionButton: React.FC<OptionButtonProps> = ({ selected, onClick, children, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
        selected 
          ? 'border-accent bg-accent/20 shadow-glow' 
          : 'border-primary-foreground/20 bg-secondary/20 hover:border-accent/50 hover:bg-accent/10'
      }`}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <span className={`font-medium ${selected ? 'text-accent' : 'text-primary-foreground'}`}>
          {children}
        </span>
      </div>
    </button>
  );
};

export default OptionButton;

import React from 'react';
import { GlassCard } from '@/components/global/glass-card';
import { Activity } from 'lucide-react';

export interface WorkflowCardProps {
  title: string;
  progress: number;
}

export const WorkflowCard = ({ title, progress }: WorkflowCardProps) => {
  return (
    <GlassCard className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold">
          <Activity className="w-5 h-5 text-[#00F5FF]" /> {title}
        </div>
        <span className="text-[#00F5FF] font-bold text-sm">{progress}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden shadow-inner">
        <div 
          className="bg-gradient-to-r from-[#8A2BE2] to-[#00F5FF] h-2 rounded-full shadow-[0_0_10px_#00F5FF] transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </GlassCard>
  );
};

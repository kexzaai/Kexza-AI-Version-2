import React from 'react';
import { GlassCard } from '@/components/global/glass-card';
import { StatusBadge } from '@/components/global/status-badge';
import { Clock } from 'lucide-react';

export interface TaskCardProps {
  title: string;
  status: string;
  dueDate: string;
  clientName: string;
}

export const TaskCard = ({ title, status, dueDate, clientName }: TaskCardProps) => {
  return (
    <GlassCard className="flex flex-col gap-3 p-4 hover:shadow-glow-button cursor-pointer">
      <div className="flex justify-between items-start">
        <h4 className="text-white font-semibold text-lg line-clamp-1">{title}</h4>
        <StatusBadge status={status} />
      </div>
      <div className="text-sm font-medium text-white/60">{clientName}</div>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-white/40 mt-2">
        <Clock className="w-3.5 h-3.5" />
        <span>{dueDate}</span>
      </div>
    </GlassCard>
  );
};

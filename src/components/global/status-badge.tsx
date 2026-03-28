import React from 'react';
import { cn } from '@/lib/utils';

export const StatusBadge = ({ status, className }: { status: string, className?: string }) => {
  const getStyles = () => {
    switch (status?.toLowerCase()) {
      case 'completed': 
      case 'done':
        return 'bg-[#00F5FF]/10 text-[#00F5FF] border-[#00F5FF]/30 shadow-[0_0_10px_rgba(0,245,255,0.2)]';
      case 'pending': 
      case 'overdue':
        return 'bg-[#FF00CC]/10 text-[#FF00CC] border-[#FF00CC]/30 shadow-[0_0_10px_rgba(255,0,204,0.2)]';
      case 'in progress': 
      case 'active':
      case 'processing':
        return 'bg-[#8A2BE2]/10 text-[#8A2BE2] border-[#8A2BE2]/30 shadow-[0_0_10px_rgba(138,43,226,0.2)]';
      default: 
        return 'bg-white/10 text-white/70 border-white/20';
    }
  };

  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold border", getStyles(), className)}>
      {status}
    </span>
  );
};

import React from 'react';
import { GlassPanel } from '@/components/global/glass-panel';
import { cn } from '@/lib/utils';

export const ChartGlassContainer = ({ title, children, className }: { title?: string, children: React.ReactNode, className?: string }) => {
  return (
    <GlassPanel className={cn("p-6 flex flex-col gap-4", className)}>
      {title && <h3 className="text-white font-bold text-lg">{title}</h3>}
      <div className="w-full h-full min-h-[200px] flex items-center justify-center">
        {children}
      </div>
    </GlassPanel>
  );
};

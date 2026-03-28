import React from 'react';
import { cn } from '@/lib/utils';

export const HoverLiftWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("transition-transform duration-300 hover:-translate-y-2 hover:shadow-glow-button", className)}>
    {children}
  </div>
);

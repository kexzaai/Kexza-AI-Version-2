import React from 'react';
import { cn } from '@/lib/utils';

export interface GradientBorderWrapperProps {
  children: React.ReactNode;
  className?: string;
  radius?: string;
}

export const GradientBorderWrapper = ({ children, className, radius = 'rounded-xl' }: GradientBorderWrapperProps) => (
  <div className={cn("relative p-[1px] overflow-hidden", radius, className)}>
    <div className="absolute inset-0 bg-gradient-to-r from-[#8A2BE2] via-[#00F5FF] to-[#FF00CC] opacity-50"></div>
    <div className={cn("relative bg-[#0D0D0D] w-full h-full", radius)}>
      {children}
    </div>
  </div>
);

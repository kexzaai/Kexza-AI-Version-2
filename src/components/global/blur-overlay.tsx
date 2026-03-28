import React from 'react';
import { cn } from '@/lib/utils';

export const BlurOverlay = ({ children, className }: { children?: React.ReactNode, className?: string }) => (
  <div className={cn("absolute inset-0 bg-black/40 backdrop-blur-md z-50 flex items-center justify-center", className)}>
    {children}
  </div>
);

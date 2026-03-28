"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const AuroraBackground = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("relative min-h-screen w-full bg-[#0D0D0D] text-white", className)}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-50 z-0">
        <div 
          className="absolute w-[50vw] h-[50vw] bg-[#8A2BE2] rounded-full blur-[100px] animate-aurora-flow" 
          style={{ top: '10%', left: '10%', animationDuration: '25s' }} 
        />
        <div 
          className="absolute w-[45vw] h-[45vw] bg-[#00F5FF] rounded-full blur-[120px] animate-aurora-flow" 
          style={{ top: '5%', left: '60%', animationDelay: '-5s', animationDuration: '30s' }} 
        />
        <div 
          className="absolute w-[60vw] h-[60vw] bg-[#FF00CC] rounded-full blur-[120px] animate-aurora-flow" 
          style={{ top: '50%', left: '40%', animationDelay: '-10s', animationDuration: '35s' }} 
        />
      </div>
      <div className="relative z-10 w-full h-full min-h-screen">{children}</div>
    </div>
  );
};

import React from "react";
import { GlassCard } from "./glass-card";
import { AuroraBackground } from "./aurora-background";
import { Sparkles } from "lucide-react";

export const ComingSoon = ({ title }: { title: string }) => {
  return (
    <AuroraBackground>
      <div className="flex w-full h-full items-center justify-center p-6">
        <GlassCard className="max-w-md w-full text-center py-12 flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 mb-2">
            <Sparkles className="w-8 h-8 text-[#00F5FF]" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{title}</h1>
          <p className="text-white/60 font-medium px-4">
            This module is currently under development. Kexza AI is bringing execution intelligence to this workflow soon.
          </p>
          <div className="mt-6 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/40">
            Coming Soon
          </div>
        </GlassCard>
      </div>
    </AuroraBackground>
  );
};

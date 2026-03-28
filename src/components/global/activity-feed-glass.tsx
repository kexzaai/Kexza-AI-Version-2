import React from 'react';
import { GlassCard } from '@/components/global/glass-card';

export interface ActivityItem {
  title: string;
  time: string;
}

export const ActivityFeedGlass = ({ activities }: { activities: ActivityItem[] }) => {
  return (
    <GlassCard className="p-6">
      <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities?.map((act, i) => (
          <div key={i} className="flex gap-3 border-l-2 border-white/10 pl-4 py-1 relative">
            <div className="absolute w-2.5 h-2.5 rounded-full bg-[#8A2BE2] -left-[6px] top-2 shadow-[0_0_8px_#8A2BE2]"></div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-white/90">{act.title}</span>
              <span className="text-[10px] font-medium tracking-wide uppercase text-white/50">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

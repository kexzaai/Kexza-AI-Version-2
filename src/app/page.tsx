import React from "react";
import Link from "next/link";
import { GlassNavbar } from "@/components/global/glass-navbar";
import { GradientButton } from "@/components/global/gradient-button";
import { GlowButton } from "@/components/global/glow-button";
import { GlassCard } from "@/components/global/glass-card";
import { GlassPanel } from "@/components/global/glass-panel";
import { Layers, ShieldCheck, Users, BrainCircuit, Activity, Bell } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center w-full">
      <GlassNavbar />
      
      {/* SECTION 1: HERO */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh] z-10">
        <div className="flex flex-col gap-6 items-start">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Execution Intelligence <br /> for <span className="text-gradient">CA Firms</span>
          </h1>
          <p className="text-lg md:text-xl text-white/65 font-medium max-w-lg">
            Manage workflows, automate compliance, and gain real-time execution clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <Link href="/login">
              <GradientButton>Get Started</GradientButton>
            </Link>
            <GlowButton>View Demo</GlowButton>
          </div>
        </div>
        
        {/* Floating Cards */}
        <div className="relative h-[600px] w-full hidden lg:block">
          <GlassCard className="absolute top-[10%] left-[10%] w-72 shadow-glow-button">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#8A2BE2]" /> Task Dashboard
            </h3>
            <div className="space-y-3 mt-4">
              <div className="h-3 bg-white/10 rounded-full w-full"></div>
              <div className="h-3 bg-white/10 rounded-full w-4/5"></div>
              <div className="h-3 bg-white/10 rounded-full w-5/6"></div>
            </div>
          </GlassCard>

          <GlassCard className="absolute top-[40%] right-[5%] w-64">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#00F5FF]" /> Workflow Status
            </h3>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-12 h-12 rounded-full border-[4px] border-[#00F5FF] border-t-transparent animate-spin"></div>
              <div className="flex-1 space-y-2">
                <div className="h-2 bg-white/10 rounded-full w-full"></div>
                <div className="h-2 bg-white/10 rounded-full w-2/3"></div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="absolute bottom-[10%] left-[20%] w-72">
            <h3 className="text-white font-bold mb-2 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-[#FF00CC]" /> AI Insights
            </h3>
            <p className="text-sm font-medium text-white/60 mt-2">
              Anomaly detected in Q3 GST filings. Recommended action: Review annexure B.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* SECTION 2: CORE FEATURES GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Workflow Management", icon: <Layers className="text-[#8A2BE2] w-8 h-8" />, desc: "End-to-end execution tracking for audits, taxation, and advisory." },
            { title: "Compliance Tracking", icon: <ShieldCheck className="text-[#00F5FF] w-8 h-8" />, desc: "Automated deadlines, statutory calendars, and risk alerts." },
            { title: "Task Allocation", icon: <Users className="text-[#FF00CC] w-8 h-8" />, desc: "Smart resource planning and team performance monitoring." },
            { title: "AI Digital Clerk", icon: <BrainCircuit className="text-[#8A2BE2] w-8 h-8" />, desc: "Generative AI for instant client insights and reporting." },
            { title: "Client CRM", icon: <Activity className="text-[#00F5FF] w-8 h-8" />, desc: "Unified portal for documents, communication, and billing." },
            { title: "Smart Notifications", icon: <Bell className="text-[#FF00CC] w-8 h-8" />, desc: "Instant multi-channel alerts for pending approvals and tasks." },
          ].map((feat, i) => (
            <GlassCard key={i} className="flex flex-col items-start p-8 gap-4 shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10">{feat.icon}</div>
              <h3 className="text-xl font-bold text-white">{feat.title}</h3>
              <p className="text-white/65 font-medium leading-relaxed">{feat.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SECTION 3: PRODUCT PREVIEW */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full z-10">
        <GlassPanel className="w-full aspect-video flex overflow-hidden border border-white/20 p-0 shadow-2xl shadow-[#8A2BE2]/20">
          <div className="w-64 border-r border-white/10 p-6 flex flex-col gap-6 bg-white/[0.01]">
            <div className="h-6 w-32 bg-white/10 rounded-md"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded bg-white/10"></div>
                  <div className="h-4 w-24 bg-white/10 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 p-8 flex flex-col gap-8 bg-white/[0.01]">
            <div className="flex justify-between items-center">
              <div className="h-8 w-48 bg-white/10 rounded-md"></div>
              <div className="h-8 w-32 bg-[#8A2BE2]/50 rounded-md border border-[#8A2BE2]"></div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
                   <div className="h-4 w-1/2 bg-white/10 rounded"></div>
                   <div className="h-8 w-1/3 bg-white/20 rounded"></div>
                </div>
              ))}
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-6">
               <div className="h-4 w-1/4 bg-white/10 rounded mb-6"></div>
               <div className="space-y-4">
                 {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-12 w-full bg-white/5 rounded-lg border border-white/10"></div>
                 ))}
               </div>
            </div>
          </div>
        </GlassPanel>
      </section>

      {/* SECTION 4: TRUST + CTA */}
      <section className="py-24 px-6 text-center z-10 flex flex-col items-center justify-center min-h-[40vh]">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Built for Modern CA Firms</h2>
        <GradientButton className="text-lg px-12 py-8 rounded-2xl">
          Start Your Execution Engine
        </GradientButton>
      </section>
    </div>
  );
}

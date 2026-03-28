"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Sparkles, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/store/useAppStore";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { AuroraBackground } from "@/components/global/aurora-background";
import { GlassCard } from "@/components/global/glass-card";
import { GradientButton } from "@/components/global/gradient-button";

export default function WelcomePage() {
  const router = useRouter();
  const supabase = createClient();
  const { user, setUser } = useAppStore();
  const { setCurrentStep } = useOnboardingStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          router.push("/login");
          return;
        }

        // Initialize onboarding step
        setCurrentStep(0);

        // Fetch profile if not in store
        if (!user) {
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profileError) {
            toast.error("Failed to load your profile. Please try refreshing.");
            console.error("Profile fetch error:", profileError);
          } else {
            setUser({
              id: profile.id,
              full_name: profile.full_name,
              email: profile.email,
              role: profile.role,
              firm_id: profile.firm_id,
            });
          }
        }
      } catch (error) {
        console.error("Welcome page auth error:", error);
        toast.error("An unexpected error occurred.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router, supabase, setUser, user, setCurrentStep]);

  const handleGetStarted = () => {
    router.push("/onboarding/firm");
  };

  if (isLoading) {
    return (
      <AuroraBackground className="flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
      </AuroraBackground>
    );
  }

  return (
    <AuroraBackground className="flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[650px] text-center"
      >
        <GlassCard className="p-10 md:p-16 space-y-12 backdrop-blur-[50px] border-white/10 relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.7)] group">
          {/* Animated Gradient Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500 opacity-70 group-hover:opacity-100 transition-opacity" />

          {/* Icon Animation */}
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
              <div className="relative p-6 bg-white/5 rounded-[32px] border border-white/15 backdrop-blur-2xl shadow-inner">
                <Sparkles className="w-16 h-16 text-white group-hover:text-cyan-300 transition-colors" />
              </div>
            </motion.div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-6">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-[800] text-white tracking-tight leading-tight"
            >
              Welcome, <span className="text-gradient">{user?.full_name?.split(' ')[0] || "User"}</span>!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white/65 font-medium text-lg md:text-xl leading-relaxed max-w-[480px] mx-auto"
            >
              Supercharge your CA firm with <span className="text-white font-bold">Kexza AI</span> – your digital article clerk and execution intelligence assistant.
            </motion.p>
          </div>

          {/* Action Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="pt-4"
          >
            <GradientButton 
              onClick={handleGetStarted}
              className="h-16 px-12 text-xl font-bold group"
            >
              <div className="flex items-center justify-center gap-3">
                Get Started
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </GradientButton>
          </motion.div>

          {/* Trust Badge */}
          <div className="pt-10 flex items-center justify-center gap-4 border-t border-white/5 opacity-40">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase">Enterprise-Grade Security</span>
          </div>

          {/* Decorative Corner Glows */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl" />
        </GlassCard>

        {/* Floating background details */}
        <div className="absolute -z-10 top-[10%] -left-[15%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -z-10 bottom-[10%] -right-[15%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
      </motion.div>
    </AuroraBackground>
  );
}

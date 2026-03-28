"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, RefreshCw, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/store/useAppStore";
import { GlassCard } from "@/components/global/glass-card";
import { GradientButton } from "@/components/global/gradient-button";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const supabase = createClient();
  const { user } = useAppStore();

  // Redirect if already verified
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user?.email_confirmed_at) {
        toast.success("Email already verified! Redirecting...");
        router.push("/dashboard");
        return;
      }

      // Also check our profiles table just in case
      if (session?.user?.id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("id", session.user.id)
          .single();
          
        if (profile && session.user.email_confirmed_at) {
          router.push("/dashboard");
        }
      }
    };

    checkSession();
  }, [router, supabase]);

  const handleResend = async () => {
    const email = user?.email || (await supabase.auth.getUser()).data.user?.email;
    
    if (!email) {
      toast.error("No email address found. Please try logging in again.");
      return;
    }

    setIsResending(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        toast.error(error.message || "Failed to resend verification email.");
      } else {
        toast.success("Verification email resent successfully!");
      }
    } catch (err) {
      console.error("Resend error:", err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[500px] text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <GlassCard className="p-10 md:p-14 space-y-10 backdrop-blur-[40px] border-white/10 relative overflow-visible shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
            {/* Top Highlight Wrapper */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            {/* Icon Section */}
            <div className="flex justify-center relative">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 to-cyan-400/30 rounded-[32px] blur-3xl animate-pulse" />
                <div className="relative p-8 bg-white/5 rounded-[32px] border border-white/15 backdrop-blur-2xl shadow-inner group-hover:border-white/25 transition-colors duration-500">
                  <Mail className="h-16 w-16 text-white opacity-90" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="absolute -top-3 -right-3 bg-[#0D0D0D] p-1.5 rounded-full border border-white/10 shadow-lg"
                  >
                    <div className="bg-gradient-to-br from-cyan-400 to-blue-600 p-1 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              <h1 className="text-4xl font-[800] text-white tracking-tight leading-tight">
                Verify Your <span className="text-gradient">Email</span>
              </h1>
              <div className="space-y-3">
                <p className="text-white/65 font-medium text-lg leading-relaxed">
                  We've sent a verification link to your email. 
                  {user?.email && (
                    <span className="block mt-1 text-cyan-400/90 font-bold tracking-tight">
                      {user.email}
                    </span>
                  )}
                </p>
                <p className="text-white/50 text-sm font-medium">
                  Please check your inbox and click the link to continue.
                </p>
              </div>
            </div>

            {/* Interaction Section */}
            <div className="pt-4 space-y-6">
              <GradientButton 
                onClick={handleResend}
                className="w-full h-14 text-lg group"
                disabled={isResending}
              >
                {isResending ? (
                  <RefreshCw className="h-6 w-6 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    Resend Verification Email
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </GradientButton>

              <div className="flex items-center justify-center gap-2">
                <p className="text-white/40 text-sm font-medium">
                  Already verified?
                </p>
                <Link 
                  href="/login" 
                  className="text-white hover:text-cyan-400 font-bold text-sm underline underline-offset-4 decoration-white/20 hover:decoration-cyan-400/50 transition-all"
                >
                  Log in
                </Link>
              </div>
            </div>

            {/* Troubleshooting Info */}
            <div className="pt-8 border-t border-white/5 text-[12px] text-white/30 font-medium leading-relaxed">
              Didn't see it? Check your spam folder or wait a few minutes. 
              If the problem persists, contact our support team.
            </div>
          </GlassCard>
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="absolute -top-[5%] -left-[10%] w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-[5%] -right-[10%] w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
      </motion.div>
    </div>
  );
}

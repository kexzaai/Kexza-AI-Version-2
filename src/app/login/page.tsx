"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Mail, Lock, ArrowRight } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { useAppStore } from "@/store/useAppStore";
import { GlassCard } from "@/components/global/glass-card";
import { GlowButton } from "@/components/global/glow-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setFirm } = useAppStore();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        toast.error(authError.message || "Invalid credentials. Please try again.");
        setIsLoading(false);
        return;
      }

      if (authData.user) {
        // Fetch additional user info from our 'profiles' table
        const { data: userData, error: userError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authData.user.id)
          .single();

        if (userError) {
          console.error("Error fetching user profile:", userError);
          // Still proceed if auth succeeded, but we might lack role/firm info
          setUser({
            id: authData.user.id,
            full_name: authData.user.user_metadata?.full_name || "User",
            email: authData.user.email!,
            role: "staff", // Default fallback
            firm_id: null,
          });
        } else {
          setUser({
            id: userData.id,
            full_name: userData.full_name,
            email: userData.email,
            role: userData.role as "owner" | "admin" | "staff",
            firm_id: userData.firm_id,
          });

          // If they have a firm, maybe fetch firm data too?
          if (userData.firm_id) {
            const { data: firmData } = await supabase
              .from("firms")
              .select("*")
              .eq("id", userData.firm_id)
              .single();
            if (firmData) setFirm(firmData);
          }
        }

        toast.success("Welcome back to Kexza AI!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Kexza AI
          </h1>
          <p className="text-white/60 font-medium">
            Execution Intelligence for CA Firms
          </p>
        </div>

        <GlassCard className="relative overflow-hidden border-white/10 shadow-2xl backdrop-blur-3xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">Login</h2>
              <p className="text-sm text-white/50">
                Enter your credentials to access your workspace
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/70">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@firm.com"
                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-purple-500/50"
                    {...register("email")}
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white/70">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-purple-500/50"
                    {...register("password")}
                    disabled={isLoading}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
                )}
              </div>

              <GlowButton
                type="submit"
                className="w-full h-12 mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </GlowButton>
            </form>

            <div className="text-center pt-4 border-t border-white/5">
              <p className="text-sm text-white/40">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none" />
      </motion.div>
    </div>
  );
}

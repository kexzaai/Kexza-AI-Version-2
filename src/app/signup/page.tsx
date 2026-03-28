"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { 
  Loader2, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  CheckCircle2
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { signupSchema, type SignupFormData } from "@/lib/validations";
import { GlassCard } from "@/components/global/glass-card";
import { GradientButton } from "@/components/global/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

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

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    const toastId = toast.loading("Creating your executive workspace...");
    
    try {
      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
          },
        },
      });

      if (authError) {
        toast.error(authError.message || "Failed to create account.", { id: toastId });
        setIsLoading(false);
        return;
      }

      if (authData.user) {
        // 2. Create user profile in 'profiles' table
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: authData.user.id,
              full_name: data.name,
              email: data.email,
              role: "owner",
              firm_id: null,
            },
          ]);

        if (profileError) {
          console.error("Error creating user profile:", profileError);
          // Non-blocking but logged
        }

        toast.success("Signup successful! Check your email to verify your account.", { id: toastId });
        
        // 3. Redirect to verify-email
        router.push("/verify-email");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 py-12 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[550px]"
      >
        <div className="mb-10 text-center space-y-3">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block p-3 rounded-2xl bg-white/5 border border-white/10 mb-2 backdrop-blur-xl"
          >
            <ShieldCheck className="w-8 h-8 text-cyan-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-[800] tracking-tight text-white">
            Kexza <span className="text-gradient">AI</span>
          </h1>
          <p className="text-white/65 font-medium text-lg leading-relaxed">
            Propel your firm into the future of <br className="hidden md:block" /> execution intelligence.
          </p>
        </div>

        <GlassCard className="relative overflow-visible border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-[40px] p-8 md:p-10">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
              <p className="text-white/45 font-medium">
                Step into a world of automated compliance and clarity.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/70 font-semibold ml-1">Full Name</Label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="e.g. CA Arun Sharma"
                      className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20 rounded-xl transition-all"
                      {...register("name")}
                      disabled={isLoading}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400 font-medium absolute -bottom-5 left-1">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/70 font-semibold ml-1">Work Email</Label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-cyan-400 transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="arun@kexza.ai"
                      className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20 rounded-xl transition-all"
                      {...register("email")}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 font-medium absolute -bottom-5 left-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2 pt-2">
                <Label htmlFor="password" className="text-white/70 font-semibold ml-1">Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-pink-400 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 high-security characters"
                    className="pl-11 pr-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:border-pink-500/50 focus-visible:ring-pink-500/20 rounded-xl transition-all"
                    {...register("password")}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  {errors.password && (
                    <p className="text-[11px] text-red-400 font-medium absolute -bottom-5 left-1">{errors.password.message}</p>
                  )}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 pt-2">
                <Label htmlFor="confirmPassword" className="text-white/70 font-semibold ml-1">Confirm Password</Label>
                <div className="relative group">
                  <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-cyan-400 transition-colors" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repeat password"
                    className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20 rounded-xl transition-all"
                    {...register("confirmPassword")}
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && (
                    <p className="text-[11px] text-red-400 font-medium absolute -bottom-5 left-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <div className="pt-8 w-full group">
                <GradientButton
                  type="submit"
                  className="w-full h-14 text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Start Your Execution Engine
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </GradientButton>
              </div>
            </form>

            <div className="text-center pt-2">
              <p className="text-white/40 font-medium text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-white hover:text-cyan-400 underline underline-offset-4 decoration-white/20 transition-all font-bold"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* Progress bar visual indicator */}
          <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 w-full opacity-60" />
        </GlassCard>

        {/* Brand Trust Footer */}
        <p className="text-center mt-8 text-[12px] text-white/30 font-medium tracking-widest uppercase">
          Trusted by Top-Tier CA Firms & Enterprises
        </p>

        {/* Decorative elements */}
        <div className="absolute top-[20%] -left-[15%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] -right-[15%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
      </motion.div>
    </div>
  );
}

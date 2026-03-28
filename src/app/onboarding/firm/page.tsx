"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { 
  Building2, 
  MapPin, 
  FileText, 
  ArrowRight, 
  Loader2,
  CheckCircle2
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { firmSchema, type FirmFormData } from "@/lib/validations";
import { firmsService } from "@/services/firmsService";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { useAppStore } from "@/store/useAppStore";
import { AuroraBackground } from "@/components/global/aurora-background";
import { GlassCard } from "@/components/global/glass-card";
import { GradientButton } from "@/components/global/gradient-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function FirmOnboardingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const { setFirm, setCurrentStep, setAddress, setGstin } = useOnboardingStore();
  const { setUser, user } = useAppStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FirmFormData>({
    resolver: zodResolver(firmSchema),
    defaultValues: {
      name: "",
      address: "",
      gstin: "",
    },
  });

  useEffect(() => {
    // Set onboarding step
    setCurrentStep(1);

    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router, supabase, setCurrentStep]);

  const onSubmit = async (data: FirmFormData) => {
    setIsLoading(true);
    const toastId = toast.loading("Registrating your firm...");

    try {
      const firm = await firmsService.createFirm(data);
      
      // Update store
      setFirm({ id: firm.id, name: firm.name });
      setAddress(firm.address);
      if (firm.gstin) setGstin(firm.gstin);

      // Update global user store with new firm_id
      if (user) {
        setUser({ ...user, firm_id: firm.id });
      }

      toast.success("Firm registered successfully!", { id: toastId });
      
      // Navigate to next step
      router.push("/onboarding/team");
    } catch (error: any) {
      console.error("Firm onboarding error:", error);
      toast.error(error.message || "Failed to create firm. Please try again.", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuroraBackground className="flex items-center justify-center p-4 py-12 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[600px]"
      >
        <div className="mb-8 text-center space-y-3">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">Step 1 of 3: Organization</span>
            </div>
          </div>
          <h1 className="text-4xl font-[800] tracking-tight text-white leading-tight">
            Set up your <span className="text-gradient">Firm</span>
          </h1>
          <p className="text-white/60 font-medium text-lg">
            Create your firm's profile to begin <br /> delegating to your AI Clerk.
          </p>
        </div>

        <GlassCard className="relative overflow-visible border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-[40px] p-8 md:p-12">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Firm Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/70 font-semibold ml-1">Firm Name</Label>
              <div className="relative group">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-purple-400 transition-colors" />
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g. Khanna & Associates"
                  className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:border-purple-500/50 focus-visible:ring-purple-500/20 rounded-xl transition-all"
                  {...register("name")}
                  disabled={isLoading}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-400 font-medium ml-1">{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white/70 font-semibold ml-1">Office Address</Label>
              <div className="relative group">
                <MapPin className="absolute left-3.5 top-4 h-4 w-4 text-white/30 group-focus-within:text-cyan-400 transition-colors" />
                <Textarea
                  id="address"
                  placeholder="Enter your registered office address"
                  className="pl-11 min-h-[100px] bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20 rounded-xl transition-all resize-none font-medium text-sm leading-relaxed pt-3"
                  {...register("address")}
                  disabled={isLoading}
                />
              </div>
              {errors.address && (
                <p className="text-xs text-red-400 font-medium ml-1">{errors.address.message}</p>
              )}
            </div>

            {/* GSTIN */}
            <div className="space-y-2">
              <Label htmlFor="gstin" className="text-white/70 font-semibold ml-1">GSTIN (Optional)</Label>
              <div className="relative group">
                <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within:text-pink-400 transition-colors" />
                <Input
                  id="gstin"
                  type="text"
                  placeholder="e.g. 07AAAAA0000A1Z5"
                  className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:border-pink-500/50 focus-visible:ring-pink-500/20 rounded-xl transition-all"
                  {...register("gstin")}
                  disabled={isLoading}
                />
              </div>
              {errors.gstin && (
                <p className="text-xs text-red-400 font-medium ml-1">{errors.gstin.message}</p>
              )}
            </div>

            <div className="pt-6">
              <GradientButton
                type="submit"
                className="w-full h-14 text-lg font-bold group"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Continue to Team Setup
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </GradientButton>
            </div>
          </form>

          {/* Bottom Accent Decor */}
          <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-500/30 via-cyan-400/30 to-pink-500/30 blur-sm" />
        </GlassCard>

        {/* Floating background details */}
        <div className="absolute -z-10 top-[20%] -left-[10%] w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -z-10 bottom-[20%] -right-[10%] w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[100px] pointer-events-none" />
      </motion.div>
    </AuroraBackground>
  );
}

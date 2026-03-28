"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const GlassNavbar = ({ className }: { className?: string }) => {
  return (
    <nav className={cn("fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 glass-panel py-3 px-6 flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Kexza <span className="text-gradient">AI</span>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/70">
        <Link href="/features" className="hover:text-white transition-colors">Features</Link>
        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/login" className="text-white hover:bg-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          Log in
        </Link>
        <Link href="/signup" className="btn-gradient px-5 py-2 text-sm font-semibold rounded-lg hover:brightness-110 transition-all">
          Get Started
        </Link>
      </div>
    </nav>
  );
};

"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LayoutDashboard, Users, CheckSquare, ShieldCheck, FileText, BrainCircuit, BarChart, Settings, HelpCircle } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/clients", icon: Users, label: "Clients" },
  { href: "/tasks", icon: CheckSquare, label: "Tasks" },
  { href: "/compliance", icon: ShieldCheck, label: "Compliance" },
  { href: "/documents", icon: FileText, label: "Documents" },
  { href: "/ai", icon: BrainCircuit, label: "AI Clerk" },
  { href: "/reports", icon: BarChart, label: "Reports" },
];

export const SidebarGlass = ({ className }: { className?: string }) => {
  return (
    <aside className={cn("hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 glass-panel rounded-none border-y-0 border-l-0 p-4 z-40", className)}>
      <div className="mb-8 px-2 mt-4">
        <Link href="/dashboard" className="text-2xl font-bold text-white tracking-tight">
          Kexza <span className="text-gradient">AI</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <item.icon className="w-5 h-5 text-white/50" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-auto space-y-1 pt-4 border-t border-white/10">
        <Link href="/settings/profile" className="flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
        <Link href="/help" className="flex items-center gap-3 px-3 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Support</span>
        </Link>
      </div>
    </aside>
  );
};

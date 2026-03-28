"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const GlowButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn("btn-glass px-8 py-6 text-md font-semibold", className)}
        {...props}
      />
    );
  }
);
GlowButton.displayName = "GlowButton";

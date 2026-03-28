"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const GradientButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn("btn-gradient border-0 px-8 py-6 text-md font-bold", className)}
        {...props}
      />
    );
  }
);
GradientButton.displayName = "GradientButton";

"use client";

import * as React from "react";
import { Shield, Lock, Server, Cloud, Cpu, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrustBar() {
  const logos = [
    { icon: Shield, name: "SecureCorp" },
    { icon: Lock, name: "AuthZero" },
    { icon: Server, name: "DataVault" },
    { icon: Cloud, name: "CloudDefend" },
    { icon: Cpu, name: "AIArmor" },
    { icon: Database, name: "TrustNode" },
  ];

  // Duplicate for seamless marquee effect
  const marqueeLogos = [...logos, ...logos];

  return (
    <section className="py-12 border-y border-border bg-surface/50 overflow-hidden relative">
      <div className="container mx-auto px-4 text-center mb-8">
        <p className="text-sm font-medium text-muted uppercase tracking-widest">
          Trusted by security leaders from teams at
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        
        {/* Left/Right Fades */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-1/4 md:w-1/3 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-1/4 md:w-1/3 bg-gradient-to-l from-background to-transparent"></div>

        {/* Marquee Track */}
        <div className="flex w-max animate-marquee hover:animate-pause items-center gap-16 px-8">
          {marqueeLogos.map((logo, i) => {
            const Icon = logo.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              >
                <Icon className="w-6 h-6 text-foreground" />
                <span className="font-mono text-xl font-bold text-foreground">
                  {logo.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

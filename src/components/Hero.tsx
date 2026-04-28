"use client";

import * as React from "react";
import { Button } from "./ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden text-center">
      {/* Background Waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-15">
        <svg 
          className="absolute w-full h-full" 
          viewBox="0 0 1440 800" 
          preserveAspectRatio="xMidYMid slice" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
              <stop offset="20%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="1" />
              <stop offset="80%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g stroke="url(#wave-gradient)" strokeWidth="1" fill="none">
            {Array.from({ length: 60 }).map((_, i) => {
              const y = i * 16;
              const curve = Math.sin(i * 0.1) * 200;
              return (
                <path 
                  key={`wave1-${i}`} 
                  d={`M -100 ${y - 100} C 400 ${y + curve}, 1000 ${y - curve}, 1540 ${y + 100}`} 
                />
              );
            })}
            {Array.from({ length: 60 }).map((_, i) => {
              const y = i * 16;
              const curve = Math.cos(i * 0.15) * 250;
              return (
                <path 
                  key={`wave2-${i}`} 
                  d={`M -100 ${y} C 500 ${y - curve + 100}, 900 ${y + curve}, 1540 ${y - 100}`} 
                />
              );
            })}
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-4xl flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-background/50 backdrop-blur-sm mb-10 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          <span className="text-xs md:text-sm font-semibold text-muted">Control Fabric for Autonomous Agents</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-foreground leading-[1.1]">
          Stop AI agents from <span className="text-primary">going<br/>rogue.</span>
        </h1>

        {/* Subtext */}
        <p className="text-base md:text-lg lg:text-xl text-muted leading-relaxed max-w-3xl mb-12 font-medium">
          ArmorIQ is the control fabric harness for autonomous agents, sitting between AI Agents and Governance Domains, intercepting plans, routing to the safest mix of agents and tools, and enforcing policy before a single action runs.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Button size="lg" className="w-full sm:w-auto px-10 text-base shadow-none">Book a Demo</Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto px-10 text-base bg-background shadow-none">View Docs</Button>
        </div>
      </div>
    </section>
  );
}

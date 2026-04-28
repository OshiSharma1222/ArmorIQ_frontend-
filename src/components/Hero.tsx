"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "./ui/Button";

export function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shieldRef = React.useRef<SVGSVGElement>(null);
  const terminalRef = React.useRef<HTMLDivElement>(null);
  const cursorRef = React.useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // Shield Assembly Animation
    const shieldPaths = gsap.utils.toArray<SVGPathElement>(".shield-path");
    
    gsap.set(shieldPaths, { strokeDasharray: 1000, strokeDashoffset: 1000 });
    
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(shieldPaths, {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.2,
      ease: "power2.inOut",
    })
    .to(".shield-glow", {
      opacity: 0.5,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1")
    .fromTo(".particle", {
      y: -50,
      opacity: 0,
    }, {
      y: 150,
      keyframes: [
        { opacity: 1, duration: 0.5 },
        { opacity: 1, duration: 1 },
        { opacity: 0, duration: 0.5 }
      ],
      duration: 2,
      stagger: {
        each: 0.4,
        repeat: -1,
      },
      ease: "none",
    }, "-=1.5")
    .to(".particle-blocked", {
      fill: "var(--color-accent-red)",
      scale: 1.5,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    }, "-=0.5");

    // Terminal Typing Animation
    const textLines = [
      "> agent.execute(\"access billing data\")",
      "Action blocked: exceeds delegated authority",
      "> agent.execute(\"summarize emails\")",
      "Intent verified. Executing..."
    ];
    
    const terminalEl = terminalRef.current;
    if (terminalEl) {
      let currentText = "";
      const textTimeline = gsap.timeline({ delay: 1 });
      
      textLines.forEach((line, i) => {
        const isError = i === 1;
        const isSuccess = i === 3;
        
        textTimeline.to({}, {
          duration: line.length * 0.05,
          onUpdate: function() {
            const progress = this.progress();
            const chars = Math.floor(progress * line.length);
            
            let html = currentText + `<div class="${isError ? 'text-accent-red' : isSuccess ? 'text-accent-green' : 'text-foreground'}">${line.substring(0, chars)}</div>`;
            terminalEl.innerHTML = html;
          },
          onComplete: () => {
            currentText += `<div class="${isError ? 'text-accent-red' : isSuccess ? 'text-accent-green' : 'text-foreground'}">${line}</div>`;
          }
        });
        
        if (i < textLines.length - 1) {
          textTimeline.to({}, { duration: 0.5 }); // Pause between lines
        }
      });
    }

    // Blinking Cursor
    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "steps(1)"
    });

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col gap-8 max-w-2xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Control what your AI agents <span className="text-primary">actually do.</span>
            </h1>
            
            <p className="text-xl text-muted leading-relaxed">
              ArmorIQ sits between your Agents and Governance Domains, intercepting intent, enforcing policy, and ensuring every action belongs to an approved purpose.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-base">Start Enforcing</Button>
              <Button size="lg" variant="outline" className="text-base">View Documentation</Button>
            </div>
            
            {/* Terminal Widget */}
            <div className="mt-4 p-4 rounded-lg bg-surface border border-border font-mono text-sm relative overflow-hidden shadow-xl">
              <div className="flex gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-accent-red"></div>
                <div className="w-3 h-3 rounded-full bg-accent-blue"></div>
                <div className="w-3 h-3 rounded-full bg-accent-green"></div>
              </div>
              <div className="flex">
                <div ref={terminalRef} className="flex-1"></div>
                <span ref={cursorRef} className="inline-block w-2 h-4 bg-primary ml-1 translate-y-1"></span>
              </div>
            </div>
          </div>
          
          {/* Right Content - Shield Animation */}
          <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center">
            {/* Ambient Glow */}
            <div className="shield-glow absolute inset-0 bg-primary-glow rounded-full blur-[100px] opacity-0"></div>
            
            <svg 
              ref={shieldRef}
              viewBox="0 0 400 400" 
              className="w-full max-w-[400px] drop-shadow-2xl"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer Shield Outline */}
              <path 
                className="shield-path"
                d="M200 40L60 100V220C60 300 120 360 200 380C280 360 340 300 340 220V100L200 40Z" 
                stroke="var(--color-primary)" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              
              {/* Inner Shield Lines */}
              <path 
                className="shield-path"
                d="M200 80L100 120V200C100 260 140 310 200 330C260 310 300 260 300 200V120L200 80Z" 
                stroke="var(--color-border)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              
              <path 
                className="shield-path"
                d="M200 40V380" 
                stroke="var(--color-border)" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeDasharray="4 4"
              />
              
              <path 
                className="shield-path"
                d="M60 160H340" 
                stroke="var(--color-border)" 
                strokeWidth="2" 
                strokeLinecap="round"
                strokeDasharray="4 4"
              />

              {/* Animated Particles flowing down */}
              <circle className="particle" cx="150" cy="100" r="4" fill="var(--color-accent-green)" />
              <circle className="particle particle-blocked" cx="200" cy="120" r="5" fill="var(--color-primary)" />
              <circle className="particle" cx="250" cy="80" r="4" fill="var(--color-accent-green)" />
              
            </svg>
          </div>
          
        </div>
      </div>
    </section>
  );
}

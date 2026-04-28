"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ShieldAlert, ShieldCheck, ArrowRight, Bot, Database } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Problem() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Problem Diagram Animation
    const problemTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".problem-diagram",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    problemTl.fromTo(".bad-agent", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 })
             .fromTo(".bad-resource", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "<")
             .fromTo(".bad-arrow", { width: 0, opacity: 0 }, { width: 100, opacity: 1, duration: 0.5 })
             .to(".bad-arrow", { stroke: "var(--color-accent-red)", duration: 0.2 })
             .fromTo(".bad-alert", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out" });

    // Solution Diagram Animation
    const solutionTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".solution-diagram",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    });

    solutionTl.fromTo(".good-agent", { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 })
              .fromTo(".good-resource", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 }, "<")
              .fromTo(".good-shield", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out" }, "-=0.2")
              .fromTo(".good-arrow-1", { width: 0, opacity: 0 }, { width: 40, opacity: 1, duration: 0.3 })
              .to(".good-shield", { scale: 1.1, duration: 0.1, yoyo: true, repeat: 1 })
              .fromTo(".good-arrow-2", { width: 0, opacity: 0 }, { width: 40, opacity: 1, duration: 0.3 })
              .fromTo(".good-check", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out" });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="manifesto" className="py-24 bg-background relative border-b border-border">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Authenticated doesn't mean <span className="text-primary">aligned.</span>
          </h2>
          <p className="text-xl text-muted leading-relaxed">
            Your agents can have valid credentials and still act outside the task they were given. ArmorIQ ensures every action belongs to an approved purpose.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Problem Side */}
          <div className="problem-diagram p-8 rounded-2xl bg-surface border border-border flex flex-col items-center gap-8 shadow-sm">
            <h3 className="text-xl font-semibold text-muted">Without ArmorIQ</h3>
            
            <div className="flex items-center justify-center w-full gap-4 relative py-8">
              <div className="bad-agent flex flex-col items-center gap-2 z-10">
                <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center">
                  <Bot className="w-8 h-8 text-foreground" />
                </div>
                <span className="text-sm font-mono text-muted">AI Agent</span>
              </div>

              {/* Arrow container */}
              <div className="relative w-[100px] h-8 flex items-center justify-center z-0">
                <svg width="100" height="20" className="bad-arrow absolute top-1/2 -translate-y-1/2">
                  <path d="M0 10L90 10" stroke="var(--color-border)" strokeWidth="4" strokeDasharray="4 4" />
                  <path d="M85 5L95 10L85 15" fill="var(--color-border)" />
                </svg>
                
                <div className="bad-alert absolute -top-8 bg-accent-red/20 text-accent-red border border-accent-red/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 whitespace-nowrap">
                  <ShieldAlert className="w-3 h-3" />
                  Intent Drift
                </div>
              </div>

              <div className="bad-resource flex flex-col items-center gap-2 z-10">
                <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center">
                  <Database className="w-8 h-8 text-foreground" />
                </div>
                <span className="text-sm font-mono text-muted">Sensitive Data</span>
              </div>
            </div>
            
            <p className="text-sm text-center text-muted mt-4">
              Agent uses valid IAM roles to read billing data when only asked for customer name. <span className="text-accent-red font-semibold block mt-1">IAM allows this.</span>
            </p>
          </div>

          {/* Solution Side */}
          <div className="solution-diagram p-8 rounded-2xl bg-card border border-primary/30 shadow-[0_0_30px_rgba(224,123,76,0.1)] flex flex-col items-center gap-8">
            <h3 className="text-xl font-semibold text-primary">With ArmorIQ</h3>
            
            <div className="flex items-center justify-center w-full gap-2 relative py-8">
              <div className="good-agent flex flex-col items-center gap-2 z-10">
                <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center">
                  <Bot className="w-8 h-8 text-foreground" />
                </div>
                <span className="text-sm font-mono text-muted">AI Agent</span>
              </div>

              <div className="relative w-[40px] h-8 flex items-center justify-center z-0">
                 <svg width="40" height="20" className="good-arrow-1 absolute top-1/2 -translate-y-1/2">
                  <path d="M0 10L35 10" stroke="var(--color-primary)" strokeWidth="4" />
                </svg>
              </div>

              <div className="good-shield z-20 bg-background rounded-full p-1 shadow-lg shadow-primary-glow">
                 <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                   <ShieldCheck className="w-8 h-8 text-white" />
                 </div>
              </div>

              <div className="relative w-[40px] h-8 flex items-center justify-center z-0">
                 <svg width="40" height="20" className="good-arrow-2 absolute top-1/2 -translate-y-1/2">
                  <path d="M0 10L30 10" stroke="var(--color-border)" strokeWidth="4" strokeDasharray="4 4" />
                  <path d="M25 5L35 10L25 15" fill="var(--color-border)" />
                </svg>

                <div className="good-check absolute -top-8 bg-primary-glow text-primary border border-primary/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 whitespace-nowrap">
                  Blocked
                </div>
              </div>

              <div className="good-resource flex flex-col items-center gap-2 z-10 opacity-50">
                <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center">
                  <Database className="w-8 h-8 text-foreground" />
                </div>
                <span className="text-sm font-mono text-muted">Sensitive Data</span>
              </div>
            </div>

            <p className="text-sm text-center text-muted mt-4">
              ArmorIQ intercepts the action, checks against declared intent, and blocks the unauthorized request. <span className="text-primary font-semibold block mt-1">ArmorIQ says no.</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

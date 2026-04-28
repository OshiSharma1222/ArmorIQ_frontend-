"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BrainCircuit, Eye, Lock, Map, FileSearch, Code2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/Card";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Platform() {
  const sectionRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".bento-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bento-grid",
          start: "top 85%",
        },
      }
    );
  }, { scope: sectionRef });

  const products = [
    {
      id: "intent-engine",
      title: "Intent Engine",
      description: "Define what your agents can do. Set boundaries. Enforce them automatically before execution.",
      icon: BrainCircuit,
      className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-surface to-background border-primary/20 hover:border-primary/50",
      isFeatured: true,
    },
    {
      id: "sentry",
      title: "Sentry",
      description: "See every agent action in real time. Get alerts when agents approach their limits.",
      icon: Eye,
      className: "md:col-span-1",
    },
    {
      id: "gatekeeper",
      title: "Gatekeeper",
      description: "Control which agents can access which resources. Like IAM, but for AI behavior.",
      icon: Lock,
      className: "md:col-span-1",
    },
    {
      id: "registry",
      title: "Registry",
      description: "One dashboard for all your agents. Know what's deployed, where, and what it can do.",
      icon: Map,
      className: "md:col-span-1",
    },
    {
      id: "auditor",
      title: "Auditor",
      description: "Automatic audit logs for every agent decision. SOC2, GDPR, and NIST ready.",
      icon: FileSearch,
      className: "md:col-span-2 lg:col-span-1",
    },
    {
      id: "armorclaw",
      title: "ArmorClaw",
      description: "Intent Assurance for OpenClaw agents. Cryptographic verification at every step.",
      icon: Code2,
      className: "md:col-span-3 lg:col-span-2",
    },
  ];

  return (
    <section ref={sectionRef} id="products" className="py-24 bg-surface/30 relative">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            Everything you need to safely run AI agents in production.
          </h2>
          <p className="text-xl text-muted">
            A complete platform for agent intent enforcement, monitoring, and compliance.
          </p>
        </div>

        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {products.map((product) => {
            const Icon = product.icon;
            return (
              <Card 
                key={product.id}
                className={cn(
                  "bento-card group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary-glow/20 bg-background/50 backdrop-blur-sm",
                  product.className
                )}
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="h-full flex flex-col justify-between relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-surface flex items-center justify-center mb-4 group-hover:scale-110 group-hover:text-primary transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className={cn("mb-2", product.isFeatured ? "text-2xl font-bold" : "text-lg font-semibold")}>
                      {product.title}
                    </CardTitle>
                    <CardDescription className={product.isFeatured ? "text-base" : "text-sm"}>
                      {product.description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

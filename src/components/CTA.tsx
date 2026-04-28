"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    // Reduce particle count on smaller screens for performance
    const isMobile = width < 768;
    const numParticles = isMobile ? 30 : 80;
    
    const particles: {x: number, y: number, vx: number, vy: number}[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    const primaryColor = "rgba(224, 123, 76, 0.5)"; // --primary
    const connectionColor = "rgba(224, 123, 76, 0.15)";

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update & Draw Particles
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = primaryColor;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxDist = isMobile ? 80 : 120;
          
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(224, 123, 76, ${0.15 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
    };

    gsap.ticker.add(render);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative py-32 bg-background overflow-hidden border-t border-border">
      {/* Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-glow rounded-[100%] blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight max-w-3xl mx-auto">
          Ready to control what your AI agents <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff9b6d]">actually do?</span>
        </h2>
        
        <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
          Join the teams building safer, compliant AI agent deployments. It's not about Identity, It's about Intent.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto text-base group">
            Book a Demo
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-base bg-background/50 backdrop-blur-sm">
            Read Docs
          </Button>
        </div>
      </div>
    </section>
  );
}

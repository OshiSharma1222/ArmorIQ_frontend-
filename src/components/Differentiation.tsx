"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Check, X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Differentiation() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const graphRef = React.useRef<SVGSVGElement>(null);

  useGSAP(() => {
    // Animate Graph Lines on Scroll
    const paths = gsap.utils.toArray<SVGPathElement>(".graph-line");
    
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });
    });

    // Animate table rows staggering in
    gsap.fromTo(".comparison-row", 
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".comparison-table",
          start: "top 80%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-background relative border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Why not just use guardrails or IAM?
          </h2>
          <p className="text-xl text-muted leading-relaxed">
            They solve different problems. ArmorIQ fills the gap none of them cover. Guardrails stop bad responses. ArmorIQ stops bad actions.
          </p>
        </div>

        {/* Live Threat Simulation Graph */}
        <div className="mb-20">
          <div className="p-6 rounded-2xl bg-surface border border-border shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Agent Behavior Analysis</h3>
                <p className="text-sm text-muted">Simulated action volume over time</p>
              </div>
              <div className="flex gap-4 text-sm font-medium">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-accent-red"></span> Unprotected</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-accent-blue"></span> Guardrails Only</div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary"></span> ArmorIQ</div>
              </div>
            </div>

            <div className="relative w-full h-[300px] md:h-[400px]">
              {/* Y Axis Labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-muted pb-6">
                <span>Rogue</span>
                <span>Anomalous</span>
                <span>Normal</span>
              </div>
              
              {/* Graph Area */}
              <div className="absolute left-16 right-0 top-0 bottom-6 border-l border-b border-border">
                {/* Grid Lines */}
                <div className="absolute w-full top-1/3 border-t border-border/50 border-dashed"></div>
                <div className="absolute w-full top-2/3 border-t border-border/50 border-dashed"></div>

                <svg 
                  ref={graphRef} 
                  className="w-full h-full" 
                  preserveAspectRatio="none" 
                  viewBox="0 0 1000 400"
                >
                  {/* Unprotected Line (Erratic, goes into Rogue) */}
                  <path 
                    className="graph-line"
                    d="M 0 350 Q 50 340 100 350 T 200 300 T 300 280 T 400 150 T 450 50 L 500 20 L 550 80 T 650 150 T 750 200 T 850 50 L 900 20 L 1000 100" 
                    fill="none" 
                    stroke="var(--color-accent-red)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Guardrails Only (Better, but still spikes) */}
                  <path 
                    className="graph-line"
                    d="M 0 350 Q 50 345 100 350 T 200 320 T 300 300 T 400 250 T 450 150 Q 500 100 550 200 T 650 250 T 750 280 T 850 150 Q 900 120 1000 200" 
                    fill="none" 
                    stroke="var(--color-accent-blue)" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* ArmorIQ Line (Controlled, stays in Normal/Anomalous threshold) */}
                  <path 
                    className="graph-line"
                    d="M 0 350 Q 50 348 100 350 T 200 340 T 300 330 T 400 320 T 450 310 Q 500 300 550 320 T 650 340 T 750 330 T 850 340 Q 900 350 1000 340" 
                    fill="none" 
                    stroke="var(--color-primary)" 
                    strokeWidth="6" 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Threshold Zone */}
                  <rect x="0" y="0" width="1000" height="133" fill="var(--color-accent-red)" opacity="0.05" />
                  <rect x="0" y="133" width="1000" height="133" fill="var(--color-accent-blue)" opacity="0.05" />
                </svg>
              </div>

              {/* X Axis Labels */}
              <div className="absolute left-16 right-0 bottom-0 flex justify-between text-xs text-muted">
                <span>0s</span>
                <span>30s</span>
                <span>60s</span>
                <span>90s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="comparison-table overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="py-4 px-6 font-semibold text-muted w-1/3">Capability</th>
                <th className="py-4 px-6 font-semibold text-muted text-center">IAM</th>
                <th className="py-4 px-6 font-semibold text-muted text-center">Guardrails</th>
                <th className="py-4 px-6 font-bold text-primary text-center bg-primary/5 rounded-t-lg">ArmorIQ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="comparison-row border-b border-border/50">
                <td className="py-4 px-6">Controls API & Resource Access</td>
                <td className="py-4 px-6 text-center"><Check className="w-5 h-5 mx-auto text-accent-green" /></td>
                <td className="py-4 px-6 text-center"><X className="w-5 h-5 mx-auto text-muted/50" /></td>
                <td className="py-4 px-6 text-center bg-primary/5"><Check className="w-5 h-5 mx-auto text-primary" /></td>
              </tr>
              <tr className="comparison-row border-b border-border/50">
                <td className="py-4 px-6">Validates Prompt/Response Content</td>
                <td className="py-4 px-6 text-center"><X className="w-5 h-5 mx-auto text-muted/50" /></td>
                <td className="py-4 px-6 text-center"><Check className="w-5 h-5 mx-auto text-accent-green" /></td>
                <td className="py-4 px-6 text-center bg-primary/5"><X className="w-5 h-5 mx-auto text-muted/50" /></td>
              </tr>
              <tr className="comparison-row border-b border-border/50">
                <td className="py-4 px-6">Intercepts Cryptographic Intent</td>
                <td className="py-4 px-6 text-center"><X className="w-5 h-5 mx-auto text-muted/50" /></td>
                <td className="py-4 px-6 text-center"><X className="w-5 h-5 mx-auto text-muted/50" /></td>
                <td className="py-4 px-6 text-center bg-primary/5"><Check className="w-5 h-5 mx-auto text-primary" /></td>
              </tr>
              <tr className="comparison-row border-b border-border/50">
                <td className="py-4 px-6">Prevents In-Scope Overreach</td>
                <td className="py-4 px-6 text-center"><X className="w-5 h-5 mx-auto text-muted/50" /></td>
                <td className="py-4 px-6 text-center"><X className="w-5 h-5 mx-auto text-muted/50" /></td>
                <td className="py-4 px-6 text-center bg-primary/5 rounded-b-lg"><Check className="w-5 h-5 mx-auto text-primary" /></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}

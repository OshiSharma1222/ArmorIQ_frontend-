"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Shield } from "lucide-react";

export function PageLoader() {
  const loaderRef = React.useRef<HTMLDivElement>(null);
  const iconRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      iconRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
    )
    .to(iconRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      delay: 0.5,
      ease: "power2.inOut",
    })
    .to(loaderRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        if (loaderRef.current) {
          loaderRef.current.style.display = "none";
        }
      }
    });
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div ref={iconRef} className="flex flex-col items-center gap-4">
        <Shield className="w-16 h-16 text-primary" />
        <span className="font-bold text-2xl tracking-tight text-foreground">ArmorIQ</span>
      </div>
    </div>
  );
}

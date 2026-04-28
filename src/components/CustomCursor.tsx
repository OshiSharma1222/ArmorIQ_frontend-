"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function CustomCursor() {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useGSAP(() => {
    // Only show on desktop devices (coarse pointer = touch)
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    setIsVisible(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center cursor initially but keep hidden
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2;

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        gsap.to(cursor, { opacity: 1, duration: 0.3 });
        hasMoved = true;
      }
      mouse.x = e.x;
      mouse.y = e.y;
    };

    window.addEventListener("mousemove", onMouseMove);

    gsap.ticker.add(() => {
      // Linear interpolation for smooth trailing
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      
      xSet(pos.x);
      ySet(pos.y);
    });

    // Hover effect for links and buttons
    const interactiveElements = document.querySelectorAll("a, button");
    
    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.3, ease: "power2.out" });
    };
    
    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" });
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-6 h-6 rounded-full border-2 border-primary bg-primary/20 pointer-events-none z-[9999] mix-blend-difference hidden md:block opacity-0"
    />
  );
}

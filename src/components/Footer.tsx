"use client";

import * as React from "react";
import Link from "next/link";
import { Shield, ArrowUp, Globe, MessageSquare, Users } from "lucide-react";
import { Button } from "./ui/Button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-6">
              <Shield className="w-8 h-8 text-primary group-hover:text-primary-hover transition-colors" />
              <span className="font-bold text-xl tracking-tight">ArmorIQ</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-6">
              Enterprise-grade security solution for AI agent infrastructure with cryptographically-enforced access policies.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/armoriq" className="text-muted hover:text-foreground transition-colors">
                <Globe className="w-5 h-5" />
              </Link>
              <Link href="https://twitter.com/armoriq" className="text-muted hover:text-foreground transition-colors">
                <MessageSquare className="w-5 h-5" />
              </Link>
              <Link href="https://linkedin.com/company/armoriq" className="text-muted hover:text-foreground transition-colors">
                <Users className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Platform</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="#intent-engine" className="text-sm text-muted hover:text-primary transition-colors">Intent Engine</Link></li>
              <li><Link href="#sentry" className="text-sm text-muted hover:text-primary transition-colors">Sentry</Link></li>
              <li><Link href="#gatekeeper" className="text-sm text-muted hover:text-primary transition-colors">Gatekeeper</Link></li>
              <li><Link href="#registry" className="text-sm text-muted hover:text-primary transition-colors">Registry</Link></li>
              <li><Link href="#auditor" className="text-sm text-muted hover:text-primary transition-colors">Auditor</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="#about-us" className="text-sm text-muted hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#blogs" className="text-sm text-muted hover:text-primary transition-colors">Blogs</Link></li>
              <li><Link href="#events" className="text-sm text-muted hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="#careers" className="text-sm text-muted hover:text-primary transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6">Connect</h4>
            <ul className="flex flex-col gap-3 mb-6">
              <li><Link href="#contact" className="text-sm text-muted hover:text-primary transition-colors">Contact Sales</Link></li>
              <li><Link href="#support" className="text-sm text-muted hover:text-primary transition-colors">Support</Link></li>
            </ul>
            <Button onClick={scrollToTop} variant="secondary" size="icon" className="rounded-full rounded-tr-sm self-start">
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
          
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted">
            Copyright © {new Date().getFullYear()} ArmorIQ. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#privacy" className="text-sm text-muted hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#terms" className="text-sm text-muted hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import * as React from "react";
import gsap from "gsap";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "What is Intent Enforcement?",
    answer: "Intent is the 'job description' for your AI agent. If a user asks an agent to 'summarize my emails,' the intent is email summarization, not accessing your calendar, not sending messages. ArmorIQ enforces that boundary cryptographically."
  },
  {
    question: "How is this different from IAM?",
    answer: "IAM controls who can access a resource. ArmorIQ controls what an agent does once it has access. An agent might have permission to read customer data, but should it read billing data when it was only asked for the customer's name? IAM says yes. ArmorIQ says no."
  },
  {
    question: "What happens when an action is blocked?",
    answer: "The action doesn't execute. The agent receives a clear explanation: 'Action blocked: exceeds delegated authority.' An audit log is created with full context. Your security team gets notified if you've configured alerts."
  },
  {
    question: "Who is ArmorIQ built for?",
    answer: "Security teams, platform engineers, and compliance officers at companies running AI agents in production. If your agents can access data, call APIs, or trigger workflows autonomously, you need intent enforcement."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const contentRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    faqs.forEach((_, i) => {
      const el = contentRefs.current[i];
      if (el) {
        if (i === openIndex) {
          gsap.to(el, { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" });
        } else {
          gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
        }
      }
    });
  }, [openIndex]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-5 gap-12">
          
          <div className="md:col-span-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted">
              Everything you need to know about securing your AI agents with ArmorIQ.
            </p>
          </div>
          
          <div className="md:col-span-3 flex flex-col gap-4">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              
              return (
                <div 
                  key={i} 
                  className={`border border-border rounded-xl bg-background overflow-hidden transition-colors ${isOpen ? 'border-primary/50' : 'hover:border-border/80'}`}
                >
                  <button 
                    onClick={() => toggleAccordion(i)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  >
                    <div className="flex gap-4 items-center">
                      <span className="font-mono text-sm text-muted hidden sm:block">
                        {String(i + 1).padStart(2, '0')}.
                      </span>
                      <span className="font-semibold text-lg">{faq.question}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-surface transition-transform duration-300 ${isOpen ? 'rotate-45 text-primary' : 'text-muted'}`}>
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>
                  
                  <div 
                    ref={(el) => {
                      contentRefs.current[i] = el;
                    }}
                    className="h-0 opacity-0 overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-muted leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

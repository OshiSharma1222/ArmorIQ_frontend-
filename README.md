# ArmorIQ Landing Page Redesign

This is a complete redesign of the [ArmorIQ](https://armoriq.ai) landing page, built as part of the Frontend Engineer Intern assignment. It reimagines ArmorIQ not just as a B2B product, but as an enterprise-grade, cyberpunk-inspired security platform for AI agents.

## Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS v4
- GSAP & `@gsap/react` for complex animations
- `lucide-react` for iconography
- `next-themes` for seamless light/dark mode

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Design Decisions & Animations

- **Dark-First Aesthetic**: While a light/dark toggle is included, the platform is optimized for dark mode. Cybersecurity tools intrinsically feel more powerful and authoritative in dark mode, allowing the primary orange (`#E07B4C`) to act as a warning/alert color.
- **Hero Shield Assembly**: Instead of a generic dashboard screenshot, the hero features a live SVG animation of a shield being drawn, with particles representing AI agent intents flowing through. The "bad" intents are blocked and flash red, communicating the product's core value instantly.
- **Live Threat Simulation Graph**: The Differentiation section replaces a static table with a GSAP-powered SVG graph that draws itself on scroll. It visually contrasts the chaotic behavior of unprotected agents against the controlled, flatline behavior of ArmorIQ-protected agents.
- **Bento Grid Layout**: The platform products are arranged in an asymmetrical bento grid to create visual hierarchy, giving the "Intent Engine" prominence over secondary features.
- **Performance Considerations**: CSS animations were used where possible (e.g., the infinite marquee in the TrustBar) to reduce JavaScript execution overhead, saving GSAP exclusively for complex, timeline-based or scroll-triggered animations.

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Problem } from "@/components/Problem";
import { Platform } from "@/components/Platform";
import { Differentiation } from "@/components/Differentiation";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { PageLoader } from "@/components/PageLoader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      
      <main className="flex min-h-screen flex-col">
        <Hero />
        <TrustBar />
        <Problem />
        <Platform />
        <Differentiation />
        <FAQ />
        <CTA />
      </main>

      <Footer />
    </>
  );
}

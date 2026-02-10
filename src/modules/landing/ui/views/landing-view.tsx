import React from 'react';
import { Navbar } from '../components/navbar';
import { Hero } from '@/modules/landing/ui/components/hero';
import { Features } from '@/modules/landing/ui/components/features';
import { HowItWorks } from '@/modules/landing/ui/components/how-it-works';
import { Audience } from '@/modules/landing/ui/components/audience';
import { Benefits } from '@/modules/landing/ui/components/benefits';
import { Cta } from '@/modules/landing/ui/components/cta';
import { Footer } from '@/modules/landing/ui/components/footer';

export const LandingView = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <main className="flex flex-col gap-20 pb-20 overflow-hidden">
        <Hero />
        <Features />
        <HowItWorks />
        <Audience />
        <Benefits />
        <Cta />
      </main>
      <Footer />
    </div>
  );
};

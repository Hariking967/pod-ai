import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, PlayCircle } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] opacity-50 animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(124,124,255,0.05),transparent_70%)]" />
      </div>

      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-fade-in-up shadow-[0_0_15px_rgba(124,124,255,0.2)]">
          <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 shadow-[0_0_10px_#22D3EE]"></span>
          Read less. Listen smarter.
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white max-w-4xl mb-6">
          Turn articles, papers, and ideas into podcasts you actually <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">want to listen to.</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          PodAI uses Generative AI to convert long-form text into clear, engaging, human-like audio podcasts — tailored to your pace, tone, and interests.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/auth/sign-up">
            <Button size="lg" className="h-12 px-8 rounded-full text-base w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_0_30px_rgba(124,124,255,0.4)] transition-all border-0 text-white font-semibold">
              Create Your First Podcast
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="#how-it-works">
            <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-base w-full sm:w-auto border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary transition-all bg-transparent">
              See How It Works
              <PlayCircle className="ml-2 h-4 w-4 text-secondary" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

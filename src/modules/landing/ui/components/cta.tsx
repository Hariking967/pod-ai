import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export const Cta = () => {
  return (
    <section className="container px-4 md:px-6 py-12 md:py-24">
      <div className="relative rounded-3xl bg-gradient-to-br from-primary via-[#5B5BFF] to-secondary px-6 py-20 text-center overflow-hidden shadow-[0_0_50px_rgba(124,124,255,0.3)]">
        
        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-white/10 rotate-12 blur-3xl" />
            <div className="absolute top-[20%] right-[10%] w-32 h-32 bg-secondary/30 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl space-y-8">
          <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-md border border-white/20">
            <Sparkles className="mr-2 h-4 w-4" />
            Closing CTA
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">
            Stop scrolling. Start listening.
          </h2>
          
          <p className="text-xl text-white/90">
            Turn any text into a podcast with PodAI.
          </p>
          
          <div className="pt-4">
            <Link href="/auth/sign-up">
              <Button size="lg" variant="secondary" className="h-14 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl bg-white text-primary hover:bg-white/90 transition-all font-bold">
                Get Started
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

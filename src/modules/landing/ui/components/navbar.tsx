import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mic } from 'lucide-react';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tighter hover:opacity-80 transition-opacity">
          <div className="bg-gradient-to-tr from-primary to-secondary text-primary-foreground p-1.5 rounded-lg shadow-[0_0_15px_rgba(124,124,255,0.5)]">
            <Mic className="h-5 w-5" />
          </div>
          <span className="text-foreground">PodAI</span>
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/auth/sign-in" className="text-sm font-medium hover:text-primary transition-colors hidden sm:block">
            Sign In
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm" className="rounded-full px-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-[0_0_20px_rgba(124,124,255,0.3)] transition-all">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

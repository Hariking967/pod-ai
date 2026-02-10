import { Newspaper, FileText, BookOpen, NotebookPen, Zap, User, Mic, Layout } from 'lucide-react';

export const Features = () => {
  return (
    <section id="features" className="container px-4 md:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* What is PodAI */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">🚀 What is PodAI?</h2>
            <p className="text-lg text-muted-foreground">
              PodAI is an AI-powered platform that transforms written content into high-quality spoken podcasts — so you can learn while commuting, working out, or resting your eyes.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[ 
              { icon: Newspaper, label: "Articles" },
              { icon: FileText, label: "Research papers" },
              { icon: BookOpen, label: "Blogs" },
              { icon: NotebookPen, label: "Notes" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(124,124,255,0.1)] transition-all">
                <item.icon className="h-6 w-6 text-secondary" />
                <span className="font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          
          <div className="p-4 rounded-lg bg-primary/10 text-primary border border-primary/20 text-center font-medium shadow-[0_0_10px_rgba(124,124,255,0.1)]">
            No scripts. No recording. Just paste text → get audio.
          </div>
        </div>

        {/* Why PodAI */}
        <div className="bg-card rounded-3xl border border-border/50 shadow-xl p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
           
           <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
             <span className="text-3xl">✨</span> Why PodAI?
           </h3>
           
           <div className="space-y-6">
             {[
               { icon: User, title: "Built for people who learn by listening", desc: "Not everyone wants to read screens all day. PodAI brings information to your ears." },
               { icon: Zap, title: "Fast & effortless", desc: "Upload text → choose voice & style → generate podcast in seconds." },
               { icon: Mic, title: "Natural, human-like voices", desc: "No robotic narration. Voices sound conversational and engaging." },
               { icon: Layout, title: "Focused & structured", desc: "PodAI understands context and organizes content into a podcast-style flow." }
             ].map((feat, i) => (
               <div key={i} className="flex gap-4 group">
                 <div className="mt-1 bg-primary/10 p-2 rounded-lg h-fit group-hover:bg-primary/20 transition-colors">
                   <feat.icon className="h-5 w-5 text-primary" />
                 </div>
                 <div>
                   <h4 className="font-semibold text-lg text-foreground">{feat.title}</h4>
                   <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors">{feat.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

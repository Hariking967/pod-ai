import { UploadCloud, Sliders, Headphones } from 'lucide-react';

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="container px-4 md:px-6 py-20 bg-muted/10 rounded-[3rem] my-10 relative overflow-hidden border border-border/50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-20 bg-gradient-to-b from-background/50 to-transparent z-10" />
      
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">🛠️ How It Works</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Go from text to audio in three simple steps.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 relative z-0">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10 border-t-2 border-dashed border-primary/20" />
        
        {[
          { 
            icon: UploadCloud, 
            step: "01",
            title: "Paste or upload text", 
            desc: "Articles, notes, PDFs, or blog links." 
          },
          { 
            icon: Sliders, 
            step: "02",
            title: "Customize your podcast", 
            desc: "Choose voice, tone, speed, and length." 
          },
          { 
            icon: Headphones, 
            step: "03",
            title: "Generate & listen", 
            desc: "Instantly stream or download your AI podcast." 
          }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-2xl bg-card border border-border/50 shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(124,124,255,0.2)] transition-all duration-300 relative">
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center font-bold text-sm shadow-md">
                {item.step}
              </div>
              <item.icon className="h-10 w-10 text-primary group-hover:text-secondary transition-colors" />
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

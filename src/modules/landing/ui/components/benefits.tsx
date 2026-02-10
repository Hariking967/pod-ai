import { Globe, ShieldCheck, Cpu } from 'lucide-react';

export const Benefits = () => {
  return (
    <section className="container px-4 md:px-6 py-20">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Real Impact */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">🌍 Real Impact</h3>
          </div>
          <ul className="space-y-3">
            {[
              "Reduces screen fatigue",
              "Improves accessibility",
              "Saves time",
              "Makes learning continuous and flexible"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground italic border-l-2 border-primary pl-4 py-1">
            PodAI fits into your life — not the other way around.
          </p>
        </div>

        {/* Privacy */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">🔐 Privacy & Control</h3>
          </div>
          <ul className="space-y-3">
            {[
              "Your content stays yours",
              "No public publishing unless you choose",
              "Secure authentication and storage"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* GenAI */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-bold">🧪 Built with Generative AI</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            PodAI leverages modern GenAI models for:
          </p>
          <div className="flex flex-wrap gap-2">
            {["Context understanding", "Speech synthesis", "Audio structuring"].map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm font-medium mt-4">
            This isn’t just text-to-speech — it’s <span className="text-primary">content-to-podcast.</span>
          </p>
        </div>

      </div>
    </section>
  );
};

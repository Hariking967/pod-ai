export const Audience = () => {
  return (
    <section className="container px-4 md:px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">🎓 Who is PodAI for?</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: "🎒", title: "Students", desc: "Revise concepts while walking or commuting" },
          { icon: "🔬", title: "Researchers", desc: "Listen to papers instead of reading PDFs" },
          { icon: "💼", title: "Professionals", desc: "Consume knowledge on the go" },
          { icon: "🎨", title: "Creators", desc: "Turn written content into audio effortlessly" }
        ].map((item, i) => (
          <div key={i} className="bg-card hover:bg-muted/50 border rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

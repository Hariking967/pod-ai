import { Footer } from "@/modules/landing/ui/components/footer";

export default function FooterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-end">
      <div className="flex-1">Content</div>
      <Footer />
    </div>
  );
}

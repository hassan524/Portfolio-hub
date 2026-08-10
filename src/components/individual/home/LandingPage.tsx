import { useState } from "react";
import { SiteLayout } from "@/components/individual/Layout";
import { TemplatePreviewDialog } from "@/components/editor/TemplatePreviewDialog";
import type { SiteData } from "@/types/builder.schema";

// Subcomponents
import { Hero } from "./ui/Hero";
import { LogoStrip } from "./ui/LogoStrip";
import { TemplateShowcase } from "./ui/TemplateShowcase";
import { HowItWorks } from "./ui/HowItWorks";
import { FeatureGrid } from "./ui/FeatureGrid";
import { LiveEditorPreview } from "./ui/LiveEditorPreview";
import { Testimonials } from "./ui/Testimonials";
import { FAQ } from "./ui/FAQ";
import { FinalCTA } from "./ui/FinalCTA";

export function LandingPage() {
  const [dialogTemplate, setDialogTemplate] = useState<SiteData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const openPreview = (template: SiteData) => {
    setDialogTemplate(template);
    setDialogOpen(true);
  };

  const closePreview = () => {
    setDialogOpen(false);
    setTimeout(() => setDialogTemplate(null), 300);
  };

  return (
    <SiteLayout>
      <Hero />
      <LogoStrip />
      <TemplateShowcase onPreview={openPreview} />
      <HowItWorks />
      <FeatureGrid />
      <LiveEditorPreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />

      <TemplatePreviewDialog
        template={dialogTemplate}
        open={dialogOpen}
        onClose={closePreview}
      />
    </SiteLayout>
  );
}
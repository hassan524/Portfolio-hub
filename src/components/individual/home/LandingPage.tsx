import { useState } from "react";
import { SiteLayout } from "@/components/common/Layout";
import { TemplatePreviewDialog } from "@/components/editor/TemplatePreviewDialog";
import type { SiteData } from "@/types/builder.schema";

// Subcomponents
import { Hero } from "./Hero";
import { LogoStrip } from "./LogoStrip";
import { TemplateShowcase } from "./TemplateShowcase";
import { HowItWorks } from "./HowItWorks";
import { FeatureGrid } from "./FeatureGrid";
import { LiveEditorPreview } from "./LiveEditorPreview";
import { Testimonials } from "./Testimonials";
import { FAQ } from "./FAQ";
import { FinalCTA } from "./FinalCTA";

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
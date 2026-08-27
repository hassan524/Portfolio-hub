import { useState } from "react";
import { PageShell } from "@/components/individual/PageShell";
import { TemplatePreviewDialog } from "@/components/editor/TemplatePreviewDialog";
import { TemplateFullPreview } from "@/components/editor/TemplateFullPreview";
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
  const [fullPreviewOpen, setFullPreviewOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  const openFullPreview = (template: SiteData) => {
    setDialogTemplate(template);
    setFullPreviewOpen(true);
  };

  const closeFullPreview = () => {
    setFullPreviewOpen(false);
    setTimeout(() => setDialogTemplate(null), 300);
  };

  const continueToEditor = (template: SiteData) => {
    setDialogTemplate(template);
    setFullPreviewOpen(false);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setTimeout(() => setDialogTemplate(null), 300);
  };

  return (
    <PageShell>
      <Hero />
      <LogoStrip />
      <TemplateShowcase onPreview={openFullPreview} />
      <HowItWorks />
      <FeatureGrid />
      <LiveEditorPreview />
      <Testimonials />
      <FAQ />
      <FinalCTA />

      <TemplateFullPreview
        site={dialogTemplate}
        open={fullPreviewOpen}
        onClose={closeFullPreview}
        onContinue={continueToEditor}
      />

      <TemplatePreviewDialog
        template={dialogTemplate}
        open={editorOpen}
        onClose={closeEditor}
      />
    </PageShell>
  );
}
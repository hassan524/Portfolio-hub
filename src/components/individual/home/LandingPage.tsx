import { useState } from "react";
import { PageShell } from "@/components/individual/PageShell";
import { TemplatePreviewDialog } from "@/components/editor/TemplatePreviewDialog";
import type { SiteData } from "@/types/builder.schema";
import {FinalCTA }from "@/components/individual/home/ui/FinalCTA";

// Subcomponents
import { Hero } from "./ui/Hero";
import { LogoStrip } from "./ui/LogoStrip";
import { TemplateShowcase } from "./ui/TemplateShowcase";
import { HowItWorks } from "./ui/HowItWorks";
import { FeatureGrid } from "./ui/FeatureGrid";
import { LiveEditorPreview } from "./ui/LiveEditorPreview";
import { Testimonials } from "./ui/Testimonials";
import { FAQSection } from "./ui/FAQ";
import { TopSection } from "../TopSection";

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
    <PageShell>
      <TopSection>
        <Hero />
      </TopSection>

      {/* <LogoStrip />  */}
      <TemplateShowcase onPreview={openPreview} />
      <HowItWorks />
      <FeatureGrid />
      <LiveEditorPreview />
      <Testimonials />
      {/* <FAQSection /> */}
      <FinalCTA />

      <TemplatePreviewDialog
        template={dialogTemplate}
        open={dialogOpen}
        onClose={closePreview}
      />
    </PageShell>
  );
}
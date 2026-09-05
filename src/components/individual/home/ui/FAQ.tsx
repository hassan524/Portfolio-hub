import { FAQ } from "@/components/common/FAQ";

const FAQS = [
  {
    q: "How much does PortfolioHub cost?",
    a: "PortfolioHub is a paid product with simple monthly or annual pricing — check the Pricing page for current plans. There's no permanent free tier, but you can preview templates and the editor before subscribing.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If you're not happy within the first 7 days of a paid plan, contact support and we'll refund you in full, no questions asked. After that window, refunds are handled case-by-case.",
  },
  {
    q: "Do I need to know how to code?",
    a: "Not at all. The editor is form-based for structured content and supports markdown for writing. No HTML or CSS required to build or customize your site.",
  },
  {
    q: "Can I use my own custom domain?",
    a: "Yes, custom domains are supported on paid plans. Point your DNS to PortfolioHub and SSL is issued and renewed automatically — no manual certificate setup.",
  },
  {
    q: "Can I switch templates after publishing?",
    a: "Yes. Your content is stored independently from the template, so you can swap designs anytime without losing or re-entering your work.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, cancel whenever you like from your account settings. You'll keep access until the end of your current billing period — no lock-in contracts.",
  },
  {
    q: "What happens to my site if I cancel?",
    a: "Your portfolio is taken offline when your plan ends, but your content isn't deleted immediately — resubscribing restores it. You can also export your data before canceling.",
  },
  {
    q: "Is support included?",
    a: "Yes, email support is included on every paid plan. Response times are typically within one business day.",
  },
];

export function FAQSection() {
  return <FAQ faqs={FAQS} />;
}
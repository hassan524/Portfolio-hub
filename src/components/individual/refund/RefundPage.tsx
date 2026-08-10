import { PageShell, Prose } from "@/components/individual/PageShell";

export function RefundPage() {
  return (
    <PageShell eyebrow="Legal" title="Refund policy" subtitle="Last updated: July 2026">
      <Prose>
        <h2>When refunds are available</h2>
        <p>If you change your mind within 14 days of your initial Pro purchase, you can request a full refund. Refund requests are reviewed manually and usually resolved within 3 business days.</p>
        <h2>How to request one</h2>
        <p>Send a short note to <a href="mailto:support@portflu.app">support@portflu.app</a> with your email address and order details. We’ll confirm the refund and return the original payment method where possible.</p>
        <h2>Exceptions</h2>
        <p>Refunds are not available for renewals, partial-month usage, or purchases made more than 14 days after the original charge. If you believe a charge was made in error, contact us and we’ll review it.</p>
      </Prose>
    </PageShell>
  );
}

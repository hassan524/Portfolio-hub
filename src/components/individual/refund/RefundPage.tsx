import { PageShell, Prose } from "@/components/individual/PageShell";

export function RefundPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Refund policy"
      subtitle="Full refunds within 14 days of your first Pro purchase. Simple as that."
    >
      <Prose>
        <h2>Eligibility</h2>
        <p>Request a full refund within 14 days of your initial Pro purchase. Usually resolved in 3 business days.</p>
        <h2>How to request</h2>
        <p>Email <a href="mailto:support@portflu.app">support@portflu.app</a> with your account email. We refund to the original payment method.</p>
        <h2>Exceptions</h2>
        <p>No refunds on renewals or purchases older than 14 days. Billing errors are reviewed case by case.</p>
      </Prose>
    </PageShell>
  );
}

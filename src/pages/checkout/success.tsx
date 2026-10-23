import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import { useEffect, useState } from "react";
import { resolveCheckoutApiUrl } from "@site/src/lib/checkout";
import styles from "./success.module.css";

type CheckoutState = "checking" | "paid" | "processing" | "error";

interface CheckoutStatusResponse {
  status?: string;
  paymentStatus?: string;
}

export default function CheckoutSuccess() {
  const { siteConfig } = useDocusaurusContext();
  const [state, setState] = useState<CheckoutState>("checking");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    if (!sessionId) {
      setState("error");
      return;
    }

    const baseUrl = resolveCheckoutApiUrl(
      siteConfig.customFields?.checkoutApiUrl,
    );
    fetch(
      `${baseUrl}/checkout/session?session_id=${encodeURIComponent(sessionId)}`,
    )
      .then(async (response) => {
        if (!response.ok) throw new Error("Checkout lookup failed");
        return (await response.json()) as CheckoutStatusResponse;
      })
      .then((checkout) => {
        setState(checkout.paymentStatus === "paid" ? "paid" : "processing");
      })
      .catch(() => setState("error"));
  }, [siteConfig.customFields?.checkoutApiUrl]);

  const content = {
    checking: {
      eyebrow: "CONFIRMING CHECKOUT",
      title: "One moment—we’re checking your payment.",
      body: "This normally takes only a few seconds.",
    },
    paid: {
      eyebrow: "PAYMENT CONFIRMED",
      title: "Your private download links are on the way.",
      body: "Watch the inbox you used at checkout for separate Windows and Linux links. Each link expires after 72 hours and permits three download attempts.",
    },
    processing: {
      eyebrow: "PAYMENT PROCESSING",
      title: "Stripe is still confirming your payment.",
      body: "Some payment methods take longer to settle. You can close this page; the private download email is sent only after Stripe confirms payment.",
    },
    error: {
      eyebrow: "CHECKOUT STATUS",
      title: "We couldn’t confirm this checkout from the link.",
      body: "If Stripe completed the payment, your order is still handled by the signed webhook. Keep your Stripe receipt for reference.",
    },
  }[state];

  return (
    <Layout title="Checkout status" description="Qontent Tube checkout status">
      <main className={styles.page}>
        <section className={styles.card} aria-live="polite">
          <img src="/img/qontent-tube-logo.png" alt="" />
          <p>{content.eyebrow}</p>
          <h1>{content.title}</h1>
          <span>{content.body}</span>
          <div>
            <Link className="button button--primary" to="/docs/getting-started">
              Read the getting started guide
            </Link>
            <Link to="/">Return to Qontent Tube</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}

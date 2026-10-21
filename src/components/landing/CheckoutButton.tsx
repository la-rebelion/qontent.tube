import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useEffect, useRef, useState } from "react";
import { resolveCheckoutApiUrl } from "@site/src/lib/checkout";
import styles from "./landing.module.css";

interface CheckoutResponse {
  url?: string;
  error?: string;
}

interface TurnstileApi {
  render(
    container: HTMLElement,
    options: {
      action: string;
      appearance: "interaction-only";
      callback(token: string): void;
      "error-callback"(): void;
      "expired-callback"(): void;
      language: string;
      sitekey: string;
      size: "flexible";
      theme: "auto";
    },
  ): string;
  remove(widgetId: string): void;
  reset(widgetId: string): void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function CheckoutButton() {
  const { i18n, siteConfig } = useDocusaurusContext();
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileSiteKey =
    typeof siteConfig.customFields?.turnstileSiteKey === "string"
      ? siteConfig.customFields.turnstileSiteKey
      : "";
  const hasTurnstileSiteKey = turnstileSiteKey.length > 0;

  useEffect(() => {
    if (!hasTurnstileSiteKey || !turnstileContainer.current) return;

    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    const mountWidget = () => {
      const turnstile = window.turnstile;
      const container = turnstileContainer.current;
      if (!turnstile || !container || turnstileWidgetId.current) return;

      if (cancelled) return;
      turnstileWidgetId.current = turnstile.render(container, {
        action: "checkout",
        appearance: "interaction-only",
        callback: setTurnstileToken,
        "error-callback": () => setTurnstileToken(""),
        "expired-callback": () => setTurnstileToken(""),
        language: i18n.currentLocale,
        sitekey: turnstileSiteKey,
        size: "flexible",
        theme: "auto",
      });
    };

    mountWidget();
    if (!window.turnstile) timer = setInterval(mountWidget, 100);

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [hasTurnstileSiteKey, i18n.currentLocale, turnstileSiteKey]);

  async function startCheckout() {
    if (!turnstileToken) {
      setState("error");
      setMessage("Complete the security check to continue.");
      return;
    }

    setState("loading");
    setMessage("");

    try {
      const baseUrl = resolveCheckoutApiUrl(
        siteConfig.customFields?.checkoutApiUrl,
      );
      const response = await fetch(`${baseUrl}/checkout`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          locale: i18n.currentLocale,
          turnstileToken,
        }),
      });
      const payload = (await response.json()) as CheckoutResponse;

      if (!response.ok || !payload.url) {
        throw new Error(
          payload.error ?? "Checkout is temporarily unavailable.",
        );
      }

      window.location.assign(payload.url);
    } catch (error) {
      setTurnstileToken("");
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Checkout is temporarily unavailable.",
      );
    }
  }

  return (
    <div className={styles.checkoutAction}>
      {hasTurnstileSiteKey && (
        <div className={styles.turnstileSlot} ref={turnstileContainer} />
      )}
      <button
        className={styles.primaryButton}
        disabled={state === "loading" || !hasTurnstileSiteKey}
        onClick={startCheckout}
        type="button"
      >
        {state === "loading" ? "Opening secure checkout…" : "Buy for $49"}
        {state !== "loading" && <span aria-hidden="true">→</span>}
      </button>
      <p aria-live="polite" className={styles.checkoutStatus}>
        {!hasTurnstileSiteKey
          ? "Checkout security is not configured."
          : state === "error"
            ? message
            : "Secure checkout powered by Stripe"}
      </p>
    </div>
  );
}

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useEffect, useRef, useState } from "react";
import { resolveCheckoutApiUrl } from "@site/src/lib/checkout";
import styles from "./landing.module.css";

interface CheckoutResponse {
  url?: string;
  error?: string;
}

interface ReleaseStatusResponse {
  available?: boolean;
  version?: string;
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
  const [release, setRelease] = useState<
    | { state: "checking" }
    | { state: "unavailable" }
    | { state: "available"; version: string }
  >({ state: "checking" });
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileSiteKey =
    typeof siteConfig.customFields?.turnstileSiteKey === "string"
      ? siteConfig.customFields.turnstileSiteKey
      : "";
  const hasTurnstileSiteKey = turnstileSiteKey.length > 0;

  useEffect(() => {
    const controller = new AbortController();
    const baseUrl = resolveCheckoutApiUrl(
      siteConfig.customFields?.checkoutApiUrl,
    );
    fetch(`${baseUrl}/release/status`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Release status unavailable");
        return (await response.json()) as ReleaseStatusResponse;
      })
      .then((status) => {
        setRelease(
          status.available && status.version
            ? { state: "available", version: status.version }
            : { state: "unavailable" },
        );
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        setRelease({ state: "unavailable" });
      });
    return () => controller.abort();
  }, [siteConfig.customFields?.checkoutApiUrl]);

  useEffect(() => {
    if (
      !hasTurnstileSiteKey ||
      release.state !== "available" ||
      !turnstileContainer.current
    ) {
      return;
    }

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
  }, [
    hasTurnstileSiteKey,
    i18n.currentLocale,
    release.state,
    turnstileSiteKey,
  ]);

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

  function checkoutStatusMessage(): string {
    if (release.state === "checking") {
      return "Checking private-release availability…";
    }
    if (release.state === "unavailable") {
      return "Checkout opens when the verified v0.2 release is ready.";
    }
    if (!hasTurnstileSiteKey) return "Checkout security is not configured.";
    if (state === "error") return message;
    return `Qontent Tube ${release.version} · secure checkout powered by Stripe`;
  }

  return (
    <div className={styles.checkoutAction}>
      {hasTurnstileSiteKey && release.state === "available" && (
        <div className={styles.turnstileSlot} ref={turnstileContainer} />
      )}
      <button
        className={styles.primaryButton}
        disabled={
          state === "loading" ||
          !hasTurnstileSiteKey ||
          release.state !== "available"
        }
        onClick={startCheckout}
        type="button"
      >
        {state === "loading"
          ? "Opening secure checkout…"
          : release.state === "available"
            ? "Buy for $49"
            : "Private release coming soon"}
        {state !== "loading" && <span aria-hidden="true">→</span>}
      </button>
      <p aria-live="polite" className={styles.checkoutStatus}>
        {checkoutStatusMessage()}
      </p>
    </div>
  );
}

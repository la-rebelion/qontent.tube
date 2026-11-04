import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { FormEvent, useEffect, useRef, useState } from "react";
import { resolveCheckoutApiUrl } from "@site/src/lib/checkout";
import styles from "./landing.module.css";

type Step = "checking" | "email" | "otp" | "verified" | "fulfilling" | "ready";

interface ReleaseStatusResponse {
  available?: boolean;
  version?: string;
  access?: string;
}

interface SessionResponse {
  user?: { email?: string };
}

interface PreviewLink {
  platform: "windows-x64" | "linux-x64";
  filename: string;
  sha256: string;
  url: string;
}

interface FulfillmentResponse {
  version: string;
  expiresAt: number;
  maxDownloads: number;
  links: PreviewLink[];
  emailDelivery: "queued";
}

interface ErrorResponse {
  error?: string;
  message?: string;
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

async function responseJson<T>(response: Response): Promise<T> {
  return (await response.json().catch(() => ({}))) as T;
}

function errorMessage(payload: ErrorResponse, fallback: string): string {
  return payload.error ?? payload.message ?? fallback;
}

function platformName(platform: PreviewLink["platform"]): string {
  return platform === "windows-x64" ? "Windows x64" : "Linux x64";
}

export default function PreviewDownload() {
  const { i18n, siteConfig } = useDocusaurusContext();
  const [step, setStep] = useState<Step>("checking");
  const [releaseVersion, setReleaseVersion] = useState("");
  const [email, setEmail] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [message, setMessage] = useState("");
  const [downloads, setDownloads] = useState<FulfillmentResponse | null>(null);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [busy, setBusy] = useState(false);
  const turnstileContainer = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const apiUrl = resolveCheckoutApiUrl(siteConfig.customFields?.checkoutApiUrl);
  const turnstileSiteKey =
    typeof siteConfig.customFields?.turnstileSiteKey === "string"
      ? siteConfig.customFields.turnstileSiteKey
      : "";

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      fetch(`${apiUrl}/release/status`, { signal: controller.signal }).then(
        async (response) => {
          if (!response.ok) throw new Error("Release status unavailable");
          return responseJson<ReleaseStatusResponse>(response);
        },
      ),
      fetch(`${apiUrl}/auth/get-session`, {
        credentials: "include",
        signal: controller.signal,
      }).then((response) =>
        response.ok ? responseJson<SessionResponse | null>(response) : null,
      ),
    ])
      .then(([release, session]) => {
        if (!release.available || !release.version) {
          setMessage("The next verified private preview is being prepared.");
          setStep("email");
          return;
        }
        setReleaseVersion(release.version);
        const sessionEmail = session?.user?.email;
        if (sessionEmail) {
          setEmail(sessionEmail);
          setVerifiedEmail(sessionEmail);
          setStep("verified");
        } else {
          setStep("email");
        }
      })
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        setMessage("Private-preview availability could not be checked.");
        setStep("email");
      });
    return () => controller.abort();
  }, [apiUrl]);

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = setInterval(
      () => setResendSeconds((value) => Math.max(0, value - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [resendSeconds]);

  useEffect(() => {
    if (
      !turnstileSiteKey ||
      !releaseVersion ||
      (step !== "email" && step !== "otp") ||
      !turnstileContainer.current
    ) {
      return;
    }

    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const mount = () => {
      if (
        cancelled ||
        !window.turnstile ||
        !turnstileContainer.current ||
        turnstileWidgetId.current
      ) {
        return;
      }
      turnstileWidgetId.current = window.turnstile.render(
        turnstileContainer.current,
        {
          action: "lead_download",
          appearance: "interaction-only",
          callback: setTurnstileToken,
          "error-callback": () => setTurnstileToken(""),
          "expired-callback": () => setTurnstileToken(""),
          language: i18n.currentLocale,
          sitekey: turnstileSiteKey,
          size: "flexible",
          theme: "auto",
        },
      );
    };
    mount();
    if (!window.turnstile) timer = setInterval(mount, 100);
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = null;
      }
    };
  }, [i18n.currentLocale, releaseVersion, step, turnstileSiteKey]);

  function resetTurnstile() {
    setTurnstileToken("");
    if (turnstileWidgetId.current && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId.current);
    }
  }

  async function sendCode(event?: FormEvent) {
    event?.preventDefault();
    setMessage("");
    if (!acceptedTerms) {
      setMessage("Accept the Terms, Privacy Policy, and requirements first.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Enter a valid email address.");
      return;
    }
    if (!turnstileToken) {
      setMessage("Complete the security check to continue.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(
        `${apiUrl}/auth/email-otp/send-verification-otp`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
            "x-turnstile-token": turnstileToken,
          },
          body: JSON.stringify({ email: email.trim(), type: "sign-in" }),
        },
      );
      const payload = await responseJson<ErrorResponse>(response);
      resetTurnstile();
      if (!response.ok) {
        setMessage(
          errorMessage(payload, "The verification code could not be sent."),
        );
        return;
      }
      setEmail(email.trim().toLowerCase());
      setOtp("");
      setResendSeconds(30);
      setMessage(
        "Check your inbox for a six-digit code. It expires in five minutes.",
      );
      setStep("otp");
    } catch {
      resetTurnstile();
      setMessage("The verification service could not be reached. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function requestDownloads(sessionEmail: string) {
    setBusy(true);
    setStep("fulfilling");
    setMessage("Preparing private download links…");
    try {
      const response = await fetch(`${apiUrl}/lead/fulfillment`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          locale: i18n.currentLocale,
          marketingOptIn,
          acceptedTerms: true,
        }),
      });
      const payload = await responseJson<FulfillmentResponse & ErrorResponse>(
        response,
      );
      if (!response.ok || !payload.links) {
        setStep("verified");
        setMessage(errorMessage(payload, "Downloads could not be prepared."));
        return;
      }
      setVerifiedEmail(sessionEmail);
      setDownloads(payload);
      setMessage("");
      setStep("ready");
    } catch {
      setStep("verified");
      setMessage("The download service could not be reached. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    if (!/^\d{6}$/.test(otp)) {
      setMessage("Enter the six-digit code from your email.");
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(`${apiUrl}/auth/sign-in/email-otp`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const payload = await responseJson<ErrorResponse>(response);
      if (!response.ok) {
        setMessage(errorMessage(payload, "That code is invalid or expired."));
        return;
      }
      setVerifiedEmail(email);
    } catch {
      setMessage("The verification service could not be reached. Try again.");
      return;
    } finally {
      setBusy(false);
    }
    await requestDownloads(email);
  }

  async function useVerifiedSession() {
    if (!acceptedTerms) {
      setMessage("Accept the Terms, Privacy Policy, and requirements first.");
      return;
    }
    await requestDownloads(verifiedEmail);
  }

  async function changeEmail() {
    if (verifiedEmail) {
      await fetch(`${apiUrl}/auth/sign-out`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: "{}",
      }).catch(() => undefined);
    }
    setVerifiedEmail("");
    setEmail("");
    setOtp("");
    setDownloads(null);
    setMessage("");
    setStep("email");
  }

  const unavailable = !releaseVersion;

  return (
    <div className={styles.previewAccess}>
      {step === "ready" && downloads ? (
        <div className={styles.downloadReady}>
          <p className={styles.verifiedNotice}>
            <span aria-hidden="true">✓</span> Email verified · {verifiedEmail}
          </p>
          <h3>Qontent Tube {downloads.version} is ready</h3>
          <p>
            The links are available now and are being sent to your inbox. Each
            permits {downloads.maxDownloads} successful downloads within 72
            hours.
          </p>
          <div className={styles.downloadLinks}>
            {downloads.links.map((link) => (
              <div key={link.platform} className={styles.downloadLinkCard}>
                <strong>{platformName(link.platform)}</strong>
                <a href={link.url} referrerPolicy="no-referrer">
                  Download <span aria-hidden="true">↓</span>
                </a>
                <code title={link.sha256}>SHA-256 {link.sha256}</code>
              </div>
            ))}
          </div>
          <button
            className={styles.secondaryAction}
            onClick={changeEmail}
            type="button"
          >
            Use another email
          </button>
        </div>
      ) : (
        <>
          {(step === "email" || step === "verified" || step === "checking") && (
            <form onSubmit={sendCode}>
              {step === "verified" ? (
                <p className={styles.verifiedNotice}>
                  <span aria-hidden="true">✓</span> Verified as {verifiedEmail}
                  <button onClick={changeEmail} type="button">
                    Change
                  </button>
                </p>
              ) : (
                <label className={styles.emailField}>
                  <span>Email address</span>
                  <input
                    autoComplete="email"
                    disabled={step === "checking" || unavailable}
                    inputMode="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                    type="email"
                    value={email}
                  />
                </label>
              )}
              <label className={styles.requirementsConsent}>
                <input
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  type="checkbox"
                />
                <span>
                  I accept the <Link to="/terms">Terms</Link> and{" "}
                  <Link to="/privacy">Privacy Policy</Link>, and reviewed the{" "}
                  <Link to="/docs/requirements">runtime requirements</Link>.
                </span>
              </label>
              <label className={styles.requirementsConsent}>
                <input
                  checked={marketingOptIn}
                  onChange={(event) => setMarketingOptIn(event.target.checked)}
                  type="checkbox"
                />
                <span>
                  Optional: send me Qontent Tube launch notes and product
                  updates. This is not required for the download.
                </span>
              </label>
              {step === "verified" ? (
                <button
                  className={styles.primaryButton}
                  disabled={busy || unavailable || !acceptedTerms}
                  onClick={useVerifiedSession}
                  type="button"
                >
                  Get the private preview <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  className={styles.primaryButton}
                  disabled={
                    busy ||
                    step === "checking" ||
                    unavailable ||
                    !acceptedTerms ||
                    !turnstileToken
                  }
                  type="submit"
                >
                  Email me a verification code <span aria-hidden="true">→</span>
                </button>
              )}
            </form>
          )}

          {step === "otp" && (
            <form onSubmit={verifyCode}>
              <p className={styles.verifiedNotice}>
                Code sent to {email}
                <button onClick={changeEmail} type="button">
                  Change
                </button>
              </p>
              <label className={styles.emailField}>
                <span>Six-digit verification code</span>
                <input
                  autoComplete="one-time-code"
                  autoFocus
                  inputMode="numeric"
                  maxLength={6}
                  onChange={(event) =>
                    setOtp(event.target.value.replace(/\D/g, ""))
                  }
                  pattern="[0-9]{6}"
                  placeholder="000000"
                  required
                  value={otp}
                />
              </label>
              <button
                className={styles.primaryButton}
                disabled={busy}
                type="submit"
              >
                Verify and show downloads <span aria-hidden="true">→</span>
              </button>
              <button
                className={styles.secondaryAction}
                disabled={busy || resendSeconds > 0 || !turnstileToken}
                onClick={() => sendCode()}
                type="button"
              >
                {resendSeconds > 0
                  ? `Send another code in ${resendSeconds}s`
                  : "Send another code"}
              </button>
            </form>
          )}

          {step === "fulfilling" && (
            <p className={styles.preparingLinks} role="status">
              Preparing secure Windows and Linux links…
            </p>
          )}

          {turnstileSiteKey &&
            releaseVersion &&
            (step === "email" || step === "otp") && (
              <div className={styles.turnstileSlot} ref={turnstileContainer} />
            )}
          <p aria-live="polite" className={styles.checkoutStatus}>
            {message ||
              (releaseVersion
                ? `Qontent Tube ${releaseVersion} · verification protects the private download`
                : "Private-preview downloads are temporarily unavailable.")}
          </p>
        </>
      )}
    </div>
  );
}

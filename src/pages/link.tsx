import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { FormEvent, useEffect, useRef, useState } from "react";
import { resolveCheckoutApiUrl } from "@site/src/lib/checkout";
import styles from "@site/src/components/landing/landing.module.css";

/**
 * Approve a Qontent Tube desktop for QT Cloud scheduling. The app shows a
 * code and opens this page; the person signs in with an email code (the
 * same verification as downloads) and approves or declines that code.
 * Approving links the computer only: QT Cloud scheduling stays off until it
 * is turned on in the app, and each scheduled batch asks for consent.
 */

type Step = "checking" | "email" | "otp" | "approve" | "done";

interface TurnstileApi {
  render(element: HTMLElement, options: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
}
declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const json = async <T,>(response: Response) =>
  (await response.json().catch(() => ({}))) as T;

export default function LinkDevice() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const apiUrl = resolveCheckoutApiUrl(siteConfig.customFields?.checkoutApiUrl);
  const siteKey =
    typeof siteConfig.customFields?.turnstileSiteKey === "string"
      ? siteConfig.customFields.turnstileSiteKey
      : "";
  const [step, setStep] = useState<Step>("checking");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [signedIn, setSignedIn] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<"approved" | "denied">();
  const [busy, setBusy] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get("code") ?? "");
    fetch(`${apiUrl}/auth/get-session`, { credentials: "include" })
      .then((response) => json<{ user?: { email?: string } }>(response))
      .then((session) => {
        if (session?.user?.email) {
          setSignedIn(session.user.email);
          setStep("approve");
        } else setStep("email");
      })
      .catch(() => setStep("email"));
  }, [apiUrl]);

  useEffect(() => {
    if (!siteKey || step !== "email" || !container.current) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const mount = () => {
      if (!window.turnstile || !container.current || widget.current) return;
      widget.current = window.turnstile.render(container.current, {
        action: "lead_download",
        appearance: "interaction-only",
        callback: setToken,
        "error-callback": () => setToken(""),
        "expired-callback": () => setToken(""),
        language: i18n.currentLocale,
        sitekey: siteKey,
        size: "flexible",
        theme: "auto",
      });
    };
    mount();
    if (!window.turnstile) timer = setInterval(mount, 100);
    return () => {
      if (timer) clearInterval(timer);
      if (widget.current && window.turnstile) {
        window.turnstile.remove(widget.current);
        widget.current = null;
      }
    };
  }, [i18n.currentLocale, siteKey, step]);

  async function sendCode(event: FormEvent) {
    event.preventDefault();
    setMessage("");
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setMessage("Enter a valid email address.");
    if (siteKey && !token)
      return setMessage("Complete the security check to continue.");
    setBusy(true);
    try {
      const response = await fetch(
        `${apiUrl}/auth/email-otp/send-verification-otp`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
            "x-turnstile-token": token,
          },
          body: JSON.stringify({ email: email.trim(), type: "sign-in" }),
        },
      );
      if (!response.ok) {
        const body = await json<{ error?: string }>(response);
        setMessage(body.error ?? "The verification code could not be sent.");
        return;
      }
      setStep("otp");
      setMessage(
        "Check your inbox for a six-digit code. It expires in five minutes.",
      );
    } catch {
      setMessage("The verification service could not be reached. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verify(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(`${apiUrl}/auth/sign-in/email-otp`, {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: otp.trim() }),
      });
      if (!response.ok) {
        setMessage("That code did not work. Check it, or request a new one.");
        return;
      }
      setSignedIn(email.trim().toLowerCase());
      setStep("approve");
    } catch {
      setMessage("The verification service could not be reached. Try again.");
    } finally {
      setBusy(false);
    }
  }

  async function decide(approve: boolean) {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `${apiUrl}/scheduling/device-links/approve`,
        {
          method: "POST",
          credentials: "include",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userCode: code.trim(), approve }),
        },
      );
      const body = await json<{ error?: { message?: string } }>(response);
      if (!response.ok) {
        setMessage(body.error?.message ?? "This code could not be used.");
        return;
      }
      setResult(approve ? "approved" : "denied");
      setStep("done");
    } catch {
      setMessage("QT Cloud could not be reached. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Layout
      title="Link Qontent Tube"
      description="Approve a Qontent Tube desktop for QT Cloud scheduling."
    >
      <main className="container margin-vert--xl" style={{ maxWidth: 560 }}>
        <h1>Link Qontent Tube to your QT account</h1>
        <p>
          QT Cloud scheduling can post a scheduled batch while your computer is
          off. Linking only connects this app to your email: QT Cloud scheduling
          stays off until you turn it on in the app, and every batch asks for
          your consent before anything is uploaded.{" "}
          <Link to="/docs/scheduled-publishing">How it works</Link>
        </p>
        {step === "checking" && <p>Checking your sign-in…</p>}
        {step === "email" && (
          <form onSubmit={sendCode} className={styles.form}>
            <label>
              Your email
              <input
                type="email"
                value={email}
                required
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <div ref={container} />
            <button
              className="button button--primary"
              type="submit"
              disabled={busy}
            >
              Email me a code
            </button>
          </form>
        )}
        {step === "otp" && (
          <form onSubmit={verify} className={styles.form}>
            <label>
              Six-digit code
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                required
                pattern="[0-9]{6}"
              />
            </label>
            <button
              className="button button--primary"
              type="submit"
              disabled={busy}
            >
              Verify
            </button>
          </form>
        )}
        {step === "approve" && (
          <section>
            <p>
              Signed in as <strong>{signedIn}</strong>.
            </p>
            <label>
              Code shown in Qontent Tube
              <input
                value={code}
                onChange={(event) => setCode(event.target.value.toUpperCase())}
                placeholder="XXXX-XXXX"
              />
            </label>
            <p>
              Approve only if you started linking in your own Qontent Tube app
              just now.
            </p>
            <button
              className="button button--primary margin-right--sm"
              type="button"
              disabled={busy || !code}
              onClick={() => decide(true)}
            >
              Approve this computer
            </button>
            <button
              className="button button--secondary"
              type="button"
              disabled={busy || !code}
              onClick={() => decide(false)}
            >
              Decline
            </button>
          </section>
        )}
        {step === "done" && (
          <p role="status">
            {result === "approved"
              ? "Approved. Return to Qontent Tube: it finishes linking on its own."
              : "Declined. The app was not linked."}
          </p>
        )}
        {message && <p role="alert">{message}</p>}
      </main>
    </Layout>
  );
}

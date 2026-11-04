---
title: Privacy Policy
description: Privacy Policy for Qontent Tube, a La Rebelion Labs product.
slug: /privacy
---

# Privacy Policy

**Last updated:** November 3, 2026

Qontent Tube is a product of **La Rebelion Labs** (“**LRL**,” “**we**,” “**us**,” or “**our**”). This policy explains how we handle information when you visit [qontent.tube](https://qontent.tube), verify an email for a private-preview download, previously purchase a Qontent Tube license, use the desktop application, read its documentation, or contact us. Together, these are the “**Services**.”

Our starting point is simple: your scripts and projects are yours. We collect only what is reasonably needed to operate, secure, support, and improve Qontent Tube. We do not sell personal data.

## 1. Information you provide

You may provide:

- Your email address when requesting a private-preview download.
- Email-verification, passwordless session, consent, and download-fulfillment information.
- Billing, purchase, and license information if you used a historical or future paid offer.
- Messages, diagnostics, screenshots, or project excerpts you intentionally include in a support request.
- Scripts, voice settings, credentials, or other information you intentionally submit to a connected voice or AI provider.

Do not send confidential scripts, credentials, or personal data in a support request unless they are necessary and you are authorized to share them.

## 2. Website and security data

When you visit the website or use email verification, downloads, or checkout, our infrastructure may process limited technical information such as:

- IP address, browser, device, operating system, timestamps, and request metadata.
- Security signals used to prevent automated abuse, unauthorized downloads, and fraudulent checkout attempts.
- Error, availability, and performance information.
- Language and display preferences stored by your browser.

Qontent Tube uses Cloudflare infrastructure and Turnstile for security. Turnstile evaluates browser and request signals and returns a verification result to our email-verification and download service. Learn more in [Cloudflare's Privacy Policy](https://www.cloudflare.com/privacypolicy/).

We do not currently use the Qontent Tube website for behavioral advertising or cross-site profiling.

## 3. Email verification and preview fulfillment

We use Better Auth to create a passwordless account and short-lived verification records when you request the private preview. A correct one-time code verifies control of the address and creates a secure session cookie on `api.qontent.tube`. The cookie is HTTP-only, is not available to website scripts, and is not shared across unrelated domains.

We may retain:

- Your verified email address and Better Auth user and session identifiers.
- One-time-code verification records, failed-attempt counts, IP address, browser information, and security rate-limit records.
- Acceptance of the Terms and Privacy Policy and your current product-update preference.
- Release version, download-link expiration, download-attempt counts, and delivery status.

Private release files are stored in Cloudflare R2 and delivered through signed, time-limited links. The link contains an opaque identifier and expiration rather than your email address. We use Twilio to send one-time codes and transactional download messages. Transactional messages are required to verify and fulfill the download; they do not subscribe you to marketing.

Product and launch updates are optional. The checkbox is unchecked by default. We record when you grant or withdraw that preference, and withholding consent does not prevent a private-preview download.

## 4. Historical purchases and license fulfillment

Stripe processes Qontent Tube payments. Stripe receives the payment and billing information needed to complete your transaction under [Stripe's Privacy Policy](https://stripe.com/privacy). La Rebelion Labs does not receive or store your full payment-card number.

We may retain:

- Stripe checkout, payment, and customer identifiers.
- The email address associated with the purchase.
- Amount, currency, payment status, license type, and fulfillment status.
- Signed webhook event identifiers used to prevent duplicate processing.
- Release version, download-link expiration, download-attempt counts, and delivery status.

We use this information to confirm payment, deliver and support your license, prevent fraud, maintain business records, and comply with accounting, tax, and legal obligations. Private release files are stored in Cloudflare R2 and delivered through signed, time-limited links. The link itself contains an opaque identifier and expiration rather than your email address or payment details.

Twilio processes verification, fulfillment, and message-delivery metadata under [Twilio's Privacy Notice](https://www.twilio.com/en-us/legal/privacy).

## 5. Desktop application and local projects

Qontent Tube is designed around a local workflow. Your Markdown scripts, project configuration, generated audio, and related project files remain on your machine unless you choose to send information to a third-party service or to La Rebelion Labs for support.

The desktop application may open a private local browser session to provide its workspace. Local application traffic is not the same as uploading your project to the Qontent Tube website.

You control your local files, backups, credentials, access permissions, and retention. Removing Qontent Tube does not necessarily remove project files you created outside the application.

## 6. Voice and AI providers

Voice generation may require credentials for a third-party provider. When you request generation, the text and settings needed for that request may be sent directly to the provider you selected.

That provider processes information under its own terms and privacy policy. You are responsible for:

- Reviewing the provider's data handling and retention practices.
- Having the rights and permissions needed for submitted scripts and personal data.
- Protecting API keys and other credentials.
- Understanding any provider fees or usage limits.

La Rebelion Labs does not use your scripts or generated narration to train AI models by default.

## 7. How we use information

We use information to:

- Operate and secure the Services.
- Verify email ownership and fulfill private-preview downloads.
- Process historical or future payments and fulfill applicable licenses.
- Provide support and respond to requests.
- Diagnose errors and improve reliability.
- Prevent fraud, abuse, and unauthorized access.
- Maintain required business and legal records.
- Enforce our Terms, software licenses, and other agreements.

Where applicable, our legal bases include performing a contract, consent, compliance with legal obligations, and our legitimate interests in operating and protecting the Services.

## 8. How we share information

We share information only as reasonably necessary with service providers such as:

- Cloudflare for website delivery, security, Turnstile, passwordless authentication, D1 records, private R2 storage, and download infrastructure.
- Stripe for payment processing.
- Twilio for transactional verification and download email delivery.
- Voice or AI providers you choose to connect.
- Professional advisers or authorities when required by law.

We may also disclose information in connection with a merger, acquisition, financing, reorganization, or sale of assets, subject to appropriate protections.

We do not sell personal data.

## 9. Retention and security

We retain information only for as long as needed for the purposes described above. Expired one-time-code records and sessions may be removed after they are no longer operationally necessary. Verified lead, consent, fulfillment, and download metadata may be retained for access support, preference management, and abuse prevention. Purchase and billing records may be kept as required for accounting, tax, fraud-prevention, contractual, and legal purposes. Security and diagnostic records are generally retained for shorter periods unless needed to investigate an incident.

We use reasonable technical and organizational safeguards, including encrypted connections, access controls, secret management, signed payment webhooks, and abuse prevention. No system is completely secure, and you remain responsible for protecting your device, projects, backups, and provider credentials.

## 10. Your rights and choices

Depending on where you live, you may have rights to access, correct, delete, restrict, object to, or obtain a copy of personal data, and to withdraw consent where processing relies on consent.

You may withhold product-update consent without losing download access. A returning verified user can clear the optional preference, and any future marketing message will provide an applicable opt-out method. We may need to verify your identity before completing a request. Some purchase records must be retained when required by law or needed to establish or defend legal claims.

California residents may have additional rights to know, correct, or delete personal information. La Rebelion Labs does not sell personal information or share it for cross-context behavioral advertising.

## 11. International transfers and children

Our providers may process information in countries other than your own. Where required, we use appropriate safeguards for international transfers.

The Services are not directed to children under 13. We do not knowingly collect personal data from children under 13.

## 12. Changes to this policy

We may update this policy as Qontent Tube evolves. We will change the “Last updated” date and provide additional notice when required. Materially different data uses will not be applied retroactively where consent is required.

## 13. Contact

Questions or privacy requests can be sent to:

**La Rebelion Labs**  
[https://rebelion.la](https://rebelion.la)  
[Contact La Rebelion Labs](https://go.rebelion.la/contact-us)

Qontent Tube is built under the La Rebelion Labs umbrella with a local-first, privacy-conscious approach.

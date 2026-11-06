---
name: qt-demo
description: Produce product-demo videos with Qontent Tube from a coding agent. Use when asked to record, capture, or produce a demo video of a product (or a public website) from its `qontent.demo.yaml` bundle, to check or resume a Qontent Tube production, or to report its outputs. Covers the `qontent-tube demo` CLI (preferred on the machine that runs Qontent Tube) and the HAPI/MCP tools of a running automation listener. Never answers a review for a person, never invents or prints a secret.
---

# Qontent Tube demo productions

A production turns a demo bundle (`qontent.demo.yaml` and the files it names) into finished videos: it captures takes, fits them to scenes, narrates, asks people to review, renders, and writes an output manifest. Your job is to run it safely, stop where a person must decide, and report what happened with evidence.

## Choose the interface

1. **The CLI**, when you work on the computer where the product and Qontent Tube live: `qontent-tube demo …` with `--output json` or `--output ndjson`. Preferred.
2. **HAPI MCP tools** (`startProduction`, `checkProduction`, `collectOutputs`, or the operations such as `getAutomationCapabilities`), only when a person started `qontent-tube automation serve` and HAPI for you. You never start the listener, create credentials, or read credential files yourself.

If Qontent Tube is open, CLI commands that drive runs exit 7 (busy). Use the automation tools if they are available; otherwise ask the person to close the app. Never kill it.

## The loop

1. **Inspect before running.** `qontent-tube demo validate --bundle <folder> --json` and `qontent-tube demo plan --bundle <folder> --json`. Read `effects`, `secrets` (names only), `hooks`, `targets`, and `gates`. Tell the person, in one short list, what running it will do: commands it starts, data it changes, network it uses, secrets it needs, hooks it runs.
2. **Prefer isolated fixtures.** If a target is `isolation: shared` and the plan writes to it (`target-write`), say so and ask before running: captured writes change real data.
3. **Run with an idempotency key:** `qontent-tube demo run --bundle <folder> --no-input --idempotency-key <stable-key> --output ndjson`. Reuse the same key if you have to repeat the command; it returns the same run instead of starting another.
4. **Read the exit code and the last line** (`type: result`): `run.status`, `steps[].error` (`code`, `message`, `suggestion`), and `continuation`.
5. **Resume, never restart.** After a fix: `qontent-tube demo retry` (failed steps) or `qontent-tube demo resume` (cancelled, interrupted, paused). Finished work is reused; a new `run` is only for a changed bundle.
6. **Report outputs by name and hash.** On exit 0: `qontent-tube demo outputs --out <folder> --output json`, then list each file's `name` and `sha256`. Never report local absolute paths; the bundle-relative or output-folder names are enough.

## Exit codes

| Exit | What you do                                                                                            |
| ---- | ------------------------------------------------------------------------------------------------------ |
| 0    | Collect and report outputs.                                                                            |
| 1    | A step failed: read its `error.code` and `suggestion` (below). Fix what is yours to fix, then `retry`. |
| 2    | Fix your command.                                                                                      |
| 3    | A person must decide: report the continuation (below) and stop.                                        |
| 4, 5 | Cancelled or interrupted: `resume` only when asked to continue.                                        |
| 6    | Setup required: report `error.message` and `suggestion`; do not work around it.                        |
| 7    | Qontent Tube is open (see above).                                                                      |

## Gates: report, never answer

A `continuation` entry names a `gate`, its `kind`, the `question`, the `choices`, and the `inputHash` of the evidence. **You do not choose.** Not with `demo decide`, not with `decideDemoGate`, not by editing the bundle to remove the gate, not by marking it `unattended: policy`. Report:

> The production `<run id>` is waiting for **<gate title>** (<kind>): <question>. Choices: <ids>. A person answers it in Studio or with `qontent-tube demo decide --run <run id> --gate <gate> --choice <choice> --input-hash <inputHash>`.

Privacy review always needs a person. The only gates that may pass unattended are those the bundle marks `unattended: policy`, answered by a CI policy a person reviewed and whose digest is protected (see `docs/ci.md`). You never create, edit, or trust a policy.

## When a step fails

| `error.code`                              | Meaning                                                                                               | You do                                                                                                                                                                                                                       |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `secret_missing`                          | A named secret has no value here.                                                                     | Ask the person to configure it (`qontent-tube demo secrets set <name>` or the environment variable). Never invent, print, guess, or write a value, and never put one in a file or command.                                   |
| `hook_untrusted`                          | A hook changed or was never trusted here.                                                             | Show the hook file and its effects to the person and ask them to review and trust it. Never run `demo trust` yourself.                                                                                                       |
| `take_failed`                             | A step of a take did not work (a locator matched twice, a target was not ready, an assertion failed). | Read `suggestion` and the evidence (`qontent-tube demo evidence --bundle . --run <capture run>`). If the product is not running or not ready, report it; fix a locator only in the bundle and tell the person. Then `retry`. |
| `setup_required`, `local_runner_required` | No browser, ffmpeg, or local runner.                                                                  | Report `qontent-tube demo doctor` output; do not install software unasked.                                                                                                                                                   |
| `bundle_ahead`, `bundle_conflict`         | The bundle and the project disagree.                                                                  | Ask the person to pull or choose a version in Studio; do not overwrite either side.                                                                                                                                          |
| `idempotency_conflict`                    | The key was used for another request.                                                                 | Repeat the original request, or use a new key for a new one.                                                                                                                                                                 |
| `policy_mismatch`, `policy_untrusted`     | A CI policy does not cover this run.                                                                  | Report the mismatches. Never edit the policy or the digest.                                                                                                                                                                  |

## Secrets and paths

- Secret values never appear in what you write, print, commit, or send. Refer to secrets by name.
- Credentials (automation tokens and API keys) live in files a person created; do not read them into your output, logs, or commands.
- Report artifacts by portable identity (`render:<job>/<file>`, output file names) and SHA-256, not by absolute path.

## With HAPI

`startProduction` (inputs `projectId`, `idempotencyKey`, optional `options.variants`) validates, plans, starts, and returns `runId`, `status`, and `continuation`. It returns while the production runs; call `checkProduction` later, and `collectOutputs` only after `status` is `succeeded`. A `403 human_only_gate` from `decideDemoGate` means a person must answer: report it as above. A `capability_plan` result of `clarification-required` means a confirmation or a person's decision is needed; ask, do not assume.

## Reporting

End with: the run ID and status; what ran (captures, renders) and what was reused; any gate waiting (with the command for the person); any failure (code, message, the fix you made or need); and outputs (name and SHA-256 each). Keep it short and factual.

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { StatusPill, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { isDisposableEmail } from "../data/disposableDomains.js";

export default function DisposableEmailChecker({ tool }) {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleCheck() {
    setError("");
    setResult(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter an email address to check.");
      return;
    }
    const outcome = isDisposableEmail(trimmed);
    if (!outcome.valid) {
      setError("That doesn't look like a valid email address (expected format: name@domain.com).");
      return;
    }
    setResult(outcome);
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["disposable-email-checker"]}
      explanation={
        <>
          <p>
            Disposable email services let anyone generate a working inbox in seconds, use it to
            pass a signup form's verification step, and abandon it forever. That's fine for a
            one-off download, but it's poison for a lead list, a free-trial funnel, or any product
            where you need a real, reachable contact.
          </p>
          <p>
            This tool checks the domain portion of an email address against a curated list of
            widely used disposable-email providers and flags a match instantly, entirely in your
            browser. Wire the same check into your signup form's validation step to reject
            throwaway addresses before they ever reach your database.
          </p>
          <p>
            Note that this list, like any disposable-domain list, can't catch every provider —
            new throwaway services appear constantly. Treat a "clean" result as "not on our known
            list" rather than an absolute guarantee of a real, monitored inbox.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Email address</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="someone@example.com"
            className="input-field"
          />
        </div>
        <button onClick={handleCheck} className="btn-primary w-full sm:w-auto">
          Check
        </button>
      </div>

      {error && <ErrorState message={error} />}

      {!error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 flex items-center gap-4">
          {result.disposable ? (
            <XCircle size={28} className="text-status-bad shrink-0" />
          ) : (
            <CheckCircle2 size={28} className="text-status-good shrink-0" />
          )}
          <div>
            <p className="text-body text-ink font-medium mb-1">
              {result.disposable ? "Disposable domain detected" : "No match found"}
            </p>
            <p className="text-caption text-ink-muted mb-2">
              Domain: <span className="font-mono">{result.domain}</span>
            </p>
            <StatusPill status={result.disposable ? "bad" : "good"}>
              {result.disposable ? "Likely throwaway" : "Not on known disposable list"}
            </StatusPill>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

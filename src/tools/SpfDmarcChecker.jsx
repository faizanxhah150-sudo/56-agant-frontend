import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ScoreMeter, StatusPill, LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function SpfDmarcChecker({ tool }) {
  const [domain, setDomain] = useState("");
  const [selector, setSelector] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!domain.trim()) {
      setError("Enter a domain to check, e.g. example.com");
      return;
    }
    setLoading(true);
    try {
      const data = await apiPost("/api/spf-dmarc-checker", { domain, dkimSelector: selector || undefined });
      setResult(data);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["spf-dmarc-checker"]}
      explanation={
        <>
          <p>
            SPF, DKIM, and DMARC together form the standard trio mailbox providers use to decide
            whether an email genuinely came from your domain. SPF lists which servers are allowed
            to send mail for you; DKIM cryptographically signs outgoing mail; DMARC tells
            receiving servers what to do when a message fails those checks and where to send
            reports.
          </p>
          <p>
            This tool performs a live DNS lookup against your domain's actual published records
            and scores what it finds. A low score usually means email from your domain is more
            likely to land in spam, and — just as importantly — that your domain is easier for
            attackers to spoof in phishing attempts against your own contacts.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Domain</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              placeholder="example.com"
              className="input-field"
            />
          </div>
          <div>
            <label className="label">DKIM selector (optional)</label>
            <input
              type="text"
              value={selector}
              onChange={(e) => setSelector(e.target.value)}
              placeholder="google, selector1, default…"
              className="input-field"
            />
          </div>
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {loading && <LoadingState message="Running live DNS lookups…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-5">
          <ScoreMeter score={result.score} max={100} label={`Email authentication score — ${result.domain}`} />
          <div className="space-y-3">
            {result.findings.map((f, i) => (
              <div key={i} className="flex items-start justify-between gap-4 pb-3 border-b border-bg-border last:border-0 last:pb-0">
                <div>
                  <p className="text-body text-ink font-medium mb-1">{f.check}</p>
                  <p className="text-caption text-ink-muted break-all">{f.detail}</p>
                </div>
                <StatusPill status={f.status}>{f.status}</StatusPill>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

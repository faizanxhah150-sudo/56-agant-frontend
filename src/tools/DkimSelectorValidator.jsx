import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { StatusPill, LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function DkimSelectorValidator({ tool }) {
  const [domain, setDomain] = useState("");
  const [selector, setSelector] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!domain.trim() || !selector.trim()) {
      setError("Enter both a domain and a DKIM selector.");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/dkim-selector-validator", { domain, selector }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["dkim-selector-validator"]}
      explanation={
        <>
          <p>
            Unlike SPF and DMARC, which each live at one predictable DNS location, DKIM records
            are published under a selector-specific subdomain
            (<code>selector._domainkey.yourdomain.com</code>), and each email provider chooses
            its own selector name. That makes DKIM the record most commonly missed or
            misconfigured simply because people don't know the right location to check.
          </p>
          <p>
            This tool fetches the record at the selector you specify and validates its two
            required pieces: the <code>v=DKIM1</code> version tag and a non-empty public key
            (<code>p=</code>). A record missing either won't successfully verify incoming DKIM
            checks even if the domain otherwise looks fine.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Domain</label>
            <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" className="input-field" />
          </div>
          <div>
            <label className="label">DKIM selector</label>
            <input type="text" value={selector} onChange={(e) => setSelector(e.target.value)} placeholder="google" className="input-field" />
          </div>
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {loading && <LoadingState message="Looking up DKIM record…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && !result.found && (
        <div className="card p-5 text-body text-status-bad">{result.message}</div>
      )}

      {result && result.found && (
        <div className="card p-5 space-y-4">
          <div className="flex items-center gap-3">
            <StatusPill status={result.valid ? "good" : "bad"}>
              {result.valid ? "Valid DKIM record" : "Invalid or incomplete record"}
            </StatusPill>
          </div>
          {result.errors.length > 0 && (
            <ul className="text-body text-status-bad list-disc list-inside space-y-1">
              {result.errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          )}
          <div>
            <p className="label">Raw record</p>
            <pre className="code-block whitespace-pre-wrap break-all">{result.record}</pre>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function SslExpiryChecker({ tool }) {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!domain.trim()) {
      setError("Enter a domain, e.g. example.com");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/ssl-expiry-checker", { domain }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["ssl-expiry-checker"]}
      explanation={
        <>
          <p>
            An expired SSL/TLS certificate replaces your entire site with a full-page browser
            security warning — not a small banner, a hard stop that turns away nearly every
            visitor. Certificates typically last 90 days to a year, and it's easy to lose track
            of renewal dates across a portfolio of domains.
          </p>
          <p>
            This tool queries public Certificate Transparency logs (a public record every issued
            certificate is required to be logged to) for your domain's most recent certificate and
            reports its expiry date and days remaining.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
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
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {loading && <LoadingState message="Querying certificate transparency logs…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && !result.found && (
        <div className="card p-5 text-body text-ink-muted">{result.message}</div>
      )}

      {result && result.found && (
        <div className="card p-5 space-y-4">
          <StatusPill status={result.expired ? "bad" : result.daysRemaining < 14 ? "warn" : "good"}>
            {result.expired ? "Expired" : `${result.daysRemaining} days remaining`}
          </StatusPill>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-caption text-ink-faint mb-1">Expires</p>
              <p className="text-body text-ink">{new Date(result.notAfter).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">Issuer</p>
              <p className="text-body text-ink">{result.issuer}</p>
            </div>
          </div>
          <p className="text-caption text-ink-faint">{result.note}</p>
        </div>
      )}
    </ToolShell>
  );
}

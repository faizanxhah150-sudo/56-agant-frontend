import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function DnsPropagationTracker({ tool }) {
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
      setResult(await apiPost("/api/dns-propagation-tracker", { domain }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["dns-propagation-tracker"]}
      explanation={
        <>
          <p>
            DNS changes don't take effect everywhere instantly — different networks and resolvers
            cache records for different lengths of time (governed by the record's TTL), so during
            the propagation window, some people see your new value while others still see the
            old one.
          </p>
          <p>
            This tool checks your domain's A record against three independent public DNS
            resolvers — Cloudflare, Google, and Quad9 — run by different organizations on
            different infrastructure. If all three agree, propagation is effectively complete
            from a practical standpoint.
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

      {loading && <LoadingState message="Querying independent DNS resolvers…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="space-y-4">
          <div className="card p-5">
            <StatusPill status={result.consistent ? "good" : "warn"}>
              {result.consistent ? "Consistent across all resolvers" : "Still propagating — resolvers disagree"}
            </StatusPill>
          </div>
          <div className="card divide-y divide-bg-border">
            {result.results.map((r) => (
              <div key={r.resolver} className="p-4 flex items-center justify-between gap-4">
                <p className="text-body text-ink font-medium">{r.resolver}</p>
                <p className="font-mono text-caption text-ink-muted">
                  {r.ips.length > 0 ? r.ips.join(", ") : "no answer"}
                </p>
              </div>
            ))}
          </div>
          <p className="text-caption text-ink-faint">{result.note}</p>
        </div>
      )}
    </ToolShell>
  );
}

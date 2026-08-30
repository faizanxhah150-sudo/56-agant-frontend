import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { StatusPill, LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function CanonicalizationChecker({ tool }) {
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
      setResult(await apiPost("/api/canonicalization-checker", { domain }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["canonicalization-checker"]}
      explanation={
        <>
          <p>
            Every domain technically has (at least) four addressable variants: with and without{" "}
            <code>www</code>, over HTTP and over HTTPS. If a site doesn't force all four to
            redirect to one canonical version, search engines can index them as separate pages
            with duplicate content, splitting ranking signals that should all be consolidated onto
            one URL.
          </p>
          <p>
            This tool fetches all four variants live and checks whether they all resolve to the
            same final URL. The fix, if they don't, is a permanent (301) redirect rule at the
            server or CDN level forcing every variant to your one preferred canonical version.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Domain (without http:// or www)</label>
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

      {loading && <LoadingState message="Fetching all four domain variants…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="space-y-4">
          <div className="card p-5">
            <StatusPill status={result.canonical ? "good" : "bad"}>
              {result.canonical ? `All variants consolidate to ${result.canonicalUrl}` : "Variants do NOT consolidate to one URL"}
            </StatusPill>
          </div>
          <div className="card divide-y divide-bg-border">
            {result.results.map((r) => (
              <div key={r.variant} className="p-4">
                <p className="font-mono text-caption text-ink">{r.variant}</p>
                <p className="text-caption text-ink-muted">
                  {r.error ? "Unreachable" : `→ ${r.finalUrl} (HTTP ${r.status})`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

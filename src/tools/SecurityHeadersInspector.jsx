import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ScoreMeter, StatusPill, LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function SecurityHeadersInspector({ tool }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!url.trim()) {
      setError("Enter a URL including https://");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/security-headers-inspector", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["security-headers-inspector"]}
      explanation={
        <>
          <p>
            HTTP security headers tell the browser to enforce specific protections on your
            behalf — forcing HTTPS for future visits (HSTS), restricting which scripts can run
            (Content-Security-Policy), preventing your site from being embedded in a malicious
            iframe (X-Frame-Options), and more. A server with excellent security practices but no
            headers is still exposed to attacks the browser could have blocked automatically.
          </p>
          <p>
            This tool fetches your live response headers and checks for six of the most impactful
            ones, weighting each by how much protection it typically adds, and rolls that into an
            overall letter grade.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="https://example.com"
            className="input-field"
          />
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {loading && <LoadingState message="Fetching response headers…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-5">
          <div className="flex items-center gap-4">
            <span className="text-h1 text-accent">{result.grade}</span>
            <ScoreMeter score={result.score} max={100} label="Security header score" />
          </div>
          <div className="space-y-3">
            {result.headers.map((h) => (
              <div key={h.header} className="flex items-start justify-between gap-4 pb-3 border-b border-bg-border last:border-0 last:pb-0">
                <div>
                  <p className="text-body text-ink font-medium mb-1">{h.name}</p>
                  {h.value && <p className="text-caption text-ink-muted break-all font-mono">{h.value}</p>}
                </div>
                <StatusPill status={h.present ? "good" : "bad"}>{h.present ? "Present" : "Missing"}</StatusPill>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

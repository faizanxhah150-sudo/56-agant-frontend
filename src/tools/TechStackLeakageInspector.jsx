import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function TechStackLeakageInspector({ tool }) {
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
      setResult(await apiPost("/api/tech-stack-leakage-inspector", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["tech-stack-leakage-inspector"]}
      explanation={
        <>
          <p>
            When a server announces exactly which software and version it's running — via a{" "}
            <code>Server</code> or <code>X-Powered-By</code> header, or a CMS's{" "}
            <code>&lt;meta name="generator"&gt;</code> tag — it hands attackers a shortcut: they
            can skip reconnaissance and go straight to trying known exploits for that specific
            version.
          </p>
          <p>
            This tool checks a live response for the most common identifying headers and the HTML
            generator meta tag, and gives an overall exposure level. The fix is usually a
            one-line server config change to suppress or override these headers.
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

      {loading && <LoadingState message="Fetching headers and HTML…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-4">
          <StatusPill status={result.riskLevel === "high" ? "bad" : result.riskLevel === "medium" ? "warn" : "good"}>
            {result.riskLevel} exposure
          </StatusPill>
          {result.leakedHeaders.length === 0 && !result.metaGenerator ? (
            <p className="text-body text-ink-muted">No identifying headers or generator tags found.</p>
          ) : (
            <div className="space-y-2">
              {result.leakedHeaders.map((h) => (
                <div key={h.header} className="flex items-center justify-between">
                  <p className="font-mono text-caption text-ink-muted">{h.header}</p>
                  <p className="font-mono text-caption text-ink">{h.value}</p>
                </div>
              ))}
              {result.metaGenerator && (
                <div className="flex items-center justify-between">
                  <p className="font-mono text-caption text-ink-muted">meta generator</p>
                  <p className="font-mono text-caption text-ink">{result.metaGenerator}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
}

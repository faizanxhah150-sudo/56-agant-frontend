import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { StatusPill, LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function RobotsTxtChecker({ tool }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!url.trim()) {
      setError("Enter your site's URL, e.g. https://example.com");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/robots-txt-checker", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["robots-txt-checker"]}
      explanation={
        <>
          <p>
            robots.txt is a plain-text file that tells web crawlers which parts of a site they're
            allowed to visit. It's simple by design, which also makes it easy to get subtly
            wrong — a rule meant for one crawler accidentally applying to all of them (via the{" "}
            <code>User-agent: *</code> wildcard) is a common, costly mistake.
          </p>
          <p>
            This tool fetches your live robots.txt and checks it against several major crawlers —
            Googlebot, Bingbot, and newer AI crawlers like GPTBot and ClaudeBot — showing exactly
            which paths each one is blocked from.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Site URL</label>
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

      {loading && <LoadingState message="Fetching robots.txt…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && !result.found && (
        <div className="card p-5 text-body text-ink-muted">{result.message}</div>
      )}

      {result && result.found && (
        <div className="space-y-4">
          <div className="card divide-y divide-bg-border">
            {result.report.map((r) => (
              <div key={r.bot} className="p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-body text-ink font-medium">{r.bot}</p>
                  {r.disallowedPaths.length > 0 && (
                    <p className="text-caption text-ink-faint font-mono">{r.disallowedPaths.join(", ")}</p>
                  )}
                </div>
                <StatusPill status={r.blocked ? "bad" : "good"}>
                  {r.blocked ? "Fully blocked" : "Allowed"}
                </StatusPill>
              </div>
            ))}
          </div>
          <div className="card p-5">
            <p className="label">Raw robots.txt</p>
            <pre className="code-block whitespace-pre-wrap max-h-64 overflow-y-auto">{result.raw}</pre>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

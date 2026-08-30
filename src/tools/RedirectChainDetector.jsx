import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { StatusPill, LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function RedirectChainDetector({ tool }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTrace() {
    setError("");
    setResult(null);
    if (!url.trim()) {
      setError("Enter a URL including https://");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/redirect-chain-detector", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["redirect-chain-detector"]}
      explanation={
        <>
          <p>
            A single redirect (old URL → new URL) is normal and harmless. A chain of three, four,
            or more redirects stacked on top of each other — often the result of years of
            incremental site changes each adding one more hop — slows page loads and dilutes the
            SEO value passed through each link. A genuine loop, where a redirect eventually points
            back to somewhere earlier in its own chain, breaks the page entirely.
          </p>
          <p>
            This tool follows a URL's redirects one hop at a time (up to 15, to avoid an infinite
            fetch), showing the full path and flagging a loop the moment it detects one.
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
            onKeyDown={(e) => e.key === "Enter" && handleTrace()}
            placeholder="https://example.com/old-page"
            className="input-field"
          />
        </div>
        <button onClick={handleTrace} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Tracing…" : "Trace"}
        </button>
      </div>

      {loading && <LoadingState message="Following redirects…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="space-y-4">
          <div className="card p-5 flex flex-wrap gap-3">
            <StatusPill status={result.hops <= 2 ? "good" : result.hops <= 4 ? "warn" : "bad"}>
              {result.hops} hop(s)
            </StatusPill>
            {result.loopDetected && <StatusPill status="bad">Redirect loop detected</StatusPill>}
          </div>
          <div className="card divide-y divide-bg-border">
            {result.chain.map((hop, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-4">
                <p className="font-mono text-caption text-ink break-all">{hop.url}</p>
                <span className="text-caption text-ink-faint shrink-0">
                  {hop.error ? "unreachable" : `HTTP ${hop.status}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

function fmtBytes(bytes) {
  if (bytes == null) return "unknown";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function WebsiteSpeedInspector({ tool }) {
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
      setResult(await apiPost("/api/website-speed-inspector", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["website-speed-inspector"]}
      explanation={
        <>
          <p>
            Page speed is one of the strongest predictors of conversion rate and one of Google's
            ranking factors, but "make it faster" is useless advice without knowing what's
            actually heavy. Usually it's a handful of oversized images or an unminified script
            dragging the whole page down.
          </p>
          <p>
            This tool fetches your page live, times the HTML response, and then checks the byte
            size of every image, script, and stylesheet it references — sorted heaviest first, so
            you know exactly where to start optimizing.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Page URL</label>
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

      {loading && <LoadingState message="Fetching page and measuring assets…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="space-y-4">
          <div className="card p-5 grid sm:grid-cols-3 gap-4">
            <div>
              <p className="text-caption text-ink-faint mb-1">HTML load time</p>
              <p className="text-h3 text-ink">{result.pageLoadMs} ms</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">HTML size</p>
              <p className="text-h3 text-ink">{fmtBytes(result.htmlBytes)}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">Total asset weight</p>
              <p className="text-h3 text-accent">{fmtBytes(result.totalAssetBytes)}</p>
            </div>
          </div>
          {result.note && <p className="text-caption text-ink-faint">{result.note}</p>}
          <div className="card divide-y divide-bg-border">
            {result.assets.map((a, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-4">
                <p className="font-mono text-caption text-ink break-all">{a.url}</p>
                <StatusPill status={a.bytes > 200000 ? "bad" : a.bytes > 50000 ? "warn" : "good"}>
                  {fmtBytes(a.bytes)}
                </StatusPill>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

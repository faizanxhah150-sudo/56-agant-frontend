import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function BrokenLinkChecker({ tool }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!url.trim()) {
      setError("Enter a page URL including https://");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/broken-link-checker", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["broken-link-checker"]}
      explanation={
        <>
          <p>
            Broken links accumulate quietly over the life of a site — a linked page gets deleted,
            a URL structure changes, a partner site reorganizes. Each one is a small dead end for
            both visitors and search engine crawlers, and enough of them signal a poorly
            maintained site.
          </p>
          <p>
            This tool fetches your page, pulls out every link on it (up to the first 50), and
            checks each one's live HTTP status, flagging anything that returns a 4xx or 5xx
            response.
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

      {loading && <LoadingState message="Crawling page and checking links…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="space-y-4">
          <div className="card p-5 flex flex-wrap items-center gap-3">
            <StatusPill status={result.brokenCount === 0 ? "good" : "bad"}>
              {result.brokenCount} broken of {result.totalChecked} links checked
            </StatusPill>
            {result.note && <p className="text-caption text-ink-faint">{result.note}</p>}
          </div>
          <div className="card divide-y divide-bg-border">
            {result.results.map((r, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-4">
                <p className="font-mono text-caption text-ink break-all">{r.url}</p>
                <StatusPill status={r.broken ? "bad" : "good"}>{r.status ?? "unreachable"}</StatusPill>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

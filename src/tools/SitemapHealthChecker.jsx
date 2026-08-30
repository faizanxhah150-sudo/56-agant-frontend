import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { StatusPill, LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function SitemapHealthChecker({ tool }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!url.trim()) {
      setError("Enter your sitemap.xml URL.");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/sitemap-health-checker", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["sitemap-health-checker"]}
      explanation={
        <>
          <p>
            A sitemap.xml file is how you proactively tell search engines every URL on your site
            worth crawling. If that file lists pages that now 404, redirect, or error out, it
            sends a confusing signal — and a stale or broken sitemap can quietly slow down
            indexing of pages that are actually fine.
          </p>
          <p>
            This tool fetches your sitemap, counts every URL listed, and live-checks a sample of
            them (the first 30, to keep response times reasonable) so you can catch broken entries
            before they accumulate.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Sitemap URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="https://example.com/sitemap.xml"
            className="input-field"
          />
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {loading && <LoadingState message="Fetching sitemap and checking sample URLs…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="space-y-4">
          <div className="card p-5 flex flex-wrap items-center gap-3">
            <p className="text-body text-ink">
              <span className="font-medium">{result.totalUrls}</span> total URLs in sitemap
            </p>
            {result.note && <p className="text-caption text-ink-faint">{result.note}</p>}
          </div>
          <div className="card divide-y divide-bg-border">
            {result.results.map((r, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-4">
                <p className="font-mono text-caption text-ink break-all">{r.url}</p>
                <StatusPill status={r.ok ? "good" : "bad"}>{r.status ?? "unreachable"}</StatusPill>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

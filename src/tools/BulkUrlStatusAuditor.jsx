import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { StatusPill, LoadingState, EmptyState, ErrorState, DownloadButton } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function BulkUrlStatusAuditor({ tool }) {
  const [raw, setRaw] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    const urls = raw.split("\n").map((u) => u.trim()).filter(Boolean);
    if (urls.length === 0) {
      setError("Paste at least one URL, one per line.");
      return;
    }
    if (urls.length > 100) {
      setError("Limit to 100 URLs per check.");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/bulk-url-status-auditor", { urls }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const csv = result
    ? "url,status,final_url,ok\n" +
      result.results.map((r) => `${r.url},${r.status ?? ""},${r.finalUrl ?? ""},${r.ok}`).join("\n")
    : "";

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["bulk-url-status-auditor"]}
      explanation={
        <>
          <p>
            A site migration, a bulk content deletion, or a botched redirect rule can break dozens
            of URLs at once — internal links, backlinks from other sites, bookmarked pages — and
            checking each one by opening it in a browser doesn't scale past a handful.
          </p>
          <p>
            Paste your list and this tool checks the live HTTP status of every URL in one batch
            (up to 100 at a time), following redirects to show the final destination and flagging
            anything that isn't a healthy 2xx response.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">URLs (one per line, up to 100)</label>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={8}
            placeholder={"https://example.com/page-1\nhttps://example.com/page-2"}
            className="input-field font-mono text-caption"
          />
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Check All"}
        </button>
      </div>

      {loading && <LoadingState message="Checking URLs — this may take a moment for large lists…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <p className="label mb-0">{result.results.length} URLs checked</p>
            <DownloadButton filename="url-audit.csv" content={csv} mimeType="text/csv" />
          </div>
          <div className="divide-y divide-bg-border">
            {result.results.map((r, i) => (
              <div key={i} className="py-3 flex items-center justify-between gap-4">
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

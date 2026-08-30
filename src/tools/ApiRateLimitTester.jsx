import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function ApiRateLimitTester({ tool }) {
  const [url, setUrl] = useState("");
  const [count, setCount] = useState("10");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTest() {
    setError("");
    setResult(null);
    if (!url.trim()) {
      setError("Enter a URL including https://");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/api-rate-limit-tester", { url, requestCount: count }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["api-rate-limit-tester"]}
      explanation={
        <>
          <p>
            Rate limiting protects an API from being overwhelmed by a single misbehaving client
            or a deliberate abuse attempt. Confirming it's actually configured correctly usually
            means someone has to send a genuine burst of traffic and check whether the server
            starts pushing back — testing this manually with a browser tab isn't realistic.
          </p>
          <p>
            This tool sends a controlled burst of real requests (up to 20) to a URL you specify
            and reports each response's status code, flagging whether a 429 (Too Many Requests)
            or similar throttling signal appeared. Only point this at systems you own or have
            explicit permission to load-test.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-[1fr_auto] gap-4">
          <div>
            <label className="label">URL</label>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/api/endpoint" className="input-field" />
          </div>
          <div className="w-full sm:w-32">
            <label className="label">Requests</label>
            <input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="20" className="input-field" />
          </div>
        </div>
        <button onClick={handleTest} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Testing…" : "Test"}
        </button>
      </div>

      {loading && <LoadingState message="Sending request burst…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="space-y-4">
          <div className="card p-5">
            <StatusPill status={result.throttled ? "good" : "warn"}>
              {result.throttled ? "Rate limiting detected (429 seen)" : "No rate limiting detected in this burst"}
            </StatusPill>
          </div>
          <div className="card divide-y divide-bg-border">
            {result.results.map((r) => (
              <div key={r.attempt} className="p-3 flex items-center justify-between">
                <p className="text-caption text-ink-muted">Attempt {r.attempt}</p>
                <p className="font-mono text-caption text-ink">{r.status ?? "failed"}{r.rateLimitHeader ? ` · ${r.rateLimitHeader}` : ""}</p>
              </div>
            ))}
          </div>
          <p className="text-caption text-ink-faint">{result.note}</p>
        </div>
      )}
    </ToolShell>
  );
}

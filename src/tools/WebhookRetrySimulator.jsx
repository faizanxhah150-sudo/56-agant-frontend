import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function WebhookRetrySimulator({ tool }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleTest() {
    setError("");
    setResult(null);
    if (!url.trim()) {
      setError("Enter your webhook URL including https://");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/webhook-retry-simulator", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["webhook-retry-simulator"]}
      explanation={
        <>
          <p>
            Payment processors, CRMs, and most webhook senders retry failed deliveries with
            increasing delays between attempts — but whether your endpoint actually recovers and
            processes a delayed retry correctly (rather than silently dropping it, or worse,
            double-processing it) is something you normally only discover the hard way, in
            production.
          </p>
          <p>
            This tool sends up to three real test POST requests to your webhook URL with
            increasing delays (0s, 2s, 4s), stopping early on the first successful response, and
            reports exactly how your endpoint responded to each attempt.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Webhook URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTest()}
            placeholder="https://example.com/webhooks/incoming"
            className="input-field"
          />
        </div>
        <button onClick={handleTest} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Testing (takes a few seconds)…" : "Run Retry Test"}
        </button>
      </div>

      {loading && <LoadingState message="Sending retry sequence — this takes a few seconds…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="space-y-4">
          <div className="card p-5">
            <StatusPill status={result.succeeded ? "good" : "bad"}>
              {result.succeeded ? "Endpoint accepted the webhook" : "All attempts failed"}
            </StatusPill>
          </div>
          <div className="card divide-y divide-bg-border">
            {result.attempts.map((a) => (
              <div key={a.attempt} className="p-4 flex items-center justify-between gap-4">
                <p className="text-body text-ink">
                  Attempt {a.attempt} <span className="text-caption text-ink-faint">(delay {a.delayMs}ms)</span>
                </p>
                <p className="text-caption text-ink-muted">
                  {a.status ?? "failed"} · {a.responseMs}ms
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

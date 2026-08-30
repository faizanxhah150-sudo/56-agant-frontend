import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

const VERDICT_LABELS = {
  "no-cors-headers": { label: "No CORS headers present", status: "warn" },
  wildcard: { label: "Wildcard (*) — any site can read this", status: "warn" },
  "reflects-any-origin": { label: "Reflects any origin sent — effectively open", status: "bad" },
  allowlisted: { label: "Specific origin allowlisted", status: "good" },
};

export default function CorsPolicyAuditor({ tool }) {
  const [url, setUrl] = useState("");
  const [origin, setOrigin] = useState("");
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
      setResult(await apiPost("/api/cors-policy-auditor", { url, origin: origin || undefined }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const verdict = result ? VERDICT_LABELS[result.verdict] : null;

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["cors-policy-auditor"]}
      explanation={
        <>
          <p>
            Cross-Origin Resource Sharing (CORS) headers control which websites are allowed to
            make browser-based requests to your API and read the response. A permissive policy —
            especially <code>Access-Control-Allow-Origin: *</code> combined with{" "}
            <code>Access-Control-Allow-Credentials: true</code> — can let a malicious site make
            authenticated requests on behalf of a logged-in visitor.
          </p>
          <p>
            This tool sends a request with a test Origin header and inspects what your server
            actually responds with, flagging the specific risky combination above.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">API / URL to test</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://api.example.com/data" className="input-field" />
        </div>
        <div>
          <label className="label">Test origin (optional)</label>
          <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="https://example-test-origin.com" className="input-field" />
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {loading && <LoadingState message="Sending test request…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-4">
          <StatusPill status={verdict.status}>{verdict.label}</StatusPill>
          {result.risky && (
            <p className="text-body text-status-bad">
              Risky combination detected: wildcard origin with credentials allowed.
            </p>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-caption text-ink-faint mb-1">Access-Control-Allow-Origin</p>
              <p className="font-mono text-body text-ink">{result.accessControlAllowOrigin || "(not set)"}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">Access-Control-Allow-Credentials</p>
              <p className="font-mono text-body text-ink">{result.accessControlAllowCredentials || "(not set)"}</p>
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { StatusPill, LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

const RECORD_LABELS = { A: "A (website IP)", CNAME: "CNAME (alias)", MX: "MX (mail servers)", TXT: "TXT" };

export default function DnsHealthDiagnostic({ tool }) {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!domain.trim()) {
      setError("Enter a domain to check, e.g. example.com");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/dns-health-diagnostic", { domain }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["dns-health-diagnostic"]}
      explanation={
        <>
          <p>
            When a website goes down or email stops arriving, the cause is frequently DNS —
            but DNS is invisible to anyone who isn't specifically looking at it. This tool
            performs a live lookup of the four record types that matter most for a working
            website and working mail, and translates the raw results into a plain green/red
            summary.
          </p>
          <p>
            A DNS change can take anywhere from a few minutes to 48 hours to fully propagate
            worldwide, so if you've just made a change and something still looks unhealthy here,
            wait a bit and check again before assuming something's misconfigured.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Domain</label>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="example.com"
            className="input-field"
          />
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {loading && <LoadingState message="Running live DNS lookups…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="space-y-4">
          <div className="card p-5 flex flex-wrap gap-3">
            <StatusPill status={result.summary.websiteResolves ? "good" : "bad"}>
              Website DNS {result.summary.websiteResolves ? "resolves" : "not found"}
            </StatusPill>
            <StatusPill status={result.summary.mailConfigured ? "good" : "warn"}>
              Mail (MX) {result.summary.mailConfigured ? "configured" : "not configured"}
            </StatusPill>
          </div>
          {Object.entries(result.records).map(([type, values]) => (
            <div key={type} className="card p-5">
              <p className="label">{RECORD_LABELS[type] || type}</p>
              {values.length === 0 ? (
                <p className="text-caption text-ink-faint">No records found.</p>
              ) : (
                <div className="code-block space-y-1">
                  {values.map((v, i) => <div key={i}>{v}</div>)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  );
}

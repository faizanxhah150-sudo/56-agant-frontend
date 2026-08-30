import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function SmtpPortChecker({ tool }) {
  const [host, setHost] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!host.trim()) {
      setError("Enter a mail server hostname, e.g. mail.example.com");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/smtp-port-checker", { host }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["smtp-port-checker"]}
      explanation={
        <>
          <p>
            Many residential ISPs and some cloud/hosting providers block outbound port 25 by
            default to fight spam, which can silently prevent a misconfigured mail server from
            sending anything at all, with no error message that clearly points to "your network
            is blocking this port."
          </p>
          <p>
            This tool attempts a live TCP connection to your mail server's three standard SMTP
            ports and reports whether each accepted the connection and what greeting banner (if
            any) it sent back — a reachable port with a banner confirms it's open to the outside
            world.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Mail server hostname</label>
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="mail.example.com"
            className="input-field"
          />
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {loading && <LoadingState message="Attempting live SMTP connections…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card divide-y divide-bg-border">
          {result.results.map((r) => (
            <div key={r.port} className="p-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-body text-ink font-medium mb-1">{r.label}</p>
                {r.banner && <p className="text-caption text-ink-muted font-mono break-all">{r.banner}</p>}
              </div>
              <StatusPill status={r.open ? "good" : "bad"}>{r.open ? "Open" : "Closed/blocked"}</StatusPill>
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  );
}

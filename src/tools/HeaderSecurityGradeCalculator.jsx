import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ScoreMeter, StatusPill, LoadingState, EmptyState, ErrorState, CopyButton } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function HeaderSecurityGradeCalculator({ tool }) {
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
      setResult(await apiPost("/api/header-security-grade-calculator", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const reportText = result
    ? `Security Header Grade Report — ${url}\nGrade: ${result.grade} (${result.score}/100)\n\n` +
      result.headers.map((h) => `${h.present ? "✓" : "✗"} ${h.name}${h.value ? `: ${h.value}` : ""}`).join("\n")
    : "";

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["header-security-grade-calculator"]}
      explanation={
        <>
          <p>
            Security questionnaires from enterprise customers, cyber-insurance underwriters, and
            internal audit teams increasingly ask for a specific security header grade rather than
            a vague "yes, we're secure." This tool produces that grade directly from your live
            response headers, in a format you can paste into a report or questionnaire response.
          </p>
          <p>
            The grading logic is identical to the Security Headers Inspector tool — this version
            exists specifically for generating a copy-pasteable report artifact for audits.
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
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="https://example.com"
            className="input-field"
          />
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Generate Report"}
        </button>
      </div>

      {loading && <LoadingState message="Fetching response headers…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-h1 text-accent">{result.grade}</span>
              <ScoreMeter score={result.score} max={100} label="Header security score" />
            </div>
            <CopyButton text={reportText} label="Copy report" />
          </div>
          <div className="space-y-3">
            {result.headers.map((h) => (
              <div key={h.header} className="flex items-start justify-between gap-4 pb-3 border-b border-bg-border last:border-0 last:pb-0">
                <p className="text-body text-ink font-medium">{h.name}</p>
                <StatusPill status={h.present ? "good" : "bad"}>{h.present ? "Present" : "Missing"}</StatusPill>
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

function statusColor(code) {
  if (code >= 200 && code < 300) return "text-status-good";
  if (code >= 300 && code < 400) return "text-status-warn";
  return "text-status-bad";
}

export default function HttpStatusCodeInspector({ tool }) {
  const [mode, setMode] = useState("code");
  const [code, setCode] = useState("404");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (mode === "code" && !code.trim()) {
      setError("Enter a status code.");
      return;
    }
    if (mode === "url" && !url.trim()) {
      setError("Enter a URL to check.");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/http-status-code-inspector", mode === "code" ? { code } : { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["http-status-code-inspector"]}
      explanation={
        <>
          <p>
            HTTP status codes are precise and useful — for developers. For anyone else, a "502
            Bad Gateway" or "403 Forbidden" is just a wall of jargon standing between them and
            understanding why something broke.
          </p>
          <p>
            This tool translates any status code into a plain-language explanation of what it
            typically means and who's usually responsible for fixing it (your server, an upstream
            service, or the requester). You can either type a code directly, or point it at a live
            URL and let it check the real status for you.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setMode("code")}
            className={`text-caption px-3 py-1.5 rounded-full border ${mode === "code" ? "bg-accent/10 border-accent/50 text-accent" : "border-bg-border text-ink-muted"}`}
          >
            Enter a code
          </button>
          <button
            onClick={() => setMode("url")}
            className={`text-caption px-3 py-1.5 rounded-full border ${mode === "url" ? "bg-accent/10 border-accent/50 text-accent" : "border-bg-border text-ink-muted"}`}
          >
            Check a live URL
          </button>
        </div>
        {mode === "code" ? (
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="404"
            className="input-field max-w-xs"
          />
        ) : (
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="https://example.com"
            className="input-field"
          />
        )}
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Explain"}
        </button>
      </div>

      {loading && <LoadingState />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-3">
          <p className={`text-h1 ${statusColor(result.status)}`}>{result.status}</p>
          <p className="text-body text-ink-muted">{result.explanation}</p>
        </div>
      )}
    </ToolShell>
  );
}

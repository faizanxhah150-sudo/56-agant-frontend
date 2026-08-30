import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { StatusPill, LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function MixedContentInspector({ tool }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!url.trim()) {
      setError("Enter an https:// URL to check.");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/mixed-content-inspector", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["mixed-content-inspector"]}
      explanation={
        <>
          <p>
            Once a page loads over HTTPS, browsers expect every sub-resource on it — images,
            scripts, stylesheets, iframes — to also load securely. A single leftover HTTP
            reference, often from an old image URL or a third-party embed that was never updated,
            breaks that guarantee and either gets silently blocked or triggers a visible browser
            warning, depending on the resource type.
          </p>
          <p>
            This tool fetches your page's HTML and scans it for <code>src</code> and{" "}
            <code>href</code> attributes pointing to <code>http://</code> URLs, listing every one
            it finds so you can update them to HTTPS (or protocol-relative <code>//</code> URLs).
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Page URL (https://)</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="https://example.com/page"
            className="input-field"
          />
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Scanning…" : "Scan"}
        </button>
      </div>

      {loading && <LoadingState message="Fetching and scanning page HTML…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-4">
          <StatusPill status={result.insecureResourceCount === 0 ? "good" : "bad"}>
            {result.insecureResourceCount === 0 ? "No mixed content found" : `${result.insecureResourceCount} insecure resource(s) found`}
          </StatusPill>
          {result.resources.length > 0 && (
            <div className="code-block max-h-64 overflow-y-auto space-y-1">
              {result.resources.map((r, i) => <div key={i} className="break-all">{r}</div>)}
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
}

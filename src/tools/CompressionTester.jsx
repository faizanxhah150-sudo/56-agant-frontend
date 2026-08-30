import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

function fmtBytes(bytes) {
  if (bytes == null) return "unavailable";
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export default function CompressionTester({ tool }) {
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
      setResult(await apiPost("/api/compression-tester", { url }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["compression-tester"]}
      explanation={
        <>
          <p>
            Gzip and Brotli compression typically shrink text-based responses (HTML, CSS, JS,
            JSON) by 60–80% before they travel over the network, which directly speeds up load
            times — especially for visitors on slower mobile connections. Enabling it is usually a
            one-line server or CDN config change, but it's easy to overlook, especially on
            self-managed servers.
          </p>
          <p>
            This tool fetches your page twice — once requesting compression, once requesting an
            uncompressed response — and compares the byte sizes to show whether compression is
            active and roughly how much it's saving.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Page URL</label>
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
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {loading && <LoadingState message="Fetching compressed and uncompressed responses…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-4">
          <StatusPill status={result.compressionActive ? "good" : "bad"}>
            {result.compressionActive ? `Compression active (${result.encoding})` : "No compression detected"}
          </StatusPill>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <p className="text-caption text-ink-faint mb-1">Compressed size</p>
              <p className="text-h3 text-ink">{fmtBytes(result.compressedBytes)}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">Uncompressed size</p>
              <p className="text-h3 text-ink">{fmtBytes(result.uncompressedBytes)}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">Estimated savings</p>
              <p className="text-h3 text-accent">
                {result.estimatedSavingsPct != null ? `${result.estimatedSavingsPct}%` : "—"}
              </p>
            </div>
          </div>
          <p className="text-caption text-ink-faint">{result.note}</p>
        </div>
      )}
    </ToolShell>
  );
}

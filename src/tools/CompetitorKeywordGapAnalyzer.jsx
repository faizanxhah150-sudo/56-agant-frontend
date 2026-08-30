import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

function SignalCard({ title, data }) {
  return (
    <div className="card p-5 space-y-3">
      <p className="label mb-0">{title}</p>
      <div>
        <p className="text-caption text-ink-faint mb-1">Title tag</p>
        <p className="text-body text-ink">{data.title || "(none found)"}</p>
      </div>
      <div>
        <p className="text-caption text-ink-faint mb-1">Meta description</p>
        <p className="text-body text-ink-muted">{data.description || "(none found)"}</p>
      </div>
      <div>
        <p className="text-caption text-ink-faint mb-1">H1/H2 headings</p>
        {data.headings.length === 0 ? (
          <p className="text-caption text-ink-faint">(none found)</p>
        ) : (
          <ul className="text-caption text-ink-muted list-disc list-inside space-y-0.5">
            {data.headings.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function CompetitorKeywordGapAnalyzer({ tool }) {
  const [yourUrl, setYourUrl] = useState("");
  const [competitorUrl, setCompetitorUrl] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setError("");
    setResult(null);
    if (!yourUrl.trim() || !competitorUrl.trim()) {
      setError("Enter both your URL and a competitor's URL, including https://");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/competitor-keyword-gap-analyzer", { yourUrl, competitorUrl }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["competitor-keyword-gap-analyzer"]}
      explanation={
        <>
          <p>
            When a competitor consistently outranks you for queries you'd expect to win, the
            explanation is usually visible right on the page — in their title tag, meta
            description, and heading structure, which are exactly the on-page elements search
            engines weight most heavily for topical relevance.
          </p>
          <p>
            This tool fetches both pages live and extracts these signals side by side, then lists
            meaningful words (4+ characters) that appear in the competitor's title, description,
            or headings but not in yours — a practical starting list of terms worth considering
            for your own page.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Your page URL</label>
          <input type="text" value={yourUrl} onChange={(e) => setYourUrl(e.target.value)} placeholder="https://yoursite.com/page" className="input-field" />
        </div>
        <div>
          <label className="label">Competitor's page URL</label>
          <input type="text" value={competitorUrl} onChange={(e) => setCompetitorUrl(e.target.value)} placeholder="https://competitor.com/page" className="input-field" />
        </div>
        <button onClick={handleAnalyze} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Analyzing…" : "Analyze"}
        </button>
      </div>

      {loading && <LoadingState message="Fetching both pages…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <SignalCard title="Your page" data={result.yours} />
            <SignalCard title="Competitor's page" data={result.competitor} />
          </div>
          <div className="card p-5">
            <p className="label">Potential keyword gap</p>
            {result.potentialKeywordGap.length === 0 ? (
              <p className="text-body text-ink-muted">No meaningful gap found — your on-page content covers similar terms.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {result.potentialKeywordGap.map((w) => (
                  <span key={w} className="pill pill-warn">{w}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

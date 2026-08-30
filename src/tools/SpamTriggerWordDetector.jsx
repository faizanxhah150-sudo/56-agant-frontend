import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ScoreMeter, EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";
import { scoreSubjectLine } from "../data/spamWords.js";

function riskLevel(score) {
  if (score === 0) return { label: "Clean", status: "good" };
  if (score <= 5) return { label: "Low risk", status: "good" };
  if (score <= 12) return { label: "Moderate risk", status: "warn" };
  return { label: "High risk", status: "bad" };
}

export default function SpamTriggerWordDetector({ tool }) {
  const [subject, setSubject] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleScan() {
    setError("");
    if (!subject.trim()) {
      setError("Enter a subject line to scan.");
      setResult(null);
      return;
    }
    setResult(scoreSubjectLine(subject));
  }

  const risk = result ? riskLevel(result.score) : null;

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["spam-trigger-word-detector"]}
      explanation={
        <>
          <p>
            Spam filters use hundreds of weighted signals to decide whether an inbound email
            belongs in the inbox or the spam folder, and subject-line wording is one of the
            heaviest-weighted signals a sender can control directly. Phrases like "act now",
            "100% free", and "no credit check" appear so often in genuine spam that filters treat
            them as strong evidence even when the sender's reputation is otherwise clean.
          </p>
          <p>
            This tool checks your subject line against a curated database of known trigger
            phrases, plus two structural signals — excessive capitalization and stacked
            exclamation marks — that filters also penalize. Each match is weighted, and the
            weights sum into an overall risk score.
          </p>
          <p>
            A score of zero doesn't guarantee inbox placement — sender reputation, authentication
            (SPF/DKIM/DMARC), and recipient engagement matter just as much — but a high score is a
            reliable early warning that your wording needs a rewrite before you send.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Subject line</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleScan()}
            placeholder="e.g. Act now — 100% free trial, no credit card!"
            className="input-field"
          />
        </div>
        <button onClick={handleScan} className="btn-primary w-full sm:w-auto">
          Scan
        </button>
      </div>

      {error && <ErrorState message={error} />}
      {!error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-4">
          <ScoreMeter score={Math.max(0, 30 - result.score)} max={30} label="Deliverability-friendly score" />
          <StatusPill status={risk.status}>{risk.label}</StatusPill>
          {result.matches.length === 0 ? (
            <p className="text-body text-ink-muted">No flagged words or patterns found.</p>
          ) : (
            <div>
              <p className="label">Flagged words &amp; patterns</p>
              <div className="flex flex-wrap gap-2">
                {result.matches.map((m, i) => (
                  <span key={i} className="pill pill-warn">
                    {m.phrase} (+{m.weight})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
}

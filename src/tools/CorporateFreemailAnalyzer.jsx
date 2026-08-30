import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { EmptyState, ScoreMeter } from "../components/ToolUi.jsx";

const FREE_PROVIDERS = new Set([
  "gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com",
  "live.com", "msn.com", "protonmail.com", "gmx.com", "mail.com", "yandex.com",
  "zoho.com", "rediffmail.com",
]);

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

export default function CorporateFreemailAnalyzer({ tool }) {
  const [raw, setRaw] = useState("");

  const stats = useMemo(() => {
    const domains = [];
    let m;
    const re = new RegExp(EMAIL_RE);
    while ((m = re.exec(raw))) domains.push(m[1].toLowerCase());
    if (domains.length === 0) return null;
    const free = domains.filter((d) => FREE_PROVIDERS.has(d)).length;
    const corporate = domains.length - free;
    return {
      total: domains.length,
      free,
      corporate,
      freePct: Math.round((free / domains.length) * 100),
      corporatePct: Math.round((corporate / domains.length) * 100),
    };
  }, [raw]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["corporate-freemail-analyzer"]}
      explanation={
        <>
          <p>
            The ratio of corporate to free-mailbox addresses in a lead list is one of the fastest
            proxy signals for list quality in B2B sales and marketing. A list dominated by Gmail
            and Yahoo addresses usually means the leads came from a low-intent source — a generic
            content download or a low-quality data provider — rather than genuine business
            interest.
          </p>
          <p>
            This tool checks each email's domain against a list of major free consumer email
            providers and reports the split. Everything runs in your browser, so a confidential
            lead list never leaves your machine.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Email list (one per line, or any text containing emails)</label>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={8}
            placeholder={"jane@acmecorp.com\njohn@gmail.com\n..."}
            className="input-field font-mono text-caption"
          />
        </div>
      </div>

      {!stats ? (
        <EmptyState message="Paste a list of emails above to see the corporate-vs-free split." />
      ) : (
        <div className="card p-5 space-y-4">
          <ScoreMeter score={stats.corporatePct} max={100} label="Corporate domain share" />
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div>
              <p className="text-caption text-ink-faint mb-1">Total emails</p>
              <p className="text-h3 text-ink">{stats.total}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">Corporate</p>
              <p className="text-h3 text-status-good">{stats.corporate} ({stats.corporatePct}%)</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">Free mailbox</p>
              <p className="text-h3 text-status-warn">{stats.free} ({stats.freePct}%)</p>
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

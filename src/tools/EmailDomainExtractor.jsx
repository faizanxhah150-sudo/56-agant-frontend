import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, DownloadButton, EmptyState } from "../components/ToolUi.jsx";

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

export default function EmailDomainExtractor({ tool }) {
  const [raw, setRaw] = useState("");
  const [ran, setRan] = useState(false);

  const { emails, domains } = useMemo(() => {
    const found = raw.match(EMAIL_RE) || [];
    const uniqueEmails = Array.from(new Set(found.map((e) => e.toLowerCase())));
    const uniqueDomains = Array.from(new Set(uniqueEmails.map((e) => e.split("@")[1])));
    return { emails: uniqueEmails, domains: uniqueDomains };
  }, [raw]);

  const csv = "email,domain\n" + emails.map((e) => `${e},${e.split("@")[1]}`).join("\n");

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["email-domain-extractor"]}
      explanation={
        <>
          <p>
            Raw data exports — chat transcripts, scraped web pages, PDFs pasted as text, old CSV
            dumps — rarely come with emails in a clean, isolated column. This tool applies a
            strict email-format pattern across whatever text you paste and returns only the
            matches that are structurally valid, deduplicated, and lowercased for consistency.
          </p>
          <p>
            It's useful for sales teams cleaning up a scraped lead list, support teams pulling
            contacts out of an old ticket export, or anyone consolidating addresses scattered
            across multiple documents into one clean CSV.
          </p>
          <p>
            Everything runs in your browser — the text you paste is never uploaded anywhere,
            which matters if the source data is confidential.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Raw text, CSV, or JSON</label>
          <textarea
            value={raw}
            onChange={(e) => {
              setRaw(e.target.value);
              setRan(true);
            }}
            rows={8}
            placeholder="Paste any text containing email addresses…"
            className="input-field font-mono text-caption"
          />
        </div>
        <p className="text-caption text-ink-faint">
          Results update automatically as you type — no button needed.
        </p>
      </div>

      {!ran || emails.length === 0 ? (
        <EmptyState message={ran ? "No valid email addresses found in that text." : "Paste some text above to extract emails and domains."} />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="label mb-0">Emails ({emails.length})</label>
              <div className="flex gap-2">
                <CopyButton text={emails.join("\n")} />
                <DownloadButton filename="emails.csv" content={csv} mimeType="text/csv" />
              </div>
            </div>
            <div className="code-block max-h-64 overflow-y-auto">
              {emails.map((e) => (
                <div key={e}>{e}</div>
              ))}
            </div>
          </div>
          <div className="card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="label mb-0">Domains ({domains.length})</label>
              <CopyButton text={domains.join("\n")} />
            </div>
            <div className="code-block max-h-64 overflow-y-auto">
              {domains.map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

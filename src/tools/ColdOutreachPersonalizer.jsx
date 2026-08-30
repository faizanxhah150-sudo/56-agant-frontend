import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, EmptyState, ErrorState } from "../components/ToolUi.jsx";

const DEFAULT_TEMPLATE =
  "Hi {{name}}, I noticed {{company}} has been growing fast — as {{role}}, you're probably juggling a lot. Wanted to reach out because we help teams like yours cut that workload in half.";

export default function ColdOutreachPersonalizer({ tool }) {
  const [leads, setLeads] = useState("Jane Doe, Acme Corp, Head of Marketing\nJohn Smith, Globex Inc, VP Sales");
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [error, setError] = useState("");

  const messages = useMemo(() => {
    setError("");
    const rows = leads
      .split("\n")
      .map((l) => l.split(",").map((s) => s.trim()))
      .filter((parts) => parts.length >= 1 && parts[0]);

    if (rows.length === 0) return [];

    return rows.map(([name, company = "", role = ""]) => {
      const msg = template
        .replace(/{{\s*name\s*}}/gi, name || "there")
        .replace(/{{\s*company\s*}}/gi, company || "your company")
        .replace(/{{\s*role\s*}}/gi, role || "your role");
      return { name, company, role, message: msg };
    });
  }, [leads, template]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["cold-outreach-personalizer"]}
      explanation={
        <>
          <p>
            Personalization is the single biggest lever for cold email reply rates, but doing it
            by hand for a list of any real size is a time sink. This tool applies your template
            to every lead in your list at once, substituting name, company, and role wherever the
            corresponding placeholder appears.
          </p>
          <p>
            The output is a mail-merge draft, not a finished campaign — always skim a sample
            before sending to catch anything that reads awkwardly for a specific lead, and add at
            least one detail per message that couldn't have come from a template (a recent post,
            a shared connection) if you want reply rates that beat pure automation.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Leads — one per line: name, company, role</label>
          <textarea
            value={leads}
            onChange={(e) => setLeads(e.target.value)}
            rows={6}
            className="input-field font-mono text-caption"
          />
        </div>
        <div>
          <label className="label">Template (use {"{{name}}"}, {"{{company}}"}, {"{{role}}"})</label>
          <textarea
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            rows={4}
            className="input-field"
          />
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {messages.length === 0 ? (
        <EmptyState message="Add leads above to generate personalized messages." />
      ) : (
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div key={i} className="card p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-caption text-ink-faint">
                  {m.name}{m.company ? ` · ${m.company}` : ""}{m.role ? ` · ${m.role}` : ""}
                </p>
                <CopyButton text={m.message} />
              </div>
              <p className="text-body text-ink">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  );
}

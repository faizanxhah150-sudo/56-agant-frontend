import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, DownloadButton } from "../components/ToolUi.jsx";

export default function SowDocumentGenerator({ tool }) {
  const [agency, setAgency] = useState("Studio North");
  const [client, setClient] = useState("Acme Corp");
  const [summary, setSummary] = useState("A redesign and rebuild of the Acme Corp marketing website.");
  const [deliverables, setDeliverables] = useState("Discovery & audit\nWireframes & design system\nFront-end build\nQA & launch");
  const [timeline, setTimeline] = useState("6 weeks from kickoff");
  const [payment, setPayment] = useState("50% deposit on signing, 50% on delivery");

  const document = useMemo(() => {
    const deliverableList = deliverables.split("\n").map((d) => d.trim()).filter(Boolean);
    return [
      `SCOPE OF WORK`,
      ``,
      `Prepared by: ${agency}`,
      `Prepared for: ${client}`,
      `Date: ${new Date().toLocaleDateString()}`,
      ``,
      `PROJECT SUMMARY`,
      summary,
      ``,
      `DELIVERABLES`,
      ...deliverableList.map((d, i) => `${i + 1}. ${d}`),
      ``,
      `TIMELINE`,
      timeline,
      ``,
      `PAYMENT TERMS`,
      payment,
      ``,
      `This document outlines the agreed scope of work between ${agency} and ${client}. Any work`,
      `outside the deliverables listed above will be treated as a change request and quoted`,
      `separately.`,
    ].join("\n");
  }, [agency, client, summary, deliverables, timeline, payment]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["sow-document-generator"]}
      explanation={
        <>
          <p>
            A Scope of Work document exists to prevent the single most common source of
            client-agency friction: disagreement over what was actually promised. A clear SOW
            names the deliverables explicitly, sets a timeline both sides can be held to, and
            states payment terms up front — so any request outside that list is visibly a new
            ask, not scope creep.
          </p>
          <p>
            This tool assembles a clean, consistently formatted document from your inputs. It's a
            solid starting draft — for anything with real money or legal weight behind it, have
            the final version reviewed the same way you would any contract.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Your agency/name</label>
            <input type="text" value={agency} onChange={(e) => setAgency(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label">Client name</label>
            <input type="text" value={client} onChange={(e) => setClient(e.target.value)} className="input-field" />
          </div>
        </div>
        <div>
          <label className="label">Project summary</label>
          <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} className="input-field" />
        </div>
        <div>
          <label className="label">Deliverables (one per line)</label>
          <textarea value={deliverables} onChange={(e) => setDeliverables(e.target.value)} rows={4} className="input-field" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Timeline</label>
            <input type="text" value={timeline} onChange={(e) => setTimeline(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label">Payment terms</label>
            <input type="text" value={payment} onChange={(e) => setPayment(e.target.value)} className="input-field" />
          </div>
        </div>
      </div>

      <div className="card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="label mb-0">Generated document</label>
          <div className="flex gap-2">
            <CopyButton text={document} />
            <DownloadButton filename="scope-of-work.txt" content={document} />
          </div>
        </div>
        <pre className="code-block whitespace-pre-wrap">{document}</pre>
      </div>
    </ToolShell>
  );
}

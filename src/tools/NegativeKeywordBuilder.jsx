import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton } from "../components/ToolUi.jsx";

const INDUSTRY_LISTS = {
  "General (any industry)": ["free", "cheap", "jobs", "job", "salary", "diy", "how to", "wikipedia", "used", "torrent", "reddit"],
  "SaaS / Software": ["free trial hack", "crack", "nulled", "open source alternative", "download", "pirated", "torrent", "review reddit"],
  "E-commerce / Retail": ["complaints", "returns policy", "class action", "wholesale", "bulk", "used", "refurbished", "manual"],
  "Real Estate": ["rent to own", "foreclosure", "for sale by owner", "fsbo", "zillow", "trulia", "cheap apartments"],
  "Legal Services": ["free legal advice", "diy", "template", "sample letter", "pro bono", "small claims forms"],
  "Healthcare / Clinics": ["free clinic", "home remedy", "symptoms", "wikipedia", "nhs", "medicaid"],
};

export default function NegativeKeywordBuilder({ tool }) {
  const [industry, setIndustry] = useState("General (any industry)");
  const [custom, setCustom] = useState("");
  const [removed, setRemoved] = useState(new Set());

  const suggested = INDUSTRY_LISTS[industry];

  const finalList = useMemo(() => {
    const customWords = custom.split(",").map((w) => w.trim()).filter(Boolean);
    const base = suggested.filter((w) => !removed.has(w));
    return Array.from(new Set([...base, ...customWords]));
  }, [suggested, removed, custom]);

  function toggle(word) {
    setRemoved((prev) => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word);
      else next.add(word);
      return next;
    });
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["negative-keyword-builder"]}
      explanation={
        <>
          <p>
            Negative keywords tell Google Ads which searches to explicitly exclude from
            triggering your ad, even if they'd otherwise match your target keywords. Without
            them, a broad-match keyword like "project management software" can also show your ad
            for "project management jobs" or "free project management software" — clicks that
            were never going to convert but still cost you money.
          </p>
          <p>
            This tool provides a starting negative-keyword list for a few common industries. Add
            your own known irrelevant terms in the custom field, uncheck any suggested term that
            doesn't apply to you, and copy the final list into your Google Ads negative keyword
            list at the campaign or ad group level.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Industry</label>
          <select value={industry} onChange={(e) => { setIndustry(e.target.value); setRemoved(new Set()); }} className="input-field">
            {Object.keys(INDUSTRY_LISTS).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Suggested negative keywords (uncheck to remove)</label>
          <div className="flex flex-wrap gap-2">
            {suggested.map((w) => (
              <button
                key={w}
                onClick={() => toggle(w)}
                className={`text-caption px-3 py-1.5 rounded-full border transition-colors ${
                  removed.has(w)
                    ? "border-bg-border text-ink-faint line-through"
                    : "border-accent/40 bg-accent/10 text-accent"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="label">Add your own (comma-separated)</label>
          <input type="text" value={custom} onChange={(e) => setCustom(e.target.value)} className="input-field" placeholder="tutorial, template, manual" />
        </div>
      </div>

      <div className="card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="label mb-0">Final negative keyword list ({finalList.length})</label>
          <CopyButton text={finalList.join("\n")} />
        </div>
        <pre className="code-block whitespace-pre-wrap">{finalList.join("\n")}</pre>
      </div>
    </ToolShell>
  );
}

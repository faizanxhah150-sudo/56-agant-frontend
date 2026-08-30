import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, EmptyState } from "../components/ToolUi.jsx";

let idCounter = 2;

export default function BioLinkUtmStacker({ tool }) {
  const [source, setSource] = useState("instagram");
  const [medium, setMedium] = useState("bio-link");
  const [links, setLinks] = useState([
    { id: 0, label: "Shop new arrivals", url: "https://example.com/new" },
    { id: 1, label: "Read our latest post", url: "https://example.com/blog/latest" },
  ]);

  function addLink() {
    setLinks((l) => [...l, { id: idCounter++, label: "", url: "" }]);
  }
  function removeLink(id) {
    setLinks((l) => l.filter((x) => x.id !== id));
  }
  function updateLink(id, field, value) {
    setLinks((l) => l.map((x) => (x.id === id ? { ...x, [field]: value } : x)));
  }

  const stacked = useMemo(() => {
    return links
      .filter((l) => l.url.trim())
      .map((l) => {
        let tagged = l.url.trim();
        try {
          const u = new URL(l.url.trim());
          if (source.trim()) u.searchParams.set("utm_source", source.trim());
          if (medium.trim()) u.searchParams.set("utm_medium", medium.trim());
          if (l.label.trim()) u.searchParams.set("utm_campaign", l.label.trim().toLowerCase().replace(/\s+/g, "-"));
          tagged = u.toString();
        } catch {
          tagged = null;
        }
        return { label: l.label || "(untitled link)", url: l.url, tagged };
      });
  }, [links, source, medium]);

  const allText = stacked
    .filter((s) => s.tagged)
    .map((s) => `${s.label}: ${s.tagged}`)
    .join("\n");

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["bio-link-utm-stacker"]}
      explanation={
        <>
          <p>
            A "link in bio" page routes traffic to several destinations from one shared spot, but
            without UTM tags, all of that traffic shows up in analytics as one undifferentiated
            source — you can see people came from your bio page, but not which specific link they
            clicked.
          </p>
          <p>
            This tool tags every destination link with a shared source and medium (e.g.
            instagram / bio-link), plus a campaign parameter generated from each link's label, so
            each one is individually trackable in Analytics while still rolling up under one
            consistent source/medium pair.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Shared UTM source</label>
            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label">Shared UTM medium</label>
            <input type="text" value={medium} onChange={(e) => setMedium(e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="space-y-3">
          {links.map((l) => (
            <div key={l.id} className="p-3 rounded-sm bg-bg border border-bg-border flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={l.label}
                onChange={(e) => updateLink(l.id, "label", e.target.value)}
                placeholder="Label"
                className="input-field sm:w-48"
              />
              <input
                type="text"
                value={l.url}
                onChange={(e) => updateLink(l.id, "url", e.target.value)}
                placeholder="https://example.com/destination"
                className="input-field flex-1"
              />
              <button onClick={() => removeLink(l.id)} aria-label="Remove link" className="text-ink-faint hover:text-status-bad transition-colors px-2">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addLink} className="btn-secondary">
          <Plus size={15} /> Add link
        </button>
      </div>

      {stacked.length === 0 ? (
        <EmptyState message="Add at least one destination link above." />
      ) : (
        <div className="card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="label mb-0">Tagged links</label>
            <CopyButton text={allText} label="Copy all" />
          </div>
          <div className="space-y-2">
            {stacked.map((s, i) => (
              <div key={i} className="text-caption">
                <p className="text-ink font-medium">{s.label}</p>
                {s.tagged ? (
                  <p className="font-mono text-ink-muted break-all">{s.tagged}</p>
                ) : (
                  <p className="text-status-bad">Invalid URL — include https://</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

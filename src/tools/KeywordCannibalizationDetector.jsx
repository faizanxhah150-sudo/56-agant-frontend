import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { EmptyState, StatusPill } from "../components/ToolUi.jsx";

export default function KeywordCannibalizationDetector({ tool }) {
  const [raw, setRaw] = useState(
    "/blog/best-running-shoes, best running shoes\n/guides/running-shoes, best running shoes\n/blog/trail-shoes, trail running shoes"
  );

  const groups = useMemo(() => {
    const rows = raw
      .split("\n")
      .map((line) => line.split(",").map((s) => s.trim()))
      .filter((parts) => parts.length >= 2 && parts[0] && parts[1]);

    const byKeyword = {};
    for (const [url, keyword] of rows) {
      const key = keyword.toLowerCase();
      if (!byKeyword[key]) byKeyword[key] = [];
      if (!byKeyword[key].includes(url)) byKeyword[key].push(url);
    }
    return Object.entries(byKeyword).map(([keyword, urls]) => ({ keyword, urls }));
  }, [raw]);

  const conflicts = groups.filter((g) => g.urls.length > 1);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["keyword-cannibalization-detector"]}
      explanation={
        <>
          <p>
            Keyword cannibalization happens gradually — a blog post targets "best running shoes",
            then six months later a buying guide targets the exact same phrase without anyone
            checking what already existed. Google now has two pages from the same site competing
            for one query, and typically neither ranks as well as a single consolidated page
            would.
          </p>
          <p>
            This tool groups your pages by target keyword and flags any keyword claimed by more
            than one URL. The fix is usually one of: merge the two pages into one stronger page
            with a redirect, or clearly differentiate their target keywords so they're not
            competing.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-2">
        <label className="label">One row per page — format: URL, target keyword</label>
        <textarea
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          rows={8}
          className="input-field font-mono text-caption"
          spellCheck={false}
        />
      </div>

      {groups.length === 0 ? (
        <EmptyState message="Add rows above in the format URL, keyword to check for conflicts." />
      ) : conflicts.length === 0 ? (
        <div className="card p-5 text-body text-status-good">
          No keyword conflicts found — every keyword maps to exactly one page.
        </div>
      ) : (
        <div className="card divide-y divide-bg-border">
          {conflicts.map((g) => (
            <div key={g.keyword} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-body text-ink font-medium">{g.keyword}</p>
                <StatusPill status="bad">{g.urls.length} pages competing</StatusPill>
              </div>
              <ul className="text-caption text-ink-muted space-y-1">
                {g.urls.map((u) => (
                  <li key={u} className="font-mono">{u}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  );
}

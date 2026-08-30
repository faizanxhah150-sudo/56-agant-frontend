import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, EmptyState } from "../components/ToolUi.jsx";

const PLATFORMS = [
  { key: "x", name: "X / Twitter", limit: 280 },
  { key: "instagram", name: "Instagram caption", limit: 2200 },
  { key: "linkedin", name: "LinkedIn post", limit: 3000 },
  { key: "facebook", name: "Facebook post (optimal, not max)", limit: 500 },
];

export default function SocialPostOptimizer({ tool }) {
  const [text, setText] = useState("");

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["social-post-optimizer"]}
      explanation={
        <>
          <p>
            Every platform enforces (or rewards) a different length: X hard-truncates at 280
            characters, Instagram technically allows over 2,000 but engagement drops off after
            the first couple of lines before the "more" fold, and Facebook's optimal length for
            engagement is much shorter than its technical maximum.
          </p>
          <p>
            Paste your post once, and this tool shows a live character count against each
            platform's limit, so you can see immediately which versions need trimming before you
            post the same idea everywhere.
          </p>
        </>
      }
    >
      <div className="card p-5">
        <label className="label">Your post text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Write your post once here…"
          className="input-field"
        />
      </div>

      {!text.trim() ? (
        <EmptyState message="Type your post above to see how it fits each platform." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {PLATFORMS.map((p) => {
            const over = text.length > p.limit;
            const truncated = over ? text.slice(0, p.limit - 1) + "…" : text;
            return (
              <div key={p.key} className="card p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-body font-medium text-ink">{p.name}</p>
                  <span className={`text-caption font-mono ${over ? "text-status-bad" : "text-status-good"}`}>
                    {text.length}/{p.limit}
                  </span>
                </div>
                <p className="text-caption text-ink-muted whitespace-pre-wrap">{truncated}</p>
                <div className="flex justify-end">
                  <CopyButton text={truncated} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ToolShell>
  );
}

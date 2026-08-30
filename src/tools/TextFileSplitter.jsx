import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { DownloadButton, EmptyState, ErrorState } from "../components/ToolUi.jsx";

export default function TextFileSplitter({ tool }) {
  const [raw, setRaw] = useState("");
  const [linesPerChunk, setLinesPerChunk] = useState("1000");

  const { chunks, error, totalLines } = useMemo(() => {
    const n = parseInt(linesPerChunk, 10);
    if (isNaN(n) || n <= 0) return { error: "Enter a positive number of lines per chunk.", chunks: [], totalLines: 0 };
    if (!raw.trim()) return { error: "", chunks: [], totalLines: 0 };
    const lines = raw.split("\n");
    const result = [];
    for (let i = 0; i < lines.length; i += n) {
      result.push(lines.slice(i, i + n).join("\n"));
    }
    return { chunks: result, error: "", totalLines: lines.length };
  }, [raw, linesPerChunk]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["text-file-splitter"]}
      explanation={
        <>
          <p>
            Some tools and scripts choke on very large inputs — a CSV import with a row limit, a
            spreadsheet app that grinds to a halt past a few hundred thousand rows, or an API with
            a per-request payload cap. Splitting a huge file into consistent, smaller chunks
            beforehand avoids all of that.
          </p>
          <p>
            Paste your text (or CSV/TSV data — the tool treats it as plain lines, so keep your
            header row in mind if you split CSV data) and choose how many lines each chunk should
            contain. Every chunk becomes an individually downloadable file, numbered in order.
          </p>
          <p>
            Everything happens in your browser's memory — very large pastes (tens of megabytes)
            may be slow depending on your device, since there's no server doing the work.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Paste your text or CSV data</label>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={8}
            className="input-field font-mono text-caption"
            spellCheck={false}
          />
        </div>
        <div className="max-w-xs">
          <label className="label">Lines per chunk</label>
          <input
            type="number"
            value={linesPerChunk}
            onChange={(e) => setLinesPerChunk(e.target.value)}
            className="input-field"
            min="1"
          />
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {!error && chunks.length === 0 && (
        <EmptyState message="Paste text above to split it into downloadable chunks." />
      )}

      {chunks.length > 0 && (
        <div className="card p-5 space-y-3">
          <p className="text-caption text-ink-muted">
            {totalLines} total lines → {chunks.length} chunk(s) of up to {linesPerChunk} lines each.
          </p>
          <div className="flex flex-wrap gap-2">
            {chunks.map((chunk, i) => (
              <DownloadButton
                key={i}
                filename={`chunk-${String(i + 1).padStart(3, "0")}.txt`}
                content={chunk}
                label={`Chunk ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </ToolShell>
  );
}

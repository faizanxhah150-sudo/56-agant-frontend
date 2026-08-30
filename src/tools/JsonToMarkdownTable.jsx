import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, DownloadButton, ErrorState, EmptyState } from "../components/ToolUi.jsx";

function cellToString(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "object") return JSON.stringify(v);
  return String(v).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function jsonToMarkdownTable(data) {
  let rows;
  if (Array.isArray(data)) {
    rows = data;
  } else if (typeof data === "object" && data !== null) {
    rows = [data];
  } else {
    throw new Error("JSON must be an object or an array of objects.");
  }
  if (rows.length === 0) throw new Error("The JSON array is empty — nothing to convert.");

  const columns = [];
  for (const row of rows) {
    if (typeof row !== "object" || row === null || Array.isArray(row)) {
      throw new Error("Every item in the array must be a plain object with key/value pairs.");
    }
    for (const key of Object.keys(row)) {
      if (!columns.includes(key)) columns.push(key);
    }
  }

  const header = `| ${columns.join(" | ")} |`;
  const divider = `| ${columns.map(() => "---").join(" | ")} |`;
  const body = rows
    .map((row) => `| ${columns.map((c) => cellToString(row[c])).join(" | ")} |`)
    .join("\n");

  return [header, divider, body].join("\n");
}

export default function JsonToMarkdownTable({ tool }) {
  const [raw, setRaw] = useState(
    '[\n  { "name": "Widget A", "price": 19.99, "inStock": true },\n  { "name": "Widget B", "price": 24.5, "inStock": false }\n]'
  );
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [ran, setRan] = useState(false);

  const rowCount = useMemo(() => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.length : 1;
    } catch {
      return null;
    }
  }, [raw]);

  function handleConvert() {
    setRan(true);
    setError("");
    setOutput("");
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      setError(`Invalid JSON: ${e.message}`);
      return;
    }
    try {
      setOutput(jsonToMarkdownTable(parsed));
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["json-to-markdown-table"]}
      explanation={
        <>
          <p>
            API responses, database exports, and config files are almost always JSON, but
            documentation — READMEs, wikis, changelogs — is almost always Markdown. Converting
            between the two by hand means manually aligning pipe characters and column widths,
            which is exactly the kind of repetitive formatting work that's easy to get subtly
            wrong.
          </p>
          <p>
            This tool takes a JSON array of objects (or a single object, treated as a one-row
            table), collects every key used across all rows as a column — so it handles rows with
            slightly different fields gracefully — and outputs a properly formatted Markdown
            table with pipes escaped and newlines flattened inside cell values.
          </p>
          <p>
            Paste the result directly into a GitHub README, a wiki page, or any Markdown renderer.
            Nested objects and arrays inside a cell are shown as their JSON string representation
            rather than expanded into sub-rows.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">
            JSON input {rowCount !== null && <span className="text-ink-faint">({rowCount} row(s) detected)</span>}
          </label>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={10}
            className="input-field font-mono text-caption"
            spellCheck={false}
          />
        </div>
        <button onClick={handleConvert} className="btn-primary w-full sm:w-auto">
          Convert
        </button>
      </div>

      {error && <ErrorState message={error} />}
      {!error && ran && !output && <EmptyState message="Nothing to show yet." />}
      {!ran && <EmptyState message="Paste JSON above and press Convert." />}

      {output && (
        <div className="card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="label mb-0">Markdown table</label>
            <div className="flex gap-2">
              <CopyButton text={output} />
              <DownloadButton filename="table.md" content={output} mimeType="text/markdown" />
            </div>
          </div>
          <pre className="code-block overflow-x-auto whitespace-pre">{output}</pre>
        </div>
      )}
    </ToolShell>
  );
}

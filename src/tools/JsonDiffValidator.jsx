import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { EmptyState, ErrorState, StatusPill } from "../components/ToolUi.jsx";

function flatten(obj, prefix = "") {
  const out = {};
  if (obj === null || typeof obj !== "object") {
    out[prefix || "$"] = obj;
    return out;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) out[prefix || "$"] = [];
    obj.forEach((item, i) => Object.assign(out, flatten(item, `${prefix}[${i}]`)));
    return out;
  }
  const keys = Object.keys(obj);
  if (keys.length === 0) out[prefix || "$"] = {};
  keys.forEach((k) => Object.assign(out, flatten(obj[k], prefix ? `${prefix}.${k}` : k)));
  return out;
}

function typeOf(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  return typeof v;
}

function diffJson(a, b) {
  const flatA = flatten(a);
  const flatB = flatten(b);
  const allKeys = Array.from(new Set([...Object.keys(flatA), ...Object.keys(flatB)])).sort();
  const results = [];
  for (const key of allKeys) {
    const inA = Object.prototype.hasOwnProperty.call(flatA, key);
    const inB = Object.prototype.hasOwnProperty.call(flatB, key);
    if (inA && !inB) {
      results.push({ key, kind: "removed", detail: `present in left only (${JSON.stringify(flatA[key])})` });
    } else if (!inA && inB) {
      results.push({ key, kind: "added", detail: `present in right only (${JSON.stringify(flatB[key])})` });
    } else if (typeOf(flatA[key]) !== typeOf(flatB[key])) {
      results.push({
        key,
        kind: "type-mismatch",
        detail: `type changed: ${typeOf(flatA[key])} → ${typeOf(flatB[key])}`,
      });
    } else if (JSON.stringify(flatA[key]) !== JSON.stringify(flatB[key])) {
      results.push({
        key,
        kind: "value-changed",
        detail: `${JSON.stringify(flatA[key])} → ${JSON.stringify(flatB[key])}`,
      });
    }
  }
  return results;
}

const KIND_LABEL = {
  added: { label: "Added", status: "good" },
  removed: { label: "Removed", status: "bad" },
  "type-mismatch": { label: "Type mismatch", status: "bad" },
  "value-changed": { label: "Value changed", status: "warn" },
};

export default function JsonDiffValidator({ tool }) {
  const [left, setLeft] = useState('{\n  "id": 1,\n  "name": "Widget",\n  "price": 19.99\n}');
  const [right, setRight] = useState('{\n  "id": "1",\n  "name": "Widget",\n  "price": 24.99,\n  "inStock": true\n}');
  const [diffs, setDiffs] = useState(null);
  const [error, setError] = useState("");

  function handleCompare() {
    setError("");
    setDiffs(null);
    let parsedLeft, parsedRight;
    try {
      parsedLeft = JSON.parse(left);
    } catch (e) {
      setError(`Left JSON is invalid: ${e.message}`);
      return;
    }
    try {
      parsedRight = JSON.parse(right);
    } catch (e) {
      setError(`Right JSON is invalid: ${e.message}`);
      return;
    }
    setDiffs(diffJson(parsedLeft, parsedRight));
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["json-diff-validator"]}
      explanation={
        <>
          <p>
            Two systems integrating over a JSON API tend to drift apart quietly: a backend team
            renames a field, an optional field starts returning a string instead of a number, or
            a key that used to always be present starts getting omitted. None of that throws an
            error at the API level — it just breaks whatever code assumed the old shape.
          </p>
          <p>
            This tool flattens both payloads down to their individual key paths — including
            nested objects and array indices — and compares them key by key, so a change three
            levels deep in a nested object is just as visible as a top-level one. Each difference
            is labeled as added, removed, a value change, or a type mismatch, since a type
            mismatch is usually the more dangerous class of bug.
          </p>
          <p>
            Use it before shipping an API change, or when debugging why a webhook consumer
            suddenly started failing after an upstream provider pushed an update.
          </p>
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-5">
          <label className="label">Left JSON</label>
          <textarea
            value={left}
            onChange={(e) => setLeft(e.target.value)}
            rows={10}
            className="input-field font-mono text-caption"
            spellCheck={false}
          />
        </div>
        <div className="card p-5">
          <label className="label">Right JSON</label>
          <textarea
            value={right}
            onChange={(e) => setRight(e.target.value)}
            rows={10}
            className="input-field font-mono text-caption"
            spellCheck={false}
          />
        </div>
      </div>

      <button onClick={handleCompare} className="btn-primary w-full sm:w-auto">
        Compare
      </button>

      {error && <ErrorState message={error} />}

      {!error && diffs !== null && diffs.length === 0 && (
        <div className="card p-5 text-body text-status-good">
          No differences found — both payloads are structurally and value-identical.
        </div>
      )}

      {!error && diffs === null && <EmptyState message="Press Compare to see a key-by-key diff." />}

      {diffs && diffs.length > 0 && (
        <div className="card divide-y divide-bg-border">
          {diffs.map((d) => (
            <div key={d.key} className="p-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-caption text-ink mb-1">{d.key}</p>
                <p className="text-caption text-ink-muted">{d.detail}</p>
              </div>
              <StatusPill status={KIND_LABEL[d.kind].status}>{KIND_LABEL[d.kind].label}</StatusPill>
            </div>
          ))}
        </div>
      )}
    </ToolShell>
  );
}

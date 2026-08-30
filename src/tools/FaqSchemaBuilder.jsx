import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, DownloadButton } from "../components/ToolUi.jsx";

let idCounter = 2;

export default function FaqSchemaBuilder({ tool }) {
  const [pairs, setPairs] = useState([
    { id: 0, q: "What is UtilityStack?", a: "A free dashboard of 56 professional utility tools." },
    { id: 1, q: "Do I need to sign up?", a: "No account is required to use any tool." },
  ]);

  function addPair() {
    setPairs((p) => [...p, { id: idCounter++, q: "", a: "" }]);
  }
  function removePair(id) {
    setPairs((p) => p.filter((x) => x.id !== id));
  }
  function updatePair(id, field, value) {
    setPairs((p) => p.map((x) => (x.id === id ? { ...x, [field]: value } : x)));
  }

  const schema = useMemo(() => {
    const valid = pairs.filter((p) => p.q.trim() && p.a.trim());
    const obj = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: valid.map((p) => ({
        "@type": "Question",
        name: p.q.trim(),
        acceptedAnswer: { "@type": "Answer", text: p.a.trim() },
      })),
    };
    return JSON.stringify(obj, null, 2);
  }, [pairs]);

  const scriptTag = `<script type="application/ld+json">\n${schema}\n</script>`;

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["faq-schema-builder"]}
      explanation={
        <>
          <p>
            Google can show an expandable question-and-answer list directly inside a search
            result — the "People also ask"-style drop-down attached to your own listing — but
            only if the page includes valid FAQPage structured data in JSON-LD format. A single
            misplaced comma or wrong nesting level and Google's Rich Results Test will reject the
            whole block.
          </p>
          <p>
            This tool removes the syntax risk: add your question-and-answer pairs in plain text
            fields, and it assembles the exact JSON-LD structure Google expects, live, as you
            type. Empty pairs are automatically excluded from the output.
          </p>
          <p>
            Paste the generated script tag anywhere in your page's HTML (commonly right before
            the closing <code>&lt;/head&gt;</code> tag), then verify it with Google's Rich
            Results Test before relying on it. Keep the visible FAQ text on the page itself
            matching what's in the schema — Google's guidelines require the structured data to
            reflect content that's actually visible to users.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        {pairs.map((p, i) => (
          <div key={p.id} className="p-4 rounded-sm bg-bg border border-bg-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-caption text-ink-faint">Question {i + 1}</span>
              <button
                onClick={() => removePair(p.id)}
                aria-label="Remove this question"
                className="text-ink-faint hover:text-status-bad transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
            <input
              type="text"
              value={p.q}
              onChange={(e) => updatePair(p.id, "q", e.target.value)}
              placeholder="Question"
              className="input-field"
            />
            <textarea
              value={p.a}
              onChange={(e) => updatePair(p.id, "a", e.target.value)}
              placeholder="Answer"
              rows={2}
              className="input-field"
            />
          </div>
        ))}
        <button onClick={addPair} className="btn-secondary">
          <Plus size={15} /> Add question
        </button>
      </div>

      <div className="card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="label mb-0">Generated JSON-LD</label>
          <div className="flex gap-2">
            <CopyButton text={scriptTag} label="Copy script tag" />
            <DownloadButton filename="faq-schema.html" content={scriptTag} mimeType="text/html" />
          </div>
        </div>
        <pre className="code-block max-h-80 overflow-auto whitespace-pre-wrap">{scriptTag}</pre>
      </div>
    </ToolShell>
  );
}

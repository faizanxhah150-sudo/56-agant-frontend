import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import Breadcrumb from "./Breadcrumb.jsx";
import InstructionsModal from "./InstructionsModal.jsx";
import { shouldAutoOpen } from "../lib/modalStorage.js";
import { getRelatedTools } from "../data/tools.js";

function useDocumentSeo(tool) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${tool.name} — Free Online Tool | UtilityStack`;

    let meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta ? meta.getAttribute("content") : null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", `${tool.oneLiner} ${tool.problem}`);

    return () => {
      document.title = prevTitle;
      if (meta && prevDescription !== null) meta.setAttribute("content", prevDescription);
    };
  }, [tool]);
}

export default function ToolShell({ tool, instructions, explanation, children }) {
  const [modalOpen, setModalOpen] = useState(false);
  useDocumentSeo(tool);

  useEffect(() => {
    setModalOpen(shouldAutoOpen(tool.slug));
  }, [tool.slug]);

  const related = getRelatedTools(tool);

  return (
    <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <Breadcrumb category={tool.category} toolName={tool.name} />

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-h1 text-ink mb-2">{tool.name}</h1>
          <p className="text-body text-ink-muted max-w-2xl">{tool.oneLiner}</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          aria-label="How to use this tool"
          className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-bg-border text-ink-muted hover:text-accent hover:border-accent/50 transition-colors"
        >
          <Info size={17} />
        </button>
      </div>

      <div className="space-y-6">{children}</div>

      {explanation && (
        <section className="mt-12 card p-6 md:p-8 bg-bg-raised/60">
          <h2 className="text-h2 text-ink mb-4">About this tool</h2>
          <div className="text-body text-ink-muted space-y-4 leading-relaxed">{explanation}</div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="text-h3 text-ink-muted mb-3">Related tools</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/tools/${r.slug}`}
                className="card p-4 hover:border-accent/40 transition-colors"
              >
                <p className="text-body font-medium text-ink mb-1">{r.name}</p>
                <p className="text-caption text-ink-faint">{r.oneLiner}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <InstructionsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        toolName={tool.name}
        toolSlug={tool.slug}
        instructions={instructions}
      />
    </main>
  );
}

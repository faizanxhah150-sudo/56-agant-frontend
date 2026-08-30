import { useEffect, useState } from "react";
import { X, Info, Languages } from "lucide-react";
import { markSeen, recordDismissal } from "../lib/modalStorage.js";

/**
 * instructions shape:
 * {
 *   en: { what: string, problem: string, how: string },
 *   ur: { what: string, problem: string, how: string },
 * }
 */
export default function InstructionsModal({ open, onClose, toolName, toolSlug, instructions }) {
  const [lang, setLang] = useState("en");
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (open) {
      markSeen(toolSlug);
      setDontShowAgain(false);
      setLang("en");
    }
  }, [open, toolSlug]);

  if (!open) return null;

  const copy = instructions[lang] || instructions.en;

  function handleClose() {
    recordDismissal(toolSlug, dontShowAgain);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructions-modal-title"
      onClick={handleClose}
    >
      <div
        className="panel w-full max-w-lg p-6 relative animate-[fadeIn_150ms_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-ink-muted hover:text-ink transition-colors"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Info size={16} className="text-accent" />
          <span className="text-caption text-ink-muted">How this tool works</span>
        </div>

        <h2 id="instructions-modal-title" className="text-h2 text-ink mb-4 pr-8">
          {toolName}
        </h2>

        <div className="space-y-4 text-body text-ink-muted" dir={lang === "ur" ? "rtl" : "ltr"}>
          <p>{copy.what}</p>
          <div>
            <p className="text-caption font-medium text-ink-faint uppercase tracking-wide mb-1">
              {lang === "ur" ? "مسئلہ" : "The problem it solves"}
            </p>
            <p>{copy.problem}</p>
          </div>
          <div>
            <p className="text-caption font-medium text-ink-faint uppercase tracking-wide mb-1">
              {lang === "ur" ? "استعمال کا طریقہ" : "How to use it"}
            </p>
            <p>{copy.how}</p>
          </div>
        </div>

        <button
          onClick={() => setLang((l) => (l === "en" ? "ur" : "en"))}
          className="btn-secondary mt-5 text-caption py-2"
        >
          <Languages size={14} />
          {lang === "en" ? "اردو میں پڑھیں" : "Read in English"}
        </button>

        <div className="mt-6 pt-4 border-t border-bg-border flex items-center justify-between">
          <label className="flex items-center gap-2 text-caption text-ink-muted cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded-sm accent-accent"
            />
            Don't show again
          </label>
          <button onClick={handleClose} className="btn-primary text-caption py-2 px-3.5">
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

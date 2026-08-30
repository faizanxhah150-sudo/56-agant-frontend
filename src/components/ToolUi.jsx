import { useState } from "react";
import { Copy, Check, Download, Loader2, AlertTriangle, Inbox } from "lucide-react";

export function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="btn-secondary text-caption py-1.5 px-3"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // clipboard unavailable — silently no-op
        }
      }}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied" : label}
    </button>
  );
}

export function DownloadButton({ filename, content, mimeType = "text/plain", label = "Download" }) {
  return (
    <button
      type="button"
      className="btn-secondary text-caption py-1.5 px-3"
      onClick={() => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }}
    >
      <Download size={14} />
      {label}
    </button>
  );
}

export function StatusPill({ status, children }) {
  const cls = status === "good" ? "pill-good" : status === "warn" ? "pill-warn" : "pill-bad";
  return <span className={`pill ${cls}`}>{children}</span>;
}

export function ScoreMeter({ score, max = 100, label }) {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  const color = pct >= 80 ? "bg-status-good" : pct >= 50 ? "bg-status-warn" : "bg-status-bad";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-caption text-ink-muted">{label}</span>
        <span className="text-caption font-medium text-ink">
          {score}/{max}
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-bg overflow-hidden border border-bg-border">
        <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function LoadingState({ message = "Processing…" }) {
  return (
    <div className="card flex items-center gap-3 p-6 text-ink-muted">
      <Loader2 size={18} className="animate-spin text-accent" />
      <span className="text-body">{message}</span>
    </div>
  );
}

export function EmptyState({ message = "Enter your input above and run the tool to see results here." }) {
  return (
    <div className="card flex flex-col items-center text-center gap-2 p-10 text-ink-faint">
      <Inbox size={22} />
      <span className="text-body">{message}</span>
    </div>
  );
}

export function ErrorState({ message = "Something went wrong. Please check your input and try again." }) {
  return (
    <div className="card flex items-start gap-3 p-5 border-status-bad/30 bg-status-bad/5">
      <AlertTriangle size={18} className="text-status-bad shrink-0 mt-0.5" />
      <span className="text-body text-ink-muted">{message}</span>
    </div>
  );
}

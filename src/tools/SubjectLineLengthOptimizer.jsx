import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";

const LIMITS = {
  desktop: { subject: 70, preview: 140 },
  mobile: { subject: 40, preview: 90 },
};

function Preview({ label, subject, preview, limits }) {
  const subjectOver = subject.length > limits.subject;
  const previewOver = preview.length > limits.preview;
  const truncSubject = subject.slice(0, limits.subject);
  const truncPreview = preview.slice(0, limits.preview);

  return (
    <div className="card p-4 space-y-2">
      <p className="text-caption text-ink-faint">{label}</p>
      <div className="rounded-sm bg-bg border border-bg-border p-3">
        <p className={`text-body font-medium ${subjectOver ? "text-status-warn" : "text-ink"}`}>
          {truncSubject}
          {subjectOver && <span className="text-ink-faint">…</span>}
        </p>
        <p className={`text-caption ${previewOver ? "text-status-warn" : "text-ink-muted"}`}>
          {truncPreview}
          {previewOver && <span className="text-ink-faint">…</span>}
        </p>
      </div>
      <p className="text-caption text-ink-faint">
        Subject: {subject.length}/{limits.subject} · Preview: {preview.length}/{limits.preview}
      </p>
    </div>
  );
}

export default function SubjectLineLengthOptimizer({ tool }) {
  const [subject, setSubject] = useState("Your order has shipped — track it now");
  const [preview, setPreview] = useState("Plus, here's 10% off your next order as a thank you");

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["subject-line-length-optimizer"]}
      explanation={
        <>
          <p>
            Desktop email clients typically show 60–70 characters of a subject line before
            truncating; mobile clients — where the majority of email is now opened — often show
            only 30–40. The preview/preheader text has similarly different limits. A subject
            written and approved on desktop can silently lose its key message on a phone.
          </p>
          <p>
            This tool shows both versions side by side as you type, using conservative,
            realistic limits, and visually flags the point where each gets cut off — so you can
            make sure the important word or offer lands before that point on both.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Subject line</label>
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label">Preview / preheader text</label>
          <input type="text" value={preview} onChange={(e) => setPreview(e.target.value)} className="input-field" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Preview label="Desktop preview" subject={subject} preview={preview} limits={LIMITS.desktop} />
        <Preview label="Mobile preview" subject={subject} preview={preview} limits={LIMITS.mobile} />
      </div>
    </ToolShell>
  );
}

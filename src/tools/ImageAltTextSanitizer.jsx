import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, EmptyState } from "../components/ToolUi.jsx";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ImageAltTextSanitizer({ tool }) {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [extension, setExtension] = useState("jpg");

  const result = useMemo(() => {
    if (!title.trim()) return null;
    const slug = slugify(title);
    const filename = `${slug}.${extension}`;
    const altText = context.trim()
      ? `${title.trim()} — ${context.trim()}`
      : title.trim();
    return { filename, altText };
  }, [title, context, extension]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["image-alt-text-sanitizer"]}
      explanation={
        <>
          <p>
            Google Images can only understand what's in a picture from the text around it — the
            filename and the alt attribute are the two strongest signals. A file uploaded straight
            from a camera or phone (IMG_4821.jpg) and an empty alt attribute give Google nothing
            to index, so the image never appears in image search no matter how good the photo is.
          </p>
          <p>
            This tool converts a plain-language title into a clean, hyphenated, lowercase
            filename slug — the format search engines parse most reliably — and drafts a natural
            alt-text description you can refine further. Keep alt text describing what's actually
            in the image rather than stuffing it with unrelated keywords, since accessibility
            tools (screen readers) read this same text aloud to visually impaired visitors.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Image / product title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" placeholder="Blue Cotton Crew Neck T-Shirt" />
        </div>
        <div>
          <label className="label">Extra context for alt text (optional)</label>
          <input type="text" value={context} onChange={(e) => setContext(e.target.value)} className="input-field" placeholder="worn by a model outdoors" />
        </div>
        <div className="max-w-xs">
          <label className="label">File extension</label>
          <select value={extension} onChange={(e) => setExtension(e.target.value)} className="input-field">
            {["jpg", "png", "webp", "avif"].map((ext) => <option key={ext} value={ext}>{ext}</option>)}
          </select>
        </div>
      </div>

      {!result ? (
        <EmptyState message="Enter a title above to generate a filename and alt text." />
      ) : (
        <div className="card p-5 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="label mb-0">Filename</p>
              <CopyButton text={result.filename} />
            </div>
            <p className="font-mono text-body text-ink">{result.filename}</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="label mb-0">Alt text</p>
              <CopyButton text={result.altText} />
            </div>
            <p className="text-body text-ink">{result.altText}</p>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

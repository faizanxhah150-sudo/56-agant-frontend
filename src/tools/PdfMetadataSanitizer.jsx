import { useState } from "react";
import { UploadCloud, FileText } from "lucide-react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { EmptyState, ErrorState, LoadingState } from "../components/ToolUi.jsx";

export default function PdfMetadataSanitizer({ tool }) {
  const [fileName, setFileName] = useState("");
  const [originalMeta, setOriginalMeta] = useState(null);
  const [cleanedUrl, setCleanedUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setCleanedUrl("");
    setOriginalMeta(null);
    setFileName(file.name);

    if (file.type !== "application/pdf") {
      setError("Please choose a PDF file.");
      return;
    }

    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes, { updateMetadata: false });

      setOriginalMeta({
        title: pdfDoc.getTitle() || "(none)",
        author: pdfDoc.getAuthor() || "(none)",
        subject: pdfDoc.getSubject() || "(none)",
        producer: pdfDoc.getProducer() || "(none)",
        creator: pdfDoc.getCreator() || "(none)",
      });

      pdfDoc.setTitle("");
      pdfDoc.setAuthor("");
      pdfDoc.setSubject("");
      pdfDoc.setKeywords([]);
      pdfDoc.setProducer("");
      pdfDoc.setCreator("");
      try {
        pdfDoc.setCreationDate(new Date(0));
        pdfDoc.setModificationDate(new Date(0));
      } catch {
        // some PDFs reject date overwrites — non-fatal, metadata fields are already cleared
      }

      const cleanedBytes = await pdfDoc.save();
      const blob = new Blob([cleanedBytes], { type: "application/pdf" });
      setCleanedUrl(URL.createObjectURL(blob));
    } catch {
      setError("Could not process that PDF. It may be encrypted or corrupted.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["pdf-metadata-sanitizer"]}
      explanation={
        <>
          <p>
            Every PDF carries a metadata block alongside its visible content — title, author,
            the software that created it, sometimes even a company name baked in by default from
            the original computer's settings. None of that is visible when you open the file
            normally, but it's trivially readable with common tools, and it's a routine source of
            accidental information disclosure when a document gets shared outside an
            organization.
          </p>
          <p>
            This tool clears the title, author, subject, keywords, producer, creator, and
            timestamp fields, entirely inside your browser using the pdf-lib library — your file
            is never uploaded to a server. The visible content and formatting of the PDF is
            untouched; only the metadata is cleared.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <label className="flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed border-bg-border rounded-md cursor-pointer hover:border-accent/50 transition-colors">
          <UploadCloud size={28} className="text-ink-faint" />
          <span className="text-body text-ink-muted">
            {fileName || "Click to choose a PDF file"}
          </span>
          <input type="file" accept="application/pdf" onChange={handleFile} className="hidden" />
        </label>
      </div>

      {loading && <LoadingState message="Reading and cleaning metadata…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !originalMeta && <EmptyState message="Upload a PDF above to see and clear its metadata." />}

      {originalMeta && (
        <div className="space-y-4">
          <div className="card p-5 space-y-2">
            <p className="label">Original metadata found</p>
            {Object.entries(originalMeta).map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-caption">
                <span className="text-ink-faint capitalize">{k}</span>
                <span className="text-ink-muted font-mono">{v}</span>
              </div>
            ))}
          </div>

          {cleanedUrl && (
            <a
              href={cleanedUrl}
              download={fileName.replace(/\.pdf$/i, "") + "-cleaned.pdf"}
              className="btn-primary w-full sm:w-auto"
            >
              <FileText size={16} /> Download cleaned PDF
            </a>
          )}
        </div>
      )}
    </ToolShell>
  );
}

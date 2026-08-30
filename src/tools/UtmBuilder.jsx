import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, ErrorState } from "../components/ToolUi.jsx";

export default function UtmBuilder({ tool }) {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const { link, error } = useMemo(() => {
    if (!url.trim()) return { link: "", error: "" };
    let base;
    try {
      base = new URL(url.trim());
    } catch {
      return { link: "", error: "Enter a full URL including https://" };
    }
    if (source.trim()) base.searchParams.set("utm_source", source.trim());
    if (medium.trim()) base.searchParams.set("utm_medium", medium.trim());
    if (campaign.trim()) base.searchParams.set("utm_campaign", campaign.trim());
    if (term.trim()) base.searchParams.set("utm_term", term.trim());
    if (content.trim()) base.searchParams.set("utm_content", content.trim());
    return { link: base.toString(), error: "" };
  }, [url, source, medium, campaign, term, content]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["utm-builder"]}
      explanation={
        <>
          <p>
            UTM parameters are the five query-string fields — source, medium, campaign, term, and
            content — that Google Analytics and most other analytics platforms use to attribute a
            visit to the exact ad, email, or link that generated it. Get the field names or
            capitalization inconsistent across your campaigns and Analytics will report the same
            channel as several different ones, quietly corrupting your attribution data.
          </p>
          <p>
            This tool builds the link for you so there's no manual string concatenation involved:
            enter your destination URL and campaign details, and it assembles a correctly
            URL-encoded tracking link live as you type.
          </p>
          <p>
            A good convention to standardize on: lowercase everything, use hyphens instead of
            spaces, and keep a shared naming sheet across your team so "newsletter" and
            "Newsletter" never end up as two different sources in your reports.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Destination URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/landing-page"
            className="input-field"
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Campaign source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="newsletter"
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Campaign medium</label>
            <input
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="email"
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Campaign name</label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder="spring-sale"
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Campaign term (optional)</label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="running+shoes"
              className="input-field"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Campaign content (optional)</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="header-cta"
              className="input-field"
            />
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {link && (
        <div className="card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="label mb-0">Your tracking link</label>
            <CopyButton text={link} />
          </div>
          <div className="code-block break-all">{link}</div>
        </div>
      )}
    </ToolShell>
  );
}

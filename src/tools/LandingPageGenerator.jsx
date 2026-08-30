import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { DownloadButton, CopyButton } from "../components/ToolUi.jsx";

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export default function LandingPageGenerator({ tool }) {
  const [headline, setHeadline] = useState("Get the Free Growth Checklist");
  const [subheadline, setSubheadline] = useState("47 tactics we used to grow from 0 to 10,000 customers.");
  const [cta, setCta] = useState("Send me the checklist");
  const [buttonColor, setButtonColor] = useState("#2dd4bf");

  const html = useMemo(() => {
    const h = escapeHtml(headline);
    const sh = escapeHtml(subheadline);
    const c = escapeHtml(cta);
    return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${h}</title>
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #0a0b0d;
    color: #e9eaee;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 24px;
  }
  .card {
    max-width: 480px;
    width: 100%;
    text-align: center;
    padding: 48px 32px;
  }
  h1 { font-size: 32px; line-height: 1.25; margin: 0 0 16px; }
  p { font-size: 17px; color: #9aa0ac; margin: 0 0 32px; }
  form { display: flex; flex-direction: column; gap: 12px; }
  input[type="email"] {
    padding: 14px 16px;
    border-radius: 8px;
    border: 1px solid #22262f;
    background: #111318;
    color: #e9eaee;
    font-size: 15px;
  }
  button {
    padding: 14px 16px;
    border-radius: 8px;
    border: none;
    background: ${buttonColor};
    color: #0a0b0d;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
  }
  .fineprint { font-size: 12px; color: #5c626e; margin-top: 16px; }
</style>
</head>
<body>
  <div class="card">
    <h1>${h}</h1>
    <p>${sh}</p>
    <form onsubmit="alert('Wire this form up to your email provider.'); return false;">
      <input type="email" placeholder="you@example.com" required />
      <button type="submit">${c}</button>
    </form>
    <p class="fineprint">No spam. Unsubscribe anytime.</p>
  </div>
</body>
</html>`;
  }, [headline, subheadline, cta, buttonColor]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["landing-page-generator"]}
      explanation={
        <>
          <p>
            A lead magnet only converts if the page asking for an email address is fast, focused,
            and free of distractions — no navigation menu to click away on, one headline, one
            benefit statement, and one button.
          </p>
          <p>
            This tool generates a complete, single-file, responsive HTML page with that structure
            built in. Download it and host it anywhere (a static host, your existing site, or a
            page builder that accepts custom HTML) — you'll need to connect the form's
            <code> onsubmit</code> handler to your actual email service provider before it goes
            live, since this generates the page shell, not a working backend.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Headline</label>
          <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label">Subheadline</label>
          <input type="text" value={subheadline} onChange={(e) => setSubheadline(e.target.value)} className="input-field" />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Button text</label>
            <input type="text" value={cta} onChange={(e) => setCta(e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label">Button color</label>
            <input type="color" value={buttonColor} onChange={(e) => setButtonColor(e.target.value)} className="input-field h-11 p-1" />
          </div>
        </div>
      </div>

      <div className="card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="label mb-0">Generated page</label>
          <div className="flex gap-2">
            <CopyButton text={html} label="Copy HTML" />
            <DownloadButton filename="landing-page.html" content={html} mimeType="text/html" />
          </div>
        </div>
        <div className="rounded-sm overflow-hidden border border-bg-border">
          <iframe title="Landing page preview" srcDoc={html} className="w-full h-96 bg-white" />
        </div>
      </div>
    </ToolShell>
  );
}

import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, DownloadButton } from "../components/ToolUi.jsx";

const CATEGORY_TEXT = {
  essential: {
    label: "Essential / strictly necessary cookies",
    text: "These cookies are required for the website to function — for example, keeping you logged in or remembering items in a cart. They cannot be switched off.",
  },
  analytics: {
    label: "Analytics cookies",
    text: "These cookies help us understand how visitors use our site (pages viewed, time spent, navigation paths) so we can improve it. Data is generally aggregated and anonymized.",
  },
  marketing: {
    label: "Marketing / advertising cookies",
    text: "These cookies track visitors across websites to show relevant ads and measure the effectiveness of advertising campaigns.",
  },
  preferences: {
    label: "Preference cookies",
    text: "These cookies remember your choices (like language or region) to provide a more personalized experience on return visits.",
  },
};

export default function CookiePolicyGenerator({ tool }) {
  const [siteName, setSiteName] = useState("Example.com");
  const [categories, setCategories] = useState({ essential: true, analytics: true, marketing: false, preferences: true });

  const policy = useMemo(() => {
    const lines = [
      `COOKIE POLICY`,
      ``,
      `${siteName} uses cookies to operate reliably and to improve your experience. This page`,
      `explains what cookies we use and why.`,
      ``,
    ];
    for (const [key, val] of Object.entries(categories)) {
      if (!val) continue;
      lines.push(CATEGORY_TEXT[key].label.toUpperCase());
      lines.push(CATEGORY_TEXT[key].text);
      lines.push("");
    }
    lines.push(
      "You can control or delete cookies through your browser settings. Disabling essential",
      "cookies may affect core site functionality. For questions about this policy, please",
      `contact us through ${siteName}.`
    );
    return lines.join("\n");
  }, [siteName, categories]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["cookie-policy-generator"]}
      explanation={
        <>
          <p>
            Cookie and privacy regulations across the EU, UK, and increasingly other regions
            require sites to disclose, in plain language, what categories of cookies they use and
            why. A generic policy copied from another site that doesn't actually match your
            cookie usage creates exactly the kind of gap regulators look for.
          </p>
          <p>
            Check off the categories that genuinely apply to your site, and this tool generates
            matching plain-language policy text you can publish as a standalone page. This is a
            starting template, not legal advice — for a site handling EU/UK visitors or sensitive
            data, have a qualified privacy professional review your final policy and your
            consent-banner implementation.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Site / company name</label>
          <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label">Cookie categories in use</label>
          <div className="space-y-2">
            {Object.entries(CATEGORY_TEXT).map(([key, meta]) => (
              <label key={key} className="flex items-center gap-2 text-body text-ink-muted cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={categories[key]}
                  onChange={(e) => setCategories((c) => ({ ...c, [key]: e.target.checked }))}
                  className="w-4 h-4 rounded-sm accent-accent"
                />
                {meta.label}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-5 space-y-3">
        <div className="flex items-center justify-between">
          <label className="label mb-0">Generated policy</label>
          <div className="flex gap-2">
            <CopyButton text={policy} />
            <DownloadButton filename="cookie-policy.txt" content={policy} />
          </div>
        </div>
        <pre className="code-block whitespace-pre-wrap max-h-96 overflow-y-auto">{policy}</pre>
      </div>
    </ToolShell>
  );
}

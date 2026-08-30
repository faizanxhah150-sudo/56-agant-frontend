import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, EmptyState } from "../components/ToolUi.jsx";

export default function EcommerceListingSeoGenerator({ tool }) {
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [features, setFeatures] = useState("Waterproof\nUSB-C fast charging\n2-year warranty");
  const [keywords, setKeywords] = useState("wireless earbuds, noise cancelling, bluetooth 5.3");

  const result = useMemo(() => {
    if (!productName.trim()) return null;
    const featureList = features.split("\n").map((f) => f.trim()).filter(Boolean);
    const keywordList = keywords.split(",").map((k) => k.trim()).filter(Boolean);

    const title = [brand, productName, featureList[0], keywordList[0]]
      .filter(Boolean)
      .join(" - ")
      .slice(0, 200);

    const bullets = featureList.slice(0, 5).map((f, i) => {
      const label = ["PREMIUM QUALITY", "DESIGNED FOR YOU", "BUILT TO LAST", "EASY TO USE", "SATISFACTION GUARANTEED"][i] || "FEATURE";
      return `${label}: ${f}.`;
    });
    while (bullets.length < 5) {
      bullets.push(`Additional benefit ${bullets.length + 1} — describe another reason customers choose ${productName || "this product"}.`);
    }

    const backendTerms = Array.from(new Set(keywordList.flatMap((k) => k.split(" ")))).join(" ").slice(0, 250);

    return { title, bullets, backendTerms };
  }, [productName, brand, features, keywords]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["ecommerce-listing-seo-generator"]}
      explanation={
        <>
          <p>
            Marketplace search (Amazon's A9/A10 algorithm and similar systems on Etsy, Walmart
            Marketplace, and others) weights product titles and bullet points heavily when
            deciding which listings to surface for a search query. A title that's just a brand
            name and nothing else simply doesn't compete against listings packed with relevant
            keywords.
          </p>
          <p>
            This tool assembles a structured title (brand, product, top feature, top keyword), a
            set of five benefit-led bullet points, and a backend search-term block from your
            deduplicated keywords. Treat this as a strong starting structure — always tailor the
            exact wording to your specific product and re-check your marketplace's current title
            character limit before publishing.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Product name</label>
            <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} className="input-field" placeholder="Wireless Earbuds Pro" />
          </div>
          <div>
            <label className="label">Brand (optional)</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="input-field" placeholder="Acme" />
          </div>
        </div>
        <div>
          <label className="label">Key features (one per line)</label>
          <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={4} className="input-field" />
        </div>
        <div>
          <label className="label">Target keywords (comma-separated)</label>
          <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="input-field" />
        </div>
      </div>

      {!result ? (
        <EmptyState message="Enter a product name above to generate listing copy." />
      ) : (
        <div className="space-y-4">
          <div className="card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="label mb-0">SEO title ({result.title.length} chars)</label>
              <CopyButton text={result.title} />
            </div>
            <p className="text-body text-ink">{result.title}</p>
          </div>
          <div className="card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="label mb-0">Bullet points</label>
              <CopyButton text={result.bullets.join("\n")} />
            </div>
            <ul className="text-body text-ink-muted space-y-1.5 list-disc list-inside">
              {result.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
          <div className="card p-5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="label mb-0">Backend search terms</label>
              <CopyButton text={result.backendTerms} />
            </div>
            <p className="text-caption font-mono text-ink-muted">{result.backendTerms}</p>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

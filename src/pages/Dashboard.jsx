import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { TOOLS, CATEGORIES } from "../data/tools.js";

export default function Dashboard({ searchValue, onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    document.title = "UtilityStack — 56 Free Professional Utility Tools";
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = (searchValue || "").trim().toLowerCase();
    return TOOLS.filter((t) => {
      const matchesCategory = activeCategory === "All" || t.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.problem.toLowerCase().includes(q) ||
        t.oneLiner.toLowerCase().includes(q)
      );
    });
  }, [activeCategory, searchValue]);

  function selectCategory(cat) {
    setActiveCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
      <section className="max-w-2xl mb-10">
        <h1 className="text-h1 text-ink mb-3">
          56 professional tools. One dashboard. Zero cost.
        </h1>
        <p className="text-body text-ink-muted mb-6">
          Email security, SEO, dev/API, e-commerce, marketing, and finance utilities — built to
          work, not to look like a demo.
        </p>
        <div className="relative max-w-md">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            placeholder="Try “DMARC”, “spam”, or “PDF”…"
            value={searchValue || ""}
            onChange={(e) => onSearch(e.target.value)}
            className="input-field pl-10 py-3"
          />
        </div>
      </section>

      <div className="flex flex-wrap gap-2 mb-8">
        {["All", ...CATEGORIES].map((cat) => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`text-caption px-3.5 py-1.5 rounded-full border transition-colors ${
              activeCategory === cat
                ? "bg-accent/10 border-accent/50 text-accent"
                : "border-bg-border text-ink-muted hover:text-ink hover:border-ink-faint"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-10 text-center text-ink-faint">
          No tools match “{searchValue}”. Try a different keyword.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <Link
              key={tool.slug}
              to={`/tools/${tool.slug}`}
              className="card p-5 flex flex-col gap-3 hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-150"
            >
              <span className="pill bg-bg-raised border border-bg-border text-ink-faint w-fit">
                {tool.category}
              </span>
              <h3 className="text-h3 text-ink leading-snug">{tool.name}</h3>
              <p className="text-caption text-ink-muted">{tool.problem}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

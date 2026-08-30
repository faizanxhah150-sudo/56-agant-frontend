import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { TOOLS, CATEGORIES, CATEGORY_ACCENT } from "../data/tools.js";

function ToolCard({ tool }) {
  const cardRef = useRef(null);
  const accent = CATEGORY_ACCENT[tool.category] || CATEGORY_ACCENT["Dev/API Tools"];

  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    card.style.boxShadow = `0 30px 60px -15px ${accent.glow}, 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    card.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -1px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)";
  }

  return (
    <Link
      to={`/tools/${tool.slug}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.1s ease-out, box-shadow 0.3s ease, border-color 0.3s ease",
        background: "linear-gradient(165deg, rgba(24,24,27,0.9) 0%, rgba(9,9,11,0.95) 100%)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className="border border-zinc-800 hover:border-white/15 rounded-2xl p-6 flex flex-col"
    >
      <div className="mb-4">
        <span className={`text-xs font-semibold uppercase tracking-wider ${accent.text}`}>{tool.category}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed flex-grow">{tool.problem}</p>
      <div className="mt-6 pt-4 border-t border-zinc-800">
        <span className={`text-sm font-medium ${accent.text} ${accent.hoverText} transition flex items-center gap-1`}>
          Open Tool <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function Dashboard({ searchValue, onSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    document.title = "OpsPulse — 56 Free Professional Utility Tools";
  }, []);

  useEffect(() => {
    const cat = searchParams.get("category");
    setActiveCategory(cat || "All");
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
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(59,130,246,0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(139,92,246,0.15), transparent), radial-gradient(ellipse 60% 40% at 20% 20%, rgba(16,185,129,0.1), transparent)",
            filter: "blur(60px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6"
            style={{
              background: "linear-gradient(to bottom right, #ffffff, #a1a1aa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 1px 0 rgba(255,255,255,0.1), 0 2px 0 rgba(255,255,255,0.05), 0 10px 20px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.3)",
            }}
          >
            Accelerate Your Technical Workflow
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            High performance tools built for modern engineers and web operators.
          </p>

          <div className="relative max-w-md mx-auto mb-10">
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Try “DMARC”, “spam”, or “PDF”…"
              value={searchValue || ""}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-zinc-900/60 border border-white/10 rounded-full pl-11 pr-5 py-3.5 text-white placeholder-zinc-500 outline-none focus:border-white/25 transition"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => selectCategory("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === "All" ? "bg-white text-zinc-900" : "bg-zinc-800/60 border border-white/10 text-zinc-300 hover:bg-zinc-700/70"
              }`}
            >
              All Tools
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => selectCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === cat ? "bg-white text-zinc-900" : "bg-zinc-800/60 border border-white/10 text-zinc-300 hover:bg-zinc-700/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TOOL GRID ============ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-zinc-500">
            No tools match “{searchValue}”. Try a different keyword.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

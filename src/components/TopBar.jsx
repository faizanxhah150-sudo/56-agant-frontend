import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Wrench } from "lucide-react";
import { CATEGORIES } from "../data/tools.js";

export default function TopBar({ onSearch, searchValue }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md border-b border-bg-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-sm bg-accent/10 border border-accent/30">
            <Wrench size={16} className="text-accent" />
          </span>
          <span className="font-display font-semibold text-ink text-[17px] tracking-tight">
            UtilityStack
          </span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            type="text"
            placeholder="Search 56 tools…"
            value={searchValue || ""}
            onChange={(e) => {
              onSearch?.(e.target.value);
              if (window.location.pathname !== "/") navigate("/");
            }}
            className="input-field pl-9"
          />
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {CATEGORIES.slice(0, 3).map((c) => (
            <Link
              key={c}
              to={`/?category=${encodeURIComponent(c)}`}
              className="text-caption text-ink-muted hover:text-ink px-3 py-2 rounded-sm transition-colors"
            >
              {c}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-ink-muted"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              type="text"
              placeholder="Search 56 tools…"
              value={searchValue || ""}
              onChange={(e) => {
                onSearch?.(e.target.value);
                if (window.location.pathname !== "/") navigate("/");
              }}
              className="input-field pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c}
                to={`/?category=${encodeURIComponent(c)}`}
                onClick={() => setMobileOpen(false)}
                className="text-caption text-ink-muted hover:text-ink px-3 py-1.5 rounded-full border border-bg-border"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

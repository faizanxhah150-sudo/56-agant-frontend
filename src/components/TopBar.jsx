import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { CATEGORIES } from "../data/tools.js";
import SearchModal from "./SearchModal.jsx";

export default function TopBar({ onSearch, searchValue }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  function goHome() {
    onSearch?.("");
    navigate("/");
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-zinc-950/60 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8 min-w-0">
              <Link to="/" onClick={() => onSearch?.("")} className="text-xl font-bold tracking-tight text-white flex items-center gap-2.5 shrink-0">
                <svg width="30" height="30" viewBox="0 0 64 64" fill="none" style={{ filter: "drop-shadow(0 0 8px rgba(52,211,153,0.5))" }}>
                  <defs>
                    <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#5eead4" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M8 32 H20 L26 22 L34 42 L40 32 H56"
                    stroke="url(#pulseGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                OpsPulse
              </Link>
              <div className="hidden md:flex items-center gap-5 text-sm font-medium text-zinc-400 overflow-x-auto no-scrollbar">
                <Link to="/" onClick={() => onSearch?.("")} className="hover:text-white transition whitespace-nowrap">
                  All Tools
                </Link>
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    to={`/?category=${encodeURIComponent(cat)}`}
                    className="hover:text-white transition whitespace-nowrap"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={goHome}
                title="Home"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <Home size={18} />
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                title="Search"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onSearch={onSearch} />
    </>
  );
}

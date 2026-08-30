import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Search } from "lucide-react";
import { CATEGORIES } from "../data/tools.js";

export default function SearchModal({ open, onClose, onSearch }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (open) setValue("");
  }, [open]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  function submitSearch() {
    onSearch(value);
    navigate("/");
    onClose();
  }

  function goToCategory(cat) {
    navigate(cat === "All Tools" ? "/" : `/?category=${encodeURIComponent(cat)}`);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-6 py-5 border-b border-zinc-800">
          <Search size={18} className="text-zinc-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submitSearch()}
            placeholder="Search tools or categories..."
            className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-500 ml-3 text-lg"
          />
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition p-1" aria-label="Close search">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Browse Categories</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => goToCategory("All Tools")}
              className="px-4 py-2 rounded-full text-sm text-zinc-300 bg-zinc-800/60 border border-white/10 hover:bg-zinc-700/70 hover:border-white/20 transition"
            >
              All Tools
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => goToCategory(cat)}
                className="px-4 py-2 rounded-full text-sm text-zinc-300 bg-zinc-800/60 border border-white/10 hover:bg-zinc-700/70 hover:border-white/20 transition"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

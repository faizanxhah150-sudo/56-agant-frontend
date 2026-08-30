import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ category, toolName }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-caption text-ink-faint mb-6 flex-wrap">
      <Link to="/" className="hover:text-ink-muted transition-colors">
        Home
      </Link>
      <ChevronRight size={12} />
      <Link
        to={`/?category=${encodeURIComponent(category)}`}
        className="hover:text-ink-muted transition-colors"
      >
        {category}
      </Link>
      <ChevronRight size={12} />
      <span className="text-ink-muted">{toolName}</span>
    </nav>
  );
}

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * React Router does NOT reset scroll position on navigation by default
 * (unlike a normal multi-page site). Without this, browser back/forward
 * combined with client-side navigation can leave a new page's content
 * starting mid-scroll instead of at the top.
 *
 * Mount this once, inside <BrowserRouter>, and it silently scrolls to
 * the top on every route change.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

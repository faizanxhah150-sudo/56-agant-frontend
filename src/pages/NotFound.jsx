import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-24 text-center">
      <h1 className="text-h1 text-ink mb-3">Page not found</h1>
      <p className="text-body text-ink-muted mb-6">
        That tool doesn't exist, or it may have been renamed.
      </p>
      <Link to="/" className="btn-primary inline-flex w-fit mx-auto">
        Back to all tools
      </Link>
    </main>
  );
}

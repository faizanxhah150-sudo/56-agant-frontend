import { lazy, Suspense } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getToolBySlug } from "../data/tools.js";
import { LoadingState } from "../components/ToolUi.jsx";

// Maps every tool's `component` field to its lazy-loaded module.
// Vite statically analyzes this glob at build time to create one
// chunk per tool file, matching vite.config.js's manualChunks split.
const modules = import.meta.glob("../tools/*.jsx");

function loadComponent(componentName) {
  const path = `../tools/${componentName}.jsx`;
  const loader = modules[path];
  if (!loader) return null;
  return lazy(loader);
}

export default function ToolPage() {
  const { slug } = useParams();
  const tool = getToolBySlug(slug);

  if (!tool) return <Navigate to="/not-found" replace />;

  const Component = loadComponent(tool.component);

  if (!Component) {
    return (
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-12">
        <div className="card p-8 text-center text-ink-muted">
          <p className="text-h3 text-ink mb-2">{tool.name}</p>
          <p>This tool is scheduled for the next build phase and isn't wired up yet.</p>
        </div>
      </main>
    );
  }

  return (
    <Suspense
      fallback={
        <main className="max-w-4xl mx-auto px-4 md:px-6 py-12">
          <LoadingState message={`Loading ${tool.name}…`} />
        </main>
      }
    >
      <Component tool={tool} />
    </Suspense>
  );
}

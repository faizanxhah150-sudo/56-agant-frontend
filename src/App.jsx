import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar onSearch={setSearch} searchValue={search} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard searchValue={search} onSearch={setSearch} />} />
          <Route path="/tools/:slug" element={<ToolPage />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer className="border-t border-bg-border mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 text-caption text-ink-faint">
          UtilityStack — 56 free professional utility tools. Built for people who just need
          the answer, not another sign-up form.
        </div>
      </footer>
    </div>
  );
}

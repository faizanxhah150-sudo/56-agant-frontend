import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ToolPage from "./pages/ToolPage.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <TopBar onSearch={setSearch} searchValue={search} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Dashboard searchValue={search} onSearch={setSearch} />} />
          <Route path="/tools/:slug" element={<ToolPage />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

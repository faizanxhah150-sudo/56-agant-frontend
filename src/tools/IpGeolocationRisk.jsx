import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState, ScoreMeter } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function IpGeolocationRisk({ tool }) {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    setError("");
    setResult(null);
    if (!ip.trim()) {
      setError("Enter an IPv4 address, e.g. 8.8.8.8");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/ip-geolocation-risk", { ip }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["ip-geolocation-risk"]}
      explanation={
        <>
          <p>
            Not all traffic is created equal: a request from a residential ISP is far more likely
            to be a genuine visitor than one from a datacenter or a known VPN/proxy exit node.
            Fraud, fake ad clicks, and automated abuse disproportionately come from the latter
            category.
          </p>
          <p>
            This tool looks up an IP's ownership, location, and network type, and produces a basic
            risk score weighted toward datacenter and proxy flags — a useful first-pass signal,
            though not a substitute for a dedicated fraud-detection system for anything
            high-stakes.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">IPv4 address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="8.8.8.8"
            className="input-field"
          />
        </div>
        <button onClick={handleCheck} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Checking…" : "Check"}
        </button>
      </div>

      {loading && <LoadingState message="Looking up IP details…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-4">
          <ScoreMeter score={result.riskScore} max={100} label="Risk score" />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-caption text-ink-faint mb-1">Location</p>
              <p className="text-body text-ink">{[result.city, result.region, result.country].filter(Boolean).join(", ")}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">ISP / Org</p>
              <p className="text-body text-ink">{result.isp} {result.org && result.org !== result.isp ? `(${result.org})` : ""}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">ASN</p>
              <p className="text-body text-ink font-mono">{result.asn}</p>
            </div>
          </div>
          {result.riskFactors.length > 0 && (
            <ul className="text-caption text-ink-muted list-disc list-inside space-y-1">
              {result.riskFactors.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          )}
        </div>
      )}
    </ToolShell>
  );
}

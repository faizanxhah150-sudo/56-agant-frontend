import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ScoreMeter, StatusPill } from "../components/ToolUi.jsx";

const FACTORS = [
  { key: "companySize", label: "Company size fits your ideal customer profile", weight: 20 },
  { key: "budget", label: "Confirmed budget for this type of purchase", weight: 25 },
  { key: "engagement", label: "Has engaged with your content/emails recently", weight: 20 },
  { key: "urgency", label: "Has an active, urgent need (not just browsing)", weight: 20 },
  { key: "authority", label: "Is a decision-maker or strong influencer", weight: 15 },
];

export default function LeadScoringCalculator({ tool }) {
  const [values, setValues] = useState(
    Object.fromEntries(FACTORS.map((f) => [f.key, 50]))
  );

  const score = useMemo(() => {
    const total = FACTORS.reduce((sum, f) => sum + (values[f.key] / 100) * f.weight, 0);
    return Math.round(total);
  }, [values]);

  const tier =
    score >= 75 ? { label: "Hot lead — contact today", status: "good" }
    : score >= 45 ? { label: "Warm lead — nurture actively", status: "warn" }
    : { label: "Cold lead — low priority", status: "bad" };

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["lead-scoring-calculator"]}
      explanation={
        <>
          <p>
            Lead scoring turns a gut feeling ("this one seems promising") into a repeatable,
            comparable number, so a sales team can sort a queue of hundreds of leads by actual
            buying likelihood instead of contact order.
          </p>
          <p>
            This calculator weights five common qualification factors — company fit, confirmed
            budget, recent engagement, urgency of need, and decision-making authority — and rolls
            them into a single 0–100 score. Adjust each slider to reflect what you know (or your
            best estimate) about a specific lead. The weights are a sensible default for most B2B
            sales motions; adjust them in the code if your business qualifies leads differently.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-6">
        {FACTORS.map((f) => (
          <div key={f.key}>
            <div className="flex items-center justify-between mb-2">
              <label className="text-body text-ink-muted">{f.label}</label>
              <span className="text-caption text-ink-faint">{values[f.key]}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={values[f.key]}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: Number(e.target.value) }))}
              className="w-full accent-accent"
            />
          </div>
        ))}
      </div>

      <div className="card p-5 space-y-4">
        <ScoreMeter score={score} max={100} label="Lead score" />
        <StatusPill status={tier.status}>{tier.label}</StatusPill>
      </div>
    </ToolShell>
  );
}

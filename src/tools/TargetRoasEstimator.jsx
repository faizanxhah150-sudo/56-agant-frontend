import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ErrorState } from "../components/ToolUi.jsx";

export default function TargetRoasEstimator({ tool }) {
  const [margin, setMargin] = useState("30");
  const [bufferPct, setBufferPct] = useState("10");

  const { breakEvenRoas, recommendedRoas, error } = useMemo(() => {
    const m = parseFloat(margin);
    const buf = parseFloat(bufferPct);
    if (isNaN(m) || m <= 0 || m >= 100) {
      return { error: "Enter a profit margin between 0 and 100 (exclusive)." };
    }
    if (isNaN(buf) || buf < 0) {
      return { error: "Enter a non-negative profit buffer percentage." };
    }
    const breakEven = (100 / m) * 100;
    const recommended = breakEven * (1 + buf / 100);
    return { breakEvenRoas: breakEven, recommendedRoas: recommended, error: "" };
  }, [margin, bufferPct]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["target-roas-estimator"]}
      explanation={
        <>
          <p>
            Target ROAS (Return on Ad Spend) tells Google Ads' automated bidding system how much
            revenue you need back for every dollar spent on ads. Set it below your true
            break-even point and Smart Bidding will happily spend you into a loss chasing volume.
            Set it far above break-even with no room for the algorithm to work, and delivery
            throttles down to a trickle because too few auctions clear that bar.
          </p>
          <p>
            Break-even ROAS is simply 100 divided by your profit margin percentage, expressed as
            a ratio (e.g. a 30% margin means you need $3.33 back for every $1 spent just to break
            even — a 333% Target ROAS). This tool calculates that break-even point from your
            margin, then adds a buffer percentage on top so the number you actually enter into
            Google Ads leaves room for real profit, not just break-even.
          </p>
          <p>
            Recalculate whenever your product costs, shipping, or discount structure changes —
            a stale Target ROAS is one of the most common silent killers of e-commerce ad
            campaigns.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Profit margin (%)</label>
            <input
              type="number"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              className="input-field"
              min="1"
              max="99"
            />
          </div>
          <div>
            <label className="label">Desired profit buffer above break-even (%)</label>
            <input
              type="number"
              value={bufferPct}
              onChange={(e) => setBufferPct(e.target.value)}
              className="input-field"
              min="0"
            />
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {!error && (
        <div className="card p-5 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-caption text-ink-faint mb-1">Break-even Target ROAS</p>
            <p className="text-h3 text-ink">{breakEvenRoas.toFixed(0)}%</p>
          </div>
          <div>
            <p className="text-caption text-ink-faint mb-1">Recommended Target ROAS (with buffer)</p>
            <p className="text-h3 text-accent">{recommendedRoas.toFixed(0)}%</p>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

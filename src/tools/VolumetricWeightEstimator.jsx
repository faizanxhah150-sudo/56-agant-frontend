import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ErrorState, StatusPill } from "../components/ToolUi.jsx";

const DIVISORS = [
  { label: "5000 (most international couriers, cm/kg)", value: 5000 },
  { label: "6000 (some air freight, cm/kg)", value: 6000 },
  { label: "139 (US domestic, in/lb)", value: 139 },
  { label: "166 (some US air couriers, in/lb)", value: 166 },
];

export default function VolumetricWeightEstimator({ tool }) {
  const [length, setLength] = useState("40");
  const [width, setWidth] = useState("30");
  const [height, setHeight] = useState("20");
  const [actualWeight, setActualWeight] = useState("3");
  const [divisor, setDivisor] = useState(5000);
  const [unit, setUnit] = useState("kg");

  const { volumetric, billable, error } = useMemo(() => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const aw = parseFloat(actualWeight);
    if ([l, w, h, aw].some((v) => isNaN(v) || v <= 0)) {
      return { error: "Enter positive numbers for all dimensions and actual weight." };
    }
    const vol = (l * w * h) / divisor;
    return { volumetric: vol, billable: Math.max(vol, aw), error: "" };
  }, [length, width, height, actualWeight, divisor]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["volumetric-weight-estimator"]}
      explanation={
        <>
          <p>
            Couriers don't just charge by scale weight. A large, lightweight box — think a
            packed-but-empty-feeling box of pillows — takes up truck and plane space that a
            dense, heavy box of the same actual weight wouldn't. To account for that, couriers
            calculate a "volumetric weight" from the package's dimensions and bill whichever
            number is higher: the actual weight or the volumetric weight.
          </p>
          <p>
            This tool runs that same calculation: multiply length × width × height, divide by the
            courier's volumetric divisor (this varies by courier and by domestic vs. international
            service — check your specific courier's published divisor), and compare the result
            against your actual scale weight. Whichever is larger is what you'll actually be
            billed for.
          </p>
          <p>
            Use it before shipping to catch surprise overcharges on bulky-but-light items, or to
            decide whether a smaller box (even with more padding) would come out cheaper overall.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Length (cm)</label>
            <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="input-field" min="0" />
          </div>
          <div>
            <label className="label">Width (cm)</label>
            <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="input-field" min="0" />
          </div>
          <div>
            <label className="label">Height (cm)</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="input-field" min="0" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Actual weight ({unit})</label>
            <input
              type="number"
              value={actualWeight}
              onChange={(e) => setActualWeight(e.target.value)}
              className="input-field"
              min="0"
            />
          </div>
          <div>
            <label className="label">Courier volumetric divisor</label>
            <select value={divisor} onChange={(e) => setDivisor(Number(e.target.value))} className="input-field">
              {DIVISORS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {!error && volumetric != null && (
        <div className="card p-5 grid sm:grid-cols-3 gap-4 items-center">
          <div>
            <p className="text-caption text-ink-faint mb-1">Actual weight</p>
            <p className="text-h3 text-ink">{parseFloat(actualWeight).toFixed(2)} {unit}</p>
          </div>
          <div>
            <p className="text-caption text-ink-faint mb-1">Volumetric weight</p>
            <p className="text-h3 text-ink">{volumetric.toFixed(2)} {unit}</p>
          </div>
          <div>
            <p className="text-caption text-ink-faint mb-1">Billable weight</p>
            <p className="text-h3 text-accent">{billable.toFixed(2)} {unit}</p>
            <div className="mt-1">
              <StatusPill status={billable > parseFloat(actualWeight) ? "warn" : "good"}>
                {billable > parseFloat(actualWeight) ? "Billed on volumetric weight" : "Billed on actual weight"}
              </StatusPill>
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ErrorState } from "../components/ToolUi.jsx";

export default function EcommerceRoiCalculator({ tool }) {
  const [price, setPrice] = useState("49.99");
  const [cogs, setCogs] = useState("15");
  const [shipping, setShipping] = useState("4.5");
  const [feePct, setFeePct] = useState("2.9");
  const [adSpend, setAdSpend] = useState("8");
  const [currency, setCurrency] = useState("USD");

  const { netProfit, marginPct, breakEvenRoas, error } = useMemo(() => {
    const p = parseFloat(price);
    const c = parseFloat(cogs);
    const s = parseFloat(shipping);
    const f = parseFloat(feePct);
    const a = parseFloat(adSpend);
    if ([p, c, s, f, a].some((v) => isNaN(v) || v < 0)) {
      return { error: "Enter valid, non-negative numbers for every field." };
    }
    if (p === 0) return { error: "Selling price must be greater than zero." };
    const feeAmount = p * (f / 100);
    const totalCost = c + s + feeAmount + a;
    const profit = p - totalCost;
    const margin = (profit / p) * 100;
    const breakEven = a > 0 ? (p / a) * 100 : null;
    return { netProfit: profit, marginPct: margin, breakEvenRoas: breakEven, error: "" };
  }, [price, cogs, shipping, feePct, adSpend]);

  function fmt(n) {
    return `${currency} ${n.toFixed(2)}`;
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["ecommerce-roi-calculator"]}
      explanation={
        <>
          <p>
            "We sold it for $50 and it cost $15" isn't a profit calculation — it's missing
            shipping, payment processing fees (typically 2–3% plus a fixed fee per transaction),
            and the ad spend it took to actually generate that sale. Each of those quietly erodes
            margin, and stacked together they can turn an apparently healthy sale into a loss.
          </p>
          <p>
            This calculator takes your selling price and subtracts cost of goods, shipping, a
            payment-processing fee percentage, and ad spend per sale to show true net profit and
            margin. It also calculates the break-even ROAS — the minimum return your ad spend
            needs to generate just to cover its own cost — which is the number to compare against
            your actual campaign ROAS in your ads dashboard.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Selling price</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="input-field" min="0" step="0.01" />
          </div>
          <div>
            <label className="label">Cost of goods (COGS)</label>
            <input type="number" value={cogs} onChange={(e) => setCogs(e.target.value)} className="input-field" min="0" step="0.01" />
          </div>
          <div>
            <label className="label">Shipping cost</label>
            <input type="number" value={shipping} onChange={(e) => setShipping(e.target.value)} className="input-field" min="0" step="0.01" />
          </div>
          <div>
            <label className="label">Payment processing fee (%)</label>
            <input type="number" value={feePct} onChange={(e) => setFeePct(e.target.value)} className="input-field" min="0" step="0.1" />
          </div>
          <div>
            <label className="label">Ad spend per sale</label>
            <input type="number" value={adSpend} onChange={(e) => setAdSpend(e.target.value)} className="input-field" min="0" step="0.01" />
          </div>
          <div>
            <label className="label">Currency code</label>
            <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} maxLength={3} className="input-field uppercase" />
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {!error && netProfit != null && (
        <div className="card p-5 grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-caption text-ink-faint mb-1">Net profit / sale</p>
            <p className={`text-h3 ${netProfit >= 0 ? "text-status-good" : "text-status-bad"}`}>{fmt(netProfit)}</p>
          </div>
          <div>
            <p className="text-caption text-ink-faint mb-1">Profit margin</p>
            <p className="text-h3 text-ink">{marginPct.toFixed(1)}%</p>
          </div>
          <div>
            <p className="text-caption text-ink-faint mb-1">Break-even ROAS</p>
            <p className="text-h3 text-accent">{breakEvenRoas != null ? `${breakEvenRoas.toFixed(0)}%` : "—"}</p>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

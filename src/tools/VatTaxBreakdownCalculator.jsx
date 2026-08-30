import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ErrorState } from "../components/ToolUi.jsx";

const PRESET_RATES = [
  { label: "Custom", value: "" },
  { label: "UK — 20% (Standard)", value: 20 },
  { label: "Ireland — 23%", value: 23 },
  { label: "Germany — 19%", value: 19 },
  { label: "France — 20%", value: 20 },
  { label: "UAE — 5%", value: 5 },
  { label: "Pakistan — 18% (GST)", value: 18 },
  { label: "India — 18% (GST)", value: 18 },
  { label: "Australia — 10% (GST)", value: 10 },
  { label: "Canada — 5% (GST)", value: 5 },
];

export default function VatTaxBreakdownCalculator({ tool }) {
  const [amount, setAmount] = useState("1000");
  const [rate, setRate] = useState(20);
  const [inclusive, setInclusive] = useState(false);
  const [currency, setCurrency] = useState("USD");

  const { subtotal, tax, total, error } = useMemo(() => {
    const amt = parseFloat(amount);
    const r = parseFloat(rate);
    if (isNaN(amt) || amt < 0) return { error: "Enter a valid, non-negative amount." };
    if (isNaN(r) || r < 0) return { error: "Enter a valid tax rate." };
    if (inclusive) {
      const sub = amt / (1 + r / 100);
      return { subtotal: sub, tax: amt - sub, total: amt, error: "" };
    }
    const taxAmt = amt * (r / 100);
    return { subtotal: amt, tax: taxAmt, total: amt + taxAmt, error: "" };
  }, [amount, rate, inclusive]);

  function fmt(n) {
    return `${currency} ${n.toFixed(2)}`;
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["vat-tax-breakdown-calculator"]}
      explanation={
        <>
          <p>
            The most common invoicing mistake isn't picking the wrong tax rate — it's applying it
            in the wrong direction. If a client-provided figure already includes tax and you add
            tax on top again, you overcharge. If a tax-inclusive figure is treated as the
            pre-tax subtotal, you undercharge and eat the difference yourself.
          </p>
          <p>
            This calculator makes that direction an explicit choice: toggle whether your entered
            amount already includes tax or not, and it works out the subtotal, tax amount, and
            total accordingly. The preset country rates are a starting point — always confirm the
            current rate for your specific jurisdiction and product category, since reduced rates
            often apply to certain goods and services.
          </p>
          <p>
            This is a calculation aid, not tax advice — for anything beyond a straightforward
            invoice, consult a qualified accountant familiar with your jurisdiction.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="label">Currency code</label>
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value.toUpperCase())}
              maxLength={3}
              className="input-field uppercase"
            />
          </div>
        </div>

        <div>
          <label className="label">Tax rate preset</label>
          <select
            onChange={(e) => e.target.value !== "" && setRate(Number(e.target.value))}
            className="input-field"
            defaultValue=""
          >
            {PRESET_RATES.map((p) => (
              <option key={p.label} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Tax rate (%)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="input-field"
            min="0"
            step="0.1"
          />
        </div>

        <label className="flex items-center gap-2 text-body text-ink-muted cursor-pointer select-none">
          <input
            type="checkbox"
            checked={inclusive}
            onChange={(e) => setInclusive(e.target.checked)}
            className="w-4 h-4 rounded-sm accent-accent"
          />
          Entered amount already includes tax
        </label>
      </div>

      {error && <ErrorState message={error} />}

      {!error && (
        <div className="card p-5 grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-caption text-ink-faint mb-1">Subtotal</p>
            <p className="text-h3 text-ink">{fmt(subtotal)}</p>
          </div>
          <div>
            <p className="text-caption text-ink-faint mb-1">Tax ({rate || 0}%)</p>
            <p className="text-h3 text-ink">{fmt(tax)}</p>
          </div>
          <div>
            <p className="text-caption text-ink-faint mb-1">Total payable</p>
            <p className="text-h3 text-accent">{fmt(total)}</p>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

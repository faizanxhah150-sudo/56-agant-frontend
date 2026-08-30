import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ErrorState } from "../components/ToolUi.jsx";

export default function LtvChurnForecaster({ tool }) {
  const [monthlyRevenue, setMonthlyRevenue] = useState("50");
  const [churnPct, setChurnPct] = useState("5");
  const [customerCount, setCustomerCount] = useState("200");
  const [currency, setCurrency] = useState("USD");

  const { lifespanMonths, ltv, monthlyRecurringRevenue, error } = useMemo(() => {
    const rev = parseFloat(monthlyRevenue);
    const churn = parseFloat(churnPct);
    const count = parseFloat(customerCount);
    if ([rev, churn, count].some((v) => isNaN(v) || v < 0)) {
      return { error: "Enter valid, non-negative numbers." };
    }
    if (churn <= 0 || churn > 100) return { error: "Monthly churn rate must be greater than 0% and no more than 100%." };
    const lifespan = 1 / (churn / 100);
    return {
      lifespanMonths: lifespan,
      ltv: rev * lifespan,
      monthlyRecurringRevenue: rev * count,
      error: "",
    };
  }, [monthlyRevenue, churnPct, customerCount]);

  function fmt(n) {
    return `${currency} ${n.toFixed(2)}`;
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["ltv-churn-forecaster"]}
      explanation={
        <>
          <p>
            Customer Lifetime Value (LTV) answers the question that matters most for sustainable
            growth: how much is one customer actually worth over their entire relationship with
            the business, not just their first purchase? It's the number that should drive how
            much you can afford to spend acquiring a customer in the first place.
          </p>
          <p>
            This calculator uses the standard subscription-business formula: average customer
            lifespan is the inverse of the monthly churn rate (a 5% monthly churn rate implies an
            average lifespan of 20 months), and LTV is average monthly revenue per customer
            multiplied by that lifespan. It also shows current monthly recurring revenue from
            your active customer count, for context.
          </p>
          <p>
            This is a simplified model — it doesn't account for revenue expansion (upsells) or
            changing churn rates over a customer's lifetime, both of which more sophisticated LTV
            models incorporate.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Average monthly revenue per customer</label>
            <input type="number" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(e.target.value)} className="input-field" min="0" step="0.01" />
          </div>
          <div>
            <label className="label">Monthly churn rate (%)</label>
            <input type="number" value={churnPct} onChange={(e) => setChurnPct(e.target.value)} className="input-field" min="0.1" max="100" step="0.1" />
          </div>
          <div>
            <label className="label">Current active customers</label>
            <input type="number" value={customerCount} onChange={(e) => setCustomerCount(e.target.value)} className="input-field" min="0" />
          </div>
          <div>
            <label className="label">Currency code</label>
            <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} maxLength={3} className="input-field uppercase" />
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {!error && ltv != null && (
        <div className="card p-5 grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-caption text-ink-faint mb-1">Avg. customer lifespan</p>
            <p className="text-h3 text-ink">{lifespanMonths.toFixed(1)} months</p>
          </div>
          <div>
            <p className="text-caption text-ink-faint mb-1">Customer LTV</p>
            <p className="text-h3 text-accent">{fmt(ltv)}</p>
          </div>
          <div>
            <p className="text-caption text-ink-faint mb-1">Current MRR</p>
            <p className="text-h3 text-ink">{fmt(monthlyRecurringRevenue)}</p>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { ErrorState } from "../components/ToolUi.jsx";

export default function FreelanceRateEstimator({ tool }) {
  const [expenses, setExpenses] = useState("1500");
  const [profit, setProfit] = useState("2000");
  const [billableHours, setBillableHours] = useState("100");
  const [currency, setCurrency] = useState("USD");
  const [projectHours, setProjectHours] = useState("20");

  const { hourlyRate, projectPrice, error } = useMemo(() => {
    const exp = parseFloat(expenses);
    const prof = parseFloat(profit);
    const hours = parseFloat(billableHours);
    const pHours = parseFloat(projectHours);
    if ([exp, prof, hours].some((v) => isNaN(v) || v < 0)) {
      return { error: "Enter valid, non-negative numbers for expenses, profit, and hours." };
    }
    if (hours === 0) return { error: "Billable hours per month must be greater than zero." };
    const rate = (exp + prof) / hours;
    return {
      hourlyRate: rate,
      projectPrice: !isNaN(pHours) && pHours > 0 ? rate * pHours : null,
      error: "",
    };
  }, [expenses, profit, billableHours, projectHours]);

  function fmt(n) {
    return `${currency} ${n.toFixed(2)}`;
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["freelance-rate-estimator"]}
      explanation={
        <>
          <p>
            Most freelancers price their time by copying whatever rate a competitor advertises,
            rather than working backward from what they actually need to earn. That approach
            ignores two things every freelancer has: real monthly business costs (software,
            insurance, taxes, a laptop replacement fund) and the fact that not every hour in a
            month is billable — time spent on proposals, admin, and finding clients doesn't
            generate revenue directly.
          </p>
          <p>
            This calculator works backward from your numbers instead: enter your monthly
            business expenses, the profit you want to actually take home, and how many hours per
            month you can realistically bill (not just work). It divides your total need by your
            billable hours to get a minimum hourly rate, then uses that rate to estimate a
            fixed-price quote for a project of a given size.
          </p>
          <p>
            Treat the result as a floor, not a ceiling — specialized skills, urgent turnaround,
            and client budget all justify charging more than the bare-minimum number.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Monthly business expenses</label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="input-field"
              min="0"
            />
          </div>
          <div>
            <label className="label">Desired monthly profit</label>
            <input
              type="number"
              value={profit}
              onChange={(e) => setProfit(e.target.value)}
              className="input-field"
              min="0"
            />
          </div>
          <div>
            <label className="label">Billable hours per month</label>
            <input
              type="number"
              value={billableHours}
              onChange={(e) => setBillableHours(e.target.value)}
              className="input-field"
              min="1"
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
          <div>
            <label className="label">Sample project size (hours)</label>
            <input
              type="number"
              value={projectHours}
              onChange={(e) => setProjectHours(e.target.value)}
              className="input-field"
              min="0"
            />
          </div>
        </div>
      </div>

      {error && <ErrorState message={error} />}

      {!error && hourlyRate != null && (
        <div className="card p-5 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-caption text-ink-faint mb-1">Minimum hourly rate</p>
            <p className="text-h3 text-accent">{fmt(hourlyRate)}/hr</p>
          </div>
          {projectPrice != null && (
            <div>
              <p className="text-caption text-ink-faint mb-1">
                Sample project price ({projectHours} hrs)
              </p>
              <p className="text-h3 text-ink">{fmt(projectPrice)}</p>
            </div>
          )}
        </div>
      )}
    </ToolShell>
  );
}

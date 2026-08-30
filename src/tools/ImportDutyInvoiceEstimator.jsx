import { useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { LoadingState, EmptyState, ErrorState } from "../components/ToolUi.jsx";
import { apiPost, ApiError } from "../lib/api.js";

export default function ImportDutyInvoiceEstimator({ tool }) {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [dutyPct, setDutyPct] = useState("5");
  const [vatPct, setVatPct] = useState("20");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCalculate() {
    setError("");
    setResult(null);
    if (!amount.trim() || isNaN(parseFloat(amount))) {
      setError("Enter a valid amount.");
      return;
    }
    setLoading(true);
    try {
      setResult(await apiPost("/api/import-duty-invoice-estimator", { amount, fromCurrency, toCurrency, dutyPct, vatPct }));
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function fmt(n) {
    return `${toCurrency} ${n.toFixed(2)}`;
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["import-duty-invoice-estimator"]}
      explanation={
        <>
          <p>
            A cross-border invoice stacks three separate calculations on top of each other in a
            specific order: convert the amount to the destination currency, apply import duty to
            the converted amount, then apply VAT/tax to the duty-inclusive total (in most
            jurisdictions, VAT is charged on the value plus duty, not on the pre-duty value).
            Getting that order wrong produces a total that's subtly, and sometimes not so subtly,
            incorrect.
          </p>
          <p>
            This tool fetches a live exchange rate and walks through that sequence automatically.
            Duty and VAT rates vary enormously by product category and destination country — the
            percentages here are inputs you supply, not looked-up rates, so confirm the correct
            rate for your specific product and destination with the relevant customs authority.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" min="0" step="0.01" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="label">From</label>
              <input type="text" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value.toUpperCase())} maxLength={3} className="input-field uppercase" />
            </div>
            <div>
              <label className="label">To</label>
              <input type="text" value={toCurrency} onChange={(e) => setToCurrency(e.target.value.toUpperCase())} maxLength={3} className="input-field uppercase" />
            </div>
          </div>
          <div>
            <label className="label">Import duty (%)</label>
            <input type="number" value={dutyPct} onChange={(e) => setDutyPct(e.target.value)} className="input-field" min="0" step="0.1" />
          </div>
          <div>
            <label className="label">VAT / tax (%)</label>
            <input type="number" value={vatPct} onChange={(e) => setVatPct(e.target.value)} className="input-field" min="0" step="0.1" />
          </div>
        </div>
        <button onClick={handleCalculate} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Fetching live rate…" : "Calculate"}
        </button>
      </div>

      {loading && <LoadingState message="Fetching live exchange rate…" />}
      {error && <ErrorState message={error} />}
      {!loading && !error && !result && <EmptyState />}

      {result && (
        <div className="card p-5 space-y-4">
          <p className="text-caption text-ink-faint">
            Live rate: 1 {result.fromCurrency} = {result.exchangeRate.toFixed(4)} {result.toCurrency}
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-caption text-ink-faint mb-1">Converted amount</p>
              <p className="text-h3 text-ink">{fmt(result.convertedAmount)}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">Import duty</p>
              <p className="text-h3 text-ink">{fmt(result.dutyAmount)}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">VAT / tax</p>
              <p className="text-h3 text-ink">{fmt(result.vatAmount)}</p>
            </div>
            <div>
              <p className="text-caption text-ink-faint mb-1">Total payable</p>
              <p className="text-h3 text-accent">{fmt(result.total)}</p>
            </div>
          </div>
        </div>
      )}
    </ToolShell>
  );
}

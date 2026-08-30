import { useState } from "react";
import { RefreshCw } from "lucide-react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton, EmptyState, ErrorState } from "../components/ToolUi.jsx";

const ALGORITHMS = [
  { value: "SHA-256", label: "SHA-256 (recommended)" },
  { value: "SHA-384", label: "SHA-384" },
  { value: "SHA-512", label: "SHA-512" },
];

function randomSecret(length = 32) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function computeHmac(payload, secret, algorithm) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: algorithm },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return toHex(signature);
}

export default function HmacSigner({ tool }) {
  const [payload, setPayload] = useState('{\n  "event": "payment.succeeded",\n  "amount": 4999\n}');
  const [secret, setSecret] = useState(randomSecret());
  const [algorithm, setAlgorithm] = useState("SHA-256");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setError("");
    if (!payload.trim()) {
      setError("Enter a payload to sign before generating a signature.");
      return;
    }
    if (!secret.trim()) {
      setError("Enter or generate a secret key first.");
      return;
    }
    setLoading(true);
    try {
      const sig = await computeHmac(payload, secret, algorithm);
      setSignature(sig);
    } catch {
      setError("Could not generate a signature. Check that your browser supports the Web Crypto API.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["hmac-signer"]}
      explanation={
        <>
          <p>
            HMAC (Hash-based Message Authentication Code) is the standard way webhook providers —
            Stripe, GitHub, Shopify, and virtually every SaaS platform — prove that a request
            actually came from them and wasn't forged or altered in transit. It combines your
            payload with a shared secret key through a cryptographic hash function, producing a
            signature that only someone holding the same secret could reproduce.
          </p>
          <p>
            Use this tool during development to generate test signatures for your webhook
            receiver, or to double-check that your server-side verification logic matches what
            the sender is producing. Never share your production secret key outside your own
            backend — this tool runs entirely in your browser, so nothing you type here is sent
            anywhere.
          </p>
          <p>
            On your receiving server, recompute the HMAC of the raw incoming payload using your
            stored secret, then compare it to the signature the sender included in a request
            header (commonly <code>X-Signature</code> or similar). Reject the request if they
            don't match exactly.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Payload (JSON or plain text)</label>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            rows={6}
            className="input-field font-mono text-caption"
            spellCheck={false}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Secret key</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="input-field font-mono text-caption"
                spellCheck={false}
              />
              <button
                type="button"
                onClick={() => setSecret(randomSecret())}
                aria-label="Generate new random secret"
                className="btn-secondary px-3"
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </div>
          <div>
            <label className="label">Hash algorithm</label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              className="input-field"
            >
              {ALGORITHMS.map((a) => (
                <option key={a.value} value={a.value}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full sm:w-auto">
          {loading ? "Generating…" : "Generate Signature"}
        </button>
      </div>

      {error && <ErrorState message={error} />}

      {!error && !signature && <EmptyState message="Your HMAC signature will appear here." />}

      {signature && (
        <div className="card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <label className="label mb-0">HMAC-{algorithm} signature</label>
            <CopyButton text={signature} />
          </div>
          <div className="code-block break-all">{signature}</div>
        </div>
      )}
    </ToolShell>
  );
}

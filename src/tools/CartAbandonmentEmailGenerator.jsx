import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton } from "../components/ToolUi.jsx";

export default function CartAbandonmentEmailGenerator({ tool }) {
  const [store, setStore] = useState("Northside Goods");
  const [product, setProduct] = useState("Classic Leather Backpack");
  const [discount, setDiscount] = useState("10");
  const [name, setName] = useState("there");

  const emails = useMemo(() => {
    const d = discount.trim();
    return [
      {
        title: "Email 1 — Gentle reminder (send 1 hour after abandonment)",
        subject: `Hi ${name}, you left something in your cart`,
        body: `Hi ${name},\n\nWe noticed you left the ${product} in your cart at ${store}. It's still there, waiting for you!\n\nComplete your order whenever you're ready — just click below to pick up right where you left off.\n\n[Complete My Order]\n\nQuestions about sizing, materials, or shipping? Just reply to this email.\n\n— The ${store} Team`,
      },
      {
        title: "Email 2 — Discount nudge (send 24 hours after abandonment)",
        subject: d ? `${d}% off your ${product} — today only` : `Still thinking about the ${product}?`,
        body: `Hi ${name},\n\nYour ${product} is still available, and ${d ? `we'd like to offer you ${d}% off to help you decide` : "we wanted to check in"}.\n${d ? `\nUse code SAVE${d} at checkout to claim your discount.\n` : ""}\nThis offer won't be around forever, so grab it while it lasts.\n\n[Claim My Discount]\n\n— The ${store} Team`,
      },
      {
        title: "Email 3 — Last chance (send 72 hours after abandonment)",
        subject: `Last chance: your cart expires soon`,
        body: `Hi ${name},\n\nThis is a friendly last call — the ${product} in your cart may sell out, and we don't want you to miss it.\n\n${d ? `Your ${d}% discount is still active for the next few hours.\n\n` : ""}[Complete My Order Now]\n\nAfter today, we can't guarantee availability or pricing.\n\n— The ${store} Team`,
      },
    ];
  }, [store, product, discount, name]);

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["cart-abandonment-email-generator"]}
      explanation={
        <>
          <p>
            A three-email recovery sequence recovers a meaningfully higher share of abandoned
            carts than a single reminder alone, because different shoppers abandon for different
            reasons: some just got distracted, some are price-sensitive, and some need a final
            push before the window closes.
          </p>
          <p>
            This tool writes all three emails from a few inputs. Treat the generated copy as a
            strong first draft — swap in your actual checkout link, adjust the tone to match your
            brand voice, and confirm the discount code actually works before sending.
          </p>
        </>
      }
    >
      <div className="card p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">Store name</label>
          <input type="text" value={store} onChange={(e) => setStore(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label">Product name</label>
          <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label">Customer first name (or leave "there")</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label">Discount % (optional)</label>
          <input type="text" value={discount} onChange={(e) => setDiscount(e.target.value.replace(/[^0-9]/g, ""))} className="input-field" />
        </div>
      </div>

      <div className="space-y-4">
        {emails.map((e) => (
          <div key={e.title} className="card p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-caption text-ink-faint">{e.title}</p>
              <CopyButton text={`Subject: ${e.subject}\n\n${e.body}`} />
            </div>
            <p className="text-body text-ink font-medium">Subject: {e.subject}</p>
            <pre className="text-body text-ink-muted whitespace-pre-wrap font-sans">{e.body}</pre>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

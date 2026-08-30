import { useMemo, useState } from "react";
import ToolShell from "../components/ToolShell.jsx";
import { INSTRUCTIONS } from "../data/instructions.js";
import { CopyButton } from "../components/ToolUi.jsx";

export default function UnsubscribeLinkGenerator({ tool }) {
  const [brand, setBrand] = useState("Acme Inc.");
  const [unsubUrl, setUnsubUrl] = useState("https://example.com/unsubscribe?id={{subscriber_id}}");
  const [address, setAddress] = useState("123 Main St, Springfield, IL 62701");

  const html = useMemo(
    () => `<div style="font-size:12px;color:#888;text-align:center;margin-top:24px;padding-top:16px;border-top:1px solid #eee;">
  You're receiving this email because you're subscribed to updates from ${brand}.<br />
  <a href="${unsubUrl}" style="color:#888;">Unsubscribe</a> from these emails.<br />
  ${address}
</div>`,
    [brand, unsubUrl, address]
  );

  const plainText = `--\nYou're receiving this email because you're subscribed to updates from ${brand}.\nUnsubscribe: ${unsubUrl}\n${address}`;

  return (
    <ToolShell
      tool={tool}
      instructions={INSTRUCTIONS["unsubscribe-link-generator"]}
      explanation={
        <>
          <p>
            Anti-spam laws like CAN-SPAM in the US and CASL in Canada require every commercial
            email to include a clear, working way to opt out and the sender's valid physical
            mailing address. Missing either isn't just a compliance risk — mailbox providers also
            use their absence as a spam signal, which can hurt deliverability for your entire
            sending domain.
          </p>
          <p>
            This tool generates a matching HTML and plain-text footer block from your brand name,
            unsubscribe link, and address. Make sure your unsubscribe link actually processes the
            opt-out (many platforms use a placeholder token like <code>{"{{subscriber_id}}"}</code>{" "}
            that your email service provider fills in automatically) before sending to a real list.
          </p>
        </>
      }
    >
      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Brand / company name</label>
          <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label">Unsubscribe URL</label>
          <input type="text" value={unsubUrl} onChange={(e) => setUnsubUrl(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label">Physical mailing address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="input-field" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <label className="label mb-0">HTML footer</label>
            <CopyButton text={html} />
          </div>
          <pre className="code-block whitespace-pre-wrap max-h-64 overflow-y-auto">{html}</pre>
        </div>
        <div className="card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <label className="label mb-0">Plain-text footer</label>
            <CopyButton text={plainText} />
          </div>
          <pre className="code-block whitespace-pre-wrap max-h-64 overflow-y-auto">{plainText}</pre>
        </div>
      </div>
    </ToolShell>
  );
}

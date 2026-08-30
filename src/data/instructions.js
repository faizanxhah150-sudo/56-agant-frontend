// Per-tool instructions-modal copy. Add one entry per tool slug as each
// tool is built. Every entry needs both `en` and `ur` with the same
// three fields: what, problem, how.

export const INSTRUCTIONS = {
  "hmac-signer": {
    en: {
      what: "Generates a cryptographically secure HMAC signature for any payload, using SHA-256, SHA-384, or SHA-512.",
      problem:
        "Webhook endpoints are public URLs, so anyone can send a fake request pretending to be your payment provider or CRM. An HMAC signature proves the payload really came from the expected sender and wasn't tampered with in transit.",
      how:
        "Paste your JSON or text payload, choose a hash algorithm, and either generate a new random secret key or paste your own. Press Generate Signature to get the HMAC hex digest. Use the same secret on your receiving server to recompute and compare the signature before trusting the request.",
    },
    ur: {
      what: "یہ ٹول کسی بھی ڈیٹا کے لیے محفوظ HMAC دستخط بناتا ہے، SHA-256، SHA-384 یا SHA-512 استعمال کرتے ہوئے۔",
      problem:
        "ویب ہک اینڈ پوائنٹس عوامی URLs ہوتے ہیں، اس لیے کوئی بھی جعلی درخواست بھیج سکتا ہے۔ HMAC دستخط ثابت کرتا ہے کہ ڈیٹا واقعی صحیح بھیجنے والے سے آیا ہے اور راستے میں تبدیل نہیں ہوا۔",
      how:
        "اپنا JSON یا ٹیکسٹ ڈیٹا پیسٹ کریں، ہیش الگورتھم منتخب کریں، اور نئی خفیہ کلید بنائیں یا اپنی پیسٹ کریں۔ Generate Signature دبائیں۔ اپنے سرور پر وہی خفیہ کلید استعمال کر کے دستخط کا موازنہ کریں۔",
    },
  },
  "email-domain-extractor": {
    en: {
      what: "Scans any block of raw text, CSV, or JSON and pulls out every valid email address and domain it finds.",
      problem:
        "Sales and ops teams often receive contact data buried inside messy exports, chat logs, or scraped pages. Manually copying every email out is slow and error-prone.",
      how:
        "Paste your raw text into the box and press Extract. The tool lists every unique, valid email and domain found, removes duplicates, and lets you copy or download the results as a CSV.",
    },
    ur: {
      what: "یہ ٹول کسی بھی خام متن، CSV یا JSON میں سے ہر درست ای میل ایڈریس اور ڈومین نکالتا ہے۔",
      problem:
        "سیلز اور آپریشنز ٹیموں کو اکثر گندے ڈیٹا میں رابطہ کی معلومات ملتی ہیں۔ ہر ای میل کو ہاتھ سے نکالنا سست اور غلطیوں سے بھرا ہوتا ہے۔",
      how:
        "اپنا خام متن باکس میں پیسٹ کریں اور Extract دبائیں۔ ٹول ہر منفرد، درست ای میل اور ڈومین کی فہرست بناتا ہے، نقول ہٹاتا ہے، اور آپ نتائج کاپی یا CSV کے طور پر ڈاؤن لوڈ کر سکتے ہیں۔",
    },
  },
  "disposable-email-checker": {
    en: {
      what: "Checks a single email address against a list of known disposable and temporary-email domain patterns.",
      problem:
        "People use 10-minute-mail-style throwaway addresses to bypass signup gates, which pollutes your lead list with contacts you can never actually reach.",
      how:
        "Type or paste an email address and press Check. The tool tells you immediately whether the domain matches a known disposable pattern, so you can reject it at signup time.",
    },
    ur: {
      what: "یہ ٹول ایک ای میل ایڈریس کو معلوم عارضی/ڈسپوزایبل ای میل ڈومینز کی فہرست کے خلاف چیک کرتا ہے۔",
      problem:
        "لوگ سائن اپ سے بچنے کے لیے عارضی ای میل استعمال کرتے ہیں، جس سے آپ کی لیڈ لسٹ ایسے رابطوں سے بھر جاتی ہے جن تک کبھی نہیں پہنچا جا سکتا۔",
      how:
        "ایک ای میل ایڈریس ٹائپ یا پیسٹ کریں اور Check دبائیں۔ ٹول فوراً بتاتا ہے کہ آیا یہ ڈومین معلوم عارضی پیٹرن سے میل کھاتا ہے۔",
    },
  },
  "json-diff-validator": {
    en: {
      what: "Compares two JSON payloads side by side and highlights every missing key, changed value, and type mismatch.",
      problem:
        "When two systems talk over an API or webhook, a silently changed field name or data type can break the integration with no obvious error message.",
      how:
        "Paste your two JSON payloads into the left and right boxes and press Compare. The tool lists every difference — added keys, removed keys, and type mismatches — in plain language.",
    },
    ur: {
      what: "یہ ٹول دو JSON ڈیٹا کا موازنہ کرتا ہے اور ہر غائب کلید، تبدیل شدہ قدر اور قسم کے فرق کو نمایاں کرتا ہے۔",
      problem:
        "جب دو نظام API یا ویب ہک کے ذریعے بات کرتے ہیں، تو خاموشی سے تبدیل شدہ فیلڈ نام انضمام کو توڑ سکتا ہے بغیر کسی واضح غلطی کے۔",
      how:
        "اپنے دو JSON ڈیٹا بائیں اور دائیں باکس میں پیسٹ کریں اور Compare دبائیں۔ ٹول ہر فرق کو سادہ زبان میں درج کرتا ہے۔",
    },
  },
  "spam-trigger-word-detector": {
    en: {
      what: "Scans a subject line against a large database of words and phrases that commonly trigger spam filters.",
      problem:
        "A subject line with too many spam-trigger words (\"free\", \"act now\", \"100% guaranteed\") gets your entire email routed straight to the spam folder, no matter how good the content is.",
      how:
        "Type your subject line and press Scan. The tool highlights every flagged word, shows an overall spam-risk score, and suggests that you reduce urgency/salesy language where the score is high.",
    },
    ur: {
      what: "یہ ٹول ایک سبجیکٹ لائن کو ایسے الفاظ کے ڈیٹابیس کے خلاف اسکین کرتا ہے جو عام طور پر اسپام فلٹرز کو متحرک کرتے ہیں۔",
      problem:
        "بہت زیادہ اسپام الفاظ والی سبجیکٹ لائن پوری ای میل کو اسپام فولڈر میں بھیج دیتی ہے، چاہے مواد کتنا ہی اچھا کیوں نہ ہو۔",
      how:
        "اپنی سبجیکٹ لائن ٹائپ کریں اور Scan دبائیں۔ ٹول ہر نشان زدہ لفظ دکھاتا ہے اور مجموعی اسپام رسک اسکور دیتا ہے۔",
    },
  },
  "utm-builder": {
    en: {
      what: "Builds a clean, correctly formatted UTM-tagged tracking link from your base URL and campaign details.",
      problem:
        "A typo or inconsistent naming in UTM parameters (source/medium/campaign) silently breaks attribution in Google Analytics, making it impossible to tell which ad or link actually drove a sale.",
      how:
        "Enter your destination URL plus source, medium, campaign, and optional term/content. The tool assembles the final tracking link live as you type, and you can copy it with one click.",
    },
    ur: {
      what: "یہ ٹول آپ کے بیس URL اور مہم کی تفصیلات سے ایک صاف، درست UTM ٹریکنگ لنک بناتا ہے۔",
      problem:
        "UTM پیرامیٹرز میں ایک چھوٹی سی غلطی خاموشی سے Google Analytics میں اٹریبیوشن کو توڑ دیتی ہے۔",
      how:
        "اپنا منزل URL، سورس، میڈیم، مہم اور اختیاری ٹرم/مواد درج کریں۔ ٹول لائیو حتمی ٹریکنگ لنک بناتا ہے جسے آپ ایک کلک سے کاپی کر سکتے ہیں۔",
    },
  },
  "vat-tax-breakdown-calculator": {
    en: {
      what: "Calculates the subtotal, VAT/tax amount, and total for an invoice, either adding tax on top or extracting it from a tax-inclusive price.",
      problem:
        "Manually calculating VAT for international invoices — especially deciding whether a given amount already includes tax — is a common source of billing mistakes.",
      how:
        "Enter the base amount, choose your tax rate (or pick a preset country rate), and choose whether the amount is tax-inclusive or tax-exclusive. The breakdown updates instantly.",
    },
    ur: {
      what: "یہ ٹول ایک انوائس کے لیے سب ٹوٹل، VAT/ٹیکس کی رقم، اور کل رقم کا حساب لگاتا ہے۔",
      problem:
        "بین الاقوامی انوائسز کے لیے دستی طور پر VAT کا حساب لگانا، خاص طور پر یہ فیصلہ کرنا کہ رقم پہلے سے ٹیکس شامل ہے یا نہیں، بلنگ کی غلطیوں کا ایک عام سبب ہے۔",
      how:
        "بنیادی رقم درج کریں، اپنی ٹیکس شرح منتخب کریں، اور بتائیں کہ آیا رقم ٹیکس شامل ہے یا نہیں۔ تفصیل فوری طور پر اپ ڈیٹ ہوتی ہے۔",
    },
  },
  "freelance-rate-estimator": {
    en: {
      what: "Calculates the minimum hourly rate and fixed project price you need to charge to hit a target monthly profit.",
      problem:
        "Freelancers commonly under-price their work because they forget to account for unbillable hours, taxes, software costs, and desired profit margin.",
      how:
        "Enter your monthly business expenses, desired monthly profit, billable hours per month, and currency. The tool calculates your break-even and recommended hourly rate, plus a sample fixed-price quote.",
    },
    ur: {
      what: "یہ ٹول اس کم از کم فی گھنٹہ ریٹ اور فکسڈ پروجیکٹ قیمت کا حساب لگاتا ہے جو آپ کو ماہانہ منافع کے ہدف تک پہنچنے کے لیے چاہیے۔",
      problem:
        "فری لانسرز اکثر اپنے کام کی کم قیمت لگاتے ہیں کیونکہ وہ غیر بلنگ گھنٹے، ٹیکس اور مطلوبہ منافع کو حساب میں نہیں لاتے۔",
      how:
        "اپنے ماہانہ اخراجات، مطلوبہ منافع، فی مہینہ بل ایبل گھنٹے اور کرنسی درج کریں۔ ٹول آپ کا تجویز کردہ فی گھنٹہ ریٹ نکالتا ہے۔",
    },
  },
  "faq-schema-builder": {
    en: {
      what: "Generates valid, Google-compliant JSON-LD FAQPage schema code from a list of question-and-answer pairs.",
      problem:
        "Adding FAQ rich results (the expandable Q&A drop-downs) in Google Search requires exact JSON-LD schema markup — one syntax mistake and the rich result won't show.",
      how:
        "Add one or more question/answer pairs using the + button. The tool builds the complete JSON-LD script live. Copy it and paste it inside a <script type=\"application/ld+json\"> tag on your page.",
    },
    ur: {
      what: "یہ ٹول سوال و جواب کی فہرست سے درست، Google کے مطابق JSON-LD FAQPage اسکیما کوڈ بناتا ہے۔",
      problem:
        "Google سرچ میں FAQ رچ رزلٹ شامل کرنے کے لیے بالکل درست JSON-LD مارک اپ درکار ہے — ایک چھوٹی سی غلطی اور رچ رزلٹ نہیں دکھے گا۔",
      how:
        "+ بٹن سے ایک یا زیادہ سوال/جواب جوڑے شامل کریں۔ ٹول مکمل JSON-LD اسکرپٹ لائیو بناتا ہے، اسے کاپی کر کے اپنے صفحے پر پیسٹ کریں۔",
    },
  },
  "json-to-markdown-table": {
    en: {
      what: "Converts an array of JSON objects into a clean, ready-to-paste Markdown table.",
      problem:
        "Formatting JSON data into a readable Markdown table for documentation or a GitHub README by hand is tedious and easy to get misaligned.",
      how:
        "Paste a JSON array of objects (all objects should share similar keys). Press Convert and the tool builds a properly aligned Markdown table you can copy straight into your docs.",
    },
    ur: {
      what: "یہ ٹول JSON آبجیکٹس کی ایک صف کو صاف، پیسٹ کرنے کے لیے تیار Markdown ٹیبل میں تبدیل کرتا ہے۔",
      problem:
        "دستاویزات یا GitHub README کے لیے JSON کو ہاتھ سے Markdown ٹیبل میں فارمیٹ کرنا تھکا دینے والا اور غلطیوں کا شکار ہوتا ہے۔",
      how:
        "آبجیکٹس کی ایک JSON صف پیسٹ کریں۔ Convert دبائیں اور ٹول ایک درست طور پر ترتیب شدہ Markdown ٹیبل بناتا ہے۔",
    },
  },
  "volumetric-weight-estimator": {
    en: {
      what: "Compares a package's actual weight against its dimensional (volumetric) weight and reports which one the courier will actually bill you for.",
      problem:
        "Couriers charge based on whichever is higher — actual weight or volumetric weight — so a large, light package can cost far more than expected if you don't check both.",
      how:
        "Enter the package's length, width, and height, its actual weight, and select the courier's volumetric divisor (e.g. 5000 for most international couriers). The tool shows both weights and the billable one.",
    },
    ur: {
      what: "یہ ٹول پیکج کے اصل وزن کا اس کے حجمی (volumetric) وزن سے موازنہ کرتا ہے اور بتاتا ہے کہ کورئیر آپ سے کس کی بنیاد پر چارج کرے گا۔",
      problem:
        "کورئیر اصل وزن یا حجمی وزن میں سے جو زیادہ ہو اس کی بنیاد پر چارج کرتے ہیں، اس لیے ایک بڑا، ہلکا پیکج توقع سے کہیں زیادہ مہنگا پڑ سکتا ہے۔",
      how:
        "پیکج کی لمبائی، چوڑائی، اونچائی اور اصل وزن درج کریں، اور کورئیر کا حجمی تقسیم کار منتخب کریں۔ ٹول دونوں وزن اور قابل بل والا وزن دکھاتا ہے۔",
    },
  },
  "target-roas-estimator": {
    en: {
      what: "Calculates the optimal Target ROAS (Return on Ad Spend) percentage from your profit margin and ad spend goals.",
      problem:
        "Setting a Target ROAS in Google Ads too low burns budget on unprofitable clicks; setting it too high stalls the campaign entirely by restricting delivery. Most advertisers guess instead of calculating.",
      how:
        "Enter your product's profit margin percentage and your desired minimum profit per sale (or breakeven). The tool calculates the minimum Target ROAS to enter into Google Ads.",
    },
    ur: {
      what: "یہ ٹول آپ کے منافع کے مارجن اور اشتہار خرچ کے اہداف سے بہترین Target ROAS فیصد کا حساب لگاتا ہے۔",
      problem:
        "Google Ads میں Target ROAS بہت کم رکھنا غیر منافع بخش کلکس پر بجٹ ضائع کرتا ہے؛ بہت زیادہ رکھنا مہم کو مکمل طور پر روک دیتا ہے۔",
      how:
        "اپنی پروڈکٹ کا منافع مارجن فیصد اور مطلوبہ کم از کم منافع درج کریں۔ ٹول Google Ads میں درج کرنے کے لیے کم از کم Target ROAS نکالتا ہے۔",
    },
  },

  // ---- Phase 2 batch ----
  "corporate-freemail-analyzer": {
    en: {
      what: "Analyzes a pasted list of email addresses and reports what percentage are free consumer mailboxes (Gmail, Yahoo, etc.) versus corporate/business domains.",
      problem:
        "A B2B lead list full of personal Gmail addresses usually means low buying power and poor targeting — but scrolling through a list by eye to estimate that ratio doesn't scale past a few dozen rows.",
      how:
        "Paste one email per line (or any text containing emails). The tool classifies each against a list of major free-mail providers and shows the corporate-vs-free split instantly.",
    },
    ur: {
      what: "یہ ٹول پیسٹ کی گئی ای میل فہرست کا تجزیہ کرتا ہے اور بتاتا ہے کہ کتنے فیصد مفت (Gmail, Yahoo وغیرہ) اور کتنے فیصد کاروباری ڈومینز ہیں۔",
      problem:
        "ذاتی Gmail ایڈریسز سے بھری B2B لیڈ لسٹ عام طور پر کم خریداری کی طاقت ظاہر کرتی ہے، مگر ہاتھ سے یہ تناسب نکالنا بڑی فہرست پر ممکن نہیں۔",
      how:
        "ایک لائن میں ایک ای میل پیسٹ کریں۔ ٹول ہر ایک کو مفت میل فراہم کنندگان کی فہرست کے خلاف درجہ بندی کرتا ہے۔",
    },
  },
  "keyword-cannibalization-detector": {
    en: {
      what: "Scans a list of your page URLs and their target keywords, and flags any keyword being targeted by more than one page.",
      problem:
        "When two pages on the same site target the same keyword, Google has to pick one to rank and often splits ranking signals between both, so neither performs as well as a single, focused page would.",
      how:
        "Paste one row per page in the format `URL, target keyword`. Press Analyze — any keyword claimed by more than one URL is flagged as a cannibalization conflict.",
    },
    ur: {
      what: "یہ ٹول آپ کے صفحات کے URLs اور ٹارگٹ کی ورڈز کی فہرست اسکین کرتا ہے اور ہر وہ کی ورڈ نشان زد کرتا ہے جو ایک سے زیادہ صفحات ٹارگٹ کر رہے ہوں۔",
      problem:
        "جب ایک ہی سائٹ کے دو صفحات ایک ہی کی ورڈ کو ٹارگٹ کرتے ہیں تو Google کو ایک منتخب کرنا پڑتا ہے اور اکثر رینکنگ سگنلز دونوں میں بٹ جاتے ہیں۔",
      how:
        "ہر صفحے کے لیے ایک لائن `URL, ٹارگٹ کی ورڈ` کی شکل میں پیسٹ کریں۔ Analyze دبائیں — ایک سے زیادہ URLs والی کی ورڈز نشان زد ہوں گی۔",
    },
  },
  "cart-abandonment-email-generator": {
    en: {
      what: "Generates a ready-to-send 3-email cart-recovery sequence — a gentle reminder, a discount nudge, and a final urgency email.",
      problem:
        "Roughly 70% of online shopping carts get abandoned before checkout, and most small stores never follow up simply because writing a good recovery sequence takes time they don't have.",
      how:
        "Enter your store name, the abandoned product name, and an optional discount percentage. The tool writes all three emails in sequence, ready to copy into your email platform.",
    },
    ur: {
      what: "یہ ٹول ایک تیار 3 ای میل کارٹ ریکوری سیریز بناتا ہے — ایک نرم یاد دہانی، ایک رعایتی پیشکش، اور آخری فوری پیغام۔",
      problem:
        "تقریباً 70% آن لائن کارٹس چیک آؤٹ سے پہلے چھوڑ دیے جاتے ہیں، اور زیادہ تر چھوٹے اسٹورز فالو اپ نہیں کرتے کیونکہ اچھی سیریز لکھنے میں وقت لگتا ہے۔",
      how:
        "اپنا اسٹور کا نام، چھوڑا گیا پروڈکٹ کا نام، اور اختیاری رعایت فیصد درج کریں۔ ٹول تینوں ای میلز لکھ دیتا ہے۔",
    },
  },
  "cold-outreach-personalizer": {
    en: {
      what: "Takes a bulk list of leads and a message template with placeholders, and generates a personalized opener for each lead.",
      problem:
        "Generic mail-merge blasts get ignored or flagged as spam, but manually personalizing hundreds of cold emails one by one doesn't scale.",
      how:
        "Paste one lead per line as `name, company, role`, write a template using {{name}}, {{company}}, and {{role}} placeholders, and the tool generates one personalized message per lead.",
    },
    ur: {
      what: "یہ ٹول لیڈز کی بلک فہرست اور ایک ٹیمپلیٹ لے کر ہر لیڈ کے لیے ذاتی نوعیت کا پیغام بناتا ہے۔",
      problem:
        "عام میل مرج پیغامات نظر انداز یا اسپام قرار دیے جاتے ہیں، مگر سینکڑوں ای میلز ہاتھ سے ذاتی بنانا ممکن نہیں۔",
      how:
        "ہر لیڈ کے لیے ایک لائن `نام, کمپنی, عہدہ` کی شکل میں پیسٹ کریں، {{name}}, {{company}}, {{role}} استعمال کرتے ہوئے ٹیمپلیٹ لکھیں۔",
    },
  },
  "lead-scoring-calculator": {
    en: {
      what: "Scores a lead from 0–100 based on weighted inputs like company size, budget, engagement level, and urgency.",
      problem:
        "With thousands of inbound leads and limited sales hours, reps waste time on low-intent contacts while high-intent leads go cold waiting for a callback.",
      how:
        "Enter values for each scoring factor (or rate them on the provided scale) and the tool calculates a 0–100 lead score with a hot/warm/cold classification.",
    },
    ur: {
      what: "یہ ٹول کمپنی کا سائز، بجٹ، مصروفیت اور فوری ضرورت جیسے وزن دار عوامل کی بنیاد پر لیڈ کو 0–100 اسکور دیتا ہے۔",
      problem:
        "ہزاروں ان باؤنڈ لیڈز اور محدود وقت کے ساتھ، سیلز ٹیمیں کم دلچسپی والے رابطوں پر وقت ضائع کرتی ہیں۔",
      how:
        "ہر عنصر کے لیے قدر درج کریں (یا دیے گئے پیمانے پر درجہ دیں) اور ٹول 0–100 اسکور اور hot/warm/cold درجہ بندی نکالتا ہے۔",
    },
  },
  "social-post-optimizer": {
    en: {
      what: "Converts one block of text into platform-correct post formats for X/Twitter, Instagram, LinkedIn, and Facebook, with live character counts.",
      problem:
        "Every platform has a different character limit and style convention, so pasting the same caption everywhere either gets silently truncated or looks out of place.",
      how:
        "Paste your post text once. The tool shows a live character count against each platform's limit and flags where your text will get cut off.",
    },
    ur: {
      what: "یہ ٹول ایک متن کو X/Twitter، Instagram، LinkedIn اور Facebook کے لیے درست فارمیٹ میں تبدیل کرتا ہے، لائیو کریکٹر شمار کے ساتھ۔",
      problem:
        "ہر پلیٹ فارم کی حد مختلف ہے، اس لیے ایک ہی کیپشن ہر جگہ پیسٹ کرنے سے متن کٹ سکتا ہے۔",
      how:
        "اپنا پوسٹ متن ایک بار پیسٹ کریں۔ ٹول ہر پلیٹ فارم کی حد کے خلاف لائیو شمار دکھاتا ہے۔",
    },
  },
  "ecommerce-listing-seo-generator": {
    en: {
      what: "Generates an SEO-optimized product title, five bullet points, and backend search terms from your product details.",
      problem:
        "Marketplace search algorithms (Amazon, Etsy, etc.) rank listings heavily on keyword-rich titles and bullets — an unoptimized listing simply doesn't get found.",
      how:
        "Enter your product name, key features (one per line), and target keywords. The tool assembles a structured title, five feature bullets, and a backend search-term block.",
    },
    ur: {
      what: "یہ ٹول آپ کی پروڈکٹ تفصیلات سے SEO کے مطابق عنوان، پانچ بلٹ پوائنٹس اور بیک اینڈ سرچ ٹرمز بناتا ہے۔",
      problem:
        "مارکیٹ پلیس سرچ الگورتھمز کی ورڈ سے بھرپور عنوانات پر انحصار کرتے ہیں — غیر بہتر لسٹنگ تلاش میں نہیں آتی۔",
      how:
        "اپنی پروڈکٹ کا نام، خصوصیات اور ٹارگٹ کی ورڈز درج کریں۔ ٹول عنوان، بلٹس اور سرچ ٹرمز بناتا ہے۔",
    },
  },
  "sow-document-generator": {
    en: {
      what: "Generates a clean, print-ready Scope-of-Work document from a short form covering project details, deliverables, timeline, and payment terms.",
      problem:
        "A vague or badly formatted proposal is one of the most common reasons agencies lose a pitch or end up in a scope dispute later.",
      how:
        "Fill in the client name, project summary, deliverables (one per line), timeline, and payment terms. The tool assembles a formatted document you can copy or download.",
    },
    ur: {
      what: "یہ ٹول ایک مختصر فارم سے صاف، پرنٹ کے لیے تیار Scope-of-Work دستاویز بناتا ہے۔",
      problem:
        "غیر واضح یا خراب فارمیٹ شدہ تجویز اکثر ایجنسیوں کے کلائنٹ کھونے یا بعد میں تنازعہ کی وجہ بنتی ہے۔",
      how:
        "کلائنٹ کا نام، پروجیکٹ خلاصہ، ڈیلیورایبلز، ٹائم لائن اور ادائیگی کی شرائط درج کریں۔",
    },
  },
  "negative-keyword-builder": {
    en: {
      what: "Provides a paste-ready list of common negative keywords for a chosen industry, plus a place to add your own.",
      problem:
        "Without negative keywords, Google Ads matches your ad to irrelevant searches (like \"free\" or \"jobs\" when you're selling a paid product), wasting spend and dragging down Quality Score.",
      how:
        "Pick your industry from the list, review the suggested negative keywords, add any of your own, and copy the final list into your Google Ads negative keyword list.",
    },
    ur: {
      what: "یہ ٹول منتخب صنعت کے لیے عام منفی کی ورڈز کی فہرست فراہم کرتا ہے، اور اپنی شامل کرنے کی جگہ بھی دیتا ہے۔",
      problem:
        "منفی کی ورڈز کے بغیر، Google Ads غیر متعلقہ تلاشوں پر اشتہار دکھاتا ہے، جس سے بجٹ ضائع ہوتا ہے۔",
      how:
        "اپنی صنعت منتخب کریں، تجویز کردہ منفی کی ورڈز دیکھیں، اپنی شامل کریں، اور حتمی فہرست کاپی کریں۔",
    },
  },
  "ecommerce-roi-calculator": {
    en: {
      what: "Calculates net profit, profit margin, and break-even ad spend for a single product sale after cost of goods, shipping, payment fees, and ad spend.",
      problem:
        "Sellers often look at revenue or even gross margin and think they're profitable, without accounting for gateway fees, packaging, and ad cost — all of which quietly eat the real margin.",
      how:
        "Enter your selling price, cost of goods, shipping cost, payment processing fee percentage, and ad spend per sale. The tool shows your true net profit and margin.",
    },
    ur: {
      what: "یہ ٹول سامان کی قیمت، شپنگ، ادائیگی فیس اور اشتہار خرچ کے بعد خالص منافع اور مارجن کا حساب لگاتا ہے۔",
      problem:
        "بیچنے والے اکثر آمدنی دیکھ کر منافع بخش سمجھتے ہیں، بغیر گیٹ وے فیس اور اشتہار خرچ شامل کیے۔",
      how:
        "فروخت قیمت، سامان کی لاگت، شپنگ، ادائیگی فیس فیصد اور اشتہار خرچ درج کریں۔",
    },
  },
  "cookie-policy-generator": {
    en: {
      what: "Generates a ready-to-publish cookie policy page in HTML, based on the categories of cookies your site actually uses.",
      problem:
        "Most privacy regulations (GDPR, ePrivacy, and similar laws elsewhere) require sites to disclose what cookies they use — copying a generic policy that doesn't match your actual cookies creates a compliance gap.",
      how:
        "Enter your site/company name and check off which cookie categories apply (essential, analytics, marketing, preferences). The tool generates matching policy text and HTML.",
    },
    ur: {
      what: "یہ ٹول آپ کی سائٹ کے استعمال شدہ کوکیز کی بنیاد پر شائع کرنے کے لیے تیار کوکی پالیسی صفحہ بناتا ہے۔",
      problem:
        "زیادہ تر پرائیویسی قوانین (GDPR وغیرہ) کوکیز کے بارے میں انکشاف لازمی قرار دیتے ہیں۔",
      how:
        "اپنی سائٹ کا نام درج کریں اور متعلقہ کوکی اقسام منتخب کریں۔ ٹول مماثل متن اور HTML بناتا ہے۔",
    },
  },
  "text-file-splitter": {
    en: {
      what: "Splits a large block of pasted text or CSV data into smaller chunks, each downloadable as its own file.",
      problem:
        "A huge export (hundreds of thousands of lines) can crash a spreadsheet app or a script that expects smaller batches, especially when uploading to tools with row limits.",
      how:
        "Paste your text and choose how many lines per chunk. The tool splits it and gives you a download button for each chunk.",
    },
    ur: {
      what: "یہ ٹول ایک بڑی متن یا CSV فائل کو چھوٹے حصوں میں تقسیم کرتا ہے، ہر ایک الگ ڈاؤن لوڈ ایبل فائل کے طور پر۔",
      problem:
        "ایک بہت بڑی فائل اسپریڈشیٹ ایپ یا محدود قطار والے ٹولز کو کریش کر سکتی ہے۔",
      how:
        "اپنا متن پیسٹ کریں اور فی حصہ لائنوں کی تعداد منتخب کریں۔ ٹول اسے تقسیم کرتا ہے۔",
    },
  },
  "subject-line-length-optimizer": {
    en: {
      what: "Shows a live desktop and mobile preview of your email subject line and preview text, flagging where each gets cut off.",
      problem:
        "Mobile inboxes show far fewer characters than desktop ones — a subject line that looks complete on desktop can get truncated mid-sentence on a phone, hurting open rates.",
      how:
        "Type your subject line and preview text. The tool shows both against realistic desktop and mobile character limits and highlights the cutoff point.",
    },
    ur: {
      what: "یہ ٹول آپ کی سبجیکٹ لائن اور پیش منظر متن کا لائیو ڈیسک ٹاپ اور موبائل پیش منظر دکھاتا ہے۔",
      problem:
        "موبائل ان باکس ڈیسک ٹاپ سے کم حروف دکھاتے ہیں — مکمل نظر آنے والی لائن موبائل پر کٹ سکتی ہے۔",
      how:
        "اپنی سبجیکٹ لائن اور پیش منظر متن ٹائپ کریں۔ ٹول دونوں کی حد دکھاتا ہے۔",
    },
  },
  "image-alt-text-sanitizer": {
    en: {
      what: "Converts a product or image title into an SEO-friendly filename slug and a descriptive alt-text tag.",
      problem:
        "Filenames like IMG_00234.jpg and empty alt attributes tell Google Images nothing about what's in the picture, so the image never surfaces in image search results.",
      how:
        "Enter the product or image title. The tool generates a clean, hyphenated filename and a natural-language alt-text suggestion.",
    },
    ur: {
      what: "یہ ٹول پروڈکٹ یا تصویر کے عنوان کو SEO کے مطابق فائل نام اور تفصیلی alt-text میں تبدیل کرتا ہے۔",
      problem:
        "IMG_00234.jpg جیسے نام اور خالی alt Google Images کو کچھ نہیں بتاتے۔",
      how:
        "پروڈکٹ یا تصویر کا عنوان درج کریں۔ ٹول صاف فائل نام اور alt-text تجویز کرتا ہے۔",
    },
  },
  "bio-link-utm-stacker": {
    en: {
      what: "Assembles a list of destination links — each automatically tagged with UTM parameters — ready to paste into a Linktree-style bio-link page.",
      problem:
        "Traffic from a social bio link usually shows up in analytics as one undifferentiated blob, so you can't tell which specific link in your bio people actually clicked.",
      how:
        "Add each destination link with a label, plus a shared source/medium for the bio page. The tool stacks a UTM-tagged link for every entry.",
    },
    ur: {
      what: "یہ ٹول ہر منزل لنک کو UTM پیرامیٹرز کے ساتھ خودکار طور پر ٹیگ کر کے فہرست بناتا ہے۔",
      problem:
        "سوشل بائیو لنک سے آنے والا ٹریفک عام طور پر ایک ہی بلاب کے طور پر نظر آتا ہے۔",
      how:
        "ہر منزل لنک لیبل کے ساتھ شامل کریں، اور بائیو صفحے کے لیے مشترکہ سورس/میڈیم درج کریں۔",
    },
  },
  "landing-page-generator": {
    en: {
      what: "Generates a fast, responsive, single-file HTML landing page with a headline, subheadline, and email opt-in form.",
      problem:
        "Building even a simple lead-capture page usually means opening a website builder or hiring a developer for something that's really just a headline, a form, and a button.",
      how:
        "Fill in your headline, subheadline, and call-to-action text. The tool generates a complete, downloadable HTML file you can host anywhere.",
    },
    ur: {
      what: "یہ ٹول ایک تیز، ریسپانسو، سنگل فائل HTML لینڈنگ پیج بناتا ہے جس میں عنوان، ذیلی عنوان اور ای میل فارم شامل ہے۔",
      problem:
        "ایک سادہ لیڈ کیپچر پیج بنانے کے لیے بھی عام طور پر ویب سائٹ بلڈر یا ڈویلپر کی ضرورت پڑتی ہے۔",
      how:
        "اپنا عنوان، ذیلی عنوان اور CTA متن درج کریں۔ ٹول مکمل ڈاؤن لوڈ ایبل HTML فائل بناتا ہے۔",
    },
  },
  "ltv-churn-forecaster": {
    en: {
      what: "Projects customer lifetime value and future revenue based on average revenue per customer and monthly churn rate.",
      problem:
        "Subscription and e-commerce businesses often track new signups closely but have no clear number for what a customer is actually worth over their full relationship with the business.",
      how:
        "Enter average monthly revenue per customer and your monthly churn rate. The tool calculates average customer lifespan and total lifetime value.",
    },
    ur: {
      what: "یہ ٹول اوسط ماہانہ آمدنی اور چرن ریٹ کی بنیاد پر کسٹمر لائف ٹائم ویلیو کا اندازہ لگاتا ہے۔",
      problem:
        "کاروبار اکثر نئے سائن اپس پر توجہ دیتے ہیں مگر کسٹمر کی اصل قدر کا واضح نمبر نہیں رکھتے۔",
      how:
        "فی کسٹمر اوسط ماہانہ آمدنی اور ماہانہ چرن ریٹ درج کریں۔",
    },
  },
  "unsubscribe-link-generator": {
    en: {
      what: "Generates a compliant unsubscribe footer block (HTML and plain text) including your business address and unsubscribe link.",
      problem:
        "Anti-spam laws (CAN-SPAM, CASL, and similar) require every marketing email to include a working unsubscribe link and your physical business address — missing either can get a sending domain blacklisted or fined.",
      how:
        "Enter your brand name, unsubscribe URL, and mailing address. The tool generates a ready-to-paste footer block for your email templates.",
    },
    ur: {
      what: "یہ ٹول ایک مطابقت پذیر ان سبسکرائب فوٹر بلاک بناتا ہے جس میں کاروباری پتہ اور ان سبسکرائب لنک شامل ہے۔",
      problem:
        "اینٹی اسپام قوانین ہر مارکیٹنگ ای میل میں ان سبسکرائب لنک اور پتہ لازمی قرار دیتے ہیں۔",
      how:
        "اپنا برانڈ نام، ان سبسکرائب URL اور میلنگ پتہ درج کریں۔",
    },
  },

  // ---- Phase 3 batch — tools backed by the live Worker API ----
  "spf-dmarc-checker": {
    en: {
      what: "Runs a live DNS lookup on your domain's SPF, DMARC, and (optionally) DKIM records and scores your email authentication setup out of 100.",
      problem:
        "Missing or misconfigured SPF/DKIM/DMARC records are the single biggest reason legitimate business email lands in spam, and they're also what lets attackers spoof your domain in phishing emails.",
      how:
        "Enter your sending domain and press Check. If you know your DKIM selector (check your email provider's setup docs — common ones are \"google\" or \"selector1\"), enter it too for a complete score.",
    },
    ur: {
      what: "یہ ٹول آپ کے ڈومین کے SPF، DMARC اور (اختیاری) DKIM ریکارڈز کا لائیو DNS چیک کرتا ہے اور 100 میں سے اسکور دیتا ہے۔",
      problem:
        "غائب یا غلط SPF/DKIM/DMARC ریکارڈز اصل کاروباری ای میل کے اسپام میں جانے کی سب سے بڑی وجہ ہیں۔",
      how:
        "اپنا بھیجنے والا ڈومین درج کریں اور Check دبائیں۔ اگر آپ کا DKIM سلیکٹر معلوم ہو تو وہ بھی درج کریں۔",
    },
  },
  "sitemap-health-checker": {
    en: {
      what: "Fetches a sitemap.xml URL, lists every page it contains, and live-checks the HTTP status of a sample of those pages.",
      problem:
        "A sitemap pointing to 404s, redirects, or server errors confuses search engine crawlers and can quietly suppress indexing of otherwise-healthy pages.",
      how:
        "Enter the full URL to your sitemap.xml and press Check. The tool reports total URL count and the live status of a sample of pages (checking every page is skipped past 30 to stay within free-tier limits).",
    },
    ur: {
      what: "یہ ٹول sitemap.xml URL حاصل کرتا ہے، اس میں موجود ہر صفحہ درج کرتا ہے، اور نمونے کے صفحات کی HTTP حالت چیک کرتا ہے۔",
      problem:
        "404 یا سرور ایررز کی طرف اشارہ کرنے والا sitemap سرچ انجن کرالرز کو الجھا دیتا ہے۔",
      how:
        "اپنے sitemap.xml کا مکمل URL درج کریں اور Check دبائیں۔",
    },
  },
  "security-headers-inspector": {
    en: {
      what: "Fetches a live URL and grades its HTTP security headers (HSTS, CSP, X-Frame-Options, and others) on an A+ to F scale.",
      problem:
        "Security headers instruct browsers to enforce protections like blocking clickjacking or forcing HTTPS — if they're missing, the browser has no way to know to apply them, even if your server otherwise handles security well.",
      how:
        "Enter the full URL including https:// and press Check. The tool shows which headers are present, which are missing, and an overall letter grade.",
    },
    ur: {
      what: "یہ ٹول ایک لائیو URL حاصل کرتا ہے اور اس کے HTTP سیکیورٹی ہیڈرز کو A+ سے F تک درجہ دیتا ہے۔",
      problem:
        "سیکیورٹی ہیڈرز براؤزر کو کلک جیکنگ روکنے یا HTTPS نافذ کرنے کی ہدایت دیتے ہیں — غائب ہونے پر براؤزر کو معلوم نہیں ہوتا۔",
      how:
        "مکمل URL بشمول https:// درج کریں اور Check دبائیں۔",
    },
  },
  "canonicalization-checker": {
    en: {
      what: "Checks all four common variants of your domain (http/https × with/without www) and reports whether they all redirect to one canonical URL.",
      problem:
        "If http://example.com, https://example.com, http://www.example.com, and https://www.example.com are all independently reachable without redirecting to one version, search engines see four separate copies of your site and split ranking signals between them.",
      how:
        "Enter your domain (without http:// or www) and press Check. The tool fetches all four variants and confirms whether they consolidate into a single canonical URL.",
    },
    ur: {
      what: "یہ ٹول آپ کے ڈومین کی چاروں عام شکلوں کو چیک کرتا ہے اور بتاتا ہے کہ آیا وہ سب ایک canonical URL پر جاتی ہیں۔",
      problem:
        "اگر چاروں شکلیں الگ الگ قابل رسائی ہوں تو سرچ انجن سائٹ کی چار الگ کاپیاں سمجھتے ہیں۔",
      how:
        "اپنا ڈومین (بغیر http:// یا www) درج کریں اور Check دبائیں۔",
    },
  },
  "bulk-url-status-auditor": {
    en: {
      what: "Checks the live HTTP status code for up to 100 URLs at once, in a single batch.",
      problem:
        "After a site migration or big content cleanup, dozens of old links can quietly break at once — checking each one manually doesn't scale.",
      how:
        "Paste up to 100 URLs, one per line, and press Check. Each gets its live status code, final destination (after redirects), and an ok/broken flag.",
    },
    ur: {
      what: "یہ ٹول ایک ساتھ 100 تک URLs کی لائیو HTTP حالت چیک کرتا ہے۔",
      problem:
        "سائٹ منتقلی کے بعد درجنوں پرانے لنکس خاموشی سے ٹوٹ سکتے ہیں۔",
      how:
        "ایک لائن میں ایک URL کے ساتھ 100 تک URLs پیسٹ کریں اور Check دبائیں۔",
    },
  },
  "robots-txt-checker": {
    en: {
      what: "Fetches a site's robots.txt and reports exactly which major crawlers (Googlebot, Bingbot, GPTBot, and others) are blocked from which paths.",
      problem:
        "A single misplaced Disallow: / rule in robots.txt can silently block search engines from crawling an entire site, and it's easy to miss in a quick manual read.",
      how:
        "Enter your site's URL and press Check. The tool shows the raw robots.txt plus a per-crawler blocked/allowed breakdown.",
    },
    ur: {
      what: "یہ ٹول سائٹ کا robots.txt حاصل کرتا ہے اور بتاتا ہے کہ کون سے بڑے کرالرز کن راستوں سے روکے گئے ہیں۔",
      problem:
        "robots.txt میں ایک غلط Disallow: / اصول پوری سائٹ کو سرچ انجنز سے چھپا سکتا ہے۔",
      how:
        "اپنی سائٹ کا URL درج کریں اور Check دبائیں۔",
    },
  },
  "dkim-selector-validator": {
    en: {
      what: "Looks up a specific DKIM selector for your domain and validates the record's syntax (version tag and public key presence).",
      problem:
        "DKIM records live at a selector-specific DNS location, and a small syntax error — a missing v=DKIM1 tag or an empty public key — silently breaks signing without any obvious symptom besides emails failing DKIM checks.",
      how:
        "Enter your domain and the DKIM selector you want to check (found in your email provider's DKIM setup instructions). The tool fetches and validates the record.",
    },
    ur: {
      what: "یہ ٹول آپ کے ڈومین کے لیے مخصوص DKIM سلیکٹر تلاش کرتا ہے اور ریکارڈ کی ساخت کی توثیق کرتا ہے۔",
      problem:
        "DKIM ریکارڈز میں چھوٹی سی نحوی غلطی خاموشی سے دستخط کو توڑ دیتی ہے۔",
      how:
        "اپنا ڈومین اور DKIM سلیکٹر درج کریں۔",
    },
  },
  "mixed-content-inspector": {
    en: {
      what: "Scans an HTTPS page's HTML for resources (images, scripts, stylesheets) still loaded over plain HTTP.",
      problem:
        "A single HTTP image or script on an otherwise-HTTPS page triggers the \"mixed content\" warning in browsers and can get the resource silently blocked, breaking page functionality or design.",
      how:
        "Enter the page's https:// URL and press Check. The tool lists every insecure (http://) resource reference it finds in the page's HTML.",
    },
    ur: {
      what: "یہ ٹول HTTPS صفحے کے HTML کو اسکین کر کے وہ وسائل تلاش کرتا ہے جو ابھی بھی HTTP پر لوڈ ہو رہے ہیں۔",
      problem:
        "ایک HTTP تصویر یا اسکرپٹ بھی براؤزر میں \"mixed content\" وارننگ کا سبب بنتی ہے۔",
      how:
        "صفحے کا https:// URL درج کریں اور Check دبائیں۔",
    },
  },
  "redirect-chain-detector": {
    en: {
      what: "Traces a URL's full redirect path, hop by hop, and detects redirect loops.",
      problem:
        "Every extra redirect hop adds latency and dilutes SEO value passed between pages, and a genuine loop shows visitors the dreaded \"too many redirects\" browser error.",
      how:
        "Enter a URL and press Trace. The tool follows redirects one at a time (up to 15 hops) and shows the full chain, flagging any loop it detects.",
    },
    ur: {
      what: "یہ ٹول ایک URL کا مکمل ری ڈائریکٹ راستہ ٹریس کرتا ہے اور لوپس کا پتہ لگاتا ہے۔",
      problem:
        "ہر اضافی ری ڈائریکٹ تاخیر بڑھاتا ہے، اور ایک حقیقی لوپ \"too many redirects\" خرابی دکھاتا ہے۔",
      how:
        "ایک URL درج کریں اور Trace دبائیں۔",
    },
  },
  "dns-health-diagnostic": {
    en: {
      what: "Runs a live DNS lookup on your domain's A, CNAME, MX, and TXT records and gives a plain-language health summary.",
      problem:
        "When a website or email stops working, non-technical business owners have no way to tell whether it's a DNS problem, and if so, which record is the culprit.",
      how:
        "Enter your domain and press Check. The tool shows every record type found and a green/red summary of whether your website and mail are correctly configured to resolve.",
    },
    ur: {
      what: "یہ ٹول آپ کے ڈومین کے A، CNAME، MX اور TXT ریکارڈز کا لائیو DNS چیک کرتا ہے اور سادہ زبان میں خلاصہ دیتا ہے۔",
      problem:
        "جب ویب سائٹ یا ای میل کام کرنا بند کر دے، غیر تکنیکی کاروباری مالکان کو معلوم نہیں ہوتا کہ مسئلہ DNS میں ہے یا نہیں۔",
      how:
        "اپنا ڈومین درج کریں اور Check دبائیں۔",
    },
  },
  "header-security-grade-calculator": {
    en: {
      what: "Fetches a live URL's response headers and produces a formal A+ to F security grade report, the same style used in enterprise security audits.",
      problem:
        "Security audits and vendor questionnaires increasingly ask for a specific security header grade, and manually checking each header against best practice is slow and easy to get wrong.",
      how:
        "Enter the full URL including https:// and press Check. The tool returns your grade, score breakdown, and the exact header values found.",
    },
    ur: {
      what: "یہ ٹول ایک لائیو URL کے جواب ہیڈرز حاصل کرتا ہے اور A+ سے F تک باضابطہ سیکیورٹی گریڈ رپورٹ بناتا ہے۔",
      problem:
        "سیکیورٹی آڈٹس اکثر مخصوص ہیڈر گریڈ مانگتے ہیں، اور ہاتھ سے چیک کرنا سست اور غلطیوں کا شکار ہوتا ہے۔",
      how:
        "مکمل URL بشمول https:// درج کریں اور Check دبائیں۔",
    },
  },
  "http-status-code-inspector": {
    en: {
      what: "Explains any HTTP status code in plain language, either from a code you type in or by live-checking a URL.",
      problem:
        "Errors like 502, 504, or 403 mean nothing to a non-technical team member trying to understand why a site or integration broke, which slows down getting the right person to fix it.",
      how:
        "Either type a status code directly, or enter a live URL and the tool will check it and explain whatever status it gets back.",
    },
    ur: {
      what: "یہ ٹول کسی بھی HTTP حالت کوڈ کی سادہ زبان میں وضاحت کرتا ہے، یا تو براہ راست کوڈ سے یا لائیو URL چیک کر کے۔",
      problem:
        "502، 504 یا 403 جیسی خرابیاں غیر تکنیکی ٹیم ممبر کے لیے بے معنی ہوتی ہیں۔",
      how:
        "یا تو براہ راست حالت کوڈ ٹائپ کریں، یا ایک لائیو URL درج کریں۔",
    },
  },

  // ---- Phase 4 batch — final tools, live network + PDF work ----
  "website-speed-inspector": {
    en: {
      what: "Fetches your page live, times how long the HTML takes to load, and sizes up every image, script, and stylesheet it references.",
      problem: "A slow page directly costs conversions and ad budget, but without a breakdown of what's actually heavy, it's guesswork trying to fix it.",
      how: "Enter your page URL and press Check. The tool lists every asset it found, sorted by size, so you can see exactly what to compress or lazy-load first.",
    },
    ur: {
      what: "یہ ٹول آپ کا صفحہ لائیو حاصل کرتا ہے، HTML لوڈ ہونے کا وقت ناپتا ہے، اور ہر تصویر، اسکرپٹ اور اسٹائل شیٹ کا سائز نکالتا ہے۔",
      problem: "سست صفحہ براہ راست تبدیلیوں اور اشتہار بجٹ کا نقصان کرتا ہے، مگر تفصیل کے بغیر ٹھیک کرنا اندازے پر ہوتا ہے۔",
      how: "اپنے صفحے کا URL درج کریں اور Check دبائیں۔",
    },
  },
  "broken-link-checker": {
    en: {
      what: "Crawls a page, extracts every link, and live-checks each one's HTTP status to find broken (404/5xx) links.",
      problem: "Broken links hurt SEO rankings and frustrate visitors, and they accumulate silently as content gets moved or deleted over time.",
      how: "Enter the page URL and press Check. Every link found (up to the first 50) gets checked live and flagged if broken.",
    },
    ur: {
      what: "یہ ٹول ایک صفحے کو کرال کرتا ہے، ہر لنک نکالتا ہے، اور ٹوٹے ہوئے (404/5xx) لنکس تلاش کرنے کے لیے ہر ایک کی حالت لائیو چیک کرتا ہے۔",
      problem: "ٹوٹے لنکس SEO رینکنگ کو نقصان پہنچاتے ہیں اور وقت کے ساتھ خاموشی سے جمع ہوتے رہتے ہیں۔",
      how: "صفحے کا URL درج کریں اور Check دبائیں۔",
    },
  },
  "dns-propagation-tracker": {
    en: {
      what: "Checks your domain's resolved IP address against three independent public DNS resolvers (Cloudflare, Google, Quad9) to gauge propagation status.",
      problem: "After a DNS change, it's unclear whether the new value has propagated everywhere yet, and different networks can see different (old vs. new) results during the transition window.",
      how: "Enter your domain and press Check. If all three resolvers agree, propagation is effectively complete; if they differ, you're still mid-propagation.",
    },
    ur: {
      what: "یہ ٹول آپ کے ڈومین کے حل شدہ IP ایڈریس کو تین آزاد عوامی DNS ریزولورز کے خلاف چیک کرتا ہے۔",
      problem: "DNS تبدیلی کے بعد یہ واضح نہیں ہوتا کہ نئی قدر ہر جگہ پھیل چکی ہے یا نہیں۔",
      how: "اپنا ڈومین درج کریں اور Check دبائیں۔",
    },
  },
  "ssl-expiry-checker": {
    en: {
      what: "Looks up your domain's most recent SSL/TLS certificate in public Certificate Transparency logs and reports its expiry date.",
      problem: "An expired certificate triggers a full-page \"Not Secure\" browser warning that stops nearly all visitors in their tracks, and it's easy to lose track of renewal dates across many domains.",
      how: "Enter your domain and press Check. The tool reports the certificate's expiry date, days remaining, and issuer.",
    },
    ur: {
      what: "یہ ٹول عوامی Certificate Transparency لاگز میں آپ کے ڈومین کا تازہ ترین SSL/TLS سرٹیفکیٹ تلاش کرتا ہے اور اس کی میعاد ختم ہونے کی تاریخ بتاتا ہے۔",
      problem: "ختم شدہ سرٹیفکیٹ ایک مکمل \"Not Secure\" وارننگ دکھاتا ہے جو تقریباً تمام زائرین کو روک دیتا ہے۔",
      how: "اپنا ڈومین درج کریں اور Check دبائیں۔",
    },
  },
  "smtp-port-checker": {
    en: {
      what: "Attempts a live TCP connection to a mail server's SMTP ports (25, 587, 465) and reads back the server's greeting banner.",
      problem: "Many networks and hosting providers block outbound SMTP ports by default, which silently breaks transactional and outbound email with no clear error message pointing to the cause.",
      how: "Enter your mail server's hostname and press Check. An open port with a banner response confirms that port is reachable from the outside.",
    },
    ur: {
      what: "یہ ٹول میل سرور کے SMTP پورٹس (25, 587, 465) پر لائیو TCP کنکشن کی کوشش کرتا ہے اور سرور کا جواب پڑھتا ہے۔",
      problem: "بہت سے نیٹ ورکس آؤٹ باؤنڈ SMTP پورٹس بند کر دیتے ہیں، جو خاموشی سے ای میل کو توڑ دیتا ہے۔",
      how: "اپنے میل سرور کا ہوسٹ نام درج کریں اور Check دبائیں۔",
    },
  },
  "ip-geolocation-risk": {
    en: {
      what: "Looks up an IP address's location, ISP, and organization, and flags whether it belongs to a datacenter/hosting provider or known proxy service.",
      problem: "Datacenter and proxy/VPN traffic is disproportionately responsible for fake ad clicks, fraudulent signups, and credential-stuffing attempts — spotting it early helps filter it out.",
      how: "Enter an IPv4 address and press Check. The tool returns location, network ownership, and a basic risk score based on hosting/proxy flags.",
    },
    ur: {
      what: "یہ ٹول IP ایڈریس کا مقام، ISP اور ادارہ تلاش کرتا ہے، اور بتاتا ہے کہ آیا یہ ڈیٹا سینٹر یا پراکسی سروس سے تعلق رکھتا ہے۔",
      problem: "ڈیٹا سینٹر اور پراکسی/VPN ٹریفک جعلی اشتہار کلکس اور دھوکہ دہی کی بڑی وجہ ہے۔",
      how: "ایک IPv4 ایڈریس درج کریں اور Check دبائیں۔",
    },
  },
  "api-rate-limit-tester": {
    en: {
      what: "Sends a controlled burst of requests to a URL and reports whether it starts responding with 429 (rate limited) or shows other throttling signals.",
      problem: "An API or endpoint without rate limiting is vulnerable to abuse and accidental overload; confirming rate limiting works as expected is hard to do without actually testing it.",
      how: "Enter the URL and how many requests to send (up to 20), then press Test. Only test URLs you own or have explicit permission to load-test.",
    },
    ur: {
      what: "یہ ٹول ایک URL پر کنٹرول شدہ درخواستوں کا ہجوم بھیجتا ہے اور بتاتا ہے کہ آیا یہ 429 (ریٹ محدود) سے جواب دینا شروع کرتا ہے۔",
      problem: "ریٹ لمٹ کے بغیر API غلط استعمال کا شکار ہو سکتا ہے۔",
      how: "URL اور درخواستوں کی تعداد درج کریں، پھر Test دبائیں۔ صرف اپنی یا اجازت شدہ سائٹس پر استعمال کریں۔",
    },
  },
  "cors-policy-auditor": {
    en: {
      what: "Sends a request with a test Origin header and inspects the response's Access-Control-Allow-Origin and -Credentials headers.",
      problem: "A misconfigured CORS policy — especially a wildcard origin combined with credentials allowed — can let any website on the internet make authenticated requests to your API on a victim's behalf.",
      how: "Enter the API/URL to test and press Check. The tool reports what CORS policy it detected and flags the risky wildcard-plus-credentials combination specifically.",
    },
    ur: {
      what: "یہ ٹول ٹیسٹ Origin ہیڈر کے ساتھ درخواست بھیجتا ہے اور جواب کے CORS ہیڈرز کا معائنہ کرتا ہے۔",
      problem: "غلط CORS پالیسی کسی بھی ویب سائٹ کو آپ کے API پر مستند درخواستیں بھیجنے کی اجازت دے سکتی ہے۔",
      how: "ٹیسٹ کرنے کے لیے API/URL درج کریں اور Check دبائیں۔",
    },
  },
  "tech-stack-leakage-inspector": {
    en: {
      what: "Fetches a page's response headers and HTML for identifying details — server software, framework versions, generator tags — that can help attackers target known vulnerabilities.",
      problem: "A response header revealing an outdated server or framework version tells attackers exactly which known exploits to try first.",
      how: "Enter the URL and press Check. The tool lists every identifying header and meta tag it found, with an overall exposure level.",
    },
    ur: {
      what: "یہ ٹول صفحے کے ہیڈرز اور HTML میں شناختی تفصیلات تلاش کرتا ہے جو حملہ آوروں کی مدد کر سکتی ہیں۔",
      problem: "پرانا سرور ورژن ظاہر کرنے والا ہیڈر حملہ آوروں کو معلوم کمزوریوں کی طرف اشارہ کرتا ہے۔",
      how: "URL درج کریں اور Check دبائیں۔",
    },
  },
  "webhook-retry-simulator": {
    en: {
      what: "Sends real test POST requests to your webhook endpoint in a retry sequence with increasing delays, recording how it responds each time.",
      problem: "If your server briefly goes down, you need to know whether it correctly recovers and processes retried webhook deliveries once it's back — this is hard to verify without triggering an actual retry sequence.",
      how: "Enter your webhook URL and press Test. The tool sends up to 3 attempts with increasing delay (stopping early on the first success) and reports each attempt's result.",
    },
    ur: {
      what: "یہ ٹول آپ کے ویب ہک اینڈ پوائنٹ پر بڑھتی تاخیر کے ساتھ حقیقی ٹیسٹ POST درخواستیں بھیجتا ہے۔",
      problem: "اگر سرور مختصر وقت کے لیے بند ہو جائے، تو یہ جاننا ضروری ہے کہ واپس آنے پر یہ صحیح طور پر بحال ہوتا ہے۔",
      how: "اپنا ویب ہک URL درج کریں اور Test دبائیں۔",
    },
  },
  "competitor-keyword-gap-analyzer": {
    en: {
      what: "Compares your page's title, meta description, and headings against a competitor's page to surface keywords they're targeting that you aren't.",
      problem: "Not knowing why a competitor outranks you for a query usually comes down to not knowing what specific terms their on-page content emphasizes that yours doesn't.",
      how: "Enter your page URL and a competitor's page URL, then press Analyze. The tool extracts each page's SEO signals and lists words the competitor uses that yours doesn't.",
    },
    ur: {
      what: "یہ ٹول آپ کے صفحے کے عنوان، میٹا تفصیل اور سرخیوں کا موازنہ حریف کے صفحے سے کرتا ہے۔",
      problem: "حریف کے بہتر رینک کرنے کی وجہ عام طور پر یہ ہوتی ہے کہ ان کے مواد میں کون سی اصطلاحات نمایاں ہیں جو آپ کے مواد میں نہیں۔",
      how: "اپنا صفحہ URL اور حریف کا صفحہ URL درج کریں، پھر Analyze دبائیں۔",
    },
  },
  "import-duty-invoice-estimator": {
    en: {
      what: "Converts an amount using a live exchange rate, then applies duty and VAT percentages to produce a full invoice breakdown.",
      problem: "Cross-border invoicing involves stacking currency conversion, import duty, and VAT/tax on top of each other in the right order — getting the sequence wrong produces a subtly incorrect total.",
      how: "Enter the amount, source and destination currency, and your duty/VAT percentages. The tool fetches a live exchange rate and shows the full breakdown.",
    },
    ur: {
      what: "یہ ٹول لائیو ایکسچینج ریٹ استعمال کر کے رقم تبدیل کرتا ہے، پھر ڈیوٹی اور VAT فیصد لگا کر مکمل انوائس تفصیل بناتا ہے۔",
      problem: "بین الاقوامی انوائسنگ میں کرنسی تبدیلی، درآمدی ڈیوٹی اور VAT کو صحیح ترتیب میں لگانا ضروری ہے۔",
      how: "رقم، ماخذ اور منزل کرنسی، اور اپنی ڈیوٹی/VAT فیصد درج کریں۔",
    },
  },
  "compression-tester": {
    en: {
      what: "Checks whether a page is being served with Gzip or Brotli compression and estimates the bandwidth savings compared to serving it uncompressed.",
      problem: "A site without server-side compression enabled sends far more bytes over the wire than necessary on every single request, directly slowing load times, especially on mobile connections.",
      how: "Enter the page URL and press Check. The tool reports the active compression encoding (if any) and the byte-size difference versus an uncompressed response.",
    },
    ur: {
      what: "یہ ٹول چیک کرتا ہے کہ آیا صفحہ Gzip یا Brotli کمپریشن کے ساتھ فراہم کیا جا رہا ہے۔",
      problem: "سرور کمپریشن کے بغیر سائٹ ہر درخواست پر ضرورت سے کہیں زیادہ ڈیٹا بھیجتی ہے۔",
      how: "صفحے کا URL درج کریں اور Check دبائیں۔",
    },
  },
  "pdf-metadata-sanitizer": {
    en: {
      what: "Strips hidden metadata (author, creation software, edit history, custom properties) from a PDF file and gives you back a cleaned copy.",
      problem: "PDFs quietly carry metadata from the software that created them — author names, company names, sometimes even file paths from the original computer — which can leak confidential information when shared externally.",
      how: "Upload a PDF. The tool clears its metadata fields entirely in your browser and gives you a cleaned file to download — the file is never uploaded anywhere.",
    },
    ur: {
      what: "یہ ٹول PDF فائل سے پوشیدہ میٹا ڈیٹا (مصنف، تخلیقی سافٹ ویئر، ترمیمی تاریخ) ہٹا کر صاف کاپی دیتا ہے۔",
      problem: "PDFs خاموشی سے تخلیق کرنے والے سافٹ ویئر کا میٹا ڈیٹا لے جاتی ہیں، جو خفیہ معلومات لیک کر سکتا ہے۔",
      how: "ایک PDF اپ لوڈ کریں۔ ٹول براؤزر میں ہی میٹا ڈیٹا صاف کرتا ہے اور ڈاؤن لوڈ کے لیے صاف فائل دیتا ہے — فائل کہیں اپ لوڈ نہیں ہوتی۔",
    },
  },
};

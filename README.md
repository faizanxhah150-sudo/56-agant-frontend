# UtilityStack — Frontend (Website / Dashboard)

Ye aapki **poori website** hai — dashboard + 56 tools ka UI. Isse
deploy karne ka tareeqa neeche hai, **mobile se, bina computer/CLI
ke**, sirf GitHub aur Vercel (ya Cloudflare Pages) ki website use
karke.

⚠️ **Pehle backend deploy karo** (`utilitystack-backend.zip` wali
README follow karke) — us se milne wala Worker URL isme chahiye
hoga. Agar abhi tak backend deploy nahi kiya, pehle wo kar lo.

---

## STEP 1 — GitHub par naya repository banao

1. **github.com** par login karo
2. **"+"** icon → **"New repository"**
3. Naam do, jaise: `utilitystack-frontend`
4. **Public** ya **Private**, phir **"Create repository"**

## STEP 2 — Is zip ki files GitHub par upload karo

1. Is zip (`utilitystack-frontend.zip`) ko phone mein **extract**
   karo
2. Nayi repository ke page par **"Add file"** → **"Upload files"**
3. Saari extracted files/folders (`src`, `public`, `package.json`,
   `index.html`, waghera) select karke upload karo — folder structure
   waisa hi rakhna
4. **"Commit changes"** par tap karo

⚠️ **Zaroori:** `src` folder poora upload hona chahiye (uske andar
`tools`, `pages`, `components`, `data`, `lib` sab sub-folders hain) —
agar upload karte waqt structure bigड़े to har sub-folder khud bana kar
sahi jagah files daal dena.

---

## STEP 3 — Vercel par deploy karo (aasan tareeqa)

1. **vercel.com** par jao, **"Sign Up"** → **"Continue with GitHub"**
   se apna GitHub account connect karo
2. Login hone ke baad, **"Add New..."** → **"Project"** par tap karo
3. Apni `utilitystack-frontend` repository dhoondo aur **"Import"**
   par tap karo
4. Vercel khud pehchan lega ki ye **Vite** project hai — build
   settings automatically sahi honge, kuch change karne ki zaroorat
   nahi
5. **Yahan ruk jao — deploy se pehle ye zaroori step karo:**
   - "Environment Variables" section kholo (import screen par hi
     dikhta hai, ya **"Environment Variables"** collapsed section par
     tap karo)
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** apna backend wala Worker URL paste karo (jaise
     `https://utilitystack-backend.your-subdomain.workers.dev`) —
     **URL ke aakhir mein slash (/) mat lagana**
   - **"Add"** par tap karo
6. Ab **"Deploy"** button dabao
7. 1-2 minute mein deploy ho jayega, ek live URL milega jaisa:
   ```
   https://utilitystack-frontend.vercel.app
   ```

---

## Ya STEP 3 (alternative) — Cloudflare Pages par deploy karo

Agar Vercel ki jagah Cloudflare Pages use karna chaho (backend bhi
Cloudflare par hai to sab ek jagah rahega):

1. Cloudflare dashboard → **"Workers & Pages"** → **"Create"** →
   **"Pages"** tab
2. **"Connect to Git"** → apni `utilitystack-frontend` repository
   select karo
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **"Environment variables"** section mein add karo:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** apna backend Worker URL
5. **"Save and Deploy"** par tap karo
6. Live URL milega jaisa `https://utilitystack-frontend.pages.dev`

---

## STEP 4 — Test karo

Apna live URL (Vercel ya Cloudflare Pages wala) mobile browser mein
kholo. Dashboard dikhega, 56 tools ki list. Koi backend-wala tool
try karo (jaise "SPF/DKIM/DMARC Checker" mein `google.com` daal kar
Check dabao) — agar result aaye to sab connect ho gaya. ✅

**Ab ye link kisi ko bhi bhej sakte ho — koi bhi user is website par
jaake bina sign-up ke sab 56 tools free use kar sakta hai.**

---

## Agar baad mein Worker URL badalna ho

Vercel ya Cloudflare Pages dashboard mein apne project ki
**Settings → Environment Variables** mein jaake `VITE_API_BASE_URL`
ki value change kar do, phir project ko **"Redeploy"** kar do — code
mein kuch edit karne ki zaroorat nahi.

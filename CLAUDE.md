# Claude Code Námskeið — Leiðbeiningar fyrir Claude

> Þetta er interaktíft námskeið í Claude Code, byggt í React með Anthropic API.
> Markmiðið er að kenna íslenskumælandi þróunaraðilum að nota Claude Code á skilvirkan hátt.

## Verkefnisyfirlit

**Tegund:** React SPA (Single Page Application)
**Markhópur:** Íslenskir þróunaraðilar sem eru að byrja með eða vilja dýpka þekkingu á Claude Code
**Sérstæðleiki:** ADHD-vinsamlegt hönnun, learn-by-doing með raunverulegan AI kennara (Anthropic API), XP gamification
**Framtíðarmarkmið:** SaaS vara sem hægt er að selja

---

## Tæknileg uppbygging

### Stack
- **Framework:** React 18 með hooks (useState, useRef, useEffect)
- **Build tool:** Vite 6
- **Stíll:** Tailwind CSS v4 (`@tailwindcss/vite`) fyrir base, inline `<style>` template literal í `App.jsx` fyrir dynamic palette/theme styles
- **Letur:** Space Grotesk (body), VT323 (accents/counters), JetBrains Mono (code) frá Google Fonts
- **API:** Anthropic Messages API (`claude-sonnet-4-20250514`) gegnum Vite proxy
- **Geymsla:** localStorage fyrir XP, framvindu, streak, class, tweaks
- **Þjónustuveri:** Vite dev server með proxy fyrir API (API lykill aldrei í vafra)

### Skráauppbygging
```
claude-code-namskeid/
├── index.html              # Vite entry + Google Fonts
├── package.json
├── vite.config.js          # Vite + Tailwind + /api/messages proxy
├── .env.example            # Sniðmát (notandi býr til .env)
├── .gitignore
├── CLAUDE.md               # Þessi skrá
├── README.md               # Uppsetningarleiðbeiningar
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # Aðalapp — router + screens + inline styles
    ├── index.css           # Tailwind + base fonts
    ├── data/
    │   ├── modules.js      # Importar m1-m12, exportar MODULES + TOTAL_*
    │   ├── modules/        # 12 módúl, eitt á skrá (m1.js ... m12.js)
    │   └── classes.js      # CLASSES — 4 pixel-art persónugerðir með buffs
    ├── lib/
    │   ├── theme.js        # getPalette({dark, warmth}) — 6 paletta
    │   └── api.js          # callAnthropic + system prompts
    └── components/
        └── Icons.jsx       # I (SVG iconset) + moduleIcons + PixelChar
```

### Námsskrá (12 módúl, ~60 lessons)

| ID | Titill | Lessons | Mín | Hlutverk |
|----|--------|---------|-----|----------|
| m1 | Tölvugrunnur | 4 | 14 | Tölvur, stýrikerfi, skrár |
| m2 | Terminal og skipanir | 5 | 19 | ls, cd, grep, find |
| m3 | Git — versions stjórnun | 5 | 24 | init, commit, branch, GitHub |
| m4 | AI og Claude | 4 | 14 | LLM, Claude family |
| m5 | Að keyra Claude Code | 6 | 28 | Uppsetning, permission modes |
| m6 | Slash Commands | 6 | 26 | /clear, /init, /context, /model |
| m7 | Skills — Eigin skipanir | 5 | 25 | Frontmatter, description, global vs project |
| m8 | CLAUDE.md djúpt | 5 | 22 | Hvar, hvað, @ mentions |
| m9 | Plan Mode | 4 | 18 | Shift+Tab, lesa plan |
| m10 | Hooks og sjálfvirkni | 5 | 25 | PreToolUse, PostToolUse, Stop |
| m11 | MCP — Ytri verkfæri | 5 | 26 | GitHub MCP, Playwright |
| m12 | Pro workflows | 5 | 30 | Subagents, deploy, testing |

### Útlit — "Arcade Soft" hönnun
ADHD-vinsamleg gamification: pixel-art persónugerðir með buffs, soft sunset palette, combo bursts, og Tweaks panel (Intensity/Motion/Warmth).

**Persónugerðir (`src/data/classes.js`):**
- **Galdrakarl (mage)** — +50% XP fyrir Plan Mode (m9-* eða titill inniheldur "plan mode")
- **Skipanavaldur (hacker)** — +20% XP fyrir Skills módúl (m7-*)
- **Hraðamaður (speed)** — +1 streak shield á viku
- **Kanninn (explorer)** — AI svör gefa +5 XP bónus

Buff hooks eru í `markDone()` og `askAI()` í `App.jsx`.

**Skjáir (5 tabs):**
1. **Heim** — Hero (næsta lexía) + Class card + Streak + Stage select grid
2. **Áfangar** — Course cards með lesson rows
3. **Lestur** — Virk lexía (read type) með renderLessonContent
4. **Verkefni** — Virk áskorun (challenge type) sem "Boss fight" + AI partner
5. **CLAUDE.md** — Generator (sömu virkni og áður, endurstílað)

**Litaheppni — 6 paletta:** `getPalette({dark, warmth})` í `lib/theme.js` skilar einum af 6 (light/dark × cool/neutral/warm). Stillingar geymdar í `localStorage.cc_tweaks`.

---

## Gagnaskipulag

### `MODULES` array — meginuppbygging námsins
```js
{
  id: "m1",          // Einstakt ID, aldrei breyta eftir að nemendur byrja
  title: "...",      // Íslenskt nafn á module
  icon: "⚡",        // Emoji fyrir sidebar
  color: "#E8F4FD",  // Ljós bakgrunnslitur (module card)
  accent: "#2563EB", // Áherslulitur (active state, borders)
  lessons: [...]     // Array af lessons (sjá hér að neðan)
}
```

### `lesson` hlutur
```js
{
  id: "m1-l1",       // Format: moduleId-lX, ALDREI breyta
  title: "...",      // Íslenskt titill
  type: "read" | "challenge",  // read = lestrarfræðsla, challenge = verkefni
  xp: 10,            // XP sem nemandi fær við lokun (read: 10-20, challenge: 30-60)
  content: `...`,    // Markdown-líkt efni (sjá Markdown reglur hér að neðan)
  challenge: null | { // null ef type === "read"
    prompt: "...",   // Texti sem fyller textarea þegar nemandi smellir á challenge
    hint: "...",     // Gulur hint kassi
    template: "..." | null  // Sniðmát sem hægt er að sýna/fela
  }
}
```

---

## Content reglur

### Markdown í `content` streng
Við notum einfalt custom renderer (í `renderContent` fallinu). Studdar setningargerðir:

| Setning | Birting |
|---------|---------|
| `# Titill` | `<h2>` — stór fyrirsögn |
| `## Undirtitill` | `<h3>` — minni fyrirsögn |
| `**feitletrað**` | `<strong>` — feitletrað |
| `> Athugasemd` | Blár info kassi með border-left |
| `- listi` eða `✅ listi` eða `❌ listi` | Listi þáttur |
| ` ```kóði``` ` | Kóðablock (dark bakgrunnur) — renderer hoppar yfir ``` línur |
| Tóm lína | 8px gap |
| Allt annað | `<p>` með inline `**bold**` stuðningi |

**Mikilvægt:** Renderer er einlægur — ekki nota flókin Markdown. Ef þú þarft meira: bættu við render logic í `renderContent` fallið.

### Íslenska — stíll og hugtök

**Almennt:**
- **Allt efni á íslensku** — titlar, leiðbeiningar, villuboð, XP celebration
- **System prompt** í API köllum er á íslensku með stílleiðbeiningum
- Markmiðið er gæði á við [Icelandic Language Technology Programme](https://github.com/icelandic-lt/icelandic-lt) — engar Google-Translate-villur

**Orðskrá — hvenær á að þýða og hvenær á að halda ensku:**

| Hugtak | Stíll | Athugasemd |
|--------|-------|------------|
| hook, skill, agent, commit, MCP, PR, branch, diff | enska | Dev-jargon, óstefnt í íslensku |
| terminal | enska | Mest notað hugtak hjá íslenskum forriturum |
| secrets, manager | enska | Tæknileg dev-jargon |
| **session(s)** | **lota / lotur** | Beygist (kvk.): lota, lotu, lotu, lotu; ft. lotur, lotur, lotum, lota |
| **directory** | **mappa** | Algengt og vel skilið íslenskt orð |

**Algengar villur sem ber að forðast:**

| Villa | Rétt | Skýring |
|-------|------|---------|
| `Sé að spyrja...` | `Er að spyrja...` | "sé" er viðtengingarháttur |
| `venjuleg spjallforrit` (et.) | `venjulegt spjallforrit` | "forrit" er hvorugkyn |
| `Hugsuðu þér` | `Hugsaðu þér` | Boðháttur af _hugsa_ |
| `kynna fyrir verkefnið` | `kynna fyrir verkefninu` | Þágufall eftir _fyrir_ |
| `context drekknar` | `context drukknar` | Sögnin er _drukkna_, ekki _drekkna_ |
| `Claude er farinn að gleymast` | `Claude er farinn að gleyma` | Active, ekki passive |

**Áður en nýtt efni er bætt við:**
- Lestu yfir í gegnum textann eins og íslenskur prófarkalesari
- Athugaðu kyn, fall og tölu á öllum fallorðum
- Spurðu: er hér anglikismi sem á sér góða íslenska þýðingu?

---

## Skipanir

### Keyra verkefnið
```bash
npm install
cp .env.example .env   # bæta inn ANTHROPIC_API_KEY
npm run dev            # http://localhost:5173
```

### Build
```bash
npm run build      # → dist/
npm run preview    # Skoða byggt
```

---

## API notkun

### Anthropic API kall — staðlað snið
Frá vafranum köllum við **relative URL** (`/api/messages`). Vite proxy bætir við `x-api-key` og `anthropic-version` headers úr `.env`. API lykillinn fer aldrei til vafrans.

```js
const resp = await fetch("/api/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "claude-sonnet-4-20250514",  // ALLTAF þetta model
    max_tokens: 1000,
    system: `[Íslenskur system prompt]`,
    messages: [{ role: "user", content: userInput }],
  }),
});
if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
const data = await resp.json();
const text = data.content?.find(b => b.type === "text")?.text || "";
```

Hjálparfall `callAnthropic({ system, userContent })` í `src/App.jsx` sér um þetta.

### API villur
- **Alltaf** wrap-a í try/catch og athuga `resp.ok`
- Birta notendavæg villuboð á íslensku
- Sérstakt villuboð fyrir 401 / vantar API lykil
- Ekki sýna tæknilegar villuskilaboð beint

---

## UX og hönnunarreglur

### ADHD-vinsamleg hönnun (MIKILVÆGT)
Þetta er kjarni hönnunarheimspeki verkefnisins:

1. **Stutt einingar** — engin lesson lengri en ~5 mínútur af lestri
2. **Tafarlaus endurgjöf** — XP animation, celebration við lokun
3. **Sjáanlegt framfarir** — XP bar í header, teljari í sidebar
4. **Skýr staðsetning** — notandi veit alltaf hvar hann er (module + lesson highlighted)
5. **Ekki of margt í einu** — einn module opinn í einu í sidebar
6. **Gott aðskilnaður** — hvítt card, grár bakgrunnur, skýrar línur á milli svæða

### Litatafla (fylgja þessum)
```
Bakgrunnur app:      #F8F9FA  (mjög ljós grár)
Header:              #0F172A  (djúpur navy)
Hvítt card:          #FFFFFF
Textinn:             #111111  (nánast svartur)
Aukatexti:           #374151
Greint texti:        #64748B
Aðskilnaðarlínur:    #E2E8F0

Module litir (accent):
  Module 1 (Grunnur):      #2563EB (blár)
  Module 2 (Skills):       #16A34A (grænn)
  Module 3 (Context):      #EA580C (appelsínugulur)
  Module 4 (Hooks):        #9333EA (fjólublár)
  Module 5 (Multi-agent):  #DC2626 (rauður)
```

### Takkar
```js
// Staðlað btn style fall:
btn: (color) => ({
  background: color || "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "10px 20px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: 14,
})
// Litir eftir aðgerð:
// Aðalaðgerð:     #2563EB (blár)
// Staðfesting:    #16A34A (grænn)
// Hlutlæg:        #6B7280 (grár)
// Hætta/eyða:     #DC2626 (rauður)
```

---

## Geymsla (localStorage)

```js
// Lyklar sem eru notaðir:
"cc_completed"  // JSON object: { "m1-l1": true, "m1-l2": true, ... }
"cc_xp"         // Number sem strengur: "150"
"cc_class"      // String: "mage" | "hacker" | "speed" | "explorer"
"cc_tweaks"     // JSON: { dark, intensity, motion, warmth }
"cc_streak"     // JSON: { count, lastDay }

// ALDREI geyma:
// - Persónulegar upplýsingar
// - API lykla
// - Stórar gagnaskrár
```

**Mikilvægt:** Alltaf wrap-a localStorage í try/catch — getur misheppnast í private browsing.

---

## Þegar þú bætir við efni

### Bæta við lesson í núverandi module
1. Opnaðu `src/data/modules/mX.js` fyrir viðkomandi módúl
2. Bættu nýjum `lesson` hlut við `lessons` array
3. Gefðu einstakt `id` á forminu `mX-lY`
4. Veldu `type: "read"` eða `type: "challenge"`
5. Settu hæfilegt `xp`: read=10-20, challenge=30-60 eftir erfiðleika
6. Uppfærðu `minutes` í module header ef þörf

### Bæta við nýjum module
1. Búðu til nýja skrá `src/data/modules/mN.js`
2. Veldu nýjan `accent` lit (sem er ekki þegar notaður)
3. Importaðu og bættu við í `src/data/modules.js`:
   ```js
   import { mN } from "./modules/mN.js";
   export const MODULES = [..., mN];
   ```
4. Bættu icon mapping við í `src/components/Icons.jsx`:
   ```js
   export const moduleIcons = { ..., mN: "iconName" };
   ```
5. Sidebar og navigation eru **sjálfkrafa uppfærð** — ekkert annað þarf að breyta

### Bæta við nýjum view (flipi)
1. Bæta nýrri `view` gildi við state (`useState("course")`)
2. Bæta nýjum takka í nav bar
3. Bæta við conditional render í meginhluta

---

## Þegar við förum í SaaS (framtíðarskref)

### Þegar við brjótum upp skrána
```
src/
├── data/
│   └── modules.ts        # MODULES array — aðskilin
├── components/
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── LessonView.tsx
│   ├── ChallengeBox.tsx
│   └── ClaudeMdGenerator.tsx
├── hooks/
│   ├── useProgress.ts    # XP og completed logic
│   └── useAI.ts          # Anthropic API kall
├── types/
│   └── index.ts          # Module, Lesson, Challenge interfaces
└── App.tsx
```

### Hvað þarf í SaaS útgáfu
- [ ] Notendaauðkenning (t.d. Clerk eða Supabase Auth)
- [ ] Gagnagrunnstenging (XP/framvinda geymt á server, ekki localStorage)
- [ ] Greiðsluferli (Stripe)
- [ ] Admin viðmót til að bæta við efni án kóðabreytinga
- [ ] Analytics (hvaða lessons eru erfiðastar)
- [ ] Email notifications ("þú ert 1 lesson frá lokun module 3!")

---

## Villur og algengar lausnir

| Villa | Ástæða | Lausn |
|-------|--------|-------|
| `content?.find is not a function` | API skilaði villu | Athuga `data.error` og sýna notanda |
| XP endurstillir sig | localStorage misheppnast | try/catch í geymsluföllin |
| Lesson ID conflict | Tvö lessons með sama ID | ID eru alltaf einstök: mX-lY |
| Sidebar sýnir ranga lesson | activeLesson state gamall | `setActiveLesson(0)` þegar module breytist |
| `renderContent` sýnir ``` | Renderer þekkir ekki kóðablokkir | Renderer hoppar yfir ``` línur — kóðinn er eftir þær |

---

## Gæðastaðlar

Áður en þú leggur til breytingar — athugaðu:

- [ ] Íslenska nákvæm (ekki Google Translate quality)
- [ ] Nýtt lesson passar í 3-5 mínútur af lestri
- [ ] Challenge hefur bæði `hint` og `template` (eða skýra ástæðu fyrir hvort)
- [ ] XP er hóflegt: ekki meir en 60 XP fyrir eitt verkefni
- [ ] Engar harðkóðaðar hæðar eða breiddir sem brjóta layout á minni skjám
- [ ] API villur eru meðhöndlaðar
- [ ] Nýtt innihald prófað í artifact viewer

---

## Heimildir og frekari lesning

Þetta námskeið er byggt á:
- [Anthropic Claude Code Docs](https://code.claude.com/docs/en/best-practices)
- [Writing a good CLAUDE.md — HumanLayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [Anatomy of the .claude folder — Avi Chawla](https://blog.dailydoseofds.com/p/anatomy-of-the-claude-folder)
- [Claude Code Power User Guide — DEV Community](https://dev.to/numbpill3d/the-complete-claude-code-power-user-guide-slash-commands-hooks-skills-more-6ep)
- [Best Claude Code Courses 2026 — Scrimba](https://scrimba.com/articles/best-claude-code-tutorials-and-courses-in-2026/)

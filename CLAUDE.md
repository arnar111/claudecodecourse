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
- **Framework:** React 18 með hooks (useState, useRef)
- **Build tool:** Vite 6
- **Stíll:** Tailwind CSS v4 (`@tailwindcss/vite`) — responsive desktop/mobile
- **API:** Anthropic Messages API (`claude-sonnet-4-20250514`) gegnum Vite proxy
- **Geymsla:** localStorage fyrir XP og framvindu
- **Þjónustuveri:** Vite dev server með proxy fyrir API (API lykill aldrei í vafra)

### Skráauppbygging
```
claude-code-namskeid/
├── index.html              # Vite entry
├── package.json
├── vite.config.js          # Vite + Tailwind + /api/messages proxy
├── .env.example            # Sniðmát (notandi býr til .env)
├── .gitignore
├── CLAUDE.md               # Þessi skrá
├── README.md               # Uppsetningarleiðbeiningar
└── src/
    ├── main.jsx            # React entry
    ├── App.jsx             # Aðalapp (allt í einni skrá enn sem komið er)
    └── index.css           # Tailwind + animations
```

### Einlægni (Single File Approach)
Á þessum stigi er **öll React-rökrétta í `src/App.jsx`**. Þetta er meðvitað val:
- Fær grunninn til að virka áður en við brjótum upp
- Þegar við förum í SaaS (Phase 2+): brjóta upp í components/, hooks/, data/

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

### Íslenska
- **Allt efni á íslensku** — titlar, leiðbeiningar, villuboð, XP celebration
- Tæknileg orð (hooks, skills, agents, commit) eru á ensku eins og þau eru
- System prompt í API köllum er á íslensku

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

// ALDREI geyma:
// - Persónulegar upplýsingar
// - API lykla
// - Stórar gagnaskrár
```

**Mikilvægt:** Alltaf wrap-a localStorage í try/catch — getur misheppnast í private browsing.

---

## Þegar þú bætir við efni

### Bæta við lesson í núverandi module
1. Bæta nýjum `lesson` hlut við `lessons` array í réttum module
2. Gefðu einstakt `id` á forminu `mX-lY`
3. Veldu `type: "read"` eða `type: "challenge"`
4. Settu hæfilegt `xp`: read=10-20, challenge=30-60 eftir erfiðleika

### Bæta við nýjum module
1. Bæta nýjum hlut við `MODULES` array
2. Veldu nýjan `accent` lit (sem er ekki þegar notaður)
3. Sidebar og navigation eru **sjálfkrafa uppfærð** — ekkert annað þarf að breyta

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

export const m8 = {
  id: "m8",
  title: "CLAUDE.md djúpt",
  short: "CLAUDE.md",
  minutes: 22,
  accent: "#65A30D",
  lessons: [
    {
      id: "m8-l1",
      title: "Af hverju CLAUDE.md?",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Vandamálið: Claude gleymir öllu

Eftir hverja lotu — \`/exit\` eða lokaður gluggi — Claude man **ekkert**. Næst þegar þú keyrir \`claude\` byrjar hann frá núlli.

Ef þú vinnur að sama verkefninu daglega, þú þarft að segja honum:
- Hvaða stack verkefnið notar
- Hvaða skipanir á að keyra
- Hvaða code style þú vilt
- Hvar lykilskrár eru
- Sérstök varúðarmál

Aftur. Og aftur. Og aftur.

# Lausnin: CLAUDE.md

CLAUDE.md er **fyrsta skráin sem Claude les** í hverri lotu. Sem þýðir: það sem þú skrifar þar **man hann alltaf**.

> 🎯 Hugsaðu þér CLAUDE.md sem **kynningu á nýjum samstarfsmanni**. Á fyrsta degi, hvað myndir þú segja honum?

# Tilvik þar sem CLAUDE.md sparar tíma

❌ **Án CLAUDE.md:**
"Hæ, þetta er React verkefni með TypeScript. Tests eru keyrðar með jest. Við erum með strict mode. Aldrei nota any. Stíll er Tailwind, ekki CSS modules. Build skipun er npm run dev. ..."

✅ **Með CLAUDE.md:**
"Lestu @CLAUDE.md og byrjaðu."

# Mikilvægasta reglan

**CLAUDE.md er ráðgjöf, ekki lög.**

Claude getur stundum hunsað eitthvað í CLAUDE.md, sérstaklega ef það er of langt eða óspecífic.

Til að gera reglur sem **alltaf** virka, notar þú **hooks** (sjá m10).`,
      challenge: null,
    },
    {
      id: "m8-l2",
      title: "Hvar á að setja CLAUDE.md?",
      type: "read",
      xp: 10,
      mins: 3,
      content: `# Þrjár staðsetningar

## 1. \`./CLAUDE.md\` (project-local)

Mest notaðir. Settu í rót verkefnisins.

\`\`\`
mitt-verkefni/
├── CLAUDE.md         ← hér
├── package.json
└── src/
\`\`\`

**Notist fyrir:**
- Stack verkefnisins (React, TS, ...)
- Build/test/lint skipanir
- Code style reglur
- Sérstök varnaðarorð

**Setja í Git:** Já. Allir í liðinu njóta hennar.

## 2. \`~/.claude/CLAUDE.md\` (global)

Gildir fyrir **öll** verkefni á þinni tölvu.

\`\`\`
~/.claude/CLAUDE.md
\`\`\`

**Notist fyrir:**
- Þínar persónulegu venjur ("ég vil alltaf íslensk commit messages")
- Þínar fyrirhuguðu skipanir
- Almenn code style preferences

**Setja í Git:** Ekki — þetta er bara þín tölva.

## 3. \`./CLAUDE.local.md\` (persónulegt í verkefni)

Persónulegar viðbætur sem þú vilt fyrir þetta verkefni en EKKI í Git.

\`\`\`
mitt-verkefni/
├── CLAUDE.md           ← í Git, allir í liðinu
├── CLAUDE.local.md     ← bara þú, í .gitignore
└── ...
\`\`\`

**Notist fyrir:**
- "Ég er Arnar, ég kýs íslensku"
- "Ég er að vinna með designerinn Helga núna, sjá Slack frá honum"
- API lyklar (þó betra að setja í .env)

# Forgangsröðun

Þegar lota byrjar les Claude öll þrjú:

1. Global (\`~/.claude/CLAUDE.md\`)
2. Project (\`./CLAUDE.md\`)
3. Local (\`./CLAUDE.local.md\`)

Allt blandað saman. Project hefur forgang yfir global ef árekstur.

> 💡 Bættu \`CLAUDE.local.md\` við \`.gitignore\` ef þú stofnar hana.`,
      challenge: null,
    },
    {
      id: "m8-l3",
      title: "Hvað á að innihalda?",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# Sniðmát fyrir góða CLAUDE.md

\`\`\`markdown
# Nafn verkefnis

## Yfirlit
Ein lína sem útskýrir hvað verkefnið gerir.

## Tæknileg uppbygging
- Framework: React 18 + TypeScript
- Build tool: Vite 6
- Stíll: Tailwind CSS v4
- Tests: Vitest

## Skipanir
- npm run dev — keyra dev server (port 5173)
- npm test — keyra tests
- npm run build — production build
- npm run lint — checkout ESLint

## Skráauppbygging
\\\`\\\`\\\`
src/
├── components/  # React components
├── lib/         # Utilities
├── hooks/       # React hooks
└── data/        # Static data
\\\`\\\`\\\`

## Reglur
- ALDREI commit-a \\\`.env\\\` skrár
- Bara named exports, engin default
- Allt íslenskt UI er á íslensku, engin í enska
- Engin "any" í TypeScript

## Tilkynningar
- API lykill er í .env (\\\`VITE_API_KEY\\\`)
- Tests verða að virka áður en commit fer
\`\`\`

# 5 reglur fyrir góða CLAUDE.md

## 1. Stutt — undir 200 línur

Eftir 200 línur byrjar Claude að gleyma byrjuninni.

## 2. Specifíkt, ekki almennt

❌ "Skrifaðu góðan kóða"
✅ "Bara named exports, ekki default"

## 3. Hvers vegna, ekki bara hvað

❌ "Notaðu enskt nafn"
✅ "Notaðu enskt nafn á components — auðveldara fyrir nýja í liðinu"

## 4. Reglulega uppfært

Þegar verkefnið breytist — uppfærðu CLAUDE.md.

## 5. Ekki of margt í einu

CLAUDE.md á að vera **leiðarvísir**, ekki bók.

> 🎯 Þú getur líka kallað á annan skjöl með \`@\`. Bæði CLAUDE.md og þá. T.d. "Lestu @CLAUDE.md og @docs/api.md".`,
      challenge: null,
    },
    {
      id: "m8-l4",
      title: "@ mentions",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Benda á skrár án að nefna allt

\`@\` er stuttur leið til að segja Claude: "skoðaðu þetta."

## Notkun

\`\`\`
> Lestu @src/components/Login.jsx og útskýrðu validation logikkina
\`\`\`

Claude veit nákvæmlega hvaða skrá á að skoða. Engin giska.

## Hvað þú getur @-nefnt

\`\`\`
@src/App.jsx              # ein skrá
@src/                     # heil mappa
@README.md                # rótar skrá
@.claude/skills/commit/   # nestaður mappa
@https://docs.example.com # vefsíða (Claude sækir innihaldið)
\`\`\`

# @ í CLAUDE.md

Þú getur sett @ tilvísanir í CLAUDE.md fyrir auka samhengi:

\`\`\`markdown
## Skráauppbygging
See @src/types/index.ts for type definitions
See @docs/architecture.md for system overview
\`\`\`

Nú þegar Claude les CLAUDE.md, hann veit að hann ætti **líka** að skoða þessar skrár.

# Hvenær á að nota @

✅ Þegar þú vilt **vissa** að Claude skoði eitthvað tiltekið
✅ Þegar margir skráir gætu passað ("Button.jsx" gæti verið í mörgum stöðum)
✅ Þegar þú vilt ekki að Claude noti grep eða leit
✅ Þegar þú vísar á docs á netinu

# Sparnaður

@ skráir eru **lazy-loaded** — Claude les þær bara þegar hann þarf. Þú getur haft margar @ vísanir í CLAUDE.md án að fylla context.

> 💡 \`@src/\` er sniðug leið til að segja "skoðaðu allt í src-möppunni ef þú þarft" án að lesa allar skrár strax.`,
      challenge: null,
    },
    {
      id: "m8-l5",
      title: "Smíðaðu þína CLAUDE.md",
      type: "challenge",
      xp: 40,
      mins: 6,
      content: `Núna ertu með nóg af þekkingu til að smíða CLAUDE.md fyrir alvöru.

**Verkefni:** Búðu til CLAUDE.md fyrir eitt af verkefnum þínum.

Mundu: undir 200 línur, specifíkt, hvers vegna ekki bara hvað.

Þú getur líka notað **CLAUDE.md Smiður** sem er í þessu námskeiði (CLAUDE.md tab) til að fá fyrstu drög.`,
      challenge: {
        prompt: `Ég er að smíða CLAUDE.md fyrir verkefnið mitt. Hér eru upplýsingarnar:

Verkefni: [skrifaðu nafn]
Tæknileg uppbygging:
- [t.d. React 18 + TypeScript + Vite]
- [t.d. Tailwind CSS]
- [t.d. PostgreSQL + Prisma]

Build/test skipanir:
- [t.d. npm run dev]
- [t.d. npm test]

Sérstakar reglur:
- [t.d. engin secrets í Git]
- [t.d. íslensk commit messages]

Smíðaðu fullkomið CLAUDE.md fyrir þetta verkefni. Fylgdu bestu venjum:
- Undir 200 línur
- Skýrar reglur (hvað ekki, í stað "vertu góður")
- Útskýrðu hvers vegna fyrir mikilvægustu reglur
- Ekki bæta við falsa fyrirspurnir eða framtíðar plön`,
        hint: "Þú getur líka notað CLAUDE.md Smið flipann hér í námskeiðinu sem útgangspunkt og aðlagað eftir hans.",
        template: null,
      },
    },
  ],
};

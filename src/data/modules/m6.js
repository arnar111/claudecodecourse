export const m6 = {
  id: "m6",
  title: "Slash Commands",
  short: "Skipanir",
  minutes: 26,
  accent: "#DB2777",
  lessons: [
    {
      id: "m6-l1",
      title: "/clear og /compact",
      type: "read",
      xp: 15,
      mins: 3,
      content: `# Tvær mikilvægustu skipanirnar

Claude Code geymir samtalið þitt í **context window** — minninu sem hann hefur við hendina. Eftir nokkra tíma af samtali fyllist hann.

# /clear — byrja upp á nýtt

Hreinsar allt. Eins og að loka og opna nýja lotu.

\`\`\`
> /clear
Context cleared. Starting fresh.
\`\`\`

**Notist:** Þegar þú skiptir um verkefni eða Claude er farinn að gleyma fyrstu leiðbeiningum.

# /compact — þjappa saman

Skemmtilegur cousin af \`/clear\`. Þjappar samtalið saman í samandregningu — heldur **lykilatriðum** en losar sig við ítarlegt blaður.

\`\`\`
> /compact
Conversation compacted. Context preserved.
\`\`\`

**Notist:** Þegar þú hefur unnið lengi en vilt halda samhenginu.

# Hvenær á að nota hvert

| Aðstaða | Skipun |
|---------|--------|
| Skipta um verkefni | \`/clear\` |
| Sömu samtal en orðið of langt | \`/compact\` |
| Claude er farinn að endurtaka sig | \`/clear\` |
| Náð gildum punkti, vill halda áfram | \`/compact\` |

> 🎯 **Pro tip:** Ef þú ert óviss, skoðaðu \`/context\` (næsta lesson). Ef context er yfir ~50% af hámarki, líklega kominn tími á \`/compact\` eða \`/clear\`.`,
      challenge: null,
    },
    {
      id: "m6-l2",
      title: "/init — sjálfvirkur CLAUDE.md",
      type: "read",
      xp: 15,
      mins: 3,
      content: `# Bestu byrjunin á nýtt verkefni

\`/init\` er fyrsta skipunin sem þú átt að keyra þegar þú byrjar Claude í nýju verkefni.

\`\`\`
> /init
\`\`\`

Claude:
1. Les yfir allar skrár í verkefninu
2. Skoðar package.json, README, dependencies
3. Smíðar **fyrstu drög að CLAUDE.md** fyrir þig

# Dæmi um output

\`\`\`markdown
# Mitt React verkefni

## Stack
- React 18 með TypeScript
- Vite sem build tool
- Tailwind CSS

## Skipanir
- npm run dev — keyra dev server
- npm test — keyra tests
- npm run build — byggja production

## Skráauppbygging
- src/components/ — React components
- src/lib/ — utilities
\`\`\`

# Eftir /init

✅ **Lestu yfir** það sem Claude skrifaði
✅ **Bættu við þinni þekkingu** — t.d. sérstök hagsmunamál, code style
✅ **Vistaðu í commit** svo þú missir ekki

# Hvenær á EKKI að keyra /init

❌ Á verkefni sem þegar hefur CLAUDE.md — hún yfirskrifast
❌ Mjög stór codebase (>100k línur) — Claude getur drukknað

> 🎯 \`/init\` er ekki "klikkaðu og gleymdu". Það er **byrjunarpunktur** sem þú aðlagar.`,
      challenge: null,
    },
    {
      id: "m6-l3",
      title: "/context — sjá minnið",
      type: "read",
      xp: 10,
      mins: 3,
      content: `# Hvað er í minninu núna?

\`/context\` sýnir þér hversu mikið af context window-inu þú ert að nota.

\`\`\`
> /context
Context: 12,400 / 200,000 tokens (6%)
\`\`\`

# Hvað eru tokens?

**Token** er ~3-4 stafir af texta (eða 1 orð á ensku). Stuttar skipanir eins og \`ls\` er 1 token. Lengri setning er 10-20 tokens.

Claude Sonnet 4 hefur ~**200,000 token context window**. Það er fullt af bókum.

# Þegar context fyllist

Þegar þú nálgast 80%+:

⚠️ Claude byrjar að **gleyma byrjuninni**
⚠️ Hann **endurtekur sig** meira
⚠️ Hann **hunsar** CLAUDE.md

# Lausnir

1. \`/compact\` — þjappa
2. \`/clear\` — byrja upp á nýtt
3. \`/branch\` — fara í nýja samhliða lotu (sjá l5)

# Pro venja

\`\`\`
> /context
Context: 156,000 / 200,000 tokens (78%)

> /compact
Conversation compacted. Context preserved.

> /context
Context: 24,000 / 200,000 tokens (12%)
\`\`\`

> 💡 Þú getur líka beðið Claude: "Hver er staðan á context?". Hann svarar á íslensku.`,
      challenge: null,
    },
    {
      id: "m6-l4",
      title: "/model — skipta um Claude",
      type: "read",
      xp: 15,
      mins: 3,
      content: `# Hvenær á að skipta?

Claude Code lætur þig nota mismunandi módel fyrir mismunandi verkefni.

\`\`\`
> /model
Current: claude-sonnet-4
Available:
  - claude-haiku-4 (fastur, ódýr)
  - claude-sonnet-4 (núverandi)
  - claude-opus-4 (greindur, hægur)

> /model opus
Switched to claude-opus-4.
\`\`\`

# Praktísk regla

**Haiku** fyrir:
- Quick lookups ("hvað gerir þessi function?")
- Endurtekin minni háttar verkefni
- Þegar þú vilt spara peninga

**Sonnet** fyrir:
- Almennt forritunarstarf
- Að lesa kóða og útskýra
- Að breyta einstökum skrám

**Opus** fyrir:
- Plan Mode (sjá m9)
- Stór refactorings
- Arkitektur ákvarðanir
- Þegar þú þarft besta möguleika

# Kostnaður

Stærri model = dýrari (per token).

| Model | Hraði | Kostnaður |
|-------|-------|-----------|
| Haiku | ⚡⚡⚡ | $ |
| Sonnet | ⚡⚡ | $$$ |
| Opus | ⚡ | $$$$$ |

> 🎯 **Algeng venja:** Notaðu Opus til að gera **plan**, svo skipta yfir í Sonnet til að framkvæma. Þú færð besta planið án að borga Opus-verð fyrir alla skoðunina.`,
      challenge: null,
    },
    {
      id: "m6-l5",
      title: "/doctor og /branch",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# /doctor — greinir vandamál

Claude Code skoðar uppsetninguna þína og finnur algeng vandamál:

\`\`\`
> /doctor
Checking Claude Code setup...
✅ Node.js v22.4.1
✅ Logged in as arnar@example.com
⚠️  Too many MCP servers loaded (47) — slows context
✅ CLAUDE.md found
❌ ANTHROPIC_API_KEY not set
\`\`\`

**Notist:** Þegar eitthvað virkar ekki en þú veist ekki af hverju.

# /branch — samhliða lota

Ímyndaðu þér að þú sért í miðju verkefni og fáir aðra hugmynd. Þú vilt prófa nýja nálgun **án** að missa það sem þú varst að gera.

\`\`\`
> /branch
Created new branch session. Original conversation paused.
\`\`\`

Nú getur þú farið allt aðra leið. Þegar þú ert búin/n:

\`\`\`
> /exit
\`\`\`

Og þú ert komin/n aftur í upprunalegu lotuna.

# Aðrar gagnlegar skipanir

| Skipun | Hvað gerir |
|--------|------------|
| \`/exit\` | Lokar samtali |
| \`/hooks\` | Setur upp hooks (sjá m10) |
| \`/skills\` | Sýnir tilbúnar skills (sjá m7) |
| \`/mcp\` | Stjórnar MCP servers (sjá m11) |
| \`/help\` | Listar allar skipanir |
| \`/review\` | Code review á breytingar |

# /review — kóða-yfirferð

\`\`\`
> /review
\`\`\`

Claude fer yfir nýjustu breytingar (eftir síðasta commit) og bendir á:
- Mögulegar villur
- Style vandamál
- Security áhættur
- Hvort tests vantar

> 🎯 Frábært að keyra áður en þú pushar á GitHub.`,
      challenge: null,
    },
    {
      id: "m6-l6",
      title: "Notaðu /review í alvöru",
      type: "challenge",
      xp: 40,
      mins: 7,
      content: `Slash commands eru bara gagnlegar þegar þú notar þær á alvöru.

**Verkefni:** Breyttu einhverri skrá í verkefni þínu, og notaðu \`/review\` til að fá Claude til að fara yfir breytingarnar.`,
      challenge: {
        prompt: `Hjálpaðu mér að setja þetta upp:

1. Búðu til eða finndu verkefni með Git repo
2. Breyttu einhverri skrá — t.d. bættu við villu vísvitandi (t.d. typo, gleyma semicolon, console.log sem á ekki að vera)
3. Keyrðu \`git diff\` til að sjá breytinguna
4. Keyrðu Claude með \`claude\`
5. Notaðu \`/review\` skipun
6. Sjáðu hvað Claude bendir á

Sýndu mér nákvæmlega hverju á að bæta við og hvers er að vænta af /review niðurstöðu.`,
        hint: "Þú getur líka bara sagt 'farðu yfir nýjustu breytingarnar mínar' — Claude skilur það sem /review.",
        template: null,
      },
    },
  ],
};

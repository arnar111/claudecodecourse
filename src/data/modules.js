export const MODULES = [
  {
    id: "m1",
    title: "Grunnur",
    short: "Grunnur",
    minutes: 18,
    accent: "#2563EB",
    lessons: [
      {
        id: "m1-l1",
        title: "Hvað er Claude Code?",
        type: "read",
        xp: 10,
        mins: 4,
        content: `Claude Code er AI verkfæri sem lifir í terminal-inum þínum. Þetta er **ekki** venjulegt spjallforrit — þetta er agent sem getur:

- Lesið og breytt skrám
- Keyrt bash skipanir
- Skoðað codebase þinn
- Unnið með Git
- Kallað á MCP servers (ytri þjónustur)

Hugsaðu þér það eins og að hafa mjög hæfan forritara sem situr við hliðina á þér, sér allt sem þú sérð, og getur gert hlutina sjálfur.

**Hvernig er þetta öðruvísi en claude.ai?**
claude.ai er spjall. Claude Code er **agent** — hann getur tekið aðgerðir, ekki bara svarað spurningum.`,
        challenge: null,
      },
      {
        id: "m1-l2",
        title: "CLAUDE.md — Minni Claudes",
        type: "read",
        xp: 15,
        mins: 5,
        content: `CLAUDE.md er eins og að kynna Claude fyrir verkefninu þínu í upphafi hverrar lotu.

**Mikilvægasta reglan:** Claude man ekkert á milli lota. Þetta skjal er það eina sem heldur samhenginu.

**Hvar má setja CLAUDE.md:**
- \`~/.claude/CLAUDE.md\` — gildir fyrir öll verkefni
- \`./CLAUDE.md\` — gildir fyrir þetta verkefni
- \`./CLAUDE.local.md\` — persónulegar stillingar (gitignore)

**Hvað á að setja í CLAUDE.md:**
✅ Build/test/lint skipanir
✅ Code style reglur
✅ Sérstök viðvörun ("ALDREI commita secrets")
✅ Stack (TypeScript strict, React 18, osv.)
✅ Skráauppbygging

❌ Hlutir sem eiga bara við einstaka verkefni
❌ Of langt — **hámark ~200 línur**

> 💡 Ef CLAUDE.md er of langt byrjar Claude að hunsa reglurnar!`,
        challenge: null,
      },
      {
        id: "m1-l3",
        title: "Búðu til þitt fyrsta CLAUDE.md",
        type: "challenge",
        xp: 30,
        mins: 9,
        content: `Tími til að smíða! Hér er verkefnið:

Búðu til \`CLAUDE.md\` fyrir eitt af verkefnum þínum (Lendó eða Eign væri fullkomið).

**Uppbygging sem virkar:**`,
        challenge: {
          prompt: `Ég er að smíða CLAUDE.md fyrir verkefni mitt. Hér eru upplýsingarnar:

Verkefni: [skrifaðu nafn verkefnis]
Stack: [t.d. React, TypeScript, Firebase]
Build skipun: [t.d. npm run dev]
Test skipun: [t.d. npm test]
Sérstæðar reglur: [t.d. nota alltaf Icelandic comments]

Búðu til CLAUDE.md fyrir mig sem fylgir bestu venjum — stuttt, skýrt, undir 200 línum.`,
          hint: "Prófaðu: /init í terminal til að fá grunninn sjálfkrafa, svo aðlagaðu",
          template: `# [Nafn verkefnis]

## Skipanir
- Build: npm run build
- Dev: npm run dev
- Test: npm test
- Lint: npm run lint

## Stack
- TypeScript strict mode
- React 18
- [bættu við]

## Reglur
- ALDREI commita .env skrár
- Nota named exports, ekki default
- [bættu við]

## Skráauppbygging
src/
  components/  # React components
  lib/         # Utilities
  types/       # TypeScript types`,
        },
      },
    ],
  },
  {
    id: "m2",
    title: "Slash Commands & Skills",
    short: "Skills",
    minutes: 22,
    accent: "#16A34A",
    lessons: [
      {
        id: "m2-l1",
        title: "Innbyggðar skipanir",
        type: "read",
        xp: 10,
        mins: 5,
        content: `Claude Code kemur með 60+ innbyggðar skipanir. Þær mikilvægustu:

**Lotustjórnun:**
- \`/clear\` — hreinsar samtal (mikilvægt! context drukknar)
- \`/compact\` — þjappar saman löngu samtali
- \`/context\` — sér hversu mikið context er notað

**Greining:**
- \`/init\` — býr til CLAUDE.md sjálfkrafa
- \`/doctor\` — greinir vandamál (of margar skills, osf.)
- \`/model\` — skiptir um model (Opus fyrir planning, Sonnet fyrir kóða)

**Vinnu flow:**
- \`/branch\` — greinir samtal í nýja lotu (fyrr: /fork)
- \`/hooks\` — setur upp hooks með viðmóti
- \`/review\` — kóðayfirlestur

**💡 ADHD tip:** \`/compact\` þegar þú finnur að Claude er farinn að gleyma og endurtaka sig.`,
        challenge: null,
      },
      {
        id: "m2-l2",
        title: "Skills — Custom skipanir",
        type: "read",
        xp: 15,
        mins: 6,
        content: `Skills eru þínar eigin skipanir. Þú skrifar þær í Markdown og Claude les þær.

**Hvar eru þær:**
\`.claude/skills/nafn-skills/SKILL.md\` — fyrir þetta verkefni
\`~/.claude/skills/nafn-skills/SKILL.md\` — fyrir öll verkefni

**Dæmi — commit helper:**
\`\`\`markdown
---
name: commit
description: Búðu til git commit með góðum skilaboðum
---
Skoðaðu breytingarnar með git diff --staged.
Búðu til commit message á forminu:
feat/fix/chore(scope): lýsing á íslensku
\`\`\`

**Keyra:** \`/commit\`

> ⚠️ Skills hafa leyst af hólmi .claude/commands/ — þetta er nýja leiðin!`,
        challenge: null,
      },
      {
        id: "m2-l3",
        title: "Smíðaðu þína fyrstu Skill",
        type: "challenge",
        xp: 40,
        mins: 11,
        content: `Hér er verkefni sem sparar þér tíma í raunverulegu lífi:

Smíðaðu skill sem hjálpar þér með git commits á íslensku, eða PR review.`,
        challenge: {
          prompt: `Búðu til skill skrá (.claude/skills/commit-is/SKILL.md) sem:
1. Les git diff --staged sjálfkrafa
2. Útbýr commit message á íslensku
3. Fylgir conventional commits (feat/fix/chore)
4. Biður um staðfestingu áður en hún committar

Sýndu mér nákvæmlega hvað á í skránni.`,
          hint: "Skills nota frontmatter með name og description — þetta er hvernig Claude þekkir hvenær á að nota þær",
          template: `Settu þetta í .claude/skills/commit-is/SKILL.md:

---
name: commit-is
description: Búa til git commit á íslensku með conventional commits
---

Skoðaðu git diff --staged.
Búðu til commit message á forminu:
[tegund]([scope]): [lýsing á íslensku]

Tegundir: feat, fix, chore, docs, refactor
Biddu notanda um staðfestingu áður en þú committar.`,
        },
      },
    ],
  },
  {
    id: "m3",
    title: "Context Engineering",
    short: "Context",
    minutes: 20,
    accent: "#EA580C",
    lessons: [
      {
        id: "m3-l1",
        title: "Context er allt",
        type: "read",
        xp: 15,
        mins: 5,
        content: `Claude Code hefur ekkert minni á milli lota. Allt sem þú vilt að hann viti þarf að vera í context-inum.

**Hvernig context safnast:**
1. CLAUDE.md (alltaf)
2. Skills sem eru invoked
3. Samtalssaga
4. Skrár sem þú @-nefnir

**Vandinn: Context drukknar**
Eftir langa lotu byrjar Claude að:
- Gleyma fyrstu leiðbeiningum
- Endurtaka sig
- Hunsa CLAUDE.md reglur

**Lausnir:**
- \`/clear\` — byrja upp á nýtt
- \`/compact\` — þjappa saman án þess að missa samhengi
- \`/branch\` — greina í nýja lotu fyrir nýtt verkefni

> 🎯 Regla: Ef Claude er farinn að gera villur sem hann gerði ekki áðan — hreinsa context!`,
        challenge: null,
      },
      {
        id: "m3-l2",
        title: "@ mentions — Benda á skrár",
        type: "read",
        xp: 10,
        mins: 4,
        content: `\`@\` er leið til að benda Claude á eitthvað án þess að hann þurfi að leita.

**Notkun:**
- \`@src/components/Button.tsx\` — benda á skrá
- \`@src/\` — benda á möppu
- \`@README.md\` — benda á skjal
- \`@https://docs.example.com\` — sækja vefsíðu

**Í CLAUDE.md:**
\`\`\`markdown
See @README.md for project overview
See @src/types/index.ts for type definitions
\`\`\`

**💡 Þegar á að nota @:**
Þegar þú vilt að Claude sé **viss** um að skoða eitthvað tiltekið, frekar en að giska á hvaða skrár skipta máli.`,
        challenge: null,
      },
      {
        id: "m3-l3",
        title: "Plan Mode — Áður en kóðun byrjar",
        type: "challenge",
        xp: 35,
        mins: 11,
        content: `Plan mode lætur Claude **hugsa** áður en hann byrjar að breyta skrám.

**Hvernig:**
- Skipta í Plan Mode: \`Shift+Tab\` (cycling gegnum modes)
- Eða skrifa: "Gerðu plan en ekki kóðaðu ennþá"

**Hvenær á að nota:**
✅ Þegar feature er flókin
✅ Þegar þú ert ekki viss um approach
✅ Þegar margar skrár eru snertar

**Verkefni:**`,
        challenge: {
          prompt: `Notaðu Plan Mode á þessum verkefnum og segðu mér hvað Claude leggur til:

Verkefni: Ég vil bæta við email verification í [app þín].

Byrjaðu með: "Gerðu plan en byrjaðu ekki að kóða. Lýstu hvaða skrár þarft að breyta og í hvaða röð."

Hvað sagði Claude?`,
          hint: "Shift+Tab í terminal skiptar á milli Auto → Plan → Normal modes. Í Plan mode sér þú ✏️ tákn",
          template: null,
        },
      },
    ],
  },
  {
    id: "m4",
    title: "Hooks & Sjálfvirkni",
    short: "Hooks",
    minutes: 26,
    accent: "#9333EA",
    lessons: [
      {
        id: "m4-l1",
        title: "Hvað eru Hooks?",
        type: "read",
        xp: 20,
        mins: 7,
        content: `Hooks eru skriptur sem keyra sjálfkrafa við tilteknar aðgerðir Claude.

> 💡 CLAUDE.md er ráðgjöf. Hooks eru **lög**.

**Gerðir:**
- **PreToolUse** — keyrir áður en Claude breytir skrá
- **PostToolUse** — keyrir eftir breytingu
- **Stop** — keyrir þegar Claude er búinn

**Dæmi — format á móti:**
\`\`\`json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write",
      "hooks": [{
        "type": "command",
        "command": "prettier --write $CLAUDE_TOOL_INPUT_FILE_PATH"
      }]
    }]
  }
}
\`\`\`

**Setja upp:**
Keyrðu \`/hooks\` í Claude Code — þar er gagnlegt viðmót til að búa til hooks.

**Dæmi sem gagnast þér:**
- Keyra TypeScript typecheck eftir breytingar
- Senda Slack skilaboð þegar verkefni lýkur
- Skrá dagsetningar (sem þú nefndir með Neisti!)`,
        challenge: null,
      },
      {
        id: "m4-l2",
        title: "Smíðaðu Stop Hook",
        type: "challenge",
        xp: 50,
        mins: 19,
        content: `Verkefni: Búðu til hook sem sendir þér desktop notification þegar Claude er búinn með verkefni.

Þetta er mjög gagnlegt fyrir ADHD — þú getur gert eitthvað annað á meðan Claude vinnur!`,
        challenge: {
          prompt: `Hjálpaðu mér að setja upp Stop hook sem:
1. Keyrir þegar Claude Code er búinn með verkefni
2. Sendir desktop notification á Mac (osascript) eða Linux (notify-send)
3. Sýnir: "Claude er búinn!" og hvernig verkefnið fór

Sýndu mér settings.json stillingar og bash skriptuna.`,
          hint: "Keyra /hooks í Claude Code og velja 'Add hook' — svo 'Stop' event. Á Mac: osascript -e 'display notification \"Búið!\" with title \"Claude Code\"'",
          template: `~/.claude/settings.json:

{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "osascript -e 'display notification \"Claude er búinn!\" with title \"Claude Code\"'"
      }]
    }]
  }
}`,
        },
      },
    ],
  },
  {
    id: "m5",
    title: "Multi-Agent & MCP",
    short: "Agents",
    minutes: 32,
    accent: "#DC2626",
    lessons: [
      {
        id: "m5-l1",
        title: "Subagents — Fleiri Claude í senn",
        type: "read",
        xp: 25,
        mins: 7,
        content: `Claude Code getur ræst aðra Claude agents til að vinna samhliða.

**Hvernig virkar þetta:**
Aðal-Claude (þú talar við) = manager
Subagents = sérfræðingar sem vinna í bakgrunni

**Dæmi:**
\`\`\`
Klára þessar þrjár features samhliða:
- Agent 1: Búðu til login UI
- Agent 2: Skrifaðu tests
- Agent 3: Uppfærðu documentation
\`\`\`

**Mikilvægt:** Hvert agent þarf sína eigin möppu til að vera óháð. Þetta líkist mjög OpenClaw uppbyggingunni þinni!

**Hvenær á að nota:**
- Stórar features sem snerta mismunandi hluta kóðabasis
- Þegar þú vilt "best of N" — láta marga agents leysa sama vandann og velja besta lausnina`,
        challenge: null,
      },
      {
        id: "m5-l2",
        title: "MCP — Ytri tengingar",
        type: "read",
        xp: 20,
        mins: 6,
        content: `MCP (Model Context Protocol) tengir Claude Code við ytri þjónustur.

**Setja upp MCP server:**
\`\`\`bash
claude mcp add playwright npx @playwright/mcp@latest
\`\`\`

**Gagnlegar tengingar:**
- \`github\` — PR reviews, issues
- \`playwright\` — browser automation og testing
- \`sqlite\` / \`postgres\` — gagnagrunnar
- \`slack\` — senda skilaboð (eins og Neisti!)

**Keyra MCP tool:**
\`/mcp__playwright__screenshot\` eða bara skrifa "taktu screenshot af þessari síðu"

**Öryggisatriði:**
Claude Code hleður ekki lengur öllum MCP schemas í upphafi — bara nöfnin. Full schema sótt þegar þörf er á, sem sparar mikið context.`,
        challenge: null,
      },
      {
        id: "m5-l3",
        title: "Tengja GitHub MCP",
        type: "challenge",
        xp: 60,
        mins: 19,
        content: `Lokaverkefni þessa modules: Tengdu GitHub MCP og láðu Claude fara yfir nýjasta PR-ið þitt.`,
        challenge: {
          prompt: `Hjálpaðu mér að:
1. Setja upp GitHub MCP í Claude Code
2. Búa til /pr-review skill sem sækir diff á PR og gefur skipulaga yfirlit:
   - Alvarlegar villur
   - Mikilvægar athugasemdir
   - Minniháttar

Sýndu mér nákvæmar skipanir og SKILL.md innihald.`,
          hint: "claude mcp add github -- svo /plugin install github@claude-plugins-official ef þú vilt plugin leiðina",
          template: null,
        },
      },
    ],
  },
];

export const TOTAL_XP = MODULES.reduce(
  (s, m) => s + m.lessons.reduce((a, l) => a + l.xp, 0),
  0
);
export const TOTAL_LESSONS = MODULES.reduce((s, m) => s + m.lessons.length, 0);

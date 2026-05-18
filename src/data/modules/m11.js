export const m11 = {
  id: "m11",
  title: "MCP — Ytri verkfæri",
  short: "MCP",
  minutes: 26,
  accent: "#DC2626",
  lessons: [
    {
      id: "m11-l1",
      title: "Hvað er MCP?",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Model Context Protocol

MCP er **staðall** fyrir hvernig AI agents (eins og Claude Code) tala við ytri þjónustur.

Hugsanaæfing: ímyndaðu þér að þú vilt að Claude:
- Skoði GitHub PR-in þín
- Taki screenshots í vafranum
- Leiti í database-i
- Sendi Slack skilaboð

Án MCP: Claude getur ekkert af þessu. Hann er fastur í þinni terminal.

Með MCP: Þú **tengir** MCP server fyrir hvert verkfæri. Nú getur Claude **notað þau**.

# Líking

MCP er eins og **plug-and-play** fyrir AI tools:

\`\`\`
Claude Code  ⇄  MCP server (github)  ⇄  GitHub API
Claude Code  ⇄  MCP server (playwright)  ⇄  Vafri
Claude Code  ⇄  MCP server (postgres)  ⇄  Gagnagrunnur
\`\`\`

Hver server bætir við nýjum verkfærum sem Claude getur notað.

# Hvar finn ég MCP servers?

- **Opinber:** [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **Anthropic:** býður upp á nokkrar (github, filesystem, ...)
- **Þriðja aðila:** Stripe, Notion, osfrv.
- **Þú:** Getur smíðað eigin MCP server fyrir þína þjónustu

# Algengar tengingar

| MCP | Hvað gerir |
|-----|------------|
| \`github\` | PR reviews, issues, búa til repos |
| \`playwright\` | Browser automation, screenshots, testing |
| \`postgres\` / \`sqlite\` | SQL queries á gagnagrunnum |
| \`slack\` | Senda/lesa skilaboð |
| \`filesystem\` | Lesa skrár utan verkefnisins |
| \`notion\` | Vinna með Notion pages |

> 🎯 MCP er það sem skiptir Claude úr "kóða-snillingi í terminal" í "starfsmann sem getur unnið með ALLAR þínar þjónustur".`,
      challenge: null,
    },
    {
      id: "m11-l2",
      title: "Setja upp MCP server",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# Tvær leiðir

## 1. claude mcp add (mæli með)

\`\`\`
$ claude mcp add github
Installing github MCP...
Authenticating with GitHub...
Done.
\`\`\`

Þetta:
1. Setur upp serverinn
2. Bætir honum við stillingarnar þínar
3. Auðkennir ef þörf er á

## 2. Manual JSON

\`\`\`json
// ~/.claude/config.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    }
  }
}
\`\`\`

# Skoða uppsetta servera

\`\`\`
$ claude mcp list
github      ✅ connected
playwright  ✅ connected
slack       ⚠️  not configured
\`\`\`

# Fjarlæga

\`\`\`
$ claude mcp remove playwright
\`\`\`

# Að nota tool úr MCP

Þegar MCP server er uppsettur, **Claude veit sjálfkrafa um verkfærin hans**.

\`\`\`
> Sýndu mér nýjustu PR-in í repo-inu mínu

[Claude notar github MCP]
PR #42 — Add dark mode (open)
PR #41 — Fix bug in markDone (merged 2d ago)
\`\`\`

Eða sértækt:

\`\`\`
> /mcp__playwright__screenshot https://claude.ai
\`\`\`

# Token kostnaður

⚠️ **Mikilvægt:** Hver MCP server bætir tools við Claude. Tools kosta tokens (þeir eru í context).

Anthropic gerði nýlega lagfæringu: **lazy loading**. Bara nöfn tools eru hlaðin upp í upphafi. Full schema er sótt þegar Claude þarf á því að halda.

Það þýðir að þú getur haft 20+ MCP servers án að fylla context strax.`,
      challenge: null,
    },
    {
      id: "m11-l3",
      title: "GitHub MCP",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Mest notaði MCP

GitHub MCP gefur Claude beinan aðgang að GitHub API. Nú getur þú beðið hann að:

✅ Skoða PR-in þín og fara yfir code
✅ Búa til ný issues úr lýsingu
✅ Sækja diff og útskýra breytingar
✅ Senda skilaboð á PR
✅ Listinn lengist...

# Setja upp

\`\`\`
$ claude mcp add github
\`\`\`

Þú þarft **personal access token** frá GitHub. Settu upp:

1. github.com → Settings → Developer settings → Personal access tokens
2. Búðu til token með scopes: \`repo\`, \`read:org\`, \`workflow\`
3. Afritaðu og límdu inn í Claude prompt

# Dæmi um notkun

## Code review

\`\`\`
> Skoðaðu PR #42 í repo-inu mínu og gefðu code review á íslensku.
\`\`\`

Claude:
1. Sækir diff
2. Les hvern hluta
3. Skrifar samandregningu með athugasemdum

## Búa til issue

\`\`\`
> Búðu til GitHub issue: "Dark mode missir XP" með lýsingu úr error log-inum mínum.
\`\`\`

## Skoða sögu

\`\`\`
> Hvaða PR-in voru merged í repo-inu mínu síðustu vikuna?
\`\`\`

# Plugin leiðin (annað)

Sum verkfæri eins og GitHub bjóða líka upp á **plugin** sem er meiri integrated:

\`\`\`
$ /plugin install github@claude-plugins-official
\`\`\`

Plugins eru eins og MCP en með fleiri möguleikum (UI in Claude Code, sjálfvirkar handlers).

> 💡 Byrjaðu með MCP. Færðu þig í plugin ef þú vilt meiri integration.`,
      challenge: null,
    },
    {
      id: "m11-l4",
      title: "Playwright MCP — vafri sjálfvirkni",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# Vafri með Claude

Playwright er framework sem stýrir vafranum sjálfvirkt. MCP-ið gefur Claude beinan aðgang.

# Hvað þú getur gert

✅ **Taka screenshots** af vefsíðum
✅ **Skoða framendinn** sem þú ert að smíða — Claude sér útkomuna
✅ **Prófa** features endurtekið
✅ **Sækja gögn** frá vefsíðum

# Setja upp

\`\`\`
$ claude mcp add playwright npx @playwright/mcp@latest
\`\`\`

Fyrsta sinn setur þetta upp Playwright og browser-engines (Chromium, Firefox, WebKit).

# Dæmi: Sjáðu UI-ið þitt

\`\`\`
> Keyrðu dev server (npm run dev), opnaðu http://localhost:5173 í vafranum, taktu screenshot, og lýstu fyrir mér hvað þú sérð.
\`\`\`

Claude:
1. Keyrir dev server í bakgrunni
2. Notar Playwright til að opna síðuna
3. Tekur screenshot
4. Lýsir UI-inu — "Ég sé hero kassa með titilinn 'Smíðaðu fyrstu Skill'..."

# Dæmi: Smella og prófa

\`\`\`
> Á localhost:5173, smelltu á "Verkefni" tab-inn og athugaðu hvort boss fight skjárinn birtist.
\`\`\`

Claude smellir og staðfestir niðurstöðu.

# Form-fyllt og testing

\`\`\`
> Skráðu inn með test@example.com og passw0rd, sjáðu hvort login virkar.
\`\`\`

Þetta er **gríðarlega kraftmikið** fyrir prófanir á alvöru.

> 🎯 Playwright MCP er það sem gerir UI-prófanir með Claude raunverulega gagnlegar. Þú getur sagt "prófaðu þetta í 5 vafrum og á 3 stærðum" og hann gerir.`,
      challenge: null,
    },
    {
      id: "m11-l5",
      title: "Tengja GitHub MCP",
      type: "challenge",
      xp: 50,
      mins: 10,
      content: `Síðasta verkefnið — alvöru pro setup.

**Verkefni:** Tengdu GitHub MCP og notaðu hann til að fara yfir alvöru PR.`,
      challenge: {
        prompt: `Ég vil setja upp GitHub MCP og nota það í alvöru. Hjálpaðu mér:

1. Útskýrðu hvernig á að búa til GitHub personal access token (hvaða scopes á að velja og af hverju)
2. Skipun til að bæta GitHub MCP við Claude Code
3. Hvernig á að prófa að það virki: t.d. "Sýndu mér nýjasta PR í repo-inu mínu"
4. Búðu til **skill** \`/pr-review\` sem:
   - Tekur nafn á repo og PR númer
   - Sækir diff
   - Útbýr ítarlegt code review á íslensku
   - Skiptir niðurstöðu í: Alvarlegar villur / Mikilvægar athugasemdir / Minniháttar
5. Sýndu skref fyrir skref hvernig nota skillina á alvöru PR

Svaraðu á íslensku og sýndu allar skipanir.`,
        hint: "Þú þarft að setja GITHUB_TOKEN sem environment variable eða með --env í claude mcp add. Skill-in má vera í .claude/skills/pr-review/SKILL.md.",
        template: `# .claude/skills/pr-review/SKILL.md

---
name: pr-review
description: Itarlegt code review á GitHub PR á íslensku, skipt í alvarleika
---

Þú aðstoðar við code review á GitHub PR.

Skref:
1. Spyrja notanda um repo-nafn og PR númer ef ekki gefið.
2. Nota github MCP til að sækja diff fyrir PR.
3. Lesa diff vandlega.
4. Útbúa review á íslensku skipt í:

   ## 🚨 Alvarlegar villur
   - Hluti sem brýtur appið, security issues, data loss áhætta

   ## ⚠️ Mikilvægar athugasemdir
   - Code quality, missing tests, unclear logic

   ## 💭 Minniháttar
   - Style, typos, suggested refactors

5. Endaðu með samandregningu: er PR tilbúið til merge eða ekki?`,
      },
    },
  ],
};

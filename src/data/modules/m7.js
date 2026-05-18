export const m7 = {
  id: "m7",
  title: "Skills — Eigin skipanir",
  short: "Skills",
  minutes: 25,
  accent: "#0891B2",
  lessons: [
    {
      id: "m7-l1",
      title: "Hvað er skill?",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Þínar eigin skipanir

Skills eru **eigin slash commands sem þú skrifar**. Þær eru bara Markdown skrár sem Claude les og fer eftir.

# Dæmi: commit skill

Þú býrð til skrána \`.claude/skills/commit/SKILL.md\`:

\`\`\`markdown
---
name: commit
description: Búa til git commit á íslensku
---

Skoðaðu git diff --staged.
Útbúðu commit message á forminu:
[tegund]([scope]): [lýsing á íslensku]

Tegundir: feat, fix, chore, docs, refactor
Biddu um staðfestingu fyrir commit.
\`\`\`

Núna geturðu skrifað \`/commit\` í Claude Code og hann fer eftir þessari leiðbeiningu.

# Af hverju að nota skills?

✅ **Spara tíma** — sömu leiðbeiningar aftur og aftur
✅ **Samkvæmni** — alltaf sama snið á commit-um
✅ **Deila í liðinu** — checka í Git svo allir nota
✅ **Reuse milli verkefna** — global skills virka allstaðar

# Skill vs CLAUDE.md

| Atriði | Skill | CLAUDE.md |
|--------|-------|-----------|
| Hvenær les Claude | Þegar þú kallar á hana | Alltaf í upphafi lotu |
| Virkar þegar | \`/skill-nafn\` | Sjálfkrafa |
| Stærð | Smáar (1 verk) | Heildar verkefnisreglur |
| Dæmi | "Búðu til commit" | "Þetta er React verkefni..." |

> 🎯 **Þumalfingurregla:** CLAUDE.md er "hver ég er". Skills eru "hvað ég kann að gera".`,
      challenge: null,
    },
    {
      id: "m7-l2",
      title: "Frontmatter — höfuð skill",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Þrjú strik á undan og á eftir

Hver skill byrjar á **frontmatter** — YAML hluti milli \`---\`:

\`\`\`markdown
---
name: commit
description: Búa til git commit á íslensku með conventional commits
---
\`\`\`

# Mikilvægustu reitirnir

## name (skylda)

Hvað þú skrifar í Claude til að kalla á hana: \`/commit\`.

**Reglur:**
- Lowercase
- Bara stafir og bandstrik (\`-\`)
- Stutt en lýsandi: \`commit-is\`, \`pr-review\`, \`add-test\`

## description (skylda)

Þetta er það **mikilvægasta**. Claude notar þetta til að ákveða **hvenær** á að nota skillina.

**Slæmar lýsingar:**
- ❌ "Commit skill" (of stutt)
- ❌ "Helper for git" (of óspecífic)

**Góðar lýsingar:**
- ✅ "Búa til git commit á íslensku með conventional commits formati"
- ✅ "Yfirfara nýjustu PR breytingar og benda á alvarlegar villur"

> 🎯 Eftir því sem description er nákvæmari, því betur skilur Claude hvenær á að kalla á skillina sjálfkrafa.

# Aðrir reitir (valfrjálsir)

\`\`\`yaml
---
name: commit
description: ...
tools: bash, edit   # leyfa bara þessar tools
model: opus         # nota þetta model fyrir skill
---
\`\`\`

Þú þarft sjaldan þetta. Default-ar virka vel.`,
      challenge: null,
    },
    {
      id: "m7-l3",
      title: "Hvenær Claude notar skill?",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Tvær leiðir til að virkja skill

## 1. Bein kall: /skill-nafn

\`\`\`
> /commit
\`\`\`

Claude veit að hann á að nota \`commit\` skillina.

## 2. Sjálfvirkt: Description match

Þetta er fáránlega kraftmikið. Ef þú skrifar:

\`\`\`
> Commit-aðu þessar breytingar
\`\`\`

Claude horfir á öll **description** í skills þínum og finnur þá sem passar. Ef \`commit\` skillin hefur description "Búa til git commit á íslensku" — hún virkjast.

# Þess vegna er description svona mikilvægt

Hugsanaæfing: ímyndaðu þér að þú segir samstarfsmanni: "Commit-aðu þetta." Þegar þú kennir nýjum vinnufélaga, þú segir: "Þú segir mér eitthvað eins og 'commit-aðu' og ég veit að ég á að gera commit." Það er description.

# Skill chaining

Skills geta kallað á aðrar skills. T.d. þú gætir haft:

- \`tests\` — keyra tests
- \`fix-tests\` — laga prófunarvillur
- \`ship\` — sem keyrir tests, fixar villur, gerir commit

Skill chainings eru pro-stig. Byrjaðu með einum.

# Hvar Claude leitar að skills

\`.claude/skills/\` í verkefninu (project-local)
\`~/.claude/skills/\` í heimamöppu (global)

Project-skills hafa forgang yfir global ef nafn klassar.`,
      challenge: null,
    },
    {
      id: "m7-l4",
      title: "Global vs project skills",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Tveggja staða þríhyrningur

## Global skills

Staðsetning: \`~/.claude/skills/\`

Þessar skills virka í **öllum** verkefnum á tölvunni þinni.

**Notist fyrir:**
- ✅ Persónulegar venjur (þitt commit format)
- ✅ Tools sem þú vilt allstaðar (\`/screenshot\`, \`/explain\`)
- ✅ Quick utilities

## Project skills

Staðsetning: \`./.claude/skills/\` (í verkefnamöppunni)

Þessar skills virka **bara** í þessu verkefni.

**Notist fyrir:**
- ✅ Verkefnissértækar reglur (t.d. "fylgdu okkar code style")
- ✅ Teymis-skills (commit-aðar í Git, allir í liðinu nota)
- ✅ Þegar þú vinnur með viðkvæm gögn eða sérstaka stack

# Þú getur haft báðar

Ef \`commit\` skill er í báðum:
- Project: notuð fyrir þetta verkefni
- Global: notuð annars staðar

# Mæla með

✅ **Global:** generic skills sem virka allstaðar
   - \`commit-is\`, \`pr-review\`, \`explain-line-by-line\`

✅ **Project:** specific reglur fyrir þetta verkefni
   - \`add-react-component\`, \`run-migrations\`, \`deploy\`

# Versions og deila í liði

Project skills eru bara skrár í Git. Push-aðu þær, allir í liðinu hafa þær sjálfkrafa.

\`\`\`
$ git add .claude/skills/
$ git commit -m "feat: add commit-is skill"
$ git push
\`\`\`

> 🎯 **Pro tip:** Bestu liðin hafa 5-10 project skills sem allir nota. Það gerir samvinnu með Claude svimandi áreiðanleg.`,
      challenge: null,
    },
    {
      id: "m7-l5",
      title: "Smíða þína fyrstu skill",
      type: "challenge",
      xp: 40,
      mins: 9,
      content: `# Þú smíðar fyrstu skill núna

Verkefnið: Búðu til \`commit-is\` skill sem útbýr íslenska git commits.

**Markmið:**
- Sjá staged breytingar
- Útbúa íslenskan commit message í conventional commits formati
- Biðja um staðfestingu áður en hún committar

Þú getur líka beðið Claude að gera þetta fyrir þig — sýndu honum verkefnislýsinguna og spurðu.`,
      challenge: {
        prompt: `Hjálpaðu mér að smíða mína fyrstu skill. Skipta:

1. Hvar ég bý til möppurnar (\`.claude/skills/commit-is/\`)
2. Nákvæmt innihald \`SKILL.md\` skrárinnar sem:
   - Hefur \`name: commit-is\` og góða \`description\`
   - Les git diff --staged
   - Útbýr conventional commit message á íslensku
   - Biður um staðfestingu áður en commit framkvæmist
3. Hvernig prófa: keyra \`/commit-is\` eða bara "commit-aðu þetta"
4. Útskýrðu af hverju description-ið er svona mikilvægt

Sýndu mér nákvæmlega allt sem ég þarf að skrifa.`,
        hint: "Settu skillina í .claude/skills/commit-is/SKILL.md í verkefni þínu. Þá geturðu commit-að hana í Git og deilt með liðinu.",
        template: `# .claude/skills/commit-is/SKILL.md

---
name: commit-is
description: Búa til git commit á íslensku með conventional commits formati. Notist þegar notandi vill commit-a staged breytingar.
---

Þú aðstoðar notanda við að búa til vandaðan git commit á íslensku.

Skref:
1. Keyrðu \`git diff --staged\` og skoðaðu breytingarnar.
2. Útbúðu commit message á forminu:
   \`[tegund]([scope]): [stutt lýsing á íslensku]\`

   Tegundir:
   - feat: nýtt feature
   - fix: bugfix
   - chore: viðhald, deps
   - docs: skjöl
   - refactor: kóðabreyting án virkni-breytinga
   - test: tests

3. Sýndu notanda commit message-ina og biddu um staðfestingu.
4. Ef notandi samþykkir: keyra \`git commit -m "..."\`
5. Ef notandi vill breyta: spyrðu hvað þau vilja breyta.

Aldrei push-aðu eftir commit — láta notanda gera það sjálf/an.`,
      },
    },
  ],
};

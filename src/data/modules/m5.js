export const m5 = {
  id: "m5",
  title: "Að keyra Claude Code",
  short: "Að byrja",
  minutes: 28,
  accent: "#16A34A",
  lessons: [
    {
      id: "m5-l1",
      title: "Uppsetning Claude Code",
      type: "read",
      xp: 10,
      mins: 4,
      content: `# Það sem þú þarft

1. **Tölva** með Mac, Linux, eða Windows + WSL
2. **Node.js** uppsett (sjá hér að neðan)
3. **Anthropic reikning** ([console.anthropic.com](https://console.anthropic.com))

# Setja upp Node.js

Node.js er forrit sem keyrir JavaScript utan vafrans. Claude Code er smíðað ofan á Node.

**Mac/Linux:**
\`\`\`
brew install node      # ef þú ert með Homebrew
# eða sækja frá nodejs.org
\`\`\`

**Windows:** Sækja frá [nodejs.org](https://nodejs.org/) og keyra installerinn.

Athugaðu með:
\`\`\`
$ node --version
v22.0.0
\`\`\`

# Setja upp Claude Code

\`\`\`
$ npm install -g @anthropic-ai/claude-code
\`\`\`

\`-g\` þýðir "global" — sett upp á tölvunni almennt, ekki bara í einu verkefni.

# Skrá þig inn

Þegar þú keyrir Claude í fyrsta sinn:

\`\`\`
$ claude
Welcome to Claude Code!
Please login: ...
\`\`\`

Þú færð URL — opnaðu hana í vafranum og skráðu þig inn. Eftir það ertu tilbúin(n).

> 💡 **Pro tip:** Ef þú vilt nota þitt eigið API key (þú borgar per notkun, fínt fyrir mikla notkun), skráirðu \`ANTHROPIC_API_KEY\` í umhverfið. Sjá Claude docs.`,
      challenge: null,
    },
    {
      id: "m5-l2",
      title: "Fyrsta lota",
      type: "read",
      xp: 15,
      mins: 5,
      content: `# Byrja samtal

Í terminal, farðu í möppu verkefnis þíns og keyrðu:

\`\`\`
$ cd mitt-verkefni
$ claude
\`\`\`

Þú færð prompt:

\`\`\`
What would you like to do?
> _
\`\`\`

# Spyrðu spurningu á íslensku

Þú getur skrifað hvað sem er. Claude skilur íslensku.

\`\`\`
> Hvað er í þessu verkefni? Lestu README.md og lýstu fyrir mér.
\`\`\`

Claude mun:
1. Lesa README.md
2. Skrifa þér samandregning á íslensku

# Mikilvægar venjur frá byrjun

✅ **Vertu skýr:** "Bættu við login skjá í src/Login.jsx" er betra en "fixaðu þetta"
✅ **Nefndu skrár:** "Lestu @src/App.jsx" tryggir að hann skoði rétta skrá
✅ **Eitt verkefni í einu:** Ekki "smíðaðu allt appið" — heldur "smíðaðu login skjáinn fyrst"

# Loka lotu

Ctrl+C tvisvar, eða skrifa \`/exit\`.

Næst þegar þú keyrir \`claude\` í sömu möppu, byrjar **ný lota** — Claude man ekkert. CLAUDE.md helst.

> ⚠️ Þetta er af hverju CLAUDE.md skiptir öllu máli. Sjá m8.`,
      challenge: null,
    },
    {
      id: "m5-l3",
      title: "Permission modes",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# Hversu mikið traust gefur þú Claude?

Claude Code spyr þig leyfis áður en hann gerir hluti. Þú getur stillt hversu mikið hann spyr.

# 4 stillingar

## Default (sjálfgefið)
Spyr leyfis fyrir hverja aðgerð.
- Lesa skrá? "Má ég lesa þetta?" → Já/Nei
- Breyta skrá? "Má ég breyta?" → Já/Nei
- Keyra skipun? "Má ég keyra þetta?" → Já/Nei

**Notist:** Þegar þú ert ný/r eða þegar þú treystir Claude ekki alveg.

## Accept-edits
Lesa og breyta sjálfkrafa. Spyr enn um skipanir.
- ✅ Lesa, ✅ Breyta, ❓ Keyra skipanir

**Notist:** Þegar þú vinnur með kunnuglegt verkefni og treystir Claude að breyta skrám.

## Plan mode
Claude má **bara hugsa**, ekki gera neitt. Sýnir þér plan en framkvæmir ekki.
- ✅ Lesa, ❌ Breyta, ❌ Keyra

**Notist:** Þegar þú vilt skoða nálgun áður en þú leyfir Claude að framkvæma.

## Bypass permissions (varúð!)
Gerir allt sjálfkrafa, engin spurningar.
- ✅ Lesa, ✅ Breyta, ✅ Keyra ALLT

**Notist:** Bara í ósínum, ósvalin verkefni. **Aldrei í alvöru verkefnum.**

# Skipta um stillingu

Ýttu á **Shift+Tab** í Claude Code til að hjóla á milli modes. Þú sérð á skjánum hvar þú ert.

> 🎯 **Mín ráðlegging:** Byrjaðu á **Default**, færðu þig í **Accept-edits** þegar þú þekkir verkfærið.`,
      challenge: null,
    },
    {
      id: "m5-l4",
      title: "Lesa og breyta skrám",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Lesa skrár

Þrjár leiðir:

**1. Bara biðja:**
\`\`\`
> Lestu README.md
\`\`\`

**2. @ mention (öruggt):**
\`\`\`
> Skoðaðu @src/App.jsx og útskýrðu hvað gerist í markDone()
\`\`\`

**3. Margar skrár:**
\`\`\`
> Lestu @src/App.jsx og @src/lib/api.js og útskýrðu hvernig API kallið virkar
\`\`\`

> 💡 @ menntar tryggir að Claude skoði nákvæmlega þá skrá — án giska.

# Breyta skrám

\`\`\`
> Bættu við console.log í markDone() í @src/App.jsx
\`\`\`

Claude:
1. Les skrána
2. Sýnir þér nákvæmlega hverju hann ætlar að breyta
3. Spyr "Má ég framkvæma?" (í default mode)
4. Þú segir já/nei

# Sniðug ráðlegging

✅ **Vísa á LINUX línunúmer eða svæði:**
\`\`\`
> Í markDone(), milli "if (completed)" og "const newXp", bættu við athugun
\`\`\`

✅ **Biðja um lítil skref:**
Ekki: "Skrifaðu allt appið"
Heldur: "Bættu við disabled state á takkann"

❌ **Ekki segja "fixaðu villuna" án samhengis:**
Claude veit ekki hvaða villu þú meinar. Sýndu villuboðin eða lýstu nákvæmlega.

# Skipta um skoðun

Ef Claude breytti einhverju sem þú villt ekki — \`git checkout .\` skiptir öllu aftur í síðasta commit.

> 🎯 Þetta er ein af stærstu ástæðum að nota Git frá byrjun. Þú getur prófað hvað sem er — alltaf hægt að fara til baka.`,
      challenge: null,
    },
    {
      id: "m5-l5",
      title: "Keyra skipanir",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Bash í gegnum Claude

Claude getur keyrt skipanir í terminal-inum þínum.

\`\`\`
> Keyrðu npm install og sýndu mér útkomuna
\`\`\`

\`\`\`
> Hvar er git status hér?
\`\`\`

\`\`\`
> Búðu til skrána @src/components/Login.jsx með grunni fyrir login form
\`\`\`

# Hvenær á að nota þetta

✅ Setja upp pakka (\`npm install\`)
✅ Keyra tests (\`npm test\`)
✅ Git operations (\`git status\`, \`git diff\`, \`git log\`)
✅ Skoða system stöðu (\`ls\`, \`pwd\`, \`df\`)

# Hvenær á að passa sig

⚠️ **Eyðslu-skipanir:** \`rm -rf\`, \`git reset --hard\`, \`drop database\`
⚠️ **Sendingar:** \`git push\`, \`npm publish\`
⚠️ **Skipanir sem kosta peninga:** \`aws ...\`, \`gcloud ...\`

> 🎯 Í **default mode** spyr Claude alltaf áður en hann keyrir skipanir. Þú ert öruggur. En vertu vakandi — lestu skipunina áður en þú samþykkir.

# Pro venja: Athuga áður en eyða

Áður en þú lætur Claude gera eitthvað eyðandi:

\`\`\`
> Sýndu mér git diff áður en þú gerir commit
> Hvaða skrár myndu eyðast ef ég keyrði þetta?
\`\`\``,
      challenge: null,
    },
    {
      id: "m5-l6",
      title: "Klára þitt fyrsta verkefni",
      type: "challenge",
      xp: 40,
      mins: 6,
      content: `Tími til að framkvæma alvöru verkefni með Claude Code.

**Verkefni:** Búðu til lítla README.md fyrir verkefni þitt með hjálp Claude.`,
      challenge: {
        prompt: `Ég er nýbyrjaður með Claude Code. Hjálpaðu mér að klára þetta skref fyrir skref:

1. Búa til nýja möppu \`mitt-fyrsta-verkefni\` og fara þangað í terminal
2. Keyra \`claude\` í þeirri möppu
3. Biðja Claude um að:
   - Búa til README.md með titli "Mitt fyrsta verkefni"
   - Skrifa stutta lýsingu (3 línur)
   - Bæta við "Hvernig á að keyra" hluta
4. Skoða niðurstöðuna með \`cat README.md\`

Sýndu mér nákvæmlega hvað ég á að skrifa við Claude á íslensku. Engir flóknir skipanir — bara raunverulegt íslenskt samtal.`,
        hint: "Þú getur talað við Claude eins og samstarfsmann. T.d. 'Búðu til README.md með titli...' — hann skilur.",
        template: null,
      },
    },
  ],
};

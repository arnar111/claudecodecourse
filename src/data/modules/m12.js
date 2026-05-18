export const m12 = {
  id: "m12",
  title: "Pro workflows",
  short: "Pro",
  minutes: 30,
  accent: "#B45309",
  lessons: [
    {
      id: "m12-l1",
      title: "Subagents — fleiri Claude í senn",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# Fleiri en einn Claude

Claude Code getur ræst aðra Claude agents til að vinna **samhliða**.

# Líking: Verksmiðjustjóri

Aðal-Claude (sem þú talar við) er **manager**. Hann getur úthlutað verkefnum til **subagents** sem vinna sjálfstætt.

\`\`\`
Þú → Manager Claude
      ├→ Subagent 1: Skrifa login UI
      ├→ Subagent 2: Skrifa tests
      └→ Subagent 3: Uppfæra docs
\`\`\`

# Hvenær er þetta gagnlegt?

✅ **Stór feature** sem þú getur skipt í óháða parta
✅ **Þvert á margar skrár** — parallel betra en sequential
✅ **Best of N** — láta marga agents leysa sama vandann, velja besta lausnina
✅ **Research + execute** — einn agent skoðar codebase, annar framkvæmir

# Hvernig á að ræsa

Þú segir Manager-Claude:

\`\`\`
> Klára þessar þrjár features samhliða:
> 1. Login UI í @src/components/Login.jsx
> 2. Tests fyrir auth.js í @src/lib/__tests__/auth.test.js
> 3. Bæta API documentation í @docs/api.md
\`\`\`

Claude (Manager) ræsir 3 subagents. Hver vinnur sjálfstætt í **sínum** glugga.

# Niðurstöður

Manager fær niðurstöður og sameinar:

\`\`\`
✅ Agent 1: Login.jsx tilbúið (38 línur)
✅ Agent 2: auth.test.js tilbúið (7 prófanir, allar pass)
⚠️ Agent 3: API documentation uppfært — eitt atriði þarf þína staðfestingu
\`\`\`

# Tips

⚠️ **Eitt subagent á eitt verkefni.** Ekki "agent vinnur að 5 hlutum"
⚠️ **Óháðar skrár.** Ef tveir agents reyna að breyta sömu skrá → conflicts
⚠️ **Skýr lýsing.** Subagents fá ekki allt context þitt — gefðu þeim skýrt prompt

> 🎯 Þetta er **pro feature**. Ef þú ert nýr með Claude Code, byrjaðu með einum. Subagents eru fyrir flóknu sviðsmyndir.`,
      challenge: null,
    },
    {
      id: "m12-l2",
      title: "Code review með Claude",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# Vinnuflæði: PR → /review → fix → merge

Eitt af kraftmestu möguleikum Claude Code er **code review**.

# Þrjár leiðir til að nota

## 1. /review skipun

Á núverandi branch:

\`\`\`
$ claude
> /review
\`\`\`

Claude:
- Tekur git diff síðasta commit
- Fer yfir hverja breytingu
- Bendir á: villur, style, security, missing tests

## 2. /pr-review skill (sem þú smíðar)

Sjá m11-l5. Tekur PR númer og fer yfir GitHub PR.

## 3. Bara biðja

\`\`\`
> Fáðu yfir þessar breytingar og bentu á það sem ég ætti að laga áður en ég push-a.
\`\`\`

# Hvað á að spyrja eftir

✅ **Security:** SQL injection, XSS, hard-coded secrets
✅ **Tests:** Vantar prófanir? Eru prófanir nákvæmar?
✅ **Performance:** N+1 queries, óþarfa re-renders
✅ **Maintainability:** Of langar functions, duplicate kóði
✅ **TypeScript:** \`any\` í code, missing types

# Dæmi um góða code review beiðni

\`\`\`
> Skoðaðu /src/components/Login.jsx og bentu á:
> 1. Security áhættur
> 2. Hvort error handling sé fullnægjandi
> 3. Hvort accessibility (a11y) sé í lagi
> 4. Hvort tests vanti
>
> Vertu strict — ég vil sjá öll possible vandamál.
\`\`\`

# Hvenær á að spyrja annan mann líka

Claude er **mjög** góður en hann er ekki alvitur. Spyrðu annan mann ef:

- Stór arkitektúrleg breyting
- Áhrif á öryggi
- Þú ert ekki viss um hvort Claude skilji domain-ið

> 🎯 Verkflæði sem ég nota: 1) Smíða feature 2) /review fyrir self-check 3) Push 4) Mannlegt review á PR. Tvö lög skiptir öllu máli.`,
      challenge: null,
    },
    {
      id: "m12-l3",
      title: "Testing með Claude",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# Tests — því miður mikilvægt

Tests eru sjálfvirkar prófanir á kóða. Þú skrifar próf einu sinni, það keyrir alltaf.

# Tegundir tests

| Tegund | Hvað prófar |
|--------|-------------|
| **Unit** | Eitt fall í einu |
| **Integration** | Nokkur föll saman |
| **E2E (end-to-end)** | Allt appið frá byrjun til enda |

# Claude og tests — vinnuflæði

## 1. Spyrja Claude að skrifa próf

\`\`\`
> Skrifaðu unit tests fyrir markDone() function í @src/App.jsx.
> Notaðu Vitest. Athugaðu: XP eykst, completed verður true, streak hækkar, og duplicate calls eru no-op.
\`\`\`

## 2. Keyra og laga

\`\`\`
> Keyrðu npm test og lagaðu allar villur sem koma upp.
\`\`\`

Claude keyrir, sér output, lagar.

## 3. Bæta við edge cases

\`\`\`
> Bætið tests fyrir edge cases:
> - markDone á lesson sem þegar er done
> - markDone þegar localStorage er ekki tiltækur
\`\`\`

# Test-driven development (TDD) með Claude

Þú getur biðja Claude að gera TDD:

\`\`\`
> Notaðu TDD nálgun:
> 1. Skrifa próf FYRST (rauð)
> 2. Skrifa minnsta kóðann sem fær prófið til að passa (grænt)
> 3. Refactor ef þörf

> Markmiðið: bæta við validateEmail() function.
\`\`\`

# Coverage

Eftir tests, athugaðu hvort allt sé prófað:

\`\`\`
> Keyrðu npm run test:coverage og sýndu mér hvaða skrár hafa minna en 80% coverage.
\`\`\`

> 💡 Ekki láta Claude skrifa "all tests" í einni beiðni á stóra codebase. Brjóttu í skref — skrá fyrir skrá.`,
      challenge: null,
    },
    {
      id: "m12-l4",
      title: "Documentation með Claude",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Documentation er kóði

Góð docs spara þér klukkutíma af útskýringum seinna. Claude er **mjög** góður í að halda docs uppfærðum.

# Hvenær á að uppfæra docs

✅ Eftir nýtt feature
✅ Eftir breytingu á API
✅ Eftir refactor sem breytir flæði
✅ Þegar einhver spurði um eitthvað sem var ekki í docs

# Common doc-skrár

| Skrá | Tilgangur |
|------|-----------|
| \`README.md\` | Yfirlit + uppsetning |
| \`CLAUDE.md\` | Leiðbeiningar fyrir Claude |
| \`CONTRIBUTING.md\` | Hvernig á að bæta við í verkefnið |
| \`docs/\` | Ítarlegri leiðbeiningar |
| \`CHANGELOG.md\` | Hvað breyttist í hverri útgáfu |

# Verkflæði

## Uppfæra README eftir feature

\`\`\`
> Ég bætti við dark mode í appið. Uppfærðu @README.md með:
> - Hvernig á að virkja dark mode
> - Hvaða localStorage key heldur stillingunni
> - Screenshot suggestion (ég bæti við myndinni síðar)
\`\`\`

## Skrifa nýja docs skrá

\`\`\`
> Skrifaðu @docs/architecture.md með yfirlit yfir:
> 1. Hvernig App.jsx skipuleggur state
> 2. Hvernig localStorage persistar XP og tweaks
> 3. Hvernig palette function virkar
> Notaðu ASCII diagrams þar sem það á við.
\`\`\`

## Generate JSDoc

\`\`\`
> Bætið JSDoc kommentum við allar exported functions í @src/lib/.
> Inkludaðu @param, @returns, og dæmi.
\`\`\`

# Þumalfingurregla

📝 **Skrifaðu docs sem þú vildir hafa fundið** þegar þú byrjaðir verkefnið.

> 🎯 Ef þú ert reglulega spurður um sama hlutinn — uppfærðu docs. Sparar þér og öðrum tíma.`,
      challenge: null,
    },
    {
      id: "m12-l5",
      title: "Fyrsti pro deploy",
      type: "challenge",
      xp: 50,
      mins: 11,
      content: `Lokaverkefni námskeiðsins.

**Markmið:** Þú deployar alvöru verkefni með hjálp Claude — frá núlli til lifandi á netinu.

Þú þarft að:
1. Velja verkefni (eitt af þínum eða nýtt minigame/site)
2. Hafa Git repo á GitHub
3. Velja deploy target (Vercel, Netlify, Cloudflare Pages)
4. Setja upp deploy með Claude
5. Setja upp environment variables ef þörf er á
6. Verifya að það virki á netinu

Þetta er það sem aðskilur **hobbyista frá pro**: að taka verkefni alla leið.`,
      challenge: {
        prompt: `Ég ætla að deploy-a eitt af verkefnum mínum með Claude í fyrsta sinn. Hjálpaðu mér:

1. Stuttu yfirliti yfir 3 deploy options:
   - **Vercel** (best fyrir Next.js og frontend)
   - **Netlify** (líka frontend, einfalt)
   - **Cloudflare Pages** (frítt, hraðast)

   Hvern á að velja fyrir React/Vite verkefni?

2. Skipti fyrir Vercel (eða valið platform):
   - Búa til reikning
   - Tengja við GitHub repo
   - Stilla build settings (npm run build, dist/)
   - Setja environment variables (t.d. API lyklar)
   - Trigger fyrsta deploy

3. Hvernig á að nota Claude til að:
   - Athuga hvort build virki locally fyrst (\`npm run build && npm run preview\`)
   - Setja upp \`.env.example\` rétt
   - Skrifa deploy section í README
   - Setja upp deploy preview við hvert PR

4. Eftir-deploy:
   - Hvernig fæ ég URL?
   - Hvernig set ég upp custom domain?
   - Hvernig monitor-a ég errors?

Svaraðu á íslensku með nákvæmum skipanum og linkum.`,
        hint: "Vercel er einfaldast fyrir flest verkefni. Þú þarft bara að tengja GitHub og þú færð sjálfvirkan deploy fyrir hvern push á main.",
        template: `# Pro deploy checklist

## 1. Loka samspili locally
- [ ] npm run build virkar án villu
- [ ] npm run preview sýnir rétt útkomu
- [ ] .env.example er uppfært
- [ ] README.md hefur deploy section
- [ ] Allir tests passa: npm test

## 2. GitHub
- [ ] Branch er á main eða með merge til main
- [ ] Engin secrets í Git history (sjá: git log -p | grep -i 'secret\\|key\\|password')
- [ ] .gitignore listar .env, node_modules, dist

## 3. Vercel setup
- [ ] vercel.com → New Project → Import frá GitHub
- [ ] Framework preset: Vite
- [ ] Build command: npm run build (default)
- [ ] Output: dist (default)
- [ ] Environment Variables: bætt við úr .env

## 4. Eftir deploy
- [ ] URL virkar
- [ ] Console hreint (engar villur)
- [ ] Test "happy path" feature
- [ ] Set upp custom domain (ef þú átt eitt)`,
      },
    },
  ],
};

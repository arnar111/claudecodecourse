export const m9 = {
  id: "m9",
  title: "Plan Mode",
  short: "Plan",
  minutes: 18,
  accent: "#CA8A04",
  lessons: [
    {
      id: "m9-l1",
      title: "Hvað er Plan Mode?",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Hugsaðu áður en þú framkvæmir

Plan Mode er sérstök stilling þar sem Claude:
- ✅ Les skrár
- ✅ Greinir codebase-inn
- ✅ Útbýr **plan** — hvaða skrár hann ætlar að breyta og í hvaða röð
- ❌ Framkvæmir **ekki** neitt

Þetta er **mjög** mikilvægt fyrir flókin verkefni.

# Af hverju ekki bara láta Claude framkvæma?

Þú gætir sagt: "Bættu við login feature."

Án Plan Mode:
- Claude byrjar að skrifa kóða
- Þú sérð útkomuna eftir 5 mínútur
- Þú áttar þig: hann nálgaði þetta öðruvísi en þú vildir
- Þú þarft að fara til baka

Með Plan Mode:
- Claude segir: "Hér er nálgun mín. Ég ætla að breyta 4 skrám: A, B, C, D. Í þessari röð. Vegna þess..."
- Þú lest, samþykkir eða breytir
- Hann framkvæmir bara samþykkt plan

# Hvenær er Plan Mode mikilvægur?

✅ **Stór feature** sem snertir margar skrár
✅ **Refactor** sem getur farið illa
✅ **Þú ert ekki viss** hvort Claude skilji verkefnið
✅ **Codebase er nýr fyrir Claude** — vill sjá hvort hann skilur strúktúrinn
✅ **Breytingar þvert á margar skrár**

# Hvenær er hann YFIRDREIFÐUR?

❌ Quick typo fix
❌ Smáar breytingar á einni skrá
❌ "Bætið console.log við þessa línu"

> 🎯 **Þumalfingurregla:** Ef þú myndir biðja samstarfsmann að "gera plan og senda þér" áður en hann byrjar — notaðu Plan Mode.`,
      challenge: null,
    },
    {
      id: "m9-l2",
      title: "Shift+Tab — að virkja",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Lyklaborðs takki

Í Claude Code, þrýstu á **Shift+Tab** til að hjóla á milli modes:

\`\`\`
Default → Accept-edits → Plan → (loop)
\`\`\`

Þú sérð á skjánum hvaða mode þú ert í:

\`\`\`
[Plan Mode ✏️]  Þú ert í Plan Mode
\`\`\`

# Tvær leiðir til að nota Plan Mode

## 1. Skipta yfir með Shift+Tab

Hjólar þér yfir. Næsta skipun fer í Plan Mode.

## 2. Biðja beint

\`\`\`
> Gerðu plan en byrjaðu ekki að kóða. Ég vil sjá nálgun þína fyrst.
\`\`\`

Þetta virkar líka — Claude skilur og bregst við sem í Plan Mode.

# Hvernig Plan Mode lítur út

\`\`\`
> Bættu við email verification feature.

Ég ætla að:
1. Lesa @src/components/Login.jsx og @src/lib/auth.js
2. Búa til nýjan component @src/components/EmailVerify.jsx
3. Bæta við route /verify-email í @src/App.jsx
4. Uppfæra @src/lib/auth.js með verifyEmail() function
5. Bæta við test fyrir verifyEmail()

Ég reikna með að breyta 4 skrám og bæta við 1 nýrri.

Samþykkir þú þetta plan?
\`\`\`

# Skipta út úr Plan Mode

Þegar þú samþykkir, Claude framkvæmir og þú ferð sjálfkrafa aftur í **default** mode.

Eða ýttu Shift+Tab aftur til að skipta handvirkt.`,
      challenge: null,
    },
    {
      id: "m9-l3",
      title: "Að lesa plan og breyta",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Hvernig á að rýna í plan

Þegar Claude sendir plan, athugaðu:

## 1. Skoðar hann réttar skrár?

❌ "Ég ætla að lesa @src/Login.jsx"
   Ef þú vissir að logikkin er í @src/lib/auth.js — segðu honum það

## 2. Er röðin rétt?

Stundum vil Claude breyta skrá A áður en hann skoðar skrá B sem hefur áhrif. Það er hættulegt.

✅ "Lestu fyrst @src/types/User.ts, svo breyttu @src/lib/auth.js"

## 3. Vantar eitthvað?

- Vantar tests? "Bættu við tests fyrir hverri nýrri function"
- Vantar documentation? "Uppfærðu @README.md með nýju features"

## 4. Of mikið?

Ef plan-ið hefur 15 skref, líklega er það of stórt. Beiðu Claude að **brjóta upp**:

\`\`\`
> Þetta plan er of stórt. Brjóttu upp í 2-3 minni plön sem ég get framkvæmt á mismunandi tímum.
\`\`\`

# Að breyta plani

\`\`\`
> Plan-ið er gott en breyttu þannig að:
> - Bætið validation logikku í Login.jsx áður en EmailVerify.jsx er búið til
> - Tests skulu vera í Vitest, ekki Jest
\`\`\`

Claude bregst við, gefur nýtt plan.

# ExitPlanMode

Þegar Claude er ánægður með plan og þú samþykkir, hann notar innra verkfæri sem heitir \`ExitPlanMode\` til að "stökkva út" og framkvæma.

> 💡 Þú þarft ekki að vita um þetta — Claude sér um það. En ef þú sérð þetta nafn í terminal, veistu hvað það þýðir.`,
      challenge: null,
    },
    {
      id: "m9-l4",
      title: "Plan á alvöru verkefni",
      type: "challenge",
      xp: 40,
      mins: 6,
      content: `Tími til að nota Plan Mode á alvöru.

**Verkefni:** Veldu eitthvað ekki-smávægilegt sem þú vilt bæta við einhverju verkefni þínu, og notaðu Plan Mode til að fá Claude að skipuleggja það.`,
      challenge: {
        prompt: `Hjálpaðu mér að nota Plan Mode skref fyrir skref:

1. Veldu raunverulegt verkefni (ef þú átt verkefni í github.com/notandi nefndu það; ef ekki, ég get notað þetta námskeiðs-repo)
2. Hugsaðu um feature sem snertir 3-5 skrár. Dæmi:
   - "Bæta við dark mode preference í localStorage"
   - "Lagfæra error handling í API kalls"
   - "Bæta við breadcrumbs navigation"
3. Skref fyrir skref, sýndu mér:
   - Hvernig á að opna Claude Code og virkja Plan Mode (Shift+Tab)
   - Nákvæmlega hvað ég á að segja Claude
   - Hverju á að vænta í svari hans
   - Hvernig á að lesa planið og breyta því
4. Útskýrðu af hverju Plan Mode er betra fyrir þetta tilvik en að bara byrja og kóða

Svaraðu á íslensku.`,
        hint: "Plan Mode er sérstaklega gott þegar þú ert nýr með verkefninu eða þegar margar skrár tengjast.",
        template: null,
      },
    },
  ],
};

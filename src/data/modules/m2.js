export const m2 = {
  id: "m2",
  title: "Terminal og skipanir",
  short: "Terminal",
  minutes: 19,
  accent: "#0EA5E9",
  lessons: [
    {
      id: "m2-l1",
      title: "Hvað er terminal?",
      type: "read",
      xp: 10,
      mins: 3,
      content: `# Tölvan án mynda

Terminal (líka kallaður **command line** eða **shell**) er forrit þar sem þú **skrifar skipanir** í stað þess að smella á takka.

Þú slærð inn skipun, ýtir á Enter, tölvan svarar.

\`\`\`
$ ls
Documents  Downloads  Music  Pictures
\`\`\`

Línan með \`$\` er **prompt** — bíður eftir skipun frá þér.

# Af hverju forritarar elska terminal

✅ **Hraðar:** Eitt orð í stað 5 smella
✅ **Endurtekjanleg:** Sömu skipun aftur og aftur
✅ **Skriptubundin:** Hægt að keyra margar skipanir í einu

# Að opna terminal

| Stýrikerfi | Hvernig |
|------------|---------|
| **Mac** | ⌘ + Space → leita "Terminal" → Enter |
| **Linux** | Ctrl + Alt + T |
| **Windows** | Setja upp [WSL](https://learn.microsoft.com/en-us/windows/wsl/) (best fyrir forritun) |

> 💡 Á Mac/Linux notum við **bash** eða **zsh** sem shell. Allar skipanir í þessu námskeiði virka á báðum.`,
      challenge: null,
    },
    {
      id: "m2-l2",
      title: "Hvar er ég?",
      type: "read",
      xp: 10,
      mins: 3,
      content: `Þrjár mikilvægustu skipanirnar:

# pwd — print working directory

Sýnir hvar þú ert núna.

\`\`\`
$ pwd
/Users/arnar
\`\`\`

# ls — list

Sýnir allt sem er í núverandi möppu.

\`\`\`
$ ls
Documents  Downloads  Music  Pictures
\`\`\`

**Útgáfur:**
- \`ls -l\` — meira detail (stærð, dagsetning)
- \`ls -a\` — sýna líka faldar skrár (þær sem byrja á \`.\`)
- \`ls Documents\` — skoða innihald annarrar möppu

# cd — change directory

Færir þig í aðra möppu.

\`\`\`
$ cd Documents
$ pwd
/Users/arnar/Documents
\`\`\`

**Sérstakar slóðir:**
- \`cd ~\` — fer í heimamöppu
- \`cd ..\` — fer eina möppu upp
- \`cd -\` — fer í síðustu möppu

> 🎯 Próf: Opnaðu terminal, gerðu \`pwd\`. Svo \`cd Documents\`, þá \`pwd\` aftur. Sérðu hvernig slóðin breytist?`,
      challenge: null,
    },
    {
      id: "m2-l3",
      title: "Búa til, eyða, flytja",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Búa til

\`\`\`
$ touch hello.txt        # ný tóm skrá
$ mkdir verkefni         # ný mappa
$ mkdir -p djúp/leid/her # ný mappa OG allar foreldra-möppur
\`\`\`

# Skoða og afrita

\`\`\`
$ cp hello.txt copy.txt          # afrita skrá
$ cp -r verkefni/ afrit_verkefni # afrita heila möppu (-r = recursive)
\`\`\`

# Flytja og endurnefna

\`\`\`
$ mv hello.txt nyttnafn.txt        # endurnefna
$ mv hello.txt Documents/          # flytja í aðra möppu
\`\`\`

# Eyða (varúð!)

\`\`\`
$ rm hello.txt        # eyða skrá
$ rm -r mappa/        # eyða heilli möppu
\`\`\`

> ⚠️ **Mikilvægt:** \`rm\` eyðir varanlega — það fer ekki í ruslið. Engin "ctrl+z".
>
> Aldrei keyra \`rm -rf /\` (sem eyðir öllu á diskinum). Sjá það stundum í prakkarastrikum á netinu — ekki gera það.

# Algjör vs hlutleg slóð

\`\`\`
$ cp Documents/foo.txt .          # afrita HING í núverandi möppu
$ cp ~/Pictures/cat.jpg ./bilde/  # afrita í undirmöppu
\`\`\``,
      challenge: null,
    },
    {
      id: "m2-l4",
      title: "Lesa skrár og leita",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Lesa skrá

\`\`\`
$ cat README.md       # prentar alla skrána
$ less README.md      # blaðar (notaðu örvarnar, q til að hætta)
$ head -10 stort.log  # fyrstu 10 línur
$ tail -10 stort.log  # síðustu 10 línur
$ tail -f log.txt     # fylgist með nýjum línum live (Ctrl+C til að hætta)
\`\`\`

# Leita inni í skrám — grep

\`\`\`
$ grep "TODO" src/App.jsx       # finna línur með "TODO"
$ grep -r "TODO" src/           # leita í öllum skrám í src/ (-r = recursive)
$ grep -i "todo" src/App.jsx    # ignore case
$ grep -n "TODO" src/App.jsx    # sýna línunúmer
\`\`\`

# Finna skrár — find

\`\`\`
$ find . -name "*.jsx"          # allar .jsx skrár frá núverandi möppu
$ find . -name "App*"           # nafn byrjar á "App"
$ find . -type d -name "src"    # bara möppur (-type d), heitir "src"
\`\`\`

> 💡 Á nútíma kerfum er **ripgrep** (\`rg\`) hraðari útgáfa af \`grep\`. Claude Code notar oft \`rg\` undir húddinu.`,
      challenge: null,
    },
    {
      id: "m2-l5",
      title: "Þín fyrsta mappa",
      type: "challenge",
      xp: 30,
      mins: 5,
      content: `Tími til að æfa allt sem þú lærðir.

**Verkefni:** Búðu til nýja möppu \`namskeid-test/\`, settu eitthvað í hana, og skoðaðu árangurinn.

Þú getur líka beðið Claude að gera þetta fyrir þig á íslensku — hann skilur skipanirnar.`,
      challenge: {
        prompt: `Hjálpaðu mér að gera þessa æfingu skref fyrir skref:

1. Opnaðu terminal og farðu í heimamöppu (\`cd ~\`)
2. Búðu til nýja möppu \`namskeid-test\`
3. Farðu inn í hana
4. Búðu til skrána \`hello.txt\` með textanum "Halló heimur!" í henni
5. Lestu skrána með \`cat\`
6. Endurnefnu skrána í \`hi.txt\`
7. Eyddu allri möppunni \`namskeid-test\`

Sýndu mér nákvæmlega hvaða skipanir á að nota og hvernig output-ið ætti að líta út.`,
        hint: "Notaðu echo til að skrifa texta í skrá: echo \"Halló heimur!\" > hello.txt",
        template: `cd ~
mkdir namskeid-test
cd namskeid-test
echo "Halló heimur!" > hello.txt
cat hello.txt
mv hello.txt hi.txt
cd ..
rm -r namskeid-test`,
      },
    },
  ],
};

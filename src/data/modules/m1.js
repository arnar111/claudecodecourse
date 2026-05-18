export const m1 = {
  id: "m1",
  title: "Tölvugrunnur",
  short: "Tölvur",
  minutes: 14,
  accent: "#3B82F6",
  lessons: [
    {
      id: "m1-l1",
      title: "Hvað er tölva og kóði?",
      type: "read",
      xp: 10,
      mins: 4,
      content: `# Tölva í einföldu máli

Tölva er vél sem fer eftir leiðbeiningum. Hún tekur **input** (eitthvað sem þú slærð inn), gerir eitthvað við það, og skilar **output** (eitthvað sem þú sérð).

**Dæmi:**
- Þú smellir á 🎵 (input)
- Tölvan opnar Spotify (vinnsla)
- Þú sérð lagalista (output)

# Hvað er kóði?

Kóði er **leiðbeiningar** sem þú skrifar fyrir tölvuna. Eins og uppskrift fyrir mat — en fyrir vélar.

\`\`\`
1. Opnaðu vafrann
2. Farðu á google.com
3. Skrifaðu "veður"
4. Sýndu mér niðurstöður
\`\`\`

Forritarar skrifa kóða á **forritunarmálum** — t.d. JavaScript, Python eða Ruby — sem tölvan svo þýðir yfir í sitt eigið vélamál.

# Hvar kemur Claude Code inn?

Claude Code er **forritari sem skrifar kóða fyrir þig**. Þú segir honum hvað þú vilt á íslensku, og hann skrifar kóðann.

> 🎯 Markmið námskeiðsins: Þú lærir nóg um forritun til að geta beðið Claude um nákvæmlega það sem þú vilt — og skilið svarið.`,
      challenge: null,
    },
    {
      id: "m1-l2",
      title: "Stýrikerfi og forrit",
      type: "read",
      xp: 10,
      mins: 3,
      content: `# Stýrikerfi (Operating System)

Stýrikerfi er **stóra forritið** sem stjórnar tölvunni. Það er það sem þú sérð þegar þú kveikir á henni.

**Þrjú algengustu:**
- **macOS** — á Apple tölvum
- **Windows** — á flestum PC vélum
- **Linux** — opið kerfi, notað af þróunaraðilum og á netþjónum

Þú þarft að vita hvaða stýrikerfi þú ert á því sumar skipanir virka mismunandi.

# Forrit (Applications)

Forrit eru smærri forrit ofan á stýrikerfinu. Spotify, Chrome, VS Code — allt forrit.

**Sérstök forrit fyrir forritara:**
- **Textaritill** — Notepad, TextEdit, VS Code (forritun)
- **Vafri** — Chrome, Firefox, Safari (prófa kóða á netinu)
- **Terminal** — fyrir að skrifa skipanir beint við tölvuna (kemur í næsta module!)

# Claude Code er forrit

Claude Code er forrit sem keyrir í terminal. Þú þarft að setja upp Node.js og svo Claude Code til að nota það. Við förum í uppsetningu seinna.`,
      challenge: null,
    },
    {
      id: "m1-l3",
      title: "Skrár og möppur",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Allt er skrá

Tölvan geymir allt sem **skrár** (files). Tónlist, myndir, kóði — allt.

Hver skrá hefur:
- **Nafn** — t.d. \`myndin.jpg\`
- **Endingu** — \`.jpg\`, \`.txt\`, \`.js\` — segir hvers konar skrá þetta er

# Möppur (directories)

Möppur eru eins og kassar sem geyma skrár. Möppur geta líka geymt aðrar möppur (sem geyma aðrar möppur ...).

\`\`\`
Documents/
├── verkefni/
│   ├── kóði.js
│   └── README.md
└── myndir/
    └── köttur.jpg
\`\`\`

# Slóðir (paths)

Slóð er heimilisfangið á skrá. Tvenns konar:

**Algjör slóð** (absolute) byrjar á \`/\` (Mac/Linux) eða \`C:\\\` (Windows):
\`\`\`
/Users/arnar/Documents/verkefni/kóði.js
\`\`\`

**Hlutleg slóð** (relative) byrjar á því hvar þú ert:
\`\`\`
verkefni/kóði.js
\`\`\`

> 💡 Forritarar nota oftast \`/\` (forward slash) jafnvel á Windows.

# Sérstakar slóðir

| Slóð | Þýðing |
|------|--------|
| \`~\` | Heimamöppan þín (\`/Users/arnar\`) |
| \`.\` | Mappan sem þú ert í núna |
| \`..\` | Mappan fyrir ofan |`,
      challenge: null,
    },
    {
      id: "m1-l4",
      title: "Þú ert hér",
      type: "challenge",
      xp: 25,
      mins: 5,
      content: `Tími til að finna eitthvað á tölvunni þinni.

**Verkefni:** Finndu eina skrá á tölvunni þinni og skrifaðu fulla slóð hennar.

Dæmi:
- Mynd af kettinum: \`/Users/arnar/Pictures/köttur.jpg\`
- README skrá í verkefni: \`/Users/arnar/Documents/lendo/README.md\``,
      challenge: {
        prompt: `Ég er nýbúinn að læra um skrár og möppur. Hjálpaðu mér að:

1. Lýstu fyrir mér í einfaldari orðum hvað þú gerir þegar ég segi:
   "Lestu README.md í verkefninu mínu"
2. Útskýrðu af hverju \`~/verkefni/foo.js\` og \`/Users/arnar/verkefni/foo.js\` geta verið sama skráin
3. Gefðu mér 2-3 dæmi af algengum slóðum sem þú sérð oft á Mac/Linux

Svaraðu á íslensku, einfaldlega.`,
        hint: "Þú getur prófað þetta strax í Claude Code — bara opna terminal og segja: 'Lestu README.md fyrir mig' — Claude finnur skrána sjálfur.",
        template: null,
      },
    },
  ],
};

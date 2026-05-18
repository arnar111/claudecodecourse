export const m4 = {
  id: "m4",
  title: "AI og Claude",
  short: "AI",
  minutes: 14,
  accent: "#A855F7",
  lessons: [
    {
      id: "m4-l1",
      title: "Hvað er AI og LLM?",
      type: "read",
      xp: 10,
      mins: 3,
      content: `# AI í einföldu máli

**AI** (artificial intelligence) er regnhlífar-hugtak yfir tölvur sem gera hluti sem áður þurftu mannshuga.

Þú þekkir AI nú þegar:
- Siri svarar spurningum
- Spotify finnur lög sem þér líkar við
- Google Photos þekkir andlitin þín

# LLM — Large Language Model

LLM er **tegund af AI** sem er sérstaklega góð í **texta**.

Hugsaðu þér mjög stóran prófarkalesara sem hefur lesið milljarða bóka og vefsíðna. Hún:
- Skilur íslensku, ensku, frönsku, kóða, og allt þar á milli
- Spáir fyrir um næsta orð byggt á samhengi
- Getur dregið ályktanir út frá því sem hún hefur lesið

Claude er LLM. ChatGPT er líka LLM. Gemini er LLM.

# Mikilvægur munur

✅ LLM er **mjög góð í texta og samhengi**
❌ LLM **veit ekki um nýja atburði** (eftir cutoff date)
❌ LLM getur **gert mistök** (hún spáir, hún veit ekki alltaf)
❌ LLM hefur **ekki samvisku** — gefur sömu svör fyrir gott og slæmt

> 💡 Þetta er af hverju Claude Code er svona kraftmikill — hann er ekki bara LLM heldur LLM með **verkfærum** (lesa skrá, keyra skipun, osfrv.) sem leyfa honum að gera raunverulega hluti, ekki bara tala um þá.`,
      challenge: null,
    },
    {
      id: "m4-l2",
      title: "Claude family",
      type: "read",
      xp: 10,
      mins: 3,
      content: `# Þrjú stig af Claude

Anthropic (fyrirtækið sem býr til Claude) er með þrjár stærðir:

| Model | Hraði | Greind | Notkun |
|-------|-------|--------|--------|
| **Haiku** | ⚡⚡⚡ | ⭐⭐ | Hraðar, einfaldar fyrirspurnir |
| **Sonnet** | ⚡⚡ | ⭐⭐⭐ | Daglegt vinnumódel |
| **Opus** | ⚡ | ⭐⭐⭐⭐⭐ | Flókin verkefni, planning |

# Hvenær á að nota hvert

**Haiku** — fljót svör, samandregningar, einfaldur kóði
**Sonnet** — flest forritun, almennar fyrirspurnir
**Opus** — flókin arkitektur, langar samtöl, vandasöm vandamál

# Útgáfunúmer

Claude módelin koma í útgáfum: Claude 4.5, 4.6, 4.7, og svo framvegis. Stærri tala = nýrri.

> 💡 Í Claude Code geturðu skipt um model með \`/model\` skipuninni. Sjá m6.

# Hvað ert þú að tala við?

Þetta námskeið notar **Claude Sonnet 4** í AI Partner og CLAUDE.md Smið. Þú sérð model-ið í \`src/lib/api.js\`.`,
      challenge: null,
    },
    {
      id: "m4-l3",
      title: "claude.ai vs Claude Code",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Tvær mismunandi vörur

Anthropic býður upp á margar vörur. Tvær algengustu eru:

## claude.ai — spjallvefurinn

**Eins og ChatGPT.** Þú ferð á [claude.ai](https://claude.ai), skrifar í textaboxið, færð svar.

✅ Frábært fyrir:
- Spurningar
- Skrifa texta
- Skoða myndir og PDF-skjöl
- "Ég er fastur á þessu vandamáli"

❌ Hentar ekki vel fyrir:
- Að breyta skrám á tölvunni þinni
- Að keyra skipanir
- Lengri verkefni þvert á margar skrár

## Claude Code — agent í terminal

**Lifir í terminal-inum þínum.** Hefur **verkfæri**: getur lesið skrár, breytt skrám, keyrt skipanir, talað við önnur forrit.

✅ Frábært fyrir:
- Forritun
- Debug-a kóða
- Setja upp verkefni
- Gera Git commits
- Allt sem fer í gegnum tölvuna

# Tafla yfir muninn

| Atriði | claude.ai | Claude Code |
|--------|-----------|-------------|
| Viðmót | Spjall í vafra | Terminal |
| Aðgangur að skrám | Bara þær sem þú hleður upp | Allt í verkefninu |
| Keyra skipanir | Nei | Já |
| Halda samhengi | Já (innan eins spjalls) | Já (með CLAUDE.md) |
| Verð | Frítt + Pro | Notkunarmiðað (per API token) |

> 🎯 **Hugsanavenja:** claude.ai er **ráðgjafi**. Claude Code er **samstarfsmaður sem situr við hliðina á þér**.`,
      challenge: null,
    },
    {
      id: "m4-l4",
      title: "Velja réttan Claude",
      type: "challenge",
      xp: 25,
      mins: 4,
      content: `Núna þegar þú veist um module og verkfæri, prófaðu að ákveða hvern á að spyrja.

**Verkefni:** Fyrir hverja eftirfarandi aðstöðu, ákveddu: claude.ai eða Claude Code? Og hvaða model (Haiku/Sonnet/Opus)?

1. "Ég vil láta laga typo í README.md í verkefninu mínu"
2. "Útskýrðu fyrir mér hvað þessi mynd af stýringu sýnir"
3. "Skipuleggjið nýtt feature sem snertir 10 skrár í kóðabasisanum"
4. "Stutt samandregning á þessu blog-posti"`,
      challenge: {
        prompt: `Hjálpaðu mér að ákveða fyrir hvert af þessum tilvikum:

1. "Ég vil láta laga typo í README.md í verkefninu mínu" → claude.ai eða Claude Code? Hvaða model?
2. "Útskýrðu fyrir mér hvað þessi mynd af stýringu sýnir" → claude.ai eða Claude Code? Hvaða model?
3. "Skipuleggið nýtt feature sem snertir 10 skrár í kóðabasisanum" → claude.ai eða Claude Code? Hvaða model?
4. "Stutt samandregning á þessu blog-posti" → claude.ai eða Claude Code? Hvaða model?

Útskýrðu af hverju fyrir hvert tilvik.`,
        hint: "Hugsaðu um hvort verkefnið krefst aðgangs að skrám eða ekki, og hvort það sé einfalt vs flókið.",
        template: null,
      },
    },
  ],
};

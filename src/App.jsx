import { useState, useRef } from "react";

const MODULES = [
  {
    id: "m1",
    title: "Grunnur",
    icon: "⚡",
    color: "#E8F4FD",
    accent: "#2563EB",
    lessons: [
      {
        id: "m1-l1",
        title: "Hvað er Claude Code?",
        type: "read",
        xp: 10,
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
    icon: "🔧",
    color: "#F0FDF4",
    accent: "#16A34A",
    lessons: [
      {
        id: "m2-l1",
        title: "Innbyggðar skipanir",
        type: "read",
        xp: 10,
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
    icon: "🧠",
    color: "#FFF7ED",
    accent: "#EA580C",
    lessons: [
      {
        id: "m3-l1",
        title: "Context er allt",
        type: "read",
        xp: 15,
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
    icon: "⚙️",
    color: "#FDF4FF",
    accent: "#9333EA",
    lessons: [
      {
        id: "m4-l1",
        title: "Hvað eru Hooks?",
        type: "read",
        xp: 20,
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
    icon: "🌐",
    color: "#FFF1F2",
    accent: "#DC2626",
    lessons: [
      {
        id: "m5-l1",
        title: "Subagents — Fleiri Claude í senn",
        type: "read",
        xp: 25,
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

function renderInline(text) {
  const segments = [];
  const regex = /(\*\*([^*]+)\*\*)|(`([^`]+)`)/g;
  let lastIdx = 0;
  let key = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      segments.push(text.slice(lastIdx, match.index));
    }
    if (match[2]) {
      segments.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[4]) {
      segments.push(
        <code
          key={key++}
          className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-[0.85em] font-mono"
        >
          {match[4]}
        </code>
      );
    }
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) segments.push(text.slice(lastIdx));
  return segments;
}

function renderContent(text) {
  const lines = text.split("\n");
  const out = [];
  let inCode = false;
  let codeBuf = [];

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (inCode) {
        out.push(
          <pre
            key={`code-${i}`}
            className="bg-slate-900 text-slate-200 rounded-lg p-4 my-3 overflow-x-auto text-xs font-mono whitespace-pre"
          >
            {codeBuf.join("\n")}
          </pre>
        );
        codeBuf = [];
        inCode = false;
      } else {
        inCode = true;
      }
      return;
    }
    if (inCode) {
      codeBuf.push(line);
      return;
    }
    if (line.startsWith("# ")) {
      out.push(
        <h2 key={i} className="text-xl font-bold mt-4 mb-2 text-slate-900">
          {line.slice(2)}
        </h2>
      );
    } else if (line.startsWith("## ")) {
      out.push(
        <h3 key={i} className="text-base font-bold mt-3 mb-1.5 text-slate-700">
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith("> ")) {
      out.push(
        <div
          key={i}
          className="bg-blue-50 border-l-[3px] border-blue-600 px-3 py-2 my-2.5 rounded-r-md text-sm text-blue-900"
        >
          {renderInline(line.slice(2))}
        </div>
      );
    } else if (
      line.startsWith("- ") ||
      line.startsWith("✅ ") ||
      line.startsWith("❌ ")
    ) {
      out.push(
        <div key={i} className="pl-4 py-0.5 text-sm text-slate-700 leading-relaxed">
          {renderInline(line)}
        </div>
      );
    } else if (line.trim() === "") {
      out.push(<div key={i} className="h-2" />);
    } else {
      out.push(
        <p
          key={i}
          className="text-sm text-slate-700 my-1 leading-relaxed"
        >
          {renderInline(line)}
        </p>
      );
    }
  });

  if (inCode && codeBuf.length) {
    out.push(
      <pre
        key="code-end"
        className="bg-slate-900 text-slate-200 rounded-lg p-4 my-3 overflow-x-auto text-xs font-mono whitespace-pre"
      >
        {codeBuf.join("\n")}
      </pre>
    );
  }
  return out;
}

function Btn({ variant = "primary", className = "", children, ...props }) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700",
    success: "bg-green-600 hover:bg-green-700",
    neutral: "bg-gray-500 hover:bg-gray-600",
    danger: "bg-red-600 hover:bg-red-700",
  };
  return (
    <button
      className={`px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

async function callAnthropic({ system, userContent, maxTokens = 1000 }) {
  const resp = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!resp.ok) {
    let detail = `HTTP ${resp.status}`;
    try {
      const body = await resp.json();
      if (body?.error?.message) detail = body.error.message;
    } catch {
      // ignore
    }
    throw new Error(detail);
  }

  const data = await resp.json();
  const text = data.content?.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("Engin svör fengin frá AI.");
  return text;
}

export default function App() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cc_completed") || "{}");
    } catch {
      return {};
    }
  });
  const [xp, setXp] = useState(() => {
    try {
      return parseInt(localStorage.getItem("cc_xp") || "0");
    } catch {
      return 0;
    }
  });
  const [challengeInput, setChallengeInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiError, setAiError] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [view, setView] = useState("course");
  const responseRef = useRef(null);

  const mod = MODULES[activeModule];
  const lesson = mod.lessons[activeLesson];
  const lessonKey = lesson.id;
  const isDone = !!completed[lessonKey];

  const totalXP = MODULES.reduce(
    (s, m) => s + m.lessons.reduce((ls, l) => ls + l.xp, 0),
    0
  );
  const pct = Math.round((xp / totalXP) * 100);
  const completedCount = Object.keys(completed).length;
  const totalLessons = MODULES.reduce((s, m) => s + m.lessons.length, 0);

  function markDone() {
    if (isDone) return;
    const newXp = xp + lesson.xp;
    const newCompleted = { ...completed, [lessonKey]: true };
    setCompleted(newCompleted);
    setXp(newXp);
    try {
      localStorage.setItem("cc_completed", JSON.stringify(newCompleted));
      localStorage.setItem("cc_xp", String(newXp));
    } catch {
      // localStorage getur misheppnast í private browsing — ignore
    }
    setCelebration(true);
    setTimeout(() => setCelebration(false), 2000);
  }

  async function askAI() {
    if (!challengeInput.trim()) return;
    setAiLoading(true);
    setAiResponse("");
    setAiError("");
    try {
      const text = await callAnthropic({
        system: `Þú ert sérfræðingur í Claude Code og kennari.
Þú ert að aðstoða nemanda í gagnvirku Claude Code námskeiði á íslensku.
Gefðu skýrar, praktískar leiðbeiningar.
Notaðu kóðablokkir þar sem við á.
Vertu hvetjandi en nákvæmur.
Svaraðu á vel mótaðri, málfræðilega réttri íslensku.
Stíll: Dev-jargon haldist á ensku (hooks, skills, agents, commit, MCP, terminal),
en notaðu íslensk orð fyrir "session" (lota) og "directory" (mappa).
Forðastu málfræðivillur eins og "drekknar" (rétt: drukknar) og notaðu rétta beygingu fallorða.`,
        userContent: challengeInput,
      });
      setAiResponse(text);
      setTimeout(
        () => responseRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    } catch (e) {
      setAiError(
        e.message?.includes("401") || e.message?.toLowerCase().includes("api key")
          ? "API lykill vantar eða er ógildur. Athugaðu .env skrána."
          : "Villa við að sækja svar. Reyndu aftur."
      );
    } finally {
      setAiLoading(false);
    }
  }

  // CLAUDE.md generator
  const [mdProject, setMdProject] = useState("Lendó");
  const [mdStack, setMdStack] = useState("React, TypeScript, Firebase");
  const [mdBuild, setMdBuild] = useState("npm run dev");
  const [mdTest, setMdTest] = useState("npm test");
  const [mdRules, setMdRules] = useState(
    "ALDREI commita .env skrár\nNota named exports"
  );
  const [generatedMd, setGeneratedMd] = useState("");
  const [mdError, setMdError] = useState("");
  const [mdLoading, setMdLoading] = useState(false);

  async function generateClaudeMd() {
    setMdLoading(true);
    setGeneratedMd("");
    setMdError("");
    try {
      const text = await callAnthropic({
        system: `Þú ert sérfræðingur í Claude Code.
Búðu til fullkomið CLAUDE.md skjal fyrir verkefni.
Fylgdu bestu venjum: undir 200 línur, skýrt, aðeins það sem á við öll verkefni.
Svaraðu EINGÖNGU með markdown innihald skrárinnar — ekkert annað, engin útskýring.`,
        userContent: `Verkefni: ${mdProject}
Stack: ${mdStack}
Build skipun: ${mdBuild}
Test skipun: ${mdTest}
Sérstæðar reglur:
${mdRules}`,
      });
      setGeneratedMd(text);
    } catch (e) {
      setMdError(
        e.message?.includes("401") || e.message?.toLowerCase().includes("api key")
          ? "API lykill vantar eða er ógildur. Athugaðu .env skrána."
          : "Villa. Reyndu aftur."
      );
    } finally {
      setMdLoading(false);
    }
  }

  function copyMd() {
    if (navigator.clipboard && generatedMd) {
      navigator.clipboard.writeText(generatedMd).catch(() => {});
    }
  }

  return (
    <div className="font-sans bg-[#F8F9FA] min-h-screen text-[#111]">
      {/* Celebration */}
      {celebration && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-600 text-white px-7 py-3 rounded-full font-bold text-base z-50 shadow-lg animate-fadeInOut">
          +{lesson.xp} XP 🎉 Vel gert!
        </div>
      )}

      {/* Header */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <div className="text-xl font-bold tracking-tight">
            ⚡ Claude Code á Íslensku
          </div>
          <div className="text-xs text-slate-400 mt-0.5">
            {completedCount}/{totalLessons} kennslustundir · {xp}/{totalXP} XP
          </div>
        </div>
        <div className="w-full sm:w-auto">
          <div className="text-[11px] text-slate-500 mb-1 sm:text-right">
            {pct}%
          </div>
          <div className="bg-slate-800 rounded-full h-2 w-full sm:w-40 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="flex gap-1 px-4 sm:px-6 bg-white border-b border-slate-200 overflow-x-auto">
        <button
          className={`px-3 sm:px-4 py-3 border-b-2 text-sm whitespace-nowrap transition-colors ${
            view === "course"
              ? "font-bold border-blue-600 text-blue-600"
              : "font-normal border-transparent text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => setView("course")}
        >
          📚 Námskeið
        </button>
        <button
          className={`px-3 sm:px-4 py-3 border-b-2 text-sm whitespace-nowrap transition-colors ${
            view === "claudemd"
              ? "font-bold border-blue-600 text-blue-600"
              : "font-normal border-transparent text-slate-500 hover:text-slate-700"
          }`}
          onClick={() => setView("claudemd")}
        >
          📄 CLAUDE.md Smiður
        </button>
      </nav>

      {view === "claudemd" ? (
        <div className="max-w-3xl mx-auto py-6 px-4 sm:px-5">
          <div className="bg-white rounded-xl p-5 sm:p-7 shadow-sm">
            <h2 className="text-xl font-bold mb-1.5">📄 CLAUDE.md Smiður</h2>
            <p className="text-slate-500 mb-6 text-sm">
              Fylltu inn upplýsingar um verkefnið þitt og fáðu tilbúið CLAUDE.md
              skjal.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
              {[
                ["Nafn verkefnis", mdProject, setMdProject],
                ["Tech stack", mdStack, setMdStack],
                ["Build skipun", mdBuild, setMdBuild],
                ["Test skipun", mdTest, setMdTest],
              ].map(([label, val, setter]) => (
                <div key={label}>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {label}
                  </label>
                  <input
                    className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Sérstæðar reglur (ein á línu)
              </label>
              <textarea
                className="w-full min-h-[80px] border border-slate-200 rounded-lg p-3 text-sm font-sans resize-y outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={mdRules}
                onChange={(e) => setMdRules(e.target.value)}
              />
            </div>
            <Btn onClick={generateClaudeMd} disabled={mdLoading}>
              {mdLoading ? "Er að smíða..." : "⚡ Búa til CLAUDE.md"}
            </Btn>
            {mdError && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg px-3.5 py-2.5 text-sm">
                {mdError}
              </div>
            )}
            {generatedMd && (
              <div className="mt-5">
                <div className="flex justify-between items-center mb-2 gap-2">
                  <strong className="text-sm">
                    Niðurstaðan — afritaðu þetta í CLAUDE.md:
                  </strong>
                  <Btn
                    variant="neutral"
                    className="!px-3.5 !py-1.5 !text-xs"
                    onClick={copyMd}
                  >
                    Afrita
                  </Btn>
                </div>
                <pre className="bg-slate-900 text-slate-200 rounded-lg p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                  {generatedMd}
                </pre>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row max-w-5xl mx-auto p-4 sm:p-5 gap-4 md:gap-5">
          {/* Sidebar */}
          <aside className="w-full md:w-64 md:flex-shrink-0">
            {MODULES.map((m, mi) => {
              const doneInMod = m.lessons.filter((l) => completed[l.id]).length;
              const isActive = mi === activeModule;
              return (
                <div key={m.id}>
                  <div
                    className="rounded-lg p-3 mb-2 cursor-pointer transition-colors border-2"
                    style={{
                      backgroundColor: isActive ? m.accent : "#fff",
                      color: isActive ? "#fff" : "#374151",
                      borderColor: isActive ? m.accent : "#e2e8f0",
                    }}
                    onClick={() => {
                      setActiveModule(mi);
                      setActiveLesson(0);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{m.icon}</span>
                      <div>
                        <div className="text-xs font-bold">{m.title}</div>
                        <div className="text-[11px] opacity-80">
                          {doneInMod}/{m.lessons.length} lokið
                        </div>
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <div className="mb-3 pl-1">
                      {m.lessons.map((l, li) => {
                        const isActiveLesson = li === activeLesson;
                        const isDoneLesson = !!completed[l.id];
                        return (
                          <div
                            key={l.id}
                            className={`px-3 py-2 rounded-md mb-1 cursor-pointer text-xs flex items-center gap-1.5 border-l-[3px] transition-colors ${
                              isActiveLesson
                                ? "bg-blue-50 text-blue-700 border-blue-600"
                                : isDoneLesson
                                  ? "bg-green-50 text-slate-700 border-green-600"
                                  : "border-transparent text-slate-700 hover:bg-slate-50"
                            }`}
                            onClick={() => setActiveLesson(li)}
                          >
                            <span>
                              {isDoneLesson
                                ? "✅"
                                : l.type === "challenge"
                                  ? "🎯"
                                  : "📖"}
                            </span>
                            <span>{l.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-xl p-5 sm:p-7 shadow-sm">
              {/* Lesson header */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: mod.color, color: mod.accent }}
                >
                  {mod.icon} {mod.title}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    lesson.type === "challenge"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {lesson.type === "challenge" ? "🎯 Verkefni" : "📖 Lestur"} ·{" "}
                  {lesson.xp} XP
                </span>
                {isDone && (
                  <span className="text-green-600 font-bold text-xs">
                    ✅ Lokið
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold mb-5 leading-snug">
                {lesson.title}
              </h1>

              <div>{renderContent(lesson.content)}</div>

              {/* Challenge */}
              {lesson.challenge && (
                <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-4 sm:p-5 mt-5">
                  <div className="font-bold text-base mb-3 text-amber-800">
                    🎯 Reyndu þetta í raunveruleikanum
                  </div>

                  {lesson.challenge.hint && (
                    <div className="bg-amber-50 border border-amber-300 rounded-md px-3.5 py-2.5 mb-3.5 text-xs text-amber-800">
                      💡 <strong>Ábending:</strong> {lesson.challenge.hint}
                    </div>
                  )}

                  {lesson.challenge.template && (
                    <div className="mb-3.5">
                      <Btn
                        variant="neutral"
                        className="!px-3.5 !py-1.5 !text-xs mb-2"
                        onClick={() => setShowTemplate(!showTemplate)}
                      >
                        {showTemplate ? "Fela sniðmát" : "Sjá sniðmát"}
                      </Btn>
                      {showTemplate && (
                        <pre className="bg-slate-900 text-slate-200 rounded-lg p-4 text-xs font-mono whitespace-pre-wrap overflow-x-auto">
                          {lesson.challenge.template}
                        </pre>
                      )}
                    </div>
                  )}

                  <div className="text-xs text-slate-700 mb-2.5 leading-relaxed">
                    Prófaðu þetta og lýstu hvað gerðist, eða spyrðu ef þú lendir
                    í vanda:
                  </div>
                  <textarea
                    className="w-full min-h-[100px] border border-slate-200 rounded-lg p-3 text-sm font-sans resize-y outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={challengeInput}
                    onChange={(e) => setChallengeInput(e.target.value)}
                    placeholder={lesson.challenge.prompt}
                  />
                  <div className="flex flex-wrap gap-2.5 mt-2.5">
                    <Btn
                      onClick={askAI}
                      disabled={aiLoading || !challengeInput.trim()}
                    >
                      {aiLoading ? "Er að spyrja..." : "⚡ Spyrja AI kennara"}
                    </Btn>
                    {!isDone && (
                      <Btn variant="success" onClick={markDone}>
                        ✅ Ég hef prófað þetta (+{lesson.xp} XP)
                      </Btn>
                    )}
                  </div>

                  {aiLoading && (
                    <div className="mt-4 text-slate-500 text-sm">
                      Kennari er að svara...
                    </div>
                  )}

                  {aiError && (
                    <div className="mt-4 bg-red-50 border border-red-200 text-red-800 rounded-lg px-3.5 py-2.5 text-sm">
                      {aiError}
                    </div>
                  )}

                  {aiResponse && (
                    <div
                      ref={responseRef}
                      className="mt-4 bg-white border border-slate-200 rounded-lg p-4.5"
                    >
                      <div className="font-bold text-xs text-slate-700 mb-2.5">
                        🤖 Svar kennara:
                      </div>
                      <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                        {aiResponse}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {lesson.type === "read" && !isDone && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <Btn variant="success" onClick={markDone}>
                    ✅ Lesið og skilið (+{lesson.xp} XP)
                  </Btn>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-7 pt-5 border-t border-slate-100 gap-2">
                <Btn
                  variant="neutral"
                  disabled={activeModule === 0 && activeLesson === 0}
                  onClick={() => {
                    if (activeLesson > 0) {
                      setActiveLesson((l) => l - 1);
                    } else if (activeModule > 0) {
                      const prevMod = MODULES[activeModule - 1];
                      setActiveModule((m) => m - 1);
                      setActiveLesson(prevMod.lessons.length - 1);
                    }
                  }}
                >
                  ← Fyrri
                </Btn>
                <Btn
                  disabled={
                    activeModule === MODULES.length - 1 &&
                    activeLesson === mod.lessons.length - 1
                  }
                  onClick={() => {
                    if (activeLesson < mod.lessons.length - 1) {
                      setActiveLesson((l) => l + 1);
                    } else if (activeModule < MODULES.length - 1) {
                      setActiveModule((m) => m + 1);
                      setActiveLesson(0);
                    }
                  }}
                >
                  Næsta →
                </Btn>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

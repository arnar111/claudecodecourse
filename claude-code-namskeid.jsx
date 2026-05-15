import { useState, useEffect, useRef } from "react";

// ── Námsefni ─────────────────────────────────────────────────────────────────

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
        content: `Claude Code er AI verkfæri sem lifir í terminal-inum þínum. Þetta er **ekki** venjuleg spjallforrit — þetta er agent sem getur:

- Lesið og breytt skrám
- Keyrt bash skipanir
- Skoðað codebase þinn
- Unnið með Git
- Kallað á MCP servers (ytri þjónustur)

Hugsuðu þér það eins og að hafa mjög hæfan forritara sem situr við hliðina á þér, sér allt sem þú sérð, og getur gert hlutina sjálfur.

**Hvernig er þetta öðruvísi en claude.ai?**
claude.ai er spjall. Claude Code er **agent** — hann getur tekið aðgerðir, ekki bara svarað spurningum.`,
        challenge: null,
      },
      {
        id: "m1-l2",
        title: "CLAUDE.md — Minni Claudes",
        type: "read",
        xp: 15,
        content: `CLAUDE.md er eins og að kynna Claude fyrir verkefnið þitt í upphafi hvers session.

**Mikilvægasta reglan:** Claude man ekkert á milli sessions. Þetta skjal er það eina sem heldur samhenginu.

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

**Session stjórnun:**
- \`/clear\` — hreinsar samtal (mikilvægt! context drekknar)
- \`/compact\` — þjappar saman löngu samtali
- \`/context\` — sér hversu mikið context er notað

**Greining:**
- \`/init\` — býr til CLAUDE.md sjálfkrafa
- \`/doctor\` — greinir vandamál (of margar skills, osf.)
- \`/model\` — skiptir um model (Opus fyrir planning, Sonnet fyrir kóða)

**Vinnu flow:**
- \`/branch\` — greinir samtal í nýja session (fyrr: /fork)
- \`/hooks\` — setur upp hooks með viðmóti
- \`/review\` — kóðayfirlestur

**💡 ADHD tip:** \`/compact\` þegar þú finnur að Claude er farinn að gleymast eða endurtaka sig.`,
        challenge: null,
      },
      {
        id: "m2-l2",
        title: "Skills — Custom skipanir",
        type: "read",
        xp: 15,
        content: `Skills eru þínar eigin skipanir. Þú skrifar þær í Markdown og Claude les þær.

**Hvar eru þær:**
\`\`.claude/skills/nafn-skills/SKILL.md\`\` — fyrir þetta verkefni
\`\`~/.claude/skills/nafn-skills/SKILL.md\`\` — fyrir öll verkefni

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
        content: `Claude Code hefur ekkert minni á milli sessions. Allt sem þú vilt að hann viti þarf að vera í context-inum.

**Hvernig context safnast:**
1. CLAUDE.md (alltaf)
2. Skills sem eru invoked
3. Samtalssaga
4. Skrár sem þú @-nefnir

**Vandinn: Context drekknar**
Eftir langa session byrjar Claude að:
- Gleyma fyrstu leiðbeiningum
- Endurtaka sig
- Hunsa CLAUDE.md reglur

**Lausnir:**
- \`/clear\` — byrja upp á nýtt
- \`/compact\` — þjappa saman án þess að missa samhengi
- \`/branch\` — greina í nýja session fyrir nýtt verkefni

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

**Mikilvægt:** Hvert agent þarf sitt eigið directory til að vera óháð. Þetta líkist mjög OpenClaw uppbyggingunni þinni!

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

// ── Aðal App ──────────────────────────────────────────────────────────────────

export default function ClaudeCodeNamskeid() {
  const [activeModule, setActiveModule] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cc_completed") || "{}"); }
    catch { return {}; }
  });
  const [xp, setXp] = useState(() => {
    try { return parseInt(localStorage.getItem("cc_xp") || "0"); }
    catch { return 0; }
  });
  const [challengeInput, setChallengeInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const [view, setView] = useState("course"); // "course" | "claudemd"
  const responseRef = useRef(null);

  const mod = MODULES[activeModule];
  const lesson = mod.lessons[activeLesson];
  const lessonKey = lesson.id;
  const isDone = !!completed[lessonKey];

  const totalXP = MODULES.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.xp, 0), 0);
  const pct = Math.round((xp / totalXP) * 100);

  function markDone() {
    if (isDone) return;
    const newXp = xp + lesson.xp;
    const newCompleted = { ...completed, [lessonKey]: true };
    setCompleted(newCompleted);
    setXp(newXp);
    try {
      localStorage.setItem("cc_completed", JSON.stringify(newCompleted));
      localStorage.setItem("cc_xp", String(newXp));
    } catch {}
    setCelebration(true);
    setTimeout(() => setCelebration(false), 2000);
  }

  async function askAI() {
    if (!challengeInput.trim()) return;
    setAiLoading(true);
    setAiResponse("");
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Þú ert sérfræðingur í Claude Code og kennari. 
Þú ert að aðstoða nemanda í gagnvirku Claude Code námskeiði á íslensku.
Gefðu skýrar, praktískar leiðbeiningar. 
Notaðu kóðablokkir þar sem við á.
Vertu hvetjandi en nákvæmur.
Svaraðu á íslensku.`,
          messages: [{ role: "user", content: challengeInput }],
        }),
      });
      const data = await resp.json();
      const text = data.content?.find(b => b.type === "text")?.text || "Engin svör fengin.";
      setAiResponse(text);
      setTimeout(() => responseRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    } catch (e) {
      setAiResponse("Villa við að sækja svar. Reyndu aftur.");
    }
    setAiLoading(false);
  }

  const completedCount = Object.keys(completed).length;
  const totalLessons = MODULES.reduce((s, m) => s + m.lessons.length, 0);

  // CLAUDE.md generator
  const [mdProject, setMdProject] = useState("Lendó");
  const [mdStack, setMdStack] = useState("React, TypeScript, Firebase");
  const [mdBuild, setMdBuild] = useState("npm run dev");
  const [mdTest, setMdTest] = useState("npm test");
  const [mdRules, setMdRules] = useState("ALDREI commita .env skrár\nNota named exports");
  const [generatedMd, setGeneratedMd] = useState("");
  const [mdLoading, setMdLoading] = useState(false);

  async function generateClaudeMd() {
    setMdLoading(true);
    setGeneratedMd("");
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `Þú ert sérfræðingur í Claude Code. 
Búðu til fullkomið CLAUDE.md skjal fyrir verkefni.
Fylgdu bestu venjum: undir 200 línur, skýrt, aðeins það sem á við öll verkefni.
Svaraðu EINGÖNGU með markdown innihald skrárinnar — ekkert annað, engin útskýring.`,
          messages: [{
            role: "user",
            content: `Verkefni: ${mdProject}
Stack: ${mdStack}
Build skipun: ${mdBuild}
Test skipun: ${mdTest}
Sérstæðar reglur:
${mdRules}`
          }],
        }),
      });
      const data = await resp.json();
      const text = data.content?.find(b => b.type === "text")?.text || "";
      setGeneratedMd(text);
    } catch { setGeneratedMd("Villa. Reyndu aftur."); }
    setMdLoading(false);
  }

  function renderContent(text) {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("# ")) return <h2 key={i} style={{ fontSize: 22, fontWeight: 700, margin: "16px 0 8px", color: "#111" }}>{line.slice(2)}</h2>;
      if (line.startsWith("## ")) return <h3 key={i} style={{ fontSize: 17, fontWeight: 700, margin: "14px 0 6px", color: "#333" }}>{line.slice(3)}</h3>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontWeight: 700, margin: "8px 0 4px", fontSize: 15 }}>{line.slice(2, -2)}</p>;
      if (line.startsWith("> ")) return (
        <div key={i} style={{ background: "#f0f9ff", borderLeft: "3px solid #2563EB", padding: "8px 12px", margin: "10px 0", borderRadius: "0 6px 6px 0", fontSize: 14, color: "#1e40af" }}>
          {line.slice(2).replace(/\*\*/g, "")}
        </div>
      );
      if (line.startsWith("- ") || line.startsWith("✅ ") || line.startsWith("❌ ")) {
        const clean = line.replace(/\*\*/g, "");
        return <div key={i} style={{ padding: "2px 0 2px 16px", fontSize: 14, color: "#374151" }}>{clean}</div>;
      }
      if (line.startsWith("```")) return null;
      if (line.trim() === "") return <div key={i} style={{ height: 8 }} />;
      const bold = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} style={{ fontSize: 14, color: "#374151", margin: "3px 0", lineHeight: 1.7 }}>
          {bold.map((b, j) => j % 2 === 1 ? <strong key={j}>{b}</strong> : b.replace(/`([^`]+)`/g, "$1"))}
        </p>
      );
    });
  }

  const styles = {
    app: { fontFamily: "'IBM Plex Sans', 'Helvetica Neue', sans-serif", background: "#F8F9FA", minHeight: "100vh", color: "#111" },
    header: { background: "#0F172A", color: "#fff", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    headerTitle: { fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" },
    xpBar: { background: "#1e293b", borderRadius: 20, height: 8, width: 160, overflow: "hidden" },
    xpFill: { background: "linear-gradient(90deg, #3B82F6, #8B5CF6)", height: "100%", borderRadius: 20, transition: "width 0.5s ease" },
    nav: { display: "flex", gap: 4, padding: "0 24px", background: "#fff", borderBottom: "1px solid #e2e8f0" },
    navBtn: (active) => ({ padding: "12px 16px", border: "none", background: "none", fontWeight: active ? 700 : 400, borderBottom: active ? "2px solid #2563EB" : "2px solid transparent", color: active ? "#2563EB" : "#64748b", cursor: "pointer", fontSize: 14, transition: "all 0.15s" }),
    layout: { display: "flex", maxWidth: 1100, margin: "0 auto", padding: 20, gap: 20 },
    sidebar: { width: 260, flexShrink: 0 },
    modCard: (active, accent) => ({ background: active ? accent : "#fff", color: active ? "#fff" : "#374151", border: `2px solid ${active ? accent : "#e2e8f0"}`, borderRadius: 10, padding: "12px 14px", marginBottom: 8, cursor: "pointer", transition: "all 0.15s" }),
    lessonItem: (active, done) => ({ padding: "8px 12px", borderRadius: 7, marginBottom: 3, cursor: "pointer", background: active ? "#EFF6FF" : done ? "#f0fdf4" : "transparent", borderLeft: active ? "3px solid #2563EB" : done ? "3px solid #16A34A" : "3px solid transparent", fontSize: 13, color: active ? "#1d4ed8" : "#374151", display: "flex", alignItems: "center", gap: 6 }),
    main: { flex: 1, minWidth: 0 },
    card: { background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
    challengeBox: { background: "#F8FAFC", border: "2px dashed #CBD5E1", borderRadius: 10, padding: 20, marginTop: 20 },
    textarea: { width: "100%", minHeight: 100, border: "1px solid #e2e8f0", borderRadius: 8, padding: 12, fontSize: 14, fontFamily: "inherit", resize: "vertical", outline: "none", boxSizing: "border-box" },
    btn: (color) => ({ background: color || "#2563EB", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14, transition: "opacity 0.15s" }),
    codeBlock: { background: "#0F172A", color: "#e2e8f0", borderRadius: 8, padding: 16, fontFamily: "monospace", fontSize: 13, overflow: "auto", margin: "10px 0" },
    input: { width: "100%", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  };

  return (
    <div style={styles.app}>
      {/* Celebration */}
      {celebration && (
        <div style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", background: "#16A34A", color: "#fff", padding: "12px 28px", borderRadius: 30, fontWeight: 700, fontSize: 16, zIndex: 100, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", animation: "fadeInOut 2s" }}>
          +{lesson.xp} XP 🎉 Vel gert!
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.headerTitle}>⚡ Claude Code á Íslensku</div>
          <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{completedCount}/{totalLessons} kennslustundir · {xp}/{totalXP} XP</div>
        </div>
        <div>
          <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4, textAlign: "right" }}>{pct}%</div>
          <div style={styles.xpBar}><div style={{ ...styles.xpFill, width: `${pct}%` }} /></div>
        </div>
      </div>

      {/* Nav */}
      <div style={styles.nav}>
        <button style={styles.navBtn(view === "course")} onClick={() => setView("course")}>📚 Námskeið</button>
        <button style={styles.navBtn(view === "claudemd")} onClick={() => setView("claudemd")}>📄 CLAUDE.md Smiður</button>
      </div>

      {view === "claudemd" ? (
        /* CLAUDE.md Generator */
        <div style={{ maxWidth: 800, margin: "24px auto", padding: "0 20px" }}>
          <div style={styles.card}>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>📄 CLAUDE.md Smiður</h2>
            <p style={{ color: "#64748b", marginBottom: 24, fontSize: 14 }}>Fylltu inn upplýsingar um verkefnið þitt og fáðu tilbúið CLAUDE.md skjal.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              {[
                ["Nafn verkefnis", mdProject, setMdProject],
                ["Tech stack", mdStack, setMdStack],
                ["Build skipun", mdBuild, setMdBuild],
                ["Test skipun", mdTest, setMdTest],
              ].map(([label, val, setter]) => (
                <div key={label}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>{label}</label>
                  <input style={styles.input} value={val} onChange={e => setter(e.target.value)} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Sérstæðar reglur (ein á línu)</label>
              <textarea style={{ ...styles.textarea, minHeight: 80 }} value={mdRules} onChange={e => setMdRules(e.target.value)} />
            </div>
            <button style={styles.btn()} onClick={generateClaudeMd} disabled={mdLoading}>
              {mdLoading ? "Sé að smíða..." : "⚡ Búa til CLAUDE.md"}
            </button>
            {generatedMd && (
              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <strong style={{ fontSize: 14 }}>Niðurstaðan — afritaðu þetta í CLAUDE.md:</strong>
                  <button style={{ ...styles.btn("#6B7280"), padding: "6px 14px", fontSize: 12 }} onClick={() => navigator.clipboard?.writeText(generatedMd)}>Afrita</button>
                </div>
                <div style={styles.codeBlock}><pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>{generatedMd}</pre></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Námskeið */
        <div style={styles.layout}>
          {/* Sidebar */}
          <div style={styles.sidebar}>
            {MODULES.map((m, mi) => {
              const doneInMod = m.lessons.filter(l => completed[l.id]).length;
              return (
                <div key={m.id}>
                  <div style={styles.modCard(mi === activeModule, m.accent)} onClick={() => { setActiveModule(mi); setActiveLesson(0); }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 18 }}>{m.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{m.title}</div>
                        <div style={{ fontSize: 11, opacity: 0.8 }}>{doneInMod}/{m.lessons.length} lokið</div>
                      </div>
                    </div>
                  </div>
                  {mi === activeModule && (
                    <div style={{ marginBottom: 12, paddingLeft: 4 }}>
                      {m.lessons.map((l, li) => (
                        <div key={l.id} style={styles.lessonItem(li === activeLesson, !!completed[l.id])} onClick={() => setActiveLesson(li)}>
                          <span>{completed[l.id] ? "✅" : l.type === "challenge" ? "🎯" : "📖"}</span>
                          <span>{l.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Main content */}
          <div style={styles.main}>
            <div style={styles.card}>
              {/* Lesson header */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <span style={{ background: mod.color, color: mod.accent, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  {mod.icon} {mod.title}
                </span>
                <span style={{ background: lesson.type === "challenge" ? "#FEF3C7" : "#F1F5F9", color: lesson.type === "challenge" ? "#92400E" : "#64748b", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                  {lesson.type === "challenge" ? "🎯 Verkefni" : "📖 Lestur"} · {lesson.xp} XP
                </span>
                {isDone && <span style={{ color: "#16A34A", fontWeight: 700, fontSize: 13 }}>✅ Lokið</span>}
              </div>

              <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 20, lineHeight: 1.3 }}>{lesson.title}</h1>

              {/* Content */}
              <div>{renderContent(lesson.content)}</div>

              {/* Challenge box */}
              {lesson.challenge && (
                <div style={styles.challengeBox}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 12, color: "#92400E" }}>🎯 Reyndu þetta í raunveruleikanum</div>

                  {lesson.challenge.hint && (
                    <div style={{ background: "#FFFBEB", border: "1px solid #FCD34D", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#92400E" }}>
                      💡 <strong>Ábending:</strong> {lesson.challenge.hint}
                    </div>
                  )}

                  {lesson.challenge.template && (
                    <div style={{ marginBottom: 14 }}>
                      <button style={{ ...styles.btn("#6B7280"), padding: "6px 14px", fontSize: 12, marginBottom: 8 }} onClick={() => setShowTemplate(!showTemplate)}>
                        {showTemplate ? "Fela sniðmát" : "Sjá sniðmát"}
                      </button>
                      {showTemplate && <div style={styles.codeBlock}><pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "monospace", fontSize: 12 }}>{lesson.challenge.template}</pre></div>}
                    </div>
                  )}

                  <div style={{ fontSize: 13, color: "#374151", marginBottom: 10, lineHeight: 1.6 }}>
                    Prófaðu þetta og lýstu hvað gerðist, eða spyrðu ef þú lendir í vanda:
                  </div>
                  <textarea
                    style={styles.textarea}
                    value={challengeInput}
                    onChange={e => setChallengeInput(e.target.value)}
                    placeholder={lesson.challenge.prompt}
                  />
                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button style={styles.btn()} onClick={askAI} disabled={aiLoading || !challengeInput.trim()}>
                      {aiLoading ? "Sé að spyrja..." : "⚡ Spyrja AI kennara"}
                    </button>
                    {!isDone && (
                      <button style={styles.btn("#16A34A")} onClick={markDone}>
                        ✅ Ég hef prófað þetta (+{lesson.xp} XP)
                      </button>
                    )}
                  </div>

                  {aiLoading && (
                    <div style={{ marginTop: 16, color: "#64748b", fontSize: 14 }}>Kennari er að svara...</div>
                  )}

                  {aiResponse && (
                    <div ref={responseRef} style={{ marginTop: 16, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: 18 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 10 }}>🤖 Svar kennara:</div>
                      <div style={{ fontSize: 14, lineHeight: 1.7, color: "#374151", whiteSpace: "pre-wrap" }}>{aiResponse}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Mark done for read lessons */}
              {lesson.type === "read" && !isDone && (
                <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
                  <button style={styles.btn("#16A34A")} onClick={markDone}>✅ Lesið og skilið (+{lesson.xp} XP)</button>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 20, borderTop: "1px solid #f1f5f9" }}>
                <button
                  style={{ ...styles.btn("#6B7280"), opacity: (activeModule === 0 && activeLesson === 0) ? 0.4 : 1 }}
                  disabled={activeModule === 0 && activeLesson === 0}
                  onClick={() => {
                    if (activeLesson > 0) { setActiveLesson(l => l - 1); }
                    else if (activeModule > 0) { setActiveModule(m => m - 1); setActiveLesson(MODULES[activeModule - 1].lessons.length - 1); }
                  }}
                >← Fyrri</button>
                <button
                  style={{ ...styles.btn(), opacity: (activeModule === MODULES.length - 1 && activeLesson === mod.lessons.length - 1) ? 0.4 : 1 }}
                  disabled={activeModule === MODULES.length - 1 && activeLesson === mod.lessons.length - 1}
                  onClick={() => {
                    if (activeLesson < mod.lessons.length - 1) { setActiveLesson(l => l + 1); }
                    else if (activeModule < MODULES.length - 1) { setActiveModule(m => m + 1); setActiveLesson(0); }
                  }}
                >Næsta →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInOut { 0% { opacity: 0; transform: translateX(-50%) translateY(-10px); } 15% { opacity: 1; transform: translateX(-50%) translateY(0); } 85% { opacity: 1; } 100% { opacity: 0; } }
        button:hover { opacity: 0.88; }
        * { box-sizing: border-box; }
      `}</style>
    </div>
  );
}

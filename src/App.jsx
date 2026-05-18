import { useState, useRef, useEffect } from "react";
import { MODULES, TOTAL_XP, TOTAL_LESSONS } from "./data/modules";
import { CLASSES } from "./data/classes";
import { I, moduleIcons, PixelChar } from "./components/Icons";
import { getPalette, getShadowScale, alphaHex } from "./lib/theme";
import { callAnthropic, TEACHER_SYSTEM_PROMPT, CLAUDEMD_SYSTEM_PROMPT } from "./lib/api";

// ── Storage helpers ──────────────────────────────────────────────────────────

function safeGet(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v == null ? fallback : JSON.parse(v);
  } catch {
    return fallback;
  }
}
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // private browsing
  }
}
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

// ── Content rendering ────────────────────────────────────────────────────────

function renderInline(text) {
  const segments = [];
  const regex = /(\*\*([^*]+)\*\*)|(`([^`]+)`)/g;
  let lastIdx = 0;
  let key = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) segments.push(text.slice(lastIdx, match.index));
    if (match[2]) segments.push(<strong key={key++}>{match[2]}</strong>);
    else if (match[4])
      segments.push(
        <code key={key++} className="arc2-kbd">
          {match[4]}
        </code>
      );
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) segments.push(text.slice(lastIdx));
  return segments;
}

function renderLessonContent(text) {
  const lines = text.split("\n");
  const out = [];
  let inCode = false;
  let codeBuf = [];

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (inCode) {
        out.push(
          <pre key={`code-${i}`} className="arc2-code">
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
        <h2 key={i} className="arc2-lesson-h2">
          {line.slice(2)}
        </h2>
      );
    } else if (line.startsWith("## ")) {
      out.push(
        <h3 key={i}>
          <I.chevron size={14} />
          {line.slice(3)}
        </h3>
      );
    } else if (line.startsWith("> ")) {
      out.push(
        <div key={i} className="arc2-callout">
          <span className="ic">
            <I.sparkle size={16} />
          </span>
          <span>{renderInline(line.slice(2))}</span>
        </div>
      );
    } else if (line.startsWith("- ") || line.startsWith("✅ ") || line.startsWith("❌ ")) {
      out.push(
        <div key={i} className="arc2-li">
          {renderInline(line)}
        </div>
      );
    } else if (line.trim() === "") {
      out.push(<div key={i} className="arc2-gap" />);
    } else {
      out.push(<p key={i}>{renderInline(line)}</p>);
    }
  });

  if (inCode && codeBuf.length) {
    out.push(
      <pre key="code-end" className="arc2-code">
        {codeBuf.join("\n")}
      </pre>
    );
  }
  return out;
}

// ── Helpers for finding lessons ──────────────────────────────────────────────

function findNextLesson(completed) {
  for (let mi = 0; mi < MODULES.length; mi++) {
    const m = MODULES[mi];
    for (let li = 0; li < m.lessons.length; li++) {
      if (!completed[m.lessons[li].id]) {
        return { moduleIndex: mi, lessonIndex: li, module: m, lesson: m.lessons[li] };
      }
    }
  }
  return null;
}

function findLessonById(id) {
  for (let mi = 0; mi < MODULES.length; mi++) {
    const m = MODULES[mi];
    for (let li = 0; li < m.lessons.length; li++) {
      if (m.lessons[li].id === id) {
        return { moduleIndex: mi, lessonIndex: li, module: m, lesson: m.lessons[li] };
      }
    }
  }
  return null;
}

// ── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  // Navigation
  const [screen, setScreen] = useState("home");
  const [activeLessonId, setActiveLessonId] = useState(null);

  // Tweaks (persisted)
  const initialTweaks = safeGet("cc_tweaks", {
    dark: false,
    intensity: 1,
    motion: true,
    warmth: 1,
  });
  const [dark, setDark] = useState(initialTweaks.dark);
  const [intensity, setIntensity] = useState(initialTweaks.intensity);
  const [motion, setMotion] = useState(initialTweaks.motion);
  const [warmth, setWarmth] = useState(initialTweaks.warmth);
  const [showTweaks, setShowTweaks] = useState(false);

  // Class (persisted)
  const [classId, setClassId] = useState(safeGet("cc_class", "mage"));

  // Progress (persisted)
  const [completed, setCompleted] = useState(safeGet("cc_completed", {}));
  const [xp, setXp] = useState(() => parseInt(safeGet("cc_xp", 0)) || 0);
  const [displayXp, setDisplayXp] = useState(xp);
  const [streak, setStreak] = useState(
    safeGet("cc_streak", { count: 0, lastDay: null })
  );
  const [streakShield, setStreakShield] = useState(false);

  // Transient FX
  const [combo, setCombo] = useState(null); // { xp, label }
  const [tickKey, setTickKey] = useState(0);

  // Lesson / challenge
  const [challengeInput, setChallengeInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [aiError, setAiError] = useState("");
  const [aiState, setAiState] = useState("idle"); // idle | typing | answered
  const [showTemplate, setShowTemplate] = useState(false);

  // CLAUDE.md generator
  const [mdProject, setMdProject] = useState("Lendó");
  const [mdStack, setMdStack] = useState("React, TypeScript, Firebase");
  const [mdBuild, setMdBuild] = useState("npm run dev");
  const [mdTest, setMdTest] = useState("npm test");
  const [mdRules, setMdRules] = useState("ALDREI commita .env skrár\nNota named exports");
  const [generatedMd, setGeneratedMd] = useState("");
  const [mdError, setMdError] = useState("");
  const [mdLoading, setMdLoading] = useState(false);

  // ── Persistence ───────────────────────────────────────────────────────────
  useEffect(() => safeSet("cc_tweaks", { dark, intensity, motion, warmth }), [
    dark,
    intensity,
    motion,
    warmth,
  ]);
  useEffect(() => safeSet("cc_class", classId), [classId]);
  useEffect(() => safeSet("cc_completed", completed), [completed]);
  useEffect(() => safeSet("cc_xp", xp), [xp]);
  useEffect(() => safeSet("cc_streak", streak), [streak]);

  // Reset transient state when changing screen or lesson
  useEffect(() => {
    setChallengeInput("");
    setAiResponse("");
    setAiError("");
    setAiState("idle");
    setShowTemplate(false);
  }, [activeLessonId, screen]);

  // ── Computed values ────────────────────────────────────────────────────────
  const C = getPalette({ dark, warmth });
  const selectedClass = CLASSES[classId];
  const shadowScale = getShadowScale(intensity);
  const level = Math.floor(displayXp / 50) + 1;
  const completedCount = Object.keys(completed).filter((k) => completed[k]).length;
  const pct = Math.round((completedCount / TOTAL_LESSONS) * 100);
  const xpPct = Math.round((xp / TOTAL_XP) * 100);

  const next = findNextLesson(completed);
  const activeLesson =
    activeLessonId != null ? findLessonById(activeLessonId) : next;

  // Determine which module is "current" for stage select
  const currentModuleIndex = next ? next.moduleIndex : MODULES.length - 1;

  // ── Actions ────────────────────────────────────────────────────────────────
  function triggerCombo(baseXp, label) {
    let totalXp = baseXp;
    if (classId === "explorer" && label?.includes("AI")) totalXp += 5;

    setCombo({ xp: totalXp, label });

    const start = displayXp;
    const target = start + totalXp;
    const t0 = performance.now();
    const dur = 600;
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayXp(Math.round(start + (target - start) * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    setTickKey((k) => k + 1);
    setTimeout(() => setCombo(null), 2400);
    return totalXp;
  }

  function bumpStreak() {
    const today = todayKey();
    if (streak.lastDay === today) return; // already counted
    const yesterday = new Date(Date.now() - 86400e3).toISOString().slice(0, 10);
    if (streak.lastDay === yesterday) {
      setStreak({ count: streak.count + 1, lastDay: today });
    } else {
      setStreak({ count: 1, lastDay: today });
    }
  }

  function markDone(lesson) {
    if (completed[lesson.id]) return;
    let earned = lesson.xp;
    let label = lesson.type === "challenge" ? "Verkefni klárað" : "Lestur lokið";

    // Class buffs
    if (
      classId === "mage" &&
      (lesson.id.startsWith("m9-") || lesson.title.toLowerCase().includes("plan mode"))
    ) {
      earned = Math.round(earned * 1.5);
      label = "Plan Mode +50%";
    }
    if (classId === "hacker" && lesson.id.startsWith("m7-")) {
      earned = Math.round(earned * 1.2);
      label = "Skills +20%";
    }

    const newXp = xp + earned;
    const newCompleted = { ...completed, [lesson.id]: true };
    setCompleted(newCompleted);
    setXp(newXp);
    bumpStreak();
    triggerCombo(earned, label);
  }

  async function askAI(lesson) {
    if (!challengeInput.trim()) return;
    setAiState("typing");
    setAiResponse("");
    setAiError("");
    try {
      const text = await callAnthropic({
        system: TEACHER_SYSTEM_PROMPT,
        userContent: challengeInput,
      });
      setAiResponse(text);
      setAiState("answered");
      // Explorer bónus
      if (classId === "explorer") {
        triggerCombo(5, "AI bónus");
      }
    } catch (e) {
      const msg =
        e.message?.includes("401") || e.message?.toLowerCase().includes("api key")
          ? "API lykill vantar eða er ógildur. Athugaðu .env skrána."
          : "Villa við að sækja svar. Reyndu aftur.";
      setAiError(msg);
      setAiState("idle");
    }
  }

  async function generateClaudeMd() {
    setMdLoading(true);
    setGeneratedMd("");
    setMdError("");
    try {
      const text = await callAnthropic({
        system: CLAUDEMD_SYSTEM_PROMPT,
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

  function openLesson(lessonId) {
    const lookup = findLessonById(lessonId);
    if (!lookup) return;
    setActiveLessonId(lessonId);
    setScreen(lookup.lesson.type === "challenge" ? "challenge" : "lesson");
  }

  function goNextLesson() {
    if (!activeLesson) return;
    const { moduleIndex, lessonIndex, module: m } = activeLesson;
    if (lessonIndex < m.lessons.length - 1) {
      openLesson(m.lessons[lessonIndex + 1].id);
    } else if (moduleIndex < MODULES.length - 1) {
      openLesson(MODULES[moduleIndex + 1].lessons[0].id);
    } else {
      setScreen("home");
      setActiveLessonId(null);
    }
  }

  function goPrevLesson() {
    if (!activeLesson) return;
    const { moduleIndex, lessonIndex } = activeLesson;
    if (lessonIndex > 0) {
      openLesson(MODULES[moduleIndex].lessons[lessonIndex - 1].id);
    } else if (moduleIndex > 0) {
      const prev = MODULES[moduleIndex - 1];
      openLesson(prev.lessons[prev.lessons.length - 1].id);
    }
  }

  // ── Styling ────────────────────────────────────────────────────────────────
  const sh = (x, y, color, alpha = 1) =>
    `${x * shadowScale}px ${y * shadowScale}px 0 ${color}${alpha < 1 ? alphaHex(alpha) : ""}`;
  const softSh = `0 ${4 * shadowScale}px ${14 * shadowScale}px ${C.line}55`;
  const animateOk = motion;

  const css = `
.arc2 {
  background:
    radial-gradient(circle at 20% 0%, ${C.rose}18 0%, transparent 50%),
    radial-gradient(circle at 80% 100%, ${C.sun}22 0%, transparent 55%),
    ${C.bg};
  color: ${C.ink};
  font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}
.arc2:before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(${C.line}44 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: ${0.2 + intensity * 0.12};
}

/* Top bar */
.arc2-top { position: relative; z-index: 2; padding: 14px 22px; display: flex; align-items: center; gap: 14px; background: ${C.panel}; border-bottom: 1px solid ${C.line}; flex-wrap: wrap; }
.arc2-logo { font-family: 'VT323', monospace; font-size: 24px; letter-spacing: 0.04em; display: flex; align-items: center; gap: 8px; }
.arc2-logo .slash { color: ${C.rose}; }
.arc2-logo .lvl { font-size: 13px; color: ${C.inkSoft}; margin-left: 4px; padding: 1px 6px; border-radius: 6px; background: ${C.panelAlt}; }
.arc2-tabs { display: flex; gap: 2px; padding: 3px; background: ${C.bg}; border-radius: 10px; border: 1px solid ${C.line}; overflow-x: auto; }
.arc2-tab { padding: 6px 12px; border-radius: 7px; background: transparent; border: none; font-family: inherit; font-weight: 600; font-size: 12px; color: ${C.inkDim}; cursor: pointer; white-space: nowrap; }
.arc2-tab.on { background: ${C.rose}; color: #fff; box-shadow: ${sh(0, 2, C.rose, 0.45)}; }
.arc2-end { margin-left: auto; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.arc2-coin { display: inline-flex; align-items: center; gap: 5px; padding: 5px 9px 5px 8px; border-radius: 99px; background: ${C.panelAlt}; border: 1px solid ${C.line}; font-family: 'VT323', monospace; font-size: 15px; color: ${C.ink}; white-space: nowrap; }
.arc2-coin.xp { color: ${C.sun}; }
.arc2-coin.xp svg { color: ${C.sun}; }
.arc2-coin.lvl { color: ${C.lavender}; }
.arc2-coin.lvl svg { color: ${C.lavender}; }
.arc2-coin.streak { color: ${C.rose}; }
.arc2-coin.streak svg { color: ${C.rose}; ${animateOk ? "animation: arc2Pulse 1.6s ease-in-out infinite;" : ""} }
.arc2-coin .v { color: ${C.ink}; }
.arc2-coin.tick { animation: arc2Tick .55s ease; }
@keyframes arc2Tick { 0%{transform:scale(1);} 30%{transform:scale(1.18); background:${C.sun}33;} 100%{transform:scale(1);} }
@keyframes arc2Pulse { 0%,100%{transform:scale(1);} 50%{transform:scale(1.18);} }
.arc2-iconbtn { width: 32px; height: 32px; border-radius: 50%; background: ${C.panelAlt}; border: 1px solid ${C.line}; cursor: pointer; color: ${C.ink}; display: flex; align-items: center; justify-content: center; }

/* Body */
.arc2-body { flex: 1; overflow: auto; padding: 26px 30px 100px; position: relative; z-index: 1; max-width: 1180px; margin: 0 auto; width: 100%; box-sizing: border-box; }
@media (max-width: 700px) { .arc2-body { padding: 18px 14px 100px; } .arc2-top { padding: 12px 14px; } }

/* Eyebrow / heading */
.arc2-eyebrow { font-family: 'VT323', monospace; font-size: 15px; letter-spacing: 0.1em; color: ${C.rose}; margin-bottom: 6px; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
.arc2-eyebrow .dot { width: 6px; height: 6px; background: ${C.rose}; }
.arc2-h1 { font-family: 'Space Grotesk', sans-serif; font-size: 32px; font-weight: 600; letter-spacing: -0.025em; line-height: 1.08; margin: 0 0 8px; }
.arc2-h1 .em { color: ${C.rose}; }
.arc2-sub { font-size: 14px; color: ${C.inkDim}; line-height: 1.55; max-width: 520px; }

/* Buttons */
.arc2-btn { padding: 10px 16px; border-radius: 11px; font-family: inherit; font-weight: 600; font-size: 13px; border: 1px solid ${C.line}; background: ${C.panel}; color: ${C.ink}; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; transition: transform .12s; box-shadow: ${sh(0, 3, C.line, 1)}; }
.arc2-btn:hover:not(:disabled) { transform: translateY(-1px); }
.arc2-btn:active:not(:disabled) { transform: translateY(${1 * shadowScale}px); box-shadow: ${sh(0, 1, C.line, 1)}; }
.arc2-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.arc2-btn.primary { background: ${C.rose}; color: #fff; border-color: ${C.rose}; box-shadow: ${sh(0, 3, C.rose, 0.7)}; }
.arc2-btn.primary:active:not(:disabled) { box-shadow: ${sh(0, 1, C.rose, 0.7)}; }
.arc2-btn.sun { background: ${C.sun}; color: #fff; border-color: ${C.sun}; box-shadow: ${sh(0, 3, C.sun, 0.6)}; }
.arc2-btn.lg { font-size: 14px; padding: 13px 20px; }
.arc2-btn.ghost { background: transparent; }

/* HERO */
.arc2-hero { display: grid; grid-template-columns: 1.35fr 1fr; gap: 18px; }
@media (max-width: 900px) { .arc2-hero { grid-template-columns: 1fr; } }
.arc2-hero-card {
  background:
    radial-gradient(circle at 100% 0%, ${C.sun}40 0%, transparent 55%),
    radial-gradient(circle at 0% 100%, ${C.lavender}33 0%, transparent 55%),
    ${C.panel};
  border: 1px solid ${C.line}; border-radius: 22px; padding: 28px;
  box-shadow: ${softSh}; position: relative; overflow: hidden;
}
.arc2-hero-card .horizon-svg { position: absolute; left: 0; right: 0; bottom: 0; height: 120px; pointer-events: none; }
.arc2-hero-card .sun-shape { position: absolute; right: 32px; top: 28px; width: 78px; height: 78px; border-radius: 50%; background: linear-gradient(180deg, ${C.sun}, ${C.rose}); box-shadow: 0 0 0 8px ${C.sun}33; ${animateOk ? "animation: arc2Float 6s ease-in-out infinite;" : ""} }
@keyframes arc2Float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-5px);} }
.arc2-hero-content { position: relative; z-index: 1; max-width: 480px; }
.arc2-hero-cta { display: flex; gap: 8px; margin-top: 18px; align-items: center; flex-wrap: wrap; }
.arc2-hero-cta .hint { font-family: 'VT323', monospace; font-size: 14px; color: ${C.inkSoft}; margin-left: 6px; }

/* Class Panel */
.arc2-class-card { background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 22px; padding: 22px; box-shadow: ${softSh}; display: flex; flex-direction: column; gap: 12px; }
.arc2-class-head { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 6px; }
.arc2-class-head .label { font-family: 'VT323', monospace; font-size: 14px; letter-spacing: 0.12em; color: ${C.inkSoft}; }
.arc2-class-head .buffchip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 9px; border-radius: 99px; background: ${selectedClass.color}22; color: ${selectedClass.color}; font-family: 'VT323', monospace; font-size: 13px; white-space: nowrap; }
.arc2-class-portrait { display: flex; align-items: center; gap: 14px; }
.arc2-portrait-frame {
  width: 88px; height: 88px; border-radius: 18px;
  background: ${selectedClass.color}22; border: 1px solid ${selectedClass.color}55;
  display: flex; align-items: center; justify-content: center;
  box-shadow: ${sh(0, 4, selectedClass.color, 0.35)};
  ${animateOk ? "animation: arc2Bob 4s ease-in-out infinite;" : ""}
  flex-shrink: 0;
}
@keyframes arc2Bob { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-3px);} }
.arc2-portrait-info { flex: 1; min-width: 0; }
.arc2-portrait-name { font-size: 17px; font-weight: 600; color: ${C.ink}; }
.arc2-portrait-role { font-size: 12px; color: ${C.inkDim}; margin-top: 2px; }
.arc2-portrait-buff { font-family: 'VT323', monospace; font-size: 14px; color: ${selectedClass.color}; margin-top: 6px; display: flex; align-items: center; gap: 4px; line-height: 1.2; }
.arc2-xpbar-row { display: flex; align-items: center; gap: 8px; font-family: 'VT323', monospace; font-size: 13px; color: ${C.inkSoft}; white-space: nowrap; }
.arc2-xpbar { flex: 1; height: 7px; background: ${C.panelAlt}; border-radius: 99px; overflow: hidden; }
.arc2-xpbar-fill { height: 100%; background: linear-gradient(90deg, ${selectedClass.color}, ${C.sun}); border-radius: 99px; transition: width .5s ease; }
.arc2-class-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 4px; padding-top: 14px; border-top: 1px dashed ${C.line}; }
.arc2-class-chip { background: ${C.panelAlt}; border: 1px solid ${C.line}; border-radius: 10px; padding: 8px 4px; display: flex; flex-direction: column; align-items: center; gap: 2px; cursor: pointer; transition: transform .12s; }
.arc2-class-chip:hover { transform: translateY(-2px); }
.arc2-class-chip.on { background: ${C.panel}; border-width: 2px; padding: 7px 3px; }
.arc2-class-chip .name { font-size: 10px; color: ${C.inkDim}; font-weight: 600; }
.arc2-class-chip.on .name { color: ${C.ink}; }
.arc2-class-chip .frame { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: ${C.bg}; }

/* Streak */
.arc2-streak { display: flex; align-items: center; gap: 14px; background: ${C.panelAlt}; border: 1px solid ${C.line}; border-radius: 14px; padding: 14px 16px; margin-top: 18px; flex-wrap: wrap; }
.arc2-streak-icon { width: 42px; height: 42px; border-radius: 12px; background: ${C.sun}33; color: ${C.sun}; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.arc2-streak b { font-family: 'VT323', monospace; font-size: 20px; color: ${C.ink}; }
.arc2-streak .sub { font-size: 12px; color: ${C.inkDim}; margin-top: 2px; }
.arc2-streak.shielded { border-color: ${C.mint}; background: ${C.mint}1F; ${animateOk ? "animation: arc2ShieldPulse 1.5s ease-out 2;" : ""} }
.arc2-streak.shielded .arc2-streak-icon { background: ${C.mint}33; color: ${C.mint}; }
@keyframes arc2ShieldPulse { 0%,100%{box-shadow:0 0 0 0 ${C.mint}00;} 50%{box-shadow:0 0 0 6px ${C.mint}66;} }

/* Section */
.arc2-section { display: flex; align-items: center; gap: 10px; margin: 32px 0 14px; font-family: 'VT323', monospace; font-size: 16px; letter-spacing: 0.1em; color: ${C.inkSoft}; }
.arc2-section > span { white-space: nowrap; flex-shrink: 0; }
.arc2-section .dash { flex: 1; height: 1px; background: ${C.line}; min-width: 20px; }

/* Stage grid */
.arc2-stages { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
@media (max-width: 1000px) { .arc2-stages { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 600px) { .arc2-stages { grid-template-columns: repeat(2, 1fr); } }
.arc2-stage { background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 16px; padding: 18px 14px; cursor: pointer; transition: transform .12s; box-shadow: ${softSh}; display: flex; flex-direction: column; gap: 6px; position: relative; }
.arc2-stage:hover:not(.locked) { transform: translateY(-3px); }
.arc2-stage .num { font-family: 'VT323', monospace; font-size: 18px; color: ${C.inkSoft}; }
.arc2-stage .ic { width: 46px; height: 46px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: ${C.panelAlt}; color: ${C.inkDim}; margin: 4px 0 8px; }
.arc2-stage.done .ic { background: ${C.mint}22; color: ${C.mint}; }
.arc2-stage.active .ic { background: ${C.rose}22; color: ${C.rose}; }
.arc2-stage.locked { opacity: .5; cursor: not-allowed; }
.arc2-stage .name { font-weight: 600; font-size: 13px; }
.arc2-stage .meta { font-family: 'VT323', monospace; font-size: 13px; color: ${C.inkSoft}; }
.arc2-stage .tag { position: absolute; top: 10px; right: 10px; font-family: 'VT323', monospace; font-size: 11px; letter-spacing: 0.06em; padding: 1px 7px; border-radius: 99px; background: ${C.mint}; color: #fff; }
.arc2-stage.active .tag { background: ${C.rose}; }
.arc2-stage .barwrap { height: 4px; background: ${C.panelAlt}; border-radius: 99px; overflow: hidden; margin-top: 6px; }
.arc2-stage .bar { height: 100%; background: ${C.rose}; border-radius: 99px; transition: width .5s ease; }
.arc2-stage.done .bar { background: ${C.mint}; }

/* COURSES */
.arc2-courses { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
@media (max-width: 800px) { .arc2-courses { grid-template-columns: 1fr; } }
.arc2-course { background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 18px; padding: 20px; box-shadow: ${softSh}; }
.arc2-course-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
.arc2-course-ic { width: 54px; height: 54px; border-radius: 14px; background: ${C.panelAlt}; display: flex; align-items: center; justify-content: center; color: ${C.rose}; flex-shrink: 0; }
.arc2-course-title { font-size: 16px; font-weight: 600; }
.arc2-course-stats { display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap; }
.arc2-chip { display: inline-flex; align-items: center; gap: 3px; padding: 2px 8px; border-radius: 99px; font-family: 'VT323', monospace; font-size: 12px; background: ${C.panelAlt}; color: ${C.inkDim}; white-space: nowrap; }
.arc2-chip.done { background: ${C.mint}22; color: ${C.mint}; }
.arc2-chip.active { background: ${C.rose}22; color: ${C.rose}; }
.arc2-lesson-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-top: 1px dashed ${C.line}; font-size: 13px; cursor: pointer; }
.arc2-lesson-row:first-of-type { border-top: none; }
.arc2-lesson-row:hover { color: ${C.rose}; }
.arc2-lesson-bullet { width: 22px; height: 22px; border-radius: 50%; background: ${C.panelAlt}; display: flex; align-items: center; justify-content: center; color: ${C.inkSoft}; flex-shrink: 0; font-family: 'VT323', monospace; font-size: 12px; }
.arc2-lesson-bullet.done { background: ${C.mint}; color: #fff; }
.arc2-lesson-bullet.next { background: ${C.sun}; color: #fff; }

/* LESSON */
.arc2-lesson { background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 22px; padding: 30px; box-shadow: ${softSh}; }
@media (max-width: 700px) { .arc2-lesson { padding: 22px 18px; } }
.arc2-lesson .tag-row { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
.arc2-lesson .tag { padding: 3px 10px; border-radius: 99px; font-family: 'VT323', monospace; font-size: 13px; letter-spacing: 0.04em; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
.arc2-lesson .tag.rose { background: ${C.rose}22; color: ${C.rose}; }
.arc2-lesson .tag.sun { background: ${C.sun}22; color: ${C.sun}; }
.arc2-lesson .tag.mint { background: ${C.mint}22; color: ${C.mint}; }
.arc2-lesson h1 { font-family: 'Space Grotesk', sans-serif; font-size: 30px; font-weight: 600; line-height: 1.1; letter-spacing: -0.025em; margin: 0 0 14px; }
.arc2-lesson p { font-size: 15px; line-height: 1.65; color: ${C.ink}; max-width: 62ch; margin: 8px 0; }
.arc2-lesson h3 { font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 600; margin: 24px 0 8px; color: ${C.rose}; display: flex; align-items: center; gap: 6px; }
.arc2-lesson-h2 { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 600; margin: 18px 0 10px; }
.arc2-li { padding: 3px 0 3px 16px; font-size: 14px; color: ${C.ink}; line-height: 1.6; }
.arc2-gap { height: 8px; }
.arc2-code { background: ${C.codeBg}; color: ${C.ink}; border: 1px solid ${C.line}; border-radius: 12px; padding: 16px 18px; font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.65; white-space: pre-wrap; margin: 14px 0; overflow-x: auto; }
.arc2-callout { background: ${C.sun}1F; border-left: 3px solid ${C.sun}; border-radius: 0 12px 12px 0; padding: 14px 16px; font-size: 13px; margin: 14px 0; display: flex; gap: 10px; align-items: flex-start; line-height: 1.55; }
.arc2-callout .ic { color: ${C.sun}; flex-shrink: 0; margin-top: 1px; }
.arc2-callout b { color: ${C.sun}; }
code.arc2-kbd { font-family: 'JetBrains Mono', monospace; background: ${C.panelAlt}; padding: 1px 6px; border-radius: 4px; font-size: 12px; color: ${C.ink}; }
.arc2-foot { margin-top: 24px; padding-top: 18px; border-top: 1px solid ${C.line}; display: flex; justify-content: space-between; align-items: center; gap: 10px; flex-wrap: wrap; }

/* CHALLENGE */
.arc2-chal { display: grid; grid-template-columns: 1.05fr 1fr; gap: 18px; }
@media (max-width: 900px) { .arc2-chal { grid-template-columns: 1fr; } }
.arc2-boss-card { background: radial-gradient(circle at 0% 0%, ${C.rose}22 0%, transparent 60%), ${C.panel}; border: 1px solid ${C.line}; border-radius: 22px; padding: 26px; box-shadow: ${softSh}; }
.arc2-banner { display: inline-flex; align-items: center; gap: 6px; color: #fff; font-family: 'VT323', monospace; font-size: 17px; letter-spacing: 0.08em; padding: 4px 12px; border-radius: 99px; white-space: nowrap; }
.arc2-banner.rose { background: ${C.rose}; box-shadow: ${sh(0, 2, C.rose, 0.5)}; }
.arc2-banner.lav { background: ${C.lavender}; box-shadow: ${sh(0, 2, C.lavender, 0.5)}; }
.arc2-boss-card h2 { font-family: 'Space Grotesk', sans-serif; font-size: 23px; font-weight: 600; margin: 12px 0 14px; line-height: 1.15; letter-spacing: -0.02em; }
.arc2-reward-row { display: flex; gap: 8px; flex-wrap: wrap; margin: 6px 0 14px; }
.arc2-reward { padding: 6px 12px; border-radius: 12px; background: ${C.panelAlt}; border: 1px solid ${C.line}; display: flex; align-items: center; gap: 6px; font-family: 'VT323', monospace; font-size: 14px; white-space: nowrap; }
.arc2-reward.xp { color: ${C.sun}; }
.arc2-reward.combo { color: ${C.rose}; }
.arc2-reward.time { color: ${C.mint}; }
.arc2-reward b { color: ${C.ink}; }
.arc2-hp { margin: 8px 0 12px; }
.arc2-hp-label { font-family: 'VT323', monospace; font-size: 13px; color: ${C.inkSoft}; display: flex; justify-content: space-between; }
.arc2-hp-bar { height: 8px; background: ${C.panelAlt}; border-radius: 99px; overflow: hidden; margin-top: 4px; }
.arc2-hp-fill { height: 100%; background: ${C.rose}; border-radius: 99px; transition: width .5s ease; }
.arc2-input { width: 100%; min-height: 120px; padding: 14px; background: ${C.codeBg}; color: ${C.ink}; border: 1px solid ${C.line}; border-radius: 12px; font-family: 'JetBrains Mono', monospace; font-size: 12px; resize: vertical; box-sizing: border-box; line-height: 1.55; outline: none; }
.arc2-input:focus { border-color: ${C.rose}; }
.arc2-partner { background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 22px; padding: 26px; box-shadow: ${softSh}; }
.arc2-partner-head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; flex-wrap: wrap; }
.arc2-partner-portrait { width: 60px; height: 60px; border-radius: 14px; background: ${C.lavender}22; border: 1px solid ${C.lavender}55; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.arc2-msg { padding: 12px 14px; border-radius: 12px; background: ${C.panelAlt}; font-size: 13px; line-height: 1.55; margin: 8px 0; }
.arc2-msg.partner { background: ${C.lavender}1F; border-left: 3px solid ${C.lavender}; border-radius: 0 12px 12px 0; white-space: pre-wrap; }
.arc2-msg.bonus { background: ${C.sun}1F; border-left: 3px solid ${C.sun}; border-radius: 0 12px 12px 0; display: flex; align-items: center; gap: 8px; color: ${C.ink}; }
.arc2-msg.bonus svg { color: ${C.sun}; }
.arc2-msg.error { background: #DC262615; border-left: 3px solid #DC2626; border-radius: 0 12px 12px 0; color: #DC2626; }
.arc2-msg b { color: ${selectedClass.color}; }

/* Typing dots */
.arc2-typing { display: inline-flex; gap: 4px; padding: 10px 14px; background: ${C.lavender}1F; border-left: 3px solid ${C.lavender}; border-radius: 0 12px 12px 0; align-items: center; font-size: 13px; color: ${C.inkDim}; margin: 8px 0; }
.arc2-typing .label { margin-right: 6px; font-family: 'VT323', monospace; color: ${C.lavender}; }
.arc2-typing .dot { width: 6px; height: 6px; border-radius: 50%; background: ${C.lavender}; ${animateOk ? "animation: arc2Dot 1.2s ease-in-out infinite;" : ""} }
.arc2-typing .dot:nth-child(2) { animation-delay: .15s; }
.arc2-typing .dot:nth-child(3) { animation-delay: .3s; }
@keyframes arc2Dot { 0%,80%,100%{transform:translateY(0); opacity:.4;} 40%{transform:translateY(-4px); opacity:1;} }

/* CLAUDE.md generator */
.arc2-md-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
@media (max-width: 600px) { .arc2-md-grid { grid-template-columns: 1fr; } }
.arc2-field-label { font-size: 12px; font-weight: 600; color: ${C.inkDim}; display: block; margin-bottom: 4px; }
.arc2-field-input { width: 100%; border: 1px solid ${C.line}; border-radius: 10px; padding: 10px 12px; font-size: 14px; font-family: inherit; outline: none; background: ${C.panel}; color: ${C.ink}; box-sizing: border-box; }
.arc2-field-input:focus { border-color: ${C.rose}; }
.arc2-field-textarea { width: 100%; min-height: 80px; border: 1px solid ${C.line}; border-radius: 10px; padding: 10px 12px; font-size: 14px; font-family: inherit; outline: none; background: ${C.panel}; color: ${C.ink}; box-sizing: border-box; resize: vertical; }
.arc2-field-textarea:focus { border-color: ${C.rose}; }

/* Tweaks */
.arc2-tweaks { position: fixed; bottom: 14px; right: 14px; z-index: 20; background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 16px; padding: 14px; width: 240px; box-shadow: ${softSh}; font-family: inherit; }
.arc2-tweaks-head { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; font-family: 'VT323', monospace; font-size: 14px; color: ${C.inkSoft}; letter-spacing: 0.08em; }
.arc2-tweaks-head .x { margin-left: auto; cursor: pointer; color: ${C.inkSoft}; background: none; border: none; padding: 0; }
.arc2-tweak-label { font-size: 11px; color: ${C.inkDim}; margin-bottom: 5px; display: flex; justify-content: space-between; font-weight: 600; }
.arc2-tweak-label b { color: ${C.rose}; font-family: 'VT323', monospace; font-size: 13px; }
.arc2-tweak-row { display: flex; gap: 4px; margin-bottom: 10px; }
.arc2-tweak-row button { flex: 1; padding: 5px 6px; font-size: 11px; background: ${C.panelAlt}; border: 1px solid ${C.line}; color: ${C.inkDim}; cursor: pointer; border-radius: 8px; font-family: inherit; font-weight: 600; }
.arc2-tweak-row button.on { background: ${C.rose}; color: #fff; border-color: ${C.rose}; }
.arc2-tweaks-fab { position: fixed; bottom: 14px; right: 14px; z-index: 20; width: 44px; height: 44px; border-radius: 50%; background: ${C.rose}; color: #fff; border: none; cursor: pointer; box-shadow: ${sh(0, 3, C.rose, 0.5)}; display: flex; align-items: center; justify-content: center; }

/* Combo */
.arc2-combo {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  z-index: 30;
  background: ${C.panel}; border: 2px solid ${selectedClass.color}; border-radius: 22px;
  padding: 26px 36px; min-width: 280px; text-align: center;
  box-shadow: ${sh(0, 8, selectedClass.color, 0.5)}, 0 0 60px ${selectedClass.color}55;
  ${animateOk ? "animation: arc2ComboIn .35s cubic-bezier(.2,1.6,.4,1) backwards, arc2ComboOut .4s ease 2s forwards;" : ""}
  pointer-events: none;
}
@keyframes arc2ComboIn { from { opacity:0; transform: translate(-50%,-50%) scale(.5) rotate(-6deg); } to { opacity:1; transform: translate(-50%,-50%) scale(1) rotate(0deg); } }
@keyframes arc2ComboOut { to { opacity:0; transform: translate(-50%,-50%) scale(1.1) translateY(-20px); } }
.arc2-combo-eyebrow { font-family: 'VT323', monospace; font-size: 18px; letter-spacing: 0.16em; color: ${selectedClass.color}; margin-bottom: 4px; }
.arc2-combo-xp { font-family: 'VT323', monospace; font-size: 54px; line-height: 1; color: ${C.ink}; }
.arc2-combo-xp .plus { color: ${C.sun}; }
.arc2-combo-label { font-family: 'Space Grotesk', sans-serif; font-size: 13px; color: ${C.inkDim}; margin-top: 8px; }
`;

  const Horizon = () => (
    <svg
      className="horizon-svg"
      preserveAspectRatio="none"
      viewBox="0 0 400 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,80 L60,55 L100,72 L150,40 L200,62 L250,30 L300,55 L350,28 L400,50 L400,120 L0,120 Z"
        fill={`${C.rose}33`}
      />
      <path
        d="M0,95 L80,70 L140,88 L210,60 L260,85 L330,68 L400,90 L400,120 L0,120 Z"
        fill={`${C.lavender}38`}
      />
      <path
        d="M0,110 L60,98 L120,108 L180,98 L240,110 L300,100 L360,109 L400,102 L400,120 L0,120 Z"
        fill={`${C.sun}44`}
      />
    </svg>
  );

  const tabs = [
    { k: "home", label: "Heim" },
    { k: "courses", label: "Áfangar" },
    { k: "lesson", label: "Lestur" },
    { k: "challenge", label: "Verkefni" },
    { k: "claudemd", label: "CLAUDE.md" },
  ];

  // Pick lesson to show on Lestur / Verkefni tabs
  function handleTab(k) {
    if (k === "lesson") {
      const target =
        activeLesson && activeLesson.lesson.type === "read"
          ? activeLesson
          : next && next.lesson.type === "read"
            ? next
            : null;
      if (target) {
        setActiveLessonId(target.lesson.id);
        setScreen("lesson");
      } else {
        setScreen("courses");
      }
      return;
    }
    if (k === "challenge") {
      const target =
        activeLesson && activeLesson.lesson.type === "challenge"
          ? activeLesson
          : next && next.lesson.type === "challenge"
            ? next
            : null;
      if (target) {
        setActiveLessonId(target.lesson.id);
        setScreen("challenge");
      } else {
        // pick first challenge not completed
        let firstChal = null;
        for (const m of MODULES) {
          for (const l of m.lessons) {
            if (l.type === "challenge" && !completed[l.id]) {
              firstChal = l;
              break;
            }
          }
          if (firstChal) break;
        }
        if (firstChal) {
          setActiveLessonId(firstChal.id);
          setScreen("challenge");
        } else {
          setScreen("courses");
        }
      }
      return;
    }
    setScreen(k);
  }

  const heroLesson = next;
  const bossHpPct = activeLesson && completed[activeLesson.lesson.id] ? 0 : 82;

  return (
    <div className="arc2">
      <style>{css}</style>

      {/* TOP BAR */}
      <div className="arc2-top">
        <div className="arc2-logo">
          <span
            style={{
              display: "inline-block",
              width: 18,
              height: 18,
              flexShrink: 0,
              background: `
                linear-gradient(${C.rose},${C.rose}) 0 0/6px 6px no-repeat,
                linear-gradient(${C.sun},${C.sun}) 6px 0/6px 6px no-repeat,
                linear-gradient(${C.lavender},${C.lavender}) 12px 0/6px 6px no-repeat,
                linear-gradient(${C.sun},${C.sun}) 0 6px/6px 6px no-repeat,
                linear-gradient(${C.mint},${C.mint}) 6px 6px/6px 6px no-repeat,
                linear-gradient(${C.rose},${C.rose}) 12px 6px/6px 6px no-repeat,
                linear-gradient(${C.lavender},${C.lavender}) 0 12px/6px 6px no-repeat,
                linear-gradient(${C.mint},${C.mint}) 6px 12px/6px 6px no-repeat,
                linear-gradient(${C.sun},${C.sun}) 12px 12px/6px 6px no-repeat
              `,
            }}
          />
          CC<span className="slash">/</span>arcade<span className="lvl">v3</span>
        </div>
        <div className="arc2-tabs">
          {tabs.map((t) => (
            <button
              key={t.k}
              className={"arc2-tab" + (screen === t.k ? " on" : "")}
              onClick={() => handleTab(t.k)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="arc2-end">
          <div
            className={"arc2-coin xp" + (tickKey > 0 ? " tick" : "")}
            key={tickKey}
          >
            <I.star size={13} />
            <span className="v">{displayXp}</span> XP
          </div>
          <div className="arc2-coin lvl">
            <I.bolt size={13} />
            <span className="v">LVL {level}</span>
          </div>
          <div className="arc2-coin streak">
            <I.flame size={13} />
            <span className="v">{streak.count}d</span>
          </div>
          <button
            className="arc2-iconbtn"
            onClick={() => setDark(!dark)}
            aria-label={dark ? "Skipta í ljóst" : "Skipta í dökkt"}
          >
            {dark ? <I.sun size={15} /> : <I.moon size={15} />}
          </button>
        </div>
      </div>

      <div className="arc2-body">
        {/* HOME */}
        {screen === "home" && (
          <>
            <div className="arc2-hero">
              <div className="arc2-hero-card">
                <div className="sun-shape" />
                <Horizon />
                <div className="arc2-hero-content">
                  <div className="arc2-eyebrow">
                    <span className="dot" />
                    {heroLesson ? "▸ NÆSTA VERKEFNI" : "▸ ÞÚ ERT BÚIN(N)"}
                  </div>
                  {heroLesson ? (
                    <>
                      <h1 className="arc2-h1">
                        {heroLesson.lesson.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="em">
                          {heroLesson.lesson.title.split(" ").slice(-1)[0]}
                        </span>
                        .
                      </h1>
                      <p className="arc2-sub">
                        Áfangi {String(heroLesson.moduleIndex + 1).padStart(2, "0")} ·{" "}
                        {heroLesson.module.title}
                      </p>
                      <div className="arc2-hero-cta">
                        <button
                          className="arc2-btn primary lg"
                          onClick={() => openLesson(heroLesson.lesson.id)}
                        >
                          <I.play size={14} />
                          Halda áfram
                        </button>
                        <button
                          className="arc2-btn lg"
                          onClick={() => setScreen("courses")}
                        >
                          Skoða áfanga
                        </button>
                        <span className="hint">+{heroLesson.lesson.xp} XP</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="arc2-h1">
                        Allir áfangar <span className="em">kláraðir</span>.
                      </h1>
                      <p className="arc2-sub">
                        Frábær vinna! Þú getur farið yfir efnið aftur eða prófað
                        CLAUDE.md smiðinn.
                      </p>
                      <div className="arc2-hero-cta">
                        <button
                          className="arc2-btn primary lg"
                          onClick={() => setScreen("courses")}
                        >
                          Skoða áfanga
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="arc2-class-card">
                <div className="arc2-class-head">
                  <span className="label">CHARACTER</span>
                  <span className="buffchip">
                    <I.sparkle size={11} />
                    {selectedClass.buffShort}
                  </span>
                </div>
                <div className="arc2-class-portrait">
                  <div className="arc2-portrait-frame">
                    <PixelChar
                      grid={selectedClass.grid}
                      palette={selectedClass.palette}
                      size={72}
                    />
                  </div>
                  <div className="arc2-portrait-info">
                    <div className="arc2-portrait-name">{selectedClass.name}</div>
                    <div className="arc2-portrait-role">
                      {selectedClass.role} · LVL {level}
                    </div>
                    <div className="arc2-portrait-buff">
                      <I.sparkle size={12} />
                      {selectedClass.buff}
                    </div>
                  </div>
                </div>
                <div className="arc2-xpbar-row">
                  <span>{xp % 50}/50</span>
                  <div className="arc2-xpbar">
                    <div
                      className="arc2-xpbar-fill"
                      style={{ width: `${((xp % 50) / 50) * 100}%` }}
                    />
                  </div>
                  <span>LVL {level + 1}</span>
                </div>
                <div className="arc2-class-strip">
                  {Object.values(CLASSES).map((c) => (
                    <div
                      key={c.id}
                      className={"arc2-class-chip" + (c.id === classId ? " on" : "")}
                      style={c.id === classId ? { borderColor: c.color } : {}}
                      onClick={() => setClassId(c.id)}
                    >
                      <div className="frame">
                        <PixelChar grid={c.grid} palette={c.palette} size={28} />
                      </div>
                      <div className="name">{c.name.split(" ")[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={"arc2-streak" + (streakShield ? " shielded" : "")}>
              <div className="arc2-streak-icon">
                <I.flame size={22} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div>
                  <b>{streak.count} daga combo</b>
                </div>
                <div className="sub">
                  Spilaðu á morgun til að halda því gangandi — engin pressa.
                </div>
              </div>
              <button
                className="arc2-btn sun"
                onClick={() => {
                  setStreakShield(true);
                  setTimeout(() => setStreakShield(false), 3500);
                }}
              >
                <I.shield size={13} />
                {streakShield ? "Combo varið!" : "Verja combo"}
              </button>
            </div>

            <div className="arc2-section">
              <span>▾ STAGE SELECT</span>
              <span className="dash" />
              <span>{pct}% lokið</span>
            </div>
            <div className="arc2-stages">
              {MODULES.map((m, i) => {
                const doneCount = m.lessons.filter((l) => completed[l.id]).length;
                const done = doneCount === m.lessons.length;
                const isActive = i === currentModuleIndex && !done;
                const stagePct = (doneCount / m.lessons.length) * 100;
                const ModIcon = I[moduleIcons[m.id]];
                return (
                  <div
                    key={m.id}
                    className={`arc2-stage ${done ? "done" : ""} ${isActive ? "active" : ""}`}
                    onClick={() => {
                      setScreen("courses");
                    }}
                  >
                    {done && <div className="tag">CLEAR</div>}
                    {isActive && <div className="tag">NOW</div>}
                    <div className="num">{String(i + 1).padStart(2, "0")}</div>
                    <div className="ic">
                      <ModIcon size={26} />
                    </div>
                    <div className="name">{m.short}</div>
                    <div className="meta">
                      {m.lessons.length} lvls ·{" "}
                      {m.lessons.reduce((s, l) => s + l.xp, 0)}XP
                    </div>
                    <div className="barwrap">
                      <div className="bar" style={{ width: `${stagePct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* COURSES */}
        {screen === "courses" && (
          <>
            <div className="arc2-eyebrow">
              <span className="dot" />
              VELDU ÁFANGA
            </div>
            <h1 className="arc2-h1" style={{ marginBottom: 18 }}>
              Fimm <span className="em">heimsóknir</span> í Claude Code.
            </h1>
            <div className="arc2-courses">
              {MODULES.map((m, i) => {
                const doneCount = m.lessons.filter((l) => completed[l.id]).length;
                const allDone = doneCount === m.lessons.length;
                const isActive = i === currentModuleIndex && !allDone;
                const ModIcon = I[moduleIcons[m.id]];
                return (
                  <div key={m.id} className="arc2-course">
                    <div className="arc2-course-head">
                      <div className="arc2-course-ic">
                        <ModIcon size={28} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="arc2-course-title">
                          Áfangi {String(i + 1).padStart(2, "0")} · {m.title}
                        </div>
                        <div className="arc2-course-stats">
                          <span className="arc2-chip">
                            <I.clock size={11} /> {m.minutes} mín
                          </span>
                          <span className="arc2-chip">
                            <I.star size={11} />{" "}
                            {m.lessons.reduce((s, l) => s + l.xp, 0)} XP
                          </span>
                          {allDone && (
                            <span className="arc2-chip done">
                              <I.check size={11} /> Clear
                            </span>
                          )}
                          {isActive && (
                            <span className="arc2-chip active">
                              <I.play size={11} /> Now playing
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {m.lessons.map((l, li) => {
                      const ld = completed[l.id];
                      const isNext =
                        !ld &&
                        m.lessons
                          .slice(0, li)
                          .every((ll) => completed[ll.id]) &&
                        isActive;
                      return (
                        <div
                          key={l.id}
                          className="arc2-lesson-row"
                          onClick={() => openLesson(l.id)}
                        >
                          <div
                            className={`arc2-lesson-bullet ${ld ? "done" : ""} ${isNext ? "next" : ""}`}
                          >
                            {ld ? (
                              <I.check size={11} />
                            ) : isNext ? (
                              <I.play size={9} />
                            ) : (
                              li + 1
                            )}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>{l.title}</div>
                          <div
                            style={{
                              fontFamily: "'VT323', monospace",
                              fontSize: 13,
                              color: C.inkSoft,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            {l.type === "challenge" ? (
                              <I.sword size={12} />
                            ) : (
                              <I.bolt size={12} />
                            )}
                            +{l.xp}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* LESSON (read) */}
        {screen === "lesson" && activeLesson && activeLesson.lesson.type === "read" && (
          <div className="arc2-lesson">
            <div className="tag-row">
              <span className="tag rose">
                <I.slash size={11} />
                {activeLesson.module.title}
              </span>
              <span className="tag sun">
                <I.star size={11} />+{activeLesson.lesson.xp} XP
              </span>
              <span className="tag mint">
                <I.clock size={11} />
                {activeLesson.lesson.mins} mín
              </span>
              {completed[activeLesson.lesson.id] && (
                <span className="tag mint">
                  <I.check size={11} />
                  Lokið
                </span>
              )}
            </div>
            <h1>{activeLesson.lesson.title}</h1>
            <div>{renderLessonContent(activeLesson.lesson.content)}</div>
            <div className="arc2-foot">
              <button
                className="arc2-btn"
                onClick={goPrevLesson}
                disabled={
                  activeLesson.moduleIndex === 0 && activeLesson.lessonIndex === 0
                }
              >
                <I.arrowL size={13} />
                Fyrri
              </button>
              <button
                className="arc2-btn primary"
                onClick={() => {
                  if (!completed[activeLesson.lesson.id]) {
                    markDone(activeLesson.lesson);
                    setTimeout(() => goNextLesson(), 700);
                  } else {
                    goNextLesson();
                  }
                }}
              >
                {completed[activeLesson.lesson.id] ? "Næsta" : "Lesið"}
                <I.arrowR size={13} />
              </button>
            </div>
          </div>
        )}

        {/* LESSON (challenge displayed as boss fight) */}
        {(screen === "challenge" || (screen === "lesson" && activeLesson && activeLesson.lesson.type === "challenge")) &&
          activeLesson &&
          activeLesson.lesson.type === "challenge" && (
            <div className="arc2-chal">
              <div className="arc2-boss-card">
                <div className="arc2-banner rose">
                  <I.sword size={13} /> BOSS FIGHT
                </div>
                <h2>{activeLesson.lesson.title}</h2>
                <div className="arc2-hp">
                  <div className="arc2-hp-label">
                    <span>BOSS HP</span>
                    <span>
                      {completed[activeLesson.lesson.id] ? "0" : "82"} / 100
                    </span>
                  </div>
                  <div className="arc2-hp-bar">
                    <div
                      className="arc2-hp-fill"
                      style={{ width: `${bossHpPct}%` }}
                    />
                  </div>
                </div>
                <div className="arc2-reward-row">
                  <div className="arc2-reward xp">
                    <I.star size={12} />
                    <b>+{activeLesson.lesson.xp} XP</b>
                  </div>
                  <div className="arc2-reward combo">
                    <I.flame size={12} />
                    <b>+1 combo</b>
                  </div>
                  <div className="arc2-reward time">
                    <I.clock size={12} />
                    <b>~{activeLesson.lesson.mins} mín</b>
                  </div>
                </div>
                <div>{renderLessonContent(activeLesson.lesson.content)}</div>
                {activeLesson.lesson.challenge?.hint && (
                  <div className="arc2-callout">
                    <span className="ic">
                      <I.sparkle size={16} />
                    </span>
                    <span>
                      <b>Ábending:</b> {activeLesson.lesson.challenge.hint}
                    </span>
                  </div>
                )}
                {activeLesson.lesson.challenge?.template && showTemplate && (
                  <pre className="arc2-code">
                    {activeLesson.lesson.challenge.template}
                  </pre>
                )}
                <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                  <button
                    className="arc2-btn primary"
                    onClick={() => {
                      markDone(activeLesson.lesson);
                    }}
                    disabled={completed[activeLesson.lesson.id]}
                  >
                    <I.sword size={14} />
                    {completed[activeLesson.lesson.id]
                      ? "Sigraður"
                      : "Skrá tilraun"}
                  </button>
                  {activeLesson.lesson.challenge?.template && (
                    <button
                      className="arc2-btn ghost"
                      onClick={() => setShowTemplate(!showTemplate)}
                    >
                      <I.eye size={13} />
                      {showTemplate ? "Fela sniðmát" : "Sjá sniðmát"}
                    </button>
                  )}
                  <button
                    className="arc2-btn"
                    onClick={goNextLesson}
                    disabled={!completed[activeLesson.lesson.id]}
                  >
                    Næsta
                    <I.arrowR size={13} />
                  </button>
                </div>
              </div>

              <div className="arc2-partner">
                <div className="arc2-partner-head">
                  <div className="arc2-partner-portrait">
                    <PixelChar
                      grid={CLASSES.hacker.grid}
                      palette={CLASSES.hacker.palette}
                      size={48}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="arc2-banner lav">
                      <I.terminal size={12} /> AI PARTNER
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 18,
                        fontWeight: 600,
                        marginTop: 6,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      Spyrðu hvað sem er.
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: C.inkDim,
                    marginBottom: 12,
                    lineHeight: 1.55,
                  }}
                >
                  Festist þú? Sláðu inn spurninguna — partnerinn svarar á
                  íslensku.
                </p>
                <textarea
                  className="arc2-input"
                  value={challengeInput}
                  onChange={(e) => setChallengeInput(e.target.value)}
                  placeholder={
                    activeLesson.lesson.challenge?.prompt ||
                    "Sláðu inn spurningu hér..."
                  }
                />
                <button
                  className="arc2-btn primary"
                  style={{ marginTop: 10, width: "100%", justifyContent: "center" }}
                  onClick={() => askAI(activeLesson.lesson)}
                  disabled={aiState === "typing" || !challengeInput.trim()}
                >
                  <I.send size={13} />
                  {aiState === "typing" ? "Sendi..." : "Senda spurningu"}
                </button>
                {aiState === "typing" && (
                  <div className="arc2-typing" style={{ marginTop: 14 }}>
                    <span className="label">Partner skrifar</span>
                    <span className="dot" />
                    <span className="dot" />
                    <span className="dot" />
                  </div>
                )}
                {aiError && (
                  <div className="arc2-msg error" style={{ marginTop: 14 }}>
                    {aiError}
                  </div>
                )}
                {aiState === "answered" && aiResponse && (
                  <div className="arc2-msg partner" style={{ marginTop: 14 }}>
                    <b style={{ color: C.lavender }}>Partner:</b> {aiResponse}
                  </div>
                )}
                {aiState === "idle" && !aiError && (
                  <div
                    className="arc2-msg partner"
                    style={{ marginTop: 14, opacity: 0.7 }}
                  >
                    <b style={{ color: C.lavender }}>Partner:</b> Bíður eftir
                    spurningu — sláðu inn texta og smelltu á{" "}
                    <i>Senda spurningu</i>.
                  </div>
                )}
                {classId === "explorer" && (
                  <div className="arc2-msg bonus">
                    <I.sparkle size={16} />
                    <span>
                      <b style={{ color: C.sun }}>+5 XP combo</b> fyrir hverja
                      AI spurningu · {selectedClass.name} buff virk:{" "}
                      <b>{selectedClass.buffShort}</b>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

        {/* If on lesson/challenge tab but no active lesson */}
        {(screen === "lesson" || screen === "challenge") && !activeLesson && (
          <div className="arc2-lesson">
            <div className="arc2-eyebrow">
              <span className="dot" />
              ENGIN VIRK LEXÍA
            </div>
            <h1 className="arc2-h1">
              Veldu lexíu úr <span className="em">Áfangar</span>.
            </h1>
            <p style={{ fontSize: 15, color: C.inkDim, marginTop: 10 }}>
              Þú hefur lokið öllu efni eða átt ekkert byrjað enn.
            </p>
            <button
              className="arc2-btn primary"
              style={{ marginTop: 18 }}
              onClick={() => setScreen("courses")}
            >
              Skoða áfanga
              <I.arrowR size={13} />
            </button>
          </div>
        )}

        {/* CLAUDE.md generator */}
        {screen === "claudemd" && (
          <div className="arc2-lesson">
            <div className="tag-row">
              <span className="tag rose">
                <I.doc size={11} />
                SMIÐUR
              </span>
            </div>
            <h1>
              CLAUDE.md <span style={{ color: C.rose }}>Smiður</span>
            </h1>
            <p>
              Fylltu inn upplýsingar um verkefnið þitt og fáðu tilbúið CLAUDE.md
              skjal.
            </p>

            <div className="arc2-md-grid">
              {[
                ["Nafn verkefnis", mdProject, setMdProject],
                ["Tech stack", mdStack, setMdStack],
                ["Build skipun", mdBuild, setMdBuild],
                ["Test skipun", mdTest, setMdTest],
              ].map(([label, val, setter]) => (
                <div key={label}>
                  <label className="arc2-field-label">{label}</label>
                  <input
                    className="arc2-field-input"
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="arc2-field-label">
                Sérstæðar reglur (ein á línu)
              </label>
              <textarea
                className="arc2-field-textarea"
                value={mdRules}
                onChange={(e) => setMdRules(e.target.value)}
              />
            </div>
            <button
              className="arc2-btn primary"
              onClick={generateClaudeMd}
              disabled={mdLoading}
            >
              <I.sparkle size={13} />
              {mdLoading ? "Er að smíða..." : "Búa til CLAUDE.md"}
            </button>
            {mdError && (
              <div className="arc2-msg error" style={{ marginTop: 14 }}>
                {mdError}
              </div>
            )}
            {generatedMd && (
              <div style={{ marginTop: 18 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <strong style={{ fontSize: 14 }}>
                    Niðurstaðan — afritaðu þetta í CLAUDE.md:
                  </strong>
                  <button className="arc2-btn ghost" onClick={copyMd}>
                    Afrita
                  </button>
                </div>
                <pre className="arc2-code">{generatedMd}</pre>
              </div>
            )}
          </div>
        )}
      </div>

      {/* COMBO BURST */}
      {combo && (
        <div className="arc2-combo">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <PixelChar
              grid={selectedClass.grid}
              palette={selectedClass.palette}
              size={56}
            />
          </div>
          <div className="arc2-combo-eyebrow">★ COMBO!</div>
          <div className="arc2-combo-xp">
            <span className="plus">+</span>
            {combo.xp}
            <span
              style={{ fontSize: 24, marginLeft: 6, color: selectedClass.color }}
            >
              XP
            </span>
          </div>
          <div className="arc2-combo-label">{combo.label}</div>
        </div>
      )}

      {/* TWEAKS */}
      {showTweaks ? (
        <div className="arc2-tweaks">
          <div className="arc2-tweaks-head">
            <I.cog size={13} />
            TWEAKS
            <button className="x" onClick={() => setShowTweaks(false)}>
              <I.close size={12} />
            </button>
          </div>
          <div className="arc2-tweak-label">
            Intensity <b>{["Calm", "Balanced", "Arcade"][intensity]}</b>
          </div>
          <div className="arc2-tweak-row">
            {["Calm", "Bal", "Arcade"].map((l, i) => (
              <button
                key={i}
                className={intensity === i ? "on" : ""}
                onClick={() => setIntensity(i)}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="arc2-tweak-label">
            Hreyfingar <b>{motion ? "Á" : "Af"}</b>
          </div>
          <div className="arc2-tweak-row">
            <button className={motion ? "on" : ""} onClick={() => setMotion(true)}>
              Á
            </button>
            <button className={!motion ? "on" : ""} onClick={() => setMotion(false)}>
              Af
            </button>
          </div>
          <div className="arc2-tweak-label">
            Hitastig <b>{["Kalt", "Hlutl.", "Heitt"][warmth]}</b>
          </div>
          <div className="arc2-tweak-row">
            {["Kalt", "Hlutl.", "Heitt"].map((l, i) => (
              <button
                key={i}
                className={warmth === i ? "on" : ""}
                onClick={() => setWarmth(i)}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          className="arc2-tweaks-fab"
          onClick={() => setShowTweaks(true)}
          aria-label="Opna stillingar"
        >
          <I.cog size={16} />
        </button>
      )}
    </div>
  );
}

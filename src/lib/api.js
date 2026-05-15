export async function callAnthropic({ system, userContent, maxTokens = 1000 }) {
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

export const TEACHER_SYSTEM_PROMPT = `Þú ert sérfræðingur í Claude Code og kennari.
Þú ert að aðstoða nemanda í gagnvirku Claude Code námskeiði á íslensku.
Gefðu skýrar, praktískar leiðbeiningar.
Notaðu kóðablokkir þar sem við á.
Vertu hvetjandi en nákvæmur.
Svaraðu á vel mótaðri, málfræðilega réttri íslensku.
Stíll: Dev-jargon haldist á ensku (hooks, skills, agents, commit, MCP, terminal),
en notaðu íslensk orð fyrir "session" (lota) og "directory" (mappa).
Forðastu málfræðivillur eins og "drekknar" (rétt: drukknar) og notaðu rétta beygingu fallorða.`;

export const CLAUDEMD_SYSTEM_PROMPT = `Þú ert sérfræðingur í Claude Code.
Búðu til fullkomið CLAUDE.md skjal fyrir verkefni.
Fylgdu bestu venjum: undir 200 línur, skýrt, aðeins það sem á við öll verkefni.
Svaraðu EINGÖNGU með markdown innihald skrárinnar — ekkert annað, engin útskýring.`;

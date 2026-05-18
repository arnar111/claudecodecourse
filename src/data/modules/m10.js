export const m10 = {
  id: "m10",
  title: "Hooks og sjálfvirkni",
  short: "Hooks",
  minutes: 25,
  accent: "#9333EA",
  lessons: [
    {
      id: "m10-l1",
      title: "Hvað eru hooks?",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Reglur sem virka ALLTAF

Mundu hvað við sögðum: **CLAUDE.md er ráðgjöf**. Hooks eru **lög**.

# Skilgreining

Hook er **skripta sem keyrir sjálfkrafa** þegar Claude gerir tiltekið verk.

Dæmi:
- Þegar Claude skrifar í .jsx skrá → keyra Prettier (lagar formatting)
- Þegar Claude er búinn að klára verkefni → senda Mac notification
- Áður en Claude breytir .env skrá → STOP (ekki leyfa)

# Hookar virka óháð CLAUDE.md

Þú getur skrifað í CLAUDE.md: "Aldrei breyta .env skrá." Claude **gæti** samt gert það óvart.

En með **PreToolUse hook** sem stöðvar breytingar á .env — Claude **getur ekki**.

# Þrjár tegundir

| Tegund | Hvenær keyrir |
|--------|---------------|
| **PreToolUse** | Áður en Claude framkvæmir aðgerð |
| **PostToolUse** | Eftir aðgerð |
| **Stop** | Þegar Claude er búinn með verkefni |

# Hvar lifa hooks

\`\`\`
~/.claude/settings.json
\`\`\`

Eða fyrir verkefni:

\`\`\`
.claude/settings.json (í Git, allir í liðinu)
.claude/settings.local.json (bara þú)
\`\`\`

# Snið

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write $CLAUDE_TOOL_INPUT_FILE_PATH"
          }
        ]
      }
    ]
  }
}
\`\`\`

> 🎯 Þú getur líka notað \`/hooks\` skipun í Claude Code til að setja upp hooks með viðmóti — engin handvirkt JSON.`,
      challenge: null,
    },
    {
      id: "m10-l2",
      title: "PreToolUse — áður en það gerist",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# Stoppa Claude áður en hann gerir eitthvað

PreToolUse hook keyrir **rétt áður** en Claude notar verkfæri (Write, Edit, Bash, osfrv.).

Ef hook-ið skilar villu (non-zero exit code), Claude **getur ekki framkvæmt aðgerðina**.

# Dæmi: Verja .env skrár

\`\`\`json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "case \\"$CLAUDE_TOOL_INPUT_FILE_PATH\\" in *.env) echo 'Ekki .env skrár!'; exit 1 ;; esac"
          }
        ]
      }
    ]
  }
}
\`\`\`

Ef Claude reynir að skrifa í einhverja \`.env\` skrá, hook-ið stoppar hann.

# Matcher — hvenær virkar hook-ið

Matcher segir til um **hvaða verkfæri** triggers hook-ið.

| Matcher | Triggers fyrir |
|---------|----------------|
| \`Write\` | Þegar Claude býr til nýja skrá |
| \`Edit\` | Þegar Claude breytir núverandi skrá |
| \`Write\\|Edit\` | Bæði |
| \`Bash\` | Þegar Claude keyrir bash skipun |
| \`*\` | Allt |

# Annað dæmi: Block dangerous git commands

\`\`\`json
{
  "matcher": "Bash",
  "hooks": [{
    "type": "command",
    "command": "case \\"$CLAUDE_TOOL_INPUT_COMMAND\\" in *'git push --force'*) echo 'Ekki force push!'; exit 1 ;; esac"
  }]
}
\`\`\`

Stoppar Claude í að force-pusha á remote branches.

> ⚠️ PreToolUse hooks eru kraftmiklar. Ef þú gerir villu í þeim, Claude getur stöðvast alveg. Prófaðu vel.`,
      challenge: null,
    },
    {
      id: "m10-l3",
      title: "PostToolUse — eftir aðgerð",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# Eftir-vinnsla

PostToolUse hook keyrir **eftir** að Claude framkvæmir aðgerð sína. Hér gerir þú hluti eins og:

- Keyra formatter á nýrri skrá
- Keyra TypeScript type-check
- Senda Slack tilkynningu
- Skrá logs

# Dæmi 1: Prettier sjálfkrafa

\`\`\`json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "prettier --write \\"$CLAUDE_TOOL_INPUT_FILE_PATH\\""
          }
        ]
      }
    ]
  }
}
\`\`\`

Þegar Claude breytir skrá → Prettier formatar hana sjálfkrafa.

# Dæmi 2: TypeScript check eftir breytingar

\`\`\`json
{
  "matcher": "Write|Edit",
  "hooks": [{
    "type": "command",
    "command": "npm run typecheck || echo 'Type errors!'"
  }]
}
\`\`\`

Eftir hverja breytingu, keyra type check. Ef það er villa, Claude sér og getur lagað.

# Umhverfisbreytur sem hooks fá

| Breyta | Innihald |
|--------|----------|
| \`$CLAUDE_TOOL_INPUT_FILE_PATH\` | Skráin sem var breytt |
| \`$CLAUDE_TOOL_INPUT_COMMAND\` | Skipunin sem keyrði (fyrir Bash) |
| \`$CLAUDE_TOOL_OUTPUT\` | Niðurstaða aðgerðarinnar |

# Lock-stepping

PostToolUse hookar geta keyrt fleiri en eitt:

\`\`\`json
{
  "matcher": "Write",
  "hooks": [
    { "command": "prettier --write $CLAUDE_TOOL_INPUT_FILE_PATH" },
    { "command": "eslint --fix $CLAUDE_TOOL_INPUT_FILE_PATH" },
    { "command": "git add $CLAUDE_TOOL_INPUT_FILE_PATH" }
  ]
}
\`\`\`

Format → lint → stage. Allt sjálfkrafa.

> 🎯 Pro tip: Ekki láta hooks taka of langan tíma. Ef Prettier tekur 30 sekúndur, Claude bíður 30 sekúndur eftir hverri skrá.`,
      challenge: null,
    },
    {
      id: "m10-l4",
      title: "Stop hook — þegar Claude er búinn",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Tilkynningar

Stop hook keyrir þegar Claude segir: "Ég er búinn."

# Dæmi: Mac notification

\`\`\`json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\"Claude er búinn!\\" with title \\"Claude Code\\"'"
          }
        ]
      }
    ]
  }
}
\`\`\`

Þegar Claude lýkur verkefni — popup á Mac.

# Hvers vegna er þetta gagnlegt?

ADHD og focus: Þú getur sett Claude á stórt verkefni og **gert eitthvað annað**. Þegar hann er búinn, tilkynning. Þú kemur til baka.

# Önnur dæmi

## Slack tilkynning

\`\`\`bash
curl -X POST -H 'Content-type: application/json' \\
  --data '{"text":"Claude er búinn í verkefninu!"}' \\
  $SLACK_WEBHOOK_URL
\`\`\`

## Sound á Linux

\`\`\`bash
notify-send "Claude" "Verkefni klárt!"
\`\`\`

## Bara terminal bell

\`\`\`bash
echo -e "\\a"
\`\`\`

# Mörg hooks samtímis

Þú getur haft Stop hook sem gerir margt:

\`\`\`json
{
  "Stop": [{
    "hooks": [
      { "command": "osascript -e '...'" },
      { "command": "curl -X POST ..." },
      { "command": "say 'Claude is done' --voice=Sigrid" }
    ]
  }]
}
\`\`\`

> 🎯 Sigrid er íslensk rödd á Mac. Notaðu \`say --voice=?\` til að sjá allar.`,
      challenge: null,
    },
    {
      id: "m10-l5",
      title: "Smíðaðu Stop hook",
      type: "challenge",
      xp: 40,
      mins: 7,
      content: `Tími til að setja upp eigin hook.

**Verkefni:** Smíðaðu Stop hook sem sendir þér tilkynningu þegar Claude er búinn.

Velja:
- **Mac:** \`osascript\` notification
- **Linux:** \`notify-send\`
- **Cross-platform:** Slack webhook eða Discord`,
      challenge: {
        prompt: `Hjálpaðu mér að setja upp Stop hook sem sendir tilkynningu þegar Claude er búinn:

1. Hvar finn ég settings.json (\`~/.claude/settings.json\` vs \`.claude/settings.json\` í verkefni)?
2. Sýndu mér nákvæmt JSON sem ég á að bæta við fyrir mína OS (segðu mér hvert): Mac með osascript, Linux með notify-send, eða cross-platform með terminal bell.
3. Hvernig prófa: kalla á einhverja verkefni og bíða.
4. Bónus: bætið við hooks fyrir TypeScript check eftir Write — sýndu uppstillingu.

Útskýrðu allt á íslensku með kommentum.`,
        hint: "Þú getur líka keyrt /hooks skipun í Claude Code og notað innbyggt viðmót til að búa til hook.",
        template: `# ~/.claude/settings.json

{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude er búinn!\" with title \"Claude Code\"'"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx tsc --noEmit 2>&1 | tail -5"
          }
        ]
      }
    ]
  }
}`,
      },
    },
  ],
};

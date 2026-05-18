# Claude Code á Íslensku

Gagnvirkt námskeið sem kennir íslenskum þróunaraðilum að nota Claude Code á skilvirkan hátt. ADHD-vinsamleg hönnun, learn-by-doing með raunverulegan AI kennara, og XP gamification.

## Uppsetning

### 1. Setja upp dependencies

```bash
npm install
```

### 2. Bæta við API lykli

Búðu til `.env` skrá í rót verkefnisins (afritaðu úr `.env.example`):

```bash
cp .env.example .env
```

Settu Anthropic API lykilinn þinn (fæst á https://console.anthropic.com/):

```
ANTHROPIC_API_KEY=sk-ant-...
```

> ⚠️ `.env` er í `.gitignore` — aldrei commita hann.

### 3. Setja upp Netlify Identity (innskráning)

Innskráning og þvert-á-tæki vistun gangast fyrir með **Netlify Identity**.

1. Sendu verkefnið á Netlify (drag-and-drop í [app.netlify.com/drop](https://app.netlify.com/drop) eða tengdu Git repo).
2. Í Netlify dashboard → **Site configuration → Identity** → **Enable Identity**.
3. Stilltu **Registration** á `Open` eða `Invite only` eftir hvað þú vilt.
4. Afritaðu slóðina á síðuna (t.d. `https://your-site.netlify.app`) og settu í `.env`:
   ```
   VITE_NETLIFY_SITE_URL=https://your-site.netlify.app
   ```

> Í Netlify production þarf ekki að setja `VITE_NETLIFY_SITE_URL` — widgetinn finnur Identity sjálfkrafa. Aðeins í local dev.

### 4. Keyra dev server

```bash
npm run dev
```

Opnaðu http://localhost:5173 í vafranum og skráðu þig inn.

## Skipanir

| Skipun | Lýsing |
|--------|--------|
| `npm run dev` | Keyrir Vite dev server með proxy fyrir Anthropic API |
| `npm run build` | Byggir framleiðslupakka í `dist/` |
| `npm run preview` | Skoðar byggðan pakka locally |

## Hvernig API kallið virkar

Til að koma í veg fyrir að API lykillinn lendi í vafranum, notum við Vite dev server proxy:

- Browser kallar á `/api/messages` (relative URL — engin auth headers í kóðanum)
- Vite proxy bætir við `x-api-key` og `anthropic-version` headers úr `.env`
- Sendir áfram á `https://api.anthropic.com/v1/messages`

Þetta þýðir að API lykillinn er **aldrei** sendur til vafrans. Fyrir framleiðsluuppsetningu þarf raunverulegan backend (sjá Phase 4 í plani).

## Skráauppbygging

```
claude-code-namskeid/
├── index.html              # Vite entry HTML
├── package.json
├── vite.config.js          # Vite + Tailwind + API proxy
├── netlify.toml            # Netlify build + SPA redirects
├── .env.example            # Sniðmát fyrir umhverfisbreytur
├── .gitignore
├── CLAUDE.md               # Leiðbeiningar fyrir Claude Code
├── README.md               # Þessi skrá
└── src/
    ├── main.jsx            # React entry point
    ├── App.jsx             # Aðalapp
    ├── index.css           # Tailwind import + animations
    ├── components/
    │   └── LoginScreen.jsx # Innskráningarskjár (Netlify Identity)
    └── lib/
        └── auth.js         # Netlify Identity wrapper + user_metadata sync
```

## Tækni

- **React 18** með hooks
- **Vite 6** sem build tool
- **Tailwind CSS v4** fyrir stíla
- **Anthropic Messages API** (`claude-sonnet-4-20250514`)
- **Netlify Identity** fyrir innskráningu (cross-device sync í `user_metadata`)
- **localStorage** sem cache fyrir XP og framvindu

## Leiðbeiningar fyrir efnisbreytingar

Sjá `CLAUDE.md` fyrir reglur um:
- Hvernig á að bæta við lessons og modules
- Markdown renderer reglur
- Litatöflu og hönnunarreglur
- Gæðastaðla

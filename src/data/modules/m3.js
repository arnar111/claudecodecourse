export const m3 = {
  id: "m3",
  title: "Git — versions stjórnun",
  short: "Git",
  minutes: 24,
  accent: "#F97316",
  lessons: [
    {
      id: "m3-l1",
      title: "Hvað er Git?",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Save game fyrir kóða

Ímyndaðu þér tölvuleik þar sem þú ert að berjast við boss. Þú vistar (save) leikinn. Ef þú deyrð, byrjar þú frá síðustu vistun.

**Git er það sama fyrir kóða:**
- Þú "vistar" (kemur ⇒ commit) kóða þinn
- Ef eitthvað fer úrskeiðis, ferðu aftur á eldri vistun

# Þú þarft Git þegar

✅ Þú vinnur að verkefni í meira en einn dag
✅ Þú vinnur með öðrum
✅ Þú vilt prófa breytingar án þess að eyðileggja það sem virkaði
✅ Þú vilt deila verkefni á GitHub

# Setja upp

\`\`\`
$ git --version
git version 2.43.0
\`\`\`

Ef þú færð villu, þú þarft að setja upp git:
- **Mac:** \`brew install git\` (eða það kemur með Xcode tools)
- **Linux:** \`sudo apt install git\`
- **Windows:** [git-scm.com](https://git-scm.com/)

# Fyrst af öllu — kynntu þig

\`\`\`
$ git config --global user.name "Arnar Þór"
$ git config --global user.email "arnar@example.com"
\`\`\`

Þessar upplýsingar fara á hverja "vistun" sem þú gerir. Þær eru opinberar.`,
      challenge: null,
    },
    {
      id: "m3-l2",
      title: "Fyrsta repo",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Hvað er repository?

**Repo** (stytting fyrir repository) er bara mappa með Git-virkni. Þú segir Git "hér er verkefnið mitt" og Git byrjar að fylgjast með breytingum.

# git init — byrja repo

\`\`\`
$ mkdir mitt-verkefni
$ cd mitt-verkefni
$ git init
Initialized empty Git repository in /Users/arnar/mitt-verkefni/.git/
\`\`\`

Nú er þessi mappa Git-repo. \`.git/\` mappan er falin — hún geymir alla söguna. **Ekki snerta hana.**

# git status — hvernig er staðan?

Mikilvægasta skipunin. Sýnir þér:
- Hvaða skrár hafa breyst
- Hvaða skrár eru "staged" (tilbúnar í commit)
- Hvaða skrár eru ekki enn fylgst með

\`\`\`
$ git status
On branch main
No commits yet

Untracked files:
  hello.txt
\`\`\`

> 🎯 **Regla:** Þegar þú ert óviss, gerðu \`git status\`. Allir gera þetta — frá nemendum til pro.

# .gitignore

Sumar skrár vilt þú ALDREI að fari í Git:
- \`.env\` (secrets)
- \`node_modules/\` (of stórt, hægt að setja upp aftur)
- Tímabundnar skrár

Búðu til \`.gitignore\` skrá:

\`\`\`
node_modules/
.env
*.log
.DS_Store
\`\`\`

Allt sem listast hér verður hunsað af Git.`,
      challenge: null,
    },
    {
      id: "m3-l3",
      title: "Commits — vistanir",
      type: "read",
      xp: 15,
      mins: 4,
      content: `# Tveggja-skrefa ferli

Git vinnur í **tveimur skrefum**:

1. **Staging** — velur hvaða breytingar fara með í næsta commit
2. **Commit** — vistar útvöldu breytingarnar með skilaboðum

# git add — staging

\`\`\`
$ git add hello.txt        # ein skrá
$ git add .                # allt í núverandi möppu og undirmöppum
$ git add src/             # heil mappa
\`\`\`

> ⚠️ Varúð með \`git add .\` — það bætir við ÖLLU sem hefur breyst. Athugaðu með \`git status\` fyrst.

# git commit — vistun

\`\`\`
$ git commit -m "Bæta við hello.txt"
[main (root-commit) abc1234] Bæta við hello.txt
 1 file changed, 1 insertion(+)
\`\`\`

\`-m\` flagið er **commit message** — stutt lýsing á því hvað þú gerðir.

# Góð commit messages

✅ \`feat: bæta við login skjá\`
✅ \`fix: stilling í dark mode missir XP\`
✅ \`docs: uppfæra README\`

❌ \`stuff\`
❌ \`asdf\`
❌ \`final final FINAL fix v2\`

# git log — söguskoðun

\`\`\`
$ git log --oneline
abc1234 (HEAD -> main) Bæta við hello.txt
\`\`\`

Sýnir allar vistanir, nýjustu efst.

> 💡 **Tip:** Claude Code gerir oft \`git status\` og \`git log\` áður en hann gerir breytingar — til að skilja hvar þú ert. Þú getur líka beðið hann að gera commit fyrir þig: "Búðu til commit fyrir þessar breytingar."`,
      challenge: null,
    },
    {
      id: "m3-l4",
      title: "Branches — útgáfur",
      type: "read",
      xp: 20,
      mins: 5,
      content: `# Branches í einföldu máli

Ímyndaðu þér að þú sért að skrifa bók. Þú vilt prófa nýjan kafla en ert ekki viss hvort hann sé góður.

Þú gætir:
1. Skrifað hann beint í aðal-skjalið (áhætta — eyðileggur það sem virkaði)
2. Tekið **afrit**, prófað þar, og fært yfir EF gott

Branch er **option 2** fyrir kóða.

# main / master branch

Aðal-greinin í Git-i. Þetta er "hin opinbera útgáfa". Þú vilt að hún virki ALLTAF.

# Búa til branch

\`\`\`
$ git checkout -b feature/login
Switched to a new branch 'feature/login'
\`\`\`

Nú ertu á nýrri grein. Allar breytingar hér eru aðskildar frá \`main\`.

**Algeng nöfn:**
- \`feature/login\` — nýtt feature
- \`fix/dark-mode-bug\` — laga villu
- \`docs/readme\` — uppfæra documentation

# Skipta á milli greina

\`\`\`
$ git checkout main         # skipta í main
$ git checkout feature/login # til baka
$ git branch                # sjá allar greinar
\`\`\`

# Merge — sameina

Þegar þú ert ánægð(ur) með breytingarnar:

\`\`\`
$ git checkout main
$ git merge feature/login
\`\`\`

Allar breytingarnar úr \`feature/login\` eru nú í \`main\`.

# Merge conflicts

Stundum reka tvær greinar saman á sömu línum. Þá biður Git þig að velja hvor útgáfan á að halda. **Engin ástæða til að örvænta** — þetta er normal partur af þróun.

> 🎯 Claude Code er mjög góður í að leysa conflicts. Bara segðu: "Leystu þennan merge conflict fyrir mig."`,
      challenge: null,
    },
    {
      id: "m3-l5",
      title: "Push á GitHub",
      type: "challenge",
      xp: 40,
      mins: 8,
      content: `# GitHub — Git í skýinu

GitHub er vefsíða þar sem þú geymir Git-repoin þín á netinu. Þannig:
- Getur þú vistað kóðann öruggan
- Aðrir geta séð hann
- Þú getur unnið með liðsmönnum
- Þú getur deploy-að

# Lykilhugtök

| Hugtak | Þýðing |
|--------|--------|
| **clone** | Sækja repo frá GitHub niður á tölvuna |
| **push** | Senda þínar breytingar upp á GitHub |
| **pull** | Sækja nýjar breytingar frá GitHub niður |
| **remote** | "Fjarlæga" útgáfan af repo-inu (þ.e. GitHub) |

# Verkefni

Búðu til þitt fyrsta GitHub repo og pushaðu kóða í það.`,
      challenge: {
        prompt: `Hjálpaðu mér að setja upp fyrsta GitHub repo-ið mitt:

1. Hvernig bý ég til reikning á GitHub.com?
2. Hvernig set ég upp SSH lykla (eða HTTPS) til að geta push-að?
3. Sýndu mér hvernig á að:
   - Búa til nýtt repo á GitHub
   - Tengja staðbundið repo við það (git remote add origin ...)
   - Pusha fyrsta commit-ið (git push -u origin main)
4. Útskýrðu hvað \`-u\` flagið gerir í git push

Sýndu mér nákvæmar skipanir á íslensku.`,
        hint: "Á GitHub þegar þú býrð til nýtt repo, ekki láta það búa til README sjálfkrafa — þá þarftu ekki að gera git pull áður en þú pushar í fyrsta sinn.",
        template: `# Á GitHub.com: smelltu á + → New repository, gefðu nafn, ekki haka við "README"
# Í terminal:

cd mitt-verkefni
git remote add origin git@github.com:notandanafn/mitt-verkefni.git
git branch -M main
git push -u origin main`,
      },
    },
  ],
};

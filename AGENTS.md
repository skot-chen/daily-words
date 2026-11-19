# AGENTS.md — How to add new words to this repo

You are an AI assistant. The user gives you **word material** (a screenshot, photo, list or text of English words
with meanings) and this repo's URL. Your job: **add one new JSON file to `words/`** and commit it to `main`.
That is the whole job. GitHub Actions validates the file and publishes the website automatically.

- Repo: https://github.com/skot-chen/daily-words
- Live site: https://skot-chen.github.io/daily-words/
- Learner: Chinese native speaker, English level B1–B2.

## Rules (do not break)
1. **Only add files in `words/`** (and, when asked to answer questions, edit `answers/answers.json`). Do not edit `index.html`, `app.js`, `style.css`, `scripts/`, `.github/` or old word files
   unless the user explicitly asks you to fix something in them.
2. **One new file per batch**, named `words/YYYY-MM-DD.json` (the date the user gives the words, local time
   Asia/Shanghai unless the user says otherwise). If that file already exists, use `words/YYYY-MM-DD-2.json`, then `-3`, …
   Never overwrite an existing file — the learner's progress depends on old words staying.
3. File must be valid **UTF-8 JSON** (no comments, no trailing commas, straight double quotes `"`).
4. Copy `en`, `phonetic`, `pos`, `zh` **exactly from the user's material**. Only fill a field yourself if the material
   doesn't have it (e.g. phonetic missing → use British IPA like `/ˈwɜːd/`; meaning cut off in the image → write the
   most common meaning and tell the user which word you completed).
5. Write `sentence` and `sentence_zh` yourself (see "Sentence rules").
6. **🧩 Roots are required for every word** (the learner relies on them). Write `roots`, `hook`, `family` yourself
   (see "Word-root rules"). **Never invent etymology.** If a word truly has no usable real root (short Germanic words
   like seek, harm, crop), write `"no_roots": "reason in Chinese"` instead (optionally plus a `mnemonic`).
   The build **fails** if a word has none of `roots` / `hook` / `no_roots`.
7. **Never edit `notes/`.** `notes/notes.json` holds the learner's own notes (my sentence / note / 一句话串记 / ❓ question),
   written by the website's "☁ Sync to GitHub" with commits named "Update my notes (N)". If a push is rejected
   because of such a commit, just `git pull --rebase` and push again — your word file and the notes never conflict.

## File format (fixed — keep exactly this shape)
```json
{
  "date": "2026-11-10",
  "title": "第2组 Set 2",
  "words": [
    {
      "en": "advance",
      "phonetic": "/ədˈvɑːns/",
      "pos": "v./n.",
      "zh": "推进；促进；进步",
      "sentence": "Medical science has advanced a lot in the last fifty years.",
      "sentence_zh": "过去五十年里，医学进步了很多。",
      "roots": "a(b)-（从）+ vance（= ante，在前面）→ 往前去",
      "hook": "advantage 优势：同一个 van(t)「在前面」",
      "family": ["advantage 优势", "vanguard 先锋"]
    }
  ]
}
```

| Field | Required | Notes |
|---|---|---|
| `date` | yes | Must equal the date in the file name (`YYYY-MM-DD`). |
| `title` | no | Short label shown in the menu. Convention: `第N组 Set N` (N = number of existing word files + 1). A topic may follow, e.g. `第2组 Set 2 · Business`. |
| `words` | yes | Non-empty array, keep the user's order. |
| `en` | yes | The English word or phrase — this is the answer the learner types. Lowercase unless it is a proper noun. |
| `zh` | yes | Chinese meanings, separated by `；` (full-width semicolon). |
| `phonetic` | no | IPA with slashes, e.g. `/bɜːst/`. |
| `pos` | no | `n.` `v.` `adj.` `adv.` `prep.` `conj.` `phr.` — combine with `/`, e.g. `n./v.` |
| `sentence` | no (strongly wanted) | Example sentence, see rules below. |
| `sentence_zh` | no (strongly wanted) | Natural Chinese translation of `sentence`. |
| `roots` | **yes*** | 🧩 Real morpheme breakdown in Chinese: `前缀（意思）+ 词根（意思）+ 后缀（意思）→ 字面意思 → 现在的意思`. |
| `hook` | no | 🔗 One **familiar** word (primary/middle-school level) that truly shares the root, + why. Format: `熟词 中文：说明`. |
| `family` | no | 🌲 List of 2–3 (max 5) **real** same-root words, each `"word 中文"`. |
| `mnemonic` | no | 💭 Only when there is no usable real root: a memory trick. The site labels it "不是真词源". |
| `no_roots` | **yes*** | Only when the word has no usable real root: the reason in Chinese, e.g. `"古英语日常词，没有好用的词根"`. Not shown on the site. |

* Every word needs `roots` (with `hook`/`family` when possible) **or** `no_roots`. Most words have a real root — use
`no_roots` rarely (at most a few per set).

No other fields. Unknown fields are ignored and produce a warning. Shown on the site only after the learner
answers (so they never give away the spelling).

## Sentence rules
- B1–B2 level, natural everyday or news English, 8–16 words, one sentence.
- The sentence **must contain the word starting with exactly the letters of `en`**
  (`advance` → "advanced" ✓, `define` → "defined" ✓; `buy` → "bought" ✗). The website blanks this word for fill-in practice.
  Irregular forms don't match — use the base form or a regular `-s/-ed/-ing/-ly` form instead.
- Use the most common meaning (the first one in `zh`).
- Avoid names of real living people, politics, and anything sad or violent.

## Word-root rules (🧩 roots / hook / family / mnemonic)
The learner remembers better through **real** word families. Wrong etymology is worse than none.
- Use only etymology you are confident is standard (what Etymonline / Oxford would say). Typical: Latin/Greek roots
  (`fac/fic/fect` 做, `nov` 新, `tract` 拉, `spec/spect` 看, `mot` 动, `dict` 说, `cess` 走 …) and clear prefixes/suffixes.
- `hook` must be a **true cognate or same-root word** the learner already knows (fact, new, middle, motor, police …).
  You may name the sound-change pattern the learner uses — 元音互换 / 哥科呵(g,k,h) / 德特斯(d,t,s) / u,v,w /
  摩诺勒日(m,n,l,r) / 波破莫分屋(b,p,m,f,v) — **only when the two words really are related**
  (✓ new ↔ nov, middle ↔ medi, lean ↔ clin; ✗ moon ↔ luna, glue ↔ clue, rest ↔ rust, fine ↔ bene — not related).
- Germanic everyday words often have no useful root (boost, gain, struggle, trend …): leave `roots` out. A real English
  cognate in `hook` is fine (raise ↔ rise).
- If you want to give a pure memory trick, put it in `mnemonic`, never in `roots`/`hook`.
- Keep each field one short line of simple Chinese; no academic terms (no "PIE", "Grimm's law").

## Answering the learner's questions (❓ → 🤖)
The learner writes questions about words while practising (e.g. "chief 和 achieve 有什么关系？"). They are in
`notes/notes.json` as the field `"q"` of a word's note, and/or pasted to you in the chat. Your job when asked:
1. Collect the questions: those pasted to you **plus** every note in `notes/notes.json` whose `q` has no answer yet
   (no entry in `answers/answers.json` for that word with the same `q`).
2. Research each one carefully. Same standard as "Word-root rules": **real etymology only** (Etymonline / Oxford level).
   If two words are NOT related, say so clearly and explain why they look alike — that is a good answer too.
   Help memory: show the shared root, 2–4 real family words, and one short example sentence if useful.
3. Write the answers to **`answers/answers.json`** (create it if missing; never delete old answers; `notes/` stays untouched):
```json
{
  "version": 1,
  "answers": {
    "chief": [
      {
        "q": "chief 和 achieve 有什么关系？",
        "a": "有关系！两个词都来自拉丁语 caput（头）。chief = 头领；achieve = a-（到）+ chief（头）→「做到头」→ 完成、实现。同族：captain 船长、capital 首都。",
        "date": "2026-11-19",
        "by": "Claude"
      }
    ]
  }
}
```
   - Key = the word's `en`, lowercased. `q` = copy the learner's question **exactly** (the site uses it to mark the question as answered).
   - `a` = simple Chinese (the learner is B1–B2), English words as they are, 2–5 short sentences. No academic terms.
   - A question that is about several words: put the answer under the word the note belongs to.
4. Commit `Answer questions YYYY-MM-DD (N)` to `main`, check the Actions run is green, and tell the user in simple Chinese
   what you found. If an answer shows that a word's `roots`/`hook` in `words/*.json` is wrong, do not change the
   word file yourself — tell the user and ask.

## How to commit
Any of these works:
- **git**: clone, add the file, `git commit -m "Add words YYYY-MM-DD (N words)"`, push to `main`.
- **GitHub API / MCP** (`create_or_update_file`, or `PUT /repos/skot-chen/daily-words/contents/words/YYYY-MM-DD.json`) on branch `main`
  with message `Add words YYYY-MM-DD (N words)`.
- **GitHub web**: Add file → Create new file → `words/YYYY-MM-DD.json` → Commit to `main`.

If you can run Node, validate first: `node scripts/build.mjs` (prints `OK: …` or `ERROR …`; no dependencies needed).

## After committing — verify
1. Check the latest run of **Actions → "Validate and deploy"** is green
   (`gh run list -R skot-chen/daily-words -L 1`). Red = the file has an error; read the log, fix the file, commit again.
   While it is red the live site keeps the old version, nothing breaks.
2. About 1 minute later the new set appears at the top of the menu on https://skot-chen.github.io/daily-words/
   (data is at `https://skot-chen.github.io/daily-words/data.json`).
3. Open the new set on the live site and check that 🧩 词根拆解 shows for the words.
4. Tell the user (in simple Chinese): the file you added, how many words, any word whose meaning or phonetic you
   filled in yourself, and which words got `no_roots` (and why).

## How the site uses the data (for context only)
`scripts/build.mjs` merges all `words/*.json` into `_site/data.json`. The page has 5 modes — Write (默写),
Listen (听写), Cards (认词), Print (A4 默写纸), Summary (日/周/月总结 with most-missed words and spelling-error types) —
plus a spaced-review list ("Today's review", words return after 1, 2, 4, 7, 15, 30 days) and Favourites (收藏).
Progress, favourites and practice history are keyed by `en` (lowercased) and stored in the learner's browser,
so **never rename or delete existing words**. The learner's synced notes (`notes/notes.json`, also keyed by
lowercased `en`) are merged into `data.json` as `notes` and shown under each word. Repeating a word in a later file is allowed (it shares progress), but
avoid it unless the user wants it.

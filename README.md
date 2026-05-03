# Praxis 5003 Practice Test

A free, hosted practice site for the **Praxis 5003 Elementary Education: Mathematics** subtest. Filterable by grade band and topic, with full timed simulations, mark-for-review, on-screen calculator, score history, and step-by-step worked solutions for every question.

## Quickstart — three ways to run

### 1. Zero tools (simplest)

Double-click `index.html`. That's it. Works because the question bank is loaded as a script (no `fetch()`/CORS issues with `file://`).

### 2. Python's built-in server

```bash
python -m http.server 8000
```

Open http://localhost:8000. No install, no venv — `http.server` is in the Python stdlib.

### 3. Hot-reload server (for editing questions)

Useful when authoring or editing `questions.js` and you want the browser to refresh automatically.

```bash
python -m venv .venv
.venv\Scripts\activate           # Windows
# source .venv/bin/activate      # macOS / Linux
pip install -r requirements.txt
python serve.py
```

Open http://localhost:8000. Edit any `.js`/`.css`/`.html` and the page refreshes.

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/praxis-5003-practice.git
git push -u origin main
```

Then on github.com:

1. **Settings** → **Pages**
2. **Source**: `main` branch, root (`/`)
3. Save.

Site goes live at `https://<you>.github.io/praxis-5003-practice/` in about a minute. Future edits: edit, commit, push — auto-deploys.

## Editing questions

All questions live in `questions.js` as a `window.QUESTIONS = [...]` array. Each item is a self-describing object — see the schema documented inline in that file.

After editing, validate the bank with both checkers:

```bash
python validate.py    # schema linter
python verify.py      # independent reference computation per question
```

`validate.py` catches structural problems — missing fields, out-of-range answer indices, unknown topic tags, duplicate IDs.

`verify.py` recomputes each question's answer in pure Python and compares to the stored bank. This is a second, independent computation, so any arithmetic error or answer-index mistake shows up as a `FAIL`. Pedagogical questions (where the "answer" is a misconception explanation rather than a number) are tagged `skip` and need separate prose review.

## Project structure

| File | Purpose |
|---|---|
| `index.html` | All views in one page (setup, test-taking, review, history) |
| `styles.css` | Mobile-responsive styles |
| `app.js` | State machine, filtering, scoring, timer |
| `calculator.js` | Draggable on-screen calculator widget |
| `questions.js` | The question bank (`window.QUESTIONS = [...]`) |
| `validate.py` | Schema linter — run before each commit |
| `generators/` | Placeholder for future procedural-gen scripts |
| `serve.py` | Optional dev server with hot-reload |
| `requirements.txt` | Just `livereload` for the dev server |

GitHub Pages serves only the static frontend files. Everything Python (`*.py`, `requirements.txt`, `generators/`) is dev-only and ignored by Pages.

## Test coverage

The bank covers the three Praxis 5003 content domains in their published proportions:

| Domain | Share | Question count (target) |
|---|---|---|
| Numbers & Operations | 40% | ~60 |
| Algebraic Thinking | 30% | ~45 |
| Geometry, Measurement, Data, Statistics & Probability | 30% | ~45 |

Cross-cut by grade band (K–2 / 3–4 / 5–6) and tagged with difficulty. ~20% of questions are pedagogically flavored (identifying a student's misconception) — a distinctive Praxis style.

## Accuracy disclaimer

Questions are hand-authored and double-checked, but errors can creep in. If you spot a wrong answer, edit `questions.js` and push — Pages redeploys in ~1 minute. **For best calibration to the real exam, supplement this site with the official ETS Praxis 5003 Interactive Practice Test** (~$20–30 at praxis.ets.org).

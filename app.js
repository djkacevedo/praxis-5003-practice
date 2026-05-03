/* Praxis 5003 Practice Test — main app logic.
   Single-file SPA. Reads window.QUESTIONS (from questions.js).
   State persisted in localStorage; no backend.
*/
(function () {
  "use strict";

  // ============================================================
  // Constants
  // ============================================================
  const STORAGE_KEY = "praxis5003_history_v1";
  const SECONDS_PER_QUESTION = 78; // real test: 50q / 65min ≈ 78 sec/q

  const DOMAIN_NAMES = {
    numbers_operations: "Numbers & Operations",
    algebraic_thinking: "Algebraic Thinking",
    geometry_measurement_data: "Geometry, Measurement & Data",
  };

  const TOPIC_NAMES = {
    // Numbers & Operations
    place_value: "Place value",
    whole_number_ops: "Whole-number operations",
    fractions: "Fractions",
    decimals: "Decimals",
    ratios_proportions: "Ratios & proportions",
    percentages: "Percentages",
    prime_factorization_number_theory: "Prime factorization & number theory",
    estimation_mental_math: "Estimation & mental math",
    // Algebraic Thinking
    patterns_sequences: "Patterns & sequences",
    expressions: "Expressions",
    equations_inequalities: "Equations & inequalities",
    functions: "Functions",
    properties_of_operations: "Properties of operations",
    // Geometry, Measurement, Data
    shapes: "Shapes",
    area_perimeter_volume: "Area, perimeter, volume",
    transformations: "Transformations",
    coordinate_plane: "Coordinate plane",
    unit_conversion: "Unit conversion",
    data_displays: "Data displays",
    central_tendency: "Mean, median, mode, range",
    probability: "Probability",
  };

  const TOPIC_TO_DOMAIN = {
    place_value: "numbers_operations",
    whole_number_ops: "numbers_operations",
    fractions: "numbers_operations",
    decimals: "numbers_operations",
    ratios_proportions: "numbers_operations",
    percentages: "numbers_operations",
    prime_factorization_number_theory: "numbers_operations",
    estimation_mental_math: "numbers_operations",
    patterns_sequences: "algebraic_thinking",
    expressions: "algebraic_thinking",
    equations_inequalities: "algebraic_thinking",
    functions: "algebraic_thinking",
    properties_of_operations: "algebraic_thinking",
    shapes: "geometry_measurement_data",
    area_perimeter_volume: "geometry_measurement_data",
    transformations: "geometry_measurement_data",
    coordinate_plane: "geometry_measurement_data",
    unit_conversion: "geometry_measurement_data",
    data_displays: "geometry_measurement_data",
    central_tendency: "geometry_measurement_data",
    probability: "geometry_measurement_data",
  };

  // ============================================================
  // State
  // ============================================================
  const State = {
    screen: "setup",
    config: {
      mode: "practice",
      timing: "untimed",
      grade_band: "all",
      domain: "all",
      topics: [],
      count: 10,
    },
    session: null,
    timerInterval: null,
  };

  // ============================================================
  // Utilities
  // ============================================================
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function arrEqAsSet(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    const sa = new Set(a), sb = new Set(b);
    if (sa.size !== sb.size) return false;
    for (const v of sa) if (!sb.has(v)) return false;
    return true;
  }

  function formatTime(seconds) {
    seconds = Math.max(0, Math.floor(seconds));
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function letterFor(i) { return "ABCDEFGH"[i] || String(i + 1); }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Renders text with very light formatting:
  //   **bold** , line breaks preserved.
  function renderText(s) {
    return escapeHtml(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  }

  // ============================================================
  // Filtering & session setup
  // ============================================================
  function getFilteredQuestions() {
    const c = State.config;
    return (window.QUESTIONS || []).filter(q => {
      if (c.grade_band !== "all" && q.grade_band !== c.grade_band) return false;
      if (c.domain !== "all" && q.domain !== c.domain) return false;
      if (c.topics.length > 0 && !c.topics.includes(q.topic)) return false;
      return true;
    });
  }

  function shuffleChoicesForQuestion(q) {
    if (q.format === "multiple_choice") {
      const idx = q.choices.map((_, i) => i);
      const order = shuffle(idx);
      return Object.assign({}, q, {
        choices: order.map(i => q.choices[i]),
        answer_index: order.indexOf(q.answer_index),
        _shuffleMap: order,
      });
    }
    if (q.format === "select_all") {
      const idx = q.choices.map((_, i) => i);
      const order = shuffle(idx);
      return Object.assign({}, q, {
        choices: order.map(i => q.choices[i]),
        answer_indices: q.answer_indices.map(ai => order.indexOf(ai)),
        _shuffleMap: order,
      });
    }
    return Object.assign({}, q);
  }

  function startSession(opts) {
    let pool = getFilteredQuestions();
    let count = opts && opts.count !== undefined ? opts.count : (State.config.count === "all" ? pool.length : Math.min(parseInt(State.config.count, 10), pool.length));
    if (opts && opts.fullSim) {
      // Mirror real-test proportions across whatever domains exist.
      pool = (window.QUESTIONS || []).slice();
      count = Math.min(50, pool.length);
      const target = { numbers_operations: 0.40, algebraic_thinking: 0.30, geometry_measurement_data: 0.30 };
      const byDomain = {};
      for (const d of Object.keys(target)) byDomain[d] = pool.filter(q => q.domain === d);
      const picked = [];
      let remaining = count;
      const dKeys = Object.keys(target);
      // First pass: take target share where possible
      for (const d of dKeys) {
        const want = Math.round(count * target[d]);
        const got = shuffle(byDomain[d]).slice(0, Math.min(want, byDomain[d].length));
        picked.push(...got);
        remaining -= got.length;
      }
      // Fill remaining from any unused
      if (remaining > 0) {
        const usedIds = new Set(picked.map(q => q.id));
        const leftovers = shuffle(pool.filter(q => !usedIds.has(q.id))).slice(0, remaining);
        picked.push(...leftovers);
      }
      pool = shuffle(picked);
    } else {
      pool = shuffle(pool).slice(0, count);
    }

    if (pool.length === 0) {
      alert("No questions match those filters. Try widening your selection.");
      return;
    }

    const questions = pool.map(shuffleChoicesForQuestion);

    let timeLimit = null;
    if (State.config.timing === "timed" || (opts && opts.fullSim)) {
      const seconds = (opts && opts.fullSim) ? 65 * 60 : SECONDS_PER_QUESTION * questions.length;
      timeLimit = seconds * 1000;
    }

    State.session = {
      questions,
      answers: {},          // questionId -> answer (number | string | array)
      revealed: {},         // questionId -> bool (solution shown in practice mode)
      hinted: {},           // questionId -> bool
      marked: new Set(),
      currentIndex: 0,
      startTime: Date.now(),
      timeLimit,
      submitted: false,
      mode: (opts && opts.fullSim) ? "test" : State.config.mode,
    };

    switchScreen("test");
    if (timeLimit) startTimer(timeLimit);
    renderTestScreen();
  }

  // ============================================================
  // Scoring
  // ============================================================
  function isCorrect(q, answer) {
    if (answer === undefined || answer === null || answer === "") return false;
    if (q.format === "multiple_choice") return answer === q.answer_index;
    if (q.format === "numeric_entry") {
      const userVal = parseFloat(String(answer).replace(/,/g, "").trim());
      if (isNaN(userVal)) return false;
      const correctVal = parseFloat(q.answer);
      const tol = q.tolerance != null ? Number(q.tolerance) : 0;
      return Math.abs(userVal - correctVal) <= tol + 1e-9;
    }
    if (q.format === "select_all") return arrEqAsSet(answer, q.answer_indices);
    return false;
  }

  function calcScore() {
    const s = State.session;
    let correct = 0, total = s.questions.length, answered = 0;
    const byDomain = {};
    const byTopic = {};
    for (const q of s.questions) {
      const ans = s.answers[q.id];
      const ok = isCorrect(q, ans);
      if (ans !== undefined) answered++;
      if (ok) correct++;
      byDomain[q.domain] = byDomain[q.domain] || { correct: 0, total: 0 };
      byDomain[q.domain].total++;
      if (ok) byDomain[q.domain].correct++;
      byTopic[q.topic] = byTopic[q.topic] || { correct: 0, total: 0 };
      byTopic[q.topic].total++;
      if (ok) byTopic[q.topic].correct++;
    }
    return { correct, total, answered, byDomain, byTopic };
  }

  // ============================================================
  // Timer
  // ============================================================
  function startTimer(durationMs) {
    stopTimer();
    const endAt = Date.now() + durationMs;
    State.session.endAt = endAt;
    const el = $("#timer");
    el.classList.remove("hidden");
    function tick() {
      const remaining = endAt - Date.now();
      el.textContent = formatTime(remaining / 1000);
      el.classList.toggle("warning", remaining < 5 * 60 * 1000 && remaining >= 60 * 1000);
      el.classList.toggle("urgent", remaining < 60 * 1000);
      if (remaining <= 0) {
        stopTimer();
        submitTest({ auto: true });
      }
    }
    tick();
    State.timerInterval = setInterval(tick, 250);
  }

  function stopTimer() {
    if (State.timerInterval) clearInterval(State.timerInterval);
    State.timerInterval = null;
  }

  // ============================================================
  // Render — setup screen
  // ============================================================
  function populateTopicCheckboxes() {
    const c = State.config;
    const allQs = window.QUESTIONS || [];
    // Topics present in current grade-band + domain filter
    const topicsByDomain = {};
    for (const q of allQs) {
      if (c.grade_band !== "all" && q.grade_band !== c.grade_band) continue;
      if (c.domain !== "all" && q.domain !== c.domain) continue;
      topicsByDomain[q.domain] = topicsByDomain[q.domain] || new Set();
      topicsByDomain[q.domain].add(q.topic);
    }
    const container = $("#filter-topics");
    container.innerHTML = "";
    const domains = Object.keys(topicsByDomain).sort();
    if (domains.length === 0) {
      container.innerHTML = "<em>No topics match these filters yet.</em>";
      return;
    }
    for (const d of domains) {
      const header = document.createElement("div");
      header.className = "topic-domain-header";
      header.style.gridColumn = "1 / -1";
      header.textContent = DOMAIN_NAMES[d] || d;
      container.appendChild(header);
      const sortedTopics = Array.from(topicsByDomain[d]).sort((a, b) => (TOPIC_NAMES[a] || a).localeCompare(TOPIC_NAMES[b] || b));
      for (const t of sortedTopics) {
        const id = "topic-" + t;
        const lbl = document.createElement("label");
        lbl.innerHTML = `<input type="checkbox" id="${id}" value="${t}" ${c.topics.includes(t) ? "checked" : ""}> ${escapeHtml(TOPIC_NAMES[t] || t)}`;
        container.appendChild(lbl);
      }
    }
    // Re-bind checkbox change
    $$("input[type=checkbox]", container).forEach(cb => {
      cb.addEventListener("change", function () {
        if (cb.checked) {
          if (!c.topics.includes(cb.value)) c.topics.push(cb.value);
        } else {
          c.topics = c.topics.filter(x => x !== cb.value);
        }
        updateMatchCount();
      });
    });
  }

  function updateMatchCount() {
    const n = getFilteredQuestions().length;
    const el = $("#match-count");
    el.textContent = n === 0 ? "No questions match these filters." : `${n} question${n === 1 ? "" : "s"} match`;
    $("#start-btn").disabled = (n === 0);
  }

  function bindSetupControls() {
    $$("input[name=mode]").forEach(r => r.addEventListener("change", e => { State.config.mode = e.target.value; }));
    $$("input[name=timing]").forEach(r => r.addEventListener("change", e => { State.config.timing = e.target.value; }));

    $("#filter-grade").addEventListener("change", e => {
      State.config.grade_band = e.target.value;
      // Reset topics that no longer apply
      State.config.topics = [];
      populateTopicCheckboxes();
      updateMatchCount();
    });
    $("#filter-domain").addEventListener("change", e => {
      State.config.domain = e.target.value;
      State.config.topics = [];
      populateTopicCheckboxes();
      updateMatchCount();
    });
    $("#filter-count").addEventListener("change", e => {
      State.config.count = e.target.value;
    });

    $("#start-btn").addEventListener("click", () => startSession({}));
    $("#full-sim-btn").addEventListener("click", () => startSession({ fullSim: true }));
  }

  // ============================================================
  // Render — test screen
  // ============================================================
  function currentQuestion() {
    return State.session.questions[State.session.currentIndex];
  }

  function renderTestScreen() {
    const s = State.session;
    const q = currentQuestion();
    $("#progress-text").textContent = `Question ${s.currentIndex + 1} of ${s.questions.length}`;

    // Mark button state
    const markBtn = $("#mark-review-btn");
    markBtn.classList.toggle("marked", s.marked.has(q.id));
    markBtn.textContent = s.marked.has(q.id) ? "Marked ★" : "Mark for review";

    // Calculator availability
    const calcBtn = $("#toggle-calc-btn");
    if (q.calculator_allowed === false) {
      calcBtn.disabled = true;
      calcBtn.title = "Calculator not allowed on this question";
      window.Calculator.setEnabled(false);
    } else {
      calcBtn.disabled = false;
      calcBtn.title = "";
      window.Calculator.setEnabled(true);
    }

    // Question display
    const qd = $("#question-display");
    const tags = [];
    tags.push(`<span class="tag">${escapeHtml(DOMAIN_NAMES[q.domain] || q.domain)}</span>`);
    tags.push(`<span class="tag">${escapeHtml(TOPIC_NAMES[q.topic] || q.topic)}</span>`);
    tags.push(`<span class="tag">Grade ${escapeHtml(q.grade_band)}</span>`);
    if (q.pedagogical) tags.push(`<span class="tag pedagogical">Pedagogical</span>`);
    if (q.calculator_allowed === false) tags.push(`<span class="tag no-calc">No calculator</span>`);
    else tags.push(`<span class="tag calc">Calculator OK</span>`);
    qd.innerHTML = `
      <div class="question-meta">${tags.join("")}</div>
      <div class="question-stem">${renderText(q.stem)}</div>
    `;

    renderAnswerArea(q);
    renderFeedbackAndSolution(q);
    renderNavGrid();
    renderTestControls();
  }

  function renderAnswerArea(q) {
    const s = State.session;
    const area = $("#answer-area");
    const userAns = s.answers[q.id];
    const locked = s.mode === "practice" && userAns !== undefined;

    if (q.format === "multiple_choice") {
      area.innerHTML = q.choices.map((c, i) => {
        const selected = userAns === i;
        let cls = "choice";
        if (selected) cls += " selected";
        if (locked) {
          if (i === q.answer_index) cls += " correct";
          else if (selected) cls += " wrong";
        }
        return `
          <div class="${cls}" data-choice="${i}">
            <span class="choice-letter">${letterFor(i)}.</span>
            <span class="choice-text">${renderText(c)}</span>
          </div>
        `;
      }).join("");
      $$(".choice", area).forEach(el => {
        el.addEventListener("click", () => {
          if (locked) return;
          const i = parseInt(el.dataset.choice, 10);
          recordAnswer(q.id, i);
        });
      });
    } else if (q.format === "numeric_entry") {
      const ok = locked ? isCorrect(q, userAns) : null;
      const cls = locked ? (ok ? "correct" : "wrong") : "";
      area.innerHTML = `
        <label>Your answer:
          <input type="text" inputmode="decimal" id="numeric-input" class="numeric-input ${cls}"
            value="${userAns != null ? escapeHtml(String(userAns)) : ""}" ${locked ? "disabled" : ""}>
        </label>
        <button id="numeric-submit" ${locked ? "disabled" : ""}>Submit answer</button>
        ${locked ? `<div style="margin-top:0.5em; color: var(--text-soft);">Correct answer: <strong>${escapeHtml(String(q.answer))}</strong></div>` : ""}
      `;
      const input = $("#numeric-input", area);
      const submit = $("#numeric-submit", area);
      function send() {
        const v = input.value.trim();
        if (v === "") return;
        recordAnswer(q.id, v);
      }
      submit.addEventListener("click", send);
      input.addEventListener("keydown", e => { if (e.key === "Enter") send(); });
      input.focus();
    } else if (q.format === "select_all") {
      const sel = Array.isArray(userAns) ? userAns : [];
      area.innerHTML = `
        <div style="font-size:0.9em; color: var(--text-soft); margin-bottom:0.5em;">Select all that apply.</div>
        ${q.choices.map((c, i) => {
          const selected = sel.includes(i);
          let cls = "choice";
          if (selected) cls += " selected";
          if (locked) {
            const isAnswer = q.answer_indices.includes(i);
            if (isAnswer) cls += " correct";
            else if (selected) cls += " wrong";
          }
          return `
            <div class="${cls}" data-choice="${i}">
              <span class="choice-letter">${letterFor(i)}.</span>
              <span class="choice-text">${renderText(c)}</span>
            </div>
          `;
        }).join("")}
        <button id="multi-submit" style="margin-top:0.5em" ${locked ? "disabled" : ""}>Submit answer</button>
      `;
      const tempSel = sel.slice();
      $$(".choice", area).forEach(el => {
        el.addEventListener("click", () => {
          if (locked) return;
          const i = parseInt(el.dataset.choice, 10);
          if (tempSel.includes(i)) tempSel.splice(tempSel.indexOf(i), 1);
          else tempSel.push(i);
          el.classList.toggle("selected");
        });
      });
      $("#multi-submit", area).addEventListener("click", () => {
        if (tempSel.length === 0) return;
        recordAnswer(q.id, tempSel.slice());
      });
    }
  }

  function renderFeedbackAndSolution(q) {
    const s = State.session;
    const userAns = s.answers[q.id];
    const fa = $("#feedback-area");
    const sa = $("#solution-area");
    fa.innerHTML = "";
    sa.classList.add("hidden");
    sa.innerHTML = "";

    if (s.mode === "practice" && userAns !== undefined) {
      const ok = isCorrect(q, userAns);
      const div = document.createElement("div");
      div.className = "feedback " + (ok ? "correct" : "wrong");
      div.textContent = ok ? "Correct!" : "Not quite — see the worked solution below.";
      fa.appendChild(div);
      // Auto-reveal solution in practice mode
      s.revealed[q.id] = true;
    }

    if (s.revealed[q.id] || s.hinted[q.id]) {
      sa.classList.remove("hidden");
      let html = "<h4>Worked solution</h4>";
      if (s.hinted[q.id] && !s.revealed[q.id]) {
        const firstLine = (q.explanation || "").split(/\n/)[0] || "(no hint available)";
        html += `<div class="solution-text"><em>Hint:</em> ${renderText(firstLine)}</div>`;
      } else {
        html += `<div class="solution-text">${renderText(q.explanation || "(no explanation provided)")}</div>`;
      }
      sa.innerHTML = html;
    }
  }

  function renderTestControls() {
    const s = State.session;
    const q = currentQuestion();
    const userAns = s.answers[q.id];

    $("#prev-btn").disabled = s.currentIndex === 0;
    $("#next-btn").disabled = s.currentIndex >= s.questions.length - 1;

    // Hint button: only meaningful when not yet revealed
    const hintBtn = $("#hint-btn");
    hintBtn.classList.toggle("hidden", s.mode === "practice" && userAns !== undefined);
    hintBtn.disabled = !!s.hinted[q.id] || !!s.revealed[q.id];

    // Show solution button: practice mode pre-answer, OR test mode? (Test mode hides solutions until end.)
    const showSolBtn = $("#show-solution-btn");
    if (s.mode === "test") {
      showSolBtn.classList.add("hidden");
    } else {
      showSolBtn.classList.remove("hidden");
      showSolBtn.disabled = !!s.revealed[q.id];
    }

    // Submit-test button: visible always; emphasized at end
    const submitBtn = $("#submit-btn");
    const isLast = s.currentIndex === s.questions.length - 1;
    submitBtn.textContent = isLast ? "Submit Test" : "Submit Test (early)";
  }

  function renderNavGrid() {
    const s = State.session;
    const grid = $("#nav-grid");
    grid.innerHTML = "";
    s.questions.forEach((q, i) => {
      const cell = document.createElement("div");
      cell.className = "nav-cell";
      const answered = s.answers[q.id] !== undefined;
      if (answered) cell.classList.add("answered");
      if (s.marked.has(q.id)) cell.classList.add("marked");
      if (i === s.currentIndex) cell.classList.add("current");
      cell.textContent = i + 1;
      cell.addEventListener("click", () => {
        s.currentIndex = i;
        renderTestScreen();
      });
      grid.appendChild(cell);
    });
  }

  function recordAnswer(questionId, answer) {
    const s = State.session;
    s.answers[questionId] = answer;
    if (s.mode === "practice") {
      s.revealed[questionId] = true; // auto-show solution after practice answer
    }
    renderTestScreen();
  }

  function bindTestControls() {
    $("#prev-btn").addEventListener("click", () => {
      if (State.session.currentIndex > 0) {
        State.session.currentIndex--;
        renderTestScreen();
      }
    });
    $("#next-btn").addEventListener("click", () => {
      if (State.session.currentIndex < State.session.questions.length - 1) {
        State.session.currentIndex++;
        renderTestScreen();
      }
    });
    $("#mark-review-btn").addEventListener("click", () => {
      const q = currentQuestion();
      if (State.session.marked.has(q.id)) State.session.marked.delete(q.id);
      else State.session.marked.add(q.id);
      renderTestScreen();
    });
    $("#hint-btn").addEventListener("click", () => {
      State.session.hinted[currentQuestion().id] = true;
      renderTestScreen();
    });
    $("#show-solution-btn").addEventListener("click", () => {
      State.session.revealed[currentQuestion().id] = true;
      renderTestScreen();
    });
    $("#submit-btn").addEventListener("click", () => {
      const s = State.session;
      const unanswered = s.questions.filter(q => s.answers[q.id] === undefined).length;
      if (unanswered > 0) {
        if (!confirm(`${unanswered} question${unanswered === 1 ? " is" : "s are"} unanswered. Submit anyway?`)) return;
      }
      submitTest({});
    });
    $("#toggle-calc-btn").addEventListener("click", () => window.Calculator.toggle());
  }

  // ============================================================
  // Submit & review
  // ============================================================
  function submitTest(opts) {
    if (!State.session || State.session.submitted) return;
    State.session.submitted = true;
    State.session.endTime = Date.now();
    stopTimer();
    window.Calculator.hide();
    saveSessionToHistory();
    switchScreen("review");
    renderReview();
    if (opts && opts.auto) {
      // Indicate auto-submit (timer ran out)
      const summary = $("#score-summary");
      const note = document.createElement("div");
      note.style.color = "var(--warning)";
      note.style.marginTop = "0.4rem";
      note.textContent = "Time's up — test auto-submitted.";
      summary.appendChild(note);
    }
  }

  function renderReview() {
    const s = State.session;
    const score = calcScore();
    const pct = score.total ? Math.round((score.correct / score.total) * 100) : 0;
    const cls = pct >= 80 ? "score-good" : pct >= 60 ? "score-mid" : "score-low";
    const elapsed = (s.endTime - s.startTime) / 1000;
    $("#score-summary").innerHTML = `
      <div class="score-meta">You answered ${score.answered} of ${score.total} question${score.total === 1 ? "" : "s"}</div>
      <div class="score-big ${cls}">${score.correct} / ${score.total}</div>
      <div class="score-meta">${pct}% correct · time: ${formatTime(elapsed)} · mode: ${s.mode}</div>
    `;

    $("#domain-breakdown").innerHTML = renderBreakdown("By domain", score.byDomain, DOMAIN_NAMES);
    $("#topic-breakdown").innerHTML = renderBreakdown("By topic", score.byTopic, TOPIC_NAMES);

    $("#all-questions").innerHTML = s.questions.map((q, i) => renderReviewQuestion(q, i, s.answers[q.id])).join("");
  }

  function renderBreakdown(title, data, names) {
    const rows = Object.keys(data).map(key => {
      const d = data[key];
      const pct = d.total ? d.correct / d.total : 0;
      const cls = pct >= 0.8 ? "good" : pct >= 0.6 ? "mid" : "low";
      return `
        <div class="breakdown-row">
          <span>${escapeHtml(names[key] || key)}</span>
          <span>
            <span class="bar"><span class="bar-fill ${cls}" style="width:${Math.round(pct * 100)}%"></span></span>
            <strong>${d.correct}/${d.total}</strong>
          </span>
        </div>
      `;
    }).join("");
    return `<div class="breakdown"><h4>${escapeHtml(title)}</h4>${rows || "<em>None</em>"}</div>`;
  }

  function renderReviewQuestion(q, i, ans) {
    const ok = isCorrect(q, ans);
    const status = ans === undefined ? "skipped" : (ok ? "correct" : "wrong");
    const statusText = ans === undefined ? "Skipped" : (ok ? "Correct" : "Wrong");

    let yourAnsHtml = "";
    let correctAnsHtml = "";
    if (q.format === "multiple_choice") {
      yourAnsHtml = ans !== undefined ? `${letterFor(ans)}. ${escapeHtml(q.choices[ans])}` : "(no answer)";
      correctAnsHtml = `${letterFor(q.answer_index)}. ${escapeHtml(q.choices[q.answer_index])}`;
    } else if (q.format === "numeric_entry") {
      yourAnsHtml = ans !== undefined ? escapeHtml(String(ans)) : "(no answer)";
      correctAnsHtml = escapeHtml(String(q.answer));
    } else if (q.format === "select_all") {
      yourAnsHtml = (Array.isArray(ans) && ans.length) ? ans.sort().map(j => letterFor(j)).join(", ") : "(no answer)";
      correctAnsHtml = q.answer_indices.slice().sort().map(j => letterFor(j)).join(", ");
    }

    return `
      <div class="review-q ${status}">
        <div class="review-q-header">
          <span class="review-q-num">Q${i + 1}</span>
          <span class="review-q-status ${status}">${statusText}</span>
          <span class="tag">${escapeHtml(TOPIC_NAMES[q.topic] || q.topic)}</span>
          <span class="tag">Grade ${escapeHtml(q.grade_band)}</span>
        </div>
        <div class="review-q-stem">${renderText(q.stem)}</div>
        <div class="review-q-answers">
          <div>Your answer: <strong>${yourAnsHtml}</strong></div>
          ${ok ? "" : `<div>Correct answer: <strong>${correctAnsHtml}</strong></div>`}
        </div>
        <div class="review-q-explanation">${renderText(q.explanation || "")}</div>
      </div>
    `;
  }

  function bindReviewControls() {
    $("#new-session-btn").addEventListener("click", () => {
      State.session = null;
      switchScreen("setup");
    });
  }

  // ============================================================
  // History (localStorage)
  // ============================================================
  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch (_) { return []; }
  }
  function saveHistory(arr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
  }
  function saveSessionToHistory() {
    const s = State.session;
    const score = calcScore();
    const entry = {
      date: new Date().toISOString(),
      mode: s.mode,
      timing: s.timeLimit ? "timed" : "untimed",
      total: score.total,
      correct: score.correct,
      pct: score.total ? Math.round((score.correct / score.total) * 100) : 0,
      durationSec: Math.round((s.endTime - s.startTime) / 1000),
      filter: {
        grade_band: State.config.grade_band,
        domain: State.config.domain,
        topics: State.config.topics.slice(),
      },
    };
    const arr = loadHistory();
    arr.push(entry);
    if (arr.length > 200) arr.splice(0, arr.length - 200); // cap
    saveHistory(arr);
  }

  function renderHistory() {
    const arr = loadHistory();
    const empty = $("#history-empty");
    const chart = $("#history-chart");
    const list = $("#history-list");
    if (arr.length === 0) {
      empty.classList.remove("hidden");
      chart.classList.add("hidden");
      list.innerHTML = "";
      return;
    }
    empty.classList.add("hidden");
    chart.classList.remove("hidden");

    drawHistoryChart(chart, arr);

    list.innerHTML = arr.slice().reverse().map(e => {
      const date = new Date(e.date).toLocaleString();
      const filterDesc = describeFilter(e.filter);
      const cls = e.pct >= 80 ? "score-good" : e.pct >= 60 ? "score-mid" : "score-low";
      return `
        <div class="history-item">
          <div class="history-date">${escapeHtml(date)}</div>
          <div class="history-score ${cls}">${e.correct}/${e.total} <small>(${e.pct}%)</small></div>
          <div class="history-meta">${escapeHtml(e.mode)} · ${escapeHtml(e.timing)} · ${formatTime(e.durationSec)}<br>${escapeHtml(filterDesc)}</div>
        </div>
      `;
    }).join("");
  }

  function describeFilter(f) {
    const parts = [];
    if (!f) return "all questions";
    if (f.grade_band && f.grade_band !== "all") parts.push(`grade ${f.grade_band}`);
    if (f.domain && f.domain !== "all") parts.push(DOMAIN_NAMES[f.domain] || f.domain);
    if (f.topics && f.topics.length) parts.push(`topics: ${f.topics.map(t => TOPIC_NAMES[t] || t).join(", ")}`);
    return parts.length ? parts.join(" · ") : "all questions";
  }

  function drawHistoryChart(canvas, entries) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const padding = { l: 36, r: 12, t: 16, b: 28 };
    const innerW = w - padding.l - padding.r;
    const innerH = h - padding.t - padding.b;

    // axis
    ctx.strokeStyle = "#d8dde6";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.l, padding.t);
    ctx.lineTo(padding.l, padding.t + innerH);
    ctx.lineTo(padding.l + innerW, padding.t + innerH);
    ctx.stroke();

    // y labels
    ctx.fillStyle = "#8a93a3";
    ctx.font = "11px sans-serif";
    [0, 25, 50, 75, 100].forEach(p => {
      const y = padding.t + innerH - (p / 100) * innerH;
      ctx.fillText(p + "%", 4, y + 4);
      ctx.strokeStyle = "#eef0f5";
      ctx.beginPath();
      ctx.moveTo(padding.l, y);
      ctx.lineTo(padding.l + innerW, y);
      ctx.stroke();
    });

    if (entries.length === 0) return;

    // points
    const n = entries.length;
    ctx.fillStyle = "#2563eb";
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2;
    ctx.beginPath();
    entries.forEach((e, i) => {
      const x = padding.l + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW);
      const y = padding.t + innerH - (e.pct / 100) * innerH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    entries.forEach((e, i) => {
      const x = padding.l + (n === 1 ? innerW / 2 : (i / (n - 1)) * innerW);
      const y = padding.t + innerH - (e.pct / 100) * innerH;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // x label
    ctx.fillStyle = "#8a93a3";
    ctx.fillText(`${n} session${n === 1 ? "" : "s"}`, padding.l, h - 8);
  }

  function bindHistoryControls() {
    $("#clear-history-btn").addEventListener("click", () => {
      if (confirm("Clear all session history? This cannot be undone.")) {
        saveHistory([]);
        renderHistory();
      }
    });
    const backLink = $("#history-back-link");
    if (backLink) backLink.addEventListener("click", e => { e.preventDefault(); switchScreen("setup"); });
  }

  // ============================================================
  // Screens
  // ============================================================
  function switchScreen(name) {
    State.screen = name;
    $$(".screen").forEach(el => el.classList.remove("active"));
    const target = $("#screen-" + name);
    if (target) target.classList.add("active");
    if (name === "setup") {
      populateTopicCheckboxes();
      updateMatchCount();
    } else if (name === "history") {
      renderHistory();
    }
    window.scrollTo(0, 0);
  }

  function bindTopbar() {
    $$(".nav-btn").forEach(b => {
      b.addEventListener("click", () => switchScreen(b.dataset.screen));
    });
  }

  // ============================================================
  // Bootstrap
  // ============================================================
  function init() {
    if (!window.QUESTIONS || !Array.isArray(window.QUESTIONS) || window.QUESTIONS.length === 0) {
      const main = document.querySelector("main");
      main.innerHTML = `<div style="padding:2rem; text-align:center; color: var(--wrong);">
        <h2>Question bank not loaded</h2>
        <p>Could not find <code>window.QUESTIONS</code>. Make sure <code>questions.js</code> exists alongside <code>index.html</code>.</p>
      </div>`;
      return;
    }
    bindTopbar();
    bindSetupControls();
    bindTestControls();
    bindReviewControls();
    bindHistoryControls();
    populateTopicCheckboxes();
    updateMatchCount();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

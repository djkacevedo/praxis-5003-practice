/* Floating, draggable on-screen calculator.
   Operates on a simple expression buffer; supports + - * / sqrt and parentheses-free chained ops via running result.
   Public API:
     Calculator.show(), Calculator.hide(), Calculator.toggle(), Calculator.setEnabled(bool)
*/
(function () {
  const container = document.getElementById("calculator-container");
  let calcEl = null;
  let visible = false;
  let enabled = true;

  // State: we hold a running result, the pending operator, and the current operand being typed.
  let display = "0";
  let acc = null;        // accumulated value
  let pendingOp = null;  // "+", "-", "*", "/"
  let justEvaluated = false;

  function format(n) {
    if (typeof n !== "number" || !isFinite(n)) return "Err";
    // Round to 10 decimals to clean float artifacts
    const rounded = Math.round(n * 1e10) / 1e10;
    return String(rounded);
  }

  function pressDigit(d) {
    if (display === "Err") return;
    if (justEvaluated) { display = "0"; justEvaluated = false; }
    if (display === "0" && d !== ".") display = d;
    else if (d === "." && display.includes(".")) return;
    else display += d;
    render();
  }

  function pressOp(op) {
    if (display === "Err") return;
    const cur = parseFloat(display);
    if (acc === null) acc = cur;
    else if (pendingOp) acc = applyOp(acc, cur, pendingOp);
    pendingOp = op;
    display = format(acc);
    justEvaluated = true;
    render();
  }

  function applyOp(a, b, op) {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/": return b === 0 ? NaN : a / b;
    }
    return b;
  }

  function pressEq() {
    if (display === "Err") return;
    if (acc === null || pendingOp === null) {
      justEvaluated = true;
      return;
    }
    const cur = parseFloat(display);
    const result = applyOp(acc, cur, pendingOp);
    display = format(result);
    if (display === "Err") { acc = null; pendingOp = null; render(); return; }
    acc = null;
    pendingOp = null;
    justEvaluated = true;
    render();
  }

  function pressSqrt() {
    if (display === "Err") return;
    const cur = parseFloat(display);
    if (cur < 0) { display = "Err"; render(); return; }
    display = format(Math.sqrt(cur));
    justEvaluated = true;
    render();
  }

  function pressBack() {
    if (display === "Err" || justEvaluated) { clearAll(); return; }
    display = display.length > 1 ? display.slice(0, -1) : "0";
    render();
  }

  function clearAll() {
    display = "0";
    acc = null;
    pendingOp = null;
    justEvaluated = false;
    render();
  }

  function render() {
    if (!calcEl) return;
    calcEl.querySelector(".calc-display").textContent = display;
  }

  function build() {
    calcEl = document.createElement("div");
    calcEl.className = "calculator";
    calcEl.innerHTML = `
      <div class="calc-header">
        <span>Calculator</span>
        <button class="calc-close" title="Close">×</button>
      </div>
      <div class="calc-display">0</div>
      <div class="calc-buttons">
        <button class="calc-btn clear" data-act="AC">AC</button>
        <button class="calc-btn" data-act="back">⌫</button>
        <button class="calc-btn op" data-act="sqrt">√</button>
        <button class="calc-btn op" data-op="/">÷</button>

        <button class="calc-btn" data-digit="7">7</button>
        <button class="calc-btn" data-digit="8">8</button>
        <button class="calc-btn" data-digit="9">9</button>
        <button class="calc-btn op" data-op="*">×</button>

        <button class="calc-btn" data-digit="4">4</button>
        <button class="calc-btn" data-digit="5">5</button>
        <button class="calc-btn" data-digit="6">6</button>
        <button class="calc-btn op" data-op="-">−</button>

        <button class="calc-btn" data-digit="1">1</button>
        <button class="calc-btn" data-digit="2">2</button>
        <button class="calc-btn" data-digit="3">3</button>
        <button class="calc-btn op" data-op="+">+</button>

        <button class="calc-btn" data-digit="0" style="grid-column: span 2;">0</button>
        <button class="calc-btn" data-digit=".">.</button>
        <button class="calc-btn eq" data-act="eq">=</button>
      </div>
    `;
    container.appendChild(calcEl);

    // Initial position: bottom-right
    const rect = calcEl.getBoundingClientRect();
    calcEl.style.position = "absolute";
    calcEl.style.left = (window.innerWidth - rect.width - 24) + "px";
    calcEl.style.top = (window.innerHeight - rect.height - 24) + "px";

    // Wire buttons
    calcEl.addEventListener("click", function (e) {
      const t = e.target.closest("button");
      if (!t) return;
      if (t.classList.contains("calc-close")) { hide(); return; }
      if (t.dataset.digit) pressDigit(t.dataset.digit);
      else if (t.dataset.op) pressOp(t.dataset.op);
      else if (t.dataset.act === "eq") pressEq();
      else if (t.dataset.act === "AC") clearAll();
      else if (t.dataset.act === "back") pressBack();
      else if (t.dataset.act === "sqrt") pressSqrt();
    });

    // Drag
    const header = calcEl.querySelector(".calc-header");
    let drag = null;
    header.addEventListener("mousedown", function (e) {
      if (e.target.closest(".calc-close")) return;
      const rect = calcEl.getBoundingClientRect();
      drag = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
      header.classList.add("dragging");
      e.preventDefault();
    });
    window.addEventListener("mousemove", function (e) {
      if (!drag) return;
      let x = e.clientX - drag.dx;
      let y = e.clientY - drag.dy;
      // Clamp to viewport
      const rect = calcEl.getBoundingClientRect();
      x = Math.max(0, Math.min(x, window.innerWidth - rect.width));
      y = Math.max(0, Math.min(y, window.innerHeight - rect.height));
      calcEl.style.left = x + "px";
      calcEl.style.top = y + "px";
    });
    window.addEventListener("mouseup", function () {
      if (drag) header.classList.remove("dragging");
      drag = null;
    });

    // Touch drag for mobile
    header.addEventListener("touchstart", function (e) {
      if (e.target.closest(".calc-close")) return;
      const t = e.touches[0];
      const rect = calcEl.getBoundingClientRect();
      drag = { dx: t.clientX - rect.left, dy: t.clientY - rect.top };
    }, { passive: true });
    window.addEventListener("touchmove", function (e) {
      if (!drag) return;
      const t = e.touches[0];
      let x = t.clientX - drag.dx;
      let y = t.clientY - drag.dy;
      const rect = calcEl.getBoundingClientRect();
      x = Math.max(0, Math.min(x, window.innerWidth - rect.width));
      y = Math.max(0, Math.min(y, window.innerHeight - rect.height));
      calcEl.style.left = x + "px";
      calcEl.style.top = y + "px";
    }, { passive: true });
    window.addEventListener("touchend", function () { drag = null; });
  }

  function show() {
    if (!enabled) return;
    if (!calcEl) build();
    calcEl.style.display = "block";
    visible = true;
  }
  function hide() {
    if (calcEl) calcEl.style.display = "none";
    visible = false;
  }
  function toggle() { visible ? hide() : show(); }

  function setEnabled(v) {
    enabled = !!v;
    if (!enabled) hide();
  }

  window.Calculator = { show, hide, toggle, setEnabled, isVisible: () => visible };
})();

/* SVG figure renderer for question stems.
 * Each figure is described by a small JSON spec on a question.
 * window.Figure.render(spec) returns an SVG string suitable for innerHTML.
 *
 * Supported types:
 *   numberLine, numberLineSet, coordinatePlane, boxplot,
 *   polygon, net, visualPattern, rectangleGrid, barChart.
 */
(function () {
  "use strict";

  function escapeText(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function svgWrap(viewBox, content) {
    return `<svg viewBox="${viewBox}" class="figure-svg" preserveAspectRatio="xMidYMid meet" role="img">${content}</svg>`;
  }

  // ---------- numberLine ----------
  function numberLine(spec) {
    const min = spec.min ?? -10;
    const max = spec.max ?? 10;
    const arc = spec.arc;
    const W = 600, H = 60;
    const padX = 30, axisY = 30;
    const xFor = n => padX + ((n - min) / (max - min)) * (W - 2 * padX);

    let s = "";
    s += `<line x1="${padX - 5}" y1="${axisY}" x2="${W - padX + 5}" y2="${axisY}" stroke="#222" stroke-width="1.5"/>`;
    s += `<polygon points="${padX - 5},${axisY} ${padX + 3},${axisY - 4} ${padX + 3},${axisY + 4}" fill="#222"/>`;
    s += `<polygon points="${W - padX + 5},${axisY} ${W - padX - 3},${axisY - 4} ${W - padX - 3},${axisY + 4}" fill="#222"/>`;
    for (let n = min; n <= max; n++) {
      const x = xFor(n);
      s += `<line x1="${x}" y1="${axisY - 4}" x2="${x}" y2="${axisY + 4}" stroke="#222"/>`;
      s += `<text x="${x}" y="${axisY + 18}" text-anchor="middle" font-size="11" fill="#444">${n}</text>`;
    }
    if (arc) {
      const x1 = xFor(arc.from);
      const x2 = xFor(arc.to);
      const r = Math.abs(x2 - x1) / 2;
      const sweep = arc.to > arc.from ? 1 : 0;
      s += `<path d="M ${x1} ${axisY} A ${r} ${r} 0 0 ${sweep} ${x2} ${axisY}" fill="none" stroke="#2563eb" stroke-width="2"/>`;
      s += `<circle cx="${x1}" cy="${axisY}" r="3.5" fill="#2563eb"/>`;
      const dir = arc.to > arc.from ? 1 : -1;
      s += `<polygon points="${x2},${axisY} ${x2 - dir * 7},${axisY - 5} ${x2 - dir * 7},${axisY + 5}" fill="#2563eb"/>`;
    }
    return svgWrap(`0 0 ${W} ${H}`, s);
  }

  // ---------- numberLineSet (4 stacked) ----------
  function numberLineSet(spec) {
    const figs = spec.figures || [];
    const min = spec.min ?? -10;
    const max = spec.max ?? 10;
    const labelW = 75;
    const lineRegionW = 580;
    const W = labelW + lineRegionW + 10;
    const rowH = 65;
    const padX = 30;
    const xFor = n => labelW + padX + ((n - min) / (max - min)) * (lineRegionW - 2 * padX);
    const H = figs.length * rowH + 10;
    let s = "";
    figs.forEach((f, i) => {
      const ay = i * rowH + 28;
      // label
      s += `<text x="10" y="${ay + 5}" font-size="13" font-weight="bold" fill="#1a1f2c">${escapeText(f.label || `Figure ${i + 1}`)}</text>`;
      // line
      s += `<line x1="${labelW + padX - 5}" y1="${ay}" x2="${labelW + lineRegionW - padX + 5}" y2="${ay}" stroke="#222" stroke-width="1.4"/>`;
      s += `<polygon points="${labelW + padX - 5},${ay} ${labelW + padX + 3},${ay - 4} ${labelW + padX + 3},${ay + 4}" fill="#222"/>`;
      s += `<polygon points="${labelW + lineRegionW - padX + 5},${ay} ${labelW + lineRegionW - padX - 3},${ay - 4} ${labelW + lineRegionW - padX - 3},${ay + 4}" fill="#222"/>`;
      for (let n = min; n <= max; n++) {
        const x = xFor(n);
        s += `<line x1="${x}" y1="${ay - 3}" x2="${x}" y2="${ay + 3}" stroke="#222"/>`;
        s += `<text x="${x}" y="${ay + 16}" text-anchor="middle" font-size="9.5" fill="#666">${n}</text>`;
      }
      if (f.arc) {
        const x1 = xFor(f.arc.from);
        const x2 = xFor(f.arc.to);
        const r = Math.abs(x2 - x1) / 2;
        const sweep = f.arc.to > f.arc.from ? 1 : 0;
        s += `<path d="M ${x1} ${ay} A ${r} ${r} 0 0 ${sweep} ${x2} ${ay}" fill="none" stroke="#2563eb" stroke-width="2"/>`;
        s += `<circle cx="${x1}" cy="${ay}" r="3.5" fill="#2563eb"/>`;
        const dir = f.arc.to > f.arc.from ? 1 : -1;
        s += `<polygon points="${x2},${ay} ${x2 - dir * 7},${ay - 5} ${x2 - dir * 7},${ay + 5}" fill="#2563eb"/>`;
      }
    });
    return svgWrap(`0 0 ${W} ${H}`, s);
  }

  // ---------- coordinatePlane ----------
  function coordinatePlane(spec) {
    const xRange = spec.xRange || [-5, 5];
    const yRange = spec.yRange || [-5, 5];
    const points = spec.points || [];
    const W = 320, H = 320;
    const padX = 30, padY = 30;
    const xFor = x => padX + ((x - xRange[0]) / (xRange[1] - xRange[0])) * (W - 2 * padX);
    const yFor = y => H - padY - ((y - yRange[0]) / (yRange[1] - yRange[0])) * (H - 2 * padY);
    const x0 = xFor(0), y0 = yFor(0);

    let s = "";
    // grid
    for (let x = xRange[0]; x <= xRange[1]; x++) {
      s += `<line x1="${xFor(x)}" y1="${padY}" x2="${xFor(x)}" y2="${H - padY}" stroke="#eef" stroke-width="1"/>`;
    }
    for (let y = yRange[0]; y <= yRange[1]; y++) {
      s += `<line x1="${padX}" y1="${yFor(y)}" x2="${W - padX}" y2="${yFor(y)}" stroke="#eef" stroke-width="1"/>`;
    }
    // axes
    s += `<line x1="${padX - 5}" y1="${y0}" x2="${W - padX + 5}" y2="${y0}" stroke="#222" stroke-width="1.5"/>`;
    s += `<line x1="${x0}" y1="${padY - 5}" x2="${x0}" y2="${H - padY + 5}" stroke="#222" stroke-width="1.5"/>`;
    s += `<polygon points="${W - padX + 5},${y0} ${W - padX - 3},${y0 - 4} ${W - padX - 3},${y0 + 4}" fill="#222"/>`;
    s += `<polygon points="${x0},${padY - 5} ${x0 - 4},${padY + 3} ${x0 + 4},${padY + 3}" fill="#222"/>`;
    // tick numbers
    for (let x = xRange[0]; x <= xRange[1]; x++) {
      if (x === 0) continue;
      s += `<text x="${xFor(x)}" y="${y0 + 14}" text-anchor="middle" font-size="10" fill="#444">${x}</text>`;
    }
    for (let y = yRange[0]; y <= yRange[1]; y++) {
      if (y === 0) continue;
      s += `<text x="${x0 - 6}" y="${yFor(y) + 3}" text-anchor="end" font-size="10" fill="#444">${y}</text>`;
    }
    s += `<text x="${x0 - 6}" y="${y0 + 14}" text-anchor="end" font-size="10" fill="#444">0</text>`;
    s += `<text x="${W - padX + 8}" y="${y0 + 4}" font-size="13" font-style="italic" fill="#222">x</text>`;
    s += `<text x="${x0 - 4}" y="${padY - 10}" font-size="13" font-style="italic" text-anchor="end" fill="#222">y</text>`;
    // points
    for (const p of points) {
      const px = xFor(p.x), py = yFor(p.y);
      s += `<circle cx="${px}" cy="${py}" r="4.5" fill="#2563eb"/>`;
      if (p.label) {
        const dx = p.dx ?? 9, dy = p.dy ?? -8;
        s += `<text x="${px + dx}" y="${py + dy}" font-size="14" font-weight="bold" font-style="italic" fill="#1a1f2c">${escapeText(p.label)}</text>`;
      }
    }
    return svgWrap(`0 0 ${W} ${H}`, s);
  }

  // ---------- boxplot ----------
  function boxplot(spec) {
    const data = spec.data || [];
    const xMin = spec.xRange ? spec.xRange[0] : Math.min(...data.map(d => d.min));
    const xMax = spec.xRange ? spec.xRange[1] : Math.max(...data.map(d => d.max));
    const xLabel = spec.xLabel || "";
    const yLabel = spec.yLabel || "";
    const W = 600;
    const H = 60 + data.length * 60 + (xLabel ? 20 : 0);
    const padL = yLabel ? 110 : 90, padR = 30, padT = 10;
    const axisY = H - 25 - (xLabel ? 20 : 0);
    const xFor = v => padL + ((v - xMin) / (xMax - xMin)) * (W - padL - padR);
    const tickStep = spec.tickStep || Math.ceil((xMax - xMin) / 8);

    let s = "";
    if (yLabel) {
      const yMid = (padT + axisY) / 2;
      s += `<text x="22" y="${yMid}" text-anchor="middle" font-size="12" font-weight="bold" transform="rotate(-90 22 ${yMid})">${escapeText(yLabel)}</text>`;
    }
    // axis
    s += `<line x1="${padL}" y1="${axisY}" x2="${W - padR}" y2="${axisY}" stroke="#222"/>`;
    for (let v = Math.ceil(xMin / tickStep) * tickStep; v <= xMax; v += tickStep) {
      s += `<line x1="${xFor(v)}" y1="${axisY - 4}" x2="${xFor(v)}" y2="${axisY + 4}" stroke="#222"/>`;
      s += `<text x="${xFor(v)}" y="${axisY + 18}" text-anchor="middle" font-size="11" fill="#444">${v}</text>`;
    }
    if (xLabel) {
      s += `<text x="${(padL + W - padR) / 2}" y="${H - 5}" text-anchor="middle" font-size="12">${escapeText(xLabel)}</text>`;
    }
    // boxes
    data.forEach((d, i) => {
      const y = padT + i * 60 + 25;
      const boxH = 30;
      const x1 = xFor(d.min), x2 = xFor(d.q1), x3 = xFor(d.median), x4 = xFor(d.q3), x5 = xFor(d.max);
      s += `<line x1="${x1}" y1="${y - boxH / 3}" x2="${x1}" y2="${y + boxH / 3}" stroke="#222"/>`;
      s += `<line x1="${x5}" y1="${y - boxH / 3}" x2="${x5}" y2="${y + boxH / 3}" stroke="#222"/>`;
      s += `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="#222"/>`;
      s += `<line x1="${x4}" y1="${y}" x2="${x5}" y2="${y}" stroke="#222"/>`;
      s += `<rect x="${x2}" y="${y - boxH / 2}" width="${x4 - x2}" height="${boxH}" fill="white" stroke="#222" stroke-width="1.5"/>`;
      s += `<line x1="${x3}" y1="${y - boxH / 2}" x2="${x3}" y2="${y + boxH / 2}" stroke="#222" stroke-width="2"/>`;
      s += `<text x="${padL - 12}" y="${y + 4}" text-anchor="end" font-size="13" font-weight="bold">${escapeText(d.label)}</text>`;
    });
    return svgWrap(`0 0 ${W} ${H}`, s);
  }

  // ---------- polygon ----------
  function polygon(spec) {
    const W = spec.width || 200, H = spec.height || 200;
    const vertices = spec.vertices || [];
    const points = vertices.map(v => `${v[0]},${v[1]}`).join(" ");
    let s = "";
    s += `<polygon points="${points}" fill="${spec.fill || 'none'}" stroke="${spec.stroke || '#222'}" stroke-width="${spec.strokeWidth || 1.5}"/>`;
    if (spec.labels) {
      spec.labels.forEach((l, i) => {
        const v = vertices[i];
        if (!v) return;
        const dx = l.dx || 0, dy = l.dy || 0;
        s += `<text x="${v[0] + dx}" y="${v[1] + dy}" font-size="14" font-weight="bold" font-style="italic">${escapeText(l.text)}</text>`;
      });
    }
    return svgWrap(`0 0 ${W} ${H}`, s);
  }

  // ---------- net ----------
  function net(spec) {
    const W = spec.width || 240, H = spec.height || 240;
    let s = "";
    for (const shape of spec.shapes || []) {
      const pts = shape.points.map(p => `${p[0]},${p[1]}`).join(" ");
      s += `<polygon points="${pts}" fill="${shape.fill || 'none'}" stroke="${shape.stroke || '#222'}" stroke-width="${shape.strokeWidth || 1.5}"/>`;
    }
    return svgWrap(`0 0 ${W} ${H}`, s);
  }

  // ---------- visualPattern (squares + end triangles) ----------
  function visualPattern(spec) {
    const figs = spec.figures || [];
    const sqSize = 24;
    const triHeight = 14;
    const labelGap = 24;
    const padX = 18;
    const gap = 30;
    const figWidths = figs.map(f => triHeight + sqSize * f.squares + triHeight);
    const totalW = padX * 2 + figWidths.reduce((a, b) => a + b, 0) + (figs.length - 1) * gap;
    const figH = sqSize + labelGap + 10;
    const W = totalW, H = figH + 10;
    const baseY = 12;
    let s = "";
    let cursorX = padX;
    figs.forEach((fig, i) => {
      const figW = figWidths[i];
      let x = cursorX;
      const triY = baseY + sqSize / 2;
      // left triangle (point left)
      s += `<polygon points="${x},${triY} ${x + triHeight},${baseY} ${x + triHeight},${baseY + sqSize}" fill="none" stroke="#222" stroke-width="1.5"/>`;
      x += triHeight;
      // squares
      for (let k = 0; k < fig.squares; k++) {
        s += `<rect x="${x}" y="${baseY}" width="${sqSize}" height="${sqSize}" fill="none" stroke="#222" stroke-width="1.5"/>`;
        // diagonal inside the square (forms the small triangles inside the original Praxis pattern)
        s += `<line x1="${x}" y1="${baseY}" x2="${x + sqSize}" y2="${baseY + sqSize}" stroke="#222" stroke-width="0.8"/>`;
        x += sqSize;
      }
      // right triangle (point right)
      s += `<polygon points="${x},${baseY} ${x},${baseY + sqSize} ${x + triHeight},${triY}" fill="none" stroke="#222" stroke-width="1.5"/>`;
      // label
      const labelX = cursorX + figW / 2;
      s += `<text x="${labelX}" y="${baseY + sqSize + labelGap}" text-anchor="middle" font-size="12" font-weight="bold">${escapeText(fig.label || `Figure ${i + 1}`)}</text>`;
      cursorX += figW + gap;
    });
    return svgWrap(`0 0 ${W} ${H}`, s);
  }

  // ---------- rectangleGrid ----------
  function rectangleGrid(spec) {
    const cols = spec.cols, rows = spec.rows;
    const cell = spec.cell || 20;
    const ox = 30, oy = 14;
    const W = ox + cols * cell + 30, H = oy + rows * cell + 14;
    let s = "";
    if (spec.shaded) {
      for (const [r, c] of spec.shaded) {
        s += `<rect x="${ox + c * cell}" y="${oy + r * cell}" width="${cell}" height="${cell}" fill="#94a3b8"/>`;
      }
    }
    for (let r = 0; r <= rows; r++) {
      s += `<line x1="${ox}" y1="${oy + r * cell}" x2="${ox + cols * cell}" y2="${oy + r * cell}" stroke="#222"/>`;
    }
    for (let c = 0; c <= cols; c++) {
      s += `<line x1="${ox + c * cell}" y1="${oy}" x2="${ox + c * cell}" y2="${oy + rows * cell}" stroke="#222"/>`;
    }
    if (spec.cornerLabels) {
      const [bl, tl, tr, br] = spec.cornerLabels;
      s += `<text x="${ox - 6}" y="${oy + rows * cell + 8}" text-anchor="end" font-size="13" font-weight="bold" font-style="italic">${escapeText(bl)}</text>`;
      s += `<text x="${ox - 6}" y="${oy - 2}" text-anchor="end" font-size="13" font-weight="bold" font-style="italic">${escapeText(tl)}</text>`;
      s += `<text x="${ox + cols * cell + 4}" y="${oy - 2}" font-size="13" font-weight="bold" font-style="italic">${escapeText(tr)}</text>`;
      s += `<text x="${ox + cols * cell + 4}" y="${oy + rows * cell + 8}" font-size="13" font-weight="bold" font-style="italic">${escapeText(br)}</text>`;
    }
    return svgWrap(`0 0 ${W} ${H}`, s);
  }

  // ---------- barChart ----------
  function barChart(spec) {
    const data = spec.data || [];
    const W = 480, H = 260;
    const padL = 50, padR = 20, padT = 20, padB = 60;
    const innerW = W - padL - padR, innerH = H - padT - padB;
    const yMax = spec.yMax || Math.max(...data.map(d => d.value)) * 1.2;
    const slot = innerW / data.length;
    const barW = slot * 0.65;
    let s = "";
    s += `<line x1="${padL}" y1="${padT}" x2="${padL}" y2="${H - padB}" stroke="#222"/>`;
    s += `<line x1="${padL}" y1="${H - padB}" x2="${W - padR}" y2="${H - padB}" stroke="#222"/>`;
    const yTicks = spec.yTicks || 5;
    for (let i = 0; i <= yTicks; i++) {
      const v = (yMax / yTicks) * i;
      const y = H - padB - (v / yMax) * innerH;
      s += `<line x1="${padL - 3}" y1="${y}" x2="${padL + 3}" y2="${y}" stroke="#222"/>`;
      s += `<text x="${padL - 6}" y="${y + 3}" text-anchor="end" font-size="10" fill="#444">${Number.isInteger(v) ? v : v.toFixed(1)}</text>`;
    }
    data.forEach((d, i) => {
      const x = padL + i * slot + (slot - barW) / 2;
      const h = (d.value / yMax) * innerH;
      const y = H - padB - h;
      s += `<rect x="${x}" y="${y}" width="${barW}" height="${h}" fill="#60a5fa" stroke="#1d4ed8" stroke-width="1"/>`;
      s += `<text x="${x + barW / 2}" y="${y - 4}" text-anchor="middle" font-size="11" font-weight="bold">${d.value}</text>`;
      s += `<text x="${x + barW / 2}" y="${H - padB + 16}" text-anchor="middle" font-size="11">${escapeText(d.label)}</text>`;
    });
    if (spec.yLabel) {
      const yMid = (padT + H - padB) / 2;
      s += `<text x="14" y="${yMid}" text-anchor="middle" font-size="11" transform="rotate(-90 14 ${yMid})">${escapeText(spec.yLabel)}</text>`;
    }
    if (spec.xLabel) {
      s += `<text x="${padL + innerW / 2}" y="${H - 8}" text-anchor="middle" font-size="11">${escapeText(spec.xLabel)}</text>`;
    }
    return svgWrap(`0 0 ${W} ${H}`, s);
  }

  // ---------- dispatch ----------
  function render(spec) {
    if (!spec || !spec.type) return "";
    switch (spec.type) {
      case "numberLine": return numberLine(spec);
      case "numberLineSet": return numberLineSet(spec);
      case "coordinatePlane": return coordinatePlane(spec);
      case "boxplot": return boxplot(spec);
      case "polygon": return polygon(spec);
      case "net": return net(spec);
      case "visualPattern": return visualPattern(spec);
      case "rectangleGrid": return rectangleGrid(spec);
      case "barChart": return barChart(spec);
      default:
        return `<div class="figure-error">Unknown figure type: ${escapeText(spec.type)}</div>`;
    }
  }

  window.Figure = {
    render,
    numberLine, numberLineSet, coordinatePlane, boxplot,
    polygon, net, visualPattern, rectangleGrid, barChart,
  };
})();

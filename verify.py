"""Independent reference verifier for the question bank.

For each computational question this file recomputes the expected answer
in Python and compares it to the stored answer.  This catches arithmetic
errors and answer-index mistakes by giving us a SECOND, independent
computation that has to agree with the bank.

Pedagogical / wording-judgment questions (where the "answer" depends on
which-explanation-best-describes-the-misconception) cannot be reduced to
arithmetic; they are tagged 'skip' and need separate prose review.

Run:  python verify.py
"""
import io
import json
import math
import re
import sys
from fractions import Fraction
from pathlib import Path

# Force UTF-8 output so Windows cp1252 doesn't choke on −, ×, π.
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", line_buffering=True)
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", line_buffering=True)


# ---------- load questions.js (same parser as validate.py) ----------

def _strip(s):
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.DOTALL)
    s = re.sub(r"(?m)//[^\n]*$", "", s)
    return s


def load_questions(path):
    text = _strip(path.read_text(encoding="utf-8"))
    m = re.search(r"window\.QUESTIONS\s*=\s*(\[.*\])\s*;?\s*$", text, re.DOTALL)
    if not m:
        raise SystemExit("Could not parse questions.js")
    raw = re.sub(r",(\s*[\]}])", r"\1", m.group(1))
    return json.loads(raw)


# ---------- reference computations ----------
# Each ref is (kind, expected, note).
#   kind = "mc_text"  : expected str, must equal choices[answer_index]
#          "ne_value" : expected number, must equal float(answer) within tolerance
#          "sa_texts" : expected set of strs, must equal {choices[i] for i in answer_indices}
#          "skip"     : pedagogical/conceptual; not verified here
#
# Strings use the same Unicode (×, −, π) as the bank for exact match.

REFS = {
    # ============================================================
    # NUMBERS & OPERATIONS — Place Value (8)
    # ============================================================
    "no-pv-001": ("mc_text", "40",
                  "digit 4 in tens place of 47 → 4×10 = 40"),
    "no-pv-002": ("mc_text", "60",
                  "of {16, 60, 106, 6}: only 60 has 6 in tens place"),
    "no-pv-003": ("mc_text", "7,000",
                  "27,054 → 7 in thousands place → 7×1000"),
    "no-pv-004": ("ne_value", 8000 + 200 + 60 + 3,
                  "expanded form of 8,263"),
    "no-pv-005": ("sa_texts", {"712", "1,704"},
                  "7 in hundreds: 274(7@tens), 712✓, 1,704✓, 70(7@tens)"),
    "no-pv-006": ("ne_value", 0.06,
                  "digit 6 in 0.467 → hundredths → 0.06"),
    "no-pv-007": ("skip", None, "pedagogical: 4008 misconception"),
    "no-pv-008": ("mc_text", "4 × 1,000 + 0 × 100 + 6 × 10 + 2 × 1",
                  "expanded form of 4,062"),

    # ============================================================
    # NUMBERS & OPERATIONS — Whole-Number Operations (8)
    # ============================================================
    "no-wn-001": ("ne_value", 7 + 8, "7+8=15"),
    "no-wn-002": ("mc_text", "6 + 6",
                  "9+4=13, 6+6=12, 7+4=11, 8+5=13"),
    "no-wn-003": ("ne_value", 234 + 198, "234+198=432"),
    "no-wn-004": ("mc_text", "3,000",
                  "estimate 487×6: 500×6=3000 (exact 2922)"),
    "no-wn-005": ("ne_value", 1452 / 4, "1452/4=363"),
    "no-wn-006": ("skip", None, "pedagogical: 503-87 column error"),
    "no-wn-007": ("ne_value", (246 + 318 + 295) % 12,
                  "859 mod 12 = 7 books left over"),
    "no-wn-008": ("mc_text", "5",
                  "ceil(28/6) = 5 vans"),

    # ============================================================
    # NUMBERS & OPERATIONS — Fractions (10)
    # ============================================================
    "no-fr-001": ("mc_text", "3/4", "3 of 4 shaded"),
    "no-fr-002": ("mc_text", "4/6", "2/3 × 2/2 = 4/6"),
    "no-fr-003": ("mc_text", "1/4, 1/3, 1/2",
                  "ascending: same numerator, larger denominator = smaller"),
    "no-fr-004": ("mc_text", "3/4", "1/4+2/4=3/4"),
    "no-fr-005": ("mc_text", "11/12",
                  f"2/3+1/4 = {Fraction(2,3)+Fraction(1,4)}"),
    "no-fr-006": ("mc_text", "1/2",
                  f"3/5×5/6 = {Fraction(3,5)*Fraction(5,6)}"),
    "no-fr-007": ("mc_text", "6/5",
                  f"4/5÷2/3 = {Fraction(4,5)/Fraction(2,3)}"),
    "no-fr-008": ("skip", None, "pedagogical: 1/3+1/4 misconception"),
    "no-fr-009": ("ne_value", 8 // 4, "1/4 of 8 = 2"),
    "no-fr-010": ("sa_texts", {"1/3", "1/4"},
                  "<1/2: 1/3 ✓, 2/3 ✗, 1/4 ✓, 3/4 ✗"),

    # ============================================================
    # NUMBERS & OPERATIONS — Decimals (8)
    # ============================================================
    "no-dc-001": ("ne_value", 0.4 + 0.3, "0.4+0.3=0.7"),
    "no-dc-002": ("mc_text", "0.421",
                  "max(0.4200, 0.4000, 0.4210, 0.4042)=0.421"),
    "no-dc-003": ("ne_value", 2.5 * 0.4, "2.5×0.4=1.0"),
    "no-dc-004": ("ne_value", 6.4 / 0.8, "6.4÷0.8=8"),
    "no-dc-005": ("skip", None, "pedagogical: 0.7 vs 0.65"),
    "no-dc-006": ("sa_texts", {"1/2", "5/10", "50%"},
                  "0.5 equivalents (5/100=0.05 ✗)"),
    "no-dc-007": ("ne_value", round(3 * 2.45 + 1.30, 2),
                  "3 notebooks ($2.45) + 1 pen ($1.30)"),
    "no-dc-008": ("ne_value", round(1.50 + 0.25, 2),
                  "$1.50 + $0.25 = $1.75"),

    # ============================================================
    # NUMBERS & OPERATIONS — Ratios & Proportions (6)
    # ============================================================
    "no-rp-001": ("mc_text", "3 : 2",
                  "12:8 ÷ gcd(12,8)=4 → 3:2"),
    "no-rp-002": ("ne_value", round(7 * (1.20 / 3), 2),
                  "$0.40/apple × 7 = $2.80"),
    "no-rp-003": ("mc_text", "8",
                  "2/3 = x/12 → x = 8"),
    "no-rp-004": ("ne_value", 8 * (165 // 5),
                  "33 mpg × 8 gal = 264 miles"),
    "no-rp-005": ("skip", None, "pedagogical: 6:9 = 2:3 reasoning"),
    "no-rp-006": ("mc_text", "225 miles",
                  "4.5 in × 50 mi/in = 225 mi"),

    # ============================================================
    # NUMBERS & OPERATIONS — Percentages (5)
    # ============================================================
    "no-pc-001": ("mc_text", "1/4",
                  "25% = 25/100 = 1/4"),
    "no-pc-002": ("ne_value", 0.20 * 60, "20% of 60 = 12"),
    "no-pc-003": ("ne_value", 40 - 0.25 * 40, "$40-25%=$30"),
    "no-pc-004": ("mc_text", "60%",
                  "30/50 × 100 = 60%"),
    "no-pc-005": ("skip", None, "pedagogical: 50% increase"),

    # ============================================================
    # NUMBERS & OPERATIONS — Prime Factorization & Number Theory (5)
    # ============================================================
    "no-pf-001": ("ne_value", math.gcd(24, 36), "GCF(24,36)=12"),
    "no-pf-002": ("sa_texts", {"2", "13"},
                  "primes among {2,9,13,21}: 9=3², 21=3·7"),
    "no-pf-003": ("skip", None, "pedagogical: 60=2×30 incomplete"),
    "no-pf-004": ("ne_value", (6 * 8) // math.gcd(6, 8),
                  "LCM(6,8) = 6·8/gcd = 48/2 = 24"),
    "no-pf-005": ("sa_texts", {"4", "6", "12"},
                  "factors of 24: 1,2,3,4,6,8,12,24; 9 not"),

    # ============================================================
    # NUMBERS & OPERATIONS — Estimation & Mental Math (5)
    # ============================================================
    "no-em-001": ("mc_text", "500",
                  "200+300=500 (exact 502)"),
    "no-em-002": ("mc_text", "$3,500",
                  "350×$10=$3,500 (exact $3,412.50)"),
    "no-em-003": ("skip", None, "pedagogical: 47×21 estimation strategy"),
    "no-em-004": ("mc_text",
                  "Round each to the nearest whole: 7 + 4 = 11.",
                  "best mental estimate of 6.8+4.2"),
    "no-em-005": ("mc_text", "60",
                  "412≈420; 420/7=60 (exact ≈58.86)"),

    # ============================================================
    # ALGEBRAIC THINKING — Patterns & Sequences (9)
    # ============================================================
    "al-ps-001": ("ne_value", 8 + 2, "skip-by-2"),
    "al-ps-002": ("mc_text", "blue", "alternating"),
    "al-ps-003": ("ne_value", 20 + 5, "skip-by-5"),
    "al-ps-004": ("ne_value", 10 + 3, "+3 between 10 and 16"),
    "al-ps-005": ("mc_text", "1, 2, 4, 8",
                  "geometric ×2"),
    "al-ps-006": ("mc_text", "31",
                  "3+4·(8-1) = 3+28 = 31"),
    "al-ps-007": ("ne_value", 54 * 3, "geometric ×3: 54·3=162"),
    "al-ps-008": ("skip", None, "pedagogical: square numbers rule"),
    "al-ps-009": ("ne_value", 4 * 2, "geometric ×2: 4·2=8"),

    # ============================================================
    # ALGEBRAIC THINKING — Expressions (9)
    # ============================================================
    "al-ex-001": ("mc_text", "n + 3", "3 more than n"),
    "al-ex-002": ("ne_value", 4 + 2 * 5, "4+2(5)=14"),
    "al-ex-003": ("mc_text", "2n − 5",
                  "twice n minus 5 (Unicode minus)"),
    "al-ex-004": ("mc_text", "5x + 7", "3x+2x=5x"),
    "al-ex-005": ("mc_text", "3x + 12",
                  "3·x + 3·4 = 3x+12"),
    "al-ex-006": ("ne_value", 2 * 3 ** 2, "2·9=18"),
    "al-ex-007": ("skip", None, "pedagogical: 5x meaning"),
    "al-ex-008": ("sa_texts", {"2x + 6", "x + x + 6"},
                  "2(x+3) = 2x+6 = x+x+6"),
    "al-ex-009": ("mc_text", "3a + 2b",
                  "3 apples + 2 bananas"),

    # ============================================================
    # ALGEBRAIC THINKING — Equations & Inequalities (12)
    # ============================================================
    "al-eq-001": ("ne_value", 9 - 5, "5+__=9 → 4"),
    "al-eq-002": ("ne_value", 13 - 7, "x+7=13 → 6"),
    "al-eq-003": ("ne_value", 28 // 4, "4n=28 → 7"),
    "al-eq-004": ("mc_text", "4", "3x=12 → 4"),
    "al-eq-005": ("mc_text", "n + 8 = 15", "translate"),
    "al-eq-006": ("ne_value", (11 - 3) // 2, "2x+3=11 → 4"),
    "al-eq-007": ("ne_value", (18 + 2) // 5, "5x-2=18 → 4"),
    "al-eq-008": ("sa_texts", {"5", "6"},
                  "x>4: 5,6 ✓; 3,4 ✗"),
    "al-eq-009": ("ne_value", (5 - 2) * 3, "x/3+2=5 → 9"),
    "al-eq-010": ("skip", None, "pedagogical: divide-both-sides error"),
    "al-eq-011": ("sa_texts", {"x + 3 = 7", "2x = 8", "x − 1 = 3"},
                  "satisfied by x=4 (Unicode minus in x − 1)"),
    "al-eq-012": ("mc_text", "3",
                  "5x-3<17 → x<4 → max int=3"),

    # ============================================================
    # ALGEBRAIC THINKING — Functions (8)
    # ============================================================
    "al-fn-001": ("ne_value", 5 * 3 + 2, "(×3)+2 at 5"),
    "al-fn-002": ("mc_text", "y = 3x + 1",
                  "fits all 4 (x,y) points"),
    "al-fn-003": ("ne_value", 2 * 3 + 5, "f(3)=11"),
    "al-fn-004": ("mc_text", "y = 2x + 4", "y-int = b in mx+b"),
    "al-fn-005": ("ne_value", 4 ** 2 - 1, "f(4)=15"),
    "al-fn-006": ("ne_value", 2 * 8 + 1, "y=2x+1 at 8 → 17"),
    "al-fn-007": ("skip", None, "pedagogical: function definition"),
    "al-fn-008": ("ne_value", (13 + 7) // 4, "4x-7=13 → 5"),

    # ============================================================
    # ALGEBRAIC THINKING — Properties of Operations (7)
    # ============================================================
    "al-pp-001": ("mc_text", "Commutative property",
                  "a+b=b+a"),
    "al-pp-002": ("ne_value", 5 + 0, "additive identity"),
    "al-pp-003": ("mc_text", "(2 + 3) + 4 = 2 + (3 + 4)",
                  "associative: (a+b)+c = a+(b+c)"),
    "al-pp-004": ("ne_value", 4 * (5 + 2), "4·(5+2) = 28"),
    "al-pp-005": ("mc_text", "6x + 15",
                  "3·2x + 3·5 = 6x+15"),
    "al-pp-006": ("skip", None, "pedagogical: incomplete distribute"),
    "al-pp-007": ("sa_texts",
                  {"4 + 6 = 6 + 4", "7 × 2 = 2 × 7"},
                  "commutative examples (Unicode × in 7 × 2)"),

    # ============================================================
    # GEOMETRY/MEASUREMENT/DATA — Shapes (7)
    # ============================================================
    "gm-sh-001": ("mc_text", "Triangle", "3 sides"),
    "gm-sh-002": ("mc_text", "6", "hexagon"),
    "gm-sh-003": ("mc_text", "Square",
                  "4 right angles + 4 equal sides"),
    "gm-sh-004": ("mc_text", "Pentagon", "5 sides"),
    "gm-sh-005": ("mc_text",
                  "A square is a special kind of rectangle.",
                  "subset relation"),
    "gm-sh-006": ("skip", None, "pedagogical: rhombus vs square"),
    "gm-sh-007": ("sa_texts", {"Square", "Rhombus"},
                  "4-sided shapes; triangle=3, pentagon=5"),

    # ============================================================
    # GEOMETRY/MEASUREMENT/DATA — Area, Perimeter, Volume (10)
    # ============================================================
    "gm-ar-001": ("ne_value", 2 * (5 + 3), "P = 2(L+W)"),
    "gm-ar-002": ("ne_value", 5 * 3, "A = LW"),
    "gm-ar-003": ("ne_value", 24 // 4, "side = P/4"),
    "gm-ar-004": ("ne_value", 0.5 * 8 * 5, "(1/2)·b·h"),
    "gm-ar-005": ("mc_text", "9π", "π·r² with r=3"),
    "gm-ar-006": ("ne_value", 4 * 3 * 2, "V = LWH"),
    "gm-ar-007": ("skip", None, "pedagogical: P vs A"),
    "gm-ar-008": ("ne_value", 2 * (12 + 15) * 8,
                  "perimeter × $8/ft = 432"),
    "gm-ar-009": ("mc_text", "3 cm",
                  "W = A/L = 30/10 = 3"),
    "gm-ar-010": ("ne_value", 4 * 7, "P square = 4·s"),

    # ============================================================
    # GEOMETRY/MEASUREMENT/DATA — Transformations (5)
    # ============================================================
    "gm-tr-001": ("mc_text", "Translation",
                  "slide w/o rotation/flip"),
    "gm-tr-002": ("mc_text",
                  "The shape is flipped horizontally, like in a mirror.",
                  "vertical-line reflection"),
    "gm-tr-003": ("mc_text", "(5, 3)",
                  "(3,4) + (+2,-1) = (5,3)"),
    "gm-tr-004": ("sa_texts",
                  {"Translation", "Reflection", "Rotation"},
                  "rigid; dilation changes size"),
    "gm-tr-005": ("skip", None, "pedagogical: reflection rigidity"),

    # ============================================================
    # GEOMETRY/MEASUREMENT/DATA — Coordinate Plane (5)
    # ============================================================
    "gm-cp-001": ("mc_text", "(0, 0)", "origin"),
    "gm-cp-002": ("mc_text", "(−3, 2)",
                  "Q II = (-,+); uses Unicode minus"),
    "gm-cp-003": ("ne_value", abs(8 - 3),
                  "vertical distance"),
    "gm-cp-004": ("mc_text", "Quadrant II (upper-left)",
                  "(-,+)"),
    "gm-cp-005": ("skip", None, "pedagogical: plotting order"),

    # ============================================================
    # GEOMETRY/MEASUREMENT/DATA — Unit Conversion (6)
    # ============================================================
    "gm-uc-001": ("ne_value", 2 * 12, "ft→in"),
    "gm-uc-002": ("ne_value", 3 * 60, "hr→min"),
    "gm-uc-003": ("ne_value", 4 * 100, "m→cm"),
    "gm-uc-004": ("sa_texts",
                  {"1 kilometer = 1,000 meters",
                   "1 hour = 60 minutes",
                   "1 quart = 4 cups"},
                  "true conversions; 1 ft=12 in not 10"),
    "gm-uc-005": ("ne_value", 2 * 4, "qt→cups"),
    "gm-uc-006": ("skip", None, "pedagogical: conversion direction"),

    # ============================================================
    # GEOMETRY/MEASUREMENT/DATA — Data Displays (6)
    # ============================================================
    "gm-dd-001": ("mc_text", "Ben",
                  "max({Ana:5, Ben:8, Carla:3, David:6})=Ben"),
    "gm-dd-002": ("ne_value", 1 + 3 + 2 + 0, "rainfall sum"),
    "gm-dd-003": ("mc_text", "Line graph",
                  "change over continuous time"),
    "gm-dd-004": ("mc_text", "20",
                  "25% × 80 = 20"),
    "gm-dd-005": ("mc_text", "Bar graph",
                  "compare across categories"),
    "gm-dd-006": ("skip", None, "pedagogical: visual eyeballing"),

    # ============================================================
    # GEOMETRY/MEASUREMENT/DATA — Central Tendency (6)
    # ============================================================
    "gm-ct-001": ("ne_value", (80 + 85 + 90 + 95 + 100) / 5,
                  "mean=90"),
    "gm-ct-002": ("ne_value", sorted([3, 7, 2, 8, 5])[2],
                  "median of sorted middle = 5"),
    "gm-ct-003": ("ne_value", 4,
                  "mode: 4 appears 3 times"),
    "gm-ct-004": ("ne_value", 91 - 65, "max−min"),
    "gm-ct-005": ("ne_value",
                  82 * 6 - (70 + 75 + 80 + 85 + 90),
                  "new sum 492 - old sum 400 = 92"),
    "gm-ct-006": ("skip", None, "pedagogical: sort first"),

    # ============================================================
    # GEOMETRY/MEASUREMENT/DATA — Probability (5)
    # ============================================================
    "gm-pr-001": ("mc_text", "3/5",
                  "3 red / (3+2) total"),
    "gm-pr-002": ("mc_text", "1/2",
                  "fair coin"),
    "gm-pr-003": ("ne_value", 4 / 8,
                  "4 evens of 8 sections"),
    "gm-pr-004": ("sa_texts",
                  {"Rolling a 3", "Rolling a 1"},
                  "single faces have P=1/6; even=3/6, >4=2/6"),
    "gm-pr-005": ("skip", None, "pedagogical: gambler's fallacy"),

    # ============================================================
    # BATCH 4 — Coverage gaps (22)
    # ============================================================
    "no-pv-009": ("mc_text", "4,052",
                  "(0×10⁴)+(4×10³)+(0×10²)+(5×10¹)+(2×10⁰) = 4,052"),
    "no-pv-010": ("mc_text", "700",
                  "0.7 = (1/1000) × x → x = 700"),
    "no-fr-011": ("mc_text", "1/3",
                  "after 1/2: 1/2 left; minus 1/6 = 1/3"),
    "no-fr-012": ("mc_text", "3/4",
                  "rate=9/4 cans/room; 1/3 × 9/4 = 3/4"),
    "no-rp-007": ("mc_text", "12,500",
                  "valid range [280×42=11760, 300×48=14400]; only 12500 in range"),
    "al-ex-010": ("mc_text", "−12 + 8x",
                  "−4(3 − 2x) = −12 + 8x"),
    "al-ex-011": ("mc_text", "11x + 2y − 4",
                  "(7x−2) − (−4x − 2y + 2) = 11x + 2y − 4"),
    "al-ex-012": ("skip", None,
                  "pedagogical: monomial vs coefficient (Alexa got wrong)"),
    "al-eq-013": ("mc_text", "x ≥ −4/5",
                  "4x+4 ≤ 9x+8 → −4 ≤ 5x → x ≥ −4/5"),
    "al-eq-014": ("skip", None,
                  "pedagogical: linear comparison; same slope, different intercept"),
    "al-fn-009": ("mc_text", "y = x²",
                  "1²=1, 2²=4, 3²=9, 4²=16"),
    "al-fn-010": ("ne_value", 9 / 4,
                  "I = V/R = 9/4 = 2.25"),
    "al-ps-010": ("mc_text", "aₙ = aₙ₋₁ + aₙ₋₂  (with a₁ = a₂ = 1)",
                  "Fibonacci: 1+1=2, 1+2=3, 2+3=5, 3+5=8"),
    "al-ps-011": ("mc_text", "35",
                  "3N+5 segments; N=10 → 35"),
    "gm-sh-008": ("mc_text", "Square pyramid",
                  "1 square + 4 triangles = square pyramid"),
    "gm-ar-011": ("mc_text", "43 1/8",
                  "23/4 × 15/2 = 345/8 = 43 1/8"),
    "gm-ar-012": ("skip", None,
                  "pedagogical: SA → V inverse (Alexa got wrong)"),
    "gm-tr-006": ("mc_text", "Figure 3",
                  "−7 − (−2) = −5; arc from −7 right 2 units"),
    "gm-cp-006": ("mc_text", "Point K",
                  "(3, 2) has both coords positive → Q I"),
    "gm-dd-007": ("mc_text",
                  "The median income of Profession X is 3 times the median income of Profession Y.",
                  "median X=90, median Y=30, ratio=3"),
    "gm-ct-007": ("mc_text",
                  "The median of the 7 scores is equal to the median of the first 6.",
                  "median stays 90 after adding 95"),
    "gm-pr-006": ("mc_text", "1/15",
                  "P(lilies)·P(pink) = 1/5 × 1/3 = 1/15"),

    # ============================================================
    # BATCH 5 — Coverage rebalance (25)
    # ============================================================
    "no-pv-011": ("mc_text", "74", "47 vs 74 → 74 greater"),
    "no-pv-012": ("mc_text", "10 + 4", "14 = 10 + 4"),
    "no-wn-009": ("ne_value", 10 - 6, "6 + 4 = 10"),
    "no-wn-010": ("mc_text", "8 + 2 + 3 = 10 + 3", "make-a-ten for 8+5"),
    "no-fr-013": ("ne_value", 6 // 2, "half of 6"),
    "al-ps-012": ("mc_text", "△ (triangle)", "alternating pattern"),
    "al-eq-015": ("mc_text", "2", "5 = 3 + ?"),
    "gm-sh-009": ("mc_text", "Square", "4 equal sides + 4 right angles"),
    "gm-sh-010": ("ne_value", 5, "pentagon = 5 sides"),
    "gm-uc-007": ("ne_value", 4 - 3, "pencil − crayon"),
    "no-wn-011": ("ne_value", 47 * 23, "1081"),
    "no-wn-012": ("ne_value", 1800, "1847 → 1800 (tens=4 < 5)"),
    "no-dc-009": ("mc_text", "0.45", "max of 0.4, 0.04, 0.45, 0.044"),
    "no-fr-014": ("ne_value", 24 // 3, "1/3 of 24"),
    "al-fn-011": ("mc_text", "16", "9 + 7 = 16"),
    "gm-uc-008": ("ne_value", 105, "2:15 PM to 4:00 PM = 1h 45m"),
    "no-fr-015": ("skip", None, "pedagogical: 1/4 vs 1/3 misconception"),
    "no-wn-013": ("skip", None, "pedagogical: 200 − 47 column error"),
    "no-dc-010": ("skip", None, "pedagogical: 0.5 + 0.5 = 0.10 misconception"),
    "no-pf-006": ("skip", None, "pedagogical: 0 as a multiple"),
    "al-eq-016": ("skip", None, "pedagogical: sign error in moving terms"),
    "al-ex-013": ("skip", None, "pedagogical: 5 + 2x grouping error"),
    "al-ps-013": ("skip", None, "pedagogical: rule from too few terms"),
    "gm-ct-008": ("skip", None, "pedagogical: outlier mean vs median"),
    "gm-ar-013": ("skip", None, "pedagogical: circumference vs area"),
}


# ---------- comparison ----------

def normalize(s):
    """Strip whitespace; treat U+2212 (−) and ASCII '-' equivalently for safety."""
    if s is None:
        return ""
    return s.strip().replace("−", "-")


def verify_one(qid, q, kind, expected, note):
    if kind == "mc_text":
        actual = q["choices"][q["answer_index"]]
        return normalize(actual) == normalize(expected), {
            "expected": expected,
            "actual": actual,
            "choices": q["choices"],
            "answer_index": q["answer_index"],
        }
    if kind == "ne_value":
        try:
            actual = float(str(q["answer"]).replace(",", "").strip())
        except (ValueError, TypeError):
            return False, {"expected": expected, "actual": q.get("answer"), "error": "not parseable"}
        tol = float(q.get("tolerance", 0)) + 1e-9
        return abs(actual - float(expected)) <= tol, {
            "expected": expected,
            "actual": q["answer"],
        }
    if kind == "sa_texts":
        actual = {q["choices"][i] for i in q["answer_indices"]}
        actual_n = {normalize(x) for x in actual}
        expected_n = {normalize(x) for x in expected}
        return actual_n == expected_n, {
            "expected": sorted(expected),
            "actual": sorted(actual),
            "choices": q["choices"],
            "indices": q["answer_indices"],
        }
    return False, {"error": f"unknown kind {kind!r}"}


def explanation_mentions_answer(q):
    """Pass 2: heuristic that the explanation references the correct answer.

    Catches the "answer changed but explanation forgot to update" failure mode.
    Lenient on long pedagogical sentence-answers (the explanation paraphrases
    rather than quotes).
    """
    expl = q["explanation"]
    expl_norm = normalize(expl).lower()
    fmt = q["format"]
    if fmt == "multiple_choice":
        ans = q["choices"][q["answer_index"]]
        core = normalize(ans).lower()
        # For long answers (typical of pedagogical questions), require
        # several distinctive words to overlap rather than a literal substring.
        if len(core) > 30:
            words = [w.strip(".,;:()[]{}!?\"'") for w in core.split()]
            distinct = sorted({w for w in words if len(w) >= 5}, key=len, reverse=True)
            top = distinct[:5]
            hits = sum(1 for w in top if w in expl_norm)
            return hits >= max(1, min(2, len(top))), {"top_words": top, "hits": hits}
        return core in expl_norm, ans
    if fmt == "numeric_entry":
        ans = str(q["answer"]).strip()
        ans_no_commas = ans.replace(",", "")
        try:
            ans_f = float(ans_no_commas)
            candidates = {ans, ans_no_commas, str(ans_f)}
            if ans_f == int(ans_f):
                candidates.add(str(int(ans_f)))
                candidates.add(f"{int(ans_f):,}")  # 8263 → 8,263
        except ValueError:
            candidates = {ans, ans_no_commas}
        return any(c in expl for c in candidates), ans
    if fmt == "select_all":
        correct = [q["choices"][i] for i in q["answer_indices"]]
        missing = [c for c in correct if normalize(c).lower() not in expl_norm]
        return len(missing) == 0, missing
    return True, None


def main():
    here = Path(__file__).parent
    questions = load_questions(here / "questions.js")
    by_id = {q["id"]: q for q in questions}

    pass_n = fail_n = skip_n = 0
    issues = []
    no_ref = []

    for qid, q in by_id.items():
        if qid not in REFS:
            no_ref.append(qid)
            continue
        kind, expected, note = REFS[qid]
        if kind == "skip":
            skip_n += 1
            continue
        ok, details = verify_one(qid, q, kind, expected, note)
        if ok:
            pass_n += 1
        else:
            fail_n += 1
            block = [f"FAIL {qid}  ({note})"]
            for k, v in details.items():
                block.append(f"  {k}: {v!r}")
            issues.append("\n".join(block))

    # Pass 2: explanation references the correct answer
    expl_pass = expl_fail = 0
    expl_issues = []
    for q in questions:
        ok, info = explanation_mentions_answer(q)
        if ok:
            expl_pass += 1
        else:
            expl_fail += 1
            expl_issues.append(f"EXPL {q['id']}: explanation does not mention answer "
                               f"({q['format']}); answer={info!r}")

    stale_refs = [r for r in REFS if r not in by_id]

    print(f"Pass 1 (computational) PASS: {pass_n}")
    print(f"Pass 1 (computational) FAIL: {fail_n}")
    print(f"Pass 1 SKIP (manual review): {skip_n}")
    print(f"Pass 2 (explanation mentions answer) PASS: {expl_pass}")
    print(f"Pass 2 (explanation mentions answer) FAIL: {expl_fail}")
    if no_ref:
        print(f"\nQuestions in bank but NOT covered by REFS ({len(no_ref)}):")
        for r in no_ref:
            print(f"  {r}")
    if stale_refs:
        print(f"\nREFS pointing at questions not in bank ({len(stale_refs)}):")
        for r in stale_refs:
            print(f"  {r}")
    if issues:
        print("\n=== Pass 1 FAILURES ===")
        for i in issues:
            print(i)
            print("---")
    if expl_issues:
        print("\n=== Pass 2 FAILURES ===")
        for i in expl_issues:
            print(i)

    return fail_n == 0 and expl_fail == 0 and not no_ref and not stale_refs


if __name__ == "__main__":
    sys.exit(0 if main() else 1)

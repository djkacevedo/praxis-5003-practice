"""Validate the Praxis 5003 question bank.

Loads questions.js, parses the window.QUESTIONS array, and asserts schema rules.
Exits non-zero on the first violation, printing the offending question id and
field. This is the contract that hand-authored questions and any future
procedural generators must satisfy.

Usage:
    python validate.py
"""
import json
import re
import sys
from pathlib import Path

VALID_DOMAINS = {
    "numbers_operations",
    "algebraic_thinking",
    "geometry_measurement_data",
}

VALID_TOPICS_BY_DOMAIN = {
    "numbers_operations": {
        "place_value",
        "whole_number_ops",
        "fractions",
        "decimals",
        "ratios_proportions",
        "percentages",
        "prime_factorization_number_theory",
        "estimation_mental_math",
    },
    "algebraic_thinking": {
        "patterns_sequences",
        "expressions",
        "equations_inequalities",
        "functions",
        "properties_of_operations",
    },
    "geometry_measurement_data": {
        "shapes",
        "area_perimeter_volume",
        "transformations",
        "coordinate_plane",
        "unit_conversion",
        "data_displays",
        "central_tendency",
        "probability",
    },
}

VALID_GRADE_BANDS = {"K-2", "3-4", "5-6"}
VALID_DIFFICULTIES = {"easy", "medium", "hard"}
VALID_FORMATS = {"multiple_choice", "numeric_entry", "select_all"}

REQUIRED_BASE_FIELDS = {
    "id",
    "domain",
    "topic",
    "grade_band",
    "difficulty",
    "format",
    "calculator_allowed",
    "pedagogical",
    "stem",
    "explanation",
}


def _strip_js_comments(s: str) -> str:
    """Remove /* ... */ and // ... comments. Naive: doesn't account for // or
    /* inside string literals. Our question bank doesn't use those substrings
    inside strings, so this is fine; if it ever becomes a problem, switch to
    a stricter tokenizer."""
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.DOTALL)
    s = re.sub(r"(?m)//[^\n]*$", "", s)
    return s


def _strip_trailing_commas(s: str) -> str:
    """Remove trailing commas before ] or } — JSON forbids them, but JS allows."""
    return re.sub(r",(\s*[\]}])", r"\1", s)


def load_questions(path: Path):
    """Extract the JSON array from questions.js."""
    text = path.read_text(encoding="utf-8")
    text = _strip_js_comments(text)
    match = re.search(r"window\.QUESTIONS\s*=\s*(\[.*\])\s*;?\s*$", text, re.DOTALL)
    if not match:
        raise ValueError(
            "Could not find `window.QUESTIONS = [...]` in questions.js. "
            "Make sure keys and strings are JSON-quoted (use \" not ')."
        )
    raw = _strip_trailing_commas(match.group(1))
    try:
        return json.loads(raw)
    except json.JSONDecodeError as e:
        raise ValueError(
            f"Failed to parse the question array as JSON: {e}\n"
            f"Tip: keys must use double quotes; trailing commas are not allowed."
        ) from e


class ValidationError(Exception):
    pass


def fail(qid: str, msg: str):
    raise ValidationError(f"[{qid}] {msg}")


def validate_question(q: dict, seen_ids: set):
    qid = q.get("id", "<no-id>")

    missing = REQUIRED_BASE_FIELDS - set(q.keys())
    if missing:
        fail(qid, f"missing required fields: {sorted(missing)}")

    if not isinstance(q["id"], str) or not q["id"]:
        fail(qid, "id must be a non-empty string")
    if q["id"] in seen_ids:
        fail(qid, "duplicate id")
    seen_ids.add(q["id"])

    if q["domain"] not in VALID_DOMAINS:
        fail(qid, f"invalid domain {q['domain']!r}; valid: {sorted(VALID_DOMAINS)}")

    valid_topics = VALID_TOPICS_BY_DOMAIN[q["domain"]]
    if q["topic"] not in valid_topics:
        fail(qid, f"topic {q['topic']!r} not valid for domain {q['domain']!r}; "
                  f"valid topics for this domain: {sorted(valid_topics)}")

    if q["grade_band"] not in VALID_GRADE_BANDS:
        fail(qid, f"invalid grade_band {q['grade_band']!r}; valid: {sorted(VALID_GRADE_BANDS)}")

    if q["difficulty"] not in VALID_DIFFICULTIES:
        fail(qid, f"invalid difficulty {q['difficulty']!r}; valid: {sorted(VALID_DIFFICULTIES)}")

    if q["format"] not in VALID_FORMATS:
        fail(qid, f"invalid format {q['format']!r}; valid: {sorted(VALID_FORMATS)}")

    if not isinstance(q["calculator_allowed"], bool):
        fail(qid, "calculator_allowed must be a boolean")
    if not isinstance(q["pedagogical"], bool):
        fail(qid, "pedagogical must be a boolean")

    if not isinstance(q["stem"], str) or not q["stem"].strip():
        fail(qid, "stem must be a non-empty string")
    if not isinstance(q["explanation"], str) or not q["explanation"].strip():
        fail(qid, "explanation must be a non-empty string")

    fmt = q["format"]
    if fmt == "multiple_choice":
        if "choices" not in q or "answer_index" not in q:
            fail(qid, "multiple_choice requires choices and answer_index")
        choices = q["choices"]
        if not isinstance(choices, list) or len(choices) < 3:
            fail(qid, f"multiple_choice needs at least 3 choices (got {len(choices) if isinstance(choices, list) else 'non-list'})")
        if not all(isinstance(c, str) and c.strip() for c in choices):
            fail(qid, "all choices must be non-empty strings")
        ai = q["answer_index"]
        if not isinstance(ai, int) or ai < 0 or ai >= len(choices):
            fail(qid, f"answer_index {ai} out of range for {len(choices)} choices")
    elif fmt == "numeric_entry":
        if "answer" not in q:
            fail(qid, "numeric_entry requires answer")
        try:
            float(str(q["answer"]).replace(",", "").strip())
        except (TypeError, ValueError):
            fail(qid, f"answer {q['answer']!r} is not a parsable number")
        if "tolerance" in q:
            try:
                tol = float(q["tolerance"])
            except (TypeError, ValueError):
                fail(qid, f"tolerance {q['tolerance']!r} is not a number")
            if tol < 0:
                fail(qid, f"tolerance must be non-negative (got {tol})")
    elif fmt == "select_all":
        if "choices" not in q or "answer_indices" not in q:
            fail(qid, "select_all requires choices and answer_indices")
        choices = q["choices"]
        if not isinstance(choices, list) or len(choices) < 3:
            fail(qid, f"select_all needs at least 3 choices")
        if not all(isinstance(c, str) and c.strip() for c in choices):
            fail(qid, "all choices must be non-empty strings")
        ais = q["answer_indices"]
        if not isinstance(ais, list) or len(ais) == 0:
            fail(qid, "answer_indices must be a non-empty list")
        for ai in ais:
            if not isinstance(ai, int) or ai < 0 or ai >= len(choices):
                fail(qid, f"answer_indices contains out-of-range value {ai}")
        if len(set(ais)) != len(ais):
            fail(qid, "answer_indices contains duplicates")


def main():
    here = Path(__file__).parent
    qs_path = here / "questions.js"
    if not qs_path.exists():
        print(f"ERROR: {qs_path} not found", file=sys.stderr)
        sys.exit(2)
    try:
        questions = load_questions(qs_path)
    except ValueError as e:
        print(f"ERROR loading questions.js:\n  {e}", file=sys.stderr)
        sys.exit(2)

    if not isinstance(questions, list):
        print("ERROR: window.QUESTIONS must be an array", file=sys.stderr)
        sys.exit(2)

    seen_ids = set()
    try:
        for i, q in enumerate(questions):
            if not isinstance(q, dict):
                print(f"ERROR at index {i}: question must be an object", file=sys.stderr)
                sys.exit(1)
            validate_question(q, seen_ids)
    except ValidationError as e:
        print(f"FAIL: {e}", file=sys.stderr)
        sys.exit(1)

    # Summary
    print(f"OK: {len(questions)} questions validated")
    by_domain = {}
    by_grade = {}
    by_format = {}
    pedagogical = 0
    no_calc = 0
    for q in questions:
        by_domain[q["domain"]] = by_domain.get(q["domain"], 0) + 1
        by_grade[q["grade_band"]] = by_grade.get(q["grade_band"], 0) + 1
        by_format[q["format"]] = by_format.get(q["format"], 0) + 1
        if q["pedagogical"]:
            pedagogical += 1
        if not q["calculator_allowed"]:
            no_calc += 1
    print(f"  by domain: {by_domain}")
    print(f"  by grade:  {by_grade}")
    print(f"  by format: {by_format}")
    print(f"  pedagogical: {pedagogical}, no-calculator: {no_calc}")


if __name__ == "__main__":
    main()

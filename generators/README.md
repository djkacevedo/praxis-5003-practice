# Procedural question generators (placeholder)

This folder is reserved for future Python scripts that procedurally generate
practice questions. It is intentionally empty in v1.

## Convention

Each generator is a Python script (e.g. `place_value.py`) that prints a JSON
array of question objects to stdout. Question objects must match the schema
enforced by `../validate.py`.

```python
# Example skeleton: generators/place_value.py
import json, random

def generate(n=10):
    out = []
    for i in range(n):
        digit = random.randint(1, 9)
        position = random.randint(2, 6)        # tens..hundred-thousands
        place_value = digit * (10 ** (position - 1))
        # ... build a number containing `digit` at the chosen position
        # ... assemble distractors
        out.append({
            "id": f"no-pv-gen-{i:03d}",
            "domain": "numbers_operations",
            "topic": "place_value",
            "grade_band": "3-4",
            "difficulty": "medium",
            "format": "multiple_choice",
            "calculator_allowed": False,
            "pedagogical": False,
            "stem": f"What is the value of the digit {digit} in ...?",
            "choices": [...],
            "answer_index": ...,
            "explanation": "..."
        })
    return out

if __name__ == "__main__":
    print(json.dumps(generate(), indent=2))
```

## Future build pipeline

When generators exist, a sibling `build.py` will:

1. Read `questions.js` (hand-authored questions).
2. Run each generator; collect outputs.
3. Concatenate hand-authored + generated into a single array.
4. Re-emit `questions.js` with the merged bank.
5. Run `validate.py` against the merged file; abort on any failure.

For now: hand-authored questions only. Add generators here when ready.

/* Praxis 5003 question bank.
 *
 * Each question is an object with these fields:
 *   id                  : string, unique
 *   domain              : "numbers_operations" | "algebraic_thinking" | "geometry_measurement_data"
 *   topic               : topic key (see validate.py for the approved set per domain)
 *   grade_band          : "K-2" | "3-4" | "5-6"
 *   difficulty          : "easy" | "medium" | "hard"
 *   format              : "multiple_choice" | "numeric_entry" | "select_all"
 *   calculator_allowed  : boolean
 *   pedagogical         : boolean — true if testing teaching/misconception knowledge
 *   stem                : the question text (use \n for line breaks; **bold** allowed)
 *   explanation         : step-by-step worked solution (first line is used as the hint)
 *
 * Plus, depending on format:
 *   multiple_choice     : choices (array of strings, ≥3) and answer_index (int into choices)
 *   numeric_entry       : answer (string parseable as number); optional tolerance (number)
 *   select_all          : choices (array of strings, ≥3) and answer_indices (non-empty list of ints)
 *
 * After editing, run `python validate.py` to lint the bank.
 */
window.QUESTIONS = [

  /* ============================================================
     NUMBERS & OPERATIONS — Place Value (8)
     ============================================================ */
  {
    "id": "no-pv-001",
    "domain": "numbers_operations",
    "topic": "place_value",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the value of the digit 4 in the number 47?",
    "choices": ["4", "40", "400", "14"],
    "answer_index": 1,
    "explanation": "In a 2-digit number, the leftmost digit is in the tens place.\nThe 4 is in the tens place, so its value is 4 × 10 = 40."
  },
  {
    "id": "no-pv-002",
    "domain": "numbers_operations",
    "topic": "place_value",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which number has a 6 in the tens place?",
    "choices": ["16", "60", "106", "6"],
    "answer_index": 1,
    "explanation": "Read place values right-to-left.\nIn 60, the 6 is in the tens place (and 0 is in the ones).\nIn 16, the 6 is in the ones. In 106, the digits are 1 (hundreds), 0 (tens), 6 (ones). In 6, the 6 is in the ones."
  },
  {
    "id": "no-pv-003",
    "domain": "numbers_operations",
    "topic": "place_value",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the value of the digit 7 in 27,054?",
    "choices": ["7", "70", "700", "7,000"],
    "answer_index": 3,
    "explanation": "Reading place values right to left in 27,054: 4 (ones), 5 (tens), 0 (hundreds), 7 (thousands), 2 (ten-thousands).\nThe 7 is in the thousands place, so its value is 7 × 1,000 = 7,000."
  },
  {
    "id": "no-pv-004",
    "domain": "numbers_operations",
    "topic": "place_value",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Write 8,000 + 200 + 60 + 3 in standard form.",
    "answer": "8263",
    "explanation": "Each term in the expanded form gives the value at one place.\n8,000 (thousands) + 200 (hundreds) + 60 (tens) + 3 (ones) = 8,263."
  },
  {
    "id": "no-pv-005",
    "domain": "numbers_operations",
    "topic": "place_value",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which numbers have a 7 in the hundreds place? Select all that apply.",
    "choices": ["274", "712", "1,704", "70"],
    "answer_indices": [1, 2],
    "explanation": "Locate each digit's place by counting from the right (ones, tens, hundreds, ...).\n274: digits are 2 (hundreds), 7 (tens), 4 (ones) — 7 is in the tens place.\n712: 7 (hundreds), 1 (tens), 2 (ones) — 7 is in the hundreds place. ✓\n1,704: 1 (thousands), 7 (hundreds), 0 (tens), 4 (ones) — 7 is in the hundreds place. ✓\n70: 7 (tens), 0 (ones) — 7 is in the tens place."
  },
  {
    "id": "no-pv-006",
    "domain": "numbers_operations",
    "topic": "place_value",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the value of the digit 6 in 0.467?",
    "answer": "0.06",
    "explanation": "After the decimal point, places are tenths, hundredths, thousandths.\n0.467: 4 (tenths), 6 (hundredths), 7 (thousandths).\nThe 6 is in the hundredths place: 6 × 0.01 = 0.06."
  },
  {
    "id": "no-pv-007",
    "domain": "numbers_operations",
    "topic": "place_value",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student writes \"four hundred eight\" as 4008. What is the student's most likely misconception?",
    "choices": [
      "The student does not know that 408 has only three digits.",
      "The student wrote 400 followed by 08, treating each spoken number-word as a separate value with all places filled.",
      "The student confused \"hundred\" with \"thousand\".",
      "The student does not understand that there is no tens digit in 408."
    ],
    "answer_index": 1,
    "explanation": "The correct standard form is 408 (4 hundreds + 0 tens + 8 ones).\nThe student wrote each spoken chunk as a complete number (\"four hundred\" = 400, \"eight\" = 08) and concatenated them, getting 4008. This is a common place-value error in which students translate words directly into digits rather than aligning by place. A useful intervention is to use a place-value chart and have the student write 4 in hundreds, 0 in tens, 8 in ones."
  },
  {
    "id": "no-pv-008",
    "domain": "numbers_operations",
    "topic": "place_value",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which expression is equivalent to 4,062?",
    "choices": [
      "4 × 1,000 + 0 × 100 + 6 × 10 + 2 × 1",
      "4 × 1,000 + 6 × 100 + 2 × 1",
      "4 × 100 + 6 × 10 + 2 × 1",
      "4 × 1,000 + 6 × 10 + 2 × 10"
    ],
    "answer_index": 0,
    "explanation": "Expanded form lists each digit times its place value.\n4,062 has 4 thousands, 0 hundreds, 6 tens, and 2 ones:\n4 × 1,000 + 0 × 100 + 6 × 10 + 2 × 1 = 4,000 + 0 + 60 + 2 = 4,062."
  },

  /* ============================================================
     NUMBERS & OPERATIONS — Whole-Number Operations (7)
     ============================================================ */
  {
    "id": "no-wn-001",
    "domain": "numbers_operations",
    "topic": "whole_number_ops",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is 7 + 8?",
    "answer": "15",
    "explanation": "Use a \"make-a-ten\" strategy: 7 + 3 = 10, then add the remaining 5 from the 8 to get 15.\nOr: 8 + 8 = 16, then subtract 1 to get 15."
  },
  {
    "id": "no-wn-002",
    "domain": "numbers_operations",
    "topic": "whole_number_ops",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which expression has a sum of 12?",
    "choices": ["9 + 4", "6 + 6", "7 + 4", "8 + 5"],
    "answer_index": 1,
    "explanation": "9 + 4 = 13. 6 + 6 = 12. 7 + 4 = 11. 8 + 5 = 13.\nOnly 6 + 6 equals 12."
  },
  {
    "id": "no-wn-003",
    "domain": "numbers_operations",
    "topic": "whole_number_ops",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is 234 + 198?",
    "answer": "432",
    "explanation": "Mental strategy: 234 + 200 = 434, then subtract 2 (because 198 is 2 less than 200) to get 432.\nColumn addition: ones 4+8=12 (write 2, carry 1); tens 3+9+1=13 (write 3, carry 1); hundreds 2+1+1=4. Total: 432."
  },
  {
    "id": "no-wn-004",
    "domain": "numbers_operations",
    "topic": "whole_number_ops",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which is the best estimate of 487 × 6?",
    "choices": ["2,400", "3,000", "3,600", "5,000"],
    "answer_index": 1,
    "explanation": "Round 487 to the nearest hundred: 500.\n500 × 6 = 3,000.\n(The exact product is 2,922, very close to the estimate.)"
  },
  {
    "id": "no-wn-005",
    "domain": "numbers_operations",
    "topic": "whole_number_ops",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "What is 1,452 ÷ 4?",
    "answer": "363",
    "explanation": "Long division:\n14 ÷ 4 = 3 remainder 2.\nBring down 5 → 25; 25 ÷ 4 = 6 remainder 1.\nBring down 2 → 12; 12 ÷ 4 = 3.\nResult: 363. Check: 363 × 4 = 1,452. ✓"
  },
  {
    "id": "no-wn-006",
    "domain": "numbers_operations",
    "topic": "whole_number_ops",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student computes 503 − 87 and gets 584. What error did the student most likely make?",
    "choices": [
      "The student multiplied instead of subtracting.",
      "The student subtracted the smaller digit from the larger digit in each column, regardless of which number the digit was in.",
      "The student added instead of subtracting.",
      "The student forgot the hundreds digit."
    ],
    "answer_index": 1,
    "explanation": "The correct answer is 503 − 87 = 416.\nThe student's 584 comes from doing each column as \"larger minus smaller\": ones 7−3=4, tens 8−0=8, hundreds 5 (untouched) → 584. This is a classic subtraction error that appears when borrowing/regrouping is required, especially across a zero. The fix is to teach regrouping explicitly: when the top digit is smaller than the bottom, regroup from the next place."
  },
  {
    "id": "no-wn-007",
    "domain": "numbers_operations",
    "topic": "whole_number_ops",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "A bookstore sold 246 books in March, 318 in April, and 295 in May. If the books are packed into boxes that hold 12 books each, how many books are left over after filling as many full boxes as possible?",
    "answer": "7",
    "explanation": "Total books: 246 + 318 + 295 = 859.\nDivide by 12: 12 × 71 = 852, with 859 − 852 = 7 left over.\nSo 71 boxes are full and 7 books remain."
  },

  /* ============================================================
     NUMBERS & OPERATIONS — Fractions (10)
     ============================================================ */
  {
    "id": "no-fr-001",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A circle is divided into 4 equal pieces. 3 of the pieces are shaded. What fraction of the circle is shaded?",
    "choices": ["1/4", "3/4", "4/3", "1/3"],
    "answer_index": 1,
    "explanation": "A fraction names parts out of equal pieces.\nNumerator (3) = pieces shaded; denominator (4) = total equal pieces.\nThe shaded fraction is 3/4."
  },
  {
    "id": "no-fr-002",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which fraction is equivalent to 2/3?",
    "choices": ["4/9", "4/6", "3/4", "2/6"],
    "answer_index": 1,
    "explanation": "To find an equivalent fraction, multiply numerator and denominator by the same nonzero number.\n2/3 × 2/2 = 4/6.\nCheck: 4/6 simplifies back to 2/3 (divide both by 2)."
  },
  {
    "id": "no-fr-003",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which list orders these fractions from least to greatest?\n1/2, 1/4, 1/3",
    "choices": [
      "1/2, 1/3, 1/4",
      "1/4, 1/3, 1/2",
      "1/4, 1/2, 1/3",
      "1/3, 1/4, 1/2"
    ],
    "answer_index": 1,
    "explanation": "When the numerator is the same (1), the fraction with the larger denominator is smaller — the whole is divided into more (smaller) pieces.\nDenominators: 4 > 3 > 2, so 1/4 < 1/3 < 1/2.\nLeast to greatest: 1/4, 1/3, 1/2."
  },
  {
    "id": "no-fr-004",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is 1/4 + 2/4?",
    "choices": ["3/8", "3/4", "1/2", "2/8"],
    "answer_index": 1,
    "explanation": "When fractions have the same denominator, add the numerators and keep the denominator.\n1/4 + 2/4 = (1 + 2)/4 = 3/4."
  },
  {
    "id": "no-fr-005",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is 2/3 + 1/4?",
    "choices": ["3/7", "3/12", "11/12", "1/2"],
    "answer_index": 2,
    "explanation": "Find a common denominator. The LCD of 3 and 4 is 12.\n2/3 = 8/12 and 1/4 = 3/12.\n8/12 + 3/12 = 11/12."
  },
  {
    "id": "no-fr-006",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is 3/5 × 5/6?",
    "choices": ["8/11", "1/2", "15/11", "3/30"],
    "answer_index": 1,
    "explanation": "Multiply numerators and denominators: (3 × 5) / (5 × 6) = 15/30.\nSimplify: 15/30 = 1/2.\n(You can also cancel before multiplying: the 5s cancel, leaving 3/6 = 1/2.)"
  },
  {
    "id": "no-fr-007",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is 4/5 ÷ 2/3?",
    "choices": ["8/15", "6/5", "5/6", "8/10"],
    "answer_index": 1,
    "explanation": "To divide fractions, multiply by the reciprocal of the divisor.\n4/5 ÷ 2/3 = 4/5 × 3/2 = (4 × 3) / (5 × 2) = 12/10 = 6/5.\n(Equivalent to 1 1/5 or 1.2.)"
  },
  {
    "id": "no-fr-008",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student says that 1/3 + 1/4 = 2/7 because \"you add the tops and add the bottoms.\" What is the correct first step?",
    "choices": [
      "Multiply the numerators and denominators.",
      "Find a common denominator before adding the numerators.",
      "Subtract instead of add.",
      "Reduce both fractions first."
    ],
    "answer_index": 1,
    "explanation": "Adding numerators and denominators directly is a common error.\nFractions with different denominators must first be rewritten with a common denominator.\nThe LCD of 3 and 4 is 12: 1/3 = 4/12 and 1/4 = 3/12. Then 4/12 + 3/12 = 7/12 (not 2/7)."
  },
  {
    "id": "no-fr-009",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Sam has 8 cookies. He gives 1/4 of them to his sister. How many cookies does he give to his sister?",
    "answer": "2",
    "explanation": "\"1/4 of 8\" means divide 8 into 4 equal groups and take one group.\n8 ÷ 4 = 2.\nHe gives 2 cookies to his sister."
  },
  {
    "id": "no-fr-010",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which of these fractions are less than 1/2? Select all that apply.",
    "choices": ["1/3", "2/3", "1/4", "3/4"],
    "answer_indices": [0, 2],
    "explanation": "A fraction is less than 1/2 if the numerator is less than half the denominator.\n1/3: 1 < 1.5 ✓ (less than 1/2).\n2/3: 2 > 1.5 ✗ (greater than 1/2).\n1/4: 1 < 2 ✓ (less than 1/2).\n3/4: 3 > 2 ✗ (greater than 1/2)."
  },

  /* ============================================================
     NUMBERS & OPERATIONS — Decimals (7)
     ============================================================ */
  {
    "id": "no-dc-001",
    "domain": "numbers_operations",
    "topic": "decimals",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is 0.4 + 0.3?",
    "answer": "0.7",
    "explanation": "Line up the decimal points and add: 0.4 + 0.3 = 0.7.\nOr think of it as 4 tenths + 3 tenths = 7 tenths = 0.7."
  },
  {
    "id": "no-dc-002",
    "domain": "numbers_operations",
    "topic": "decimals",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which decimal is greatest?",
    "choices": ["0.42", "0.4", "0.421", "0.4042"],
    "answer_index": 2,
    "explanation": "Compare by writing each with the same number of decimal places (pad with zeros).\n0.42 = 0.4200\n0.4  = 0.4000\n0.421 = 0.4210\n0.4042 = 0.4042\nThe largest is 0.4210, so 0.421 is greatest."
  },
  {
    "id": "no-dc-003",
    "domain": "numbers_operations",
    "topic": "decimals",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is 2.5 × 0.4?",
    "answer": "1",
    "explanation": "Multiply ignoring decimals first: 25 × 4 = 100.\nCount the total decimal places in the factors: 1 + 1 = 2.\nPlace the decimal so the answer has 2 decimal places: 1.00 = 1."
  },
  {
    "id": "no-dc-004",
    "domain": "numbers_operations",
    "topic": "decimals",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "What is 6.4 ÷ 0.8?",
    "answer": "8",
    "explanation": "Multiply both numbers by 10 to clear the decimal in the divisor: 6.4 ÷ 0.8 = 64 ÷ 8 = 8.\nCheck: 8 × 0.8 = 6.4. ✓"
  },
  {
    "id": "no-dc-005",
    "domain": "numbers_operations",
    "topic": "decimals",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student is asked which is greater, 0.7 or 0.65, and answers \"0.65, because 65 is greater than 7.\" What is the student's misconception?",
    "choices": [
      "The student does not understand that 65 has more digits than 7.",
      "The student is treating the digits after the decimal as a whole number, ignoring place value.",
      "The student forgot to line up the decimal points.",
      "The student does not know how to compare fractions."
    ],
    "answer_index": 1,
    "explanation": "0.7 = 0.70 = 70 hundredths; 0.65 = 65 hundredths, so 0.7 > 0.65.\nThe student treated 7 and 65 as whole numbers, ignoring that 0.7 means 7 tenths (= 70 hundredths). A reliable fix is to write the decimals with the same number of decimal places before comparing: 0.70 vs 0.65 makes the answer obvious."
  },
  {
    "id": "no-dc-006",
    "domain": "numbers_operations",
    "topic": "decimals",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which of these are equivalent to 0.5? Select all that apply.",
    "choices": ["1/2", "5/10", "50%", "5/100"],
    "answer_indices": [0, 1, 2],
    "explanation": "0.5 means 5 tenths.\n1/2 = 0.5 ✓\n5/10 = 0.5 ✓\n50% = 50/100 = 0.5 ✓\n5/100 = 0.05 ✗ (this is one-twentieth, not one-half)."
  },
  {
    "id": "no-dc-007",
    "domain": "numbers_operations",
    "topic": "decimals",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "Maria buys 3 notebooks at $2.45 each and a pen for $1.30. How much does she spend in total, in dollars?",
    "answer": "8.65",
    "explanation": "Three notebooks cost 3 × $2.45 = $7.35.\nAdd the pen: $7.35 + $1.30 = $8.65."
  },

  /* ============================================================
     NUMBERS & OPERATIONS — Ratios & Proportions (5)
     ============================================================ */
  {
    "id": "no-rp-001",
    "domain": "numbers_operations",
    "topic": "ratios_proportions",
    "grade_band": "5-6",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A class has 12 girls and 8 boys. What is the ratio of girls to boys, in simplest form?",
    "choices": ["8 : 12", "3 : 2", "12 : 20", "1 : 2"],
    "answer_index": 1,
    "explanation": "The ratio of girls to boys is 12 : 8.\nSimplify by dividing both numbers by their GCF (4): 12/4 = 3 and 8/4 = 2.\nSimplest form: 3 : 2."
  },
  {
    "id": "no-rp-002",
    "domain": "numbers_operations",
    "topic": "ratios_proportions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "If 3 apples cost $1.20, how much do 7 apples cost, in dollars?",
    "answer": "2.80",
    "explanation": "Find the unit price first: $1.20 ÷ 3 = $0.40 per apple.\nThen 7 × $0.40 = $2.80."
  },
  {
    "id": "no-rp-003",
    "domain": "numbers_operations",
    "topic": "ratios_proportions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A recipe uses 2 cups of flour for every 3 eggs. If the baker uses 12 eggs, how many cups of flour are needed?",
    "choices": ["6", "8", "18", "24"],
    "answer_index": 1,
    "explanation": "Set up a proportion: 2 cups / 3 eggs = x cups / 12 eggs.\nCross-multiply: 3x = 2 × 12 = 24, so x = 8 cups.\n(Or: 12 eggs is 4 times as many as 3 eggs, so flour also multiplies by 4: 2 × 4 = 8 cups.)"
  },
  {
    "id": "no-rp-004",
    "domain": "numbers_operations",
    "topic": "ratios_proportions",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "A car travels 165 miles on 5 gallons of gas. At this rate, how many miles can it travel on 8 gallons?",
    "answer": "264",
    "explanation": "Find the unit rate: 165 ÷ 5 = 33 miles per gallon.\nThen 33 × 8 = 264 miles."
  },
  {
    "id": "no-rp-005",
    "domain": "numbers_operations",
    "topic": "ratios_proportions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student claims the ratio 6 : 9 is the same as 2 : 3. Is the student correct, and why?",
    "choices": [
      "Yes, because both ratios reduce to the same simplest form.",
      "Yes, because 9 − 6 = 3 and 3 − 2 = 1.",
      "No, because the numbers are different.",
      "No, because ratios cannot be simplified."
    ],
    "answer_index": 0,
    "explanation": "The student is correct.\nTo compare ratios, simplify each by dividing both terms by their GCF.\n6 : 9, both divided by 3, gives 2 : 3.\nEquivalent ratios describe the same multiplicative relationship between two quantities. (Note: option B describes additive thinking, which is a common but incorrect way to compare ratios — additive differences do not preserve ratios.)"
  },

  /* ============================================================
     NUMBERS & OPERATIONS — Percentages (5)
     ============================================================ */
  {
    "id": "no-pc-001",
    "domain": "numbers_operations",
    "topic": "percentages",
    "grade_band": "5-6",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is 25% as a fraction in simplest form?",
    "choices": ["1/2", "1/4", "2/5", "1/25"],
    "answer_index": 1,
    "explanation": "Percent means \"per hundred,\" so 25% = 25/100.\nSimplify by dividing numerator and denominator by 25: 25/100 = 1/4."
  },
  {
    "id": "no-pc-002",
    "domain": "numbers_operations",
    "topic": "percentages",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "What is 20% of 60?",
    "answer": "12",
    "explanation": "20% as a decimal is 0.20.\n0.20 × 60 = 12.\nMental shortcut: 10% of 60 is 6, so 20% is 6 × 2 = 12."
  },
  {
    "id": "no-pc-003",
    "domain": "numbers_operations",
    "topic": "percentages",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "A shirt that normally costs $40 is on sale for 25% off. What is the sale price, in dollars?",
    "answer": "30",
    "explanation": "Discount = 25% of $40 = 0.25 × 40 = $10.\nSale price = $40 − $10 = $30.\n(Or: paying 75% of $40 = 0.75 × 40 = $30.)"
  },
  {
    "id": "no-pc-004",
    "domain": "numbers_operations",
    "topic": "percentages",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "If 30 students out of 50 passed a test, what percent of the students passed?",
    "choices": ["30%", "50%", "60%", "80%"],
    "answer_index": 2,
    "explanation": "Percent passed = (students who passed) / (total students) × 100.\n(30 / 50) × 100 = 0.60 × 100 = 60%."
  },
  {
    "id": "no-pc-005",
    "domain": "numbers_operations",
    "topic": "percentages",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student calculates a 50% increase of $20 as $70. What is the student's misconception?",
    "choices": [
      "The student multiplied instead of adding.",
      "The student treated 50% as the number 50, rather than as 50% of the original $20.",
      "The student forgot to include the original $20.",
      "The student should have gotten $40."
    ],
    "answer_index": 1,
    "explanation": "A 50% increase means add 50% of the original to itself.\n50% of $20 = $10, so a 50% increase of $20 is $20 + $10 = $30.\nThe student got $70 by adding 50 (the literal numeral) to the original $20, instead of adding 50% of $20 (which is $10)."
  },

  /* ============================================================
     NUMBERS & OPERATIONS — Prime Factorization & Number Theory (5)
     ============================================================ */
  {
    "id": "no-pf-001",
    "domain": "numbers_operations",
    "topic": "prime_factorization_number_theory",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the greatest common factor (GCF) of 24 and 36?",
    "answer": "12",
    "explanation": "Find the prime factorizations:\n24 = 2 × 2 × 2 × 3 = 2³ × 3\n36 = 2 × 2 × 3 × 3 = 2² × 3²\nGCF uses the lowest power of each common prime: 2² × 3 = 4 × 3 = 12."
  },
  {
    "id": "no-pf-002",
    "domain": "numbers_operations",
    "topic": "prime_factorization_number_theory",
    "grade_band": "5-6",
    "difficulty": "easy",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which of these are prime numbers? Select all that apply.",
    "choices": ["2", "9", "13", "21"],
    "answer_indices": [0, 2],
    "explanation": "A prime number has exactly two distinct factors: 1 and itself.\n2: factors are 1, 2 — prime ✓\n9: factors are 1, 3, 9 (= 3 × 3) — not prime.\n13: factors are 1, 13 — prime ✓\n21: factors are 1, 3, 7, 21 (= 3 × 7) — not prime."
  },
  {
    "id": "no-pf-003",
    "domain": "numbers_operations",
    "topic": "prime_factorization_number_theory",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student writes the prime factorization of 60 as 2 × 30. Why is this not the complete prime factorization?",
    "choices": [
      "Because 2 is not a prime number.",
      "Because 30 is not prime; it must be broken down further.",
      "Because the factors should add up to 60, not multiply to it.",
      "Because every prime factorization must use exactly three primes."
    ],
    "answer_index": 1,
    "explanation": "Prime factorization expresses a number as a product of prime numbers only.\n30 is composite (30 = 2 × 3 × 5), so 2 × 30 must continue: 60 = 2 × 30 = 2 × 2 × 3 × 5 = 2² × 3 × 5.\nA factor tree helps: keep splitting any composite branch until every leaf is prime."
  },
  {
    "id": "no-pf-004",
    "domain": "numbers_operations",
    "topic": "prime_factorization_number_theory",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the least common multiple (LCM) of 6 and 8?",
    "answer": "24",
    "explanation": "Prime factorize: 6 = 2 × 3, 8 = 2 × 2 × 2 = 2³.\nLCM uses the highest power of each prime: 2³ × 3 = 8 × 3 = 24.\nCheck: 24 = 6 × 4 and 24 = 8 × 3, so 24 is a multiple of both, and no smaller number is."
  },
  {
    "id": "no-pf-005",
    "domain": "numbers_operations",
    "topic": "prime_factorization_number_theory",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which of these numbers are factors of 24? Select all that apply.",
    "choices": ["4", "6", "9", "12"],
    "answer_indices": [0, 1, 3],
    "explanation": "A factor of 24 divides 24 evenly (no remainder).\nFactors of 24: 1, 2, 3, 4, 6, 8, 12, 24.\n4: 24 ÷ 4 = 6 ✓\n6: 24 ÷ 6 = 4 ✓\n9: 24 ÷ 9 = 2 remainder 6 ✗\n12: 24 ÷ 12 = 2 ✓"
  },

  /* ============================================================
     NUMBERS & OPERATIONS — Estimation & Mental Math (3)
     ============================================================ */
  {
    "id": "no-em-001",
    "domain": "numbers_operations",
    "topic": "estimation_mental_math",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the best estimate for 198 + 304?",
    "choices": ["400", "500", "600", "700"],
    "answer_index": 1,
    "explanation": "Round each addend to the nearest hundred: 198 ≈ 200 and 304 ≈ 300.\nEstimate: 200 + 300 = 500.\n(The exact sum is 502 — the estimate is very close.)"
  },
  {
    "id": "no-em-002",
    "domain": "numbers_operations",
    "topic": "estimation_mental_math",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A theater has about 350 seats. Each ticket costs $9.75. Estimate the total revenue if every seat is sold.",
    "choices": ["$2,000", "$3,500", "$5,000", "$35,000"],
    "answer_index": 1,
    "explanation": "Round $9.75 up to $10.\nEstimate: 350 × $10 = $3,500.\n(The exact revenue is 350 × $9.75 = $3,412.50, very close to the estimate.)"
  },
  {
    "id": "no-em-003",
    "domain": "numbers_operations",
    "topic": "estimation_mental_math",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student estimates 47 × 21 by computing 50 × 20 = 1,000. The actual product is 987. Which best describes the estimate's accuracy?",
    "choices": [
      "The estimate is unreasonable because both factors were rounded.",
      "The estimate is close because rounding 47 up and 21 down causes the rounding errors to partially offset.",
      "The estimate is too low because both factors were rounded down.",
      "The estimate is exactly correct because rounding always gives the right answer."
    ],
    "answer_index": 1,
    "explanation": "Rounding 47 up to 50 increases the estimate; rounding 21 down to 20 decreases it. When one factor is rounded up and another is rounded down, the errors partially cancel, giving an estimate close to the true value (1,000 vs. 987). Estimation is most accurate when rounding directions offset like this; rounding both factors up (or both down) tends to give a worse estimate."
  },

  /* ============================================================
     NUMBERS & OPERATIONS — Additional questions (5)
     ============================================================ */
  {
    "id": "no-wn-008",
    "domain": "numbers_operations",
    "topic": "whole_number_ops",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "A class of 28 students is going on a field trip. Each van holds 6 students. What is the **minimum** number of vans needed?",
    "choices": ["4", "5", "6", "28"],
    "answer_index": 1,
    "explanation": "28 ÷ 6 = 4 remainder 4.\nFour vans hold 4 × 6 = 24 students; 4 students still need transport.\nA partial van still counts as a van, so round up: 5 vans (the 5th carries only 4 students).\nFor any \"minimum number of containers\" problem, round up whenever there is a remainder."
  },
  {
    "id": "no-dc-008",
    "domain": "numbers_operations",
    "topic": "decimals",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Sara had $1.50 and earned $0.25 more. How much money does she have now, in dollars?",
    "answer": "1.75",
    "explanation": "Add the amounts, lining up the decimal points:\n  1.50\n+ 0.25\n  ----\n  1.75\nSo Sara has $1.75."
  },
  {
    "id": "no-rp-006",
    "domain": "numbers_operations",
    "topic": "ratios_proportions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "On a map, 1 inch represents 50 miles. The distance between two cities on the map is 4.5 inches. What is the actual distance?",
    "choices": ["50 miles", "200 miles", "225 miles", "450 miles"],
    "answer_index": 2,
    "explanation": "Multiply the map distance by the scale factor: 4.5 × 50 = 225 miles.\nSetting up the proportion: 1 in / 50 mi = 4.5 in / x mi. Cross-multiply: x = 4.5 × 50 = 225 miles."
  },
  {
    "id": "no-em-004",
    "domain": "numbers_operations",
    "topic": "estimation_mental_math",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which is the best way to estimate 6.8 + 4.2 mentally?",
    "choices": [
      "Round each to the nearest whole: 7 + 4 = 11.",
      "Round each up to the next whole: 7 + 5 = 12.",
      "Add only the whole-number parts: 6 + 4 = 10.",
      "Round to the nearest tenth, which gives no change."
    ],
    "answer_index": 0,
    "explanation": "Round each addend to the nearest whole: 6.8 ≈ 7 and 4.2 ≈ 4.\nEstimate: 7 + 4 = 11.\n(Exact sum: 11.0 — the estimate is exact because the rounding errors offset: 6.8 was rounded up by 0.2 and 4.2 was rounded down by 0.2.)"
  },
  {
    "id": "no-em-005",
    "domain": "numbers_operations",
    "topic": "estimation_mental_math",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the best estimate for 412 ÷ 7?",
    "choices": ["50", "60", "70", "80"],
    "answer_index": 1,
    "explanation": "Round 412 to a number that's easy to divide by 7.\n412 ≈ 420, which is a multiple of 7 (7 × 60 = 420).\nEstimate: 420 ÷ 7 = 60.\n(Exact: 412 ÷ 7 ≈ 58.86, very close to 60.)"
  },

  /* ============================================================
     ALGEBRAIC THINKING — Patterns & Sequences (9)
     ============================================================ */
  {
    "id": "al-ps-001",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What number comes next?\n2, 4, 6, 8, ___",
    "answer": "10",
    "explanation": "Each term is 2 more than the one before it (this is skip-counting by 2).\n8 + 2 = 10."
  },
  {
    "id": "al-ps-002",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A pattern goes: red, blue, red, blue, red. What color comes next?",
    "choices": ["red", "blue", "yellow", "green"],
    "answer_index": 1,
    "explanation": "The pattern alternates between red and blue.\nAfter red comes blue."
  },
  {
    "id": "al-ps-003",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Continue the pattern: 5, 10, 15, 20, ___",
    "answer": "25",
    "explanation": "Each term increases by 5 (skip-counting by 5).\n20 + 5 = 25."
  },
  {
    "id": "al-ps-004",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Find the missing number: 1, 4, 7, 10, ___, 16",
    "answer": "13",
    "explanation": "Each term increases by 3.\nAfter 10 comes 10 + 3 = 13.\nCheck: 13 + 3 = 16. ✓"
  },
  {
    "id": "al-ps-005",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which sequence shows multiplying by 2 to get the next term?",
    "choices": ["2, 4, 6, 8", "1, 3, 5, 7", "1, 2, 4, 8", "2, 5, 8, 11"],
    "answer_index": 2,
    "explanation": "In 1, 2, 4, 8 each term is 2× the previous: 1×2=2, 2×2=4, 4×2=8.\n2, 4, 6, 8 adds 2 each time. 1, 3, 5, 7 adds 2 each time. 2, 5, 8, 11 adds 3 each time. Only 1, 2, 4, 8 multiplies."
  },
  {
    "id": "al-ps-006",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the 8th term in the sequence 3, 7, 11, 15, ...?",
    "choices": ["27", "31", "35", "39"],
    "answer_index": 1,
    "explanation": "Each term adds 4 (an arithmetic sequence).\nThe nth term is 3 + 4(n − 1).\nFor n = 8: 3 + 4(7) = 3 + 28 = 31.\nOr list: 3, 7, 11, 15, 19, 23, 27, 31."
  },
  {
    "id": "al-ps-007",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the next term in the sequence 2, 6, 18, 54, ___?",
    "answer": "162",
    "explanation": "Each term is 3× the previous (a geometric sequence with ratio 3):\n2 × 3 = 6, 6 × 3 = 18, 18 × 3 = 54, 54 × 3 = 162."
  },
  {
    "id": "al-ps-008",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student looks at the sequence 1, 4, 9, 16, ... and says, \"It's growing by adding 3, then 5, then 7 — there's no single rule.\" What is the underlying single rule?",
    "choices": [
      "Each term is 3 more than the previous one.",
      "The nth term is n² (the square of its position).",
      "Each term is double the previous, minus 1.",
      "There is no rule; the pattern just grows."
    ],
    "answer_index": 1,
    "explanation": "These are the square numbers: 1² = 1, 2² = 4, 3² = 9, 4² = 16. The single rule is: nth term = n².\nThe student's observation about the differences (3, 5, 7) is also correct: (n+1)² − n² = 2n + 1, which produces consecutive odd numbers. So the \"add an odd number\" pattern and the \"square of the position\" rule describe the same sequence — they're connected, not in conflict."
  },
  {
    "id": "al-ps-009",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Find the missing term: 1, 2, 4, ___, 16, 32",
    "answer": "8",
    "explanation": "Each term is 2× the previous (geometric, ratio 2).\nAfter 4 comes 4 × 2 = 8.\nCheck: 8 × 2 = 16, 16 × 2 = 32. ✓"
  },

  /* ============================================================
     ALGEBRAIC THINKING — Expressions (9)
     ============================================================ */
  {
    "id": "al-ex-001",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which expression represents \"3 more than n\"?",
    "choices": ["n + 3", "3n", "n − 3", "3 − n"],
    "answer_index": 0,
    "explanation": "\"3 more than n\" means start with n and add 3, written n + 3.\n(Note: 3 − n means 3 reduced by n, which is different.)"
  },
  {
    "id": "al-ex-002",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Evaluate the expression 4 + 2y when y = 5.",
    "answer": "14",
    "explanation": "Substitute y = 5 and apply order of operations:\n4 + 2(5) = 4 + 10 = 14.\n(Multiply before adding.)"
  },
  {
    "id": "al-ex-003",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which expression matches \"twice a number, decreased by 5\"?",
    "choices": ["2n + 5", "2n − 5", "2(n − 5)", "n − 5/2"],
    "answer_index": 1,
    "explanation": "\"Twice a number\" is 2n. \"Decreased by 5\" means subtract 5: 2n − 5.\n(Note: 2(n − 5) would mean \"twice the quantity 'n decreased by 5'\", which equals 2n − 10 — different.)"
  },
  {
    "id": "al-ex-004",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Simplify 3x + 2x + 7.",
    "choices": ["5x + 7", "12x", "3x + 9", "5x² + 7"],
    "answer_index": 0,
    "explanation": "Combine like terms: 3x + 2x = 5x.\nThe constant 7 has no like term to combine with, so it stays.\nResult: 5x + 7."
  },
  {
    "id": "al-ex-005",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Use the distributive property to simplify 3(x + 4).",
    "choices": ["3x + 4", "x + 12", "3x + 12", "3x + 7"],
    "answer_index": 2,
    "explanation": "Distribute the 3 to each term inside the parentheses:\n3(x + 4) = 3 · x + 3 · 4 = 3x + 12."
  },
  {
    "id": "al-ex-006",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Evaluate 2a² when a = 3.",
    "answer": "18",
    "explanation": "Substitute a = 3, then apply order of operations (exponent before multiplication):\n2 · (3)² = 2 · 9 = 18.\n(Note: 2a² means 2 · (a²), not (2a)². If it were (2a)², the answer would be 36.)"
  },
  {
    "id": "al-ex-007",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student writes that 5x means \"5 plus x\" and evaluates 5x for x = 2 as 7. What is the misconception?",
    "choices": [
      "The student forgot that x stands for the number 5.",
      "In algebra, writing a number directly next to a variable means multiplication, not addition.",
      "The expression 5x always equals 5 regardless of x.",
      "Variables can only equal whole numbers."
    ],
    "answer_index": 1,
    "explanation": "In algebra, juxtaposition (writing a number next to a variable, like 5x) means multiplication: 5x = 5 · x.\nFor x = 2: 5x = 5 · 2 = 10.\nA helpful diagnostic is to ask the student what 5(2) means — most students recognize that as multiplication. Connect 5x to that same meaning."
  },
  {
    "id": "al-ex-008",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which expressions are equivalent to 2(x + 3)? Select all that apply.",
    "choices": ["2x + 6", "2x + 3", "x + x + 6", "2x + 5"],
    "answer_indices": [0, 2],
    "explanation": "By the distributive property, 2(x + 3) = 2 · x + 2 · 3 = 2x + 6.\nAlso, 2x = x + x, so 2x + 6 = x + x + 6.\n2x + 3 forgets to distribute the 2 to the 3. 2x + 5 doesn't match anything."
  },
  {
    "id": "al-ex-009",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "If a is the cost of one apple and b is the cost of one banana, which expression gives the total cost of 3 apples and 2 bananas?",
    "choices": ["a + b", "3a + 2b", "5ab", "3a · 2b"],
    "answer_index": 1,
    "explanation": "Three apples cost 3 · a = 3a. Two bananas cost 2 · b = 2b.\nTotal: 3a + 2b.\n(5ab would be the product of 5 times a times b — unrelated to a sum of separate costs.)"
  },

  /* ============================================================
     ALGEBRAIC THINKING — Equations & Inequalities (12)
     ============================================================ */
  {
    "id": "al-eq-001",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What number makes this true?\n5 + ___ = 9",
    "answer": "4",
    "explanation": "Think: \"5 plus what equals 9?\"\nThe missing number is 9 − 5 = 4."
  },
  {
    "id": "al-eq-002",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Solve for x: x + 7 = 13",
    "answer": "6",
    "explanation": "Subtract 7 from both sides: x + 7 − 7 = 13 − 7, so x = 6.\nCheck: 6 + 7 = 13. ✓"
  },
  {
    "id": "al-eq-003",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Solve for n: 4 × n = 28",
    "answer": "7",
    "explanation": "Divide both sides by 4: n = 28 ÷ 4 = 7.\nCheck: 4 × 7 = 28. ✓"
  },
  {
    "id": "al-eq-004",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "If 3x = 12, what is x?",
    "choices": ["3", "4", "9", "36"],
    "answer_index": 1,
    "explanation": "Divide both sides by 3: x = 12 ÷ 3 = 4.\nCheck: 3 × 4 = 12. ✓"
  },
  {
    "id": "al-eq-005",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which equation matches the sentence \"A number plus 8 equals 15\"?",
    "choices": ["8 − n = 15", "n + 8 = 15", "8n = 15", "n − 8 = 15"],
    "answer_index": 1,
    "explanation": "\"A number\" is n. \"Plus 8\" is + 8. \"Equals 15\" is = 15.\nPutting it together: n + 8 = 15. (Solving gives n = 7.)"
  },
  {
    "id": "al-eq-006",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Solve for x: 2x + 3 = 11",
    "answer": "4",
    "explanation": "Subtract 3 from both sides: 2x = 8.\nDivide both sides by 2: x = 4.\nCheck: 2(4) + 3 = 8 + 3 = 11. ✓"
  },
  {
    "id": "al-eq-007",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Solve for x: 5x − 2 = 18",
    "answer": "4",
    "explanation": "Add 2 to both sides: 5x = 20.\nDivide both sides by 5: x = 4.\nCheck: 5(4) − 2 = 20 − 2 = 18. ✓"
  },
  {
    "id": "al-eq-008",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which values of x make the inequality 3x > 12 true? Select all that apply.",
    "choices": ["3", "4", "5", "6"],
    "answer_indices": [2, 3],
    "explanation": "Divide both sides by 3 (positive, so inequality direction is preserved): x > 4.\nThe values must be strictly greater than 4 (4 itself does not count).\n3 < 4 ✗\n4 is not > 4 ✗\n5 > 4 ✓\n6 > 4 ✓"
  },
  {
    "id": "al-eq-009",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Solve for x: x/3 + 2 = 5",
    "answer": "9",
    "explanation": "Subtract 2 from both sides: x/3 = 3.\nMultiply both sides by 3: x = 9.\nCheck: 9/3 + 2 = 3 + 2 = 5. ✓"
  },
  {
    "id": "al-eq-010",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student solves 2x + 3 = 13 by first dividing both sides by 2, getting \"x + 3 = 6.5\". What is the student's error?",
    "choices": [
      "The student should have multiplied both sides instead of dividing.",
      "When dividing both sides by 2, every term — including the +3 — must be divided.",
      "The student's intermediate equation is correct; they just need to subtract 3 next.",
      "Equations cannot be solved by dividing first."
    ],
    "answer_index": 1,
    "explanation": "Dividing 2x + 3 by 2 gives (2x)/2 + 3/2 = x + 1.5, not x + 3.\nThe student kept the +3 unchanged when it should have become +1.5.\nThe cleaner approach is to subtract 3 first: 2x = 10, then divide by 2: x = 5.\n(Either order works as long as every term gets the same operation.)"
  },
  {
    "id": "al-eq-011",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which equations have x = 4 as the solution? Select all that apply.",
    "choices": ["x + 3 = 7", "2x = 8", "x − 1 = 3", "3x = 10"],
    "answer_indices": [0, 1, 2],
    "explanation": "Substitute x = 4 into each:\nx + 3 = 4 + 3 = 7 ✓\n2x = 2(4) = 8 ✓\nx − 1 = 4 − 1 = 3 ✓\n3x = 3(4) = 12, not 10 ✗"
  },
  {
    "id": "al-eq-012",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the largest whole number that makes 5x − 3 < 17 true?",
    "choices": ["3", "4", "5", "6"],
    "answer_index": 0,
    "explanation": "Add 3 to both sides: 5x < 20.\nDivide by 5: x < 4.\nSo x must be strictly less than 4. The largest whole number less than 4 is 3.\nCheck: 5(3) − 3 = 12, and 12 < 17 ✓. (At x = 4, 5(4) − 3 = 17, which is not less than 17.)"
  },

  /* ============================================================
     ALGEBRAIC THINKING — Functions (8)
     ============================================================ */
  {
    "id": "al-fn-001",
    "domain": "algebraic_thinking",
    "topic": "functions",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A function rule is \"multiply by 3, then add 2.\" What is the output when the input is 5?",
    "answer": "17",
    "explanation": "Apply the steps in order:\n5 × 3 = 15, then 15 + 2 = 17."
  },
  {
    "id": "al-fn-002",
    "domain": "algebraic_thinking",
    "topic": "functions",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "An input-output table shows:\nx:  1   2   3   4\ny:  4   7   10  13\n\nWhich rule matches?",
    "choices": ["y = x + 3", "y = 3x + 1", "y = 4x", "y = x × 4"],
    "answer_index": 1,
    "explanation": "y increases by 3 each time x increases by 1, so the multiplier (slope) is 3.\nTry y = 3x + 1: x=1 → 3+1=4 ✓; x=2 → 6+1=7 ✓; x=3 → 9+1=10 ✓; x=4 → 12+1=13 ✓.\nAll points fit, so y = 3x + 1."
  },
  {
    "id": "al-fn-003",
    "domain": "algebraic_thinking",
    "topic": "functions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "If f(x) = 2x + 5, what is f(3)?",
    "answer": "11",
    "explanation": "Substitute x = 3 into the rule:\nf(3) = 2(3) + 5 = 6 + 5 = 11."
  },
  {
    "id": "al-fn-004",
    "domain": "algebraic_thinking",
    "topic": "functions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which function has a y-intercept of 4?",
    "choices": ["y = 2x + 4", "y = 4x", "y = x − 4", "y = 4x + 2"],
    "answer_index": 0,
    "explanation": "In y = mx + b, the y-intercept is b — the value of y when x = 0.\ny = 2x + 4 has b = 4. (At x = 0: y = 2(0) + 4 = 4.)\ny = 4x has y-intercept 0. y = x − 4 has y-intercept −4. y = 4x + 2 has y-intercept 2."
  },
  {
    "id": "al-fn-005",
    "domain": "algebraic_thinking",
    "topic": "functions",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "If f(x) = x² − 1, what is f(4)?",
    "answer": "15",
    "explanation": "Substitute x = 4. Apply the exponent before subtracting:\nf(4) = 4² − 1 = 16 − 1 = 15."
  },
  {
    "id": "al-fn-006",
    "domain": "algebraic_thinking",
    "topic": "functions",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "An input-output table shows:\n2 → 5\n4 → 9\n6 → 13\n\nWhat is the output when the input is 8?",
    "answer": "17",
    "explanation": "Each output is 2 times the input plus 1:\n2(2)+1=5, 2(4)+1=9, 2(6)+1=13.\nSo for input 8: 2(8)+1 = 17."
  },
  {
    "id": "al-fn-007",
    "domain": "algebraic_thinking",
    "topic": "functions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student claims, \"A function can have two outputs for the same input.\" Is this correct?",
    "choices": [
      "Yes, because functions can be complicated.",
      "No — a function assigns exactly one output to each input.",
      "Yes, but only for negative inputs.",
      "Yes, but only for fractional inputs."
    ],
    "answer_index": 1,
    "explanation": "A function is defined as a rule that assigns exactly ONE output to each input.\nIf two outputs come from the same input, the rule is not a function.\nThe vertical line test makes this visual: if any vertical line crosses the graph of the relation in more than one place, it's not a function."
  },
  {
    "id": "al-fn-008",
    "domain": "algebraic_thinking",
    "topic": "functions",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "If f(x) = 4x − 7, for what value of x is f(x) = 13?",
    "answer": "5",
    "explanation": "Set up the equation: 4x − 7 = 13.\nAdd 7 to both sides: 4x = 20.\nDivide by 4: x = 5.\nCheck: 4(5) − 7 = 20 − 7 = 13. ✓"
  },

  /* ============================================================
     ALGEBRAIC THINKING — Properties of Operations (7)
     ============================================================ */
  {
    "id": "al-pp-001",
    "domain": "algebraic_thinking",
    "topic": "properties_of_operations",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which property is shown by the equation 4 + 3 = 3 + 4?",
    "choices": ["Commutative property", "Associative property", "Distributive property", "Identity property"],
    "answer_index": 0,
    "explanation": "The commutative property says you can change the order of two addends without changing the sum: a + b = b + a.\n(Memory aid: \"commute\" means \"travel\" — the numbers swap places.)"
  },
  {
    "id": "al-pp-002",
    "domain": "algebraic_thinking",
    "topic": "properties_of_operations",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Use the identity property of addition to find 5 + 0.",
    "answer": "5",
    "explanation": "Adding 0 (the additive identity) to any number does not change the number.\nSo 5 + 0 = 5."
  },
  {
    "id": "al-pp-003",
    "domain": "algebraic_thinking",
    "topic": "properties_of_operations",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which equation shows the associative property of addition?",
    "choices": [
      "2 + 3 = 3 + 2",
      "(2 + 3) + 4 = 2 + (3 + 4)",
      "2 × (3 + 4) = 2 × 3 + 2 × 4",
      "5 + 0 = 5"
    ],
    "answer_index": 1,
    "explanation": "The associative property says you can regroup the same operation differently without changing the result: (a + b) + c = a + (b + c).\nA shows the commutative property; C shows the distributive property; D shows the identity property."
  },
  {
    "id": "al-pp-004",
    "domain": "algebraic_thinking",
    "topic": "properties_of_operations",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Use the distributive property to compute 4 × (5 + 2).",
    "answer": "28",
    "explanation": "By the distributive property:\n4 × (5 + 2) = 4 × 5 + 4 × 2 = 20 + 8 = 28.\n(Or compute the parentheses first: 5 + 2 = 7, then 4 × 7 = 28. Same answer.)"
  },
  {
    "id": "al-pp-005",
    "domain": "algebraic_thinking",
    "topic": "properties_of_operations",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which expression is equivalent to 3(2x + 5) by the distributive property?",
    "choices": ["6x + 15", "6x + 5", "3x + 15", "3x + 5"],
    "answer_index": 0,
    "explanation": "Distribute the 3 to each term inside the parentheses:\n3 · 2x + 3 · 5 = 6x + 15."
  },
  {
    "id": "al-pp-006",
    "domain": "algebraic_thinking",
    "topic": "properties_of_operations",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student computes 2 × (3 + 5) by writing 2 × 3 + 5 = 11. What is the error?",
    "choices": [
      "The student should have added before multiplying — 11 happens to be correct.",
      "The student distributed the 2 only to the first term, not to both terms inside the parentheses.",
      "The student should have multiplied 3 × 5 first.",
      "There is no error; 11 is correct."
    ],
    "answer_index": 1,
    "explanation": "By the distributive property, a × (b + c) = a × b + a × c. **Both** terms inside the parentheses must be multiplied.\nCorrect: 2 × (3 + 5) = 2×3 + 2×5 = 6 + 10 = 16. (Or compute 3 + 5 = 8 first, then 2 × 8 = 16.)\nThe student's 11 comes from doing 2 × 3 = 6, then adding the 5 (untouched), giving 6 + 5 = 11."
  },
  {
    "id": "al-pp-007",
    "domain": "algebraic_thinking",
    "topic": "properties_of_operations",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which equations illustrate the commutative property? Select all that apply.",
    "choices": [
      "4 + 6 = 6 + 4",
      "7 × 2 = 2 × 7",
      "(3 + 5) + 2 = 3 + (5 + 2)",
      "8 + 0 = 8"
    ],
    "answer_indices": [0, 1],
    "explanation": "The commutative property says order doesn't matter for addition or multiplication: a + b = b + a, a × b = b × a.\nA: commutative addition ✓\nB: commutative multiplication ✓\nC: associative property (regrouping)\nD: identity property of addition (adding 0)"
  },

  /* ============================================================
     GEOMETRY, MEASUREMENT & DATA — Shapes (7)
     ============================================================ */
  {
    "id": "gm-sh-001",
    "domain": "geometry_measurement_data",
    "topic": "shapes",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which shape has 3 sides?",
    "choices": ["Square", "Triangle", "Circle", "Rectangle"],
    "answer_index": 1,
    "explanation": "A triangle has exactly 3 sides and 3 angles.\n(A square and rectangle have 4 sides; a circle has no straight sides at all.)"
  },
  {
    "id": "gm-sh-002",
    "domain": "geometry_measurement_data",
    "topic": "shapes",
    "grade_band": "K-2",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "How many sides does a hexagon have?",
    "choices": ["4", "5", "6", "8"],
    "answer_index": 2,
    "explanation": "A hexagon has 6 sides.\n(\"Hex-\" comes from the Greek for six. Pentagon = 5, octagon = 8.)"
  },
  {
    "id": "gm-sh-003",
    "domain": "geometry_measurement_data",
    "topic": "shapes",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which shape has 4 right angles AND all sides the same length?",
    "choices": ["Rectangle", "Square", "Rhombus", "Parallelogram"],
    "answer_index": 1,
    "explanation": "A square is the shape with 4 right angles AND 4 equal sides.\nA rectangle has 4 right angles but its sides may not all be equal.\nA rhombus has 4 equal sides but its angles may not be right angles.\nOnly the square satisfies both conditions."
  },
  {
    "id": "gm-sh-004",
    "domain": "geometry_measurement_data",
    "topic": "shapes",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A polygon has 5 sides. What is it called?",
    "choices": ["Quadrilateral", "Pentagon", "Hexagon", "Octagon"],
    "answer_index": 1,
    "explanation": "Polygon names are based on side count:\nQuadrilateral = 4, Pentagon = 5, Hexagon = 6, Octagon = 8."
  },
  {
    "id": "gm-sh-005",
    "domain": "geometry_measurement_data",
    "topic": "shapes",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which statement about a square is TRUE?",
    "choices": [
      "A square is a special kind of rectangle.",
      "A rectangle is a special kind of square.",
      "Squares and rectangles are completely separate shapes.",
      "Only squares have 4 right angles."
    ],
    "answer_index": 0,
    "explanation": "A rectangle is a quadrilateral with 4 right angles. A square has 4 right angles AND 4 equal sides — so a square satisfies the rectangle definition with the extra requirement.\nEvery square is a rectangle, but not every rectangle is a square."
  },
  {
    "id": "gm-sh-006",
    "domain": "geometry_measurement_data",
    "topic": "shapes",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student says, \"A rhombus is just a square turned on its side.\" What is wrong with this thinking?",
    "choices": [
      "A rhombus has only 3 sides.",
      "A rhombus and a square have different definitions: a square requires 4 right angles, but a rhombus only requires 4 equal sides. So every square is a rhombus, but most rhombuses are not squares.",
      "Rotating a shape changes what it is.",
      "Rhombuses do not exist."
    ],
    "answer_index": 1,
    "explanation": "A rhombus is a quadrilateral with all 4 sides equal — its angles can be any value (as long as opposite angles are equal). A square has 4 equal sides AND 4 right angles.\nSo a square is a special rhombus, but a rhombus with non-right angles is genuinely different from a square — not just rotated. The shape's definition (equal sides + right angles) is what matters, not its visual orientation."
  },
  {
    "id": "gm-sh-007",
    "domain": "geometry_measurement_data",
    "topic": "shapes",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which of these are quadrilaterals? Select all that apply.",
    "choices": ["Square", "Triangle", "Rhombus", "Pentagon"],
    "answer_indices": [0, 2],
    "explanation": "A quadrilateral has exactly 4 sides.\nSquare: 4 sides ✓\nTriangle: 3 sides ✗\nRhombus: 4 sides ✓\nPentagon: 5 sides ✗"
  },

  /* ============================================================
     GEOMETRY, MEASUREMENT & DATA — Area, Perimeter, Volume (10)
     ============================================================ */
  {
    "id": "gm-ar-001",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the perimeter of a rectangle that is 5 cm long and 3 cm wide, in cm?",
    "answer": "16",
    "explanation": "Perimeter is the distance around a shape: add up all sides.\nP = 5 + 3 + 5 + 3 = 16 cm.\n(Or use the formula P = 2(L + W) = 2(5 + 3) = 16.)"
  },
  {
    "id": "gm-ar-002",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the area of a rectangle that is 5 cm long and 3 cm wide, in square cm?",
    "answer": "15",
    "explanation": "Area of a rectangle = length × width.\nA = 5 × 3 = 15 square cm.\n(Area is measured in square units because it counts unit squares filling the shape.)"
  },
  {
    "id": "gm-ar-003",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A square has a perimeter of 24 inches. What is the length of one side, in inches?",
    "answer": "6",
    "explanation": "A square has 4 equal sides.\nSide = perimeter ÷ 4 = 24 ÷ 4 = 6 inches."
  },
  {
    "id": "gm-ar-004",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the area of a triangle with base 8 and height 5?",
    "answer": "20",
    "explanation": "Area of a triangle = (1/2) × base × height.\nA = (1/2) × 8 × 5 = (1/2) × 40 = 20 square units."
  },
  {
    "id": "gm-ar-005",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the area of a circle with radius 3? Use π in your answer.",
    "choices": ["6π", "9π", "12π", "9π²"],
    "answer_index": 1,
    "explanation": "Area of a circle = π × r².\nA = π × (3)² = π × 9 = 9π.\n(Numerically, using π ≈ 3.14: 9 × 3.14 ≈ 28.26.)"
  },
  {
    "id": "gm-ar-006",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "What is the volume of a rectangular box that is 4 cm long, 3 cm wide, and 2 cm tall, in cubic cm?",
    "answer": "24",
    "explanation": "Volume of a rectangular box = length × width × height.\nV = 4 × 3 × 2 = 24 cubic cm.\n(Volume is measured in cubic units because it counts unit cubes filling the space.)"
  },
  {
    "id": "gm-ar-007",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student is asked for the perimeter of a 6 cm by 4 cm rectangle and answers 24 cm. What is the error?",
    "choices": [
      "The student computed the area, not the perimeter. Area = 6 × 4 = 24 cm². Perimeter = 2(6) + 2(4) = 20 cm.",
      "The student forgot one side; the actual perimeter is 30 cm.",
      "The answer 24 cm is correct.",
      "The student should have multiplied 6 × 4 × 2."
    ],
    "answer_index": 0,
    "explanation": "Perimeter is the distance around a shape (linear measurement, units like cm).\nArea is the space inside (square measurement, units like cm²).\nThe student's 24 = 6 × 4 is the AREA in square cm. The perimeter is the sum of all four sides: 6 + 4 + 6 + 4 = 20 cm.\nThis is a very common confusion; pairing units with formulas (cm for perimeter, cm² for area) helps."
  },
  {
    "id": "gm-ar-008",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "A garden is 12 feet by 15 feet. If fencing costs $8 per foot, how much does it cost to fence the entire garden, in dollars?",
    "answer": "432",
    "explanation": "First find the perimeter: 2(12 + 15) = 2(27) = 54 feet.\nThen multiply by the cost per foot: 54 × $8 = $432."
  },
  {
    "id": "gm-ar-009",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A rectangle has length 10 cm and area 30 square cm. What is its width?",
    "choices": ["2 cm", "3 cm", "5 cm", "20 cm"],
    "answer_index": 1,
    "explanation": "Area = length × width, so width = area ÷ length.\nW = 30 ÷ 10 = 3 cm.\nCheck: 10 × 3 = 30 square cm. ✓"
  },
  {
    "id": "gm-ar-010",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the perimeter of a square with side 7 cm, in cm?",
    "answer": "28",
    "explanation": "A square has 4 equal sides.\nP = 4 × side = 4 × 7 = 28 cm."
  },

  /* ============================================================
     GEOMETRY, MEASUREMENT & DATA — Transformations (5)
     ============================================================ */
  {
    "id": "gm-tr-001",
    "domain": "geometry_measurement_data",
    "topic": "transformations",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which transformation slides a shape without rotating or flipping it?",
    "choices": ["Reflection", "Rotation", "Translation", "Dilation"],
    "answer_index": 2,
    "explanation": "A translation slides every point of a shape the same distance in the same direction.\nReflection flips across a line. Rotation turns around a point. Dilation resizes."
  },
  {
    "id": "gm-tr-002",
    "domain": "geometry_measurement_data",
    "topic": "transformations",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "If a shape is reflected over a vertical line, what happens?",
    "choices": [
      "The shape is rotated 90°.",
      "The shape is flipped horizontally, like in a mirror.",
      "The shape is moved up.",
      "The shape is enlarged."
    ],
    "answer_index": 1,
    "explanation": "Reflection over a vertical line flips the shape side-to-side, like a mirror image.\nEach point of the original and its reflection are the same perpendicular distance from the line of reflection."
  },
  {
    "id": "gm-tr-003",
    "domain": "geometry_measurement_data",
    "topic": "transformations",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A point P is at (3, 4). It is translated 2 units right and 1 unit down. What are the new coordinates?",
    "choices": ["(5, 5)", "(5, 3)", "(1, 5)", "(1, 3)"],
    "answer_index": 1,
    "explanation": "Right means add to x: 3 + 2 = 5.\nDown means subtract from y: 4 − 1 = 3.\nNew point: (5, 3)."
  },
  {
    "id": "gm-tr-004",
    "domain": "geometry_measurement_data",
    "topic": "transformations",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which of these are rigid transformations (preserve size and shape)? Select all that apply.",
    "choices": ["Translation", "Reflection", "Rotation", "Dilation by a scale factor of 2"],
    "answer_indices": [0, 1, 2],
    "explanation": "Rigid transformations preserve both size AND shape — the image is congruent to the original.\nTranslation, reflection, and rotation are all rigid.\nDilation generally changes size (unless the scale factor is 1), so it is NOT rigid. A dilation by 2 doubles the size."
  },
  {
    "id": "gm-tr-005",
    "domain": "geometry_measurement_data",
    "topic": "transformations",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student says, \"When you reflect a shape, both its size and its shape can change.\" What is the correct statement?",
    "choices": [
      "Reflections preserve both size and shape — only the orientation changes.",
      "Reflections preserve only size, not shape.",
      "Reflections change everything about a shape.",
      "The student is correct."
    ],
    "answer_index": 0,
    "explanation": "Reflection is a rigid transformation: the reflected image is congruent to the original (same size, same shape).\nWhat changes is the orientation — a reflected shape is the mirror image. Compare to a dilation, which DOES change size."
  },

  /* ============================================================
     GEOMETRY, MEASUREMENT & DATA — Coordinate Plane (5)
     ============================================================ */
  {
    "id": "gm-cp-001",
    "domain": "geometry_measurement_data",
    "topic": "coordinate_plane",
    "grade_band": "5-6",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What are the coordinates of the origin?",
    "choices": ["(0, 0)", "(1, 1)", "(0, 1)", "(1, 0)"],
    "answer_index": 0,
    "explanation": "The origin is the point where the x-axis and y-axis cross. Both coordinates are 0 there: (0, 0)."
  },
  {
    "id": "gm-cp-002",
    "domain": "geometry_measurement_data",
    "topic": "coordinate_plane",
    "grade_band": "5-6",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which point is in Quadrant II (upper-left of the coordinate plane)?",
    "choices": ["(3, 2)", "(−3, 2)", "(−3, −2)", "(3, −2)"],
    "answer_index": 1,
    "explanation": "Quadrant II has negative x and positive y.\n(−3, 2) has x = −3 (negative) and y = 2 (positive), so it is in Quadrant II.\n(3, 2): Q I (+, +). (−3, −2): Q III (−, −). (3, −2): Q IV (+, −)."
  },
  {
    "id": "gm-cp-003",
    "domain": "geometry_measurement_data",
    "topic": "coordinate_plane",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the distance between (2, 3) and (2, 8)?",
    "answer": "5",
    "explanation": "When two points share an x-coordinate, the segment between them is vertical, and its length is the difference of the y-coordinates:\n|8 − 3| = 5 units."
  },
  {
    "id": "gm-cp-004",
    "domain": "geometry_measurement_data",
    "topic": "coordinate_plane",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A point has a negative x-coordinate and a positive y-coordinate. In which quadrant does it lie?",
    "choices": ["Quadrant I (upper-right)", "Quadrant II (upper-left)", "Quadrant III (lower-left)", "Quadrant IV (lower-right)"],
    "answer_index": 1,
    "explanation": "Quadrants are numbered counter-clockwise starting from upper-right:\nI: (+, +); II: (−, +); III: (−, −); IV: (+, −).\nNegative x and positive y is Quadrant II."
  },
  {
    "id": "gm-cp-005",
    "domain": "geometry_measurement_data",
    "topic": "coordinate_plane",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student plots (5, 2) by going up 5 first, then over 2. What is the misconception?",
    "choices": [
      "An ordered pair (x, y) means horizontal first (right/left along the x-axis), then vertical (up/down along the y-axis). The student plotted (2, 5).",
      "The student's plot is correct.",
      "Coordinates can be plotted in any order.",
      "The point lies below the x-axis."
    ],
    "answer_index": 0,
    "explanation": "An ordered pair (x, y) is read as (horizontal, vertical) — x first (right/left), then y (up/down).\nFor (5, 2): go RIGHT 5 along the x-axis, then UP 2 along the y-axis.\nThe student went UP 5 then RIGHT 2, which actually plots (2, 5).\nMnemonic: \"x comes before y in the alphabet; horizontal before vertical.\""
  },

  /* ============================================================
     GEOMETRY, MEASUREMENT & DATA — Unit Conversion (6)
     ============================================================ */
  {
    "id": "gm-uc-001",
    "domain": "geometry_measurement_data",
    "topic": "unit_conversion",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "How many inches are in 2 feet? (1 foot = 12 inches.)",
    "answer": "24",
    "explanation": "1 foot = 12 inches.\n2 feet = 2 × 12 = 24 inches."
  },
  {
    "id": "gm-uc-002",
    "domain": "geometry_measurement_data",
    "topic": "unit_conversion",
    "grade_band": "3-4",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "How many minutes are in 3 hours?",
    "answer": "180",
    "explanation": "1 hour = 60 minutes.\n3 hours = 3 × 60 = 180 minutes."
  },
  {
    "id": "gm-uc-003",
    "domain": "geometry_measurement_data",
    "topic": "unit_conversion",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "How many centimeters are in 4 meters?",
    "answer": "400",
    "explanation": "1 meter = 100 centimeters.\n4 meters = 4 × 100 = 400 cm."
  },
  {
    "id": "gm-uc-004",
    "domain": "geometry_measurement_data",
    "topic": "unit_conversion",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which pairs of measurements are equal? Select all that apply.",
    "choices": [
      "1 kilometer = 1,000 meters",
      "1 hour = 60 minutes",
      "1 foot = 10 inches",
      "1 quart = 4 cups"
    ],
    "answer_indices": [0, 1, 3],
    "explanation": "1 kilometer = 1,000 meters ✓ (kilo- means thousand)\n1 hour = 60 minutes ✓\n1 foot = 12 inches (NOT 10) ✗\n1 quart = 4 cups ✓"
  },
  {
    "id": "gm-uc-005",
    "domain": "geometry_measurement_data",
    "topic": "unit_conversion",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "A recipe calls for 2 quarts of milk. How many cups is that? (1 quart = 4 cups.)",
    "answer": "8",
    "explanation": "1 quart = 4 cups.\n2 quarts = 2 × 4 = 8 cups."
  },
  {
    "id": "gm-uc-006",
    "domain": "geometry_measurement_data",
    "topic": "unit_conversion",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student converts 5 feet to inches and gets 5/12 inches because \"inches are smaller than feet, so I divided.\" What is the misconception?",
    "choices": [
      "When converting from a larger unit to a smaller unit, you multiply (not divide). 5 ft × 12 in/ft = 60 inches.",
      "The student is correct; converting always involves division.",
      "The conversion rate should be 1 foot = 10 inches.",
      "5/12 inches is the same as 60 inches."
    ],
    "answer_index": 0,
    "explanation": "When converting from a LARGER unit to a SMALLER unit, the number gets larger (more of the small units fit into the same length), so you MULTIPLY by the conversion rate.\n5 ft × (12 in / 1 ft) = 60 in. Notice the unit \"ft\" cancels, leaving inches.\nThe student confused \"smaller unit\" with \"smaller number.\""
  },

  /* ============================================================
     GEOMETRY, MEASUREMENT & DATA — Data Displays (6)
     ============================================================ */
  {
    "id": "gm-dd-001",
    "domain": "geometry_measurement_data",
    "topic": "data_displays",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "figure": {
      "type": "barChart",
      "yMax": 10,
      "yLabel": "Books Read",
      "xLabel": "Student",
      "data": [
        {"label": "Ana", "value": 5},
        {"label": "Ben", "value": 8},
        {"label": "Carla", "value": 3},
        {"label": "David", "value": 6}
      ]
    },
    "stem": "The bar graph above shows the number of books read by four students. Who read the most books?",
    "choices": ["Ana", "Ben", "Carla", "David"],
    "answer_index": 1,
    "explanation": "Compare the counts: Ana 5, Ben 8, Carla 3, David 6.\nThe largest is 8, which is Ben."
  },
  {
    "id": "gm-dd-002",
    "domain": "geometry_measurement_data",
    "topic": "data_displays",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "figure": {
      "type": "barChart",
      "yMax": 4,
      "yTicks": 4,
      "yLabel": "Inches of Rain",
      "xLabel": "Day",
      "data": [
        {"label": "Mon", "value": 1},
        {"label": "Tue", "value": 3},
        {"label": "Wed", "value": 2},
        {"label": "Thu", "value": 0}
      ]
    },
    "stem": "The bar graph above shows daily rainfall over four days. What was the total rainfall, in inches?",
    "answer": "6",
    "explanation": "Add the values: 1 + 3 + 2 + 0 = 6 inches."
  },
  {
    "id": "gm-dd-003",
    "domain": "geometry_measurement_data",
    "topic": "data_displays",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which graph type is BEST for showing how a single quantity changes over time?",
    "choices": ["Bar graph", "Line graph", "Pie chart", "Pictograph"],
    "answer_index": 1,
    "explanation": "Line graphs are designed to show change over a continuous variable, especially time. Each point is connected to the next, making trends easy to see.\nBar graphs compare categories. Pie charts show parts of a whole at a single moment."
  },
  {
    "id": "gm-dd-004",
    "domain": "geometry_measurement_data",
    "topic": "data_displays",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A pie chart shows that 25% of 80 students chose math as their favorite subject. How many students chose math?",
    "choices": ["10", "20", "25", "40"],
    "answer_index": 1,
    "explanation": "25% of 80 = 0.25 × 80 = 20.\n(Or: 25% = 1/4, and 80 ÷ 4 = 20.)"
  },
  {
    "id": "gm-dd-005",
    "domain": "geometry_measurement_data",
    "topic": "data_displays",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which type of graph is BEST for comparing the number of pets owned by students in different grades?",
    "choices": ["Line graph", "Bar graph", "Pie chart", "Coordinate grid"],
    "answer_index": 1,
    "explanation": "Bar graphs are designed for comparing values across discrete categories — here, different grade levels.\nLine graphs are for continuous change (e.g., over time). Pie charts show parts of a whole. A coordinate grid plots ordered pairs, not category counts."
  },
  {
    "id": "gm-dd-006",
    "domain": "geometry_measurement_data",
    "topic": "data_displays",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student looks at a bar graph of weekly rainfall over 4 weeks and concludes \"every week had the same amount of rain\" because the bars all look about the same height. What is the issue?",
    "choices": [
      "Bars of similar height suggest similar values, but to claim \"the same\" the student should check the exact numbers from the y-axis or data table.",
      "Bar graphs cannot be used for rainfall data.",
      "The student should multiply the bar heights together.",
      "The student's reasoning is correct."
    ],
    "answer_index": 0,
    "explanation": "Visual eyeballing is fine for rough comparisons, but \"same\" is a precise claim that requires the actual values. A small difference in bar height can represent a meaningful difference in the underlying number — read the axis or data table when precision matters."
  },

  /* ============================================================
     GEOMETRY, MEASUREMENT & DATA — Mean, Median, Mode, Range (6)
     ============================================================ */
  {
    "id": "gm-ct-001",
    "domain": "geometry_measurement_data",
    "topic": "central_tendency",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Find the mean of these test scores: 80, 85, 90, 95, 100",
    "answer": "90",
    "explanation": "Mean (average) = sum of values ÷ count.\nSum = 80 + 85 + 90 + 95 + 100 = 450. Count = 5.\nMean = 450 ÷ 5 = 90."
  },
  {
    "id": "gm-ct-002",
    "domain": "geometry_measurement_data",
    "topic": "central_tendency",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Find the median of: 3, 7, 2, 8, 5",
    "answer": "5",
    "explanation": "First sort: 2, 3, 5, 7, 8.\nThe median is the middle value of the sorted list. With 5 values, the middle is the 3rd: 5."
  },
  {
    "id": "gm-ct-003",
    "domain": "geometry_measurement_data",
    "topic": "central_tendency",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the mode of: 4, 6, 4, 8, 4, 6, 9?",
    "answer": "4",
    "explanation": "The mode is the value that appears most often.\n4 appears 3 times; 6 appears 2 times; 8 and 9 each appear once.\nMode = 4."
  },
  {
    "id": "gm-ct-004",
    "domain": "geometry_measurement_data",
    "topic": "central_tendency",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What is the range of these scores: 65, 78, 82, 91, 88?",
    "answer": "26",
    "explanation": "Range = greatest value − least value.\nGreatest = 91. Least = 65.\nRange = 91 − 65 = 26."
  },
  {
    "id": "gm-ct-005",
    "domain": "geometry_measurement_data",
    "topic": "central_tendency",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "numeric_entry",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "Five students earned scores of 70, 75, 80, 85, and 90 on a test. A sixth student then takes the test, and the new average of all 6 scores is 82. What was the sixth student's score?",
    "answer": "92",
    "explanation": "Sum of the original 5 scores: 70 + 75 + 80 + 85 + 90 = 400.\nNew average = 82 with 6 students, so new total = 82 × 6 = 492.\nSixth score = 492 − 400 = 92."
  },
  {
    "id": "gm-ct-006",
    "domain": "geometry_measurement_data",
    "topic": "central_tendency",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student is asked for the median of {8, 3, 1, 7, 5} and answers 1, because \"1 is the middle value in the list as written.\" What is the misconception?",
    "choices": [
      "The student should multiply the values together first.",
      "The median is the middle value of the SORTED list, not the middle position of the list as written.",
      "The median is 8, not 1.",
      "Medians cannot be computed for sets with 5 values."
    ],
    "answer_index": 1,
    "explanation": "To find the median, first sort the values from smallest to largest: 1, 3, 5, 7, 8.\nWith 5 values, the median is the 3rd (middle) one: 5.\nThe student took the 3rd element of the unsorted list (which happened to be 1) — that's not the median. Always sort first."
  },

  /* ============================================================
     GEOMETRY, MEASUREMENT & DATA — Probability (5)
     ============================================================ */
  {
    "id": "gm-pr-001",
    "domain": "geometry_measurement_data",
    "topic": "probability",
    "grade_band": "3-4",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A bag has 3 red marbles and 2 blue marbles. If you reach in without looking and pick one marble, what is the probability of picking a red one?",
    "choices": ["3/5", "2/5", "3/2", "2/3"],
    "answer_index": 0,
    "explanation": "Probability = favorable outcomes ÷ total outcomes.\nFavorable (red marbles) = 3. Total marbles = 3 + 2 = 5.\nP(red) = 3/5."
  },
  {
    "id": "gm-pr-002",
    "domain": "geometry_measurement_data",
    "topic": "probability",
    "grade_band": "5-6",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "If you flip a fair coin once, what is the probability of getting heads?",
    "choices": ["0", "1/4", "1/2", "1"],
    "answer_index": 2,
    "explanation": "A fair coin has 2 equally likely outcomes (heads, tails).\nP(heads) = 1 favorable / 2 total = 1/2."
  },
  {
    "id": "gm-pr-003",
    "domain": "geometry_measurement_data",
    "topic": "probability",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A spinner has 8 equal sections numbered 1 through 8. What is the probability of spinning an even number? Express as a decimal.",
    "answer": "0.5",
    "explanation": "Even numbers from 1 to 8: 2, 4, 6, 8 — that's 4 favorable.\nTotal sections = 8.\nP(even) = 4/8 = 1/2 = 0.5."
  },
  {
    "id": "gm-pr-004",
    "domain": "geometry_measurement_data",
    "topic": "probability",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "select_all",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which of these events have probability 1/6 when rolling a fair 6-sided die? Select all that apply.",
    "choices": ["Rolling a 3", "Rolling an even number", "Rolling a 1", "Rolling a number greater than 4"],
    "answer_indices": [0, 2],
    "explanation": "On a fair 6-sided die, each individual face has probability 1/6.\nRolling a 3: 1/6 ✓\nRolling an even number (2, 4, or 6): 3/6 = 1/2 ✗\nRolling a 1: 1/6 ✓\nRolling > 4 (5 or 6): 2/6 = 1/3 ✗"
  },
  {
    "id": "gm-pr-005",
    "domain": "geometry_measurement_data",
    "topic": "probability",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "A student says, \"I just flipped 5 heads in a row, so the next flip is more likely to be tails.\" What is the misconception?",
    "choices": [
      "Each coin flip is independent — the next flip is still 1/2 heads, 1/2 tails. This belief is the \"gambler's fallacy.\"",
      "The student is correct; flipping changes the coin's properties.",
      "The next flip is even more likely to be heads.",
      "Probability cannot be computed for coins."
    ],
    "answer_index": 0,
    "explanation": "Coin flips are independent events: each flip has its own 1/2 probability of heads regardless of past outcomes.\nBelieving that past results affect future independent trials is the \"gambler's fallacy.\"\n(Past outcomes DO matter for dependent events, like drawing cards without replacement — but a coin's behavior doesn't change between flips.)"
  },

  /* ============================================================
     BATCH 4 — Coverage gaps from real Praxis 5003 examples (22)
     Targets: charts/graphs, picture-based, algebra at Praxis level,
     and several questions matching ones Alexa got wrong.
     ============================================================ */

  /* --- Numbers & Operations --- */
  {
    "id": "no-pv-009",
    "domain": "numbers_operations",
    "topic": "place_value",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "What number is represented by the base-10 expression below?\n\n(0 × 10⁴) + (4 × 10³) + (0 × 10²) + (5 × 10¹) + (2 × 10⁰)",
    "choices": ["452", "4,052", "4,520", "40,052"],
    "answer_index": 1,
    "explanation": "Compute each term:\n0 × 10⁴ = 0 × 10,000 = 0\n4 × 10³ = 4 × 1,000 = 4,000\n0 × 10² = 0 × 100 = 0\n5 × 10¹ = 5 × 10 = 50\n2 × 10⁰ = 2 × 1 = 2\nSum: 0 + 4,000 + 0 + 50 + 2 = 4,052."
  },
  {
    "id": "no-pv-010",
    "domain": "numbers_operations",
    "topic": "place_value",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "0.7 is 1/1,000 of what number?",
    "choices": ["0.0007", "0.007", "70", "700"],
    "answer_index": 3,
    "explanation": "Let x be the unknown number. The relationship 0.7 = (1/1,000) × x means x is one thousand times 0.7.\nSolve: x = 0.7 × 1,000 = 700.\nCommon error: dividing 0.7 ÷ 1,000 = 0.0007 instead of multiplying. Read carefully — 0.7 is the SMALL piece (1/1,000th), so the unknown is the LARGE number."
  },
  {
    "id": "no-fr-011",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Two friends shared a dessert. One ate 1/2 of the dessert, and the other ate 1/3 of the **remaining** part. What fraction of the dessert was left over?",
    "choices": ["1/6", "1/3", "1/2", "5/6"],
    "answer_index": 1,
    "explanation": "After the first friend: 1 − 1/2 = 1/2 of the dessert remains.\nThe second friend ate 1/3 of that remaining 1/2: (1/3) × (1/2) = 1/6 of the whole dessert.\nLeft over: 1/2 − 1/6 = 3/6 − 1/6 = 2/6 = 1/3.\nKey: \"1/3 of the remaining\" means 1/3 of 1/2 (= 1/6), NOT 1/3 of the whole dessert."
  },
  {
    "id": "no-fr-012",
    "domain": "numbers_operations",
    "topic": "fractions",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A painter used 1 1/2 cans of paint to paint 2/3 of a room. At this rate, how many more cans of paint does the painter need to paint the remainder of the room?",
    "choices": ["1/2", "3/4", "1", "9/4"],
    "answer_index": 1,
    "explanation": "Find the rate first: 1 1/2 cans = 3/2 cans for 2/3 of the room.\nRate = (3/2) ÷ (2/3) = (3/2) × (3/2) = 9/4 cans per whole room.\nRemainder of the room = 1 − 2/3 = 1/3.\nPaint needed for the remainder: (1/3) × (9/4) = 9/12 = 3/4 can.\n(Quick check: 1/3 is half of 2/3, so the painter needs half of 1 1/2 = 3/4 can.)"
  },
  {
    "id": "no-rp-007",
    "domain": "numbers_operations",
    "topic": "ratios_proportions",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "At an apple orchard, between 280 and 300 bushels of apples are picked each day during peak harvest season. Each bushel contains between 42 and 48 pounds of apples. Which value could be the total number of pounds of apples picked at the orchard in one day during peak harvest season?",
    "choices": ["10,000", "12,500", "15,000", "16,800"],
    "answer_index": 1,
    "explanation": "The total must lie between (minimum bushels × minimum pounds) and (maximum bushels × maximum pounds).\nMinimum total: 280 × 42 = 11,760 pounds.\nMaximum total: 300 × 48 = 14,400 pounds.\nValid range: 11,760 to 14,400.\n10,000 is below the minimum ✗\n12,500 is in range ✓\n15,000 is above the maximum ✗\n16,800 is far above the maximum ✗"
  },

  /* --- Algebraic Thinking --- */
  {
    "id": "al-ex-010",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which expression is equivalent to −4(3 − 2x)?",
    "choices": ["−12 − 8x", "−12 + 8x", "12 − 8x", "−12 + 2x"],
    "answer_index": 1,
    "explanation": "Distribute the −4 to each term inside the parentheses:\n−4 × 3 = −12\n−4 × (−2x) = +8x  (negative times negative is positive)\nResult: −12 + 8x.\nCommon error: forgetting that −4 × (−2x) is positive, leaving −8x by mistake."
  },
  {
    "id": "al-ex-011",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which expression is equivalent to (2x + 5x − 2) − (x + y − 3y − 5x + 2)?",
    "choices": [
      "3x + 4y − 4",
      "11x − 2y",
      "11x + 2y − 4",
      "−2x + 4y"
    ],
    "answer_index": 2,
    "explanation": "First simplify each parenthesis:\n2x + 5x − 2 = 7x − 2\nx + y − 3y − 5x + 2 = (x − 5x) + (y − 3y) + 2 = −4x − 2y + 2\nNow subtract — distribute the minus to EVERY term in the second:\n(7x − 2) − (−4x − 2y + 2)\n= 7x − 2 + 4x + 2y − 2\n= 11x + 2y − 4."
  },
  {
    "id": "al-ex-012",
    "domain": "algebraic_thinking",
    "topic": "expressions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "In the expression 4x(3x + 2y), what does **2y** represent?",
    "choices": [
      "A binomial",
      "A factor of the whole expression",
      "A coefficient",
      "A monomial"
    ],
    "answer_index": 3,
    "explanation": "Vocabulary check:\n• The whole expression has TWO factors: 4x and (3x + 2y).\n• The expression (3x + 2y) is a **binomial** (two terms).\n• Within that binomial, 3x and 2y are TERMS. Each term is a **monomial** — a single product of a constant and one or more variables.\n• 2y itself is a monomial.\n• The number 2 (without the y) is the **coefficient** of y. So 2 alone would be the coefficient — but the question asks about the whole 2y.\n• 2y is NOT a factor of the whole expression, because it is added inside parentheses, not multiplied at the top level.\nSo 2y is best described as a **monomial**."
  },
  {
    "id": "al-eq-013",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Which inequality is equivalent to 4x + 4 ≤ 9x + 8?",
    "choices": [
      "x ≤ −4/5",
      "x ≥ −4/5",
      "x ≤ 12/5",
      "x ≥ 12/13"
    ],
    "answer_index": 1,
    "explanation": "Get all x-terms on one side and constants on the other:\n4x + 4 ≤ 9x + 8\nSubtract 4x from both sides: 4 ≤ 5x + 8.\nSubtract 8 from both sides: −4 ≤ 5x.\nDivide both sides by 5 (positive, so direction is preserved): −4/5 ≤ x, equivalently x ≥ −4/5."
  },
  {
    "id": "al-eq-014",
    "domain": "algebraic_thinking",
    "topic": "equations_inequalities",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": true,
    "pedagogical": true,
    "stem": "Gym G's membership cost (y, in dollars) for x months follows the data:\n  x = 12 → y = 350\n  x = 24 → y = 650\n\nGym H's cost is given by the equation 2y − 50x = 85.\n\nWhich statement is true comparing Gym H to Gym G?",
    "choices": [
      "Gym G is more expensive than Gym H by a fixed amount, regardless of the number of months.",
      "Gym H has a higher initial fee than Gym G but a lower monthly fee.",
      "Gym H is more expensive for short memberships but cheaper for long memberships.",
      "Both gyms charge the same total cost for any number of months."
    ],
    "answer_index": 0,
    "explanation": "Find each gym's linear equation y = mx + b.\nGym G: slope = (650 − 350) / (24 − 12) = 300/12 = 25 dollars/month. Intercept: 350 − 25(12) = 50. So y = 25x + 50.\nGym H: 2y − 50x = 85 → 2y = 50x + 85 → y = 25x + 42.50.\nCompare:\n• Same monthly fee (slope = 25 for both).\n• Gym G's initial fee ($50) is HIGHER than Gym H's ($42.50).\n• Difference: Gym G − Gym H = $7.50, **for every value of x**.\nSo Gym G always costs $7.50 more than Gym H. Equal slopes mean the lines are parallel — there is no crossover, no \"cheaper for short / more for long.\""
  },
  {
    "id": "al-fn-009",
    "domain": "algebraic_thinking",
    "topic": "functions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "An input-output table shows:\n  x:  1   2   3   4\n  y:  1   4   9   16\n\nWhich rule matches the table?",
    "choices": ["y = x + 3", "y = 4x", "y = x²", "y = 2x − 1"],
    "answer_index": 2,
    "explanation": "Test each rule against the table.\ny = x²: 1²=1 ✓, 2²=4 ✓, 3²=9 ✓, 4²=16 ✓. All four points fit.\nNote that the y-values grow by 3, then 5, then 7 — increasingly larger gaps. That non-constant growth rules out any LINEAR rule (constant slope), which is why y = x + 3, y = 4x, and y = 2x − 1 all fail."
  },
  {
    "id": "al-fn-010",
    "domain": "algebraic_thinking",
    "topic": "functions",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "numeric_entry",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "The formula V = IR relates the voltage V (in volts), the current I (in amperes), and the resistance R (in ohms) in a circuit. What is the current, in amperes, produced by a 9-volt battery in a circuit with 4 ohms of resistance?",
    "answer": "2.25",
    "explanation": "Solve V = IR for I by dividing both sides by R:\nI = V / R = 9 / 4 = 2.25 amperes.\n(Equivalent fraction: 9/4. Some test interfaces accept either form.)"
  },
  {
    "id": "al-ps-010",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "The first six terms of a sequence are:\n1, 1, 2, 3, 5, 8, ...\n\nWhich formula generates the terms of this sequence?",
    "choices": [
      "aₙ = aₙ₋₁ + 1",
      "aₙ = aₙ₋₁ × 2",
      "aₙ = aₙ₋₁ + aₙ₋₂  (with a₁ = a₂ = 1)",
      "aₙ = n²"
    ],
    "answer_index": 2,
    "explanation": "Test the pattern: each term equals the sum of the two before it.\n1 + 1 = 2 ✓\n1 + 2 = 3 ✓\n2 + 3 = 5 ✓\n3 + 5 = 8 ✓\nThis is the famous Fibonacci sequence. Its formula is recursive: each term depends on the two previous terms, with starting values a₁ = 1 and a₂ = 1."
  },
  {
    "id": "al-ps-011",
    "domain": "algebraic_thinking",
    "topic": "patterns_sequences",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "figure": {
      "type": "visualPattern",
      "figures": [
        {"squares": 1, "label": "Figure 1"},
        {"squares": 2, "label": "Figure 2"},
        {"squares": 3, "label": "Figure 3"}
      ]
    },
    "stem": "The first three figures of a pattern are shown above. Each figure has the same two end triangles plus one more square than the figure before it. How many line segments are in Figure 10?",
    "choices": ["32", "35", "38", "41"],
    "answer_index": 1,
    "explanation": "Count systematically.\nN squares in a row share interior sides, so they contribute 3N + 1 line segments (the first square: 4 sides; each additional square: 3 new sides — top, bottom, right — sharing its left side with the previous square's right side).\nThe two triangles attach to the leftmost square's left side and the rightmost square's right side. Those shared sides are already counted with the squares. Each triangle adds 2 new (outer) segments. Total triangle contribution: 2 × 2 = 4.\nFormula: 3N + 1 + 4 = 3N + 5.\nFigure 10: 3(10) + 5 = 35.\n(Sanity check: Figure 1 = 8, Figure 2 = 11, Figure 3 = 14 — matches \"+3 per new figure.\")"
  },

  /* --- Geometry / Measurement / Data --- */
  {
    "id": "gm-sh-008",
    "domain": "geometry_measurement_data",
    "topic": "shapes",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "figure": {
      "type": "net",
      "width": 240, "height": 240,
      "shapes": [
        {"points": [[80,80],[160,80],[160,160],[80,160]]},
        {"points": [[80,80],[160,80],[120,18]]},
        {"points": [[80,160],[160,160],[120,222]]},
        {"points": [[80,80],[80,160],[18,120]]},
        {"points": [[160,80],[160,160],[222,120]]}
      ]
    },
    "stem": "The figure above is a net (an unfolded shape). When the net is folded along the edges of the central square, which 3D figure does it form?",
    "choices": ["Cube", "Triangular prism", "Square pyramid", "Triangular pyramid"],
    "answer_index": 2,
    "explanation": "Identify the faces:\n• 1 square + 4 triangles meeting at a single apex = a SQUARE PYRAMID (the square is the base).\nNot the others:\n• A cube has 6 squares (no triangles).\n• A triangular prism has 2 triangles + 3 rectangles.\n• A triangular pyramid (tetrahedron) has 4 triangles total — no square base."
  },
  {
    "id": "gm-ar-011",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": true,
    "pedagogical": false,
    "stem": "A rectangular garden is 5 3/4 feet wide and 7 1/2 feet long. What is the area of the garden, in square feet?",
    "choices": ["26 1/2", "35 3/8", "36 1/8", "43 1/8"],
    "answer_index": 3,
    "explanation": "Area = length × width.\nConvert mixed numbers to improper fractions:\n5 3/4 = 23/4\n7 1/2 = 15/2\nMultiply: (23/4) × (15/2) = (23 × 15) / (4 × 2) = 345/8.\nConvert back: 345 ÷ 8 = 43 remainder 1, so 345/8 = 43 1/8.\nArea = 43 1/8 square feet."
  },
  {
    "id": "gm-ar-012",
    "domain": "geometry_measurement_data",
    "topic": "area_perimeter_volume",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": true,
    "stem": "The surface area of a cube is 54 square inches. What is the volume of the cube, in cubic inches?",
    "choices": ["27", "54", "81", "108"],
    "answer_index": 0,
    "explanation": "A cube has 6 identical square faces, each with area s² (where s is the edge length). So surface area = 6s².\nSet up and solve:\n6s² = 54\ns² = 9\ns = 3 inches.\nVolume of a cube = s³ = 3 × 3 × 3 = 27 cubic inches.\nCommon errors:\n• Treating 54 as the volume directly — but 54 is the SURFACE AREA.\n• Finding s = 3 but forgetting to cube it.\n• Computing 6 × 3² × 3 = 162 by mixing formulas."
  },
  {
    "id": "gm-tr-006",
    "domain": "geometry_measurement_data",
    "topic": "transformations",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "figure": {
      "type": "numberLineSet",
      "min": -10, "max": 10,
      "figures": [
        {"label": "Figure 1", "arc": {"from": -2, "to": -7}},
        {"label": "Figure 2", "arc": {"from": 0, "to": -2}},
        {"label": "Figure 3", "arc": {"from": -7, "to": -5}},
        {"label": "Figure 4", "arc": {"from": -7, "to": -9}}
      ]
    },
    "stem": "Each of the figures above uses a number line to represent a different calculation.\n\nWhich figure represents the calculation −7 − (−2)?",
    "choices": ["Figure 1", "Figure 2", "Figure 3", "Figure 4"],
    "answer_index": 2,
    "explanation": "Subtracting a negative is the same as adding a positive:\n−7 − (−2) = −7 + 2 = −5.\nSo on a number line, start at −7 and move 2 units to the RIGHT (because we're adding 2). The result is −5.\nFigure 3 matches: starts at −7, moves right 2 units, lands at −5.\nFigure 4 (moving LEFT 2 from −7) would represent −7 − 2 = −9 — different problem."
  },
  {
    "id": "gm-cp-006",
    "domain": "geometry_measurement_data",
    "topic": "coordinate_plane",
    "grade_band": "5-6",
    "difficulty": "easy",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "figure": {
      "type": "coordinatePlane",
      "xRange": [-5, 5], "yRange": [-5, 5],
      "points": [
        {"x": -4, "y": 3, "label": "J"},
        {"x": 3, "y": 2, "label": "K"},
        {"x": 2, "y": -3, "label": "L"},
        {"x": -3, "y": -2, "label": "M"}
      ]
    },
    "stem": "On the coordinate plane above, four points are plotted. Which point is located in Quadrant I?",
    "choices": ["Point J", "Point K", "Point L", "Point M"],
    "answer_index": 1,
    "explanation": "Quadrant I has positive x AND positive y (upper-right of the coordinate plane).\nJ = (−4, 3): x negative → Quadrant II.\nK = (3, 2): both positive → Quadrant I ✓\nL = (2, −3): y negative → Quadrant IV.\nM = (−3, −2): both negative → Quadrant III."
  },
  {
    "id": "gm-dd-007",
    "domain": "geometry_measurement_data",
    "topic": "data_displays",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "figure": {
      "type": "boxplot",
      "xRange": [0, 140],
      "tickStep": 20,
      "xLabel": "Annual Income (thousands of dollars)",
      "yLabel": "Profession",
      "data": [
        {"label": "X", "min": 60, "q1": 80, "median": 90, "q3": 110, "max": 130},
        {"label": "Y", "min": 10, "q1": 20, "median": 30, "q3": 40, "max": 50}
      ]
    },
    "stem": "The boxplots above compare the annual incomes of two professions, X and Y. Which statement is supported by the boxplots?",
    "choices": [
      "The median income of Profession X is 3 times the median income of Profession Y.",
      "Profession X and Profession Y have the same range.",
      "Profession Y has a wider range of incomes than Profession X.",
      "The maximum income of Profession Y is greater than the minimum income of Profession X."
    ],
    "answer_index": 0,
    "explanation": "Read the medians from the boxplots (the line inside the box):\nMedian X = 90; Median Y = 30. Ratio: 90 ÷ 30 = 3 ✓\nCheck the others:\n• Range X = 130 − 60 = 70; Range Y = 50 − 10 = 40. Different ✗\n• X has the wider range, not Y ✗\n• Max of Y = 50 < Min of X = 60, so Y's max does NOT exceed X's min ✗"
  },
  {
    "id": "gm-ct-007",
    "domain": "geometry_measurement_data",
    "topic": "central_tendency",
    "grade_band": "5-6",
    "difficulty": "hard",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "Caleb's first 6 quiz scores in his algebra class are:\n90, 90, 95, 90, 85, 90\n\nIf he earns a 95 on his 7th quiz, which statement comparing his 7 quiz scores to his first 6 quiz scores is true?",
    "choices": [
      "The mean of the 7 scores is less than the mean of the first 6.",
      "The mode of the 7 scores is greater than the mode of the first 6.",
      "The median of the 7 scores is equal to the median of the first 6.",
      "The range of the 7 scores is greater than the range of the first 6."
    ],
    "answer_index": 2,
    "explanation": "Compute each statistic for the first 6 vs. all 7.\nFirst 6 sorted: 85, 90, 90, 90, 90, 95.\n• Mean = 540/6 = 90.\n• Median = (90 + 90)/2 = 90.\n• Mode = 90 (appears 4 times).\n• Range = 95 − 85 = 10.\nAll 7 sorted: 85, 90, 90, 90, 90, 95, 95.\n• Mean = 635/7 ≈ 90.71 — GREATER (so option A \"less\" is false).\n• Median = 4th value = 90 — SAME ✓\n• Mode = 90 (still 4 times) — SAME (option B \"greater\" is false).\n• Range = 95 − 85 = 10 — SAME (option D \"greater\" is false).\nOnly C is true."
  },
  {
    "id": "gm-pr-006",
    "domain": "geometry_measurement_data",
    "topic": "probability",
    "grade_band": "5-6",
    "difficulty": "medium",
    "format": "multiple_choice",
    "calculator_allowed": false,
    "pedagogical": false,
    "stem": "A flower shop has 5 kinds of flowers (tulips, lilies, daisies, carnations, and roses) and 3 colors of vases (blue, green, and pink). One kind of flower and one color of vase are each chosen at random and independently. What is the probability that the selection is lilies in a pink vase?",
    "choices": ["1/8", "1/15", "2/15", "1/5"],
    "answer_index": 1,
    "explanation": "When two events are independent, the probability of BOTH occurring is the product of the individual probabilities.\nP(lilies) = 1/5 (one of five flower kinds).\nP(pink vase) = 1/3 (one of three colors).\nP(lilies AND pink) = (1/5) × (1/3) = 1/15."
  }

];

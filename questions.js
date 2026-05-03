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
    "stem": "A student calculates a 50% increase of $20 as $50. What is the student's misconception?",
    "choices": [
      "The student multiplied instead of adding.",
      "The student treated 50% as the number 50, rather than as 50% of the original $20.",
      "The student forgot to include the original $20.",
      "The student should have gotten $40."
    ],
    "answer_index": 1,
    "explanation": "A 50% increase means add 50% of the original to itself.\n50% of $20 = $10, so a 50% increase of $20 is $20 + $10 = $30.\nThe student got $50 by adding 50 (the literal numeral) to the original 20, instead of adding 50% of 20."
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
  }

];

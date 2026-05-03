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
  }

];

import katex from "katex";

const SUP_MAP = { "⁰":"0","¹":"1","²":"2","³":"3","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","⁺":"+","⁻":"-","⁼":"=","⁽":"(","⁾":")","ⁿ":"n","ⁱ":"i" };
const SUB_MAP = { "₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","₊":"+","₋":"-","₌":"=","₍":"(","₎":")","ₐ":"a","ₑ":"e","ₒ":"o","ₓ":"x","ₕ":"h","ₖ":"k","ₗ":"l","ₘ":"m","ₙ":"n","ₚ":"p","ₛ":"s","ₜ":"t" };
const SUP_CHARS = new Set(Object.keys(SUP_MAP));
const SUB_CHARS = new Set(Object.keys(SUB_MAP));
// Greek letters commonly used as physical-quantity symbols in this content.
// KaTeX renders these unicode characters directly, so no macro conversion needed.
const GREEK_RE = /[α-ωΑ-Ω]/;

// Compact SI unit abbreviations. Used only to detect "word/word" sequences
// that are compound units (e.g. "m/s", "g/mol") rather than genuine division.
// Only ever consulted when the preceding factor is a bare number (see
// tryConsumeUnitRatio), so collisions with same-named variables (m for mass,
// K for an equilibrium constant, etc.) elsewhere in a line are unaffected.
const UNIT_WORDS = new Set(["s","g","kg","mg","mol","min","hr","atm","mL","L","Hz","eV","cm","nm","pm","yr","bar","dm","kJ","cal","Pa","Wb","m","J","K","N","V","A","W","T"]);

// Strip a leading list marker like "(a)", "(i)", "1.", "(iii)" — kept as
// plain-text prefix by the caller, not fed into the math parser.
function splitLeadingMarker(line) {
  // The \d+[.)] alternative requires the '.'/')' NOT be followed by another
  // digit — otherwise "12.01 + ..." would be misread as list-marker "12."
  // plus leftover "01 + ...".
  const m = line.match(/^\s*(\([a-zA-Z0-9]{1,4}\)|\d+[.)](?!\d))\s*/);
  if (!m) return { marker: "", rest: line };
  return { marker: m[0].trimEnd(), rest: line.slice(m[0].length) };
}

function stripOuterParens(s) {
  if (s.length < 2 || s[0] !== "(" || s[s.length - 1] !== ")") return s;
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") depth++;
    else if (s[i] === ")") {
      depth--;
      if (depth === 0 && i !== s.length - 1) return s; // closes early — not a single wrapping pair
    }
  }
  return s.slice(1, -1);
}

class Parser {
  constructor(s) {
    this.s = s;
    this.i = 0;
    this.n = s.length;
  }
  eof() { return this.i >= this.n; }
  peek() { return this.s[this.i]; }
  skipWs() { while (!this.eof() && this.peek() === " ") this.i++; }

  // Top level: expr (= expr)*
  parseLine() {
    const parts = [this.parseExpr()];
    if (parts[0] === null) return null;
    this.skipWs();
    while (!this.eof() && this.peek() === "=") {
      this.i++;
      this.skipWs();
      const p = this.parseExpr();
      if (p === null) return null;
      parts.push(p);
      this.skipWs();
    }
    if (!this.eof()) return null; // couldn't consume the whole line — refuse to guess
    return parts.join(" = ");
  }

  // expr := term (('+'|'-') term)*
  parseExpr() {
    let left = this.parseTerm();
    if (left === null) return null;
    this.skipWs();
    while (!this.eof() && (this.peek() === "+" || this.peek() === "−" || (this.peek() === "-" && this.canStartFactorAfterOp()))) {
      const op = this.peek() === "−" ? "-" : this.peek();
      this.i++;
      this.skipWs();
      const right = this.parseTerm();
      if (right === null) return null;
      left = `${left} ${op} ${right}`;
      this.skipWs();
    }
    return left;
  }

  // Lookahead so we don't misinterpret a trailing '-' with nothing after it as subtraction.
  canStartFactorAfterOp() {
    const save = this.i;
    this.i++;
    this.skipWs();
    const ok = !this.eof() && this.canStartFactor();
    this.i = save;
    return ok;
  }

  // term := factor (('×'|'÷'|'/'|implicit-adjacency) factor)*
  parseTerm() {
    let left = this.parseFactor();
    if (left === null) return null;
    this.skipWs();
    for (;;) {
      if (this.eof()) break;
      const c = this.peek();
      if (c === "×" || c === "·") {
        this.i++;
        this.skipWs();
        const right = this.parseFactor();
        if (right === null) return null;
        left = `${left} \\times ${right}`;
      } else if (c === "÷") {
        this.i++;
        this.skipWs();
        let right = this.parseFactor();
        if (right === null) return null;
        right = this.absorbTrailingUnit(right);
        left = `\\frac{${stripOuterParens(left)}}{${stripOuterParens(right)}}`;
      } else if (c === "/") {
        this.i++;
        this.skipWs();
        let right = this.parseFactor();
        if (right === null) return null;
        right = this.absorbTrailingUnit(right);
        left = `\\frac{${stripOuterParens(left)}}{${stripOuterParens(right)}}`;
      } else if (this.canStartFactor()) {
        const right = this.parseFactor();
        if (right === null) return null;
        left = this.join(left, right); // implicit multiplication, e.g. n(n-1), 2KE
      } else break;
      this.skipWs();
    }
    return left;
  }

  // Join two adjacent pieces for implicit concatenation, inserting a thin
  // space when either side is a \text{...} label so units/words don't run
  // into neighbouring numbers.
  join(a, b) {
    const needsSpace = /\\text\{[^}]*\}$/.test(a) || /^\\text\{/.test(b);
    return needsSpace ? `${a}\\ ${b}` : `${a}${b}`;
  }

  // Deliberately excludes '-'/'−': a bare minus after a completed term always
  // means "subtract the next term" (parseExpr's job), never "and now
  // implicitly multiply by a negative factor" — otherwise "1/n₁² − 1/n₂²"
  // gets misparsed as one nested fraction instead of two subtracted terms.
  canStartFactor() {
    if (this.eof()) return false;
    const c = this.peek();
    if (c === "=" || c === ")" || c === "+" || c === "×" || c === "÷" || c === "/" || c === "·") return false;
    return /[0-9.(]/.test(c) || /[A-Za-z]/.test(c) || GREEK_RE.test(c) || c === "√" || c === "±" || c === "°" || c === "Å";
  }

  // factor := ['-'] atom (SUP|SUB)* , with "N × 10^exp" collapsed into one atomic number
  parseFactor() {
    this.skipWs();
    let neg = false;
    if (this.peek() === "-" || this.peek() === "−") {
      neg = true;
      this.i++;
      this.skipWs();
    }
    let atom = this.parseAtom();
    if (atom === null) return null;
    atom = this.maybeConsumeSciNotation(atom);
    for (;;) {
      if (!this.eof() && SUP_CHARS.has(this.peek())) {
        atom += `^{${this.consumeRun(SUP_MAP)}}`;
      } else if (!this.eof() && SUB_CHARS.has(this.peek())) {
        atom += `_{${this.consumeRun(SUB_MAP)}}`;
      } else break;
    }
    // A Greek letter directly touching (no space) the atom just parsed is a
    // compound symbol — "2π" (as in nh/2π), not "2 times a separate π factor"
    // — and must not be left dangling outside a fraction this atom ends up in.
    // Any Latin letters immediately following the Greek letter belong to the
    // same symbol too — "2ΔcH°" is one compound quantity, not "2Δ" times a
    // separately-\text{}-wrapped "cH" (which would force stray spacing).
    while (!this.eof() && GREEK_RE.test(this.peek())) {
      atom += this.peek();
      this.i++;
      while (!this.eof() && /[A-Za-z]/.test(this.peek())) {
        atom += this.peek();
        this.i++;
      }
    }
    return neg ? `-${atom}` : atom;
  }

  // Treats "6.02 × 10²³" as one indivisible scientific-notation number, so it
  // can't get incorrectly split apart by a neighbouring '/' or '×'.
  maybeConsumeSciNotation(atomSoFar) {
    if (!/^[0-9.]+$/.test(atomSoFar)) return atomSoFar;
    const save = this.i;
    this.skipWs();
    if (this.peek() !== "×") { this.i = save; return atomSoFar; }
    this.i++;
    this.skipWs();
    if (this.s.slice(this.i, this.i + 2) !== "10") { this.i = save; return atomSoFar; }
    const afterTen = this.i + 2;
    if (afterTen >= this.n || !SUP_CHARS.has(this.s[afterTen])) { this.i = save; return atomSoFar; }
    this.i = afterTen;
    const exp = this.consumeRun(SUP_MAP);
    return `${atomSoFar} \\times 10^{${exp}}`;
  }

  // If the text at the current position is exactly "unit/unit" (no spaces,
  // both sides known unit abbreviations, not followed by more letters),
  // consume it and return it as a literal \text{} label. Otherwise leaves
  // the position untouched and returns null.
  tryConsumeUnitRatio() {
    const m = /^([A-Za-z]{1,3})\/([A-Za-z]{1,4})(?![A-Za-z])/.exec(this.s.slice(this.i));
    if (!m || !UNIT_WORDS.has(m[1]) || !UNIT_WORDS.has(m[2])) return null;
    this.i += m[0].length;
    return `\\text{${m[0]}}`;
  }

  // A fraction's denominator is often followed (after a space) by the unit
  // that quantity is measured in — "342 g/mol", "2 L", "10⁻⁴ m²" — which
  // belongs grouped into the denominator, not left dangling outside the
  // \frac. Absorb it if recognisable (a known unit, a unit/unit ratio, or a
  // single bare letter); otherwise leave the position untouched. Safe even
  // when wrong: parseLine still requires the whole line to parse, so an
  // over-eager absorption here just makes an unrelated line fail to convert
  // rather than convert incorrectly.
  //
  // Only attempt this when the denominator itself is a bare number (e.g.
  // "27" in "27 g mol⁻¹", a molar mass) — a number-only denominator paired
  // with a following unit word is the idiomatic "value with its unit"
  // pattern. If the denominator contains a letter (a variable like "n²" in
  // "-2.18e-18/n² J"), the trailing word is almost always the *result's*
  // unit, not something that belongs multiplied into the denominator — so
  // leave it alone and let it attach outside the fraction instead.
  absorbTrailingUnit(right) {
    if (/[A-Za-z]/.test(right)) return right;
    const save = this.i;
    this.skipWs();
    if (this.eof() || !/[A-Za-z]/.test(this.peek())) { this.i = save; return right; }
    const unitRatio = this.tryConsumeUnitRatio();
    if (unitRatio !== null) return this.join(right, unitRatio);
    // A compound unit is often written as multiple space-separated words,
    // each optionally carrying its own superscript exponent — "g mol⁻¹",
    // "kJ mol⁻¹ K⁻¹" — all of which belong in the denominator. Absorbing
    // only the first word (and leaving "mol⁻¹" to be parsed afterward as a
    // separate factor multiplied OUTSIDE the fraction) silently flips the
    // resulting units, so keep absorbing known unit words + exponents.
    const words = [];
    for (;;) {
      const wordSave = this.i;
      this.skipWs();
      const wm = /^[A-Za-z]+/.exec(this.s.slice(this.i));
      if (!wm || !UNIT_WORDS.has(wm[0])) { this.i = wordSave; break; }
      this.i += wm[0].length;
      let word = wm[0];
      if (!this.eof() && SUP_CHARS.has(this.peek())) {
        word += `^{${this.consumeRun(SUP_MAP)}}`;
      }
      words.push(word);
    }
    if (words.length > 0) {
      const label = words
        .map((w) => {
          const wm = /^([A-Za-z]+)(\^\{.*\})?$/.exec(w);
          return wm[2] ? `\\text{${wm[1]}}${wm[2]}` : `\\text{${wm[1]}}`;
        })
        .join("\\ ");
      return this.join(right, label);
    }
    const m = /^[A-Za-z]+/.exec(this.s.slice(this.i));
    if (m && m[0].length === 1 && !/[A-Za-z]/.test(this.s[this.i + 1] ?? "")) {
      this.i += 1;
      return this.join(right, m[0]);
    }
    this.i = save;
    return right;
  }

  consumeRun(map) {
    let out = "";
    while (!this.eof() && map[this.peek()] !== undefined) {
      out += map[this.peek()];
      this.i++;
    }
    return out;
  }

  parseAtom() {
    if (this.eof()) return null;
    const c = this.peek();
    if (c === "(") {
      this.i++;
      const e = this.parseExpr();
      if (e === null) return null;
      this.skipWs();
      if (this.peek() !== ")") return null;
      this.i++;
      return `(${e})`;
    }
    if (c === "√") {
      this.i++;
      this.skipWs();
      if (this.peek() === "(") {
        this.i++;
        const e = this.parseExpr();
        if (e === null) return null;
        this.skipWs();
        if (this.peek() !== ")") return null;
        this.i++;
        return `\\sqrt{${e}}`;
      }
      const f = this.parseFactor();
      if (f === null) return null;
      return `\\sqrt{${f}}`;
    }
    if (c === "±") { this.i++; return "\\pm"; }
    if (c === "°") { this.i++; return "^{\\circ}"; }
    if (c === "Å") { this.i++; return "\\text{\\r{A}}"; }
    if (GREEK_RE.test(c)) {
      // KaTeX renders Greek unicode directly, as an italic symbol. Absorb an
      // immediately-following (no space) Latin letter run too — "ΔE", "Δx",
      // "ΔH" are single compound delta-quantity symbols in this corpus, not
      // "Δ times a separate variable".
      this.i++;
      let sym = c;
      if (!this.eof() && /[A-Za-z]/.test(this.peek())) {
        const start = this.i;
        while (!this.eof() && /[A-Za-z]/.test(this.peek())) this.i++;
        sym += this.s.slice(start, this.i);
      }
      return sym;
    }
    if (/[0-9.]/.test(c)) {
      // Require at least one digit after a '.' for it to count as a decimal
      // point — otherwise a sentence-ending period right after a number
      // (e.g. "...from n = 5.") would get silently swallowed into the number.
      const m = /^\d+(\.\d+)?/.exec(this.s.slice(this.i)) || /^\.\d+/.exec(this.s.slice(this.i));
      if (!m) return null;
      this.i += m[0].length;
      return m[0];
    }
    if (/[A-Za-z]/.test(c)) {
      // ASCII underscore subscript notation — "R_H", "E_n", "m_l", "E_photon"
      // — is standard physics/chemistry variable notation in this corpus
      // (Rydberg constant for hydrogen, energy at level n, magnetic quantum
      // number, etc). Without this, the underscore is left unrecognised,
      // failing the whole-line parse and leaving the line as literal
      // unconverted text with a stray "_" character showing through.
      const subscriptVar = /^([A-Za-z]+)_([A-Za-z0-9]+)/.exec(this.s.slice(this.i));
      if (subscriptVar) {
        this.i += subscriptVar[0].length;
        const base = subscriptVar[1].length >= 2 ? `\\text{${subscriptVar[1]}}` : subscriptVar[1];
        const sub = subscriptVar[2].length >= 2 ? `\\text{${subscriptVar[2]}}` : subscriptVar[2];
        return `${base}_{${sub}}`;
      }
      // A chemical formula written with plain digits instead of unicode
      // subscripts (e.g. "H2O", "CO2", "Fe2O3", "C12H22O11") looks like
      // element symbols (capital + optional lowercase) each optionally
      // followed by a count, run together with no spaces. Keep the whole
      // thing as one literal unit instead of letting the digits fragment it
      // via implicit multiplication (which would turn "H2O" into "H" times
      // italic "2" times italic "O").
      const formula = /^(?:[A-Z][a-z]?\d*){1,}(?![a-z])/.exec(this.s.slice(this.i));
      if (formula && /\d/.test(formula[0])) {
        this.i += formula[0].length;
        // Render each element's count as a real subscript — "H2O" becomes
        // \text{H}_{2}\text{O}, not a plain inline "2" inside the text run.
        const tokens = formula[0].match(/[A-Z][a-z]?\d*/g);
        return tokens
          .map((t) => {
            const m = /^([A-Z][a-z]?)(\d*)$/.exec(t);
            return m[2] ? `\\text{${m[1]}}_{${m[2]}}` : `\\text{${m[1]}}`;
          })
          .join("");
      }
      // "unit/unit" (e.g. "m/s", "g/mol", "kJ/mol") is a compound unit, not a
      // division — keep it as literal text instead of stacking it into a
      // fraction. Checked here (not gated on context) so it applies whether
      // the pattern shows up via implicit multiplication, right after an
      // explicit '/', or as the first thing inside parentheses.
      const unitRatio = this.tryConsumeUnitRatio();
      if (unitRatio !== null) return unitRatio;
      // Gather hyphenated compound words ("near-IR", "D-line") as one token —
      // a bare '-' touching letters on both sides with no space is a hyphen,
      // not subtraction (real subtraction in this corpus uses the unicode
      // '−' sign, or has a space around an ASCII '-').
      const wordMatch = /^[A-Za-z]+(?:-[A-Za-z]+)*/.exec(this.s.slice(this.i));
      this.i += wordMatch[0].length;
      let word = wordMatch[0];
      for (;;) {
        const save = this.i;
        this.skipWs();
        // Don't absorb the next word if it's actually the start of a chemical
        // formula (e.g. stop before "H" in "...of H2O") — let it be parsed as
        // its own atom instead, so the formula-recognition check gets a chance.
        const upcomingIsFormula = !this.eof() && /^(?:[A-Z][a-z]?\d*){1,}(?![a-z])/.test(this.s.slice(this.i))
          && /\d/.test((/^(?:[A-Z][a-z]?\d*){1,}(?![a-z])/.exec(this.s.slice(this.i)) || [""])[0]);
        if (!this.eof() && /[A-Za-z]/.test(this.peek()) && this.i > save && !upcomingIsFormula) {
          const m2 = /^[A-Za-z]+(?:-[A-Za-z]+)*/.exec(this.s.slice(this.i));
          this.i += m2[0].length;
          word += " " + m2[0];
        } else {
          this.i = save;
          break;
        }
      }
      return word.length >= 2 ? `\\text{${word}}` : word;
    }
    return null; // unrecognised character — refuse to guess
  }
}

// Attempt to convert one plain-text clause to LaTeX. Returns null if it isn't
// cleanly parseable as an arithmetic expression — caller should leave it as
// plain text unchanged. Never returns a guessed/partial result.
// A line must contain an actual arithmetic operator, OR look like a chemical
// formula with a plain-digit count (e.g. "SiCl4", "C12H22O11" — so these get
// their digits rendered as real subscripts too), to even be considered. Bare
// digits/subscripts alone aren't enough on their own — e.g. "O2⁻" has a digit
// and a charge superscript but no operator; it's still caught by the formula
// half of this check so its "2" becomes a real subscript, but a plain
// prose sentence with a stray number in it is not.
const FORMULA_RE = /[A-Z][a-z]?\d/;
const HAS_MATH_RE = /[×÷√±=/]/;
const HAS_MATH_OR_FORMULA_RE = new RegExp(`${HAS_MATH_RE.source}|${FORMULA_RE.source}`);

// Narrative connector words that show up in flowing prose but essentially
// never inside a legitimate formula label ("Rate of emission", "Molar mass of
// NH3"). If any of these land inside a \text{...} run, the "formula" the
// parser found is actually just a sentence with an incidental number in it
// (e.g. "...requires 25 times more energy than from n = 5.") — reject it.
const PROSE_STOPWORDS = new Set([
  "the","this","that","these","those","it","its","which","who","whom",
  "and","or","but","than","then","when","where","while","because","since",
  "therefore","hence","thus","however","although","though",
  "requires","require","provides","provide","corresponds","correspond",
  "indicates","indicate","shows","show","means","mean",
  "pass","passes","dropped","drops","drop","intermediate","levels",
  "would","could","should","cannot","must","shall",
  "not","also","only","just","more","less","most","least","much","many",
  "such","each","every","some","any","other","same","different",
  "between","among","during","again","further","once","here","there",
  "how","why","what","we","you","they","he","she",
  "with","without","attracted","repelled","measured","directly","weakly",
  "susceptibility","determine","determines",
]);

function isMostlyProse(latex) {
  const words = [...latex.matchAll(/\\text\{([^}]*)\}/g)]
    .flatMap((m) => m[1].toLowerCase().match(/[a-z']+/g) || []);
  return words.some((w) => PROSE_STOPWORDS.has(w));
}

function tryLatex(text, aggressive) {
  const trimmed = text.trim();
  const gate = aggressive ? HAS_MATH_OR_FORMULA_RE : HAS_MATH_RE;
  if (!trimmed || !gate.test(trimmed)) return null;
  const p = new Parser(trimmed);
  const latex = p.parseLine();
  if (latex === null) return null;
  if (isMostlyProse(latex)) return null;
  try {
    katex.renderToString(latex, { throwOnError: true });
  } catch {
    return null;
  }
  return latex;
}

// Split a line on top-level ':' and ';' (i.e. not inside parentheses) into
// independently-convertible clauses, recording the separator character that
// followed each clause so the caller can re-insert it verbatim when
// reassembling the pieces into flowing prose. Comma-splitting is only
// enabled in "aggressive" mode (question text) — genuine formula lists like
// "H2S, SiCl4, BeF2" benefit from it, but applying it to ordinary prose
// (explanations, steps) just fragments sentences that merely mention a
// formula in passing.
function splitClauses(line, aggressive) {
  const clauses = [];
  let depth = 0, start = 0;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "(") depth++;
    else if (c === ")") depth--;
    else if (c === ":" && depth === 0) {
      // A colon flanked by digits on both sides (ignoring one optional space,
      // e.g. "16:32", "1 : 2") is ratio notation ("16:32:48" = "16 to 32 to
      // 48"), not a label/clause separator — never split there.
      const before = line.slice(0, i).match(/(\d)\s?$/);
      const after = line.slice(i + 1).match(/^\s?(\d)/);
      if (before && after) continue;
      clauses.push({ text: line.slice(start, i), sep: ":" });
      start = i + 1;
    } else if (c === ";" && depth === 0) {
      clauses.push({ text: line.slice(start, i), sep: ";" });
      start = i + 1;
    } else if (c === "," && depth === 0 && aggressive) {
      // A comma between two digits (e.g. "1,000") is a thousands separator,
      // not a list separator — don't split there. (Not actually seen in this
      // corpus, which uses scientific notation instead, but safe to guard.)
      const before = line.slice(0, i).match(/\d$/);
      const after = line.slice(i + 1).match(/^\d/);
      if (before && after) continue;
      clauses.push({ text: line.slice(start, i), sep: "," });
      start = i + 1;
    }
  }
  clauses.push({ text: line.slice(start), sep: "" });
  return clauses;
}

function convertWhole(rawLine, aggressive) {
  const { marker, rest } = splitLeadingMarker(rawLine);
  const latex = tryLatex(rest, aggressive);
  if (latex === null) return null;
  const out = [];
  if (marker) out.push({ type: "text", text: `${marker} ` });
  out.push({ type: "eq", latex });
  return out;
}

// Convert one line (no embedded newlines) into a sequence of {type:'text'} /
// {type:'eq'} pieces, meant to be reassembled inline into a single paragraph
// (unless the whole result is exactly one bare 'eq' piece, in which case the
// caller renders it as a standalone display equation instead). Tries the
// whole line as one expression first; only falls back to splitting on
// top-level ':'/';' into independent clauses if that produces at least one
// real equation — otherwise the line is prose that merely contains a
// colon/semicolon, and is returned completely unchanged (no fragmentation
// for no benefit). A leading list marker like "(a)"/"(i)" is kept as text.
function convertSingleLine(rawLine, aggressive) {
  const whole = convertWhole(rawLine, aggressive);
  if (whole !== null) return whole;

  const clauses = splitClauses(rawLine, aggressive);
  if (clauses.length < 2) return [{ type: "text", text: rawLine }];

  const perClause = clauses.map(({ text: clause, sep }) => {
    const { marker, rest } = splitLeadingMarker(clause);
    const latex = tryLatex(rest, aggressive);
    return { marker, rest, latex, sep };
  });
  if (!perClause.some((c) => c.latex !== null)) {
    return [{ type: "text", text: rawLine }];
  }

  const out = [];
  for (const { marker, rest, latex, sep } of perClause) {
    if (marker) out.push({ type: "text", text: `${marker} ` });
    if (latex !== null) out.push({ type: "eq", latex });
    else if (rest.trim()) out.push({ type: "text", text: rest.trim() });
    // Re-insert the separator that originally followed this clause, so the
    // reassembled sentence reads naturally ("Given: ...; ...") instead of
    // losing its punctuation when the pieces are stitched back together.
    if (sep) out.push({ type: "text", text: `${sep} ` });
  }
  return out;
}

// Convert one original text field's raw string into a sequence of pieces,
// same as convertSingleLine, except a literal embedded newline (multi-line
// step content, e.g. "Cl-35: ...\nCl-37: ...") is treated as a real
// paragraph break — each line is converted independently and a {type:'break'}
// marker is inserted between them, telling the caller to start a new block
// rather than keep stitching everything into one run-on paragraph.
//
// Pass `aggressive: true` for question text, where a bare chemical formula
// with no operator (e.g. "H2S, SiCl4, BeF2") should still be recognised and
// split on commas — this is intentionally NOT the default, since applying it
// to ordinary prose (answers/explanations/steps) fragments sentences that
// merely mention a formula in passing, rather than listing them.
export function convertLine(rawLine, { aggressive = false } = {}) {
  const lines = rawLine.split("\n");
  if (lines.length === 1) return convertSingleLine(rawLine, aggressive);
  const out = [];
  lines.forEach((line, i) => {
    out.push(...convertSingleLine(line, aggressive));
    if (i < lines.length - 1) out.push({ type: "break" });
  });
  return out;
}

export { tryLatex };

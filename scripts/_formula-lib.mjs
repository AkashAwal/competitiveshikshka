// Detects chemical formulas embedded in ordinary prose (e.g. "the oxidation
// number of P in NaH2PO4 is +5") and converts just those substrings into
// inline LaTeX (\text{}_{} subscripts), leaving the surrounding sentence as
// plain text. This is deliberately narrower than a full arithmetic parser
// (see _latexify-lib.mjs): it only recognises neutral formulas built from
// real periodic-table symbols, generically, plus a curated dictionary of
// charged ions (see EXCEPTIONS below) where the count/charge split can't be
// inferred from the string alone without domain knowledge.

const ELEMENTS = new Set([
  "H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl","Ar",
  "K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Ga","Ge","As","Se","Br","Kr",
  "Rb","Sr","Y","Zr","Nb","Mo","Tc","Ru","Rh","Pd","Ag","Cd","In","Sn","Sb","Te","I","Xe",
  "Cs","Ba","La","Ce","Pr","Nd","Pm","Sm","Eu","Gd","Tb","Dy","Ho","Er","Tm","Yb","Lu",
  "Hf","Ta","W","Re","Os","Ir","Pt","Au","Hg","Tl","Pb","Bi","Po","At","Rn",
  "Fr","Ra","Ac","Th","Pa","U","Np","Pu","Am","Cm","Bk","Cf","Es","Fm","Md","No","Lr",
  // Synthetic/superheavy elements (Rf onward) are deliberately excluded — none
  // appear in this NCERT-level corpus, and including them (esp. "Cn" =
  // Copernicium) causes false-positive collisions with generic placeholder
  // notation like "CnH2n+2" (C sub n, an alkane formula variable), which is
  // common in this content but would never legitimately refer to element 112.
]);

// Exact substrings (a formula + its charge, written the way this corpus
// writes it, e.g. "Cr2O72-") whose count/charge split is genuinely ambiguous
// from the string alone (a 2-digit run directly before the sign could be
// "count ending in that digit" + "1-digit charge", or something else) —
// resolved here by hand instead of guessed. Sorted longest-first by the
// caller so e.g. "Cr2O72-" is tried before any shorter overlapping key.
const EXCEPTIONS = {
  "Cr2O72-": "\\text{Cr}_{2}\\text{O}_{7}^{2-}",
  "SO42-": "\\text{S}\\text{O}_{4}^{2-}",
  "S2O32-": "\\text{S}_{2}\\text{O}_{3}^{2-}",
  "S4O62-": "\\text{S}_{4}\\text{O}_{6}^{2-}",
  "XeO64-": "\\text{Xe}\\text{O}_{6}^{4-}",
  "MnO4-": "\\text{Mn}\\text{O}_{4}^{-}",
  "MnO2-": "\\text{Mn}\\text{O}_{2}^{-}",
  "NO3-": "\\text{N}\\text{O}_{3}^{-}",
  "NO2-": "\\text{N}\\text{O}_{2}^{-}",
  "ClO3-": "\\text{Cl}\\text{O}_{3}^{-}",
  "ClO2-": "\\text{Cl}\\text{O}_{2}^{-}",
  "HSO4-": "\\text{H}\\text{S}\\text{O}_{4}^{-}",
  "HPO2-": "\\text{H}\\text{P}\\text{O}_{2}^{-}",
  "HCOO-": "\\text{H}\\text{C}\\text{O}\\text{O}^{-}",
  "CNO-": "\\text{C}\\text{N}\\text{O}^{-}",
  "CN-": "\\text{C}\\text{N}^{-}",
  "OH-": "\\text{O}\\text{H}^{-}",
  "XeO64−": "\\text{Xe}\\text{O}_{6}^{4-}",
  "Fe3+": "\\text{Fe}^{3+}",
  "Fe2+": "\\text{Fe}^{2+}",
  "Cu2+": "\\text{Cu}^{2+}",
  "Cu+": "\\text{Cu}^{+}",
  "Ag+": "\\text{Ag}^{+}",
  "Mn3+": "\\text{Mn}^{3+}",
  "Mn2+": "\\text{Mn}^{2+}",
  "Cr3+": "\\text{Cr}^{3+}",
  "Mg2+": "\\text{Mg}^{2+}",
  "Al3+": "\\text{Al}^{3+}",
  "Zn2+": "\\text{Zn}^{2+}",
  "Hg2+": "\\text{Hg}^{2+}",
  "K+": "\\text{K}^{+}",
  "H+": "\\text{H}^{+}",
  "Cl-": "\\text{Cl}^{-}",
  "Br-": "\\text{Br}^{-}",
  "I-": "\\text{I}^{-}",
  "F-": "\\text{F}^{-}",
};
const EXCEPTION_KEYS = Object.keys(EXCEPTIONS).sort((a, b) => b.length - a.length);

function matchSymbolOnly(str, i) {
  if (!/[A-Z]/.test(str[i] || "")) return null;
  const two = str.slice(i, i + 2);
  if (ELEMENTS.has(two) && !/[a-z]/.test(str[i + 2] || "")) return { symbol: two, end: i + 2 };
  const one = str[i];
  if (ELEMENTS.has(one) && !/[a-z]/.test(str[i + 1] || "")) return { symbol: one, end: i + 1 };
  return null;
}

function matchUnitWithCount(str, i) {
  const sym = matchSymbolOnly(str, i);
  if (!sym) return null;
  // Allows a decimal count ("TiH1.5", "LaH2.87") for non-stoichiometric
  // hydride notation — a bare "\d+" would truncate at the decimal point,
  // leaving the fractional part dangling outside the subscript.
  const d = /^\d+(?:\.\d+)?/.exec(str.slice(sym.end));
  const count = d ? d[0] : "";
  return { isGroup: false, symbol: sym.symbol, count, end: sym.end + count.length };
}

// Recognises only NEUTRAL formulas — chains of element+count units, with
// optional parenthesised/bracketed groups carrying their own multiplier
// (e.g. "KAl(SO4)2", "[Ag(NH3)2]"). Deliberately stops (and does not
// consume) at a trailing +/- sign — charged species are only ever converted
// via the EXCEPTIONS table above, never guessed here.
function scanNeutralFormula(str, start) {
  let i = start;
  const units = [];
  for (;;) {
    if (str[i] === "(" || str[i] === "[") {
      const close = str[i] === "(" ? ")" : "]";
      let j = i + 1;
      const inner = [];
      let ok = true;
      while (j < str.length && str[j] !== close) {
        const u2 = matchUnitWithCount(str, j);
        if (!u2) { ok = false; break; }
        inner.push(u2);
        j = u2.end;
      }
      if (!ok || inner.length === 0 || str[j] !== close) break;
      j++;
      const multM = /^\d+/.exec(str.slice(j));
      const multiplier = multM ? multM[0] : "";
      units.push({ isGroup: true, inner, multiplier, bracket: str[i] === "[" });
      i = j + multiplier.length;
      continue;
    }
    const u = matchUnitWithCount(str, i);
    if (!u) break;
    units.push(u);
    i = u.end;
  }
  if (units.length === 0) return null;
  const hasSomethingToSubscript = units.some((u) =>
    u.isGroup ? u.multiplier || u.inner.some((x) => x.count) : u.count
  );
  // Reject any match with nothing to subscript at all, regardless of how
  // many units chained together — a formula with no digit counts anywhere
  // (e.g. "NaCl", "KF", or a bare 1:1 compound) renders identically as plain
  // text, so there's nothing gained by wrapping it in LaTeX. This also
  // starves off false positives like the Roman-numeral "II"/"III"/"IV" in
  // "Mercury(II) chloride" — the scan starts right at the "I" (since the
  // outer loop only enters on an uppercase letter, landing past the "("),
  // producing a multi-unit chain of bare "I"s with no counts, which this
  // check now correctly discards.
  if (!hasSomethingToSubscript) return null;
  // Reject if a lowercase letter directly abuts the end of the match with no
  // separator — real formulas in this corpus are always followed by a space,
  // punctuation, or another formula, never butted against a lowercase letter.
  // This rejects algebraic placeholder notation like "H2n+2" (part of the
  // generic alkane formula "CnH2n+2"), where "2" is not a real element count
  // and converting just the "H2" fragment would render misleadingly.
  if (/[a-z]/.test(str[i] || "")) return null;
  return { units, end: i };
}

function renderUnit(u) {
  if (u.isGroup) {
    const inner = u.inner.map(renderUnit).join("");
    const [open, close] = u.bracket ? ["[", "]"] : ["(", ")"];
    return `${open}${inner}${close}${u.multiplier ? `_{${u.multiplier}}` : ""}`;
  }
  return `\\text{${u.symbol}}${u.count ? `_{${u.count}}` : ""}`;
}

function renderFormula(units) {
  return units.map(renderUnit).join("");
}

// Converts one plain-text string into a sequence of {type:'text'} /
// {type:'eq', latex} pieces. Anything not recognised as a formula (including
// ambiguous charged species not in EXCEPTIONS) is left as literal text.
export function convertFormulasInText(text) {
  const pieces = [];
  let i = 0, flush = 0;
  while (i < text.length) {
    let hit = null;
    for (const key of EXCEPTION_KEYS) {
      // Reject a match immediately followed by a lowercase letter — a real
      // charge suffix is always a word boundary ("Cl- ions", "Cl-(aq)"), so a
      // lowercase letter right after means this is actually a hyphenated
      // compound word ("F-centre") that happens to start with the same
      // substring, not an ion.
      if (text.startsWith(key, i) && !/[a-z]/.test(text[i + key.length] || "")) { hit = key; break; }
    }
    if (hit) {
      if (i > flush) pieces.push({ type: "text", text: text.slice(flush, i) });
      pieces.push({ type: "eq", latex: EXCEPTIONS[hit] });
      i += hit.length;
      flush = i;
      continue;
    }
    if (/[A-Z]/.test(text[i])) {
      const m = scanNeutralFormula(text, i);
      if (m) {
        if (i > flush) pieces.push({ type: "text", text: text.slice(flush, i) });
        pieces.push({ type: "eq", latex: renderFormula(m.units) });
        i = m.end;
        flush = i;
        continue;
      }
    }
    i++;
  }
  if (flush < text.length) pieces.push({ type: "text", text: text.slice(flush) });
  return pieces;
}

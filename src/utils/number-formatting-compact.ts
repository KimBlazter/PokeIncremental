import Decimal from "break_eternity.js";

// Suffixes compactes
const SUFFIXES = [
    "",
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "Dc",
    "Ud",
    "Dd",
    "Td",
    "Qad",
    "Qid",
    "Sxd",
    "Spd",
    "Ocd",
    "Nod",
    "Od",
];

/**
 * Formatte un nombre en notation compacte ou scientifique si nécessaire.
 * @param value - Le nombre à formater (Decimal, string ou number)
 * @param maxDigits - Chiffres significatifs (ex: 3 pour "1.23M")
 * @param maxLength - Longueur maximale finale (ex: 4 pour "1.2M")
 * @param scientificFromSuffixIndex - Index du suffixe à partir duquel on force la notation scientifique (ex: 9 = Oc)
 * @returns string - Ex: "999K", "1.2M", "1.0B", "1.2e123"
 */
export function formatNumber(
    value: Decimal,
    maxDigits = 3,
    maxLength = 4,
    scientificFromSuffixIndex = 9 // "Oc" (1e27)
): string {
    const num = new Decimal(value);

    if (num.isNan()) return "NaN";
    if (!num.isFinite()) return num.s < 0 ? "-∞" : "∞";
    if (num.abs().lt(1e3)) return num.toFixed(0);

    const exponent = Decimal.floor(num.log10().div(3)).toNumber();

    if (exponent >= scientificFromSuffixIndex || exponent >= SUFFIXES.length) {
        return num.toExponential(Math.max(maxDigits - 1, 0)).replace("+", "");
    }

    const suffix = SUFFIXES[exponent] || `e${exponent * 3}`;
    const scaled = num.div(Decimal.pow(10, exponent * 3));

    // Réduction dynamique pour tenir dans maxLength
    let digits = scaled.toFixed(2).replace(/\.?0+$/, "");

    while (digits.length + suffix.length > maxLength && digits.includes(".")) {
        digits = digits.slice(0, -1);
        if (digits.endsWith(".")) digits = digits.slice(0, -1);
    }

    if (digits.length + suffix.length > maxLength) {
        digits = scaled.toFixed(0);
    }

    // Sécurité ultime
    if (suffix.length >= maxLength) {
        return num.toExponential(Math.max(maxDigits - 1, 0)).replace("+", "");
    }

    return `${digits}${suffix}`;
}

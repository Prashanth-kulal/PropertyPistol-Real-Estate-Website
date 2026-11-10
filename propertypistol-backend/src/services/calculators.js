const round = (n, d = 0) => Math.round(n * 10 ** d) / 10 ** d;

/** Standard reducing-balance EMI. rate is annual %, years may be fractional. */
function emi({ principal, ratePct, years }) {
  const n = Math.round(years * 12);
  const r = ratePct / 12 / 100;
  const monthly = r === 0 ? principal / n : (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  const total = monthly * n;

  const yearly = [];
  let balance = principal;
  for (let y = 1; y <= Math.ceil(n / 12); y++) {
    let interest = 0, paid = 0;
    for (let m = 0; m < 12 && (y - 1) * 12 + m < n; m++) {
      const i = balance * r, p = monthly - i;
      interest += i; paid += p; balance -= p;
    }
    yearly.push({ year: y, principalPaid: round(paid), interestPaid: round(interest), balance: round(Math.max(balance, 0)) });
  }
  return { emi: round(monthly), totalInterest: round(total - principal), totalPayment: round(total), months: n, yearly };
}

/** Max loan from income using a FOIR cap (banks typically allow 40-60% of net income towards EMIs). */
function eligibility({ monthlyIncome, otherEmis = 0, ratePct, years, foir = 0.5 }) {
  const affordableEmi = Math.max(0, monthlyIncome * foir - otherEmis);
  const n = Math.round(years * 12), r = ratePct / 12 / 100;
  const loan = r === 0 ? affordableEmi * n : (affordableEmi * ((1 + r) ** n - 1)) / (r * (1 + r) ** n);
  return { affordableEmi: round(affordableEmi), eligibleLoan: round(loan), foir };
}

// factors expressed in square feet
const AREA_UNITS = { sqft: 1, sqm: 10.7639, sqyd: 9, acre: 43560, hectare: 107639, guntha: 1089, cent: 435.6 };

function convertArea(value, from, to) {
  if (!(from in AREA_UNITS) || !(to in AREA_UNITS)) throw new Error("Unsupported unit");
  return round((value * AREA_UNITS[from]) / AREA_UNITS[to], 4);
}

module.exports = { emi, eligibility, convertArea, AREA_UNITS };

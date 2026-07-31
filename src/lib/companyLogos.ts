const DOMAIN_OVERRIDES: Record<string, string> = {
  "goldman sachs": "goldmansachs.com",
  "jp morgan": "jpmorganchase.com",
  "jpmorgan": "jpmorganchase.com",
  "jp morgan chase": "jpmorganchase.com",
  "morgan stanley": "morganstanley.com",
  "mckinsey": "www.mckinsey.com",
  "mckinsey & company": "www.mckinsey.com",
  "bcg": "bcg.com",
  "boston consulting group": "bcg.com",
  "bain & company": "bain.com",
  "bain": "bain.com",
  "p&g": "pg.com",
  "procter & gamble": "pg.com",
  "pwc": "pwc.com",
  "ey": "ey.com",
  "kpmg": "kpmg.com",
  "deloitte": "deloitte.com",
  "tcs": "tcs.com",
  "hcl": "hcltech.com",
  "hcltech": "hcltech.com",
  "l&t": "larsentoubro.com",
  "itc": "itcportal.com",
  "reliance": "ril.com",
  "reliance industries": "ril.com",
  "jio": "jio.com",
  "meta": "meta.com",
  "facebook": "meta.com",
  "hdfc bank": "hdfcbank.com",
  "icici bank": "icicibank.com",
  "hp": "hp.com",
};

export function companyDomain(name: string): string | null {
  const key = name.trim().toLowerCase();
  if (!key) return null;
  if (DOMAIN_OVERRIDES[key]) return DOMAIN_OVERRIDES[key];

  const slug = key.replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
  return slug ? `${slug}.com` : null;
}

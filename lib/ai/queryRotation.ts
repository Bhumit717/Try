const products = ["rice", "basmati rice", "non basmati rice", "spices", "pulses", "grains", "food commodities", "agriculture products"];
const buyerSynonyms = ["importer", "buyer", "wholesaler", "distributor", "procurement", "foodstuff trading company"];
const intents = ["bulk", "container", "supplier sourcing", "purchase", "import"];

export function generateDailyQueries(countries: string[], cities: string[]) {
  const daySeed = new Date().toISOString().slice(0, 10);
  const out: string[] = [];
  for (const p of products) for (const b of buyerSynonyms) for (const c of countries) {
    out.push(`${p} ${b} in ${c} ${intents[(out.length + daySeed.length) % intents.length]}`);
  }
  for (const city of cities.slice(0, 30)) {
    out.push(`${products[out.length % products.length]} wholesale ${city}`);
  }
  return [...new Set(out)].slice(0, 300);
}

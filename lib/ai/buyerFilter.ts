import { BuyerType } from "@/lib/types";

const buyerWords = /(import|wholesale|distributor|procurement|trading|commodit)/i;
const rejectWords = /(blog|news|retail|restaurant|recipe|wiki)/i;

export function classifyBuyer(input: { title: string; snippet?: string; category?: string }) {
  const text = `${input.title} ${input.snippet ?? ""} ${input.category ?? ""}`;
  if (rejectWords.test(text)) return { buyer_type: "irrelevant" as BuyerType, score: 0.1 };
  if (/procurement|purchasing/.test(text.toLowerCase())) return { buyer_type: "procurement_office" as BuyerType, score: 0.88 };
  if (/distributor/.test(text.toLowerCase())) return { buyer_type: "distributor" as BuyerType, score: 0.84 };
  if (/wholesale/.test(text.toLowerCase())) return { buyer_type: "wholesaler" as BuyerType, score: 0.85 };
  if (buyerWords.test(text)) return { buyer_type: "importer" as BuyerType, score: 0.82 };
  return { buyer_type: "irrelevant" as BuyerType, score: 0.2 };
}

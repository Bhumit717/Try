export type LeadStatus = "fresh" | "duplicate" | "resurfaced";

export type BuyerType = "importer" | "wholesaler" | "distributor" | "trading_company" | "procurement_office" | "irrelevant";

export interface LeadRecord {
  id?: string;
  company_name: string;
  contact_person?: string | null;
  email?: string | null;
  email_confidence?: number | null;
  phone?: string | null;
  whatsapp?: string | null;
  website?: string | null;
  country?: string | null;
  city?: string | null;
  address?: string | null;
  category?: string | null;
  google_rating?: number | null;
  linkedin_url?: string | null;
  source_url: string;
  buyer_confidence: number;
  buyer_type: BuyerType;
  product_keyword: string;
  status: LeadStatus;
}

create extension if not exists pg_trgm;

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  company_name text not null,
  contact_person text,
  email text,
  email_confidence numeric,
  phone text,
  whatsapp text,
  website text,
  country text,
  city text,
  address text,
  category text,
  google_rating numeric,
  linkedin_url text,
  source_url text not null,
  buyer_confidence numeric not null,
  buyer_type text not null,
  product_keyword text not null,
  status text not null default 'fresh',
  notes text
);

create index if not exists leads_company_idx on leads using gin (company_name gin_trgm_ops);
create index if not exists leads_email_idx on leads(email);
create index if not exists leads_website_idx on leads(website);

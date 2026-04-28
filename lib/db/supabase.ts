import { createClient } from "@supabase/supabase-js";
import { assertEnv } from "@/lib/utils/env";

assertEnv();

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

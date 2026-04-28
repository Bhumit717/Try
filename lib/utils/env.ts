const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY"
] as const;

export function assertEnv() {
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing env var: ${key}`);
    }
  }
}

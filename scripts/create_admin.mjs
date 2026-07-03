import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

function parseEnv(content) {
  const lines = content.split(/\r?\n/);
  const out = {};
  for (const l of lines) {
    const t = l.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const k = t.slice(0, eq).trim();
    const v = t.slice(eq + 1).trim();
    out[k] = v;
  }
  return out;
}

async function main() {
  try {
    // Prefer existing process.env values, otherwise try .env, .env.local, then .env.example
    let env = {};
    const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
    const SUPABASE_ANON = process.env.VITE_SUPABASE_ANON_KEY;
    const SUPABASE_SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON) {
      const candidates = [".env", ".env.local", ".env.example"];
      let found = false;
      for (const c of candidates) {
        const envPath = path.resolve(process.cwd(), c);
        if (fs.existsSync(envPath)) {
          const content = fs.readFileSync(envPath, "utf8");
          env = parseEnv(content);
          found = true;
          break;
        }
      }
      if (!found) {
        console.error(
          "No .env, .env.local or .env.example found in project root and SUPABASE env vars are not set.",
        );
        process.exit(1);
      }
    }

    const finalSupabaseUrl = SUPABASE_URL ?? env.VITE_SUPABASE_URL;
    const finalSupabaseAnon = SUPABASE_ANON ?? env.VITE_SUPABASE_ANON_KEY;
    const finalServiceRole = SUPABASE_SERVICE_ROLE ?? env.SUPABASE_SERVICE_ROLE_KEY;

    if (!finalSupabaseUrl || !finalSupabaseAnon) {
      console.error("VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing in environment files.");
      process.exit(1);
    }

    const supabase = createClient(finalSupabaseUrl, finalServiceRole ?? finalSupabaseAnon, {
      auth: { persistSession: false },
    });

    // Accept email/password from CLI args: `node create_admin.mjs admin@... Pass123!`
    const [, , emailArg, passwordArg] = process.argv;
    const email = emailArg ?? "admin@example.com";
    const password = passwordArg ?? "TestAdmin123!";

    console.log(`Attempting to create admin user ${email}...`);

    const { data, error } = finalServiceRole
      ? await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { role: "admin" },
        })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Error creating user:", error.message || error);
      process.exit(1);
    }

    const user = finalServiceRole ? data.user : data.user;

    if (finalServiceRole && user) {
      const { error: profileError } = await supabase.from("admin_profiles").upsert(
        {
          user_id: user.id,
          email,
          role: "admin",
          is_active: true,
        },
        { onConflict: "user_id" },
      );

      if (profileError) {
        console.error(
          "User created, but admin profile creation failed:",
          profileError.message || profileError,
        );
        process.exit(1);
      }
    }

    console.log("Sign-up response:", JSON.stringify(data, null, 2));
    if (!finalServiceRole) {
      console.log("No SUPABASE_SERVICE_ROLE_KEY was provided, so only auth sign-up was attempted.");
      console.log("Create the matching admin_profiles row manually after confirming the user.");
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    process.exit(1);
  }
}

main();

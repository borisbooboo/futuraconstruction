import process from "node:process";
import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createSubAdminSchema = z
  .object({
    accessToken: z.string().min(1),
    displayName: z.string().trim().min(1, "Le nom de l'utilisateur est requis."),
    email: z.string().trim().email("Adresse email invalide."),
    password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caracteres."),
    passwordConfirm: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Les deux mots de passe ne correspondent pas.",
    path: ["passwordConfirm"],
  });

const adminAccessSchema = z.object({
  accessToken: z.string().min(1),
});

async function createAuthorizedAdminClient(accessToken: string) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Configuration serveur Supabase incomplete.");
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { data: requesterData, error: requesterError } =
    await adminClient.auth.getUser(accessToken);

  if (requesterError || !requesterData.user) {
    throw new Error("Session administrateur invalide.");
  }

  const { data: requesterProfile, error: requesterProfileError } = await adminClient
    .from("admin_profiles")
    .select("id, role, is_active")
    .eq("user_id", requesterData.user.id)
    .eq("is_active", true)
    .limit(1)
    .maybeSingle();

  if (requesterProfileError || !requesterProfile) {
    throw new Error("Compte non autorise comme administrateur.");
  }

  return { adminClient, requesterProfile };
}

export const createSubAdmin = createServerFn({ method: "POST" })
  .inputValidator(createSubAdminSchema)
  .handler(async ({ data }) => {
    const { adminClient, requesterProfile } = await createAuthorizedAdminClient(data.accessToken);

    if (requesterProfile.role === "sub_admin") {
      throw new Error("Un sous-admin ne peut pas creer un autre utilisateur.");
    }

    const email = data.email.trim().toLowerCase();
    const displayName = data.displayName.trim();

    const { data: createdUser, error: createUserError } =
      await adminClient.auth.admin.createUser({
        email,
        password: data.password,
        email_confirm: true,
        user_metadata: {
          display_name: displayName,
        },
      });

    if (createUserError || !createdUser.user) {
      throw new Error(createUserError?.message || "Impossible de creer le compte utilisateur.");
    }

    const profilePayload = {
      user_id: createdUser.user.id,
      role: "sub_admin",
      display_name: displayName,
      email,
      is_active: true,
    };

    const { data: existingProfile, error: existingProfileError } = await adminClient
      .from("admin_profiles")
      .select("id")
      .eq("user_id", createdUser.user.id)
      .limit(1)
      .maybeSingle();

    if (existingProfileError) {
      await adminClient.auth.admin.deleteUser(createdUser.user.id);
      throw new Error(`Verification du profil admin impossible: ${existingProfileError.message}`);
    }

    const { error: profileError } = existingProfile?.id
      ? await adminClient.from("admin_profiles").update(profilePayload).eq("id", existingProfile.id)
      : await adminClient.from("admin_profiles").insert(profilePayload);

    if (profileError) {
      await adminClient.auth.admin.deleteUser(createdUser.user.id);
      throw new Error(`Liaison admin impossible: ${profileError.message}`);
    }

    return {
      id: createdUser.user.id,
      email,
      displayName,
      role: "sub_admin",
    };
  });

export const listAdminUsers = createServerFn({ method: "POST" })
  .inputValidator(adminAccessSchema)
  .handler(async ({ data }) => {
    const { adminClient, requesterProfile } = await createAuthorizedAdminClient(data.accessToken);

    if (requesterProfile.role === "sub_admin") {
      throw new Error("Un sous-admin ne peut pas consulter la liste des utilisateurs.");
    }

    const [{ data: usersData, error: usersError }, { data: profiles, error: profilesError }] =
      await Promise.all([
        adminClient.auth.admin.listUsers({ page: 1, perPage: 1000 }),
        adminClient
          .from("admin_profiles")
          .select("id, user_id, role, display_name, email, is_active, created_at")
          .order("created_at", { ascending: false }),
      ]);

    if (usersError) {
      throw new Error(usersError.message);
    }

    if (profilesError) {
      throw new Error(profilesError.message);
    }

    const profilesByUserId = new Map((profiles ?? []).map((profile) => [profile.user_id, profile]));

    return usersData.users.map((user) => {
      const profile = profilesByUserId.get(user.id);
      const displayName =
        profile?.display_name ||
        (typeof user.user_metadata?.display_name === "string"
          ? user.user_metadata.display_name
          : "");

      return {
        id: user.id,
        email: user.email ?? profile?.email ?? "",
        displayName,
        role: profile?.role ?? "utilisateur",
        isActive: profile?.is_active ?? false,
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at,
      };
    });
  });

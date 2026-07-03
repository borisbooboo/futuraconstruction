-- Supabase SQL schema for Futura Construction admin dashboard
-- Includes articles, services, site content, media, messages and activity logs.

create extension if not exists "pgcrypto";

-- Admin profile table. Can be linked to Supabase Auth users.
create table if not exists admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'admin',
  display_name text,
  email text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_admin_profiles_user_id on admin_profiles(user_id);

-- Media library table for images and other assets.
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  folder text,
  file_name text not null,
  url text not null,
  mime_type text,
  width integer,
  height integer,
  size integer,
  alt_text text,
  caption text,
  metadata jsonb default '{}'::jsonb,
  is_public boolean not null default true,
  uploaded_by uuid references auth.users(id),
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do update set public = true;

-- Articles table for website news and blog content.
create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  excerpt jsonb,
  content jsonb not null,
  category jsonb default '{"fr":"Actualites","en":"News"}'::jsonb,
  cover_image_url text,
  cover_media_id uuid references media(id) on delete set null,
  is_active boolean not null default true,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  metadata jsonb default '{}'::jsonb
);

alter table articles add column if not exists category jsonb default '{"fr":"Actualites","en":"News"}'::jsonb;
alter table articles add column if not exists cover_image_url text;

create table if not exists article_media (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  media_id uuid not null references media(id) on delete cascade,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Services table for service management.
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  short_description jsonb,
  long_description jsonb,
  icon text,
  is_active boolean not null default true,
  status text not null default 'published',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  metadata jsonb default '{}'::jsonb
);

create table if not exists service_media (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  media_id uuid not null references media(id) on delete cascade,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Site content blocks for editable homepage / contact / about sections.
create table if not exists site_contents (
  id uuid primary key default gen_random_uuid(),
  section_key text not null,
  locale text not null default 'fr',
  title text,
  subtitle text,
  body text,
  metadata jsonb default '{}'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists idx_site_contents_section_locale on site_contents(section_key, locale);

-- Messages received from the contact form.
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  subject text,
  message text not null,
  source text,
  status text not null default 'new',
  is_read boolean not null default false,
  assigned_to uuid references admin_profiles(id),
  received_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table messages replica identity full;

do $$
begin
  alter publication supabase_realtime add table messages;
exception
  when duplicate_object then null;
  when undefined_object then null;
end $$;

-- Recent activity log for admin actions.
create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references admin_profiles(id),
  action text not null,
  entity_type text,
  entity_id uuid,
  description text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Settings table for global site content management.
create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value jsonb not null,
  description text,
  updated_at timestamptz not null default now()
);

-- Optional helpers for updated_at timestamp management.
create function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger articles_updated_at
  before update on articles
  for each row execute function update_updated_at_column();

create trigger services_updated_at
  before update on services
  for each row execute function update_updated_at_column();

create trigger media_updated_at
  before update on media
  for each row execute function update_updated_at_column();

create trigger site_contents_updated_at
  before update on site_contents
  for each row execute function update_updated_at_column();

create trigger messages_updated_at
  before update on messages
  for each row execute function update_updated_at_column();

create trigger admin_profiles_updated_at
  before update on admin_profiles
  for each row execute function update_updated_at_column();

-- Row level security
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and is_active = true
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.can_manage_admin_users()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
      and is_active = true
      and role <> 'sub_admin'
  );
$$;

grant execute on function public.can_manage_admin_users() to authenticated;

create or replace function public.create_sub_admin(
  target_email text,
  target_display_name text default null
)
returns table (
  id uuid,
  user_id uuid,
  role text,
  display_name text,
  email text,
  is_active boolean,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  target_user_id uuid;
begin
  if not public.can_manage_admin_users() then
    raise exception 'Vous n''avez pas le droit d''ajouter un administrateur.';
  end if;

  select users.id
    into target_user_id
  from auth.users
  where lower(users.email) = lower(target_email)
  limit 1;

  if target_user_id is null then
    raise exception 'Aucun compte Supabase Auth ne correspond a cet email. Creez d''abord le compte Auth, puis ajoutez-le comme sous-admin.';
  end if;

  return query
  insert into public.admin_profiles (
    user_id,
    role,
    display_name,
    email,
    is_active
  )
  values (
    target_user_id,
    'sub_admin',
    nullif(target_display_name, ''),
    lower(target_email),
    true
  )
  on conflict (user_id) do update
    set role = 'sub_admin',
        display_name = excluded.display_name,
        email = excluded.email,
        is_active = true,
        updated_at = now()
  returning
    admin_profiles.id,
    admin_profiles.user_id,
    admin_profiles.role,
    admin_profiles.display_name,
    admin_profiles.email,
    admin_profiles.is_active,
    admin_profiles.created_at;
end;
$$;

grant execute on function public.create_sub_admin(text, text) to authenticated;

alter table admin_profiles enable row level security;
alter table media enable row level security;
alter table articles enable row level security;
alter table article_media enable row level security;
alter table services enable row level security;
alter table service_media enable row level security;
alter table site_contents enable row level security;
alter table messages enable row level security;
alter table activity_logs enable row level security;
alter table settings enable row level security;

drop policy if exists "Admins can manage admin profiles" on admin_profiles;
drop policy if exists "Admins can read admin profiles" on admin_profiles;
drop policy if exists "Main admins can insert admin profiles" on admin_profiles;
drop policy if exists "Main admins can update admin profiles" on admin_profiles;
drop policy if exists "Main admins can delete admin profiles" on admin_profiles;

create policy "Admins can read admin profiles"
  on admin_profiles
  for select
  to authenticated
  using (public.is_admin());

create policy "Main admins can insert admin profiles"
  on admin_profiles
  for insert
  to authenticated
  with check (public.can_manage_admin_users() and role = 'sub_admin');

create policy "Main admins can update admin profiles"
  on admin_profiles
  for update
  to authenticated
  using (public.can_manage_admin_users())
  with check (public.can_manage_admin_users());

create policy "Main admins can delete admin profiles"
  on admin_profiles
  for delete
  to authenticated
  using (public.can_manage_admin_users());

drop policy if exists "Public can read published articles" on articles;
create policy "Public can read published articles"
  on articles
  for select
  using (is_active = true and status = 'published');

drop policy if exists "Admins can manage articles" on articles;
create policy "Admins can manage articles"
  on articles
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public can read active services" on services;
create policy "Public can read active services"
  on services
  for select
  using (is_active = true and status = 'published');

drop policy if exists "Admins can manage services" on services;
create policy "Admins can manage services"
  on services
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public can read active site contents" on site_contents;
create policy "Public can read active site contents"
  on site_contents
  for select
  using (is_active = true);

drop policy if exists "Admins can manage site contents" on site_contents;
create policy "Admins can manage site contents"
  on site_contents
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public can read public media" on media;
create policy "Public can read public media"
  on media
  for select
  using (is_public = true and status = 'active');

drop policy if exists "Admins can manage media" on media;
create policy "Admins can manage media"
  on media
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public can read article images" on storage.objects;
create policy "Public can read article images"
  on storage.objects
  for select
  using (bucket_id = 'article-images');

drop policy if exists "Admins can upload article images" on storage.objects;
create policy "Admins can upload article images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'article-images' and public.is_admin());

drop policy if exists "Admins can update article images" on storage.objects;
create policy "Admins can update article images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'article-images' and public.is_admin())
  with check (bucket_id = 'article-images' and public.is_admin());

drop policy if exists "Admins can delete article images" on storage.objects;
create policy "Admins can delete article images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'article-images' and public.is_admin());

drop policy if exists "Public can create messages" on messages;
create policy "Public can create messages"
  on messages
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Admins can manage messages" on messages;
create policy "Admins can manage messages"
  on messages
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

grant usage on schema public to anon, authenticated;
grant insert on table public.messages to anon;
grant select, insert, update, delete on table public.messages to authenticated;

drop policy if exists "Public can read article media links" on article_media;
create policy "Public can read article media links"
  on article_media
  for select
  using (true);

drop policy if exists "Admins can manage article media links" on article_media;
create policy "Admins can manage article media links"
  on article_media
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Public can read service media links" on service_media;
create policy "Public can read service media links"
  on service_media
  for select
  using (true);

drop policy if exists "Admins can manage service media links" on service_media;
create policy "Admins can manage service media links"
  on service_media
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can manage activity logs" on activity_logs;
create policy "Admins can manage activity logs"
  on activity_logs
  for all
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can manage settings" on settings;
create policy "Admins can manage settings"
  on settings
  for all
  using (public.is_admin())
  with check (public.is_admin());

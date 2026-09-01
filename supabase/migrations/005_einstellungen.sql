-- Persönliche Einstellungen: Darstellung, Tagesziel, Prüfungstermine, Zeitzone.
--
-- Bis hierher gab es keine Einstellungsseite und keinen Ort für so etwas.
-- Ein jsonb-Feld statt einer Spalte je Einstellung: das Schema soll nicht bei
-- jedem neuen Schalter wandern.

create table if not exists public.user_settings (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  daten      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_settings enable row level security;

drop policy if exists "user_settings_own_select" on public.user_settings;
create policy "user_settings_own_select" on public.user_settings
  for select using (auth.uid() = user_id);

drop policy if exists "user_settings_own_insert" on public.user_settings;
create policy "user_settings_own_insert" on public.user_settings
  for insert with check (auth.uid() = user_id);

drop policy if exists "user_settings_own_update" on public.user_settings;
create policy "user_settings_own_update" on public.user_settings
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

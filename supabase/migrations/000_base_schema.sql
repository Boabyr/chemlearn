-- ChemLearn: Grundschema
--
-- Rekonstruiert aus dem Anwendungscode, weil das ursprüngliche Projekt
-- verlorengegangen ist. Vor 001_learning_engine.sql ausführen.
--
-- Authentifizierung läuft über E-Mail und Passwort (supabase.auth), dafür
-- ist hier nichts einzurichten — nur in den Projekteinstellungen unter
-- Authentication → Sign In / Providers muss "Email" aktiv sein.

-- ── progress ──────────────────────────────────────────────────────────────
-- Fortschritt je Thema: gesehen, abgeschlossen, letzter Quizwert in Prozent.
create table if not exists public.progress (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  course_id   text not null,
  topic_id    text not null,
  completed   boolean not null default false,
  quiz_score  integer not null default 0,
  last_seen   timestamptz not null default now(),
  unique (user_id, course_id, topic_id)
);

create index if not exists progress_user_course_idx
  on public.progress (user_id, course_id);

alter table public.progress enable row level security;

drop policy if exists "progress_own" on public.progress;
create policy "progress_own" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── streaks ───────────────────────────────────────────────────────────────
-- Eine Zeile je Nutzer.
create table if not exists public.streaks (
  user_id          uuid primary key references auth.users(id) on delete cascade,
  current_streak   integer not null default 0,
  longest_streak   integer not null default 0,
  last_active_date date
);

alter table public.streaks enable row level security;

drop policy if exists "streaks_own" on public.streaks;
create policy "streaks_own" on public.streaks
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── user_roles ────────────────────────────────────────────────────────────
-- Wer keine Zeile hat, gilt in der App als 'student'.
create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role    text not null check (role in ('admin', 'tutor', 'student')),
  primary key (user_id, role)
);

alter table public.user_roles enable row level security;

-- Jeder darf die eigenen Rollen lesen; vergeben werden sie nur im
-- Supabase-Dashboard, damit sich niemand selbst zum Admin macht.
drop policy if exists "user_roles_select_own" on public.user_roles;
create policy "user_roles_select_own" on public.user_roles
  for select using (auth.uid() = user_id);

-- Prüft eine Rolle, ohne dass die Richtlinie sich selbst aufruft.
create or replace function public.has_role(gesucht text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = gesucht
  );
$$;

-- ── content_reports ───────────────────────────────────────────────────────
-- Fehlermeldungen von Lernenden zu einzelnen Inhalten.
create table if not exists public.content_reports (
  id                    uuid primary key default gen_random_uuid(),
  reported_by           uuid not null references auth.users(id) on delete cascade,
  course_id             text not null,
  topic_id              text not null,
  content_type          text not null,
  content_id            text,
  issue_type            text not null,
  description           text not null,
  suggested_correction  text,
  status                text not null default 'open'
                          check (status in ('open', 'resolved', 'dismissed')),
  resolved_by           uuid references auth.users(id),
  resolved_at           timestamptz,
  resolution_note       text,
  created_at            timestamptz not null default now()
);

create index if not exists content_reports_status_idx
  on public.content_reports (status, created_at desc);

alter table public.content_reports enable row level security;

drop policy if exists "reports_insert_own" on public.content_reports;
create policy "reports_insert_own" on public.content_reports
  for insert with check (auth.uid() = reported_by);

drop policy if exists "reports_select" on public.content_reports;
create policy "reports_select" on public.content_reports
  for select using (
    auth.uid() = reported_by
    or public.has_role('tutor')
    or public.has_role('admin')
  );

drop policy if exists "reports_update_staff" on public.content_reports;
create policy "reports_update_staff" on public.content_reports
  for update using (public.has_role('tutor') or public.has_role('admin'));

-- ── content_suggestions ───────────────────────────────────────────────────
-- Vorschläge für neue Quizfragen oder Karteikarten.
-- `approvals` sammelt die Nutzer-IDs der zustimmenden Tutoren.
create table if not exists public.content_suggestions (
  id               uuid primary key default gen_random_uuid(),
  submitted_by     uuid not null references auth.users(id) on delete cascade,
  course_id        text not null,
  topic_id         text not null,
  suggestion_type  text not null,
  content          jsonb not null,
  approvals        text[] not null default '{}',
  status           text not null default 'pending'
                     check (status in ('pending', 'approved', 'rejected')),
  reviewed_by      uuid references auth.users(id),
  reviewed_at      timestamptz,
  created_at       timestamptz not null default now()
);

create index if not exists content_suggestions_status_idx
  on public.content_suggestions (status, created_at desc);

alter table public.content_suggestions enable row level security;

drop policy if exists "suggestions_insert_own" on public.content_suggestions;
create policy "suggestions_insert_own" on public.content_suggestions
  for insert with check (auth.uid() = submitted_by);

drop policy if exists "suggestions_select" on public.content_suggestions;
create policy "suggestions_select" on public.content_suggestions
  for select using (
    auth.uid() = submitted_by
    or public.has_role('tutor')
    or public.has_role('admin')
  );

drop policy if exists "suggestions_update_staff" on public.content_suggestions;
create policy "suggestions_update_staff" on public.content_suggestions
  for update using (public.has_role('tutor') or public.has_role('admin'));

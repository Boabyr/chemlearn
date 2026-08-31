-- ChemLearn: Antwort-Historie und Wiederholungsplanung
-- Im Supabase SQL-Editor ausfuehren. Idempotent, kann gefahrlos wiederholt werden.

-- ── attempts ──────────────────────────────────────────────────────────────
-- Eine Zeile je beantworteter Frage. Nur anhaengen, nie aendern:
-- daraus entstehen Trefferquote, Schwaechenanalyse und Pruefungsreife.
create table if not exists public.attempts (
  id             bigint generated always as identity primary key,
  user_id        uuid not null references auth.users(id) on delete cascade,
  course_id      text not null,
  topic_id       text not null,
  question_id    text not null,
  source         text not null check (source in ('topic-quiz', 'practice', 'exam-sim')),
  correct        boolean not null,
  points_earned  numeric not null default 0,
  points_possible numeric not null default 1,
  ms_taken       integer,
  answered_at    timestamptz not null default now()
);

create index if not exists attempts_user_topic_idx
  on public.attempts (user_id, course_id, topic_id);
create index if not exists attempts_user_time_idx
  on public.attempts (user_id, answered_at desc);
create index if not exists attempts_user_question_idx
  on public.attempts (user_id, question_id);

alter table public.attempts enable row level security;

drop policy if exists "attempts_select_own" on public.attempts;
create policy "attempts_select_own" on public.attempts
  for select using (auth.uid() = user_id);

drop policy if exists "attempts_insert_own" on public.attempts;
create policy "attempts_insert_own" on public.attempts
  for insert with check (auth.uid() = user_id);

-- ── reviews ───────────────────────────────────────────────────────────────
-- SM-2-Zustand je lernbarem Element. Eine Tabelle fuer Karteikarten UND
-- Pruefungsfragen, damit es nur eine Terminlogik gibt.
--   item_type 'card'     -> item_id = '<topicId>#<kartenIndex>'
--   item_type 'question' -> item_id = Fragen-ID, z.B. 'L003'
create table if not exists public.reviews (
  user_id          uuid not null references auth.users(id) on delete cascade,
  item_type        text not null check (item_type in ('card', 'question')),
  item_id          text not null,
  course_id        text not null,
  topic_id         text not null,
  ease             numeric not null default 2.5,
  interval_days    integer not null default 0,
  reps             integer not null default 0,
  lapses           integer not null default 0,
  due_at           timestamptz not null default now(),
  last_reviewed_at timestamptz not null default now(),
  primary key (user_id, item_type, item_id)
);

create index if not exists reviews_user_due_idx
  on public.reviews (user_id, due_at);
create index if not exists reviews_user_topic_idx
  on public.reviews (user_id, course_id, topic_id);

alter table public.reviews enable row level security;

drop policy if exists "reviews_select_own" on public.reviews;
create policy "reviews_select_own" on public.reviews
  for select using (auth.uid() = user_id);

drop policy if exists "reviews_insert_own" on public.reviews;
create policy "reviews_insert_own" on public.reviews
  for insert with check (auth.uid() = user_id);

drop policy if exists "reviews_update_own" on public.reviews;
create policy "reviews_update_own" on public.reviews
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

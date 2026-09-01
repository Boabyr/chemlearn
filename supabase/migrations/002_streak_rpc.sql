-- Serie ("Streak") atomar fortschreiben.
--
-- Bisher lief das im Browser als Lesen-dann-Schreiben: zwei offene Tabs
-- zählten denselben Tag doppelt. Und der Tag kam aus toISOString(), also aus
-- UTC — wer um 23:30 Ortszeit lernte, bekam den Folgetag gutgeschrieben.
-- Den Kalendertag liefert jetzt der Client aus seiner Zeitzone, das Fortschreiben
-- passiert in einer einzigen Anweisung in der Datenbank.

create or replace function public.streak_touch(p_today date)
returns table (current_streak int, longest_streak int, last_active_date date)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'streak_touch: nicht angemeldet';
  end if;

  insert into streaks as s (user_id, current_streak, longest_streak, last_active_date)
  values (v_uid, 1, 1, p_today)
  on conflict (user_id) do update
    set current_streak = case
          when s.last_active_date >= p_today          then s.current_streak
          when s.last_active_date = p_today - 1       then s.current_streak + 1
          else 1
        end,
        longest_streak = greatest(
          s.longest_streak,
          case
            when s.last_active_date >= p_today        then s.current_streak
            when s.last_active_date = p_today - 1     then s.current_streak + 1
            else 1
          end
        ),
        last_active_date = greatest(s.last_active_date, p_today)
  returning s.current_streak, s.longest_streak, s.last_active_date
  into current_streak, longest_streak, last_active_date;

  return next;
end;
$$;

revoke all on function public.streak_touch(date) from public;
grant execute on function public.streak_touch(date) to authenticated;


-- Fortschritt fortschreiben, ohne den Bestwert zu überschreiben.
--
-- Bisher schrieb `markTopicComplete` den Score des letzten Versuchs stumpf
-- hinein: wer ein Quiz zum zweiten Mal schlechter machte, verlor den
-- gespeicherten Bestwert. `completed` konnte auf demselben Weg wieder
-- zurückfallen.

create or replace function public.progress_touch(
  p_course_id  text,
  p_topic_id   text,
  p_completed  boolean default false,
  p_quiz_score integer default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
begin
  if v_uid is null then
    raise exception 'progress_touch: nicht angemeldet';
  end if;

  insert into progress as p (user_id, course_id, topic_id, completed, quiz_score, last_seen)
  values (v_uid, p_course_id, p_topic_id, coalesce(p_completed, false), coalesce(p_quiz_score, 0), now())
  on conflict (user_id, course_id, topic_id) do update
    set completed  = p.completed or coalesce(p_completed, false),
        quiz_score = greatest(p.quiz_score, coalesce(p_quiz_score, p.quiz_score)),
        last_seen  = now();
end;
$$;

revoke all on function public.progress_touch(text, text, boolean, integer) from public;
grant execute on function public.progress_touch(text, text, boolean, integer) to authenticated;

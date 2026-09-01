-- Serie: ein Tag Nachsicht, und jede Antwort zählt.
--
-- Bisher zwei Mängel: die Serie brach beim ersten verpassten Tag, und
-- hochgezählt wurde sie nur beim Öffnen einer Themenseite — eine ganze
-- Übungsrunde oder Prüfungssimulation verlängerte sie nicht.
-- Der zweite Teil steckt im Client (jede aufgezeichnete Antwort ruft die
-- Funktion), der erste hier.

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
          when s.last_active_date >= p_today      then s.current_streak
          -- bis zu zwei Tage Abstand: ein verpasster Tag wird verziehen
          when s.last_active_date >= p_today - 2  then s.current_streak + 1
          else 1
        end,
        longest_streak = greatest(
          s.longest_streak,
          case
            when s.last_active_date >= p_today     then s.current_streak
            when s.last_active_date >= p_today - 2 then s.current_streak + 1
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

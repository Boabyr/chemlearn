# Datenbank einrichten

## Normalfall: Migration einspielen

Im Supabase-Dashboard unter **SQL Editor** ausführen:

```
migrations/001_learning_engine.sql
```

Legt `attempts` (Antwort-Historie) und `reviews` (Wiederholungstermine) an.
Ohne diese beiden Tabellen bleiben Fälligkeitszähler, Schwächenanalyse und
Prüfungsreife auf null — die Anwendung läuft weiter, meldet die Fehler aber
nur in der Browser-Konsole.

Die Datei ist wiederholbar: sie legt nur an, was fehlt, und ersetzt
Richtlinien, statt sie doppelt anzulegen.

Danach: anmelden, eine Quizfrage beantworten, eine Karteikarte mit „Schwer"
bewerten. Im **Table Editor** muss dann stehen:

- `attempts` — eine Zeile je beantworteter Frage
- `reviews` — eine Zeile je bewerteter Karte, `due_at` in der Zukunft

## Wenn das Projekt pausiert ist

Supabase pausiert Projekte im kostenlosen Tarif nach längerer Untätigkeit.
Ein pausiertes Projekt ist **nicht** gelöscht, aber sein Hostname löst nicht
mehr auf — von außen sieht das aus wie ein verschwundenes Projekt:

```
$ getent hosts <ref>.supabase.co
(keine Auflösung)
```

Im Dashboard auf **Restore** klicken. Danach kommt zuerst der DNS-Eintrag
zurück, die Datenbank braucht noch ein bis zwei Minuten — in der Zwischenzeit
antwortet Cloudflare mit **HTTP 521**. Daten, Konten und Schema bleiben
vollständig erhalten.

Prüfen, ob sie wieder erreichbar ist:

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  "$VITE_SUPABASE_URL/rest/v1/progress?select=*&limit=1" \
  -H "apikey: $VITE_SUPABASE_ANON_KEY"
```

`200` heißt bereit, `521` heißt noch am Hochfahren.

## Notfall: Projekt neu aufbauen

Nur nötig, wenn das Projekt wirklich weg ist. Dann zuerst

```
migrations/000_base_schema.sql
```

einspielen, danach `001`. Das Grundschema ist aus dem Anwendungscode
rekonstruiert, nicht aus einem Backup — Spalten und Typen entsprechen dem,
was die Hooks und Komponenten tatsächlich lesen und schreiben.

**Nicht auf einem bestehenden Projekt ausführen.** Die Tabellen selbst
blieben zwar unberührt (`create table if not exists`), aber die Datei
ersetzt die Sicherheitsrichtlinien — auf einem gewachsenen Projekt kann das
Rechte verändern.

Nach dem Neuaufbau zusätzlich:

1. **Authentication → Sign In / Providers → Email** aktivieren
   (die Anmeldung nutzt `signInWithPassword` und `signUp`)
2. Neue Projekt-URL und `anon`-Schlüssel eintragen — lokal in `.env.local`
   **und** im Vercel-Projekt unter Settings → Environment Variables.
   Vite backt die Werte beim Bauen ein, es braucht also ein **neues
   Deployment**, kein bloßes Neustarten.
3. Sich selbst zum Admin machen:

```sql
insert into public.user_roles (user_id, role)
select id, 'admin' from auth.users where email = 'deine@adresse.tld';
```

Rollen werden absichtlich nur hier vergeben — die Richtlinie auf `user_roles`
erlaubt Lesen, aber kein Schreiben, sonst könnte sich jeder selbst befördern.

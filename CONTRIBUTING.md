**English** · [Deutsch](#mitmachen)

# Contributing to JobKompass

Corrections are the most valuable contribution here. Pay figures, admission
thresholds and market assessments go stale within a year, and a wrong number is
worse than a missing one — young people make decisions on these.

## Fixing an occupation entry

Occupation data lives in `src/data/occupations/`, grouped by field. Each entry is
plain, fully typed data — no code to touch.

1. Find the entry and change what is wrong.
2. Update `checkedAt` to today's date (`YYYY-MM-DD`).
3. Add or update a `sources` entry pointing at what you verified it against:
   BERUFENET, the Entgeltatlas, the BIBB training-pay datasets, a professional
   statute, or a chamber or association statistic. News articles are fine as a
   secondary source, never as the only one.
4. Run `npm run test:run`. The suite checks referential integrity, that all
   ratings stay within 0–10, that pay levels are in a plausible order, and that
   both languages are present everywhere.

Please keep both `de` and `en` filled in. An entry with only one language will
fail the tests.

## Adding an occupation

Add it to the file matching its field (or create a new one and register it in
`src/data/occupations/index.ts`), then it appears automatically in the
questionnaire, the overview and the comparison. Four rules:

- **Ratings are relative** to other occupations you can start between 16 and 25,
  not absolute. "8 out of 10 for job security" means "more secure than most", not
  "80 % guaranteed".
- **Write the warnings honestly.** The `warnings` and `notFor` fields are what
  make this tool useful rather than decorative. An entry where everything sounds
  great is not finished, and the test suite will reject it.
- **Name the money plainly.** If an occupation does not pay enough to live on
  alone in a city, say so in `warnings` and name the neighbouring occupation that
  pays the same inclination better. Nobody is helped by a friendly omission.
- **`firstSteps` must be things a 16-year-old can actually do this month.** A
  placement in the unpleasant season, a free course, a conversation with someone
  two years into the job. Not "inform yourself thoroughly".

## Changing questions or scoring

- Questions: `src/data/questions/` — `core.ts` (all modes), `focused.ts`,
  `deep.ts`. They are pure data; effects reference named requirements from
  `src/engine/requirements.ts`.
- Requirements: `src/engine/requirements.ts`. A new requirement must divide the
  data set — the tests reject one that matches every occupation or none, because
  it would fake a check in the result that never happens.
- Scoring: `src/engine/score.ts`. Changes here need a test in `score.test.ts`
  that pins the behaviour you intended.
- Reality checks: `src/data/flags.ts`. Every flag has to be triggered by at least
  one answer, or it is dead weight — the tests check that too.

## Before opening a pull request

```bash
npm run typecheck && npm run lint && npm run test:run && npm run build
```

---

# Mitmachen

Korrekturen sind hier der wertvollste Beitrag. Verdienstangaben,
Zulassungshürden und Markteinschätzungen veralten innerhalb eines Jahres, und
eine falsche Angabe ist schlimmer als eine fehlende – Jugendliche entscheiden
danach.

## Einen Berufseintrag korrigieren

Die Daten liegen in `src/data/occupations/`, nach Feldern gruppiert. Jeder
Eintrag ist reine, typisierte Datenstruktur – am Code muss nichts angefasst
werden.

1. Eintrag suchen und korrigieren.
2. `checkedAt` auf das heutige Datum setzen (`JJJJ-MM-TT`).
3. Unter `sources` ergänzen, wogegen du geprüft hast: BERUFENET, Entgeltatlas,
   BIBB-Datenblätter zur Ausbildungsvergütung, das einschlägige Berufsgesetz oder
   eine Statistik der Kammern und Verbände. Nachrichtenartikel sind als
   Zweitquelle in Ordnung, nie als einzige.
4. `npm run test:run` ausführen. Die Tests prüfen Verweise, den Wertebereich
   aller Bewertungen, die plausible Reihenfolge der Verdienststufen und die
   Vollständigkeit beider Sprachen.

Bitte immer `de` **und** `en` füllen – ein einsprachiger Eintrag fällt durch die
Tests.

## Einen Beruf ergänzen

In die Datei des passenden Feldes eintragen (oder eine neue anlegen und in
`src/data/occupations/index.ts` registrieren), dann erscheint er automatisch im
Fragebogen, in der Übersicht und im Vergleich. Vier Regeln:

- **Bewertungen sind relativ** zu anderen Berufen, die man mit 16 bis 25 beginnen
  kann, nicht absolut. „8 von 10 bei Arbeitsmarktlage" heißt „sicherer als die
  meisten", nicht „zu 80 % garantiert".
- **Warnungen ehrlich schreiben.** Die Felder `warnings` und `notFor` machen
  dieses Werkzeug erst nützlich statt dekorativ. Ein Eintrag, bei dem alles
  großartig klingt, ist nicht fertig – und fällt durch die Tests.
- **Das Geld klar benennen.** Wenn ein Beruf in einer Stadt nicht zum
  eigenständigen Leben reicht, steht das in `warnings`, samt dem Nachbarberuf, der
  dieselbe Neigung besser bezahlt. Mit einer freundlichen Auslassung ist niemandem
  geholfen.
- **`firstSteps` müssen Dinge sein, die ein Sechzehnjähriger diesen Monat tun
  kann.** Ein Praktikum in der unangenehmen Jahreszeit, ein kostenloser Kurs, ein
  Gespräch mit jemandem, der seit zwei Jahren dabei ist. Nicht „sich umfassend
  informieren".

## Fragen oder Bewertung ändern

- Fragen: `src/data/questions/` – `core.ts` (alle Modi), `focused.ts`, `deep.ts`.
  Reine Daten; die Wirkungen verweisen auf benannte Anforderungen aus
  `src/engine/requirements.ts`.
- Anforderungen: `src/engine/requirements.ts`. Eine neue Anforderung muss den
  Bestand teilen – die Tests lehnen eine ab, die auf alle oder auf keinen Beruf
  zutrifft, weil sie im Ergebnis eine Prüfung vortäuschen würde, die nicht
  stattfindet.
- Bewertung: `src/engine/score.ts`. Änderungen dort brauchen einen Test in
  `score.test.ts`, der das gewünschte Verhalten festhält.
- Realitätschecks: `src/data/flags.ts`. Jeder Hinweis muss von mindestens einer
  Antwort ausgelöst werden, sonst ist er toter Bestand – das prüfen die Tests
  ebenfalls.

## Vor einem Pull Request

```bash
npm run typecheck && npm run lint && npm run test:run && npm run build
```

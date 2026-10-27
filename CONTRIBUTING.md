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

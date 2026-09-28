**English** · [Deutsch](README.de.md)

# JobKompass

A bilingual career-orientation aid for people aged roughly 14 to 25 who are
facing the question of what comes after school. It asks about your interests,
your options and your life — and then explains every recommendation instead of
just printing a number. Including when the answer is uncomfortable.

**→ [technikweber.github.io/JobKompass](https://technikweber.github.io/JobKompass/)**

## What it does

- **Three depths.** Three short questions estimate whether you want the
  orientation path (12 questions), the focused path (24) or the fine-detail path
  (36), plus targeted follow-ups where an answer calls for one. Deliberately the
  reverse of the intuitive arrangement: whoever knows
  nothing yet gets the *short* questionnaire, because forty questions about shift
  models help nobody who has never been inside a company. The suggestion is only
  a suggestion — you can switch at any point, including mid-questionnaire,
  without losing answers.
- **100 researched occupations**, each with 49 attributes: minimum and typical
  school certificate, type and length of the training route, admission
  restrictions, aptitude tests, prerequisites, four pay levels from the first
  training year to the specialist ceiling, collective agreement coverage,
  working-time model, weekend and night work, physical *and* emotional strain,
  home working, travel, part-time and self-employment prospects, market trend,
  vacancies, applicant pressure, automation risk, plus 26 rated dimensions.
  Every entry cites its sources and carries a check date.
- **An interest profile that outlasts the result.** Alongside the ranked list, a
  picture of your six Holland-code dimensions emerges — the established model of
  career research, where people and activities are described on the same six
  axes. That picture stays valid even when the job at the top turns out to be
  wrong, which is the more useful half of the result for most 16-year-olds.
- **The route gets its own verdict.** An apprenticeship, a dual degree, a
  university, a voluntary year: the route decides the next three to six years
  more than the destination does — whether you earn money or pay semester fees,
  whether your day is fixed from 7 to 16 or consists of three lectures. So 12
  routes are modelled separately, with duration, pay, cost, dropout risk and the
  honest trade-offs, and the recommendation says whether the suggested route
  actually leads to the suggested job.
- **Traceable scoring.** For every result you can open the score breakdown and
  see which rating dimension contributed how many points. Occupations that were
  ruled out are listed separately, each with the specific requirement it failed.
- **Honest hard requirements.** If you say you need money from the first month,
  every unpaid route drops out — not merely down-ranks. Requirements are only
  relaxed when fewer than five occupations would remain, and the result names
  exactly which one was dropped.
- **What would tip the recommendation.** The questionnaire is recalculated once
  per answer option to show which single answer the whole result hangs on — and
  which skipped questions would change it.
- **Why not the job you had in mind?** Almost nobody arrives unbiased. A name is
  usually already in the room, because a parent said it or a friend is doing it.
  So you can put any of the 100 occupations against the recommendation and get
  the difference in the same numbers the recommendation came from — including the
  salary gap in euros.
- **23 reality checks.** The dropout rate of a degree, the actual numbers behind
  "something with animals" and "streaming as a career", the numerus clausus for
  medicine and the routes around it, what shift work costs your health, which
  dream jobs do not pay enough to live on and which neighbouring occupation pays
  the same inclination better, which allergies to test for before signing rather
  than three years later, and where the funding is that most people do not know
  exists.
- **Side-by-side comparison.** Tick occupations *and* training routes to compare
  up to six of each. They are compared in two separate tables, because they have
  different attributes and weighing both at once is a perfectly normal thing to
  be doing.
- **Shareable results.** Answers are encoded in the URL, so a result link
  reproduces the exact recommendation.
- German and English throughout, light and dark themes, keyboard accessible,
  prints cleanly to PDF, no sign-up, no cookies, no analytics, no external
  requests. The answers about health, money and psychological resilience never
  leave the browser.

## How the recommendation is produced

Every answer acts in four ways:

1. It **weights rating dimensions** — 26 of them, grouped into inclination
   (`practical` … `organising`), demands (`mathDemand`, `physicalDemand`,
   `precisionDemand` …), daily life (`peopleContact`, `calmPace`, `structure` …)
   and prospects (`jobSecurity`, `futureProof`, `salaryLevel`,
   `meaningfulness` …).
2. It can set a **hard requirement**, expressed as one of 59 named predicates
   over an occupation (`paid-training`, `no-night-work`, `low-physical`,
   `access-hauptschule`, `no-licence-needed`, …).
3. It contributes to the **interest profile** along the six Holland codes. The
   fit between inclination and activity predicts job satisfaction better than
   salary or status, which is why the interest questions carry the most weight.
4. It can **favour specific occupations or fields** when an answer points at
   them unambiguously — "I want to work with wood" describes joinery and
   carpentry, not a general preference.

The base score is a weighted average across the rating dimensions, normalised to
0–100 and then spread and soft-capped so that results do not all cluster in the
high nineties and 100 stays reserved for a theoretical perfect fit. Preference
and inclination bonuses are added on top with saturation, so a single strong
match cannot run away with the total while a genuinely defining answer still
wins. An occupation's first Holland code counts more than its third, so a job
that merely touches on social work is not the same hit as one that lives on it.

Only 12 rating dimensions can be inverted by a negative weight — the ones where
less genuinely can be what someone wants (`mathDemand`, `peopleContact`,
`physicalDemand`, `structure`, …). For the rest, a negative weight means "this
matters less to me", not "the worse the better", so it is clamped at zero:
nobody wishes for a job with no prospects.

See [`src/engine/score.ts`](src/engine/score.ts) for the implementation and
[`src/engine/score.test.ts`](src/engine/score.test.ts) for the behaviour that is
pinned by tests.

## About the figures, honestly

All pay figures are **rounded orientation values**: gross, per month, full-time,
Germany. Collective agreements, federal state, company size and sector shift
each of these by several hundred euros. The 0–10 ratings are editorial
assessments, relative to other occupations you can start between 16 and 25 — not
measurements. They exist to make occupations comparable with each other, not to
grade a single one in absolute terms.

The primary sources are BERUFENET and the Entgeltatlas of the Federal Employment
Agency, the training-pay datasets of the Federal Institute for Vocational
Education and Training (BIBB), the relevant professional statutes, and
statistics from the chambers and trade associations. Every occupation links its
own.

This tool does not replace careers advice. It should mean you arrive there with
better questions.

## Data

All occupation data lives in [`src/data/occupations/`](src/data/occupations/),
grouped by field, and is fully typed against
[`src/data/types.ts`](src/data/types.ts). Training routes are in
[`src/data/pathways.ts`](src/data/pathways.ts), the reality checks in
[`src/data/flags.ts`](src/data/flags.ts), the questionnaire in
[`src/data/questions/`](src/data/questions/).

Pay figures, admission thresholds and market assessments go stale quickly. If
you find something that is no longer correct, an issue or a pull request is the
fastest way to fix it.

## Development

```bash
npm install
npm run dev        # local dev server
npm run test:run   # data-integrity, scoring and pathway tests
npm run typecheck
npm run build      # production build into dist/
```

Deployment happens automatically: every push to `main` runs type checking, tests
and the build in GitHub Actions and publishes the result to GitHub Pages.

## Contributing

Corrections to pay figures, ratings or wording are explicitly welcome, as are
new occupations and translations. One rule matters more than the rest: **an entry
where everything sounds great is not finished.** The `warnings` and `notFor`
fields are what make this tool useful rather than decorative, and the test suite
enforces that both are filled. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Prior art

[BERUFE.TV](https://www.berufe.tv/) and the
[Check-U test](https://www.arbeitsagentur.de/bildung/welche-ausbildung-welches-studium-passt)
of the Federal Employment Agency showed that this kind of tool is needed.
JobKompass is an independent implementation with its own data set, its own
scoring logic and its own design. It is a sibling of
[LinuxKompass](https://github.com/TechnikWeber/LinuxKompass), which does the same
thing for Linux distributions.

## License

Code under the [MIT License](LICENSE). The occupation data in `src/data/` is
released under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) —
reuse it, but say where it came from.

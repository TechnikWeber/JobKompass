import { useMemo, useState } from 'react';
import { visibleQuestions } from '../data/questions';
import { scoreAll } from '../engine/score';
import { requirements } from '../engine/requirements';
import { trainingKindShort, useI18n } from '../i18n';
import { useApp, MAX_COMPARE } from '../state/app';
import { CompareToggle, Link, Monogram, formatEuro } from './common';
import { FlagList } from './FlagList';
import { ResultCard } from './ResultCard';
import { InterestProfileCard } from './InterestProfileCard';
import { PathwayPick } from './PathwayPick';
import { WhatWouldFlip } from './WhatWouldFlip';
import { WhyNot } from './WhyNot';

const TIE_THRESHOLD = 3;

/** Sichtbare Plätze der Rangliste, bevor „Mehr anzeigen" nötig wird. */
const VISIBLE_RANKS = 10;

export function ResultPage() {
  const { t, tl, lang } = useI18n();
  const { mode, answers, navigate, setMode, compare, shareUrl } = useApp();
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  const outcome = useMemo(() => scoreAll(mode, answers), [mode, answers]);
  const eligible = outcome.results.filter((r) => r.eligible);
  const excluded = outcome.results.filter((r) => !r.eligible);
  const answeredAny = Object.keys(answers).length > 0;

  const top = eligible[0];
  // Drei statt vier: Darunter steht ohnehin die vollständige Rangliste. Eine
  // vierte Karte wiederholt nur, was die Tabelle in einer Zeile sagt.
  const alternatives = eligible.slice(1, 4);
  const tied = top ? eligible.filter((r) => top.score - r.score <= TIE_THRESHOLD) : [];

  const confidenceText =
    outcome.confidence < 0.45
      ? t('resultConfidenceLow')
      : outcome.confidence < 0.75
        ? t('resultConfidenceMedium')
        : t('resultConfidenceHigh');

  const deeperMode = mode === 'orientation' ? 'focused' : mode === 'focused' ? 'deep' : null;
  const deeperLabel = deeperMode === 'focused' ? t('modeFocused') : t('modeDeep');

  // Nicht beantwortete Fragen benennen, statt sie stillschweigend zu übergehen.
  const unanswered = visibleQuestions(mode, answers).filter((q) => (answers[q.id] ?? []).length === 0);

  if (!answeredAny) {
    return (
      <section className="section">
        <div className="container container--narrow stack">
          <h1>{t('resultTitle')}</h1>
          <div className="callout callout--info">
            <p style={{ margin: 0 }}>
              {lang === 'de'
                ? 'Es liegen noch keine Antworten vor. Starte den Fragebogen, dann entsteht hier eine Empfehlung.'
                : 'There are no answers yet. Start the questionnaire and a recommendation will appear here.'}
            </p>
          </div>
          <div>
            <Link to={{ name: 'triage' }} className="btn btn--primary" fresh>
              {t('heroStart')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container stack stack-lg">
        <header className="stack">
          <h1 style={{ fontSize: 'var(--step-3)' }}>{t('resultTitle')}</h1>
          <p className="prose" style={{ color: 'var(--ink-muted)' }}>
            {t('resultLead')}
          </p>
        </header>

        {outcome.relaxed.length > 0 && (
          <div className="callout callout--warning">
            <h2 className="callout__title">{t('resultRelaxed')}</h2>
            <p style={{ color: 'var(--ink-muted)' }}>{t('resultRelaxedLead')}</p>
            <ul style={{ margin: 0 }}>
              {outcome.relaxed.map((id) => (
                <li key={id}>{tl(requirements.get(id)?.short)}</li>
              ))}
            </ul>
          </div>
        )}

        {eligible.length > 0 && eligible.length <= 6 && outcome.relaxed.length === 0 && (
          <div className="callout callout--info">
            <p style={{ margin: 0 }}>{t('resultNarrow', { n: eligible.length, total: outcome.results.length })}</p>
          </div>
        )}

        {/* Die Empfehlung zuerst. Verlässlichkeit, Kipp-Punkte und Gegenprobe
            beantworten alle dieselbe Frage – „wie sehr kann ich mich darauf
            verlassen?" – und stehen deshalb zusammen dahinter, nicht als Messuhr
            davor, an der man erst vorbeiscrollen muss. */}
        {top && <ResultCard result={top} rank={1} featured />}

        {tied.length > 1 && (
          <div className="callout callout--info">
            <p style={{ margin: 0 }}>
              {t('resultTiedWarning')} <strong>{tied.map((r) => r.occupation.name).join(' · ')}</strong>
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} className="no-print">
          <button type="button" className="btn btn--small" onClick={() => navigate({ name: 'quiz' })}>
            {t('resultRefine')}
          </button>
          {deeperMode && (
            <button
              type="button"
              className="btn btn--small"
              onClick={() => {
                setMode(deeperMode);
                navigate({ name: 'quiz' }, { mode: deeperMode });
              }}
            >
              {t('resultDeepen', { mode: deeperLabel })}
            </button>
          )}
          <button
            type="button"
            className="btn btn--small"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(shareUrl());
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2500);
              } catch {
                // Zwischenablage gesperrt: dann bleibt der Link in der Adresszeile.
              }
            }}
          >
            {copied ? t('resultShareCopied') : t('resultShare')}
          </button>
          <button type="button" className="btn btn--small" onClick={() => window.print()}>
            {t('resultPrint')}
          </button>
          {compare.length > 0 && (
            <Link to={{ name: 'compare' }} className="btn btn--small btn--primary">
              {t('compareOpen')} ({compare.length})
            </Link>
          )}
        </div>

        {/* Das Neigungsprofil steht bewusst weit oben und nicht als Anhang:
            Es ist der Teil des Ergebnisses, der auch dann noch gilt, wenn der
            Beruf ganz oben sich als falsch erweist. */}
        <InterestProfileCard profile={outcome.profile} />

        {/* Alles zum Nachprüfen an einer Stelle, das Aufwendige zugeklappt:
            Die Seite wächst um zwei Zeilen statt um zwei Kapitel, und gerechnet
            wird erst, wenn jemand es wissen will. */}
        {top && (
          <section className="stack">
            <h2 style={{ fontSize: 'var(--step-2)' }}>{t('verifyTitle')}</h2>
            <div className="card">
              <div className="meter">
                <span className="meter__label">{t('resultConfidence')}</span>
                <span className="meter__value">{Math.round(outcome.confidence * 100)} %</span>
                <div className="meter__track">
                  <div className="progress__fill" style={{ width: `${outcome.confidence * 100}%`, height: '100%' }} />
                </div>
              </div>
              <p style={{ marginTop: '0.6rem', marginBottom: 0, fontSize: 'var(--step--1)', color: 'var(--ink-muted)' }}>
                {confidenceText}
                {unanswered.length > 0 && (
                  <>
                    {' '}
                    {lang === 'de'
                      ? `${unanswered.length} Frage(n) sind noch offen.`
                      : `${unanswered.length} question(s) are still unanswered.`}
                  </>
                )}
              </p>
            </div>
            <WhatWouldFlip mode={mode} answers={answers} />
            <WhyNot top={top} results={outcome.results} />
          </section>
        )}

        {alternatives.length > 0 && (
          <section className="stack">
            <h2 style={{ fontSize: 'var(--step-2)' }}>{t('resultAlternatives')}</h2>
            <div className="grid grid--2">
              {alternatives.map((r, i) => (
                <ResultCard key={r.occupation.id} result={r} rank={i + 2} />
              ))}
            </div>
          </section>
        )}

        <PathwayPick mode={mode} answers={answers} topOccupation={top?.occupation} />

        {outcome.profile.flags.size > 0 && (
          <section className="stack">
            <h2 style={{ fontSize: 'var(--step-2)' }}>{t('resultFlagsTitle')}</h2>
            <p className="prose" style={{ color: 'var(--ink-muted)' }}>
              {t('resultFlagsLead')}
            </p>
            <FlagList ids={[...outcome.profile.flags]} />
          </section>
        )}

        {top && (
          <section className="stack">
            <h2 style={{ fontSize: 'var(--step-2)' }}>{t('resultNextStepsTitle')}</h2>
            <div className="grid grid--2">
              <div className="card">
                <h3 style={{ fontSize: 'var(--step-1)' }}>
                  {lang === 'de' ? 'In den nächsten Wochen' : 'In the next few weeks'}
                </h3>
                <ol>
                  <li>
                    {lang === 'de'
                      ? 'Ein Praktikum organisieren – möglichst zu einer unangenehmen Zeit: im November, an einem Samstag, im Abenddienst. Was man nicht erlebt hat, kann man nicht einschätzen.'
                      : 'Organise a placement — ideally at an awkward time: in November, on a Saturday, on an evening shift. You cannot assess what you have not experienced.'}
                  </li>
                  <li>
                    {lang === 'de'
                      ? 'Einen kostenlosen Termin bei der Berufsberatung der Arbeitsagentur machen. Sie rechnet konkret durch, welche Förderung dir zusteht.'
                      : 'Book a free appointment with the employment agency\'s careers advice service. They work out concretely what funding you are entitled to.'}
                  </li>
                  <li>
                    {lang === 'de'
                      ? 'Mit zwei Menschen sprechen, die den Beruf ausüben – und eine davon sollte erst seit zwei Jahren dabei sein.'
                      : 'Talk to two people doing the job — and one of them should have been in it for only two years.'}
                  </li>
                  <li>
                    {lang === 'de'
                      ? 'Die Lehrstellenbörse nach Postleitzahl durchsuchen: Das zeigt in fünf Minuten, was in deiner Umgebung tatsächlich erreichbar ist.'
                      : 'Search the apprenticeship listings by postcode: five minutes show what is actually reachable near you.'}
                  </li>
                </ol>
              </div>
              <div className="card">
                <h3 style={{ fontSize: 'var(--step-1)' }}>
                  {lang === 'de'
                    ? `So prüfst du, ob ${top.occupation.name} passt`
                    : `How to check whether ${top.occupation.name} fits`}
                </h3>
                <ol>
                  {(lang === 'de' ? top.occupation.firstSteps.de : top.occupation.firstSteps.en).map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* Rangliste und Ausgeschlossene sind beide Nachschlagematerial und
            hatten je eine eigene Überschrift. Zusammen ist es ein Abschnitt,
            und die lange Ausschlussliste bleibt zugeklappt. */}
        <section className="stack">
          <h2 style={{ fontSize: 'var(--step-2)' }}>{t('resultAllRanked')}</h2>
          <div className="tablewrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">{lang === 'de' ? 'Beruf' : 'Occupation'}</th>
                  <th scope="col">{t('points')}</th>
                  <th scope="col">{t('filterTrainingKind')}</th>
                  <th scope="col">{t('detailPayEntry')}</th>
                  <th scope="col" className="no-print">
                    {t('compareAdd')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {(showAll ? eligible : eligible.slice(0, VISIBLE_RANKS)).map((r, i) => (
                  <tr key={r.occupation.id}>
                    <td style={{ color: 'var(--ink-faint)', fontVariantNumeric: 'tabular-nums' }}>{i + 1}</td>
                    <th scope="row">
                      <span style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Monogram occupation={r.occupation} />
                        <Link to={{ name: 'occupation', id: r.occupation.id }}>{r.occupation.name}</Link>
                      </span>
                    </th>
                    <td style={{ fontVariantNumeric: 'tabular-nums' }}>{r.score}</td>
                    <td>{tl(trainingKindShort[r.occupation.trainingKind])}</td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                      {formatEuro(r.occupation.pay.entry, lang)} €
                    </td>
                    <td className="no-print">
                      <CompareToggle id={r.occupation.id} small />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {eligible.length > VISIBLE_RANKS && (
            <div className="no-print">
              <button type="button" className="btn btn--small" onClick={() => setShowAll((v) => !v)}>
                {showAll ? t('showLess') : `${t('showMore')} (${eligible.length - VISIBLE_RANKS})`}
              </button>
            </div>
          )}
          {compare.length >= MAX_COMPARE && (
            <p style={{ fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>{t('compareLimit')}</p>
          )}

          {excluded.length > 0 && (
            <details className="explainer explainer--wide">
              <summary>
                {t('resultExcluded')} ({excluded.length})
              </summary>
              <div className="stack stack-sm">
                <p style={{ margin: 0 }}>{t('resultExcludedLead')}</p>
                {excluded.map((r) => (
                  <div key={r.occupation.id} className="excluded-item">
                    <Link to={{ name: 'occupation', id: r.occupation.id }} style={{ minWidth: '11rem', fontWeight: 600 }}>
                      {r.occupation.name}
                    </Link>
                    <span style={{ color: 'var(--ink-muted)' }}>
                      {t('excludedBecause')}{' '}
                      {r.failed.map((f) => tl(requirements.get(f.requirementId)?.negated)).join(' · ')}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          )}
        </section>
      </div>
    </section>
  );
}

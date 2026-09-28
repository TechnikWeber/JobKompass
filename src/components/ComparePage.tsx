import { Fragment, useMemo, useState, type ReactNode } from 'react';
import { getOccupation } from '../data/occupations';
import { pathwayById } from '../data/pathways';
import type { Occupation, Pathway, RatingKey } from '../data/types';
import {
  automationLabels, competitionLabels, demandLabels, fieldLabels, outlookLabels, ratingLabels, remoteLabels,
  riasecLabels, schoolingLabels, strainLabels, trainingKindLabels, travelLabels, useI18n, workTimeLabels,
} from '../i18n';
import { useApp } from '../state/app';
import { Link, Monogram, formatEuro } from './common';

interface Row {
  label: string;
  /** Für den Unterschieds-Filter: normalisierte Werte. */
  keys: string[];
  cells: ReactNode[];
  group: string;
}

const RATING_ROWS: RatingKey[] = [
  'practical', 'analytical', 'creative', 'social', 'persuasive', 'organising',
  'mathDemand', 'languageDemand', 'scienceDemand', 'techDemand', 'physicalDemand', 'precisionDemand',
  'peopleContact', 'teamwork', 'variety', 'autonomy', 'outdoors', 'calmPace', 'structure',
  'jobSecurity', 'futureProof', 'advancement', 'workLifeBalance', 'salaryLevel', 'meaningfulness', 'entryEase',
];

export function ComparePage() {
  const { t, tl, lang } = useI18n();
  const { compare, comparePathways, toggleCompare, clearCompare } = useApp();
  const [onlyDiffs, setOnlyDiffs] = useState(false);

  const selected = useMemo(
    () => compare.map((id) => getOccupation(id)).filter((o): o is Occupation => Boolean(o)),
    [compare],
  );
  const selectedPathways = useMemo(
    () => comparePathways.map((id) => pathwayById.get(id)).filter((p): p is Pathway => Boolean(p)),
    [comparePathways],
  );

  const rows = useMemo<Row[]>(() => {
    if (selected.length === 0) return [];
    const yes = t('yes');
    const no = t('no');
    const bool = (v: boolean) => (v ? `✓ ${yes}` : `– ${no}`);
    const euro = (v: number | null) => (v === null ? '—' : `${formatEuro(v, lang)} €`);

    const make = (group: string, label: string, fn: (o: Occupation) => string): Row => {
      const values = selected.map(fn);
      return { group, label, keys: values, cells: values.map((v, i) => <span key={i}>{v}</span>) };
    };

    const basics: Row[] = [
      make('basics', t('filterField'), (o) => tl(fieldLabels[o.field])),
      make('basics', t('detailInterestCodes'), (o) => o.interestCodes.map((c) => tl(riasecLabels[c])).join(', ')),
      make('basics', t('filterTrainingKind'), (o) => tl(trainingKindLabels[o.trainingKind])),
      make('basics', t('detailTrainingYears'), (o) => t('detailYears', { n: o.trainingYears })),
      make('basics', tl({ de: 'Mindestabschluss', en: 'Minimum certificate' }), (o) => tl(schoolingLabels[o.minSchooling])),
      make('basics', tl({ de: 'Üblicher Abschluss', en: 'Usual certificate' }), (o) => tl(schoolingLabels[o.typicalSchooling])),
      make('basics', t('detailEntryTest'), (o) => bool(o.entryTest)),
      make('basics', t('detailAdmissionLimit'), (o) => (o.admissionLimit ? yes : no)),
      make('basics', t('detailShortenable'), (o) => bool(o.shortenable)),
    ];

    const pay: Row[] = [
      make('pay', tl({ de: 'Vergütung 1. Jahr', en: 'Pay, first year' }), (o) => euro(o.pay.trainingFirstYear)),
      make('pay', tl({ de: 'Vergütung letztes Jahr', en: 'Pay, final year' }), (o) => euro(o.pay.trainingLastYear)),
      make('pay', t('detailPayEntry'), (o) => euro(o.pay.entry)),
      make('pay', t('detailPayMedian'), (o) => euro(o.pay.median)),
      make('pay', t('detailPayTop'), (o) => euro(o.pay.top)),
      make('pay', tl({ de: 'Tarifvertrag üblich', en: 'Collective agreement usual' }), (o) => bool(o.collectiveAgreement)),
    ];

    const conditions: Row[] = [
      make('conditions', tl({ de: 'Arbeitszeit', en: 'Working hours' }), (o) => tl(workTimeLabels[o.workTimeModel])),
      make('conditions', tl({ de: 'Wochenendarbeit', en: 'Weekend work' }), (o) => bool(o.weekendWork)),
      make('conditions', tl({ de: 'Nachtarbeit', en: 'Night work' }), (o) => bool(o.nightWork)),
      make('conditions', tl({ de: 'Körperliche Belastung', en: 'Physical strain' }), (o) => tl(strainLabels[o.physicalStrain])),
      make('conditions', tl({ de: 'Seelische Belastung', en: 'Emotional strain' }), (o) => tl(strainLabels[o.emotionalStrain])),
      make('conditions', tl({ de: 'Homeoffice', en: 'Working from home' }), (o) => tl(remoteLabels[o.remote])),
      make('conditions', tl({ de: 'Reisen', en: 'Travel' }), (o) => tl(travelLabels[o.travel])),
      make('conditions', tl({ de: 'Teilzeit verbreitet', en: 'Part-time common' }), (o) => bool(o.partTimeCommon)),
      make('conditions', tl({ de: 'Selbstständigkeit üblich', en: 'Self-employment common' }), (o) => bool(o.selfEmploymentCommon)),
    ];

    const market: Row[] = [
      make('market', tl({ de: 'Entwicklung', en: 'Trend' }), (o) => tl(outlookLabels[o.marketOutlook])),
      make('market', tl({ de: 'Offene Stellen', en: 'Open positions' }), (o) => tl(demandLabels[o.demand])),
      make('market', tl({ de: 'Bewerberdruck', en: 'Applicant pressure' }), (o) => tl(competitionLabels[o.competition])),
      make('market', tl({ de: 'Automatisierungsrisiko', en: 'Automation risk' }), (o) => tl(automationLabels[o.automationRisk])),
    ];

    const ratings: Row[] = RATING_ROWS.map((key) => {
      const values = selected.map((o) => o.ratings[key]);
      const best = Math.max(...values);
      return {
        group: 'ratings',
        label: tl(ratingLabels[key]),
        keys: values.map(String),
        cells: values.map((v, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: '2.2ch', fontWeight: v === best ? 700 : 400 }}>{v}</span>
            <span className="meter__track" style={{ width: '4.5rem', gridColumn: 'auto' }}>
              <span
                className="meter__fill"
                style={{ display: 'block', width: `${v * 10}%`, background: v === best ? 'var(--accent)' : 'var(--rule-strong)' }}
              />
            </span>
          </span>
        )),
      };
    });

    return [...basics, ...pay, ...conditions, ...market, ...ratings];
  }, [selected, t, tl, lang]);

  const pathwayRows = useMemo<Row[]>(() => {
    if (selectedPathways.length === 0) return [];

    const make = (label: string, fn: (p: Pathway) => string): Row => {
      const values = selectedPathways.map(fn);
      return { group: 'pathway', label, keys: values, cells: values.map((v, i) => <span key={i}>{v}</span>) };
    };

    const numeric = (label: string, pick: (p: Pathway) => number, lowerIsBetter = false): Row => {
      const values = selectedPathways.map(pick);
      const best = lowerIsBetter ? Math.min(...values) : Math.max(...values);
      return {
        group: 'pathway',
        label,
        keys: values.map(String),
        cells: values.map((v, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: '2.2ch', fontWeight: v === best ? 700 : 400 }}>{v}</span>
            <span className="meter__track" style={{ width: '4.5rem', gridColumn: 'auto' }}>
              <span
                className="meter__fill"
                style={{ display: 'block', width: `${v * 10}%`, background: v === best ? 'var(--accent)' : 'var(--rule-strong)' }}
              />
            </span>
          </span>
        )),
      };
    };

    return [
      make(t('pathwayDuration'), (p) => tl(p.duration)),
      make(t('pathwayPaid'), (p) => (p.paid ? t('pathwayPaidYes') : t('pathwayPaidNo'))),
      make(t('pathwayCost'), (p) => tl(p.cost)),
      make(t('pathwayMinSchooling'), (p) => tl(schoolingLabels[p.minSchooling])),
      make(t('pathwayFeelsLike'), (p) => tl(p.feelsLike)),
      numeric(t('pathwayTheory'), (p) => p.theoryShare),
      numeric(t('pathwayPractice'), (p) => p.practiceShare),
      numeric(t('pathwayStructure'), (p) => p.structure),
      numeric(t('pathwaySpeed'), (p) => p.speedToWork),
      numeric(t('pathwayFlexibility'), (p) => p.flexibility),
      // Beim Abbruchrisiko ist niedrig besser; ohne diesen Schalter würde der
      // gefährlichste Weg fett hervorgehoben.
      numeric(t('pathwayDropout'), (p) => p.dropoutRisk, true),
    ];
  }, [selectedPathways, t, tl]);

  const groupTitles: Record<string, string> = {
    basics: lang === 'de' ? 'Grunddaten und Zugang' : 'Basics and access',
    pay: lang === 'de' ? 'Verdienst' : 'Pay',
    conditions: lang === 'de' ? 'Arbeitsbedingungen' : 'Working conditions',
    market: lang === 'de' ? 'Arbeitsmarkt' : 'Job market',
    ratings: t('detailRatings'),
    pathway: lang === 'de' ? 'Weg' : 'Route',
  };

  if (selected.length === 0 && selectedPathways.length === 0) {
    return (
      <section className="section">
        <div className="container container--narrow stack">
          <h1 style={{ fontSize: 'var(--step-3)' }}>{t('compareTitle')}</h1>
          <div className="callout callout--info">
            <p style={{ margin: 0 }}>{t('compareEmpty')}</p>
          </div>
          <div>
            <Link to={{ name: 'browse' }} className="btn btn--primary">
              {t('navBrowse')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const visibleRows = onlyDiffs ? rows.filter((r) => new Set(r.keys).size > 1) : rows;
  let lastGroup = '';

  return (
    <section className="section">
      <div className="container container--wide stack stack-lg">
        <header className="stack">
          <h1 style={{ fontSize: 'var(--step-3)' }}>{t('compareTitle')}</h1>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="chip">{t('compareCount', { n: selected.length + selectedPathways.length })}</span>
            <label style={{ display: 'inline-flex', gap: '0.4rem', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={onlyDiffs}
                onChange={(e) => setOnlyDiffs(e.target.checked)}
                style={{ width: 'auto' }}
              />
              {t('compareOnlyDiffs')}
            </label>
            <button type="button" className="btn btn--small btn--quiet" onClick={() => clearCompare()}>
              {t('compareClear')}
            </button>
          </div>
        </header>

        <p className="callout callout--info" style={{ fontSize: 'var(--step--1)' }}>
          {t('compareBothHint')}
        </p>

        {selected.length > 0 && (
          <section className="stack">
            <h2 style={{ fontSize: 'var(--step-2)' }}>{t('compareOccupations')}</h2>
            <div className="tablewrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col" style={{ minWidth: '12rem' }}>
                      &nbsp;
                    </th>
                    {selected.map((o) => (
                      <th key={o.id} scope="col" style={{ minWidth: '15rem' }}>
                        <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <Monogram occupation={o} />
                          <span style={{ minWidth: 0 }}>
                            <Link to={{ name: 'occupation', id: o.id }}>{o.name}</Link>
                            <button
                              type="button"
                              className="btn btn--quiet btn--small no-print"
                              onClick={() => toggleCompare(o.id)}
                              aria-label={`${t('compareRemove')}: ${o.name}`}
                              style={{ padding: '0 0.35em' }}
                            >
                              ✕
                            </button>
                          </span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleRows.map((row) => {
                    const differs = new Set(row.keys).size > 1;
                    const showGroup = row.group !== lastGroup;
                    lastGroup = row.group;
                    return (
                      <Fragment key={`${row.group}-${row.label}`}>
                        {showGroup && (
                          <tr>
                            <th
                              scope="row"
                              colSpan={selected.length + 1}
                              style={{
                                background: 'var(--paper-sunken)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.07em',
                                fontSize: 'var(--step--1)',
                                color: 'var(--ink-faint)',
                              }}
                            >
                              {groupTitles[row.group]}
                            </th>
                          </tr>
                        )}
                        <tr className={differs ? 'row--differs' : undefined}>
                          <th scope="row">{row.label}</th>
                          {row.cells.map((cell, i) => (
                            <td key={i}>{cell}</td>
                          ))}
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid grid--2">
              {selected.map((o) => (
                <article key={o.id} className="card">
                  <h2 style={{ fontSize: 'var(--step-1)' }}>{o.name}</h2>
                  <h3 style={{ fontSize: 'var(--step-0)', fontFamily: 'var(--font-body)', color: 'var(--ink-faint)' }}>
                    {t('detailWarnings')}
                  </h3>
                  <ul>
                    {(lang === 'de' ? o.warnings.de : o.warnings.en).map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {selectedPathways.length > 0 && (
          <section className="stack">
            <h2 style={{ fontSize: 'var(--step-2)' }}>{t('comparePathways')}</h2>
            <div className="tablewrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col" style={{ minWidth: '12rem' }}>
                      &nbsp;
                    </th>
                    {selectedPathways.map((p) => (
                      <th key={p.id} scope="col" style={{ minWidth: '14rem' }}>
                        <span style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span
                            aria-hidden="true"
                            style={{ width: '0.7rem', height: '0.7rem', borderRadius: 3, background: `hsl(${p.accent})`, flex: 'none' }}
                          />
                          {p.name}
                          <button
                            type="button"
                            className="btn btn--quiet btn--small no-print"
                            onClick={() => toggleCompare(p.id, 'pathway')}
                            aria-label={`${t('compareRemove')}: ${p.name}`}
                            style={{ padding: '0 0.35em' }}
                          >
                            ✕
                          </button>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pathwayRows.map((row) => {
                    const differs = new Set(row.keys).size > 1;
                    if (onlyDiffs && !differs) return null;
                    return (
                      <tr key={row.label} className={differs ? 'row--differs' : undefined}>
                        <th scope="row">{row.label}</th>
                        {row.cells.map((cell, i) => (
                          <td key={i}>{cell}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 'var(--step--1)', color: 'var(--ink-muted)' }}>
              <Link to={{ name: 'pathways' }}>{t('pathwayPickAll')}</Link>
            </p>
          </section>
        )}
      </div>
    </section>
  );
}

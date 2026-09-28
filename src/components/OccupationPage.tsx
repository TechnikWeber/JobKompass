import { getOccupation, occupations } from '../data/occupations';
import { pathwayById } from '../data/pathways';
import type { RatingKey } from '../data/types';
import {
  automationLabels, competitionLabels, demandLabels, fieldLabels, outlookLabels, ratingHelp, ratingLabels,
  remoteLabels, riasecHelp, riasecLabels, schoolingLabels, strainLabels, tagLabels, trainingKindLabels,
  travelLabels, useI18n, workTimeLabels, workplaceLabels,
} from '../i18n';
import { CompareToggle, Fact, Link, Meter, Monogram, PayLadder, YesNo } from './common';

/**
 * Gemeinsamer Maßstab für alle Gehaltsleitern.
 *
 * Ohne ihn setzte jeder Beruf seinen eigenen Höchstwert, und ein Balken bis zum
 * Rand hieße bei Friseur wie bei Arzt „viel". Der Maßstab ist das höchste
 * Spitzengehalt im Bestand – damit stimmen die Verhältnisse über alle Seiten.
 */
const PAY_SCALE = Math.max(...occupations.map((o) => o.pay.top));

/** Die Bewertungsdimensionen, nach Bedeutung gruppiert. */
const RATING_GROUPS: { titleDe: string; titleEn: string; keys: RatingKey[] }[] = [
  {
    titleDe: 'Neigung: Was macht man hier?',
    titleEn: 'Inclination: what do you do here?',
    keys: ['practical', 'analytical', 'creative', 'social', 'persuasive', 'organising'],
  },
  {
    titleDe: 'Anforderungen: Was wird verlangt?',
    titleEn: 'Demands: what is required?',
    keys: ['mathDemand', 'languageDemand', 'scienceDemand', 'techDemand', 'physicalDemand', 'precisionDemand'],
  },
  {
    titleDe: 'Alltag: Wie fühlt es sich an?',
    titleEn: 'Daily life: how does it feel?',
    keys: ['peopleContact', 'teamwork', 'variety', 'autonomy', 'outdoors', 'calmPace', 'structure'],
  },
  {
    titleDe: 'Perspektive: Was wird daraus?',
    titleEn: 'Prospects: what becomes of it?',
    keys: ['jobSecurity', 'futureProof', 'advancement', 'workLifeBalance', 'salaryLevel', 'meaningfulness', 'entryEase'],
  },
];

export function OccupationPage({ id }: { id: string }) {
  const { t, tl, tls, lang } = useI18n();
  const o = getOccupation(id);

  if (!o) {
    return (
      <section className="section">
        <div className="container container--narrow stack">
          <h1>{lang === 'de' ? 'Beruf nicht gefunden' : 'Occupation not found'}</h1>
          <div>
            <Link to={{ name: 'browse' }} className="btn btn--primary">
              {t('navBrowse')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const related = o.relatedIds.map((rid) => getOccupation(rid)).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <section className="section">
      <div className="container stack stack-lg">
        <header className="stack">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Monogram occupation={o} large />
            <div style={{ minWidth: 0, flex: '1 1 18rem' }}>
              <p style={{ margin: 0, fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>
                {tl(fieldLabels[o.field])}
              </p>
              <h1 style={{ fontSize: 'var(--step-3)', margin: '0.1rem 0 0.35rem' }}>{o.name}</h1>
              <p className="prose" style={{ margin: 0, color: 'var(--ink-muted)', fontSize: 'var(--step-1)' }}>
                {tl(o.tagline)}
              </p>
            </div>
          </div>

          <ul className="chiprow">
            <li className="chip chip--accent">{tl(trainingKindLabels[o.trainingKind])}</li>
            <li className="chip">{t('detailYears', { n: o.trainingYears })}</li>
            {o.interestCodes.map((code) => (
              <li key={code} className="chip" title={tl(riasecHelp[code])}>
                {tl(riasecLabels[code])}
              </li>
            ))}
            {o.tags
              .map((tag) => ({ tag, label: tl(tagLabels[tag]) }))
              .filter((entry) => entry.label)
              .map((entry) => (
                <li key={entry.tag} className="chip">
                  {entry.label}
                </li>
              ))}
          </ul>

          {o.aliases.length > 0 && (
            <p style={{ fontSize: 'var(--step--1)', color: 'var(--ink-faint)', margin: 0 }}>
              {t('detailAliases')}: {o.aliases.join(' · ')}
            </p>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} className="no-print">
            <CompareToggle id={o.id} />
            <a className="btn" href={o.infoUrl} target="_blank" rel="noreferrer noopener">
              {t('detailInfoLink')} <span aria-hidden="true">↗</span>
            </a>
            {o.videoUrl && (
              <a className="btn" href={o.videoUrl} target="_blank" rel="noreferrer noopener">
                {t('detailVideoLink')} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </header>

        <div className="grid grid--2">
          <section className="card stack">
            <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailAbout')}</h2>
            <p style={{ margin: 0 }}>{tl(o.description)}</p>
            <h3 style={{ fontSize: 'var(--step-0)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--ink-faint)', marginBottom: 0 }}>
              {t('detailDayInLife')}
            </h3>
            <ul style={{ margin: 0 }}>
              {tls(o.dayInLife).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section className="card stack">
            <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailPay')}</h2>
            <PayLadder occupation={o} scale={PAY_SCALE} />
            <p style={{ margin: 0, fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>{t('detailPayNote')}</p>
            <dl style={{ display: 'grid', gap: '0.6rem', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', margin: 0 }}>
              <Fact label={t('pathwayPaid')}>
                <YesNo value={(o.pay.trainingFirstYear ?? 0) > 0} />
              </Fact>
              <Fact label={tl({ de: 'Tarifvertrag üblich', en: 'Collective agreement usual' })}>
                <YesNo value={o.collectiveAgreement} />
              </Fact>
            </dl>
          </section>
        </div>

        <div className="grid grid--2">
          <section className="card stack">
            <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailAccess')}</h2>
            <dl style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', margin: 0 }}>
              <Fact label={tl({ de: 'Mindestens', en: 'At least' })}>{tl(schoolingLabels[o.minSchooling])}</Fact>
              <Fact label={tl({ de: 'Meistens haben Eingestellte', en: 'Most hires have' })}>
                {tl(schoolingLabels[o.typicalSchooling])}
              </Fact>
              <Fact label={t('detailTrainingYears')}>{t('detailYears', { n: o.trainingYears })}</Fact>
              <Fact label={t('detailShortenable')}>
                <YesNo value={o.shortenable} />
              </Fact>
              <Fact label={t('detailEntryTest')}>
                <YesNo value={o.entryTest} />
              </Fact>
              <Fact label={t('detailLicence')}>
                <YesNo value={o.licenceRequired} />
              </Fact>
            </dl>

            {o.admissionLimit && (
              <div className="callout callout--warning">
                <h3 className="callout__title">{t('detailAdmissionLimit')}</h3>
                <p style={{ margin: 0 }}>{tl(o.admissionLimit)}</p>
              </div>
            )}

            <h3 style={{ fontSize: 'var(--step-0)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--ink-faint)', marginBottom: 0 }}>
              {t('detailPrerequisites')}
            </h3>
            <ul style={{ margin: 0 }}>
              {tls(o.prerequisites).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <h3 style={{ fontSize: 'var(--step-0)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--ink-faint)', marginBottom: 0 }}>
              {t('detailPathways')}
            </h3>
            <ul className="chiprow">
              {o.pathways.map((pid) => {
                const p = pathwayById.get(pid);
                if (!p) return null;
                return (
                  <li key={pid}>
                    <a className="chip chip--accent" href={`#/pathways`}>
                      {p.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="card stack">
            <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailConditions')}</h2>
            <dl style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', margin: 0 }}>
              <Fact label={tl({ de: 'Arbeitszeit', en: 'Working hours' })}>{tl(workTimeLabels[o.workTimeModel])}</Fact>
              <Fact label={tl({ de: 'Wochenende', en: 'Weekends' })}>
                <YesNo value={!o.weekendWork} />
              </Fact>
              <Fact label={tl({ de: 'Nachtarbeit', en: 'Night work' })}>
                <YesNo value={!o.nightWork} />
              </Fact>
              <Fact label={tl({ de: 'Körperliche Belastung', en: 'Physical strain' })}>
                {tl(strainLabels[o.physicalStrain])}
              </Fact>
              <Fact label={tl({ de: 'Seelische Belastung', en: 'Emotional strain' })}>
                {tl(strainLabels[o.emotionalStrain])}
              </Fact>
              <Fact label={tl({ de: 'Homeoffice', en: 'Working from home' })}>{tl(remoteLabels[o.remote])}</Fact>
              <Fact label={tl({ de: 'Reisen', en: 'Travel' })}>{tl(travelLabels[o.travel])}</Fact>
              <Fact label={tl({ de: 'Teilzeit verbreitet', en: 'Part-time common' })}>
                <YesNo value={o.partTimeCommon} />
              </Fact>
              <Fact label={tl({ de: 'Selbstständigkeit üblich', en: 'Self-employment common' })}>
                <YesNo value={o.selfEmploymentCommon} />
              </Fact>
            </dl>
            <p style={{ margin: 0, fontSize: 'var(--step--1)', color: 'var(--ink-muted)' }}>
              <strong>{tl({ de: 'Arbeitsort', en: 'Workplace' })}:</strong>{' '}
              {o.workplaces.map((w) => tl(workplaceLabels[w])).join(', ')}
            </p>
          </section>
        </div>

        <section className="card stack">
          <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailMarket')}</h2>
          <dl style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', margin: 0 }}>
            <Fact label={tl({ de: 'Entwicklung', en: 'Trend' })}>{tl(outlookLabels[o.marketOutlook])}</Fact>
            <Fact label={tl({ de: 'Offene Stellen', en: 'Open positions' })}>{tl(demandLabels[o.demand])}</Fact>
            <Fact label={tl({ de: 'Bewerberdruck', en: 'Applicant pressure' })}>{tl(competitionLabels[o.competition])}</Fact>
            <Fact label={tl({ de: 'Automatisierungsrisiko', en: 'Automation risk' })}>
              {tl(automationLabels[o.automationRisk])}
            </Fact>
          </dl>
        </section>

        <div className="grid grid--2">
          <section className="card stack">
            <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailSkills')}</h2>
            <ul style={{ margin: 0 }}>
              {tls(o.skills).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <h3 style={{ fontSize: 'var(--step-0)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--ink-faint)', marginBottom: 0 }}>
              {t('detailSubjects')}
            </h3>
            <ul style={{ margin: 0 }}>
              {tls(o.schoolSubjects).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>

          <section className="stack">
            <div className="card">
              <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailBestFor')}</h2>
              <ul style={{ margin: 0 }}>
                {tls(o.bestFor).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailNotFor')}</h2>
              <ul style={{ margin: 0 }}>
                {tls(o.notFor).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Die Warnungen stehen bewusst prominent und nicht unten weggeräumt.
            Sie sind der Teil, an dem sich dieses Werkzeug von einer
            Werbebroschüre unterscheidet. */}
        {tls(o.warnings).length > 0 && (
          <section className="callout callout--warning">
            <h2 className="callout__title" style={{ fontSize: 'var(--step-1)' }}>
              {t('detailWarnings')}
            </h2>
            <ul style={{ margin: 0 }}>
              {tls(o.warnings).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="grid grid--2">
          <section className="card stack">
            <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailFirstSteps')}</h2>
            <ol style={{ margin: 0 }}>
              {tls(o.firstSteps).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
          </section>
          <section className="card stack">
            <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailAdvancement')}</h2>
            <ul style={{ margin: 0 }}>
              {tls(o.advancementPaths).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="stack">
          <h2 style={{ fontSize: 'var(--step-2)' }}>{t('detailRatings')}</h2>
          <div className="grid grid--2">
            {RATING_GROUPS.map((group) => (
              <div className="card stack stack-sm" key={group.titleDe}>
                <h3 style={{ fontSize: 'var(--step-0)', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--ink-faint)' }}>
                  {lang === 'de' ? group.titleDe : group.titleEn}
                </h3>
                {group.keys.map((key) => (
                  <div key={key}>
                    <Meter label={tl(ratingLabels[key])} value={o.ratings[key]} />
                    <p style={{ margin: '0.1rem 0 0', fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>
                      {tl(ratingHelp[key])}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="stack">
            <h2 style={{ fontSize: 'var(--step-2)' }}>{t('detailRelated')}</h2>
            <div className="grid grid--4">
              {related.map((r) => (
                <div key={r.id} className="card" style={{ display: 'grid', gap: '0.5rem', alignContent: 'start' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Monogram occupation={r} />
                    <strong style={{ minWidth: 0 }}>
                      <Link to={{ name: 'occupation', id: r.id }}>{r.name}</Link>
                    </strong>
                  </div>
                  <span style={{ fontSize: 'var(--step--1)', color: 'var(--ink-muted)' }}>{tl(r.tagline)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="stack stack-sm" style={{ fontSize: 'var(--step--1)', color: 'var(--ink-muted)' }}>
          <h2 style={{ fontSize: 'var(--step-1)' }}>{t('detailSources')}</h2>
          <p style={{ margin: 0 }}>
            {t('detailCheckedAt')}: <time dateTime={o.checkedAt}>{o.checkedAt}</time>
          </p>
          <ul className="chiprow">
            {o.sources.map((s) => (
              <li key={s.url}>
                <a className="chip" href={s.url} target="_blank" rel="noreferrer noopener">
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

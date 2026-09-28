import { pathways } from '../data/pathways';
import { occupations } from '../data/occupations';
import { schoolingLabels, trainingKindLabels, useI18n } from '../i18n';
import { CompareToggle, Link, Meter } from './common';

export function PathwaysPage() {
  const { t, tl, tls } = useI18n();

  return (
    <section className="section">
      <div className="container stack stack-lg">
        <header>
          <h1 style={{ fontSize: 'var(--step-3)' }}>{t('pathwaysTitle')}</h1>
          <p className="prose" style={{ color: 'var(--ink-muted)' }}>
            {t('pathwaysLead')}
          </p>
        </header>

        <div className="grid grid--2">
          {pathways.map((p) => {
            const leadsTo = occupations.filter((o) => o.pathways.includes(p.id)).slice(0, 5);
            return (
              <article key={p.id} className="card stack" id={p.id}>
                <header style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: '0.85rem',
                      height: '0.85rem',
                      borderRadius: 4,
                      background: `hsl(${p.accent})`,
                      flex: 'none',
                      marginTop: '0.35rem',
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <h2 style={{ fontSize: 'var(--step-1)', margin: 0 }}>{p.name}</h2>
                    <p style={{ margin: 0, color: 'var(--ink-muted)', fontSize: 'var(--step--1)' }}>{tl(p.tagline)}</p>
                  </div>
                </header>

                <p style={{ margin: 0 }}>{tl(p.description)}</p>

                <ul className="chiprow">
                  <li className="chip chip--accent">{tl(trainingKindLabels[p.kind])}</li>
                  <li className="chip">
                    {t('pathwayDuration')}: {tl(p.duration)}
                  </li>
                  <li className={`chip ${p.paid ? 'chip--positive' : 'chip--caution'}`}>
                    {p.paid ? t('pathwayPaidYes') : t('pathwayPaidNo')}
                  </li>
                  <li className="chip">
                    {t('pathwayMinSchooling')}: {tl(schoolingLabels[p.minSchooling])}
                  </li>
                </ul>

                <p style={{ margin: 0, fontSize: 'var(--step--1)', color: 'var(--ink-muted)' }}>
                  <strong>{t('pathwayCost')}:</strong> {tl(p.cost)}
                </p>

                <div className="stack stack-sm">
                  <Meter label={t('pathwayTheory')} value={p.theoryShare} />
                  <Meter label={t('pathwayPractice')} value={p.practiceShare} />
                  <Meter label={t('pathwayStructure')} value={p.structure} />
                  <Meter label={t('pathwaySpeed')} value={p.speedToWork} />
                  <Meter label={t('pathwayFlexibility')} value={p.flexibility} />
                  {/* Beim Abbruchrisiko ist ein hoher Wert schlecht. Der graue
                      Balken sagt das ohne Worte – ein grüner würde „gut" heißen. */}
                  <Meter label={t('pathwayDropout')} value={p.dropoutRisk} muted />
                </div>

                <div className="reasons">
                  <div>
                    <h4>{t('pathwayStrengths')}</h4>
                    <ul>
                      {tls(p.strengths).map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4>{t('pathwayTradeoffs')}</h4>
                    <ul>
                      {tls(p.tradeoffs).map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {leadsTo.length > 0 && (
                  <p style={{ margin: 0, fontSize: 'var(--step--1)', color: 'var(--ink-muted)' }}>
                    <strong>{t('pathwayUsedFor')}:</strong>{' '}
                    {leadsTo.map((o, i) => (
                      <span key={o.id}>
                        {i > 0 && ', '}
                        <Link to={{ name: 'occupation', id: o.id }}>{o.name}</Link>
                      </span>
                    ))}
                  </p>
                )}

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} className="no-print">
                  <CompareToggle id={p.id} kind="pathway" small />
                  <a className="btn btn--small" href={p.website} target="_blank" rel="noreferrer noopener">
                    {tl({ de: 'Mehr erfahren', en: 'Find out more' })} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import type { Occupation } from '../data/types';
import type { Answers, Mode } from '../data/questions';
import { pathwayById } from '../data/pathways';
import { pathwayFitsOccupation, scorePathways } from '../engine/pathway';
import { pathwayConcernLabels, pathwayReasonLabels, schoolingLabels, useI18n } from '../i18n';
import { CompareToggle, Link } from './common';

/**
 * Empfehlung eines Ausbildungswegs, bewusst getrennt von der Berufsliste – samt
 * dem Hinweis, ob dieser Weg zu dem empfohlenen Beruf überhaupt führt.
 */
export function PathwayPick({ mode, answers, topOccupation }: { mode: Mode; answers: Answers; topOccupation?: Occupation }) {
  const { t, tl, lang } = useI18n();
  const { results, answered } = scorePathways(mode, answers);

  // Ohne jede Angabe zum Weg wäre jede Aussage geraten.
  if (answered === 0) return null;

  const eligible = results.filter((r) => r.eligible);
  const best = eligible[0];
  if (!best) return null;
  const alternatives = eligible.slice(1, 4);

  const reasons = best.reasons.map((code) => tl(pathwayReasonLabels[code])).filter(Boolean);
  const joiner = lang === 'de' ? ' und ' : ' and ';
  const reasonText =
    reasons.length === 0
      ? null
      : reasons.length === 1
        ? reasons[0]
        : `${reasons.slice(0, -1).join(', ')}${joiner}${reasons[reasons.length - 1]}`;

  const sentence = reasonText
    ? t('pathwayPickSentence', { name: best.pathway.name, reasons: reasonText })
    : t('pathwayPickSentencePlain', { name: best.pathway.name });

  /*
   * Passt der Weg zum empfohlenen Beruf?
   *
   * Ohne diese Prüfung stünde „duale Ausbildung" neben einem Beruf, den es nur
   * als Studium gibt. Wenn es nicht passt, nennen wir den Weg, der bei diesem
   * Beruf tatsächlich üblich ist – das ist nützlicher als ein Widerspruch ohne
   * Auflösung.
   */
  let availability: string | null = null;
  if (topOccupation) {
    if (pathwayFitsOccupation(best.pathway.id, topOccupation)) {
      availability = t('pathwayPickFits', { occupation: topOccupation.name });
    } else {
      const usual = pathwayById.get(topOccupation.pathways[0] ?? '');
      if (usual) {
        availability = t('pathwayPickFitsNot', { occupation: topOccupation.name, other: usual.name });
      }
    }
  }

  return (
    <section className="stack">
      <h2 style={{ fontSize: 'var(--step-2)' }}>{t('pathwayPickTitle')}</h2>
      <p className="prose" style={{ color: 'var(--ink-muted)' }}>
        {t('pathwayPickLead')}
      </p>

      <div className="card card--raised stack">
        <p style={{ fontSize: 'var(--step-1)', fontFamily: 'var(--font-display)', margin: 0 }}>{sentence}</p>
        <p style={{ margin: 0, color: 'var(--ink-muted)' }}>{tl(best.pathway.description)}</p>

        <ul className="chiprow">
          <li className="chip">
            {t('pathwayDuration')}: {tl(best.pathway.duration)}
          </li>
          <li className={`chip ${best.pathway.paid ? 'chip--positive' : 'chip--caution'}`}>
            {t('pathwayPaid')}: {best.pathway.paid ? t('pathwayPaidYes') : t('pathwayPaidNo')}
          </li>
          <li className="chip">
            {t('pathwayMinSchooling')}: {tl(schoolingLabels[best.pathway.minSchooling])}
          </li>
          <li className="chip">
            {t('pathwayFeelsLike')}: {tl(best.pathway.feelsLike)}
          </li>
        </ul>

        {best.concerns.length > 0 && (
          <div className="callout callout--warning">
            <h3 className="callout__title">{t('pathwayPickCaveat')}</h3>
            <ul style={{ margin: 0 }}>
              {best.concerns.map((code) => (
                <li key={code}>{tl(pathwayConcernLabels[code])}</li>
              ))}
            </ul>
          </div>
        )}

        {availability && <p style={{ margin: 0 }}>{availability}</p>}

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} className="no-print">
          <CompareToggle id={best.pathway.id} kind="pathway" small />
          <Link to={{ name: 'pathways' }} className="btn btn--small">
            {t('pathwayPickAll')}
          </Link>
        </div>
      </div>

      {alternatives.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: 'var(--step-0)',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
              color: 'var(--ink-faint)',
            }}
          >
            {t('pathwayPickAlternatives')}
          </h3>
          <div className="grid grid--3">
            {alternatives.map((r) => (
              <div key={r.pathway.id} className="card" style={{ display: 'grid', gap: '0.5rem', alignContent: 'start' }}>
                <strong>{r.pathway.name}</strong>
                <span style={{ fontSize: 'var(--step--1)', color: 'var(--ink-muted)' }}>{tl(r.pathway.tagline)}</span>
                <div className="no-print">
                  <CompareToggle id={r.pathway.id} kind="pathway" small />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

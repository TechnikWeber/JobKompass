import type { OccupationResult, RatingContribution } from '../engine/score';
import type { Occupation, RatingKey } from '../data/types';
import { requirements } from '../engine/requirements';
import { ratingLabels, riasecLabels, tagLabels, trainingKindShort, useI18n } from '../i18n';
import { CompareToggle, Link, Monogram, formatEuro } from './common';

/*
 * Ausweichliste, wenn keine gewichtete Dimension die Schwelle in `score.ts`
 * reißt.
 *
 * Auch hier Dimensionen statt Fließtext aus `bestFor`/`notFor`: Neben Zeilen der
 * Form „Arbeitsmarktlage 9/10" liest sich ein ganzer Satz wie eine andere Art
 * von Aussage, obwohl beide dasselbe beantworten sollen. Nur weichere Schwelle –
 * und ausschließlich Dimensionen, die in den Antworten überhaupt ein Gewicht
 * haben. Eine 2/10 in Mathematik „spricht dagegen", wenn jemand ausdrücklich
 * nach wenig Mathematik gefragt hat, eben nicht.
 */
const CLEARLY_GOOD = 7;
const CLEARLY_WEAK = 5;

/** Bei negativem Gewicht ist ein niedriger Wert der erwünschte. */
function effectiveValue(weight: number, value: number): number {
  return weight < 0 ? 10 - value : value;
}

function fallbackRatings(breakdown: RatingContribution[], direction: 'high' | 'low', count: number): RatingKey[] {
  return breakdown
    .filter((b) =>
      direction === 'high'
        ? effectiveValue(b.weight, b.value) >= CLEARLY_GOOD
        : effectiveValue(b.weight, b.value) <= CLEARLY_WEAK,
    )
    .sort((a, b) => {
      const av = effectiveValue(a.weight, a.value);
      const bv = effectiveValue(b.weight, b.value);
      return direction === 'high' ? bv - av : av - bv;
    })
    .slice(0, count)
    .map((b) => b.key);
}

/** Eine Bewertungsdimension als Begründungszeile. */
function RatingReason({ occupation, rating, inverted }: { occupation: Occupation; rating: RatingKey; inverted: boolean }) {
  const { t, tl } = useI18n();
  return (
    <li>
      <span>
        {tl(ratingLabels[rating])}
        {/* Bei negativ gewichteten Dimensionen ist ein niedriger Wert der
            erwünschte: ohne diesen Zusatz stünde „Mathematik 2/10" scheinbar
            widersprüchlich unter „Spricht dafür". */}
        {inverted && <span style={{ color: 'var(--ink-faint)' }}> ({t('ratingLowWanted')})</span>}{' '}
        <span style={{ color: 'var(--ink-faint)' }}>{occupation.ratings[rating]}/10</span>
      </span>
    </li>
  );
}

/** Eine Empfehlung mit Begründung, Punkteherkunft und Warnungen. */
export function ResultCard({ result, rank, featured }: { result: OccupationResult; rank: number; featured?: boolean }) {
  // Die hervorgehobene Karte folgt direkt auf die h1 der Seite und muss deshalb
  // eine h2 sein; die Alternativen stehen unter einer eigenen h2.
  const Heading = featured ? 'h2' : 'h3';
  const { t, tl, tls, lang } = useI18n();
  const o = result.occupation;
  const top = result.breakdown.filter((b) => b.points > 0).slice(0, 5);
  const maxPoints = Math.max(1, ...top.map((b) => b.points));

  const weightOf = new Map(result.breakdown.map((b) => [b.key, b.weight]));
  const strengthKeys = result.strengths.length > 0 ? result.strengths : fallbackRatings(result.breakdown, 'high', 3);
  const weaknessKeys = result.weaknesses.length > 0 ? result.weaknesses : fallbackRatings(result.breakdown, 'low', 2);

  return (
    <article className={`card ${featured ? 'card--raised' : ''} result-card`}>
      <header className="result-card__head">
        <Monogram occupation={o} large={featured} />
        <div style={{ minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>
            {featured ? t('resultTopPick') : `#${rank}`}
          </p>
          <Heading className="result-card__title">
            <Link to={{ name: 'occupation', id: o.id }}>{o.name}</Link>
          </Heading>
          <p style={{ margin: 0, color: 'var(--ink-muted)' }}>{tl(o.tagline)}</p>
        </div>
        <div className="result-card__score">
          <div className="score">
            {result.score}
            <span className="score__unit">/100</span>
          </div>
        </div>
      </header>

      {featured && <p style={{ margin: 0 }}>{tl(o.description)}</p>}

      {/* Farbe hat hier eine feste Bedeutung, in jeder Ansicht dieselbe:
          grün mit Haken ist ein Treffer zu den eigenen Angaben, blau die
          Aussage über den Weg. Alles Übrige bleibt neutral. */}
      <ul className="chiprow">
        <li className="chip chip--accent">{tl(trainingKindShort[o.trainingKind])}</li>
        <li className="chip">{t('detailYears', { n: o.trainingYears })}</li>
        <li className="chip">
          {t('detailPayEntry')}: {formatEuro(o.pay.entry, lang)} {t('perMonth')}
        </li>
        {result.matchedCodes.slice(0, 2).map((code) => (
          <li key={code} className="chip chip--positive" title={t('resultMatchedCode')}>
            <span aria-hidden="true">✓</span>
            {tl(riasecLabels[code])}
          </li>
        ))}
        {result.matchedTags
          .map((tag) => ({ tag, label: tl(tagLabels[tag]) }))
          .filter((entry) => entry.label)
          .slice(0, 2)
          .map((entry) => (
            <li key={entry.tag} className="chip chip--positive" title={t('resultMatchedTag')}>
              <span aria-hidden="true">✓</span>
              {entry.label}
            </li>
          ))}
      </ul>

      <div className="reasons">
        <div>
          <h4>{t('resultStrengths')}</h4>
          {strengthKeys.length > 0 ? (
            <ul>
              {strengthKeys.map((k) => (
                <RatingReason key={k} occupation={o} rating={k} inverted={(weightOf.get(k) ?? 0) < 0} />
              ))}
            </ul>
          ) : (
            <p className="reasons__empty">{t('resultNothingFor')}</p>
          )}
        </div>
        <div>
          <h4>{t('resultWeaknesses')}</h4>
          {weaknessKeys.length > 0 ? (
            <ul>
              {weaknessKeys.map((k) => (
                <RatingReason key={k} occupation={o} rating={k} inverted={(weightOf.get(k) ?? 0) < 0} />
              ))}
            </ul>
          ) : (
            /* Leere Spalte sähe nach Fehler aus – und „nichts gefunden" ist
               hier eine Aussage, keine Lücke. */
            <p className="reasons__empty">{t('resultNothingAgainst')}</p>
          )}
        </div>
        {/* Eigene Spalte statt einer zweiten „Spricht dagegen"-Überschrift:
            hier geht es nicht um eine Schwäche des Berufs, sondern um einen
            Wunsch aus dem Fragebogen, den er nicht erfüllt. */}
        {result.missedPreferences.length > 0 && (
          <div>
            <h4>{t('resultOpenWishes')}</h4>
            <ul>
              {result.missedPreferences.slice(0, 3).map((id) => (
                <li key={id}>{tl(requirements.get(id)?.short)}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {featured && top.length > 0 && (
        <details className="explainer">
          <summary>{t('resultBreakdown')}</summary>
          <div className="stack stack-sm" style={{ maxWidth: 'none' }}>
            {top.map((b) => (
              <div key={b.key} className="meter">
                <span className="meter__label">
                  {tl(ratingLabels[b.key])}
                  <span style={{ color: 'var(--ink-faint)' }}> · {b.value}/10</span>
                </span>
                <span className="meter__value">+{b.points.toFixed(1)}</span>
                <div className="meter__track">
                  <div className="meter__fill" style={{ width: `${(b.points / maxPoints) * 100}%` }} />
                </div>
              </div>
            ))}
            {result.bonusPoints !== 0 && (
              <p style={{ fontSize: 'var(--step--1)', color: 'var(--ink-muted)', margin: '0.5rem 0 0' }}>
                {t('resultBonus')}: {result.bonusPoints > 0 ? '+' : ''}
                {result.bonusPoints} {t('points')}
              </p>
            )}
          </div>
        </details>
      )}

      {featured && tls(o.warnings).length > 0 && (
        <div className="callout callout--warning">
          <h3 className="callout__title">{t('detailWarnings')}</h3>
          <ul style={{ margin: 0 }}>
            {tls(o.warnings).map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} className="no-print">
        <Link to={{ name: 'occupation', id: o.id }} className="btn btn--small">
          {t('details')}
        </Link>
        <CompareToggle id={o.id} small />
        <a className="btn btn--small" href={o.infoUrl} target="_blank" rel="noreferrer noopener">
          {t('detailInfoLink')} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

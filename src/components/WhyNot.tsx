import { useMemo, useState } from 'react';
import { occupations, popularAlternatives } from '../data/occupations';
import { contrastOccupations, type ContrastLine } from '../engine/contrast';
import { requirements } from '../engine/requirements';
import type { OccupationResult } from '../engine/score';
import { ratingLabels, useI18n } from '../i18n';
import { Link, Monogram, formatEuro } from './common';

/** Ab hier gilt der Abstand nicht mehr als „gleichauf". */
const TIE_RANGE = 2;

function DeltaLines({ lines, heading }: { lines: ContrastLine[]; heading: string }) {
  const { tl, lang } = useI18n();
  if (lines.length === 0) return null;
  return (
    <div>
      <h4 className="whynot__heading">{heading}</h4>
      <ul className="whynot__list">
        {lines.map((line) => (
          <li key={line.key}>
            <span>{tl(ratingLabels[line.key])}</span>
            <span style={{ color: 'var(--ink-faint)', fontVariantNumeric: 'tabular-nums' }}>
              {line.value} {lang === 'de' ? 'statt' : 'instead of'} {line.referenceValue}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * „Warum nicht ein anderer Beruf?"
 *
 * Die Gegenprobe zur Empfehlung. Vorausgewählt sind die drei am häufigsten
 * genannten Berufe – ohne den empfohlenen, denn sich selbst gegenüberzustellen
 * sagt nichts. Wer einen anderen Namen im Kopf hat, findet ihn im Auswahlfeld
 * daneben.
 *
 * Alles ist bereits gerechnet: `results` enthält auch die ausgeschlossenen
 * Berufe samt Punkteherkunft. Hier wird nur verglichen, nicht neu bewertet –
 * deshalb kostet das Aufklappen nichts.
 */
export function WhyNot({ top, results }: { top: OccupationResult; results: OccupationResult[] }) {
  const { t, tl, lang } = useI18n();
  const [pickedId, setPickedId] = useState<string | null>(null);

  const presets = useMemo(() => popularAlternatives([top.occupation.id]), [top.occupation.id]);
  const picked = pickedId ? results.find((r) => r.occupation.id === pickedId) : undefined;
  const contrast = useMemo(() => (picked ? contrastOccupations(top, picked) : null), [top, picked]);

  const sorted = useMemo(
    () => [...occupations].filter((o) => o.id !== top.occupation.id).sort((a, b) => a.name.localeCompare(b.name, lang)),
    [top.occupation.id, lang],
  );

  return (
    <details className="explainer explainer--wide" onToggle={(e) => !e.currentTarget.open && setPickedId(null)}>
      <summary>{t('whyNotTitle')}</summary>
      <div className="stack stack-sm">
        <p style={{ margin: 0 }}>{t('whyNotLead')}</p>

        <div className="whynot__pick">
          <span className="whynot__heading">{t('whyNotPopular')}</span>
          {presets.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`btn btn--small${pickedId === o.id ? ' btn--primary' : ''}`}
              aria-pressed={pickedId === o.id}
              onClick={() => setPickedId(pickedId === o.id ? null : o.id)}
            >
              {o.name}
            </button>
          ))}
          <label className="visually-hidden" htmlFor="whynot-other">
            {t('whyNotOther')}
          </label>
          <select
            id="whynot-other"
            value={presets.some((o) => o.id === pickedId) ? '' : (pickedId ?? '')}
            onChange={(e) => setPickedId(e.target.value || null)}
          >
            <option value="">{t('whyNotOther')} …</option>
            {sorted.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        {picked && contrast && (
          <div className="card whynot__result">
            <div className="whynot__head">
              <Monogram occupation={picked.occupation} />
              <strong>
                <Link to={{ name: 'occupation', id: picked.occupation.id }}>{picked.occupation.name}</Link>{' '}
                <span style={{ color: 'var(--ink-faint)', fontWeight: 400 }}>
                  {t('whyNotVersus', { name: top.occupation.name })}
                </span>
              </strong>
              <span className="whynot__score">
                {picked.score} : {top.score}
              </span>
            </div>

            {!picked.eligible && (
              <div className="callout callout--critical">
                <p style={{ margin: '0 0 0.4rem' }}>{t('whyNotFails')}</p>
                <ul style={{ margin: 0 }}>
                  {contrast.failedRequirementIds.map((id) => (
                    <li key={id}>{tl(requirements.get(id)?.short)}</li>
                  ))}
                </ul>
              </div>
            )}

            <p style={{ margin: 0 }}>
              {!picked.eligible && contrast.scoreDelta > 0
                ? t('whyNotAheadButOut', { n: contrast.scoreDelta })
                : Math.abs(contrast.scoreDelta) <= TIE_RANGE
                  ? t('whyNotTied', { name: top.occupation.name })
                  : t('whyNotBehind', { n: Math.abs(contrast.scoreDelta), name: top.occupation.name })}
            </p>

            {/* Das Gehalt ist bei der Berufswahl der Punkt, über den später am
                häufigsten gestritten wird. Deshalb steht er hier als Zahl und
                nicht nur als Bewertungsdimension. */}
            <ul className="whynot__list">
              <li>
                <span>{t('whyNotPayEntry')}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ink-faint)' }}>
                  {formatEuro(picked.occupation.pay.entry, lang)} € {lang === 'de' ? 'statt' : 'instead of'}{' '}
                  {formatEuro(top.occupation.pay.entry, lang)} €
                </span>
              </li>
              <li>
                <span>{t('whyNotPayMedian')}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--ink-faint)' }}>
                  {formatEuro(picked.occupation.pay.median, lang)} € {lang === 'de' ? 'statt' : 'instead of'}{' '}
                  {formatEuro(top.occupation.pay.median, lang)} €
                </span>
              </li>
            </ul>

            <div className="whynot__columns">
              <DeltaLines lines={contrast.worse} heading={t('whyNotWorse')} />
              <DeltaLines lines={contrast.better} heading={t('whyNotBetter')} />
            </div>

            {contrast.missesInstead.length > 0 && (
              <div>
                <h4 className="whynot__heading">{t('whyNotMisses', { name: top.occupation.name })}</h4>
                <ul className="whynot__list">
                  {contrast.missesInstead.slice(0, 4).map((id) => (
                    <li key={id}>{tl(requirements.get(id)?.short)}</li>
                  ))}
                </ul>
              </div>
            )}

            {contrast.meetsExtra.length > 0 && (
              <div>
                <h4 className="whynot__heading">{t('whyNotExtra', { name: top.occupation.name })}</h4>
                <ul className="whynot__list">
                  {contrast.meetsExtra.slice(0, 4).map((id) => (
                    <li key={id}>{tl(requirements.get(id)?.short)}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </details>
  );
}

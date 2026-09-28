import type { ReactNode } from 'react';
import type { Occupation } from '../data/types';
import { useApp, type CompareKind, type Route } from '../state/app';
import { useI18n } from '../i18n';

/**
 * Interner Link, der über den Hash-Router navigiert.
 *
 * `fresh` kennzeichnet die Einstiege in den Fragebogen: Wer ihn öffnet, will von
 * vorn anfangen und nicht die Antworten von vorhin vorfinden. Wer schon
 * mittendrin ist, öffnet ihn nicht neu – dort bleibt alles stehen, sonst löschte
 * ein Fehlklick in der Navigation die halbe Arbeit.
 */
export function Link({
  to, children, className, withState, fresh, ...rest
}: {
  to: Route;
  children: ReactNode;
  className?: string;
  withState?: boolean;
  fresh?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  const { navigate, route, reset } = useApp();
  const isCurrent = route.name === to.name && (to.name !== 'occupation' || (route as { id?: string }).id === to.id);
  return (
    <a
      href="#"
      className={className}
      aria-current={isCurrent ? 'page' : undefined}
      onClick={(e) => {
        e.preventDefault();
        const restart = Boolean(fresh) && route.name !== 'triage' && route.name !== 'quiz';
        if (restart) reset();
        navigate(to, {
          ...(withState === undefined ? undefined : { withState }),
          // Der Reducer läuft erst nach dem Klick: Ohne diese Mitgabe stünden
          // die verworfenen Antworten noch in der Adresszeile.
          ...(restart ? { answers: {} } : undefined),
        });
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Monogram({ occupation, large }: { occupation: Occupation; large?: boolean }) {
  return (
    <span
      className={`monogram${large ? ' monogram--lg' : ''}`}
      style={{ ['--brand' as string]: occupation.accent }}
      aria-hidden="true"
    >
      {occupation.monogram}
    </span>
  );
}

/** Waagerechter Balken für einen Wert von 0–10. */
export function Meter({ label, value, max = 10, muted }: { label: string; value: number; max?: number; muted?: boolean }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="meter">
      <span className="meter__label">{label}</span>
      <span className="meter__value">
        {value}
        <span aria-hidden="true">/{max}</span>
      </span>
      <div className="meter__track" role="img" aria-label={`${label}: ${value} / ${max}`}>
        <div className={`meter__fill${muted ? ' meter__fill--muted' : ''}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt style={{ fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>{label}</dt>
      <dd style={{ margin: '0.1rem 0 0' }}>{children}</dd>
    </div>
  );
}

export function YesNo({ value }: { value: boolean }) {
  const { t } = useI18n();
  return (
    <span className={`chip ${value ? 'chip--positive' : ''}`}>
      {value ? '✓' : '–'} {value ? t('yes') : t('no')}
    </span>
  );
}

/** Euro-Betrag in der Schreibweise, die überall im Projekt gilt. */
export function formatEuro(value: number, lang: 'de' | 'en'): string {
  return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB', { maximumFractionDigits: 0 }).format(value);
}

/**
 * Die Gehaltsleiter eines Berufs.
 *
 * Alle Balken teilen denselben Maßstab, der von außen kommt – sonst sähe jedes
 * Gehalt gleich gut aus, weil jeder Beruf seinen eigenen Höchstwert setzt. Auf
 * der Detailseite ist der Maßstab der Höchstwert über alle Berufe, damit ein
 * Vergleich im Kopf überhaupt möglich ist.
 */
export function PayLadder({ occupation, scale }: { occupation: Occupation; scale: number }) {
  const { t, lang } = useI18n();
  const { pay } = occupation;
  const rows: { label: string; value: number | null }[] = [
    { label: t('detailPayTraining'), value: pay.trainingFirstYear },
    { label: t('detailPayEntry'), value: pay.entry },
    { label: t('detailPayMedian'), value: pay.median },
    { label: t('detailPayTop'), value: pay.top },
  ];

  return (
    <div className="payladder">
      {rows.map((row) => (
        <div className="payladder__row" key={row.label}>
          <span className="payladder__label">{row.label}</span>
          <span className="payladder__bar">
            <span
              className="payladder__fill"
              style={{ width: row.value === null ? '0%' : `${Math.min(100, (row.value / scale) * 100)}%` }}
            />
          </span>
          <span className="payladder__value">
            {row.value === null ? '—' : `${formatEuro(row.value, lang)} €`}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Häkchen, um einen Beruf in die engere Wahl zu legen. */
export function CompareToggle({ id, small, kind = 'occupation' }: { id: string; small?: boolean; kind?: CompareKind }) {
  const { compare, comparePathways, toggleCompare } = useApp();
  const { t } = useI18n();
  const active = (kind === 'pathway' ? comparePathways : compare).includes(id);
  return (
    <button
      type="button"
      className={`btn${small ? ' btn--small' : ''}${active ? ' btn--primary' : ''}`}
      aria-pressed={active}
      onClick={(e) => {
        e.stopPropagation();
        toggleCompare(id, kind);
      }}
    >
      <span aria-hidden="true">{active ? '☑' : '☐'}</span>
      {active ? t('compareAdded') : t('compareAdd')}
    </button>
  );
}

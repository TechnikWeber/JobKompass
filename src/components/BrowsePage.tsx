import { useMemo, useState } from 'react';
import { occupations } from '../data/occupations';
import { SCHOOLING_ORDER, type Field, type Occupation, type RiasecCode, type Schooling, type TrainingKind } from '../data/types';
import { fieldLabels, riasecLabels, schoolingLabels, trainingKindLabels, trainingKindShort, useI18n } from '../i18n';
import { CompareToggle, Link, Monogram, formatEuro } from './common';

type SortKey = 'name' | 'pay' | 'security' | 'entryEase' | 'trainingYears';

const FIELDS = [...new Set(occupations.map((o) => o.field))].sort() as Field[];
const KINDS = [...new Set(occupations.map((o) => o.trainingKind))].sort() as TrainingKind[];
const CODES: RiasecCode[] = ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'];
/** Nur die Abschlüsse, die als Zugangsvoraussetzung vorkommen. */
const SCHOOLINGS: Schooling[] = ['none', 'hauptschule', 'realschule', 'fachhochschulreife', 'abitur'];

function OccupationTile({ occupation }: { occupation: Occupation }) {
  const { tl, t, lang } = useI18n();
  return (
    <article className="card" style={{ display: 'grid', gap: '0.75rem', alignContent: 'start' }}>
      <header style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
        <Monogram occupation={occupation} />
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: 'var(--step-1)', margin: 0 }}>
            <Link to={{ name: 'occupation', id: occupation.id }}>{occupation.name}</Link>
          </h3>
          <p style={{ margin: 0, fontSize: 'var(--step--1)', color: 'var(--ink-faint)' }}>
            {tl(fieldLabels[occupation.field])}
          </p>
        </div>
      </header>
      <p style={{ margin: 0, color: 'var(--ink-muted)', fontSize: 'var(--step--1)' }}>{tl(occupation.tagline)}</p>
      <ul className="chiprow">
        <li className="chip chip--accent">{tl(trainingKindShort[occupation.trainingKind])}</li>
        <li className="chip">{t('detailYears', { n: occupation.trainingYears })}</li>
        <li className="chip">
          {formatEuro(occupation.pay.entry, lang)} {t('perMonth')}
        </li>
      </ul>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
        <Link to={{ name: 'occupation', id: occupation.id }} className="btn btn--small">
          {t('details')}
        </Link>
        <CompareToggle id={occupation.id} small />
      </div>
    </article>
  );
}

export function BrowsePage() {
  const { t, tl, lang } = useI18n();
  const [query, setQuery] = useState('');
  const [field, setField] = useState('');
  const [kind, setKind] = useState('');
  const [schooling, setSchooling] = useState('');
  const [code, setCode] = useState('');
  const [minPay, setMinPay] = useState(0);
  const [sort, setSort] = useState<SortKey>('name');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const schoolingLimit = schooling ? SCHOOLING_ORDER.indexOf(schooling as Schooling) : -1;

    const list = occupations.filter((o) => {
      if (field && o.field !== field) return false;
      if (kind && o.trainingKind !== kind) return false;
      if (code && !o.interestCodes.includes(code as RiasecCode)) return false;
      if (schoolingLimit >= 0 && SCHOOLING_ORDER.indexOf(o.minSchooling) > schoolingLimit) return false;
      if (o.pay.entry < minPay) return false;
      if (!q) return true;
      // Die Aliasse sind hier entscheidend: Jugendliche suchen „Metzger",
      // „Krankenschwester" oder „Programmierer" und nicht nach der amtlichen
      // Berufsbezeichnung.
      const haystack = [o.name, o.id, o.tagline[lang], o.description[lang], ...o.aliases, ...o.tags]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });

    return list.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name, lang);
        case 'pay':
          return b.pay.entry - a.pay.entry || a.name.localeCompare(b.name, lang);
        case 'security':
          return b.ratings.jobSecurity - a.ratings.jobSecurity || a.name.localeCompare(b.name, lang);
        case 'entryEase':
          return b.ratings.entryEase - a.ratings.entryEase || a.name.localeCompare(b.name, lang);
        case 'trainingYears':
          return a.trainingYears - b.trainingYears || a.name.localeCompare(b.name, lang);
        default:
          return 0;
      }
    });
  }, [query, field, kind, schooling, code, minPay, sort, lang]);

  const reset = () => {
    setQuery('');
    setField('');
    setKind('');
    setSchooling('');
    setCode('');
    setMinPay(0);
  };

  return (
    <section className="section">
      <div className="container stack stack-lg">
        <header>
          <h1 style={{ fontSize: 'var(--step-3)' }}>{t('browseTitle')}</h1>
          <p className="prose" style={{ color: 'var(--ink-muted)' }}>
            {t('browseLead', { n: occupations.length })}
          </p>
        </header>

        <div className="card" style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label htmlFor="search">{t('search')}</label>
            <input
              id="search"
              type="search"
              value={query}
              placeholder={t('searchPlaceholder')}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="grid grid--4" style={{ gap: '0.75rem' }}>
            <div>
              <label htmlFor="f-field">{t('filterField')}</label>
              <select id="f-field" value={field} onChange={(e) => setField(e.target.value)}>
                <option value="">{t('filterAll')}</option>
                {FIELDS.map((f) => (
                  <option key={f} value={f}>
                    {tl(fieldLabels[f])}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-kind">{t('filterTrainingKind')}</label>
              <select id="f-kind" value={kind} onChange={(e) => setKind(e.target.value)}>
                <option value="">{t('filterAll')}</option>
                {KINDS.map((k) => (
                  <option key={k} value={k}>
                    {tl(trainingKindLabels[k])}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-schooling">{t('filterSchooling')}</label>
              <select id="f-schooling" value={schooling} onChange={(e) => setSchooling(e.target.value)}>
                <option value="">{t('filterAll')}</option>
                {SCHOOLINGS.map((s) => (
                  <option key={s} value={s}>
                    {tl(schoolingLabels[s])}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-code">{t('filterInterest')}</label>
              <select id="f-code" value={code} onChange={(e) => setCode(e.target.value)}>
                <option value="">{t('filterAll')}</option>
                {CODES.map((c) => (
                  <option key={c} value={c}>
                    {tl(riasecLabels[c])}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="f-pay">
                {t('filterMinPay')}: {formatEuro(minPay, lang)} €
              </label>
              <input
                id="f-pay"
                type="range"
                min={0}
                max={5000}
                step={250}
                value={minPay}
                onChange={(e) => setMinPay(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div>
              <label htmlFor="f-sort">{t('sortBy')}</label>
              <select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                <option value="name">{t('sortName')}</option>
                <option value="pay">{t('sortPay')}</option>
                <option value="security">{t('sortSecurity')}</option>
                <option value="entryEase">{t('sortEntryEase')}</option>
                <option value="trainingYears">{t('sortTrainingYears')}</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span className="chip">{t('resultsCount', { n: filtered.length })}</span>
            <button type="button" className="btn btn--small btn--quiet" onClick={reset}>
              {t('filtersReset')}
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p>{t('noResults')}</p>
        ) : (
          <div className="grid grid--3">
            {filtered.map((o) => (
              <OccupationTile key={o.id} occupation={o} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

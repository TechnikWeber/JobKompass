import { getOccupation } from '../data/occupations';
import { pathwayById } from '../data/pathways';
import { useI18n } from '../i18n';
import { useApp } from '../state/app';
import { Link } from './common';

/** Feste Leiste am unteren Rand, solange etwas in der engeren Wahl liegt. */
export function CompareTray() {
  const { compare, comparePathways, toggleCompare, clearCompare, route } = useApp();
  const { t } = useI18n();

  const total = compare.length + comparePathways.length;
  if (total === 0 || route.name === 'compare') return null;

  return (
    <div className="traybar no-print">
      <div className="container traybar__inner">
        <span className="chip chip--accent">{t('compareCount', { n: total })}</span>
        <ul className="traybar__items">
          {compare.map((id) => {
            const o = getOccupation(id);
            if (!o) return null;
            return (
              <li key={`o-${id}`}>
                <button type="button" className="chip" onClick={() => toggleCompare(id, 'occupation')} title={t('compareRemove')}>
                  {o.name} <span aria-hidden="true">✕</span>
                </button>
              </li>
            );
          })}
          {comparePathways.map((id) => {
            const p = pathwayById.get(id);
            if (!p) return null;
            return (
              <li key={`p-${id}`}>
                <button
                  type="button"
                  className="chip chip--accent"
                  onClick={() => toggleCompare(id, 'pathway')}
                  title={t('compareRemove')}
                >
                  {p.name} <span aria-hidden="true">✕</span>
                </button>
              </li>
            );
          })}
        </ul>
        <button type="button" className="btn btn--small btn--quiet" onClick={() => clearCompare()}>
          {t('compareClear')}
        </button>
        <Link to={{ name: 'compare' }} className="btn btn--small btn--primary">
          {t('compareOpen')}
        </Link>
      </div>
    </div>
  );
}

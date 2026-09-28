import type { Profile } from '../engine/score';
import { interestProfile } from '../engine/score';
import { riasecHelp, riasecLabels, useI18n } from '../i18n';

/**
 * Das Neigungsprofil als eigener Abschnitt.
 *
 * Die Berufsliste kann falsch sein – dieses Bild bleibt brauchbar. Wer mit
 * sechzehn erfährt, dass er stark gestaltend und schwach ordnend veranlagt ist,
 * kann damit auch in fünf Jahren noch etwas anfangen, wenn der empfohlene Beruf
 * längst verworfen ist. Deshalb steht es gleichwertig neben der Empfehlung und
 * nicht als Fußnote darunter.
 */
export function InterestProfileCard({ profile }: { profile: Profile }) {
  const { t, tl } = useI18n();
  const rows = interestProfile(profile);

  return (
    <section className="stack">
      <h2 style={{ fontSize: 'var(--step-2)' }}>{t('interestTitle')}</h2>
      <p className="prose" style={{ color: 'var(--ink-muted)' }}>
        {t('interestLead')}
      </p>
      <div className="card">
        {rows.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--ink-muted)' }}>{t('interestEmpty')}</p>
        ) : (
          <div className="riasec">
            {rows.map((row) => (
              <div className="riasec__row" key={row.code}>
                <span className="riasec__name">{tl(riasecLabels[row.code])}</span>
                <span className="riasec__share">{row.share}%</span>
                <div
                  className="riasec__track"
                  role="img"
                  aria-label={`${tl(riasecLabels[row.code])}: ${row.share} %`}
                >
                  <div className="riasec__fill" style={{ width: `${row.share}%` }} />
                </div>
                <span className="riasec__hint">{tl(riasecHelp[row.code])}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

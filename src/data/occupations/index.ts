import type { Occupation } from '../types';
import { itOccupations } from './it';
import { technikOccupations } from './technik';
import { handwerkOccupations } from './handwerk';
import { bauVerkehrOccupations } from './bau-verkehr';
import { gesundheitOccupations } from './gesundheit';
import { sozialesOccupations } from './soziales';
import { wirtschaftOccupations } from './wirtschaft';
import { verwaltungOccupations } from './verwaltung';
import { medienOccupations } from './medien';
import { naturOccupations } from './natur';

/** Alle Berufe, alphabetisch nach Anzeigenamen sortiert. */
export const occupations: Occupation[] = [
  ...itOccupations,
  ...technikOccupations,
  ...handwerkOccupations,
  ...bauVerkehrOccupations,
  ...gesundheitOccupations,
  ...sozialesOccupations,
  ...wirtschaftOccupations,
  ...verwaltungOccupations,
  ...medienOccupations,
  ...naturOccupations,
].sort((a, b) => a.name.localeCompare(b.name, 'de'));

export const occupationById = new Map(occupations.map((o) => [o.id, o]));

/*
 * Prüfdaten des Bestands.
 *
 * Jeder Eintrag trägt sein eigenes Datum. Als „Datenstand" der Sammlung taugt
 * deshalb nur das älteste – es sagt, wie alt die am längsten nicht angefasste
 * Angabe ist. Das jüngste zu nennen wäre schmeichelhaft und irreführend.
 */
const checkDates = occupations.map((o) => o.checkedAt).sort();
export const oldestCheckDate = checkDates[0] ?? '';
export const newestCheckDate = checkDates[checkDates.length - 1] ?? '';

/**
 * Die Berufe, mit denen Jugendliche hierherkommen.
 *
 * Keine Rangliste und keine Empfehlung, sondern eine Beobachtung: Nach diesen
 * Berufen wird am häufigsten gefragt, weil sie in Familien, Serien und
 * Freundeskreisen zuerst fallen. Die Ergebnisseite bietet daraus drei zum
 * direkten Gegenlesen an – wer einen Namen im Kopf hat, soll ihn prüfen können,
 * statt ihn stillschweigend übergangen zu sehen.
 */
export const popularIds: string[] = [
  'erzieher',
  'pflegefachmann',
  'kfz-mechatroniker',
  'fachinformatiker-anwendungsentwicklung',
  'polizei-mittlerer-dienst',
  'tierpfleger',
  'medizinische-fachangestellte',
  'game-developer',
  'physiotherapeut',
  'industriekaufmann',
];

/** Die häufigsten Wunschberufe außer den genannten. */
export function popularAlternatives(exclude: string[], count = 3): Occupation[] {
  return popularIds
    .filter((id) => !exclude.includes(id))
    .map((id) => occupationById.get(id))
    .filter((o): o is Occupation => Boolean(o))
    .slice(0, count);
}

export function getOccupation(id: string): Occupation | undefined {
  return occupationById.get(id);
}

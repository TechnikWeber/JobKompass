import type { OccupationSource } from '../types';

/**
 * Kurzschreibweise für eine Quelle.
 *
 * Jeder Eintrag muss belegen, woher seine Angaben stammen. Diese Funktion
 * spart nur Tipparbeit; weggelassen werden darf die Quelle nie.
 */
export function src(label: string, url: string): OccupationSource {
  return { label, url };
}

/** BERUFENET der Bundesagentur für Arbeit – die amtliche Berufsbeschreibung. */
export function berufenet(id: string): OccupationSource {
  return { label: 'BERUFENET (Bundesagentur für Arbeit)', url: `https://web.arbeitsagentur.de/berufenet/beruf/${id}` };
}

/** Entgeltatlas – die Quelle hinter allen Verdienstangaben. */
export const ENTGELTATLAS: OccupationSource = {
  label: 'Entgeltatlas der Bundesagentur für Arbeit',
  url: 'https://web.arbeitsagentur.de/entgeltatlas',
};

/** BIBB-Datenblatt – die Quelle hinter allen Ausbildungsvergütungen. */
export const BIBB_VERGUETUNG: OccupationSource = {
  label: 'BIBB – Datenblätter zur tariflichen Ausbildungsvergütung',
  url: 'https://www.bibb.de/de/1815.php',
};

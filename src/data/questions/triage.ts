import type { L10n } from '../types';
import type { Mode } from './types';

export interface TriageOption {
  id: string;
  label: L10n;
  /** 0 = völlig offen, 3 = weiß schon sehr genau, was er oder sie will. */
  score: number;
}

export interface TriageQuestion {
  id: string;
  title: L10n;
  options: TriageOption[];
}

/**
 * Drei kurze Fragen, die den passenden Modus vorschlagen.
 *
 * Sie fließen NICHT in die Bewertung ein – sie steuern nur, wie viele und wie
 * tiefe Fragen danach kommen. Wer noch gar nichts weiß, braucht breite
 * Interessenfragen; wer schon zwei Berufe im Kopf hat, braucht die feinen
 * Unterschiede. Der Vorschlag ist immer änderbar.
 */
export const triageQuestions: TriageQuestion[] = [
  {
    id: 'clarity',
    title: { de: 'Wie klar ist dir gerade, was du werden möchtest?', en: 'How clear are you right now about what you want to become?' },
    options: [
      { id: 'none', label: { de: 'Überhaupt nicht – ich habe keine Idee', en: 'Not at all — I have no idea' }, score: 0 },
      { id: 'direction', label: { de: 'Eine Richtung ahne ich, mehr nicht', en: 'I sense a direction, no more than that' }, score: 1 },
      { id: 'few', label: { de: 'Zwei oder drei Berufe kommen infrage', en: 'Two or three occupations are candidates' }, score: 2 },
      { id: 'one', label: { de: 'Einen Beruf habe ich im Kopf und will ihn prüfen', en: 'I have one occupation in mind and want to check it' }, score: 3 },
    ],
  },
  {
    id: 'experience',
    title: { de: 'Wie viel Arbeitswelt hast du schon selbst erlebt?', en: 'How much of the working world have you experienced yourself?' },
    options: [
      { id: 'nothing', label: { de: 'Noch gar nichts', en: 'Nothing yet' }, score: 0 },
      { id: 'school', label: { de: 'Ein Schulpraktikum', en: 'One school placement' }, score: 1 },
      { id: 'several', label: { de: 'Mehrere Praktika oder ein Nebenjob', en: 'Several placements or a part-time job' }, score: 2 },
      { id: 'long', label: { de: 'Ein Freiwilligendienst, ein langes Praktikum oder schon eine Ausbildung', en: 'A voluntary year, a long placement or training already' }, score: 3 },
    ],
  },
  {
    id: 'decided',
    title: { de: 'Wie sicher bist du, welchen Weg du gehen willst – Ausbildung, Studium oder etwas anderes?', en: 'How sure are you which route you want — an apprenticeship, a degree or something else?' },
    options: [
      { id: 'unsure', label: { de: 'Gar nicht sicher, das ist die eigentliche Frage', en: 'Not sure at all — that is the actual question' }, score: 0 },
      { id: 'leaning', label: { de: 'Ich neige zu einem Weg, bin aber offen', en: 'I lean towards one route but am open' }, score: 1 },
      { id: 'mostly', label: { de: 'Ziemlich sicher', en: 'Fairly sure' }, score: 2 },
      { id: 'sure', label: { de: 'Ganz sicher – ich brauche nur noch den passenden Beruf dazu', en: 'Completely sure — I just need the matching occupation' }, score: 3 },
    ],
  },
];

export const MAX_TRIAGE_SCORE = triageQuestions.length * 3;

/**
 * Wandelt die Triage-Punkte in einen Modusvorschlag.
 *
 * Bewusst umgekehrt zur Intuition: Wer wenig weiß, bekommt den *kurzen*
 * Fragebogen. Vierzig Fragen zu Arbeitszeitmodellen helfen niemandem, der noch
 * nie in einem Betrieb war – erst muss die Richtung stehen. Wer dagegen schon
 * einen Beruf prüfen will, braucht die feinen Unterschiede.
 */
export function suggestMode(score: number): Mode {
  if (score <= 3) return 'orientation';
  if (score <= 6) return 'focused';
  return 'deep';
}

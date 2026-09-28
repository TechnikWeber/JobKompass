import type { Field, L10n, RatingKey, RiasecCode } from '../types';

export type Mode = 'orientation' | 'focused' | 'deep';

export const MODES: Mode[] = ['orientation', 'focused', 'deep'];

export type QuestionSection =
  | 'interests' // Was ziehst dich an?
  | 'strengths' // Was kannst du, was liegt dir?
  | 'conditions' // Wie soll der Arbeitstag aussehen?
  | 'education' // Welcher Weg ist möglich und gewollt?
  | 'life' // Was muss daneben Platz haben?
  | 'values'; // Was soll die Arbeit bedeuten?

/**
 * Was eine gewählte Antwort mit der Bewertung macht.
 *
 * Bewusst deklarativ gehalten: Der Fragenkatalog bleibt reine Daten und lässt
 * sich ohne Codeänderung erweitern oder korrigieren.
 */
export interface AnswerEffect {
  /**
   * Gewichte auf Bewertungsdimensionen. Positiv = wichtig, negativ = stört.
   * Sinnvoller Bereich: -3 bis +3.
   */
  ratings?: Partial<Record<RatingKey, number>>;
  /** Harte Anforderung: Wer sie nicht erfüllt, fliegt aus der Empfehlung. */
  require?: string[];
  /** Weiche Anforderung: Nichterfüllung kostet Punkte, schließt aber nicht aus. */
  prefer?: string[];
  /** Wer das erfüllt, wird abgewertet („ich will keinen Schichtdienst"). */
  avoid?: string[];
  /** Direkter Zuschlag auf einzelne Berufe (0–20 Punkte). */
  boostOccupations?: Record<string, number>;
  /** Zuschlag für alle Berufe mit diesem Schlagwort. */
  boostTags?: Record<string, number>;
  /** Zuschlag für alle Berufe in diesem Berufsfeld. */
  boostFields?: Partial<Record<Field, number>>;
  /**
   * Zuschlag über die Holland-Codes. Das ist der eigentliche Kern der
   * Interessenmessung: Die Neigungsfragen erheben dieselben sechs Achsen, die
   * an jedem Beruf stehen.
   */
  boostCodes?: Partial<Record<RiasecCode, number>>;
  /** Verweist auf einen Hinweistext im Realitätscheck-Katalog. */
  flags?: string[];
  /**
   * Hebt einen zuvor gesetzten Hinweis wieder auf. Damit kann eine Nachfrage
   * eine Warnung entschärfen: Wer Schichtdienst grundsätzlich ablehnt, aber
   * bereit ist, ihn für ein hohes Gehalt in Kauf zu nehmen, hat kein
   * Ausschlusskriterium mehr.
   */
  suppressFlags?: string[];
}

export interface AnswerOption {
  id: string;
  label: L10n;
  /** Kurze Erläuterung unter der Antwort – erklärt Begriffe im Klartext. */
  hint?: L10n;
  effect: AnswerEffect;
  /** Markiert „weiß ich nicht" – wirkt neutral und wird gesondert gezählt. */
  neutral?: boolean;
}

export interface Question {
  id: string;
  section: QuestionSection;
  /** In welchen Modi wird die Frage gestellt? */
  modes: Mode[];
  title: L10n;
  /** Zusatzinformation, immer sichtbar. */
  description?: L10n;
  /** Ausklappbarer Hintergrundtext für alle, die es genauer wissen wollen. */
  help?: L10n;
  type: 'single' | 'multiple';
  options: AnswerOption[];
  /** Gesamtgewicht der Frage (1 = nebensächlich, 3 = entscheidend). */
  weight: number;
  /** Frage nur zeigen, wenn eine frühere Antwort passt. */
  showIf?: { questionId: string; anyOf: string[] };
  /** Darf übersprungen werden? Standard: ja. */
  required?: boolean;
}

/** Antworten der Nutzerin: Fragen-ID → gewählte Options-IDs. */
export type Answers = Record<string, string[]>;

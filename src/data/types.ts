/**
 * JobKompass – zentrale Typen / central type definitions.
 *
 * Alle nutzersichtbaren Texte sind zweisprachig (de/en) direkt am Datensatz
 * hinterlegt, damit Daten und Übersetzung nicht auseinanderlaufen können.
 */

/** Zweisprachiger Text. Both languages are mandatory – no silent fallbacks. */
export interface L10n {
  de: string;
  en: string;
}

export type Lang = keyof L10n;

/** Zweisprachige Liste. */
export interface L10nList {
  de: string[];
  en: string[];
}

// ---------------------------------------------------------------------------
// Enumerationen
// ---------------------------------------------------------------------------

/**
 * Schulabschluss als Zugangsvoraussetzung.
 *
 * Bewusst aufsteigend geordnet, damit „mindestens" als Zahlenvergleich
 * formuliert werden kann. `none` heißt nicht „egal", sondern: es gibt Betriebe,
 * die ohne Abschluss ausbilden – rechtlich verlangt kein Ausbildungsberuf in
 * Deutschland einen bestimmten Abschluss, praktisch aber fast jeder.
 */
export type Schooling =
  | 'none' // ohne Abschluss möglich
  | 'hauptschule' // Hauptschulabschluss / Berufsreife
  | 'realschule' // Mittlerer Abschluss / Mittlere Reife
  | 'fachhochschulreife' // Fachhochschulreife / Fachabitur
  | 'abitur' // Allgemeine Hochschulreife
  | 'bachelor'
  | 'master'
  | 'staatsexamen'; // Staatsexamen, Approbation, Referendariat

export const SCHOOLING_ORDER: Schooling[] = [
  'none',
  'hauptschule',
  'realschule',
  'fachhochschulreife',
  'abitur',
  'bachelor',
  'master',
  'staatsexamen',
];

/** Wie der Abschluss erworben wird – der Unterschied entscheidet den Alltag. */
export type TrainingKind =
  | 'dual' // Betrieb + Berufsschule, Ausbildungsvergütung
  | 'school' // Berufsfachschule/Berufskolleg, oft ohne Vergütung
  | 'dual-study' // dualer Studiengang: Hochschule + Betrieb, mit Gehalt
  | 'university' // Universität
  | 'applied-university' // Hochschule für angewandte Wissenschaften / FH
  | 'state-exam' // Staatsexamen mit anschließender praktischer Phase
  | 'civil-service' // Laufbahnausbildung im öffentlichen Dienst
  | 'further-training' // Aufstiegsfortbildung, Meister, Fachwirt
  | 'on-the-job'; // Einstieg als Quereinsteiger, Anlernen im Betrieb

/** Berufsfeld – die Schublade, in der Menschen suchen. */
export type Field =
  | 'it'
  | 'technik'
  | 'handwerk'
  | 'bau'
  | 'gesundheit'
  | 'soziales'
  | 'bildung'
  | 'wirtschaft'
  | 'verwaltung'
  | 'recht'
  | 'medien'
  | 'gestaltung'
  | 'naturwissenschaft'
  | 'umwelt'
  | 'landwirtschaft'
  | 'verkehr'
  | 'gastronomie'
  | 'handel'
  | 'sicherheit'
  | 'sport';

/**
 * Holland-Codes (RIASEC).
 *
 * Das etablierte Modell der Berufswahlforschung: Menschen und Tätigkeiten
 * lassen sich auf denselben sechs Neigungen beschreiben, und die Passung
 * zwischen beiden sagt Zufriedenheit besser voraus als die Frage nach dem
 * Traumberuf. Die Fragen im Fragebogen erheben dieselben sechs Achsen, die hier
 * an jedem Beruf stehen.
 */
export type RiasecCode =
  | 'realistic' // handwerklich-technisch, mit Dingen arbeiten
  | 'investigative' // forschend-analytisch, Zusammenhänge verstehen
  | 'artistic' // gestaltend-kreativ, eigene Formen finden
  | 'social' // helfend-vermittelnd, mit Menschen arbeiten
  | 'enterprising' // überzeugend-führend, etwas in Bewegung setzen
  | 'conventional'; // ordnend-verwaltend, Genauigkeit und System

/** Wie die Arbeitszeit aussieht. Der häufigste Grund für spätere Wechsel. */
export type WorkTimeModel =
  | 'regular' // feste Zeiten, weitgehend planbar
  | 'flexible' // Gleitzeit, Vertrauensarbeitszeit
  | 'shift' // Früh/Spät/Nacht im Wechsel
  | 'on-call' // Rufbereitschaft, Bereitschaftsdienst
  | 'seasonal' // Saisonspitzen, dazwischen ruhiger
  | 'irregular'; // von Auftrag zu Auftrag, schwer planbar

export type Strain = 'low' | 'medium' | 'high' | 'very-high';

export type RemoteOption = 'no' | 'partly' | 'mostly';

export type TravelAmount = 'none' | 'occasional' | 'regular' | 'constant';

/** Wohin sich der Arbeitsmarkt für diesen Beruf bewegt. */
export type MarketOutlook = 'shrinking' | 'stable' | 'growing' | 'booming';

/** Wie viele offene Stellen es auf eine Bewerbung gibt. */
export type Demand = 'few' | 'moderate' | 'many' | 'very-many';

/** Bewerberdruck: Wie viele wollen dasselbe? */
export type Competition = 'low' | 'medium' | 'high' | 'very-high';

/** Risiko, dass Technik große Teile der Tätigkeit übernimmt. */
export type AutomationRisk = 'low' | 'medium' | 'high';

/** Wo die Arbeit stattfindet. */
export type Workplace =
  | 'office'
  | 'workshop'
  | 'outdoors'
  | 'site' // Baustelle, wechselnde Einsatzorte
  | 'lab'
  | 'clinic'
  | 'school'
  | 'shop'
  | 'kitchen'
  | 'vehicle'
  | 'home'
  | 'stage';

// ---------------------------------------------------------------------------
// Bewertungsdimensionen
// ---------------------------------------------------------------------------

/**
 * Alle Bewertungen 0–10, relativ zueinander gemeint („im Vergleich zu anderen
 * Berufen, die man mit 16 bis 25 beginnen kann") und nicht absolut.
 *
 * Die Dimensionen sind in vier Blöcke sortiert, weil sie unterschiedliche
 * Fragen beantworten: Was zieht mich an? Was muss ich mitbringen? Wie sieht
 * der Alltag aus? Was wird daraus?
 */
export interface Ratings {
  // --- Neigungen (RIASEC): Wie stark ist der Beruf davon geprägt? ---
  /** Mit den Händen, mit Maschinen, mit Material arbeiten. */
  practical: number;
  /** Untersuchen, messen, verstehen, Ursachen finden. */
  analytical: number;
  /** Eigene Formen, Bilder, Texte, Klänge, Entwürfe hervorbringen. */
  creative: number;
  /** Menschen betreuen, pflegen, unterrichten, beraten. */
  social: number;
  /** Überzeugen, verkaufen, verhandeln, Verantwortung für andere tragen. */
  persuasive: number;
  /** Ordnen, prüfen, verwalten, nach festen Regeln arbeiten. */
  organising: number;

  // --- Anforderungen: Was der Beruf von dir verlangt ---
  /** Rechnen, Formeln, Zahlen im Kopf behalten. */
  mathDemand: number;
  /** Schreiben, lesen, formulieren, Rechtschreibung. */
  languageDemand: number;
  /** Biologie, Chemie, Physik – auch im Alltag der Ausbildung. */
  scienceDemand: number;
  /** Technikverständnis, Computer, Geräte, Software. */
  techDemand: number;
  /** Körperliche Belastung: Heben, Stehen, Kälte, Schmutz. */
  physicalDemand: number;
  /** Sorgfalt: Wie teuer ist ein kleiner Fehler? */
  precisionDemand: number;

  // --- Alltag: Wie es sich anfühlt, den Tag so zu verbringen ---
  /** Wie viel Kontakt zu fremden Menschen gehört dazu? */
  peopleContact: number;
  /** Im Team oder für sich? Hoch = fast alles läuft gemeinsam. */
  teamwork: number;
  /** Wie unterschiedlich sind zwei Arbeitstage? */
  variety: number;
  /** Wie viel entscheidest du selbst, ohne zu fragen? */
  autonomy: number;
  /** Anteil der Arbeit an der frischen Luft. */
  outdoors: number;
  /** Ruhiges Arbeitstempo. Hoch = selten Hektik, niedrig = Dauerdruck. */
  calmPace: number;
  /** Planbarkeit: feste Abläufe, verlässliche Zeiten, klare Zuständigkeiten. */
  structure: number;

  // --- Perspektive: Was in zehn Jahren daraus geworden ist ---
  /** Aktuelle Arbeitsmarktlage: Wie leicht findet man eine Stelle? */
  jobSecurity: number;
  /** Zukunftssicherheit: Wie wenig bedroht sind die Tätigkeiten? */
  futureProof: number;
  /** Aufstieg und Weiterbildung: Wie viele Türen stehen danach offen? */
  advancement: number;
  /** Vereinbarkeit mit dem Leben daneben. */
  workLifeBalance: number;
  /** Verdienst über die Laufbahn hinweg, nicht nur im ersten Jahr. */
  salaryLevel: number;
  /** Wie viele Menschen in diesem Beruf erleben ihn als sinnvoll? */
  meaningfulness: number;
  /** Wie leicht kommt man überhaupt hinein – Hürden, Noten, Bewerberdruck. */
  entryEase: number;
}

export type RatingKey = keyof Ratings;

// ---------------------------------------------------------------------------
// Beruf
// ---------------------------------------------------------------------------

export interface OccupationSource {
  label: string;
  url: string;
}

/**
 * Verdienstangaben in Euro brutto pro Monat, Vollzeit, Deutschland.
 *
 * Gerundete Orientierungswerte, keine Zusicherung: Tarifbindung, Bundesland,
 * Betriebsgröße und Branche verschieben jede dieser Zahlen um mehrere hundert
 * Euro. Deshalb stehen überall Bereiche und nirgends eine einzelne Zahl.
 */
export interface Pay {
  /** Ausbildungsvergütung im ersten Jahr. `null` = unvergütet (z. B. Studium). */
  trainingFirstYear: number | null;
  /** Ausbildungsvergütung im letzten Jahr. */
  trainingLastYear: number | null;
  /** Einstiegsgehalt direkt nach dem Abschluss. */
  entry: number;
  /** Übliches Gehalt nach einigen Jahren Berufserfahrung. */
  median: number;
  /** Was mit Zusatzqualifikation, Führung oder Spezialisierung erreichbar ist. */
  top: number;
}

export interface Occupation {
  id: string;
  name: string;
  /** Kurzform für die Monogramm-Kachel, 1–3 Zeichen. */
  monogram: string;
  /** Markenfarbe als HSL-Tripel-String, z. B. "142 62% 38%". */
  accent: string;

  tagline: L10n;
  description: L10n;

  field: Field;
  /** Weitere Namen, unter denen Menschen suchen – auch veraltete. */
  aliases: string[];

  // --- Zugang ---
  /** Welche Wege hierher führen; die erste ist der übliche. */
  pathways: string[];
  /** Abschluss, mit dem der Einstieg realistisch möglich ist. */
  minSchooling: Schooling;
  /** Abschluss, den die meisten Eingestellten tatsächlich haben. */
  typicalSchooling: Schooling;
  trainingKind: TrainingKind;
  /** Regeldauer in Jahren; bei Studium inklusive Praxisphase. */
  trainingYears: number;
  /** Verkürzung möglich (Vorbildung, gute Leistungen)? */
  shortenable: boolean;
  /** Zulassungsbeschränkung – `undefined`, wenn es keine gibt. */
  admissionLimit?: L10n;
  /** Eignungstest, Aufnahmeprüfung, Sporttest, Mappe. */
  entryTest: boolean;
  /** Staatliche Zulassung nötig (Approbation, Anerkennung, Bestallung)? */
  licenceRequired: boolean;
  /** Was vor dem Start feststeht: Führungszeugnis, Impfnachweis, Führerschein. */
  prerequisites: L10nList;

  // --- Geld ---
  pay: Pay;
  /** Tarifvertrag üblich? Macht die Zahlen oben verlässlicher. */
  collectiveAgreement: boolean;

  // --- Alltag ---
  workTimeModel: WorkTimeModel;
  weekendWork: boolean;
  nightWork: boolean;
  physicalStrain: Strain;
  /** Seelische Belastung: Leid, Aggression, Verantwortung für Menschenleben. */
  emotionalStrain: Strain;
  remote: RemoteOption;
  travel: TravelAmount;
  /** Teilzeit im Beruf verbreitet und akzeptiert? */
  partTimeCommon: boolean;
  /** Selbstständigkeit ein üblicher Weg? */
  selfEmploymentCommon: boolean;
  workplaces: Workplace[];

  // --- Arbeitsmarkt ---
  marketOutlook: MarketOutlook;
  demand: Demand;
  competition: Competition;
  automationRisk: AutomationRisk;

  // --- Inhalt ---
  /** Die zwei bis drei stärksten Holland-Codes, stärkster zuerst. */
  interestCodes: RiasecCode[];
  tags: string[];
  ratings: Ratings;

  /** Was man an einem gewöhnlichen Tag wirklich tut. */
  dayInLife: L10nList;
  /** Schulfächer, die im Alltag der Ausbildung tatsächlich auftauchen. */
  schoolSubjects: L10nList;
  /** Eigenschaften, ohne die es schwer wird. */
  skills: L10nList;
  highlights: L10nList;
  bestFor: L10nList;
  notFor: L10nList;
  warnings: L10nList;
  /** Wie man herausfindet, ob es passt – vor der Bewerbung. */
  firstSteps: L10nList;
  /** Wohin es danach weitergehen kann: Meister, Studium, Spezialisierung. */
  advancementPaths: L10nList;

  /** Verwandte Berufe, IDs aus demselben Bestand. */
  relatedIds: string[];

  /** Offizielle Beschreibung, meist BERUFENET der Bundesagentur für Arbeit. */
  infoUrl: string;
  /** Video, in dem man den Beruf sieht statt darüber zu lesen. */
  videoUrl?: string;

  /** ISO-Datum der letzten inhaltlichen Prüfung. */
  checkedAt: string;
  sources: OccupationSource[];
}

// ---------------------------------------------------------------------------
// Ausbildungswege
// ---------------------------------------------------------------------------

/**
 * Der Weg zum Beruf – bewusst getrennt vom Beruf selbst.
 *
 * Zu vielen Berufen führen mehrere Wege, und der Weg entscheidet die nächsten
 * drei bis sechs Lebensjahre oft stärker als das Ziel: ob man Geld verdient
 * oder Semesterbeitrag zahlt, ob der Tag von 7 bis 16 Uhr feststeht oder aus
 * drei Vorlesungen besteht.
 */
export interface Pathway {
  id: string;
  name: string;
  accent: string;
  tagline: L10n;
  description: L10n;
  kind: TrainingKind;
  /** Woran die Woche am ehesten erinnert. */
  feelsLike: L10n;
  duration: L10n;
  /** Wird während der Ausbildung Geld gezahlt? */
  paid: boolean;
  /** Was es kostet – Semesterbeitrag, Material, Schulgeld. */
  cost: L10n;
  minSchooling: Schooling;
  /** Anteil Theorie am Gesamtumfang, 0–10. */
  theoryShare: number;
  /** Anteil Praxis im Betrieb, 0–10. */
  practiceShare: number;
  /** Wie eng ist der Tag vorgegeben? 0 = alles selbst einteilen. */
  structure: number;
  /** Wie schnell ist man im Beruf angekommen? */
  speedToWork: number;
  /** Wie gut lässt sich danach die Richtung noch wechseln? */
  flexibility: number;
  /** Wie hoch ist die Abbruchquote in diesem Weg? 0–10, hoch = viele Abbrüche. */
  dropoutRisk: number;
  strengths: L10nList;
  tradeoffs: L10nList;
  website: string;
}

import type {
  AutomationRisk, Competition, Demand, Field, L10n, MarketOutlook, RatingKey, RemoteOption,
  RiasecCode, Schooling, Strain, TrainingKind, TravelAmount, Workplace, WorkTimeModel,
} from '../data/types';
import type { QuestionSection } from '../data/questions/types';
import type { PathwayConcernCode, PathwayReason } from '../engine/pathway';

type Labels<T extends string> = Record<T, L10n>;

/** Kurzbezeichnung jeder Bewertungsdimension. */
export const ratingLabels: Labels<RatingKey> = {
  practical: { de: 'Praktische Arbeit', en: 'Practical work' },
  analytical: { de: 'Analytisches Arbeiten', en: 'Analytical work' },
  creative: { de: 'Gestalten', en: 'Creating' },
  social: { de: 'Mit Menschen arbeiten', en: 'Working with people' },
  persuasive: { de: 'Überzeugen und führen', en: 'Persuading and leading' },
  organising: { de: 'Ordnen und verwalten', en: 'Ordering and administering' },

  mathDemand: { de: 'Mathematik', en: 'Maths' },
  languageDemand: { de: 'Sprache und Schreiben', en: 'Language and writing' },
  scienceDemand: { de: 'Naturwissenschaften', en: 'Natural sciences' },
  techDemand: { de: 'Technikverständnis', en: 'Technical understanding' },
  physicalDemand: { de: 'Körperliche Belastung', en: 'Physical demand' },
  precisionDemand: { de: 'Genauigkeit', en: 'Precision' },

  peopleContact: { de: 'Kontakt zu Menschen', en: 'Contact with people' },
  teamwork: { de: 'Teamarbeit', en: 'Teamwork' },
  variety: { de: 'Abwechslung', en: 'Variety' },
  autonomy: { de: 'Eigenverantwortung', en: 'Personal responsibility' },
  outdoors: { de: 'Arbeit draußen', en: 'Working outdoors' },
  calmPace: { de: 'Ruhiges Arbeitstempo', en: 'Calm pace' },
  structure: { de: 'Feste Abläufe', en: 'Fixed routines' },

  jobSecurity: { de: 'Arbeitsmarktlage', en: 'Job market' },
  futureProof: { de: 'Zukunftssicherheit', en: 'Future-proofness' },
  advancement: { de: 'Aufstiegswege', en: 'Advancement' },
  workLifeBalance: { de: 'Vereinbarkeit mit dem Leben', en: 'Work-life balance' },
  salaryLevel: { de: 'Verdienst über die Laufbahn', en: 'Pay over a career' },
  meaningfulness: { de: 'Sinnempfinden', en: 'Sense of purpose' },
  entryEase: { de: 'Leichter Einstieg', en: 'Easy entry' },
};

/** Erklärung, was die Dimension konkret misst. */
export const ratingHelp: Labels<RatingKey> = {
  practical: { de: 'Mit den Händen, mit Werkzeug, mit Material arbeiten.', en: 'Working with your hands, with tools, with material.' },
  analytical: { de: 'Untersuchen, messen, verstehen, Ursachen finden.', en: 'Investigating, measuring, understanding, finding causes.' },
  creative: { de: 'Eigene Formen, Bilder, Texte oder Entwürfe hervorbringen.', en: 'Producing your own forms, images, texts or designs.' },
  social: { de: 'Menschen betreuen, pflegen, unterrichten, beraten.', en: 'Caring for, nursing, teaching and advising people.' },
  persuasive: { de: 'Überzeugen, verkaufen, verhandeln, Verantwortung für andere tragen.', en: 'Persuading, selling, negotiating, taking responsibility for others.' },
  organising: { de: 'Ordnen, prüfen, verwalten, nach festen Regeln arbeiten.', en: 'Ordering, checking, administering, working to fixed rules.' },

  mathDemand: { de: 'Wie viel gerechnet wird – im Alltag, nicht in der Prüfung.', en: 'How much calculating is involved — day to day, not in exams.' },
  languageDemand: { de: 'Schreiben, lesen, formulieren, Rechtschreibung.', en: 'Writing, reading, formulating, spelling.' },
  scienceDemand: { de: 'Biologie, Chemie und Physik im tatsächlichen Arbeitsalltag.', en: 'Biology, chemistry and physics in actual daily work.' },
  techDemand: { de: 'Geräte, Software, technische Zusammenhänge verstehen.', en: 'Understanding devices, software and technical relationships.' },
  physicalDemand: { de: 'Heben, Stehen, Kälte, Schmutz, Zwangshaltungen.', en: 'Lifting, standing, cold, dirt, awkward postures.' },
  precisionDemand: { de: 'Wie teuer oder gefährlich ist ein kleiner Fehler?', en: 'How expensive or dangerous is a small mistake?' },

  peopleContact: { de: 'Wie viel Kontakt zu fremden Menschen gehört dazu?', en: 'How much contact with strangers is involved?' },
  teamwork: { de: 'Läuft fast alles gemeinsam oder viel für sich?', en: 'Does almost everything happen together, or much of it alone?' },
  variety: { de: 'Wie unterschiedlich sind zwei Arbeitstage?', en: 'How different are two working days?' },
  autonomy: { de: 'Wie viel entscheidest du selbst, ohne zu fragen?', en: 'How much do you decide yourself, without asking?' },
  outdoors: { de: 'Anteil der Arbeit an der frischen Luft.', en: 'The share of work in the open air.' },
  calmPace: { de: 'Hoch heißt: selten Hektik. Niedrig heißt: Dauerdruck.', en: 'High means rarely hectic. Low means constant pressure.' },
  structure: { de: 'Planbarkeit: feste Abläufe, verlässliche Zeiten, klare Zuständigkeiten.', en: 'Predictability: fixed routines, reliable hours, clear responsibilities.' },

  jobSecurity: { de: 'Wie leicht findet man heute eine Stelle?', en: 'How easily can you find a position today?' },
  futureProof: { de: 'Wie wenig bedroht sind die Tätigkeiten durch Automatisierung?', en: 'How little are the tasks threatened by automation?' },
  advancement: { de: 'Wie viele Türen stehen nach dem Abschluss offen?', en: 'How many doors are open after qualifying?' },
  workLifeBalance: { de: 'Wie gut lässt sich ein Leben daneben führen?', en: 'How well can you lead a life alongside it?' },
  salaryLevel: { de: 'Verdienst über die ganze Laufbahn, nicht nur im ersten Jahr.', en: 'Pay across a whole career, not just the first year.' },
  meaningfulness: { de: 'Wie viele Menschen in diesem Beruf erleben ihn als sinnvoll?', en: 'How many people in this job experience it as meaningful?' },
  entryEase: { de: 'Hürden, Noten, Bewerberdruck – wie leicht kommt man hinein?', en: 'Barriers, grades, applicant pressure — how easily do you get in?' },
};

/** Die sechs Neigungsrichtungen. */
export const riasecLabels: Labels<RiasecCode> = {
  realistic: { de: 'Praktisch-handwerklich', en: 'Practical and hands-on' },
  investigative: { de: 'Forschend-analytisch', en: 'Investigative and analytical' },
  artistic: { de: 'Gestaltend-kreativ', en: 'Creative and expressive' },
  social: { de: 'Helfend-vermittelnd', en: 'Helping and teaching' },
  enterprising: { de: 'Überzeugend-führend', en: 'Persuading and leading' },
  conventional: { de: 'Ordnend-verwaltend', en: 'Ordering and administering' },
};

export const riasecHelp: Labels<RiasecCode> = {
  realistic: { de: 'Mit Dingen arbeiten: Werkzeug, Maschinen, Material, draußen.', en: 'Working with things: tools, machines, material, outdoors.' },
  investigative: { de: 'Zusammenhänge verstehen, messen, prüfen, Ursachen finden.', en: 'Understanding relationships, measuring, testing, finding causes.' },
  artistic: { de: 'Eigene Formen finden: gestalten, schreiben, bauen, kochen, filmen.', en: 'Finding your own forms: designing, writing, building, cooking, filming.' },
  social: { de: 'Mit Menschen arbeiten: betreuen, pflegen, unterrichten, beraten.', en: 'Working with people: caring, nursing, teaching, advising.' },
  enterprising: { de: 'Etwas in Bewegung setzen: überzeugen, verkaufen, organisieren, führen.', en: 'Setting things in motion: persuading, selling, organising, leading.' },
  conventional: { de: 'Genauigkeit und System: prüfen, verwalten, Regeln anwenden.', en: 'Precision and system: checking, administering, applying rules.' },
};

export const fieldLabels: Labels<Field> = {
  it: { de: 'IT und Digitales', en: 'IT and digital' },
  technik: { de: 'Technik und Industrie', en: 'Engineering and industry' },
  handwerk: { de: 'Handwerk', en: 'Skilled trades' },
  bau: { de: 'Bau und Planung', en: 'Construction and planning' },
  gesundheit: { de: 'Gesundheit und Pflege', en: 'Health and care' },
  soziales: { de: 'Soziales', en: 'Social work' },
  bildung: { de: 'Bildung', en: 'Education' },
  wirtschaft: { de: 'Wirtschaft und Büro', en: 'Business and office' },
  verwaltung: { de: 'Verwaltung', en: 'Public administration' },
  recht: { de: 'Recht', en: 'Law' },
  medien: { de: 'Medien', en: 'Media' },
  gestaltung: { de: 'Gestaltung und Design', en: 'Design' },
  naturwissenschaft: { de: 'Naturwissenschaft und Labor', en: 'Science and laboratory' },
  umwelt: { de: 'Umwelt und Energie', en: 'Environment and energy' },
  landwirtschaft: { de: 'Landwirtschaft, Natur und Tiere', en: 'Agriculture, nature and animals' },
  verkehr: { de: 'Verkehr und Logistik', en: 'Transport and logistics' },
  gastronomie: { de: 'Gastronomie und Lebensmittel', en: 'Hospitality and food' },
  handel: { de: 'Handel und Verkauf', en: 'Retail and sales' },
  sicherheit: { de: 'Sicherheit und Rettung', en: 'Security and rescue' },
  sport: { de: 'Sport', en: 'Sport' },
};

export const schoolingLabels: Labels<Schooling> = {
  none: { de: 'Ohne Schulabschluss möglich', en: 'Possible without a school certificate' },
  hauptschule: { de: 'Hauptschulabschluss', en: 'Hauptschulabschluss' },
  realschule: { de: 'Mittlerer Abschluss', en: 'Mid-level certificate' },
  fachhochschulreife: { de: 'Fachhochschulreife', en: 'Fachhochschulreife' },
  abitur: { de: 'Abitur', en: 'Abitur' },
  bachelor: { de: 'Bachelor', en: 'Bachelor' },
  master: { de: 'Master', en: 'Master' },
  staatsexamen: { de: 'Staatsexamen', en: 'State examination' },
};

export const trainingKindLabels: Labels<TrainingKind> = {
  dual: { de: 'Duale Ausbildung im Betrieb', en: 'Dual apprenticeship in a company' },
  school: { de: 'Schulische Ausbildung', en: 'School-based training' },
  'dual-study': { de: 'Duales Studium', en: 'Dual degree' },
  university: { de: 'Studium an einer Universität', en: 'University degree' },
  'applied-university': { de: 'Studium an einer Hochschule', en: 'Degree at a university of applied sciences' },
  'state-exam': { de: 'Studium mit Staatsexamen', en: 'Degree with a state examination' },
  'civil-service': { de: 'Laufbahnausbildung im öffentlichen Dienst', en: 'Public service career training' },
  'further-training': { de: 'Aufstiegsfortbildung', en: 'Advanced vocational training' },
  'on-the-job': { de: 'Einstieg über den Betrieb', en: 'Entry through the workplace' },
};

/** Kurzformen für Etiketten auf Karten, wo Platz fehlt. */
export const trainingKindShort: Labels<TrainingKind> = {
  dual: { de: 'Duale Ausbildung', en: 'Dual apprenticeship' },
  school: { de: 'Schulisch', en: 'School-based' },
  'dual-study': { de: 'Duales Studium', en: 'Dual degree' },
  university: { de: 'Universität', en: 'University' },
  'applied-university': { de: 'Hochschule', en: 'Applied sciences' },
  'state-exam': { de: 'Staatsexamen', en: 'State examination' },
  'civil-service': { de: 'Öffentlicher Dienst', en: 'Public service' },
  'further-training': { de: 'Fortbildung', en: 'Further training' },
  'on-the-job': { de: 'Quereinstieg', en: 'Career change' },
};

export const workTimeLabels: Labels<WorkTimeModel> = {
  regular: { de: 'Feste Zeiten', en: 'Fixed hours' },
  flexible: { de: 'Gleitzeit', en: 'Flexitime' },
  shift: { de: 'Schichtdienst', en: 'Shift work' },
  'on-call': { de: 'Mit Rufbereitschaft', en: 'With on-call duty' },
  seasonal: { de: 'Saisonal geprägt', en: 'Seasonal' },
  irregular: { de: 'Unregelmäßig', en: 'Irregular' },
};

export const strainLabels: Labels<Strain> = {
  low: { de: 'Niedrig', en: 'Low' },
  medium: { de: 'Mittel', en: 'Medium' },
  high: { de: 'Hoch', en: 'High' },
  'very-high': { de: 'Sehr hoch', en: 'Very high' },
};

export const remoteLabels: Labels<RemoteOption> = {
  no: { de: 'Nicht möglich', en: 'Not possible' },
  partly: { de: 'Teilweise möglich', en: 'Partly possible' },
  mostly: { de: 'Überwiegend möglich', en: 'Mostly possible' },
};

export const travelLabels: Labels<TravelAmount> = {
  none: { de: 'Keine Reisen', en: 'No travel' },
  occasional: { de: 'Gelegentlich', en: 'Occasional' },
  regular: { de: 'Regelmäßig', en: 'Regular' },
  constant: { de: 'Dauernd unterwegs', en: 'Constantly travelling' },
};

export const outlookLabels: Labels<MarketOutlook> = {
  shrinking: { de: 'Schrumpfend', en: 'Shrinking' },
  stable: { de: 'Stabil', en: 'Stable' },
  growing: { de: 'Wachsend', en: 'Growing' },
  booming: { de: 'Stark wachsend', en: 'Growing strongly' },
};

export const demandLabels: Labels<Demand> = {
  few: { de: 'Wenige Stellen', en: 'Few positions' },
  moderate: { de: 'Mittlere Nachfrage', en: 'Moderate demand' },
  many: { de: 'Viele Stellen', en: 'Many positions' },
  'very-many': { de: 'Sehr viele Stellen', en: 'Very many positions' },
};

export const competitionLabels: Labels<Competition> = {
  low: { de: 'Wenig Konkurrenz', en: 'Little competition' },
  medium: { de: 'Normale Konkurrenz', en: 'Normal competition' },
  high: { de: 'Starke Konkurrenz', en: 'Strong competition' },
  'very-high': { de: 'Sehr starke Konkurrenz', en: 'Very strong competition' },
};

export const automationLabels: Labels<AutomationRisk> = {
  low: { de: 'Gering', en: 'Low' },
  medium: { de: 'Mittel', en: 'Medium' },
  high: { de: 'Hoch', en: 'High' },
};

export const workplaceLabels: Labels<Workplace> = {
  office: { de: 'Büro', en: 'Office' },
  workshop: { de: 'Werkstatt oder Halle', en: 'Workshop or plant' },
  outdoors: { de: 'Draußen', en: 'Outdoors' },
  site: { de: 'Baustelle oder Einsatzort', en: 'Site or deployment location' },
  lab: { de: 'Labor', en: 'Laboratory' },
  clinic: { de: 'Klinik oder Praxis', en: 'Hospital or practice' },
  school: { de: 'Schule oder Kita', en: 'School or nursery' },
  shop: { de: 'Laden oder Geschäft', en: 'Shop' },
  kitchen: { de: 'Küche', en: 'Kitchen' },
  vehicle: { de: 'Fahrzeug', en: 'Vehicle' },
  home: { de: 'Zu Hause', en: 'At home' },
  stage: { de: 'Bühne oder Veranstaltung', en: 'Stage or event' },
};

export const sectionLabels: Labels<QuestionSection> = {
  interests: { de: 'Was dich interessiert', en: 'What interests you' },
  strengths: { de: 'Was dir liegt', en: 'What suits you' },
  conditions: { de: 'Wie der Arbeitstag aussehen soll', en: 'How the working day should look' },
  education: { de: 'Welcher Weg möglich ist', en: 'Which route is possible' },
  life: { de: 'Was daneben Platz haben muss', en: 'What else needs room' },
  values: { de: 'Was dir wichtig ist', en: 'What matters to you' },
};

export const pathwayReasonLabels: Labels<PathwayReason> = {
  'explicit-choice': { de: 'du hast diesen Weg selbst genannt', en: 'you named this route yourself' },
  'needs-income': { de: 'du verdienst dabei von Anfang an Geld', en: 'you earn money from the start' },
  'learns-by-doing': { de: 'du lernst am besten, indem du es tust', en: 'you learn best by doing' },
  'needs-structure': { de: 'du brauchst einen festen Rahmen', en: 'you need a firm framework' },
  'self-directed': { de: 'du kannst dich selbst organisieren', en: 'you can organise yourself' },
  'wants-degree': { de: 'du willst einen akademischen Abschluss', en: 'you want an academic qualification' },
  'unsure-yet': { de: 'du willst erst ausprobieren', en: 'you want to try things first' },
  'fast-to-work': { de: 'du bist schnell im Beruf', en: 'you are in work quickly' },
  'keeps-options': { de: 'du hältst dir danach viele Wege offen', en: 'it keeps many routes open afterwards' },
  'reachable-schooling': { de: 'er passt zu deinem Abschluss', en: 'it matches your school certificate' },
};

export const pathwayConcernLabels: Labels<PathwayConcernCode> = {
  unpaid: { de: 'Während der Ausbildung gibt es kein Gehalt.', en: 'There is no salary during training.' },
  'costs-money': { de: 'Es fallen Gebühren oder Schulgeld an – vorher nach Förderung fragen.', en: 'Fees or tuition apply — ask about funding beforehand.' },
  'high-dropout': { de: 'Auf diesem Weg brechen besonders viele ab.', en: 'Particularly many people drop out on this route.' },
  'needs-schooling': { de: 'Dieser Weg verlangt einen höheren Schulabschluss, als du angegeben hast.', en: 'This route requires a higher school certificate than you stated.' },
  'slow-to-work': { de: 'Bis zum Berufsstart dauert es lange.', en: 'It takes a long time until you start working.' },
  'hard-selection': { de: 'Die Auswahlverfahren sind hart, und man bewirbt sich sehr früh.', en: 'Selection is tough and applications are made very early.' },
  'no-qualification': { de: 'Am Ende steht kein Berufsabschluss – der kommt danach.', en: 'There is no qualification at the end — that comes afterwards.' },
  'not-for-occupation': { de: 'Zu dem empfohlenen Beruf führt dieser Weg nicht.', en: 'This route does not lead to the recommended occupation.' },
};

/**
 * Schlagworte, die auf Karten und als Filter erscheinen.
 *
 * Bewusst nicht vollständig: Nur Schlagworte mit einer Beschriftung werden
 * angezeigt. Interne Merkmale bleiben so aus der Oberfläche heraus, ohne dass
 * man sie aus den Daten entfernen müsste.
 */
export const tagLabels: Record<string, L10n> = {
  programmieren: { de: 'Programmieren', en: 'Programming' },
  technik: { de: 'Technik', en: 'Technology' },
  handwerk: { de: 'Handwerk', en: 'Skilled trade' },
  industrie: { de: 'Industrie', en: 'Industry' },
  buero: { de: 'Büro', en: 'Office' },
  draussen: { de: 'Draußen', en: 'Outdoors' },
  koerperlich: { de: 'Körperlich', en: 'Physical' },
  menschen: { de: 'Mit Menschen', en: 'With people' },
  kinder: { de: 'Mit Kindern', en: 'With children' },
  tiere: { de: 'Mit Tieren', en: 'With animals' },
  natur: { de: 'In der Natur', en: 'In nature' },
  kreativ: { de: 'Kreativ', en: 'Creative' },
  sprache: { de: 'Sprache', en: 'Language' },
  mathematik: { de: 'Mathematik', en: 'Maths' },
  chemie: { de: 'Chemie', en: 'Chemistry' },
  biologie: { de: 'Biologie', en: 'Biology' },
  gesundheit: { de: 'Gesundheit', en: 'Health' },
  pflege: { de: 'Pflege', en: 'Nursing' },
  soziales: { de: 'Soziales', en: 'Social' },
  bildung: { de: 'Bildung', en: 'Education' },
  recht: { de: 'Recht', en: 'Law' },
  verwaltung: { de: 'Verwaltung', en: 'Administration' },
  wirtschaft: { de: 'Wirtschaft', en: 'Business' },
  handel: { de: 'Handel', en: 'Retail' },
  medien: { de: 'Medien', en: 'Media' },
  gestaltung: { de: 'Gestaltung', en: 'Design' },
  bau: { de: 'Bau', en: 'Construction' },
  verkehr: { de: 'Verkehr', en: 'Transport' },
  gastronomie: { de: 'Gastronomie', en: 'Hospitality' },
  lebensmittel: { de: 'Lebensmittel', en: 'Food' },
  sport: { de: 'Sport', en: 'Sport' },
  sicherheit: { de: 'Sicherheit', en: 'Security' },
  landwirtschaft: { de: 'Landwirtschaft', en: 'Agriculture' },
  umwelt: { de: 'Umwelt', en: 'Environment' },
  naturwissenschaft: { de: 'Naturwissenschaft', en: 'Science' },
  studium: { de: 'Studium', en: 'Degree' },
  beamte: { de: 'Beamtenlaufbahn', en: 'Civil service career' },
  uniform: { de: 'Uniform', en: 'Uniform' },
  tarifvertrag: { de: 'Tarifvertrag', en: 'Collective agreement' },
  'gut-bezahlt': { de: 'Gut bezahlt', en: 'Well paid' },
  'sicherer-job': { de: 'Sehr sicher', en: 'Very secure' },
  zukunftsbranche: { de: 'Zukunftsbranche', en: 'Growth sector' },
  energiewende: { de: 'Energiewende', en: 'Energy transition' },
  nachhaltigkeit: { de: 'Nachhaltigkeit', en: 'Sustainability' },
  praezision: { de: 'Präzisionsarbeit', en: 'Precision work' },
  schichtarbeit: { de: 'Schichtdienst', en: 'Shift work' },
  nachtarbeit: { de: 'Nachtarbeit', en: 'Night work' },
  samstagsarbeit: { de: 'Samstagsarbeit', en: 'Saturday work' },
  rufbereitschaft: { de: 'Rufbereitschaft', en: 'On-call duty' },
  unregelmaessig: { de: 'Unregelmäßige Zeiten', en: 'Irregular hours' },
  saisonarbeit: { de: 'Saisonal', en: 'Seasonal' },
  'kein-schichtdienst': { de: 'Ohne Schichtdienst', en: 'No shift work' },
  'homeoffice-moeglich': { de: 'Homeoffice möglich', en: 'Home working possible' },
  'teilzeit-moeglich': { de: 'Teilzeit möglich', en: 'Part-time possible' },
  'selbststaendig-moeglich': { de: 'Selbstständigkeit möglich', en: 'Self-employment possible' },
  kundenkontakt: { de: 'Kundenkontakt', en: 'Customer contact' },
  verantwortung: { de: 'Hohe Verantwortung', en: 'High responsibility' },
  sinnvoll: { de: 'Sinnstiftend', en: 'Meaningful' },
  'hohe-konkurrenz': { de: 'Viele Bewerber', en: 'Many applicants' },
  fuehrerschein: { de: 'Führerschein nötig', en: 'Driving licence needed' },
  hoehe: { de: 'Arbeit in der Höhe', en: 'Work at height' },
  gefaehrlich: { de: 'Erhöhte Unfallgefahr', en: 'Elevated accident risk' },
  englisch: { de: 'Englisch nötig', en: 'English needed' },
  ausland: { de: 'Auch im Ausland', en: 'Also abroad' },
  umzug: { de: 'Umzug möglich nötig', en: 'Relocation may be needed' },
  montage: { de: 'Montage beim Kunden', en: 'Installation at customer sites' },
};

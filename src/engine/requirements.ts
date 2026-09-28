import { SCHOOLING_ORDER, type L10n, type Occupation, type Schooling } from '../data/types';

/**
 * Benannte Prädikate über einen Beruf.
 *
 * Die Fragen im Fragenkatalog verweisen nur über ihre ID auf diese Prädikate.
 * Dadurch bleiben die Fragen reine Daten, und jede harte Anforderung lässt sich
 * einzeln testen und der Nutzerin als Begründung anzeigen.
 */
export interface Requirement {
  id: string;
  /**
   * Bejahender Satzteil hinter einem Subjekt: „Pflegefachmann **ist ohne
   * Studium erreichbar**".
   */
  label: L10n;
  /**
   * Verneinter Satzteil an derselben Stelle. Steht hier als eigener Text und
   * nicht als vorangestelltes „nicht", weil die Verneinung im Deutschen ins
   * Satzinnere gehört: „setzt **kein** Abitur voraus" statt „nicht setzt
   * Abitur voraus".
   */
  negated: L10n;
  /** Substantivische Kurzform für Aufzählungen und Etiketten. */
  short: L10n;
  test: (o: Occupation) => boolean;
}

type Pair = [de: string, en: string];

function req(id: string, label: Pair, negated: Pair, short: Pair, test: (o: Occupation) => boolean): Requirement {
  return {
    id,
    label: { de: label[0], en: label[1] },
    negated: { de: negated[0], en: negated[1] },
    short: { de: short[0], en: short[1] },
    test,
  };
}

/** Ist der Beruf mit diesem Abschluss erreichbar? */
function reachableWith(schooling: Schooling): (o: Occupation) => boolean {
  const limit = SCHOOLING_ORDER.indexOf(schooling);
  return (o) => SCHOOLING_ORDER.indexOf(o.minSchooling) <= limit;
}

const ACADEMIC = new Set(['university', 'applied-university', 'state-exam', 'dual-study']);

export const requirementList: Requirement[] = [
  // --- Zugang über den Schulabschluss ---
  req(
    'access-none',
    ['ist auch ohne Schulabschluss erreichbar', 'is reachable even without a school-leaving certificate'],
    ['setzt mindestens einen Schulabschluss voraus', 'requires at least a school-leaving certificate'],
    ['Ohne Schulabschluss erreichbar', 'Reachable without a school certificate'],
    reachableWith('none'),
  ),
  req(
    'access-hauptschule',
    ['ist mit einem Hauptschulabschluss erreichbar', 'is reachable with a Hauptschulabschluss'],
    ['ist mit einem Hauptschulabschluss nicht erreichbar', 'is not reachable with a Hauptschulabschluss'],
    ['Mit Hauptschulabschluss erreichbar', 'Reachable with a Hauptschulabschluss'],
    reachableWith('hauptschule'),
  ),
  req(
    'access-realschule',
    ['ist mit einem mittleren Abschluss erreichbar', 'is reachable with a mid-level certificate'],
    ['ist mit einem mittleren Abschluss nicht erreichbar', 'is not reachable with a mid-level certificate'],
    ['Mit mittlerem Abschluss erreichbar', 'Reachable with a mid-level certificate'],
    reachableWith('realschule'),
  ),
  req(
    'access-fachhochschulreife',
    ['ist mit der Fachhochschulreife erreichbar', 'is reachable with a Fachhochschulreife'],
    ['ist mit der Fachhochschulreife nicht erreichbar', 'is not reachable with a Fachhochschulreife'],
    ['Mit Fachhochschulreife erreichbar', 'Reachable with a Fachhochschulreife'],
    reachableWith('fachhochschulreife'),
  ),

  // --- Art des Weges ---
  req(
    'no-study',
    ['kommt ohne Studium aus', 'works without a degree'],
    ['setzt ein Studium voraus', 'requires a degree'],
    ['Ohne Studium', 'Without a degree'],
    (o) => !ACADEMIC.has(o.trainingKind),
  ),
  req(
    'study',
    ['führt über ein Studium', 'runs through a degree'],
    ['führt nicht über ein Studium', 'does not run through a degree'],
    ['Mit Studium', 'With a degree'],
    (o) => ACADEMIC.has(o.trainingKind),
  ),
  req(
    'dual-training',
    ['ist eine duale Ausbildung im Betrieb', 'is a dual apprenticeship in a company'],
    ['ist keine duale Ausbildung im Betrieb', 'is not a dual apprenticeship in a company'],
    ['Duale Ausbildung', 'Dual apprenticeship'],
    (o) => o.trainingKind === 'dual',
  ),
  req(
    'paid-training',
    ['wird während der Ausbildung bezahlt', 'is paid during training'],
    ['wird während der Ausbildung nicht bezahlt', 'is not paid during training'],
    ['Vergütete Ausbildung', 'Paid training'],
    (o) => (o.pay.trainingFirstYear ?? 0) > 0,
  ),
  req(
    'short-training',
    ['ist in höchstens drei Jahren abgeschlossen', 'is completed in three years or less'],
    ['dauert länger als drei Jahre', 'takes longer than three years'],
    ['Höchstens drei Jahre', 'Three years or less'],
    (o) => o.trainingYears <= 3,
  ),
  req(
    'no-admission-limit',
    ['hat keine Zulassungsbeschränkung', 'has no admission restriction'],
    ['hat eine Zulassungsbeschränkung', 'has an admission restriction'],
    ['Keine Zulassungsbeschränkung', 'No admission restriction'],
    (o) => !o.admissionLimit,
  ),
  req(
    'no-entry-test',
    ['verlangt keinen Eignungstest', 'requires no aptitude test'],
    ['verlangt einen Eignungstest', 'requires an aptitude test'],
    ['Ohne Eignungstest', 'Without an aptitude test'],
    (o) => !o.entryTest,
  ),
  req(
    'civil-service',
    ['führt in den öffentlichen Dienst oder ins Beamtenverhältnis', 'leads into the public service or civil service'],
    ['führt nicht in den öffentlichen Dienst', 'does not lead into the public service'],
    ['Öffentlicher Dienst', 'Public service'],
    (o) => o.trainingKind === 'civil-service' || o.tags.includes('beamte'),
  ),

  // --- Arbeitszeit ---
  req(
    'no-shift-work',
    ['kommt ohne Schichtdienst aus', 'works without shift duty'],
    ['läuft im Schichtdienst', 'runs on shift duty'],
    ['Ohne Schichtdienst', 'Without shift work'],
    (o) => o.workTimeModel !== 'shift' && !o.nightWork,
  ),
  req(
    'no-night-work',
    ['kommt ohne Nachtarbeit aus', 'works without night shifts'],
    ['verlangt Nachtarbeit', 'requires night work'],
    ['Ohne Nachtarbeit', 'Without night work'],
    (o) => !o.nightWork,
  ),
  req(
    'no-weekend-work',
    ['lässt die Wochenenden frei', 'leaves weekends free'],
    ['verlangt Wochenendarbeit', 'requires weekend work'],
    ['Wochenenden frei', 'Weekends free'],
    (o) => !o.weekendWork,
  ),
  req(
    'regular-hours',
    ['hat planbare Arbeitszeiten', 'has predictable working hours'],
    ['hat keine planbaren Arbeitszeiten', 'does not have predictable working hours'],
    ['Planbare Arbeitszeiten', 'Predictable hours'],
    (o) => o.workTimeModel === 'regular' || o.workTimeModel === 'flexible',
  ),
  req(
    'part-time-common',
    ['lässt sich gut in Teilzeit ausüben', 'can readily be done part-time'],
    ['lässt sich schlecht in Teilzeit ausüben', 'is hard to do part-time'],
    ['Teilzeit verbreitet', 'Part-time common'],
    (o) => o.partTimeCommon,
  ),
  req(
    'work-life-balance',
    ['lässt genug Platz für das Leben daneben', 'leaves enough room for life outside work'],
    ['lässt wenig Platz für das Leben daneben', 'leaves little room for life outside work'],
    ['Gute Vereinbarkeit', 'Good work-life balance'],
    (o) => o.ratings.workLifeBalance >= 7,
  ),

  // --- Ort und Umgebung ---
  req(
    'remote-possible',
    ['lässt zumindest teilweise Arbeit von zu Hause zu', 'allows at least partial working from home'],
    ['lässt keine Arbeit von zu Hause zu', 'does not allow working from home'],
    ['Homeoffice möglich', 'Working from home possible'],
    (o) => o.remote !== 'no',
  ),
  req(
    'outdoors-work',
    ['findet überwiegend draußen statt', 'takes place mostly outdoors'],
    ['findet überwiegend drinnen statt', 'takes place mostly indoors'],
    ['Arbeit draußen', 'Work outdoors'],
    (o) => o.ratings.outdoors >= 6,
  ),
  req(
    'indoor-work',
    ['findet im Wesentlichen drinnen statt', 'takes place essentially indoors'],
    ['findet zu großen Teilen draußen statt', 'takes place largely outdoors'],
    ['Arbeit drinnen', 'Work indoors'],
    (o) => o.ratings.outdoors <= 3,
  ),
  req(
    'office-work',
    ['ist ein Beruf am Schreibtisch', 'is a desk-based occupation'],
    ['ist kein Beruf am Schreibtisch', 'is not a desk-based occupation'],
    ['Büroarbeitsplatz', 'Desk-based work'],
    (o) => o.workplaces.includes('office'),
  ),
  req(
    'no-travel',
    ['kommt ohne dauernde Reisetätigkeit aus', 'works without constant travel'],
    ['verlangt regelmäßige Reisetätigkeit', 'requires regular travel'],
    ['Ohne viel Reisen', 'Without much travel'],
    (o) => o.travel === 'none' || o.travel === 'occasional',
  ),

  // --- Körper und Belastung ---
  req(
    'low-physical',
    ['ist körperlich nicht schwer', 'is not physically heavy'],
    ['ist körperlich schwer', 'is physically heavy'],
    ['Körperlich nicht schwer', 'Not physically heavy'],
    (o) => o.physicalStrain === 'low' || o.physicalStrain === 'medium',
  ),
  req(
    'very-low-physical',
    ['ist körperlich leicht', 'is physically light'],
    ['ist körperlich nicht leicht', 'is not physically light'],
    ['Körperlich leicht', 'Physically light'],
    (o) => o.physicalStrain === 'low',
  ),
  req(
    'physical-work',
    ['ist ein körperlicher Beruf', 'is a physical occupation'],
    ['ist kein körperlicher Beruf', 'is not a physical occupation'],
    ['Körperliche Arbeit', 'Physical work'],
    (o) => o.ratings.physicalDemand >= 6,
  ),
  req(
    'low-emotional',
    ['ist seelisch nicht stark belastend', 'is not emotionally heavy'],
    ['ist seelisch stark belastend', 'is emotionally heavy'],
    ['Seelisch nicht stark belastend', 'Not emotionally heavy'],
    (o) => o.emotionalStrain === 'low' || o.emotionalStrain === 'medium',
  ),
  req(
    'calm-pace',
    ['läuft in einem ruhigen Tempo', 'runs at a calm pace'],
    ['läuft unter dauerndem Zeitdruck', 'runs under constant time pressure'],
    ['Ruhiges Arbeitstempo', 'Calm pace'],
    (o) => o.ratings.calmPace >= 6,
  ),

  // --- Menschen, Tiere, Kinder ---
  req(
    'with-people',
    ['arbeitet den ganzen Tag mit Menschen', 'works with people all day'],
    ['arbeitet kaum mit Menschen', 'works with people only rarely'],
    ['Viel Kontakt zu Menschen', 'A lot of contact with people'],
    (o) => o.ratings.peopleContact >= 7,
  ),
  req(
    'few-people',
    ['kommt mit wenig Kontakt zu fremden Menschen aus', 'works with little contact with strangers'],
    ['verlangt viel Kontakt zu fremden Menschen', 'requires a lot of contact with strangers'],
    ['Wenig Kundenkontakt', 'Little customer contact'],
    (o) => o.ratings.peopleContact <= 5,
  ),
  req(
    'with-animals',
    ['arbeitet mit Tieren', 'works with animals'],
    ['arbeitet nicht mit Tieren', 'does not work with animals'],
    ['Arbeit mit Tieren', 'Working with animals'],
    (o) => o.tags.includes('tiere'),
  ),
  req(
    'with-children',
    ['arbeitet mit Kindern und Jugendlichen', 'works with children and young people'],
    ['arbeitet nicht mit Kindern', 'does not work with children'],
    ['Arbeit mit Kindern', 'Working with children'],
    (o) => o.tags.includes('kinder'),
  ),
  req(
    'teamwork',
    ['ist Teamarbeit', 'is teamwork'],
    ['ist keine Teamarbeit', 'is not teamwork'],
    ['Arbeit im Team', 'Working in a team'],
    (o) => o.ratings.teamwork >= 7,
  ),
  req(
    'alone-possible',
    ['lässt viel für sich arbeiten', 'allows a lot of solitary work'],
    ['lässt kaum für sich arbeiten', 'allows little solitary work'],
    ['Auch allein arbeiten', 'Working on your own'],
    (o) => o.ratings.teamwork <= 5,
  ),

  // --- Schulische Anforderungen ---
  req(
    'low-math',
    ['verlangt keine starke Mathematik', 'does not require strong maths'],
    ['verlangt starke Mathematik', 'requires strong maths'],
    ['Ohne viel Mathematik', 'Without much maths'],
    (o) => o.ratings.mathDemand <= 5,
  ),
  req(
    'low-language',
    ['verlangt kein ausgeprägtes Sprachvermögen', 'does not require strong language skills'],
    ['verlangt ausgeprägtes Sprachvermögen', 'requires strong language skills'],
    ['Ohne viel Schreiben', 'Without much writing'],
    (o) => o.ratings.languageDemand <= 5,
  ),
  req(
    'low-science',
    ['verlangt keine Naturwissenschaften', 'does not require natural sciences'],
    ['verlangt Naturwissenschaften', 'requires natural sciences'],
    ['Ohne Naturwissenschaften', 'Without natural sciences'],
    (o) => o.ratings.scienceDemand <= 5,
  ),
  req(
    'strong-math',
    ['arbeitet wirklich mit Mathematik', 'genuinely works with mathematics'],
    ['arbeitet kaum mit Mathematik', 'barely works with mathematics'],
    ['Mit Mathematik', 'With mathematics'],
    (o) => o.ratings.mathDemand >= 7,
  ),
  req(
    'strong-science',
    ['arbeitet wirklich mit Naturwissenschaften', 'genuinely works with natural sciences'],
    ['arbeitet kaum mit Naturwissenschaften', 'barely works with natural sciences'],
    ['Mit Naturwissenschaften', 'With natural sciences'],
    (o) => o.ratings.scienceDemand >= 7,
  ),
  req(
    'tech-work',
    ['arbeitet mit Technik', 'works with technology'],
    ['arbeitet kaum mit Technik', 'barely works with technology'],
    ['Mit Technik', 'With technology'],
    (o) => o.ratings.techDemand >= 7,
  ),

  // --- Inhalt der Arbeit ---
  req(
    'hands-on',
    ['ist praktische Arbeit mit den Händen', 'is practical work with your hands'],
    ['ist keine praktische Arbeit mit den Händen', 'is not practical work with your hands'],
    ['Arbeit mit den Händen', 'Working with your hands'],
    (o) => o.ratings.practical >= 8,
  ),
  req(
    'creative-work',
    ['lässt wirklich gestalten', 'genuinely involves creating'],
    ['lässt kaum gestalten', 'involves barely any creating'],
    ['Gestaltende Arbeit', 'Creative work'],
    (o) => o.ratings.creative >= 8,
  ),
  req(
    'variety',
    ['bringt abwechslungsreiche Tage', 'brings varied days'],
    ['bringt wenig abwechslungsreiche Tage', 'brings days with little variety'],
    ['Abwechslungsreich', 'Varied'],
    (o) => o.ratings.variety >= 7,
  ),
  req(
    'structured',
    ['läuft nach festen Abläufen', 'follows fixed routines'],
    ['läuft nicht nach festen Abläufen', 'does not follow fixed routines'],
    ['Feste Abläufe', 'Fixed routines'],
    (o) => o.ratings.structure >= 7,
  ),
  req(
    'autonomy',
    ['lässt viel selbst entscheiden', 'allows you to decide a lot yourself'],
    ['lässt wenig selbst entscheiden', 'allows you to decide little yourself'],
    ['Viel Eigenverantwortung', 'A lot of personal responsibility'],
    (o) => o.ratings.autonomy >= 7,
  ),
  req(
    'no-sales',
    ['kommt ohne Verkaufen aus', 'works without selling'],
    ['hat einen deutlichen Verkaufsanteil', 'has a significant sales element'],
    ['Ohne Verkaufen', 'Without selling'],
    (o) => o.ratings.persuasive <= 5,
  ),

  // --- Geld und Markt ---
  req(
    'decent-entry-pay',
    ['zahlt beim Einstieg mindestens 3.000 € brutto', 'pays at least €3,000 gross at entry'],
    ['zahlt beim Einstieg unter 3.000 € brutto', 'pays under €3,000 gross at entry'],
    ['Einstieg ab 3.000 €', 'Entry from €3,000'],
    (o) => o.pay.entry >= 3000,
  ),
  req(
    'high-pay-later',
    ['zahlt mit Erfahrung mindestens 4.000 € brutto', 'pays at least €4,000 gross with experience'],
    ['zahlt mit Erfahrung unter 4.000 € brutto', 'pays under €4,000 gross with experience'],
    ['Später ab 4.000 €', 'Later from €4,000'],
    (o) => o.pay.median >= 4000,
  ),
  req(
    'collective-agreement',
    ['wird üblicherweise nach Tarif bezahlt', 'is usually paid under a collective agreement'],
    ['wird üblicherweise nicht nach Tarif bezahlt', 'is usually not paid under a collective agreement'],
    ['Tarifbezahlung', 'Collectively agreed pay'],
    (o) => o.collectiveAgreement,
  ),
  req(
    'secure-job',
    ['hat eine sehr gute Arbeitsmarktlage', 'has a very good job market'],
    ['hat keine sehr gute Arbeitsmarktlage', 'does not have a very good job market'],
    ['Sichere Stelle', 'Secure job'],
    (o) => o.ratings.jobSecurity >= 8,
  ),
  req(
    'future-proof',
    ['gilt als zukunftssicher', 'is considered future-proof'],
    ['gilt nicht als zukunftssicher', 'is not considered future-proof'],
    ['Zukunftssicher', 'Future-proof'],
    (o) => o.ratings.futureProof >= 8,
  ),
  req(
    'low-competition',
    ['hat überschaubare Konkurrenz um die Plätze', 'has manageable competition for places'],
    ['hat starke Konkurrenz um die Plätze', 'has strong competition for places'],
    ['Wenig Konkurrenz', 'Little competition'],
    (o) => o.competition === 'low' || o.competition === 'medium',
  ),
  req(
    'many-positions',
    ['hat viele offene Stellen', 'has many open positions'],
    ['hat wenige offene Stellen', 'has few open positions'],
    ['Viele offene Stellen', 'Many open positions'],
    (o) => o.demand === 'many' || o.demand === 'very-many',
  ),
  req(
    'advancement',
    ['bietet viele Wege nach oben', 'offers many routes upwards'],
    ['bietet wenige Wege nach oben', 'offers few routes upwards'],
    ['Gute Aufstiegswege', 'Good advancement'],
    (o) => o.ratings.advancement >= 8,
  ),
  req(
    'self-employment-possible',
    ['lässt sich selbstständig ausüben', 'can be practised self-employed'],
    ['lässt sich kaum selbstständig ausüben', 'can barely be practised self-employed'],
    ['Selbstständigkeit möglich', 'Self-employment possible'],
    (o) => o.selfEmploymentCommon,
  ),
  req(
    'meaningful',
    ['wird von vielen als sinnvoll erlebt', 'is experienced by many as meaningful'],
    ['wird seltener als sinnvoll erlebt', 'is less often experienced as meaningful'],
    ['Als sinnvoll erlebt', 'Experienced as meaningful'],
    (o) => o.ratings.meaningfulness >= 8,
  ),

  // --- Formales, das ausschließen kann ---
  req(
    'no-licence-needed',
    ['braucht keinen Führerschein', 'needs no driving licence'],
    ['braucht einen Führerschein', 'needs a driving licence'],
    ['Ohne Führerschein', 'Without a driving licence'],
    (o) => !o.tags.includes('fuehrerschein'),
  ),
  req(
    'no-uniform',
    ['kommt ohne Uniform und Dienstgrade aus', 'works without a uniform and ranks'],
    ['verlangt Uniform und Dienstgrade', 'requires a uniform and ranks'],
    ['Ohne Uniform', 'Without a uniform'],
    (o) => !o.tags.includes('uniform'),
  ),
  req(
    'no-relocation',
    ['verlangt keinen Umzug', 'does not require relocating'],
    ['verlangt Umzugsbereitschaft', 'requires a willingness to relocate'],
    ['Ohne Umzug', 'Without relocating'],
    (o) => !o.tags.includes('umzug'),
  ),
];

export const requirements = new Map(requirementList.map((r) => [r.id, r]));

export function testRequirement(id: string, o: Occupation): boolean {
  const r = requirements.get(id);
  if (!r) {
    // Eine unbekannte ID darf nie stillschweigend alles durchlassen.
    throw new Error(`Unbekannte Anforderung: ${id}`);
  }
  return r.test(o);
}

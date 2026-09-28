import type { L10n, L10nList } from './types';

export type FlagSeverity = 'critical' | 'warning' | 'info';

export interface Flag {
  id: string;
  severity: FlagSeverity;
  title: L10n;
  message: L10n;
  /** Was man konkret tun kann. */
  advice: L10nList;
  links?: { label: string; url: string }[];
}

/**
 * Realitätschecks: Dinge, die unabhängig vom gewählten Beruf über Erfolg oder
 * Frust einer Berufswahl entscheiden.
 *
 * Der Anspruch hier ist Ehrlichkeit. Ein Berufsorientierungswerkzeug, das nur
 * Möglichkeiten zeigt, ist eine Werbebroschüre. Wo etwas hart wird, steht es
 * hier – und daneben, was stattdessen geht.
 */
export const flags: Flag[] = [
  {
    id: 'no-certificate',
    severity: 'warning',
    title: { de: 'Ohne Schulabschluss ist der Weg länger, aber nicht zu', en: 'Without a school certificate the route is longer, not closed' },
    message: {
      de: 'Rechtlich verlangt kein Ausbildungsberuf in Deutschland einen bestimmten Schulabschluss – die Betriebe entscheiden. In Berufen mit starkem Bewerbermangel, etwa im Bau, in der Logistik, in der Gastronomie und in Teilen des Handwerks, wird regelmäßig ohne Abschluss eingestellt. Gleichzeitig ist ein nachgeholter Abschluss der stärkste einzelne Hebel, den es gibt.',
      en: 'Legally, no apprenticeship in Germany requires a specific school certificate — employers decide. In occupations with severe applicant shortages, such as construction, logistics, hospitality and parts of the crafts, people are regularly hired without one. At the same time, catching up on a certificate is the single strongest lever there is.',
    },
    advice: {
      de: [
        'Den Hauptschulabschluss nachholen: an einer Abendschule, über die Volkshochschule oder in einem Berufsvorbereitungsjahr. Das dauert oft ein Jahr und verändert alles.',
        'Eine Einstiegsqualifizierung (EQ) über die Arbeitsagentur: sechs bis zwölf Monate bezahltes Langzeitpraktikum in einem Betrieb, das häufig direkt in die Ausbildung übergeht.',
        'Die Assistierte Ausbildung nutzen: Begleitung durch einen Bildungsträger während der ganzen Ausbildung, kostenlos.',
        'Wichtig: Eine abgeschlossene Ausbildung zählt später mehr als jedes Schulzeugnis. Der Abschluss ist die Tür, nicht das Ziel.',
      ],
      en: [
        'Catch up on the basic school certificate: at an evening school, an adult education centre or in a pre-vocational year. That often takes a year and changes everything.',
        'An entry qualification via the employment agency: six to twelve months of paid long-term placement at a company, which frequently converts directly into an apprenticeship.',
        'Use assisted training: support from an education provider throughout the apprenticeship, free of charge.',
        'Important: a completed apprenticeship counts for more later than any school report. The certificate is the door, not the goal.',
      ],
    },
    links: [
      { label: 'Arbeitsagentur – Berufsberatung', url: 'https://www.arbeitsagentur.de/bildung/ausbildung' },
      { label: 'Einstiegsqualifizierung', url: 'https://www.arbeitsagentur.de/unternehmen/ausbilden/einstiegsqualifizierung' },
    ],
  },

  {
    id: 'study-dropout',
    severity: 'warning',
    title: { de: 'Jedes dritte Studium wird abgebrochen', en: 'One in three degrees is abandoned' },
    message: {
      de: 'Über alle Fächer brechen etwa 28 Prozent der Bachelorstudierenden ab, in Mathematik, Informatik und den Ingenieurfächern 40 bis über 50 Prozent. Der häufigste Grund ist nicht Faulheit, sondern der Bruch zwischen Schulstoff und Studienstoff sowie das Fehlen einer äußeren Struktur. Wer das vorher weiß, kann gegensteuern – oder einen anderen Weg zum gleichen Beruf wählen.',
      en: 'Across all subjects roughly 28 percent of bachelor students drop out; in maths, computer science and engineering it is 40 to over 50 percent. The most common reason is not laziness but the gap between school material and degree material, plus the absence of external structure. Knowing that in advance lets you act on it — or choose another route to the same job.',
    },
    advice: {
      de: [
        'Vorkurse mitmachen. Sie sind freiwillig, kostenlos und entscheiden in Mathematik und Physik häufig über das erste Jahr.',
        'Ein Vorlesungsskript des ersten Semesters lesen, bevor man sich einschreibt. Das dauert einen Abend und ist der ehrlichste Test.',
        'Duales Studium prüfen: gleicher Abschluss, mit Gehalt, festem Plan und Betreuung. Die Abbruchquoten liegen dort deutlich niedriger.',
        'Ein Abbruch ist keine Katastrophe, wenn man danach eine Ausbildung beginnt – aber zwei verlorene Jahre sind ärgerlich, wenn sie vermeidbar waren.',
      ],
      en: [
        'Take the preparatory courses. They are voluntary, free, and in maths and physics frequently decide the first year.',
        'Read a first-semester lecture script before enrolling. That takes an evening and is the most honest test there is.',
        'Consider a dual degree: the same qualification, with a salary, a fixed plan and support. Dropout rates there are markedly lower.',
        'Dropping out is no catastrophe if an apprenticeship follows — but two lost years are annoying when they were avoidable.',
      ],
    },
    links: [
      { label: 'DZHW – Studienabbruchquoten', url: 'https://www.dzhw.eu/forschung/projekt?pr_id=666' },
      { label: 'Hochschulkompass', url: 'https://www.hochschulkompass.de/' },
    ],
  },

  {
    id: 'dual-study-competition',
    severity: 'info',
    title: { de: 'Duales Studium: hart umkämpft und früh zu bewerben', en: 'Dual degrees: hotly contested and applied for early' },
    message: {
      de: 'Das duale Studium ist der beliebteste Weg überhaupt – Bachelor mit Gehalt und hoher Übernahmequote. Entsprechend kommen bei bekannten Unternehmen dreistellige Bewerberzahlen auf einen Platz, und die Bewerbungsfrist liegt oft zwölf bis achtzehn Monate vor dem Start.',
      en: 'The dual degree is the most popular route of all — a bachelor with a salary and a high retention rate. Accordingly, well-known companies receive hundreds of applications per place, and the deadline is often twelve to eighteen months before the start.',
    },
    advice: {
      de: [
        'Sehr früh bewerben: Für einen Start im Herbst laufen viele Fristen im Herbst des Vorjahres ab.',
        'Nicht nur Konzerne ansehen. Mittelständler, Stadtwerke, Sparkassen, Kliniken und Behörden bilden ebenfalls dual aus und bekommen einen Bruchteil der Bewerbungen.',
        'Vertrag prüfen: Viele enthalten eine Bindungsklausel mit Rückzahlungspflicht, wenn man kurz nach dem Abschluss geht.',
        'Semesterferien gibt es nicht – die Zeit gehört dem Betrieb. Wer ein Auslandssemester will, muss das vorher klären.',
      ],
      en: [
        'Apply very early: for an autumn start, many deadlines fall in the autumn of the previous year.',
        'Do not look only at large corporations. Mid-sized firms, municipal utilities, savings banks, hospitals and public authorities also offer dual degrees and receive a fraction of the applications.',
        'Check the contract: many include a retention clause with repayment obligations if you leave soon after graduating.',
        'There are no semester breaks — that time belongs to the company. Anyone wanting a semester abroad must clarify it beforehand.',
      ],
    },
    links: [{ label: 'AusbildungPlus – duale Studiengänge', url: 'https://www.bibb.de/ausbildungplus/' }],
  },

  {
    id: 'voluntary-year',
    severity: 'info',
    title: { de: 'Ein Jahr ausprobieren verliert kein Jahr', en: 'Trying things for a year does not lose you a year' },
    message: {
      de: 'Ein Freiwilliges Soziales Jahr oder ein Bundesfreiwilligendienst dauert sechs bis achtzehn Monate, ist bezahlt (Taschengeld, oft plus Unterkunft und Fahrkarte), und Kindergeld läuft weiter. In vielen Sozial- und Gesundheitsberufen gilt es als anerkanntes Vorpraktikum und verbessert die Bewerbung deutlich; in Medizin und Psychologie zählt es im Auswahlverfahren.',
      en: 'A voluntary social year or federal volunteer service lasts six to eighteen months, is paid (a stipend, often plus accommodation and a travel pass) and child benefit continues. In many social and health occupations it counts as a recognised preliminary placement and markedly improves an application; in medicine and psychology it counts in the selection procedure.',
    },
    advice: {
      de: [
        'Bereich bewusst wählen: Krankenhaus, Kita, Pflegeheim, Behindertenhilfe, Rettungsdienst, Naturschutz, Kultur oder Feuerwehr – jeweils ein völlig anderes Jahr.',
        'Wer merkt, dass es nicht passt, hat die wichtigste Erkenntnis gewonnen, die es in dieser Phase gibt.',
        'Ein Auslandsjahr über Erasmus+ oder weltwärts ist ebenfalls förderfähig.',
        'Die Plätze sind begehrt: für einen Start im Sommer im Winter davor bewerben.',
      ],
      en: [
        'Choose the field deliberately: a hospital, nursery, care home, disability service, ambulance service, nature conservation, culture or the fire brigade — each a completely different year.',
        'Anyone who finds it does not fit has gained the single most important insight available at this stage.',
        'A year abroad through Erasmus+ or a comparable programme can also be funded.',
        'Places are sought after: for a summer start, apply the winter before.',
      ],
    },
    links: [
      { label: 'Bundesfreiwilligendienst', url: 'https://www.bundes-freiwilligendienst.de/' },
      { label: 'Freiwilliges Soziales Jahr', url: 'https://www.pro-fsj.de/' },
    ],
  },

  {
    id: 'physical-wear',
    severity: 'warning',
    title: { de: 'Körperliche Berufe verschleißen – das gehört zur Planung', en: 'Physical occupations wear you out — plan for it' },
    message: {
      de: 'In Bau, Dachdeckerei, Pflege, Gartenbau und Logistik liegen die Quoten vorzeitiger Erwerbsminderung deutlich über dem Durchschnitt. Mit zwanzig merkt man davon nichts, mit fünfundvierzig sehr viel. Das ist kein Grund gegen diese Berufe – sie sind oft gut bezahlt, sicher und erfüllend. Es ist ein Grund, den zweiten Schritt von Anfang an mitzudenken.',
      en: 'In construction, roofing, nursing, horticulture and logistics, rates of early incapacity to work are markedly above average. At twenty you notice nothing; at forty-five, a great deal. That is not a reason against these occupations — they are often well paid, secure and fulfilling. It is a reason to plan the second step from the start.',
    },
    advice: {
      de: [
        'Den Meister, Techniker oder Polier nicht als Notlösung mit 45 einplanen, sondern als Etappe mit 25 bis 30.',
        'Auf Schutzausrüstung von Tag eins bestehen. Gehör, Rücken, Knie und Haut sind nicht reparierbar.',
        'Einen Betrieb daran messen, wie er mit Sicherheit und Pausen umgeht. Das ist der beste Einzelindikator für seine Qualität.',
        'Körperlich leichtere Nachbarberufe kennen: Bauzeichner statt Maurer, Technischer Produktdesigner statt Zerspanung, Hörakustik statt Pflege – gleiche Neigung, anderer Körpereinsatz.',
      ],
      en: [
        'Do not plan the master, technician or foreman qualification as a fallback at 45 but as a stage at 25 to 30.',
        'Insist on protective equipment from day one. Hearing, back, knees and skin cannot be repaired.',
        'Judge an employer by how it handles safety and breaks. That is the single best indicator of its quality.',
        'Know the physically lighter neighbouring jobs: building draughtsman instead of bricklayer, technical product designer instead of machining, hearing aid acoustics instead of nursing — the same inclination, a different physical load.',
      ],
    },
    links: [{ label: 'Deutsche Rentenversicherung – Erwerbsminderung', url: 'https://www.deutsche-rentenversicherung.de/' }],
  },

  {
    id: 'shift-health',
    severity: 'info',
    title: { de: 'Schichtdienst: gutes Geld, echter Preis', en: 'Shift work: good money, a real price' },
    message: {
      de: 'Schichtzuschläge liegen bei 20 bis 40 Prozent und machen manche Ausbildungsberufe zu den bestbezahlten überhaupt. Der Preis ist messbar: Wechselschicht über Jahre verschlechtert die Schlafqualität, erhöht Herz-Kreislauf-Risiken und kostet gemeinsame Abende mit allen, die normal arbeiten. Beides ist wahr, und beides sollte man vorher wissen.',
      en: 'Shift premiums run at 20 to 40 percent and make some apprenticeships among the best-paid there are. The price is measurable: rotating shifts over years worsen sleep quality, raise cardiovascular risk and cost you shared evenings with everyone who works normal hours. Both are true, and both are worth knowing beforehand.',
    },
    advice: {
      de: [
        'Vor der Entscheidung eine Nachtschicht oder einen Wochenenddienst mitlaufen, wenn der Betrieb es erlaubt. Eine Woche Vorstellung ersetzt keine Nacht.',
        'Nach dem Schichtmodell fragen: Zwei-Schicht, Drei-Schicht oder Vollkonti? Der Unterschied ist erheblich.',
        'Es gibt fast überall auch Stellen ohne Schicht – in der Instandhaltung, Planung, Qualitätssicherung oder Ausbildung des gleichen Betriebs.',
        'Wer Schicht bewusst wählt, sollte es wegen der freien Tage und der Zuschläge tun, nicht weil es sich nicht vermeiden ließ.',
      ],
      en: [
        'Before deciding, shadow a night shift or a weekend duty if the employer allows it. A week of imagining does not replace one night.',
        'Ask about the shift pattern: two-shift, three-shift or continuous? The difference is considerable.',
        'Almost everywhere there are also posts without shifts — in maintenance, planning, quality assurance or training at the same employer.',
        'Anyone choosing shifts deliberately should do it for the days off and the premiums, not because it seemed unavoidable.',
      ],
    },
  },

  {
    id: 'low-pay-reality',
    severity: 'critical',
    title: { de: 'Manche Traumberufe reichen nicht zum Leben', en: 'Some dream jobs do not pay enough to live on' },
    message: {
      de: 'Friseur, Florist, Kosmetik, Zahnmedizinische Fachangestellte, Tiermedizinische Fachangestellte und Teile der Gastronomie liegen in Vollzeit bei rund 2.200 bis 2.800 € brutto. In einer deutschen Großstadt braucht man für eine eigene Wohnung ohne Zuschüsse etwa 2.600 bis 3.200 €. Das ist kein Argument gegen diese Berufe – viele Menschen sind darin sehr glücklich. Es ist die Frage, die man vor dem Vertrag beantworten sollte und nicht drei Jahre danach.',
      en: 'Hairdressing, floristry, cosmetics, dental and veterinary assisting and parts of hospitality pay roughly €2,200 to €2,800 gross full-time. A flat of your own in a large German city needs about €2,600 to €3,200 without support. That is not an argument against these occupations — many people are very happy in them. It is the question to answer before signing rather than three years afterwards.',
    },
    advice: {
      de: [
        'Ehrlich rechnen: Miete, Nebenkosten, Versicherungen, Fahrtkosten, Lebensmittel. Die Arbeitsagentur und die Verbraucherzentralen haben dafür Rechner.',
        'Fragen, was Ausgelernte im Betrieb tatsächlich verdienen – nicht, was der Tarif sagt, wenn der Betrieb nicht tarifgebunden ist.',
        'Den Weg zum höheren Einkommen kennen: Meister und eigener Betrieb, Spezialisierung, Wechsel in Klinik, Industrie oder öffentlichen Dienst. In diesen Berufen liegt das Einkommen meist hinter einem zweiten Schritt.',
        'Nachbarberufe mit ähnlicher Neigung vergleichen: Hörakustik statt Friseur, Podologie statt Kosmetik, Gartenbau statt Floristik, Diätassistenz statt Gastronomie – jeweils deutlich besser bezahlt.',
      ],
      en: [
        'Do the sums honestly: rent, bills, insurance, travel, food. The employment agency and consumer advice centres have calculators for this.',
        'Ask what qualified staff at that employer actually earn — not what the agreement says if the employer is not covered by one.',
        'Know the route to a higher income: the master qualification and your own business, specialisation, a move to a hospital, industry or the public sector. In these occupations the income usually lies behind a second step.',
        'Compare neighbouring occupations with a similar inclination: hearing aid acoustics instead of hairdressing, podiatry instead of cosmetics, horticulture instead of floristry — each markedly better paid.',
      ],
    },
    links: [{ label: 'Entgeltatlas der Bundesagentur für Arbeit', url: 'https://web.arbeitsagentur.de/entgeltatlas' }],
  },

  {
    id: 'animal-jobs',
    severity: 'warning',
    title: { de: '„Irgendwas mit Tieren" ist der überlaufenste Wunsch', en: '"Something with animals" is the most oversubscribed wish' },
    message: {
      de: 'Auf einen Ausbildungsplatz als Tierpfleger in einem großen Zoo kommen regelmäßig 300 bis 800 Bewerbungen. Gleichzeitig suchen Tierarztpraxen, Landwirtschaftsbetriebe und Forschungseinrichtungen dringend Personal und finden keines. Der Wunsch ist also nicht das Problem – die Vorstellung davon, wie er sich erfüllen lässt, ist es.',
      en: 'A training place as a zookeeper at a large zoo regularly attracts 300 to 800 applications. At the same time veterinary practices, farms and research facilities are urgently short of staff and cannot find any. So the wish is not the problem — the assumption about how to fulfil it is.',
    },
    advice: {
      de: [
        'Tiermedizinische Fachangestellte: echte Arbeit mit Tieren, fachliche Tiefe, und Praxen suchen überall. Der realistischste Weg.',
        'Landwirt mit Tierhaltung: tägliche Verantwortung für Tiere, gute Chancen, gute Bezahlung.',
        'Tierpfleger in Forschung und Klinik statt im Zoo: derselbe Abschluss, deutlich mehr freie Plätze – aber Versuchstiere gehören dazu, das muss man vorher klären.',
        'Der Alltag ist zu vier Fünfteln Ausmisten, Füttern und Transportieren. Ein Ehrenamt im Tierheim zeigt das in zwei Wochenenden.',
        'Tierarzt studieren hat einen Numerus Clausus um 1,0 bis 1,3 – ähnlich hart wie Medizin.',
      ],
      en: [
        'Veterinary assistant: real work with animals, genuine professional depth, and practices are hiring everywhere. The most realistic route.',
        'Farmer with livestock: daily responsibility for animals, good chances, good pay.',
        'Animal keeper in research and clinical settings rather than a zoo: the same qualification, markedly more vacancies — but laboratory animals are part of it, which has to be settled beforehand.',
        'Four fifths of the daily work is mucking out, feeding and hauling. Volunteering at a shelter shows that in two weekends.',
        'Studying veterinary medicine has a numerus clausus around 1.0 to 1.3 — about as hard as medicine.',
      ],
    },
  },

  {
    id: 'creator-reality',
    severity: 'critical',
    title: { de: 'Streaming, Social Media und Spieleentwicklung: die Zahlen', en: 'Streaming, social media and game development: the numbers' },
    message: {
      de: 'Von Streaming oder Social Media leben in Deutschland einige tausend Menschen; ein Einkommen über dem Mindestlohn erreichen nur die obersten Prozente, und die Einnahmen hängen an Plattformen, die ihre Regeln ohne Vorwarnung ändern. Spieleentwicklung ist ein echter Beruf – aber die Branche hat zwischen 2023 und 2025 weltweit Zehntausende Stellen abgebaut, und dieselben Fähigkeiten verdienen in einer normalen IT-Stelle 30 bis 50 Prozent mehr.',
      en: 'A few thousand people in Germany make a living from streaming or social media; only the top few percent earn above the minimum wage, and income depends on platforms that change their rules without notice. Game development is a real profession — but the industry cut tens of thousands of jobs worldwide between 2023 and 2025, and the same skills earn 30 to 50 percent more in an ordinary IT job.',
    },
    advice: {
      de: [
        'Beides parallel betreiben: eine Ausbildung oder ein Studium, die tragen, und den Kanal oder die Spiele daneben. Das ist kein Verrat am Traum, sondern seine Finanzierung.',
        'Mediengestalter Digital und Print oder Mediengestalter Bild und Ton sind vergütete Ausbildungen mit denselben Werkzeugen.',
        'In der Spieleentwicklung zählt ein fertiges kleines Spiel mehr als zehn angefangene große. Zwei Wochen mit Godot oder Unity beantworten mehr als ein Jahr Nachdenken.',
        'Wer die Fähigkeiten hat, findet sie auch in Simulation, Visualisierung, Architekturdarstellung und Industrie-3D wieder – dort sicher und besser bezahlt.',
        'Vorsicht bei privaten Spieleschulen: 500 bis 800 € im Monat, Vermittlungsquoten ohne Nachweis. Staatliche Hochschulen bieten dasselbe Fach kostenlos.',
      ],
      en: [
        'Do both in parallel: training or a degree that sustains you, and the channel or the games alongside. That is not a betrayal of the dream but its funding.',
        'Media design or audiovisual media design are paid apprenticeships using the same tools.',
        'In game development, one finished small game counts for more than ten started big ones. Two weeks with Godot or Unity answer more than a year of thinking.',
        'Anyone with the skills will find them again in simulation, visualisation, architectural rendering and industrial 3D — secure and better paid there.',
        'Be careful with private game schools: €500 to €800 a month and placement rates without evidence. State institutions teach the same subject for free.',
      ],
    },
    links: [{ label: 'game – Verband der deutschen Games-Branche', url: 'https://www.game.de/marktdaten/' }],
  },

  {
    id: 'medicine-nc',
    severity: 'warning',
    title: { de: 'Medizin: der Numerus Clausus ist nicht das Ende', en: 'Medicine: the numerus clausus is not the end' },
    message: {
      de: 'Für Medizin reicht in der Abiturbestenquote meist nur ein Schnitt um 1,0 bis 1,3, für Psychologie und Psychotherapie 1,0 bis 1,5. Das schließt viele aus, die den Beruf gut ausüben würden. Es gibt aber mehr Wege als die Bestenquote – und eine Reihe von Gesundheitsberufen, die fachlich nah, deutlich schneller erreichbar und teilweise besser bezahlt sind als viele denken.',
      en: 'For medicine, the top-grades quota usually needs an average around 1.0 to 1.3; for psychology and psychotherapy, 1.0 to 1.5. That excludes many people who would practise the profession well. But there are more routes than the top-grades quota — and a range of health occupations that are professionally close, far quicker to reach and in some cases better paid than people assume.',
    },
    advice: {
      de: [
        'Den Test für medizinische Studiengänge (TMS) machen. Er verbessert die Chancen in der Zusatzquote erheblich, ist aber nur einmal möglich – deshalb ernsthaft vorbereiten.',
        'Eine Pflegeausbildung oder ein Freiwilligendienst zählt in der Zusatzquote mehrerer Bundesländer und macht gleichzeitig zur besseren Ärztin.',
        'Studium im Ausland (Österreich, Niederlande, Ungarn) ist ein realer Weg; die Anerkennung innerhalb der EU ist geregelt. Kosten und Sprache vorher klären.',
        'Fachlich nah und ohne Numerus Clausus: Medizinische Technologie für Radiologie, Notfallsanitäter, Physician Assistant, Hebammenwissenschaft, Pflege mit Studium, Medizinphysik, Apotheker.',
        'Wartesemester sind weiterhin ein gangbarer, wenn auch langsamer Weg.',
      ],
      en: [
        'Take the medical aptitude test (TMS). It markedly improves your chances in the additional quota, but can only be taken once — so prepare seriously.',
        'Nursing training or voluntary service counts in the additional quota in several federal states and makes you a better doctor at the same time.',
        'Studying abroad (Austria, the Netherlands, Hungary) is a real route; recognition within the EU is regulated. Clarify cost and language beforehand.',
        'Professionally close and without a numerus clausus: radiologic technology, paramedic, physician assistant, midwifery science, nursing with a degree, medical physics, pharmacy.',
        'Waiting semesters remain a viable if slow route.',
      ],
    },
    links: [
      { label: 'hochschulstart.de', url: 'https://www.hochschulstart.de/' },
      { label: 'TMS – Test für medizinische Studiengänge', url: 'https://www.tms-info.org/' },
    ],
  },

  {
    id: 'uniform-selection',
    severity: 'warning',
    title: { de: 'Polizei, Feuerwehr, Zoll: am Auswahlverfahren scheitern die meisten', en: 'Police, fire service, customs: most people fail at the selection stage' },
    message: {
      de: 'Bei der Polizei fallen je Bundesland 60 bis 80 Prozent der Bewerber durch – am Sporttest, am Deutschtest, am Intelligenztest oder an der ärztlichen Untersuchung. Bei der Berufsfeuerwehr kommt dazu, dass fast überall eine abgeschlossene Berufsausbildung vorausgesetzt wird: Direkt nach der Schule geht es dort nicht.',
      en: 'In the police, 60 to 80 percent of applicants fail depending on the federal state — at the fitness test, the German test, the cognitive test or the medical. With professional fire services there is the added point that almost everywhere a completed apprenticeship is required: straight from school is not possible.',
    },
    advice: {
      de: [
        'Sporttest über Monate trainieren, nicht über Wochen. Die Anforderungen sind veröffentlicht und lassen sich gezielt üben.',
        'Deutsch- und Wissenstest üben: Rechtschreibung und Allgemeinwissen sind die häufigsten Stolpersteine.',
        'Tätowierungs- und Sehstärkeregeln unterscheiden sich je Bundesland. Vor der Bewerbung prüfen, nicht während des Verfahrens.',
        'Für die Feuerwehr: erst eine handwerkliche Ausbildung wählen, die dort gern gesehen wird – Anlagenmechanik, Elektro, Metall, Mechatronik –, und parallel in die Freiwillige Feuerwehr eintreten.',
        'Ein Verfahren nicht zu schaffen, ist kein Urteil über eine Person. Mehrere Bundesländer prüfen unterschiedlich, und eine Wiederholung ist üblich.',
      ],
      en: [
        'Train for the fitness test over months, not weeks. The requirements are published and can be practised specifically.',
        'Practise the German and knowledge tests: spelling and general knowledge are the most common stumbling blocks.',
        'Tattoo and eyesight rules differ by federal state. Check before applying, not during the procedure.',
        'For the fire service: first choose a trade apprenticeship they value — plumbing, electrical, metal, mechatronics — and join the volunteer fire service alongside.',
        'Failing a procedure is no judgement on a person. Different states assess differently, and reapplying is normal.',
      ],
    },
  },

  {
    id: 'creative-market',
    severity: 'warning',
    title: { de: 'Kreativberufe: Talent ist die Voraussetzung, nicht der Beruf', en: 'Creative careers: talent is the prerequisite, not the job' },
    message: {
      de: 'Design, Fotografie, Film und Journalismus sind echte Berufe mit echten Stellen – aber die Zahl der Bewerber übersteigt die Zahl der Plätze deutlich, und generative Werkzeuge verändern gerade, was an ausführender Gestaltung bezahlt wird. Was bleibt und wertvoller wird, ist Konzeption, Beurteilung, Kundenführung und handwerkliche Verantwortung.',
      en: 'Design, photography, film and journalism are real professions with real posts — but applicants clearly outnumber places, and generative tools are changing what executing design work is paid for. What remains and grows more valuable is concept, judgement, client handling and craft responsibility.',
    },
    advice: {
      de: [
        'Eine Mappe ist in diesem Feld wichtiger als jedes Zeugnis. Zehn eigene, fertige Arbeiten schlagen einen Notenschnitt – und lassen sich in drei Monaten aufbauen.',
        'Mediengestalter Digital und Print oder Bild und Ton sind vergütete Ausbildungen: derselbe Bereich, mit Gehalt und anerkanntem Abschluss.',
        'Vorsicht bei privaten Kreativhochschulen: hohe Gebühren, Mappenprüfung als Formalie. Staatliche Hochschulen und Kunsthochschulen sind kostenfrei; ein Jahr Mappenvorbereitung dafür ist gut investiert.',
        'Die Nischen tragen sich: Industrie- und Architekturfotografie, wissenschaftliche Visualisierung, Interface-Gestaltung, Fachjournalismus, Unternehmenskommunikation.',
        'Mappenberatungen staatlicher Hochschulen sind kostenlos und die beste Rückmeldung, die es gibt.',
      ],
      en: [
        'A portfolio matters more in this field than any certificate. Ten finished pieces of your own beat a grade average — and can be built in three months.',
        'Media design and audiovisual media design are paid apprenticeships: the same field, with a salary and a recognised qualification.',
        'Be careful with private creative colleges: high fees, portfolio review as a formality. State institutions and art academies are free; a year spent preparing a portfolio for them is well invested.',
        'The niches do sustain themselves: industrial and architectural photography, scientific visualisation, interface design, specialist journalism, corporate communications.',
        'Portfolio consultations at state institutions are free and the best feedback available.',
      ],
    },
  },

  {
    id: 'pro-sport',
    severity: 'warning',
    title: { de: 'Sport als Beruf heißt fast immer: nicht als Sportler', en: 'Sport as a career almost always means: not as an athlete' },
    message: {
      de: 'In Deutschland leben einige tausend Menschen vom Leistungssport, und die Laufbahn endet meist vor dem dreißigsten Lebensjahr. Gleichzeitig ist der Gesundheits-, Fitness- und Sportmarkt einer der wachsenden – in Berufen, die man bis zur Rente ausüben kann.',
      en: 'A few thousand people in Germany live from competitive sport, and the career usually ends before the age of thirty. At the same time the health, fitness and sport market is one of the growing ones — in occupations you can practise until retirement.',
    },
    advice: {
      de: [
        'Sport- und Fitnesskaufmann: eine anerkannte kaufmännische Ausbildung im Sportumfeld, mit Aufstieg zur Studioleitung.',
        'Physiotherapie oder Sportwissenschaft: Arbeit am Körper und mit Menschen, gute Nachfrage.',
        'Sportlehramt: verbeamtet, mit Schulferien, und Sport bleibt täglich dabei.',
        'Wer Leistungssport treibt: Die Sportfördergruppen der Bundeswehr und der Polizei sind der etablierte Weg, beides zu verbinden.',
        'Trainerlizenzen der Verbände sind neben jeder Ausbildung erwerbbar und öffnen das Nebenberufliche sofort.',
      ],
      en: [
        'Sport and fitness manager: a recognised commercial apprenticeship in a sporting environment, with progression to gym management.',
        'Physiotherapy or sports science: work on the body and with people, with good demand.',
        'Teaching sport: tenured, with school holidays, and sport stays part of every day.',
        'For competitive athletes: the sport promotion groups of the armed forces and the police are the established way to combine both.',
        'Coaching licences from the governing bodies can be earned alongside any training and open part-time work immediately.',
      ],
    },
  },

  {
    id: 'funding-advice',
    severity: 'info',
    title: { de: 'Es gibt mehr Geld, als die meisten wissen', en: 'There is more funding than most people know' },
    message: {
      de: 'Der häufigste Grund, warum Jugendliche eine passende Ausbildung ausschließen, ist Geld – und in vielen Fällen ist das vermeidbar. Für schulische Ausbildungen und Studium gibt es BAföG, für betriebliche Ausbildungen die Berufsausbildungsbeihilfe, für Meister und Techniker das Aufstiegs-BAföG, dazu Wohngeld, Kinderzuschlag und mehrere tausend Stipendienprogramme.',
      en: 'The most common reason young people rule out a suitable training route is money — and in many cases that is avoidable. For school-based training and degrees there is BAföG, for company-based apprenticeships a vocational training allowance, for master and technician qualifications Aufstiegs-BAföG, plus housing benefit, child supplements and several thousand scholarship programmes.',
    },
    advice: {
      de: [
        'Beratungstermin bei der Berufsberatung der Arbeitsagentur machen. Sie ist kostenlos, unabhängig und rechnet konkret durch, was zusteht.',
        'BAföG beantragen, auch wenn man glaubt, es stehe nicht zu. Die Elterneinkommensgrenzen sind höher, als die meisten annehmen.',
        'Aufstiegs-BAföG übernimmt einen großen Teil der Meister- und Technikerkosten und erlässt bei Erfolg weitere Anteile.',
        'Stipendien gibt es nicht nur für Bestnoten: viele fördern nach Engagement, Herkunft oder Fachrichtung.',
        'Bei schulischen Ausbildungen gezielt nach schulgeldfreien und vergüteten Varianten suchen. Bei Pflege, Therapie und Erziehung gibt es sie teilweise – und der Unterschied beträgt über drei Jahre bis zu 20.000 €.',
      ],
      en: [
        'Book an appointment with the employment agency\'s careers advice service. It is free, independent and works out concretely what you are entitled to.',
        'Apply for BAföG even if you think you are not eligible. The parental income thresholds are higher than most people assume.',
        'Aufstiegs-BAföG covers a large share of master and technician costs and forgives further amounts on success.',
        'Scholarships are not only for top grades: many fund based on commitment, background or subject.',
        'For school-based training, search specifically for fee-free and paid variants. In nursing, therapy and childcare they partly exist — and over three years the difference reaches €20,000.',
      ],
    },
    links: [
      { label: 'BAföG', url: 'https://www.bafoeg-digital.de/' },
      { label: 'Aufstiegs-BAföG', url: 'https://www.aufstiegs-bafoeg.de/' },
      { label: 'Stipendienlotse', url: 'https://www.stipendienlotse.de/' },
    ],
  },

  {
    id: 'local-market',
    severity: 'info',
    title: { de: 'Am Wohnort bleiben schränkt die Auswahl ein – unterschiedlich stark', en: 'Staying local narrows the choice — to differing degrees' },
    message: {
      de: 'Handwerk, Pflege, Handel, Verwaltung, Kita und Logistik gibt es in jeder Stadt und fast jedem Dorf. Spezialisierte Industrie, Forschung, Medien und duale Studiengänge bei bekannten Unternehmen gibt es nur an wenigen Orten. Wer nicht umziehen kann oder will, sollte das bei der Berufswahl mitdenken – nicht bei der Bewerbung.',
      en: 'The crafts, care work, retail, administration, childcare and logistics exist in every town and almost every village. Specialised industry, research, media and dual degrees at well-known companies exist in only a few places. Anyone who cannot or will not relocate should factor that into the choice of occupation — not into the application.',
    },
    advice: {
      de: [
        'Die Lehrstellenbörse der Arbeitsagentur und die der Kammern nach Postleitzahl durchsuchen. Das zeigt in fünf Minuten, was tatsächlich erreichbar ist.',
        'Fahrtzeit ehrlich rechnen: Eine Stunde mit dem Zug ist an fünf Tagen in der Woche etwas anderes als einmal zur Besichtigung.',
        'Ein Azubi-Ticket oder das Deutschlandticket macht einen weiteren Radius oft doch bezahlbar.',
        'Ein Wohnheim oder eine Ausbildungs-WG am Ausbildungsort ist eine Option, die viele nicht auf dem Schirm haben; Kammern und Träger vermitteln.',
      ],
      en: [
        'Search the employment agency\'s and the chambers\' apprenticeship listings by postcode. That shows in five minutes what is actually reachable.',
        'Calculate travel time honestly: an hour by train five days a week is different from one visit.',
        'An apprentice travel pass or a nationwide ticket often makes a wider radius affordable after all.',
        'A hostel or shared flat at the training location is an option many do not consider; chambers and providers help arrange them.',
      ],
    },
    links: [{ label: 'Lehrstellenbörse der Arbeitsagentur', url: 'https://www.arbeitsagentur.de/jobsuche/' }],
  },

  {
    id: 'abroad-recognition',
    severity: 'info',
    title: { de: 'Ins Ausland: vorher die Anerkennung klären', en: 'Going abroad: settle recognition beforehand' },
    message: {
      de: 'Ein Teil der Ausbildung oder des Studiums im Ausland ist förderfähig und in jeder Bewerbung ein Vorteil. Bei reglementierten Berufen – Medizin, Pflege, Therapie, Lehramt, Rechtsberufe – ist die Anerkennung eines vollständig im Ausland erworbenen Abschlusses in Deutschland aufwendig und manchmal unvollständig. Innerhalb der EU ist es geregelt, außerhalb oft nicht.',
      en: 'Part of your training or degree abroad can be funded and is an advantage in any application. For regulated professions — medicine, nursing, therapy, teaching, legal professions — recognising a qualification obtained entirely abroad is laborious in Germany and sometimes incomplete. Within the EU it is regulated; outside it often is not.',
    },
    advice: {
      de: [
        'Erasmus+ fördert auch Auslandsabschnitte in der dualen Ausbildung – drei Wochen bis ein Jahr, mit Zuschuss.',
        'Bei reglementierten Berufen vor der Einschreibung bei der zuständigen Anerkennungsstelle nachfragen. Das ist eine Mail, die Jahre spart.',
        'Sprache auf Fachniveau einplanen, nicht auf Urlaubsniveau: Ein Studium in Ungarn oder den Niederlanden läuft in der Landessprache oder auf Englisch, nicht nebenbei.',
        'In mehreren Nachbarländern gibt es keinen Numerus Clausus, wo es hier einen gibt – das ist ein realer Weg, aber ein teurer.',
      ],
      en: [
        'Erasmus+ also funds periods abroad within a dual apprenticeship — three weeks to a year, with a grant.',
        'For regulated professions, ask the competent recognition authority before enrolling. That is one email that saves years.',
        'Plan for the language at professional, not holiday, level: a degree in Hungary or the Netherlands runs in the national language or in English, not on the side.',
        'Several neighbouring countries have no numerus clausus where Germany does — a real route, but an expensive one.',
      ],
    },
    links: [
      { label: 'Anerkennung in Deutschland', url: 'https://www.anerkennung-in-deutschland.de/' },
      { label: 'Erasmus+ für Auszubildende', url: 'https://www.machmehrausdeinerausbildung.de/' },
    ],
  },

  {
    id: 'climate-jobs',
    severity: 'info',
    title: { de: 'Klimaschutz ist überwiegend ein Handwerk', en: 'Climate action is predominantly a trade' },
    message: {
      de: 'Wer an Klima und Umwelt arbeiten will, denkt oft an Umweltwissenschaften oder eine Organisation. Tatsächlich hängt die Energiewende an Anlagenmechanikern, Elektronikern, Dachdeckern, Zimmerern und Techniker: Wärmepumpen, Photovoltaik, Ladeinfrastruktur, Dämmung, Holzbau, Netze. Das sind die Berufe, in denen der Mangel am größten und die Wirkung am unmittelbarsten ist.',
      en: 'Anyone wanting to work on climate and the environment often thinks of environmental science or an organisation. In reality the energy transition depends on plumbers, electricians, roofers, carpenters and technicians: heat pumps, photovoltaics, charging infrastructure, insulation, timber construction, grids. Those are the occupations where the shortage is greatest and the effect most immediate.',
    },
    advice: {
      de: [
        'Anlagenmechanik für Sanitär, Heizung, Klima und Elektroniker für Energie- und Gebäudetechnik sind die beiden Berufe, an denen die Wärmewende praktisch hängt – und die gesuchtesten im Handwerk.',
        'Zimmerer und Holzbau wachsen, weil Holzbau klimafreundlicher ist als Beton.',
        'Umwelttechnologe für Wasserversorgung und Abwasser: sicher, tarifgebunden, nahezu unbekannt.',
        'Nach dem Gesellenbrief: Gebäudeenergieberater, Fachkraft für Photovoltaik oder Wärmepumpen – kurze Weiterbildungen mit direkter Wirkung auf Gehalt und Aufgaben.',
        'Bei Betrieben fragen, ob sie schon Wärmepumpen und Photovoltaik machen. Das entscheidet, wie zukunftsfähig die Ausbildung ist.',
      ],
      en: [
        'Plumbing and heating, and electrical installation for buildings, are the two occupations the heating transition practically depends on — and the most sought-after in the trades.',
        'Carpentry and timber construction are growing, because timber is more climate-friendly than concrete.',
        'Environmental technologist for water supply and wastewater: secure, collectively agreed, almost unknown.',
        'After qualifying: building energy consultant, photovoltaics or heat pump specialist — short courses with a direct effect on pay and tasks.',
        'Ask employers whether they already fit heat pumps and photovoltaics. That decides how future-proof the training is.',
      ],
    },
  },

  {
    id: 'try-before-deciding',
    severity: 'info',
    title: { de: 'Was man nicht erlebt hat, kann man nicht einschätzen', en: 'You cannot assess what you have not experienced' },
    message: {
      de: 'Die ehrlichste Antwort auf „kann ich das aushalten?" ist nicht eine Selbsteinschätzung, sondern ein Tag im Betrieb. Das gilt besonders für seelisch belastende Berufe, für Schichtdienst, für körperliche Arbeit und für alles, was man nur aus Erzählungen kennt. Fast alle Fehlentscheidungen bei der Berufswahl beruhen auf Vorstellungen, nicht auf Erfahrungen.',
      en: 'The most honest answer to "can I cope with this?" is not a self-assessment but a day at the workplace. That applies especially to emotionally demanding jobs, shift work, physical work and anything you only know from other people\'s accounts. Almost all bad career decisions rest on assumptions rather than experience.',
    },
    advice: {
      de: [
        'Ein Praktikum bewusst in der unangenehmen Zeit legen: im November statt im Mai, samstags statt mittwochs, im Abenddienst statt morgens.',
        'Nach einer Nachtschicht, einem Wochenenddienst oder einem Zerlegetag fragen. Betriebe lassen das häufiger zu, als man denkt.',
        'Zwei Betriebe im gleichen Beruf vergleichen. Der Unterschied zwischen ihnen ist oft größer als der zwischen zwei Berufen.',
        'Ein Freiwilligendienst ist die ausführlichste Form dieser Prüfung – und zählt in vielen Bewerbungsverfahren.',
      ],
      en: [
        'Deliberately schedule a placement at the unpleasant time: in November rather than May, on a Saturday rather than a Wednesday, on an evening shift rather than a morning.',
        'Ask to join a night shift, a weekend duty or a butchering day. Employers allow this more often than you would think.',
        'Compare two employers in the same occupation. The difference between them is often larger than between two occupations.',
        'Voluntary service is the most thorough form of this test — and counts in many application procedures.',
      ],
    },
  },

  {
    id: 'alternative-routes',
    severity: 'info',
    title: { de: 'Ohne Abitur ist kein Weg dauerhaft zu', en: 'Without an Abitur no route is permanently closed' },
    message: {
      de: 'Das deutsche System sieht starrer aus, als es ist. Eine abgeschlossene Ausbildung plus drei Jahre Berufserfahrung öffnet ein fachlich passendes Studium in allen Bundesländern. Meister, Techniker und Fachwirt sind dem Bachelor formal gleichgestellt und öffnen ebenfalls die Hochschule – der Betriebswirt sogar dem Master. Wer mit sechzehn eine Entscheidung trifft, entscheidet über die Reihenfolge, nicht über das Ende.',
      en: 'The German system looks more rigid than it is. A completed apprenticeship plus three years of work experience opens a subject-related degree in every federal state. The master craftsman, technician and business specialist qualifications rank formally alongside a bachelor and also open university access — the business administrator even at master level. Anyone deciding at sixteen decides the order, not the destination.',
    },
    advice: {
      de: [
        'Ausbildung zuerst ist oft der bessere Weg zum gleichen Ziel: mit Gehalt, mit Praxis und mit der Möglichkeit, das Studium später bezahlt zu machen.',
        'Viele Betriebe finanzieren ein berufsbegleitendes Studium für gute Ausgelernte. Fragen kostet nichts.',
        'Fachhochschulreife lässt sich parallel zur Ausbildung erwerben, in mehreren Bundesländern über die Berufsschule.',
        'Das duale Studium verbindet beides von Anfang an – wenn man einen Platz bekommt.',
      ],
      en: [
        'Training first is often the better route to the same goal: with a salary, with practice, and with the option of doing the degree later, paid for.',
        'Many employers fund part-time degrees for strong qualified staff. Asking costs nothing.',
        'A Fachhochschulreife can be earned alongside an apprenticeship, in several states via the vocational school.',
        'A dual degree combines both from the start — if you get a place.',
      ],
    },
  },

  {
    id: 'allergy-check',
    severity: 'warning',
    title: { de: 'Allergien vor der Ausbildung testen lassen, nicht danach', en: 'Get allergies tested before the apprenticeship, not after' },
    message: {
      de: 'Mehlstaub in der Bäckerei, Tierhaare in der Tierpflege und Tierarztpraxis, Pollen im Gartenbau und in der Floristik, Lösemittel im Malerhandwerk, Kühlschmierstoffe in der Zerspanung, Latex in Gesundheitsberufen: Berufsbedingte Allergien und Hauterkrankungen sind eine der häufigsten Ursachen für Ausbildungsabbrüche und Umschulungen – und sie sind vorher feststellbar.',
      en: 'Flour dust in a bakery, animal hair in animal care and veterinary practices, pollen in horticulture and floristry, solvents in painting, cutting fluids in machining, latex in health occupations: occupational allergies and skin conditions are among the most common causes of abandoned apprenticeships and retraining — and they can be established beforehand.',
    },
    advice: {
      de: [
        'Vor der Bewerbung zum Allergologen: Ein Test kostet nichts und beantwortet eine Frage, die sonst drei Jahre später kommt.',
        'Der Betriebsarzt des Ausbildungsbetriebs führt eine Eignungsuntersuchung durch. Sie ist eine Hilfe, keine Hürde.',
        'Bei bekannter Allergie nicht automatisch aufgeben: Schutzmaßnahmen, Absaugung und Handschuhdisziplin machen manches möglich. Die Frage ist, wie konsequent der Betrieb damit umgeht.',
        'Hautschutz von Tag eins ernst nehmen. Handekzeme im Friseur- und Pflegebereich entstehen in den ersten Monaten, nicht nach Jahren.',
      ],
      en: [
        'See an allergist before applying: a test costs nothing and answers a question that otherwise arrives three years later.',
        'The training company\'s occupational physician carries out a fitness assessment. It is a help, not a hurdle.',
        'With a known allergy, do not automatically give up: protective measures, extraction and glove discipline make some things possible. The question is how consistently the employer handles it.',
        'Take skin protection seriously from day one. Hand eczema in hairdressing and care work develops in the first months, not after years.',
      ],
    },
  },

  {
    id: 'colour-vision',
    severity: 'warning',
    title: { de: 'Farbsehschwäche schließt einige Berufe aus – und viele nicht', en: 'Colour vision deficiency rules out some occupations — and many not' },
    message: {
      de: 'Rot-Grün-Sehschwäche betrifft etwa acht Prozent der Männer und schließt in der Praxis Elektroberufe aus, weil Adernfarben verwechselt werden können, sowie Teile der Gestaltung, der Druckvorstufe und der Augenoptik. Für die große Mehrheit der Berufe spielt sie keine Rolle – die Betroffenen erfahren das aber oft erst im Auswahlverfahren.',
      en: 'Red-green colour vision deficiency affects about eight percent of men and in practice rules out electrical trades, because wire colours can be confused, along with parts of design, prepress and optometry. For the great majority of occupations it is irrelevant — but those affected often only find out during a selection procedure.',
    },
    advice: {
      de: [
        'Beim Augenarzt einen Ishihara-Test machen lassen, falls es nie geprüft wurde. Das dauert fünf Minuten.',
        'Die Anforderungen sind betriebsabhängig: In manchen Bereichen der Elektrotechnik geht es mit Einschränkungen. Nachfragen lohnt.',
        'Nachbarberufe mit ähnlicher Neigung: Mechatronik, Industriemechanik, Anlagenmechanik, IT-Systemintegration, Feinwerkmechanik – alle ohne Farbanforderung.',
      ],
      en: [
        'Have an Ishihara test at an ophthalmologist if it was never checked. It takes five minutes.',
        'Requirements depend on the employer: in some areas of electrical engineering it works with restrictions. Asking is worthwhile.',
        'Neighbouring occupations with a similar inclination: mechatronics, industrial mechanics, plumbing, IT system administration, precision engineering — none with a colour requirement.',
      ],
    },
  },

  {
    id: 'mental-health-support',
    severity: 'info',
    title: { de: 'Psychische Belastbarkeit ist eine Anforderung, kein Charakterurteil', en: 'Psychological resilience is a requirement, not a verdict on character' },
    message: {
      de: 'Rettungsdienst, Pflege, Polizei, Jugendamt und Feuerwehr verlangen, Bilder und Situationen zu verarbeiten, die niemand freiwillig sucht. Wer weiß, dass seine Belastbarkeit begrenzt ist, handelt verantwortlich – für sich und für die Menschen, die auf ihn angewiesen wären. Es gibt viele Berufe mit hohem Sinnempfinden, die diese Belastung nicht enthalten.',
      en: 'Ambulance work, nursing, policing, youth welfare and the fire service require processing images and situations nobody seeks voluntarily. Anyone who knows their resilience is limited is acting responsibly — for themselves and for the people who would depend on them. There are many meaningful occupations that do not contain this strain.',
    },
    advice: {
      de: [
        'Sinnvolle Arbeit ohne akute Belastung: Ergotherapie, Logopädie, Hörakustik, Heilerziehungspflege, Erzieher, Lehramt, Sozialversicherung, Umwelttechnik.',
        'Bei Interesse an belastenden Feldern: Träger danach auswählen, ob es Supervision und psychosoziale Nachsorge gibt. Fehlt beides, ist das ein Ausschlussgrund für den Betrieb, nicht für den Beruf.',
        'Ein Freiwilligendienst ist der geschützteste Weg, das an sich selbst zu prüfen – mit Begleitung und ohne Vertragsbindung über Jahre.',
      ],
      en: [
        'Meaningful work without acute strain: occupational therapy, speech therapy, hearing aid acoustics, curative education, childcare, teaching, social insurance, environmental engineering.',
        'If interested in demanding fields: choose the employer by whether supervision and psychosocial aftercare exist. If both are missing, that disqualifies the employer, not the occupation.',
        'Voluntary service is the most protected way to test this on yourself — with support and without a contract binding you for years.',
      ],
    },
  },

  {
    id: 'english-matters',
    severity: 'info',
    title: { de: 'Englisch ist in einigen Berufen ein Werkzeug, nicht ein Schulfach', en: 'In some occupations English is a tool, not a school subject' },
    message: {
      de: 'In der IT sind Dokumentation, Fehlermeldungen und Fachliteratur praktisch vollständig englisch. Im Außenhandel, in der Hotellerie, in Forschung und Technik sind Gespräche auf Englisch Alltag. Schwaches Englisch schließt diese Bereiche nicht aus, macht den Einstieg aber deutlich mühsamer – und es ist die Fähigkeit, die man am schnellsten verbessern kann.',
      en: 'In IT, documentation, error messages and technical literature are practically all in English. In foreign trade, hospitality, research and engineering, conversations in English are routine. Weak English does not exclude these fields but makes entry markedly harder — and it is the skill you can improve fastest.',
    },
    advice: {
      de: [
        'Fachenglisch ist leichter als Schulenglisch: Der Wortschatz ist klein und wiederholt sich. Wer Handbücher liest, kommt in Monaten weit.',
        'Viele Berufsschulen bieten Zusatzunterricht Fachenglisch mit Zertifikat an. Das ist im Lebenslauf sichtbar.',
        'Ein Erasmus+-Abschnitt in der Ausbildung ist gefördert und bringt mehr als drei Jahre Unterricht.',
        'Berufe ohne Englischbedarf gibt es reichlich: Handwerk, Pflege, Verwaltung, Bau, Landwirtschaft, Sicherheit.',
      ],
      en: [
        'Technical English is easier than school English: the vocabulary is small and repetitive. Reading manuals gets you far in months.',
        'Many vocational schools offer additional technical English lessons with a certificate. That is visible on a CV.',
        'An Erasmus+ period during an apprenticeship is funded and achieves more than three years of lessons.',
        'There are plenty of occupations with no need for English: the crafts, care work, administration, construction, agriculture, security.',
      ],
    },
  },
];

export const flagById = new Map(flags.map((f) => [f.id, f]));

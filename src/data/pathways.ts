import type { Pathway } from './types';

/**
 * Die Wege in einen Beruf.
 *
 * Bewusst ein eigener Datensatz und keine Eigenschaft am Beruf: Zu
 * „Erzieher/in" führen ein schulischer und ein praxisintegrierter Weg, zu
 * „Softwareentwicklung" eine duale Ausbildung, ein duales Studium und ein
 * klassisches Studium. Wer nur den Beruf empfiehlt, hat die Hälfte der
 * Entscheidung verschwiegen.
 */
export const pathways: Pathway[] = [
  {
    id: 'dual',
    name: 'Duale Ausbildung',
    accent: '206 64% 42%',
    kind: 'dual',
    tagline: {
      de: 'Drei bis vier Tage Betrieb, ein bis zwei Tage Berufsschule – mit Gehalt.',
      en: 'Three or four days in a company, one or two at vocational school — with pay.',
    },
    description: {
      de: 'Der häufigste Weg in Deutschland und international ein Sonderfall: Du bist von Anfang an im Betrieb angestellt, bekommst eine Ausbildungsvergütung und lernst den Rest in der Berufsschule. Nach zwei bis dreieinhalb Jahren hast du einen Abschluss, der bundesweit gilt, und meistens ein Übernahmeangebot.',
      en: 'The most common route in Germany and an oddity internationally: you are employed by a company from day one, receive a training wage and learn the rest at vocational school. After two to three and a half years you hold a nationally recognised qualification and usually an offer to stay.',
    },
    feelsLike: {
      de: 'Ein Job mit Schule dazu – nicht Schule mit Praktikum dazu.',
      en: 'A job with school attached — not school with a placement attached.',
    },
    duration: { de: '2 bis 3,5 Jahre', en: '2 to 3.5 years' },
    paid: true,
    cost: {
      de: 'Keine Gebühren. Fachbücher und Werkzeug zahlt häufig der Betrieb.',
      en: 'No fees. Textbooks and tools are often paid by the employer.',
    },
    minSchooling: 'none',
    theoryShare: 4,
    practiceShare: 8,
    structure: 8,
    speedToWork: 9,
    flexibility: 6,
    dropoutRisk: 6,
    strengths: {
      de: [
        'Du verdienst ab dem ersten Monat eigenes Geld und bist sozialversichert.',
        'Du lernst am echten Arbeitsplatz, nicht an Beispielen aus dem Lehrbuch.',
        'Der Abschluss gilt bundesweit und wird von jedem Betrieb erkannt.',
        'Nach der Ausbildung stehen Meister, Techniker, Fachwirt und ein Studium offen – auch ohne Abitur.',
      ],
      en: [
        'You earn your own money from the first month and are covered by social insurance.',
        'You learn at a real workplace, not from textbook examples.',
        'The qualification is recognised nationwide by any employer.',
        'Afterwards the master craftsman, technician, business specialist and even university routes are open — no Abitur required.',
      ],
    },
    tradeoffs: {
      de: [
        'Die Qualität hängt stark am Betrieb. Ein schlechter Ausbildungsbetrieb ist der häufigste Abbruchgrund.',
        'Die Arbeitszeiten sind Arbeitszeiten: Urlaub gibt es nach Absprache, nicht in den Schulferien.',
        'Ein Wechsel des Berufs mitten in der Ausbildung kostet in der Regel Zeit.',
        'In manchen Branchen ist die Vergütung so niedrig, dass sie ohne Wohnen bei den Eltern nicht reicht.',
      ],
      en: [
        'Quality depends heavily on the employer. A bad training company is the single most common reason people quit.',
        'Working hours are working hours: holiday is agreed with your employer, not taken in school breaks.',
        'Switching occupation mid-training usually costs you time.',
        'In some sectors the pay is so low that it only works if you live with your parents.',
      ],
    },
    website: 'https://www.bmbf.de/bmbf/de/bildung/duale-ausbildung/duale-ausbildung.html',
  },

  {
    id: 'school-based',
    name: 'Schulische Ausbildung',
    accent: '262 46% 52%',
    kind: 'school',
    tagline: {
      de: 'Vollzeit an einer Berufsfachschule, mit Praktika – oft ohne Vergütung.',
      en: 'Full-time at a vocational college with placements — often unpaid.',
    },
    description: {
      de: 'Der übliche Weg in viele Gesundheits-, Sozial- und Gestaltungsberufe: Der Unterricht findet an einer Berufsfachschule oder Akademie statt, die Praxis in mehrwöchigen Blöcken. Seit 2020 sind die Pflegeausbildungen und einige therapeutische Berufe vergütet und schulgeldfrei – bei vielen anderen zahlt man weiterhin selbst.',
      en: 'The standard route into many health, social and design occupations: lessons take place at a vocational college or academy, practice in multi-week blocks. Since 2020 the nursing programmes and some therapeutic occupations are paid and fee-free — for many others you still pay yourself.',
    },
    feelsLike: {
      de: 'Schule, aber nur mit den Fächern, die zum Beruf gehören.',
      en: 'School, but only the subjects that belong to the job.',
    },
    duration: { de: '1 bis 3 Jahre', en: '1 to 3 years' },
    paid: false,
    cost: {
      de: 'Je nach Schule 0 bis über 500 € im Monat. Bei privaten Trägern immer nachfragen – und nach BAföG und Aufstiegs-BAföG fragen.',
      en: 'Between nothing and over €500 a month depending on the school. Always ask private providers — and ask about BAföG support.',
    },
    minSchooling: 'realschule',
    theoryShare: 7,
    practiceShare: 5,
    structure: 8,
    speedToWork: 7,
    flexibility: 5,
    dropoutRisk: 5,
    strengths: {
      de: [
        'Ein Klassenverband statt einer Einzelstelle: Du bist nicht dem Klima eines Betriebs ausgeliefert.',
        'Der Unterricht ist geordnet und planbar, mit Schulferien.',
        'In Pflege, Therapie und Erziehung der übliche und breit anerkannte Weg.',
        'Das Praktikum verteilt sich auf mehrere Einrichtungen – du siehst mehr als einen Arbeitgeber.',
      ],
      en: [
        'A class rather than a single job: you are not at the mercy of one company culture.',
        'Lessons are structured and predictable, with school holidays.',
        'In nursing, therapy and childcare this is the normal, widely recognised route.',
        'Placements are spread over several institutions — you see more than one employer.',
      ],
    },
    tradeoffs: {
      de: [
        'Oft keine oder eine geringe Vergütung, teils sogar Schulgeld – das muss finanziert sein.',
        'Wer drei Jahre ohne Einkommen überbrücken muss, braucht BAföG, einen Nebenjob oder Unterstützung.',
        'Weniger betriebliche Routine als in der dualen Ausbildung: Der erste echte Arbeitsmonat ist ein Sprung.',
        'Bei privaten Anbietern lohnt der genaue Blick auf staatliche Anerkennung des Abschlusses.',
      ],
      en: [
        'Often little or no pay, sometimes even tuition — this has to be financed.',
        'Bridging three years without income needs BAföG, a side job or family support.',
        'Less workplace routine than dual training: the first real working month is a leap.',
        'With private providers, check carefully that the qualification is state-recognised.',
      ],
    },
    website: 'https://www.bafoeg-digital.de/',
  },

  {
    id: 'dual-study',
    name: 'Duales Studium',
    accent: '188 58% 38%',
    kind: 'dual-study',
    tagline: {
      de: 'Bachelor und Betrieb gleichzeitig, mit Gehalt – und wenig Freizeit.',
      en: 'A bachelor degree and a company at the same time, paid — with little free time.',
    },
    description: {
      de: 'Drei bis vier Jahre im Wechsel zwischen Hochschule und Unternehmen, mit Arbeitsvertrag und Gehalt. Am Ende steht ein Bachelor und oft auch ein Ausbildungsabschluss. Der begehrteste und dadurch der am härtesten umkämpfte Weg: Auf einen Platz kommen in bekannten Unternehmen regelmäßig dreistellige Bewerberzahlen.',
      en: 'Three to four years alternating between a university and a company, with an employment contract and a salary. You end up with a bachelor degree and often a vocational qualification too. The most sought-after and therefore most contested route: well-known companies routinely receive hundreds of applications per place.',
    },
    feelsLike: {
      de: 'Zwei Vollzeitbeschäftigungen, die sich abwechseln.',
      en: 'Two full-time commitments taking turns.',
    },
    duration: { de: '3 bis 4,5 Jahre', en: '3 to 4.5 years' },
    paid: true,
    cost: {
      de: 'Der Betrieb übernimmt meist Studiengebühren und Semesterbeitrag. Ohne Unternehmen kein Studienplatz.',
      en: 'The company usually covers tuition and semester fees. No company, no study place.',
    },
    minSchooling: 'fachhochschulreife',
    theoryShare: 8,
    practiceShare: 7,
    structure: 9,
    speedToWork: 8,
    flexibility: 7,
    dropoutRisk: 4,
    strengths: {
      de: [
        'Akademischer Abschluss und Berufserfahrung gleichzeitig – ohne Studienschulden.',
        'Die Übernahmequote ist hoch: Der Betrieb hat in dich investiert.',
        'Du merkst früh, ob die Branche zu dir passt, und nicht erst nach dem Abschluss.',
        'Gehalt während des Studiums, oft 1.000 bis 1.600 € im Monat.',
      ],
      en: [
        'An academic degree and professional experience at once — without student debt.',
        'Retention rates are high: the company has invested in you.',
        'You find out early whether the sector suits you, not only after graduating.',
        'A salary while studying, often €1,000 to €1,600 a month.',
      ],
    },
    tradeoffs: {
      de: [
        'Semesterferien gibt es nicht – die Zeit gehört dem Betrieb.',
        'Die Auswahlverfahren sind hart: Bewerbung oft 12 bis 18 Monate vor dem Start.',
        'Viele Verträge enthalten eine Bindungsklausel: Wer kurz danach geht, zahlt Kosten zurück.',
        'Ein Wechsel des Fachs ist schwer, weil Hochschule und Betrieb zusammenhängen.',
        'Auslandssemester sind meist nicht vorgesehen.',
      ],
      en: [
        'There are no semester breaks — that time belongs to the company.',
        'Selection is tough: applications often 12 to 18 months before the start.',
        'Many contracts include a retention clause: leave soon after and you repay costs.',
        'Changing subject is hard because the university and the company are linked.',
        'A semester abroad is usually not on the table.',
      ],
    },
    website: 'https://www.hochschulkompass.de/',
  },

  {
    id: 'university',
    name: 'Studium an einer Universität',
    accent: '348 52% 46%',
    kind: 'university',
    tagline: {
      de: 'Viel Theorie, viel Freiheit, viel Eigenverantwortung – und kein Gehalt.',
      en: 'A lot of theory, a lot of freedom, a lot of self-reliance — and no salary.',
    },
    description: {
      de: 'Der forschungsnahe Weg: Bachelor in sechs bis acht Semestern, häufig ein Master darauf. Niemand kontrolliert, ob du in der Vorlesung sitzt, und genau daran scheitern die meisten, die scheitern. Für einige Berufe ist es der einzige Weg – Arzt, Lehrer, Psychotherapeut, Jurist, Apotheker.',
      en: 'The research-oriented route: a bachelor in six to eight semesters, often a master on top. Nobody checks whether you attend lectures, and that is precisely where most of those who fail, fail. For some professions it is the only route — physician, teacher, psychotherapist, lawyer, pharmacist.',
    },
    feelsLike: {
      de: 'Ein Selbststudium mit Terminen und Prüfungen drumherum.',
      en: 'Self-directed study with appointments and exams around it.',
    },
    duration: { de: '3 bis 6 Jahre (Bachelor, oft plus Master)', en: '3 to 6 years (bachelor, often plus master)' },
    paid: false,
    cost: {
      de: 'Semesterbeitrag 150 bis 400 € pro Halbjahr, dazu Lebenshaltung. BAföG, Stipendien und Studienkredite prüfen.',
      en: 'A semester fee of €150 to €400, plus living costs. Check BAföG, scholarships and student loans.',
    },
    minSchooling: 'abitur',
    theoryShare: 10,
    practiceShare: 2,
    structure: 3,
    speedToWork: 3,
    flexibility: 9,
    dropoutRisk: 8,
    strengths: {
      de: [
        'Die größte Auswahl an Fachrichtungen und die größte Freiheit, sie zu wechseln.',
        'Auslandssemester, Nebenfächer, Forschung und Promotion stehen offen.',
        'Für einige Berufe unumgänglich – daran geht kein anderer Weg vorbei.',
        'Im Schnitt die höchsten Lebenseinkommen, wenn der Abschluss gelingt.',
      ],
      en: [
        'The widest choice of subjects and the greatest freedom to change them.',
        'Semesters abroad, minor subjects, research and a doctorate are all open.',
        'Unavoidable for some professions — no other route leads there.',
        'On average the highest lifetime earnings, provided you finish.',
      ],
    },
    tradeoffs: {
      de: [
        'Je nach Fach brechen 20 bis 50 Prozent ab – in Mathematik und Informatik am meisten.',
        'Drei bis fünf Jahre ohne eigenes Einkommen müssen finanziert werden.',
        'Ohne Selbstorganisation geht es nicht: Es gibt keine Anwesenheitspflicht und keine Erinnerung.',
        'Der Praxisbezug kommt spät. Manche merken erst im Referendariat oder Praktikum, dass es nicht passt.',
      ],
      en: [
        'Depending on the subject, 20 to 50 percent drop out — most in maths and computer science.',
        'Three to five years without your own income have to be financed.',
        'It does not work without self-organisation: there is no attendance requirement and no reminder.',
        'Practice comes late. Some only notice during a placement that it does not fit.',
      ],
    },
    website: 'https://www.hochschulkompass.de/',
  },

  {
    id: 'applied-university',
    name: 'Studium an einer Hochschule (HAW/FH)',
    accent: '24 62% 46%',
    kind: 'applied-university',
    tagline: {
      de: 'Anwendungsnäher als die Uni, mit Pflichtpraktikum und kleineren Gruppen.',
      en: 'More applied than a university, with a mandatory placement and smaller groups.',
    },
    description: {
      de: 'Hochschulen für angewandte Wissenschaften lehren dasselbe Fach mit anderem Schwerpunkt: mehr Projekte, mehr Labor, ein Praxissemester, feste Seminargruppen. Der Bachelor ist gleichwertig zum Uni-Bachelor, und mit Fachhochschulreife oder über eine Ausbildung kommt man auch ohne allgemeines Abitur hinein.',
      en: 'Universities of applied sciences teach the same subjects with a different emphasis: more projects, more lab work, a placement semester, fixed seminar groups. The bachelor is equivalent to a university bachelor, and you can get in with a Fachhochschulreife or via vocational training instead of a general Abitur.',
    },
    feelsLike: {
      de: 'Eine Mischung aus Schulklasse und Studium.',
      en: 'A mix between a school class and a degree course.',
    },
    duration: { de: '3,5 bis 4,5 Jahre (Bachelor)', en: '3.5 to 4.5 years (bachelor)' },
    paid: false,
    cost: {
      de: 'Semesterbeitrag wie an der Universität. Private Hochschulen verlangen 300 bis 800 € im Monat.',
      en: 'The same semester fee as a university. Private institutions charge €300 to €800 a month.',
    },
    minSchooling: 'fachhochschulreife',
    theoryShare: 8,
    practiceShare: 5,
    structure: 6,
    speedToWork: 5,
    flexibility: 7,
    dropoutRisk: 6,
    strengths: {
      de: [
        'Zugang auch ohne allgemeines Abitur: Fachhochschulreife, Meister oder Berufserfahrung genügen oft.',
        'Kleinere Gruppen, erreichbare Lehrende, verbindlichere Struktur als an der Universität.',
        'Pflichtpraktikum und Projektarbeit: Der Bezug zur Arbeit ist früh da.',
        'Arbeitgeber in Technik, Wirtschaft und Sozialem schätzen den Abschluss oft gleich hoch ein.',
      ],
      en: [
        'Access without a general Abitur: a Fachhochschulreife, master craftsman title or work experience often suffices.',
        'Smaller groups, reachable lecturers, a firmer structure than at a university.',
        'A mandatory placement and project work: the link to real jobs comes early.',
        'Employers in engineering, business and social work often rate the degree equally highly.',
      ],
    },
    tradeoffs: {
      de: [
        'Weniger Auswahl an exotischen Fächern als an einer Universität.',
        'Für Promotion und Forschung braucht es meist noch einen Zwischenschritt.',
        'Auch hier: kein Einkommen während des Studiums.',
        'Bei privaten Hochschulen genau prüfen, ob der Abschluss akkreditiert ist.',
      ],
      en: [
        'Fewer exotic subjects on offer than at a university.',
        'A doctorate or research career usually needs an extra step first.',
        'Here too: no income while studying.',
        'With private institutions, check carefully that the degree is accredited.',
      ],
    },
    website: 'https://www.hochschulkompass.de/',
  },

  {
    id: 'state-exam',
    name: 'Studium mit Staatsexamen',
    accent: '218 44% 40%',
    kind: 'state-exam',
    tagline: {
      de: 'Langer Weg mit staatlicher Abschlussprüfung und anschließender Praxisphase.',
      en: 'A long route with a state examination and a practical phase afterwards.',
    },
    description: {
      de: 'Medizin, Pharmazie, Rechtswissenschaft, Lehramt und Lebensmittelchemie enden nicht mit einer Hochschulprüfung, sondern mit einem Staatsexamen. Danach folgt eine praktische Phase – Referendariat, praktisches Jahr, Vorbereitungsdienst – bevor der Beruf ausgeübt werden darf. Insgesamt sechs bis zwölf Jahre bis zur vollen Berufsausübung.',
      en: 'Medicine, pharmacy, law, teaching and food chemistry do not end with a university exam but with a state examination. A practical phase follows — a traineeship, a practical year, a preparatory service — before you may practise. Six to twelve years in total to full professional practice.',
    },
    feelsLike: {
      de: 'Ein Marathon mit einer einzigen großen Prüfung am Ende.',
      en: 'A marathon with one enormous exam at the end.',
    },
    duration: { de: '5 bis 8 Jahre plus Praxisphase', en: '5 to 8 years plus a practical phase' },
    paid: false,
    cost: {
      de: 'Semesterbeitrag; in der praktischen Phase gibt es eine Vergütung (Referendariat, Arzt im Praktikum).',
      en: 'A semester fee; the practical phase is paid (traineeship, junior doctor).',
    },
    minSchooling: 'abitur',
    theoryShare: 10,
    practiceShare: 4,
    structure: 7,
    speedToWork: 1,
    flexibility: 3,
    dropoutRisk: 5,
    strengths: {
      de: [
        'Führt in Berufe mit sehr hoher Sicherheit, hohem Ansehen und guter Bezahlung.',
        'Der Abschluss ist staatlich geregelt und dadurch überall gleich anerkannt.',
        'In der praktischen Phase gibt es wieder Geld.',
        'Ein klarer, vorgezeichneter Weg – man muss ihn sich nicht selbst zusammenstellen.',
      ],
      en: [
        'Leads into professions with very high security, high standing and good pay.',
        'The qualification is state-regulated and therefore recognised identically everywhere.',
        'The practical phase is paid again.',
        'A clear, mapped-out route — you do not have to assemble it yourself.',
      ],
    },
    tradeoffs: {
      de: [
        'Sehr lang. Wer mit 19 anfängt, arbeitet mit 27 bis 30 zum ersten Mal voll.',
        'Ein einziges Examen entscheidet über Jahre – der Druck davor ist enorm.',
        'In Medizin und Psychologie regelt ein Numerus Clausus den Zugang, oft mit Wartesemestern.',
        'Ein Ausstieg nach dem vierten Semester lässt wenig Verwertbares übrig.',
      ],
      en: [
        'Very long. Start at 19 and you work full-time for the first time at 27 to 30.',
        'A single exam decides years of work — the pressure before it is immense.',
        'In medicine and psychology a numerus clausus governs admission, often with waiting semesters.',
        'Quitting after the fourth semester leaves little you can use.',
      ],
    },
    website: 'https://www.hochschulstart.de/',
  },

  {
    id: 'civil-service',
    name: 'Laufbahnausbildung im öffentlichen Dienst',
    accent: '152 38% 34%',
    kind: 'civil-service',
    tagline: {
      de: 'Beamtenanwärter von Tag eins: Bezüge, Sicherheit und ein festes Auswahlverfahren.',
      en: 'A civil-service trainee from day one: an allowance, security and a formal selection process.',
    },
    description: {
      de: 'Polizei, Zoll, Finanzverwaltung, Justiz, Bundeswehr und die allgemeine Verwaltung bilden selbst aus – im mittleren Dienst zwei bis drei Jahre, im gehobenen Dienst als dreijähriges Studium an einer Verwaltungshochschule. Man ist Anwärterin oder Anwärter, bekommt Anwärterbezüge und wird bei Bewährung verbeamtet.',
      en: 'Police, customs, tax administration, the courts, the armed forces and general administration train their own staff — two to three years in the middle service, or a three-year degree at an administrative college for the higher service. You are a candidate, receive a candidate allowance and, on successful completion, become a tenured civil servant.',
    },
    feelsLike: {
      de: 'Ausbildung, Studium und Arbeitsvertrag in einem – mit Uniform oder Aktenzeichen.',
      en: 'Training, a degree and an employment contract in one — with a uniform or a case file.',
    },
    duration: { de: '2 bis 3 Jahre', en: '2 to 3 years' },
    paid: true,
    cost: {
      de: 'Keine Gebühren. Anwärterbezüge je nach Laufbahn etwa 1.300 bis 1.600 € netto.',
      en: 'No fees. Candidate allowances of roughly €1,300 to €1,600 net depending on the career track.',
    },
    minSchooling: 'realschule',
    theoryShare: 7,
    practiceShare: 7,
    structure: 10,
    speedToWork: 8,
    flexibility: 3,
    dropoutRisk: 4,
    strengths: {
      de: [
        'Sehr hohe Arbeitsplatzsicherheit; Kündigungen sind praktisch ausgeschlossen.',
        'Bezahlung nach festen Tabellen – keine Verhandlung, keine Willkür.',
        'Bezüge ab dem ersten Tag, kein Semesterbeitrag.',
        'Klare Beförderungswege mit vorhersehbarer Gehaltsentwicklung.',
      ],
      en: [
        'Very high job security; dismissal is practically impossible.',
        'Pay follows fixed tables — no negotiation, no arbitrariness.',
        'An allowance from day one, no semester fee.',
        'Clear promotion paths with predictable salary progression.',
      ],
    },
    tradeoffs: {
      de: [
        'Auswahlverfahren mit Sport-, Wissens- und Gesundheitstest; die Durchfallquoten sind hoch.',
        'Versetzungen sind möglich – beim Wohnort hat man weniger mitzureden.',
        'Schicht- und Wochenenddienst in Polizei, Justizvollzug und Bundeswehr.',
        'Wer wieder hinaus will, verliert den Beamtenstatus samt seinen Vorteilen.',
        'Ein enger Regelrahmen: Weisungen gelten auch, wenn man sie für falsch hält.',
      ],
      en: [
        'Selection involves fitness, knowledge and medical tests; failure rates are high.',
        'Transfers are possible — you have less say over where you live.',
        'Shift and weekend duty in the police, prison service and armed forces.',
        'Leaving means losing civil-servant status and its advantages.',
        'A tight rulebook: instructions apply even when you consider them wrong.',
      ],
    },
    website: 'https://www.wir-sind-bund.de/',
  },

  {
    id: 'further-training',
    name: 'Aufstiegsfortbildung',
    accent: '42 74% 40%',
    kind: 'further-training',
    tagline: {
      de: 'Meister, Techniker, Fachwirt – nach der Ausbildung, meist neben dem Beruf.',
      en: 'Master craftsman, technician, business specialist — after training, usually alongside work.',
    },
    description: {
      de: 'Kein Einstiegsweg, sondern der zweite Schritt: Mit abgeschlossener Ausbildung und ein bis drei Jahren Praxis stehen Meister, Staatlich geprüfter Techniker, Fachwirt und Betriebswirt offen. Diese Abschlüsse sind formal dem Bachelor bzw. Master gleichgestellt und öffnen ein Studium ohne Abitur.',
      en: 'Not an entry route but the second step: with completed training and one to three years of experience, the master craftsman, state-certified technician, business specialist and business administrator qualifications open up. They are formally equivalent to a bachelor and master degree and open university access without an Abitur.',
    },
    feelsLike: {
      de: 'Abendschule oder ein Jahr Vollzeit – mit einem klaren Ziel vor Augen.',
      en: 'Evening classes or a full-time year — with a clear goal in sight.',
    },
    duration: { de: '1 bis 3,5 Jahre (Teilzeit) oder 1 bis 2 Jahre (Vollzeit)', en: '1 to 3.5 years part-time or 1 to 2 years full-time' },
    paid: false,
    cost: {
      de: '3.000 bis 12.000 € Lehrgangs- und Prüfungsgebühren. Aufstiegs-BAföG übernimmt einen großen Teil, bei Erfolg wird zusätzlich erlassen.',
      en: '€3,000 to €12,000 in course and exam fees. Aufstiegs-BAföG covers a large share, with further forgiveness on passing.',
    },
    minSchooling: 'hauptschule',
    theoryShare: 8,
    practiceShare: 4,
    structure: 6,
    speedToWork: 9,
    flexibility: 8,
    dropoutRisk: 5,
    strengths: {
      de: [
        'Hebt das Gehalt deutlich und öffnet Führungsaufgaben.',
        'Berechtigt zum Studium ohne Abitur und zur Ausbildung eigener Lehrlinge.',
        'Gleichwertig zum Bachelor (Meister, Fachwirt) oder Master (Betriebswirt) im Qualifikationsrahmen.',
        'Ein eigener Betrieb ist damit möglich – im Handwerk für viele Gewerke sogar Voraussetzung.',
      ],
      en: [
        'Lifts pay noticeably and opens up leadership roles.',
        'Grants university access without an Abitur and the right to train apprentices.',
        'Formally equivalent to a bachelor (master craftsman) or master degree (business administrator).',
        'Running your own business becomes possible — in many crafts it is even required.',
      ],
    },
    tradeoffs: {
      de: [
        'Neben dem Beruf bedeutet Abende und Samstage über Jahre.',
        'Die Gebühren fallen an, bevor das höhere Gehalt kommt.',
        'Erst nach der Ausbildung möglich – kein Weg für den direkten Einstieg.',
        'Die Prüfungen sind kein Selbstläufer; bundesweit fallen regelmäßig 20 bis 30 Prozent durch.',
      ],
      en: [
        'Alongside a job it means evenings and Saturdays for years.',
        'The fees come due before the higher salary does.',
        'Only possible after completing training — not a direct-entry route.',
        'The exams are no formality; nationwide 20 to 30 percent regularly fail.',
      ],
    },
    website: 'https://www.aufstiegs-bafoeg.de/',
  },

  {
    id: 'voluntary-year',
    name: 'Freiwilligendienst (FSJ/BFD)',
    accent: '96 42% 38%',
    kind: 'on-the-job',
    tagline: {
      de: 'Ein Jahr mitarbeiten und herausfinden, ob das Feld wirklich passt.',
      en: 'A year of working alongside others to find out whether the field really fits.',
    },
    description: {
      de: 'Kein Berufsabschluss, sondern eine ehrliche Antwort auf die Frage „ist das wirklich etwas für mich?". Sechs bis achtzehn Monate in einem Krankenhaus, Kindergarten, Pflegeheim, bei der Feuerwehr oder im Naturschutz, mit Taschengeld, Unterkunft und Seminartagen. Wird in vielen Sozial- und Gesundheitsberufen als Vorpraktikum anerkannt und verbessert die Bewerbung deutlich.',
      en: 'Not a qualification but an honest answer to "is this really for me?". Six to eighteen months in a hospital, kindergarten, care home, fire service or nature conservation, with a stipend, accommodation and seminar days. Recognised as a preliminary placement in many social and health occupations and a real boost to an application.',
    },
    feelsLike: {
      de: 'Arbeiten, ohne dass schon alles entschieden ist.',
      en: 'Working without everything already being decided.',
    },
    duration: { de: '6 bis 18 Monate', en: '6 to 18 months' },
    paid: true,
    cost: {
      de: 'Taschengeld 300 bis 500 € im Monat, oft plus Unterkunft, Verpflegung und Fahrkarte. Kindergeld läuft weiter.',
      en: 'A stipend of €300 to €500 a month, often plus accommodation, meals and a travel pass. Child benefit continues.',
    },
    minSchooling: 'none',
    theoryShare: 2,
    practiceShare: 9,
    structure: 6,
    speedToWork: 4,
    flexibility: 10,
    dropoutRisk: 3,
    strengths: {
      de: [
        'Die beste Möglichkeit, einen Bereich kennenzulernen, ohne sich für Jahre zu binden.',
        'Gilt in vielen Ausbildungen und Studiengängen als anerkanntes Vorpraktikum.',
        'Zählt als Wartezeit und kann die Chancen im Auswahlverfahren verbessern.',
        'Wer merkt, dass es nicht passt, hat trotzdem ein Jahr gewonnen und nicht verloren.',
      ],
      en: [
        'The best way to get to know a field without committing for years.',
        'Counts as a recognised preliminary placement for many training courses and degrees.',
        'Counts as waiting time and can improve your standing in selection procedures.',
        'If you find it does not fit, you have still gained a year rather than lost one.',
      ],
    },
    tradeoffs: {
      de: [
        'Kein Berufsabschluss – danach beginnt die eigentliche Ausbildung erst.',
        'Das Taschengeld reicht nicht zum eigenständigen Leben.',
        'Die Tätigkeiten sind zwangsläufig einfacher als die des Fachpersonals daneben.',
        'Wer schon sicher weiß, was er will, verliert damit ein Jahr.',
      ],
      en: [
        'No professional qualification — the actual training starts afterwards.',
        'The stipend is not enough to live on independently.',
        'The tasks are inevitably simpler than those of the qualified staff beside you.',
        'If you already know what you want, it costs you a year.',
      ],
    },
    website: 'https://www.bundes-freiwilligendienst.de/',
  },

  {
    id: 'career-changer',
    name: 'Quereinstieg und Anlernen',
    accent: '280 36% 48%',
    kind: 'on-the-job',
    tagline: {
      de: 'Ohne passenden Abschluss anfangen und im Betrieb hineinwachsen.',
      en: 'Starting without the matching qualification and growing into the job.',
    },
    description: {
      de: 'In einigen Bereichen zählt, was man kann, mehr als das Zeugnis: IT, Vertrieb, Logistik, Gastronomie, Teile der Medienbranche. Man beginnt als Hilfskraft oder Junior, lernt im Betrieb und holt den Abschluss später über eine Externenprüfung nach. Ein realer Weg – aber der unsicherste von allen.',
      en: 'In some fields what you can do counts for more than your certificate: IT, sales, logistics, hospitality, parts of the media industry. You start as an assistant or junior, learn on the job and can sit an external examination later. A real route — but the least secure of them all.',
    },
    feelsLike: {
      de: 'Arbeiten und nebenher lernen, ohne Lehrplan.',
      en: 'Working and learning alongside it, with no syllabus.',
    },
    duration: { de: 'offen – Externenprüfung nach etwa 4,5 Jahren Praxis möglich', en: 'open-ended — an external exam is possible after roughly 4.5 years of practice' },
    paid: true,
    cost: { de: 'Keine Gebühren, aber oft niedrigere Löhne als mit Abschluss.', en: 'No fees, but usually lower wages than with a qualification.' },
    minSchooling: 'none',
    theoryShare: 1,
    practiceShare: 10,
    structure: 3,
    speedToWork: 10,
    flexibility: 4,
    dropoutRisk: 7,
    strengths: {
      de: [
        'Sofort volles Gehalt statt Ausbildungsvergütung.',
        'Möglich auch ohne oder mit schwachem Schulabschluss.',
        'In der IT und im Vertrieb zählen nachweisbare Projekte oft mehr als Zeugnisse.',
        'Die Externenprüfung holt den anerkannten Abschluss später nach.',
      ],
      en: [
        'A full wage immediately instead of a training allowance.',
        'Possible even without, or with a weak, school-leaving certificate.',
        'In IT and sales, demonstrable projects often count for more than certificates.',
        'An external examination can secure the recognised qualification later.',
      ],
    },
    tradeoffs: {
      de: [
        'Ohne Abschluss ist man bei jeder Krise als Erster betroffen.',
        'Das Gelernte ist an einen Betrieb gebunden und lässt sich schwer nachweisen.',
        'Beim Wechsel fehlt das Papier, das Personalabteilungen sehen wollen.',
        'Über ein ganzes Arbeitsleben deutlich niedrigere Einkommen als mit Abschluss.',
        'Der Weg zurück in eine geregelte Ausbildung wird mit jedem Jahr schwerer.',
      ],
      en: [
        'Without a qualification you are the first affected in any downturn.',
        'What you learned is tied to one company and hard to evidence.',
        'When changing jobs you lack the paper HR departments want to see.',
        'Markedly lower lifetime earnings than with a qualification.',
        'The way back into formal training gets harder every year.',
      ],
    },
    website: 'https://www.arbeitsagentur.de/bildung/weiterbildung',
  },

  {
    id: 'distance-learning',
    name: 'Fernstudium und Abendschule',
    accent: '172 44% 34%',
    kind: 'applied-university',
    tagline: {
      de: 'Lernen neben Arbeit oder Familie, im eigenen Tempo und weitgehend allein.',
      en: 'Studying alongside work or family, at your own pace and largely alone.',
    },
    description: {
      de: 'Derselbe Abschluss, anderer Alltag: Skripte, Online-Vorlesungen, wenige Präsenzwochenenden, Prüfungen in Prüfungszentren. Für Menschen, die schon arbeiten, Kinder haben oder weit von jeder Hochschule wohnen. Die Abbruchquoten liegen deutlich höher als im Präsenzstudium – nicht weil es schwerer ist, sondern weil niemand da ist, der einen mitzieht.',
      en: 'The same qualification, a different daily life: course texts, online lectures, a few in-person weekends, exams at test centres. For people who already work, have children or live far from any university. Dropout rates are markedly higher than in on-campus study — not because it is harder, but because nobody is there to carry you along.',
    },
    feelsLike: {
      de: 'Ein zweites Leben in den Abendstunden.',
      en: 'A second life in the evening hours.',
    },
    duration: { de: '4 bis 6 Jahre in Teilzeit', en: '4 to 6 years part-time' },
    paid: false,
    cost: {
      de: 'Staatliche Fernhochschulen ab etwa 60 € im Monat, private 200 bis 500 €.',
      en: 'State distance universities from around €60 a month, private ones €200 to €500.',
    },
    minSchooling: 'fachhochschulreife',
    theoryShare: 9,
    practiceShare: 3,
    structure: 2,
    speedToWork: 7,
    flexibility: 9,
    dropoutRisk: 9,
    strengths: {
      de: [
        'Arbeiten und studieren gleichzeitig – das Einkommen läuft weiter.',
        'Kein Umzug nötig, kein fester Stundenplan.',
        'Ideal, um einen Abschluss nachzuholen, den man früher nicht gemacht hat.',
        'Das eigene Tempo: Ein anstrengendes Halbjahr lässt sich streckenweise ausdehnen.',
      ],
      en: [
        'Working and studying at once — the income keeps coming.',
        'No relocation needed, no fixed timetable.',
        'Ideal for catching up on a qualification you did not take earlier.',
        'Your own pace: a demanding half-year can be stretched.',
      ],
    },
    tradeoffs: {
      de: [
        'Die höchste Abbruchquote von allen Wegen. Ehrlich mit sich sein lohnt hier besonders.',
        'Kaum Gruppe, kaum Netzwerk, kein Campusleben.',
        'Die Freizeit ist über Jahre praktisch weg.',
        'Für Berufe mit Praxis- oder Laborpflicht nicht geeignet.',
      ],
      en: [
        'The highest dropout rate of all routes. Being honest with yourself pays off especially here.',
        'Hardly any peer group, hardly any network, no campus life.',
        'Free time is effectively gone for years.',
        'Not suitable for occupations requiring lab or clinical practice.',
      ],
    },
    website: 'https://www.fernstudiumcheck.de/',
  },

  {
    id: 'apprenticeship-abroad',
    name: 'Ausbildung oder Studium im Ausland',
    accent: '332 44% 48%',
    kind: 'dual',
    tagline: {
      de: 'Derselbe Beruf, andere Sprache – und ein Abschluss, der anerkannt werden muss.',
      en: 'The same occupation in another language — and a qualification that needs recognition.',
    },
    description: {
      de: 'Erasmus+ fördert Ausbildungsteile im Ausland, einige Nachbarländer bilden in Berufen aus, die es hier nicht gibt, und in den Niederlanden oder Österreich sind Studienplätze mit deutschem Abitur zugänglich. Der Gewinn ist echt; der Aufwand für Anerkennung, Sprache und Finanzierung aber auch.',
      en: 'Erasmus+ funds parts of vocational training abroad, some neighbouring countries train for occupations that do not exist here, and in the Netherlands or Austria study places are open to German Abitur holders. The gain is real; so is the effort for recognition, language and funding.',
    },
    feelsLike: {
      de: 'Ein Umzug und eine Ausbildung gleichzeitig.',
      en: 'A move abroad and a training course at the same time.',
    },
    duration: { de: '3 Wochen (Erasmus-Teil) bis 5 Jahre (ganzes Studium)', en: '3 weeks (an Erasmus+ block) to 5 years (a whole degree)' },
    paid: false,
    cost: {
      de: 'Erasmus+ zahlt Fahrt und Aufenthalt bei Ausbildungsteilen. Ein ganzes Studium kostet je nach Land zwischen nichts und mehreren tausend Euro im Jahr.',
      en: 'Erasmus+ covers travel and living costs for training blocks. A whole degree costs between nothing and several thousand euros a year depending on the country.',
    },
    minSchooling: 'realschule',
    theoryShare: 6,
    practiceShare: 6,
    structure: 5,
    speedToWork: 5,
    flexibility: 7,
    dropoutRisk: 6,
    strengths: {
      de: [
        'Sprachkenntnisse auf einem Niveau, das kein Kurs erreicht.',
        'Erasmus+ übernimmt bei Ausbildungsteilen einen großen Teil der Kosten.',
        'In einigen Ländern gibt es keinen Numerus Clausus, wo es hier einen gibt.',
        'Ein Auslandsabschnitt fällt in jeder späteren Bewerbung auf.',
      ],
      en: [
        'Language skills at a level no course reaches.',
        'Erasmus+ covers a large share of the cost for training blocks.',
        'Some countries have no numerus clausus where Germany does.',
        'A period abroad stands out in every later application.',
      ],
    },
    tradeoffs: {
      de: [
        'Die Anerkennung in Deutschland muss vorher geklärt sein, nicht hinterher.',
        'In reglementierten Berufen (Medizin, Pflege, Lehramt) ist sie aufwendig und manchmal unvollständig.',
        'Sprache auf Fachniveau, nicht auf Urlaubsniveau.',
        'Familie und Freundeskreis sind weit weg, gerade in den ersten Monaten.',
      ],
      en: [
        'Recognition in Germany must be settled beforehand, not afterwards.',
        'In regulated professions (medicine, nursing, teaching) it is laborious and sometimes incomplete.',
        'The language at professional, not holiday, level.',
        'Family and friends are far away, especially in the first months.',
      ],
    },
    website: 'https://www.machmehrausdeinerausbildung.de/',
  },
];

export const pathwayById = new Map(pathways.map((p) => [p.id, p]));

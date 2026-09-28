import type { Question } from './types';

/**
 * Fragen, die in allen drei Modi gestellt werden.
 *
 * Die Reihenfolge beginnt bei den Neigungen und nicht bei den Rahmenbedingungen.
 * Wer mit 16 zuerst nach Schichtdienst und Tarifvertrag gefragt wird, klickt
 * irgendwas an; wer zuerst sagen darf, was ihn interessiert, ist danach bei den
 * unangenehmen Fragen ehrlicher.
 */
export const coreQuestions: Question[] = [
  {
    id: 'activities',
    section: 'interests',
    modes: ['orientation', 'focused', 'deep'],
    type: 'multiple',
    weight: 3,
    required: true,
    title: { de: 'Was davon würdest du freiwillig einen ganzen Tag tun?', en: 'Which of these would you willingly do for a whole day?' },
    description: {
      de: 'Mehrfachauswahl. Antworte nach dem, was dir Spaß macht – nicht nach dem, was sich vernünftig anhört.',
      en: 'Pick several. Answer by what you enjoy — not by what sounds sensible.',
    },
    help: {
      de: 'Diese Frage erhebt die sechs Neigungsrichtungen, die in der Berufswahlforschung als Holland-Codes bekannt sind. Die Passung zwischen Neigung und Tätigkeit sagt Zufriedenheit im Beruf besser voraus als Gehalt oder Ansehen – deshalb wiegt sie hier am schwersten.',
      en: 'This question measures the six interest dimensions known in career research as Holland codes. The fit between inclination and activity predicts job satisfaction better than salary or status — which is why it carries the most weight here.',
    },
    options: [
      {
        id: 'build',
        label: { de: 'Etwas bauen, reparieren oder mit Maschinen arbeiten', en: 'Building, repairing or working with machines' },
        hint: { de: 'Mit den Händen und mit Werkzeug, bis etwas funktioniert.', en: 'With your hands and tools, until something works.' },
        effect: { ratings: { practical: 3, techDemand: 1 }, boostCodes: { realistic: 7 } },
      },
      {
        id: 'investigate',
        label: { de: 'Herausfinden, warum etwas so ist', en: 'Finding out why something is the way it is' },
        hint: { de: 'Messen, vergleichen, nachrechnen, Ursachen suchen.', en: 'Measuring, comparing, recalculating, looking for causes.' },
        effect: { ratings: { analytical: 3 }, boostCodes: { investigative: 7 } },
      },
      {
        id: 'create',
        label: { de: 'Etwas gestalten – zeichnen, schreiben, filmen, kochen, entwerfen', en: 'Creating something — drawing, writing, filming, cooking, designing' },
        effect: { ratings: { creative: 3 }, boostCodes: { artistic: 7 }, prefer: ['creative-work'] },
      },
      {
        id: 'help',
        label: { de: 'Menschen helfen, betreuen oder etwas erklären', en: 'Helping, caring for or explaining something to people' },
        effect: { ratings: { social: 3, peopleContact: 2 }, boostCodes: { social: 7 } },
      },
      {
        id: 'lead',
        label: { de: 'Andere überzeugen, etwas organisieren oder verkaufen', en: 'Convincing others, organising something or selling' },
        effect: { ratings: { persuasive: 3 }, boostCodes: { enterprising: 7 } },
      },
      {
        id: 'order',
        label: { de: 'Ordnung schaffen: prüfen, sortieren, Zahlen und Regeln anwenden', en: 'Creating order: checking, sorting, applying figures and rules' },
        effect: { ratings: { organising: 3, precisionDemand: 1 }, boostCodes: { conventional: 7 } },
      },
      {
        id: 'nature',
        label: { de: 'Draußen sein, mit Tieren oder Pflanzen arbeiten', en: 'Being outdoors, working with animals or plants' },
        effect: { ratings: { outdoors: 3 }, boostCodes: { realistic: 4 }, boostTags: { natur: 6, tiere: 4, draussen: 5 } },
      },
      {
        id: 'computer',
        label: { de: 'Am Rechner arbeiten – programmieren, auswerten, gestalten', en: 'Working at a computer — programming, analysing, designing' },
        effect: { ratings: { techDemand: 3, analytical: 1 }, boostCodes: { investigative: 4, conventional: 2 }, boostFields: { it: 6 } },
      },
      {
        id: 'unclear',
        label: { de: 'Ich weiß es wirklich nicht', en: 'I genuinely do not know' },
        hint: { de: 'Völlig in Ordnung. Dann zählen die anderen Fragen mehr.', en: 'Perfectly fine. Then the other questions count for more.' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'school-fun',
    section: 'strengths',
    modes: ['orientation', 'focused', 'deep'],
    type: 'multiple',
    weight: 2,
    required: true,
    title: { de: 'In welchen Schulfächern fällt dir das Lernen leicht?', en: 'Which school subjects do you find easy to learn?' },
    description: {
      de: 'Es geht nicht um Noten, sondern darum, was dir liegt. Mehrfachauswahl.',
      en: 'This is not about grades but about what suits you. Pick several.',
    },
    options: [
      {
        id: 'math',
        label: { de: 'Mathematik', en: 'Maths' },
        effect: { ratings: { mathDemand: 2 }, prefer: ['strong-math'] },
      },
      {
        id: 'german',
        label: { de: 'Deutsch, Sprachen, Reden und Schreiben', en: 'German, languages, speaking and writing' },
        effect: { ratings: { languageDemand: 2 } },
      },
      {
        id: 'science',
        label: { de: 'Biologie, Chemie oder Physik', en: 'Biology, chemistry or physics' },
        effect: { ratings: { scienceDemand: 2 }, prefer: ['strong-science'] },
      },
      {
        id: 'tech',
        label: { de: 'Technik, Werken, Informatik', en: 'Technology, design and technology, computer science' },
        effect: { ratings: { techDemand: 2, practical: 1 } },
      },
      {
        id: 'art',
        label: { de: 'Kunst oder Musik', en: 'Art or music' },
        effect: { ratings: { creative: 2 }, boostCodes: { artistic: 4 } },
      },
      {
        id: 'social-science',
        label: { de: 'Politik, Geschichte, Sozialkunde, Wirtschaft', en: 'Politics, history, social studies, economics' },
        effect: { ratings: { organising: 1, languageDemand: 1 }, boostFields: { verwaltung: 3, recht: 3, wirtschaft: 3 } },
      },
      {
        id: 'sport',
        label: { de: 'Sport', en: 'Physical education' },
        effect: { ratings: { physicalDemand: 1 }, boostFields: { sport: 4 } },
      },
      {
        id: 'none-easy',
        label: { de: 'Nichts fällt mir richtig leicht', en: 'Nothing comes really easily to me' },
        hint: {
          de: 'Das schließt keinen Beruf aus. Viele gute Ausbildungen setzen kein starkes Schulfach voraus, sondern Zuverlässigkeit.',
          en: 'That rules out no occupation. Many good apprenticeships need reliability rather than a strong school subject.',
        },
        effect: { prefer: ['access-hauptschule'] },
        neutral: true,
      },
    ],
  },

  {
    id: 'school-hard',
    section: 'strengths',
    modes: ['orientation', 'focused', 'deep'],
    type: 'multiple',
    weight: 3,
    required: true,
    title: { de: 'Womit möchtest du im Beruf möglichst wenig zu tun haben?', en: 'What would you rather have as little to do with as possible at work?' },
    description: {
      de: 'Ehrlichkeit lohnt hier besonders: Diese Antwort schließt Berufe aus, statt sie nur abzuwerten.',
      en: 'Honesty pays here especially: this answer rules occupations out rather than merely down-ranking them.',
    },
    options: [
      {
        id: 'no-math',
        label: { de: 'Mathematik und Rechnen', en: 'Maths and calculation' },
        effect: { ratings: { mathDemand: -3 }, require: ['low-math'] },
      },
      {
        id: 'no-writing',
        label: { de: 'Viel schreiben und lesen', en: 'A lot of writing and reading' },
        effect: { ratings: { languageDemand: -3 }, require: ['low-language'] },
      },
      {
        id: 'no-science',
        label: { de: 'Naturwissenschaften', en: 'Natural sciences' },
        effect: { ratings: { scienceDemand: -3 }, require: ['low-science'] },
      },
      {
        id: 'no-people',
        label: { de: 'Ständig mit fremden Menschen sprechen', en: 'Constantly talking to strangers' },
        effect: { ratings: { peopleContact: -3 }, require: ['few-people'], prefer: ['alone-possible'] },
      },
      {
        id: 'no-selling',
        label: { de: 'Etwas verkaufen müssen', en: 'Having to sell things' },
        effect: { ratings: { persuasive: -2 }, require: ['no-sales'] },
      },
      {
        id: 'no-desk',
        label: { de: 'Den ganzen Tag am Schreibtisch sitzen', en: 'Sitting at a desk all day' },
        effect: { ratings: { practical: 2, physicalDemand: 1 }, avoid: ['office-work'] },
      },
      {
        id: 'nothing-excluded',
        label: { de: 'Nichts davon stört mich grundsätzlich', en: 'None of these bother me in principle' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'schooling',
    section: 'education',
    modes: ['orientation', 'focused', 'deep'],
    type: 'single',
    weight: 3,
    required: true,
    title: { de: 'Welchen Schulabschluss hast du oder wirst du haben?', en: 'Which school-leaving certificate do you have or will you have?' },
    description: {
      de: 'Das bestimmt, welche Wege überhaupt offenstehen – und welche später über einen Umweg doch noch möglich sind.',
      en: 'This decides which routes are open at all — and which become possible later by a detour.',
    },
    help: {
      de: 'Kein Ausbildungsberuf in Deutschland setzt rechtlich einen bestimmten Schulabschluss voraus; die Betriebe entscheiden. Umgekehrt gilt: Über eine Ausbildung plus Berufsjahre oder über den Meister kommt man auch ohne Abitur an eine Hochschule. Ein Abschluss legt dich also nicht fest, er bestimmt nur die Reihenfolge.',
      en: 'No apprenticeship in Germany legally requires a specific school certificate; employers decide. Conversely, vocational training plus work experience, or a master craftsman qualification, opens university access without an Abitur. A certificate does not fix your path — it only sets the order.',
    },
    options: [
      {
        id: 'none',
        label: { de: 'Keinen Abschluss oder noch unklar', en: 'No certificate, or still unclear' },
        hint: { de: 'Es gibt Betriebe, die ohne Abschluss ausbilden, und Wege, ihn nachzuholen.', en: 'Some employers train without a certificate, and there are ways to catch up.' },
        effect: { require: ['access-none'], flags: ['no-certificate'] },
      },
      {
        id: 'hauptschule',
        label: { de: 'Hauptschulabschluss / Berufsreife', en: 'Hauptschulabschluss / basic school certificate' },
        effect: { require: ['access-hauptschule'] },
      },
      {
        id: 'realschule',
        label: { de: 'Mittlerer Abschluss / Mittlere Reife', en: 'Mid-level certificate' },
        effect: { require: ['access-realschule'] },
      },
      {
        id: 'fachhochschulreife',
        label: { de: 'Fachhochschulreife oder Fachabitur', en: 'Fachhochschulreife or vocational Abitur' },
        effect: { require: ['access-fachhochschulreife'] },
      },
      {
        id: 'abitur',
        label: { de: 'Allgemeine Hochschulreife (Abitur)', en: 'General higher education entrance qualification (Abitur)' },
        effect: {},
      },
    ],
  },

  {
    id: 'path',
    section: 'education',
    modes: ['orientation', 'focused', 'deep'],
    type: 'single',
    weight: 3,
    required: true,
    title: { de: 'Wie soll es nach der Schule weitergehen?', en: 'What should happen after school?' },
    description: {
      de: 'Der Weg entscheidet die nächsten drei bis sechs Jahre oft stärker als der Beruf selbst.',
      en: 'The route often decides the next three to six years more than the occupation itself.',
    },
    options: [
      {
        id: 'earn-now',
        label: { de: 'Ich will arbeiten und eigenes Geld verdienen', en: 'I want to work and earn my own money' },
        hint: { de: 'Duale Ausbildung: ab dem ersten Monat Gehalt, drei bis vier Tage im Betrieb.', en: 'A dual apprenticeship: a wage from the first month, three or four days in a company.' },
        effect: { require: ['paid-training'], prefer: ['dual-training'], ratings: { entryEase: 2 }, boostTags: { tarifvertrag: 3 } },
      },
      {
        id: 'training',
        label: { de: 'Eine Ausbildung machen, egal ob betrieblich oder schulisch', en: 'Do vocational training, whether in a company or at a college' },
        effect: { require: ['no-study'], ratings: { entryEase: 1 } },
      },
      {
        id: 'dual-study',
        label: { de: 'Studieren und gleichzeitig arbeiten (duales Studium)', en: 'Study and work at the same time (a dual degree)' },
        hint: { de: 'Bachelor mit Gehalt, dafür ohne Semesterferien und mit hartem Auswahlverfahren.', en: 'A bachelor with a salary, but no semester breaks and a tough selection process.' },
        effect: { prefer: ['study', 'paid-training'], ratings: { advancement: 2, salaryLevel: 1 }, flags: ['dual-study-competition'] },
      },
      {
        id: 'study',
        label: { de: 'Studieren', en: 'Study' },
        effect: { require: ['study'], ratings: { advancement: 2, salaryLevel: 2 }, flags: ['study-dropout'] },
      },
      {
        id: 'try-first',
        label: { de: 'Erst ein Jahr ausprobieren – Freiwilligendienst oder Praktika', en: 'Try things for a year first — voluntary service or placements' },
        hint: { de: 'Eine sehr gute Entscheidung, wenn nichts sicher ist. Sie verschenkt kein Jahr, sie spart oft eines.', en: 'A very good decision when nothing is certain. It does not waste a year, it often saves one.' },
        effect: { flags: ['voluntary-year'] },
        neutral: true,
      },
      {
        id: 'open',
        label: { de: 'Das weiß ich noch nicht', en: 'I do not know yet' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'people-or-things',
    section: 'interests',
    modes: ['orientation', 'focused', 'deep'],
    type: 'single',
    weight: 3,
    required: true,
    title: { de: 'Arbeitest du lieber mit Menschen, mit Dingen oder mit Informationen?', en: 'Would you rather work with people, with things or with information?' },
    options: [
      {
        id: 'people',
        label: { de: 'Mit Menschen', en: 'With people' },
        hint: { de: 'Betreuen, beraten, unterrichten, pflegen, verkaufen.', en: 'Caring, advising, teaching, nursing, selling.' },
        effect: { ratings: { peopleContact: 3, social: 2 }, prefer: ['with-people'], boostCodes: { social: 5, enterprising: 2 } },
      },
      {
        id: 'things',
        label: { de: 'Mit Dingen', en: 'With things' },
        hint: { de: 'Werkzeug, Material, Maschinen, Fahrzeuge, Pflanzen.', en: 'Tools, material, machines, vehicles, plants.' },
        effect: { ratings: { practical: 3 }, prefer: ['hands-on'], boostCodes: { realistic: 5 } },
      },
      {
        id: 'information',
        label: { de: 'Mit Informationen', en: 'With information' },
        hint: { de: 'Zahlen, Texte, Daten, Regeln, Programme.', en: 'Figures, texts, data, rules, programs.' },
        effect: { ratings: { analytical: 2, organising: 2 }, boostCodes: { investigative: 4, conventional: 4 } },
      },
      {
        id: 'mixed',
        label: { de: 'Am liebsten gemischt', en: 'Ideally a mixture' },
        effect: { ratings: { variety: 2 }, prefer: ['variety'] },
      },
    ],
  },

  {
    id: 'physical',
    section: 'conditions',
    modes: ['orientation', 'focused', 'deep'],
    type: 'single',
    weight: 3,
    required: true,
    title: { de: 'Wie körperlich soll die Arbeit sein?', en: 'How physical should the work be?' },
    description: {
      de: 'Diese Frage entscheidet über sehr viel – körperliche Berufe sind oft gut bezahlt, verschleißen aber.',
      en: 'This question decides a great deal — physical jobs are often well paid but wear you down.',
    },
    help: {
      de: 'Körperlich schwere Berufe haben deutlich höhere Quoten an vorzeitiger Erwerbsminderung. Das ist kein Argument gegen sie – es ist ein Argument dafür, den Aufstieg in Meister, Planung oder Leitung von Anfang an einzuplanen und nicht erst, wenn der Rücken nicht mehr mitmacht.',
      en: 'Physically heavy occupations have markedly higher rates of early incapacity to work. That is not an argument against them — it is an argument for planning the move into a master, planning or management role from the outset rather than when your back gives out.',
    },
    options: [
      {
        id: 'very-physical',
        label: { de: 'Richtig körperlich – ich will mich bewegen und anstrengen', en: 'Genuinely physical — I want to move and exert myself' },
        effect: { ratings: { physicalDemand: 3, practical: 2 }, prefer: ['physical-work'], boostCodes: { realistic: 4 }, flags: ['physical-wear'] },
      },
      {
        id: 'some-movement',
        label: { de: 'In Bewegung, aber nicht schwer heben', en: 'On the move, but not heavy lifting' },
        effect: { ratings: { physicalDemand: 1 }, prefer: ['low-physical'] },
      },
      {
        id: 'light',
        label: { de: 'Körperlich leicht', en: 'Physically light' },
        effect: { ratings: { physicalDemand: -2 }, prefer: ['low-physical'] },
      },
      {
        id: 'must-be-light',
        label: { de: 'Körperlich leicht – aus gesundheitlichen Gründen nötig', en: 'Physically light — necessary for health reasons' },
        hint: { de: 'Wird als harte Anforderung behandelt, nicht als Vorliebe.', en: 'Treated as a hard requirement, not a preference.' },
        effect: { ratings: { physicalDemand: -3 }, require: ['very-low-physical'] },
      },
      {
        id: 'unsure-physical',
        label: { de: 'Weiß ich nicht', en: 'I do not know' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'working-hours',
    section: 'life',
    modes: ['orientation', 'focused', 'deep'],
    type: 'single',
    weight: 3,
    required: true,
    title: { de: 'Wann willst du arbeiten?', en: 'When do you want to work?' },
    description: {
      de: 'Der häufigste Grund, warum Menschen ihre Ausbildung abbrechen, sind nicht die Inhalte – es sind die Arbeitszeiten.',
      en: 'The most common reason people quit their training is not the content — it is the hours.',
    },
    options: [
      {
        id: 'weekdays',
        label: { de: 'Werktags, Abende und Wochenenden frei', en: 'Weekdays, with evenings and weekends free' },
        effect: {
          ratings: { workLifeBalance: 2, structure: 1 },
          require: ['no-night-work'],
          prefer: ['no-weekend-work', 'regular-hours'],
        },
      },
      {
        id: 'flexible-ok',
        label: { de: 'Meistens werktags, gelegentlich auch anders', en: 'Mostly weekdays, occasionally otherwise' },
        effect: { prefer: ['regular-hours'] },
      },
      {
        id: 'shift-ok',
        label: { de: 'Schichtdienst ist für mich in Ordnung', en: 'Shift work is fine for me' },
        hint: { de: 'Oft mit Zuschlägen von 20 bis 40 Prozent verbunden.', en: 'Often comes with premiums of 20 to 40 percent.' },
        effect: { ratings: { salaryLevel: 1 }, boostTags: { schichtarbeit: 4 }, flags: ['shift-health'] },
      },
      {
        id: 'shift-wanted',
        label: { de: 'Ich will bewusst Schicht arbeiten – wegen der Zuschläge und der freien Tage', en: 'I deliberately want shift work — for the premiums and the days off' },
        effect: { ratings: { salaryLevel: 2 }, boostTags: { schichtarbeit: 8 }, flags: ['shift-health'] },
      },
      {
        id: 'hours-unsure',
        label: { de: 'Darüber habe ich noch nicht nachgedacht', en: 'I have not thought about that yet' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'money',
    section: 'values',
    modes: ['orientation', 'focused', 'deep'],
    type: 'single',
    weight: 2,
    required: true,
    title: { de: 'Wie wichtig ist dir das Gehalt?', en: 'How important is the salary to you?' },
    description: {
      de: 'Es gibt hier keine falsche Antwort. Wichtig ist nur, dass sie zu deiner Lage passt.',
      en: 'There is no wrong answer here. What matters is that it matches your situation.',
    },
    help: {
      de: 'Eine Zahl, die hilft: Wer allein wohnen will, braucht in einer deutschen Großstadt etwa 2.600 bis 3.200 € brutto, um ohne Zuschüsse auszukommen. Mehrere Berufe in diesem Kompass liegen darunter – das ist kein Grund, sie auszuschließen, wenn Unterstützung da ist, aber ein Grund, es vorher zu wissen.',
      en: 'One figure that helps: living alone in a large German city needs roughly €2,600 to €3,200 gross to get by without support. Several occupations in this compass are below that — not a reason to rule them out if support exists, but a reason to know it beforehand.',
    },
    options: [
      {
        id: 'must-be-good',
        label: { de: 'Sehr wichtig – ich muss und will gut verdienen', en: 'Very important — I have to and want to earn well' },
        effect: { ratings: { salaryLevel: 3 }, require: ['decent-entry-pay'], prefer: ['high-pay-later'] },
      },
      {
        id: 'important',
        label: { de: 'Wichtig, aber nicht das Erste', en: 'Important, but not the first thing' },
        effect: { ratings: { salaryLevel: 2 }, prefer: ['decent-entry-pay'] },
      },
      {
        id: 'enough',
        label: { de: 'Es muss reichen, mehr brauche ich nicht', en: 'It has to be enough, I do not need more' },
        effect: { ratings: { salaryLevel: 1 } },
      },
      {
        id: 'content-first',
        label: { de: 'Der Inhalt ist mir wichtiger als das Geld', en: 'The content matters more to me than the money' },
        hint: { de: 'Eine ehrliche Haltung – wir zeigen dir trotzdem, was der Beruf zahlt.', en: 'An honest stance — we will still show you what the job pays.' },
        effect: { ratings: { meaningfulness: 2 }, prefer: ['meaningful'] },
      },
    ],
  },

  {
    id: 'security',
    section: 'values',
    modes: ['orientation', 'focused', 'deep'],
    type: 'single',
    weight: 2,
    required: true,
    title: { de: 'Wie viel Sicherheit brauchst du?', en: 'How much security do you need?' },
    options: [
      {
        id: 'maximum',
        label: { de: 'So viel wie möglich – am liebsten unkündbar', en: 'As much as possible — ideally a job for life' },
        hint: { de: 'Das führt zum öffentlichen Dienst, zur Pflege und zu den Engpassberufen.', en: 'That leads to the public service, to care work and to shortage occupations.' },
        effect: { ratings: { jobSecurity: 3, futureProof: 2 }, require: ['secure-job'], prefer: ['civil-service', 'collective-agreement'] },
      },
      {
        id: 'high',
        label: { de: 'Viel – ich will nicht um meine Stelle bangen', en: 'A lot — I do not want to worry about my job' },
        effect: { ratings: { jobSecurity: 2, futureProof: 2 }, prefer: ['secure-job', 'many-positions'] },
      },
      {
        id: 'medium',
        label: { de: 'Normal – ich traue mir zu, etwas Neues zu finden', en: 'Normal — I trust myself to find something new' },
        effect: { ratings: { jobSecurity: 1 } },
      },
      {
        id: 'risk-ok',
        label: { de: 'Wenig – ich nehme Unsicherheit in Kauf, wenn es das Richtige ist', en: 'Little — I will accept insecurity if it is the right thing' },
        effect: { ratings: { autonomy: 1 }, prefer: ['self-employment-possible'] },
      },
    ],
  },

  {
    id: 'blockers',
    section: 'conditions',
    modes: ['orientation', 'focused', 'deep'],
    type: 'multiple',
    weight: 3,
    title: { de: 'Gibt es etwas, das für dich nicht in Frage kommt?', en: 'Is there anything that is out of the question for you?' },
    description: {
      de: 'Diese Angaben schließen Berufe aus. Wenn nichts zutrifft, einfach weiter.',
      en: 'These entries rule occupations out. If none apply, simply continue.',
    },
    options: [
      {
        id: 'no-blood',
        label: { de: 'Blut, Wunden oder Körperpflege bei Fremden', en: 'Blood, wounds or personal care for strangers' },
        effect: { avoid: ['with-people'], boostFields: { gesundheit: -8, soziales: -6 } },
      },
      {
        id: 'no-animals-dead',
        label: { de: 'Arbeit mit toten Tieren oder Tierversuchen', en: 'Working with dead animals or animal experiments' },
        effect: { boostOccupations: { fleischer: -20, biologielaborant: -6, tierpfleger: -4 } },
      },
      {
        id: 'no-heights',
        label: { de: 'Arbeiten in großer Höhe', en: 'Working at height' },
        effect: { avoid: [], boostTags: { hoehe: -20 } },
      },
      {
        id: 'no-weapons',
        label: { de: 'Dienst mit einer Waffe', en: 'Service with a weapon' },
        effect: { boostOccupations: { soldat: -20, 'polizei-mittlerer-dienst': -20, 'polizei-gehoben': -20 } },
      },
      {
        id: 'no-relocation',
        label: { de: 'Umziehen oder versetzt werden', en: 'Relocating or being posted elsewhere' },
        effect: { require: ['no-relocation'] },
      },
      {
        id: 'no-licence',
        label: { de: 'Ich habe und will keinen Führerschein', en: 'I have no driving licence and do not want one' },
        effect: { require: ['no-licence-needed'] },
      },
      {
        id: 'no-uniform',
        label: { de: 'Uniform und Befehle', en: 'A uniform and taking orders' },
        effect: { require: ['no-uniform'] },
      },
      {
        id: 'nothing-blocked',
        label: { de: 'Nichts davon', en: 'None of these' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'dream-job',
    section: 'interests',
    modes: ['orientation', 'focused', 'deep'],
    type: 'multiple',
    weight: 1,
    title: { de: 'Hast du schon einen Berufswunsch, der oft genannt wird?', en: 'Do you already have a career wish that comes up often?' },
    description: {
      de: 'Wir prüfen ihn ehrlich mit – auch dann, wenn etwas anderes besser passt.',
      en: 'We will check it honestly — including when something else fits better.',
    },
    options: [
      {
        id: 'animals',
        label: { de: 'Irgendwas mit Tieren', en: 'Something with animals' },
        effect: { boostTags: { tiere: 10 }, prefer: ['with-animals'], flags: ['animal-jobs'] },
      },
      {
        id: 'gaming',
        label: { de: 'Spiele entwickeln, Streaming, Social Media', en: 'Making games, streaming, social media' },
        effect: { boostOccupations: { 'game-developer': 10, 'mediengestalter-digital': 6, 'ecommerce-kaufmann': 4 }, flags: ['creator-reality'] },
      },
      {
        id: 'police-fire',
        label: { de: 'Polizei, Feuerwehr oder Rettungsdienst', en: 'Police, fire service or ambulance' },
        effect: { boostFields: { sicherheit: 10 }, boostOccupations: { notfallsanitaeter: 8 }, flags: ['uniform-selection'] },
      },
      {
        id: 'medicine',
        label: { de: 'Etwas in der Medizin', en: 'Something in medicine' },
        effect: { boostFields: { gesundheit: 10 }, flags: ['medicine-nc'] },
      },
      {
        id: 'creative-dream',
        label: { de: 'Etwas Kreatives – Design, Film, Fotografie, Musik', en: 'Something creative — design, film, photography, music' },
        effect: { boostCodes: { artistic: 8 }, boostFields: { gestaltung: 6, medien: 6 }, flags: ['creative-market'] },
      },
      {
        id: 'sports-dream',
        label: { de: 'Etwas mit Sport', en: 'Something with sport' },
        effect: { boostFields: { sport: 10 }, flags: ['pro-sport'] },
      },
      {
        id: 'no-dream',
        label: { de: 'Nein, ich bin völlig offen', en: 'No, I am completely open' },
        effect: {},
        neutral: true,
      },
    ],
  },
];

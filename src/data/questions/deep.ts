import type { Question } from './types';

/**
 * Fragen nur im tiefen Modus.
 *
 * Hier geht es um die Unterschiede, die man erst bemerkt, wenn man schon im
 * Beruf steht: Betriebsgröße, Tarifbindung, Aufstiegsplan, Belastungsgrenzen.
 * Sie sind für Menschen gedacht, die zwei oder drei Berufe gegeneinander
 * abwägen – nicht für den ersten Überblick.
 */
export const deepQuestions: Question[] = [
  {
    id: 'emotional-load',
    section: 'conditions',
    modes: ['deep'],
    type: 'single',
    weight: 3,
    required: true,
    title: { de: 'Wie viel seelische Belastung kannst du tragen?', en: 'How much emotional strain can you carry?' },
    description: {
      de: 'Gemeint ist: Leid, Tod, Aggression, Verantwortung für Menschenleben.',
      en: 'This means: suffering, death, aggression, responsibility for human lives.',
    },
    help: {
      de: 'Die Berufe mit der höchsten Sinnzufriedenheit in diesem Kompass sind auch die mit der höchsten seelischen Belastung – Pflege, Rettungsdienst, Polizei, Soziale Arbeit. Das ist kein Zufall, sondern dieselbe Ursache: Man ist bei Menschen, wenn es ihnen schlecht geht. Wer das gut kann, sollte es tun. Wer es nicht kann, ist nicht schwach – er ist an anderer Stelle besser.',
      en: 'The occupations with the highest sense of purpose in this compass are also those with the highest emotional strain — nursing, ambulance work, policing, social work. That is no coincidence but the same cause: you are with people when things are bad for them. Anyone good at this should do it. Anyone who cannot is not weak — they are better placed elsewhere.',
    },
    options: [
      {
        id: 'high',
        label: { de: 'Viel – ich bin belastbar und kann abschalten', en: 'A lot — I am resilient and can switch off' },
        effect: { boostFields: { gesundheit: 4, soziales: 4, sicherheit: 4 }, prefer: ['meaningful'] },
      },
      {
        id: 'medium',
        label: { de: 'Normal – gelegentlich schwere Situationen gehen', en: 'Normal — occasional difficult situations are fine' },
        effect: { prefer: ['low-emotional'] },
      },
      {
        id: 'low',
        label: { de: 'Wenig – ich nehme Belastendes zu stark mit', en: 'Little — I take distressing things too much to heart' },
        effect: { require: ['low-emotional'] },
      },
      {
        id: 'unknown-emotional',
        label: { de: 'Das weiß ich nicht, weil ich es noch nicht erlebt habe', en: 'I do not know, because I have not experienced it' },
        hint: { de: 'Ein Freiwilligendienst oder ein Praktikum beantwortet das besser als jede Selbsteinschätzung.', en: 'A voluntary year or a placement answers this better than any self-assessment.' },
        effect: { flags: ['try-before-deciding'] },
        neutral: true,
      },
    ],
  },

  {
    id: 'employer-size',
    section: 'conditions',
    modes: ['deep'],
    type: 'single',
    weight: 1,
    title: { de: 'Großer Betrieb oder kleiner?', en: 'A large employer or a small one?' },
    description: {
      de: 'Bei gleichem Beruf unterscheidet sich der Alltag zwischen Konzern und Zweimannbetrieb stärker als zwischen manchen Berufen.',
      en: 'For the same occupation, daily life differs more between a corporation and a two-person business than between some occupations.',
    },
    options: [
      {
        id: 'large',
        label: { de: 'Groß – Struktur, Tarifvertrag, Abteilungen', en: 'Large — structure, collective agreement, departments' },
        effect: { ratings: { structure: 2, jobSecurity: 1 }, prefer: ['collective-agreement'], boostFields: { technik: 3, wirtschaft: 3 } },
      },
      {
        id: 'medium-size',
        label: { de: 'Mittelgroß', en: 'Medium-sized' },
        effect: {},
      },
      {
        id: 'small',
        label: { de: 'Klein – nah dran, alles mitbekommen, früh Verantwortung', en: 'Small — close to everything, involved in all of it, early responsibility' },
        effect: { ratings: { autonomy: 2, variety: 1 }, prefer: ['self-employment-possible'] },
      },
      {
        id: 'size-unsure',
        label: { de: 'Ist mir nicht wichtig', en: 'Not important to me' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'collective',
    section: 'values',
    modes: ['deep'],
    type: 'single',
    weight: 2,
    title: { de: 'Wie wichtig sind dir Tarifvertrag und geregelte Bedingungen?', en: 'How important are a collective agreement and regulated conditions to you?' },
    help: {
      de: 'Tarifbindung bedeutet in der Praxis: festgelegtes Gehalt nach Stufen, Urlaubs- und Weihnachtsgeld, geregelte Arbeitszeit, Zuschläge und oft eine Zusatzrente. Bei gleichem Beruf können das über ein Arbeitsleben sechsstellige Unterschiede sein. In Industrie, öffentlichem Dienst und am Bau ist Tarifbindung verbreitet, in Gastronomie, Handwerk und Kreativbranche selten.',
      en: 'Collective agreement coverage means in practice: pay set by grade, holiday and Christmas bonuses, regulated hours, premiums and often a supplementary pension. For the same occupation that can add up to six-figure differences over a working life. Coverage is common in industry, the public sector and construction, and rare in hospitality, the crafts and creative industries.',
    },
    options: [
      {
        id: 'very-important',
        label: { de: 'Sehr wichtig', en: 'Very important' },
        effect: { require: ['collective-agreement'], ratings: { jobSecurity: 2 } },
      },
      {
        id: 'prefer-collective',
        label: { de: 'Ich hätte es gern', en: 'I would like it' },
        effect: { prefer: ['collective-agreement'] },
      },
      {
        id: 'dont-care',
        label: { de: 'Weniger wichtig als der Inhalt', en: 'Less important than the content' },
        effect: {},
      },
    ],
  },

  {
    id: 'advancement-plan',
    section: 'education',
    modes: ['deep'],
    type: 'single',
    weight: 2,
    title: { de: 'Willst du nach der Ausbildung weiterlernen?', en: 'Do you want to keep learning after your training?' },
    description: {
      de: 'Meister, Techniker und Fachwirt sind dem Bachelor gleichgestellt und öffnen ein Studium ohne Abitur.',
      en: 'The master craftsman, technician and business specialist qualifications rank alongside a bachelor and open university access without an Abitur.',
    },
    options: [
      {
        id: 'definitely',
        label: { de: 'Ja, ich will aufsteigen', en: 'Yes, I want to advance' },
        effect: { ratings: { advancement: 3 }, require: ['advancement'] },
      },
      {
        id: 'maybe-later',
        label: { de: 'Vielleicht später', en: 'Maybe later' },
        effect: { ratings: { advancement: 1 }, prefer: ['advancement'] },
      },
      {
        id: 'done-learning',
        label: { de: 'Nein, nach der Ausbildung will ich arbeiten', en: 'No, after training I want to work' },
        effect: { prefer: ['decent-entry-pay'] },
      },
    ],
  },

  {
    id: 'automation',
    section: 'values',
    modes: ['deep'],
    type: 'single',
    weight: 2,
    title: { de: 'Wie wichtig ist dir, dass der Beruf in zwanzig Jahren noch gebraucht wird?', en: 'How important is it that the occupation is still needed in twenty years?' },
    help: {
      de: 'Berufe mit hohem Automatisierungsrisiko sind hier durchgehend benannt. Verlässlich sicher sind Tätigkeiten, bei denen jemand körperlich vor Ort etwas Unvorhersehbares tun muss – Handwerk, Pflege, Instandhaltung, Rettung – und solche, bei denen jemand persönlich verantwortlich entscheidet. Bedroht sind einfache Sachbearbeitung, Standardgestaltung und reine Datenerfassung.',
      en: 'Occupations with a high automation risk are named consistently here. Reliably safe are activities where someone has to do something unpredictable physically on the spot — trades, care, maintenance, rescue — and those where someone decides under personal responsibility. At risk are simple clerical processing, standard design work and pure data entry.',
    },
    options: [
      {
        id: 'very',
        label: { de: 'Sehr wichtig', en: 'Very important' },
        effect: { ratings: { futureProof: 3 }, require: ['future-proof'] },
      },
      {
        id: 'somewhat',
        label: { de: 'Wichtig', en: 'Important' },
        effect: { ratings: { futureProof: 2 }, prefer: ['future-proof'] },
      },
      {
        id: 'flexible',
        label: { de: 'Ich traue mir zu, mich zu verändern', en: 'I trust myself to adapt' },
        effect: { ratings: { advancement: 1 } },
      },
    ],
  },

  {
    id: 'precision',
    section: 'strengths',
    modes: ['deep'],
    type: 'single',
    weight: 2,
    title: { de: 'Wie genau arbeitest du?', en: 'How precisely do you work?' },
    description: {
      de: 'In einigen Berufen ist ein Zehntelmillimeter oder ein Komma der Unterschied zwischen richtig und teuer.',
      en: 'In some occupations a tenth of a millimetre or a decimal point is the difference between correct and expensive.',
    },
    options: [
      {
        id: 'very-precise',
        label: { de: 'Sehr genau – Ungenauigkeit ärgert mich', en: 'Very precisely — imprecision annoys me' },
        effect: { ratings: { precisionDemand: 3 }, boostTags: { praezision: 6 } },
      },
      {
        id: 'precise-enough',
        label: { de: 'Genau genug, wenn es darauf ankommt', en: 'Precisely enough when it matters' },
        effect: { ratings: { precisionDemand: 1 } },
      },
      {
        id: 'rather-fast',
        label: { de: 'Lieber schnell fertig als perfekt', en: 'I would rather be finished than perfect' },
        effect: { ratings: { precisionDemand: -2 } },
      },
    ],
  },

  {
    id: 'learning-style',
    section: 'strengths',
    modes: ['deep'],
    type: 'single',
    weight: 2,
    title: { de: 'Wie lernst du am besten?', en: 'How do you learn best?' },
    description: {
      de: 'Das ist die beste Vorhersage dafür, ob Ausbildung oder Studium besser trägt.',
      en: 'This is the best predictor of whether an apprenticeship or a degree will work better for you.',
    },
    options: [
      {
        id: 'by-doing',
        label: { de: 'Indem ich es tue und jemand mir dabei zusieht', en: 'By doing it while someone watches over me' },
        effect: { prefer: ['dual-training'], ratings: { practical: 2 } },
      },
      {
        id: 'structured-learning',
        label: { de: 'Mit Unterricht, Plan und regelmäßigen Prüfungen', en: 'With lessons, a plan and regular tests' },
        effect: { prefer: ['no-study'], ratings: { structure: 1 } },
      },
      {
        id: 'self-directed',
        label: { de: 'Allein, aus Büchern und im eigenen Tempo', en: 'Alone, from books and at my own pace' },
        effect: { prefer: ['study'], ratings: { analytical: 1 } },
      },
      {
        id: 'learning-mixed',
        label: { de: 'Gemischt', en: 'A mixture' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'shift-tradeoff',
    section: 'life',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 2,
    showIf: { questionId: 'working-hours', anyOf: ['weekdays'] },
    title: { de: 'Wenn ein Beruf gut passt, aber Schichtdienst verlangt – wäre das ein Ausschluss?', en: 'If an occupation fits well but requires shift work — would that rule it out?' },
    description: {
      de: 'Mehrere der gesuchtesten und bestbezahlten Ausbildungsberufe laufen im Schichtbetrieb. Deshalb fragen wir hier nochmal nach.',
      en: 'Several of the most sought-after and best-paid apprenticeships run on shifts. That is why we are asking again.',
    },
    options: [
      {
        id: 'still-no',
        label: { de: 'Ja, das ist für mich endgültig ausgeschlossen', en: 'Yes, that is definitively out for me' },
        effect: { require: ['no-shift-work'] },
      },
      {
        id: 'would-consider',
        label: { de: 'Nein, für den richtigen Beruf würde ich es überlegen', en: 'No, for the right occupation I would consider it' },
        effect: { suppressFlags: ['shift-health'] },
      },
      {
        id: 'limited',
        label: { de: 'Frühdienst ja, Nachtdienst nein', en: 'Early shifts yes, night shifts no' },
        effect: { require: ['no-night-work'] },
      },
    ],
  },

  {
    id: 'pay-tradeoff',
    section: 'values',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 2,
    showIf: { questionId: 'money', anyOf: ['content-first', 'enough'] },
    title: { de: 'Wenn ein Beruf gut passt, aber wenig zahlt – kannst du davon leben?', en: 'If an occupation fits well but pays little — can you live on it?' },
    description: {
      de: 'Mehrere der interessantesten Berufe in diesem Kompass zahlen unter 2.700 € brutto in Vollzeit. Das ist der häufigste Grund für spätere Berufswechsel.',
      en: 'Several of the most interesting occupations in this compass pay under €2,700 gross full-time. That is the most common reason for later career changes.',
    },
    options: [
      {
        id: 'yes-support',
        label: { de: 'Ja – ich habe Unterstützung oder brauche wenig', en: 'Yes — I have support or need little' },
        effect: { suppressFlags: ['low-pay-reality'] },
      },
      {
        id: 'tight-but-ok',
        label: { de: 'Es wäre knapp, aber ich würde es versuchen', en: 'It would be tight, but I would try' },
        effect: { flags: ['low-pay-reality'] },
      },
      {
        id: 'no-must-earn',
        label: { de: 'Nein, ich muss von meinem Gehalt leben können', en: 'No, I have to be able to live on my wage' },
        hint: { de: 'Dann behandeln wir das als harte Grenze – das ist ehrlicher als eine schöne Empfehlung.', en: 'Then we treat it as a hard limit — more honest than a nice-sounding recommendation.' },
        effect: { require: ['decent-entry-pay'], flags: ['low-pay-reality'] },
      },
    ],
  },

  {
    id: 'study-doubt',
    section: 'education',
    modes: ['deep'],
    type: 'single',
    weight: 2,
    showIf: { questionId: 'path', anyOf: ['study', 'dual-study'] },
    title: { de: 'Wie sicher bist du, dass du ein Studium durchhältst?', en: 'How sure are you that you would see a degree through?' },
    description: {
      de: 'Je nach Fach brechen 20 bis über 50 Prozent ab. Das ist keine Drohung, sondern eine Zahl, die man kennen sollte.',
      en: 'Depending on the subject, 20 to over 50 percent drop out. That is not a threat but a figure worth knowing.',
    },
    options: [
      {
        id: 'confident',
        label: { de: 'Sicher – ich kann mich selbst organisieren', en: 'Sure — I can organise myself' },
        effect: { suppressFlags: ['study-dropout'] },
      },
      {
        id: 'unsure-study',
        label: { de: 'Nicht sicher – ohne Struktur wird es schwierig für mich', en: 'Not sure — without structure it gets difficult for me' },
        hint: {
          de: 'Dann sind duales Studium oder Ausbildung plus Techniker oft der bessere Weg zum gleichen Ziel.',
          en: 'Then a dual degree, or an apprenticeship plus a technician qualification, is often the better route to the same goal.',
        },
        effect: { prefer: ['dual-training', 'paid-training'], flags: ['study-dropout', 'alternative-routes'] },
      },
      {
        id: 'never-tried',
        label: { de: 'Keine Ahnung, ich war noch nie in dieser Lage', en: 'No idea, I have never been in that situation' },
        effect: { flags: ['study-dropout'] },
        neutral: true,
      },
    ],
  },

  {
    id: 'health-limits',
    section: 'conditions',
    modes: ['deep'],
    type: 'multiple',
    weight: 3,
    title: { de: 'Gibt es gesundheitliche Punkte, die wir berücksichtigen sollen?', en: 'Are there any health factors we should take into account?' },
    description: {
      de: 'Wird als harte Grenze behandelt, weil einige Berufe eine ärztliche Eignungsprüfung verlangen. Diese Angaben verlassen deinen Browser nicht.',
      en: 'Treated as a hard limit, because some occupations require a medical fitness assessment. These entries never leave your browser.',
    },
    options: [
      {
        id: 'back',
        label: { de: 'Rücken, Knie oder Gelenke', en: 'Back, knees or joints' },
        effect: { require: ['low-physical'], ratings: { physicalDemand: -3 } },
      },
      {
        id: 'allergy',
        label: { de: 'Allergien – Tierhaare, Pollen, Mehl, Lösemittel', en: 'Allergies — animal hair, pollen, flour, solvents' },
        effect: { boostTags: { tiere: -8, natur: -6, lebensmittel: -6 }, flags: ['allergy-check'] },
      },
      {
        id: 'colour-vision',
        label: { de: 'Farbsehschwäche', en: 'Colour vision deficiency' },
        hint: { de: 'Schließt Elektroberufe und Teile der Gestaltung faktisch aus.', en: 'Effectively rules out electrical trades and parts of design work.' },
        effect: {
          boostOccupations: {
            'elektroniker-betriebstechnik': -20,
            'elektroniker-gebaeudetechnik': -20,
            'it-systemelektroniker': -12,
            'mediengestalter-digital': -10,
            augenoptiker: -10,
          },
          flags: ['colour-vision'],
        },
      },
      {
        id: 'heights',
        label: { de: 'Höhenangst', en: 'Fear of heights' },
        effect: { boostTags: { hoehe: -20 } },
      },
      {
        id: 'noise',
        label: { de: 'Lärmempfindlichkeit oder Hörprobleme', en: 'Sensitivity to noise or hearing problems' },
        effect: { boostFields: { technik: -4, gastronomie: -4 }, boostOccupations: { erzieher: -6, 'sozialpaedagogischer-assistent': -6 } },
      },
      {
        id: 'mental-health',
        label: { de: 'Psychische Belastbarkeit ist bei mir begrenzt', en: 'My capacity for psychological strain is limited' },
        effect: { require: ['low-emotional'], flags: ['mental-health-support'] },
      },
      {
        id: 'no-limits',
        label: { de: 'Nichts davon', en: 'None of these' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'languages',
    section: 'strengths',
    modes: ['deep'],
    type: 'single',
    weight: 1,
    title: { de: 'Wie gut ist dein Englisch?', en: 'How good is your English?' },
    description: {
      de: 'In IT, Außenhandel, Hotellerie und Forschung ist es ein Arbeitsmittel, kein Schulfach.',
      en: 'In IT, foreign trade, hospitality and research it is a working tool, not a school subject.',
    },
    options: [
      {
        id: 'good',
        label: { de: 'Gut – ich könnte ein Gespräch führen', en: 'Good — I could hold a conversation' },
        effect: { boostTags: { englisch: 6, ausland: 3 }, boostFields: { it: 3 } },
      },
      {
        id: 'ok-english',
        label: { de: 'Mittel – Lesen geht, Sprechen ist unangenehm', en: 'Middling — reading is fine, speaking is uncomfortable' },
        effect: {},
      },
      {
        id: 'weak-english',
        label: { de: 'Schwach – das ist für mich ein Hindernis', en: 'Weak — that is an obstacle for me' },
        effect: { boostTags: { englisch: -8, ausland: -6 }, flags: ['english-matters'] },
      },
    ],
  },

  {
    id: 'digital-confidence',
    section: 'strengths',
    modes: ['deep'],
    type: 'single',
    weight: 1,
    title: { de: 'Wie sicher bist du mit Technik und Rechnern?', en: 'How confident are you with technology and computers?' },
    description: {
      de: 'Gemeint ist verstehen, nicht bedienen. Ein Telefon benutzen kann jeder.',
      en: 'This means understanding, not operating. Everyone can use a phone.',
    },
    options: [
      {
        id: 'very-confident',
        label: { de: 'Ich baue und richte selbst Dinge ein', en: 'I build and set things up myself' },
        effect: { ratings: { techDemand: 2 }, prefer: ['tech-work'] },
      },
      {
        id: 'confident',
        label: { de: 'Ich komme gut zurecht', en: 'I manage well' },
        effect: { ratings: { techDemand: 1 } },
      },
      {
        id: 'not-confident',
        label: { de: 'Technik ist nicht mein Gebiet', en: 'Technology is not my area' },
        effect: { ratings: { techDemand: -2 }, avoid: ['tech-work'] },
      },
    ],
  },

  {
    id: 'selection',
    section: 'education',
    modes: ['deep'],
    type: 'single',
    weight: 2,
    title: { de: 'Wie viel Auswahlverfahren bist du bereit mitzumachen?', en: 'How much of a selection procedure are you prepared to go through?' },
    description: {
      de: 'Manche Berufe verlangen einen Sporttest, eine Mappe, einen Eignungstest oder einen Notenschnitt, den man nicht mehr ändern kann.',
      en: 'Some occupations require a fitness test, a portfolio, an aptitude test or a grade average you can no longer change.',
    },
    help: {
      de: 'Auswahlverfahren sind trainierbar, Notenschnitte nicht. Sporttests und Einstellungstests sind veröffentlicht und lassen sich über Monate vorbereiten – wer sie ignoriert, verschenkt die Bewerbung. Eine Mappe kann man in drei Monaten aufbauen. Ein Numerus Clausus dagegen steht fest; dort helfen nur Zusatzquoten, Eignungstests, Wartesemester oder ein anderer Weg zum gleichen Feld.',
      en: 'Selection procedures can be trained for; grade averages cannot. Fitness and entrance tests are published and can be prepared over months — ignoring them wastes the application. A portfolio can be built in three months. A numerus clausus, by contrast, is fixed; there only additional quotas, aptitude tests, waiting semesters or a different route into the same field help.',
    },
    options: [
      {
        id: 'anything',
        label: { de: 'Alles – ich bereite mich vor und trete auch mehrfach an', en: 'Anything — I will prepare and apply more than once' },
        effect: { ratings: { advancement: 1 } },
      },
      {
        id: 'tests-ok',
        label: { de: 'Tests und Mappen ja, aber keinen Numerus Clausus', en: 'Tests and portfolios yes, but no numerus clausus' },
        hint: { de: 'Ein Notenschnitt lässt sich nach der Schule nicht mehr verbessern, ein Sporttest schon.', en: 'A grade average cannot be improved after school; a fitness test can.' },
        effect: { require: ['no-admission-limit'] },
      },
      {
        id: 'nothing-extra',
        label: { de: 'Möglichst keins – ich will sich bewerben und anfangen können', en: 'As little as possible — I want to apply and be able to start' },
        effect: { require: ['no-admission-limit'], prefer: ['no-entry-test', 'low-competition'] },
      },
      {
        id: 'selection-unsure',
        label: { de: 'Weiß ich nicht', en: 'I do not know' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'shortage-openness',
    section: 'education',
    modes: ['deep'],
    type: 'single',
    weight: 1,
    title: { de: 'Sollen wir dir auch Berufe zeigen, die kaum jemand kennt?', en: 'Should we also show you occupations hardly anyone knows?' },
    description: {
      de: 'Einige der bestbezahlten und sichersten Ausbildungsberufe werden praktisch nie genannt – nicht weil sie schlecht sind, sondern weil niemand von ihnen erzählt.',
      en: 'Some of the best-paid and most secure apprenticeships are practically never mentioned — not because they are bad, but because nobody talks about them.',
    },
    options: [
      {
        id: 'yes-show',
        label: { de: 'Ja, gern – auch wenn ich den Namen noch nie gehört habe', en: 'Yes, please — even if I have never heard the name' },
        effect: { ratings: { entryEase: 1 }, prefer: ['low-competition', 'many-positions'] },
      },
      {
        id: 'known-only',
        label: { de: 'Lieber Berufe, die ich einordnen kann', en: 'I would rather have occupations I can place' },
        effect: {},
      },
    ],
  },
];

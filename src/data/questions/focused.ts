import type { Question } from './types';

/**
 * Fragen ab dem mittleren Modus.
 *
 * Sie setzen voraus, dass eine Richtung schon feststeht, und arbeiten die
 * Unterschiede innerhalb dieser Richtung heraus: Alltag, Umfeld, Verantwortung.
 */
export const focusedQuestions: Question[] = [
  {
    id: 'workplace',
    section: 'conditions',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 2,
    required: true,
    title: { de: 'Wo soll dein Arbeitstag stattfinden?', en: 'Where should your working day take place?' },
    options: [
      {
        id: 'office',
        label: { de: 'In einem Büro', en: 'In an office' },
        effect: { ratings: { outdoors: -2 }, require: ['office-work'], prefer: ['indoor-work'] },
      },
      {
        id: 'workshop',
        label: { de: 'In einer Werkstatt, Halle oder Küche', en: 'In a workshop, plant or kitchen' },
        effect: { ratings: { practical: 2 }, prefer: ['hands-on'] },
      },
      {
        id: 'outdoors',
        label: { de: 'Draußen, bei jedem Wetter', en: 'Outdoors, in any weather' },
        effect: { ratings: { outdoors: 3 }, require: ['outdoors-work'] },
      },
      {
        id: 'changing',
        label: { de: 'An wechselnden Orten – unterwegs zu Kunden oder Baustellen', en: 'At changing locations — travelling to customers or sites' },
        effect: { ratings: { variety: 2, autonomy: 1 }, prefer: ['variety'] },
      },
      {
        id: 'with-people-place',
        label: { de: 'Wo Menschen sind – Klinik, Schule, Laden, Praxis', en: 'Where people are — a hospital, school, shop or practice' },
        effect: { ratings: { peopleContact: 3 }, prefer: ['with-people'] },
      },
      {
        id: 'place-unsure',
        label: { de: 'Ist mir nicht wichtig', en: 'Not important to me' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'routine',
    section: 'conditions',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 2,
    required: true,
    title: { de: 'Brauchst du feste Abläufe oder Abwechslung?', en: 'Do you need fixed routines or variety?' },
    description: {
      de: 'Beides ist eine Stärke. Die Frage ist nur, welche zu dir gehört.',
      en: 'Both are strengths. The only question is which one is yours.',
    },
    options: [
      {
        id: 'routine-please',
        label: { de: 'Feste Abläufe – ich arbeite gut, wenn ich weiß, was kommt', en: 'Fixed routines — I work well when I know what is coming' },
        effect: { ratings: { structure: 3, variety: -2, calmPace: 1 }, prefer: ['structured'] },
      },
      {
        id: 'some-structure',
        label: { de: 'Überwiegend geordnet, mit gelegentlichen Überraschungen', en: 'Mostly ordered, with the occasional surprise' },
        effect: { ratings: { structure: 1 } },
      },
      {
        id: 'variety-please',
        label: { de: 'Abwechslung – gleiche Tage machen mich unruhig', en: 'Variety — identical days make me restless' },
        effect: { ratings: { variety: 3, structure: -2 }, prefer: ['variety'] },
      },
      {
        id: 'chaos-ok',
        label: { de: 'Je unvorhersehbarer, desto besser', en: 'The less predictable the better' },
        effect: { ratings: { variety: 3, structure: -3, calmPace: -1 }, prefer: ['variety'] },
      },
    ],
  },

  {
    id: 'pressure',
    section: 'conditions',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 2,
    required: true,
    title: { de: 'Wie gehst du mit Zeitdruck um?', en: 'How do you handle time pressure?' },
    options: [
      {
        id: 'thrive',
        label: { de: 'Unter Druck werde ich besser', en: 'Pressure makes me better' },
        effect: { ratings: { calmPace: -2 }, boostFields: { gastronomie: 3, sicherheit: 3, gesundheit: 2 } },
      },
      {
        id: 'can-handle',
        label: { de: 'Ich halte ihn aus, brauche ihn aber nicht', en: 'I can take it but do not need it' },
        effect: {},
      },
      {
        id: 'need-calm',
        label: { de: 'Ich arbeite deutlich besser in Ruhe', en: 'I work much better in calm conditions' },
        effect: { ratings: { calmPace: 3 }, prefer: ['calm-pace'] },
      },
      {
        id: 'no-pressure',
        label: { de: 'Dauernder Zeitdruck macht mich krank', en: 'Constant time pressure makes me ill' },
        hint: { de: 'Wird als harte Anforderung behandelt.', en: 'Treated as a hard requirement.' },
        effect: { ratings: { calmPace: 3 }, require: ['calm-pace'], avoid: [] },
      },
    ],
  },

  {
    id: 'responsibility',
    section: 'values',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 2,
    required: true,
    title: { de: 'Wie viel Verantwortung willst du tragen?', en: 'How much responsibility do you want to carry?' },
    description: {
      de: 'Verantwortung heißt hier: Wenn du einen Fehler machst, hat das Folgen für andere.',
      en: 'Responsibility here means: if you make a mistake, it has consequences for others.',
    },
    options: [
      {
        id: 'much',
        label: { de: 'Viel – ich will entscheiden und dafür einstehen', en: 'A lot — I want to decide and stand behind it' },
        effect: { ratings: { autonomy: 3, precisionDemand: 1, advancement: 1 }, prefer: ['autonomy', 'advancement'] },
      },
      {
        id: 'some',
        label: { de: 'Etwas, aber nicht für Leben und Gesundheit anderer', en: 'Some, but not for other people\'s lives and health' },
        effect: { ratings: { autonomy: 1 }, boostFields: { gesundheit: -3, sicherheit: -3 } },
      },
      {
        id: 'clear-tasks',
        label: { de: 'Ich mag klare Aufgaben und klare Zuständigkeiten', en: 'I like clear tasks and clear responsibilities' },
        effect: { ratings: { structure: 2, autonomy: -1 }, prefer: ['structured'] },
      },
      {
        id: 'lead-later',
        label: { de: 'Später will ich ein Team führen', en: 'Later I want to lead a team' },
        effect: { ratings: { persuasive: 2, advancement: 3 }, prefer: ['advancement'], boostCodes: { enterprising: 4 } },
      },
    ],
  },

  {
    id: 'training-money',
    section: 'education',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 3,
    required: true,
    title: { de: 'Kannst du eine Zeit ohne eigenes Einkommen überbrücken?', en: 'Can you bridge a period without your own income?' },
    description: {
      de: 'Viele schulische Ausbildungen und alle Studiengänge sind unvergütet. Diese Frage entscheidet mehr als jede andere über die tatsächlich offenen Wege.',
      en: 'Many school-based programmes and all degrees are unpaid. This question decides which routes are genuinely open more than any other.',
    },
    help: {
      de: 'Es gibt Hilfen, die viele nicht kennen: BAföG für Schule und Studium, Aufstiegs-BAföG für Meister und Techniker, Berufsausbildungsbeihilfe der Arbeitsagentur, Wohngeld und Stipendien. Wer eine schulische Ausbildung nur wegen des Geldes ausschließt, sollte vorher rechnen lassen – die Beratung bei der Arbeitsagentur ist kostenlos.',
      en: 'There are support schemes many people do not know about: BAföG for school and university, Aufstiegs-BAföG for master and technician qualifications, vocational training assistance from the employment agency, housing benefit and scholarships. Anyone ruling out a school-based route purely for money should get the numbers checked first — advice at the employment agency is free.',
    },
    options: [
      {
        id: 'no-way',
        label: { de: 'Nein, ich brauche von Anfang an Geld', en: 'No, I need money from the start' },
        effect: { require: ['paid-training'], ratings: { entryEase: 2 } },
      },
      {
        id: 'short',
        label: { de: 'Ein bis zwei Jahre wären machbar', en: 'One or two years would be manageable' },
        effect: { prefer: ['paid-training', 'short-training'] },
      },
      {
        id: 'long',
        label: { de: 'Auch drei bis fünf Jahre, mit Nebenjob oder Unterstützung', en: 'Even three to five years, with a side job or support' },
        effect: { ratings: { advancement: 1 } },
      },
      {
        id: 'unsure-money',
        label: { de: 'Das muss ich noch klären', en: 'I still have to sort that out' },
        effect: { flags: ['funding-advice'] },
        neutral: true,
      },
    ],
  },

  {
    id: 'training-length',
    section: 'education',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 2,
    title: { de: 'Wie lange darf der Weg dauern, bis du im Beruf angekommen bist?', en: 'How long may the route take until you have arrived in the job?' },
    options: [
      {
        id: 'fast',
        label: { de: 'Höchstens drei Jahre', en: 'Three years at most' },
        effect: { require: ['short-training'], ratings: { entryEase: 2 } },
      },
      {
        id: 'medium-length',
        label: { de: 'Drei bis vier Jahre sind in Ordnung', en: 'Three to four years is fine' },
        effect: { prefer: ['short-training'] },
      },
      {
        id: 'long-ok',
        label: { de: 'Auch fünf Jahre und mehr, wenn es das Richtige ist', en: 'Even five years and more, if it is the right thing' },
        effect: { ratings: { advancement: 2, salaryLevel: 1 } },
      },
      {
        id: 'length-unsure',
        label: { de: 'Egal', en: 'Does not matter' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'people-detail',
    section: 'interests',
    modes: ['focused', 'deep'],
    type: 'multiple',
    weight: 2,
    showIf: { questionId: 'people-or-things', anyOf: ['people', 'mixed'] },
    title: { de: 'Mit welchen Menschen möchtest du arbeiten?', en: 'Which people would you like to work with?' },
    description: { de: 'Der Unterschied ist groß – mit Kindern zu arbeiten ist ein anderer Beruf als mit alten Menschen.', en: 'The difference is large — working with children is a different job from working with old people.' },
    options: [
      {
        id: 'children',
        label: { de: 'Mit Kindern', en: 'With children' },
        effect: { boostTags: { kinder: 10 }, prefer: ['with-children'], boostOccupations: { erzieher: 6, 'lehrer-grundschule': 6 } },
      },
      {
        id: 'teens',
        label: { de: 'Mit Jugendlichen', en: 'With teenagers' },
        effect: { boostOccupations: { 'lehrer-sekundarstufe': 8, sozialarbeiter: 6, erzieher: 4 } },
      },
      {
        id: 'sick',
        label: { de: 'Mit kranken oder verletzten Menschen', en: 'With sick or injured people' },
        effect: { boostFields: { gesundheit: 8 } },
      },
      {
        id: 'disabled',
        label: { de: 'Mit Menschen mit Behinderung', en: 'With people with disabilities' },
        effect: { boostOccupations: { heilerziehungspfleger: 12, ergotherapeut: 6, 'sozialarbeiter': 4 } },
      },
      {
        id: 'old',
        label: { de: 'Mit alten Menschen', en: 'With old people' },
        effect: { boostOccupations: { pflegefachmann: 8, hoerakustiker: 6, ergotherapeut: 4, physiotherapeut: 4 } },
      },
      {
        id: 'customers',
        label: { de: 'Mit Kundschaft – beraten und verkaufen', en: 'With customers — advising and selling' },
        effect: { ratings: { persuasive: 2 }, boostTags: { kundenkontakt: 6 }, boostCodes: { enterprising: 4 } },
      },
      {
        id: 'colleagues',
        label: { de: 'Am liebsten nur mit Kollegen im Team', en: 'Ideally only with colleagues in a team' },
        effect: { ratings: { teamwork: 3, peopleContact: -1 }, prefer: ['teamwork'] },
      },
    ],
  },

  {
    id: 'hands-detail',
    section: 'interests',
    modes: ['focused', 'deep'],
    type: 'multiple',
    weight: 2,
    showIf: { questionId: 'people-or-things', anyOf: ['things', 'mixed'] },
    title: { de: 'Womit möchtest du arbeiten?', en: 'What would you like to work with?' },
    options: [
      {
        id: 'metal',
        label: { de: 'Metall und Maschinen', en: 'Metal and machines' },
        effect: { boostFields: { technik: 8 }, boostOccupations: { metallbauer: 4, industriemechaniker: 4, zerspanungsmechaniker: 4 } },
      },
      {
        id: 'electricity',
        label: { de: 'Strom, Elektronik und Steuerungen', en: 'Electricity, electronics and controls' },
        effect: { boostOccupations: { 'elektroniker-betriebstechnik': 8, 'elektroniker-gebaeudetechnik': 8, mechatroniker: 6, 'it-systemelektroniker': 6 } },
      },
      {
        id: 'wood',
        label: { de: 'Holz', en: 'Wood' },
        effect: { boostOccupations: { tischler: 12, zimmerer: 10 } },
      },
      {
        id: 'vehicles',
        label: { de: 'Fahrzeuge', en: 'Vehicles' },
        effect: { boostOccupations: { 'kfz-mechatroniker': 12, 'land-baumaschinenmechatroniker': 10, berufskraftfahrer: 6, lokfuehrer: 4 } },
      },
      {
        id: 'buildings',
        label: { de: 'Häuser und Bauwerke', en: 'Houses and structures' },
        effect: { boostFields: { bau: 8 }, boostOccupations: { 'anlagenmechaniker-shk': 4 } },
      },
      {
        id: 'food',
        label: { de: 'Lebensmittel', en: 'Food' },
        effect: { boostTags: { lebensmittel: 10 } },
      },
      {
        id: 'plants-animals',
        label: { de: 'Pflanzen und Tiere', en: 'Plants and animals' },
        effect: { boostTags: { natur: 8, tiere: 6 }, boostFields: { landwirtschaft: 6 } },
      },
      {
        id: 'computers-hw',
        label: { de: 'Rechner, Netze und Geräte', en: 'Computers, networks and devices' },
        effect: { boostFields: { it: 8 } },
      },
    ],
  },

  {
    id: 'remote',
    section: 'life',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 1,
    title: { de: 'Willst du von zu Hause arbeiten können?', en: 'Do you want to be able to work from home?' },
    description: {
      de: 'In handwerklichen, pflegenden und praktischen Berufen ist das nicht möglich – und das ist kein Mangel, sondern ihr Wesen.',
      en: 'In trades, care work and practical occupations this is not possible — and that is not a shortcoming but their nature.',
    },
    options: [
      {
        id: 'must',
        label: { de: 'Ja, das ist mir wichtig', en: 'Yes, that matters to me' },
        effect: { require: ['remote-possible'], boostTags: { 'homeoffice-moeglich': 6 } },
      },
      {
        id: 'nice',
        label: { de: 'Wäre schön, ist aber kein Muss', en: 'Would be nice but is not a must' },
        effect: { prefer: ['remote-possible'] },
      },
      {
        id: 'no-need',
        label: { de: 'Nein, ich gehe gern an einen Arbeitsplatz', en: 'No, I like going to a workplace' },
        effect: {},
      },
    ],
  },

  {
    id: 'region',
    section: 'life',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 1,
    title: { de: 'Wo willst du leben und arbeiten?', en: 'Where do you want to live and work?' },
    options: [
      {
        id: 'stay',
        label: { de: 'Am Wohnort bleiben – umziehen kommt nicht in Frage', en: 'Stay where I live — relocating is out of the question' },
        effect: { require: ['no-relocation'], prefer: ['many-positions', 'no-travel'], flags: ['local-market'] },
      },
      {
        id: 'region',
        label: { de: 'In der Region, ein Umzug in die nächste Stadt ginge', en: 'In the region; a move to the nearest city would work' },
        effect: { prefer: ['many-positions'] },
      },
      {
        id: 'anywhere',
        label: { de: 'Überall in Deutschland', en: 'Anywhere in Germany' },
        effect: {},
      },
      {
        id: 'abroad',
        label: { de: 'Auch im Ausland', en: 'Abroad too' },
        effect: { boostTags: { ausland: 6, englisch: 4 }, flags: ['abroad-recognition'] },
      },
    ],
  },

  {
    id: 'family-later',
    section: 'life',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 2,
    title: { de: 'Willst du später Beruf und Familie verbinden können?', en: 'Do you want to be able to combine work and family later?' },
    description: {
      de: 'Eine Frage, die mit 16 weit weg klingt und mit 28 den Berufswechsel auslöst.',
      en: 'A question that sounds distant at 16 and triggers a career change at 28.',
    },
    options: [
      {
        id: 'important',
        label: { de: 'Ja, das soll gut möglich sein', en: 'Yes, that should work well' },
        effect: { ratings: { workLifeBalance: 3 }, prefer: ['part-time-common', 'work-life-balance', 'no-night-work'] },
      },
      {
        id: 'somewhat',
        label: { de: 'Wäre gut, aber nicht um jeden Preis', en: 'Would be good, but not at any price' },
        effect: { ratings: { workLifeBalance: 1 } },
      },
      {
        id: 'career-first',
        label: { de: 'Der Beruf kommt zuerst', en: 'The career comes first' },
        effect: { ratings: { advancement: 2, salaryLevel: 1 } },
      },
      {
        id: 'family-unsure',
        label: { de: 'Darüber kann ich jetzt nichts sagen', en: 'I cannot say anything about that now' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'meaning',
    section: 'values',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 2,
    title: { de: 'Muss deine Arbeit einen erkennbaren Nutzen für andere haben?', en: 'Does your work have to have a recognisable benefit for others?' },
    options: [
      {
        id: 'essential',
        label: { de: 'Ja, sonst halte ich es nicht durch', en: 'Yes, otherwise I will not keep it up' },
        effect: { ratings: { meaningfulness: 3, social: 1 }, require: ['meaningful'] },
      },
      {
        id: 'nice-to-have',
        label: { de: 'Schön, aber kein Muss', en: 'Nice, but not a must' },
        effect: { ratings: { meaningfulness: 1 } },
      },
      {
        id: 'work-is-work',
        label: { de: 'Arbeit ist Arbeit – Sinn suche ich woanders', en: 'Work is work — I look for meaning elsewhere' },
        hint: { de: 'Eine völlig legitime Haltung, und ehrlicher als viele Stellenanzeigen.', en: 'A perfectly legitimate stance, and more honest than many job adverts.' },
        effect: {},
      },
    ],
  },

  {
    id: 'sustainability',
    section: 'values',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 1,
    title: { de: 'Willst du an Klima- und Umweltthemen arbeiten?', en: 'Do you want to work on climate and environmental topics?' },
    description: {
      de: 'Das geht in mehr Berufen als erwartet – und in den meisten davon handwerklich, nicht in einer Organisation.',
      en: 'That is possible in more occupations than expected — and in most of them through a trade rather than an organisation.',
    },
    options: [
      {
        id: 'yes-please',
        label: { de: 'Ja, das wäre mir wichtig', en: 'Yes, that would matter to me' },
        effect: { boostTags: { energiewende: 8, nachhaltigkeit: 8, natur: 3 }, boostFields: { umwelt: 6 }, flags: ['climate-jobs'] },
      },
      {
        id: 'nice-climate',
        label: { de: 'Wäre ein Plus', en: 'Would be a plus' },
        effect: { boostTags: { energiewende: 3, nachhaltigkeit: 3 } },
      },
      {
        id: 'not-relevant',
        label: { de: 'Spielt für mich keine Rolle', en: 'Plays no part for me' },
        effect: {},
        neutral: true,
      },
    ],
  },

  {
    id: 'self-employment',
    section: 'values',
    modes: ['focused', 'deep'],
    type: 'single',
    weight: 1,
    title: { de: 'Könntest du dir vorstellen, später selbstständig zu sein?', en: 'Could you imagine being self-employed later?' },
    options: [
      {
        id: 'yes-own',
        label: { de: 'Ja, ein eigener Betrieb ist ein Ziel', en: 'Yes, my own business is a goal' },
        hint: { de: 'Im Handwerk ist das nach dem Meister ein bewährter und einträglicher Weg.', en: 'In the trades this is a proven and profitable route after the master qualification.' },
        effect: { ratings: { autonomy: 2, persuasive: 1 }, require: ['self-employment-possible'], boostTags: { 'selbststaendig-moeglich': 6 } },
      },
      {
        id: 'maybe',
        label: { de: 'Vielleicht irgendwann', en: 'Maybe at some point' },
        effect: { prefer: ['self-employment-possible'] },
      },
      {
        id: 'employed',
        label: { de: 'Nein, ich möchte angestellt bleiben', en: 'No, I want to stay employed' },
        effect: { ratings: { jobSecurity: 1 }, prefer: ['collective-agreement'] },
      },
    ],
  },
];

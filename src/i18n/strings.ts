/**
 * Alle Oberflächentexte. Die Struktur ist absichtlich flach gehalten:
 * ein Schlüssel, zwei Sprachen, keine Verschachtelung, keine Platzhalter-
 * Sprache. Wo Zahlen eingesetzt werden, steht {n} bzw. {a}/{b} im Text.
 */
export const ui = {
  // --- Rahmen ---
  appName: { de: 'JobKompass', en: 'JobKompass' },
  tagline: { de: 'Welcher Beruf passt zu dir?', en: 'Which job fits you?' },
  skipToContent: { de: 'Zum Inhalt springen', en: 'Skip to content' },
  langSwitch: { de: 'Sprache', en: 'Language' },
  themeToDark: { de: 'Auf dunkles Design umschalten', en: 'Switch to the dark theme' },
  themeToLight: { de: 'Auf helles Design umschalten', en: 'Switch to the light theme' },
  navStart: { de: 'Start', en: 'Home' },
  navQuiz: { de: 'Fragebogen', en: 'Questionnaire' },
  navBrowse: { de: 'Alle Berufe', en: 'All occupations' },
  navCompare: { de: 'Vergleich', en: 'Comparison' },
  navPathways: { de: 'Ausbildungswege', en: 'Training routes' },
  navAbout: { de: 'Über das Projekt', en: 'About' },
  footerBlurb: {
    de: 'Orientierungshilfe für die Berufswahl. Quelloffen, ohne Werbung, ohne Nutzerverfolgung.',
    en: 'An orientation aid for choosing a career. Open source, no ads, no tracking.',
  },
  footerDisclaimer: {
    de: 'Verdienstangaben sind gerundete Orientierungswerte (brutto, Vollzeit, Deutschland) und ersetzen keine Beratung.',
    en: 'Pay figures are rounded orientation values (gross, full-time, Germany) and are no substitute for advice.',
  },

  // --- Startseite ---
  heroKicker: { de: 'Orientierungshilfe, keine Rangliste', en: 'An orientation aid, not a leaderboard' },
  heroTitle: { de: 'Welcher Beruf passt zu dir?', en: 'Which job fits you?' },
  heroLead: {
    de: 'Es gibt keinen besten Beruf. Es gibt nur den, der zu deinen Interessen, deinen Möglichkeiten und deinem Leben passt. Dieser Kompass fragt nach – und erklärt jede Empfehlung, statt nur eine Zahl zu zeigen. Auch dann, wenn die Antwort unbequem ist.',
    en: 'There is no best job. There is only the one that fits your interests, your options and your life. This compass asks — and explains every recommendation instead of just showing a number. Including when the answer is uncomfortable.',
  },
  heroStart: { de: 'Fragebogen starten', en: 'Start the questionnaire' },
  heroBrowse: { de: 'Erst mal stöbern', en: 'Browse first' },
  heroStatOccupations: { de: 'recherchierte Berufe', en: 'researched occupations' },
  heroStatQuestions: { de: 'Fragen in drei Tiefen', en: 'questions across three depths' },
  heroStatAttributes: { de: 'Merkmale je Beruf', en: 'attributes per occupation' },
  heroCheckedNote: { de: 'Datenstand', en: 'Data as of' },
  heroAudience: {
    de: 'Gemacht für alle, die nach der Schule nicht wissen, wohin – und für die, die einen Wunsch haben und ihn prüfen wollen.',
    en: 'Made for everyone who does not know where to go after school — and for those who have a wish and want to check it.',
  },

  featureModesTitle: { de: 'Drei Tiefen statt einer Größe für alle', en: 'Three depths instead of one size fits all' },
  featureModesText: {
    de: 'Drei kurze Fragen schätzen ein, wie tief der Fragebogen gehen sollte. Wer noch gar nichts weiß, bekommt die breiten Fragen; wer schon einen Beruf prüfen will, die feinen Unterschiede.',
    en: 'Three short questions estimate how deep the questionnaire should go. Anyone who knows nothing yet gets the broad questions; anyone checking a specific job gets the fine distinctions.',
  },
  featureExplainTitle: { de: 'Jede Empfehlung ist nachvollziehbar', en: 'Every recommendation is traceable' },
  featureExplainText: {
    de: 'Zu jedem Ergebnis siehst du, welche Antwort welchen Anteil an der Punktzahl hatte – und welche Berufe an welcher Anforderung gescheitert sind.',
    en: 'For every result you can see which answer contributed what share of the score — and which occupations failed on which requirement.',
  },
  featureHonestTitle: { de: 'Auch die unbequemen Zahlen', en: 'Including the uncomfortable numbers' },
  featureHonestText: {
    de: 'Gehalt, Abbruchquoten, Bewerberdruck, körperlicher Verschleiß, Schichtdienst: Wo ein Beruf hart wird, steht das hier – samt den Nachbarberufen, die dieselbe Neigung besser bezahlen.',
    en: 'Pay, dropout rates, applicant pressure, physical wear, shift work: where a job gets hard, it says so here — along with the neighbouring occupations that pay the same inclination better.',
  },
  featurePathwayTitle: { de: 'Der Weg zählt genauso wie das Ziel', en: 'The route counts as much as the destination' },
  featurePathwayText: {
    de: 'Ausbildung, duales Studium, Studium oder erst ein Jahr ausprobieren: Der Weg entscheidet die nächsten Jahre oft stärker als der Beruf. Deshalb bekommt er ein eigenes Urteil.',
    en: 'An apprenticeship, a dual degree, a degree or a year of trying things: the route often decides the next few years more than the job. So it gets its own verdict.',
  },
  featureInterestTitle: { de: 'Ein Neigungsprofil, das bleibt', en: 'An interest profile that lasts' },
  featureInterestText: {
    de: 'Neben der Berufsliste entsteht ein Bild deiner sechs Neigungsrichtungen. Es gilt weiter, auch wenn sich der erste Beruf als falsch erweist.',
    en: 'Alongside the list of occupations, a picture of your six interest dimensions emerges. It still holds if the first job turns out to be wrong.',
  },
  featureFreeTitle: { de: 'Ohne Anmeldung, ohne Datenabfluss', en: 'No sign-up, no data leaving your device' },
  featureFreeText: {
    de: 'Alles läuft in deinem Browser. Es gibt kein Konto, keine Cookies und keinen Server, der deine Antworten sieht – auch nicht die zu Gesundheit und Geld.',
    en: 'Everything runs in your browser. There is no account, no cookies and no server that sees your answers — including those about health and money.',
  },

  // --- Triage ---
  triageTitle: { de: 'Zuerst: Wie weit bist du schon?', en: 'First: how far along are you?' },
  triageLead: {
    de: 'Drei Fragen, damit wir dir nicht die falschen dreißig stellen. Antworte ehrlich – es gibt hier nichts zu gewinnen.',
    en: 'Three questions so we do not ask you the wrong thirty. Answer honestly — there is nothing to win here.',
  },
  triageSkip: { de: 'Überspringen und Modus selbst wählen', en: 'Skip and choose the mode myself' },
  triageResultTitle: { de: 'Unser Vorschlag', en: 'Our suggestion' },
  triageChangeHint: {
    de: 'Du kannst das jederzeit ändern – auch mitten im Fragebogen, ohne Antworten zu verlieren.',
    en: 'You can change this at any time, even mid-questionnaire, without losing answers.',
  },
  modeContinue: { de: 'Mit diesem Modus starten', en: 'Start with this mode' },

  // --- Modi ---
  modeOrientation: { de: 'Orientierung', en: 'Orientation' },
  modeOrientationDesc: {
    de: 'Für alle, die noch keine Richtung haben. Breite Fragen zu Interessen und Stärken, wenig Fachbegriffe.',
    en: 'For anyone without a direction yet. Broad questions about interests and strengths, few technical terms.',
  },
  modeFocused: { de: 'Vertiefung', en: 'Focused' },
  modeFocusedDesc: {
    de: 'Für alle, die eine Richtung ahnen. Fragen zum Arbeitsalltag, zum Weg und zu den Bedingungen.',
    en: 'For anyone who senses a direction. Questions about daily work, the route and the conditions.',
  },
  modeDeep: { de: 'Feinschliff', en: 'Fine detail' },
  modeDeepDesc: {
    de: 'Für alle, die zwei oder drei Berufe abwägen. Auch die unangenehmen Fragen: Belastung, Gesundheit, Geld.',
    en: 'For anyone weighing two or three jobs. Including the uncomfortable questions: strain, health, money.',
  },
  modeQuestionCount: { de: 'ab {n} Fragen', en: 'from {n} questions' },

  // --- Fragebogen ---
  questionOf: { de: 'Frage {a} von {b}', en: 'Question {a} of {b}' },
  quizMultiHint: { de: 'Mehrfachauswahl möglich', en: 'You can pick several' },
  quizWhyTitle: { de: 'Warum wir das fragen', en: 'Why we ask this' },
  quizBack: { de: 'Zurück', en: 'Back' },
  quizNext: { de: 'Weiter', en: 'Next' },
  quizSkip: { de: 'Überspringen', en: 'Skip' },
  quizFinish: { de: 'Ergebnis ansehen', en: 'See the result' },
  quizRestart: { de: 'Von vorn beginnen', en: 'Start over' },
  quizModeSwitch: { de: 'Tiefe des Fragebogens', en: 'Questionnaire depth' },
  quizLivePreview: { de: 'Zwischenstand', en: 'Current standing' },
  quizLivePreviewHint: {
    de: 'Verändert sich mit jeder Antwort. Am Anfang bedeutet er wenig.',
    en: 'Changes with every answer. At the start it means little.',
  },
  points: { de: 'Punkte', en: 'points' },

  // --- Ergebnis ---
  resultTitle: { de: 'Dein Ergebnis', en: 'Your result' },
  resultLead: {
    de: 'Das ist kein Urteil, sondern ein Vorschlag mit Begründung. Lies die Warnungen so genau wie die Empfehlung – dort steht, was dich später ärgern könnte.',
    en: 'This is not a verdict but a suggestion with reasons. Read the warnings as carefully as the recommendation — they say what could annoy you later.',
  },
  resultTopPick: { de: 'Passt am besten', en: 'Fits best' },
  resultAlternatives: { de: 'Auch einen Blick wert', en: 'Also worth a look' },
  resultAllRanked: { de: 'Alle Berufe nach Passung', en: 'All occupations by fit' },
  resultExcluded: { de: 'Ausgeschlossene Berufe', en: 'Excluded occupations' },
  resultExcludedLead: {
    de: 'Diese Berufe erfüllen mindestens eine deiner harten Angaben nicht. Wenn dich einer davon trotzdem interessiert, sieh nach, woran es liegt – manche Grenzen lassen sich verschieben.',
    en: 'These occupations fail at least one of your hard requirements. If one still interests you, check what it was — some limits can be moved.',
  },
  excludedBecause: { de: 'Scheitert daran, dass er', en: 'Fails because it' },
  resultStrengths: { de: 'Spricht dafür', en: 'In favour' },
  resultWeaknesses: { de: 'Spricht dagegen', en: 'Against' },
  resultOpenWishes: { de: 'Offene Wünsche', en: 'Unmet wishes' },
  resultNothingFor: { de: 'Nichts Deutliches gefunden', en: 'Nothing clear found' },
  resultNothingAgainst: { de: 'Nichts Deutliches gefunden', en: 'Nothing clear found' },
  resultBreakdown: { de: 'Woher die Punkte kommen', en: 'Where the points come from' },
  resultBonus: { de: 'Zuschläge aus deinen Angaben', en: 'Bonuses from your answers' },
  resultMatchedTag: { de: 'Passt zu deinen Angaben', en: 'Matches your answers' },
  resultMatchedCode: { de: 'Passt zu deiner Neigung', en: 'Matches your inclination' },
  resultConfidence: { de: 'Verlässlichkeit', en: 'Reliability' },
  resultConfidenceLow: {
    de: 'Noch wenig belastbar. Beantworte mehr Fragen oder wechsle in eine tiefere Stufe.',
    en: 'Not yet very robust. Answer more questions or switch to a deeper level.',
  },
  resultConfidenceMedium: {
    de: 'Brauchbar, aber nicht eindeutig. Die Reihenfolge oben kann sich noch verschieben.',
    en: 'Usable but not clear-cut. The order at the top may still shift.',
  },
  resultConfidenceHigh: {
    de: 'Belastbar. Deine Angaben zeigen ein klares Bild.',
    en: 'Robust. Your answers show a clear picture.',
  },
  resultRelaxed: { de: 'Wir mussten Anforderungen lockern', en: 'We had to relax some requirements' },
  resultRelaxedLead: {
    de: 'Mit allen deinen harten Angaben wären zu wenige Berufe übrig geblieben. Diese Anforderungen haben wir deshalb fallen lassen – sie sind in den Ergebnissen nicht mehr garantiert.',
    en: 'With all of your hard requirements too few occupations would have remained. We therefore dropped these — they are no longer guaranteed in the results.',
  },
  resultNarrow: {
    de: 'Nur {n} von {total} Berufen erfüllen alle deine Angaben. Das ist eine ehrliche Antwort, aber eine enge – vielleicht ist eine deiner Grenzen doch verhandelbar.',
    en: 'Only {n} of {total} occupations meet all your requirements. That is an honest answer but a narrow one — perhaps one of your limits is negotiable after all.',
  },
  resultTiedWarning: { de: 'Mehrere Berufe liegen praktisch gleichauf:', en: 'Several occupations are practically level:' },
  resultRefine: { de: 'Antworten ändern', en: 'Change answers' },
  resultDeepen: { de: 'Genauer werden ({mode})', en: 'Go deeper ({mode})' },
  resultShare: { de: 'Ergebnis teilen', en: 'Share result' },
  resultShareCopied: { de: 'Link kopiert', en: 'Link copied' },
  resultPrint: { de: 'Drucken oder als PDF speichern', en: 'Print or save as PDF' },
  resultFlagsTitle: { de: 'Realitätscheck', en: 'Reality check' },
  resultFlagsLead: {
    de: 'Diese Punkte entscheiden unabhängig vom Beruf darüber, ob eine Entscheidung trägt. Sie stehen hier, weil deine Antworten sie ausgelöst haben.',
    en: 'These points decide whether a choice holds up, regardless of the occupation. They appear here because your answers triggered them.',
  },
  resultNextStepsTitle: { de: 'Was du jetzt tun kannst', en: 'What you can do now' },
  verifyTitle: { de: 'Nachprüfen', en: 'Check it' },

  // --- Neigungsprofil ---
  interestTitle: { de: 'Dein Neigungsprofil', en: 'Your interest profile' },
  interestLead: {
    de: 'Sechs Richtungen, aus denen sich Berufe zusammensetzen. Dieses Bild bleibt gültig, auch wenn der Beruf oben nicht der richtige ist – es sagt, wonach du weiter suchen solltest.',
    en: 'Six dimensions that occupations are composed of. This picture stays valid even if the job at the top is not the right one — it tells you what to keep looking for.',
  },
  interestEmpty: {
    de: 'Für ein Neigungsprofil fehlen noch Antworten zu den Interessenfragen.',
    en: 'A few answers to the interest questions are still missing for a profile.',
  },

  // --- Kipp-Punkte ---
  flipTitle: { de: 'Was würde die Empfehlung kippen?', en: 'What would tip the recommendation?' },
  flipLead: {
    de: 'Wir rechnen den Fragebogen einmal je Antwortmöglichkeit neu durch und zeigen, wo oben etwas anderes stünde.',
    en: 'We recalculate the questionnaire once per answer option and show where something else would be on top.',
  },
  flipCalculating: { de: 'Wird gerechnet …', en: 'Calculating …' },
  flipNone: { de: 'Keine einzelne Antwort ändert die Empfehlung. Sie ist stabil.', en: 'No single answer changes the recommendation. It is stable.' },
  flipNoneAnswered: {
    de: 'Keine deiner gegebenen Antworten trägt die Entscheidung allein.',
    en: 'None of the answers you gave carries the decision on its own.',
  },
  flipAnswered: { de: 'Daran hängt die Entscheidung', en: 'The decision hangs on this' },
  flipOpen: { de: 'Diese Fragen hast du offen gelassen', en: 'You left these questions open' },
  flipThen: { de: 'dann {name}', en: 'then {name}' },
  flipMoreQuestions: { de: 'und {n} weitere Fragen', en: 'and {n} more questions' },
  flipTested: { de: '{n} Antwortmöglichkeiten durchgerechnet.', en: '{n} answer options calculated.' },

  // --- Gegenprobe ---
  whyNotTitle: { de: 'Warum nicht ein anderer Beruf?', en: 'Why not a different job?' },
  whyNotLead: {
    de: 'Wenn du einen Namen im Kopf hast, prüf ihn hier. Die Antwort besteht aus denselben Zahlen, aus denen die Empfehlung entstanden ist.',
    en: 'If you have a name in mind, check it here. The answer uses the same numbers the recommendation came from.',
  },
  whyNotPopular: { de: 'Häufig genannt', en: 'Commonly named' },
  whyNotOther: { de: 'Anderen Beruf wählen', en: 'Choose another occupation' },
  whyNotVersus: { de: 'im Vergleich zu {name}', en: 'compared with {name}' },
  whyNotFails: { de: 'Scheitert an deinen harten Angaben:', en: 'Fails your hard requirements:' },
  whyNotAheadButOut: {
    de: 'Läge {n} Punkte vorn, ist aber durch eine deiner harten Angaben ausgeschlossen.',
    en: 'Would be {n} points ahead but is excluded by one of your hard requirements.',
  },
  whyNotTied: { de: 'Praktisch gleichauf mit {name}. Hier entscheidet dein Gefühl, nicht die Zahl.', en: 'Practically level with {name}. Here your instinct decides, not the number.' },
  whyNotBehind: { de: 'Liegt {n} Punkte hinter {name}.', en: 'Is {n} points behind {name}.' },
  whyNotWorse: { de: 'Schwächer', en: 'Weaker' },
  whyNotBetter: { de: 'Stärker', en: 'Stronger' },
  whyNotMisses: { de: 'Erfüllt nicht, was {name} erfüllt', en: 'Does not meet what {name} meets' },
  whyNotExtra: { de: 'Erfüllt zusätzlich zu {name}', en: 'Meets in addition to {name}' },
  whyNotPayEntry: { de: 'Einstiegsgehalt', en: 'Starting salary' },
  whyNotPayMedian: { de: 'Mit Erfahrung', en: 'With experience' },

  // --- Ausbildungsweg ---
  pathwayPickTitle: { de: 'Der passende Weg dorthin', en: 'The matching route there' },
  pathwayPickLead: {
    de: 'Der Weg entscheidet die nächsten Jahre oft stärker als der Beruf. Deshalb steht er hier gesondert – mit dem, was er kostet und was er verlangt.',
    en: 'The route often decides the next few years more than the job. So it appears here separately — with what it costs and what it demands.',
  },
  pathwayPickSentence: { de: 'Zu deinen Antworten passt {name}, weil {reasons}.', en: '{name} fits your answers because {reasons}.' },
  pathwayPickSentencePlain: { de: 'Zu deinen Antworten passt am ehesten {name}.', en: '{name} fits your answers most closely.' },
  pathwayPickCaveat: { de: 'Was du dabei bedenken solltest', en: 'What to bear in mind' },
  pathwayPickAll: { de: 'Alle Wege ansehen', en: 'See all routes' },
  pathwayPickAlternatives: { de: 'Andere Wege', en: 'Other routes' },
  pathwayPickFits: { de: 'Zu {occupation} führt dieser Weg tatsächlich.', en: 'This route does lead to {occupation}.' },
  pathwayPickFitsNot: {
    de: 'Zu {occupation} führt dieser Weg nicht – dort ist {other} der übliche.',
    en: 'This route does not lead to {occupation} — there {other} is the usual one.',
  },
  pathwaysTitle: { de: 'Die Wege in einen Beruf', en: 'The routes into a career' },
  pathwaysLead: {
    de: 'Zwölf Wege, die es tatsächlich gibt – mit Dauer, Vergütung, Kosten und dem, was sie schwierig macht. Fast jeder von ihnen lässt sich später korrigieren.',
    en: 'Twelve routes that genuinely exist — with duration, pay, cost and what makes them hard. Almost every one can be corrected later.',
  },
  pathwayDuration: { de: 'Dauer', en: 'Duration' },
  pathwayPaid: { de: 'Vergütung', en: 'Pay' },
  pathwayPaidYes: { de: 'Ja, ab dem ersten Monat', en: 'Yes, from the first month' },
  pathwayPaidNo: { de: 'Nein', en: 'No' },
  pathwayCost: { de: 'Kosten', en: 'Cost' },
  pathwayMinSchooling: { de: 'Mindestens', en: 'At least' },
  pathwayFeelsLike: { de: 'Fühlt sich an wie', en: 'Feels like' },
  pathwayTheory: { de: 'Anteil Theorie', en: 'Share of theory' },
  pathwayPractice: { de: 'Anteil Praxis', en: 'Share of practice' },
  pathwayStructure: { de: 'Vorgegebener Rahmen', en: 'Prescribed framework' },
  pathwaySpeed: { de: 'Schnell im Beruf', en: 'Quickly in work' },
  pathwayFlexibility: { de: 'Später noch wechselbar', en: 'Still changeable later' },
  pathwayDropout: { de: 'Abbruchrisiko', en: 'Dropout risk' },
  pathwayStrengths: { de: 'Dafür spricht', en: 'In favour' },
  pathwayTradeoffs: { de: 'Das kostet es', en: 'What it costs' },
  pathwayUsedFor: { de: 'Führt zum Beispiel zu', en: 'Leads for example to' },

  // --- Übersicht ---
  browseTitle: { de: 'Alle Berufe', en: 'All occupations' },
  browseLead: {
    de: '{n} Berufe mit je rund 50 Merkmalen. Filtern, sortieren, vergleichen – und die Warnungen mitlesen.',
    en: '{n} occupations with around 50 attributes each. Filter, sort, compare — and read the warnings too.',
  },
  search: { de: 'Suche', en: 'Search' },
  searchPlaceholder: { de: 'Beruf, Feld oder Schlagwort …', en: 'Occupation, field or keyword …' },
  filterField: { de: 'Berufsfeld', en: 'Field' },
  filterTrainingKind: { de: 'Art des Wegs', en: 'Type of route' },
  filterSchooling: { de: 'Erreichbar mit', en: 'Reachable with' },
  filterInterest: { de: 'Neigung', en: 'Inclination' },
  filterMinPay: { de: 'Einstieg mindestens', en: 'Entry at least' },
  filterAll: { de: 'Alle', en: 'All' },
  filtersReset: { de: 'Filter zurücksetzen', en: 'Reset filters' },
  sortBy: { de: 'Sortieren nach', en: 'Sort by' },
  sortName: { de: 'Name', en: 'Name' },
  sortPay: { de: 'Einstiegsgehalt', en: 'Starting salary' },
  sortSecurity: { de: 'Arbeitsmarktlage', en: 'Job market' },
  sortEntryEase: { de: 'Leichter Einstieg', en: 'Easy entry' },
  sortTrainingYears: { de: 'Kürzeste Ausbildung', en: 'Shortest training' },
  resultsCount: { de: '{n} Treffer', en: '{n} results' },
  noResults: { de: 'Keine Berufe gefunden. Setz die Filter zurück oder suche anders.', en: 'No occupations found. Reset the filters or search differently.' },
  details: { de: 'Details', en: 'Details' },

  // --- Detailseite ---
  detailAbout: { de: 'Worum es geht', en: 'What it is about' },
  detailDayInLife: { de: 'Ein normaler Arbeitstag', en: 'An ordinary working day' },
  detailSkills: { de: 'Was du mitbringen solltest', en: 'What you should bring' },
  detailSubjects: { de: 'Schulfächer, die helfen', en: 'School subjects that help' },
  detailPrerequisites: { de: 'Voraussetzungen', en: 'Prerequisites' },
  detailAccess: { de: 'Zugang und Weg', en: 'Access and route' },
  detailPay: { de: 'Verdienst', en: 'Pay' },
  detailPayTraining: { de: 'In der Ausbildung', en: 'During training' },
  detailPayEntry: { de: 'Einstieg', en: 'At entry' },
  detailPayMedian: { de: 'Mit Erfahrung', en: 'With experience' },
  detailPayTop: { de: 'Mit Zusatzqualifikation', en: 'With extra qualifications' },
  detailPayNote: {
    de: 'Gerundete Orientierungswerte, brutto pro Monat, Vollzeit, Deutschland. Tarifbindung, Bundesland, Betriebsgröße und Branche verschieben jede dieser Zahlen um mehrere hundert Euro.',
    en: 'Rounded orientation values, gross per month, full-time, Germany. Collective agreements, federal state, company size and sector shift each of these figures by several hundred euros.',
  },
  detailConditions: { de: 'Arbeitsbedingungen', en: 'Working conditions' },
  detailMarket: { de: 'Arbeitsmarkt', en: 'Job market' },
  detailRatings: { de: 'Bewertung im Einzelnen', en: 'Ratings in detail' },
  detailBestFor: { de: 'Passt zu dir, wenn', en: 'Fits you if' },
  detailNotFor: { de: 'Passt nicht, wenn', en: 'Does not fit if' },
  detailWarnings: { de: 'Das solltest du wissen', en: 'What you should know' },
  detailFirstSteps: { de: 'So findest du heraus, ob es passt', en: 'How to find out whether it fits' },
  detailAdvancement: { de: 'Wie es danach weitergeht', en: 'Where it leads afterwards' },
  detailRelated: { de: 'Ähnliche Berufe', en: 'Similar occupations' },
  detailSources: { de: 'Quellen', en: 'Sources' },
  detailCheckedAt: { de: 'Geprüft am', en: 'Checked on' },
  detailInfoLink: { de: 'Amtliche Beschreibung', en: 'Official description' },
  detailVideoLink: { de: 'Beruf im Video ansehen', en: 'See the job on video' },
  detailInterestCodes: { de: 'Neigungsrichtung', en: 'Interest dimension' },
  detailPathways: { de: 'Wege in diesen Beruf', en: 'Routes into this occupation' },
  detailAliases: { de: 'Auch bekannt als', en: 'Also known as' },
  detailTrainingYears: { de: 'Dauer', en: 'Duration' },
  detailYears: { de: '{n} Jahre', en: '{n} years' },
  detailShortenable: { de: 'Verkürzung möglich', en: 'Can be shortened' },
  detailAdmissionLimit: { de: 'Zulassungsbeschränkung', en: 'Admission restriction' },
  detailEntryTest: { de: 'Eignungstest', en: 'Aptitude test' },
  detailLicence: { de: 'Staatliche Zulassung nötig', en: 'State licence required' },

  // --- Vergleich ---
  compareTitle: { de: 'Vergleich', en: 'Comparison' },
  compareAdd: { de: 'Vergleichen', en: 'Compare' },
  compareAdded: { de: 'Im Vergleich', en: 'In comparison' },
  compareOpen: { de: 'Vergleich öffnen', en: 'Open comparison' },
  compareRemove: { de: 'Aus dem Vergleich nehmen', en: 'Remove from comparison' },
  compareClear: { de: 'Vergleich leeren', en: 'Clear comparison' },
  compareCount: { de: '{n} ausgewählt', en: '{n} selected' },
  compareEmpty: {
    de: 'Noch nichts ausgewählt. Setz in der Übersicht oder im Ergebnis Häkchen, dann erscheinen die Berufe hier nebeneinander.',
    en: 'Nothing selected yet. Tick occupations in the overview or in your result and they will appear side by side here.',
  },
  compareOnlyDiffs: { de: 'Nur Unterschiede zeigen', en: 'Show only differences' },
  compareLimit: { de: 'Mehr als sechs lassen sich nicht sinnvoll nebeneinander lesen.', en: 'More than six cannot sensibly be read side by side.' },
  compareOccupations: { de: 'Berufe im Vergleich', en: 'Occupations compared' },
  comparePathways: { de: 'Wege im Vergleich', en: 'Routes compared' },
  compareBothHint: {
    de: 'Berufe und Ausbildungswege werden getrennt verglichen: Sie haben unterschiedliche Merkmale, und beides gleichzeitig abzuwägen ist völlig normal.',
    en: 'Occupations and training routes are compared separately: they have different attributes, and weighing both at once is perfectly normal.',
  },

  // --- Über ---
  aboutTitle: { de: 'Über das Projekt', en: 'About this project' },

  // --- Gemeinsames ---
  yes: { de: 'Ja', en: 'Yes' },
  no: { de: 'Nein', en: 'No' },
  none: { de: 'Keine', en: 'None' },
  showMore: { de: 'Mehr anzeigen', en: 'Show more' },
  showLess: { de: 'Weniger anzeigen', en: 'Show less' },
  perMonth: { de: '€/Monat', en: '€/month' },
  ratingLowWanted: { de: 'wenig ist hier erwünscht', en: 'less is wanted here' },
  gb: { de: 'GB', en: 'GB' },
} as const;

export type UiKey = keyof typeof ui;

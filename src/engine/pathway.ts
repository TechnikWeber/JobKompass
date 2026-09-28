import { pathways } from '../data/pathways';
import { SCHOOLING_ORDER, type Occupation, type Pathway, type Schooling } from '../data/types';
import type { Answers, Mode } from '../data/questions';
import { visibleQuestions } from '../data/questions';

/**
 * Empfehlung eines Ausbildungswegs.
 *
 * Bewusst getrennt von der Berufsbewertung: Der Weg entscheidet die nächsten
 * drei bis sechs Lebensjahre oft stärker als das Ziel – ob man Geld verdient
 * oder Semesterbeitrag zahlt, ob der Tag von 7 bis 16 Uhr feststeht oder aus
 * drei Vorlesungen besteht. Beides in eine Zahl zu pressen würde diesen
 * Zusammenhang verwischen.
 *
 * Die Zuordnung von Antworten zu Eigenschaften steht hier explizit statt im
 * Fragenkatalog, weil nur wenige Fragen überhaupt etwas über den Weg aussagen –
 * und weil sie so an einer Stelle nachlesbar bleibt.
 */

/** Gründe werden als Code geliefert und erst in der Oberfläche übersetzt. */
export type PathwayReason =
  | 'explicit-choice'
  | 'needs-income'
  | 'learns-by-doing'
  | 'needs-structure'
  | 'self-directed'
  | 'wants-degree'
  | 'unsure-yet'
  | 'fast-to-work'
  | 'keeps-options'
  | 'reachable-schooling';

export type PathwayConcernCode =
  | 'unpaid'
  | 'costs-money'
  | 'high-dropout'
  | 'needs-schooling'
  | 'slow-to-work'
  | 'hard-selection'
  | 'no-qualification'
  | 'not-for-occupation';

export interface PathwayResult {
  pathway: Pathway;
  /** 0–100, innerhalb dieser Liste vergleichbar. */
  score: number;
  eligible: boolean;
  reasons: PathwayReason[];
  concerns: PathwayConcernCode[];
}

type Attr = 'theoryShare' | 'practiceShare' | 'structure' | 'speedToWork' | 'flexibility';

interface PathwayProfile {
  weights: Partial<Record<Attr, number>>;
  affinity: Map<string, number>;
  reasons: Map<string, PathwayReason[]>;
  /** Eine Vergütung ist zwingend, nicht nur erwünscht. */
  requiresPay: boolean;
  /** Der höchste Abschluss, der zur Verfügung steht. */
  schooling: Schooling | null;
  /** Abbruchrisiko wurde ausdrücklich thematisiert. */
  fearsDropout: boolean;
  answered: number;
}

function addReason(profile: PathwayProfile, id: string, reason: PathwayReason) {
  const list = profile.reasons.get(id) ?? [];
  if (!list.includes(reason)) list.push(reason);
  profile.reasons.set(id, list);
}

function boost(profile: PathwayProfile, id: string, value: number, reason?: PathwayReason) {
  profile.affinity.set(id, (profile.affinity.get(id) ?? 0) + value);
  if (reason) addReason(profile, id, reason);
}

function weigh(profile: PathwayProfile, attr: Attr, value: number) {
  profile.weights[attr] = (profile.weights[attr] ?? 0) + value;
}

export function buildPathwayProfile(mode: Mode, answers: Answers): PathwayProfile {
  const profile: PathwayProfile = {
    weights: {},
    affinity: new Map(),
    reasons: new Map(),
    requiresPay: false,
    schooling: null,
    fearsDropout: false,
    answered: 0,
  };

  const visible = new Set(visibleQuestions(mode, answers).map((q) => q.id));
  const has = (question: string, option: string) =>
    visible.has(question) && (answers[question] ?? []).includes(option);
  const answeredAny = (question: string) => visible.has(question) && (answers[question] ?? []).length > 0;

  for (const q of ['path', 'schooling', 'training-money', 'training-length', 'learning-style', 'study-doubt']) {
    if (answeredAny(q)) profile.answered += 1;
  }

  // --- Ausdrücklicher Wunsch: schlägt alles andere ---
  if (has('path', 'earn-now')) {
    profile.requiresPay = true;
    weigh(profile, 'practiceShare', 3);
    weigh(profile, 'speedToWork', 3);
    boost(profile, 'dual', 40, 'explicit-choice');
    boost(profile, 'civil-service', 18, 'needs-income');
    boost(profile, 'dual-study', 10);
  }
  if (has('path', 'training')) {
    weigh(profile, 'practiceShare', 2);
    weigh(profile, 'speedToWork', 2);
    boost(profile, 'dual', 30, 'explicit-choice');
    boost(profile, 'school-based', 22, 'explicit-choice');
    boost(profile, 'civil-service', 12);
  }
  if (has('path', 'dual-study')) {
    weigh(profile, 'theoryShare', 2);
    weigh(profile, 'practiceShare', 2);
    boost(profile, 'dual-study', 45, 'explicit-choice');
  }
  if (has('path', 'study')) {
    weigh(profile, 'theoryShare', 3);
    boost(profile, 'university', 32, 'explicit-choice');
    boost(profile, 'applied-university', 30, 'explicit-choice');
    boost(profile, 'state-exam', 14);
    boost(profile, 'dual-study', 12);
  }
  if (has('path', 'try-first')) {
    weigh(profile, 'flexibility', 3);
    boost(profile, 'voluntary-year', 45, 'unsure-yet');
  }
  if (has('path', 'open')) {
    weigh(profile, 'flexibility', 2);
    boost(profile, 'voluntary-year', 18, 'unsure-yet');
    boost(profile, 'dual', 8, 'keeps-options');
  }

  // --- Geld ---
  if (has('training-money', 'no-way')) {
    profile.requiresPay = true;
    weigh(profile, 'speedToWork', 2);
    boost(profile, 'dual', 20, 'needs-income');
    boost(profile, 'civil-service', 16, 'needs-income');
    boost(profile, 'dual-study', 12, 'needs-income');
    boost(profile, 'career-changer', 8);
  } else if (has('training-money', 'short')) {
    boost(profile, 'dual', 10, 'needs-income');
    boost(profile, 'school-based', 6);
  } else if (has('training-money', 'long')) {
    weigh(profile, 'theoryShare', 1);
    boost(profile, 'university', 10);
    boost(profile, 'applied-university', 10);
  }

  // --- Dauer ---
  if (has('training-length', 'fast')) {
    weigh(profile, 'speedToWork', 3);
    boost(profile, 'dual', 14, 'fast-to-work');
    boost(profile, 'civil-service', 14, 'fast-to-work');
    boost(profile, 'school-based', 8);
  }
  if (has('training-length', 'long-ok')) {
    weigh(profile, 'theoryShare', 1);
    boost(profile, 'university', 12);
    boost(profile, 'state-exam', 10);
  }

  // --- Lernart: der stärkste einzelne Hinweis ---
  if (has('learning-style', 'by-doing')) {
    weigh(profile, 'practiceShare', 3);
    boost(profile, 'dual', 24, 'learns-by-doing');
    boost(profile, 'career-changer', 10, 'learns-by-doing');
    boost(profile, 'voluntary-year', 8);
  }
  if (has('learning-style', 'structured-learning')) {
    weigh(profile, 'structure', 3);
    boost(profile, 'school-based', 20, 'needs-structure');
    boost(profile, 'dual', 14, 'needs-structure');
    boost(profile, 'civil-service', 16, 'needs-structure');
  }
  if (has('learning-style', 'self-directed')) {
    weigh(profile, 'theoryShare', 2);
    weigh(profile, 'structure', -2);
    boost(profile, 'university', 22, 'self-directed');
    boost(profile, 'distance-learning', 16, 'self-directed');
  }

  // --- Zweifel am Studium ---
  if (has('study-doubt', 'unsure-study') || has('study-doubt', 'never-tried')) {
    profile.fearsDropout = true;
    weigh(profile, 'structure', 2);
    boost(profile, 'dual-study', 18, 'needs-structure');
    boost(profile, 'applied-university', 10, 'needs-structure');
    boost(profile, 'dual', 8);
    boost(profile, 'university', -14);
  }
  if (has('study-doubt', 'confident')) {
    boost(profile, 'university', 10, 'self-directed');
  }

  // --- Abschluss ---
  for (const level of ['none', 'hauptschule', 'realschule', 'fachhochschulreife', 'abitur'] as const) {
    if (has('schooling', level)) profile.schooling = level;
  }

  // --- Ausland ---
  if (has('region', 'abroad')) {
    boost(profile, 'apprenticeship-abroad', 26);
  }

  // --- Aufstieg ---
  if (has('advancement-plan', 'definitely')) {
    boost(profile, 'further-training', 20);
    boost(profile, 'dual', 6, 'keeps-options');
  }

  return profile;
}

function attributeScore(p: Pathway, weights: PathwayProfile['weights']): number {
  const entries = Object.entries(weights) as [Attr, number][];
  const total = entries.reduce((sum, [, w]) => sum + Math.abs(w), 0);
  if (total === 0) return 55;
  let achieved = 0;
  for (const [attr, weight] of entries) {
    const value = weight > 0 ? p[attr] : 10 - p[attr];
    achieved += Math.abs(weight) * (value / 10);
  }
  return (achieved / total) * 100;
}

/** Bewertet alle Ausbildungswege gegen die Antworten. */
export function scorePathways(mode: Mode, answers: Answers): { results: PathwayResult[]; answered: number } {
  const profile = buildPathwayProfile(mode, answers);
  const schoolingIndex = profile.schooling ? SCHOOLING_ORDER.indexOf(profile.schooling) : SCHOOLING_ORDER.length - 1;

  const results = pathways.map((p): PathwayResult => {
    const base = attributeScore(p, profile.weights);
    const affinity = profile.affinity.get(p.id) ?? 0;
    // Sättigend, damit ein einzelner Treffer nicht alles überfährt.
    const affinityRatio = affinity > 0 ? 1 - Math.exp(-affinity / 30) : Math.max(-1, affinity / 20);
    const raw = base * 0.5 + affinityRatio * 50;

    const schoolingOk = SCHOOLING_ORDER.indexOf(p.minSchooling) <= schoolingIndex;
    const payOk = !profile.requiresPay || p.paid;
    const eligible = schoolingOk && payOk;

    // Begründungen, die sich erst am einzelnen Weg entscheiden.
    const derived: PathwayReason[] = [];
    if (profile.schooling && schoolingOk && SCHOOLING_ORDER.indexOf(p.minSchooling) >= schoolingIndex - 1) {
      derived.push('reachable-schooling');
    }
    if (profile.requiresPay && p.paid) derived.push('needs-income');

    const concerns: PathwayConcernCode[] = [];
    if (!p.paid) concerns.push('unpaid');
    if (!schoolingOk) concerns.push('needs-schooling');
    if (p.dropoutRisk >= 8) concerns.push('high-dropout');
    if (p.speedToWork <= 3) concerns.push('slow-to-work');
    if (p.id === 'dual-study') concerns.push('hard-selection');
    if (p.id === 'voluntary-year' || p.id === 'career-changer') concerns.push('no-qualification');
    if (p.cost.de.includes('€') && !p.paid) concerns.push('costs-money');

    return {
      pathway: p,
      score: Math.round(Math.max(0, Math.min(100, raw))),
      eligible,
      reasons: [...(profile.reasons.get(p.id) ?? []), ...derived].slice(0, 3),
      concerns: [...new Set(concerns)],
    };
  });

  results.sort((a, b) => {
    if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
    return b.score - a.score;
  });

  return { results, answered: profile.answered };
}

/**
 * Führt der empfohlene Weg überhaupt zu diesem Beruf?
 *
 * Ohne diese Prüfung stünde im Ergebnis „duale Ausbildung" neben einem Beruf,
 * den es nur als Studium gibt – die häufigste Art, wie ein solches Werkzeug
 * unglaubwürdig wird.
 */
export function pathwayFitsOccupation(pathwayId: string, occupation: Occupation): boolean {
  return occupation.pathways.includes(pathwayId);
}

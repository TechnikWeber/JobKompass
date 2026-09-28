import type { Field, Occupation, RatingKey, RiasecCode } from '../data/types';
import { occupations as allOccupations } from '../data/occupations';
import { type Answers, type Mode, visibleQuestions } from '../data/questions';
import { requirements } from './requirements';

/** Woher eine harte Anforderung stammt – für die Erklärung im Ergebnis. */
export interface RequirementSource {
  requirementId: string;
  questionId: string;
  optionId: string;
}

export interface Profile {
  /** Gewichte je Bewertungsdimension. Positiv = erwünscht, negativ = störend. */
  weights: Partial<Record<RatingKey, number>>;
  /** Harte Anforderungen mit Herkunft. */
  required: RequirementSource[];
  /** Weiche Anforderungen: Erfüllung gibt Punkte. */
  preferred: Map<string, number>;
  /** Unerwünschte Eigenschaften: Erfüllung kostet Punkte. */
  avoided: Map<string, number>;
  occupationBoost: Map<string, number>;
  tagBoost: Map<string, number>;
  fieldBoost: Map<Field, number>;
  /** Neigungsprofil nach Holland: der Kern der Interessenmessung. */
  codeBoost: Map<RiasecCode, number>;
  /** Ausgelöste Realitätschecks. */
  flags: Set<string>;
  /** Wie viele Fragen wurden mit „weiß ich nicht" oder gar nicht beantwortet? */
  unansweredCount: number;
  answeredCount: number;
}

export interface RatingContribution {
  key: RatingKey;
  weight: number;
  value: number;
  /** Anteil an der Gesamtpunktzahl in Prozentpunkten. */
  points: number;
}

export interface OccupationResult {
  occupation: Occupation;
  /** 0–100. Auch für ausgeschlossene Berufe berechnet. */
  score: number;
  eligible: boolean;
  /** Nicht erfüllte harte Anforderungen. */
  failed: RequirementSource[];
  /** Erfüllte weiche Wünsche. */
  metPreferences: string[];
  missedPreferences: string[];
  /** Ausschlaggebende Stärken (Dimensionen mit hohem Gewicht und hohem Wert). */
  strengths: RatingKey[];
  /** Wunde Punkte (hohes Gewicht, niedriger Wert). */
  weaknesses: RatingKey[];
  matchedTags: string[];
  /** Getroffene Neigungsrichtungen – die verständlichste Begründung. */
  matchedCodes: RiasecCode[];
  breakdown: RatingContribution[];
  /** Punkte aus direkten Zuschlägen (Beruf, Schlagwort, Feld, Neigung). */
  bonusPoints: number;
}

export interface ScoreOutcome {
  results: OccupationResult[];
  /** Anforderungen, die gelockert werden mussten, weil sonst zu wenig übrig bliebe. */
  relaxed: string[];
  profile: Profile;
  /** 0–1: wie belastbar ist die Empfehlung? */
  confidence: number;
}

/**
 * Dimensionen, bei denen ein niedriger Wert wirklich der gewünschte sein kann.
 *
 * Bei allen übrigen ist mehr immer besser. Ein negatives Gewicht dort heißt
 * „das ist mir weniger wichtig", nicht „ich hätte gern wenig davon": Wer keinen
 * Wert auf Aufstieg legt, wünscht sich trotzdem keinen Beruf ohne jede
 * Perspektive. Solche Gewichte werden deshalb unten bei null abgefangen, statt
 * die Dimension umzudrehen.
 *
 * Die hier aufgeführten sind echte Vorlieben in beide Richtungen. Wer Mathematik
 * meidet, will tatsächlich einen Beruf mit wenig Mathematik; wer keine fremden
 * Menschen um sich haben will, sucht wirklich den Beruf mit wenig Kundenkontakt;
 * und wer feste Abläufe braucht, will bewusst wenig Abwechslung. Das sind
 * Eigenschaften, keine Qualitäten – deshalb dürfen sie sich umdrehen.
 */
export const INVERTIBLE_RATINGS: ReadonlySet<RatingKey> = new Set<RatingKey>([
  'mathDemand',
  'languageDemand',
  'scienceDemand',
  'techDemand',
  'physicalDemand',
  'precisionDemand',
  'peopleContact',
  'teamwork',
  'variety',
  'outdoors',
  'structure',
  'autonomy',
]);

/** Baut aus den Antworten das Nutzerprofil. */
export function buildProfile(mode: Mode, answers: Answers): Profile {
  const profile: Profile = {
    weights: {},
    required: [],
    preferred: new Map(),
    avoided: new Map(),
    occupationBoost: new Map(),
    tagBoost: new Map(),
    fieldBoost: new Map(),
    codeBoost: new Map(),
    flags: new Set(),
    unansweredCount: 0,
    answeredCount: 0,
  };

  const visible = visibleQuestions(mode, answers);
  // Erst am Ende anwenden: Die aufhebende Antwort kann in einer späteren Frage
  // stehen als die, die den Hinweis gesetzt hat.
  const suppressed = new Set<string>();

  for (const question of visible) {
    const chosen = answers[question.id] ?? [];
    if (chosen.length === 0) {
      profile.unansweredCount += 1;
      continue;
    }

    let allNeutral = true;
    for (const optionId of chosen) {
      const option = question.options.find((o) => o.id === optionId);
      if (!option) continue;
      if (!option.neutral) allNeutral = false;

      const { effect } = option;
      const qw = question.weight;

      if (effect.ratings) {
        for (const [key, value] of Object.entries(effect.ratings) as [RatingKey, number][]) {
          profile.weights[key] = (profile.weights[key] ?? 0) + value * qw;
        }
      }
      for (const id of effect.require ?? []) {
        profile.required.push({ requirementId: id, questionId: question.id, optionId });
      }
      for (const id of effect.prefer ?? []) {
        profile.preferred.set(id, (profile.preferred.get(id) ?? 0) + qw);
      }
      for (const id of effect.avoid ?? []) {
        profile.avoided.set(id, (profile.avoided.get(id) ?? 0) + qw);
      }
      for (const [id, value] of Object.entries(effect.boostOccupations ?? {})) {
        profile.occupationBoost.set(id, (profile.occupationBoost.get(id) ?? 0) + value);
      }
      for (const [tag, value] of Object.entries(effect.boostTags ?? {})) {
        profile.tagBoost.set(tag, (profile.tagBoost.get(tag) ?? 0) + value);
      }
      for (const [field, value] of Object.entries(effect.boostFields ?? {}) as [Field, number][]) {
        profile.fieldBoost.set(field, (profile.fieldBoost.get(field) ?? 0) + value);
      }
      for (const [code, value] of Object.entries(effect.boostCodes ?? {}) as [RiasecCode, number][]) {
        profile.codeBoost.set(code, (profile.codeBoost.get(code) ?? 0) + value);
      }
      for (const flag of effect.flags ?? []) {
        profile.flags.add(flag);
      }
      for (const flag of effect.suppressFlags ?? []) {
        suppressed.add(flag);
      }
    }

    if (allNeutral) profile.unansweredCount += 1;
    else profile.answeredCount += 1;
  }

  for (const flag of suppressed) profile.flags.delete(flag);

  // Erst nach dem Aufsummieren abfangen: Ein „workLifeBalance: -1" darf die
  // Betonung aus einer anderen Antwort mindern (3 - 1 = 2), aber nie unter null
  // fallen und damit aus „weniger wichtig" ein „je schlechter, desto besser"
  // machen.
  for (const key of Object.keys(profile.weights) as RatingKey[]) {
    if ((profile.weights[key] ?? 0) < 0 && !INVERTIBLE_RATINGS.has(key)) {
      delete profile.weights[key];
    }
  }

  return profile;
}

/**
 * Grundpunktzahl aus den Bewertungsdimensionen.
 *
 * Positive Gewichte bewerten hohe Werte gut, negative Gewichte bewerten
 * niedrige Werte gut. Normiert auf 0–100, damit die Zahl unabhängig von der
 * Anzahl beantworteter Fragen vergleichbar bleibt.
 */
function ratingScore(
  occupation: Occupation,
  weights: Profile['weights'],
  explain: boolean,
): { score: number; breakdown: RatingContribution[] } {
  const entries = Object.entries(weights) as [RatingKey, number][];
  const totalWeight = entries.reduce((sum, [, w]) => sum + Math.abs(w), 0);
  // Ohne gewichtete Dimension gibt es keine Aussage. Der Rückgabewert ist
  // deshalb genau der, der nach der Spreizung unten in der Mitte landet: Ein
  // Beruf ohne Information über die Person bekommt 50 und nicht 9 – sonst
  // stünde am Anfang des Fragebogens hinter jedem Beruf eine Zahl, die wie ein
  // Urteil aussieht und keines ist.
  if (totalWeight === 0) return { score: NEUTRAL_BASE, breakdown: [] };

  let achieved = 0;
  const breakdown: RatingContribution[] = [];

  for (const [key, weight] of entries) {
    if (weight === 0) continue;
    const value = occupation.ratings[key];
    const normalised = weight > 0 ? value / 10 : (10 - value) / 10;
    const gained = Math.abs(weight) * normalised;
    achieved += gained;
    if (explain) breakdown.push({ key, weight, value, points: (gained / totalWeight) * 100 });
  }

  if (explain) breakdown.sort((a, b) => Math.abs(b.weight) - Math.abs(a.weight));
  return { score: (achieved / totalWeight) * 100, breakdown };
}

/*
 * Skalierung der Endpunktzahl.
 *
 * Der gewichtete Mittelwert über die Bewertungsdimensionen liegt in der Praxis
 * zwischen 55 (passt kaum) und 100 (passt in jeder gewichteten Dimension
 * perfekt). Ohne Spreizung landen alle brauchbaren Treffer zwischen 88 und 97,
 * und die Zahl sagt nichts mehr aus. Deshalb wird der genutzte Bereich auf 0–100
 * gedehnt.
 *
 * Die Zuschläge werden anschließend nicht aufaddiert, sondern eingemischt. Das
 * ist der Unterschied, der die Rangliste überhaupt lesbar macht: Addiert man
 * zwanzig Punkte auf einen Wert, der schon bei 89 liegt, landen alle Treffer
 * jenseits von 100 und werden vom Deckel auf drei Punkte Abstand
 * zusammengeschoben – und zwar genau dort, wo die Reihenfolge interessiert. Ein
 * gewichteter Mittelwert aus Passung und Zuschlag kann 100 dagegen gar nicht
 * überschreiten, und der Deckel muss nur noch die letzten Prozent abfangen.
 *
 * `extra` läuft von -1 bis +1 und wird dafür auf 0 bis 100 abgebildet. Ohne
 * jeden Zuschlag ergibt das 50 – also denselben neutralen Wert wie eine fehlende
 * Passung. Ein Beruf ohne Information bleibt damit bei 50 stehen, statt durch
 * die Rechnung nach unten gezogen zu werden.
 */
const EXPAND_FLOOR = 55;
const NEUTRAL_BASE = EXPAND_FLOOR + (100 - EXPAND_FLOOR) / 2;
const BONUS_SHARE = 0.28;
const SOFT_CAP_START = 82;
const SOFT_CAP_RANGE = 16;
const SOFT_CAP_TAU = 26;

function expand(base: number): number {
  return Math.max(0, ((base - EXPAND_FLOOR) / (100 - EXPAND_FLOOR)) * 100);
}

function softCap(value: number): number {
  if (value <= SOFT_CAP_START) return value;
  return SOFT_CAP_START + SOFT_CAP_RANGE * (1 - Math.exp(-(value - SOFT_CAP_START) / SOFT_CAP_TAU));
}

/** Passung und Zuschläge zu einer Punktzahl verrechnen. */
function combine(base: number, extra: number): number {
  const fit = expand(base);
  const bonus = ((Math.max(-1, Math.min(1, extra)) + 1) / 2) * 100;
  return softCap(fit * (1 - BONUS_SHARE) + bonus * BONUS_SHARE);
}

/**
 * Platzhalter für „scheitert an mindestens einer Anforderung", wenn niemand
 * wissen will, an welcher. Eine gemeinsame leere Liste zu teilen wäre falsch:
 * `eligible` liest die Länge, und die muss von null verschieden sein.
 */
const NOT_ELIGIBLE: RequirementSource[] = [{ requirementId: '', questionId: '', optionId: '' }];

function requirementHolds(id: string, occupation: Occupation): boolean {
  const requirement = requirements.get(id);
  if (!requirement) return true;
  return requirement.test(occupation);
}

/**
 * Bewertet einen einzelnen Beruf gegen das Profil.
 *
 * `explain` schaltet die Erklärstücke ab – Punkteherkunft, erfüllte und
 * verfehlte Wünsche, getroffene Schlagworte, Stärken und Schwächen. Die
 * Rechnung selbst bleibt Zeile für Zeile dieselbe, es entstehen nur keine
 * Listen, die niemand liest. Die Kipp-Analyse rechnet den Fragebogen
 * dutzendfach durch und braucht davon nichts außer dem Namen ganz oben.
 */
function evaluate(
  occupation: Occupation,
  profile: Profile,
  activeRequirements: RequirementSource[],
  explain: boolean,
): OccupationResult {
  const { score: base, breakdown } = ratingScore(occupation, profile.weights, explain);

  const failed = explain
    ? activeRequirements.filter((r) => !requirementHolds(r.requirementId, occupation))
    : activeRequirements.some((r) => !requirementHolds(r.requirementId, occupation))
      ? NOT_ELIGIBLE
      : [];

  const metPreferences: string[] = [];
  const missedPreferences: string[] = [];
  let prefWeight = 0;
  let prefAchieved = 0;
  for (const [id, weight] of profile.preferred) {
    prefWeight += weight;
    if (requirementHolds(id, occupation)) {
      if (explain) metPreferences.push(id);
      prefAchieved += weight;
    } else {
      if (explain) missedPreferences.push(id);
      prefAchieved -= weight;
    }
  }
  for (const [id, weight] of profile.avoided) {
    prefWeight += weight;
    if (requirementHolds(id, occupation)) prefAchieved -= weight;
    else prefAchieved += weight;
  }
  // -1 (alles verfehlt) bis +1 (alles erfüllt); ohne Wünsche neutral.
  const prefRatio = prefWeight > 0 ? Math.max(-1, Math.min(1, prefAchieved / prefWeight)) : 0;

  let boost = profile.occupationBoost.get(occupation.id) ?? 0;

  const matchedTags: string[] = [];
  for (const [tag, value] of profile.tagBoost) {
    if (occupation.tags.includes(tag)) {
      boost += value;
      if (explain && value > 0) matchedTags.push(tag);
    }
  }

  boost += profile.fieldBoost.get(occupation.field) ?? 0;

  /*
   * Neigungspassung nach Holland.
   *
   * Der erste genannte Code eines Berufs prägt ihn stärker als der dritte,
   * deshalb fällt das Gewicht über die Position. Ohne diese Abstufung wäre ein
   * Beruf, bei dem „sozial" an dritter Stelle steht, genauso ein Treffer für
   * einen sozial veranlagten Menschen wie einer, der ganz davon lebt.
   */
  const matchedCodes: RiasecCode[] = [];
  occupation.interestCodes.forEach((code, index) => {
    const value = profile.codeBoost.get(code);
    if (value === undefined) return;
    // Über den dritten Code hinaus zählt die Nennung nicht mehr.
    const weightByPosition = [1, 0.7, 0.45][index];
    if (weightByPosition === undefined) return;
    boost += value * weightByPosition;
    if (explain && value > 0) matchedCodes.push(code);
  });

  // Sättigend: die ersten Treffer zählen viel, weitere immer weniger.
  const boostRatio = boost >= 0 ? 1 - Math.exp(-boost / 26) : Math.max(-1, boost / 18);

  // Zuschläge wirken additiv, damit eine sehr eindeutige Antwort einen sonst
  // allgemein starken Beruf auch überholen kann. Nach oben wird die Summe weich
  // gedeckelt: 100 bleibt der theoretischen Bestleistung vorbehalten, und ein
  // Feld aus lauter 95ern entsteht gar nicht erst.
  const extra = 0.4 * prefRatio + 0.6 * boostRatio;
  const score = combine(base, extra);

  const significant = breakdown.filter((b) => Math.abs(b.weight) >= 3);
  const strengths = significant.filter((b) => (b.weight > 0 ? b.value >= 8 : b.value <= 3)).slice(0, 4).map((b) => b.key);
  const weaknesses = significant.filter((b) => (b.weight > 0 ? b.value <= 4 : b.value >= 8)).slice(0, 3).map((b) => b.key);

  return {
    occupation,
    score: Math.round(Math.max(0, Math.min(100, score))),
    eligible: failed.length === 0,
    failed,
    metPreferences,
    missedPreferences,
    strengths,
    weaknesses,
    matchedTags,
    matchedCodes,
    breakdown,
    // Was die Zuschläge gegenüber „keine Zuschläge" ausgemacht haben. Ohne den
    // Vergleich gegen den neutralen Zuschlag stünde hier bei jedem Beruf eine
    // Zahl, die nur den Einmischungsanteil wiedergibt.
    bonusPoints: Math.round(score - combine(base, 0)),
  };
}

/**
 * Bewertet alle Berufe.
 *
 * Wenn die harten Anforderungen zusammen weniger als `minimumResults`
 * Kandidaten übrig lassen, wird schrittweise diejenige Anforderung gelockert,
 * die die meisten Berufe ausschließt. Das Ergebnis benennt, welche
 * Anforderungen dafür fallen mussten – geraten wird nichts.
 */
export function scoreAll(
  mode: Mode,
  answers: Answers,
  options: { pool?: Occupation[]; minimumResults?: number; explain?: boolean } = {},
): ScoreOutcome {
  const explain = options.explain ?? true;
  const pool = options.pool ?? allOccupations;
  /*
   * Hier wird früher gelockert als bei einem Werkzeug für Erwachsene.
   *
   * Ein Fragebogen zur Berufsorientierung, der nach fünfzehn Fragen „drei
   * Treffer" ausgibt, wirkt wie ein Urteil über die Person. Fünf Ergebnisse
   * sind das Minimum, mit dem sich noch vergleichen lässt – und wenn dafür eine
   * Anforderung fallen muss, steht das sichtbar dabei.
   */
  const minimumResults = options.minimumResults ?? 5;
  const profile = buildProfile(mode, answers);

  let active = [...profile.required];
  const relaxed: string[] = [];

  const countEligible = (reqs: RequirementSource[]) =>
    pool.filter((o) => reqs.every((r) => requirementHolds(r.requirementId, o))).length;

  while (active.length > 0 && countEligible(active) < minimumResults) {
    // Welche Anforderung kostet die meisten Kandidaten?
    const ids = [...new Set(active.map((r) => r.requirementId))];
    let worst = ids[0];
    let worstRemaining = -1;
    for (const id of ids) {
      const without = active.filter((r) => r.requirementId !== id);
      const remaining = countEligible(without);
      if (remaining > worstRemaining) {
        worstRemaining = remaining;
        worst = id;
      }
    }
    active = active.filter((r) => r.requirementId !== worst);
    relaxed.push(worst);
  }

  const results = pool
    .map((o) => evaluate(o, profile, active, explain))
    .sort((a, b) => {
      if (a.eligible !== b.eligible) return a.eligible ? -1 : 1;
      return b.score - a.score;
    });

  const eligible = results.filter((r) => r.eligible);
  const top = eligible[0]?.score ?? 0;
  const second = eligible[1]?.score ?? 0;
  const gap = Math.min(1, (top - second) / 10);
  // Wurzel, damit ein tiefer Modus mit vielen Fragen nicht automatisch
  // schlechter dasteht als ein kurzer Fragebogen mit denselben Aussagen.
  const rawCoverage = profile.answeredCount / Math.max(1, profile.answeredCount + profile.unansweredCount);
  const coverage = Math.sqrt(rawCoverage);
  const confidence = Math.max(0, Math.min(1, 0.3 * gap + 0.7 * coverage));

  return { results, relaxed, profile, confidence };
}

/**
 * Das Neigungsprofil als eigenes Ergebnis.
 *
 * Die Punktzahl eines Berufs beantwortet „was passt?". Diese Auswertung
 * beantwortet „wer bist du?" – und die zweite Antwort bleibt gültig, wenn der
 * erste Beruf sich als falsch erweist. Für Jugendliche ist das oft die
 * brauchbarere Hälfte des Ergebnisses.
 */
export interface InterestProfile {
  code: RiasecCode;
  /** 0–100, relativ zur stärksten eigenen Neigung. */
  share: number;
}

export function interestProfile(profile: Profile): InterestProfile[] {
  const entries = [...profile.codeBoost.entries()].filter(([, v]) => v > 0);
  if (entries.length === 0) return [];
  const max = Math.max(...entries.map(([, v]) => v));
  return entries
    .map(([code, value]) => ({ code, share: Math.round((value / max) * 100) }))
    .sort((a, b) => b.share - a.share);
}

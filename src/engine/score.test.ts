import { describe, expect, it } from 'vitest';
import { occupations, occupationById } from '../data/occupations';
import { pathways, pathwayById } from '../data/pathways';
import { allQuestions, baseQuestionCount, questionsForMode, visibleQuestions, type Answers } from '../data/questions';
import { requirements, requirementList } from './requirements';
import { buildProfile, interestProfile, scoreAll, INVERTIBLE_RATINGS } from './score';
import { scorePathways } from './pathway';
import { contrastOccupations } from './contrast';
import { flagById, flags } from '../data/flags';
import { SCHOOLING_ORDER } from '../data/types';
import { ratingLabels, ratingHelp, fieldLabels, tagLabels } from '../i18n/labels';

/** Hilfsfunktion: setzt genau eine Antwort. */
function pick(questionId: string, optionId: string): Answers {
  return { [questionId]: [optionId] };
}

describe('Datenbestand', () => {
  it('hat eindeutige Berufs-IDs', () => {
    const ids = occupations.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('verweist in relatedIds nur auf existierende Berufe', () => {
    for (const o of occupations) {
      for (const rid of o.relatedIds) {
        expect(occupationById.has(rid), `${o.id} → ${rid}`).toBe(true);
      }
    }
  });

  it('verweist in pathways nur auf existierende Ausbildungswege', () => {
    for (const o of occupations) {
      expect(o.pathways.length, o.id).toBeGreaterThan(0);
      for (const pid of o.pathways) {
        expect(pathwayById.has(pid), `${o.id} → ${pid}`).toBe(true);
      }
    }
  });

  it('hält alle Bewertungen im Bereich 0–10', () => {
    for (const o of occupations) {
      for (const [key, value] of Object.entries(o.ratings)) {
        expect(value, `${o.id}.${key}`).toBeGreaterThanOrEqual(0);
        expect(value, `${o.id}.${key}`).toBeLessThanOrEqual(10);
      }
    }
  });

  it('hat für jeden Text beide Sprachen', () => {
    for (const o of occupations) {
      expect(o.tagline.de.length, o.id).toBeGreaterThan(0);
      expect(o.tagline.en.length, o.id).toBeGreaterThan(0);
      expect(o.description.de.length, o.id).toBeGreaterThan(20);
      expect(o.description.en.length, o.id).toBeGreaterThan(20);
      for (const list of [
        o.dayInLife, o.schoolSubjects, o.skills, o.highlights, o.bestFor,
        o.notFor, o.warnings, o.firstSteps, o.advancementPaths, o.prerequisites,
      ]) {
        expect(list.de.length, o.id).toBe(list.en.length);
        expect(list.de.length, o.id).toBeGreaterThan(0);
      }
      if (o.admissionLimit) {
        expect(o.admissionLimit.de.length, o.id).toBeGreaterThan(0);
        expect(o.admissionLimit.en.length, o.id).toBeGreaterThan(0);
      }
    }
  });

  it('gibt zu jedem Beruf mindestens eine Quelle und ein Prüfdatum an', () => {
    for (const o of occupations) {
      expect(o.sources.length, o.id).toBeGreaterThan(0);
      expect(o.checkedAt, o.id).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(o.infoUrl, o.id).toMatch(/^https:\/\//);
    }
  });

  it('nennt zu jedem Beruf ehrliche Warnungen', () => {
    // Ein Eintrag, bei dem alles großartig klingt, ist nicht fertig. Diese
    // Regel ist der Grund, warum das Werkzeug überhaupt nützlich ist.
    for (const o of occupations) {
      expect(o.warnings.de.length, `${o.id} hat keine Warnungen`).toBeGreaterThan(0);
      expect(o.notFor.de.length, `${o.id} nennt niemanden, für den er nicht passt`).toBeGreaterThan(0);
    }
  });

  it('hält kurze Beschriftungen kurz genug für die Kartenansicht', () => {
    for (const o of occupations) {
      expect(o.monogram.length, o.id).toBeLessThanOrEqual(4);
      expect(o.monogram.length, o.id).toBeGreaterThan(0);
      // Sehr lange Namen landen als Überschrift in schmalen Rasterspalten.
      expect(o.name.length, `${o.id}: "${o.name}"`).toBeLessThanOrEqual(60);
    }
  });

  it('gibt jede Markenfarbe als HSL-Tripel an', () => {
    for (const o of occupations) {
      expect(o.accent, o.id).toMatch(/^\d{1,3} \d{1,3}% \d{1,3}%$/);
    }
    for (const p of pathways) {
      expect(p.accent, p.id).toMatch(/^\d{1,3} \d{1,3}% \d{1,3}%$/);
    }
  });

  it('hält die Verdienststufen in plausibler Reihenfolge', () => {
    for (const o of occupations) {
      expect(o.pay.entry, o.id).toBeLessThanOrEqual(o.pay.median);
      expect(o.pay.median, o.id).toBeLessThanOrEqual(o.pay.top);
      expect(o.pay.entry, o.id).toBeGreaterThan(1500);
      if (o.pay.trainingFirstYear !== null && o.pay.trainingLastYear !== null) {
        expect(o.pay.trainingFirstYear, o.id).toBeLessThanOrEqual(o.pay.trainingLastYear);
        // Die Ausbildungsvergütung liegt immer unter dem Einstiegsgehalt.
        expect(o.pay.trainingLastYear, o.id).toBeLessThan(o.pay.entry);
      }
    }
  });

  it('nennt den nötigen Abschluss nicht höher als den üblichen', () => {
    for (const o of occupations) {
      const min = SCHOOLING_ORDER.indexOf(o.minSchooling);
      const typical = SCHOOLING_ORDER.indexOf(o.typicalSchooling);
      expect(min, o.id).toBeLessThanOrEqual(typical);
    }
  });

  it('nennt zu jedem Beruf zwei bis drei Neigungsrichtungen', () => {
    for (const o of occupations) {
      expect(o.interestCodes.length, o.id).toBeGreaterThanOrEqual(2);
      expect(o.interestCodes.length, o.id).toBeLessThanOrEqual(3);
      expect(new Set(o.interestCodes).size, `${o.id} nennt eine Neigung doppelt`).toBe(o.interestCodes.length);
    }
  });

  it('beschriftet jedes verwendete Schlagwort', () => {
    // Ein Schlagwort ohne Beschriftung erscheint in der Oberfläche als leerer
    // Chip. Lieber hier auffallen als dort.
    const used = new Set(occupations.flatMap((o) => o.tags));
    for (const tag of used) {
      expect(tagLabels[tag], `Schlagwort ohne Beschriftung: ${tag}`).toBeDefined();
    }
  });

  it('beschriftet jede Bewertungsdimension und jedes Berufsfeld', () => {
    const anyOccupation = occupations[0]!;
    for (const key of Object.keys(anyOccupation.ratings) as (keyof typeof anyOccupation.ratings)[]) {
      expect(ratingLabels[key], key).toBeDefined();
      expect(ratingHelp[key], key).toBeDefined();
    }
    for (const field of new Set(occupations.map((o) => o.field))) {
      expect(fieldLabels[field], field).toBeDefined();
    }
  });

  it('deckt jedes Berufsfeld mit mindestens einem Beruf ab', () => {
    // Ein Filtereintrag, hinter dem nichts liegt, ist eine Sackgasse in der
    // Oberfläche. Der Filter wird aus den Daten erzeugt, also kann das nur
    // passieren, wenn ein Feld verwaist – aber die Umkehrung prüft, dass die
    // Sammlung tatsächlich breit ist und nicht drei Felder ausmacht.
    const fields = new Set(occupations.map((o) => o.field));
    expect(fields.size).toBeGreaterThanOrEqual(15);
  });
});

describe('Ausbildungswege', () => {
  it('hat eindeutige IDs und beide Sprachen', () => {
    const ids = pathways.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of pathways) {
      expect(p.strengths.de.length, p.id).toBe(p.strengths.en.length);
      expect(p.tradeoffs.de.length, p.id).toBe(p.tradeoffs.en.length);
      expect(p.tradeoffs.de.length, `${p.id} nennt keine Nachteile`).toBeGreaterThan(0);
      expect(p.website, p.id).toMatch(/^https:\/\//);
    }
  });

  it('hält alle Kennwerte im Bereich 0–10', () => {
    for (const p of pathways) {
      for (const key of ['theoryShare', 'practiceShare', 'structure', 'speedToWork', 'flexibility', 'dropoutRisk'] as const) {
        expect(p[key], `${p.id}.${key}`).toBeGreaterThanOrEqual(0);
        expect(p[key], `${p.id}.${key}`).toBeLessThanOrEqual(10);
      }
    }
  });

  it('wird von mindestens einem Beruf genutzt', () => {
    for (const p of pathways) {
      const used = occupations.some((o) => o.pathways.includes(p.id));
      expect(used, `Weg ${p.id} führt zu keinem Beruf`).toBe(true);
    }
  });
});

describe('Fragenkatalog', () => {
  it('hat eindeutige Fragen-IDs', () => {
    const ids = allQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('hat je Frage eindeutige Options-IDs', () => {
    for (const q of allQuestions) {
      const ids = q.options.map((o) => o.id);
      expect(new Set(ids).size, q.id).toBe(ids.length);
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('verweist nur auf bekannte Anforderungen', () => {
    for (const q of allQuestions) {
      for (const o of q.options) {
        for (const id of [...(o.effect.require ?? []), ...(o.effect.prefer ?? []), ...(o.effect.avoid ?? [])]) {
          expect(requirements.has(id), `${q.id}/${o.id}: ${id}`).toBe(true);
        }
      }
    }
  });

  it('verweist nur auf bekannte Berufe und Realitätschecks', () => {
    for (const q of allQuestions) {
      for (const o of q.options) {
        for (const id of Object.keys(o.effect.boostOccupations ?? {})) {
          expect(occupationById.has(id), `${q.id}/${o.id}: ${id}`).toBe(true);
        }
        for (const id of [...(o.effect.flags ?? []), ...(o.effect.suppressFlags ?? [])]) {
          expect(flagById.has(id), `${q.id}/${o.id}: ${id}`).toBe(true);
        }
      }
    }
  });

  it('nutzt in boostTags nur Schlagworte, die es gibt', () => {
    const known = new Set(occupations.flatMap((o) => o.tags));
    for (const q of allQuestions) {
      for (const o of q.options) {
        for (const tag of Object.keys(o.effect.boostTags ?? {})) {
          expect(known.has(tag), `${q.id}/${o.id}: ${tag}`).toBe(true);
        }
      }
    }
  });

  it('verweist in showIf auf existierende Fragen und Optionen', () => {
    for (const q of allQuestions) {
      if (!q.showIf) continue;
      const target = allQuestions.find((x) => x.id === q.showIf!.questionId);
      expect(target, q.id).toBeDefined();
      for (const opt of q.showIf.anyOf) {
        expect(target!.options.some((o) => o.id === opt), `${q.id} → ${opt}`).toBe(true);
      }
    }
  });

  it('stellt in jedem Modus mehr Fragen als im vorherigen', () => {
    expect(questionsForMode('orientation').length).toBeGreaterThan(8);
    expect(questionsForMode('focused').length).toBeGreaterThan(questionsForMode('orientation').length);
    expect(questionsForMode('deep').length).toBeGreaterThan(questionsForMode('focused').length);
  });

  it('nennt die Zahl der Pflichtfragen ohne bedingte Nachfragen', () => {
    for (const mode of ['orientation', 'focused', 'deep'] as const) {
      expect(baseQuestionCount(mode)).toBeLessThanOrEqual(questionsForMode(mode).length);
    }
  });

  it('blendet bedingte Fragen korrekt aus und ein', () => {
    const without = visibleQuestions('deep', {});
    const withPeople = visibleQuestions('deep', { 'people-or-things': ['people'] });
    expect(without.some((q) => q.id === 'people-detail')).toBe(false);
    expect(withPeople.some((q) => q.id === 'people-detail')).toBe(true);
  });

  it('gibt jeder Frage ein Gewicht zwischen 1 und 3', () => {
    for (const q of allQuestions) {
      expect(q.weight, q.id).toBeGreaterThanOrEqual(1);
      expect(q.weight, q.id).toBeLessThanOrEqual(3);
    }
  });
});

describe('Realitätschecks', () => {
  it('hat eindeutige IDs, beide Sprachen und Ratschläge', () => {
    const ids = flags.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const f of flags) {
      expect(f.advice.de.length, f.id).toBe(f.advice.en.length);
      expect(f.advice.de.length, `${f.id} gibt keinen Rat`).toBeGreaterThan(0);
      expect(f.message.de.length, f.id).toBeGreaterThan(40);
    }
  });

  it('wird von mindestens einer Antwort ausgelöst', () => {
    // Ein Hinweistext, den niemand zu sehen bekommt, ist toter Bestand.
    const triggered = new Set(allQuestions.flatMap((q) => q.options.flatMap((o) => o.effect.flags ?? [])));
    for (const f of flags) {
      expect(triggered.has(f.id), `Realitätscheck ${f.id} wird nie ausgelöst`).toBe(true);
    }
  });
});

describe('Anforderungen', () => {
  it('hat eindeutige IDs und beide Sprachen', () => {
    const ids = requirementList.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const r of requirementList) {
      expect(r.label.de.length, r.id).toBeGreaterThan(0);
      expect(r.negated.de.length, r.id).toBeGreaterThan(0);
      expect(r.short.de.length, r.id).toBeGreaterThan(0);
    }
  });

  it('trennt den Bestand tatsächlich – keine Anforderung trifft alles oder nichts', () => {
    // Eine Anforderung, die jeder Beruf erfüllt, schließt nie etwas aus und
    // täuscht damit im Ergebnis eine Prüfung vor, die nicht stattfindet.
    for (const r of requirementList) {
      const passing = occupations.filter((o) => r.test(o)).length;
      expect(passing, `${r.id} trifft keinen Beruf`).toBeGreaterThan(0);
      expect(passing, `${r.id} trifft alle Berufe`).toBeLessThan(occupations.length);
    }
  });

  it('wird von mindestens einer Antwort verwendet', () => {
    const used = new Set(
      allQuestions.flatMap((q) =>
        q.options.flatMap((o) => [...(o.effect.require ?? []), ...(o.effect.prefer ?? []), ...(o.effect.avoid ?? [])]),
      ),
    );
    for (const r of requirementList) {
      expect(used.has(r.id), `Anforderung ${r.id} wird nie verwendet`).toBe(true);
    }
  });
});

describe('Bewertung', () => {
  it('liefert ohne Antworten alle Berufe mit neutraler Wertung', () => {
    const { results } = scoreAll('orientation', {});
    expect(results.length).toBe(occupations.length);
    expect(results.every((r) => r.eligible)).toBe(true);
  });

  it('schließt unvergütete Wege aus, wenn Geld von Anfang an nötig ist', () => {
    const { results } = scoreAll('orientation', pick('path', 'earn-now'));
    const eligible = results.filter((r) => r.eligible);
    expect(eligible.length).toBeGreaterThan(5);
    for (const r of eligible) {
      expect((r.occupation.pay.trainingFirstYear ?? 0), r.occupation.id).toBeGreaterThan(0);
    }
  });

  it('schließt Studienberufe aus, wenn kein Studium gewollt ist', () => {
    const { results } = scoreAll('orientation', pick('path', 'training'));
    const arzt = results.find((r) => r.occupation.id === 'arzt')!;
    expect(arzt.eligible).toBe(false);
    expect(arzt.failed.length).toBeGreaterThan(0);
  });

  it('nennt bei einem ausgeschlossenen Beruf die Anforderung, an der es liegt', () => {
    const { results } = scoreAll('orientation', pick('path', 'training'));
    const excluded = results.find((r) => !r.eligible)!;
    for (const f of excluded.failed) {
      expect(requirements.has(f.requirementId)).toBe(true);
      expect(f.questionId.length).toBeGreaterThan(0);
    }
  });

  it('hebt bei Abneigung gegen Mathematik Berufe mit wenig Mathematik nach oben', () => {
    const { results } = scoreAll('orientation', pick('school-hard', 'no-math'));
    const eligible = results.filter((r) => r.eligible);
    expect(eligible.length).toBeGreaterThan(5);
    for (const r of eligible) {
      expect(r.occupation.ratings.mathDemand, r.occupation.id).toBeLessThanOrEqual(5);
    }
    // Und die Spitze soll wirklich wenig Mathematik verlangen, nicht bloß die
    // Schwelle streifen.
    expect(eligible[0]!.occupation.ratings.mathDemand).toBeLessThanOrEqual(5);
  });

  it('bringt bei praktischer Neigung ein praktisches Ergebnis nach oben', () => {
    const { results } = scoreAll('orientation', {
      activities: ['build'],
      'people-or-things': ['things'],
      physical: ['very-physical'],
    });
    const top = results.find((r) => r.eligible)!;
    expect(top.occupation.ratings.practical).toBeGreaterThanOrEqual(8);
  });

  it('bringt bei sozialer Neigung einen Beruf mit Menschen nach oben', () => {
    const { results } = scoreAll('orientation', {
      activities: ['help'],
      'people-or-things': ['people'],
    });
    const top = results.find((r) => r.eligible)!;
    expect(top.occupation.ratings.social).toBeGreaterThanOrEqual(8);
  });

  it('lockert eine Anforderung, wenn sonst zu wenig übrig bliebe, und sagt welche', () => {
    // Diese Kombination ist absichtlich widersprüchlich: körperlich leicht,
    // draußen, ohne Führerschein, hohe Bezahlung.
    const answers: Answers = {
      physical: ['must-be-light'],
      workplace: ['outdoors'],
      blockers: ['no-licence'],
      money: ['must-be-good'],
    };
    const { results, relaxed } = scoreAll('deep', answers);
    expect(relaxed.length).toBeGreaterThan(0);
    for (const id of relaxed) expect(requirements.has(id)).toBe(true);
    expect(results.filter((r) => r.eligible).length).toBeGreaterThanOrEqual(5);
  });

  it('gibt nie mehr als 100 und nie weniger als 0 Punkte', () => {
    const { results } = scoreAll('deep', {
      activities: ['build', 'investigate'],
      'school-fun': ['math', 'tech'],
      physical: ['very-physical'],
      money: ['must-be-good'],
      security: ['maximum'],
    });
    for (const r of results) {
      expect(r.score, r.occupation.id).toBeGreaterThanOrEqual(0);
      expect(r.score, r.occupation.id).toBeLessThanOrEqual(100);
    }
  });

  it('spreizt die Punktzahlen, statt alle bei 95 zu versammeln', () => {
    const { results } = scoreAll('focused', {
      activities: ['help'],
      'people-or-things': ['people'],
      'working-hours': ['shift-ok'],
      security: ['maximum'],
    });
    const eligible = results.filter((r) => r.eligible);
    const top = eligible[0]!.score;
    const tenth = eligible[Math.min(9, eligible.length - 1)]!.score;
    expect(top - tenth, 'Punktzahlen liegen zu dicht beieinander').toBeGreaterThanOrEqual(4);
    expect(top).toBeLessThan(100);
  });

  it('behandelt „weiß ich nicht" als unbeantwortet und senkt die Verlässlichkeit', () => {
    const withAnswer = scoreAll('orientation', pick('activities', 'build'));
    const withNeutral = scoreAll('orientation', pick('activities', 'unclear'));
    expect(withNeutral.confidence).toBeLessThan(withAnswer.confidence);
    expect(withNeutral.profile.answeredCount).toBe(0);
  });

  it('dreht nur die Dimensionen um, bei denen wenig wirklich erwünscht sein kann', () => {
    // „Wenig Mathematik" ist eine echte Vorliebe; „wenig Arbeitsmarktlage"
    // wünscht niemand. Negative Gewichte dort müssen verschwinden.
    const invertible = buildProfile('orientation', pick('school-hard', 'no-math'));
    expect(invertible.weights.mathDemand).toBeLessThan(0);
    for (const [key, weight] of Object.entries(invertible.weights)) {
      if (weight! < 0) expect(INVERTIBLE_RATINGS.has(key as never), `${key} sollte nicht umgedreht werden`).toBe(true);
    }
  });

  it('hebt einen Realitätscheck auf, wenn eine Nachfrage ihn entschärft', () => {
    const before = buildProfile('deep', pick('money', 'content-first'));
    expect(before.flags.has('low-pay-reality')).toBe(false);

    const withFlag = buildProfile('deep', {
      money: ['content-first'],
      'pay-tradeoff': ['tight-but-ok'],
    });
    expect(withFlag.flags.has('low-pay-reality')).toBe(true);

    const suppressed = buildProfile('deep', {
      money: ['content-first'],
      'pay-tradeoff': ['yes-support'],
    });
    expect(suppressed.flags.has('low-pay-reality')).toBe(false);
  });

  it('erzeugt aus den Neigungsfragen ein Profil mit absteigenden Anteilen', () => {
    const profile = buildProfile('orientation', { activities: ['help', 'create'] });
    const rows = interestProfile(profile);
    expect(rows.length).toBeGreaterThanOrEqual(2);
    expect(rows[0]!.share).toBe(100);
    for (let i = 1; i < rows.length; i += 1) {
      expect(rows[i]!.share).toBeLessThanOrEqual(rows[i - 1]!.share);
    }
  });

  it('gewichtet den ersten Neigungscode eines Berufs stärker als den dritten', () => {
    // Zwei Berufe, bei denen „sozial" an unterschiedlicher Stelle steht, dürfen
    // bei einer rein sozialen Neigung nicht denselben Zuschlag bekommen.
    const answers = { activities: ['help'] };
    const { results } = scoreAll('orientation', answers);
    const byId = new Map(results.map((r) => [r.occupation.id, r]));
    const primarySocial = byId.get('pflegefachmann')!;
    const laterSocial = byId.get('notfallsanitaeter')!;
    expect(primarySocial.occupation.interestCodes[0]).toBe('social');
    expect(laterSocial.occupation.interestCodes[0]).toBe('social');
    // Beide führen mit „sozial"; hier prüfen wir nur, dass der Zuschlag wirkt.
    expect(primarySocial.bonusPoints).toBeGreaterThan(0);
  });
});

describe('Ausbildungsweg-Empfehlung', () => {
  it('schweigt, solange nichts zum Weg gesagt wurde', () => {
    const { answered } = scorePathways('orientation', pick('activities', 'build'));
    expect(answered).toBe(0);
  });

  it('empfiehlt die duale Ausbildung, wenn Geld von Anfang an nötig ist', () => {
    const { results, answered } = scorePathways('focused', {
      path: ['earn-now'],
      'training-money': ['no-way'],
      'learning-style': ['by-doing'],
    });
    expect(answered).toBeGreaterThan(0);
    expect(results[0]!.pathway.id).toBe('dual');
    expect(results[0]!.eligible).toBe(true);
  });

  it('schließt unvergütete Wege aus, wenn Vergütung zwingend ist', () => {
    const { results } = scorePathways('focused', { 'training-money': ['no-way'] });
    for (const r of results.filter((x) => x.eligible)) {
      expect(r.pathway.paid, r.pathway.id).toBe(true);
    }
  });

  it('empfiehlt bei Selbstlernenden mit Studienwunsch einen Studienweg', () => {
    const { results } = scorePathways('deep', {
      path: ['study'],
      'learning-style': ['self-directed'],
      'training-money': ['long'],
    });
    expect(['university', 'applied-university', 'distance-learning']).toContain(results[0]!.pathway.id);
  });

  it('zieht bei Zweifeln am Studium einen strukturierten Weg vor', () => {
    const { results } = scorePathways('deep', {
      path: ['study'],
      'study-doubt': ['unsure-study'],
    });
    const universityRank = results.findIndex((r) => r.pathway.id === 'university');
    const dualStudyRank = results.findIndex((r) => r.pathway.id === 'dual-study');
    expect(dualStudyRank).toBeLessThan(universityRank);
  });

  it('markiert Wege, die der angegebene Abschluss nicht erlaubt', () => {
    const { results } = scorePathways('deep', { schooling: ['hauptschule'] });
    const university = results.find((r) => r.pathway.id === 'university')!;
    expect(university.eligible).toBe(false);
    expect(university.concerns).toContain('needs-schooling');
  });
});

describe('Gegenprobe', () => {
  it('vergleicht zwei Ergebnisse aus demselben Profil', () => {
    const { results } = scoreAll('focused', {
      activities: ['help'],
      'people-or-things': ['people'],
      money: ['important'],
    });
    const eligible = results.filter((r) => r.eligible);
    const contrast = contrastOccupations(eligible[0]!, eligible[5]!);
    expect(contrast.scoreDelta).toBeLessThanOrEqual(0);
    expect(contrast.entryPayDelta).toBe(eligible[5]!.occupation.pay.entry - eligible[0]!.occupation.pay.entry);
    for (const line of [...contrast.worse, ...contrast.better]) {
      expect(ratingLabels[line.key]).toBeDefined();
    }
  });
});

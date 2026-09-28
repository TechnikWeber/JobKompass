import { occupations, oldestCheckDate } from '../data/occupations';
import { pathways } from '../data/pathways';
import { flags } from '../data/flags';
import { allQuestions } from '../data/questions';
import { requirementList } from '../engine/requirements';
import { useI18n } from '../i18n';
import { Link } from './common';

export function AboutPage() {
  const { t, lang } = useI18n();
  const de = lang === 'de';

  return (
    <section className="section">
      <div className="container container--narrow stack stack-lg">
        <header>
          <h1 style={{ fontSize: 'var(--step-3)' }}>{t('aboutTitle')}</h1>
        </header>

        <div className="prose stack">
          <p>
            {de
              ? 'JobKompass ist eine Orientierungshilfe für die Berufswahl – gedacht für Menschen zwischen 14 und 25, die vor der Frage stehen, was nach der Schule kommt. Er ersetzt keine Berufsberatung. Er soll bewirken, dass man mit besseren Fragen dorthin geht.'
              : 'JobKompass is an orientation aid for choosing a career — made for people between 14 and 25 facing the question of what comes after school. It does not replace careers advice. It should mean you arrive there with better questions.'}
          </p>

          <h2>{de ? 'Wie die Empfehlung entsteht' : 'How the recommendation is produced'}</h2>
          <p>{de ? 'Jede Antwort wirkt auf vier Arten:' : 'Every answer acts in four ways:'}</p>
          <ol>
            <li>
              {de ? (
                <>
                  Sie <strong>gewichtet Bewertungsdimensionen</strong> – 26 Stück, von <code>mathDemand</code> über{' '}
                  <code>calmPace</code> bis <code>meaningfulness</code>.
                </>
              ) : (
                <>
                  It <strong>weights rating dimensions</strong> — 26 of them, from <code>mathDemand</code> through{' '}
                  <code>calmPace</code> to <code>meaningfulness</code>.
                </>
              )}
            </li>
            <li>
              {de ? (
                <>
                  Sie kann eine <strong>harte Anforderung</strong> setzen, ausgedrückt als eines von{' '}
                  {requirementList.length} benannten Prädikaten über einen Beruf (<code>paid-training</code>,{' '}
                  <code>no-night-work</code>, <code>low-physical</code>, …). Wer sie nicht erfüllt, fällt aus der
                  Empfehlung – nicht bloß ein paar Punkte nach unten.
                </>
              ) : (
                <>
                  It can set a <strong>hard requirement</strong>, expressed as one of {requirementList.length} named
                  predicates over an occupation (<code>paid-training</code>, <code>no-night-work</code>,{' '}
                  <code>low-physical</code>, …). Anything failing it drops out of the recommendation entirely, not just a
                  few points down.
                </>
              )}
            </li>
            <li>
              {de ? (
                <>
                  Sie trägt zum <strong>Neigungsprofil</strong> bei. Dahinter steht das Modell der Holland-Codes: sechs
                  Achsen, auf denen sich Menschen und Tätigkeiten mit demselben Maß beschreiben lassen. Die Passung
                  zwischen beiden sagt Zufriedenheit im Beruf besser voraus als Gehalt oder Ansehen.
                </>
              ) : (
                <>
                  It contributes to the <strong>interest profile</strong>. Behind this sits the Holland code model: six
                  dimensions on which people and activities can be described with the same measure. The fit between the
                  two predicts job satisfaction better than salary or status.
                </>
              )}
            </li>
            <li>
              {de ? (
                <>
                  Sie kann <strong>einzelne Berufe oder Felder gezielt bevorzugen</strong>, wenn eine Antwort eindeutig
                  auf sie zeigt – „ich will mit Holz arbeiten" ist eine Beschreibung von Tischler und Zimmerer, keine
                  allgemeine Vorliebe.
                </>
              ) : (
                <>
                  It can <strong>favour specific occupations or fields</strong> when an answer points at them
                  unambiguously — "I want to work with wood" describes joinery and carpentry, not a general preference.
                </>
              )}
            </li>
          </ol>
          <p>
            {de
              ? 'Die Grundpunktzahl ist ein gewichteter Mittelwert über die Bewertungsdimensionen, normiert auf 0–100, anschließend gespreizt und nach oben weich gedeckelt. So klebt das Ergebnisfeld nicht bei 95 bis 97, und 100 bleibt der theoretischen Bestleistung vorbehalten. Zuschläge aus Vorlieben und Neigungstreffern kommen sättigend obendrauf: ein einzelner Treffer kann die Wertung nicht überfahren, eine wirklich definierende Antwort setzt sich trotzdem durch.'
              : 'The base score is a weighted average across the rating dimensions, normalised to 0–100 and then spread and soft-capped so that results do not all cluster in the high nineties and 100 stays reserved for a theoretical perfect fit. Preference and inclination bonuses are added on top with saturation, so a single strong match cannot run away with the total while a genuinely defining answer still wins.'}
          </p>
          <p>
            {de
              ? 'Wenn deine harten Angaben weniger als fünf Berufe übrig lassen, wird schrittweise diejenige Anforderung gelockert, die die meisten ausschließt – und das Ergebnis benennt, welche das war. Geraten wird nichts.'
              : 'If your hard requirements leave fewer than five occupations, the requirement that excludes the most is relaxed step by step — and the result names which one it was. Nothing is guessed.'}
          </p>

          <h2>{de ? 'Woher die Daten kommen' : 'Where the data comes from'}</h2>
          <p>
            {de ? (
              <>
                {occupations.length} Berufe mit je 49 Merkmalen, {pathways.length} Ausbildungswege,{' '}
                {allQuestions.length} Fragen und {flags.length} Realitätschecks. Grundlage sind das BERUFENET und der
                Entgeltatlas der Bundesagentur für Arbeit, die Ausbildungsvergütungs-Datenblätter des Bundesinstituts
                für Berufsbildung, die einschlägigen Berufsgesetze sowie Statistiken der Kammern und Fachverbände. Jeder
                Eintrag nennt seine Quellen und trägt ein Prüfdatum.
              </>
            ) : (
              <>
                {occupations.length} occupations with 49 attributes each, {pathways.length} training routes,{' '}
                {allQuestions.length} questions and {flags.length} reality checks. The basis is BERUFENET and the
                Entgeltatlas of the Federal Employment Agency, the training-pay datasets of the Federal Institute for
                Vocational Education and Training, the relevant professional statutes and statistics from the chambers
                and trade associations. Every entry cites its sources and carries a check date.
              </>
            )}
          </p>

          <div className="callout callout--warning">
            <h3 className="callout__title">{de ? 'Zu den Zahlen, ehrlich' : 'About the figures, honestly'}</h3>
            <p style={{ margin: 0 }}>
              {de
                ? 'Alle Verdienstangaben sind gerundete Orientierungswerte: brutto, Vollzeit, Deutschland. Tarifbindung, Bundesland, Betriebsgröße und Branche verschieben jede dieser Zahlen um mehrere hundert Euro. Die Bewertungen von 0 bis 10 sind redaktionelle Einschätzungen, relativ zu anderen Berufen, die man mit 16 bis 25 beginnen kann – keine Messwerte. Sie sind dafür gemacht, Berufe untereinander vergleichbar zu machen, nicht dafür, einen einzelnen absolut zu bewerten.'
                : 'All pay figures are rounded orientation values: gross, full-time, Germany. Collective agreements, federal state, company size and sector shift each of these by several hundred euros. The 0 to 10 ratings are editorial assessments, relative to other occupations you can start between 16 and 25 — not measurements. They exist to make occupations comparable with each other, not to grade a single one in absolute terms.'}
            </p>
          </div>

          <h2>{de ? 'Was dieses Werkzeug nicht kann' : 'What this tool cannot do'}</h2>
          <ul>
            <li>
              {de
                ? 'Es kennt dich nicht. Es kennt nur deine Antworten, und die kann man nach fünf Minuten anders geben.'
                : 'It does not know you. It knows only your answers, and you can give them differently five minutes later.'}
            </li>
            <li>
              {de
                ? 'Es weiß nicht, welche Ausbildungsplätze es in deiner Stadt gibt. Das zeigt die Lehrstellenbörse der Arbeitsagentur in fünf Minuten.'
                : 'It does not know which training places exist in your town. The employment agency listings show that in five minutes.'}
            </li>
            <li>
              {de
                ? 'Es kann nicht einschätzen, ob du eine Belastung aushältst, die du nie erlebt hast. Dafür gibt es Praktika und Freiwilligendienste – und keinen Ersatz.'
                : 'It cannot judge whether you can bear a strain you have never experienced. Placements and voluntary service exist for that — and there is no substitute.'}
            </li>
            <li>
              {de
                ? 'Es entscheidet nicht. Eine Zahl von 87 ist keine Erlaubnis und eine von 41 kein Verbot.'
                : 'It does not decide. A score of 87 is not permission and 41 is not a prohibition.'}
            </li>
          </ul>

          <h2>{de ? 'Datenschutz' : 'Privacy'}</h2>
          <p>
            {de
              ? 'Alles läuft in deinem Browser. Es gibt kein Konto, keine Cookies, keine Analyse und keinen Server, der deine Antworten sieht – auch nicht die zu Gesundheit, Geld oder psychischer Belastbarkeit. Gespeichert werden nur Sprache und Farbschema, lokal. Ein geteilter Ergebnis-Link enthält deine Antworten in der Adresszeile: Wer ihn bekommt, sieht sie. Das ist der Preis dafür, dass niemand anderes sie sieht.'
              : 'Everything runs in your browser. There is no account, no cookies, no analytics and no server that sees your answers — including those about health, money or psychological resilience. Only your language and colour scheme are stored, locally. A shared result link contains your answers in the address bar: whoever receives it can see them. That is the price of nobody else seeing them.'}
          </p>

          <h2>{de ? 'Wo du echte Beratung bekommst' : 'Where to get real advice'}</h2>
          <ul>
            <li>
              <a href="https://www.arbeitsagentur.de/bildung/ausbildung" target="_blank" rel="noreferrer noopener">
                {de ? 'Berufsberatung der Bundesagentur für Arbeit' : 'Careers advice at the Federal Employment Agency'}
              </a>{' '}
              – {de ? 'kostenlos, unabhängig, auch ohne Termin in vielen Städten.' : 'free, independent, and in many cities without an appointment.'}
            </li>
            <li>
              <a href="https://www.arbeitsagentur.de/jobsuche/" target="_blank" rel="noreferrer noopener">
                {de ? 'Lehrstellenbörse' : 'Apprenticeship listings'}
              </a>{' '}
              – {de ? 'zeigt, was in deiner Postleitzahl tatsächlich frei ist.' : 'shows what is actually available in your postcode.'}
            </li>
            <li>
              <a href="https://web.arbeitsagentur.de/berufenet/" target="_blank" rel="noreferrer noopener">
                BERUFENET
              </a>{' '}
              – {de ? 'die amtliche Beschreibung jedes Berufs, ausführlicher als jede Zusammenfassung.' : 'the official description of every occupation, more detailed than any summary.'}
            </li>
            <li>
              <a href="https://www.berufe.tv/" target="_blank" rel="noreferrer noopener">
                BERUFE.TV
              </a>{' '}
              – {de ? 'Berufe im Film. Fünf Minuten zusehen sagt mehr als zehn Seiten lesen.' : 'occupations on film. Five minutes of watching says more than ten pages of reading.'}
            </li>
            <li>
              <a href="https://www.bafoeg-digital.de/" target="_blank" rel="noreferrer noopener">
                BAföG
              </a>{' '}
              {de ? 'und' : 'and'}{' '}
              <a href="https://www.aufstiegs-bafoeg.de/" target="_blank" rel="noreferrer noopener">
                Aufstiegs-BAföG
              </a>{' '}
              – {de ? 'beantragen, auch wenn du glaubst, es stehe dir nicht zu.' : 'apply even if you think you are not eligible.'}
            </li>
          </ul>

          <h2>{de ? 'Mitmachen' : 'Contributing'}</h2>
          <p>
            {de ? (
              <>
                Korrekturen an Zahlen, Bewertungen oder Texten sind ausdrücklich erwünscht, ebenso neue Berufe. Der
                Quellcode und die Daten liegen offen auf{' '}
                <a href="https://github.com/TechnikWeber/JobKompass" target="_blank" rel="noreferrer noopener">
                  GitHub
                </a>
                . Datenstand: <time dateTime={oldestCheckDate}>{oldestCheckDate}</time>.
              </>
            ) : (
              <>
                Corrections to figures, ratings or wording are explicitly welcome, as are new occupations. The source
                code and data are open on{' '}
                <a href="https://github.com/TechnikWeber/JobKompass" target="_blank" rel="noreferrer noopener">
                  GitHub
                </a>
                . Data as of <time dateTime={oldestCheckDate}>{oldestCheckDate}</time>.
              </>
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link to={{ name: 'triage' }} className="btn btn--primary" fresh>
            {t('heroStart')}
          </Link>
          <Link to={{ name: 'browse' }} className="btn">
            {t('navBrowse')}
          </Link>
        </div>
      </div>
    </section>
  );
}

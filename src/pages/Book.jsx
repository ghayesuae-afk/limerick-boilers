import { useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Page, RadioCards, Chips } from '../components/Layout.jsx';
import { SERVICES, PHONE, PHONE_HREF } from '../content.js';
import {
  DOW, TIMES, SURVEY_WEEKS, SERVICE_WEEKS, dayAt, isDayAvailable, isSlotTaken, nextAvailable,
  weekNote, isCovered, fmtShort, fmtLong, fmtDayMonth,
} from '../booking/availability.js';
import { downloadIcs } from '../booking/calendar.js';

const EMPTY_FORM = { name: '', mobile: '', email: '', eircode: '', address: '', notes: '' };
const PAY_DELAY = 1200;

export default function Book() {
  const [params] = useSearchParams();
  const initialSvc = SERVICES.some((s) => s.id === params.get('service')) ? params.get('service') : 'survey';

  const [step, setStep] = useState(0);
  const [svcId, setSvcId] = useState(initialSvc);
  const [week, setWeek] = useState(0);
  const [date, setDate] = useState(null); // [week, dayIndex]
  const [time, setTime] = useState(null);
  const [sweek, setSweek] = useState(null);
  const [pref, setPref] = useState('Any time');
  const [fuel, setFuel] = useState(null);
  const [paying, setPaying] = useState(false);
  const [f, setF] = useState(EMPTY_FORM);
  const ref = useRef(`LB-${Math.floor(10000 + Math.random() * 90000)}`);

  const s = SERVICES.find((x) => x.id === svcId);
  const isSurvey = s.id === 'survey';
  const selDate = date ? dayAt(date[0], date[1]) : null;
  const next = useMemo(nextAvailable, []);

  const eir = f.eircode.replace(/\s/g, '').toUpperCase();
  const eirOk = eir.length >= 3 && isCovered(eir);
  const eirMsg = eir.length < 3 ? '' : eirOk ? '✓ We cover this area' : "Outside our usual area. Ring us and we'll check.";

  const valid = [
    true,
    isSurvey ? !!(date && time !== null) : sweek !== null,
    !!(f.name.trim() && f.mobile.trim().length >= 7 && eir.length >= 3 && f.address.trim()),
    true,
  ][step];

  const when = isSurvey
    ? (selDate && time !== null ? `${fmtShort(selDate)}, ${TIMES[time][0]}` : selDate ? fmtShort(selDate) : 'Not picked')
    : (sweek ? `Week of ${fmtDayMonth(dayAt(sweek, 0))}` : 'Not picked');

  const labels = ['Service', isSurvey ? 'Date & time' : 'Week', 'Your details', 'Pay'];
  const hints = [
    'Takes about 2 minutes.',
    valid ? `${when} selected.` : (isSurvey ? 'Choose a day, then a time.' : 'Choose a week.'),
    valid ? 'Nothing is charged yet.' : 'Name, mobile, Eircode and address needed.',
    `Pay ${s.price} to confirm.`,
  ];
  const nextLabels = ['Continue', 'Continue', 'Review & pay', paying ? 'Processing…' : `Pay ${s.price}`];

  const bind = (k) => ({ value: f[k], onChange: (e) => { const v = e.target.value; setF((p) => ({ ...p, [k]: v })); } });

  const goTo = (n) => { setStep(n); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const pay = () => {
    if (paying) return;
    // TODO: replace with Stripe Payment Element / Payment Request confirmation.
    setPaying(true);
    setTimeout(() => { setPaying(false); goTo(4); }, PAY_DELAY);
  };

  const onNext = () => {
    if (!valid || paying) return;
    if (step === 3) { pay(); return; }
    goTo(step + 1);
  };

  const addToCalendar = () => {
    const location = [f.address, f.eircode.toUpperCase()].filter(Boolean).join(', ');
    if (isSurvey) {
      const start = new Date(selDate);
      start.setHours(TIMES[time][2], 0, 0, 0);
      const end = new Date(start.getTime() + 45 * 60 * 1000);
      downloadIcs({
        uid: ref.current, start, end, location,
        title: 'Limerick Boilers site survey',
        description: `Booking ref ${ref.current}. Someone over 18 needs to be home. To change it, ring ${PHONE}.`,
      });
    } else {
      const start = dayAt(sweek, 0);
      const end = dayAt(sweek, 6); // exclusive: covers Mon–Sat
      downloadIcs({
        uid: ref.current, start, end, location, allDay: true,
        title: `Limerick Boilers ${s.name.toLowerCase()} (day to be agreed)`,
        description: `Booking ref ${ref.current}. We'll ring you to agree the day. Preference: ${pref}.`,
      });
    }
  };

  const firstName = f.name.trim().split(' ')[0] || 'thanks';
  const doneLine = isSurvey
    ? `We'll see you on ${when}.`
    : `We'll ring you on ${f.mobile || 'your mobile'} to agree a day in the ${when.toLowerCase()}.`;
  const nextSteps = isSurvey
    ? ['We text you the day before to confirm.', 'We survey your system, about 45 minutes.', 'You get a fixed written quote, with the €40 deducted.']
    : ['We ring within one working day to agree the date.', 'Your engineer services the boiler and runs safety checks.', 'You receive your service certificate by email.'];
  const assurances = [
    'Free cancellation up to 48 hours before',
    'Receipt and booking details sent by email and text',
    isSurvey ? 'The €40 is deducted from your installation if you go ahead' : 'Carried out by a fully insured, certified engineer',
  ];

  const timeGroups = selDate
    ? [['Morning', 0], ['Afternoon', 1]].map(([label, g]) => ({
      label,
      slots: TIMES.map((t, k) => ({ t, k })).filter(({ t }) => t[1] === g),
    }))
    : [];

  return (
    <Page column>
      <main className="book-main">
        {step < 4 && (
          <div className="book-head">
            <h1>Book online</h1>
            <ol className="stepper">
              {labels.map((label, i) => (
                <li key={label} className={[i <= step && 'is-reached', i < step && 'is-done', i === step && 'is-current'].filter(Boolean).join(' ')}>
                  <span className="stepper__bar" />
                  <button type="button" onClick={() => i < step && setStep(i)} aria-current={i === step ? 'step' : undefined}>
                    {i + 1}. {label}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="book-body">
          {step === 0 && (
            <div className="book-step book-step--tight">
              <h2>What do you need?</h2>
              <RadioCards
                label="What do you need?" items={SERVICES} value={svcId} onChange={setSvcId} className="svc-card"
                render={(o) => (
                  <span className="radio-card__body">
                    <span className="radio-card__title"><span>{o.name}</span><span>{o.price}</span></span>
                    <span className="radio-card__desc">{o.desc}</span>
                    <span className="svc-card__how">{o.how}</span>
                  </span>
                )}
              />
            </div>
          )}

          {step === 1 && isSurvey && (
            <div className="book-step">
              <div className="day-head">
                <h2>Pick a day</h2>
                {next && (
                  <button type="button" className="next-avail" onClick={() => { setWeek(next.w); setDate([next.w, next.i]); setTime(next.t); }}>
                    Next available: {fmtShort(next.d)}, {TIMES[next.t][0]}
                  </button>
                )}
              </div>
              <div className="cal">
                <div className="cal__nav">
                  <button type="button" className="cal__arrow" aria-label="Previous week" disabled={week === 0} onClick={() => setWeek(week - 1)}>‹</button>
                  <strong>{dayAt(week, 0).getDate()} – {fmtDayMonth(dayAt(week, 5))}</strong>
                  <button type="button" className="cal__arrow" aria-label="Next week" disabled={week >= SURVEY_WEEKS - 1} onClick={() => setWeek(week + 1)}>›</button>
                </div>
                <div className="cal__days">
                  {DOW.map((dow, i) => {
                    const d = dayAt(week, i);
                    const ok = isDayAvailable(week, i);
                    const on = !!date && date[0] === week && date[1] === i;
                    return (
                      <button
                        key={dow} type="button" className="day" disabled={!ok} aria-pressed={on}
                        aria-label={`${fmtLong(d)}${ok ? '' : ', unavailable'}`}
                        onClick={() => { setDate([week, i]); setTime(null); }}
                      >
                        <span className="day__dow">{dow}</span>
                        <span className="day__num">{d.getDate()}</span>
                        <span className="day__dot" />
                      </button>
                    );
                  })}
                </div>
              </div>
              {selDate && (
                <div className="times">
                  <h2>Pick a time on {fmtLong(selDate)}</h2>
                  {timeGroups.map((g) => (
                    <div key={g.label} className="time-group">
                      <span className="time-group__label">{g.label}</span>
                      <div className="time-grid">
                        {g.slots.map(({ t, k }) => (
                          <button key={k} type="button" className="slot" disabled={isSlotTaken(selDate, k)} aria-pressed={time === k} onClick={() => setTime(k)}>
                            {t[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <span className="small-note">Surveys take about 45 minutes. Someone over 18 needs to be home.</span>
                </div>
              )}
            </div>
          )}

          {step === 1 && !isSurvey && (
            <div className="book-step">
              <div className="book-step__title">
                <h2>Pick a week</h2>
                <span className="book-step__sub">We'll ring you to agree the exact day within that week.</span>
              </div>
              <div className="week-grid">
                {SERVICE_WEEKS.map((w) => (
                  <button key={w} type="button" className="week" aria-pressed={sweek === w} onClick={() => setSweek(w)}>
                    <span>Week of</span>
                    <strong>{fmtDayMonth(dayAt(w, 0))}</strong>
                    <span>{weekNote(w)}</span>
                  </button>
                ))}
              </div>
              <div className="pref">
                <span>Mornings or afternoons?</span>
                <Chips options={['Mornings', 'Afternoons', 'Any time']} value={pref} onChange={setPref} className="chip--lg" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="book-step">
              <div className="book-step__title">
                <h2>Your details</h2>
                <span className="book-step__sub">So we know where to go and who to contact.</span>
              </div>
              <div className="form-card">
                <label className="field f-half">Name<input className="input" autoComplete="name" placeholder="Your full name" {...bind('name')} /></label>
                <label className="field f-half">Mobile<input className="input" type="tel" autoComplete="tel" placeholder="08X XXX XXXX" {...bind('mobile')} /></label>
                <label className="field f-full">Email<input className="input" type="email" autoComplete="email" placeholder="For your booking confirmation" {...bind('email')} /></label>
                <label className="field f-eir">
                  Eircode
                  <input className="input input--eir" autoComplete="postal-code" placeholder="e.g. V94 X2K7" {...bind('eircode')} />
                  <span className={`eir-msg${eirOk ? ' is-ok' : ''}`} aria-live="polite">{eirMsg}</span>
                </label>
                <label className="field f-addr">Address<input className="input" autoComplete="street-address" placeholder="House number and street, town" {...bind('address')} /></label>
                <div className="question f-full">
                  <span className="question__label">Current boiler</span>
                  <Chips options={['Oil', 'Gas', 'Not sure']} value={fuel} onChange={setFuel} className="chip--md" />
                </div>
                <label className="field f-full">
                  Anything we should know? <span className="field__optional">Optional</span>
                  <textarea className="input" rows={3} placeholder="Access, parking, best time to ring…" {...bind('notes')} />
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="book-step">
              <div className="book-step__title">
                <h2>Confirm and pay {s.price}</h2>
                <span className="book-step__sub">You stay on this page. Your card is processed securely by Stripe.</span>
              </div>
              <div className="form-card form-card--col">
                <div className="wallets">
                  <button type="button" className="wallet wallet--apple" onClick={pay}> Pay</button>
                  <button type="button" className="wallet wallet--google" onClick={pay}>G Pay</button>
                </div>
                <div className="or-line">or pay by card</div>
                {/* Placeholder fields: swap for Stripe Elements when the back end is ready. */}
                <div className="card-fields">
                  <label className="field f-card">Card number<input className="input input--cc" inputMode="numeric" autoComplete="cc-number" placeholder="1234 1234 1234 1234" /></label>
                  <label className="field f-small">Expiry<input className="input" autoComplete="cc-exp" placeholder="MM / YY" /></label>
                  <label className="field f-small">CVC<input className="input" inputMode="numeric" autoComplete="cc-csc" placeholder="123" /></label>
                </div>
              </div>
              <div className="assurances">
                {assurances.map((a) => <div key={a}><span className="tick">✓</span><span>{a}</span></div>)}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="card done" role="status">
              <span className="done__tick">✓</span>
              <div className="done__copy">
                <h1>You're booked in, {firstName}.</h1>
                <p>{doneLine} A confirmation is on its way to {f.email || 'your email'}.</p>
              </div>
              <div className="btn-row">
                <button type="button" className="btn btn-primary" onClick={addToCalendar}>Add to calendar</button>
                <Link to="/" className="btn btn-outline">Back to home</Link>
              </div>
              <div className="next-list">
                <span className="eyebrow">What happens next</span>
                {nextSteps.map((t, i) => (
                  <div key={t} className="next-list__row"><strong>{i + 1}</strong><span>{t}</span></div>
                ))}
              </div>
              <span className="done__ref">
                Booking ref {ref.current} · Need to change it? Ring <a href={PHONE_HREF}>{PHONE}</a>.
              </span>
            </div>
          )}

          {step < 4 && (
            <div className="action-bar">
              {step > 0 && <button type="button" className="action-bar__back" onClick={() => setStep(step - 1)}>← Back</button>}
              <span className="action-bar__hint">{hints[step]}</span>
              <button type="button" className="action-bar__next" disabled={!valid} onClick={onNext}>{nextLabels[step]}</button>
            </div>
          )}
        </div>
      </main>
    </Page>
  );
}

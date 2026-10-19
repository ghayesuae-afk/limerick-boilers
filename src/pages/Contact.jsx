import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, RadioCards, Chips } from '../components/Layout.jsx';
import { PHONE, PHONE_HREF, EMAIL, HOURS } from '../content.js';

const QUESTIONS = [
  { id: 'need', label: 'What do you need?', opts: ['New boiler', 'Repair', 'Service', 'Not sure'] },
  { id: 'fuel', label: 'Boiler fuel type', opts: ['Oil', 'Gas', 'Not sure'] },
  { id: 'age', label: 'How old is your current boiler?', opts: ['Under 10 years', '10–15 years', '15+ years', "Don't know"] },
  { id: 'urg', label: 'How urgent is this?', opts: ['No heating now', 'Within a few weeks', 'Just planning'] },
];

const DETAILS = [
  { k: 'Phone', v: PHONE, href: PHONE_HREF },
  { k: 'Email', v: EMAIL, href: `mailto:${EMAIL}` },
  { k: 'Areas covered', v: 'Limerick city & county', to: '/about' },
  { k: 'Hours', v: HOURS, href: PHONE_HREF },
];

const DIRECT = [
  { id: 'survey', name: 'Site survey', price: '€40', cta: 'Choose a date & time' },
  { id: 'oil', name: 'Oil boiler service', price: '€160', cta: 'Choose a week' },
  { id: 'gas', name: 'Gas boiler service', price: '€220', cta: 'Choose a week' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', notes: '' });
  const [answers, setAnswers] = useState({});
  const [svc, setSvc] = useState('survey');
  const picked = DIRECT.find((d) => d.id === svc);
  const bind = (k) => ({ value: form[k], onChange: (e) => setForm((f) => ({ ...f, [k]: e.target.value })) });

  const send = (e) => {
    e.preventDefault();
    // TODO: POST { ...form, ...answers } to the contact-form back end.
    setSent(true);
  };

  return (
    <Page>
      <section className="container" style={{ padding: '56px 24px 96px' }}>
        <div className="contact-col">
          <div className="contact-intro">
            <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><strong>Contact</strong></div>
            <h1 className="h1">Get in touch.</h1>
            <p className="lede">Tell us what you need and we'll be in touch within 24 hours. Our €40 site survey fee is fully deducted from your installation cost if you proceed.</p>
          </div>

          {sent ? (
            <div className="card success" role="status">
              <span className="success__tick">✓</span>
              <h2>Thanks, we've got your details.</h2>
              <p>We'll be in touch within 24 hours. For anything urgent, call {PHONE}.</p>
            </div>
          ) : (
            <form className="card contact-form" onSubmit={send}>
              <div className="form-part">
                <span className="eyebrow">1 · Your details</span>
                <div className="grid-2">
                  <label className="field">Name<input className="input" placeholder="Your name" autoComplete="name" {...bind('name')} /></label>
                  <label className="field">Phone<input className="input" type="tel" autoComplete="tel" placeholder="08X XXX XXXX" {...bind('phone')} /></label>
                  <label className="field span-all">Email<input className="input" type="email" autoComplete="email" placeholder="you@email.com" {...bind('email')} /></label>
                </div>
              </div>
              <div className="form-part">
                <span className="eyebrow">2 · About your boiler</span>
                <div className="question-grid">
                  {QUESTIONS.map((q) => (
                    <div key={q.id} className="question">
                      <span className="question__label">{q.label}</span>
                      <Chips options={q.opts} value={answers[q.id]} onChange={(t) => setAnswers((a) => ({ ...a, [q.id]: t }))} />
                    </div>
                  ))}
                </div>
                <label className="field">
                  Anything else? <span className="field__optional">Optional</span>
                  <textarea className="input" rows={3} placeholder="Any additional details about your boiler or heating system" {...bind('notes')} />
                </label>
              </div>
              <div className="form-foot">
                <span>We reply within 24 hours, Monday to Saturday.</span>
                <button type="submit" className="btn btn-primary">Send my details</button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="band-navy">
        <div className="section talk">
          <div className="talk__copy">
            <h2 className="h2">Prefer to talk?</h2>
            <p>We provide professional oil and gas boiler installation, repairs and servicing across Limerick. If you would prefer to speak to us directly, you can call or email us using the details below.</p>
            <a href={PHONE_HREF} className="btn btn-orange">Call {PHONE}</a>
          </div>
          <div className="talk-list">
            {DETAILS.map((d) => (
              <div key={d.k} className="talk-list__row">
                <span>{d.k}</span>
                {d.to ? <Link to={d.to}>{d.v}</Link> : <a href={d.href}>{d.v}</a>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="book" className="band-sand">
        <div className="section book-band">
          <div className="direct">
            <span className="eyebrow">Or book directly</span>
            <h2 className="h2">Schedule a boiler site survey.</h2>
            <p>Choose a time that suits you and book a boiler site survey with our team. We will assess your heating system and provide a clear quote for installation or repairs.</p>
          </div>
          <div className="picker-box">
            <RadioCards
              label="Choose a service" items={DIRECT} value={svc} onChange={setSvc} className="radio-card--center"
              render={(o) => (
                <span className="radio-card__title" style={{ flex: 1 }}><span>{o.name}</span><span>{o.price}</span></span>
              )}
            />
            <Link to={`/book?service=${svc}`} className="btn btn-orange picker-box__cta">{picked.cta} · {picked.price}</Link>
            <span className="picker-box__note">Pick a time and pay securely online. Prices include VAT. The survey fee comes off your new boiler.</span>
          </div>
        </div>
      </section>
    </Page>
  );
}

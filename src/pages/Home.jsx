import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, CertStrip, CallButton, FinalCta, RadioCards } from '../components/Layout.jsx';
import { HERO_PHOTO, PHONE, PHONE_HREF, CREDENTIALS, REVIEWS } from '../content.js';

const PICKER = [
  { id: 'survey', name: 'New boiler site survey', price: '€40', desc: 'We visit, check your system and give you a fixed price. The €40 comes off your new boiler.', cta: 'Choose a date & time', note: 'Instant confirmation by email' },
  { id: 'oil', name: 'Oil boiler service', price: '€160', desc: 'Full annual service and safety check.', cta: 'Choose a week', note: 'We ring you to agree the day' },
  { id: 'gas', name: 'Gas boiler service', price: '€220', desc: 'Full annual service by a Registered Gas Installer.', cta: 'Choose a week', note: 'We ring you to agree the day' },
];

const STEPS = [
  { n: 1, title: 'Book online', body: 'Pick a time that suits and pay the €40 survey fee by card.', tag: '2 minutes' },
  { n: 2, title: 'Site survey', body: 'We check your current system and recommend the right boiler for your home.', tag: 'Fixed quote, no surprises' },
  { n: 3, title: 'Installation', body: 'We remove the old boiler and fit the new one, usually in a single day.', tag: '€40 deducted' },
  { n: 4, title: 'Warm home', body: 'Efficient heating, manufacturer warranty and aftercare from us.', tag: 'Annual servicing available' },
];

export default function Home() {
  const [svc, setSvc] = useState('survey');
  const picked = PICKER.find((p) => p.id === svc);

  return (
    <Page>
      <section id="top" className="hero">
        <div className="hero__copy">
          <div className="hero__rating">
            <span className="stars" aria-hidden="true">★★★★★</span>
            <span>Rated 5/5 on Google · 20+ years in Limerick</span>
          </div>
          <h1 className="hero__title">New boiler installation, made simple.</h1>
          <p className="hero__lede">
            Fixed-price oil and gas boiler replacement from <strong>€2,500</strong>, installed in as little as one day.
            Fully insured, RGI and OFTEC certified.
          </p>
          <div className="btn-row">
            <Link to="/book" className="btn btn-primary">Book a €40 site survey</Link>
            <CallButton />
          </div>
          <p className="hero__note">The €40 survey fee comes off your new boiler if you go ahead.</p>
        </div>
        <div className="hero__media">
          <div className="photo"><img src={HERO_PHOTO} alt="Limerick Boilers van" /></div>
          <div className="price-card">
            <span className="price-card__label">Typical gas install</span>
            <span className="price-card__value">€2,500 – €3,500</span>
            <span className="price-card__sub">Oil from €3,200 – €5,500</span>
          </div>
        </div>
      </section>

      <CertStrip />

      <section id="how" className="section how">
        <div className="section-head">
          <span className="eyebrow">How it works</span>
          <h2 className="h2">From booking to a warm home in four steps.</h2>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div key={s.n} className="step-card">
              <span className="step-card__n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <span className="step-card__tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="book" className="band-navy">
        <div className="section book-band">
          <div className="book-band__copy">
            <span className="eyebrow eyebrow--orange">Book online</span>
            <h2 className="h2">Pick what you need. Pay securely. Done.</h2>
            <p>All prices include VAT. Prefer to talk it through? Ring us Monday to Saturday, 9am to 5pm.</p>
            <a href={PHONE_HREF} className="book-band__phone">{PHONE}</a>
          </div>
          <div className="picker-box">
            <span className="picker-box__step">Step 1 of 4 · Choose a service</span>
            <RadioCards
              label="Choose a service" items={PICKER} value={svc} onChange={setSvc}
              render={(o) => (
                <span className="radio-card__body">
                  <span className="radio-card__title"><span>{o.name}</span><span>{o.price}</span></span>
                  <span className="radio-card__desc">{o.desc}</span>
                </span>
              )}
            />
            <Link to={`/book?service=${svc}`} className="btn btn-orange picker-box__cta">{picked.cta} · {picked.price}</Link>
            <span className="picker-box__note">{picked.note}</span>
          </div>
        </div>
      </section>

      <section id="about" className="section installer">
        <div className="installer__copy">
          <span className="eyebrow">Your installer</span>
          <h2 className="h2 balance">David Hayes and team. 20+ years fitting boilers in Limerick.</h2>
          <p className="body">We specialise in oil and gas boiler installation, replacement and servicing for homes across Limerick city and county. Honest advice, a fixed price, and a tidy job.</p>
          <Link to="/about" className="installer__more">More about us →</Link>
        </div>
        <div className="cred-grid">
          {CREDENTIALS.map((c) => (
            <div key={c.v} className="cred-card">
              <img src={c.img} alt={c.v} />
              <div className="cred-card__text">
                <strong>{c.v}</strong>
                <span>{c.k}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="band-sand">
        <div className="section reviews">
          <div className="reviews__head">
            <div className="section-head">
              <span className="eyebrow">Reviews</span>
              <h2 className="h2">What Limerick homeowners say.</h2>
            </div>
            <div className="reviews__score">
              <strong>5.0</strong>
              <span><span className="stars" aria-hidden="true">★★★★★</span>on Google Reviews</span>
            </div>
          </div>
          <div className="review-grid">
            {REVIEWS.map((r) => (
              <figure key={r.n} className="review">
                <span className="stars" aria-hidden="true">★★★★★</span>
                <blockquote>“{r.q}”</blockquote>
                <figcaption><strong>{r.n}</strong><span> · Limerick</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <FinalCta title="Ready for a new boiler? Start with a €40 survey." cta="Book a site survey" />
    </Page>
  );
}

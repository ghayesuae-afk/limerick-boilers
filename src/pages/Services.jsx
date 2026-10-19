import { Link } from 'react-router-dom';
import { Page, CertStrip, FinalCta } from '../components/Layout.jsx';
import { PHONE, PHONE_HREF } from '../content.js';

const INCLUDED = [
  'New boiler supply and installation',
  'Replacement of old or inefficient boilers',
  'Energy-efficient heating solutions',
  'Safe installation by qualified engineers',
  'Full system testing and setup',
  'Advice on the best boiler for your property',
];

const COSTS = [
  { title: 'Oil boiler replacement', price: '€3,200 – €5,500', body: 'Typical installation cost depending on system size and setup.' },
  { title: 'Gas boiler installation', price: '€2,500 – €3,500', body: 'Typical installation cost for modern gas heating systems.' },
  { title: 'Site survey & quote', price: '€40', body: 'We assess your heating system and recommend the best boiler solution.' },
];

const SURVEY_CTA = { label: 'Book a €40 survey', to: '/book?service=survey' };
const OTHERS = [
  { id: 'replacement', name: 'Boiler Replacement', price: 'Oil €3,200 – €5,500 · Gas €2,500 – €3,500', body: 'We remove your old boiler and fit a modern, efficient replacement, usually in one day. The right model for your home, a fixed price before we start, and a tidy finish.', points: ['Old boiler removed', 'Usually one day', 'Manufacturer warranty'], cta: SURVEY_CTA },
  { id: 'repairs', name: 'Boiler Repairs & Diagnostics', price: 'Quoted after diagnosis', body: 'No heat, no hot water, leaks, lockouts or strange noises. We find the fault, explain it plainly and tell you whether a repair or a replacement is the better value.', points: ['Oil and gas', 'Honest repair-or-replace advice', 'Fast response'], cta: { label: `Call ${PHONE}`, href: PHONE_HREF } },
  { id: 'servicing', name: 'Annual Boiler Servicing', price: 'Oil €160 · Gas €220', body: 'A yearly service keeps your boiler safe, efficient and under warranty. Full clean, combustion test, safety checks and a service certificate by email.', points: ['Safety checks', 'Service certificate', 'Keeps warranty valid'], cta: { label: 'Book a service', to: '/book?service=oil' } },
  { id: 'oil', name: 'Oil Boiler Installation & Repairs', price: 'Install €3,200 – €5,500', body: 'OFTEC-certified oil boiler installation, repair and servicing, including condensing upgrades and advice on your tank and fuel line.', points: ['OFTEC certified', 'Grant & Worcester Bosch', 'Tank and line checks'], cta: SURVEY_CTA },
  { id: 'gas', name: 'Gas Boiler Installation & Repairs', price: 'Install €2,500 – €3,500', body: 'Registered Gas Installer for new gas boilers, combi conversions and repairs. Every job is tested, certified and registered as required.', points: ['RGI registered', 'Ideal & Worcester Bosch', 'Combi conversions'], cta: SURVEY_CTA },
];

export default function Services() {
  return (
    <Page>
      <section className="container" style={{ padding: '56px 24px 96px' }}>
        <div className="narrow-col">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span>/</span><span>Services</span><span>/</span><strong>Boiler Installation</strong>
          </div>
          <h1 className="h1">New boiler installation in Limerick.</h1>
          <p className="lede">Our professional boiler installation service ensures your home or business has a reliable and energy-efficient heating system. We supply and install modern boilers designed to provide consistent heating and hot water while helping reduce energy costs. Our experienced engineers handle everything from removing your old boiler to installing and testing your new system.</p>
          <div className="check-list">
            <span className="eyebrow">What's included</span>
            {INCLUDED.map((i) => (
              <div key={i} className="check-list__row"><span className="tick">✓</span><span>{i}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="band-sand">
        <div className="section costs">
          <div className="costs__head">
            <div className="section-head">
              <span className="eyebrow">Typical costs</span>
              <h2 className="h2">Typical boiler replacement costs in Limerick.</h2>
            </div>
            <p className="body">The cost of replacing a boiler can vary depending on the type of system, the size of the home and the existing heating setup. Below are typical price ranges for boiler installations carried out across Limerick.</p>
          </div>
          <div className="cost-grid">
            {COSTS.map((c) => (
              <div key={c.title} className="cost-card">
                <span className="cost-card__title">{c.title}</span>
                <span className="cost-card__price">{c.price}</span>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
          <p className="costs__note">*Prices may vary depending on property size, boiler type and installation requirements.</p>
        </div>
      </section>

      <section id="all-services" className="section all-services">
        <div className="section-head">
          <span className="eyebrow">All services</span>
          <h2 className="h2 h2--sm">Everything we do, oil and gas.</h2>
        </div>
        <div className="svc-list">
          {OTHERS.map((s) => (
            <div key={s.id} id={s.id} className="svc-row">
              <div className="svc-row__head">
                <h3>{s.name}</h3>
                <span className="svc-row__price">{s.price}</span>
              </div>
              <div className="svc-row__body">
                <p>{s.body}</p>
                <div className="chip-row">
                  {s.points.map((p) => <span key={p} className="pill">{p}</span>)}
                </div>
                {s.cta.to
                  ? <Link to={s.cta.to} className="svc-row__cta">{s.cta.label} →</Link>
                  : <a href={s.cta.href} className="svc-row__cta">{s.cta.label} →</a>}
              </div>
            </div>
          ))}
        </div>
        <p className="areas-line">
          We cover Limerick city and county, including Dooradoyle, Raheen, Castletroy and Corbally. <Link to="/about">See all areas</Link>
        </p>
      </section>

      <CertStrip />

      <FinalCta title="Get a fixed price. Start with a €40 survey." text="The survey fee comes off your new boiler." cta="Book a site survey" />
    </Page>
  );
}

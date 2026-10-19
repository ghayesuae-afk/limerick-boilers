import { Page, CertStrip, FinalCta } from '../components/Layout.jsx';
import { HERO_PHOTO, AREAS } from '../content.js';

const STATS = [
  { v: '20+', k: 'Years industry experience' },
  { v: '1000+', k: 'Heating jobs completed' },
  { v: '100%', k: 'Fully insured work' },
];

const CREDS = [
  { k: 'Registered Gas Installer', v: 'RGI' },
  { k: 'Oil heating', v: 'OFTEC certified' },
  { k: 'Grants', v: 'SEAI registered' },
  { k: 'Insurance', v: 'Fully insured' },
];

export default function About() {
  return (
    <Page>
      <section className="hero about-hero">
        <div className="hero__copy about-hero__copy">
          <span className="eyebrow">About Limerick Boilers</span>
          <h1 className="h1">Keeping Limerick homes warm.</h1>
          <p className="lede">Limerick Boilers provides professional oil and gas boiler installation, repairs and servicing for homes across Limerick city and county. With over 20 years experience in the heating industry, we focus on delivering reliable, efficient heating systems and honest advice for homeowners.</p>
          <p className="lede">From new boiler installations to breakdown repairs and annual servicing, our goal is simple: keep your heating running safely and efficiently all year round.</p>
        </div>
        <div className="photo"><img src={HERO_PHOTO} alt="Limerick Boilers van" /></div>
      </section>

      <section className="container" style={{ padding: '0 24px 24px' }}>
        <div className="stats">
          {STATS.map((s) => (
            <div key={s.k} className="stat"><strong>{s.v}</strong><span>{s.k}</span></div>
          ))}
        </div>
      </section>

      <section className="container" style={{ padding: '72px 24px 96px' }}>
        <div className="prose-block">
          <span className="eyebrow">Reliable heating solutions</span>
          <h2 className="h2 h2--sm">Trusted boiler installers in Limerick.</h2>
          <p className="body">Our goal is simple: keep homes across Limerick warm, safe and efficient. Whether installing a new boiler, repairing a breakdown or carrying out annual servicing, we deliver dependable heating solutions with a strong focus on safety, efficiency and customer satisfaction.</p>
          <div className="kv-list">
            {CREDS.map((c) => (
              <div key={c.k} className="kv-list__row"><strong>{c.k}</strong><span>{c.v}</span></div>
            ))}
          </div>
        </div>
      </section>

      <CertStrip />

      <section className="band-sand">
        <div className="section areas">
          <div className="section-head">
            <span className="eyebrow">Where we work</span>
            <h2 className="h2 h2--sm">Boiler installers serving Limerick city &amp; county.</h2>
            <p className="body">We regularly install and repair heating systems across Limerick including:</p>
          </div>
          <div className="area-grid">
            {AREAS.map((a) => (
              <div key={a.region} className="area-card"><h3>{a.region}</h3><p>{a.towns}</p></div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        title="Need a new boiler, repair or service in Limerick?"
        text="Our experienced heating specialists are ready to help. The €40 survey fee comes off your new boiler."
        cta="Book a €40 site survey"
      />
    </Page>
  );
}

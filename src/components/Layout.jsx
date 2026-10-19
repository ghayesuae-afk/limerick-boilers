import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LOGO, PHONE, PHONE_HREF, EMAIL, HOURS, CERT_LOGOS, BRAND_LOGOS } from '../content.js';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Link to="/" className="site-header__logo"><img src={LOGO} alt="Limerick Boilers" /></Link>
        <nav className="site-nav" aria-label="Main">
          {NAV.map((n) => <NavLink key={n.to} to={n.to} end>{n.label}</NavLink>)}
        </nav>
        <div className="site-header__actions">
          <Link to="/book" className="site-header__book">Book now</Link>
          <button
            type="button" className="burger" aria-label="Menu" aria-expanded={open}
            aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="mobile-menu" aria-label="Main">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end className="mobile-menu__link">
              {n.label}<span aria-hidden="true">→</span>
            </NavLink>
          ))}
          <a href={PHONE_HREF} className="mobile-menu__call">Call {PHONE}</a>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <img src={LOGO} alt="Limerick Boilers" />
          <span>© 2026 Limerick Boilers · Serving Limerick city &amp; county</span>
        </div>
        <div className="site-footer__links">
          <a href={PHONE_HREF} className="site-footer__phone">{PHONE}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <span>{HOURS}</span>
          <Link to="/contact">Contact</Link>
          <a href="https://www.limerickboilers.ie/privacy.php">Privacy</a>
        </div>
      </div>
    </footer>
  );
}

export function CertStrip() {
  return (
    <section className="cert-strip">
      <div className="cert-strip__inner">
        <span className="eyebrow eyebrow--muted">Certified &amp; approved</span>
        <div className="cert-strip__logos">
          {CERT_LOGOS.map((l) => <img key={l.alt} className="cert" src={l.src} alt={l.alt} />)}
          <span className="cert-strip__divider" />
          {BRAND_LOGOS.map((l) => <img key={l.alt} className="brand" src={l.src} alt={l.alt} />)}
        </div>
      </div>
    </section>
  );
}

export function CallButton() {
  return <a href={PHONE_HREF} className="btn btn-outline">Call {PHONE}</a>;
}

export function FinalCta({ title, text, cta }) {
  return (
    <section className="section final-cta">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      <div className="btn-row btn-row--center">
        <Link to="/book" className="btn btn-primary">{cta}</Link>
        <CallButton />
      </div>
    </section>
  );
}

export function Page({ children, column = false }) {
  return (
    <div className={column ? 'page page--column' : 'page'}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

// Single-select radio-card group. `items` need `id`; `render` draws the body.
export function RadioCards({ items, value, onChange, label, className = '', render }) {
  return (
    <div role="radiogroup" aria-label={label} style={{ display: 'contents' }}>
      {items.map((it) => (
        <button
          key={it.id} type="button" role="radio" aria-checked={it.id === value}
          className={`radio-card ${className}`} onClick={() => onChange(it.id)}
        >
          <span className="radio-dot" aria-hidden="true" />
          {render(it)}
        </button>
      ))}
    </div>
  );
}

export function Chips({ options, value, onChange, className = '' }) {
  return (
    <div className="chip-row">
      {options.map((t) => (
        <button key={t} type="button" className={`chip ${className}`} aria-pressed={value === t} onClick={() => onChange(t)}>
          {t}
        </button>
      ))}
    </div>
  );
}

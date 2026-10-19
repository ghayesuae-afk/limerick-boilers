// Dev-only preview board (/devices): the live site in a 1280px laptop browser
// window and an iPhone side by side. Both frames are fully interactive.
import { useEffect, useState } from 'react';
import { ChromeWindow } from './ChromeWindow.jsx';
import { IOSDevice } from './IOSDevice.jsx';

const PAGES = [
  { label: 'Home', path: '/', slug: 'home' },
  { label: 'About Us', path: '/about', slug: 'about' },
  { label: 'Services', path: '/services', slug: 'services' },
  { label: 'Contact', path: '/contact', slug: 'contact' },
  { label: 'Book now', path: '/book', slug: 'book' },
];

const frameStyle = { width: '100%', height: '100%', border: 0, display: 'block', background: '#fbfaf7' };

export default function Devices() {
  const [page, setPage] = useState(PAGES[0]);

  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = '#e9e5dc';
    return () => { document.body.style.background = prev; };
  }, []);

  return (
    <div style={{ padding: 48, display: 'flex', flexDirection: 'column', gap: 32, minWidth: 'max-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#5e6870' }}>Page</span>
        {PAGES.map((p) => {
          const on = p === page;
          return (
            <button
              key={p.path} type="button" onClick={() => setPage(p)} aria-pressed={on}
              style={{
                fontSize: 14, fontWeight: 700, cursor: 'pointer', padding: '10px 18px', borderRadius: 999,
                border: `1.5px solid ${on ? '#2574a3' : '#c9c4b8'}`,
                background: on ? '#2574a3' : '#fff', color: on ? '#fff' : '#14202b',
              }}
            >
              {p.label}
            </button>
          );
        })}
        <span style={{ fontSize: 13, color: '#5e6870', marginLeft: 8 }}>Both frames are live. Click through them.</span>
      </div>
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        <ChromeWindow width={1280} height={800} url={`limerickboilers.ie/${page.slug}`} tabs={[{ title: 'Limerick Boilers' }]}>
          <iframe key={page.path} src={page.path} title="Laptop preview" style={frameStyle} />
        </ChromeWindow>
        <IOSDevice>
          <iframe key={page.path} src={`${page.path}?frame=1`} title="Phone preview" style={frameStyle} />
        </IOSDevice>
      </div>
    </div>
  );
}

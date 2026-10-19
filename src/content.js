// Shared business details and copy used across pages.

export const PHONE = '061 785 205';
export const PHONE_HREF = 'tel:+35361785205';
export const EMAIL = 'info@limerickboilers.ie';
export const HOURS = 'Mon–Sat, 9am–5pm';

const ASSETS = 'https://www.limerickboilers.ie/assets/img';
const LOCAL = `${import.meta.env.BASE_URL}images`;
export const LOGO = `${LOCAL}/logo.png`;
export const HERO_PHOTO = `${LOCAL}/hero-van.jpg`;

export const CERT_LOGOS = [
  { src: `${ASSETS}/RGI.png`, alt: 'Registered Gas Installer', short: 'RGI' },
  { src: `${ASSETS}/OFTEC.png`, alt: 'OFTEC', short: 'OFTEC' },
  { src: `${ASSETS}/seai.png`, alt: 'SEAI', short: 'SEAI' },
];
export const BRAND_LOGOS = [
  { src: `${ASSETS}/Grant.png`, alt: 'Grant', short: 'Grant' },
  { src: `${ASSETS}/ideal.png`, alt: 'Ideal', short: 'Ideal' },
  { src: `${ASSETS}/BoschWorchester.png`, alt: 'Worcester Bosch', short: 'Worcester Bosch' },
];

export const CREDENTIALS = [
  { v: 'RGI registered', k: 'Registered Gas Installer for all gas work', img: `${ASSETS}/RGI.png`, short: 'RGI' },
  { v: 'OFTEC certified', k: 'Qualified for oil heating installs and servicing', img: `${ASSETS}/OFTEC.png`, short: 'OFTEC' },
  { v: 'SEAI registered', k: 'Eligible for heating upgrade grants', img: `${ASSETS}/seai.png`, short: 'SEAI' },
  { v: 'Fully insured', k: 'Public liability cover on every job', img: LOGO },
];

// The three bookable services. `id` is used in /book?service=<id>.
export const SERVICES = [
  {
    id: 'survey', name: 'New boiler site survey', price: '€40', amount: 40,
    desc: 'One of our team visits, checks your system and gives you a fixed price. The €40 comes off your new boiler if you go ahead.',
    how: 'You pick the exact day and time',
  },
  {
    id: 'oil', name: 'Oil boiler service', price: '€160', amount: 160,
    desc: 'Full annual service and safety check, incl. VAT.',
    how: 'You pick a week, we ring to agree the day',
  },
  {
    id: 'gas', name: 'Gas boiler service', price: '€220', amount: 220,
    desc: 'Full annual service by a Registered Gas Installer, incl. VAT.',
    how: 'You pick a week, we ring to agree the day',
  },
];

export const REVIEWS = [
  { n: 'Brian Harte', q: "Top class service from Dave and his team. Nothing is a problem for him and his crew, couldn't recommend them enough. Dave discussed various options with us to suit our budget. His plumber George treated our home as if it was his own." },
  { n: 'Andrew Lowe', q: "Top quality service from very professional service providers. This business have provided us with boiler and plumbing services for many years and we just wouldn't use anyone else." },
  { n: 'Neilus Brouder', q: 'Top class team of friendly professionals with an abundance of knowledge and expertise. Would highly recommend.' },
  { n: 'Jimmy Sheehan', q: 'Very professional and efficient service. Experts in their field. Highly recommended.' },
];

const j = (a) => a.join(' · ');
export const AREAS = [
  { region: 'Limerick City', towns: j(['Limerick City Centre', 'Castletroy', 'Annacotty', 'Monaleen', 'Corbally', 'Caherdavin', 'Ennis Road', 'North Circular Road', 'South Circular Road', 'Dooradoyle', 'Raheen', 'Mungret', 'Patrickswell']) },
  { region: 'West Limerick', towns: j(['Newcastle West', 'Rathkeale', 'Croagh', 'Ardagh', 'Kilcolman', 'Askeaton', 'Foynes', 'Shanagolden', 'Glin', 'Abbeyfeale', 'Templeglantine', 'Tournafulla', 'Mountcollins']) },
  { region: 'East Limerick', towns: j(['Castleconnell', 'Lisnagry', 'Ahane', 'Murroe', 'Cappamore', 'Doon', 'Kilteely', 'Pallasgreen', 'Oola']) },
  { region: 'South Limerick', towns: j(['Bruff', 'Kilmallock', 'Hospital', 'Knocklong', 'Ballylanders', 'Galbally', 'Elton', 'Ballingarry']) },
];

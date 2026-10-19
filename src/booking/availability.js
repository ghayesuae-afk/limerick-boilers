// Placeholder availability. Replace with data from the real diary/back end:
// the booking page only relies on the functions exported here.

export const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const DOWL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// [label, 0 = morning | 1 = afternoon, hour (24h)]
export const TIMES = [['9am', 0, 9], ['10am', 0, 10], ['12pm', 0, 12], ['2pm', 1, 14], ['4pm', 1, 16]];

// Survey calendar shows this week plus two more; services offer weeks 1–4.
export const SURVEY_WEEKS = 3;
export const SERVICE_WEEKS = [1, 2, 3, 4];

// Eircode routing keys we cover.
export const COVER = ['V94', 'V35', 'V42'];

const today = new Date();
today.setHours(0, 0, 0, 0);
// Monday of the current week.
const BASE = new Date(today);
BASE.setDate(BASE.getDate() - ((BASE.getDay() + 6) % 7));

export const dayAt = (w, i) => { const d = new Date(BASE); d.setDate(d.getDate() + w * 7 + i); return d; };

// Tue–Thu every week, Fri except week 1; never today or earlier.
export const isDayAvailable = (w, i) => dayAt(w, i) > today && ((i >= 1 && i <= 3) || (i === 4 && w !== 1));

export const isSlotTaken = (d, t) => ((d.getDate() * 3 + t * 5) % 7) < 2;

export const weekNote = (w) => (w === 1 ? 'Few days left' : 'Good availability');

export function nextAvailable() {
  for (let w = 0; w < SURVEY_WEEKS; w++) {
    for (let i = 0; i < 6; i++) {
      if (!isDayAvailable(w, i)) continue;
      const d = dayAt(w, i);
      const t = TIMES.findIndex((_, k) => !isSlotTaken(d, k));
      if (t >= 0) return { w, i, t, d };
    }
  }
  return null;
}

export const isCovered = (eircode) => COVER.includes(eircode.replace(/\s/g, '').toUpperCase().slice(0, 3));

export const fmtShort = (d) => `${DOW[(d.getDay() + 6) % 7]} ${d.getDate()} ${MON[d.getMonth()]}`;
export const fmtLong = (d) => `${DOWL[(d.getDay() + 6) % 7]} ${d.getDate()} ${MON[d.getMonth()]}`;
export const fmtDayMonth = (d) => `${d.getDate()} ${MON[d.getMonth()]}`;

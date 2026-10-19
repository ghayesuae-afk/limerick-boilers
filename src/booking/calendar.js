// Builds and downloads an .ics file for the "Add to calendar" button.

const pad = (n) => String(n).padStart(2, '0');
const stamp = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
const dateOnly = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const esc = (s) => s.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

// `start`/`end` are local Date objects. With `allDay`, `end` is exclusive.
export function downloadIcs({ title, description, location, start, end, allDay = false, uid }) {
  const when = allDay
    ? [`DTSTART;VALUE=DATE:${dateOnly(start)}`, `DTEND;VALUE=DATE:${dateOnly(end)}`]
    : [`DTSTART;TZID=Europe/Dublin:${stamp(start)}`, `DTEND;TZID=Europe/Dublin:${stamp(end)}`];
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Limerick Boilers//Booking//EN', 'BEGIN:VEVENT',
    `UID:${uid}@limerickboilers.ie`, `DTSTAMP:${stamp(new Date())}`, ...when,
    `SUMMARY:${esc(title)}`, `DESCRIPTION:${esc(description)}`, `LOCATION:${esc(location)}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'limerick-boilers-booking.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

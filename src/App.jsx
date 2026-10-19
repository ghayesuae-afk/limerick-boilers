import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Contact from './pages/Contact.jsx';
import Book from './pages/Book.jsx';

// Laptop + phone preview board. Dev-only: the import is dropped from
// production builds because import.meta.env.DEV is statically false there.
const Devices = import.meta.env.DEV ? lazy(() => import('./devices/Devices.jsx')) : null;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />
        {Devices && (
          <Route path="/devices" element={<Suspense fallback={null}><Devices /></Suspense>} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

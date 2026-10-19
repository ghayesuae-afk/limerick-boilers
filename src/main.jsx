import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles.css';

// `?frame=1` is set by the /devices preview when a page is shown inside the
// iPhone mockup. The iframe has no real safe-area insets, so we fake them.
// Read once at boot so the flag survives in-app navigation.
if (new URLSearchParams(window.location.search).has('frame')) {
  document.documentElement.dataset.framed = '';
}

// The shareable preview build (`--mode artifact`) is served as static files
// with no server-side routing, so it routes on the URL hash instead.
const Router = import.meta.env.MODE === 'artifact' ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
);

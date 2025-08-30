import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Polyfill: prevent "process is not defined" in browser bundles
const g = globalThis as any;
if (typeof g.process === 'undefined') {
  g.process = { env: {} };
}

createRoot(document.getElementById("root")!).render(<App />);

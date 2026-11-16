import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Vite sirve la plantilla sin prerenderizar durante el desarrollo.
if (import.meta.env.DEV) {
  createRoot(root).render(app);
} else {
  hydrateRoot(root, app);
}

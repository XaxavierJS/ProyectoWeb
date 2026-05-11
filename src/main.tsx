/**
 * @file main.tsx
 * @description Punto de entrada de la aplicación React. Monta el componente
 *   raíz App en el elemento #root del DOM.
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
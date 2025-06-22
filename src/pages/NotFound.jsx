import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Página 404: ruta no encontrada.
 */
export function NotFound() {
  return (
    <main>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la ruta que buscas no existe.</p>
      <p>
        <Link to="/">Volver al inicio</Link>
      </p>
    </main>
  );
}

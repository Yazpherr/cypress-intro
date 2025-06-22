// src/App.jsx
import React from 'react';
import { AppRouter } from './router/AppRouter';
import { Toaster } from 'sonner';

/**
 * Punto de entrada de la aplicación.
 * Aquí solo se define el layout global y las rutas.
 */
export default function App() {
  return (
    <>
      <Toaster />
      <AppRouter />
    </>
  );
}

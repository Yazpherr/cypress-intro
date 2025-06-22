// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { NotFound } from '../pages/NotFound';
import  Contact  from '../pages/Contact';
import { CharacterDetail } from '../pages/CharacterDetail';

/**
 * Componente encargado de todas las rutas de la aplicación.
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />

        {/* Ruta de ejemplo adicional */}
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/character/:id" element={<CharacterDetail />} />


        {/* Ruta catch-all para 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchCharacters } from '../hooks/useFetchCharacters';

/**
 * Página principal: muestra personajes de Rick & Morty paginados.
 */
export function Home() {
  const { characters, info, loading, error, page, setPage } =
    useFetchCharacters();

  if (loading) return <p>Cargando personajes…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <h1>Rick & Morty Characters</h1>
      <ul>
        {characters.map((char) => (
          <li key={char.id}>
            <Link to={`/character/${char.id}`}>{char.name}</Link>
          </li>
        ))}
      </ul>
      {/* Solo mostrar la paginación si info existe */}
      {info && (
        <nav aria-label="Paginación">
          <button onClick={() => setPage(page - 1)} disabled={!info.prev}>
            Anterior
          </button>
          <span>
            Página {page} de {info.pages}
          </span>
          <button onClick={() => setPage(page + 1)} disabled={!info.next}>
            Siguiente
          </button>
        </nav>
      )}
    </main>
  );
}

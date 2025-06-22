import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchCharacterById } from '../hooks/useFetchCharacterById';

/**
 * Muestra los detalles de un personaje de Rick & Morty.
 */
export function CharacterDetail() {
  const { id } = useParams();
  const { character, loading, error } = useFetchCharacterById(id);

  if (loading) return <p>Cargando personaje…</p>;
  if (error)   return <p>Error: {error.message}</p>;
  if (!character) return <p>No se encontró el personaje.</p>;

  const { name, status, species, gender, origin, location, image } = character;

  return (
    <main>
      <h1>{name}</h1>
      <img src={image} alt={name} />
      <ul>
        <li><strong>Estado:</strong> {status}</li>
        <li><strong>Especie:</strong> {species}</li>
        <li><strong>Género:</strong> {gender}</li>
        <li><strong>Origen:</strong> {origin?.name}</li>
        <li><strong>Ubicación actual:</strong> {location?.name}</li>
      </ul>
      <p>
        <Link to="/">← Volver al listado</Link>
      </p>
    </main>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchCharacterById } from '../hooks/useFetchCharacterById';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import fondo from '../assets/imagenes/fondo-rick-morty-2.jpg';
import { Button } from '../components/Button/Button';

/**
 * Muestra los detalles de un personaje de Rick & Morty.
 */
export function CharacterDetail() {
  const { id } = useParams();
  const { character, loading, error } = useFetchCharacterById(id);

  if (loading) {
    return (
      <main
        style={{
          minHeight: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Spinner
            animation="border"
            role="status"
            style={{ width: 60, height: 60, marginBottom: 16 }}
          >
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 20 }}>
            Cargando personaje…
          </div>
        </div>
      </main>
    );
  }
  if (error) return <p>Error: {error.message}</p>;
  if (!character) return <p>No se encontró el personaje.</p>;

  const { name, status, species, gender, origin, location, image } = character;

  return (
    <main
      style={{
        maxHeight: '100vh',
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <Card
        style={{
          minHeight: '90vh',
          maxWidth: 400,
          width: '100%',
          boxShadow: '0 4px 24px #0004',
          background: 'rgba(255,255,255,0.97)',
          borderRadius: 20,
        }}
      >
        <Card.Img
          variant="top"
          src={image}
          alt={name}
          style={{
            objectFit: 'cover',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
        <Card.Body>
          <Card.Title style={{ textAlign: 'center', fontWeight: 700 }}>
            {name}
          </Card.Title>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0' }}>
            <li>
              <strong>Estado:</strong> {status}
            </li>
            <li>
              <strong>Especie:</strong> {species}
            </li>
            <li>
              <strong>Género:</strong> {gender}
            </li>
            <li>
              <strong>Origen:</strong> {origin?.name}
            </li>
            <li>
              <strong>Ubicación actual:</strong> {location?.name}
            </li>
          </ul>
          <div style={{ textAlign: 'center' }}>
            <Link to="/">
              <Button>← Volver al listado</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </main>
  );
}

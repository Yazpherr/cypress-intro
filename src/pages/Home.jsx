import { Link } from 'react-router-dom';
import { useFetchCharacters } from '../hooks/useFetchCharacters';
import Table from 'react-bootstrap/Table';
import { Button } from '../components/Button/Button';
import fondo from '../assets/imagenes/fondo-rick-and-morty.jpg';

/**
 * Página principal: muestra personajes de Rick & Morty paginados.
 */
export function Home() {
  const { characters, info, loading, error, page, setPage } =
    useFetchCharacters();

  if (loading) return <p>Cargando personajes…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: 32,
          paddingTop: 32,
          color: '#fff',
          textShadow: '0 2px 8px #000',
        }}
      >
        Personajes de Rick & Morty
      </h1>
      <div
        style={{
          margin: '0 auto',
          maxWidth: 900,
          background: 'rgba(255,255,255,0.92)',
          borderRadius: 16,
          padding: 24,
        }}
      >
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Personaje</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((char) => (
              <tr key={char.id}>
                <td>
                  <img
                    src={char.image}
                    alt={char.name}
                    style={{
                      width: 60,
                      borderRadius: '50%',
                    }}
                  />
                </td>
                <td>{char.name}</td>
                <td>
                  <Link to={`/character/${char.id}`}>
                    <Button>Ver más detalles</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Solo mostrar la paginación si info existe */}
      {info && (
        <nav
          aria-label="Paginación"
          style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={() => setPage(page - 1)}
            disabled={!info.prev}
            style={{ marginRight: 8 }}
          >
            Anterior
          </Button>
          <span style={{ margin: '0 12px', color: '#fff' }}>
            Página {page} de {info.pages}
          </span>
          <Button onClick={() => setPage(page + 1)} disabled={!info.next}>
            Siguiente
          </Button>
        </nav>
      )}
    </main>
  );
}

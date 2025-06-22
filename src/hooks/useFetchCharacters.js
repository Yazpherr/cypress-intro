import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { fetchCharactersByPage } from '../services/api';

/**
 * Hook para obtener y paginar personajes de Rick and Morty.
 *
 * @param {number} initialPage — Página inicial (por defecto 1).
 * @returns {{
 *   characters: Array,
 *   info: object|null,
 *   loading: boolean,
 *   error: Error|null,
 *   page: number,
 *   setPage: Function
 * }}
 */
export function useFetchCharacters(initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPage = useCallback(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    setError(null);

    fetchCharactersByPage(page, source.token)
      .then(data => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch(err => {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    // Retornamos la función de limpieza para cancelar la petición
    return () => source.cancel('Component unmounted');
  }, [page]);

  useEffect(() => {
    const cancelLoad = loadPage();
    return cancelLoad;
  }, [loadPage]);

  return { characters, info, loading, error, page, setPage };
}

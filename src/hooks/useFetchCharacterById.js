import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { fetchCharacterById } from '../services/api';

/**
 * Hook para obtener un personaje por ID.
 * @param {number|string} id — ID del personaje.
 * @returns {{
 *   character: object|null,
 *   loading: boolean,
 *   error: Error|null
 * }}
 */
export function useFetchCharacterById(id) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const load = useCallback(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    setError(null);

    fetchCharacterById(id, source.token)
      .then(data => setCharacter(data))
      .catch(err => {
        if (!axios.isCancel(err)) setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => source.cancel('Component unmounted');
  }, [id]);

  useEffect(() => {
    const cancel = load();
    return cancel;
  }, [load]);

  return { character, loading, error };
}

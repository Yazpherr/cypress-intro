import axios from 'axios';

// Instancia de Axios apuntando a la API de Rick and Morty.
// Usa la variable de entorno o, si no existe, el endpoint oficial.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://rickandmortyapi.com/api',
  timeout: 5000,
});

/**
 * Obtiene los datos de un solo personaje por su ID.
 * @param {number|string} id — ID del personaje.
 * @param {CancelToken} cancelToken — Token para cancelar la petición.
 * @returns {Promise<object>} — Objeto con la info del personaje.
 */
export function fetchCharacterById(id, cancelToken) {
  return api.get(`/character/${id}`, { cancelToken }).then((res) => res.data);
}

/**
 * Obtiene personajes por página.
 * @param {number} page — Número de página (por defecto 1).
 * @param {CancelToken} cancelToken — Token para cancelar la petición.
 * @returns {Promise<{ info: object, results: Array }>}
 */
export function fetchCharactersByPage(page = 1, cancelToken) {
  return api
    .get('/character', { params: { page }, cancelToken })
    .then((response) => response.data);
}

export default api;

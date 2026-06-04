/**
 * @file http.ts
 * @description Cliente HTTP genérico para consumir la API REST.
 *   Incluye manejo de tokens JWT, cabeceras automáticas y
 *   gestión centralizada de errores.
 */

const API_BASE = import.meta.env.VITE_API_BASE ?? '';
const TOKEN_KEY = 'ciberescudo_token';

/** Obtiene el token JWT desde localStorage */
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

/** Guarda el token JWT en localStorage */
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

/** Elimina el token JWT de localStorage */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

/** Opciones extendidas para peticiones API */
export interface ApiRequestOptions extends RequestInit {
  body?: BodyInit | null;
}

/**
 * Realiza una petición a la API con manejo de autenticación y errores.
 * @param path — Ruta relativa (ej: '/auth/login')
 * @param options — Opciones fetch adicionales
 * @returns Respuesta parseada como JSON
 */
export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> ?? {}),
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/api${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.error || 'Error en la comunicación con el backend');
  }

  return response.json();
}

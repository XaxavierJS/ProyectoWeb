/**
 * @file auth.ts
 * @description Servicio de autenticación del frontend. Guarda un token JWT
 *   en localStorage y expone utilidades reutilizables para las rutas privadas.
 */
const TOKEN_KEY = 'ciberescudo_token';
const ROLE_KEY = 'ciberescudo_role';

export const authService = {
  isLoggedIn: (): boolean => {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },

  getRole: (): 'user' | 'admin' | null => {
    return (localStorage.getItem(ROLE_KEY) as 'user' | 'admin') ?? null;
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  login: (tokenOrRole: string, role?: 'user' | 'admin') => {
    if (role) {
      localStorage.setItem(TOKEN_KEY, tokenOrRole);
      localStorage.setItem(ROLE_KEY, role);
      return;
    }

    // Compatibilidad con el flujo mock actual.
    localStorage.setItem(TOKEN_KEY, 'mock-token');
    localStorage.setItem(ROLE_KEY, tokenOrRole as 'user' | 'admin');
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  },
};

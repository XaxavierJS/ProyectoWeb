/**
 * @file auth.ts
 * @description Servicio de autenticación mock via localStorage. Claves:
 *   mockLogged (boolean) y mockRole (user | admin). Reemplazar con llamadas
 *   reales a API cuando se integre un backend de autenticación.
 */
export const authService = {
  isLoggedIn: (): boolean => {
    return localStorage.getItem('mockLogged') === 'true';
  },
  getRole: (): string | null => {
    return localStorage.getItem('mockRole');
  },
  login: (role: 'user' | 'admin') => {
    localStorage.setItem('mockLogged', 'true');
    localStorage.setItem('mockRole', role);
  },
  logout: () => {
    localStorage.removeItem('mockLogged');
    localStorage.removeItem('mockRole');
  }
};

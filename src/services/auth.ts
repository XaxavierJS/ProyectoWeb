/**
 * @file auth.ts
 * @description Servicio de autenticación del frontend. Guarda token JWT,
 *   rol y datos del usuario en localStorage.
 */
const TOKEN_KEY    = 'ciberescudo_token';
const ROLE_KEY     = 'ciberescudo_role';
const USER_KEY     = 'ciberescudo_user';
const REGISTRO_KEY = 'ciberescudo_registro';

export interface UserInfo {
  username: string;
  email: string;
}

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

  getUserInfo: (): UserInfo | null => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  setUserInfo: (info: UserInfo) => {
    localStorage.setItem(USER_KEY, JSON.stringify(info));
  },

  /** Guarda datos de registro para usarlos en el login mock */
  guardarRegistro: (info: UserInfo) => {
    localStorage.setItem(REGISTRO_KEY, JSON.stringify(info));
  },

  /** Obtiene datos guardados del registro */
  obtenerRegistro: (): UserInfo | null => {
    const raw = localStorage.getItem(REGISTRO_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  login: (tokenOrRole: string, role?: 'user' | 'admin', userInfo?: UserInfo) => {
    if (role) {
      localStorage.setItem(TOKEN_KEY, tokenOrRole);
      localStorage.setItem(ROLE_KEY, role);
      if (userInfo) localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
      return;
    }

    /* Fallback mock: usar datos de registro si existen */
    const registro = authService.obtenerRegistro();
    localStorage.setItem(TOKEN_KEY, 'mock-token');
    localStorage.setItem(ROLE_KEY, tokenOrRole as 'user' | 'admin');
    localStorage.setItem(USER_KEY, JSON.stringify(
      registro ?? {
        username: tokenOrRole === 'admin' ? 'admin_ciberseguridad' : 'usuario_normal',
        email: tokenOrRole === 'admin' ? 'admin@plataforma.cl' : 'usuario@correo.cl',
      }
    ));
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

/**
 * @file auth.ts
 * @brief API de autenticación — login, registro y sesión actual.
 */

import { apiRequest, setToken } from './http';
import { authService } from '../auth';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserSession {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: 'user' | 'admin';
    status: string;
  };
}

/** Servicio de autenticación contra la API */
export const authApi = {
  /** Inicia sesión y almacena el JWT en localStorage */
  login: async (payload: LoginPayload): Promise<UserSession> => {
    const session = await apiRequest<UserSession>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setToken(session.token);
    authService.login(session.token, session.user.role);
    return session;
  },

  /** Registra un nuevo usuario en la plataforma */
  register: async (data: { username: string; email: string; password: string }): Promise<{ user: { id: number; username: string; email: string; role: string; status: string } }> => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /** Obtiene los datos del usuario autenticado */
  me: async () => {
    return apiRequest('/users/me');
  },
};

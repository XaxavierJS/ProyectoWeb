/**
 * @file users.ts
 * @brief API de usuarios — perfil, progreso y listado (admin).
 */

import { apiRequest } from './http';

/** Servicio de usuarios contra la API */
export const usersApi = {
  /** Obtiene los datos del usuario autenticado */
  me: async () => {
    return apiRequest('/users/me');
  },

  /** Obtiene el progreso del usuario autenticado en todos los módulos */
  meProgress: async () => {
    return apiRequest('/users/me/progress');
  },

  /** Lista todos los usuarios (solo administradores) */
  listAll: async () => {
    return apiRequest('/users');
  },
};

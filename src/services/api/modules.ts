/**
 * @file modules.ts
 * @brief API de módulos educativos — listado, detalle y progreso.
 */

import { apiRequest } from './http';
import type { Module } from './types';

/** Servicio de módulos contra la API */
export const modulesApi = {
  /** Obtiene el listado completo de módulos disponibles */
  list: async (): Promise<Module[]> => {
    return apiRequest('/modules');
  },

  /** Obtiene el detalle de un módulo por su ID */
  getById: async (id: number): Promise<Module> => {
    return apiRequest(`/modules/${id}`);
  },

  /** Actualiza el progreso del usuario en un módulo */
  updateProgress: async (moduleId: number, completed: boolean) => {
    return apiRequest(`/modules/${moduleId}/progress`, {
      method: 'POST',
      body: JSON.stringify({ completed }),
    });
  },
};

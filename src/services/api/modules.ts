import { apiRequest } from './http';
import type { Module } from './types';

export const modulesApi = {
  list: async (): Promise<Module[]> => {
    return apiRequest('/modules');
  },

  getById: async (id: number): Promise<Module> => {
    return apiRequest(`/modules/${id}`);
  },

  updateProgress: async (moduleId: number, completed: boolean) => {
    return apiRequest(`/modules/${moduleId}/progress`, {
      method: 'POST',
      body: JSON.stringify({ completed }),
    });
  },
};

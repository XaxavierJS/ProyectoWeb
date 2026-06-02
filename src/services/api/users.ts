import { apiRequest } from './http';

export const usersApi = {
  me: async () => {
    return apiRequest('/users/me');
  },

  meProgress: async () => {
    return apiRequest('/users/me/progress');
  },

  listAll: async () => {
    return apiRequest('/users');
  },
};

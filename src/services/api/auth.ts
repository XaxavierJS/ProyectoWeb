import { apiRequest, setToken } from './http';

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

export const authApi = {
  login: async (payload: LoginPayload): Promise<UserSession> => {
    const session = await apiRequest<UserSession>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    setToken(session.token);
    return session;
  },

  register: async (data: { username: string; email: string; password: string }): Promise<{ user: { id: number; username: string; email: string; role: string; status: string } }> => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  me: async () => {
    return apiRequest('/users/me');
  },
};

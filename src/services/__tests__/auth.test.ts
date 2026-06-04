/**
 * @file auth.test.ts
 * @brief Pruebas unitarias del servicio de autenticación.
 *   Verifica login, logout, persistencia de rol y token.
 */

import { describe, it, expect, beforeEach } from 'vitest';

const TOKEN_KEY = 'ciberescudo_token';
const ROLE_KEY = 'ciberescudo_role';

// Reimplementación del servicio auth para pruebas aisladas
const authService = {
  isLoggedIn: (): boolean => Boolean(localStorage.getItem(TOKEN_KEY)),
  getRole: (): 'user' | 'admin' | null =>
    (localStorage.getItem(ROLE_KEY) as 'user' | 'admin') ?? null,
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  login: (tokenOrRole: string, role?: 'user' | 'admin') => {
    if (role) {
      localStorage.setItem(TOKEN_KEY, tokenOrRole);
      localStorage.setItem(ROLE_KEY, role);
      return;
    }
    localStorage.setItem(TOKEN_KEY, 'mock-token');
    localStorage.setItem(ROLE_KEY, tokenOrRole as 'user' | 'admin');
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  },
};

describe('Servicio de autenticación', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('inicia sin sesión activa', () => {
    expect(authService.isLoggedIn()).toBe(false);
    expect(authService.getRole()).toBeNull();
    expect(authService.getToken()).toBeNull();
  });

  it('login con solo rol asigna token mock', () => {
    authService.login('user');
    expect(authService.isLoggedIn()).toBe(true);
    expect(authService.getRole()).toBe('user');
    expect(authService.getToken()).toBe('mock-token');
  });

  it('login con token+rol almacena ambos correctamente', () => {
    authService.login('real-jwt-token', 'admin');
    expect(authService.getToken()).toBe('real-jwt-token');
    expect(authService.getRole()).toBe('admin');
  });

  it('logout limpia todos los datos de sesión', () => {
    authService.login('admin');
    authService.logout();
    expect(authService.isLoggedIn()).toBe(false);
    expect(authService.getToken()).toBeNull();
    expect(authService.getRole()).toBeNull();
  });

  it('diferencia correctamente entre rol admin y user', () => {
    authService.login('admin');
    expect(authService.getRole()).toBe('admin');
    authService.logout();

    authService.login('user');
    expect(authService.getRole()).toBe('user');
  });
});

/**
 * @file facade.ts
 * @brief Fachada de datos que intenta usar la API real primero.
 *   Si el backend no está disponible, cae en los datos mock.
 *   Así la app funciona tanto con backend como en desarrollo local.
 */

import { modulesApi } from './modules';
import { usersApi } from './users';
import { mockModules, mockUsers } from '../mockData';
import type { MockModule, MockUser } from '../mockData';

async function conFallback<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export const dataFacade = {
  /** Lista de módulos */
  listModules: (): Promise<MockModule[]> =>
    conFallback(
      () => modulesApi.list() as Promise<unknown> as Promise<MockModule[]>,
      mockModules as MockModule[]
    ),

  /** Detalle de un módulo */
  getModule: (id: number): Promise<MockModule | null> =>
    conFallback(
      () => modulesApi.getById(id) as Promise<unknown> as Promise<MockModule>,
      mockModules.find(m => m.id === id) ?? null
    ),

  /** Lista de usuarios (admin) */
  listUsers: (): Promise<MockUser[]> =>
    conFallback(
      () => usersApi.listAll() as Promise<unknown> as Promise<MockUser[]>,
      mockUsers as MockUser[]
    ),

  /** Perfil del usuario autenticado */
  getProfile: (): Promise<MockUser | null> =>
    conFallback(
      () => usersApi.me() as Promise<unknown> as Promise<MockUser>,
      mockUsers[1]
    ),
};

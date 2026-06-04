/**
 * @file user.ts
 * @description Esquemas de validación Zod para usuarios.
 *   Valida los payloads de creación y actualización de usuarios.
 */

import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(2, 'El nombre debe tener al menos 2 caracteres.'),
  email: z.string().email('Correo electrónico inválido.'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  rol: z.enum(['user', 'admin']),
});

export const updateUserSchema = z.object({
  username: z.string().min(2).optional(),
  email: z.string().email().optional(),
  rol: z.enum(['user', 'admin']).optional(),
  estado: z.enum(['activo', 'inactivo']).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

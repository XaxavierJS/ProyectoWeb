/**
 * @file module.ts
 * @description Esquemas de validación Zod para módulos educativos.
 *   Valida los payloads de creación y actualización de módulos.
 */

import { z } from 'zod';

export const createModuleSchema = z.object({
  titulo: z.string().min(3, 'El título debe tener al menos 3 caracteres.'),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres.'),
});

export const updateModuleSchema = z.object({
  titulo: z.string().min(3).optional(),
  descripcion: z.string().min(10).optional(),
});

export type CreateModuleInput = z.infer<typeof createModuleSchema>;
export type UpdateModuleInput = z.infer<typeof updateModuleSchema>;

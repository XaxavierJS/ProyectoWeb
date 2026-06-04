/**
 * @file auth.ts
 * @description Rutas de autenticación: registro e inicio de sesión.
 *   Delega la lógica de negocio a authService y la validación
 *   a los esquemas Zod.
 */

import { Router } from 'express';
import { authService } from '../services/authService';
import { loginSchema, registerSchema } from '../validators/auth';
import { ValidationError } from '../errors/AppError';
import { ApiResponse } from '../utils/apiResponse';

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0].message);

    const result = await authService.login(parsed.data);
    ApiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0].message);

    const result = await authService.register(parsed.data);
    ApiResponse.success(res, result, 201);
  } catch (err) {
    next(err);
  }
});

export default router;

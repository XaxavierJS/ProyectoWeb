/**
 * @file users.ts
 * @description Rutas CRUD de usuarios. Todas las rutas protegidas
 *   usan el middleware authenticate. Las operaciones administrativas
 *   verifican rol admin dentro del servicio.
 */

import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { userService } from '../services/userService';
import { createUserSchema, updateUserSchema } from '../validators/user';
import { ValidationError } from '../errors/AppError';
import { ApiResponse } from '../utils/apiResponse';

const router = Router();

router.get('/me', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = await userService.getProfile(req);
    ApiResponse.success(res, user);
  } catch (err) {
    next(err);
  }
});

router.get('/me/progress', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const progress = await userService.getProgress(req);
    ApiResponse.success(res, progress);
  } catch (err) {
    next(err);
  }
});

router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const users = await userService.listAll(req);
    ApiResponse.success(res, users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const user = await userService.getById(req, Number(req.params.id));
    ApiResponse.success(res, user);
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const parsed = createUserSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0].message);

    const user = await userService.create(req, parsed.data);
    ApiResponse.success(res, user, 201);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0].message);

    const user = await userService.update(req, Number(req.params.id), parsed.data);
    ApiResponse.success(res, user);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const parsed = updateUserSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0].message);

    const user = await userService.update(req, Number(req.params.id), parsed.data);
    ApiResponse.success(res, user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const result = await userService.delete(req, Number(req.params.id));
    ApiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
});

export default router;

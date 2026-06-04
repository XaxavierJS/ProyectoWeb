/**
 * @file modules.ts
 * @description Rutas CRUD de módulos educativos. GET son públicas,
 *   POST/PUT/DELETE requieren autenticación.
 */

import { Router } from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { moduleService } from '../services/moduleService';
import { createModuleSchema, updateModuleSchema } from '../validators/module';
import { ValidationError } from '../errors/AppError';
import { ApiResponse } from '../utils/apiResponse';

const router = Router();

router.get('/', async (_req, res, next) => {
  try {
    const modules = await moduleService.listAll();
    ApiResponse.success(res, modules);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const modulo = await moduleService.getById(Number(req.params.id));
    ApiResponse.success(res, modulo);
  } catch (err) {
    next(err);
  }
});

router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const parsed = createModuleSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0].message);

    const modulo = await moduleService.create(parsed.data);
    ApiResponse.success(res, modulo, 201);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const parsed = updateModuleSchema.safeParse(req.body);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0].message);

    const modulo = await moduleService.update(Number(req.params.id), parsed.data);
    ApiResponse.success(res, modulo);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const result = await moduleService.delete(Number(req.params.id));
    ApiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/progress', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { completed } = req.body;
    if (typeof completed !== 'boolean') {
      throw new ValidationError('El campo completed debe ser booleano.');
    }
    const result = await moduleService.updateProgress(Number(req.params.id), completed, req.user!.id);
    ApiResponse.success(res, result);
  } catch (err) {
    next(err);
  }
});

export default router;

/**
 * @file userService.ts
 * @description Servicio de usuarios. Contiene la lógica de negocio
 *   para el CRUD de usuarios y consulta de progreso.
 */

import bcrypt from 'bcrypt';
import { userRepo } from '../repositories/userRepo';
import { NotFoundError, ForbiddenError } from '../errors/AppError';
import type { AuthRequest } from '../middleware/auth';

type UserRow = {
  id: number;
  username: string;
  email: string;
  rol: 'user' | 'admin';
  estado: string;
  fecha_creacion: Date;
};

function mapearUsuario(user: UserRow) {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.rol,
    status: user.estado,
    createdAt: user.fecha_creacion,
  };
}

export const userService = {
  async getProfile(req: AuthRequest) {
    const user = await userRepo.findById(req.user!.id);
    if (!user) throw new NotFoundError('Usuario');
    return mapearUsuario(user);
  },

  async getProgress(req: AuthRequest) {
    return userRepo.findProgress(req.user!.id);
  },

  async listAll(req: AuthRequest) {
    if (req.user?.role !== 'admin') throw new ForbiddenError();
    const users = await userRepo.findAll();
    return users.map(u => mapearUsuario(u as UserRow));
  },

  async getById(req: AuthRequest, id: number) {
    if (req.user?.role !== 'admin') throw new ForbiddenError();
    const user = await userRepo.findById(id);
    if (!user) throw new NotFoundError('Usuario');
    return mapearUsuario(user);
  },

  async create(req: AuthRequest, data: { username: string; email: string; password: string; rol: string }) {
    if (req.user?.role !== 'admin') throw new ForbiddenError();
    const hash = await bcrypt.hash(data.password, 10);
    const user = await userRepo.create({ ...data, password_hash: hash });
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.rol,
      status: user.estado,
    };
  },

  async update(req: AuthRequest, id: number, data: { username?: string; email?: string; rol?: 'user' | 'admin'; estado?: 'activo' | 'inactivo' }) {
    if (req.user?.role !== 'admin') throw new ForbiddenError();
    const user = await userRepo.update(id, data as any);
    if (!user) throw new NotFoundError('Usuario');
    return mapearUsuario(user as UserRow);
  },

  async delete(req: AuthRequest, id: number) {
    if (req.user?.role !== 'admin') throw new ForbiddenError();
    const ok = await userRepo.delete(id);
    if (!ok) throw new NotFoundError('Usuario');
    return { mensaje: 'Usuario eliminado correctamente.' };
  },
};

/**
 * @file authService.ts
 * @description Servicio de autenticación. Contiene la lógica de negocio
 *   para inicio de sesión y registro de usuarios.
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userRepo } from '../repositories/userRepo';
import { UnauthorizedError, ConflictError, ValidationError } from '../errors/AppError';
import type { LoginInput, RegisterInput } from '../validators/auth';

const JWT_SECRET = process.env.JWT_SECRET ?? 'default-development-secret';

export const authService = {
  async login(data: LoginInput) {
    const user = await userRepo.findByEmail(data.email);
    if (!user) throw new UnauthorizedError('Credenciales inválidas.');

    const valida = await bcrypt.compare(data.password, user.password_hash);
    if (!valida) throw new UnauthorizedError('Credenciales inválidas.');

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.rol },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.rol,
        status: user.estado,
      },
    };
  },

  async register(data: RegisterInput) {
    const existe = await userRepo.findByEmail(data.email);
    if (existe) throw new ConflictError('Ya existe un usuario con ese correo.');

    const hash = await bcrypt.hash(data.password, 10);
    const user = await userRepo.create({
      username: data.username,
      email: data.email,
      password_hash: hash,
      rol: 'user',
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.rol,
        status: user.estado,
      },
    };
  },
};

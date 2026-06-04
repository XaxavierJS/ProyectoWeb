/**
 * @file userRepo.ts
 * @description Repositorio de usuarios. Encapsula todas las consultas
 *   SQL relacionadas con la tabla usuarios.
 */

import { pool } from '../db';

export interface UserRow {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  rol: 'user' | 'admin';
  estado: string;
  fecha_creacion: Date;
}

export const userRepo = {
  async findByEmail(email: string): Promise<UserRow | null> {
    const result = await pool.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      [email]
    );
    return result.rows[0] ?? null;
  },

  async findById(id: number): Promise<Omit<UserRow, 'password_hash'> | null> {
    const result = await pool.query(
      `SELECT id, username, email, rol, estado, fecha_creacion FROM usuarios WHERE id = $1`,
      [id]
    );
    return result.rows[0] ?? null;
  },

  async findAll(): Promise<Omit<UserRow, 'password_hash'>[]> {
    const result = await pool.query(
      `SELECT id, username, email, rol, estado, fecha_creacion FROM usuarios ORDER BY id`
    );
    return result.rows;
  },

  async create(data: {
    username: string;
    email: string;
    password_hash: string;
    rol: string;
  }): Promise<Omit<UserRow, 'password_hash'>> {
    const result = await pool.query(
      `INSERT INTO usuarios (username, email, password_hash, rol, estado)
       VALUES ($1, $2, $3, $4, 'activo')
       RETURNING id, username, email, rol, estado`,
      [data.username, data.email, data.password_hash, data.rol]
    );
    return result.rows[0];
  },

  async update(
    id: number,
    data: Partial<Pick<UserRow, 'username' | 'email' | 'rol' | 'estado'>>
  ): Promise<Omit<UserRow, 'password_hash'> | null> {
    const campos: string[] = [];
    const valores: unknown[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        campos.push(`${key} = $${idx++}`);
        valores.push(value);
      }
    }

    if (campos.length === 0) return this.findById(id);

    valores.push(id);
    const result = await pool.query(
      `UPDATE usuarios SET ${campos.join(', ')} WHERE id = $${idx}
       RETURNING id, username, email, rol, estado`,
      valores
    );
    return result.rows[0] ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM usuarios WHERE id = $1 RETURNING id`,
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  },

  async findProgress(userId: number): Promise<{ modulo_id: number; titulo: string; completado: boolean }[]> {
    const result = await pool.query(
      `SELECT p.modulo_id, m.titulo, p.completado
       FROM progreso_usuario p
       JOIN modulos m ON p.modulo_id = m.id
       WHERE p.usuario_id = $1`,
      [userId]
    );
    return result.rows;
  },
};

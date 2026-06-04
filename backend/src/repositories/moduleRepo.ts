/**
 * @file moduleRepo.ts
 * @description Repositorio de módulos educativos. Encapsula todas las
 *   consultas SQL relacionadas con módulos, secciones, videos, fuentes y quizzes.
 */

import { pool } from '../db';

export interface ModuleRow {
  id: number;
  titulo: string;
  descripcion: string;
  activo: boolean;
  fecha_creacion: Date;
}

export const moduleRepo = {
  async findAll(): Promise<ModuleRow[]> {
    const result = await pool.query(
      `SELECT id, titulo, descripcion, activo, fecha_creacion FROM modulos ORDER BY id`
    );
    return result.rows;
  },

  async findById(id: number): Promise<ModuleRow | null> {
    const result = await pool.query(
      `SELECT * FROM modulos WHERE id = $1`,
      [id]
    );
    return result.rows[0] ?? null;
  },

  async findVideos(moduleId: number): Promise<{ id: number; url: string }[]> {
    const result = await pool.query(
      `SELECT id, url FROM videos WHERE modulo_id = $1`,
      [moduleId]
    );
    return result.rows;
  },

  async findSecciones(moduleId: number): Promise<{ id: number; titulo: string; contenido: string }[]> {
    const result = await pool.query(
      `SELECT id, titulo, contenido FROM secciones WHERE modulo_id = $1 ORDER BY id`,
      [moduleId]
    );
    return result.rows;
  },

  async findFuentes(moduleId: number): Promise<{ id: number; titulo: string; autor: string; url: string }[]> {
    const result = await pool.query(
      `SELECT id, titulo, autor, url FROM fuentes WHERE modulo_id = $1`,
      [moduleId]
    );
    return result.rows;
  },

  async findQuiz(moduleId: number) {
    const quiz = await pool.query(
      `SELECT * FROM quizzes WHERE modulo_id = $1`,
      [moduleId]
    );

    if (!quiz.rows[0]) return null;

    const opciones = await pool.query(
      `SELECT id, texto FROM opciones_quiz WHERE quiz_id = $1 ORDER BY id`,
      [quiz.rows[0].id]
    );

    return {
      id: quiz.rows[0].id,
      pregunta: quiz.rows[0].pregunta,
      respuesta_correcta: quiz.rows[0].respuesta_correcta,
      opciones: opciones.rows,
    };
  },

  async create(data: { titulo: string; descripcion: string }): Promise<ModuleRow> {
    const result = await pool.query(
      `INSERT INTO modulos (titulo, descripcion) VALUES ($1, $2) RETURNING *`,
      [data.titulo, data.descripcion]
    );
    return result.rows[0];
  },

  async update(id: number, data: { titulo?: string; descripcion?: string }): Promise<ModuleRow | null> {
    const campos: string[] = [];
    const valores: unknown[] = [];
    let idx = 1;

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        campos.push(`${key} = $${idx++}`);
        valores.push(value);
      }
    }

    if (campos.length === 0) {
      const result = await pool.query(`SELECT * FROM modulos WHERE id = $1`, [id]);
      return result.rows[0] ?? null;
    }

    valores.push(id);
    const result = await pool.query(
      `UPDATE modulos SET ${campos.join(', ')} WHERE id = $${idx} RETURNING *`,
      valores
    );
    return result.rows[0] ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM modulos WHERE id = $1 RETURNING id`,
      [id]
    );
    return (result.rowCount ?? 0) > 0;
  },
};

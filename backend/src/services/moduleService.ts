/**
 * @file moduleService.ts
 * @description Servicio de módulos educativos. Contiene la lógica de
 *   negocio para el CRUD de módulos y consulta de detalle completo.
 */

import { moduleRepo, ModuleRow } from '../repositories/moduleRepo';
import { NotFoundError } from '../errors/AppError';

function mapearModulo(
  modulo: ModuleRow,
  extras?: {
    videos?: { id: number; url: string }[];
    secciones?: { id: number; titulo: string; contenido: string }[];
    fuentes?: { id: number; titulo: string; autor: string; url: string }[];
    quiz?: {
      id: number;
      pregunta: string;
      respuesta_correcta: number;
      opciones: { id: number; texto: string }[];
    } | null;
  }
) {
  const result: Record<string, unknown> = {
    id: modulo.id,
    title: modulo.titulo,
    description: modulo.descripcion,
    active: modulo.activo,
    createdAt: modulo.fecha_creacion,
  };

  if (extras) {
    if (extras.videos) {
      result.videoUrl = extras.videos.length > 0 ? extras.videos[0].url : undefined;
    }
    if (extras.secciones) {
      result.sections = extras.secciones.map(s => ({ title: s.titulo, body: s.contenido }));
    }
    if (extras.fuentes) {
      result.sources = extras.fuentes.map(f => ({ title: f.titulo, author: f.autor, url: f.url }));
    }
    if (extras.quiz) {
      result.quiz = {
        question: extras.quiz.pregunta,
        options: extras.quiz.opciones.map(o => o.texto),
        answerIndex: extras.quiz.respuesta_correcta,
      };
    }
  }

  return result;
}

export const moduleService = {
  async listAll() {
    const modules = await moduleRepo.findAll();
    return modules.map(m => mapearModulo(m));
  },

  async getById(id: number) {
    const modulo = await moduleRepo.findById(id);
    if (!modulo) throw new NotFoundError('Módulo');

    const [videos, secciones, fuentes, quiz] = await Promise.all([
      moduleRepo.findVideos(id),
      moduleRepo.findSecciones(id),
      moduleRepo.findFuentes(id),
      moduleRepo.findQuiz(id),
    ]);

    return mapearModulo(modulo, { videos, secciones, fuentes, quiz });
  },

  async create(data: { titulo: string; descripcion: string }) {
    const modulo = await moduleRepo.create(data);
    return mapearModulo(modulo);
  },

  async update(id: number, data: { titulo?: string; descripcion?: string }) {
    const modulo = await moduleRepo.update(id, data);
    if (!modulo) throw new NotFoundError('Módulo');
    return mapearModulo(modulo);
  },

  async delete(id: number) {
    const ok = await moduleRepo.delete(id);
    if (!ok) throw new NotFoundError('Módulo');
    return { message: 'Módulo eliminado' };
  },

  async updateProgress(moduleId: number, completed: boolean, userId: number) {
    const { pool } = await import('../db');
    await pool.query(
      `INSERT INTO user_progress (user_id, module_id, completed)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, module_id)
       DO UPDATE SET completed = EXCLUDED.completed`,
      [userId, moduleId, completed]
    );
    return { status: 'progreso actualizado' };
  },
};

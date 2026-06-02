import express from 'express';
import { pool } from '../db';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/', async (_req, res) => {
  const result = await pool.query(`
    SELECT
      id,
      titulo,
      descripcion,
      activo,
      fecha_creacion
    FROM modulos
    ORDER BY id
  `);

  return res.json(result.rows);
});

router.get('/:id', async (req, res) => {

  const moduleId = Number(req.params.id);

  const modulo = await pool.query(
    `
    SELECT *
    FROM modulos
    WHERE id = $1
    `,
    [moduleId]
  );

  if (modulo.rowCount === 0) {
    return res.status(404).json({
      error: 'Módulo no encontrado'
    });
  }

  const videos = await pool.query(
    `
    SELECT id, url
    FROM videos
    WHERE modulo_id = $1
    `,
    [moduleId]
  );

  const secciones = await pool.query(
    `
    SELECT id, titulo, contenido
    FROM secciones
    WHERE modulo_id = $1
    ORDER BY id
    `,
    [moduleId]
  );

  const fuentes = await pool.query(
    `
    SELECT id, titulo, autor, url
    FROM fuentes
    WHERE modulo_id = $1
    `,
    [moduleId]
  );

  const quiz = await pool.query(
    `
    SELECT *
    FROM quizzes
    WHERE modulo_id = $1
    `,
    [moduleId]
  );

  let quizData = null;

  if (quiz.rowCount && quiz.rowCount > 0) {

    const quizId = quiz.rows[0].id;

    const opciones = await pool.query(
      `
      SELECT id, texto
      FROM opciones_quiz
      WHERE quiz_id = $1
      ORDER BY id
      `,
      [quizId]
    );

    quizData = {
      id: quiz.rows[0].id,
      pregunta: quiz.rows[0].pregunta,
      respuesta_correcta: quiz.rows[0].respuesta_correcta,
      opciones: opciones.rows
    };
  }

  return res.json({
    ...modulo.rows[0],
    videos: videos.rows,
    secciones: secciones.rows,
    fuentes: fuentes.rows,
    quiz: quizData
  });

});

/*esto debería actualizarse con los nombres de la BD.
router.post('/:id/progress', authenticate, async (req: AuthRequest, res) => {
  const moduleId = Number(req.params.id);
  const { completed } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: 'No autorizado.' });
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'El campo completed debe ser booleano.' });
  }

  await pool.query(
    `INSERT INTO user_progress (user_id, module_id, completed)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, module_id)
      DO UPDATE SET completed = EXCLUDED.completed`,
    [userId, moduleId, completed]
  );

  return res.json({ status: 'progreso actualizado' });
});*/

export default router;

router.post('/', async (req, res) => {

  const {
    titulo,
    descripcion
  } = req.body;

  if (!titulo || !descripcion) {
    return res.status(400).json({
      error: 'Título y descripción son obligatorios'
    });
  }

  const result = await pool.query(
    `
    INSERT INTO modulos
    (
      titulo,
      descripcion
    )
    VALUES
    (
      $1,
      $2
    )
    RETURNING *
    `,
    [titulo, descripcion]
  );

  return res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req, res) => {

  const moduleId = Number(req.params.id);

  const {
    titulo,
    descripcion
  } = req.body;

  const result = await pool.query(
    `
    UPDATE modulos
    SET
      titulo = $1,
      descripcion = $2
    WHERE id = $3
    RETURNING *
    `,
    [titulo, descripcion, moduleId]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      error: 'Módulo no encontrado'
    });
  }

  return res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {

  const moduleId = Number(req.params.id);

  const result = await pool.query(
    `
    DELETE FROM modulos
    WHERE id = $1
    RETURNING *
    `,
    [moduleId]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      error: 'Módulo no encontrado'
    });
  }

  return res.json({
    message: 'Módulo eliminado'
  });
});

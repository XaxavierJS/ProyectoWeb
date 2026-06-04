import express from 'express';
import { authenticate, AuthRequest } from '../middleware/auth';
import { pool } from '../db';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/me', authenticate, async (req: AuthRequest, res) => {

  const userId = req.user?.id;

  const result = await pool.query(
    `
    SELECT
      id,
      username,
      email,
      rol,
      estado,
      fecha_creacion
    FROM usuarios
    WHERE id = $1
    `,
    [userId]
  );

  if(result.rowCount === 0){
    return res.status(404).json({
      error: 'Usuario no encontrado'
    });
  }

  return res.json(result.rows[0]);
});

router.get('/me/progress', authenticate, async (req: AuthRequest, res) => {

  const userId = req.user?.id;

  const result = await pool.query(
    `
    SELECT
      p.modulo_id,
      m.titulo,
      p.completado
    FROM progreso_usuario p
    JOIN modulos m
      ON p.modulo_id = m.id
    WHERE p.usuario_id = $1
    `,
    [userId]
  );

  return res.json(result.rows);
});

router.get('/', authenticate, async (req: AuthRequest, res) => {

  if(req.user?.role !== 'admin'){
    return res.status(403).json({
      error: 'Acceso restringido'
    });
  }

  const result = await pool.query(`
    SELECT
      id,
      username,
      email,
      rol,
      estado,
      fecha_creacion
    FROM usuarios
    ORDER BY id
  `);

  return res.json(result.rows);
});

router.get('/:id', authenticate, async (req: AuthRequest, res) => {

  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      error: 'Acceso restringido.'
    });
  }

  const userId = Number(req.params.id);

  const result = await pool.query(
    `
    SELECT
      id,
      username,
      email,
      rol,
      estado,
      fecha_creacion
    FROM usuarios
    WHERE id = $1
    `,
    [userId]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      error: 'Usuario no encontrado.'
    });
  }

  return res.json(result.rows[0]);
});

router.post('/', authenticate, async (req: AuthRequest, res) => {

  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      error: 'Acceso restringido.'
    });
  }

  const {
    username,
    email,
    password,
    rol
  } = req.body;

  if (!username || !email || !password || !rol) {
    return res.status(400).json({
      error: 'Faltan campos obligatorios.'
    });
  }

  const existe = await pool.query(
    `
    SELECT id
    FROM usuarios
    WHERE email = $1
    `,
    [email]
  );

  if (existe.rowCount && existe.rowCount > 0) {
    return res.status(409).json({
      error: 'Ya existe un usuario con ese correo.'
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
    INSERT INTO usuarios
    (
      username,
      email,
      password_hash,
      rol,
      estado
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      'activo'
    )
    RETURNING
      id,
      username,
      email,
      rol,
      estado
    `,
    [
      username,
      email,
      hash,
      rol
    ]
  );

  return res.status(201).json(result.rows[0]);
});

router.put('/:id', authenticate, async (req: AuthRequest, res) => {

  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      error: 'Acceso restringido.'
    });
  }

  const userId = Number(req.params.id);

  const {
    username,
    email,
    rol,
    estado
  } = req.body;

  const result = await pool.query(
    `
    UPDATE usuarios
    SET
      username = $1,
      email = $2,
      rol = $3,
      estado = $4
    WHERE id = $5
    RETURNING
      id,
      username,
      email,
      rol,
      estado
    `,
    [
      username,
      email,
      rol,
      estado,
      userId
    ]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      error: 'Usuario no encontrado.'
    });
  }

  return res.json(result.rows[0]);
});

router.patch('/:id', authenticate, async (req: AuthRequest, res) => {

  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      error: 'Acceso restringido.'
    });
  }

  const userId = Number(req.params.id);

  const actual = await pool.query(
    `
    SELECT *
    FROM usuarios
    WHERE id = $1
    `,
    [userId]
  );

  if (actual.rowCount === 0) {
    return res.status(404).json({
      error: 'Usuario no encontrado.'
    });
  }

  const usuario = actual.rows[0];

  const username = req.body.username ?? usuario.username;
  const email = req.body.email ?? usuario.email;
  const rol = req.body.rol ?? usuario.rol;
  const estado = req.body.estado ?? usuario.estado;

  const result = await pool.query(
    `
    UPDATE usuarios
    SET
      username = $1,
      email = $2,
      rol = $3,
      estado = $4
    WHERE id = $5
    RETURNING
      id,
      username,
      email,
      rol,
      estado
    `,
    [
      username,
      email,
      rol,
      estado,
      userId
    ]
  );

  return res.json(result.rows[0]);
});

router.delete('/:id', authenticate, async (req: AuthRequest, res) => {

  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      error: 'Acceso restringido.'
    });
  }

  const userId = Number(req.params.id);

  const result = await pool.query(
    `
    DELETE FROM usuarios
    WHERE id = $1
    RETURNING id
    `,
    [userId]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({
      error: 'Usuario no encontrado.'
    });
  }

  return res.json({
    mensaje: 'Usuario eliminado correctamente.'
  });
});

export default router;

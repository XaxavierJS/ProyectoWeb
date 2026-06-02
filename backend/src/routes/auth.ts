import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db';

const router = express.Router();

const JWT_SECRET =
  process.env.JWT_SECRET ?? 'default-development-secret';

interface LoginRequest {
  email: string;
  password: string;
}

/**
 * LOGIN
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email y contraseña son obligatorios.'
      });
    }

    const result = await pool.query(
      `
      SELECT
        id,
        username,
        email,
        password_hash,
        rol,
        estado
      FROM usuarios
      WHERE email = $1
      `,
      [email]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({
        error: 'Credenciales inválidas.'
      });
    }

    const user = result.rows[0];

    const passwordIsValid = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        error: 'Credenciales inválidas.'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.rol
      },
      JWT_SECRET,
      {
        expiresIn: '8h'
      }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.rol,
        status: user.estado
      }
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Error interno del servidor.'
    });
  }
});

/**
 * REGISTRO
 */
router.post('/register', async (req, res) => {
  try {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: 'Nombre, email y contraseña son obligatorios.'
      });
    }

    const existingUser = await pool.query(
      `
      SELECT id
      FROM usuarios
      WHERE email = $1
      `,
      [email]
    );

    if (existingUser.rowCount && existingUser.rowCount > 0) {
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
        $5
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
        'user',
        'activo'
      ]
    );

    const user = result.rows[0];

    return res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.rol,
        status: user.estado
      }
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: 'Error al crear el usuario.'
    });
  }
});

export default router;

/**
 * @file app.ts
 * @description Configuración principal de Express. Monta middleware global
 *   (CORS, helmet, compression, JSON parser) y las rutas de la API.
 *   El middleware de errores captura AppError y devuelve respuestas
 *   estandarizadas.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import moduleRoutes from './routes/modules';
import userRoutes from './routes/users';
import { AppError } from './errors/AppError';

dotenv.config();

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

function esErrorBD(err: unknown): boolean {
  const obj = err as Record<string, unknown>;
  if (Array.isArray(obj.errors)) {
    return obj.errors.some((e: unknown) =>
      e instanceof Error && 'code' in e && (e as { code: string }).code === 'ECONNREFUSED'
    );
  }
  return false;
}

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
    return;
  }

  if (esErrorBD(err)) {
    res.status(503).json({ error: 'Base de datos no disponible. Revisa que PostgreSQL esté corriendo.' });
    return;
  }

  console.error('Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

export default app;

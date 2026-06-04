/**
 * @file db.ts
 * @description Configuración de la conexión a PostgreSQL mediante
 *   Pool de pg. Requiere DATABASE_URL en el entorno.
 */

import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL no definido en el backend. Usa backend/.env o define la variable en tu entorno.');
}

export const pool = new Pool({ connectionString, connectionTimeoutMillis: 3000 });

pool.query('SELECT 1').then(() => {
  console.log('✅ Base de datos conectada correctamente.');
}).catch((err: unknown) => {
  const msg = err instanceof Error ? err.message : String(err);
  console.warn(`⚠️  No se pudo conectar a PostgreSQL: ${msg}`);
  console.warn('   Revisa que PostgreSQL esté corriendo y que backend/.env tenga la URL correcta.');
});

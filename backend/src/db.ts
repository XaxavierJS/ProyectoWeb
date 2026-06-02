import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL no definido en el backend. Usa backend/.env o define la variable en tu entorno.');
}

export const pool = new Pool({ connectionString });

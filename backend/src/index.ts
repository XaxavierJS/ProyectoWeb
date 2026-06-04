/**
 * @file index.ts
 * @description Punto de entrada del backend. Inicia el servidor Express
 *   en el puerto definido por la variable PORT o 4000 por defecto.
 */

import app from './app';

const PORT = Number(process.env.PORT || 4000);

app.listen(PORT, () => {
  console.log(`Backend escuchando en http://localhost:${PORT}`);
});

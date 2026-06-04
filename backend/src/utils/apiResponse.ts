/**
 * @file apiResponse.ts
 * @brief Utilidad para estandarizar las respuestas JSON de la API.
 *   Provee métodos estáticos para respuestas exitosas, errores y paginadas.
 */

import { Response } from 'express';

export class ApiResponse {
  static success<T>(res: Response, data: T, statusCode = 200): void {
    res.status(statusCode).json(data);
  }

  static error(res: Response, message: string, statusCode = 500): void {
    res.status(statusCode).json({ error: message });
  }

  static paginated<T>(
    res: Response,
    data: T[],
    total: number,
    pagina: number,
    limite: number
  ): void {
    res.json({
      data,
      meta: {
        total,
        pagina,
        limite,
        totalPaginas: Math.ceil(total / limite),
      },
    });
  }
}

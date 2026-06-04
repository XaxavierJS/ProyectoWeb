/**
 * @file AppError.ts
 * @description Clases de error personalizadas para el backend.
 *   Cada clase extiende AppError con un código HTTP específico,
 *   permitiendo al middleware centralizado manejarlas uniformemente.
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(recurso = 'Recurso') {
    super(`${recurso} no encontrado.`, 404);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Datos inválidos.') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'No autorizado.') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Acceso restringido.') {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'El recurso ya existe.') {
    super(message, 409);
  }
}

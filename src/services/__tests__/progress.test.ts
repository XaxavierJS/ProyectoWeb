/**
 * @file progress.test.ts
 * @brief Pruebas unitarias del servicio de progreso.
 *   Verifica persistencia de módulos completados y en progreso.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { progressService } from '../progress';

describe('Servicio de progreso', () => {
  beforeEach(() => {
    progressService.reiniciar();
  });

  it('inicia sin módulos completados ni en progreso', () => {
    expect(progressService.obtenerCompletados()).toEqual([]);
    expect(progressService.obtenerEnProgreso()).toEqual([]);
    expect(progressService.obtenerPorcentaje(4)).toBe(0);
  });

  it('marca módulo como en progreso', () => {
    progressService.iniciar(1);
    expect(progressService.obtenerEnProgreso()).toEqual([1]);
    expect(progressService.obtenerCompletados()).toEqual([]);
  });

  it('marca módulo como completado', () => {
    progressService.completar(1);
    expect(progressService.obtenerCompletados()).toEqual([1]);
    expect(progressService.obtenerEnProgreso()).toEqual([]);
  });

  it('al completar, quita de en progreso', () => {
    progressService.iniciar(1);
    progressService.completar(1);
    expect(progressService.obtenerCompletados()).toEqual([1]);
    expect(progressService.obtenerEnProgreso()).toEqual([]);
  });

  it('calcula porcentaje correctamente', () => {
    progressService.completar(1);
    progressService.completar(2);
    expect(progressService.obtenerPorcentaje(4)).toBe(50);
    progressService.completar(3);
    expect(progressService.obtenerPorcentaje(4)).toBe(75);
  });

  it('no duplica módulos completados', () => {
    progressService.completar(1);
    progressService.completar(1);
    expect(progressService.obtenerCompletados()).toEqual([1]);
  });
});

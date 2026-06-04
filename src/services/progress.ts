/**
 * @file progress.ts
 * @brief Servicio de progreso del usuario. Persiste en localStorage
 *   los módulos completados y en progreso, permitiendo retomar
 *   módulos inconclusos (RF-14).
 */

const PROGRESS_KEY = 'ciberescudo_progress';

export interface ModuleProgress {
  completados: number[];
  enProgreso: number[];
}

function leer(): ModuleProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : { completados: [], enProgreso: [] };
  } catch {
    return { completados: [], enProgreso: [] };
  }
}

function guardar(data: ModuleProgress): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

export const progressService = {
  /** Marca un módulo como completado */
  completar(moduleId: number): void {
    const data = leer();
    if (!data.completados.includes(moduleId)) {
      data.completados.push(moduleId);
    }
    data.enProgreso = data.enProgreso.filter(id => id !== moduleId);
    guardar(data);
  },

  /** Marca un módulo como en progreso */
  iniciar(moduleId: number): void {
    const data = leer();
    if (!data.completados.includes(moduleId) && !data.enProgreso.includes(moduleId)) {
      data.enProgreso.push(moduleId);
    }
    guardar(data);
  },

  /** Obtiene ids de módulos completados */
  obtenerCompletados(): number[] {
    return leer().completados;
  },

  /** Obtiene ids de módulos en progreso */
  obtenerEnProgreso(): number[] {
    return leer().enProgreso;
  },

  /** Progreso general como porcentaje (sobre el total de módulos) */
  obtenerPorcentaje(totalModulos: number): number {
    const data = leer();
    if (totalModulos === 0) return 0;
    return Math.round((data.completados.length / totalModulos) * 100);
  },

  /** Reinicia todo el progreso */
  reiniciar(): void {
    localStorage.removeItem(PROGRESS_KEY);
  },
};

/**
 * @file types.ts
 * @brief Tipos compartidos entre los servicios de API.
 */

/** Rol de usuario en la plataforma */
export type UserRole = 'user' | 'admin';

/** Fuente bibliográfica o referencia de un módulo */
export interface ModuleSource {
  title: string;
  author: string;
  url: string;
}

/** Sección de contenido dentro de un módulo */
export interface ModuleSection {
  title: string;
  body: string;
}

/** Representación completa de un módulo educativo */
export interface Module {
  id: number;
  title: string;
  description: string;
  sections: ModuleSection[];
  videoUrl?: string;
  sources?: ModuleSource[];
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
  };
}

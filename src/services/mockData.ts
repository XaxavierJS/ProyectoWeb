/**
 * @file mockData.ts
 * @description Capa de datos mock. Importa mockData.json y expone interfaces
 *   TypeScript (MockUser, MockModule) y constantes pre-filtradas. Reemplazar
 *   por llamadas a API cuando exista un backend real.
 */
import mockData from '../data/mockData.json';

export type MockRole = 'admin' | 'user';

export interface MockUser {
  id:        number;
  username:  string;
  email:     string;
  role:      MockRole;
  status:    string;
  progress?: number;
}

export interface ModuleSource {
  title:  string;
  author: string;
  url:    string;
}

export interface ModuleSection {
  title: string;
  body:  string;
}

export interface MockModule {
  id:          number;
  title:       string;
  description: string;
  sections:    ModuleSection[];
  videoUrl?:   string;
  sources?:    ModuleSource[];
  quiz: {
    question:    string;
    options:     string[];
    answerIndex: number;
  };
}

export const mockUsers   = mockData.users   as MockUser[];
export const mockModules = mockData.modules as MockModule[];

export const mockAdminUser  = mockUsers.find(u => u.role === 'admin') as MockUser;
export const mockNormalUser = mockUsers.find(u => u.role === 'user')  as MockUser;

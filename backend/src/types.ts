export type UserRole = 'user' | 'admin';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: string;
  progress?: number;
}

export interface ModuleSource {
  title: string;
  author: string;
  url: string;
}

export interface ModuleSection {
  title: string;
  body: string;
}

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

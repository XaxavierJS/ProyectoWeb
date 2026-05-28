/**
 * @file UserDashboard.tsx
 * @description Panel principal del usuario. Muestra estadísticas de progreso y
 *   la grilla de módulos de capacitación con indicadores de estado por módulo
 *   (completado, en curso, bloqueado). Ruta: /user/dashboard
 */
import React from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
} from '@ionic/react';
import { mockNormalUser, mockModules } from '../services/mockData';
import { useSidebar } from '../context/SidebarContext';

const progress = mockNormalUser.progress ?? 0;

const levelLabel = (pct: number) => {
  if (pct >= 80) return { label: 'Experto',    color: 'text-green-600'  };
  if (pct >= 50) return { label: 'Avanzado',   color: 'text-amber-600'  };
  if (pct >= 25) return { label: 'Novato',     color: 'text-blue-600'   };
  return            { label: 'Principiante', color: 'text-gray-500'   };
};

type ModuleStatus = 'completed' | 'in-progress' | 'locked';

const getModuleStatus = (index: number, completed: number): ModuleStatus => {
  if (index < completed)   return 'completed';
  if (index === completed) return 'in-progress';
  return 'locked';
};

const moduleIcons: Record<number, React.ReactElement> = {
  1: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  2: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
};

const UserDashboard: React.FC = () => {
  const { toggle: toggleSidebar } = useSidebar();
  const { label: levelName, color: levelColor } = levelLabel(progress);
  const completedModules = Math.round((progress / 100) * mockModules.length);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <button
              onClick={toggleSidebar}
              aria-label="Abrir/cerrar menú"
              className="hidden md:flex w-10 h-10 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </IonButtons>
          <IonTitle>CiberEscudo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">

          {/* ── Banner de bienvenida ── */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-md">
            <div className="w-14 h-14 bg-white/15 border border-white/25 rounded-2xl flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-blue-100 text-sm">Bienvenido de vuelta</p>
              <h2 className="text-xl font-bold text-white truncate">{mockNormalUser.username}</h2>
              <p className="text-blue-200 text-sm mt-0.5">Continúa tu formación en ciberseguridad</p>
            </div>
            <span className={`text-xs font-semibold bg-white/20 text-white border border-white/30 rounded-full px-3 py-1 shrink-0`}>
              {levelName}
            </span>
          </div>

          {/* ── Estadísticas ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Progreso */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-3">Progreso Total</p>
              <div className="flex items-end justify-between mb-2">
                <span className="text-3xl font-bold text-gray-900">{progress}%</span>
                <span className="text-xs text-gray-400">{completedModules}/{mockModules.length} módulos</span>
              </div>
              <progress className="progress progress-primary w-full h-2" value={progress} max="100" />
            </div>

            {/* Nivel */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Nivel Actual</p>
              <div>
                <p className={`text-3xl font-bold mt-3 ${levelColor}`}>{levelName}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {progress < 50 ? `Completa el ${50 - progress}% más para subir` : 'Buen desempeño'}
                </p>
              </div>
            </div>

            {/* Módulos completados */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Módulos Completados</p>
              <div>
                <p className="text-3xl font-bold mt-3 text-gray-900">
                  {completedModules}
                  <span className="text-gray-300 text-lg font-normal">/{mockModules.length}</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {completedModules === 0 ? '¡Empieza tu primer módulo!' : 'Continúa así'}
                </p>
              </div>
            </div>
          </div>

          {/* ── Módulos ── */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Tus Módulos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mockModules.map((module, index) => {
                const status = getModuleStatus(index, completedModules);

                const accentBar =
                  status === 'completed'  ? 'bg-green-500' :
                  status === 'in-progress' ? 'bg-primary'  : 'bg-gray-200';

                const iconWrap =
                  status === 'completed'  ? 'bg-green-50 text-green-600' :
                  status === 'in-progress' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400';

                const cardBorder =
                  status === 'in-progress' ? 'border-primary/30' : 'border-gray-200';

                return (
                  <div
                    key={module.id}
                    className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-200
                      ${status !== 'locked' ? 'hover:shadow-md hover:-translate-y-0.5' : 'opacity-75'}
                      ${cardBorder}`}
                  >
                    {/* Barra de acento superior */}
                    <div className={`h-1 w-full ${accentBar}`} />

                    <div className="p-5">
                      <div className="flex items-start gap-4">
                        {/* Ícono */}
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconWrap}`}>
                          {moduleIcons[module.id] ?? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                            </svg>
                          )}
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-gray-900 text-sm leading-snug">{module.title}</h3>
                            {status === 'in-progress' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                                En curso
                              </span>
                            )}
                            {status === 'completed' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                                Completado
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                            {module.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          Módulo {module.id} de {mockModules.length}
                        </span>
                        {status === 'locked' ? (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            Bloqueado
                          </span>
                        ) : (
                          <a
                            href={`/user/module/${module.id}`}
                            className={`btn btn-sm ${
                              status === 'in-progress' ? 'btn-primary' : 'btn-outline btn-success'
                            }`}
                          >
                            {status === 'in-progress' ? 'Continuar' : 'Revisar'}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserDashboard;

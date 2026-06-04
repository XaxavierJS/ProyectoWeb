/**
 * @file UserProfile.tsx
 * @brief Página de perfil del usuario. Muestra los datos del usuario
 *   logueado (obtenidos de authService), su progreso y nivel.
 *   Ruta: /user/profile
 */

import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from '@ionic/react';
import { useSidebar } from '../context/SidebarContext';
import { authService } from '../services/auth';
import { progressService } from '../services/progress';
import { dataFacade } from '../services/api/facade';

const ShieldIcon: React.FC = () => (
  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const UserProfile: React.FC = () => {
  const { toggle: toggleSidebar } = useSidebar();
  const userInfo = authService.getUserInfo();
  const [totalModulos, setTotalModulos] = useState(0);

  useEffect(() => {
    dataFacade.listModules().then(m => setTotalModulos(m.length));
  }, []);

  const progreso = progressService.obtenerPorcentaje(totalModulos);
  const completados = progressService.obtenerCompletados().length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <button onClick={toggleSidebar} aria-label="Abrir/cerrar menú"
              className="hidden md:flex w-10 h-10 items-center justify-center rounded-lg text-white/70 hover:text-white hover:bg-white/15 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </IonButtons>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">

          {/* Cabecera del perfil */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <span className="text-xl font-bold text-primary uppercase">{userInfo?.username?.[0] ?? '?'}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{userInfo?.username ?? 'Usuario'}</h1>
                <p className="text-sm text-gray-500">{userInfo?.email ?? ''}</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200 mt-1">
                  {authService.getRole() === 'admin' ? 'Administrador' : 'Usuario'}
                </span>
              </div>
            </div>
          </div>

          {/* Información general */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l5.654-4.655" />
              </svg>
              <h2 className="font-semibold text-gray-900">Información General</h2>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Nombre de usuario</span>
                <span className="text-sm font-medium text-gray-900">{userInfo?.username ?? ''}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Correo electrónico</span>
                <span className="text-sm font-medium text-gray-900">{userInfo?.email ?? ''}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Rol</span>
                <span className="text-sm font-medium text-gray-900">{authService.getRole() === 'admin' ? 'Administrador' : 'Usuario'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-500">Estado</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">Activo</span>
              </div>
            </div>
          </div>

          {/* Progreso */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              <h2 className="font-semibold text-gray-900">Progreso de Aprendizaje</h2>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progreso general</span>
                  <span className="font-medium text-gray-900">{progreso}%</span>
                </div>
                <progress className="progress progress-primary w-full h-2.5" value={progreso} max="100" />
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Módulos completados</span>
                <span className="text-sm font-medium text-gray-900">{completados}/{totalModulos}</span>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;

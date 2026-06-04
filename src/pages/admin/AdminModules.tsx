/**
 * @file AdminModules.tsx
 * @brief Página de gestión de módulos del panel de administración.
 *   Lista, crea, edita y elimina módulos educativos. Ruta: /admin/modulos
 */

import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from '@ionic/react';
import { MockModule } from '../../services/mockData';
import { useSidebar } from '../../context/SidebarContext';
import { dataFacade } from '../../services/api/facade';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import EditModuleModal from '../../components/admin/EditModuleModal';
import CreateModuleModal from '../../components/admin/CreateModuleModal';

const AdminModules: React.FC = () => {
  const { toggle: toggleSidebar } = useSidebar();
  const [modules, setModules] = useState<MockModule[]>([]);

  useEffect(() => { dataFacade.listModules().then(setModules); }, []);
  const [editingModule, setEditingModule] = useState<MockModule | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const openEditModule = (mod: MockModule) => setEditingModule({ ...mod });

  const handleModuleFieldChange = (field: 'title' | 'description', value: string) => {
    setEditingModule(prev => prev ? { ...prev, [field]: value } : null);
  };

  const saveModule = () => {
    if (!editingModule) return;
    setModules(prev => prev.map(m => m.id === editingModule.id ? editingModule : m));
    setEditingModule(null);
  };

  const handleCreate = (data: { title: string; description: string }) => {
    const newModule: MockModule = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      sections: [],
      videoUrl: undefined,
      sources: [],
      quiz: { question: '', options: ['', '', '', ''], answerIndex: 0 },
    };
    setModules(prev => [...prev, newModule]);
    setCreating(false);
  };

  const deleteModule = () => {
    if (confirmDeleteId === null) return;
    setModules(prev => prev.filter(m => m.id !== confirmDeleteId));
    setConfirmDeleteId(null);
  };

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
          <IonTitle>Gestión de Módulos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Módulos de la Plataforma</h1>
            <button onClick={() => setCreating(true)}
              className="btn btn-primary btn-sm gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Nuevo Módulo
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {modules.map(module => (
              <div key={module.id} className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-primary">{module.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug">{module.title}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => openEditModule(module)} title="Editar" aria-label="Editar módulo"
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                        </svg>
                      </button>
                      <button onClick={() => setConfirmDeleteId(module.id)} title="Eliminar" aria-label="Eliminar módulo"
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{module.description}</p>
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">Activo</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>

      {editingModule && (
        <EditModuleModal module={editingModule} onChange={handleModuleFieldChange} onSave={saveModule} onClose={() => setEditingModule(null)} />
      )}
      {creating && (
        <CreateModuleModal onSave={handleCreate} onClose={() => setCreating(false)} />
      )}
      {confirmDeleteId !== null && (
        <ConfirmDialog
          message={`¿Eliminar el módulo "${modules.find(m => m.id === confirmDeleteId)?.title}"? Esta acción no se puede deshacer.`}
          onConfirm={deleteModule} onCancel={() => setConfirmDeleteId(null)} />
      )}
    </IonPage>
  );
};

export default AdminModules;

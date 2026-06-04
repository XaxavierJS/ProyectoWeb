/**
 * @file AdminUsers.tsx
 * @brief Página de gestión de usuarios del panel de administración.
 *   Lista, crea, edita y elimina usuarios. Ruta: /admin/usuarios
 */

import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons } from '@ionic/react';
import { MockUser } from '../../services/mockData';
import { useSidebar } from '../../context/SidebarContext';
import { dataFacade } from '../../services/api/facade';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import EditUserModal from '../../components/admin/EditUserModal';
import CreateUserModal from '../../components/admin/CreateUserModal';

const AdminUsers: React.FC = () => {
  const { toggle: toggleSidebar } = useSidebar();
  const [users, setUsers] = useState<MockUser[]>([]);

  useEffect(() => { dataFacade.listUsers().then(setUsers); }, []);
  const [editingUser, setEditingUser] = useState<MockUser | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const openEditUser = (user: MockUser) => setEditingUser({ ...user });

  const handleUserFieldChange = (field: keyof MockUser, value: string) => {
    if (!editingUser) return;
    setEditingUser({ ...editingUser, [field]: value });
  };

  const saveUser = () => {
    if (!editingUser) return;
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
  };

  const handleCreate = (data: { username: string; email: string; password: string; rol: string }) => {
    const newUser: MockUser = {
      id: Date.now(),
      username: data.username,
      email: data.email,
      role: data.rol as 'user' | 'admin',
      status: 'activo',
      progress: 0,
    };
    setUsers(prev => [...prev, newUser]);
    setCreating(false);
  };

  const deleteUser = () => {
    if (confirmDeleteId === null) return;
    setUsers(prev => prev.filter(u => u.id !== confirmDeleteId));
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
          <IonTitle>Gestión de Usuarios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="p-4 md:p-8 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">Usuarios Registrados</h1>
            <button onClick={() => setCreating(true)}
              className="btn btn-primary btn-sm gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Nuevo Usuario
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest w-10">#</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">Usuario</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest hidden sm:table-cell">Correo</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest">Rol</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest hidden md:table-cell">Estado</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest hidden md:table-cell">Progreso</th>
                    <th className="px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-widest text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={user.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 text-gray-400 font-mono text-xs">{i + 1}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-primary uppercase">{user.username[0]}</span>
                          </div>
                          <span className="font-medium text-gray-900">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 hidden sm:table-cell">{user.email}</td>
                      <td className="px-5 py-3.5">
                        {user.role === 'admin' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">Admin</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">Usuario</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.status === 'activo' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}>{user.status === 'activo' ? 'Activo' : 'Inactivo'}</span>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell">
                        {user.role === 'user' ? (
                          <div className="flex items-center gap-2">
                            <progress className="progress progress-primary w-20 h-1.5" value={user.progress ?? 0} max="100" />
                            <span className="text-xs text-gray-400 tabular-nums">{user.progress ?? 0}%</span>
                          </div>
                        ) : <span className="text-gray-300 text-xs">—</span>}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => openEditUser(user)} title="Editar" aria-label="Editar usuario"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                            </svg>
                          </button>
                          <button onClick={() => setConfirmDeleteId(user.id)} title="Eliminar" aria-label="Eliminar usuario"
                            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </IonContent>

      {editingUser && (
        <EditUserModal user={editingUser} onChange={handleUserFieldChange} onSave={saveUser} onClose={() => setEditingUser(null)} />
      )}
      {creating && (
        <CreateUserModal onSave={handleCreate} onClose={() => setCreating(false)} />
      )}
      {confirmDeleteId !== null && (
        <ConfirmDialog
          message={`¿Eliminar al usuario "${users.find(u => u.id === confirmDeleteId)?.username}"? Esta acción no se puede deshacer.`}
          onConfirm={deleteUser} onCancel={() => setConfirmDeleteId(null)} />
      )}
    </IonPage>
  );
};

export default AdminUsers;

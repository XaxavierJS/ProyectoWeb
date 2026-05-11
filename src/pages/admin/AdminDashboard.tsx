/**
 * @file AdminDashboard.tsx
 * @description Panel de administración. Muestra estadísticas globales, tabla de
 *   usuarios con acciones de editar/eliminar, y grilla de módulos con las mismas
 *   acciones. Toda la mutación es local (mock) — sin backend. Ruta: /admin/dashboard
 */
import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
} from '@ionic/react';
import { mockUsers, mockModules, MockUser, MockModule, MockRole } from '../../services/mockData';
import { useSidebar } from '../../context/SidebarContext';

/* ── Stat Card ── */
interface StatCardProps {
  label:   string;
  value:   string | number;
  sub?:    string;
  icon:    React.ReactNode;
  accent?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, sub, icon, accent = 'text-primary' }) => (
  <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
    <div className={`w-11 h-11 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 ${accent}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  </div>
);

/* ── Confirm Dialog ── */
interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel:  () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    onClick={onCancel}
  >
    <div
      className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
      onClick={e => e.stopPropagation()}
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
        <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <p className="text-center text-sm text-gray-700 font-medium mb-6">{message}</p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
        >
          Eliminar
        </button>
      </div>
    </div>
  </div>
);

/* ── Edit User Modal ── */
interface EditUserModalProps {
  user:     MockUser;
  onChange: (field: keyof MockUser, value: string) => void;
  onSave:   () => void;
  onClose:  () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onChange, onSave, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-gray-900">Editar Usuario</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
            Nombre de usuario
          </label>
          <input
            type="text"
            value={user.username}
            onChange={e => onChange('username', e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
            Correo electrónico
          </label>
          <input
            type="email"
            value={user.email}
            onChange={e => onChange('email', e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
              Rol
            </label>
            <select
              value={user.role}
              onChange={e => onChange('role', e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white"
            >
              <option value="user">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
              Estado
            </label>
            <select
              value={user.status}
              onChange={e => onChange('status', e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors bg-white"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          className="flex-1 h-10 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
);

/* ── Edit Module Modal ── */
interface EditModuleModalProps {
  module:   MockModule;
  onChange: (field: 'title' | 'description', value: string) => void;
  onSave:   () => void;
  onClose:  () => void;
}

const EditModuleModal: React.FC<EditModuleModalProps> = ({ module, onChange, onSave, onClose }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-gray-900">Editar Módulo</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
            Título del módulo
          </label>
          <input
            type="text"
            value={module.title}
            onChange={e => onChange('title', e.target.value)}
            className="w-full h-10 px-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">
            Descripción
          </label>
          <textarea
            value={module.description}
            onChange={e => onChange('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <button
          onClick={onClose}
          className="flex-1 h-10 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          className="flex-1 h-10 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
);

/* ── AdminDashboard ── */
const AdminDashboard: React.FC = () => {
  const { toggle: toggleSidebar } = useSidebar();

  const [users,   setUsers]   = useState<MockUser[]>([...mockUsers]);
  const [modules, setModules] = useState<MockModule[]>([...mockModules]);

  /* edit states */
  const [editingUser,   setEditingUser]   = useState<MockUser | null>(null);
  const [editingModule, setEditingModule] = useState<MockModule | null>(null);

  /* delete confirm states */
  const [confirmDeleteUserId,   setConfirmDeleteUserId]   = useState<number | null>(null);
  const [confirmDeleteModuleId, setConfirmDeleteModuleId] = useState<number | null>(null);

  /* ── derived stats ── */
  const userList   = users.filter(u => u.role === 'user');
  const adminCount = users.filter(u => u.role === 'admin').length;
  const avgProgress = userList.length
    ? Math.round(userList.reduce((acc, u) => acc + (u.progress ?? 0), 0) / userList.length)
    : 0;

  /* ── user handlers ── */
  const openEditUser = (user: MockUser) => setEditingUser({ ...user });

  const handleUserFieldChange = (field: keyof MockUser, value: string) => {
    setEditingUser(prev => prev ? { ...prev, [field]: value as MockRole } : null);
  };

  const saveUser = () => {
    if (!editingUser) return;
    setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
  };

  const deleteUser = () => {
    if (confirmDeleteUserId === null) return;
    setUsers(prev => prev.filter(u => u.id !== confirmDeleteUserId));
    setConfirmDeleteUserId(null);
  };

  /* ── module handlers ── */
  const openEditModule = (mod: MockModule) => setEditingModule({ ...mod });

  const handleModuleFieldChange = (field: 'title' | 'description', value: string) => {
    setEditingModule(prev => prev ? { ...prev, [field]: value } : null);
  };

  const saveModule = () => {
    if (!editingModule) return;
    setModules(prev => prev.map(m => m.id === editingModule.id ? editingModule : m));
    setEditingModule(null);
  };

  const deleteModule = () => {
    if (confirmDeleteModuleId === null) return;
    setModules(prev => prev.filter(m => m.id !== confirmDeleteModuleId));
    setConfirmDeleteModuleId(null);
  };

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
          <IonTitle>Panel de Administración</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">

          {/* ── Título de página ── */}
          <div>
            <h1 className="text-xl font-bold text-gray-900">Resumen General</h1>
            <p className="text-sm text-gray-500 mt-1">
              Estado actual de la plataforma CiberEscudo
            </p>
          </div>

          {/* ── Estadísticas ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="Total Usuarios"
              value={users.length}
              sub={`${userList.length} estudiante${userList.length !== 1 ? 's' : ''}, ${adminCount} administrador${adminCount !== 1 ? 'es' : ''}`}
              accent="text-primary"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              }
            />
            <StatCard
              label="Módulos Activos"
              value={modules.length}
              sub="Todos los módulos publicados"
              accent="text-blue-500"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              }
            />
            <StatCard
              label="Progreso Promedio"
              value={`${avgProgress}%`}
              sub="Entre todos los estudiantes"
              accent="text-green-600"
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              }
            />
          </div>

          {/* ── Tabla de usuarios ── */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Usuarios Registrados</h2>
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
                      <tr key={user.id}
                        className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5 text-gray-400 font-mono text-xs">{i + 1}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-primary uppercase">
                                {user.username[0]}
                              </span>
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
                            user.status === 'activo'
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-gray-100 text-gray-500 border border-gray-200'
                          }`}>
                            {user.status === 'activo' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          {user.role === 'user' ? (
                            <div className="flex items-center gap-2">
                              <progress
                                className="progress progress-primary w-20 h-1.5"
                                value={user.progress ?? 0}
                                max="100"
                              />
                              <span className="text-xs text-gray-400 tabular-nums">
                                {user.progress ?? 0}%
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEditUser(user)}
                              title="Editar usuario"
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setConfirmDeleteUserId(user.id)}
                              title="Eliminar usuario"
                              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
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

          {/* ── Grilla de módulos ── */}
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-3">Módulos de la Plataforma</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {modules.map(module => (
                <div key={module.id}
                  className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">{module.id}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug">{module.title}</h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => openEditModule(module)}
                          title="Editar módulo"
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setConfirmDeleteModuleId(module.id)}
                          title="Eliminar módulo"
                          className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {module.description}
                    </p>
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                        Activo
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </IonContent>

      {/* ── Modales ── */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onChange={handleUserFieldChange}
          onSave={saveUser}
          onClose={() => setEditingUser(null)}
        />
      )}

      {editingModule && (
        <EditModuleModal
          module={editingModule}
          onChange={handleModuleFieldChange}
          onSave={saveModule}
          onClose={() => setEditingModule(null)}
        />
      )}

      {confirmDeleteUserId !== null && (
        <ConfirmDialog
          message={`¿Eliminar al usuario "${users.find(u => u.id === confirmDeleteUserId)?.username}"? Esta acción no se puede deshacer.`}
          onConfirm={deleteUser}
          onCancel={() => setConfirmDeleteUserId(null)}
        />
      )}

      {confirmDeleteModuleId !== null && (
        <ConfirmDialog
          message={`¿Eliminar el módulo "${modules.find(m => m.id === confirmDeleteModuleId)?.title}"? Esta acción no se puede deshacer.`}
          onConfirm={deleteModule}
          onCancel={() => setConfirmDeleteModuleId(null)}
        />
      )}

    </IonPage>
  );
};

export default AdminDashboard;

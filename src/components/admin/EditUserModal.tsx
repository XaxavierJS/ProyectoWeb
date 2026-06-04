/**
 * @file EditUserModal.tsx
 * @brief Modal de edición de usuario. Permite modificar nombre,
 *   correo, rol y estado desde el panel de administración.
 */

import React from 'react';
import { MockUser } from '../../services/mockData';

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

export default EditUserModal;

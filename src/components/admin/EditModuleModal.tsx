/**
 * @file EditModuleModal.tsx
 * @brief Modal de edición de módulo educativo. Permite modificar
 *   el título y la descripción desde el panel de administración.
 */

import React from 'react';
import { MockModule } from '../../services/mockData';

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

export default EditModuleModal;

/**
 * @file StatCard.tsx
 * @brief Tarjeta de estadística reutilizable para el panel de administración.
 *   Muestra un ícono, etiqueta, valor numérico y subtítulo opcional.
 */

import React from 'react';

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

export default StatCard;

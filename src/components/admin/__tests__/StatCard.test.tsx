/**
 * @file StatCard.test.tsx
 * @brief Pruebas unitarias del componente StatCard.
 *   Verifica renderizado de etiqueta, valor, subtítulo e ícono.
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StatCard from '../StatCard';

describe('Componente StatCard', () => {
  const propsPorDefecto = {
    label: 'Total Usuarios',
    value: 42,
    icon: <svg data-testid="icono-prueba" />,
  };

  it('renderiza etiqueta y valor', () => {
    render(<StatCard {...propsPorDefecto} />);
    expect(screen.getByText('Total Usuarios')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renderiza subtítulo cuando se proporciona', () => {
    render(<StatCard {...propsPorDefecto} sub="3 administradores" />);
    expect(screen.getByText('3 administradores')).toBeInTheDocument();
  });

  it('no renderiza subtítulo cuando no se proporciona', () => {
    render(<StatCard {...propsPorDefecto} />);
    expect(screen.queryByText('3 administradores')).not.toBeInTheDocument();
  });

  it('renderiza el ícono', () => {
    render(<StatCard {...propsPorDefecto} />);
    expect(screen.getByTestId('icono-prueba')).toBeInTheDocument();
  });
});

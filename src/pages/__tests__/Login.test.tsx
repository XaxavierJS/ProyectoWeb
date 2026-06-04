/**
 * @file Login.test.tsx
 * @brief Pruebas unitarias de la página de inicio de sesión.
 *   Verifica renderizado del formulario, validación de campos
 *   y enlace a registro.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { IonApp } from '@ionic/react';

// Mock de useHistory antes de importar el componente
const mockPush = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useHistory: () => ({ push: mockPush }) };
});

// Configurar Ionic React antes de importar
import { setupIonicReact } from '@ionic/react';
setupIonicReact();

import Login from '../Login';

const renderLogin = () =>
  render(
    <IonApp>
      <MemoryRouter initialEntries={['/login']}>
        <Login />
      </MemoryRouter>
    </IonApp>
  );

describe('Página de inicio de sesión', () => {
  beforeEach(() => {
    localStorage.clear();
    mockPush.mockClear();
  });

  it('renderiza el formulario de login', () => {
    renderLogin();
    expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    expect(screen.getByLabelText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  it('muestra error al enviar formulario vacío', async () => {
    renderLogin();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(screen.getByText('Por favor completa todos los campos.')).toBeInTheDocument();
  });

  it('renderiza enlace a la página de registro', () => {
    renderLogin();
    expect(screen.getByText('Regístrate aquí')).toBeInTheDocument();
  });
});

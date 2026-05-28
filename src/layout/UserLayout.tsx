/**
 * @file UserLayout.tsx
 * @description Layout principal para usuarios autenticados. Sidebar colapsable
 *   (desktop ≥768px) que alterna entre 256px (abierto) y 60px (rail de iconos).
 *   El IonPage va envuelto en un div con position:relative para que no tape el sidebar.
 *   Provee SidebarContext para el botón hamburguesa en el toolbar de cada página.
 */
import React, { useState } from 'react';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet,
  IonPage, IonHeader, IonToolbar, IonContent,
} from '@ionic/react';
import { Route, Redirect, useHistory, useLocation, Link } from 'react-router-dom';
import { home, person, logOut } from 'ionicons/icons';
import UserDashboard from '../pages/UserDashboard';
import UserModule    from '../pages/UserModule';
import { authService } from '../services/auth';
import { SidebarContext } from '../context/SidebarContext';

/* ── Icons ── */
const ShieldIcon: React.FC = () => (
  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

/* ── NavItem ── */
interface NavItemProps {
  to:        string;
  icon:      string;
  label:     string;
  active:    boolean;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active, collapsed }) => (
  <Link
    to={to}
    title={collapsed ? label : undefined}
    className={`flex items-center rounded-xl transition-colors duration-150
      ${collapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'}
      ${active
        ? 'bg-primary/10 text-primary'
        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}
  >
    <IonIcon icon={icon} style={{ fontSize: '1.25rem', flexShrink: 0 }} />
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
    {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
  </Link>
);

/* ── Layout ── */
const UserLayout: React.FC = () => {
  const history  = useHistory();
  const location = useLocation();

  /* true = sidebar expandido (256px), false = rail de iconos (60px) */
  const [isOpen, setIsOpen] = useState<boolean>(() =>
    localStorage.getItem('sidebar_collapsed') !== 'true'
  );

  const toggle = () => {
    setIsOpen(prev => {
      const next = !prev;
      localStorage.setItem('sidebar_collapsed', String(!next));
      return next;
    });
  };

  const handleLogout = () => {
    authService.logout();
    history.push('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarContext.Provider value={{ isOpen, toggle }}>
      {/*
        CRÍTICO: el div raíz debe ser flex para que el aside y el wrapper de IonPage
        se repartan el ancho. IonPage tiene internamente position:absolute;inset:0,
        por eso su wrapper necesita position:relative para que IonPage lo rellene a él
        y no al viewport entero.
      */}
      <div className="flex h-full overflow-hidden">

        {/* ── Sidebar desktop (≥768px) ── */}
        <aside
          style={{ transition: 'width 300ms ease-in-out' }}
          className={`hidden md:flex flex-col bg-white border-r border-gray-200 shrink-0 overflow-hidden
            ${isOpen ? 'w-64' : 'w-[60px]'}`}
        >
          {/* Cabecera */}
          <div className={`flex items-center py-4 border-b border-gray-100 shrink-0
            ${isOpen ? 'px-4 gap-3' : 'justify-center px-2'}`}>
            <div className="w-9 h-9 bg-primary/10 border border-primary/25 rounded-xl flex items-center justify-center shrink-0">
              <ShieldIcon />
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <div className="text-sm font-bold text-gray-900 truncate leading-tight">CiberEscudo</div>
                <div className="text-xs text-gray-400 truncate leading-tight">Plataforma de aprendizaje</div>
              </div>
            )}
          </div>

          {/* Ítems de navegación */}
          <div className="p-2 space-y-1 flex-1 overflow-y-auto">
            {isOpen && (
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-4 pb-2 pt-2">
                Menú
              </p>
            )}
            <NavItem to="/user/dashboard" icon={home}   label="Dashboard" active={isActive('/user/dashboard')} collapsed={!isOpen} />
            <NavItem to="/user/profile"   icon={person} label="Mi Perfil"  active={isActive('/user/profile')}  collapsed={!isOpen} />
          </div>

          {/* Pie: toggle + cerrar sesión */}
          <div className="p-2 border-t border-gray-100 space-y-1">
            {/* Botón toggle — siempre visible porque el sidebar nunca llega a w-0 */}
            <button
              onClick={toggle}
              aria-label={isOpen ? 'Colapsar menú' : 'Expandir menú'}
              title={isOpen ? 'Colapsar menú' : 'Expandir menú'}
              className={`flex items-center h-11 w-full rounded-xl text-gray-400
                hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150
                ${isOpen ? 'px-4 gap-2' : 'justify-center px-2'}`}
            >
              {isOpen ? (
                /* Flecha izquierda cuando está abierto */
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              ) : (
                /* Hamburguesa cuando está colapsado */
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
              {isOpen && <span className="text-xs font-medium">Colapsar</span>}
            </button>

            {/* Cerrar sesión */}
            <button
              onClick={handleLogout}
              aria-label="Cerrar Sesión"
              title={!isOpen ? 'Cerrar Sesión' : undefined}
              className={`flex items-center h-11 w-full rounded-xl text-red-400
                hover:text-red-600 hover:bg-red-50 transition-colors duration-150
                ${isOpen ? 'px-4 gap-3' : 'justify-center px-2'}`}
            >
              <IonIcon icon={logOut} style={{ fontSize: '1.25rem', flexShrink: 0 }} />
              {isOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
            </button>
          </div>
        </aside>

        {/*
          CRÍTICO: este div con position:relative es el contenedor de IonPage.
          Sin él, IonPage (position:absolute;inset:0) llenaría el viewport completo
          y taparía el sidebar.
        */}
        <div className="flex-1 min-w-0 overflow-hidden" style={{ position: 'relative' }}>
          <IonPage id="main-content">
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/user/dashboard" component={UserDashboard} />
                <Route exact path="/user/module/:id" component={UserModule} />
                <Route exact path="/user/profile">
                  <IonPage>
                    <IonHeader>
                      <IonToolbar color="primary">
                        <div className="px-4 py-2 font-semibold">Mi Perfil</div>
                      </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                      <p className="text-gray-500 text-sm">Perfil en construcción.</p>
                    </IonContent>
                  </IonPage>
                </Route>
                <Route exact path="/user">
                  <Redirect to="/user/dashboard" />
                </Route>
              </IonRouterOutlet>

              {/* Tab bar — solo móvil */}
              <IonTabBar slot="bottom" className="ion-hide-md-up">
                <IonTabButton tab="dashboard" href="/user/dashboard">
                  <IonIcon icon={home} />
                  <IonLabel>Dashboard</IonLabel>
                </IonTabButton>
                <IonTabButton tab="profile" href="/user/profile">
                  <IonIcon icon={person} />
                  <IonLabel>Perfil</IonLabel>
                </IonTabButton>
              </IonTabBar>
            </IonTabs>
          </IonPage>
        </div>

      </div>
    </SidebarContext.Provider>
  );
};

export default UserLayout;

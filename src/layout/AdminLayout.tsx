/**
 * @file AdminLayout.tsx
 * @description Layout principal para administradores autenticados. Incluye sidebar
 *   colapsable (desktop ≥768px) con persistencia en localStorage, y tab bar
 *   inferior para móvil. Gestiona las rutas /admin/*.
 *   El wrapper con position:relative es crítico: sin él IonPage (position:absolute;inset:0)
 *   llena el viewport completo y tapa el sidebar.
 */
import React, { useState } from 'react';
import {
  IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet,
  IonPage, IonHeader, IonToolbar, IonContent,
} from '@ionic/react';
import { Route, Redirect, useHistory, useLocation, Link } from 'react-router-dom';
import { grid, people, library, person, logOut } from 'ionicons/icons';
import AdminDashboard from '../pages/admin/AdminDashboard';
import { authService } from '../services/auth';
import { SidebarContext } from '../context/SidebarContext';

/* ── Icons ── */
const ShieldIcon: React.FC = () => (
  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

/* ── NavItem ── */
interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  active: boolean;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active, collapsed }) => (
  <Link
    to={to}
    title={collapsed ? label : undefined}
    className={`flex items-center transition-all duration-150 rounded-xl
      ${collapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3'}
      ${active
        ? 'bg-primary/10 text-primary'
        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
      }`}
  >
    <IonIcon icon={icon} style={{ fontSize: '1.25rem', flexShrink: 0 }} />
    {!collapsed && <span className="text-sm font-medium">{label}</span>}
    {!collapsed && active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
  </Link>
);

/* ── Placeholder page factory ── */
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <div className="px-4 py-2 font-semibold">{title}</div>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-gray-400">
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l5.654-4.655m5.556-5.226l4.125-4.125a2.652 2.652 0 113.75 3.75l-4.125 4.125" />
        </svg>
        <p className="text-sm font-medium">{title} — próximamente</p>
      </div>
    </IonContent>
  </IonPage>
);

/* ── AdminLayout ── */
const AdminLayout: React.FC = () => {
  const history  = useHistory();
  const location = useLocation();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(() =>
    localStorage.getItem('admin_sidebar_collapsed') === 'true'
  );

  const toggleSidebar = () => {
    setIsCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('admin_sidebar_collapsed', String(next));
      return next;
    });
  };

  const handleLogout = () => {
    authService.logout();
    history.push('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarContext.Provider value={{ isOpen: !isCollapsed, toggle: toggleSidebar }}>
    <div className="flex h-full overflow-hidden">

      {/* ── Sidebar desktop (≥768px) ── */}
      <aside
        style={{ transition: 'width 300ms ease-in-out' }}
        className={`hidden md:flex flex-col bg-white border-r border-gray-200
          shrink-0 overflow-hidden ${isCollapsed ? 'w-[72px]' : 'w-64'}`}
      >
        {/* Encabezado / logo */}
        <div className={`flex items-center gap-3 py-4 border-b border-gray-100
          ${isCollapsed ? 'justify-center px-2' : 'px-4'}`}>
          <div className="w-9 h-9 bg-primary/10 border border-primary/25 rounded-xl
            flex items-center justify-center shrink-0">
            <ShieldIcon />
          </div>
          {!isCollapsed && (
            <div className="min-w-0 overflow-hidden">
              <div className="text-sm font-bold text-gray-900 truncate leading-tight">CiberEscudo</div>
              <div className="text-xs text-amber-600 font-semibold truncate leading-tight uppercase tracking-wider">Admin</div>
            </div>
          )}
        </div>

        {/* Ítems de navegación */}
        <div className="p-2 space-y-1 flex-1 overflow-y-auto">
          {!isCollapsed && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-4 pb-2 pt-2">
              Administración
            </p>
          )}
          <NavItem to="/admin/dashboard" icon={grid}    label="Dashboard"  active={isActive('/admin/dashboard')} collapsed={isCollapsed} />
          <NavItem to="/admin/usuarios"  icon={people}  label="Usuarios"   active={isActive('/admin/usuarios')}  collapsed={isCollapsed} />
          <NavItem to="/admin/modulos"   icon={library} label="Módulos"    active={isActive('/admin/modulos')}   collapsed={isCollapsed} />
          <NavItem to="/admin/perfil"    icon={person}  label="Mi Perfil"  active={isActive('/admin/perfil')}    collapsed={isCollapsed} />
        </div>

        {/* Pie: toggle + cerrar sesión */}
        <div className="p-2 border-t border-gray-100 space-y-1">
          <button
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            title={isCollapsed ? 'Expandir menú' : 'Colapsar menú'}
            className={`flex items-center h-11 w-full rounded-xl text-gray-400
              hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150
              ${isCollapsed ? 'justify-center px-2' : 'px-4 gap-2'}`}
          >
            <ChevronLeftIcon
              className={`w-5 h-5 shrink-0 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
            />
            {!isCollapsed && <span className="text-xs font-medium">Colapsar</span>}
          </button>

          <button
            onClick={handleLogout}
            aria-label="Cerrar Sesión"
            title={isCollapsed ? 'Cerrar Sesión' : undefined}
            className={`flex items-center h-11 w-full rounded-xl text-red-400
              hover:text-red-600 hover:bg-red-50 transition-colors duration-150
              ${isCollapsed ? 'justify-center px-2' : 'px-4 gap-3'}`}
          >
            <IonIcon icon={logOut} style={{ fontSize: '1.25rem', flexShrink: 0 }} />
            {!isCollapsed && <span className="text-sm font-medium">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* CRÍTICO: position:relative para que IonPage lo rellene a él y no al viewport */}
      <div className="flex-1 min-w-0 overflow-hidden" style={{ position: 'relative' }}>
        <IonPage id="admin-content">
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/admin/dashboard" component={AdminDashboard} />
              <Route exact path="/admin/usuarios">
                <PlaceholderPage title="Gestión de Usuarios" />
              </Route>
              <Route exact path="/admin/modulos">
                <PlaceholderPage title="Gestión de Módulos" />
              </Route>
              <Route exact path="/admin/perfil">
                <PlaceholderPage title="Mi Perfil" />
              </Route>
              <Route exact path="/admin">
                <Redirect to="/admin/dashboard" />
              </Route>
            </IonRouterOutlet>

            {/* Tab bar — solo móvil */}
            <IonTabBar slot="bottom" className="ion-hide-md-up">
              <IonTabButton tab="admin-dashboard" href="/admin/dashboard">
                <IonIcon icon={grid} />
                <IonLabel>Dashboard</IonLabel>
              </IonTabButton>
              <IonTabButton tab="admin-perfil" href="/admin/perfil">
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

export default AdminLayout;

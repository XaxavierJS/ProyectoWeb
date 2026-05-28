/**
 * @file SidebarContext.ts
 * @description Contexto React que comparte el estado abierto/cerrado del sidebar
 *   entre UserLayout y las páginas hijas (UserDashboard, UserModule).
 */
import { createContext, useContext } from 'react';

interface SidebarContextType {
  isOpen: boolean;
  toggle: () => void;
}

export const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggle: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

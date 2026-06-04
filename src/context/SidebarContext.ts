/**
 * @file SidebarContext.ts
 * @description Contexto React que comparte el estado del sidebar
 *   (abierto/cerrado) entre los layouts y las páginas hijas.
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

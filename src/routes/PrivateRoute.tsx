/**
 * @file PrivateRoute.tsx
 * @description Guardia de rutas basado en rol. Redirige a /login si el usuario
 *   no está autenticado, o al dashboard correspondiente si el rol no coincide.
 */
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { authService } from '../services/auth';

interface PrivateRouteProps extends RouteProps {
  requiredRole?: 'user' | 'admin';
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, requiredRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!authService.isLoggedIn()) {
          return <Redirect to="/login" />;
        }
        
        const currentRole = authService.getRole();
        if (requiredRole && currentRole !== requiredRole) {
          // If rol is incorrect, just boot them based on what they are
          return currentRole === 'admin' ? <Redirect to="/admin/dashboard" /> : <Redirect to="/user/dashboard" />;
        }

        return Component ? <Component {...props} /> : null;
      }}
    />
  );
};

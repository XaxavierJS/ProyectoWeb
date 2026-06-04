/**
 * @file App.tsx
 * @description Componente raíz. Define rutas públicas (/login, /register) y
 *   rutas privadas con rol (/user → UserLayout, /admin → AdminLayout).
 *   La autenticación es mock via localStorage — reemplazar authService al integrar backend real.
 */
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

// Rutas Públicas
import Login from './pages/Login';
import Register from './pages/Register';

// Rutas Privadas / Layouts
import UserLayout  from './layout/UserLayout';
import AdminLayout from './layout/AdminLayout';
import { PrivateRoute } from './routes/PrivateRoute';

/* CSS obligatorio para que los componentes Ionic funcionen */
import '@ionic/react/css/core.css';

/* CSS base para aplicaciones Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Utilidades CSS opcionales — se pueden comentar si no se usan */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Modo oscuro de Ionic
 * -----------------------------------------------------
 * Más información en:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Variables de tema personalizadas */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* Rutas públicas — acceso sin autenticación */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        
        {/* Rutas protegidas por rol */}
        <PrivateRoute path="/user" requiredRole="user" component={UserLayout} />
        <PrivateRoute path="/admin" requiredRole="admin" component={AdminLayout} />

        {/* Redirección raíz → login */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;

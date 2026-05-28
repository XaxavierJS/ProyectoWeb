# CiberEscudo — Plataforma de Ciberseguridad Ciudadana

Plataforma web/móvil de capacitación en ciberseguridad dirigida a ciudadanos chilenos. Desarrollada con React + Ionic React, orientada a organismos gubernamentales y organizaciones que necesiten capacitar a su personal en buenas prácticas digitales.

---

## Tabla de contenidos

1. [EP 1.2 — Justificación del problema y análisis del usuario](#ep-12--justificación-del-problema-y-análisis-del-usuario)
2. [P 1.1 — Requerimientos funcionales y no funcionales](#p-11--requerimientos-funcionales-y-no-funcionales)
3. [EP 1.3 — Bocetos UI/UX y prototipo Figma](#ep-13--bocetos-uiux-y-prototipo-figma)
4. [EP 1.4 — Arquitectura de navegación y UX](#ep-14--arquitectura-de-navegación-y-ux)
5. [EP 1.5 — Proyecto Ionic con React](#ep-15--proyecto-ionic-con-react)
6. [EP 1.6 — Pantallas principales implementadas](#ep-16--pantallas-principales-implementadas)
7. [Stack tecnológico](#stack-tecnológico)
8. [Credenciales de prueba](#credenciales-de-prueba)

---

## EP 1.2 — Justificación del problema y análisis del usuario

### Justificación del problema

La ciberseguridad es una preocupación creciente tanto para individuos como para organizaciones. Frecuentemente, el eslabón más débil son los usuarios sin conocimientos técnicos, que caen en tácticas de ingeniería social o cometen errores de configuración básicos. Existe una necesidad urgente de capacitación rápida, accesible y de fácil digestión.

**CiberEscudo** propone una plataforma de microaprendizaje donde los usuarios consumen módulos de ciberseguridad estructurados en texto, seguidos de mini-tests evaluativos, fomentando la retención de conocimientos mediante una interfaz intuitiva y accesible desde cualquier dispositivo.

### Análisis del usuario objetivo

| Tipo | Descripción |
|---|---|
| **Usuario ciudadano** | Personas sin trasfondo técnico profundo que buscan aprender buenas prácticas de ciberseguridad en su tiempo libre o por requerimiento de su organización. Acceden desde navegadores de escritorio o dispositivos móviles. |
| **Administrador** | Personal encargado de capacitar, gestionar contenidos y monitorear el progreso de los usuarios. Requiere herramientas ágiles de gestión (CRUD) desde un panel de administración. |

---

## P 1.1 — Requerimientos funcionales y no funcionales

### Requerimientos funcionales — Rol Administrador

| N° | Requerimiento | Descripción |
|---|---|---|
| RF-01 | **Crear módulo educativo** | El administrador puede crear nuevos módulos de estudio de ciberseguridad definiendo título y contenido en texto. |
| RF-02 | **Modificar módulo educativo** | El administrador puede editar el contenido o título de un módulo existente. |
| RF-03 | **Eliminar módulo educativo** | El administrador puede eliminar un módulo del sistema. La acción requiere confirmación mediante un diálogo modal. |
| RF-04 | **Crear usuario** | El administrador puede registrar usuarios manualmente en el sistema asignando rol y datos básicos. |
| RF-05 | **Modificar usuario** | El administrador puede editar los datos de un usuario existente (nombre, correo, rol). |
| RF-06 | **Eliminar usuario** | El administrador puede dar de baja o eliminar cuentas de usuario. La acción requiere confirmación. |
| RF-07 | **Ver estadísticas de plataforma** | El administrador dispone de un panel (Dashboard) con estadísticas agregadas: total de usuarios, módulos publicados y avance general de los usuarios registrados. |

### Requerimientos funcionales — Rol Usuario

| N° | Requerimiento | Descripción |
|---|---|---|
| RF-08 | **Dashboard de módulos** | El usuario visualiza en su panel principal un listado de módulos educativos disponibles con su estado de avance (pendiente / en progreso / completado). |
| RF-09 | **Acceder a contenido de módulo** | El usuario puede leer el contenido completo de un módulo seleccionado en una vista de detalle. |
| RF-10 | **Realizar mini-test** | Al finalizar la lectura de un módulo, el usuario puede responder un mini-test de selección múltiple. |
| RF-11 | **Ver resultados del test** | El usuario visualiza el resultado de su mini-test (aprobado / reprobado) con retroalimentación inmediata. |
| RF-12 | **Ver progreso personal** | El usuario puede consultar su porcentaje de completado general de todos los módulos desde su panel. |
| RF-13 | **Ver perfil personal** | El usuario puede visualizar la información de su propio perfil (nombre, correo, región, progreso). |
| RF-14 | **Retomar módulo inconcluso** | El usuario puede continuar un módulo previamente iniciado y no terminado, conservando su estado en el sistema. |

> **Nota:** Los flujos de inicio de sesión y registro se encuentran implementados como rutas públicas (`/login`, `/register`) y forman parte de la propuesta base de la plataforma.

### Requerimientos no funcionales

| N° | Categoría | Descripción |
|---|---|---|
| RNF-01 | **Usabilidad** | El diseño debe adaptarse al dispositivo: menú lateral (`aside` / `IonMenu`) en escritorio y barra de navegación inferior (`IonTabs`) en móvil. Las acciones principales deben ser accesibles en un máximo de 3 clics desde cualquier vista. |
| RNF-02 | **Rendimiento** | Las transiciones entre vistas deben completarse en menos de 2 segundos en un dispositivo móvil moderno. El bundle de producción debe estar optimizado mediante code splitting (Vite). |
| RNF-03 | **Seguridad** | La plataforma debe separar vistas de acceso público (login/registro) de los paneles protegidos. Un usuario no autenticado o con rol incorrecto no puede renderizar componentes privados; será redirigido automáticamente. |

---

## EP 1.3 — Bocetos UI/UX y prototipo Figma

El prototipo considera versión **web** y **móvil** para 7 pantallas distintas, con distribución de contenido, componentes de navegación, jerarquía visual y densidad de información diferenciados por dispositivo.

### Enlace al prototipo Figma

> [Ver prototipo interactivo en Figma](https://www.figma.com/design/nqc68ib1kdPFLQOKlNNTQs/Untitled?node-id=1-30&t=5zTQX3heAmB0zdd9-1)  

### Pantallas prototipadas

#### 1. Inicio de sesión (`/login`)

| Web | Móvil |
|---|---|
| ![Login Web](Documentacion/mockups/login-web.png) | ![Login Móvil](Documentacion/mockups/login-mobile.png) |

- Campos: Correo electrónico, Contraseña
- Enlace a registro
- Validación visual de campos vacíos o incorrectos

#### 2. Registro de usuario (`/register`)

| Web | Móvil |
|---|---|
| ![Register Web](Documentacion/mockups/register-web.png) | ![Register Móvil](Documentacion/mockups/register-mobile.png) |

- Campos obligatorios: Nombre de usuario, RUT, Correo electrónico, Región, Comuna, Contraseña, Confirmación de contraseña
- Checkbox de aceptación de términos y condiciones
- Validaciones visuales: contraseñas no coinciden (borde rojo + mensaje), RUT inválido, campos vacíos

#### 3. Dashboard de usuario (`/user/dashboard`)

| Web | Móvil |
|---|---|
| ![Dashboard Usuario Web](Documentacion/mockups/dashboard-user-web.png) | ![Dashboard Usuario Móvil](Documentacion/mockups/dashboard-user-mobile.png) |

- Sidebar lateral en web con íconos y etiquetas
- Bottom tab bar en móvil
- Tarjetas de módulos con estado de progreso y porcentaje completado

#### 4. Vista de módulo — lectura y test (`/user/module/:id`)

| Web | Móvil |
|---|---|
| ![Módulo Web](Documentacion/mockups/module-web.png) | ![Módulo Móvil](Documentacion/mockups/module-mobile.png) |

- Contenido en texto estructurado
- Botón "Hacer mini-test" al finalizar la lectura
- Mini-test de selección múltiple con retroalimentación inmediata

#### 5. Dashboard de administrador — estadísticas (`/admin/dashboard`)

| Web | Móvil |
|---|---|
| ![Dashboard Admin Web](Documentacion/mockups/dashboard-admin-web.png) | ![Dashboard Admin Móvil](Documentacion/mockups/dashboard-admin-mobile.png) |

- Panel con estadísticas: total usuarios, módulos publicados, tasa de completado
- Sidebar de administración con accesos directos a gestión de usuarios y módulos

#### 6. Gestión de usuarios — administrador (`/admin/usuarios`)

| Web | Móvil |
|---|---|
| ![Admin Usuarios Web](Documentacion/mockups/admin-users-web.png) | ![Admin Usuarios Móvil](Documentacion/mockups/admin-users-mobile.png) |

- Tabla/lista de usuarios con nombre, correo, rol y progreso
- Botones de editar y eliminar por fila
- Modal de confirmación para eliminación

#### 7. Gestión de módulos — administrador (`/admin/modulos`)

| Web | Móvil |
|---|---|
| ![Admin Módulos Web](Documentacion/mockups/admin-modules-web.png) | ![Admin Módulos Móvil](Documentacion/mockups/admin-modules-mobile.png) |

- Lista de módulos con título y estado
- Formulario de creación/edición de módulo (título, contenido, preguntas del test)
- Botones de editar y eliminar con confirmación

---

## EP 1.4 — Arquitectura de navegación y UX

### a) Rutas principales y secundarias

```
/                        → Redirige a /login
/login                   → Login.tsx                (pública)
/register                → Register.tsx             (pública)
/user/*                  → UserLayout.tsx           (requiere autenticación + rol: user)
  /user/dashboard        → UserDashboard.tsx
  /user/module/:id       → UserModule.tsx
  /user/profile          → Inline en UserLayout
/admin/*                 → AdminLayout.tsx          (requiere autenticación + rol: admin)
  /admin/dashboard       → AdminDashboard.tsx
  /admin/usuarios        → Gestión de usuarios (CRUD)
  /admin/modulos         → Gestión de módulos (CRUD)
  /admin/perfil          → Perfil del administrador
```

### b) Relaciones jerárquicas entre vistas

```
App
├── / → redirect /login
├── /login (público)
├── /register (público)
├── PrivateRoute (rol: user)
│   └── UserLayout
│       ├── /user/dashboard
│       ├── /user/module/:id
│       └── /user/profile
└── PrivateRoute (rol: admin)
    └── AdminLayout
        ├── /admin/dashboard
        ├── /admin/usuarios
        ├── /admin/modulos
        └── /admin/perfil
```

### c) Flujo de navegación entre funcionalidades

**Flujo de usuario:**
```
/login → /user/dashboard → /user/module/:id → (mini-test) → /user/dashboard
                        ↓
                  /user/profile
```

**Flujo de administrador:**
```
/login → /admin/dashboard → /admin/usuarios (CRUD)
                          → /admin/modulos  (CRUD)
                          → /admin/perfil
```

### d) Diferenciación de acceso según roles

El componente `PrivateRoute` (`src/routes/PrivateRoute.tsx`) valida en cada render:
1. Existencia de sesión activa (`mockLogged === "true"` en localStorage)
2. Coincidencia del rol requerido con el rol almacenado (`mockRole`)

Si alguna condición falla, redirige a `/login`. Un usuario con rol `user` que acceda a rutas `/admin/*` es rechazado; lo mismo aplica al administrador con rutas `/user/*`.

### e) Flujo de principales tareas (Task Flow)

**Tomar un curso:**
1. Usuario inicia sesión → Dashboard
2. Selecciona un módulo de la lista
3. Lee el contenido del módulo
4. Hace clic en "Comenzar mini-test"
5. Responde preguntas de selección múltiple
6. Ve resultado (aprobado/reprobado) con retroalimentación
7. Regresa al Dashboard con progreso actualizado

**Administrar usuarios:**
1. Administrador inicia sesión → Panel admin
2. Navega a "Usuarios"
3. Visualiza la lista de usuarios registrados
4. Edita datos de un usuario (formulario modal) o lo elimina (confirmación)

### f) Puntos críticos de interacción

- **Validación de registro:** Alertas visuales en tiempo real (borde rojo + mensaje) para campos inválidos: RUT mal formateado, contraseñas que no coinciden, correo sin formato válido, campos obligatorios vacíos.
- **Acciones destructivas:** Eliminar usuario o módulo requiere un diálogo de confirmación (`IonAlert`) antes de ejecutarse.
- **Redirección automática:** Al expirar la sesión o navegar a una ruta no autorizada, el sistema redirige a `/login` sin exponer datos protegidos.

### g) Coherencia de experiencia entre dispositivos

| Dispositivo | Navegación | Razón |
|---|---|---|
| **Web (≥768px)** | Sidebar lateral fijo con etiquetas e íconos | El viewport ancho permite navegación permanente visible sin sacrificar espacio de contenido |
| **Móvil (<768px)** | Tab bar en parte inferior de la pantalla | Ergonomía de una mano; tabs inferiores son alcanzables con el pulgar en pantallas pequeñas |

El sidebar y el tab bar muestran las mismas secciones, garantizando que el flujo de navegación sea idéntico independientemente del dispositivo.

### h) Justificación técnica

- **React Router 5.3** con rutas anidadas permite separar layouts (UserLayout, AdminLayout) del contenido de cada vista, favoreciendo la modularidad y escalabilidad.
- **Ionic React** gestiona la transición entre vistas nativas en móvil y un comportamiento SPA en web sin duplicar lógica de navegación.
- **PrivateRoute HOC** centraliza la lógica de autorización: al cambiar el mecanismo de auth (p.ej. JWT real), solo se modifica `src/services/auth.ts`, sin tocar las vistas.
- **Layout responsivo condicional** (`ion-hide-md-up` / `md:block`) evita mantener dos árboles de componentes distintos para móvil y web, reduciendo la superficie de bugs.

---

## EP 1.5 — Proyecto Ionic con React

### Estructura modular del proyecto

```
proyecto-santo-domingo/
│
├── index.html                    # HTML raíz, aplica el tema govchile
├── tailwind.config.js            # Configuración Tailwind + tema DaisyUI govchile
├── postcss.config.js             # PostCSS para Tailwind
├── vite.config.ts                # Configuración de Vite
│
├── public/                       # Activos estáticos (favicon, manifest)
│
├── Documentacion/                # Documentación del proyecto
│   ├── Requerimientos.md         # Requerimientos funcionales y no funcionales
│   └── DESIGN.md                 # Decisiones de diseño y arquitectura
│
└── src/
    ├── App.tsx                   # Componente raíz: define todas las rutas
    ├── main.tsx                  # Punto de entrada: monta App en #root
    │
    ├── data/
    │   └── mockData.json         # Datos mock: usuarios y módulos de capacitación
    │
    ├── layout/
    │   ├── UserLayout.tsx        # Layout usuarios: sidebar + tabs + rutas /user/*
    │   └── AdminLayout.tsx       # Layout admin: sidebar + rutas /admin/*
    │
    ├── pages/
    │   ├── Login.tsx             # Inicio de sesión (/login)
    │   ├── Register.tsx          # Registro de usuario (/register)
    │   ├── UserDashboard.tsx     # Panel usuario: estadísticas y módulos (/user/dashboard)
    │   ├── UserModule.tsx        # Detalle de módulo: contenido y mini-test (/user/module/:id)
    │   └── admin/
    │       └── AdminDashboard.tsx  # Panel admin: usuarios y módulos (/admin/dashboard)
    │
    ├── routes/
    │   └── PrivateRoute.tsx      # Guardia de rutas: valida autenticación y rol
    │
    ├── services/
    │   ├── auth.ts               # Servicio de autenticación mock (localStorage)
    │   └── mockData.ts           # Interfaces TypeScript y acceso a mockData.json
    │
    └── theme/
        └── variables.css         # Tema govchile: tokens DaisyUI e Ionic
```

### a) Uso de React Router

`src/App.tsx` define el árbol de rutas usando `react-router-dom`:

```tsx
<IonReactRouter>
  <Route exact path="/" render={() => <Redirect to="/login" />} />
  <Route path="/login" component={Login} />
  <Route path="/register" component={Register} />
  <PrivateRoute path="/user" role="user" component={UserLayout} />
  <PrivateRoute path="/admin" role="admin" component={AdminLayout} />
</IonReactRouter>
```

### b) Rutas públicas y rutas protegidas

- **Rutas públicas:** `/login`, `/register` — accesibles sin autenticación.
- **Rutas protegidas:** `/user/*`, `/admin/*` — renderizadas solo si `PrivateRoute` valida sesión y rol.

### c) Redirecciones

| Situación | Redirección |
|---|---|
| Acceso a `/` | → `/login` |
| Usuario no autenticado accede a `/user/*` o `/admin/*` | → `/login` |
| Usuario con rol `user` accede a `/admin/*` | → `/login` |
| Login exitoso con rol `user` | → `/user/dashboard` |
| Login exitoso con rol `admin` | → `/admin/dashboard` |

### d) Estructura modular de vistas

Cada vista vive en `src/pages/` y es agnóstica respecto a cómo es presentada (tab o ítem de menú). Los layouts (`src/layout/`) orquestan la navegación sin acoplarla al contenido.

---

## EP 1.6 — Pantallas principales implementadas

Se implementaron las siguientes pantallas con componentes nativos de Ionic React:

### 1. Login (`/login`)

Usa `IonPage`, `IonContent`, `IonInput`, `IonButton`. Formulario de inicio de sesión con validación de campos y redirección según rol tras autenticación exitosa.

### 2. Register (`/register`)

Usa `IonPage`, `IonContent`, `IonInput`, `IonSelect`, `IonCheckbox`, `IonButton`. Formulario completo con campos: Nombre, RUT, Correo, Región, Comuna, Contraseña, Confirmación, Aceptación de T&C.

### 3. Dashboard de usuario (`/user/dashboard`)

Usa `IonPage`, `IonHeader`, `IonToolbar`, `IonContent`, `IonCard`, `IonProgressBar`. Muestra estadísticas de progreso personal y listado de módulos con tarjetas interactivas.

### 4. Vista de módulo (`/user/module/:id`)

Usa `IonPage`, `IonHeader`, `IonBackButton`, `IonContent`. Renderiza el contenido del módulo seleccionado y el mini-test evaluativo de selección múltiple.

### 5. Dashboard de administrador (`/admin/dashboard`)

Usa `IonPage`, `IonHeader`, `IonContent`, `IonGrid`, `IonRow`, `IonCol`. Panel con estadísticas de la plataforma y acceso rápido a gestión de usuarios y módulos.

### Navegación responsiva implementada

```
Desktop (≥768px):
┌─────────────────────────────────────┐
│  Sidebar │  Contenido principal      │
│  ──────  │  ─────────────────────── │
│  Dashboard│                          │
│  Módulos  │  [Vista activa]          │
│  Perfil   │                          │
└─────────────────────────────────────┘

Móvil (<768px):
┌──────────────────────┐
│  Contenido principal │
│                      │
│  [Vista activa]      │
│                      │
├──────────────────────┤
│  Dashboard │ Módulos │ Perfil │
└──────────────────────┘
```

---

## Stack tecnológico

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | Framework UI |
| Ionic React | 8.5 | Componentes nativos y routing móvil/web |
| Tailwind CSS | 3.4 | Estilos utilitarios |
| DaisyUI | 5.5 | Sistema de componentes UI |
| TypeScript | 5.9 | Tipado estático |
| Vite | 5 | Bundler y servidor de desarrollo |
| Capacitor | 8.3 | Empaquetado para apps nativas (iOS/Android) |
| React Router | 5.3 | Navegación SPA |

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Servidor de desarrollo (Vite)
npm run build        # Verificación TypeScript + build de producción
npm run preview      # Previsualizar el build de producción
npm run lint         # Ejecutar ESLint
npm run test.unit    # Pruebas unitarias con Vitest
npm run test.e2e     # Pruebas E2E con Cypress
```

---

## Credenciales de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Usuario | `usuario@correo.cl` | cualquier texto |
| Administrador | `admin@plataforma.cl` | cualquier texto |

> El rol se determina automáticamente por si el correo contiene la palabra `admin`. Esta autenticación es mock — no existe backend real. Para integrar uno, reemplazar `src/services/auth.ts`.

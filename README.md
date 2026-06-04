# CiberEscudo — Plataforma de Ciberseguridad Ciudadana
Integrantes: 
- Javier Retamal
- Lucas Pinto

Plataforma web/móvil de capacitación en ciberseguridad dirigida a ciudadanos chilenos. Desarrollada con React + Ionic React, backend en Node.js + Express + PostgreSQL. Orientada a organismos gubernamentales y organizaciones que necesiten capacitar a su personal en buenas prácticas digitales.

---

## Tabla de contenidos

1. [EP 1.2 — Justificación del problema y análisis del usuario](#ep-12--justificación-del-problema-y-análisis-del-usuario)
2. [EP 1.1 — Requerimientos funcionales y no funcionales](#ep-11--requerimientos-funcionales-y-no-funcionales)
3. [EP 1.3 — Bocetos UI/UX y prototipo Figma](#ep-13--bocetos-uiux-y-prototipo-figma)
4. [EP 1.4 — Arquitectura de navegación y UX](#ep-14--arquitectura-de-navegación-y-ux)
5. [EP 1.5 — Proyecto Ionic con React](#ep-15--proyecto-ionic-con-react)
6. [EP 1.6 — Pantallas principales implementadas](#ep-16--pantallas-principales-implementadas)
7. [EP 2 — Backend e Integración](#ep-2--backend-e-integración)
8. [Stack tecnológico](#stack-tecnológico)
9. [Cómo ejecutar](#cómo-ejecutar)
10. [Estructura del proyecto](#estructura-del-proyecto)
11. [Credenciales de prueba](#credenciales-de-prueba)

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

## EP 1.1 — Requerimientos funcionales y no funcionales

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
| RF-13 | **Ver perfil personal** | El usuario puede visualizar la información de su propio perfil (nombre, correo, progreso). |
| RF-14 | **Retomar módulo inconcluso** | El usuario puede continuar un módulo previamente iniciado y no terminado, conservando su estado en el sistema. Los módulos se desbloquean secuencialmente al completar el anterior. |

> **Nota:** Los flujos de inicio de sesión y registro se encuentran implementados como rutas públicas (`/login`, `/register`).

### Requerimientos no funcionales

| N° | Categoría | Descripción |
|---|---|---|
| RNF-01 | **Usabilidad** | El diseño debe adaptarse al dispositivo: menú lateral (`aside`) en escritorio y barra de navegación inferior (`IonTabs`) en móvil. Las acciones principales deben ser accesibles en un máximo de 3 clics desde cualquier vista. |
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
- Botones de crear, editar y eliminar por fila
- Modal de confirmación para eliminación

#### 7. Gestión de módulos — administrador (`/admin/modulos`)

| Web | Móvil |
|---|---|
| ![Admin Módulos Web](Documentacion/mockups/admin-modules-web.png) | ![Admin Módulos Móvil](Documentacion/mockups/admin-modules-mobile.png) |

- Lista de módulos con título y estado
- Formulario de creación/edición de módulo (título, contenido)
- Botones de crear, editar y eliminar con confirmación

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
  /user/profile          → UserProfile.tsx
/admin/*                 → AdminLayout.tsx          (requiere autenticación + rol: admin)
  /admin/dashboard       → AdminDashboard.tsx
  /admin/usuarios        → AdminUsers.tsx (CRUD)
  /admin/modulos         → AdminModules.tsx (CRUD)
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
1. Existencia de sesión activa en localStorage
2. Coincidencia del rol requerido con el rol almacenado

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
4. Crea, edita o elimina usuarios (formularios modales + confirmación)

### f) Puntos críticos de interacción

- **Validación de registro:** Alertas visuales en tiempo real (borde rojo + mensaje) para campos inválidos: RUT mal formateado, contraseñas que no coinciden, correo sin formato válido, campos obligatorios vacíos.
- **Acciones destructivas:** Eliminar usuario o módulo requiere un diálogo de confirmación antes de ejecutarse.
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
- **PrivateRoute HOC** centraliza la lógica de autorización.
- **Layout responsivo condicional** (`ion-hide-md-up` / `md:block`) evita mantener dos árboles de componentes distintos para móvil y web.

---

## EP 1.5 — Proyecto Ionic con React

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
Usa `IonPage`, `IonContent`. Formulario de inicio de sesión con validación de campos. Panel de marca lateral en desktop. Soporta autenticación via API real con fallback a mock.

### 2. Register (`/register`)
Usa `IonPage`, `IonContent`. Formulario completo con campos: Nombre, RUT, Correo, Región, Comuna, Contraseña, Confirmación, Aceptación de T&C. Validación de coincidencia de contraseñas en tiempo real.

### 3. Dashboard de usuario (`/user/dashboard`)
Usa `IonPage`, `IonHeader`, `IonToolbar`, `IonContent`, `IonProgressBar`. Muestra estadísticas de progreso personal, nivel y listado de módulos con estado (completado / en curso / bloqueado). Los módulos se desbloquean secuencialmente.

### 4. Vista de módulo (`/user/module/:id`)
Usa `IonPage`, `IonHeader`, `IonBackButton`, `IonContent`. Renderiza video educativo, secciones de contenido, fuentes y mini-test evaluativo con retroalimentación inmediata. Progreso persistido en localStorage.

### 5. Dashboard de administrador (`/admin/dashboard`)
Usa `IonPage`, `IonHeader`, `IonContent`. Panel con estadísticas de la plataforma, tabla de usuarios y grilla de módulos con acciones de crear, editar y eliminar.

### 6. Gestión de usuarios (`/admin/usuarios`)
Página independiente con tabla completa de usuarios, botones crear/editar/eliminar y modales correspondientes.

### 7. Gestión de módulos (`/admin/modulos`)
Página independiente con grilla de módulos, botones crear/editar/eliminar y modales correspondientes.

### 8. Perfil de usuario (`/user/profile`)
Página que muestra los datos del usuario logueado (nombre, correo, rol), progreso general y módulos completados.

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

## EP 2 — Backend e Integración

### EP 2.1 — Servidor Express

Backend en Node.js + TypeScript + Express, puerto 4000. Monta middleware de seguridad (helmet, compression, CORS) y manejo centralizado de errores.

```
backend/
├── src/
│   ├── index.ts           # Punto de entrada
│   ├── app.ts             # Configuración Express + middleware
│   ├── db.ts              # Conexión PostgreSQL (Pool)
│   ├── types.ts           # Tipos compartidos
│   ├── errors/
│   │   └── AppError.ts    # Clases de error (AppError, NotFound, Validation, etc.)
│   ├── utils/
│   │   └── apiResponse.ts # Respuestas estandarizadas (success, error, paginated)
│   ├── validators/
│   │   ├── auth.ts        # Zod: loginSchema, registerSchema
│   │   ├── user.ts        # Zod: createUserSchema, updateUserSchema
│   │   └── module.ts      # Zod: createModuleSchema, updateModuleSchema
│   ├── repositories/
│   │   ├── userRepo.ts    # Consultas SQL usuarios
│   │   └── moduleRepo.ts  # Consultas SQL módulos
│   ├── services/
│   │   ├── authService.ts # Lógica de login/registro
│   │   ├── userService.ts # Lógica CRUD usuarios
│   │   └── moduleService.ts # Lógica CRUD módulos
│   ├── middleware/
│   │   └── auth.ts        # Middleware JWT (authenticate)
│   └── routes/
│       ├── auth.ts        # POST /login, /register
│       ├── users.ts       # CRUD usuarios + /me + /me/progress
│       └── modules.ts     # CRUD módulos + /:id/progress
```

### EP 2.2 — Base de datos PostgreSQL

| Tabla | Propósito |
|---|---|
| `usuarios` | Usuarios del sistema (username, email, password_hash, rol, estado) |
| `modulos` | Módulos educativos (titulo, descripcion, activo) |
| `videos` | Videos asociados a módulos |
| `secciones` | Secciones de contenido por módulo |
| `fuentes` | Fuentes bibliográficas por módulo |
| `quizzes` | Preguntas de evaluación por módulo |
| `opciones_quiz` | Opciones de respuesta para cada quiz |
| `user_progress` | Progreso del usuario por módulo |

### EP 2.3 — API REST Endpoints

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| `GET` | `/api/health` | No | Estado del servicio |
| `POST` | `/api/auth/login` | No | Inicia sesión (devuelve JWT) |
| `POST` | `/api/auth/register` | No | Registra nuevo usuario |
| `GET` | `/api/modules` | No | Lista módulos |
| `GET` | `/api/modules/:id` | No | Detalle módulo con secciones, video, quiz |
| `POST` | `/api/modules` | JWT | Crea módulo |
| `PUT` | `/api/modules/:id` | JWT | Actualiza módulo |
| `DELETE` | `/api/modules/:id` | JWT | Elimina módulo |
| `POST` | `/api/modules/:id/progress` | JWT | Actualiza progreso |
| `GET` | `/api/users/me` | JWT | Perfil propio |
| `GET` | `/api/users/me/progress` | JWT | Progreso propio |
| `GET` | `/api/users` | JWT+admin | Lista usuarios |
| `GET` | `/api/users/:id` | JWT+admin | Detalle usuario |
| `POST` | `/api/users` | JWT+admin | Crea usuario |
| `PUT` | `/api/users/:id` | JWT+admin | Actualiza usuario |
| `DELETE` | `/api/users/:id` | JWT+admin | Elimina usuario |

### EP 2.4 — Consumo API desde Frontend

- Cliente HTTP en `src/services/api/http.ts` con fetch + Authorization header
- Servicios: `auth.ts`, `modules.ts`, `users.ts` con tipos
- Fachada con fallback a datos mock (`dataFacade.ts`)
- Proxy Vite: `/api` → `localhost:4000`

### EP 2.5 — Autenticación JWT

- Generación de JWT con `jsonwebtoken` (expiración 8h)
- Middleware `authenticate` valida Bearer token
- Roles `user` / `admin` en el payload del token
- Frontend almacena token y rol en localStorage

### EP 2.6 — Validación y Seguridad

- **Zod** para validación de inputs en todos los endpoints
- **bcrypt** para hash de contraseñas (salt rounds: 10)
- **Consultas parametrizadas** ($1, $2, ...) contra inyección SQL
- **Helmet** para headers de seguridad HTTP
- **CORS** configurado para el frontend

### EP 2.7 — Pruebas funcionales

- Colección Postman disponible en `Documentacion/postman-collection.json` (13 endpoints con tests de validación)

---

## Stack tecnológico

### Frontend

| Tecnología | Versión | Rol |
|---|---|---|
| React | 19 | Framework UI |
| Ionic React | 8.5 | Componentes nativos y routing móvil/web |
| Tailwind CSS | 3.4 | Estilos utilitarios |
| DaisyUI | 5.5 | Sistema de componentes UI |
| TypeScript | 5.9 | Tipado estático |
| Vite | 5 | Bundler y servidor de desarrollo |
| React Router | 5.3 | Navegación SPA |
| Capacitor | 8.3 | Empaquetado para apps nativas (iOS/Android) |
| Vitest | 0.34 | Tests unitarios |

### Backend

| Tecnología | Versión | Rol |
|---|---|---|
| Node.js | 20+ | Entorno runtime |
| Express | 4.22 | Framework HTTP |
| TypeScript | 5.9 | Tipado estático |
| PostgreSQL | 16 | Base de datos relacional |
| pg | 8.21 | Cliente PostgreSQL |
| jsonwebtoken | 9.0 | Autenticación JWT |
| bcryptjs | 2.4 | Hash de contraseñas |
| Zod | 4.4 | Validación de esquemas |
| helmet | 8+ | Seguridad HTTP |
| compression | 1.7 | Compresión gzip |

---

## Cómo ejecutar

### Solo frontend (sin backend — usa datos mock)

```bash
npm install
npm run dev
# → http://localhost:5173
```

### Frontend + Backend (requiere PostgreSQL)

**Terminal 1 — Backend:**
```bash
cd backend
npm install
# Configurar backend/.env con DATABASE_URL
npm run dev
# → http://localhost:4000
```

**Terminal 2 — Frontend:**
```bash
npm run dev
# → http://localhost:5173 (proxy automático a :4000)
```

### Otros comandos

```bash
npm run build        # TypeScript + build producción
npm run preview      # Previsualizar build
npm run lint         # ESLint
npm run test.unit    # Tests unitarios (Vitest) — 18 tests
npm run test.e2e     # Tests E2E (Cypress)
```

---

## Estructura del proyecto

```
proyecto-santo-domingo/
│
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
│
├── public/                     # Activos estáticos
│
├── Documentacion/
│   ├── Requerimientos.md
│   ├── Entregables.md
│   ├── postman-collection.json # Colección Postman (13 endpoints)
│   └── mockups/                # Capturas UI/UX
│
├── backend/                    # Backend Express + PostgreSQL
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── app.ts
│       ├── db.ts
│       ├── types.ts
│       ├── errors/AppError.ts
│       ├── utils/apiResponse.ts
│       ├── validators/ (auth, user, module)
│       ├── repositories/ (userRepo, moduleRepo)
│       ├── services/ (authService, userService, moduleService)
│       ├── middleware/auth.ts
│       └── routes/ (auth, users, modules)
│
├── cypress/                    # Tests E2E
│
└── src/
    ├── App.tsx                 # Rutas principales
    ├── main.tsx                # Punto de entrada
    ├── setupTests.ts           # Configuración Vitest
    │
    ├── data/
    │   └── mockData.json       # Datos mock
    │
    ├── context/
    │   └── SidebarContext.ts   # Estado del sidebar
    │
    ├── layout/
    │   ├── UserLayout.tsx      # Layout usuario (sidebar + tabs)
    │   └── AdminLayout.tsx     # Layout admin (sidebar + tabs)
    │
    ├── pages/
    │   ├── Login.tsx           # /login
    │   ├── Register.tsx        # /register
    │   ├── UserDashboard.tsx   # /user/dashboard
    │   ├── UserModule.tsx      # /user/module/:id
    │   ├── UserProfile.tsx     # /user/profile
    │   └── admin/
    │       ├── AdminDashboard.tsx
    │       ├── AdminUsers.tsx
    │       └── AdminModules.tsx
    │
    ├── components/
    │   └── admin/
    │       ├── StatCard.tsx
    │       ├── ConfirmDialog.tsx
    │       ├── EditUserModal.tsx
    │       ├── CreateUserModal.tsx
    │       ├── EditModuleModal.tsx
    │       └── CreateModuleModal.tsx
    │
    ├── routes/
    │   └── PrivateRoute.tsx    # Guardia de rutas
    │
    ├── services/
    │   ├── auth.ts             # Autenticación (localStorage)
    │   ├── mockData.ts         # Interfaces y datos mock
    │   ├── progress.ts         # Progreso de módulos
    │   └── api/
    │       ├── http.ts         # Cliente HTTP
    │       ├── auth.ts         # API auth
    │       ├── modules.ts      # API módulos
    │       ├── users.ts        # API usuarios
    │       ├── types.ts        # Tipos API
    │       └── facade.ts       # Fachada con fallback mock
    │
    └── theme/
        └── variables.css       # Tema govchile
```

---

## Credenciales de prueba

### Sin backend (modo desarrollo — datos mock)

| Rol | Correo | Contraseña |
|---|---|---|
| Usuario | `usuario@correo.cl` | cualquier texto |
| Administrador | `admin@plataforma.cl` | cualquier texto |

> El login detecta el rol automáticamente: si el correo contiene "admin" → administrador, si no → usuario. Si te registras antes, tus datos se guardan y aparecen en el perfil.

### Con backend real (PostgreSQL)

Las credenciales dependen de los usuarios registrados en la base de datos. El registro y login validan contra la BD.

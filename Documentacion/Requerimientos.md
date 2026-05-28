# Documentación del Proyecto: Plataforma de Ciberseguridad

## EP 1.2: Justificación del problema y análisis del usuario objetivo

**Justificación del problema:** 
La ciberseguridad es una preocupación creciente tanto para individuos como para organizaciones. Frecuentemente, el eslabón más débil son los usuarios sin conocimientos técnicos, que caen en tácticas de ingeniería social o cometen errores de configuración. Existe una necesidad de capacitación rápida, accesible y de fácil digestión. Este proyecto propone una plataforma de microaprendizaje donde los usuarios puedan consumir módulos de ciberseguridad en texto plano seguidos de mini-tests, fomentando la retención de conocimientos mediante una interfaz intuitiva y directa.

**Usuario Objetivo:**
- **Usuario Normal:** Personas sin un trasfondo técnico profundo que buscan aprender buenas prácticas de ciberseguridad en su tiempo libre o por requerimiento de su organización. Acceden desde navegadores de escritorio o dispositivos móviles.
- **Administrador:** Personal encargado de capacitar, gestionar los contenidos y monitorear el progreso de los usuarios normales. Requiere herramientas rápidas de gestión (CRUD) desde un panel.

---

## EP 1.1: Requerimientos Funcionales y No Funcionales

### Requerimientos Funcionales - Administrador (Admin)
1. **Crear Módulo Educativo:** El administrador puede crear nuevos módulos de estudio de ciberseguridad (añadiendo título y texto plano).
2. **Modificar Módulo Educativo:** El administrador puede editar el contenido o título de un módulo existente.
3. **Eliminar Módulo Educativo:** El administrador puede borrar un módulo del sistema.
4. **Crear Usuario:** El administrador puede registrar usuarios manualmente en el sistema.
5. **Modificar Usuario:** El administrador puede editar los datos de un usuario existente.
6. **Eliminar Usuario:** El administrador puede dar de baja o eliminar cuentas de usuario.
7. **Ver Estadísticas:** El administrador puede ver una lista de usuarios reflejando su avance y módulos completados.

### Requerimientos Funcionales - Usuario Normal (Usuario)
1. **Ver Módulos:** El usuario puede visualizar en un listado (Dashboard) los módulos educativos disponibles.
2. **Ver Progreso:** El usuario puede ver el porcentaje de completado general de sus cursos dentro de su portal.
3. **Acceder a Contenido:** El usuario puede leer el contenido de texto plano correspondiente a un módulo seleccionado.
4. **Realizar Mini-Test:** El usuario puede acceder a un mini-test evaluativo al finalizar la lectura de un módulo.
5. **Ver Resultados:** El usuario puede visualizar los resultados de su mini-test (aprobado o reprobado).
6. **Ver Perfil:** El usuario puede visualizar la información de su propio perfil.
7. **Retomar Módulo:** El usuario puede continuar un módulo previamente empezado y no terminado, conservando su estado (pendiente).

### Requerimientos No Funcionales
1. **Usabilidad (Navegación Cruzada):** El diseño debe ser adaptable considerando flujos de navegación diferenciados pero coherentes; deberá usar un menú lateral (`IonMenu`) en la versión de escritorio y una barra de navegación inferior (`IonTabs`) para la versión móvil, asegurando acciones principales a un máximo de 3 clics.
2. **Rendimiento:** Tiempos de carga ágiles entre transiciones de vistas. Al ser una aplicación construida en React + Ionic, la renderización de las rutas principales (Dashboard) debe tomar menos de 2 segundos en un dispositivo móvil moderno.
3. **Seguridad (Enrutamiento Protegido):** La plataforma debe poseer protección en el frontend separando las vistas de acceso público (Login/Registro) del panel de usuario y de administrador. Un usuario no autorizado no puede renderizar componentes protegidos.

---

## EP 1.3: Bocetos de UI/UX y prototipo (Descripción para Figma)

Se requiere la creación de un prototipo en Figma considerando Web y Móvil para al menos 7 pantallas, incluyendo jerarquía y diseño centrado en el usuario.
1. **Pantalla de Inicio de Sesión:** Inputs para Usuario/Contraseña y botón de Login.
2. **Pantalla de Registro:** Formulario con los campos obligatorios: Nombre de usuario, RUT, Correo Electrónico, Región, Comuna, Contraseña, Confirmación de Contraseña, Checkbox de T&C. Muestra validaciones visuales.
3. **Dashboard Usuario (Lista de Módulos):** Pantalla principal post-login mostrando tarjetas de los módulos de ciberseguridad y barra de % de completado.
4. **Vista de Módulo (Lectura):** Pantalla detallando el contenido en texto plano.
5. **Vista de Mini-Test:** Formulario tipo quiz de selección múltiple.
6. **Panel Administrador (Usuarios):** Tabla o lista de usuarios con botones para CRUD.
7. **Panel Administrador (Módulos):** Interfaz para agregar o editar el contenido texto plano de un módulo educativo.

*Nota técnica:* Para mobile se utilizará Bottom Tabs y para web Sidebar Menu.

---

## EP 1.4: Definición de Arquitectura de Navegación y UX

### a) Rutas Principales y Secundarias
- **Públicas:** `/login`, `/register`
- **Privadas (Usuario):** `/user/dashboard` (Lista módulos), `/user/module/:id` (Lectura y Test), `/user/profile`.
- **Privadas (Admin):** `/admin/dashboard` (Estadísticas), `/admin/users` (CRUD), `/admin/modules` (CRUD).

### b) Relaciones jerárquicas y c) Flujo de navegación
- Raíz (`/`) redirige a `/login` si no hay token.
- Al autenticarse, dependiendo del rol se redirige a `/user/dashboard` o `/admin/dashboard`.
- Desde `/user/dashboard`, el usuario puede elegir un módulo (navegación *forward* a `/user/module/:id`) y regresar (navegación *back*).

### d) Diferenciación de acceso según roles
- Implementación de un Higher Order Component u HoD de enrutamiento (`<ProtectedRoute>`). Si el rol actual es "User", cualquier intento a `/admin/*` lo redirigirá a un mensaje de "Acceso Denegado" o a su Dashboard.

### e) Flujo de principales tareas (Task Flow)
- **Registro -> Ingreso:** Usuario llena formulario -> Cae al login -> Ingresa -> Entra al Dashboard.
- **Tomar un curso:** Usuario en Dashboard -> Clic en Módulo X -> Lee contenido -> Clic en "Hacer Mini-test" -> Pasa el quiz -> Vuelve a Dashboard con % actualizado.

### f) Puntos críticos de interacción
- Validación de formulario de registro (alertas visuales de contraste rojo en caso de fallo, p.e. contraseñas que no coinciden).
- Acciones destructivas del administrador (Eliminar usuario requiere pop-up de confirmación).

### g) Coherencia de experiencia entre dispositivos y h) Justificación Técnica
La UI usará un patrón "Split Pane" / "Tabs" condicional. 
- **Web:** Dado que el viewport es ancho, usamos `IonSplitPane` con `IonMenu` permanente a la izquierda para accesibilidad directa a todas las áreas, garantizando claridad estructural.
- **Móvil:** Dado que la pantalla es angosta, un menú lateral ocultaría el contenido. Se usarán `IonTabs` en la parte inferior para accesibilidad ergonómica con una mano.
- **Justificación:** Ionic maneja esto nativamente sin duplicar estado en React. La escalabilidad frontal se mantiene al definir las vistas de `pages/` de manera agnóstica a si son presentadas mediante un tab o un item de menú. 

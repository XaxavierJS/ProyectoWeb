# Entregas Parciales
## 1. Entrega Parcial 1: Dise˜no y Estructura inicial
Objetivo: Definir el dise˜no de la aplicaci´on y construir la estructura
del frontend en Ionic+ React.
## EP 1.1: Definici´on de al menos 7 requerimientos funcionales y al
menos 3 no funcionales (rendimiento, seguridad, usabilidad). Estas
funcionalidades no pueden ser repetitivas. Estas funcionalidades
est´an fuera de inicio se sesi´on o registrarse ya que deben estar
inmersas en la propuesta. Dentro de las funcionalidades deben
considerar dos tipos de roles (ejemplo: usuario y admin).
## EP 1.2: Justificaci´on del problema y an´alisis del usuario objetivo.
## EP 1.3: Bocetos de UI/UX y prototipo en Figma de al menos 7 mockups o pantallas distintas, cada una correspondiente
a una funcionalidad previamente definida en los requerimientos
del proyecto. Cada pantalla deber´a presentar un dise˜no diferenciado, coherente con el flujo de navegaci´on y la jerarqu´ıa de informaci´on. Las interfaces deber´as ser prototipadas considerando
expl´ıcitamente: versi´on m´ovil y web. El dise˜no deber´a evidenciar
distribuci´on de contenido, componentes de navegaci´on (por ejemplo: men´u lateral en web, barra inferior en m´ovil), jerarqu´ıa visual
y densidad de la informaci´on. Se deber´a Incluir en los mockups
dos formularios relacionados al inicio de sesi´on de usuarios y registro, considerando los campos: Nombre de usuario, RUT, Correo Electr´onico, Regi´on, Comuna, Contrase˜na, Confirmaci´on de
Contrase˜na y aceptaci´on de t´erminos y condiciones. Considerando
validaciones visuales y dise˜no centrado en el usuario.
## EP 1.4: Definici´on de Arquitectura de Navegaci´on y Experiencia
del Usuario. El equipo deber´a definir la arquitectura de navegaci´on de la aplicaci´on, describiendo la estructura de rutas, jerarqu´ıa de vistas, y flujo de interacci´on entre pantallas. La entrega
deber´a incluir: (a) Rutas principales y secundarias; (b) Relaciones
jer´arquicas entre vistas; (c) Flujo de navegaci´on entre funcionalidades; (d) diferenciaci´on de acceso seg´un roles (por ejemplo: usuario /administrador); (e) flujo de principales tareas (task flow), (f)
puntos cr´ıticos de interacci´on; (g) coherencia de experiencia entre
dispositivos; (h) breve justificaci´on t´ecnica de las decisiones adoptadas, considerando usabilidad, eficiencia de interacci´on, claridad
estructural y escalabilidad de la arquitectura frontend.
## EP 1.5: Creaci´on del proyecto en Ionic con React, considerando:
(a) Uso de react router; (b) Rutas p´ublicas y rutas protegidas; (c)
Redirecciones (ejemplo: login obligatorio); (d) Estructura modular
de vistas.
## EP 1.6: Dise˜no de pantallas principales e incorporando una estructura de navegaci´on funcional y coherente con la arquitectura
previamente definida en ionic-react (al menos 4). Uso de componentes propios de Ionic (IonPage, IonHeader, IonContent, IonTabs, IonMenu, etc). Separaci´on estructural del c´odigo en carpetas
(pages, components, routes, services).
Entrega:
Repositorio GitHub/GitLab con el c´odigo del frontend
Prototipo UI/UX en Figma.
Aplicaci´on navegable con dise˜no b´asico realizado en Ionic + React.
Readme.md que incluya la documentaci´on t´ecnica.
## 2. Entrega Parcial 2: Integraci´on frontend + backend y Autenticaci´on
Objetivo: Implementar el backend en Node.js con Express, Flask u
otro framework backend, y conectarlo con el frontend y agregar autenticaci´on.
## EP 2.1: Creaci´on del servidor en Node.js con Express o Flask
## EP 2.2: Configuraci´on y modelado de la base de datos relacional.
Deber´an incluir el dise˜no modelo relacional y la implementaci´on
en base de datos usando PostgreSQL/ MySQL, uso de ORM (opcional) y validaci´on de integridad.
## EP 2.3: Desarrollo de API REST con endpoints b´asicos (GET,
POST, PUT/PATCH, y DELETE). Manejo adecuado de c´odigos
HTTP y respuestas en formato JSON estructurado.
## EP 2.4: Consumo de la API REST desde Ionic con React utilizando fetch o Axios, implementando manejo de errores, interceptores
y gesti´on de tokens JWT.
## EP 2.5: Implementaci´on de autenticaci´on con JWT deber´a incluir
(a) formulario de registro e inicio de sesi´on; (b) rutas protegias en
frontend; (c) generaci´on y validaci´on de JWT; (d) diferenciaci´on
por roles.
## EP 2.6: Validaci´on de usuarios y manejo de sesiones deber´a incluir: (a) validaci´on de inputs ; (b) Hash de contrase˜nas con bcrypt;
(c) Manejo seguro de credenciales; (d) Protecci´on b´asica contra inyecci´on SQL.
## EP 2.7: Pruebas funcionales, considerando (a) Pruebas en Postman o Insomnia; (b) Documentaci´on de endpoints; (c) Evidencia
de pruebas.
Entrega:
Backend funcional con API REST
Autenticaci´on y manejo de usuarios
Integraci´on frontend + backend con pruebas en Postman o Insomnia.
Repositorio actualizado o crear un nuevo repositorio para backend
y otro para front-end.
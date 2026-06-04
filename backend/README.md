# Backend de CiberEscudo — Documentación

Este repositorio contiene el backend en Node + TypeScript que expone una API REST sobre PostgreSQL.

**Estado actual**: implementadas rutas de autenticación (`/api/auth`), gestión de módulos (`/api/modules`), gestión de usuarios (`/api/users`) y endpoint de salud (`/api/health`). Autenticación con JWT, conexión a base de datos mediante `DATABASE_URL`.

**Archivos principales**
- `src/index.ts` — arranque del servidor (por defecto puerto `4000`).
- `src/app.ts` — middleware, CORS y montaje de rutas.
- `src/db.ts` — carga de `.env` y creación de `pg.Pool` usando `DATABASE_URL`.
- `src/middleware/auth.ts` — middleware `authenticate` para validar JWT (`Authorization: Bearer ...`).
- `src/routes/auth.ts`, `src/routes/modules.ts`, `src/routes/users.ts` — endpoints principales.

**Variables de entorno requeridas**
Crear un archivo `.env` en `backend/` con como mínimo:

```
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
JWT_SECRET=una_clave_secreta_para_jwt
FRONTEND_URL=http://localhost:5173
# Opcional: PORT=4000
```

Nota: `src/db.ts` lanzará un error si `DATABASE_URL` no está definido.

-------------------------
**Cómo ejecutar**

1. Abrir una terminal en la carpeta `backend`:

```bash
cd backend
npm install
```

2. Crear `.env` con las variables anteriores.

3. Para desarrollo con recarga automática:

```bash
npm run dev
```

4. Compilar y ejecutar en producción:

```bash
npm run build
npm start
```

El servidor arranca por defecto en `http://localhost:4000` (puedes cambiar el puerto con `PORT` en el `.env`).

-------------------------
**Autenticación**
- El backend usa JWT. La clave es `JWT_SECRET`.
- Formato de cabecera para rutas protegidas: `Authorization: Bearer <token>`.
- Los tokens expiran en 8 horas (según `auth.ts`).

-------------------------
**Endpoints**

Base: `http://<host>:<port>/api`

- `GET /api/health`
	- Descripción: Estado del servicio.
	- Autorización: no.
	- Ejemplo respuesta: `{ "status": "ok" }`

- Auth (`/api/auth`)
	- `POST /api/auth/login`
		- Descripción: inicia sesión y devuelve `token` y `user`.
		- Body JSON: `{ "email": "user@example.com", "password": "secret" }`
		- Respuestas: `200` con `{ token, user }`, `400` si faltan campos, `401` credenciales inválidas.

	- `POST /api/auth/register`
		- Descripción: crea un nuevo usuario (rol por defecto `user`).
		- Body JSON: `{ "username": "Nombre", "email": "x@x.com", "password": "secret" }`
		- Respuestas: `201` con `user`, `409` si ya existe email.

- Módulos (`/api/modules`)
	- `GET /api/modules`
		- Descripción: lista todos los módulos.
		- Autorización: no.

	- `GET /api/modules/:id`
		- Descripción: devuelve detalle de un módulo (videos, secciones, fuentes, quiz si existe).
		- Autorización: no.

	- `POST /api/modules`
		- Descripción: crea un módulo.
		- Body JSON: `{ "titulo": "...", "descripcion": "..." }`
		- Autorización: no (según implementación actual).

	- `PUT /api/modules/:id`
		- Descripción: actualiza título y descripción.
		- Body JSON: `{ "titulo": "...", "descripcion": "..." }`

	- `DELETE /api/modules/:id`
		- Descripción: elimina un módulo.

	- `POST /api/modules/:id/progress`
		- Descripción: marca/actualiza progreso del usuario en el módulo.
		- Body JSON: `{ "completed": true }` (campo booleano obligatorio)
		- Autorización: sí (cabecera `Authorization: Bearer <token>`). El token se usa para obtener `user.id`.

- Usuarios (`/api/users`)
	- `GET /api/users/me`
		- Descripción: devuelve información del usuario autenticado.
		- Autorización: sí.

	- `GET /api/users/me/progress`
		- Descripción: devuelve progreso (módulo_id, titulo, completado) del usuario autenticado.
		- Autorización: sí.

	- `GET /api/users`
		- Descripción: lista usuarios (solo admin).
		- Autorización: sí (rol `admin`).

	- `GET /api/users/:id`, `POST /api/users`, `PUT /api/users/:id`, `PATCH /api/users/:id`, `DELETE /api/users/:id`
		- Descripción: operaciones CRUD sobre usuarios. Requieren autenticación con rol `admin`.

-------------------------
**Ejemplos con curl**

Login y uso de token:

```bash
# Login
curl -s -X POST http://localhost:4000/api/auth/login \
	-H "Content-Type: application/json" \
	-d '{"email":"admin@local","password":"secret"}'

# Respuesta: { "token": "ey...", "user": {...} }

# Usar token para endpoint protegido
curl -H "Authorization: Bearer ey..." http://localhost:4000/api/users/me
```

-------------------------
**Base de datos — tablas esperadas (ejemplos)**

El código asume varias tablas y columnas; a continuación hay esquemas SQL mínimos de ejemplo que puedes adaptar a tu base de datos real.

```sql
CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	rol TEXT NOT NULL DEFAULT 'user',   
	estado TEXT NOT NULL DEFAULT 'activo',
	fecha_creacion TIMESTAMP DEFAULT now()
);

CREATE TABLE modulos (
	id SERIAL PRIMARY KEY,
	titulo TEXT NOT NULL,
	descripcion TEXT,
	activo BOOLEAN DEFAULT true,
	fecha_creacion TIMESTAMP DEFAULT now()
);

CREATE TABLE videos (
	id SERIAL PRIMARY KEY,
	modulo_id INTEGER REFERENCES modulos(id),
	url TEXT
);

CREATE TABLE secciones (
	id SERIAL PRIMARY KEY,
	modulo_id INTEGER REFERENCES modulos(id),
	titulo TEXT,
	contenido TEXT
);

CREATE TABLE fuentes (
	id SERIAL PRIMARY KEY,
	modulo_id INTEGER REFERENCES modulos(id),
	titulo TEXT,
	autor TEXT,
	url TEXT
);

CREATE TABLE quizzes (
	id SERIAL PRIMARY KEY,
	modulo_id INTEGER REFERENCES modulos(id),
	pregunta TEXT,
	respuesta_correcta INTEGER
);

CREATE TABLE opciones_quiz (
	id SERIAL PRIMARY KEY,
	quiz_id INTEGER REFERENCES quizzes(id),
	texto TEXT
);


CREATE VIEW progreso_usuario AS SELECT user_id AS usuario_id, module_id AS modulo_id, completed AS completado FROM user_progress;
```

**Nota importante**: en el código actual hay una inconsistencia de nombres de tablas/columnas:
- `modules.ts` inserta/usa `user_progress`.
- `users.ts` consulta `progreso_usuario` y columnas como `usuario_id`, `modulo_id`, `completado`.

Puedes solucionar esto de forma rápida creando la vista `progreso_usuario` (ver arriba) o renombrando/duplicando las tablas según convenga.

-------------------------
**Pruebas rápidas**

- Ver estado del backend:

```bash
curl http://localhost:4000/api/health
```

- Crear un usuario (registro) y probar login con `POST /api/auth/register` y `POST /api/auth/login`.
- Probar `GET /api/modules` y `GET /api/modules/:id`.
- Probar endpoints protegidos con `Authorization: Bearer <token>`.

-------------------------
**Advertencias y recomendaciones**
- Revisa y adapta las consultas SQL a tu esquema real si tienes nombres distintos de tablas/columnas.
- Para producción: usa una `JWT_SECRET` fuerte y no dejes valores por defecto en `.env`.
- Considera añadir migraciones (Flyway, knex, Prisma Migrate, etc.) para facilitar reproducibilidad de la estructura de la DB.

Si quieres, puedo generar scripts SQL de migración más completos o actualizar el código para que use nombres de tablas en español de forma consistente.

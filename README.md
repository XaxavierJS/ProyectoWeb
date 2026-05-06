# Proyecto Santo Domingo

Este es un proyecto basado en Ionic, React y Vite, con capacidades multiplataforma gracias a Capacitor.

## 🚀 Comandos para iniciar el proyecto

Asegúrate de tener Node.js instalado antes de comenzar.

1. **Instalar las dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo local:**
   ```bash
   npm run dev
   # Alternativamente, si tienes instalado Ionic CLI globalmente:
   ionic serve
   ```

3. **Construir la aplicación para producción:**
   ```bash
   npm run build
   ```

4. **Ejecutar pruebas (E2E con Cypress):**
   ```bash
   npx cypress open
   ```

---

## 📂 Estructura principal del proyecto

```text
proyecto-santo-domingo/
├── capacitor.config.ts   # Configuración de Capacitor (bridge nativo para iOS/Android)
├── ionic.config.json     # Configuración general de Ionic
├── vite.config.ts        # Configuración del empaquetador Vite
├── package.json          # Dependencias y scripts de NPM
├── tsconfig.json         # Configuración del compilador de TypeScript
├── cypress/              # Pruebas End-to-End (E2E)
│   ├── e2e/              # Casos de prueba
│   ├── fixtures/         # Datos de prueba
│   └── support/          # Comandos personalizados de Cypress
├── public/               # Archivos estáticos
│   └── manifest.json     # Manifest PWA
└── src/                  # Código fuente principal de la aplicación React
    ├── components/       # Componentes de la interfaz de usuario
    ├── pages/            # Vistas / Rutas principales (Tab1, Tab2, etc.)
    ├── theme/            # Hojas de estilo globales y variables de Ionic (CSS)
    ├── App.tsx           # Componente raíz y definición de rutas
    └── main.tsx          # Punto de entrada de React en el DOM
```

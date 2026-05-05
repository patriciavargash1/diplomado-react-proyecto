# Diplomado en Desarrollo Full Stack(React) - Proyecto de Gestión de Tareas

Una aplicación web moderna para la gestión de tareas construida con React, TypeScript y Material-UI.

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 19.2.5 con TypeScript
- **UI Framework**: Material-UI (MUI) v9
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Validación**: Zod
- **Deployment**: GitHub Pages

## 📋 Características

- ✅ Autenticación de usuarios
- ✅ Gestión completa de tareas (CRUD)
- ✅ Interfaz moderna y responsiva
- ✅ Validación de formularios
- ✅ Manejo de estados con React hooks
- ✅ Integración con API REST
- ✅ Notificaciones de usuario

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── config/             # Configuración de la aplicación
├── context/            # Contextos de React (Auth, Alert)
├── helpers/            # Utilidades y helpers
├── hooks/              # Custom hooks
├── interfaces/         # Interfaces TypeScript
├── layouts/            # Layouts de la aplicación
├── lib/                # Configuración de librerías externas
├── models/             # Modelos de datos y validaciones
├── pages/              # Páginas de la aplicación
│   ├── private/        # Páginas protegidas (requieren auth)
│   └── public/         # Páginas públicas
├── routes/             # Configuración de rutas
└── tests/              # Tests automatizados
```

## 🔧 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/patriciavargash1/diplomado-react-proyecto.git
cd diplomado-react-proyecto
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=https://taskdone-node.onrender.com/api
```

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta ESLint para verificar el código
- `npm run deploy` - Despliega la aplicación en GitHub Pages

## 🌐 API

La aplicación se conecta a la API REST alojada en:
**https://taskdone-node.onrender.com/api**

### Endpoints principales:
- `POST /users` - Registro de usuarios
- `POST /auth/login` - Inicio de sesión
- `GET /tasks` - Listar tareas del usuario
- `POST /tasks` - Crear nueva tarea
- `PUT /tasks/:id` - Actualizar tarea
- `PATCH /tasks/:id` - Actualiza parcialmente una tarea (por ejemplo, marcarla como done)
- `DELETE /tasks/:id` - Eliminar tarea

## 🔐 Autenticación

La aplicación utiliza JWT (JSON Web Tokens) para la autenticación. Una vez autenticado, el token se incluye automáticamente en todas las peticiones a la API.

## 🚀 Despliegue

La aplicación está configurada para desplegarse automáticamente en GitHub Pages mediante el script `deploy`.

## 📝 Licencia

Este proyecto es parte del Diplomado en Desarrollo Full Stack.

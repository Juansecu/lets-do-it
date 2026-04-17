# Let's Do It!

App para administrar tareas.

## Requerimientos

### Desarrollo

- **[Node.js](https://nodejs.org/en/) -** Versión 24.x o superior
- Emulador o dispositivo móvil Android/IOS
  para testear la aplicación de manera nativa
- Variable de entorno `ANDROID_HOME` configurada
  con la ruta del SDK de Android para correr la aplicación
  usando el comando `ionic cap run android -l --external`

## Estructura del Proyecto

La estructura de archivos de este proyecto se basa
en el patrón de área de interés, más específicamente en el
[feature-first pattern](https://gist.github.com/arnausd23/137bab46215d69023729a1b30fb3ec9b).

The file structure is as follows:

```bash
. # Carpeta raíz del proyecto
├── .github/ # Configuración de GitHub
│   └── workflows/ # GitHub Actions workflows
├── .vscode/ # Configuración de Visual Studio Code
├── android/ # Código nativo para Android
├── ios/ # Código nativo para iOS
├── node_modules/ # Dependencias del proyecto
├── src/ # Código fuente
│   ├── app/ # Módulos y componentes de la aplicación
│   │   ├── categories # Categorías de tareas
│   │   ├── shared/ # Compartido entre features
│   │   │   └── components/ # Componentes compartidos
│   │   │       └── tabs/ # Tabs de la aplicación
│   │   ├── tasks/ # Tareas
│   │   ├── app.component.html # Template del componente raíz de la aplicación
│   │   ├── app.component.scss # Estilos del componente raíz de la aplicación
│   │   ├── app.component.spec.ts # Tests del componente raíz de la aplicación
│   │   ├── app.component.ts # Componente raíz de la aplicación
│   │   └── app.routes.ts # Rutas de la aplicación
│   ├── assets/ # Recursos estáticos como imágenes y fuentes
│   ├── databases/ # Configuración de las bases de datos locales
│   │   ├── datasources/ # Configuración de cada una de las bases de datos locales
│   │   │   ├── initialize-data-sources.ts # Inicialización de las bases de datos
│   │   │   └── tasks.ts # Configuración de la base de datos de tareas
│   │   ├── typings # Tipos de datos personalizados para las bases de datos
│   │   └── sqlite-params.ts # Configuración del driver de SQLite
│   ├── environments/ # Configuración de entornos
│   │   ├── environment.prod.ts # Configuración para producción
│   │   └── environment.ts # Configuración para desarrollo
│   ├── theme/ # Estilos del tema principal de la aplicación
│   │   └── variables.scss # Variables de estilo para el tema
│   ├── global.scss # Estilos globales para la aplicación
│   ├── index.html # Archivo HTML principal
│   ├── main.ts # Punto de entrada de la aplicación
│   ├── polyfills.ts # Polyfills para compatibilidad con navegadores
│   ├── test.ts # Configuración de tests
│   └── zone-flags.ts # Configuración de flags de zona
├── www/ # Codigo fuente compilado
├── .browserslistrc # Configuración de navegadores para herramientas como Autoprefixer
├── .editorconfig # Configuración de editores de código
├── .eslintrc.json # Configuración de ESLint
├── .gitignore # Reglas de exclusión de archivos para Git
├── angular.json # Configuración de Angular CLI
├── capacitor.config.ts # Configuración de Capacitor
├── ionic.config.json # Configuración de Ionic
├── karma.conf.js # Configuración de Karma
├── package.json # Configuración de paquetes de Node.js
├── package-lock.yaml # Versiones específicas de paquetes de Node.js
├── README.md # Documentación del proyecto
├── tsconfig.app.json # Configuración extendida de TypeScript para la aplicación
├── tsconfig.json # Configuración de TypeScript
└── tsconfig.spec.json # Configuración extendida de TypeScript para los tests de la aplicación
```

Cada carpeta que representa un feature
puede contener las siguientes carpetas o archivos:

```bash
. # Carpeta raíz del feature
├── components/ # Componentes relacionados al feature
├── entities/ # Entidades de datos relacionadas al feature
├── migrations/ # Migraciones de bases de datos relacionadas al feature
├── pages/ # Páginas relacionadas al feature
├── services/ # Servicios relacionados al feature
└── *.routes.ts # Rutas relacionadas al feature
```

## Correr Aplicación

### Desarrollo

Para correr la aplicación en entornos de desarrollo,
se debe utilizar el comando `ionic cap run android -l --external`.

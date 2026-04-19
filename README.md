# Let's Do It!

App para administrar tareas.

## Requerimientos

### Desarrollo

- **[Node.js](https://nodejs.org/en/) -** Versión 24.x o superior
- **[Android Studio](https://developer.android.com/studio/index.html)** - para compilar la aplicación para dispositivos móviles Android
- Xcode para compilar la aplicación para dispositivos móviles iOS
- Emulador o dispositivo móvil Android/IOS
  para testear la aplicación de manera nativa
- Variable de entorno `ANDROID_HOME` configurada
  con la ruta del SDK de Android para correr la aplicación
  usando el comando `ionic cap run android -l --external`
- Cuenta activa de Firebase con acceso a Remote Config
  para configurar feature flags ([más información](#configuración))

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
│   │   │   ├── components/ # Componentes compartidos
│   │   │   │    └── tabs/ # Tabs de la aplicación
│   │   │   └── services/ # Servicios compartidos
                 └── firebase/ # Servicios de Firebase
│   │   ├── tasks/ # Tareas
│   │   ├── app.component.html # Template del componente raíz de la aplicación
│   │   ├── app.component.scss # Estilos del componente raíz de la aplicación
│   │   ├── app.component.spec.ts # Tests del componente raíz de la aplicación
│   │   ├── app.component.ts # Componente raíz de la aplicación
│   │   └── app.routes.ts # Rutas de la aplicación
│   ├── assets/ # Recursos estáticos como imágenes y fuentes
│   ├── config/ # Configuración de la aplicación
│   │   └── firebase/ # Configuración de RemoteConfig
│   │       ├── firebase.ts # Configuración de Firebase
│   │       ├── index.ts # Punto de inicialización de Firebase
│   │       └── remote-config.ts # Configuración de RemoteConfig
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

## Funcionalidades

### Categorías

- Crear categorías
- Listar categorías de forma paginada mediante scroll infinito
  (la carga inicial es de 20 elementos, y las cargas posteriores son de 10)
- Mostrar categorías en grillas cuando la propiedad `visualizationType`
  en Remote Config es `grid`. Por defecto, se muestra en lista
- Editar categorías
- Eliminar categorías

### Tareas

- Crear tareas
- Listar tareas de forma paginada mediante scroll infinito
  (la carga inicial es de 20 elementos, y las cargas posteriores son de 10)
- Mostrar tareas en grillas cuando la propiedad `visualizationType`
  en Remote Config es `grid`. Por defecto, se muestra en lista
- Eliminar tareas
- Asignar múltiples categorías a tareas
- Marcar tareas como completadas
- Filtrar tareas por categoría

## Configuración

Para poder configurar la aplicación, se deben reemplazar
las credenciales de acceso de Firebase en los archivos
`src/environments/environment.ts` y `src/environments/environment.prod.ts`.

Una vez que las credenciales de acceso a Firebase sean reemplazadas,
las siguientes propiedades pueden ser configuradas en Remote Config:

| Propiedad           | Tipo   | Descripción                                                                                                         |
|---------------------|--------|---------------------------------------------------------------------------------------------------------------------|
| `visualizationType` | String | El modo en el que se visualizarán las páginas de tareas y categorías. El único valor útil en este momento es `grid` |

## Compilar Aplicación

### Android

Para compilar la aplicación para dispositivos móviles Android,
es necesario realizar los siguientes pasos:

1. Compilar la aplicación utilizando el comando
   (`npx ionic cap sync` para utilizar configuración de desarrollo,
   y `npx ionic cap sync --prod` para utilizar configuración de producción)
2. Abrir Android Studio y utilizar las opciones
   **Build > Generate App Bundles or APKs > Generate APKs**

Una vez que el proceso de compilación termine,
se puede dar clic en el botón **Play** para correr la aplicación
en un emulador o dispositivo móvil Android previamente configurado.

## Correr Aplicación

### Desarrollo

Para correr la aplicación en entornos de desarrollo,
es necesario realizar los siguientes pasos:

1. Compilar la aplicación utilizando el comando `npm run build`
2. Utilizar el comando `npx ionic cap run android -l --external`
   para correr la aplicación en un emulador o dispositivo móvil Android,
   o `npx ionic cap run ios` para correr la aplicación en un dispositivo iOS
3. Cuando la utilidad lo pregunte, se debe seleccionar el dispositivo
   en el cual se quiera correr la aplicación, y posteriormente la dirección
   IP a utilizar

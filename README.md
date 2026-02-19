#  QUIZ-APP-SCHOOL    
El **quiz-app-school**, es una aplicación web desarrollada con gran parte de tecnologías de forma "nativa", lo que quiere decir que no se ha usado un framework, más que Bootstrap en temas de diseño, de por medio, este proyecto tiene como objetivo ofrecer una plataforma escolar de creación y toma de exámenes de opción múltiple, permitiendo generar a los usuarios crear, editar y eliminar los exámenes (maestro) y tomar los exámenes disponibles en la plataforma (estudiante).
Este proyecto, originalmente se desarrolló con fines educativos para la comprensión de uso de Firebase.

## Características
- Página principal de inicio de sesión.
- Dashboard: Página de inicio de usuario cuya vista depende del tipo de usuario logeado (Maestro o Alumno).
- Dashboard Maestro: Página de inicio para el usuario "Maestro", aquí puede crear, editar o eliminar un examen.
- Lista de alumnos (Maestro): Vista que consiste en la gestión de alumnos que tiene el maestro.
- Dashboard Estudiante: Página de inicio para el usuario "Estudiante", aquí puede ver los exámenes que tiene disponibles para realizar.
- Mis Resultados: Página que muestra los resultados de cada uno de los exámenes que ha realizado.

## Tecnologías
- **HTML**
- **JAVASCRIPT**
- **CSS**
- **FIREBASE**

## Estructura del proyecto
El proyecto tiene un estructura sencilla contando solo con una carpeta raiz (/) y dos carpetas assets (/assets) y pages (/pages). Cada una contiene archivos y subcarpetas que contienen la configuración necesaria para el funcionamiento del proyecto.
- **`/`:** Carpeta raiz, contiene los archivos principales index.html, 404.html 
- **`/assets:`** Contiene archivos que almacena la logica de programación y los archivos de estilos usados en el proyecto.
- **`/assets/components:`** Componentes reutilizables.
- **`/assets/js/firebase-config.js:`** Credenciales de la base de datos (Cámbialos para usar los tuyos).
- **`/assets/js/firebase-init.js:`** Archivo de inicialización de conexión a Firebase.
- **`/pages/maestro:`** Vistas de usuario tipo "Maestro".
- **`/pages/estudiante:`** Vista de usuario tipo "Estudiante"

## Instalación:
Sigue los siguientes pasos para ejecutar el proyecto localmente.
### Requisitos
- Conocimientos principiante - medios en desarrollo web.
- HTML
- CSS
- JavaScript
- Bootstrap

### Pasos
1. **Clona el repositorio:** Crea una carpeta en donde tu computadora y usa el comando:  
```bash
https://github.com/OscarPachecoH/quiz-app-school
```
2. **Crea tu base de datos en Firebase:** Navega al sitio oficial de Firebase https://firebase.google.com/ o ve a https://console.firebase.google.com/ y configura tu proyecto.
3. **Habilita las utilerias:** En la pestaña de compilación configura "Authentication" y "Realtime Database"
4. **Crea los usuarios:** Dentro de "Authentication" crea tus usuarios:
```bash
// Puedes usar los siguientes ejemplos:
correo: maestro@quiz.com
contraseña: demo1234

correo: estudiante@quiz.com
contraseña: demo1234
```
3. **Crea el nodo "usuarios":** En "Realtime Database" crea un nodo y nombralo "usuarios" dentro de este crea otro nodo el cual tendra el UID que se generó en el en la seccion de "Authentication", despues deberas agregar los demas nodos (nombre, email, rol, fecha de registro, creado por). Sigue el siguiente esquema para mejor comprención.
```bash
usuarios
└─ uid
    ├─ nombre: "Oscar Pacheco"
    ├─ email: "oscar_estudiante@quiz.com"
    ├─ rol: "estudiante"
    ├─ fechaRegistro: "2026-01-01T06:00:00.317Z"
    ├─ creadoPor: uid del maestro
    └─ resultados (solo usuarios tipo estudiante)
        └─ uidExamen
            ├─ nombreExamen: "Estructura de datos"
            ├─ calificación: "90"
            ├─ puntajeMaximo: "100"
            ├─ aprobado: true
            └─ fechaRealizacion: "2026-01-01T06:00:00.317Z"

```


4. **Configura tu API key de firebase:** Deberas cambiar el contenido del archivo **/assets/js/firebase-config.js** ya que no hay soporte para el uso de archivo .env en tecnologias nativas.

NOTA: Recuerda que estas son privadas y no debes de compartirlas
```bash
// Ejemplo remplazando contenido de /assets/js/firebase-config.js
window.firebaseConfig = {
    apiKey="tu_api_key"
    authDomain="quiz-tudominio.firebaseapp.com"
    projectId="nombre-proyecto"
    storageBuckect="quiz-tuproyecto.firebasestorage.app"
    messaginSenderId="XXXXXXXXXXX"
    appId="1:XXXXXXXXXXX:web:XXXXXXXXXXX"
    databaseURL="https://tu-url-default-rtdb.firebaseio.com/"
};
```
5. **Prueba el proyecto:** Prueba el proyecto usando ***Live Server*** si usas ***VS Code***, de lo contrario en el navegador escribe la ruta del archivo en tu computadora ***(Ojo: puede que si lo haces de esta última forma, algunos archivos no puedan cargar correctamente).***
Una vez cargada la página, intenta iniciar sesión, crear un nuevo usuario (estudiante), crea y configura un nuevo examen, etc.

## Uso del Proyecto
- Maestro: Tiene permitido la gestion de los examenes y alumnos.
- Estudiante: Solo puede tomar examenes y visualizar sus calificacines.
## Limitaciones Conocidas
- Hasta ahora solo se pueden crear examenes y alumnos (Maestro).
- Opción de tomar examen esta en desarrollo.
- Demo limitada.
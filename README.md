# 🎮 Juego Educativo HTML Semántico - Drag & Drop

Una aplicación web gamificada que enseña la estructura semántica de HTML5 mediante un sistema interactivo de arrastrar y soltar, con registro de jugadores, sistema de puntajes y logros desbloqueables.

## 🚀 Características Principales

### 🎯 Sistema de Juego
- **Drag & Drop interactivo**: Arrastra etiquetas HTML a las zonas correctas
- **Elementos HTML semánticos**: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`
- **Validación en tiempo real**: Feedback instantáneo sobre colocaciones correctas/incorrectas
- **Efectos visuales**: Animaciones y transiciones gamificadas

### 👤 Sistema de Jugadores
- **Registro personalizado**: Nombre, email y nivel de experiencia
- **Validación dinámica**: Verificación en tiempo real con sanitización de datos
- **Persistencia local**: Datos guardados en localStorage del navegador
- **Perfiles de jugador**: Avatares y información personalizada

### 🏆 Sistema de Puntajes y Logros
- **Puntaje dinámico**: Sistema de puntos con bonificaciones por rachas
- **Niveles progresivos**: Subida de nivel basada en experiencia acumulada
- **Logros desbloqueables**: Reconocimientos por hitos específicos
- **Estadísticas detalladas**: Seguimiento de precisión y progreso

## 📁 Estructura del Proyecto

```
juego-html-semantico/
├── index.html              # Página principal del juego
├── css/
│   └── style.css          # Estilos gamificados con efectos visuales
├── js/
│   ├── validaciones.js     # Sistema de validaciones en tiempo real  
│   └── main.js            # Lógica principal del juego (ES6+ Classes)
├── assets/                 # Recursos multimedia (futuro)
└── README.md              # Documentación del proyecto
```

## 🛠️ Tecnologías y Patrones Utilizados

### Frontend Core
- **HTML5 Semántico**: Estructura accesible con elementos apropiados
- **CSS3 Avanzado**: Variables personalizadas, Grid/Flexbox, animaciones complejas
- **JavaScript ES6+**: Clases, módulos, destructuring, async/await
- **Drag & Drop API**: API nativa del navegador para interacciones

### Patrones de Programación
- **Orientación a Objetos**: Clases ES6 con encapsulación y herencia
- **Patrón Módulo**: Separación de responsabilidades entre archivos
- **Patrón Observer**: Sistema de eventos para interacciones
- **Validación por Capas**: Cliente con preparación para servidor

### Arquitectura CSS
- **Variables CSS**: Sistema de design tokens
- **Metodología BEM**: Nomenclatura consistente y escalable
- **Mobile-First**: Diseño responsivo progresivo
- **Efectos Avanzados**: backdrop-filter, gradientes, animaciones keyframe

## 🎮 Mecánicas de Juego

### Sistema de Registro
- **Nombre del Jugador**: Validación de caracteres y longitud
- **Email**: Verificación de formato RFC5322 compliant
- **Nivel de Experiencia**: Selección entre Principiante, Intermedio y Avanzado
- **Progreso Visual**: Barra de completitud en tiempo real

### Elementos HTML Semánticos
- **`<header>`**: Encabezado principal de la página web
- **`<nav>`**: Menú de navegación y enlaces
- **`<main>`**: Contenido principal del documento
- **`<article>`**: Contenido independiente y reutilizable
- **`<aside>`**: Contenido complementario o sidebar
- **`<footer>`**: Pie de página con información adicional

### Sistema de Puntajes
- **Puntos Base**: 10 puntos por colocación correcta
- **Bonificación por Racha**: +2 puntos por elemento consecutivo (máx. 50)
- **Multiplicador de Nivel**: Incremento según nivel del jugador
- **Experiencia (XP)**: Acumulación para subir de nivel

## ✨ Funcionalidades Destacadas

### 🔍 Validaciones Inteligentes
- **Tiempo Real**: Feedback instantáneo mientras el usuario escribe
- **Sanitización Automática**: Limpieza de datos de entrada
- **Debounce Pattern**: Optimización de rendimiento en validaciones
- **Mensajes Contextuales**: Feedback específico para cada tipo de error

### 🎨 Efectos Visuales Gamificados
- **Fondo Dinámico**: Gradientes animados con partículas energéticas
- **Transiciones Fluidas**: Animaciones CSS3 con easing personalizado
- **Feedback Visual**: Estados de éxito, error y progreso claramente diferenciados
- **Efectos de Partículas**: Sistema de partículas CSS para ambiente gaming

### 🎯 Sistema de Logros
- **Logros por Racha**: Reconocimientos por aciertos consecutivos
- **Logros por Nivel**: Celebración de subidas de nivel
- **Historial**: Seguimiento de últimos 5 logros obtenidos
- **Notificaciones**: Popups animados para logros desbloqueados

### ♿ Accesibilidad y UX
- **Navegación por Teclado**: Soporte completo con Tab/Shift+Tab
- **ARIA Labels**: Etiquetas semánticas para lectores de pantalla
- **Focus Management**: Gestión inteligente del foco visual
- **Responsive Design**: Adaptación perfecta a todos los dispositivos

## 🚀 Instalación y Uso

### Inicio Rápido
1. **Clonar o descargar** el repositorio
2. **Abrir** `index.html` en cualquier navegador moderno
3. **Registrarse** completando el formulario de bienvenida
4. **¡Jugar!** Arrastra las etiquetas HTML a las zonas correctas

### Servidor Local (Recomendado)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

### Navegadores Compatibles
- **Chrome 80+** ✅ Soporte completo
- **Firefox 75+** ✅ Soporte completo  
- **Safari 13+** ✅ Soporte completo
- **Edge 80+** ✅ Soporte completo

## 🎨 Personalización y Configuración

### Variables CSS (Design Tokens)
El archivo `css/style.css` utiliza un sistema completo de variables CSS:

```css
:root {
    /* Colores principales */
    --color-primary: #3b82f6;
    --color-secondary: #10b981;
    --color-accent: #f59e0b;
    --color-danger: #ef4444;
    
    /* Espaciado */
    --spacing-2: 0.5rem;
    --spacing-4: 1rem;
    --spacing-8: 2rem;
    
    /* Tipografía */
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-size-base: 1rem;
    --font-size-xl: 1.25rem;
}
```

### Configuración del Juego
Personaliza las mecánicas en `js/main.js`:

```javascript
// Puntajes y experiencia
const basePoints = 10;              // Puntos por acierto
const maxStreakBonus = 50;          // Bonificación máxima por racha
const levelMultiplier = 0.5;        // Multiplicador de nivel

// Validaciones
const debounceDelay = 300;          // Delay para validaciones
const maxNameLength = 30;           // Longitud máxima del nombre
```

## 🔧 Desarrollo y Extensión

### Arquitectura del Código
- **`validaciones.js`**: Sistema completo de validaciones con FormValidator class
- **`main.js`**: Lógica principal del juego con HTMLSemanticGame class
- **`style.css`**: Estilos organizados por componentes con metodología BEM

### Agregar Nuevos Elementos HTML
```javascript
// En main.js - Método setupElements()
const newElements = [
    { tag: 'section', zone: 'Sección temática' },
    { tag: 'figure', zone: 'Contenido multimedia' }
];

// Agregar al HTML
<div class="piece" draggable="true" data-tag="section">
    &lt;section&gt;
</div>
```

### Personalizar Validaciones
```javascript
// En validaciones.js - Método setupValidationRules()
this.rules.set('customField', [
    {
        name: 'customRule',
        test: (value) => /custom-pattern/.test(value),
        message: 'Mensaje de error personalizado'
    }
]);
```

### Agregar Nuevos Logros
```javascript
// En main.js - Método updateScore()
if (this.player.streak === 10) {
    this.addAchievement('🚀', 'Velocidad Luz', 'Conseguiste 10 aciertos seguidos');
}
```

## 📱 Compatibilidad Móvil y Responsiva

### Diseño Adaptativo
- **Mobile-First**: Diseño optimizado para dispositivos móviles primero
- **Breakpoints**: Adaptación fluida en 768px, 1024px y 1200px
- **Touch Gestures**: Soporte completo para gestos táctiles
- **Viewport Optimizado**: Meta tags para renderizado correcto

### Interacciones Táctiles
- **Drag & Drop Móvil**: API adaptada para dispositivos touch
- **Botones Accesibles**: Tamaño mínimo de 44px para toque fácil
- **Feedback Háptico**: Vibración en dispositivos compatibles (futuro)
- **Orientación**: Adaptación automática a landscape/portrait

## 🔒 Seguridad y Privacidad

### Protección de Datos
- **Solo Frontend**: No hay transmisión de datos a servidores externos
- **LocalStorage**: Almacenamiento local seguro en el navegador
- **Sanitización Automática**: Limpieza de entradas maliciosas
- **Validación por Capas**: Doble verificación cliente-servidor (preparado)

### Buenas Prácticas de Seguridad
- **XSS Prevention**: Escapado de contenido dinámico
- **Input Validation**: Validación estricta de todos los campos
- **CSP Ready**: Preparado para Content Security Policy
- **No Cookies**: Sin seguimiento ni cookies de terceros

## 🐛 Depuración y Testing

### Herramientas de Debug
Accede al juego globalmente desde la consola:
```javascript
// Información del juego
window.HTMLGame.getGameStats()

// Estado del jugador
window.HTMLGame.player

// Validador
window.HTMLGame.validator.getStats()
```

### Logs del Sistema
- **🎮 Inicialización**: Arranque del juego y componentes
- **⚡ Validaciones**: Estados de validación en tiempo real
- **🎯 Interacciones**: Eventos de drag & drop
- **🏆 Logros**: Desbloqueo de achievements

### Testing Manual
1. **Validaciones**: Probar campos vacíos, caracteres inválidos
2. **Drag & Drop**: Verificar colocaciones correctas e incorrectas
3. **Responsive**: Testear en diferentes resoluciones
4. **Accesibilidad**: Navegación por teclado y lectores de pantalla

## 🚀 Roadmap y Próximas Mejoras

### Versión 2.0 🎯
- [ ] **Más Elementos HTML**: `<section>`, `<figure>`, `<time>`, `<address>`
- [ ] **Niveles de Dificultad**: Progresión gradual de complejidad
- [ ] **Modo Cronometrado**: Desafíos contra el tiempo
- [ ] **Multijugador Local**: Competencias entre jugadores

### Versión 2.5 🌟
- [ ] **Backend Integration**: API REST para rankings globales
- [ ] **Base de Datos**: Persistencia de puntuaciones y logros
- [ ] **Leaderboards**: Tablas de clasificación mundial
- [ ] **Certificados**: Exportación de logros a PDF

### Versión 3.0 🚀
- [ ] **PWA**: Aplicación web progresiva offline
- [ ] **Temas Personalizables**: Dark mode y temas coloridos
- [ ] **Internacionalización**: Soporte multi-idioma (EN, ES, FR)
- [ ] **Accesibilidad Avanzada**: Soporte para discapacidades visuales

### Características Técnicas 🔧
- [ ] **Service Workers**: Cache inteligente y modo offline
- [ ] **WebRTC**: Multijugador en tiempo real
- [ ] **Web Animations API**: Efectos más avanzados
- [ ] **WebAssembly**: Optimizaciones de rendimiento

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el repositorio
2. **Crea** una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. **Commit** tus cambios (`git commit -am 'Añadir nueva característica'`)
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`)
5. **Abre** un Pull Request

### Guías de Contribución
- Sigue la estructura de código existente
- Documenta nuevas funcionalidades
- Incluye pruebas cuando sea posible
- Respeta la filosofía del proyecto: educativo y accesible

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Esto significa que puedes:

- ✅ Usar comercialmente
- ✅ Modificar el código
- ✅ Distribuir copias
- ✅ Usar de forma privada

Consulta el archivo `LICENSE` para los términos completos.

## 👨‍💻 Autor

**Santiago Ramírez Carrero**
- 🎓 Estudiante de Programación
- 📚 Especializado en desarrollo web frontend
- 🎯 Enfoque en experiencias educativas interactivas

## 🙏 Agradecimientos

- **HTML5 Specification** por los estándares semánticos
- **MDN Web Docs** por la documentación excelente
- **CSS Grid & Flexbox** por las posibilidades de layout
- **JavaScript ES6+** por las características modernas
- **Drag and Drop API** por la interactividad nativa

## 📈 Estadísticas del Proyecto

- 📁 **Archivos**: 6 archivos principales
- 💻 **Líneas de Código**: ~800 líneas
- 🎨 **Elementos CSS**: 50+ componentes estilizados
- ⚡ **Funciones JS**: 20+ métodos interactivos
- 🏆 **Elementos HTML**: 10 elementos semánticos enseñados

---

<div align="center">

### 🌟 ¡Transforma tu aprendizaje de HTML en una aventura cósmica! 🌟

**¿Listo para dominar la semántica HTML mientras te diviertes?**

[🎮 **¡JUGAR AHORA!**](./index.html) | [📚 **DOCUMENTACIÓN**](./README.md) | [🐛 **REPORTAR BUG**](../../issues)

---

⭐ **¡Si este proyecto te ayudó a aprender, dale una estrella!** ⭐

*Hecho con ❤️ y mucho ☕ por Santiago Ramírez Carrero*

</div>
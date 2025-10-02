# 🎮 Juego Educativo de Desarrollo Web - HTML Semántico

Una aplicación web educativa gamificada que enseña HTML semántico mediante tres misiones interactivas: estructura HTML con drag & drop, estilos CSS con laboratorio interactivo y lógica JavaScript con ejercicios de código. Con sistema de fases evolutivas de colores galácticos, efectos visuales espaciales suaves y audio gaming profesional.

## 🌟 Demo en Vivo

🚀 **[Jugar Ahora](https://santinyoficial.github.io/juego-web)** 

> 💡 **Proyecto Educativo**: Este juego fue diseñado como herramienta de aprendizaje interactivo para estudiantes de programación web.

## 🎯 Características Principales

### � Tres Misiones de Aprendizaje
1. **🛠️ Misión HTML**: Arquitecto de estructura semántica con drag & drop
2. **🎨 Misión CSS**: Laboratorio de estilos con desafíos visuales interactivos
3. **⚡ Misión JavaScript**: Sala de cómputo para completar código funcional

### 🌈 Sistema de Fases Evolutivas Galácticas
- **Fase 1 - Formulario**: Azul galáctico suave (#4a90e2 + #5cb3cc) - Registro de jugador
- **Fase 2 - HTML**: Naranja nebular suave (#d4851f + #c9a96e) - Elementos estructurales
- **Fase 3 - CSS**: Púrpura nebula profundo (#6b46c1 + #a855f7) - Elementos de contenido
- **Fase 4 - JavaScript**: Rojo marte profundo (#b91c1c + #e5e7eb) - Elementos de interacción
- **Fase Final - Big Bang**: Explosión galáctico (#9333ea + #059669) - Celebración épica y reinicio

### 🔊 Sistema de Audio Gaming Inmersivo
- **Web Audio API**: Sonidos sintéticos generados con osciladores en tiempo real
- **16+ efectos de sonido**: UI (click, hover, focus), validaciones (success, error), drag & drop, logros
- **Secuencias musicales**: Acordes armónicos para eventos especiales (achievement, level-up, game-complete)
- **Control de volumen**: Sistema de audio profesional con botón mute/unmute y volumen master
- **Sin archivos externos**: Todo generado dinámicamente, cero dependencias de audio

### ✨ Experiencia Visual Avanzada Galáctico
- **Fondo espacial dinámico**: Gradientes elípticos galácticos con respiración cósmica suave
- **Animaciones ultra optimizadas**: Sin rotaciones ni escalados pesados, solo transformaciones ligeras
- **Sistema de partículas aleatorias**: Puntos de colores con movimiento drift natural (50s)
- **Colores galácticos suaves**: Paleta completa de tonos espaciales no encandilantes
- **Responsive completo**: Adaptación fluida a móviles (480px), tablets (768px) y desktop (1024px+)
- **Sin scroll horizontal garantizado**: overflow-x: hidden + max-width: 100vw en todos los elementos

### 👤 Sistema de Registro Inteligente
- **Validación en tiempo real**: Feedback instantáneo con FormValidator
- **Sanitización automática**: Limpieza y formato de datos
- **Progreso visual amigable**: Mensajes motivacionales según avance
- **Persistencia local**: Datos guardados con localStorage

### 🏆 Sistema de Puntuación y Logros
- **Puntos dinámicos**: Bonificaciones por tiempo, racha y nivel
- **Experiencia (XP)**: Sistema de progresión con niveles
- **Logros desbloqueables**: Reconocimientos por hitos específicos
- **Estadísticas detalladas**: Tracking completo de rendimiento

## 📁 Estructura del Proyecto

```
juego-web/
├── index.html                      # Página principal del juego (499 líneas)
├── README.md                       # Documentación completa del proyecto
├── .gitignore                      # Archivos ignorados por Git
├── GUIA_GITHUB.md                  # Guía de uso de Git y GitHub (ignorado)
├── css/
│   └── style.css                   # Sistema de estilos evolutivos galácticos (~2600 líneas)
├── js/
│   ├── audio.js                    # Sistema de audio gaming Web Audio API (467 líneas)
│   ├── validaciones.js             # Sistema de validaciones FormValidator (633 líneas)
│   └── main.js                     # Lógica principal del juego (2536 líneas)
└── COPILOT_INSTRUCTIONS.md         # Instrucciones de desarrollo para IA (ignorado)
```

## 🛠️ Tecnologías y Arquitectura

### Frontend Core
- **HTML5 Semántico**: Estructura completa con elementos apropiados y accesibilidad
- **CSS3 Avanzado**: Variables CSS, Grid/Flexbox, animaciones keyframe complejas
- **JavaScript ES6+**: Clases, async/await, módulos, destructuring
- **Web Audio API**: Generación sintética de sonidos en tiempo real
- **Drag & Drop API**: Interacciones nativas del navegador

### Patrones de Programación
- **POO con ES6 Classes**: `HTMLSemanticGame`, `FormValidator`, `GameAudioSystem`
- **Patrón Módulo**: Separación clara de responsabilidades (main, validaciones, audio)
- **Event-Driven**: Sistema de eventos para todas las interacciones
- **Singleton Pattern**: Instancias globales para Audio y Validación
- **State Management**: Gestión de estados del juego y fases evolutivas

### Arquitectura CSS Avanzada
- **Variables CSS Dinámicas**: Sistema de design tokens que cambian por fase
- **BEM Modificado**: Nomenclatura consistente y escalable
- **Responsive Design**: Mobile-first con adaptación completa
- **Animaciones Complejas**: Nebulosas, estrellas, partículas, transiciones de fase
- **Performance Optimizado**: GPU acceleration, will-change, transform3d

## 🎮 Mecánicas de Juego Detalladas

### 🚀 Animación de Introducción
- **Typewriter Effect**: Mensaje inicial con efecto de máquina de escribir
- **Interacción del Usuario**: Activación por clic para cumplir políticas de audio
- **Transición Suave**: Fade out hacia pantalla de registro

### 📝 Sistema de Registro
- **Validación Inteligente**: FormValidator con reglas específicas por campo
- **Sanitización Automática**: Limpieza de datos en tiempo real
- **Feedback Visual**: Estados válido/inválido con colores y mensajes
- **Progreso Amigable**: Mensajes motivacionales según completitud
- **Campos Validados**:
  - Nombre: 2-30 caracteres, solo letras y espacios
  - Email: Formato RFC5322 compliant
  - Teléfono: 7-10 dígitos (celular/fijo colombiano)
  - Nivel: Principiante, Intermedio o Avanzado

### 🛠️ Misión 1: HTML Semántico (Drag & Drop)
- **6 Etiquetas**: `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`
- **Zonas de Drop**: Áreas específicas para cada etiqueta
- **Validación Instantánea**: Feedback visual y sonoro
- **Puntos por Acierto**: Sistema de recompensas con bonificaciones

### 🎨 Misión 2: CSS Designer (Interactivo)
- **4 Desafíos CSS**: Centrado, degradados, grid, efectos
- **Vista Previa en Vivo**: Cambios aplicados en tiempo real
- **Herramientas por Categoría**: Posicionamiento, colores, layout, efectos
- **Timer Opcional**: 3 minutos con posibilidad de continuar sin límite
- **Pistas Contextuales**: Ayudas específicas por desafío

### ⚡ Misión 3: JavaScript Logic (Code Completion)
- **4 Ejercicios**: Eventos, validación, DOM manipulation, arrays
- **Completar Código**: Llenar espacios en blanco con sintaxis correcta
- **Validación Automática**: Verificación de respuestas instantánea
- **Pistas Integradas**: Sugerencias de métodos y propiedades

### 📊 Sistema de Puntuación Avanzado
- **Puntos Base**: Variable según tipo de juego (10-60 puntos)
- **Bonificación por Tiempo**: Bonus por velocidad en desafíos
- **Sistema de Racha**: Multiplicadores por aciertos consecutivos
- **Experiencia (XP)**: Progresión de nivel con umbrales escalables
- **Logros Especiales**: Reconocimientos por hitos específicos

## ✨ Funcionalidades Técnicas Destacadas

### 🔊 Sistema de Audio Gaming (Web Audio API)
- **Generación Sintética**: 16+ sonidos únicos creados con osciladores y acordes
- **Sin Archivos Externos**: Todo generado en tiempo real sin dependencias
- **Arquitectura de Sonido**:
  - **UI**: click (800Hz), hover (600Hz), focus (400Hz), typewriter-key (800Hz/50ms)
  - **Validación**: validation-success (acorde Do-Mi-Sol), validation-error (200Hz grave)
  - **Formulario**: form-complete (acorde de 4 notas)
  - **Juego**: drag-start (440Hz), drag-over (550Hz), drop-success (acorde Mi-Sol-Si), drop-error (150Hz)
  - **Logros**: achievement (5 notas), level-up (5 notas), streak (3 notas rápidas)
  - **Especiales**: game-complete (6 notas épicas), notification (2 notas), reset (330Hz)
- **Control Avanzado**: Volumen master/sfx/music, pitch, envelope ADSR personalizado
- **Secuencias Musicales**: playSequence() para melodías complejas con delays
- **Sistema de Estados**: Prevención de sonidos repetidos con tracking interno
- **Fallback Inteligente**: Sistema básico HTMLAudioElement con data URLs para navegadores legacy

### 🌈 Sistema de Fases Evolutivas Galácticas (CSS Variables)
- **5 Fases Visuales**: Formulario (Azul), HTML (Naranja), CSS (Púrpura), JS (Rojo), Big Bang (Multi)
- **Cambio Dinámico de Variables**: 
  - `--color-primary` y `--color-secondary` actualizan automáticamente
  - Versiones alpha (10%, 20%, 30%) para transparencias graduales
  - Colores de texto, sombras, bordes y fondos evolucionan juntos
- **Transiciones Ultra Suaves**: 2-3 segundos con ease-in-out entre fases
- **Elementos Afectados**: 
  - Fondos: gradientes elípticos animados (60s gentle-glow)
  - Nebulosas: respiración cósmica sutil (60s cosmic-breathe)
  - Partículas: movimiento aleatorio drift (50s random-drift)
  - UI: botones, inputs, tarjetas, badges, notificaciones
- **Animaciones Optimizadas**: Sin scale(), rotate() ni transformaciones pesadas
- **Colores Galácticos Suaves**: Eliminados todos los colores encandilantes (#00ffff, #ff00ff, etc.)

### 🔍 Sistema de Validación FormValidator
- **Validación en Tiempo Real**: Feedback mientras se escribe
- **Sanitización Inteligente**: Limpieza automática de datos
- **Debounce Pattern**: Optimización de rendimiento (300ms)
- **Mensajes Amigables**: Feedback constructivo y motivacional
- **Adaptabilidad de Contenedor**: Ajuste dinámico sin scroll forzado
- **ResizeObserver**: Detección de cambios de contenido
- **Reglas Personalizadas**: Sistema extensible de validación

### 🎨 Efectos Visuales Avanzados Galácticos
- **Fondo Espacial Dinámico (body::before)**: 
  - Gradientes elípticos galácticos con respiración natural
  - Animación gentle-glow de 60 segundos sin reinicios visibles
  - Cambio de paleta según fase con transiciones de 3 segundos
  - brightness máximo 1.02 para efectos sutiles
- **Campo Estelar Evolutivo (body::after)**: 
  - Partículas de colores aleatorios con box-shadow múltiple
  - Animación random-drift de 50 segundos para movimiento natural
  - Colores específicos por fase (azul→naranja→púrpura→rojo→multi)
- **Partículas CSS**: Sistema optimizado solo con puntos, sin rotaciones
- **Animaciones GPU Ligeras**: Solo translate() y opacity, sin scale() ni rotate()
- **Sin Scroll Horizontal Garantizado**: 
  - `max-width: 100vw` y `overflow-x: hidden` en todos los contenedores
  - Verificación en cada breakpoint responsive
- **Responsive Completo**: 
  - Mobile: 480px (formulario 95%, animaciones reducidas)
  - Tablet: 768px (layout ajustado, audio opcional)
  - Desktop: 1024px+ (experiencia completa)

### 🎯 Sistema de Logros y Progresión
- **Logros Desbloqueables**: 
  - Primera sangre, Racha perfecta, Maestro HTML/CSS/JS
  - Velocista, Perfeccionista, Completista
- **Panel Visual**: Lista de logros con iconos y descripciones
- **Logros por Nivel**: Celebración de subidas de nivel
- **Historial**: Seguimiento de últimos 5 logros obtenidos
- **Notificaciones**: Popups animados para logros desbloqueados

### ♿ Accesibilidad y UX
- **Navegación por Teclado**: Tab/Shift+Tab para todos los controles
- **ARIA Labels**: Roles y labels para lectores de pantalla
- **Focus Management**: Estados de foco claramente visibles
- **Responsive Design**: Mobile-first, tablet y desktop
- **Audio Opcional**: Toggle de mute/unmute integrado
- **Mensajes Amigables**: Feedback constructivo y motivacional
- **Sin Scroll Horizontal**: Diseño contenido en viewport

## 🚀 Instalación y Uso

### Inicio Rápido
```bash
# 1. Clonar el repositorio
git clone https://github.com/SantinyOficial/juego-web.git
cd juego-web

# 2. Abrir directamente en el navegador
# Simplemente abre index.html con doble clic
```

### Servidor Local (Recomendado para desarrollo)
```bash
# Python 3
python -m http.server 8000
# Visita: http://localhost:8000

# Node.js con http-server
npx http-server -p 8000
# Visita: http://localhost:8000

# PHP
php -S localhost:8000
# Visita: http://localhost:8000

# Visual Studio Code
# Usa la extensión "Live Server"
```

### 🎮 Flujo de Juego
1. **Animación Inicial**: Efecto typewriter con mensaje de bienvenida
2. **Haz clic** en cualquier parte para activar el audio y continuar
3. **Formulario de Registro**: Completa tus datos con validación en tiempo real
4. **Misión 1 - HTML**: Arrastra 6 etiquetas semánticas a sus zonas correctas
5. **Misión 2 - CSS**: Completa 4 desafíos de estilos CSS interactivos
6. **Misión 3 - JavaScript**: Completa 4 ejercicios de código JavaScript
7. **Big Bang Final**: ¡Celebración épica al completar todas las misiones!

### 📱 Navegadores Compatibles
- **Chrome/Edge 80+** ✅ Soporte completo (recomendado)
- **Firefox 75+** ✅ Soporte completo
- **Safari 13+** ✅ Soporte completo
- **Opera 67+** ✅ Soporte completo
- **Mobile** ✅ iOS Safari, Chrome Mobile, Samsung Internet

### ⚠️ Requisitos
- Navegador moderno con soporte para ES6+, CSS Variables y Web Audio API
- JavaScript habilitado
- Conexión NO requerida (funciona offline)

## 🎨 Personalización Avanzada

### Variables CSS (Design Tokens Galácticos)
El archivo `css/style.css` usa un sistema evolutivo de variables CSS con colores galácticos:

```css
:root {
    /* FASE 1: FORMULARIO - Azul Galáctico Suave */
    --phase-1-primary: #4a90e2;
    --phase-1-secondary: #5cb3cc;
    
    /* FASE 2: HTML - Naranja Nebular Suave */
    --phase-2-primary: #d4851f;
    --phase-2-secondary: #c9a96e;
    
    /* FASE 3: CSS - Púrpura Nebula Profundo */
    --phase-3-primary: #6b46c1;
    --phase-3-secondary: #a855f7;
    
    /* FASE 4: JAVASCRIPT - Rojo Marte Profundo */
    --phase-4-primary: #b91c1c;
    --phase-4-secondary: #e5e7eb;
    
    /* BIG BANG FINAL - Colores Galácticos */
    --big-bang-primary: #9333ea;    /* Púrpura galáctico */
    --big-bang-secondary: #059669;  /* Verde espacial */
    
    /* Variables activas (cambian dinámicamente por fase) */
    --color-primary: var(--phase-1-primary);
    --color-secondary: var(--phase-1-secondary);
    --color-primary-alpha-10: rgba(74, 144, 226, 0.1);
    --color-primary-alpha-20: rgba(74, 144, 226, 0.2);
    --color-primary-alpha-30: rgba(74, 144, 226, 0.3);
    
    /* Spacing System */
    --spacing-2: 0.5rem;
    --spacing-4: 1rem;
    --spacing-6: 1.5rem;
    --spacing-8: 2rem;
    --spacing-12: 3rem;
    
    /* Typography */
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
}
```

### Configuración del Juego (js/main.js)
```javascript
class HTMLSemanticGame {
    constructor() {
        // Configuración de puntos
        this.basePoints = 10;
        this.streakBonus = 2;
        this.maxStreak = 50;
        
        // Sistema de niveles
        this.player = {
            score: 0,
            streak: 0,
            currentLevel: 1,
            experience: 0,
            maxExperience: 100
        };
        
        // Juegos disponibles
        this.currentGame = 'html'; // html, css, js
    }
}
```

### Sistema de Audio (js/audio.js)
```javascript
class GameAudioSystem {
    constructor() {
        this.masterVolume = 0.7;  // Volumen global
        this.sfxVolume = 0.8;     // Efectos de sonido
        this.muted = false;        // Estado inicial
    }
}
```

## 🔧 Desarrollo y Extensión

### Arquitectura del Código
El proyecto sigue principios de desarrollo limpio:

**Separación de Responsabilidades:**
- **`audio.js`** (467 líneas): Sistema de audio completo con Web Audio API
  - Clase `GameAudioSystem` con generación sintética de sonidos
  - 16+ definiciones de sonidos con frecuencias, duraciones y volúmenes
  - Métodos: `createSoundBuffer()`, `createToneSound()`, `createChordSound()`, `playSound()`, `playSequence()`
  - Sistema de envelope ADSR para sonidos naturales
  
- **`validaciones.js`** (633 líneas): Sistema de validación inteligente FormValidator
  - Clase `FormValidator` con reglas personalizables por campo
  - Validación en tiempo real con sanitización automática
  - ResizeObserver para adaptabilidad dinámica del contenedor
  - Métodos: `validateField()`, `validateForm()`, `sanitizeValue()`, `showFieldFeedback()`
  
- **`main.js`** (2536 líneas): Motor principal del juego HTMLSemanticGame
  - Gestión de 3 juegos: HTML (drag & drop), CSS (desafíos), JS (completar código)
  - Sistema de fases evolutivas con cambio automático de colores
  - Sistema de puntuación, niveles, logros y estadísticas
  - Métodos principales: `init()`, `handleDrop()`, `changeGamePhase()`, `triggerBigBang()`
  
- **`style.css`** (~2600 líneas): Sistema de estilos evolutivos galácticos
  - Variables CSS dinámicas que cambian por fase
  - Animaciones optimizadas: gentle-glow (60s), cosmic-breathe (60s), random-drift (50s)
  - Sistema responsive completo con breakpoints 480px, 768px, 1024px
  - Colores galácticos suaves sin encandilamiento

**Clases Principales:**
- `GameAudioSystem`: Gestión completa de audio gaming
- `FormValidator`: Validación inteligente con reglas personalizables
- `HTMLSemanticGame`: Motor principal del juego con tres misiones

### Extender el Juego

**Agregar nuevos desafíos CSS:**
```javascript
// En main.js - Método loadCSSChallenge()
const challenges = {
    5: {
        title: '🎯 Desafío 5: Nuevo desafío',
        description: 'Descripción del nuevo desafío'
    }
};
```

**Agregar nuevos sonidos:**
```javascript
// En audio.js - Método setupGameSounds()
'nuevo-sonido': { 
    type: 'success', 
    frequencies: [523, 659, 784], 
    duration: 0.5, 
    volume: 0.7,
    description: 'Descripción del sonido'
}
```

**Personalizar validaciones:**
```javascript
// En validaciones.js - Método setupValidationRules()
this.rules.set('customField', [
    {
        name: 'customRule',
        test: (value) => /pattern/.test(value),
        message: 'Mensaje personalizado'
    }
]);
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

## 🚀 Roadmap y Futuras Mejoras

### Versión 2.0 (Próxima) 🎯
- [ ] Más desafíos CSS y JavaScript
- [ ] Sistema de hints inteligente con IA
- [ ] Modo oscuro / temas personalizables
- [ ] Certificado de completitud descargable
- [ ] Sistema de badges y trofeos expandido

### Versión 3.0 (Planificada) 🌟
- [ ] Backend con Node.js + MongoDB
- [ ] Rankings globales y competencias
- [ ] Sistema de amigos y desafíos
- [ ] Editor de código en vivo con preview
- [ ] Modo multijugador cooperativo

### Mejoras Técnicas 🔧
- [ ] Service Workers para PWA
- [ ] Tests automatizados (Jest/Cypress)
- [ ] CI/CD con GitHub Actions
- [ ] Optimización Lighthouse 100/100
- [ ] Internacionalización (i18n)

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature (`git checkout -b feature/nueva-feature`)
3. **Commit** tus cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-feature`)
5. **Abre** un Pull Request

### Guías de Estilo
- Sigue la estructura de código existente
- Usa comentarios JSDoc para funciones
- Mantén la filosofía: educativo, accesible y gamificado
- Respeta el sistema de fases evolutivas
- No agregues dependencias externas sin discutir

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Santiago Ramírez Carrero**
- 🎓 Estudiante de Programación - Tecnológico Remington
- 📚 Lenguaje de Programación II
- 💻 GitHub: [@SantinyOficial](https://github.com/SantinyOficial)
- 📘 Facebook: [Santiago Ramirez](https://www.facebook.com/profile.php?id=100039165563700)
- 📸 Instagram: [@santiny_oficial](https://instagram.com/santiny_oficial)

## 🙏 Agradecimientos

- Inspirado en la comunidad de desarrolladores web
- Colores oficiales de HTML5, CSS3 y JavaScript
- Web Audio API y Drag & Drop API de W3C
- Comunidad de GitHub por el soporte educativo

## 📞 Soporte

Si encuentras algún bug o tienes sugerencias:
- 🐛 Abre un [Issue](https://github.com/SantinyOficial/juego-web/issues)
- 🔧 Envía un Pull Request con mejoras
- 💬 Contacta al autor en redes sociales
- ⭐ Da una estrella al proyecto si te fue útil

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ y ☕ para la comunidad de desarrolladores

</div>

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**. Esto significa que puedes:

- ✅ Usar comercialmente
- ✅ Modificar el código
- ✅ Distribuir copias
- ✅ Usar de forma privada

Consulta el archivo `LICENSE` para los términos completos.

## 🎓 Contexto Académico

**Proyecto Educativo**
- � Institución: Tecnológico Remington
- 📚 Materia: Lenguaje de Programación II
- �‍🎓 Estudiante: Santiago Ramírez Carrero
- 🎯 Objetivo: Crear herramienta interactiva de enseñanza de HTML semántico
- 📅 Año: 2025

## 🙏 Agradecimientos

- **HTML5 Specification** por los estándares semánticos
- **MDN Web Docs** por la documentación excelente
- **CSS Grid & Flexbox** por las posibilidades de layout
- **JavaScript ES6+** por las características modernas
- **Drag and Drop API** por la interactividad nativa

## 📈 Estadísticas del Proyecto

- 📁 **Archivos Principales**: 7 archivos (HTML, CSS, 3 JS, README, gitignore)
- 💻 **Líneas de Código Totales**: ~4,100 líneas
  - HTML: 499 líneas
  - CSS: ~2,600 líneas
  - JavaScript: ~3,636 líneas (audio: 467, validaciones: 633, main: 2536)
- 🎨 **Componentes CSS**: 100+ clases y animaciones
- ⚡ **Funciones JS**: 80+ métodos distribuidos en 3 clases principales
- 🏆 **Elementos HTML**: 6 etiquetas semánticas enseñadas (header, nav, main, article, aside, footer)
- 🎵 **Efectos de Sonido**: 16+ sonidos únicos generados sintéticamente
- 🌈 **Fases Visuales**: 5 fases evolutivas con colores galácticos
- 🎯 **Desafíos Totales**: 14 desafíos (6 HTML + 4 CSS + 4 JS)

---

<div align="center">

### 🌟 ¡Transforma tu aprendizaje de HTML en una aventura cósmica! 🌟

**¿Listo para dominar la semántica HTML mientras te diviertes?**

[🎮 **¡JUGAR AHORA!**](./index.html) | [📚 **DOCUMENTACIÓN**](./README.md) | [🐛 **REPORTAR BUG**](../../issues)

---

⭐ **¡Si este proyecto te ayudó a aprender, dale una estrella!** ⭐

*Hecho con ❤️ y mucho ☕ por Santiago Ramírez Carrero*

</div>
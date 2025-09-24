# Sistema de Registro de Cédula de Ciudadanía

Una aplicación web moderna y accesible para el registro y validación de datos de cédula de ciudadanía colombiana.

## 🚀 Características

- **Interfaz moderna y responsiva**: Diseño elegante que se adapta a todos los dispositivos
- **Validaciones en tiempo real**: Validación automática de campos mientras el usuario escribe
- **Validaciones específicas para Colombia**: Verificación de números de cédula y teléfonos colombianos
- **Accesibilidad completa**: Cumple con estándares WCAG, soporte para lectores de pantalla
- **Autoguardado**: Los datos se guardan automáticamente para evitar pérdidas
- **Preview de datos**: Revisión de información antes del envío final
- **Arquitectura modular**: Código organizado y fácil de mantener

## 📁 Estructura del Proyecto

```
aplicativo-web/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos principales
├── js/
│   ├── validaciones.js     # Módulo de validaciones
│   ├── formulario.js       # Lógica del formulario
│   └── app.js             # Aplicación principal
├── assets/                 # Recursos (imágenes, iconos)
└── README.md              # Este archivo
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y grid/flexbox
- **JavaScript ES6+**: Módulos, async/await, destructuring
- **Metodología BEM**: Para nomenclatura de CSS organizada
- **Progressive Enhancement**: Funciona sin JavaScript (validaciones básicas)

## 📋 Campos del Formulario

### Datos de Identificación
- **Número de Cédula**: 7-10 dígitos, validación específica colombiana
- **Lugar de Expedición**: Selector de ciudades principales + opción "Otro"

### Información Personal
- **Primer Nombre**: Obligatorio, solo letras
- **Segundo Nombre**: Opcional, solo letras
- **Primer Apellido**: Obligatorio, solo letras
- **Segundo Apellido**: Opcional, solo letras
- **Fecha de Nacimiento**: Validación de edad mínima (18 años)
- **Género**: Selector con opciones inclusivas

### Información de Contacto
- **Dirección de Residencia**: Mínimo 10 caracteres
- **Teléfono**: Validación para números colombianos (fijo/celular)
- **Correo Electrónico**: Validación de formato RFC compliant

## ✨ Funcionalidades Destacadas

### Validaciones Inteligentes
- **Cédula Colombiana**: Verificación de longitud, formato y patrones válidos
- **Teléfonos**: Diferenciación entre números fijos y celulares
- **Coherencia de datos**: Validación cruzada entre campos relacionados
- **Tiempo real**: Feedback inmediato al usuario

### Experiencia de Usuario
- **Navegación por teclado**: Soporte completo con Tab/Shift+Tab
- **Accesos directos**: Ctrl+S para enviar, Ctrl+R para limpiar
- **Campos condicionales**: Aparición dinámica de campos según selección
- **Preview interactivo**: Revisión de datos antes de confirmar

### Accesibilidad
- **Lectores de pantalla**: Anuncios y descripciones completas
- **Alto contraste**: Soporte para preferencias del sistema
- **Reducción de movimiento**: Respeta las preferencias del usuario
- **Focus management**: Gestión inteligente del foco

## 🚀 Instalación y Uso

1. **Clonar/Descargar** el proyecto
2. **Abrir** `index.html` en cualquier navegador moderno
3. **¡Listo!** No requiere servidor web ni dependencias adicionales

### Navegadores Compatibles
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎨 Personalización

### Variables CSS
El archivo `css/styles.css` utiliza variables CSS para fácil personalización:

```css
:root {
    --color-primary: #2563eb;
    --color-success: #059669;
    --color-error: #dc2626;
    /* ... más variables */
}
```

### Configuración JavaScript
Modifica las configuraciones en `js/app.js`:

```javascript
const App = {
    config: {
        debug: true,                    // Logs detallados
        timeouts: {
            notificacion: 3000,         // Duración notificaciones
            autoguardado: 30000         // Intervalo autoguardado
        }
    }
};
```

## 🔧 Desarrollo

### Estructura Modular
- **`validaciones.js`**: Todas las reglas y funciones de validación
- **`formulario.js`**: Manejo del formulario, eventos y UI
- **`app.js`**: Coordinador principal, inicialización y configuración global

### Agregar Nuevas Validaciones
```javascript
// En validaciones.js
Validaciones.reglas.nuevoCampo = {
    required: true,
    pattern: /^[A-Z]{2,}$/,
    mensaje: 'Solo letras mayúsculas, mínimo 2 caracteres'
};
```

### Agregar Nuevos Campos
1. Agregar HTML en `index.html`
2. Definir reglas en `validaciones.js`
3. Actualizar preview en `formulario.js`

## 📱 Características Móviles

- **Responsive Design**: Adaptación automática a todos los tamaños
- **Touch Friendly**: Botones y campos optimizados para touch
- **Teclados Adaptativos**: Tipos de input que activan teclados específicos
- **Orientación**: Detección y adaptación a cambios de orientación

## 🔒 Seguridad y Privacidad

- **Solo Frontend**: No se envían datos a servidores externos
- **Autoguardado Local**: Los datos se guardan solo en localStorage del navegador
- **Validación Dual**: Cliente y (futuro) servidor
- **Sanitización**: Limpieza automática de entradas del usuario

## 🐛 Depuración

### Modo Debug
Activar en `js/app.js`:
```javascript
debug: true
```

### Información del Sistema
En consola del navegador:
```javascript
App.obtenerInfoSistema()
```

### Logs Detallados
- Inicialización de módulos
- Errores de validación
- Estados del formulario
- Rendimiento de carga

## 🚀 Próximas Mejoras

- [ ] Integración con backend/API
- [ ] Guardado en base de datos
- [ ] Exportación a PDF
- [ ] Modo offline/PWA
- [ ] Temas personalizables
- [ ] Multi-idioma
- [ ] Más tipos de documento

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte o preguntas:
- Abrir un issue en GitHub
- Contactar al equipo de desarrollo

---

**Desarrollado con ❤️ para la gestión eficiente de datos de cédula de ciudadanía**
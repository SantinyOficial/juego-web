/**
 * Aplicación Principal - Cédula de Ciudadanía
 * Punto de entrada y coordinador de todos los módulos
 */

const App = {
    /**
     * Configuración global de la aplicación
     */
    config: {
        nombre: 'Sistema de Registro de Cédula de Ciudadanía',
        version: '1.0.0',
        debug: true,
        timeouts: {
            notificacion: 3000,
            animacion: 300,
            autoguardado: 30000
        }
    },

    /**
     * Estado global de la aplicación
     */
    estado: {
        inicializada: false,
        modulosCargados: [],
        erroresInicializacion: [],
        tiempoInicio: null
    },

    /**
     * Inicializa la aplicación
     */
    async init() {
        try {
            this.estado.tiempoInicio = Date.now();
            this.log('Iniciando aplicación...');

            // Verificar compatibilidad del navegador
            if (!this.verificarCompatibilidad()) {
                throw new Error('Navegador no compatible');
            }

            // Configurar manejo global de errores
            this.configurarManejoErrores();

            // Inicializar módulos
            await this.inicializarModulos();

            // Configurar funcionalidades adicionales
            this.configurarAccesibilidad();
            this.configurarResponsividad();
            this.configurarAutoguardado();

            // Marcar como inicializada
            this.estado.inicializada = true;
            
            const tiempoTotal = Date.now() - this.estado.tiempoInicio;
            this.log(`Aplicación inicializada correctamente en ${tiempoTotal}ms`);

            // Notificar usuario que la app está lista
            this.mostrarNotificacionBienvenida();

        } catch (error) {
            this.manejarErrorInicializacion(error);
        }
    },

    /**
     * Verifica la compatibilidad del navegador
     */
    verificarCompatibilidad() {
        // Verificar funcionalidades ES6+ necesarias
        const funcionesRequeridas = [
            'Promise',
            'fetch',
            'localStorage',
            'FormData',
            'addEventListener'
        ];

        const funcionesFaltantes = funcionesRequeridas.filter(func => {
            return typeof window[func] === 'undefined' && typeof global[func] === 'undefined';
        });

        if (funcionesFaltantes.length > 0) {
            console.error('Funcionalidades no soportadas:', funcionesFaltantes);
            this.mostrarErrorCompatibilidad(funcionesFaltantes);
            return false;
        }

        // Verificar CSS Grid y Flexbox
        if (!this.verificarSoporteCSS()) {
            console.warn('Soporte CSS limitado detectado');
        }

        return true;
    },

    /**
     * Verifica soporte para CSS moderno
     */
    verificarSoporteCSS() {
        const elemento = document.createElement('div');
        elemento.style.display = 'grid';
        return elemento.style.display === 'grid';
    },

    /**
     * Configura el manejo global de errores
     */
    configurarManejoErrores() {
        // Errores de JavaScript no capturados
        window.addEventListener('error', (event) => {
            this.manejarError({
                tipo: 'JavaScript Error',
                mensaje: event.message,
                archivo: event.filename,
                linea: event.lineno,
                columna: event.colno,
                error: event.error
            });
        });

        // Promesas rechazadas no capturadas
        window.addEventListener('unhandledrejection', (event) => {
            this.manejarError({
                tipo: 'Promise Rejection',
                mensaje: event.reason?.message || 'Promise rejection no manejada',
                error: event.reason
            });
        });

        this.log('Manejo global de errores configurado');
    },

    /**
     * Inicializa todos los módulos de la aplicación
     */
    async inicializarModulos() {
        const modulos = [
            {
                nombre: 'FormularioCedula',
                modulo: FormularioCedula,
                requerido: true
            }
        ];

        for (const { nombre, modulo, requerido } of modulos) {
            try {
                this.log(`Inicializando módulo: ${nombre}`);
                
                if (typeof modulo.init === 'function') {
                    await modulo.init();
                }
                
                this.estado.modulosCargados.push(nombre);
                this.log(`Módulo ${nombre} inicializado correctamente`);
                
            } catch (error) {
                const mensajeError = `Error al inicializar módulo ${nombre}: ${error.message}`;
                this.estado.erroresInicializacion.push(mensajeError);
                
                if (requerido) {
                    throw new Error(mensajeError);
                } else {
                    console.warn(mensajeError);
                }
            }
        }
    },

    /**
     * Configura características de accesibilidad
     */
    configurarAccesibilidad() {
        // Navegación por teclado mejorada
        this.configurarNavegacionTeclado();
        
        // Anuncios para lectores de pantalla
        this.configurarLectorPantalla();
        
        // Gestión de focus
        this.configurarGestionFocus();

        this.log('Accesibilidad configurada');
    },

    /**
     * Configura la navegación por teclado
     */
    configurarNavegacionTeclado() {
        document.addEventListener('keydown', (event) => {
            // Navegación con Tab mejorada
            if (event.key === 'Tab') {
                this.manejarNavegacionTab(event);
            }
            
            // Escape para cerrar modales/overlays
            if (event.key === 'Escape') {
                this.manejarEscape(event);
            }
            
            // Accesos directos
            if (event.ctrlKey || event.metaKey) {
                this.manejarAccesosDirectos(event);
            }
        });
    },

    /**
     * Maneja la navegación con Tab
     */
    manejarNavegacionTab(event) {
        const elementosFocusables = document.querySelectorAll(
            'input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        const primerElemento = elementosFocusables[0];
        const ultimoElemento = elementosFocusables[elementosFocusables.length - 1];
        
        // Ciclar el focus en el contenido visible
        if (event.shiftKey && document.activeElement === primerElemento) {
            event.preventDefault();
            ultimoElemento.focus();
        } else if (!event.shiftKey && document.activeElement === ultimoElemento) {
            event.preventDefault();
            primerElemento.focus();
        }
    },

    /**
     * Maneja la tecla Escape
     */
    manejarEscape(event) {
        // Cerrar preview si está abierto
        if (FormularioCedula.estado.enPreview) {
            FormularioCedula.volverAEditar();
            event.preventDefault();
        }
    },

    /**
     * Maneja accesos directos con Ctrl/Cmd
     */
    manejarAccesosDirectos(event) {
        switch (event.key.toLowerCase()) {
            case 's': // Ctrl+S para guardar/enviar
                event.preventDefault();
                if (!FormularioCedula.estado.enPreview) {
                    FormularioCedula.procesarFormulario();
                }
                break;
                
            case 'r': // Ctrl+R para limpiar (sobrescribir refresh)
                if (!event.altKey) {
                    event.preventDefault();
                    FormularioCedula.limpiarFormulario();
                }
                break;
        }
    },

    /**
     * Configura soporte para lectores de pantalla
     */
    configurarLectorPantalla() {
        // Crear región live para anuncios
        const regionLive = document.createElement('div');
        regionLive.setAttribute('aria-live', 'polite');
        regionLive.setAttribute('aria-atomic', 'true');
        regionLive.style.position = 'absolute';
        regionLive.style.left = '-10000px';
        regionLive.style.width = '1px';
        regionLive.style.height = '1px';
        regionLive.style.overflow = 'hidden';
        regionLive.id = 'liveRegion';
        
        document.body.appendChild(regionLive);
    },

    /**
     * Anuncia un mensaje al lector de pantalla
     */
    anunciarALectorPantalla(mensaje) {
        const regionLive = document.getElementById('liveRegion');
        if (regionLive) {
            regionLive.textContent = mensaje;
            setTimeout(() => {
                regionLive.textContent = '';
            }, 1000);
        }
    },

    /**
     * Configura la gestión de focus
     */
    configurarGestionFocus() {
        // Guardar el último elemento enfocado
        let ultimoElementoEnfocado = null;
        
        document.addEventListener('focusin', (event) => {
            ultimoElementoEnfocado = event.target;
        });
        
        // Función global para restaurar focus
        window.restaurarFocus = () => {
            if (ultimoElementoEnfocado && document.contains(ultimoElementoEnfocado)) {
                ultimoElementoEnfocado.focus();
            }
        };
    },

    /**
     * Configura responsividad y adaptación a dispositivos
     */
    configurarResponsividad() {
        // Detectar cambios en orientación
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.ajustarLayoutOrientacion();
            }, 100);
        });

        // Detectar cambios en tamaño de ventana
        let timeoutResize;
        window.addEventListener('resize', () => {
            clearTimeout(timeoutResize);
            timeoutResize = setTimeout(() => {
                this.ajustarLayoutTamano();
            }, 250);
        });

        // Configuración inicial
        this.ajustarLayoutOrientacion();
        this.ajustarLayoutTamano();

        this.log('Responsividad configurada');
    },

    /**
     * Ajusta el layout según la orientación
     */
    ajustarLayoutOrientacion() {
        const esApaisado = window.innerWidth > window.innerHeight;
        document.body.classList.toggle('landscape', esApaisado);
        document.body.classList.toggle('portrait', !esApaisado);
    },

    /**
     * Ajusta el layout según el tamaño de pantalla
     */
    ajustarLayoutTamano() {
        const anchoPantalla = window.innerWidth;
        
        // Remover clases anteriores
        document.body.classList.remove('mobile', 'tablet', 'desktop');
        
        // Agregar clase según tamaño
        if (anchoPantalla <= 768) {
            document.body.classList.add('mobile');
        } else if (anchoPantalla <= 1024) {
            document.body.classList.add('tablet');
        } else {
            document.body.classList.add('desktop');
        }
    },

    /**
     * Configura autoguardado de datos del formulario
     */
    configurarAutoguardado() {
        // Solo si el navegador soporta localStorage
        if (typeof localStorage === 'undefined') {
            this.log('localStorage no disponible, autoguardado deshabilitado');
            return;
        }

        // Autoguardar cada 30 segundos
        setInterval(() => {
            this.autoguardarDatos();
        }, this.config.timeouts.autoguardado);

        // Cargar datos guardados al iniciar
        this.cargarDatosGuardados();

        this.log('Autoguardado configurado');
    },

    /**
     * Guarda automáticamente los datos del formulario
     */
    autoguardarDatos() {
        try {
            const formulario = document.getElementById('cedulaForm');
            if (!formulario) return;

            const formData = new FormData(formulario);
            const datos = {};
            
            for (const [key, value] of formData.entries()) {
                if (value && value.trim() !== '') {
                    datos[key] = value;
                }
            }

            // Solo guardar si hay datos
            if (Object.keys(datos).length > 0) {
                localStorage.setItem('cedulaForm_autoguardado', JSON.stringify({
                    datos: datos,
                    timestamp: Date.now()
                }));
            }
        } catch (error) {
            console.warn('Error en autoguardado:', error);
        }
    },

    /**
     * Carga datos guardados automáticamente
     */
    cargarDatosGuardados() {
        try {
            const datosGuardados = localStorage.getItem('cedulaForm_autoguardado');
            if (!datosGuardados) return;

            const { datos, timestamp } = JSON.parse(datosGuardados);
            
            // Solo cargar si los datos son recientes (menos de 24 horas)
            const horasTranscurridas = (Date.now() - timestamp) / (1000 * 60 * 60);
            if (horasTranscurridas > 24) {
                localStorage.removeItem('cedulaForm_autoguardado');
                return;
            }

            // Preguntar al usuario si desea cargar los datos
            if (confirm('Se encontraron datos guardados anteriormente. ¿Desea cargarlos?')) {
                this.restaurarDatosFormulario(datos);
                this.anunciarALectorPantalla('Datos restaurados desde guardado automático');
            }
        } catch (error) {
            console.warn('Error al cargar datos guardados:', error);
            localStorage.removeItem('cedulaForm_autoguardado');
        }
    },

    /**
     * Restaura datos en el formulario
     */
    restaurarDatosFormulario(datos) {
        Object.keys(datos).forEach(campo => {
            const elemento = document.querySelector(`[name="${campo}"]`);
            if (elemento) {
                elemento.value = datos[campo];
                
                // Disparar evento para validaciones
                elemento.dispatchEvent(new Event('input', { bubbles: true }));
            }
        });
    },

    /**
     * Muestra notificación de bienvenida
     */
    mostrarNotificacionBienvenida() {
        const mensaje = `¡Bienvenido al ${this.config.nombre}! La aplicación está lista para usar.`;
        
        // Usar el sistema de notificaciones del módulo FormularioCedula si está disponible
        if (FormularioCedula && typeof FormularioCedula.mostrarNotificacion === 'function') {
            FormularioCedula.mostrarNotificacion(mensaje, 'info');
        } else {
            console.log(mensaje);
        }

        this.anunciarALectorPantalla(mensaje);
    },

    /**
     * Maneja errores durante la inicialización
     */
    manejarErrorInicializacion(error) {
        console.error('Error crítico en inicialización:', error);
        
        // Mostrar mensaje de error al usuario
        this.mostrarErrorCritico({
            titulo: 'Error de Inicialización',
            mensaje: 'No se pudo inicializar la aplicación correctamente.',
            detalles: error.message,
            sugerencias: [
                'Actualice la página (F5)',
                'Verifique su conexión a internet',
                'Contacte al administrador si el problema persiste'
            ]
        });
    },

    /**
     * Maneja errores generales de la aplicación
     */
    manejarError(infoError) {
        // Log detallado para debugging
        if (this.config.debug) {
            console.group(`🚫 Error: ${infoError.tipo}`);
            console.error('Mensaje:', infoError.mensaje);
            if (infoError.archivo) console.log('Archivo:', infoError.archivo);
            if (infoError.linea) console.log('Línea:', infoError.linea);
            if (infoError.error) console.error('Stack:', infoError.error.stack);
            console.groupEnd();
        }

        // Notificar al usuario si es necesario
        if (infoError.tipo === 'JavaScript Error') {
            this.mostrarErrorUsuario('Se produjo un error inesperado. Por favor, recargue la página.');
        }
    },

    /**
     * Muestra error de compatibilidad
     */
    mostrarErrorCompatibilidad(funcionesFaltantes) {
        const mensaje = `
            <div style="padding: 20px; background: #fee; border: 1px solid #fcc; margin: 20px; border-radius: 8px;">
                <h2 style="color: #c00;">Navegador No Compatible</h2>
                <p>Su navegador no soporta algunas funcionalidades necesarias:</p>
                <ul>
                    ${funcionesFaltantes.map(func => `<li><code>${func}</code></li>`).join('')}
                </ul>
                <p><strong>Recomendación:</strong> Actualice a una versión más reciente de Chrome, Firefox, Safari o Edge.</p>
            </div>
        `;
        
        document.body.innerHTML = mensaje;
    },

    /**
     * Muestra error crítico con interfaz de recuperación
     */
    mostrarErrorCritico(infoError) {
        const errorHTML = `
            <div class="error-critico">
                <div class="error-contenido">
                    <h1>⚠️ ${infoError.titulo}</h1>
                    <p class="error-mensaje">${infoError.mensaje}</p>
                    ${infoError.detalles ? `<details><summary>Detalles técnicos</summary><pre>${infoError.detalles}</pre></details>` : ''}
                    <div class="error-sugerencias">
                        <h3>Posibles soluciones:</h3>
                        <ul>
                            ${infoError.sugerencias.map(sugerencia => `<li>${sugerencia}</li>`).join('')}
                        </ul>
                    </div>
                    <button onclick="location.reload()" class="btn btn--primary">
                        🔄 Recargar Página
                    </button>
                </div>
            </div>
        `;

        // Crear overlay de error
        const overlay = document.createElement('div');
        overlay.innerHTML = errorHTML;
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); z-index: 10000;
            display: flex; align-items: center; justify-content: center;
            font-family: Arial, sans-serif;
        `;

        document.body.appendChild(overlay);
    },

    /**
     * Muestra error simple al usuario
     */
    mostrarErrorUsuario(mensaje) {
        if (FormularioCedula && typeof FormularioCedula.mostrarNotificacion === 'function') {
            FormularioCedula.mostrarNotificacion(mensaje, 'error');
        } else {
            alert(mensaje);
        }
    },

    /**
     * Función de logging condicional
     */
    log(mensaje, ...argumentos) {
        if (this.config.debug) {
            console.log(`[${this.config.nombre}]`, mensaje, ...argumentos);
        }
    },

    /**
     * Obtiene información del sistema para debugging
     */
    obtenerInfoSistema() {
        return {
            aplicacion: {
                nombre: this.config.nombre,
                version: this.config.version,
                inicializada: this.estado.inicializada,
                tiempoInicio: this.estado.tiempoInicio
            },
            navegador: {
                userAgent: navigator.userAgent,
                idioma: navigator.language,
                plataforma: navigator.platform,
                cookiesHabilitadas: navigator.cookieEnabled
            },
            pantalla: {
                ancho: window.innerWidth,
                alto: window.innerHeight,
                densidadPixel: window.devicePixelRatio
            },
            modulos: this.estado.modulosCargados,
            errores: this.estado.erroresInicializacion
        };
    },

    /**
     * Limpia recursos antes de cerrar la aplicación
     */
    destruir() {
        // Limpiar autoguardado
        if (this.intervalAutoguardado) {
            clearInterval(this.intervalAutoguardado);
        }

        // Destruir módulos
        if (FormularioCedula && typeof FormularioCedula.destroy === 'function') {
            FormularioCedula.destroy();
        }

        // Limpiar event listeners globales
        window.removeEventListener('error', this.manejarError);
        window.removeEventListener('unhandledrejection', this.manejarError);

        this.log('Aplicación destruida correctamente');
    }
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    App.init().catch(error => {
        console.error('Error fatal al inicializar la aplicación:', error);
    });
});

// Limpiar recursos al cerrar la página
window.addEventListener('beforeunload', () => {
    App.destruir();
});

// Exportar para debugging global
if (typeof window !== 'undefined') {
    window.App = App;
}
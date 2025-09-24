/**
 * Módulo de Formulario
 * Maneja toda la lógica del formulario de cédula de ciudadanía
 */

const FormularioCedula = {
    /**
     * Configuración del formulario
     */
    config: {
        form: null,
        previewSection: null,
        submitBtn: null,
        clearBtn: null,
        editBtn: null,
        confirmBtn: null,
        isInitialized: false,
        animationDuration: 300
    },

    /**
     * Estado del formulario
     */
    estado: {
        datosFormulario: {},
        enPreview: false,
        validado: false,
        enviando: false
    },

    /**
     * Inicializa el módulo del formulario
     */
    init() {
        if (this.config.isInitialized) {
            console.warn('FormularioCedula ya está inicializado');
            return;
        }

        try {
            this.obtenerElementos();
            this.configurarEventListeners();
            this.configurarValidacionTiempoReal();
            this.configurarCamposCondicionales();
            this.config.isInitialized = true;
            
            console.log('FormularioCedula inicializado correctamente');
        } catch (error) {
            console.error('Error al inicializar FormularioCedula:', error);
        }
    },

    /**
     * Obtiene referencias a los elementos del DOM
     */
    obtenerElementos() {
        this.config.form = document.getElementById('cedulaForm');
        this.config.previewSection = document.getElementById('previewSection');
        this.config.submitBtn = document.getElementById('enviarBtn');
        this.config.clearBtn = document.getElementById('limpiarBtn');
        this.config.editBtn = document.getElementById('editarBtn');
        this.config.confirmBtn = document.getElementById('confirmarBtn');

        // Verificar que todos los elementos existan
        const elementos = [
            { nombre: 'form', elemento: this.config.form },
            { nombre: 'previewSection', elemento: this.config.previewSection },
            { nombre: 'submitBtn', elemento: this.config.submitBtn },
            { nombre: 'clearBtn', elemento: this.config.clearBtn },
            { nombre: 'editBtn', elemento: this.config.editBtn },
            { nombre: 'confirmBtn', elemento: this.config.confirmBtn }
        ];

        elementos.forEach(({ nombre, elemento }) => {
            if (!elemento) {
                throw new Error(`Elemento ${nombre} no encontrado`);
            }
        });
    },

    /**
     * Configura los event listeners principales
     */
    configurarEventListeners() {
        // Submit del formulario
        this.config.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.procesarFormulario();
        });

        // Botón limpiar
        this.config.clearBtn.addEventListener('click', () => {
            this.limpiarFormulario();
        });

        // Botón editar (desde preview)
        this.config.editBtn.addEventListener('click', () => {
            this.volverAEditar();
        });

        // Botón confirmar (desde preview)
        this.config.confirmBtn.addEventListener('click', () => {
            this.confirmarRegistro();
        });

        // Eventos de teclado para accesibilidad
        this.config.form.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.type !== 'submit') {
                e.preventDefault();
                this.enfocarSiguienteCampo(e.target);
            }
        });
    },

    /**
     * Configura la validación en tiempo real
     */
    configurarValidacionTiempoReal() {
        const campos = this.config.form.querySelectorAll('input, select');
        
        campos.forEach(campo => {
            // Validación en blur (al salir del campo)
            campo.addEventListener('blur', () => {
                this.validarCampoIndividual(campo);
            });

            // Validación en input para campos específicos
            if (['numeroCedula', 'telefono'].includes(campo.name)) {
                campo.addEventListener('input', () => {
                    this.validarCampoEnTiempoReal(campo);
                });
            }

            // Limpiar errores en focus
            campo.addEventListener('focus', () => {
                this.limpiarErrorCampo(campo);
            });
        });
    },

    /**
     * Configura campos condicionales (como "otro lugar")
     */
    configurarCamposCondicionales() {
        const lugarExpedicion = document.getElementById('lugarExpedicion');
        const otroLugarGroup = document.getElementById('otroLugarGroup');
        const otroLugarInput = document.getElementById('otroLugar');

        lugarExpedicion.addEventListener('change', () => {
            if (lugarExpedicion.value === 'otro') {
                this.mostrarCampoCondicional(otroLugarGroup);
                otroLugarInput.required = true;
                otroLugarInput.focus();
            } else {
                this.ocultarCampoCondicional(otroLugarGroup);
                otroLugarInput.required = false;
                otroLugarInput.value = '';
                this.limpiarErrorCampo(otroLugarInput);
            }
        });
    },

    /**
     * Muestra un campo condicional con animación
     */
    mostrarCampoCondicional(elemento) {
        elemento.style.display = 'block';
        elemento.classList.add('slide-in');
        
        setTimeout(() => {
            elemento.classList.remove('slide-in');
        }, this.config.animationDuration);
    },

    /**
     * Oculta un campo condicional con animación
     */
    ocultarCampoCondicional(elemento) {
        elemento.classList.add('fade-out');
        
        setTimeout(() => {
            elemento.style.display = 'none';
            elemento.classList.remove('fade-out');
        }, this.config.animationDuration);
    },

    /**
     * Valida un campo individual
     */
    validarCampoIndividual(campo) {
        const valor = campo.value;
        const nombreCampo = campo.name;
        
        let resultado;
        
        // Validaciones especiales
        if (nombreCampo === 'numeroCedula') {
            resultado = Validaciones.validarCedulaColombiana(valor);
        } else if (nombreCampo === 'telefono') {
            resultado = Validaciones.validarTelefonoColombiano(valor);
        } else if (nombreCampo === 'email') {
            resultado = Validaciones.validarEmail(valor);
        } else {
            resultado = Validaciones.validarCampo(nombreCampo, valor);
        }

        this.mostrarResultadoValidacion(campo, resultado);
        return resultado.valido;
    },

    /**
     * Validación en tiempo real para campos específicos
     */
    validarCampoEnTiempoReal(campo) {
        const valor = campo.value;
        const nombreCampo = campo.name;

        // Formateo automático para cédula
        if (nombreCampo === 'numeroCedula') {
            const valorLimpio = valor.replace(/\D/g, '');
            if (valorLimpio !== valor) {
                campo.value = valorLimpio;
            }
        }

        // Formateo automático para teléfono
        if (nombreCampo === 'telefono') {
            const valorLimpio = valor.replace(/\D/g, '');
            if (valorLimpio !== valor) {
                campo.value = valorLimpio;
            }
        }

        // Solo mostrar errores si el campo tiene suficiente contenido
        if (valor.length > 3) {
            this.validarCampoIndividual(campo);
        } else {
            this.limpiarErrorCampo(campo);
        }
    },

    /**
     * Muestra el resultado de la validación en el campo
     */
    mostrarResultadoValidacion(campo, resultado) {
        const grupo = campo.closest('.form__group');
        const errorElement = document.getElementById(`${campo.name}-error`);

        if (!grupo || !errorElement) return;

        // Limpiar clases anteriores
        grupo.classList.remove('has-error', 'has-success');

        if (!resultado.valido) {
            grupo.classList.add('has-error');
            errorElement.textContent = resultado.mensaje;
            errorElement.style.display = 'block';
        } else {
            grupo.classList.add('has-success');
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    },

    /**
     * Limpia el error de un campo
     */
    limpiarErrorCampo(campo) {
        const grupo = campo.closest('.form__group');
        const errorElement = document.getElementById(`${campo.name}-error`);

        if (grupo) {
            grupo.classList.remove('has-error', 'has-success');
        }

        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    },

    /**
     * Procesa el envío del formulario
     */
    async procesarFormulario() {
        if (this.estado.enviando) return;

        try {
            this.estado.enviando = true;
            this.mostrarCargando(this.config.submitBtn);

            // Recopilar datos del formulario
            const formData = new FormData(this.config.form);
            
            // Validar formulario completo
            const validacion = Validaciones.validarFormularioCompleto(formData);

            if (!validacion.valido) {
                this.mostrarErroresValidacion(validacion.errores);
                this.enfocarPrimerError();
                return;
            }

            // Convertir FormData a objeto
            this.estado.datosFormulario = this.formDataToObject(formData);
            
            // Mostrar preview
            this.mostrarPreview();

        } catch (error) {
            console.error('Error al procesar formulario:', error);
            this.mostrarNotificacion('Error al procesar el formulario', 'error');
        } finally {
            this.estado.enviando = false;
            this.ocultarCargando(this.config.submitBtn);
        }
    },

    /**
     * Convierte FormData a objeto JavaScript
     */
    formDataToObject(formData) {
        const obj = {};
        for (const [key, value] of formData.entries()) {
            obj[key] = value;
        }
        return obj;
    },

    /**
     * Muestra errores de validación en el formulario
     */
    mostrarErroresValidacion(errores) {
        Object.keys(errores).forEach(nombreCampo => {
            const campo = document.querySelector(`[name="${nombreCampo}"]`);
            if (campo) {
                this.mostrarResultadoValidacion(campo, {
                    valido: false,
                    mensaje: errores[nombreCampo]
                });
            }
        });
    },

    /**
     * Enfoca el primer campo con error
     */
    enfocarPrimerError() {
        const primerError = this.config.form.querySelector('.has-error input, .has-error select');
        if (primerError) {
            primerError.focus();
            primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    },

    /**
     * Muestra el preview de los datos
     */
    mostrarPreview() {
        const previewContent = document.getElementById('previewContent');
        
        // Generar HTML del preview
        const previewHTML = this.generarPreviewHTML();
        previewContent.innerHTML = previewHTML;

        // Ocultar formulario y mostrar preview
        this.config.form.parentElement.style.display = 'none';
        this.config.previewSection.style.display = 'block';
        this.config.previewSection.classList.add('slide-in');

        // Scroll hacia el preview
        this.config.previewSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });

        this.estado.enPreview = true;
    },

    /**
     * Genera el HTML para el preview de datos
     */
    generarPreviewHTML() {
        const datos = this.estado.datosFormulario;
        
        // Formatear algunos campos para mostrar
        const cedulaFormateada = Validaciones.formatearCedula(datos.numeroCedula);
        const nombreCompleto = this.construirNombreCompleto(datos);
        const lugarExpedicion = datos.lugarExpedicion === 'otro' ? datos.otroLugar : this.obtenerNombreCiudad(datos.lugarExpedicion);
        const fechaFormateada = this.formatearFecha(datos.fechaNacimiento);

        return `
            <div class="preview-item">
                <span class="preview-label">Número de Cédula:</span>
                <span class="preview-value">${cedulaFormateada}</span>
            </div>
            <div class="preview-item">
                <span class="preview-label">Nombre Completo:</span>
                <span class="preview-value">${nombreCompleto}</span>
            </div>
            <div class="preview-item">
                <span class="preview-label">Lugar de Expedición:</span>
                <span class="preview-value">${lugarExpedicion}</span>
            </div>
            <div class="preview-item">
                <span class="preview-label">Fecha de Nacimiento:</span>
                <span class="preview-value">${fechaFormateada}</span>
            </div>
            <div class="preview-item">
                <span class="preview-label">Género:</span>
                <span class="preview-value">${this.formatearGenero(datos.genero)}</span>
            </div>
            <div class="preview-item">
                <span class="preview-label">Dirección:</span>
                <span class="preview-value">${datos.direccion}</span>
            </div>
            <div class="preview-item">
                <span class="preview-label">Teléfono:</span>
                <span class="preview-value">${this.formatearTelefono(datos.telefono)}</span>
            </div>
            <div class="preview-item">
                <span class="preview-label">Correo Electrónico:</span>
                <span class="preview-value">${datos.email}</span>
            </div>
        `;
    },

    /**
     * Construye el nombre completo a partir de los datos
     */
    construirNombreCompleto(datos) {
        const partes = [
            datos.primerNombre,
            datos.segundoNombre,
            datos.primerApellido,
            datos.segundoApellido
        ].filter(parte => parte && parte.trim() !== '');

        return partes.join(' ');
    },

    /**
     * Obtiene el nombre legible de la ciudad
     */
    obtenerNombreCiudad(codigo) {
        const ciudades = {
            'bogota': 'Bogotá D.C.',
            'medellin': 'Medellín',
            'cali': 'Cali',
            'barranquilla': 'Barranquilla',
            'cartagena': 'Cartagena',
            'bucaramanga': 'Bucaramanga',
            'pereira': 'Pereira',
            'manizales': 'Manizales'
        };

        return ciudades[codigo] || codigo;
    },

    /**
     * Formatea la fecha para mostrar
     */
    formatearFecha(fecha) {
        if (!fecha) return '';
        
        const fechaObj = new Date(fecha);
        const opciones = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        return fechaObj.toLocaleDateString('es-ES', opciones);
    },

    /**
     * Formatea el género para mostrar
     */
    formatearGenero(genero) {
        const generos = {
            'masculino': 'Masculino',
            'femenino': 'Femenino',
            'otro': 'Otro',
            'prefiero-no-decir': 'Prefiero no decir'
        };

        return generos[genero] || genero;
    },

    /**
     * Formatea el teléfono para mostrar
     */
    formatearTelefono(telefono) {
        if (!telefono) return '';
        
        const telefonoLimpio = telefono.replace(/\D/g, '');
        
        if (telefonoLimpio.length === 10) {
            return `${telefonoLimpio.slice(0, 3)} ${telefonoLimpio.slice(3, 6)} ${telefonoLimpio.slice(6)}`;
        } else if (telefonoLimpio.length === 7) {
            return `${telefonoLimpio.slice(0, 3)} ${telefonoLimpio.slice(3)}`;
        }
        
        return telefono;
    },

    /**
     * Vuelve al modo de edición desde el preview
     */
    volverAEditar() {
        // Ocultar preview y mostrar formulario
        this.config.previewSection.style.display = 'none';
        this.config.form.parentElement.style.display = 'block';
        
        // Scroll hacia el formulario
        this.config.form.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });

        this.estado.enPreview = false;
        
        // Enfocar el primer campo
        const primerCampo = this.config.form.querySelector('input, select');
        if (primerCampo) {
            primerCampo.focus();
        }
    },

    /**
     * Confirma el registro final
     */
    async confirmarRegistro() {
        try {
            this.mostrarCargando(this.config.confirmBtn);
            
            // Simular envío de datos (aquí iría la lógica de envío real)
            await this.simularEnvio();
            
            // Mostrar confirmación de éxito
            this.mostrarConfirmacionExito();
            
        } catch (error) {
            console.error('Error al confirmar registro:', error);
            this.mostrarNotificacion('Error al confirmar el registro', 'error');
        } finally {
            this.ocultarCargando(this.config.confirmBtn);
        }
    },

    /**
     * Simula el envío de datos al servidor
     */
    simularEnvio() {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Datos enviados:', this.estado.datosFormulario);
                resolve();
            }, 2000);
        });
    },

    /**
     * Muestra la confirmación de éxito
     */
    mostrarConfirmacionExito() {
        const mensajeExito = `
            <div class="success-message">
                <div class="success-icon">✅</div>
                <h3>¡Registro Exitoso!</h3>
                <p>Los datos de la cédula <strong>${Validaciones.formatearCedula(this.estado.datosFormulario.numeroCedula)}</strong> han sido registrados correctamente.</p>
                <button type="button" class="btn btn--primary" onclick="FormularioCedula.nuevoRegistro()">
                    Realizar Nuevo Registro
                </button>
            </div>
        `;

        document.getElementById('previewContent').innerHTML = mensajeExito;
        document.querySelector('.preview-actions').style.display = 'none';
    },

    /**
     * Inicia un nuevo registro
     */
    nuevoRegistro() {
        this.limpiarFormulario();
        this.volverAEditar();
        document.querySelector('.preview-actions').style.display = 'flex';
    },

    /**
     * Limpia el formulario completamente
     */
    limpiarFormulario() {
        if (confirm('¿Está seguro de que desea limpiar todos los datos del formulario?')) {
            this.config.form.reset();
            
            // Limpiar errores
            const errores = this.config.form.querySelectorAll('.form__error');
            errores.forEach(error => {
                error.textContent = '';
                error.style.display = 'none';
            });

            // Limpiar clases de validación
            const grupos = this.config.form.querySelectorAll('.form__group');
            grupos.forEach(grupo => {
                grupo.classList.remove('has-error', 'has-success');
            });

            // Ocultar campos condicionales
            const otroLugarGroup = document.getElementById('otroLugarGroup');
            if (otroLugarGroup) {
                otroLugarGroup.style.display = 'none';
                document.getElementById('otroLugar').required = false;
            }

            // Enfocar el primer campo
            const primerCampo = this.config.form.querySelector('input, select');
            if (primerCampo) {
                primerCampo.focus();
            }

            // Resetear estado
            this.estado = {
                datosFormulario: {},
                enPreview: false,
                validado: false,
                enviando: false
            };

            this.mostrarNotificacion('Formulario limpiado correctamente', 'info');
        }
    },

    /**
     * Enfoca el siguiente campo en el formulario
     */
    enfocarSiguienteCampo(campoActual) {
        const campos = Array.from(this.config.form.querySelectorAll('input:not([type="hidden"]), select, textarea'));
        const indiceActual = campos.indexOf(campoActual);
        
        if (indiceActual < campos.length - 1) {
            const siguienteCampo = campos[indiceActual + 1];
            siguienteCampo.focus();
        }
    },

    /**
     * Muestra estado de carga en un botón
     */
    mostrarCargando(boton) {
        boton.disabled = true;
        boton.classList.add('loading');
        boton.dataset.textoOriginal = boton.textContent;
        boton.textContent = 'Procesando...';
    },

    /**
     * Oculta estado de carga en un botón
     */
    ocultarCargando(boton) {
        boton.disabled = false;
        boton.classList.remove('loading');
        if (boton.dataset.textoOriginal) {
            boton.textContent = boton.dataset.textoOriginal;
            delete boton.dataset.textoOriginal;
        }
    },

    /**
     * Muestra una notificación al usuario
     */
    mostrarNotificacion(mensaje, tipo = 'info') {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = `notificacion notificacion--${tipo}`;
        notificacion.textContent = mensaje;

        // Añadir al DOM
        document.body.appendChild(notificacion);

        // Mostrar con animación
        setTimeout(() => {
            notificacion.classList.add('notificacion--visible');
        }, 100);

        // Ocultar después de 3 segundos
        setTimeout(() => {
            notificacion.classList.remove('notificacion--visible');
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 300);
        }, 3000);
    },

    /**
     * Obtiene un resumen de los datos del formulario
     */
    obtenerResumenDatos() {
        return {
            totalCampos: Object.keys(this.estado.datosFormulario).length,
            camposCompletos: Object.values(this.estado.datosFormulario).filter(valor => valor && valor.trim() !== '').length,
            nombreCompleto: this.construirNombreCompleto(this.estado.datosFormulario),
            cedulaFormateada: Validaciones.formatearCedula(this.estado.datosFormulario.numeroCedula)
        };
    },

    /**
     * Destruye la instancia del formulario
     */
    destroy() {
        // Remover event listeners
        if (this.config.form) {
            this.config.form.removeEventListener('submit', this.procesarFormulario);
        }

        // Limpiar referencias
        Object.keys(this.config).forEach(key => {
            this.config[key] = null;
        });

        this.config.isInitialized = false;
        console.log('FormularioCedula destruido');
    }
};

// Exportar el módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormularioCedula;
} else if (typeof window !== 'undefined') {
    window.FormularioCedula = FormularioCedula;
}
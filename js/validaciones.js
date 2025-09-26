/**
 * Sistema de Validaciones en Tiempo Real
 * Proporciona validación dinámica y feedback instantáneo para formularios
 */

class FormValidator {
    constructor() {
        this.rules = new Map();
        this.errorMessages = new Map();
        this.isValid = new Map();
        this.initialized = false;
        
        this.init();
    }

    /**
     * Inicializa el sistema de validaciones
     */
    init() {
        this.setupValidationRules();
        this.setupErrorMessages();
        this.setupResizeObserver();
        console.log('✅ Sistema de validaciones inicializado');
        this.initialized = true;
    }

    /**
     * Configura el observador de redimensionamiento para adaptabilidad
     */
    setupResizeObserver() {
        // Escuchar cambios de tamaño de ventana con throttling
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                console.log('🔄 Redimensionamiento detectado, reajustando contenedor...');
                this.ensureContainerAdaptability();
            }, 150);
        };
        
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 300); // Esperar que complete la rotación
        });

        // Usar ResizeObserver para detectar cambios en el contenido
        if (window.ResizeObserver) {
            const contentObserver = new ResizeObserver((entries) => {
                console.log('📏 Cambio de contenido detectado');
                this.ensureContainerAdaptability();
            });

            // Observar cambios en el formulario y contenedor
            const setupObserver = () => {
                const form = document.querySelector('.player-form');
                const container = document.querySelector('.welcome-container');
                
                if (form) {
                    contentObserver.observe(form);
                    console.log('👁️ ResizeObserver configurado para el formulario');
                }
                
                if (container) {
                    contentObserver.observe(container);
                    console.log('👁️ ResizeObserver configurado para el contenedor');
                }
            };
            
            // Configurar con delay para asegurar que los elementos estén disponibles
            setTimeout(setupObserver, 500);
        }
    }

    /**
     * Define las reglas de validación para cada campo
     */
    setupValidationRules() {
        // Validaciones para nombre del jugador
        this.rules.set('playerName', [
            {
                name: 'required',
                test: (value) => value && value.trim().length > 0,
                message: 'El nombre es obligatorio'
            },
            {
                name: 'minLength',
                test: (value) => value && value.trim().length >= 2,
                message: 'El nombre debe tener al menos 2 caracteres'
            },
            {
                name: 'maxLength',
                test: (value) => value && value.trim().length <= 30,
                message: 'El nombre no puede exceder 30 caracteres'
            },
            {
                name: 'validCharacters',
                test: (value) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value || ''),
                message: 'Solo se permiten letras y espacios'
            },
            {
                name: 'noConsecutiveSpaces',
                test: (value) => !/\s{2,}/.test(value || ''),
                message: 'No se permiten espacios consecutivos'
            }
        ]);

        // Validaciones para email
        this.rules.set('playerEmail', [
            {
                name: 'required',
                test: (value) => value && value.trim().length > 0,
                message: 'El correo electrónico es obligatorio'
            },
            {
                name: 'emailFormat',
                test: (value) => {
                    if (!value || value.trim().length === 0) return false;
                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    const trimmedValue = value.trim().toLowerCase();
                    return emailRegex.test(trimmedValue) && !trimmedValue.includes('..');
                },
                message: 'Ingresa un correo electrónico válido'
            },
            {
                name: 'maxLength',
                test: (value) => value && value.length <= 320,
                message: 'El correo es demasiado largo'
            },
            {
                name: 'noSpaces',
                test: (value) => !/\s/.test(value || ''),
                message: 'El correo no puede contener espacios'
            }
        ]);

        // Validaciones para teléfono
        this.rules.set('playerPhone', [
            {
                name: 'required',
                test: (value) => value && value.trim().length > 0,
                message: 'El número de teléfono es obligatorio'
            },
            {
                name: 'phoneFormat',
                test: (value) => {
                    if (!value) return false;
                    // Formato colombiano: celular (300-350) o fijo (área + 7 dígitos)
                    const cleanPhone = value.replace(/\D/g, '');
                    return /^(3[0-5][0-9]{8}|[1-8][0-9]{6,7})$/.test(cleanPhone);
                },
                message: 'Ingresa un número válido (celular 10 dígitos o fijo 7-8 dígitos)'
            },
            {
                name: 'minLength',
                test: (value) => {
                    const cleanPhone = (value || '').replace(/\D/g, '');
                    return cleanPhone.length >= 7;
                },
                message: 'El teléfono debe tener mínimo 7 dígitos'
            },
            {
                name: 'maxLength',
                test: (value) => {
                    const cleanPhone = (value || '').replace(/\D/g, '');
                    return cleanPhone.length <= 10;
                },
                message: 'El teléfono no puede exceder 10 dígitos'
            }
        ]);

        // Validaciones para nivel de experiencia
        this.rules.set('playerLevel', [
            {
                name: 'required',
                test: (value) => value && value.trim().length > 0,
                message: 'Debes seleccionar tu nivel de experiencia'
            },
            {
                name: 'validOption',
                test: (value) => ['beginner', 'intermediate', 'advanced'].includes(value),
                message: 'Selecciona una opción válida'
            }
        ]);
    }

    /**
     * Configura mensajes de error personalizados
     */
    setupErrorMessages() {
        this.errorMessages.set('playerName', {
            empty: '👤 ¿Cómo te llamas?',
            invalid: '❌ Nombre inválido',
            valid: '✅ ¡Perfecto!'
        });

        this.errorMessages.set('playerEmail', {
            empty: '📧 Necesitamos tu email',
            invalid: '❌ Email inválido',
            valid: '✅ Email correcto'
        });

        this.errorMessages.set('playerPhone', {
            empty: '📱 Ingresa tu teléfono',
            invalid: '❌ Teléfono inválido',
            valid: '✅ Teléfono correcto'
        });

        this.errorMessages.set('playerLevel', {
            empty: '🎓 Selecciona tu nivel',
            invalid: '❌ Opción inválida',
            valid: '✅ Nivel seleccionado'
        });
    }

    /**
     * Valida un campo específico
     * @param {string} fieldName - Nombre del campo a validar
     * @param {string} value - Valor del campo
     * @returns {Object} Resultado de la validación
     */
    validateField(fieldName, value) {
        const rules = this.rules.get(fieldName);
        if (!rules) {
            console.warn(`⚠️ No hay reglas definidas para ${fieldName}`);
            return { isValid: true, errors: [], message: '' };
        }

        const errors = [];
        let isValid = true;

        // Aplicar cada regla
        for (const rule of rules) {
            if (!rule.test(value)) {
                errors.push({
                    rule: rule.name,
                    message: rule.message
                });
                isValid = false;
                break; // Detener en el primer error para mejor UX
            }
        }

        // Determinar mensaje a mostrar
        let message = '';
        if (!value || value.trim() === '') {
            message = this.errorMessages.get(fieldName)?.empty || '';
        } else if (!isValid) {
            message = errors[0]?.message || this.errorMessages.get(fieldName)?.invalid || '';
        } else {
            message = this.errorMessages.get(fieldName)?.valid || '';
        }

        // Actualizar estado interno
        this.isValid.set(fieldName, isValid);

        return {
            isValid,
            errors,
            message,
            fieldName
        };
    }

    /**
     * Valida todos los campos del formulario
     * @param {FormData} formData - Datos del formulario
     * @returns {Object} Resultado de la validación completa
     */
    validateForm(formData) {
        const results = new Map();
        let overallValid = true;
        const allErrors = [];

        // Validar cada campo
        for (const [fieldName] of this.rules) {
            const value = formData.get(fieldName) || '';
            const result = this.validateField(fieldName, value);
            results.set(fieldName, result);
            
            if (!result.isValid) {
                overallValid = false;
                allErrors.push(...result.errors);
            }
        }

        return {
            isValid: overallValid,
            results,
            errors: allErrors,
            fieldCount: this.rules.size,
            validFieldCount: Array.from(results.values()).filter(r => r.isValid).length
        };
    }

    /**
     * Obtiene el estado de validación de un campo
     * @param {string} fieldName - Nombre del campo
     * @returns {boolean} True si el campo es válido
     */
    isFieldValid(fieldName) {
        return this.isValid.get(fieldName) || false;
    }

    /**
     * Obtiene el estado general del formulario
     * @returns {boolean} True si todos los campos son válidos
     */
    isFormValid() {
        return Array.from(this.isValid.values()).every(valid => valid === true);
    }

    /**
     * Sanitiza un valor de entrada
     * @param {string} value - Valor a sanitizar
     * @param {string} type - Tipo de sanitización
     * @returns {string} Valor sanitizado
     */
    sanitizeValue(value, type = 'text') {
        if (!value) return '';

        switch (type) {
            case 'name':
                return value.trim()
                    .replace(/\s+/g, ' ') // Espacios múltiples a uno solo
                    .replace(/[^\w\sáéíóúÁÉÍÓÚñÑüÜ]/g, '') // Solo letras, números y espacios
                    .substring(0, 30); // Limitar longitud
            
            case 'email':
                return value.trim()
                    .toLowerCase()
                    .substring(0, 320); // Límite RFC5322
            
            case 'phone':
                return value.trim()
                    .replace(/\D/g, '') // Solo números
                    .substring(0, 10); // Máximo 10 dígitos
            
            case 'select':
                return value.trim();
            
            default:
                return value.trim();
        }
    }

    /**
     * Muestra feedback visual para un campo de forma amigable
     * @param {HTMLElement} field - Elemento del campo
     * @param {Object} validation - Resultado de validación
     */
    showFieldFeedback(field, validation) {
        if (!field) return;

        const fieldContainer = field.closest('.form-group');
        if (!fieldContainer) return;

        // Remover feedback anterior
        this.clearFieldFeedback(fieldContainer);

        // Crear o encontrar el indicador visual del campo
        let indicator = fieldContainer.querySelector('.field-indicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'field-indicator';
            
            // Buscar el contenedor del input o crear uno
            let inputContainer = fieldContainer.querySelector('.input-container');
            if (!inputContainer) {
                inputContainer = document.createElement('div');
                inputContainer.className = 'input-container';
                const input = fieldContainer.querySelector('input, select');
                if (input && input.parentNode === fieldContainer) {
                    fieldContainer.insertBefore(inputContainer, input);
                    inputContainer.appendChild(input);
                }
            }
            
            if (inputContainer) {
                inputContainer.appendChild(indicator);
            }
        }

        // Agregar clases CSS según el estado
        fieldContainer.classList.remove('field-valid', 'field-invalid', 'field-empty', 'has-feedback');
        
        if (!validation.message) {
            fieldContainer.classList.add('field-empty');
        } else if (validation.isValid) {
            fieldContainer.classList.add('field-valid', 'has-feedback');
            // Sonido de validación exitosa
            if (window.GameAudio) {
                window.GameAudio.playSound('validation-success', { volume: 0.6 });
            }
        } else {
            fieldContainer.classList.add('field-invalid', 'has-feedback');
            // Sonido de error de validación
            if (window.GameAudio) {
                window.GameAudio.playSound('validation-error', { volume: 0.4 });
            }
        }

        // Asegurar que el contenedor principal se adapte al contenido
        this.ensureContainerAdaptability();

        // Crear elemento de feedback amigable
        if (validation.message) {
            const feedback = document.createElement('div');
            feedback.className = 'field-feedback';
            
            // Crear mensaje más amigable y útil
            const friendlyMessage = this.createFriendlyMessage(field.name || field.id, validation);
            feedback.innerHTML = friendlyMessage;
            
            feedback.setAttribute('role', 'status');
            feedback.setAttribute('aria-live', 'polite');
            
            fieldContainer.appendChild(feedback);

            // Animación de entrada suave
            requestAnimationFrame(() => {
                feedback.style.opacity = '1';
                feedback.style.transform = 'translateY(0)';
            });
        }
    }

    /**
     * Crea mensajes de feedback más amigables y útiles
     * @param {string} fieldName - Nombre del campo
     * @param {Object} validation - Resultado de validación
     * @returns {string} Mensaje amigable en HTML
     */
    createFriendlyMessage(fieldName, validation) {
        if (validation.isValid) {
            const successMessages = {
                'playerName': '¡Perfecto! Tu nombre se ve genial.',
                'playerEmail': '¡Excelente! Tu email es válido.',
                'playerPhone': '¡Genial! Tu teléfono está correcto.',
                'playerExperience': '¡Listo! Nivel de experiencia seleccionado.'
            };
            return successMessages[fieldName] || '¡Muy bien! Campo completado correctamente.';
        }

        // Mensajes de error más amigables y constructivos
        const friendlyMessages = {
            'El nombre es obligatorio': 'Cuéntanos cómo te llamas para personalizar tu experiencia.',
            'El nombre debe tener al menos 2 caracteres': 'Tu nombre parece muy corto. ¿Podrías escribirlo completo?',
            'El nombre no puede exceder 30 caracteres': 'Tu nombre es un poco largo. Prueba con una versión más corta.',
            'Solo se permiten letras y espacios': 'Solo necesitamos letras en tu nombre, sin números ni símbolos especiales.',
            'No se permiten espacios consecutivos': 'Revisa que no haya espacios dobles en tu nombre.',
            
            'El correo electrónico es obligatorio': 'Necesitamos tu email para guardar tu progreso y logros.',
            'Ingresa un correo electrónico válido': 'Verifica que tu email tenga el formato correcto (ejemplo@correo.com).',
            'El correo es demasiado largo': 'Tu email parece muy largo. ¿Podrías verificarlo?',
            'El correo no puede contener espacios': 'Tu email no debe tener espacios. Revísalo por favor.',
            
            'El número de teléfono es obligatorio': 'Tu teléfono nos ayuda a enviarte notificaciones importantes.',
            'Ingresa un número de teléfono válido': 'Verifica que tu teléfono tenga 10 dígitos (celular) o 7-8 dígitos (fijo).',
            'Solo se permiten números': 'Tu teléfono solo debe contener números, sin espacios ni guiones.',
            
            'Selecciona tu nivel de experiencia': 'Escoge tu nivel para ajustar la dificultad del juego.'
        };

        return friendlyMessages[validation.message] || validation.message;
    }

    /**
     * Limpia el feedback visual de un campo
     * @param {HTMLElement} fieldContainer - Contenedor del campo
     */
    clearFieldFeedback(fieldContainer) {
        const existingFeedback = fieldContainer.querySelector('.field-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }
        
        // Remover clases de feedback para permitir reajuste del contenedor
        fieldContainer.classList.remove('has-feedback');
        
        // Reajustar contenedor después de limpiar feedback
        setTimeout(() => this.ensureContainerAdaptability(), 50);
    }

    /**
     * Asegura que el contenedor se adapte dinámicamente al contenido
     */
    ensureContainerAdaptability() {
        const container = document.querySelector('.welcome-container');
        const form = document.querySelector('.player-form');
        const screen = document.querySelector('.welcome-screen');
        
        if (!container || !form || !screen) return;

        // Aplicar clases de adaptabilidad base
        container.classList.add('form-expanded', 'container-adaptive');
        
        // Verificar si hay feedback activo
        const feedbackElements = form.querySelectorAll('.field-feedback');
        const hasValidationFeedback = feedbackElements.length > 0;
        
        if (hasValidationFeedback) {
            container.classList.add('has-validation-feedback');
        } else {
            container.classList.remove('has-validation-feedback');
        }
        
        // Determinar si necesita scroll o puede adaptarse naturalmente
        requestAnimationFrame(() => {
            // Resetear clases de modo
            container.classList.remove('force-scroll', 'no-scroll');
            
            // Medir contenido real sin restricciones
            const tempStyle = container.style.cssText;
            container.style.height = 'auto';
            container.style.maxHeight = 'none';
            container.style.overflow = 'visible';
            
            const contentHeight = container.scrollHeight;
            const viewportHeight = window.innerHeight;
            const maxAllowedHeight = viewportHeight - 40; // margen de seguridad
            
            // Restaurar estilo original
            container.style.cssText = tempStyle;
            
            // Decidir modo de visualización
            if (contentHeight <= maxAllowedHeight) {
                // Contenido cabe -> modo sin scroll
                container.classList.add('no-scroll');
                container.style.height = 'auto';
                container.style.maxHeight = 'none';
                container.style.overflowY = 'visible';
                console.log(`📏 Modo SIN SCROLL: contenido=${contentHeight}px cabe en viewport`);
            } else {
                // Contenido no cabe -> modo con scroll
                container.classList.add('force-scroll');
                container.style.height = maxAllowedHeight + 'px';
                container.style.maxHeight = maxAllowedHeight + 'px';
                container.style.overflowY = 'auto';
                console.log(`📏 Modo CON SCROLL: contenido=${contentHeight}px > máximo=${maxAllowedHeight}px`);
            }
        });
    }

    /**
     * Obtiene estadísticas de validación
     * @returns {Object} Estadísticas del validador
     */
    getStats() {
        const totalFields = this.rules.size;
        const validFields = Array.from(this.isValid.values()).filter(Boolean).length;
        
        return {
            totalFields,
            validFields,
            invalidFields: totalFields - validFields,
            completionPercentage: totalFields > 0 ? Math.round((validFields / totalFields) * 100) : 0,
            isComplete: validFields === totalFields && totalFields > 0
        };
    }
}

// Exportar para uso global
window.FormValidator = FormValidator;

// Función utilitaria para inicialización de adaptabilidad
window.initContainerAdaptability = function() {
    console.log('🔧 Inicializando adaptabilidad del contenedor...');
    
    // Función para configurar el contenedor
    const setupContainer = () => {
        const container = document.querySelector('.welcome-container');
        const screen = document.querySelector('.welcome-screen');
        
        if (container && screen) {
            // Configurar propiedades iniciales
            container.classList.add('container-adaptive');
            
            // Asegurar que el contenedor pueda crecer
            container.style.minHeight = 'auto';
            container.style.height = 'auto';
            container.style.maxHeight = 'calc(100vh - 20px)';
            
            // Configurar el screen padre para centrado inteligente
            screen.style.alignItems = 'center';
            screen.style.justifyContent = 'center';
            
            console.log('✅ Contenedor configurado correctamente');
            
            // Configurar observador para cambios dinámicos
            if (window.MutationObserver) {
                const observer = new MutationObserver((mutations) => {
                    let shouldUpdate = false;
                    
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'childList' || 
                            (mutation.type === 'attributes' && 
                             ['class', 'style'].includes(mutation.attributeName))) {
                            shouldUpdate = true;
                        }
                    });
                    
                    if (shouldUpdate) {
                        setTimeout(() => {
                            const validator = window.formValidator;
                            if (validator && validator.ensureContainerAdaptability) {
                                validator.ensureContainerAdaptability();
                            }
                        }, 100);
                    }
                });
                
                const form = document.querySelector('.player-form');
                if (form) {
                    observer.observe(form, {
                        childList: true,
                        subtree: true,
                        attributes: true,
                        attributeFilter: ['class', 'style']
                    });
                    console.log('👁️ Observador de mutaciones activado');
                }
            }
        } else {
            // Si los elementos no están listos, intentar de nuevo
            setTimeout(setupContainer, 100);
        }
    };
    
    // Ejecutar configuración
    setupContainer();
};

console.log('📋 Sistema de validaciones cargado');
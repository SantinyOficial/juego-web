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
        console.log('✅ Sistema de validaciones inicializado');
        this.initialized = true;
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
                    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                    return emailRegex.test(value || '');
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
            
            case 'select':
                return value.trim();
            
            default:
                return value.trim();
        }
    }

    /**
     * Muestra feedback visual para un campo
     * @param {HTMLElement} field - Elemento del campo
     * @param {Object} validation - Resultado de validación
     */
    showFieldFeedback(field, validation) {
        if (!field) return;

        const fieldContainer = field.closest('.form-group');
        if (!fieldContainer) return;

        // Remover feedback anterior
        this.clearFieldFeedback(fieldContainer);

        // Agregar clases CSS según el estado
        fieldContainer.classList.remove('field-valid', 'field-invalid', 'field-empty');
        
        if (!validation.message) {
            fieldContainer.classList.add('field-empty');
        } else if (validation.isValid) {
            fieldContainer.classList.add('field-valid');
        } else {
            fieldContainer.classList.add('field-invalid');
        }

        // Crear elemento de feedback
        if (validation.message) {
            const feedback = document.createElement('div');
            feedback.className = 'field-feedback';
            feedback.textContent = validation.message;
            feedback.setAttribute('role', 'status');
            feedback.setAttribute('aria-live', 'polite');
            
            fieldContainer.appendChild(feedback);

            // Animación de entrada
            requestAnimationFrame(() => {
                feedback.style.opacity = '1';
                feedback.style.transform = 'translateY(0)';
            });
        }
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

console.log('📋 Sistema de validaciones cargado');
/**
 * Módulo de Validaciones
 * Contiene todas las funciones de validación para el formulario de cédula
 */

const Validaciones = {
    /**
     * Reglas de validación para cada campo
     */
    reglas: {
        numeroCedula: {
            required: true,
            pattern: /^[0-9]{7,10}$/,
            mensaje: 'El número de cédula debe tener entre 7 y 10 dígitos'
        },
        primerNombre: {
            required: true,
            pattern: /^[A-Za-zÀ-ÿ\s]{2,50}$/,
            mensaje: 'El primer nombre debe tener entre 2 y 50 caracteres, solo letras'
        },
        segundoNombre: {
            required: false,
            pattern: /^[A-Za-zÀ-ÿ\s]{2,50}$/,
            mensaje: 'El segundo nombre debe tener entre 2 y 50 caracteres, solo letras'
        },
        primerApellido: {
            required: true,
            pattern: /^[A-Za-zÀ-ÿ\s]{2,50}$/,
            mensaje: 'El primer apellido debe tener entre 2 y 50 caracteres, solo letras'
        },
        segundoApellido: {
            required: false,
            pattern: /^[A-Za-zÀ-ÿ\s]{2,50}$/,
            mensaje: 'El segundo apellido debe tener entre 2 y 50 caracteres, solo letras'
        },
        fechaNacimiento: {
            required: true,
            custom: 'validarFechaNacimiento',
            mensaje: 'La fecha de nacimiento no puede ser futura y debe ser mayor de 18 años'
        },
        genero: {
            required: true,
            mensaje: 'Debe seleccionar un género'
        },
        lugarExpedicion: {
            required: true,
            mensaje: 'Debe seleccionar el lugar de expedición'
        },
        otroLugar: {
            required: false,
            pattern: /^[A-Za-zÀ-ÿ\s]{2,50}$/,
            mensaje: 'El lugar debe tener entre 2 y 50 caracteres, solo letras'
        },
        direccion: {
            required: true,
            minLength: 10,
            maxLength: 100,
            mensaje: 'La dirección debe tener entre 10 y 100 caracteres'
        },
        telefono: {
            required: true,
            pattern: /^[0-9]{7,10}$/,
            mensaje: 'El teléfono debe tener entre 7 y 10 dígitos'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            mensaje: 'Debe ingresar un correo electrónico válido'
        }
    },

    /**
     * Valida un campo individual
     * @param {string} nombreCampo - Nombre del campo a validar
     * @param {string} valor - Valor del campo
     * @returns {Object} - Resultado de la validación
     */
    validarCampo(nombreCampo, valor) {
        const regla = this.reglas[nombreCampo];
        
        if (!regla) {
            return { valido: true, mensaje: '' };
        }

        // Validar campo requerido
        if (regla.required && (!valor || valor.trim() === '')) {
            return { 
                valido: false, 
                mensaje: 'Este campo es obligatorio' 
            };
        }

        // Si el campo no es requerido y está vacío, es válido
        if (!regla.required && (!valor || valor.trim() === '')) {
            return { valido: true, mensaje: '' };
        }

        // Validar patrón
        if (regla.pattern && !regla.pattern.test(valor.trim())) {
            return { 
                valido: false, 
                mensaje: regla.mensaje 
            };
        }

        // Validar longitud mínima
        if (regla.minLength && valor.trim().length < regla.minLength) {
            return { 
                valido: false, 
                mensaje: `Debe tener al menos ${regla.minLength} caracteres` 
            };
        }

        // Validar longitud máxima
        if (regla.maxLength && valor.trim().length > regla.maxLength) {
            return { 
                valido: false, 
                mensaje: `No debe exceder ${regla.maxLength} caracteres` 
            };
        }

        // Validaciones customizadas
        if (regla.custom && typeof this[regla.custom] === 'function') {
            return this[regla.custom](valor);
        }

        return { valido: true, mensaje: '' };
    },

    /**
     * Validación específica para la fecha de nacimiento
     * @param {string} fecha - Fecha en formato YYYY-MM-DD
     * @returns {Object} - Resultado de la validación
     */
    validarFechaNacimiento(fecha) {
        if (!fecha) {
            return { valido: false, mensaje: 'La fecha de nacimiento es obligatoria' };
        }

        const fechaNacimiento = new Date(fecha);
        const fechaActual = new Date();
        const fechaMinima = new Date('1900-01-01');

        // Verificar que la fecha no sea futura
        if (fechaNacimiento > fechaActual) {
            return { 
                valido: false, 
                mensaje: 'La fecha de nacimiento no puede ser futura' 
            };
        }

        // Verificar que la fecha no sea muy antigua
        if (fechaNacimiento < fechaMinima) {
            return { 
                valido: false, 
                mensaje: 'La fecha de nacimiento no puede ser anterior a 1900' 
            };
        }

        // Calcular edad
        const edad = this.calcularEdad(fechaNacimiento);
        
        if (edad < 18) {
            return { 
                valido: false, 
                mensaje: 'Debe ser mayor de 18 años' 
            };
        }

        if (edad > 120) {
            return { 
                valido: false, 
                mensaje: 'La edad no puede ser mayor a 120 años' 
            };
        }

        return { valido: true, mensaje: '' };
    },

    /**
     * Calcula la edad basada en la fecha de nacimiento
     * @param {Date} fechaNacimiento - Fecha de nacimiento
     * @returns {number} - Edad en años
     */
    calcularEdad(fechaNacimiento) {
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        const mesActual = hoy.getMonth();
        const mesNacimiento = fechaNacimiento.getMonth();

        if (mesActual < mesNacimiento || 
            (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())) {
            edad--;
        }

        return edad;
    },

    /**
     * Validación específica para número de cédula colombiana
     * @param {string} cedula - Número de cédula
     * @returns {Object} - Resultado de la validación
     */
    validarCedulaColombiana(cedula) {
        if (!cedula || cedula.trim() === '') {
            return { valido: false, mensaje: 'El número de cédula es obligatorio' };
        }

        // Limpiar la cédula de espacios y caracteres especiales
        const cedulaLimpia = cedula.replace(/\D/g, '');

        // Verificar longitud
        if (cedulaLimpia.length < 7 || cedulaLimpia.length > 10) {
            return { 
                valido: false, 
                mensaje: 'El número de cédula debe tener entre 7 y 10 dígitos' 
            };
        }

        // Verificar que no sean todos números iguales
        if (/^(\d)\1+$/.test(cedulaLimpia)) {
            return { 
                valido: false, 
                mensaje: 'El número de cédula no puede tener todos los dígitos iguales' 
            };
        }

        // Verificar que no empiece con 0 (excepto si tiene más de 8 dígitos)
        if (cedulaLimpia.length <= 8 && cedulaLimpia.startsWith('0')) {
            return { 
                valido: false, 
                mensaje: 'El número de cédula no puede empezar con 0' 
            };
        }

        return { valido: true, mensaje: '' };
    },

    /**
     * Valida todo el formulario
     * @param {FormData} formData - Datos del formulario
     * @returns {Object} - Resultado de la validación completa
     */
    validarFormularioCompleto(formData) {
        const errores = {};
        let formularioValido = true;

        // Validar cada campo
        for (const [nombreCampo, valor] of formData.entries()) {
            // Validación especial para cédula
            if (nombreCampo === 'numeroCedula') {
                const resultado = this.validarCedulaColombiana(valor);
                if (!resultado.valido) {
                    errores[nombreCampo] = resultado.mensaje;
                    formularioValido = false;
                }
                continue;
            }

            // Validación especial para lugar de expedición
            if (nombreCampo === 'lugarExpedicion' && valor === 'otro') {
                const otroLugar = formData.get('otroLugar');
                if (!otroLugar || otroLugar.trim() === '') {
                    errores.otroLugar = 'Debe especificar el lugar de expedición';
                    formularioValido = false;
                }
            }

            // Validaciones normales
            const resultado = this.validarCampo(nombreCampo, valor);
            if (!resultado.valido) {
                errores[nombreCampo] = resultado.mensaje;
                formularioValido = false;
            }
        }

        // Validaciones adicionales de coherencia
        const validacionesCoherencia = this.validarCoherenciaDatos(formData);
        if (!validacionesCoherencia.valido) {
            Object.assign(errores, validacionesCoherencia.errores);
            formularioValido = false;
        }

        return {
            valido: formularioValido,
            errores: errores
        };
    },

    /**
     * Valida la coherencia entre diferentes campos
     * @param {FormData} formData - Datos del formulario
     * @returns {Object} - Resultado de la validación de coherencia
     */
    validarCoherenciaDatos(formData) {
        const errores = {};
        let valido = true;

        // Validar que primer nombre y apellido no sean iguales
        const primerNombre = formData.get('primerNombre');
        const primerApellido = formData.get('primerApellido');
        
        if (primerNombre && primerApellido && 
            primerNombre.toLowerCase().trim() === primerApellido.toLowerCase().trim()) {
            errores.primerApellido = 'El primer apellido no puede ser igual al primer nombre';
            valido = false;
        }

        // Validar que el email tenga un formato coherente con el nombre
        const email = formData.get('email');
        if (email && primerNombre && primerApellido) {
            const dominiosComunes = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com'];
            const emailDominio = email.split('@')[1];
            
            if (emailDominio && !dominiosComunes.includes(emailDominio.toLowerCase())) {
                // Solo advertencia, no error
                console.log('Dominio de correo no común detectado:', emailDominio);
            }
        }

        return { valido, errores };
    },

    /**
     * Formatea el número de cédula para mostrar
     * @param {string} cedula - Número de cédula
     * @returns {string} - Cédula formateada
     */
    formatearCedula(cedula) {
        if (!cedula) return '';
        
        const cedulaLimpia = cedula.replace(/\D/g, '');
        
        // Formatear con puntos cada 3 dígitos desde la derecha
        return cedulaLimpia.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    /**
     * Limpia el formato de la cédula para envío
     * @param {string} cedula - Cédula formateada
     * @returns {string} - Cédula sin formato
     */
    limpiarFormatoCedula(cedula) {
        return cedula ? cedula.replace(/\D/g, '') : '';
    },

    /**
     * Valida un correo electrónico
     * @param {string} email - Correo electrónico
     * @returns {Object} - Resultado de la validación
     */
    validarEmail(email) {
        if (!email || email.trim() === '') {
            return { valido: false, mensaje: 'El correo electrónico es obligatorio' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email.trim())) {
            return { valido: false, mensaje: 'El formato del correo electrónico no es válido' };
        }

        // Validaciones adicionales
        const partes = email.split('@');
        if (partes[0].length > 64) {
            return { valido: false, mensaje: 'La parte local del correo es muy larga' };
        }

        if (partes[1].length > 255) {
            return { valido: false, mensaje: 'El dominio del correo es muy largo' };
        }

        return { valido: true, mensaje: '' };
    },

    /**
     * Valida un número de teléfono colombiano
     * @param {string} telefono - Número de teléfono
     * @returns {Object} - Resultado de la validación
     */
    validarTelefonoColombiano(telefono) {
        if (!telefono || telefono.trim() === '') {
            return { valido: false, mensaje: 'El número de teléfono es obligatorio' };
        }

        const telefonoLimpio = telefono.replace(/\D/g, '');

        // Verificar longitud
        if (telefonoLimpio.length < 7 || telefonoLimpio.length > 10) {
            return { 
                valido: false, 
                mensaje: 'El teléfono debe tener entre 7 y 10 dígitos' 
            };
        }

        // Verificar patrones válidos para Colombia
        if (telefonoLimpio.length === 10) {
            // Celular: debe empezar con 3
            if (!telefonoLimpio.startsWith('3')) {
                return { 
                    valido: false, 
                    mensaje: 'El número celular debe empezar con 3' 
                };
            }
        } else if (telefonoLimpio.length === 7) {
            // Fijo: no debe empezar con 0, 1, 2 o 3
            if (['0', '1', '2', '3'].includes(telefonoLimpio[0])) {
                return { 
                    valido: false, 
                    mensaje: 'El número fijo no puede empezar con 0, 1, 2 o 3' 
                };
            }
        }

        return { valido: true, mensaje: '' };
    }
};

// Exportar el módulo (compatible con diferentes entornos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Validaciones;
} else if (typeof window !== 'undefined') {
    window.Validaciones = Validaciones;
}
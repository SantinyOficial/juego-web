/**
 * Juego de Arrastrar y Soltar - HTML Semántico
 * Enseña la estructura semántica de HTML mediante interacción
 */

class HTMLSemanticGame {
    constructor() {
        this.pieces = [];
        this.dropZones = [];
        this.gameStats = {
            correctPlacements: 0,
            totalAttempts: 0
        };
        this.player = {
            name: '',
            email: '',
            phone: '',
            level: '',
            score: 0,
            streak: 0,
            currentLevel: 1,
            experience: 0,
            maxExperience: 100,
            achievements: []
        };
        
        // Sistema de juegos progresivos
        this.currentGame = 'html'; // html, css, js
        this.gamePhase = 'phase-1'; // Empezamos en formulario
        this.gamePhases = {
            'phase-1': { name: 'FORMULARIO', colors: 'Azul Galáctico Suave + Verde Agua Espacial', elements: [] },
            'phase-2': { name: 'HTML', colors: 'Naranja Nebular + Dorado Polvo Estelar', elements: ['header', 'nav', 'main', 'article', 'aside', 'footer'] },
            'phase-3': { name: 'CSS', colors: 'Púrpura Nebula + Violeta Galáctico', elements: ['header-style', 'nav-style', 'main-style'] },
            'phase-4': { name: 'JAVASCRIPT', colors: 'Rojo Marte + Blanco Lunar', elements: ['button-event', 'form-event', 'input-event'] }
        };
        
        // Configuración de juegos
        this.gameConfigs = {
            html: {
                headerTitle: '🎯 Aprende HTML Semántico',
                headerDescription: 'Arrastra las etiquetas HTML a las zonas correctas para construir una página web completa.',
                title: '🧩 Piezas HTML',
                description: 'Despliega cada componente en la consola principal para desbloquear el hiperimpulso.',
                pieces: ['header', 'nav', 'main', 'article', 'aside', 'footer'],
                completionMessage: '¡Estructura HTML completada! Pasando al juego de CSS...'
            },
            css: {
                headerTitle: '🎨 Domina los Estilos CSS',
                headerDescription: 'Activa tu laboratorio de diseño y aplica la combinación perfecta de propiedades para cada desafío.',
                title: '🎨 Propiedades CSS',
                description: 'Sin piezas físicas: utiliza la consola táctica para aplicar los estilos exactos en cada módulo.',
                pieces: ['background-color', 'color', 'padding', 'display', 'justify-content', 'gap', 'max-width', 'margin'],
                completionMessage: '¡Estilos CSS aplicados! Pasando al juego de JavaScript...'
            },
            js: {
                headerTitle: '⚡ Programa la Lógica JavaScript',
                headerDescription: 'Completa los fragmentos de código para reactivar los sistemas críticos de la nave.',
                title: '⚡ Funciones JavaScript',
                description: 'Ingresa el comando correcto en cada terminal para mantener viva la inteligencia de la nave.',
                pieces: ['showAlert', 'validateForm', 'updateValue', 'toggleMenu'],
                completionMessage: '¡Lógica JavaScript completada! ¡Eres un desarrollador web completo!'
            }
        };
        
        this.completedPhases = [];
        this.completedGames = [];
        this.isGameStarted = false;
        this.validator = null;
        this.init();
    }

    /**
     * Inicializa el juego
     */
    init() {
        this.setupIntroAnimation();
        console.log('🎮 Juego HTML Semántico iniciado');
    }

    /**
     * Configura la animación de introducción
     */
    setupIntroAnimation() {
        const text = "Bienvenido al juego de desarrollo web, aprenderás HTML, CSS y JS mientras te diviertes.";
        const typewriterElement = document.getElementById('typewriter-text');
        const cursorElement = document.getElementById('cursor');
        const startBtn = document.getElementById('start-adventure-btn');
        
        // Validar que los elementos existan
        if (!typewriterElement) {
            console.error('❌ Elemento typewriter-text no encontrado');
            return;
        }
        if (!startBtn) {
            console.error('❌ Elemento start-adventure-btn no encontrado');
            return;
        }
        
        // Mostrar mensaje de "Click para comenzar" y el cursor parpadeante
        typewriterElement.textContent = "Haz clic en cualquier parte para comenzar la aventura...";
        typewriterElement.classList.add('click-to-start');
        
        let animationStarted = false;
        let charIndex = 0;
        const typeSpeed = 50; // Velocidad de escritura en ms
        
        console.log('✨ Esperando interacción del usuario para iniciar...');
        
        // Función de escritura con colores específicos
        const typeWriter = () => {
            if (charIndex < text.length) {
                const currentChar = text.charAt(charIndex);
                
                // Reproducir sonido de teclear si no es espacio (sin bloquear)
                if (currentChar !== ' ' && window.GameAudio) {
                    window.GameAudio.playSound('typewriter-key').catch(() => {});
                }
                
                // Agregar el carácter
                typewriterElement.textContent += currentChar;
                
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                console.log('✅ Animación typewriter completada');
                
                // Aplicar colores especiales solo al final
                this.applySpecialWordColors(typewriterElement);
                
                // Mostrar botón después de completar la escritura
                setTimeout(() => {
                    startBtn.classList.remove('hidden');
                    startBtn.classList.add('show');
                    // Reproducir sonido de completado
                    if (window.GameAudio) {
                        window.GameAudio.playSound('notification').catch(() => {});
                    }
                }, 500);
            }
        };
        
        // Función para iniciar la animación después del primer clic
        const startAnimation = async () => {
            if (animationStarted) return;
            animationStarted = true;
            
            console.log('🎮 Usuario interactuó - Iniciando animación y audio...');
            
            // Inicializar el sistema de audio con la interacción del usuario
            if (window.GameAudio && window.GameAudio.audioContext) {
                try {
                    await window.GameAudio.audioContext.resume();
                    console.log('🔊 Contexto de audio activado');
                } catch (error) {
                    console.log('⚠️ No se pudo activar el audio:', error);
                }
            }
            
            // Limpiar el texto y quitar la clase de "click to start"
            typewriterElement.textContent = '';
            typewriterElement.classList.remove('click-to-start');
            
            // Reproducir sonido de inicio
            if (window.GameAudio) {
                window.GameAudio.playSound('power-up').catch(() => {});
            }
            
            // Iniciar la animación después de un breve delay
            setTimeout(typeWriter, 300);
            
            // Remover event listeners
            document.removeEventListener('click', startAnimation);
            document.removeEventListener('keydown', startAnimation);
            typewriterElement.style.cursor = 'default';
        };
        
        // Event listeners para detectar la primera interacción
        document.addEventListener('click', startAnimation);
        document.addEventListener('keydown', startAnimation);
        
        // Cambiar cursor para indicar que es clickeable
        typewriterElement.style.cursor = 'pointer';
        
        // Event listener para el botón de empezar
        startBtn.addEventListener('click', () => {
            if (window.GameAudio) {
                window.GameAudio.playSound('click');
            }
            this.transitionToWelcomeScreen();
        });
        
        console.log('✨ Animación de introducción configurada - Esperando clic del usuario');
    }

    /**
     * Aplica colores especiales a las palabras HTML, CSS y JS
     */
    applySpecialWordColors(element) {
        let html = element.innerHTML;
        
        // Reemplazar palabras clave con spans coloreados
        html = html.replace(/\bHTML\b/g, '<span class="html-word">HTML</span>');
        html = html.replace(/\bCSS\b/g, '<span class="css-word">CSS</span>');
        html = html.replace(/\bJS\b/g, '<span class="js-word">JS</span>');
        
        element.innerHTML = html;
    }

    /**
     * Transición a la pantalla de bienvenida
     */
    transitionToWelcomeScreen() {
        const introAnimation = document.getElementById('intro-animation');
        const welcomeScreen = document.getElementById('welcome-screen');
        
        // Fade out de la animación inicial
        introAnimation.classList.add('fade-out');
        
        setTimeout(() => {
            introAnimation.style.display = 'none';
            welcomeScreen.classList.remove('hidden');
            this.setupWelcomeScreen();
        }, 1000);
    }

    /**
     * Configura la pantalla de bienvenida
     */
    setupWelcomeScreen() {
        // Inicializar validador
        this.validator = new FormValidator();
        
        const playerForm = document.getElementById('player-form');
        const formIntro = document.getElementById('form-intro');

        // Configurar validación en tiempo real
        this.setupRealTimeValidation();
        
        // Configurar sonidos de interfaz
        this.setupUIAudioEvents();

        // Configurar la desaparición del título cuando se empiece a llenar el formulario
        this.setupFormProgressTransition(formIntro);

        playerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePlayerRegistration(playerForm);
        });

        console.log('👋 Pantalla de bienvenida configurada');
    }

    /**
     * Configura la transición del título del formulario al indicador de progreso
     */
    setupFormProgressTransition(formIntro) {
        const inputs = document.querySelectorAll('#player-form input, #player-form select');
        const progressContainer = document.querySelector('.form-progress');
        let hasStartedFilling = false;

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (!hasStartedFilling && input.value.trim() !== '') {
                    hasStartedFilling = true;
                    // Fade out del título
                    formIntro.style.opacity = '0';
                    formIntro.style.transform = 'translateY(-10px)';
                    
                    setTimeout(() => {
                        formIntro.style.display = 'none';
                        // Mostrar indicador de progreso
                        progressContainer.style.display = 'block';
                        progressContainer.style.opacity = '0';
                        progressContainer.style.transform = 'translateY(10px)';
                        
                        setTimeout(() => {
                            progressContainer.style.opacity = '1';
                            progressContainer.style.transform = 'translateY(0)';
                        }, 50);
                    }, 300);
                }
            });
        });
    }

    /**
     * Configura la validación en tiempo real
     */
    setupRealTimeValidation() {
        const fields = ['playerName', 'playerEmail', 'playerPhone', 'playerLevel'];
        
        fields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            if (!field) return;

            // Validación al escribir (con debounce)
            let timeoutId;
            const validateWithDelay = () => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    this.validateFieldRealTime(fieldName, field.value);
                }, 300);
            };

            // Eventos de validación
            field.addEventListener('input', validateWithDelay);
            field.addEventListener('blur', () => {
                clearTimeout(timeoutId);
                this.validateFieldRealTime(fieldName, field.value);
            });
            field.addEventListener('change', () => {
                this.validateFieldRealTime(fieldName, field.value);
            });
            
            // Sonidos de interacción
            field.addEventListener('focus', () => {
                if (window.GameAudio) {
                    window.GameAudio.playSound('focus', { volume: 0.3 });
                }
            });
        });

        console.log('⚡ Validación en tiempo real configurada');
    }

    /**
     * Configura eventos de audio para la interfaz
     */
    setupUIAudioEvents() {
        // Sonidos para todos los botones
        const buttons = document.querySelectorAll('button, [role="button"]');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (window.GameAudio) {
                    window.GameAudio.playSound('click', { volume: 0.4 });
                }
            });
            
            button.addEventListener('mouseenter', () => {
                if (window.GameAudio) {
                    window.GameAudio.playSound('hover', { volume: 0.2 });
                }
            });
        });

        // Sonidos para elementos arrastrables
        const pieces = document.querySelectorAll('.piece');
        pieces.forEach(piece => {
            piece.addEventListener('mouseenter', () => {
                if (window.GameAudio && piece.draggable) {
                    window.GameAudio.playSound('hover', { volume: 0.2, pitch: 1.1 });
                }
            });
        });

        console.log('🔊 Eventos de audio de interfaz configurados');
    }

    /**
     * Valida un campo en tiempo real
     */
    validateFieldRealTime(fieldName, value) {
        if (!this.validator) return;

        const field = document.getElementById(fieldName);
        const sanitizedValue = this.validator.sanitizeValue(value, this.getFieldType(fieldName));
        
        // Actualizar el valor sanitizado en el campo
        if (field.value !== sanitizedValue) {
            const cursorPosition = field.selectionStart;
            field.value = sanitizedValue;
            field.setSelectionRange(cursorPosition, cursorPosition);
        }

        // Obtener el estado anterior para evitar sonidos repetidos
        const previousState = field.dataset.validationState || 'none';
        
        const validation = this.validator.validateField(fieldName, sanitizedValue);
        this.validator.showFieldFeedback(field, validation);
        
        // Determinar el estado actual
        const currentState = validation.isValid ? 'valid' : (validation.errors.length > 0 ? 'invalid' : 'empty');
        
        // Sonidos de validación solo si el estado cambió
        if (window.GameAudio && previousState !== currentState) {
            if (validation.isValid && previousState !== 'valid') {
                window.GameAudio.playSound('validation_success', { volume: 0.3 });
            } else if (validation.errors.length > 0 && previousState !== 'invalid') {
                window.GameAudio.playSound('validation_error', { volume: 0.2 });
            }
        }
        
        // Guardar el estado actual
        field.dataset.validationState = currentState;
        
        // Actualizar progreso del formulario
        this.updateFormProgress();
        
        // Actualizar estado del botón de envío
        this.updateSubmitButton();
    }

    /**
     * Obtiene el tipo de campo para sanitización
     */
    getFieldType(fieldName) {
        const types = {
            'playerName': 'name',
            'playerEmail': 'email',
            'playerPhone': 'phone',
            'playerLevel': 'select'
        };
        return types[fieldName] || 'text';
    }

    /**
     * Actualiza el progreso del formulario con mensajes amigables
     */
    updateFormProgress() {
        if (!this.validator) return;

        const stats = this.validator.getStats();
        const progressFill = document.getElementById('form-progress-fill');
        const progressText = document.getElementById('form-progress-text');

        if (progressFill && progressText) {
            progressFill.style.width = `${stats.completionPercentage}%`;
            
            // Mensajes más amigables según el progreso
            let friendlyMessage = '';
            if (stats.completionPercentage === 0) {
                friendlyMessage = '🚀 ¡Empecemos! Completa tu información para comenzar la aventura';
            } else if (stats.completionPercentage === 25) {
                friendlyMessage = '✨ ¡Genial! Ya tienes 1 de 4 campos. Sigamos con los demás';
            } else if (stats.completionPercentage === 50) {
                friendlyMessage = '🌟 ¡Excelente! Ya vas por la mitad. Solo faltan 2 campos más';
            } else if (stats.completionPercentage === 75) {
                friendlyMessage = '🔥 ¡Casi listo! Solo falta un campo para empezar a jugar';
            } else if (stats.completionPercentage === 100) {
                friendlyMessage = '🎉 ¡Perfecto! Todo está listo para comenzar tu aventura';
            } else {
                friendlyMessage = `⚡ ${stats.completionPercentage}% completado - ${4 - stats.validFields} campos restantes`;
            }
            
            progressText.textContent = friendlyMessage;
            
            // Efectos visuales según el progreso
            const progressBar = progressFill.parentElement;
            progressBar.classList.remove('progress-complete', 'progress-partial');
            
            if (stats.isComplete) {
                progressBar.classList.add('progress-complete');
                // Reproducir sonido de éxito
                if (window.GameAudio) {
                    window.GameAudio.playSound('level-up', { volume: 0.5 });
                }
            } else if (stats.validFields > 0) {
                progressBar.classList.add('progress-partial');
            }
        }
    }

    /**
     * Actualiza el estado del botón de envío
     */
    updateSubmitButton() {
        const submitButton = document.querySelector('.start-game-btn');
        if (!submitButton || !this.validator) return;

        const isFormValid = this.validator.isFormValid();
        const stats = this.validator.getStats();
        
        submitButton.disabled = !isFormValid;
        submitButton.classList.toggle('btn-disabled', !isFormValid);
        
        // Actualizar texto del botón
        const buttonText = submitButton.querySelector('span');
        if (buttonText) {
            if (isFormValid) {
                buttonText.textContent = '🎮 ¡Comenzar Aventura!';
            } else {
                buttonText.textContent = `🎮 Completa el registro (${stats.validFields}/${stats.totalFields})`;
            }
        }
    }

    /**
     * Maneja el registro del jugador
     */
    handlePlayerRegistration(formElement) {
        const formData = new FormData(formElement);
        
        // Validar formulario completo
        if (!this.validator) {
            this.showNotification('❌ Error en el sistema de validación', 'error');
            return;
        }

        const validation = this.validator.validateForm(formData);
        
        if (!validation.isValid) {
            this.showNotification('❌ Por favor corrige los errores en el formulario', 'error');
            
            // Resaltar primer campo inválido
            const firstInvalidField = Array.from(validation.results.entries())
                .find(([_, result]) => !result.isValid);
            
            if (firstInvalidField) {
                const fieldElement = document.getElementById(firstInvalidField[0]);
                if (fieldElement) {
                    fieldElement.focus();
                    fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
            return;
        }

        // Sanitizar y asignar datos
        this.player.name = this.validator.sanitizeValue(formData.get('playerName'), 'name');
        this.player.email = this.validator.sanitizeValue(formData.get('playerEmail'), 'email');
        this.player.phone = this.validator.sanitizeValue(formData.get('playerPhone'), 'phone');
        this.player.level = this.validator.sanitizeValue(formData.get('playerLevel'), 'select');

        // Guardar en localStorage para persistencia
        this.savePlayerData();

        // Sonido de formulario completado
        if (window.GameAudio) {
            window.GameAudio.playSound('form-complete', { volume: 0.8 });
        }

        this.startGameTransition();
    }

    /**
     * Guarda los datos del jugador en localStorage
     */
    savePlayerData() {
        try {
            const playerData = {
                name: this.player.name,
                email: this.player.email,
                phone: this.player.phone,
                level: this.player.level,
                registrationDate: new Date().toISOString()
            };
            localStorage.setItem('htmlGamePlayer', JSON.stringify(playerData));
            console.log('💾 Datos del jugador guardados');
        } catch (error) {
            console.warn('⚠️ No se pudieron guardar los datos:', error);
        }
    }

    /**
     * Inicia la transición del registro al juego
     */
    startGameTransition() {
        const welcomeScreen = document.getElementById('welcome-screen');
        const gameContainer = document.getElementById('game-container');

        // Mostrar notificación de bienvenida
        this.showNotification(`¡Bienvenido, ${this.player.name}! 🎉`, 'success');

        // Animación de salida de la pantalla de bienvenida
        welcomeScreen.classList.add('fade-out');

        setTimeout(() => {
            welcomeScreen.style.display = 'none';
            gameContainer.classList.remove('hidden');
            gameContainer.classList.add('show');
            
            // Inicializar el juego
            this.initializeGame();
        }, 800);

        console.log('🚀 Iniciando transición al juego');
    }

    /**
     * Inicializa el juego después del registro
     */
    initializeGame() {
        this.currentGame = 'html';
        this.setupElements();
        this.setupEventListeners();
        this.updatePlayerDisplay();
        this.updateStats();
        this.updateScoreBoard();
        this.addAchievement('🎯', 'Primer paso', 'Te has registrado exitosamente');
        this.changeGamePhase('phase-2'); // Cambiamos a HTML
        this.showCurrentGame();
        this.isGameStarted = true;
        console.log('🎮 Juego inicializado');
    }

    /**
     * Cambia la fase visual del juego
     */
    changeGamePhase(newPhase) {
        // Remover clase de fase anterior
        document.body.classList.remove(this.gamePhase);
        
        // Agregar nueva fase
        this.gamePhase = newPhase;
        document.body.classList.add(newPhase);
        
        // Reproducir sonido de transición
        if (window.GameAudio) {
            window.GameAudio.playSound('levelUp');
        }
        
        // Mostrar notificación de nueva fase
        const phaseInfo = this.gamePhases[newPhase];
        if (phaseInfo) {
            this.showNotification(
                `🌟 NUEVA FASE: ${phaseInfo.name} - ${phaseInfo.colors}`,
                'success'
            );
        }
        
        console.log(`🎨 Cambiado a ${newPhase}: ${phaseInfo?.name || 'Desconocida'}`);
    }

    /**
     * Configura las referencias a los elementos del DOM
     */
    setupElements() {
        // Obtener todas las piezas arrastrables
        this.pieces = document.querySelectorAll('.piece[draggable="true"]');
        
        // Obtener todas las zonas de destino
        this.dropZones = document.querySelectorAll('.drop-zone');
        
        // Elementos de estadísticas
        this.correctCountElement = document.getElementById('correct-count');
        this.attemptsCountElement = document.getElementById('attempts-count');
        
        // Botón de reset
        this.resetButton = document.getElementById('reset-game');
        
        console.log(`📊 Encontradas ${this.pieces.length} piezas y ${this.dropZones.length} zonas`);
    }

    /**
     * Configura todos los event listeners
     */
    setupEventListeners() {
        // Event listeners dinámicos para el juego actual
        this.updateEventListeners();

        // Event listener para el botón de reset
        this.resetButton.addEventListener('click', () => this.resetGame());

        // Event listener para el control de audio
        const audioToggle = document.getElementById('audio-toggle');
        if (audioToggle) {
            audioToggle.addEventListener('click', () => {
                if (window.GameAudio) {
                    const isMuted = window.GameAudio.toggleMute();
                    audioToggle.textContent = isMuted ? '🔇' : '🔊';
                    audioToggle.classList.toggle('muted', isMuted);
                    audioToggle.title = isMuted ? 'Activar sonido' : 'Silenciar sonido';
                }
            });
        }

        console.log('🔧 Event listeners configurados');
    }

    /**
     * Actualiza los event listeners para el juego actual
     */
    updateEventListeners() {
        // Remover listeners anteriores si existen
        if (this.currentListeners) {
            this.currentListeners.forEach(({element, event, handler}) => {
                element.removeEventListener(event, handler);
            });
        }
        
        this.currentListeners = [];
        
        // Configurar listeners según el juego actual
        if (this.currentGame === 'html') {
            // Listeners para piezas HTML
            this.pieces.forEach(piece => {
                const dragStartHandler = (e) => this.handleDragStart(e);
                const dragEndHandler = (e) => this.handleDragEnd(e);
                
                piece.addEventListener('dragstart', dragStartHandler);
                piece.addEventListener('dragend', dragEndHandler);
                
                this.currentListeners.push(
                    {element: piece, event: 'dragstart', handler: dragStartHandler},
                    {element: piece, event: 'dragend', handler: dragEndHandler}
                );
            });

            // Listeners para zonas de destino HTML
            this.dropZones.forEach(zone => {
                const dragOverHandler = (e) => this.handleDragOver(e);
                const dragEnterHandler = (e) => this.handleDragEnter(e);
                const dragLeaveHandler = (e) => this.handleDragLeave(e);
                const dropHandler = (e) => this.handleDrop(e);
                
                zone.addEventListener('dragover', dragOverHandler);
                zone.addEventListener('dragenter', dragEnterHandler);
                zone.addEventListener('dragleave', dragLeaveHandler);
                zone.addEventListener('drop', dropHandler);
                
                this.currentListeners.push(
                    {element: zone, event: 'dragover', handler: dragOverHandler},
                    {element: zone, event: 'dragenter', handler: dragEnterHandler},
                    {element: zone, event: 'dragleave', handler: dragLeaveHandler},
                    {element: zone, event: 'drop', handler: dropHandler}
                );
            });
            
        } else if (this.currentGame === 'css') {
            // Listeners para piezas CSS
            const cssPieces = document.querySelectorAll('.css-piece');
            cssPieces.forEach(piece => {
                const dragStartHandler = (e) => this.handleCSSStart(e);
                const dragEndHandler = (e) => this.handleDragEnd(e);
                
                piece.addEventListener('dragstart', dragStartHandler);
                piece.addEventListener('dragend', dragEndHandler);
                
                this.currentListeners.push(
                    {element: piece, event: 'dragstart', handler: dragStartHandler},
                    {element: piece, event: 'dragend', handler: dragEndHandler}
                );
            });

            // Listeners para slots CSS
            const cssSlots = document.querySelectorAll('.property-slot');
            cssSlots.forEach(slot => {
                const dragOverHandler = (e) => this.handleDragOver(e);
                const dropHandler = (e) => this.handleCSSDrop(e);
                
                slot.addEventListener('dragover', dragOverHandler);
                slot.addEventListener('drop', dropHandler);
                
                this.currentListeners.push(
                    {element: slot, event: 'dragover', handler: dragOverHandler},
                    {element: slot, event: 'drop', handler: dropHandler}
                );
            });
            
        } else if (this.currentGame === 'js') {
            // Listeners para piezas JavaScript
            const jsPieces = document.querySelectorAll('.js-piece');
            jsPieces.forEach(piece => {
                const dragStartHandler = (e) => this.handleJSStart(e);
                const dragEndHandler = (e) => this.handleDragEnd(e);
                
                piece.addEventListener('dragstart', dragStartHandler);
                piece.addEventListener('dragend', dragEndHandler);
                
                this.currentListeners.push(
                    {element: piece, event: 'dragstart', handler: dragStartHandler},
                    {element: piece, event: 'dragend', handler: dragEndHandler}
                );
            });

            // Listeners para slots JavaScript
            const jsSlots = document.querySelectorAll('.event-slot');
            jsSlots.forEach(slot => {
                const dragOverHandler = (e) => this.handleDragOver(e);
                const dropHandler = (e) => this.handleJSDrop(e);
                
                slot.addEventListener('dragover', dragOverHandler);
                slot.addEventListener('drop', dropHandler);
                
                this.currentListeners.push(
                    {element: slot, event: 'dragover', handler: dragOverHandler},
                    {element: slot, event: 'drop', handler: dropHandler}
                );
            });
        }

        console.log(`🔧 Event listeners actualizados para el juego: ${this.currentGame}`);
    }

    /**
     * Maneja el inicio del arrastre
     */
    handleDragStart(event) {
        const piece = event.target;
        const tagType = piece.getAttribute('data-tag');
        
        // Sonido de inicio de arrastre
        if (window.GameAudio) {
            window.GameAudio.playSound('drag-start', { volume: 0.4 });
        }
        
        // Guardar información en dataTransfer
        event.dataTransfer.setData('text/plain', tagType);
        event.dataTransfer.setData('application/x-piece-id', piece.id || `piece-${tagType}`);
        
        // Efectos visuales
        piece.style.opacity = '0.7';
        
        console.log(`🔄 Arrastrando: ${tagType}`);
    }

    /**
     * Maneja el final del arrastre
     */
    handleDragEnd(event) {
        const piece = event.target;
        piece.style.opacity = '1';
    }

    /**
     * Permite el drop en la zona
     */
    handleDragOver(event) {
        event.preventDefault(); // Necesario para permitir el drop
    }

    /**
     * Maneja cuando un elemento entra en la zona de drop
     */
    handleDragEnter(event) {
        event.preventDefault();
        const dropZone = event.currentTarget;
        
        // Solo aplicar estilo si la zona no está ocupada
        if (!dropZone.classList.contains('occupied')) {
            dropZone.classList.add('drag-over');
            
            // Sonido sutil de hover sobre zona válida
            if (window.GameAudio) {
                window.GameAudio.playSound('drag-over', { volume: 0.2 });
            }
        }
    }

    /**
     * Maneja cuando un elemento sale de la zona de drop
     */
    handleDragLeave(event) {
        const dropZone = event.currentTarget;
        
        // Verificar si realmente salimos de la zona (no de un hijo)
        if (!dropZone.contains(event.relatedTarget)) {
            dropZone.classList.remove('drag-over');
        }
    }

    /**
     * Maneja el evento drop
     */
    handleDrop(event) {
        event.preventDefault();
        
        const dropZone = event.currentTarget;
        const draggedTag = event.dataTransfer.getData('text/plain');
        const expectedTag = dropZone.getAttribute('data-target');
        
        // Remover clase de hover
        dropZone.classList.remove('drag-over');
        
        // Incrementar intentos
        this.gameStats.totalAttempts++;
        
        console.log(`🎯 Intento: ${draggedTag} -> ${expectedTag}`);
        
        // Verificar si la zona ya está ocupada
        if (dropZone.classList.contains('occupied')) {
            this.showNotification('Esta zona ya está ocupada', 'error');
            this.updateStats();
            return;
        }
        
        // Validar si la pieza es correcta
        if (draggedTag === expectedTag) {
            this.handleCorrectPlacement(dropZone, draggedTag);
        } else {
            this.handleIncorrectPlacement(dropZone);
        }
        
        this.updateStats();
    }

    /**
     * Maneja una colocación correcta
     */
    handleCorrectPlacement(dropZone, tagType) {
        // Encontrar la pieza correspondiente
        const piece = document.querySelector(`.piece[data-tag="${tagType}"]`);
        
        if (!piece) return;
        
        // Incrementar colocaciones correctas
        this.gameStats.correctPlacements++;
        
        // Actualizar la zona de destino
        dropZone.classList.add('occupied');
        dropZone.innerHTML = `
            <span class="zone-label">✅ &lt;${tagType}&gt;</span>
            <small>¡Correcto!</small>
        `;
        
        // Deshabilitar la pieza
        piece.draggable = false;
        piece.style.opacity = '0.5';
        
        // Actualizar puntaje y racha
        this.updateScore(true);
        
        // Efectos visuales y sonoros
        this.showFeedback(dropZone, true, '¡Excelente!');
        dropZone.classList.add('success-animation');
        
        // Sonido de colocación exitosa
        if (window.GameAudio) {
            window.GameAudio.playSound('drop-success', { volume: 0.7 });
        }
        
        // Remover animación después de un tiempo
        setTimeout(() => {
            dropZone.classList.remove('success-animation');
        }, 600);
        
        console.log(`✅ Colocación correcta: ${tagType}`);
        
        // Verificar progresión de fases
        this.checkPhaseProgression(tagType);
        
        // Verificar si el juego está completo
        this.checkGameCompletion();
    }

    /**
     * Maneja una colocación incorrecta
     */
    handleIncorrectPlacement(dropZone) {
        // Actualizar puntaje (rompe la racha)
        this.updateScore(false);
        
        // Efectos visuales y sonoros de error
        this.showFeedback(dropZone, false, '¡Intenta de nuevo!');
        dropZone.classList.add('error-animation');
        
        // Sonido de error
        if (window.GameAudio) {
            window.GameAudio.playSound('drop-error', { volume: 0.6 });
        }
        
        // Remover animación después de un tiempo
        setTimeout(() => {
            dropZone.classList.remove('error-animation');
        }, 500);
        
        console.log('❌ Colocación incorrecta');
    }

    /**
     * Muestra feedback visual al usuario
     */
    showFeedback(element, isSuccess, message) {
        // Crear elemento de feedback temporal
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            background: ${isSuccess ? '#10b981' : '#ef4444'};
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            z-index: 1000;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(feedback);
        
        // Remover feedback después de 2 segundos
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 2000);
    }

    /**
     * Actualiza las estadísticas del juego
     */
    updateStats() {
        if (this.correctCountElement) {
            this.correctCountElement.textContent = this.gameStats.correctPlacements;
        }
        
        if (this.attemptsCountElement) {
            this.attemptsCountElement.textContent = this.gameStats.totalAttempts;
        }
    }

    /**
     * Verifica si el juego está completo
     */
    checkGameCompletion() {
        const totalPieces = this.pieces.length;
        
        if (this.gameStats.correctPlacements === totalPieces) {
            setTimeout(() => {
                this.showGameCompletionMessage();
            }, 1000);
        }
    }

    /**
     * Muestra mensaje de finalización del juego
     */
    showGameCompletionMessage() {
        const accuracy = ((this.gameStats.correctPlacements / this.gameStats.totalAttempts) * 100).toFixed(1);
        
        this.showNotification('🎉 ¡Felicitaciones! Has completado el juego', 'success');
        this.addAchievement('🏆', 'Maestro HTML', 'Has completado todos los elementos');
        
        // Sonido de victoria del juego
        if (window.GameAudio) {
            window.GameAudio.playSound('game-complete', { volume: 1.0 });
        }
        
        console.log('🎉 Juego completado');
    }

    /**
     * Reinicia el juego
     */
    resetGame() {
        console.log('🔄 Reiniciando juego...');
        
        // Sonido de reset
        if (window.GameAudio) {
            window.GameAudio.playSound('reset', { volume: 0.5 });
        }
        
        // Reiniciar estadísticas
        this.gameStats.correctPlacements = 0;
        this.gameStats.totalAttempts = 0;
        
        // Restablecer todas las piezas
        this.pieces.forEach(piece => {
            piece.draggable = true;
            piece.style.opacity = '1';
        });
        
        // Restablecer todas las zonas de destino
        this.dropZones.forEach(zone => {
            zone.classList.remove('occupied', 'drag-over', 'success-animation', 'error-animation');
            
            const targetType = zone.getAttribute('data-target');
            const labels = {
                'header': { label: 'Header Zone', desc: 'Encabezado principal de la página' },
                'nav': { label: 'Navigation Zone', desc: 'Menú de navegación' },
                'main': { label: 'Main Zone', desc: 'Contenido principal' },
                'article': { label: 'Article Zone', desc: 'Contenido del artículo' },
                'aside': { label: 'Aside Zone', desc: 'Contenido lateral' },
                'footer': { label: 'Footer Zone', desc: 'Pie de página' }
            };
            
            const info = labels[targetType] || { label: 'Zone', desc: 'Zona de colocación' };
            
            zone.innerHTML = `
                <span class="zone-label">${info.label}</span>
                <small>${info.desc}</small>
            `;
        });
        
        // Actualizar estadísticas
        this.updateStats();
        
        console.log('✅ Juego reiniciado');
    }

    /**
     * Obtiene estadísticas del juego
     */
    getGameStats() {
        return {
            ...this.gameStats,
            accuracy: this.gameStats.totalAttempts > 0 
                ? ((this.gameStats.correctPlacements / this.gameStats.totalAttempts) * 100).toFixed(1)
                : 0
        };
    }

    /**
     * Actualiza el puntaje del jugador
     */
    updateScore(isCorrect) {
        if (!this.isGameStarted) return;

        if (isCorrect) {
            this.player.streak++;
            const basePoints = 10;
            const streakBonus = Math.min(this.player.streak * 2, 50);
            const levelMultiplier = this.player.currentLevel * 0.5;
            const totalPoints = Math.floor(basePoints + streakBonus + levelMultiplier);
            
            this.player.score += totalPoints;
            this.player.experience += totalPoints;
            
            this.showFloatingScore(`+${totalPoints}`, true);
            
            // Verificar logros de racha
            if (this.player.streak === 3) {
                this.addAchievement('🔥', 'En Racha', 'Conseguiste 3 aciertos seguidos');
                if (window.GameAudio) {
                    window.GameAudio.playSound('streak', { volume: 0.6 });
                }
            } else if (this.player.streak === 5) {
                this.addAchievement('⚡', 'Imparable', 'Conseguiste 5 aciertos seguidos');
                if (window.GameAudio) {
                    window.GameAudio.playSound('streak', { volume: 0.8, pitch: 1.2 });
                }
            }
        } else {
            this.player.streak = 0;
            this.showFloatingScore('Racha perdida', false);
        }

        this.checkLevelUp();
        this.updateScoreBoard();
    }

    /**
     * Verifica si el jugador debe subir de nivel
     */
    checkLevelUp() {
        if (this.player.experience >= this.player.maxExperience) {
            this.player.currentLevel++;
            this.player.experience -= this.player.maxExperience;
            this.player.maxExperience = Math.floor(this.player.maxExperience * 1.5);
            
            this.addAchievement('🏆', `Nivel ${this.player.currentLevel}`, 'Has subido de nivel');
            this.showNotification(`¡Felicidades! Has alcanzado el nivel ${this.player.currentLevel}`, 'success');
            
            // Sonido de subida de nivel
            if (window.GameAudio) {
                window.GameAudio.playSound('level-up', { volume: 0.9 });
            }
        }
    }

    /**
     * Actualiza la información del jugador en pantalla
     */
    updatePlayerDisplay() {
        const displayName = document.getElementById('display-name');
        const displayLevel = document.getElementById('display-level');
        
        if (displayName) displayName.textContent = this.player.name;
        if (displayLevel) {
            const levelNames = {
                'beginner': '🌱 Principiante',
                'intermediate': '⚡ Intermedio',
                'advanced': '🚀 Avanzado'
            };
            displayLevel.textContent = levelNames[this.player.level] || this.player.level;
        }
    }

    /**
     * Actualiza el tablero de puntajes
     */
    updateScoreBoard() {
        const totalScore = document.getElementById('total-score');
        const streakCount = document.getElementById('streak-count');
        const currentLevel = document.getElementById('current-level');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');
        
        if (totalScore) {
            totalScore.textContent = this.player.score.toLocaleString();
            totalScore.style.animation = 'none';
            setTimeout(() => totalScore.style.animation = 'score-update 0.3s ease-out', 10);
        }
        
        if (streakCount) {
            streakCount.textContent = this.player.streak;
            streakCount.style.animation = 'none';
            setTimeout(() => streakCount.style.animation = 'score-update 0.3s ease-out', 10);
        }
        
        if (currentLevel) {
            currentLevel.textContent = this.player.currentLevel;
        }
        
        if (progressFill && progressText) {
            const progressPercentage = (this.player.experience / this.player.maxExperience) * 100;
            progressFill.style.width = `${progressPercentage}%`;
            progressText.textContent = `${this.player.experience} / ${this.player.maxExperience} XP`;
        }
    }

    /**
     * Agrega un logro al jugador
     */
    addAchievement(icon, title, description) {
        const achievement = { icon, title, description, timestamp: Date.now() };
        this.player.achievements.unshift(achievement);
        
        // Mantener solo los últimos 5 logros
        if (this.player.achievements.length > 5) {
            this.player.achievements = this.player.achievements.slice(0, 5);
        }
        
        this.updateAchievements();
        this.showAchievementNotification(achievement);
        
        // Sonido de logro desbloqueado
        if (window.GameAudio) {
            window.GameAudio.playSound('achievement', { volume: 0.8 });
        }
    }

    /**
     * Actualiza la lista de logros en pantalla
     */
    updateAchievements() {
        const achievementsList = document.getElementById('achievements-list');
        if (!achievementsList) return;
        
        achievementsList.innerHTML = '';
        
        this.player.achievements.forEach(achievement => {
            const achievementElement = document.createElement('div');
            achievementElement.className = 'achievement-item';
            achievementElement.innerHTML = `
                <span style="font-size: 16px;">${achievement.icon}</span>
                <div>
                    <div style="font-weight: 600; color: var(--color-gray-900);">${achievement.title}</div>
                    <div style="font-size: 11px; color: var(--color-gray-600);">${achievement.description}</div>
                </div>
            `;
            achievementsList.appendChild(achievementElement);
        });
    }

    /**
     * Muestra una notificación de logro
     */
    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-icon" style="font-size: 24px; margin-right: 8px;">${achievement.icon}</div>
            <div class="achievement-content">
                <div style="font-weight: 700; font-size: 14px;">¡Logro Desbloqueado!</div>
                <div style="font-weight: 600; font-size: 16px; margin: 2px 0;">${achievement.title}</div>
                <div style="font-size: 12px; opacity: 0.9;">${achievement.description}</div>
            </div>
        `;
        
        // Agregar estilos inline para la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95));
            color: white;
            padding: 16px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            animation: slideInRight 0.5s ease-out;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }

    /**
     * Muestra puntaje flotante
     */
    showFloatingScore(text, isPositive) {
        const gameBoard = document.querySelector('.game-board');
        if (!gameBoard) return;
        
        const floatingScore = document.createElement('div');
        floatingScore.textContent = text;
        floatingScore.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            font-weight: 700;
            color: ${isPositive ? '#10b981' : '#ef4444'};
            z-index: 1000;
            pointer-events: none;
            animation: floatUp 2s ease-out forwards;
        `;
        
        gameBoard.style.position = 'relative';
        gameBoard.appendChild(floatingScore);
        
        setTimeout(() => {
            if (floatingScore.parentNode) {
                floatingScore.parentNode.removeChild(floatingScore);
            }
        }, 2000);
    }

    /**
     * Muestra notificaciones generales
     */
    showNotification(message, type = 'info') {
        // Sonido de notificación (solo para info, otros tipos ya tienen sus sonidos)
        if (type === 'info' && window.GameAudio) {
            window.GameAudio.playSound('notification', { volume: 0.5 });
        }
        
        const notification = document.createElement('div');
        notification.textContent = message;
        
        const colors = {
            success: 'linear-gradient(135deg, #10b981, #059669)',
            error: 'linear-gradient(135deg, #ef4444, #dc2626)',
            info: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${colors[type]};
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-weight: 600;
            animation: slideInDown 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutUp 0.3s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    /**
     * Verifica la progresión entre fases basada en elementos completados
     */
    checkPhaseProgression(tagType) {
        // Agregar elemento completado a la fase actual
        if (!this.completedPhases.includes(tagType)) {
            this.completedPhases.push(tagType);
        }
        
        // Solo verificar progresión para juego HTML
        if (this.currentGame === 'html') {
            // Verificar si HTML game está completo
            setTimeout(() => {
                if (this.checkCurrentGameCompletion()) {
                    this.completeCurrentGame();
                }
            }, 1000);
        }
    }

    /**
     * Desencadena el Big Bang final con todos los colores
     */
    triggerBigBang() {
        // Cambiar a clase Big Bang
        document.body.classList.add('big-bang');
        
        // Mostrar modal después de la animación
        setTimeout(() => {
            const modal = document.getElementById('big-bang-modal');
            if (modal) {
                modal.classList.remove('hidden');
                
                // Configurar evento del botón de reinicio
                const restartBtn = document.getElementById('restart-complete-game');
                if (restartBtn) {
                    restartBtn.addEventListener('click', () => {
                        this.restartCompleteGame();
                    });
                }
            }
        }, 3000);
        
        // Reproducir sonido épico
        if (window.GameAudio) {
            window.GameAudio.playSequence(['levelUp', 'achievement', 'success'], 500);
        }
        
        console.log('💥 BIG BANG ACTIVADO - ¡Juego completado!');
    }

    /**
     * Reinicia completamente el juego desde el formulario
     */
    restartCompleteGame() {
        // Ocultar modal
        const modal = document.getElementById('big-bang-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
        
        // Resetear todas las fases
        document.body.classList.remove('phase-2', 'phase-3', 'phase-4', 'big-bang');
        document.body.classList.add('phase-1');
        
        // Mostrar pantalla de bienvenida
        const welcomeScreen = document.getElementById('welcome-screen');
        const gameContainer = document.getElementById('game-container');
        
        if (welcomeScreen && gameContainer) {
            gameContainer.classList.add('hidden');
            welcomeScreen.classList.remove('hidden');
        }
        
        // Resetear datos del juego
        this.gamePhase = 'phase-1';
        this.completedPhases = [];
        this.gameStats = { correctPlacements: 0, totalAttempts: 0 };
        this.player = {
            name: '', email: '', phone: '', level: '',
            score: 0, streak: 0, currentLevel: 1,
            experience: 0, maxExperience: 100, achievements: []
        };
        
        console.log('🔄 Juego reiniciado completamente');
    }

    /**
     * Muestra el juego actual (HTML, CSS o JS)
     */
    showCurrentGame() {
        // Ocultar todos los juegos
        const allGames = document.querySelectorAll('.game-level');
        allGames.forEach(game => game.classList.add('hidden'));

        // Ocultar todas las piezas
        const allPieces = document.querySelectorAll('.pieces-container');
        allPieces.forEach(pieces => pieces.classList.add('hidden'));

        // Mostrar juego actual
        const currentGameElement = document.getElementById(`${this.currentGame}-game`);
        const currentPiecesElement = document.getElementById(`${this.currentGame}-pieces`);
        
        if (currentGameElement) {
            currentGameElement.classList.remove('hidden');
            currentGameElement.classList.add('active');
        }

        if (currentPiecesElement) {
            currentPiecesElement.classList.remove('hidden');
            currentPiecesElement.classList.add('active');
        }

        // Actualizar título del inventario
        const config = this.gameConfigs[this.currentGame];
        const inventoryTitleElement = document.getElementById('inventory-title');
        const inventoryDescriptionElement = document.getElementById('inventory-description');
        const headerTitleElement = document.getElementById('game-title');
        const headerDescriptionElement = document.getElementById('game-description');

        if (inventoryTitleElement && config) {
            inventoryTitleElement.textContent = config.title;
        }
        if (inventoryDescriptionElement && config) {
            inventoryDescriptionElement.textContent = config.description;
        }
        if (headerTitleElement && config?.headerTitle) {
            headerTitleElement.textContent = config.headerTitle;
        }
        if (headerDescriptionElement && config?.headerDescription) {
            headerDescriptionElement.textContent = config.headerDescription;
        }

        this.setupCurrentGameElements();
        
        // Actualizar event listeners para el juego actual
        this.updateEventListeners();
    }

    /**
     * Configura elementos específicos del juego actual
     */
    setupCurrentGameElements() {
        if (this.currentGame === 'html') {
            this.setupHTMLGame();
        } else if (this.currentGame === 'css') {
            this.setupCSSGame();
        } else if (this.currentGame === 'js') {
            this.setupJSGame();
        }
    }

    /**
     * Configura el juego HTML (ya existente)
     */
    setupHTMLGame() {
        this.pieces = document.querySelectorAll('#html-pieces .piece');
        this.dropZones = document.querySelectorAll('#html-game .drop-zone');
    }

    /**
     * Configura el juego CSS interactivo gamificado
     */
    setupCSSGame() {
        // Inicializar variables del juego CSS
        this.cssGameState = {
            currentChallenge: 1,
            totalChallenges: 4,
            score: 0,
            multiplier: 1,
            timeRemaining: 180, // 3 minutos
            challengeStartTime: Date.now(),
            appliedStyles: {},
            achievements: {
                speed: false,
                precision: false,
                creativity: false
            },
            completedChallenges: new Set()
        };
        
        // Configurar herramientas CSS
        this.setupCSSTools();
    this.cacheCSSToolCategories();
        
        // Configurar controles de vista previa
        this.setupPreviewControls();
        
        // Iniciar timer
        this.startCSSTimer();
        
        // Configurar desafío inicial
        this.loadCSSChallenge(1);
        
        // Configurar botones de acción
        this.setupCSSActions();
    }

    /**
     * Configura el juego JavaScript (completar código)
     */
    setupJSGame() {
        const codeInputs = document.querySelectorAll('.code-input');
        codeInputs.forEach(input => {
            input.addEventListener('input', (e) => this.handleCodeInputChange(e));
            input.addEventListener('blur', (e) => this.validateCodeInput(e));
        });
        
        this.jsProgress = {
            completed: 0,
            total: 4
        };
        
        this.updateJSProgress();
    }

    /**
     * Configura las herramientas CSS interactivas
     */
    setupCSSTools() {
        const cssTools = document.querySelectorAll('.css-tool');
        cssTools.forEach(tool => {
            tool.addEventListener('click', (e) => this.applyCSSProperty(e));
        });
    }

    /**
     * Cachea las categorías de herramientas y prepara su estado inicial
     */
    cacheCSSToolCategories() {
        this.cssToolCategories = Array.from(document.querySelectorAll('#css-game .tool-category'));
        this.cssToolCategories.forEach(category => {
            category.setAttribute('aria-hidden', 'true');
            category.classList.remove('is-active', 'is-complete');
        });
    }
    
    /**
     * Configura controles de vista previa
     */
    setupPreviewControls() {
        const previewSizes = document.querySelectorAll('.preview-size');
        previewSizes.forEach(btn => {
            btn.addEventListener('click', (e) => this.changePreviewSize(e));
        });
    }
    
    /**
     * Configura acciones del juego CSS
     */
    setupCSSActions() {
        const resetBtn = document.getElementById('reset-css-element');
        const hintBtn = document.getElementById('css-hint-btn');
        
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetCurrentElement());
        }
        
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.showCSSHint());
        }
    }
    
    /**
     * Aplica una propiedad CSS al elemento objetivo
     */
    applyCSSProperty(event) {
        const tool = event.target;
        const property = tool.dataset.property;
        const value = tool.dataset.value;
        const currentChallenge = this.cssGameState.currentChallenge;
        
        // Obtener elemento objetivo actual
        const targetElement = document.getElementById(`target-element-${currentChallenge}`);
        if (!targetElement) return;
        
        // Aplicar estilo
        targetElement.style[property] = value;
        
        // Guardar estilo aplicado
        if (!this.cssGameState.appliedStyles[currentChallenge]) {
            this.cssGameState.appliedStyles[currentChallenge] = {};
        }
        this.cssGameState.appliedStyles[currentChallenge][property] = value;
        
        // Actualizar panel de estilos
        this.updateAppliedStylesDisplay();
        
        // Verificar si se completó el desafío
        this.checkChallengeCompletion();
        
        // Efectos visuales
        tool.classList.add('used');
        setTimeout(() => tool.classList.remove('used'), 300);
        
        if (window.GameAudio) {
            window.GameAudio.playSound('interface-click');
        }
    }
    
    /**
     * Verifica si el desafío actual está completo
     */
    checkChallengeCompletion() {
        const currentChallenge = this.cssGameState.currentChallenge;
        const appliedStyles = this.cssGameState.appliedStyles[currentChallenge] || {};
        let isComplete = false;
        
        // Definir condiciones de éxito para cada desafío
        switch (currentChallenge) {
            case 1: // Centrar elemento
                isComplete = appliedStyles.margin === '0 auto' || 
                           (appliedStyles.display === 'flex' && appliedStyles['justify-content'] === 'center');
                break;
            case 2: // Degradado
                isComplete = appliedStyles.background && 
                           (appliedStyles.background.includes('linear-gradient') || 
                            appliedStyles.background.includes('radial-gradient'));
                break;
            case 3: // Layout responsive
                isComplete = appliedStyles.display === 'grid' && 
                           appliedStyles['grid-template-columns'];
                break;
            case 4: // Efectos
                isComplete = appliedStyles['box-shadow'] && appliedStyles['border-radius'];
                break;
        }
        
        if (isComplete) {
            this.completeCSSChallenge();
        }
    }
    
    /**
     * Completa el desafío CSS actual
     */
    completeCSSChallenge() {
        const currentChallenge = this.cssGameState.currentChallenge;
        const successIndicator = document.getElementById(`success-${currentChallenge}`);

        if (this.cssGameState.completedChallenges.has(currentChallenge)) {
            return;
        }
        this.cssGameState.completedChallenges.add(currentChallenge);

        this.markToolCategoryAsComplete(currentChallenge);
        
        // Mostrar indicador de éxito
        if (successIndicator) {
            successIndicator.style.display = 'block';
            successIndicator.classList.add('animate-success');
        }
        
        // Calcular puntuación
        const timeBonus = this.calculateTimeBonus();
        const baseScore = 1000;
        const finalScore = Math.round((baseScore + timeBonus) * this.cssGameState.multiplier);
        
        this.cssGameState.score += finalScore;
        this.updateCSSScore();
    this.updateCSSProgress();
        
        // Verificar logros
        this.checkCSSAchievements();
        
        // Efectos de audio
        if (window.GameAudio) {
            window.GameAudio.playSound('challenge-complete');
        }
        
        // Avanzar al siguiente desafío
        setTimeout(() => {
            if (this.cssGameState.currentChallenge < this.cssGameState.totalChallenges) {
                this.loadNextCSSChallenge();
            } else {
                this.completeCSSGame();
            }
        }, 2000);
    }
    
    /**
     * Carga el siguiente desafío CSS
     */
    loadNextCSSChallenge() {
        this.cssGameState.currentChallenge++;
        this.cssGameState.challengeStartTime = Date.now();
        this.loadCSSChallenge(this.cssGameState.currentChallenge);
    }
    
    /**
     * Carga un desafío CSS específico
     */
    loadCSSChallenge(challengeNumber) {
        // Ocultar todas las vistas previas
        const allPreviews = document.querySelectorAll('.css-challenge-preview');
        allPreviews.forEach(preview => {
            preview.classList.remove('active');
            preview.style.display = 'none';
        });
        
        // Mostrar vista previa actual
        const currentPreview = document.getElementById(`challenge-${challengeNumber}-preview`);
        if (currentPreview) {
            currentPreview.style.display = 'block';
            currentPreview.classList.add('active');
        }
        
        // Actualizar información del desafío
        this.updateChallengeInfo(challengeNumber);
        
        // Actualizar barra de progreso
        this.updateCSSProgress();

        // Actualizar herramientas disponibles
        this.updateToolCategoryVisibility(challengeNumber);
        
        // Resetear estilos del elemento actual
        this.resetCurrentElement();
    }

    /**
     * Marca la categoría de herramientas como completada
     */
    markToolCategoryAsComplete(challengeNumber) {
        if (!this.cssToolCategories || !this.cssToolCategories.length) {
            this.cacheCSSToolCategories();
        }

        const category = document.querySelector(`#css-game .tool-category[data-challenge="${challengeNumber}"]`);
        if (!category) return;

        category.classList.add('is-complete');
        category.setAttribute('aria-hidden', 'true');

        // Permitir que la animación se ejecute antes de quitar el estado activo
        setTimeout(() => {
            category.classList.remove('is-active');
        }, 350);
    }

    /**
     * Gestiona qué categoría de herramientas está visible
     */
    updateToolCategoryVisibility(challengeNumber) {
        if (!this.cssToolCategories || !this.cssToolCategories.length) {
            this.cacheCSSToolCategories();
        }

        this.cssToolCategories.forEach(category => {
            const categoryNumber = Number(category.dataset.challenge);
            const isActive = categoryNumber === challengeNumber;
            const isCompleted = categoryNumber < challengeNumber;

            if (isActive) {
                category.classList.remove('is-active');
                category.classList.remove('is-complete');
                category.removeAttribute('aria-hidden');

                // Forzar reflujo para permitir animación cuando se vuelve visible
                void category.offsetHeight;
                category.classList.add('is-active');
            } else {
                category.classList.remove('is-active');
                category.classList.toggle('is-complete', isCompleted);
                category.setAttribute('aria-hidden', 'true');
            }
        });
    }
    
    /**
     * Actualiza información del desafío actual
     */
    updateChallengeInfo(challengeNumber) {
        const challenges = {
            1: {
                title: '🎯 Desafío 1: Centrar el elemento',
                description: 'Haz que el elemento azul se centre horizontalmente en su contenedor'
            },
            2: {
                title: '🌈 Desafío 2: Crear degradado',
                description: 'Aplica un degradado de colores atractivo al elemento'
            },
            3: {
                title: '📱 Desafío 3: Layout responsive',
                description: 'Crea un grid responsive que se adapte al tamaño de pantalla'
            },
            4: {
                title: '✨ Desafío 4: Efectos avanzados',
                description: 'Combina sombras y bordes redondeados para un efecto espectacular'
            }
        };
        
        const challenge = challenges[challengeNumber];
        if (challenge) {
            const titleEl = document.getElementById('css-challenge-title');
            const descEl = document.getElementById('css-challenge-description');
            
            if (titleEl) titleEl.textContent = challenge.title;
            if (descEl) descEl.textContent = challenge.description;
        }
    }

    /**
     * Inicia el timer del juego CSS
     */
    startCSSTimer() {
        this.cssTimer = setInterval(() => {
            this.cssGameState.timeRemaining--;
            this.updateCSSTimerDisplay();
            
            if (this.cssGameState.timeRemaining <= 0) {
                this.handleCSSTimeout();
            }
        }, 1000);
    }
    
    /**
     * Actualiza la visualización del timer
     */
    updateCSSTimerDisplay() {
        const timerEl = document.getElementById('css-timer-display');
        if (timerEl) {
            const minutes = Math.floor(this.cssGameState.timeRemaining / 60);
            const seconds = this.cssGameState.timeRemaining % 60;
            timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Cambiar color cuando queda poco tiempo
            if (this.cssGameState.timeRemaining <= 30) {
                timerEl.style.color = '#ff4757';
                timerEl.style.animation = 'pulse 1s infinite';
            }
        }
    }
    
    /**
     * Maneja el timeout del juego CSS
     */
    handleCSSTimeout() {
        clearInterval(this.cssTimer);
        
        // Mostrar mensaje de tiempo agotado
        this.showCSSMessage('⏰ ¡Tiempo agotado! Pero puedes continuar sin límite de tiempo.', 'warning');
        
        // Permitir continuar sin timer
        const timerEl = document.getElementById('css-timer-display');
        if (timerEl) {
            timerEl.textContent = '∞';
            timerEl.style.color = '#2ed573';
        }
    }
    
    /**
     * Calcula bonus por tiempo
     */
    calculateTimeBonus() {
        const challengeTime = (Date.now() - this.cssGameState.challengeStartTime) / 1000;
        const maxBonus = 500;
        const timeLimit = 45; // 45 segundos para bonus máximo
        
        if (challengeTime <= timeLimit) {
            return Math.round(maxBonus * (1 - challengeTime / timeLimit));
        }
        return 0;
    }
    
    /**
     * Actualiza la puntuación CSS
     */
    updateCSSScore() {
        const scoreEl = document.getElementById('css-score');
        const multiplierEl = document.getElementById('css-multiplier');
        
        if (scoreEl) {
            scoreEl.textContent = this.cssGameState.score.toLocaleString();
        }
        
        if (multiplierEl) {
            multiplierEl.textContent = `x${this.cssGameState.multiplier}`;
        }
    }
    
    /**
     * Actualiza progreso CSS
     */
    updateCSSProgress() {
        const progressFill = document.getElementById('css-progress-fill');
        const counter = document.getElementById('css-challenge-counter');
        const progressText = document.getElementById('css-progress-text');
        const completedCount = this.cssGameState.completedChallenges ? this.cssGameState.completedChallenges.size : 0;
        
        if (progressFill) {
            const progress = (completedCount / this.cssGameState.totalChallenges) * 100;
            progressFill.style.width = `${progress}%`;
        }
        
        if (counter) {
            counter.textContent = `${this.cssGameState.currentChallenge} / ${this.cssGameState.totalChallenges}`;
        }

        if (progressText) {
            progressText.textContent = `${completedCount} / ${this.cssGameState.totalChallenges} preguntas completadas`;
        }
    }
    
    /**
     * Actualiza la visualización de estilos aplicados
     */
    updateAppliedStylesDisplay() {
        const displayEl = document.getElementById('current-css-display');
        if (!displayEl) return;
        
        const currentChallenge = this.cssGameState.currentChallenge;
        const styles = this.cssGameState.appliedStyles[currentChallenge] || {};
        
        let cssText = '/* Estilos aplicados */\n.elemento {\n';
        
        Object.entries(styles).forEach(([property, value]) => {
            cssText += `  ${property}: ${value};\n`;
        });
        
        cssText += '}';
        
        displayEl.textContent = cssText;
    }
    
    /**
     * Resetea el elemento actual
     */
    resetCurrentElement() {
        const currentChallenge = this.cssGameState.currentChallenge;
        const targetElement = document.getElementById(`target-element-${currentChallenge}`);
        
        if (targetElement) {
            // Resetear todos los estilos
            targetElement.removeAttribute('style');
            
            // Limpiar estilos guardados
            if (this.cssGameState.appliedStyles[currentChallenge]) {
                this.cssGameState.appliedStyles[currentChallenge] = {};
            }
            
            // Actualizar visualización
            this.updateAppliedStylesDisplay();
            
            // Ocultar indicador de éxito
            const successIndicator = document.getElementById(`success-${currentChallenge}`);
            if (successIndicator) {
                successIndicator.style.display = 'none';
                successIndicator.classList.remove('animate-success');
            }
        }
    }
    
    /**
     * Muestra una pista para el desafío CSS actual
     */
    showCSSHint() {
        const hints = {
            1: 'Para centrar horizontalmente, intenta usar "margin: 0 auto" o combinar "display: flex" con "justify-content: center"',
            2: 'Los degradados se crean con "linear-gradient" o "radial-gradient". ¡Experimenta con diferentes colores!',
            3: 'Un layout responsive necesita "display: grid" y "grid-template-columns" con valores responsivos',
            4: 'Combina "box-shadow" para sombras y "border-radius" para bordes redondeados'
        };
        
        const hint = hints[this.cssGameState.currentChallenge];
        if (hint) {
            this.showCSSMessage(`💡 Pista: ${hint}`, 'info');
        }
    }
    
    /**
     * Muestra mensajes del juego CSS
     */
    showCSSMessage(message, type = 'info') {
        // Crear elemento de mensaje si no existe
        let messageEl = document.getElementById('css-game-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'css-game-message';
            messageEl.className = 'css-game-message';
            document.querySelector('#css-game').appendChild(messageEl);
        }
        
        messageEl.textContent = message;
        messageEl.className = `css-game-message ${type} show`;
        
        // Ocultar después de 4 segundos
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 4000);
    }
    
    /**
     * Cambia el tamaño de vista previa
     */
    changePreviewSize(event) {
        const size = event.target.dataset.size;
        const container = document.getElementById('css-preview-container');
        
        if (container) {
            container.className = `preview-container ${size}`;
        }
        
        // Actualizar botones activos
        document.querySelectorAll('.preview-size').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }
    
    /**
     * Verifica logros CSS
     */
    checkCSSAchievements() {
        const challengeTime = (Date.now() - this.cssGameState.challengeStartTime) / 1000;
        const currentChallenge = this.cssGameState.currentChallenge;
        const styles = this.cssGameState.appliedStyles[currentChallenge] || {};
        
        // Logro de velocidad
        if (challengeTime <= 30 && !this.cssGameState.achievements.speed) {
            this.unlockCSSAchievement('speed', '⚡ ¡Velocidad Lightning!');
            this.cssGameState.multiplier += 0.5;
        }
        
        // Logro de precisión
        if (Object.keys(styles).length <= 2 && !this.cssGameState.achievements.precision) {
            this.unlockCSSAchievement('precision', '🎯 ¡Precisión Perfecta!');
            this.cssGameState.multiplier += 0.3;
        }
        
        // Logro de creatividad
        if (Object.keys(styles).length >= 4 && !this.cssGameState.achievements.creativity) {
            this.unlockCSSAchievement('creativity', '🎨 ¡Creatividad Artística!');
            this.cssGameState.multiplier += 0.4;
        }
    }
    
    /**
     * Desbloquea un logro CSS
     */
    unlockCSSAchievement(achievement, message) {
        this.cssGameState.achievements[achievement] = true;
        
        const achievementEl = document.getElementById(`${achievement}-achievement`);
        if (achievementEl) {
            achievementEl.classList.add('unlocked');
        }
        
        this.showCSSMessage(message, 'success');
        
        if (window.GameAudio) {
            window.GameAudio.playSound('achievement-unlock');
        }
    }
    
    /**
     * Completa todo el juego CSS
     */
    completeCSSGame() {
        clearInterval(this.cssTimer);
        
        // Calcular bonus final
        const timeBonus = this.cssGameState.timeRemaining > 0 ? this.cssGameState.timeRemaining * 10 : 0;
        const achievementBonus = Object.values(this.cssGameState.achievements).filter(Boolean).length * 500;
        const finalScore = this.cssGameState.score + timeBonus + achievementBonus;
        
        // Mostrar resumen final
        this.showCSSGameSummary(finalScore);
        
        // Completar nivel después de mostrar resumen
        setTimeout(() => {
            this.completeCurrentGame();
        }, 3000);
    }
    
    /**
     * Muestra resumen del juego CSS
     */
    showCSSGameSummary(finalScore) {
        const summary = `
            🎨 ¡CSS Designer Completado!
            
            📊 Puntuación Final: ${finalScore.toLocaleString()}
            ⏱️ Tiempo Restante: ${this.cssGameState.timeRemaining}s
            🏆 Logros Desbloqueados: ${Object.values(this.cssGameState.achievements).filter(Boolean).length}/3
            ⚡ Multiplicador Final: x${this.cssGameState.multiplier}
            
            ¡Excelente trabajo como diseñador CSS!
        `;
        
        this.showCSSMessage(summary, 'success');
    }

    /**
     * Maneja cambios en inputs de código JavaScript
     */
    handleCodeInputChange(event) {
        const input = event.target;
        const value = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        
        // Feedback visual en tiempo real
        input.classList.remove('correct', 'wrong');
        
        if (value === correctAnswer) {
            input.classList.add('correct');
        } else if (value.length > 0) {
            input.classList.add('wrong');
        }
    }

    /**
     * Valida input de código cuando pierde el foco
     */
    validateCodeInput(event) {
        const input = event.target;
        const value = input.value.trim().toLowerCase();
        const correctAnswer = input.dataset.answer.toLowerCase();
        const challengeCard = input.closest('.challenge-card');
        const statusElement = challengeCard.querySelector('.challenge-status');
        
        if (value === correctAnswer) {
            input.classList.add('correct');
            input.classList.remove('wrong');
            
            // Verificar si todos los inputs de este desafío están correctos
            const allInputs = challengeCard.querySelectorAll('.code-input');
            const correctInputs = challengeCard.querySelectorAll('.code-input.correct');
            
            if (allInputs.length === correctInputs.length) {
                statusElement.textContent = '✅ ¡Desafío completado!';
                statusElement.className = 'challenge-status correct';
                
                // Marcar este desafío como completado si no lo estaba
                if (!challengeCard.dataset.completed) {
                    challengeCard.dataset.completed = 'true';
                    this.jsProgress.completed++;
                    this.updateScore(true);
                    
                    if (window.GameAudio) {
                        window.GameAudio.playSound('drop-success');
                    }
                    
                    this.updateJSProgress();
                    
                    // Verificar si el juego JS está completo
                    if (this.jsProgress.completed === this.jsProgress.total) {
                        setTimeout(() => {
                            this.completeCurrentGame();
                        }, 1500);
                    }
                }
            }
        } else if (value.length > 0) {
            input.classList.add('wrong');
            input.classList.remove('correct');
            
            if (window.GameAudio) {
                window.GameAudio.playSound('validation-error');
            }
        }
    }

    /**
     * Actualiza progreso JavaScript
     */
    updateJSProgress() {
        const progressText = document.getElementById('js-progress-text');
        const progressFill = document.getElementById('js-progress-fill');
        
        if (progressText) {
            progressText.textContent = `${this.jsProgress.completed} / ${this.jsProgress.total} ejercicios completados`;
        }
        
        if (progressFill) {
            const percentage = (this.jsProgress.completed / this.jsProgress.total) * 100;
            progressFill.style.width = `${percentage}%`;
        }
    }

    /**
     * Avanza al siguiente juego
     */
    advanceToNextGame() {
        this.completedGames.push(this.currentGame);
        
        if (this.currentGame === 'html') {
            this.currentGame = 'css';
            this.changeGamePhase('phase-3');
            this.showCurrentGame();
            setTimeout(() => {
                this.showNotification('🎨 ¡Nivel CSS desbloqueado! Ahora aprende a dar estilo a tus elementos', 'success');
            }, 1000);
        } else if (this.currentGame === 'css') {
            this.currentGame = 'js';
            this.changeGamePhase('phase-4');
            this.showCurrentGame();
            setTimeout(() => {
                this.showNotification('⚡ ¡Nivel JavaScript desbloqueado! Agrega interactividad a tu web', 'success');
            }, 1000);
        } else if (this.currentGame === 'js') {
            // Todos los juegos completados
            setTimeout(() => this.triggerBigBang(), 2000);
        }
    }

    /**
     * Verifica si el juego actual está completo
     */
    checkCurrentGameCompletion() {
        if (this.currentGame === 'html') {
            const htmlPieces = ['header', 'nav', 'main', 'article', 'aside', 'footer'];
            return htmlPieces.every(piece => this.completedPhases.includes(piece));
        } else if (this.currentGame === 'css') {
            return this.cssProgress && this.cssProgress.completed >= this.cssProgress.total;
        } else if (this.currentGame === 'js') {
            return this.jsProgress && this.jsProgress.completed >= this.jsProgress.total;
        }
        
        return false;
    }

    /**
     * Completa el juego actual y avanza al siguiente
     */
    completeCurrentGame() {
        const config = this.gameConfigs[this.currentGame];
        this.showNotification(config.completionMessage, 'success');
        
        if (this.currentGame === 'html') {
            this.addAchievement('🏗️', 'Maestro HTML', 'Has dominado la estructura HTML');
        } else if (this.currentGame === 'css') {
            this.addAchievement('🎨', 'Maestro CSS', 'Has dominado los estilos CSS');
        } else if (this.currentGame === 'js') {
            this.addAchievement('⚡', 'Maestro JavaScript', 'Has dominado la lógica JavaScript');
        }
        
        setTimeout(() => {
            this.advanceToNextGame();
        }, 3000);
    }
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const game = new HTMLSemanticGame();
    
    // Hacer el juego accesible globalmente para debugging
    window.HTMLGame = game;
    
    // Inicializar adaptabilidad del contenedor
    if (window.initContainerAdaptability) {
        window.initContainerAdaptability();
    }
    
    console.log('🚀 Aplicación cargada correctamente');
});

// Manejar errores globales
window.addEventListener('error', (event) => {
    console.error('❌ Error en la aplicación:', event.error);
});

// Log de carga del script
console.log('📜 Script main.js cargado');
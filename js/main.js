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
            level: '',
            score: 0,
            streak: 0,
            currentLevel: 1,
            experience: 0,
            maxExperience: 100,
            achievements: []
        };
        this.isGameStarted = false;
        this.validator = null;
        this.init();
    }

    /**
     * Inicializa el juego
     */
    init() {
        this.setupWelcomeScreen();
        console.log('🎮 Juego HTML Semántico iniciado');
    }

    /**
     * Configura la pantalla de bienvenida
     */
    setupWelcomeScreen() {
        // Inicializar validador
        this.validator = new FormValidator();
        
        const playerForm = document.getElementById('player-form');

        // Configurar validación en tiempo real
        this.setupRealTimeValidation();

        playerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePlayerRegistration(playerForm);
        });

        console.log('👋 Pantalla de bienvenida configurada');
    }

    /**
     * Configura la validación en tiempo real
     */
    setupRealTimeValidation() {
        const fields = ['playerName', 'playerEmail', 'playerLevel'];
        
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
        });

        console.log('⚡ Validación en tiempo real configurada');
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

        const validation = this.validator.validateField(fieldName, sanitizedValue);
        this.validator.showFieldFeedback(field, validation);
        
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
            'playerLevel': 'select'
        };
        return types[fieldName] || 'text';
    }

    /**
     * Actualiza el progreso del formulario
     */
    updateFormProgress() {
        if (!this.validator) return;

        const stats = this.validator.getStats();
        const progressFill = document.getElementById('form-progress-fill');
        const progressText = document.getElementById('form-progress-text');

        if (progressFill && progressText) {
            progressFill.style.width = `${stats.completionPercentage}%`;
            progressText.textContent = `${stats.completionPercentage}% completado (${stats.validFields}/${stats.totalFields} campos)`;
            
            // Efectos visuales según el progreso
            const progressBar = progressFill.parentElement;
            progressBar.classList.remove('progress-complete', 'progress-partial');
            
            if (stats.isComplete) {
                progressBar.classList.add('progress-complete');
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
        this.player.level = this.validator.sanitizeValue(formData.get('playerLevel'), 'select');

        // Guardar en localStorage para persistencia
        this.savePlayerData();

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
        this.setupElements();
        this.setupEventListeners();
        this.updatePlayerDisplay();
        this.updateStats();
        this.updateScoreBoard();
        this.addAchievement('🎯', 'Primer paso', 'Te has registrado exitosamente');
        this.isGameStarted = true;
        console.log('🎮 Juego inicializado');
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
        // Event listeners para las piezas
        this.pieces.forEach(piece => {
            piece.addEventListener('dragstart', (e) => this.handleDragStart(e));
            piece.addEventListener('dragend', (e) => this.handleDragEnd(e));
        });

        // Event listeners para las zonas de destino
        this.dropZones.forEach(zone => {
            zone.addEventListener('dragover', (e) => this.handleDragOver(e));
            zone.addEventListener('dragenter', (e) => this.handleDragEnter(e));
            zone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            zone.addEventListener('drop', (e) => this.handleDrop(e));
        });

        // Event listener para el botón de reset
        this.resetButton.addEventListener('click', () => this.resetGame());

        console.log('🔧 Event listeners configurados');
    }

    /**
     * Maneja el inicio del arrastre
     */
    handleDragStart(event) {
        const piece = event.target;
        const tagType = piece.getAttribute('data-tag');
        
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
        
        // Efectos visuales
        this.showFeedback(dropZone, true, '¡Excelente!');
        dropZone.classList.add('success-animation');
        
        // Remover animación después de un tiempo
        setTimeout(() => {
            dropZone.classList.remove('success-animation');
        }, 600);
        
        console.log(`✅ Colocación correcta: ${tagType}`);
        
        // Verificar si el juego está completo
        this.checkGameCompletion();
    }

    /**
     * Maneja una colocación incorrecta
     */
    handleIncorrectPlacement(dropZone) {
        // Actualizar puntaje (rompe la racha)
        this.updateScore(false);
        
        // Efectos visuales de error
        this.showFeedback(dropZone, false, '¡Intenta de nuevo!');
        dropZone.classList.add('error-animation');
        
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
        
        console.log('🎉 Juego completado');
    }

    /**
     * Reinicia el juego
     */
    resetGame() {
        console.log('🔄 Reiniciando juego...');
        
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
            } else if (this.player.streak === 5) {
                this.addAchievement('⚡', 'Imparable', 'Conseguiste 5 aciertos seguidos');
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
}

// Inicializar el juego cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const game = new HTMLSemanticGame();
    
    // Hacer el juego accesible globalmente para debugging
    window.HTMLGame = game;
    
    console.log('🚀 Aplicación cargada correctamente');
});

// Manejar errores globales
window.addEventListener('error', (event) => {
    console.error('❌ Error en la aplicación:', event.error);
});

// Log de carga del script
console.log('📜 Script main.js cargado');
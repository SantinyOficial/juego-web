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
        this.init();
    }

    /**
     * Inicializa el juego
     */
    init() {
        this.setupElements();
        this.setupEventListeners();
        this.updateStats();
        console.log('🎮 Juego HTML Semántico iniciado');
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
            this.showFeedback(dropZone, false, '¡Esta zona ya está ocupada!');
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
        
        alert(`🎉 ¡Felicitaciones! Has completado el juego.
        
📊 Estadísticas:
• Respuestas correctas: ${this.gameStats.correctPlacements}
• Total de intentos: ${this.gameStats.totalAttempts}
• Precisión: ${accuracy}%

¡Has aprendido sobre la estructura semántica de HTML!`);
        
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
            
            // Restaurar contenido original basado en el data-target
            const target = zone.getAttribute('data-target');
            const zoneLabels = {
                'header': 'Header Zone',
                'nav': 'Navigation Zone',
                'main': 'Main Zone',
                'article': 'Article Zone',
                'aside': 'Aside Zone',
                'footer': 'Footer Zone'
            };
            
            const descriptions = {
                'header': 'Encabezado principal de la página',
                'nav': 'Menú de navegación',
                'main': 'Contenido principal',
                'article': 'Contenido del artículo',
                'aside': 'Contenido lateral',
                'footer': 'Pie de página'
            };
            
            zone.innerHTML = `
                <span class="zone-label">${zoneLabels[target] || 'Zone'}</span>
                <small>${descriptions[target] || 'Zona de destino'}</small>
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
/**
 * Sistema de Audio Gaming
 * Gestiona todos los sonidos del juego con efectos inmersivos
 */

class GameAudioSystem {
    constructor() {
        this.audioContext = null;
        this.masterVolume = 0.7;
        this.sfxVolume = 0.8;
        this.musicVolume = 0.3;
        this.muted = false;
        this.sounds = new Map();
        this.loadedSounds = new Set();
        
        this.init();
    }

    /**
     * Inicializa el sistema de audio
     */
    async init() {
        try {
            // Crear contexto de audio
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Configurar sonidos del juego
            this.setupGameSounds();
            
            // Crear sonidos sintéticos si no hay archivos
            await this.createSyntheticSounds();
            
            console.log('🔊 Sistema de audio gaming inicializado');
        } catch (error) {
            console.warn('⚠️ Audio no disponible:', error);
            this.fallbackToBasicAudio();
        }
    }

    /**
     * Configura todos los sonidos del juego
     */
    setupGameSounds() {
        // Definición de sonidos con sus características
        this.soundDefinitions = {
            // Sonidos de interfaz
            'click': { 
                type: 'ui', 
                frequency: 800, 
                duration: 0.1, 
                volume: 0.3,
                description: 'Click genérico de botón'
            },
            'hover': { 
                type: 'ui', 
                frequency: 600, 
                duration: 0.05, 
                volume: 0.2,
                description: 'Hover sobre elementos interactivos'
            },
            'focus': { 
                type: 'ui', 
                frequency: 400, 
                duration: 0.08, 
                volume: 0.25,
                description: 'Focus en campos de formulario'
            },
            
            // Sonidos de validación
            'validation-success': { 
                type: 'feedback', 
                frequencies: [523, 659, 784], 
                duration: 0.3, 
                volume: 0.4,
                description: 'Campo validado correctamente'
            },
            'validation-error': { 
                type: 'feedback', 
                frequency: 200, 
                duration: 0.4, 
                volume: 0.5,
                description: 'Error de validación'
            },
            'form-complete': { 
                type: 'success', 
                frequencies: [523, 659, 784, 1047], 
                duration: 0.8, 
                volume: 0.6,
                description: 'Formulario completado'
            },
            
            // Sonidos de juego
            'drag-start': { 
                type: 'action', 
                frequency: 440, 
                duration: 0.15, 
                volume: 0.3,
                description: 'Inicio de arrastre'
            },
            'drag-over': { 
                type: 'action', 
                frequency: 550, 
                duration: 0.1, 
                volume: 0.2,
                description: 'Elemento sobre zona válida'
            },
            'drop-success': { 
                type: 'success', 
                frequencies: [659, 784, 988], 
                duration: 0.5, 
                volume: 0.7,
                description: 'Colocación correcta'
            },
            'drop-error': { 
                type: 'error', 
                frequency: 150, 
                duration: 0.6, 
                volume: 0.6,
                description: 'Colocación incorrecta'
            },
            
            // Sonidos de logros
            'achievement': { 
                type: 'celebration', 
                frequencies: [523, 659, 784, 1047, 1319], 
                duration: 1.2, 
                volume: 0.8,
                description: 'Logro desbloqueado'
            },
            'level-up': { 
                type: 'celebration', 
                frequencies: [392, 523, 659, 784, 1047], 
                duration: 1.5, 
                volume: 0.9,
                description: 'Subida de nivel'
            },
            'streak': { 
                type: 'bonus', 
                frequencies: [784, 988, 1175], 
                duration: 0.4, 
                volume: 0.6,
                description: 'Racha de aciertos'
            },
            
            // Sonidos especiales
            'game-complete': { 
                type: 'victory', 
                frequencies: [523, 659, 784, 1047, 1319, 1568], 
                duration: 2.0, 
                volume: 1.0,
                description: 'Juego completado'
            },
            'notification': { 
                type: 'info', 
                frequencies: [659, 784], 
                duration: 0.3, 
                volume: 0.5,
                description: 'Notificación general'
            },
            'reset': { 
                type: 'action', 
                frequency: 330, 
                duration: 0.3, 
                volume: 0.4,
                description: 'Reinicio del juego'
            }
        };
    }

    /**
     * Crea sonidos sintéticos usando Web Audio API
     */
    async createSyntheticSounds() {
        for (const [soundName, config] of Object.entries(this.soundDefinitions)) {
            try {
                const audioBuffer = await this.createSoundBuffer(config);
                this.sounds.set(soundName, audioBuffer);
                this.loadedSounds.add(soundName);
            } catch (error) {
                console.warn(`⚠️ No se pudo crear el sonido: ${soundName}`, error);
            }
        }
    }

    /**
     * Crea un buffer de audio sintético
     */
    async createSoundBuffer(config) {
        const sampleRate = this.audioContext.sampleRate;
        const length = sampleRate * config.duration;
        const buffer = this.audioContext.createBuffer(1, length, sampleRate);
        const data = buffer.getChannelData(0);

        if (config.frequencies) {
            // Sonido con múltiples frecuencias (acordes)
            this.createChordSound(data, config, sampleRate);
        } else {
            // Sonido de frecuencia única
            this.createToneSound(data, config, sampleRate);
        }

        return buffer;
    }

    /**
     * Crea un sonido de tono único
     */
    createToneSound(data, config, sampleRate) {
        const frequency = config.frequency;
        const duration = config.duration;

        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = this.createEnvelope(t, duration, config.type);
            
            // Generar onda con forma basada en el tipo
            let wave = 0;
            switch (config.type) {
                case 'ui':
                    wave = Math.sin(2 * Math.PI * frequency * t);
                    break;
                case 'error':
                    wave = Math.sin(2 * Math.PI * frequency * t) * 0.7 + 
                           Math.sin(2 * Math.PI * frequency * 0.5 * t) * 0.3;
                    break;
                case 'success':
                    wave = Math.sin(2 * Math.PI * frequency * t) * 0.8 + 
                           Math.sin(2 * Math.PI * frequency * 2 * t) * 0.2;
                    break;
                default:
                    wave = Math.sin(2 * Math.PI * frequency * t);
            }

            data[i] = wave * envelope * config.volume;
        }
    }

    /**
     * Crea un sonido con múltiples frecuencias (acorde)
     */
    createChordSound(data, config, sampleRate) {
        const frequencies = config.frequencies;
        const duration = config.duration;

        for (let i = 0; i < data.length; i++) {
            const t = i / sampleRate;
            const envelope = this.createEnvelope(t, duration, config.type);
            
            let wave = 0;
            // Mezclar todas las frecuencias
            frequencies.forEach((freq, index) => {
                const delay = index * 0.1; // Delay progresivo para efecto arpeggio
                if (t >= delay) {
                    const adjustedT = t - delay;
                    wave += Math.sin(2 * Math.PI * freq * adjustedT) / frequencies.length;
                }
            });

            data[i] = wave * envelope * config.volume;
        }
    }

    /**
     * Crea envelope (envolvente) para el sonido
     */
    createEnvelope(t, duration, type) {
        const attackTime = duration * 0.1;
        const decayTime = duration * 0.3;
        const sustainLevel = 0.7;
        const releaseTime = duration * 0.6;

        if (t < attackTime) {
            // Attack
            return t / attackTime;
        } else if (t < attackTime + decayTime) {
            // Decay
            const decayProgress = (t - attackTime) / decayTime;
            return 1 - (1 - sustainLevel) * decayProgress;
        } else if (t < duration - releaseTime) {
            // Sustain
            return sustainLevel;
        } else {
            // Release
            const releaseProgress = (t - (duration - releaseTime)) / releaseTime;
            return sustainLevel * (1 - releaseProgress);
        }
    }

    /**
     * Reproduce un sonido
     */
    async playSound(soundName, options = {}) {
        if (this.muted || !this.audioContext) return;

        try {
            // Reanudar contexto si está suspendido
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            const buffer = this.sounds.get(soundName);
            if (!buffer) {
                console.warn(`🔇 Sonido no encontrado: ${soundName}`);
                return;
            }

            // Crear source y conectar
            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();

            source.buffer = buffer;
            source.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            // Configurar volumen
            const volume = (options.volume ?? 1) * this.sfxVolume * this.masterVolume;
            gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);

            // Configurar pitch si se especifica
            if (options.pitch) {
                source.playbackRate.setValueAtTime(options.pitch, this.audioContext.currentTime);
            }

            // Reproducir
            source.start(0);

            // Log para debugging
            if (options.debug) {
                console.log(`🔊 Reproduciendo: ${soundName}`, {
                    volume: volume,
                    pitch: options.pitch || 1,
                    description: this.soundDefinitions[soundName]?.description
                });
            }

        } catch (error) {
            console.warn(`⚠️ Error reproduciendo sonido ${soundName}:`, error);
        }
    }

    /**
     * Reproduce secuencia de sonidos
     */
    async playSequence(sounds, interval = 100) {
        for (let i = 0; i < sounds.length; i++) {
            const sound = sounds[i];
            if (typeof sound === 'string') {
                this.playSound(sound);
            } else {
                this.playSound(sound.name, sound.options);
            }
            
            if (i < sounds.length - 1) {
                await this.delay(interval);
            }
        }
    }

    /**
     * Método auxiliar para delays
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Alterna el mute
     */
    toggleMute() {
        this.muted = !this.muted;
        console.log(`🔊 Audio ${this.muted ? 'silenciado' : 'activado'}`);
        return this.muted;
    }

    /**
     * Configura volumen master
     */
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        console.log(`🔊 Volumen master: ${Math.round(this.masterVolume * 100)}%`);
    }

    /**
     * Fallback para navegadores sin Web Audio API
     */
    fallbackToBasicAudio() {
        console.log('🔄 Usando sistema de audio básico');
        
        // Crear sonidos simples usando HTMLAudioElement con data URLs
        this.createBasicSounds();
    }

    /**
     * Crea sonidos básicos para fallback
     */
    createBasicSounds() {
        // Implementación básica para navegadores legacy
        this.playSound = (soundName, options = {}) => {
            if (this.muted) return;
            
            // Crear beep básico
            const duration = 100;
            const volume = 0.3;
            
            try {
                const oscillator = new (window.AudioContext || window.webkitAudioContext)();
                // Fallback muy básico si es necesario
                console.log(`🔔 Sonido: ${soundName}`);
            } catch (e) {
                // Silenciar si no hay soporte de audio
            }
        };
    }

    /**
     * Obtiene información del sistema de audio
     */
    getSystemInfo() {
        return {
            audioContextSupported: !!this.audioContext,
            state: this.audioContext?.state,
            sampleRate: this.audioContext?.sampleRate,
            loadedSounds: Array.from(this.loadedSounds),
            volumes: {
                master: this.masterVolume,
                sfx: this.sfxVolume,
                music: this.musicVolume
            },
            muted: this.muted
        };
    }
}

// Crear instancia global
window.GameAudio = new GameAudioSystem();

// Auto-inicializar cuando se carga el script
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Sistema de audio gaming cargado');
});

console.log('🎼 Script de audio cargado');
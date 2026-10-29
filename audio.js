// ============================================================================
// BATTLE OF WELLBEING (ศึกชิงสุขภาพดี) - Offline Web Audio Synthesizer & TTS
// 100% offline procedural sound effects & cozy background music (Web Audio API)
// ============================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.bgmEnabled = false;
    this.volume = 0.7;
    this.bgmInterval = null;
    this.bgmStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, parseFloat(val)));
  }

  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled;
    if (this.sfxEnabled) this.playClick();
    return this.sfxEnabled;
  }

  toggleBGM() {
    this.init();
    this.bgmEnabled = !this.bgmEnabled;
    if (this.bgmEnabled) {
      this.startBGM();
    } else {
      this.stopBGM();
    }
    return this.bgmEnabled;
  }

  // Helper to play a musical note with envelope
  playTone({
    freq = 440,
    type = 'sine',
    duration = 0.15,
    delay = 0,
    gain = 0.25,
    slideTo = null,
  }) {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), now + duration);
    }

    const finalGain = Math.max(0.0001, gain * this.volume);
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(finalGain, now + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  // Soft noise burst for dice clatter / card flip whoosh
  playNoise({ duration = 0.08, delay = 0, gain = 0.15, filterFreq = 1200 }) {
    if (!this.sfxEnabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime + delay;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq, now);
    filter.Q.setValueAtTime(1.5, now);

    const gainNode = this.ctx.createGain();
    const finalGain = Math.max(0.0001, gain * this.volume);
    gainNode.gain.setValueAtTime(finalGain, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  }

  // UI Button Click
  playClick() {
    this.playTone({ freq: 580, slideTo: 780, type: 'triangle', duration: 0.07, gain: 0.2 });
  }

  // 4-Sided Die Roll Clatter & Reveal
  playDiceRoll() {
    for (let i = 0; i < 7; i++) {
      const delay = i * 0.075;
      const pitch = 300 + Math.random() * 350;
      this.playNoise({ duration: 0.045, delay, gain: 0.18, filterFreq: 1600 + i * 180 });
      this.playTone({
        freq: pitch,
        slideTo: pitch * 1.25,
        type: 'triangle',
        duration: 0.05,
        delay,
        gain: 0.15,
      });
    }
  }

  // Die lands on final number (1-4)
  playDiceLand(value = 4) {
    const baseFreq = 440 + value * 65;
    this.playTone({ freq: baseFreq, type: 'triangle', duration: 0.18, gain: 0.3 });
    this.playTone({ freq: baseFreq * 1.5, type: 'sine', duration: 0.25, delay: 0.06, gain: 0.28 });
  }

  // Pawn Hop Step on Board
  playStep(stepIndex = 0) {
    const scale = [523.25, 587.33, 659.25, 783.99, 880.0];
    const freq = scale[stepIndex % scale.length];
    this.playTone({
      freq: freq * 0.75,
      slideTo: freq * 1.15,
      type: 'sine',
      duration: 0.11,
      gain: 0.26,
    });
  }

  // Card Draw & 3D Flip
  playCardFlip() {
    this.playNoise({ duration: 0.14, delay: 0, gain: 0.22, filterFreq: 950 });
    this.playTone({ freq: 523.25, type: 'sine', duration: 0.14, delay: 0.05, gain: 0.2 });
    this.playTone({ freq: 659.25, type: 'sine', duration: 0.16, delay: 0.12, gain: 0.22 });
    this.playTone({ freq: 783.99, type: 'triangle', duration: 0.24, delay: 0.19, gain: 0.25 });
  }

  // Token Earned / Mission Completed (+1, +2, +3, or Bonus)
  playTokenGain(count = 1) {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    for (let i = 0; i < Math.min(4, count + 1); i++) {
      this.playTone({
        freq: notes[i],
        type: 'triangle',
        duration: 0.22,
        delay: i * 0.08,
        gain: 0.28,
      });
      // High coin shimmer
      this.playTone({
        freq: notes[i] * 2,
        type: 'sine',
        duration: 0.18,
        delay: i * 0.08 + 0.03,
        gain: 0.12,
      });
    }
  }

  // Token Penalty / Mission Skipped (-2 tokens)
  playTokenPenalty() {
    this.playTone({ freq: 392.0, slideTo: 349.23, type: 'sawtooth', duration: 0.22, gain: 0.18 });
    this.playTone({
      freq: 329.63,
      slideTo: 261.63,
      type: 'sawtooth',
      duration: 0.35,
      delay: 0.2,
      gain: 0.2,
    });
  }

  // Landing on BONUS corner space
  playBonusFanfare() {
    const chord = [523.25, 659.25, 783.99, 987.77, 1046.5];
    chord.forEach((freq, idx) => {
      this.playTone({
        freq,
        type: 'triangle',
        duration: 0.28,
        delay: idx * 0.07,
        gain: 0.26,
      });
    });
  }

  // Timer tick sound
  playTick(urgent = false) {
    this.playTone({
      freq: urgent ? 880 : 660,
      type: 'sine',
      duration: 0.04,
      gain: urgent ? 0.22 : 0.12,
    });
  }

  // Game Over / Winner Victory Fanfare
  playVictoryFanfare() {
    const melody = [
      { f: 523.25, d: 0.14, t: 0.0 },
      { f: 523.25, d: 0.14, t: 0.15 },
      { f: 523.25, d: 0.14, t: 0.3 },
      { f: 659.25, d: 0.35, t: 0.45 },
      { f: 587.33, d: 0.22, t: 0.82 },
      { f: 659.25, d: 0.22, t: 1.06 },
      { f: 783.99, d: 0.6, t: 1.3 },
      { f: 1046.5, d: 0.8, t: 1.45 },
    ];
    melody.forEach((n) => {
      this.playTone({
        freq: n.f,
        type: 'triangle',
        duration: n.d,
        delay: n.t,
        gain: 0.3,
      });
    });
  }

  // Cozy Marimba-like Procedural BGM
  startBGM() {
    this.stopBGM();
    if (!this.bgmEnabled) return;
    this.init();

    // Pentatonic C major / A minor soothing progression
    const pattern = [
      523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 587.33,
      523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 392.0,
    ];
    const bassPattern = [261.63, 220.0, 174.61, 196.0];

    this.bgmStep = 0;
    this.bgmInterval = setInterval(() => {
      if (!this.bgmEnabled || !this.ctx) return;
      const note = pattern[this.bgmStep % pattern.length];
      const now = this.ctx.currentTime;

      // Melody marimba tone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, now);

      const gVal = Math.max(0.0001, 0.06 * this.volume);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(gVal, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);

      // Soft bass every 4 steps
      if (this.bgmStep % 4 === 0) {
        const bassNote = bassPattern[Math.floor(this.bgmStep / 4) % bassPattern.length];
        const bOsc = this.ctx.createOscillator();
        const bGain = this.ctx.createGain();
        bOsc.type = 'triangle';
        bOsc.frequency.setValueAtTime(bassNote, now);
        const bgVal = Math.max(0.0001, 0.045 * this.volume);
        bGain.gain.setValueAtTime(0.0001, now);
        bGain.gain.linearRampToValueAtTime(bgVal, now + 0.04);
        bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
        bOsc.connect(bGain);
        bGain.connect(this.ctx.destination);
        bOsc.start(now);
        bOsc.stop(now + 0.95);
      }

      this.bgmStep++;
    }, 360);
  }

  stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  // Optional Thai Text-to-Speech (offline browser voice if available)
  speakThai(text) {
    if (!('speechSynthesis' in window)) return false;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'th-TH';
    utter.rate = 0.95;
    utter.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const thaiVoice = voices.find((v) => v.lang && v.lang.toLowerCase().includes('th'));
    if (thaiVoice) utter.voice = thaiVoice;
    window.speechSynthesis.speak(utter);
    return true;
  }
}

window.soundEngine = new SoundEngine();

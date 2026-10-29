// ============================================================================
// BATTLE OF WELLBEING (ศึกชิงสุขภาพดี)
// Main Controller: Isometric Island Board (Ref 1) + Open-Book Diary UI (Ref 2)
// ============================================================================

const BOARD_TILES = [
  // Bottom-Left Corner (Tile 0)
  { index: 0, type: 'start', label: 'START!', row: 9, col: 1, side: 'corner' },

  // Left Column: Bottom to Top (Tiles 1..7)
  { index: 1, type: 'color', color: 'blue', row: 8, col: 1, side: 'left', arrow: '↑' },
  { index: 2, type: 'color', color: 'red', row: 7, col: 1, side: 'left', arrow: '↑' },
  { index: 3, type: 'color', color: 'green', row: 6, col: 1, side: 'left', arrow: '↑' },
  { index: 4, type: 'color', color: 'yellow', row: 5, col: 1, side: 'left', arrow: '↑' },
  { index: 5, type: 'color', color: 'red', row: 4, col: 1, side: 'left', arrow: '↑' },
  { index: 6, type: 'color', color: 'blue', row: 3, col: 1, side: 'left', arrow: '↑' },
  { index: 7, type: 'color', color: 'green', row: 2, col: 1, side: 'left', arrow: '↑' },

  // Top-Left Corner (Tile 8)
  { index: 8, type: 'bonus', label: 'BONUS', row: 1, col: 1, side: 'corner' },

  // Top Row: Left to Right (Tiles 9..15)
  { index: 9, type: 'color', color: 'green', row: 1, col: 2, side: 'top', arrow: '→' },
  { index: 10, type: 'color', color: 'red', row: 1, col: 3, side: 'top', arrow: '→' },
  { index: 11, type: 'color', color: 'yellow', row: 1, col: 4, side: 'top', arrow: '→' },
  { index: 12, type: 'color', color: 'blue', row: 1, col: 5, side: 'top', arrow: '→' },
  { index: 13, type: 'color', color: 'green', row: 1, col: 6, side: 'top', arrow: '→' },
  { index: 14, type: 'color', color: 'yellow', row: 1, col: 7, side: 'top', arrow: '→' },
  { index: 15, type: 'color', color: 'red', row: 1, col: 8, side: 'top', arrow: '→' },

  // Top-Right Corner (Tile 16)
  { index: 16, type: 'bonus', label: 'BONUS', row: 1, col: 9, side: 'corner' },

  // Right Column: Top to Bottom (Tiles 17..23)
  { index: 17, type: 'color', color: 'green', row: 2, col: 9, side: 'right', arrow: '↓' },
  { index: 18, type: 'color', color: 'blue', row: 3, col: 9, side: 'right', arrow: '↓' },
  { index: 19, type: 'color', color: 'red', row: 4, col: 9, side: 'right', arrow: '↓' },
  { index: 20, type: 'color', color: 'yellow', row: 5, col: 9, side: 'right', arrow: '↓' },
  { index: 21, type: 'color', color: 'green', row: 6, col: 9, side: 'right', arrow: '↓' },
  { index: 22, type: 'color', color: 'yellow', row: 7, col: 9, side: 'right', arrow: '↓' },
  { index: 23, type: 'color', color: 'blue', row: 8, col: 9, side: 'right', arrow: '↓' },

  // Bottom-Right Corner (Tile 24)
  { index: 24, type: 'bonus', label: 'BONUS', row: 9, col: 9, side: 'corner' },

  // Bottom Row: Right to Left (Tiles 25..31)
  { index: 25, type: 'color', color: 'red', row: 9, col: 8, side: 'bottom', arrow: '←' },
  { index: 26, type: 'color', color: 'blue', row: 9, col: 7, side: 'bottom', arrow: '←' },
  { index: 27, type: 'color', color: 'yellow', row: 9, col: 6, side: 'bottom', arrow: '←' },
  { index: 28, type: 'color', color: 'blue', row: 9, col: 5, side: 'bottom', arrow: '←' },
  { index: 29, type: 'color', color: 'red', row: 9, col: 4, side: 'bottom', arrow: '←' },
  { index: 30, type: 'color', color: 'green', row: 9, col: 3, side: 'bottom', arrow: '←' },
  { index: 31, type: 'color', color: 'yellow', row: 9, col: 2, side: 'bottom', arrow: '←' },
];

const PLAYER_PRESETS = [
  { name: 'ผู้เล่น 1', age: 25, avatar: '🧒', color: '#ff595e', bg: '#72ddf7', handle: '@SUNNY_RUNNER' },
  { name: 'ผู้เล่น 2', age: 23, avatar: '🤖', color: '#8338ec', bg: '#b892ff', handle: '@ROBO_MIND' },
  { name: 'ผู้เล่น 3', age: 21, avatar: '🦊', color: '#38b000', bg: '#9ef01a', handle: '@FOXY_FRIEND' },
  { name: 'ผู้เล่น 4', age: 20, avatar: '🐰', color: '#ff9f1c', bg: '#ffbf69', handle: '@BUNNY_GOAL' },
  { name: 'ผู้เล่น 5', age: 19, avatar: '🐼', color: '#3a86ff', bg: '#90e0ef', handle: '@PANDA_PEACE' },
];

const AVATAR_CHOICES = ['🧒', '🤖', '🦊', '🐰', '🐼', '🦁', '🐸', '🦄', '🐯', '🐨'];

class WellbeingGame {
  constructor() {
    this.playerCount = 3;
    this.sortByAge = true;
    this.setupPlayers = JSON.parse(JSON.stringify(PLAYER_PRESETS));

    this.players = [];
    this.centralPool = 24;
    this.maxPool = 30;
    this.currentPlayerIdx = 0;
    this.diaryPlayerIdx = 0;
    this.turnNumber = 1;
    this.phase = 'SETUP'; // SETUP | READY_TO_ROLL | ROLLING | MOVING | CARD_MODAL | BONUS_MODAL | GAME_OVER

    this.allCards = window.loadAllCards();
    this.decks = { red: [], blue: [], green: [], yellow: [] };
    this.activeCard = null;
    this.activeCategory = null;

    this.timerInterval = null;
    this.timerSeconds = 0;
    this.editorCategory = 'green';
  }

  init() {
    window.fxEngine.init();
    this.renderBoardGrid();
    this.renderSetupPlayers();
    this.bindEvents();
    this.initCamera();
    this.updateAudioButtons();
  }

  // ==========================================================================
  // 3D CAMERA: DRAG TO ROTATE / TILT, WHEEL OR PINCH TO ZOOM, RIGHT-DRAG TO PAN
  // ==========================================================================
  initCamera() {
    const isMobile = window.innerWidth <= 768;
    this.camDefaults = { rot: -43, tilt: 54, zoom: isMobile ? 0.82 : 1, panX: 0, panY: isMobile ? -14 : 0 };
    this.cam = { ...this.camDefaults };
    this.camViewport = document.querySelector('.iso-viewport');
    const vp = this.camViewport;
    if (!vp) return;

    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const pointers = new Map();
    let drag = null;
    let pinch = null;
    this.camSuppressClick = false;

    const isExcluded = (target) =>
      Boolean(
        target.closest(
          'button, input, select, textarea, .trampoline-dice-station, .bottom-left-dock, .bottom-right-round-controls, .top-hud-bar, .player-medallions-layer, .modal-backdrop, #original-board-overlay'
        )
      );

    vp.addEventListener('pointerdown', (e) => {
      if (isExcluded(e.target)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 1) {
        drag = {
          x: e.clientX,
          y: e.clientY,
          rot: this.cam.rot,
          tilt: this.cam.tilt,
          panX: this.cam.panX,
          panY: this.cam.panY,
          mode: e.button === 2 || e.shiftKey ? 'pan' : 'rotate',
          moved: false,
        };
      } else if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, zoom: this.cam.zoom };
        if (drag) drag.moved = true;
        vp.classList.add('cam-dragging');
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      // Two-finger pinch zoom (touch screens / tablets)
      if (pointers.size >= 2 && pinch) {
        const [a, b] = [...pointers.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
        this.cam.zoom = clamp(pinch.zoom * (dist / pinch.dist), 0.5, 2.4);
        this.applyCamera();
        return;
      }

      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 5) return;
      if (!drag.moved) {
        drag.moved = true;
        vp.classList.add('cam-dragging');
      }

      if (drag.mode === 'pan') {
        this.cam.panX = drag.panX + dx;
        this.cam.panY = drag.panY + dy;
      } else {
        this.cam.rot = drag.rot + dx * 0.4;
        this.cam.tilt = clamp(drag.tilt - dy * 0.3, 0, 75);
      }
      this.applyCamera();
    });

    const endPointer = (e) => {
      if (!pointers.has(e.pointerId)) return;
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      if (pointers.size === 0) {
        if (drag && drag.moved) {
          // Swallow the click that follows a drag so tiles/decks don't trigger
          this.camSuppressClick = true;
          setTimeout(() => {
            this.camSuppressClick = false;
          }, 0);
        }
        drag = null;
        vp.classList.remove('cam-dragging');
      }
    };
    window.addEventListener('pointerup', endPointer);
    window.addEventListener('pointercancel', endPointer);

    vp.addEventListener(
      'click',
      (e) => {
        if (this.camSuppressClick) {
          if (!isExcluded(e.target)) {
            e.stopPropagation();
            e.preventDefault();
          }
          this.camSuppressClick = false;
        }
      },
      true
    );

    // Right-click drag = pan (disable context menu on the board)
    vp.addEventListener('contextmenu', (e) => e.preventDefault());

    // Mouse wheel / trackpad pinch zoom
    vp.addEventListener(
      'wheel',
      (e) => {
        if (isExcluded(e.target)) return;
        e.preventDefault();
        const factor = Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0015));
        this.setCameraZoom(this.cam.zoom * factor);
      },
      { passive: false }
    );

    // Double-click empty ocean to reset the camera
    vp.addEventListener('dblclick', (e) => {
      if (e.target.closest('.board-tile, .center-deck-slot, button')) return;
      this.resetCamera();
    });

    // Camera control buttons
    const bind = (id, fn) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', () => {
        window.soundEngine.playClick();
        fn();
      });
    };
    bind('cam-rot-left', () => this.rotateCamera(-45));
    bind('cam-rot-right', () => this.rotateCamera(45));
    bind('cam-zoom-in', () => this.setCameraZoom(this.cam.zoom * 1.2));
    bind('cam-zoom-out', () => this.setCameraZoom(this.cam.zoom / 1.2));
    bind('cam-reset', () => this.resetCamera());
    bind('cam-tilt-toggle', () => {
      this.cam.tilt = this.cam.tilt > 20 ? 0 : this.camDefaults.tilt;
      this.applyCamera();
    });

    // Keyboard shortcuts (ignored while typing or when a modal is open)
    window.addEventListener('keydown', (e) => {
      const tag = document.activeElement ? document.activeElement.tagName : '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (document.querySelector('.modal-backdrop:not(.hidden)')) return;

      switch (e.key) {
        case 'q':
        case 'Q':
        case 'ArrowLeft':
          this.rotateCamera(-45);
          break;
        case 'e':
        case 'E':
        case 'ArrowRight':
          this.rotateCamera(45);
          break;
        case 'ArrowUp':
          this.cam.tilt = clamp(this.cam.tilt + 10, 0, 75);
          this.applyCamera();
          break;
        case 'ArrowDown':
          this.cam.tilt = clamp(this.cam.tilt - 10, 0, 75);
          this.applyCamera();
          break;
        case '+':
        case '=':
          this.setCameraZoom(this.cam.zoom * 1.2);
          break;
        case '-':
        case '_':
          this.setCameraZoom(this.cam.zoom / 1.2);
          break;
        case 'r':
        case 'R':
          this.resetCamera();
          break;
        default:
          return;
      }
      e.preventDefault();
    });

    this.applyCamera();
  }

  rotateCamera(deg) {
    this.cam.rot += deg;
    this.applyCamera();
  }

  setCameraZoom(z) {
    this.cam.zoom = Math.max(0.5, Math.min(2.4, z));
    this.applyCamera();
  }

  resetCamera() {
    // Keep rotation continuous so it spins back the short way
    const turns = Math.round((this.cam.rot - this.camDefaults.rot) / 360);
    this.cam = { ...this.camDefaults, rot: this.camDefaults.rot + turns * 360 };
    this.applyCamera();
  }

  applyCamera() {
    const vp = this.camViewport;
    if (!vp) return;
    const c = this.cam;
    vp.style.setProperty('--cam-rot', `${c.rot}deg`);
    vp.style.setProperty('--cam-tilt', `${c.tilt}deg`);
    vp.style.setProperty('--cam-zoom', `${c.zoom}`);
    vp.style.setProperty('--cam-pan-x', `${c.panX}px`);
    vp.style.setProperty('--cam-pan-y', `${c.panY}px`);

    const zoomLabel = document.getElementById('cam-zoom-label');
    if (zoomLabel) zoomLabel.textContent = `${Math.round(c.zoom * 100)}%`;

    const tiltBtn = document.getElementById('cam-tilt-toggle');
    if (tiltBtn) tiltBtn.textContent = c.tilt > 20 ? '📐 3D' : '🗺️ 2D';
  }

  bindEvents() {
    // Player count selector buttons (3, 4, 5 players)
    document.querySelectorAll('.player-count-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        this.playerCount = parseInt(btn.dataset.count, 10);
        document.querySelectorAll('.player-count-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const totalTokens = this.playerCount * 10;
        const poolAfterDeal = totalTokens - this.playerCount * 2;
        document.getElementById('setup-token-summary').innerHTML =
          `🪙 ผู้เล่น <b>${this.playerCount} คน</b> • โทเคนรวม <b>${totalTokens} โทเคน</b><br/>` +
          `(แจกเริ่มต้นคนละ 2 โทเคน • คงเหลือในกองกลาง <b>${poolAfterDeal} โทเคน</b>)`;
        this.renderSetupPlayers();
      });
    });

    const sortCheck = document.getElementById('sort-by-age-check');
    if (sortCheck) {
      sortCheck.addEventListener('change', (e) => {
        this.sortByAge = e.target.checked;
      });
    }

    // Start Game button (Touch & Click support)
    const startBtn = document.getElementById('start-game-btn');
    if (startBtn) {
      const handleStart = (e) => {
        if (e && e.cancelable && e.type !== 'click') e.preventDefault();
        window.soundEngine.init();
        window.soundEngine.playClick();
        this.startNewGame();
      };
      startBtn.addEventListener('click', handleStart);
      startBtn.addEventListener('touchend', handleStart, { passive: false });
    }

    // Roll D4 via Trampoline Pad, Button, Station, Turn Banner, or Spacebar
    let lastRollTime = 0;
    const triggerRoll = (e) => {
      const now = Date.now();
      if (now - lastRollTime < 400) return;
      lastRollTime = now;

      if (e) {
        if (e.cancelable && e.type !== 'click') e.preventDefault();
        e.stopPropagation();
      }

      window.soundEngine.init();

      if (this.phase !== 'READY_TO_ROLL') {
        if (this.phase === 'SETUP') {
          this.showToast('กรุณากดปุ่ม "เริ่มออกเดินทาง" ในหน้าต่างตั้งค่าก่อนครับ');
        } else if (this.phase === 'CARD_MODAL') {
          this.showToast('กำลังทำภารกิจการ์ดอยู่ กรุณาเลือกผลลัพธ์ในการ์ดก่อนครับ');
        }
        return;
      }

      this.handleRollClick();
    };

    const rollBtn = document.getElementById('roll-dice-btn');
    const d4Wrapper = document.getElementById('d4-3d-wrapper');
    const d4Pyramid = document.getElementById('d4-pyramid');
    const trampolinePad = document.getElementById('trampoline-pad');
    const turnBanner = document.getElementById('current-turn-banner');

    [rollBtn, d4Wrapper, d4Pyramid, trampolinePad].forEach((el) => {
      if (!el) return;
      el.addEventListener('click', triggerRoll);
      el.addEventListener('touchend', triggerRoll, { passive: false });
    });

    if (turnBanner) {
      turnBanner.style.cursor = 'pointer';
      turnBanner.title = 'แตะเพื่อทอยลูกเต๋า 4 หน้า';
      turnBanner.addEventListener('click', () => {
        if (this.phase === 'READY_TO_ROLL') triggerRoll();
      });
      turnBanner.addEventListener('touchend', (e) => {
        if (this.phase === 'READY_TO_ROLL') triggerRoll(e);
      }, { passive: false });
    }

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && this.phase === 'READY_TO_ROLL') {
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
          e.preventDefault();
          this.handleRollClick();
        }
      }
    });

    // Click 3D card to flip front/back
    const cardStage = document.querySelector('.card-3d-stage');
    if (cardStage) {
      cardStage.addEventListener('click', (e) => {
        if (e.target.closest('#card-secret-cover')) return;
        window.soundEngine.playCardFlip();
        document.getElementById('card-flip-inner').classList.toggle('flipped');
      });
    }

    const secretCover = document.getElementById('card-secret-cover');
    if (secretCover) {
      secretCover.addEventListener('click', () => {
        window.soundEngine.playClick();
        secretCover.classList.add('hidden');
      });
    }

    // Bonus Roll button (Touch & Click)
    const bonusRollBtn = document.getElementById('bonus-roll-btn');
    if (bonusRollBtn) {
      const handleBonusRoll = (e) => {
        if (e && e.cancelable && e.type !== 'click') e.preventDefault();
        window.soundEngine.init();
        this.executeBonusRoll();
      };
      bonusRollBtn.addEventListener('click', handleBonusRoll);
      bonusRollBtn.addEventListener('touchend', handleBonusRoll, { passive: false });
    }

    // Diary Modal Open / Close / Prev / Next Player
    document.getElementById('btn-open-diary').addEventListener('click', () => {
      window.soundEngine.playCardFlip();
      this.openPlayerDiary(this.currentPlayerIdx);
    });
    document.getElementById('close-diary-btn').addEventListener('click', () => {
      window.soundEngine.playClick();
      document.getElementById('diary-modal').classList.add('hidden');
    });
    document.getElementById('diary-prev-player').addEventListener('click', () => {
      if (!this.players.length) return;
      window.soundEngine.playCardFlip();
      this.diaryPlayerIdx = (this.diaryPlayerIdx - 1 + this.players.length) % this.players.length;
      this.renderDiaryModalContent();
    });
    document.getElementById('diary-next-player').addEventListener('click', () => {
      if (!this.players.length) return;
      window.soundEngine.playCardFlip();
      this.diaryPlayerIdx = (this.diaryPlayerIdx + 1) % this.players.length;
      this.renderDiaryModalContent();
    });

    // Audio & Bottom-Right Round Arcade Buttons
    document.getElementById('btn-toggle-sfx').addEventListener('click', () => {
      window.soundEngine.toggleSFX();
      this.updateAudioButtons();
    });

    document.getElementById('btn-toggle-bgm').addEventListener('click', () => {
      window.soundEngine.toggleBGM();
      this.updateAudioButtons();
    });

    const volSlider = document.getElementById('volume-slider');
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        window.soundEngine.setVolume(e.target.value);
      });
    }

    // Rules modal
    document.querySelectorAll('.open-rules-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.soundEngine.playCardFlip();
        document.getElementById('rules-modal').classList.remove('hidden');
      });
    });
    document.getElementById('close-rules-btn').addEventListener('click', () => {
      window.soundEngine.playClick();
      document.getElementById('rules-modal').classList.add('hidden');
    });

    // Card Editor modal
    document.querySelectorAll('.open-card-editor-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.soundEngine.playCardFlip();
        this.openCardEditor();
      });
    });
    document.getElementById('close-card-editor-btn').addEventListener('click', () => {
      window.soundEngine.playClick();
      document.getElementById('card-editor-modal').classList.add('hidden');
    });

    document.querySelectorAll('.editor-cat-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        window.soundEngine.playClick();
        document.querySelectorAll('.editor-cat-tab').forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        this.editorCategory = tab.dataset.cat;
        this.renderCardEditorList();
        this.populateBulkTextarea();
      });
    });

    document.querySelectorAll('.editor-mode-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        document.querySelectorAll('.editor-mode-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;
        document.getElementById('editor-visual-pane').classList.toggle('hidden', mode !== 'visual');
        document.getElementById('editor-bulk-pane').classList.toggle('hidden', mode !== 'bulk');
        if (mode === 'bulk') {
          this.populateBulkTextarea();
        }
      });
    });

    document.getElementById('save-cards-btn').addEventListener('click', () => {
      this.saveEditorChanges();
    });

    document.getElementById('apply-bulk-paste-btn').addEventListener('click', () => {
      this.applyBulkTextPaste();
    });

    document.getElementById('reset-default-cards-btn').addEventListener('click', () => {
      if (confirm('ต้องการรีเซ็ตการ์ดทั้ง 40 ใบกลับเป็นค่าเริ่มต้นใช่หรือไม่?')) {
        this.allCards = window.resetAllCardsToDefault();
        this.rebuildShuffledDecks();
        this.renderCardEditorList();
        this.populateBulkTextarea();
        window.soundEngine.playTokenGain(2);
        this.showToast('รีเซ็ตการ์ดทั้ง 40 ใบกลับเป็นค่าเริ่มต้นเรียบร้อย!');
      }
    });

    // Speak Thai TTS button on Card Modal
    document.getElementById('tts-read-card-btn').addEventListener('click', () => {
      if (!this.activeCard) return;
      const tiersText = this.activeCard.tiers.map((t) => t.label).join(' ... ');
      const fullSpeech = `${this.activeCard.title} ... ${tiersText} ... หรือ ${this.activeCard.penaltyLabel}`;
      window.soundEngine.speakThai(fullSpeech);
    });

    // Mission Stopwatch / Timer buttons
    document.querySelectorAll('.mission-timer-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const secs = parseInt(btn.dataset.seconds, 10);
        this.startMissionTimer(secs);
      });
    });

    // New Game / Setup button
    document.getElementById('btn-new-game').addEventListener('click', () => {
      window.soundEngine.playClick();
      window.fxEngine.stopVictoryFireworks();
      document.getElementById('victory-modal').classList.add('hidden');
      document.getElementById('setup-modal').classList.remove('hidden');
      this.phase = 'SETUP';
    });

    document.getElementById('play-again-btn').addEventListener('click', () => {
      window.soundEngine.playClick();
      window.fxEngine.stopVictoryFireworks();
      document.getElementById('victory-modal').classList.add('hidden');
      document.getElementById('setup-modal').classList.remove('hidden');
      this.phase = 'SETUP';
    });

    // Original Board Reference toggle
    document.getElementById('btn-toggle-board-ref').addEventListener('click', () => {
      window.soundEngine.playClick();
      const overlay = document.getElementById('original-board-overlay');
      overlay.classList.toggle('hidden');
    });
  }

  updateAudioButtons() {
    const sfxBtn = document.getElementById('btn-toggle-sfx');
    const bgmBtn = document.getElementById('btn-toggle-bgm');
    if (sfxBtn) {
      sfxBtn.textContent = window.soundEngine.sfxEnabled ? '🔊' : '🔇';
      sfxBtn.classList.toggle('muted', !window.soundEngine.sfxEnabled);
    }
    if (bgmBtn) {
      bgmBtn.classList.toggle('muted', !window.soundEngine.bgmEnabled);
    }
  }

  // ==========================================================================
  // SETUP SCREEN RENDERING (Open-Book Party Setup)
  // ==========================================================================
  renderSetupPlayers() {
    const container = document.getElementById('setup-players-list');
    container.innerHTML = '';

    const activeSlice = this.setupPlayers.slice(0, this.playerCount);
    const maxAge = Math.max(...activeSlice.map((p) => Number(p.age) || 0));

    for (let i = 0; i < this.playerCount; i++) {
      const p = this.setupPlayers[i];
      const isOldest = Number(p.age) === maxAge;
      const row = document.createElement('div');
      row.className = 'setup-player-row';
      row.style.borderLeftColor = p.color;

      const avatarButtons = AVATAR_CHOICES.map(
        (av) =>
          `<button type="button" class="avatar-pick-btn ${p.avatar === av ? 'selected' : ''}" data-idx="${i}" data-avatar="${av}">${av}</button>`
      ).join('');

      row.innerHTML = `
        <div class="setup-player-num" style="background:${p.color}">${i + 1}</div>
        <div class="setup-player-fields">
          <div class="setup-field-group">
            <label>ชื่อผู้เล่น ${isOldest ? '👑 เริ่มก่อน' : ''}</label>
            <input type="text" class="setup-name-input" data-idx="${i}" value="${p.name}" maxlength="16" />
          </div>
          <div class="setup-field-group">
            <label>อายุ (ปี)</label>
            <input type="number" class="setup-age-input" data-idx="${i}" value="${p.age}" min="3" max="120" />
          </div>
          <div class="setup-field-group">
            <label>ตัวละคร</label>
            <div class="avatar-picker-row">${avatarButtons}</div>
          </div>
        </div>
      `;
      container.appendChild(row);
    }

    container.querySelectorAll('.setup-name-input').forEach((inp) => {
      inp.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        this.setupPlayers[idx].name = e.target.value.trim() || `ผู้เล่น ${idx + 1}`;
      });
    });

    container.querySelectorAll('.setup-age-input').forEach((inp) => {
      inp.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        this.setupPlayers[idx].age = parseInt(e.target.value, 10) || 20;
        this.renderSetupPlayers();
      });
    });

    container.querySelectorAll('.avatar-pick-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        const idx = parseInt(btn.dataset.idx, 10);
        this.setupPlayers[idx].avatar = btn.dataset.avatar;
        this.renderSetupPlayers();
      });
    });
  }

  // ==========================================================================
  // 3D ISOMETRIC BOARD RENDERING (Matches Reference 1 + board.jpg)
  // ==========================================================================
  renderBoardGrid() {
    const grid = document.getElementById('board-grid');
    grid.querySelectorAll('.board-tile').forEach((el) => el.remove());

    BOARD_TILES.forEach((tile) => {
      const el = document.createElement('div');
      el.className = `board-tile tile-${tile.type} side-${tile.side}`;
      el.id = `tile-${tile.index}`;
      el.style.gridRow = tile.row;
      el.style.gridColumn = tile.col;

      if (tile.type === 'color') {
        const meta = window.CATEGORY_META[tile.color];
        el.classList.add(`color-${tile.color}`);
        el.innerHTML = `
          <div class="tile-inner-body">
            <span class="tile-step-num">${tile.index} ${tile.arrow || ''}</span>
            <span class="tile-cat-icon" title="${meta.name}">${meta.icon}</span>
          </div>
          <div class="tile-pawns-slot" id="pawns-tile-${tile.index}"></div>
        `;
      } else if (tile.type === 'start') {
        el.innerHTML = `
          <div class="corner-label">START!</div>
          <div class="tile-pawns-slot" id="pawns-tile-${tile.index}"></div>
        `;
      } else if (tile.type === 'bonus') {
        el.innerHTML = `
          <div class="bonus-star-badge">⭐</div>
          <div class="corner-label">BONUS</div>
          <div class="tile-pawns-slot" id="pawns-tile-${tile.index}"></div>
        `;
      }

      grid.appendChild(el);
    });

    // Deck click handlers in center island
    document.querySelectorAll('.center-deck-slot').forEach((slotEl) => {
      slotEl.addEventListener('click', () => {
        const cat = slotEl.dataset.cat;
        const meta = window.CATEGORY_META[cat];
        window.soundEngine.playClick();
        this.showToast(
          `กองการ์ด${meta.name} (${meta.icon}): เหลือ ${this.decks[cat]?.length || 10} ใบ — ${meta.ruleBadge}`
        );
      });
    });
  }

  // ==========================================================================
  // START NEW GAME (Follows Official Rules 1-4)
  // ==========================================================================
  startNewGame() {
    const selected = this.setupPlayers.slice(0, this.playerCount).map((p, i) => ({
      id: i,
      name: p.name || `ผู้เล่น ${i + 1}`,
      age: Number(p.age) || 20,
      avatar: p.avatar,
      color: p.color,
      bg: p.bg || '#72ddf7',
      handle: p.handle || `@PLAYER_${i + 1}`,
      tokens: 2, // Rule 4: แจกโทเคนเริ่มต้นคนละ 2 โทเคน
      position: 0, // Tile 0 (START!)
      finished: false,
      stats: { red: 0, blue: 0, green: 0, yellow: 0, bonus: 0, skipped: 0 },
      history: [
        { icon: '🪙', text: 'รับโทเคนเริ่มต้นจากกองกลาง (+2)', turn: 'START' },
      ],
    }));

    // Rule 1: ผู้เล่นคนที่มีอายุมากเป็นคนเริ่มเล่นก่อนเป็นคนแรก
    if (this.sortByAge) {
      selected.sort((a, b) => b.age - a.age);
    }

    this.players = selected;
    this.maxPool = this.playerCount * 10;
    this.centralPool = this.maxPool - this.playerCount * 2;
    this.currentPlayerIdx = 0;
    this.diaryPlayerIdx = 0;
    this.turnNumber = 1;

    this.rebuildShuffledDecks();

    document.getElementById('setup-modal').classList.add('hidden');
    this.renderPlayerMedallions();
    this.renderPawnsOnBoard();
    this.updateCentralPoolUI();
    this.updateTurnBanner();

    this.phase = 'READY_TO_ROLL';
    window.soundEngine.playBonusFanfare();

    const bankEl = document.getElementById('central-bank-box');
    if (bankEl) {
      const rect = bankEl.getBoundingClientRect();
      window.fxEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#ffd22b', 28);
    }

    const firstPlayer = this.players[0];
    this.showToast(
      `เริ่มเกม! แจกคนละ 2 โทเคน • ${firstPlayer.avatar} ${firstPlayer.name} (อายุ ${firstPlayer.age} ปี) เริ่มทอยคนแรก!`
    );
  }

  rebuildShuffledDecks() {
    ['red', 'blue', 'green', 'yellow'].forEach((cat) => {
      const source = this.allCards[cat] || window.DEFAULT_CARDS[cat];
      const copy = JSON.parse(JSON.stringify(source));
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      this.decks[cat] = copy;
      const badge = document.getElementById(`deck-count-${cat}`);
      if (badge) badge.textContent = `${copy.length}`;
    });
  }

  drawCardFromDeck(cat) {
    if (!this.decks[cat] || this.decks[cat].length === 0) {
      const source = this.allCards[cat] || window.DEFAULT_CARDS[cat];
      this.decks[cat] = JSON.parse(JSON.stringify(source)).sort(() => Math.random() - 0.5);
    }
    const card = this.decks[cat].pop();
    const badge = document.getElementById(`deck-count-${cat}`);
    if (badge) badge.textContent = `${this.decks[cat].length}`;
    return card;
  }

  // ==========================================================================
  // CORNER CHARACTER PORTRAIT MEDALLIONS (Reference Image 1!)
  // ==========================================================================
  renderPlayerMedallions() {
    const layer = document.getElementById('player-medallions-layer');
    layer.innerHTML = '';

    this.players.forEach((p, idx) => {
      const isTurn = idx === this.currentPlayerIdx && this.phase !== 'GAME_OVER';
      const med = document.createElement('div');
      med.className = `player-medallion medallion-pos-${idx} ${isTurn ? 'active-medallion' : 'inactive-medallion'}`;
      med.id = `player-medallion-${idx}`;
      med.style.setProperty('--medallion-bg', p.bg);
      med.style.setProperty('--medallion-ring', p.color);
      med.title = `คลิกเพื่อเปิดสมุดบันทึกของ ${p.name}`;

      med.innerHTML = `
        <div class="medallion-circle">
          ${isTurn ? '<span class="medallion-turn-flag">ตาของคุณ!</span>' : ''}
          <span class="medallion-bust-avatar">${p.avatar}</span>
        </div>
        <div class="medallion-name-plate">
          <span>${p.name}</span>
        </div>
        <div class="medallion-token-tag" id="player-token-pill-${idx}">
          🪙 ${p.tokens} • ช่อง ${p.position}/32
        </div>
      `;

      med.addEventListener('click', () => {
        window.soundEngine.playCardFlip();
        this.openPlayerDiary(idx);
      });

      layer.appendChild(med);
    });
  }

  // ==========================================================================
  // OPEN-BOOK PLAYER DIARY & STATS MODAL (Reference Image 2!)
  // ==========================================================================
  openPlayerDiary(playerIdx = 0) {
    if (!this.players.length) return;
    this.diaryPlayerIdx = playerIdx;
    this.renderDiaryModalContent();
    document.getElementById('diary-modal').classList.remove('hidden');
  }

  renderDiaryModalContent() {
    const p = this.players[this.diaryPlayerIdx];
    if (!p) return;

    // Render left player tabs
    const tabsBox = document.getElementById('diary-player-tabs');
    tabsBox.innerHTML = this.players
      .map(
        (pl, idx) => `
        <button type="button" class="l-player-tab ${idx === this.diaryPlayerIdx ? 'active' : ''}" data-idx="${idx}" title="${pl.name}">
          ${pl.avatar}
        </button>
      `
      )
      .join('');

    tabsBox.querySelectorAll('.l-player-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.soundEngine.playCardFlip();
        this.diaryPlayerIdx = parseInt(btn.dataset.idx, 10);
        this.renderDiaryModalContent();
      });
    });

    // Compute rank
    const sorted = [...this.players].sort((a, b) => b.tokens - a.tokens);
    const rank = sorted.findIndex((x) => x.id === p.id) + 1;
    const totalMissions = p.stats.red + p.stats.blue + p.stats.green + p.stats.yellow;

    document.getElementById('diary-p-avatar').textContent = p.avatar;
    document.getElementById('diary-p-avatar').style.background = p.bg;
    document.getElementById('diary-p-name').textContent = p.name;
    document.getElementById('diary-p-handle').textContent = p.handle || '@WELLBEING_HERO';
    document.getElementById('diary-p-tokens').textContent = p.tokens;
    document.getElementById('diary-p-pos').textContent = `${p.position}/32`;
    document.getElementById('diary-p-rank').textContent = `#${rank}`;
    document.getElementById('diary-p-age').textContent = `${p.age} ปี`;
    document.getElementById('diary-p-status').textContent = p.finished ? '🏁 ถึงเส้นชัยแล้ว' : 'กำลังเดินทาง';
    document.getElementById('diary-p-missions').textContent = `${totalMissions} สำเร็จ`;
    document.getElementById('diary-p-skipped').textContent = `${p.stats.skipped} ครั้ง`;

    // Collected Badges Row
    document.getElementById('diary-item-red').textContent = `x${p.stats.red}`;
    document.getElementById('diary-item-blue').textContent = `x${p.stats.blue}`;
    document.getElementById('diary-item-green').textContent = `x${p.stats.green}`;
    document.getElementById('diary-item-yellow').textContent = `x${p.stats.yellow}`;
    document.getElementById('diary-item-bonus').textContent = `+${p.stats.bonus}`;

    // Right Page: Segmented STATS Bars (Matching Reference Image 2!)
    const statsDefs = [
      { label: '💖 เพื่อนเยอะ', count: p.stats.green, color: '#ef9a9a', score: Math.min(100, 20 + p.stats.green * 25) },
      { label: '📖 มีเป้าหมาย', count: p.stats.yellow, color: '#ffcc80', score: Math.min(100, 20 + p.stats.yellow * 25) },
      { label: '🕒 แข็งแรง', count: p.stats.red, color: '#c5e1a5', score: Math.min(100, 20 + p.stats.red * 25) },
      { label: '✨ อารมณ์ดี', count: p.stats.blue, color: '#b3e5fc', score: Math.min(100, 20 + p.stats.blue * 25) },
      { label: '⭐ โบนัสดวงดี', count: p.stats.bonus, color: '#fff59d', score: Math.min(100, 25 + p.stats.bonus * 18) },
    ];

    const statsBox = document.getElementById('diary-stats-bars');
    statsBox.innerHTML = statsDefs
      .map((st) => {
        const filledSegs = Math.max(1, Math.min(8, Math.round((st.score / 100) * 8)));
        let segsHtml = '';
        for (let s = 0; s < 8; s++) {
          const bg = s < filledSegs ? st.color : 'transparent';
          segsHtml += `<div class="stat-seg" style="background:${bg}"></div>`;
        }
        return `
          <div class="stat-bar-row">
            <div class="stat-label">${st.label}</div>
            <div class="stat-segments-track">${segsHtml}</div>
            <div class="stat-num">${st.score}</div>
          </div>
        `;
      })
      .join('');

    // Recent Activity List
    const actList = document.getElementById('diary-activity-list');
    const logs = [...(p.history || [])].reverse();
    actList.innerHTML = logs
      .map(
        (item) => `
        <div class="activity-item-card">
          <div class="act-left">
            <span>${item.icon}</span>
            <span>${item.text}</span>
          </div>
          <span class="act-badge">${item.turn}</span>
        </div>
      `
      )
      .join('');
  }

  // ==========================================================================
  // 3D UPRIGHT PAWNS ON THE ISOMETRIC BLOCKS
  // ==========================================================================
  renderPawnsOnBoard() {
    document.querySelectorAll('.tile-pawns-slot').forEach((slot) => {
      slot.innerHTML = '';
    });

    this.players.forEach((p, idx) => {
      const tileIdx = p.position >= BOARD_TILES.length ? 0 : p.position;
      const slot = document.getElementById(`pawns-tile-${tileIdx}`);
      if (!slot) return;

      const pawn = document.createElement('div');
      pawn.className = `board-pawn ${idx === this.currentPlayerIdx ? 'current-pawn' : ''}`;
      pawn.id = `board-pawn-${idx}`;
      pawn.style.setProperty('--pawn-color', p.color);
      pawn.title = `${p.name} (${p.tokens} โทเคน)`;
      pawn.innerHTML = `<span>${p.avatar}</span>`;
      slot.appendChild(pawn);
    });
  }

  updateCentralPoolUI() {
    const countEl = document.getElementById('central-pool-count');
    const maxEl = document.getElementById('central-pool-max');
    const barEl = document.getElementById('central-pool-bar');
    if (countEl) countEl.textContent = this.centralPool;
    if (maxEl) maxEl.textContent = this.maxPool;
    if (barEl) {
      const pct = Math.max(0, Math.min(100, (this.centralPool / this.maxPool) * 100));
      barEl.style.width = `${pct}%`;
    }
  }

  updateTurnBanner() {
    const p = this.players[this.currentPlayerIdx];
    if (!p) return;

    const roundPill = document.getElementById('turn-round-pill');
    if (roundPill) roundPill.textContent = `รอบที่ ${this.turnNumber}`;

    const avEl = document.getElementById('turn-player-avatar');
    avEl.textContent = p.avatar;
    avEl.style.background = p.color;

    document.getElementById('turn-player-name').textContent = `${p.name} (🪙 ${p.tokens} โทเคน)`;

    const isMobile = window.innerWidth <= 768;
    document.getElementById('turn-step-status').textContent = isMobile
      ? '👉 แตะที่ลูกเต๋า หรือแตะแถบนี้เพื่อทอยเต๋า (1–4)!'
      : 'คลิกที่แท่นแทรมโพลีน (หรือกด Spacebar) เพื่อทอยลูกเต๋า 4 หน้า!';

    const rollBtn = document.getElementById('roll-dice-btn');
    if (rollBtn) {
      rollBtn.disabled = false;
      rollBtn.textContent = isMobile ? '🎲 แตะทอยเต๋า (1–4)' : '🎲 ทอยลูกเต๋า 4 หน้า (SPACE)';
    }
  }

  // ==========================================================================
  // TRAMPOLINE 4-SIDED DIE (D4) ROLL & MOVEMENT
  // ==========================================================================
  handleRollClick() {
    window.soundEngine.init();
    if (this.phase !== 'READY_TO_ROLL') return;
    this.phase = 'ROLLING';

    const rollBtn = document.getElementById('roll-dice-btn');
    if (rollBtn) rollBtn.disabled = true;

    const d4El = document.getElementById('d4-pyramid');
    const d4Num = document.getElementById('d4-number-display');
    d4El.classList.add('rolling');
    window.soundEngine.playDiceRoll();

    let ticks = 0;
    const rollInterval = setInterval(() => {
      const tempVal = Math.floor(Math.random() * 4) + 1;
      d4Num.textContent = tempVal;
      ticks++;
      if (ticks >= 8) {
        clearInterval(rollInterval);
        const finalRoll = Math.floor(Math.random() * 4) + 1; // 4-sided die: 1..4
        d4El.classList.remove('rolling');
        d4Num.textContent = finalRoll;
        window.soundEngine.playDiceLand(finalRoll);

        const rect = d4El.getBoundingClientRect();
        window.fxEngine.shockwave(rect.left + rect.width / 2, rect.top + rect.height / 2, '#ffd22b', 90);
        window.fxEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#ffd22b', 24);

        document.getElementById('turn-step-status').textContent =
          `🎲 ทอยได้เลข ${finalRoll}! กำลังเดินบนเกาะ ${finalRoll} ช่อง...`;

        setTimeout(() => {
          this.movePlayerSteps(this.currentPlayerIdx, finalRoll);
        }, 380);
      }
    }, 75);
  }

  movePlayerSteps(playerIdx, steps) {
    this.phase = 'MOVING';
    const player = this.players[playerIdx];
    let remaining = steps;
    let stepCount = 0;

    document.querySelectorAll('.board-tile.tile-active-highlight').forEach((el) => {
      el.classList.remove('tile-active-highlight');
    });

    const stepTimer = setInterval(() => {
      if (remaining <= 0 || player.position >= BOARD_TILES.length) {
        clearInterval(stepTimer);
        this.onPlayerLanded(playerIdx);
        return;
      }

      player.position += 1;
      remaining -= 1;
      stepCount += 1;

      window.soundEngine.playStep(stepCount);
      this.renderPawnsOnBoard();
      this.renderPlayerMedallions();

      const visualTileIdx = player.position >= BOARD_TILES.length ? 0 : player.position;
      const tileEl = document.getElementById(`tile-${visualTileIdx}`);
      if (tileEl) {
        document.querySelectorAll('.board-tile.tile-step-glow').forEach((el) =>
          el.classList.remove('tile-step-glow')
        );
        tileEl.classList.add('tile-step-glow');
      }

      if (player.position >= BOARD_TILES.length) {
        player.position = BOARD_TILES.length;
        player.finished = true;
        clearInterval(stepTimer);
        setTimeout(() => this.onPlayerLanded(playerIdx), 350);
      }
    }, 280);
  }

  onPlayerLanded(playerIdx) {
    const player = this.players[playerIdx];
    const visualTileIdx = player.position >= BOARD_TILES.length ? 0 : player.position;
    const tileEl = document.getElementById(`tile-${visualTileIdx}`);

    if (tileEl) {
      tileEl.classList.remove('tile-step-glow');
      tileEl.classList.add('tile-active-highlight');
      const rect = tileEl.getBoundingClientRect();
      window.fxEngine.shockwave(rect.left + rect.width / 2, rect.top + rect.height / 2, player.color, 75);
      window.fxEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, player.color, 24);
    }

    if (player.finished) {
      player.history.push({
        icon: '🏁',
        text: 'เดินครบรอบกระดานถึงเส้นชัย!',
        turn: `R${this.turnNumber}`,
      });
      window.soundEngine.playBonusFanfare();
      this.showToast(`🏁 ${player.avatar} ${player.name} เดินครบรอบถึงจุดสิ้นสุดของเกมแล้ว!`);
      this.renderPlayerMedallions();
      setTimeout(() => {
        if (this.checkGameEndCondition()) return;
        this.advanceToNextTurn();
      }, 1200);
      return;
    }

    const tile = BOARD_TILES[player.position];
    if (!tile) {
      this.advanceToNextTurn();
      return;
    }

    if (tile.type === 'bonus') {
      this.openBonusModal(player);
    } else if (tile.type === 'color') {
      const deckEl = document.getElementById(`deck-stack-${tile.color}`);
      if (deckEl) {
        deckEl.classList.add('deck-drawing-pulse');
        setTimeout(() => deckEl.classList.remove('deck-drawing-pulse'), 1100);
      }
      setTimeout(() => {
        this.openCardMissionModal(player, tile.color);
      }, 280);
    } else {
      this.advanceToNextTurn();
    }
  }

  // ==========================================================================
  // RULE 3: MISSION CARD MODAL (Inside Open-Book Diary UI)
  // ==========================================================================
  openCardMissionModal(player, categoryKey) {
    this.phase = 'CARD_MODAL';
    const meta = window.CATEGORY_META[categoryKey];
    const card = this.drawCardFromDeck(categoryKey);
    this.activeCard = card;
    this.activeCategory = categoryKey;
    this.stopMissionTimer();

    const modal = document.getElementById('card-mission-modal');
    const flipInner = document.getElementById('card-flip-inner');
    flipInner.classList.remove('flipped');

    document.getElementById('modal-card-back-img').src = meta.backImg;
    document.getElementById('modal-card-front-bg').src = meta.frontImg;

    const catHeader = document.getElementById('modal-category-badge');
    catHeader.textContent = `${meta.icon} การ์ด${meta.name}`;

    const playerTag = document.getElementById('modal-active-player-pill');
    if (playerTag) {
      playerTag.textContent = `${player.avatar} ${player.name}`;
    }

    const ruleBanner = document.getElementById('modal-rule-banner');
    ruleBanner.textContent = meta.ruleBadge;
    ruleBanner.style.background = meta.lightBg;

    const friendBox = document.getElementById('friend-reader-box');
    const secretCover = document.getElementById('card-secret-cover');

    if (meta.ruleType === 'friend_read') {
      friendBox.classList.remove('hidden');
      secretCover.classList.remove('hidden');
      this.renderFriendReaderButtons(player);
    } else {
      friendBox.classList.add('hidden');
      secretCover.classList.add('hidden');
    }

    document.getElementById('card-mission-title').textContent = card.title;
    const tiersListEl = document.getElementById('card-mission-tiers-text');
    tiersListEl.innerHTML = card.tiers
      .map((t) => `<div class="card-tier-line">${t.label}</div>`)
      .join('');
    document.getElementById('card-mission-penalty-text').textContent = card.penaltyLabel;

    // Show stopwatch timers ONLY for timed challenges (e.g. plank, balance, laugh yoga, stare)
    const isTimed =
      (card.tiers && card.tiers.some((t) => t.label.includes('วินาที') || t.label.includes('วิ'))) ||
      (card.title && (card.title.includes('วินาที') || card.title.includes('วิ')));
    const timerGroup = document.getElementById('mission-timer-buttons-group');
    if (timerGroup) {
      timerGroup.style.display = isTimed ? 'inline-flex' : 'none';
    }
    const timerDisplay = document.getElementById('mission-timer-display');
    if (timerDisplay) {
      timerDisplay.classList.add('hidden');
    }

    this.renderCardActionButtons(player, card, meta);

    modal.classList.remove('hidden');
    window.soundEngine.playCardFlip();

    setTimeout(() => {
      flipInner.classList.add('flipped');
    }, 320);
  }

  renderFriendReaderButtons(currentPlayer) {
    const container = document.getElementById('friend-reader-buttons');
    const status = document.getElementById('friend-reader-status');
    container.innerHTML = '';

    const otherPlayers = this.players.filter((p) => p.id !== currentPlayer.id);
    status.textContent = `👉 ${currentPlayer.name} เลือกเพื่อน 1 คนด้านล่างให้หยิบการ์ดใบนี้ไปอ่านให้ฟัง:`;

    otherPlayers.forEach((other) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'friend-reader-btn';
      btn.innerHTML = `<span>${other.avatar}</span> <b>${other.name}</b> เป็นคนอ่าน`;
      btn.addEventListener('click', () => {
        window.soundEngine.playClick();
        container.querySelectorAll('.friend-reader-btn').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
        document.getElementById('card-secret-cover').classList.add('hidden');
        status.innerHTML = `🗣️ <b>${other.avatar} ${other.name}</b> กำลังอ่านรายละเอียดในการ์ดให้ <b>${currentPlayer.name}</b> ฟัง!`;
      });
      container.appendChild(btn);
    });
  }

  renderCardActionButtons(player, card, meta) {
    const actionsContainer = document.getElementById('modal-tier-buttons');
    actionsContainer.innerHTML = '';

    card.tiers.forEach((tier, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tier-choice-btn tier-level-${idx + 1}`;
      btn.innerHTML = `
        <span class="tier-btn-check">✅ ระดับ ${idx + 1}: <b>${tier.label}</b></span>
        <span class="tier-btn-reward">+${tier.tokens} 🪙</span>
      `;
      btn.addEventListener('click', () => {
        this.resolveCardMission({
          completed: true,
          tokensDelta: tier.tokens,
          label: tier.label,
          categoryKey: meta.id,
        });
      });
      actionsContainer.appendChild(btn);
    });

    const skipBtn = document.createElement('button');
    skipBtn.type = 'button';
    skipBtn.className = 'tier-choice-btn tier-skip-btn';
    const actualPenalty = Math.min(player.tokens, card.penaltyTokens || 2);
    skipBtn.innerHTML = `
      <span class="tier-btn-check">❌ ไม่ทำภารกิจ (${card.penaltyLabel})</span>
      <span class="tier-btn-penalty">-${actualPenalty} 🪙</span>
    `;
    skipBtn.addEventListener('click', () => {
      this.resolveCardMission({
        completed: false,
        tokensDelta: -(card.penaltyTokens || 2),
        label: card.penaltyLabel,
        categoryKey: meta.id,
      });
    });
    actionsContainer.appendChild(skipBtn);
  }

  resolveCardMission({ completed, tokensDelta, categoryKey }) {
    this.stopMissionTimer();
    const player = this.players[this.currentPlayerIdx];
    const meta = window.CATEGORY_META[categoryKey];
    const cardTitle = this.activeCard ? this.activeCard.title : meta.name;

    document.getElementById('card-mission-modal').classList.add('hidden');

    const bankEl = document.getElementById('central-bank-box');
    const playerPill = document.getElementById(`player-medallion-${this.currentPlayerIdx}`);
    const bankRect = bankEl
      ? bankEl.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: 30, width: 0, height: 0 };
    const pillRect = playerPill
      ? playerPill.getBoundingClientRect()
      : { left: 80, top: 80, width: 0, height: 0 };

    const bankX = bankRect.left + bankRect.width / 2;
    const bankY = bankRect.top + bankRect.height / 2;
    const playerX = pillRect.left + pillRect.width / 2;
    const playerY = pillRect.top + pillRect.height / 2;

    if (completed) {
      const earned = Math.min(this.centralPool, tokensDelta);
      this.centralPool -= earned;
      player.tokens += earned;
      player.stats[categoryKey] = (player.stats[categoryKey] || 0) + 1;
      player.history.push({
        icon: meta.icon,
        text: `${cardTitle} (+${earned} 🪙)`,
        turn: `R${this.turnNumber}`,
      });

      window.soundEngine.playTokenGain(earned);
      this.updateCentralPoolUI();
      this.renderPlayerMedallions();

      if (earned > 0) {
        window.fxEngine.flyTokens({
          fromX: bankX,
          fromY: bankY,
          toX: playerX,
          toY: playerY,
          count: earned,
          onComplete: () => {
            window.fxEngine.floatText(playerX, playerY, `+${earned} โทเคน!`, '#7ae582');
            this.afterTurnActionComplete();
          },
        });
      } else {
        this.afterTurnActionComplete();
      }
      this.showToast(`🎉 ${player.name} ทำภารกิจสำเร็จ! ได้รับ +${earned} โทเคน`);
    } else {
      const desiredPenalty = Math.abs(tokensDelta);
      const paid = Math.min(player.tokens, desiredPenalty);
      player.tokens -= paid;
      this.centralPool += paid;
      player.stats.skipped += 1;
      player.history.push({
        icon: '💸',
        text: `ข้าม: ${cardTitle} (-${paid} 🪙)`,
        turn: `R${this.turnNumber}`,
      });

      window.soundEngine.playTokenPenalty();
      this.updateCentralPoolUI();
      this.renderPlayerMedallions();

      if (paid > 0) {
        window.fxEngine.flyTokens({
          fromX: playerX,
          fromY: playerY,
          toX: bankX,
          toY: bankY,
          count: paid,
          onComplete: () => {
            window.fxEngine.floatText(playerX, playerY, `-${paid} โทเคน`, '#ff595e');
            this.afterTurnActionComplete();
          },
        });
      } else {
        window.fxEngine.floatText(playerX, playerY, `0 โทเคน`, '#ff595e');
        setTimeout(() => this.afterTurnActionComplete(), 500);
      }
      this.showToast(`💸 ${player.name} ข้ามภารกิจ จ่ายคืนกองกลาง ${paid} โทเคน`);
    }
  }

  // ==========================================================================
  // RULE 4: BONUS SPACE MODAL
  // ==========================================================================
  openBonusModal(player) {
    this.phase = 'BONUS_MODAL';
    window.soundEngine.playBonusFanfare();

    const modal = document.getElementById('bonus-modal');
    document.getElementById('bonus-player-name').textContent = `${player.avatar} ${player.name}`;
    document.getElementById('bonus-d4-result').textContent = '?';
    document.getElementById('bonus-status-text').textContent =
      'กดปุ่มด้านล่างเพื่อทอยลูกเต๋า 4 หน้า ได้เลขอะไรรับโทเคนไปเลย!';
    const btn = document.getElementById('bonus-roll-btn');
    btn.disabled = false;
    btn.textContent = '🎲 ทอยลูกเต๋าโบนัส (รับ 1–4 โทเคน)';
    modal.classList.remove('hidden');
  }

  executeBonusRoll() {
    const btn = document.getElementById('bonus-roll-btn');
    if (btn.disabled) return;
    btn.disabled = true;

    const dieBox = document.getElementById('bonus-d4-result');
    dieBox.classList.add('rolling');
    window.soundEngine.playDiceRoll();

    let ticks = 0;
    const timer = setInterval(() => {
      dieBox.textContent = Math.floor(Math.random() * 4) + 1;
      ticks++;
      if (ticks >= 9) {
        clearInterval(timer);
        dieBox.classList.remove('rolling');
        const bonusRoll = Math.floor(Math.random() * 4) + 1;
        dieBox.textContent = bonusRoll;
        window.soundEngine.playTokenGain(bonusRoll);

        const player = this.players[this.currentPlayerIdx];
        const earned = Math.min(this.centralPool, bonusRoll);
        this.centralPool -= earned;
        player.tokens += earned;
        player.stats.bonus += earned;
        player.history.push({
          icon: '🌟',
          text: `ตกช่อง BONUS ทอยได้ ${bonusRoll} (+${earned} 🪙)`,
          turn: `R${this.turnNumber}`,
        });

        document.getElementById('bonus-status-text').innerHTML =
          `🎉 ทอยได้เลข <b>${bonusRoll}</b>! ได้รับโบนัส <b>+${earned} โทเคน</b>!`;

        this.updateCentralPoolUI();
        this.renderPlayerMedallions();

        const rect = dieBox.getBoundingClientRect();
        window.fxEngine.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, '#ffd22b', 36);

        setTimeout(() => {
          document.getElementById('bonus-modal').classList.add('hidden');
          const bankEl = document.getElementById('central-bank-box');
          const playerMed = document.getElementById(`player-medallion-${this.currentPlayerIdx}`);
          if (bankEl && playerMed && earned > 0) {
            const bRect = bankEl.getBoundingClientRect();
            const pRect = playerMed.getBoundingClientRect();
            window.fxEngine.flyTokens({
              fromX: bRect.left + bRect.width / 2,
              fromY: bRect.top + bRect.height / 2,
              toX: pRect.left + pRect.width / 2,
              toY: pRect.top + pRect.height / 2,
              count: earned,
              onComplete: () => {
                window.fxEngine.floatText(
                  pRect.left + pRect.width / 2,
                  pRect.top + 20,
                  `BONUS +${earned} 🪙`,
                  '#ffd22b'
                );
                this.afterTurnActionComplete();
              },
            });
          } else {
            this.afterTurnActionComplete();
          }
        }, 1100);
      }
    }, 75);
  }

  // ==========================================================================
  // TURN PROGRESSION & GAME END CHECK
  // ==========================================================================
  afterTurnActionComplete() {
    if (this.checkGameEndCondition()) return;
    this.advanceToNextTurn();
  }

  checkGameEndCondition() {
    const poolEmpty = this.centralPool <= 0;
    const allFinished = this.players.every((p) => p.finished);

    if (poolEmpty || allFinished) {
      const reason = poolEmpty
        ? 'โทเคนในกองกลางหมดแล้ว!'
        : 'ผู้เล่นทุกคนเดินมาถึงจุดสิ้นสุดของเกมครบทุกคนแล้ว!';
      this.triggerGameOver(reason);
      return true;
    }
    return false;
  }

  advanceToNextTurn() {
    const total = this.players.length;
    for (let offset = 1; offset <= total; offset++) {
      const nextIdx = (this.currentPlayerIdx + offset) % total;
      if (!this.players[nextIdx].finished) {
        if (nextIdx <= this.currentPlayerIdx) {
          this.turnNumber += 1;
        }
        this.currentPlayerIdx = nextIdx;
        break;
      }
    }

    this.phase = 'READY_TO_ROLL';
    this.renderPlayerMedallions();
    this.renderPawnsOnBoard();
    this.updateTurnBanner();
  }

  triggerGameOver(reasonText) {
    this.phase = 'GAME_OVER';
    window.soundEngine.playVictoryFanfare();
    window.fxEngine.startVictoryFireworks();

    const ranked = [...this.players].sort((a, b) => b.tokens - a.tokens);
    const topScore = ranked[0].tokens;
    const winners = ranked.filter((p) => p.tokens === topScore);

    document.getElementById('victory-reason-badge').textContent = `🏁 จบเกมเนื่องจาก: ${reasonText}`;

    const winnerHeadline =
      winners.length === 1
        ? `🏆 ผู้ชนะคือ ${winners[0].avatar} ${winners[0].name} (${topScore} โทเคน)!`
        : `🏆 ชนะร่วมกัน! ${winners.map((w) => `${w.avatar} ${w.name}`).join(' & ')} (${topScore} โทเคน)!`;
    document.getElementById('victory-winner-headline').textContent = winnerHeadline;

    const podiumContainer = document.getElementById('victory-rankings-list');
    podiumContainer.innerHTML = ranked
      .map((p, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
        return `
          <div class="victory-rank-row ${p.tokens === topScore ? 'is-winner-row' : ''}">
            <div class="rank-medal">${medal}</div>
            <div class="rank-avatar" style="background:${p.color}">${p.avatar}</div>
            <div class="rank-details">
              <div class="rank-name">${p.name} <span class="rank-age">(อายุ ${p.age} ปี)</span></div>
              <div class="rank-wellbeing-stats">
                <span>💪 แข็งแรง ${p.stats.red}</span>
                <span>😊 อารมณ์ดี ${p.stats.blue}</span>
                <span>🤝 เพื่อนเยอะ ${p.stats.green}</span>
                <span>🎯 มีเป้าหมาย ${p.stats.yellow}</span>
                <span>🌟 โบนัส +${p.stats.bonus}</span>
              </div>
            </div>
            <div class="rank-tokens-badge">🪙 ${p.tokens}</div>
          </div>
        `;
      })
      .join('');

    document.getElementById('victory-modal').classList.remove('hidden');
  }

  // ==========================================================================
  // MISSION STOPWATCH / COUNTDOWN TIMER
  // ==========================================================================
  startMissionTimer(seconds) {
    this.stopMissionTimer();
    this.timerSeconds = seconds;
    const display = document.getElementById('mission-timer-display');
    display.classList.remove('hidden');
    display.textContent = `⏱️ ${this.timerSeconds} วิ`;
    window.soundEngine.playClick();

    this.timerInterval = setInterval(() => {
      this.timerSeconds -= 1;
      if (this.timerSeconds > 0) {
        display.textContent = `⏱️ ${this.timerSeconds} วิ`;
        window.soundEngine.playTick(this.timerSeconds <= 5);
      } else {
        this.stopMissionTimer();
        display.classList.remove('hidden');
        display.textContent = '⏰ หมดเวลา!';
        window.soundEngine.playBonusFanfare();
      }
    }, 1000);
  }

  stopMissionTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    const display = document.getElementById('mission-timer-display');
    if (display) display.classList.add('hidden');
  }

  // ==========================================================================
  // IN-GAME CARD EDITOR & BULK PASTE
  // ==========================================================================
  openCardEditor() {
    this.renderCardEditorList();
    this.populateBulkTextarea();
    document.getElementById('card-editor-modal').classList.remove('hidden');
  }

  renderCardEditorList() {
    const container = document.getElementById('editor-cards-grid');
    const meta = window.CATEGORY_META[this.editorCategory];
    const cards = this.allCards[this.editorCategory] || [];

    container.innerHTML = cards
      .map(
        (c, i) => `
      <div class="editor-card-item" style="border-top: 5px solid ${meta.color}">
        <div class="editor-card-num">ใบที่ ${i + 1} (${meta.name})</div>
        <label>หัวข้อภารกิจ</label>
        <input type="text" class="ed-title" data-idx="${i}" value="${c.title}" />
        <label>ระดับที่ 1 (+1 โทเคน)</label>
        <input type="text" class="ed-tier-0" data-idx="${i}" value="${c.tiers[0]?.label || ''}" />
        <label>ระดับที่ 2 (+2 โทเคน)</label>
        <input type="text" class="ed-tier-1" data-idx="${i}" value="${c.tiers[1]?.label || ''}" />
        <label>ระดับที่ 3 (+3 โทเคน)</label>
        <input type="text" class="ed-tier-2" data-idx="${i}" value="${c.tiers[2]?.label || ''}" />
        <label>เงื่อนไขไม่ทำภารกิจ (ปรับ 2 โทเคน)</label>
        <input type="text" class="ed-penalty" data-idx="${i}" value="${c.penaltyLabel}" />
      </div>
    `
      )
      .join('');
  }

  saveEditorChanges() {
    const container = document.getElementById('editor-cards-grid');
    const cards = this.allCards[this.editorCategory];
    container.querySelectorAll('.editor-card-item').forEach((item, idx) => {
      if (!cards[idx]) return;
      cards[idx].title = item.querySelector('.ed-title').value.trim() || `ภารกิจที่ ${idx + 1}`;
      cards[idx].tiers[0].label = item.querySelector('.ed-tier-0').value.trim() || 'ระดับ 1 = 1 โทเคน';
      cards[idx].tiers[1].label = item.querySelector('.ed-tier-1').value.trim() || 'ระดับ 2 = 2 โทเคน';
      cards[idx].tiers[2].label = item.querySelector('.ed-tier-2').value.trim() || 'ระดับ 3 = 3 โทเคน';
      cards[idx].penaltyLabel = item.querySelector('.ed-penalty').value.trim() || 'ไม่ทำ = จ่าย 2 โทเคน';
    });

    window.saveAllCards(this.allCards);
    this.rebuildShuffledDecks();
    window.soundEngine.playTokenGain(2);
    this.showToast(`บันทึกการ์ดหมวด "${window.CATEGORY_META[this.editorCategory].name}" เรียบร้อยแล้ว!`);
  }

  populateBulkTextarea() {
    const textarea = document.getElementById('bulk-paste-textarea');
    const cards = this.allCards[this.editorCategory] || [];
    const lines = cards.map(
      (c) =>
        `${c.title} | ${c.tiers[0]?.label} | ${c.tiers[1]?.label} | ${c.tiers[2]?.label} | ${c.penaltyLabel}`
    );
    textarea.value = lines.join('\n');
  }

  applyBulkTextPaste() {
    const raw = document.getElementById('bulk-paste-textarea').value.trim();
    if (!raw) return;

    const lines = raw
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const updated = lines.slice(0, 20).map((line, i) => {
      const parts = line.split('|').map((s) => s.trim());
      return {
        id: `${this.editorCategory}-${i + 1}`,
        title: parts[0] || `ภารกิจที่ ${i + 1}`,
        tiers: [
          { label: parts[1] || 'ระดับ 1 = 1 โทเคน', tokens: 1 },
          { label: parts[2] || 'ระดับ 2 = 2 โทเคน', tokens: 2 },
          { label: parts[3] || 'ระดับ 3 = 3 โทเคน', tokens: 3 },
        ],
        penaltyLabel: parts[4] || 'ไม่ทำ = จ่าย 2 โทเคน',
        penaltyTokens: 2,
      };
    });

    if (updated.length > 0) {
      this.allCards[this.editorCategory] = updated;
      window.saveAllCards(this.allCards);
      this.rebuildShuffledDecks();
      this.renderCardEditorList();
      window.soundEngine.playTokenGain(2);
      this.showToast(
        `นำเข้าการ์ดหมวด "${window.CATEGORY_META[this.editorCategory].name}" จำนวน ${updated.length} ใบสำเร็จ!`
      );
    }
  }

  showToast(msg) {
    const toast = document.getElementById('game-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('visible');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('visible');
    }, 3800);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.wellbeingGame = new WellbeingGame();
  window.wellbeingGame.init();
});

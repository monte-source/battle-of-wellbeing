// ============================================================================
// BATTLE OF WELLBEING (ศึกชิงสุขภาพดี) - Visual Effects & Particle Engine
// Full-screen HTML5 Canvas overlay for particles, flying tokens, shockwaves
// ============================================================================

class FXEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.flyingTokens = [];
    this.shockwaves = [];
    this.floatingTexts = [];
    this.fireworksTimer = null;
    this.running = false;
  }

  init() {
    this.canvas = document.getElementById('fx-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.running = true;
    requestAnimationFrame(() => this.loop());
  }

  resize() {
    if (!this.canvas) return;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    if (this.ctx) {
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  // Burst of confetti / sparkles at (x, y)
  burst(x, y, color = '#ffd166', count = 32) {
    const palette = Array.isArray(color)
      ? color
      : [color, '#ffffff', '#ffd166', '#06d6a0', '#118ab2', '#ef476f'];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
      const speed = 2.5 + Math.random() * 7.5;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.2,
        gravity: 0.18,
        size: 5 + Math.random() * 6,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: 1,
        decay: 0.014 + Math.random() * 0.012,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.25,
        shape: Math.random() > 0.35 ? 'rect' : 'circle',
      });
    }
  }

  // Expanding glowing ring shockwave
  shockwave(x, y, color = '#ffd166', maxRadius = 90) {
    this.shockwaves.push({
      x,
      y,
      radius: 8,
      maxRadius,
      color,
      alpha: 0.9,
      lineWidth: 5,
    });
  }

  // Floating "+3 โทเคน" or "-2 โทเคน" text
  floatText(x, y, text, color = '#10b981') {
    this.floatingTexts.push({
      x,
      y,
      text,
      color,
      vy: -1.8,
      alpha: 1,
      scale: 0.6,
    });
  }

  // Animate flying tokens from (fromX, fromY) to (toX, toY)
  flyTokens({ fromX, fromY, toX, toY, count = 2, onComplete = null }) {
    const total = Math.max(1, Math.min(8, count));
    let finished = 0;

    for (let i = 0; i < total; i++) {
      const delay = i * 95;
      setTimeout(() => {
        const ctrlX = (fromX + toX) / 2 + (Math.random() - 0.5) * 140;
        const ctrlY = Math.min(fromY, toY) - 80 - Math.random() * 50;
        this.flyingTokens.push({
          fromX,
          fromY,
          ctrlX,
          ctrlY,
          toX,
          toY,
          progress: 0,
          speed: 0.032,
          onDone: () => {
            this.burst(toX, toY, ['#ffd166', '#f59e0b', '#fffbeb'], 12);
            this.shockwave(toX, toY, '#fbbf24', 45);
            finished++;
            if (finished === total && typeof onComplete === 'function') {
              onComplete();
            }
          },
        });
      }, delay);
    }
  }

  startVictoryFireworks() {
    this.stopVictoryFireworks();
    const trigger = () => {
      const x = window.innerWidth * (0.15 + Math.random() * 0.7);
      const y = window.innerHeight * (0.15 + Math.random() * 0.45);
      this.burst(
        x,
        y,
        ['#ef4444', '#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#a855f7'],
        48
      );
      this.shockwave(x, y, '#fbbf24', 110);
    };
    trigger();
    setTimeout(trigger, 300);
    this.fireworksTimer = setInterval(trigger, 950);
  }

  stopVictoryFireworks() {
    if (this.fireworksTimer) {
      clearInterval(this.fireworksTimer);
      this.fireworksTimer = null;
    }
  }

  loop() {
    if (!this.running) return;
    const ctx = this.ctx;
    if (ctx) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // 1. Shockwaves
      for (let i = this.shockwaves.length - 1; i >= 0; i--) {
        const sw = this.shockwaves[i];
        sw.radius += (sw.maxRadius - sw.radius) * 0.14;
        sw.alpha -= 0.032;
        sw.lineWidth = Math.max(1, sw.lineWidth * 0.94);

        if (sw.alpha <= 0.02) {
          this.shockwaves.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, sw.alpha);
        ctx.strokeStyle = sw.color;
        ctx.lineWidth = sw.lineWidth;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 2. Particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // 3. Flying Golden Tokens
      for (let i = this.flyingTokens.length - 1; i >= 0; i--) {
        const tk = this.flyingTokens[i];
        tk.progress = Math.min(1, tk.progress + tk.speed);
        const t = tk.progress;
        const inv = 1 - t;

        // Quadratic Bezier
        const x = inv * inv * tk.fromX + 2 * inv * t * tk.ctrlX + t * t * tk.toX;
        const y = inv * inv * tk.fromY + 2 * inv * t * tk.ctrlY + t * t * tk.toY;

        ctx.save();
        ctx.translate(x, y);
        const scale = 1 + Math.sin(t * Math.PI) * 0.35;
        ctx.scale(scale, scale);

        // Outer golden coin
        ctx.beginPath();
        ctx.arc(0, 0, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24';
        ctx.shadowColor = 'rgba(245, 158, 11, 0.7)';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#fef3c7';
        ctx.stroke();

        // Inner heart/star symbol
        ctx.fillStyle = '#92400e';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★', 0, 1);
        ctx.restore();

        if (tk.progress >= 1) {
          const cb = tk.onDone;
          this.flyingTokens.splice(i, 1);
          if (cb) cb();
        }
      }

      // 4. Floating Texts
      for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
        const ft = this.floatingTexts[i];
        ft.y += ft.vy;
        ft.scale = Math.min(1.15, ft.scale + 0.08);
        ft.alpha -= 0.018;

        if (ft.alpha <= 0.02) {
          this.floatingTexts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, ft.alpha);
        ctx.translate(ft.x, ft.y);
        ctx.scale(ft.scale, ft.scale);
        ctx.font = '800 22px "Kanit", "Prompt", sans-serif';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.strokeText(ft.text, 0, 0);
        ctx.fillStyle = ft.color;
        ctx.fillText(ft.text, 0, 0);
        ctx.restore();
      }
    }

    requestAnimationFrame(() => this.loop());
  }
}

window.fxEngine = new FXEngine();

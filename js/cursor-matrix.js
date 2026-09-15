/**
 * Authentic Red Matrix Digital Rain — Interactive Background Cursor Spotlight Engine
 * 
 * Generates dense vertical columns of cascading Crimson Matrix code (Katakana,
 * Binary, and Hex Glyphs) flowing in the BACKGROUND layer (behind typography and cards),
 * strictly localized around the mouse cursor and trailing its motion path.
 */

(function initRedMatrixCursorRain() {
  let canvas = document.getElementById('cursorMatrixCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'cursorMatrixCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    // Positioned in the background layer: above ambient grid (z:0), BEHIND content (z:2+)
    canvas.style.zIndex = '1';
    document.body.appendChild(canvas);
  } else {
    canvas.style.zIndex = '1';
  }

  const ctx = canvas.getContext('2d');
  let width, height;

  const COL_WIDTH = 14; // Tight column spacing matching the Matrix image
  const ROW_HEIGHT = 15; // Vertical distance between characters
  const FONT_SIZE = 13;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Authentic Matrix Single-Character Set (Katakana runes, Digits, Binary, Hex Symbols)
  const MATRIX_GLYPHS = [
    // Half-width Katakana runes (authentic Matrix digital rain font set)
    'ｦ', 'ｱ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ',
    'ﾀ', 'ﾂ', 'ﾃ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾊ', 'ﾋ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ',
    'ﾓ', 'ﾔ', 'ﾕ', 'ﾗ', 'ﾘ', 'ﾜ', 'ｸ', 'ﾛ', 'ﾝ',
    // Binary & Digits
    '0', '1', '0', '1', '1', '0', '2', '3', '4', '5', '7', '8', '9',
    // High-tech Hex & Math Glyphs
    'A', 'B', 'C', 'D', 'E', 'F', 'X', 'Z', 'λ', '∑', 'Δ', 'Ω', 'π', '¥', '$', '#', '%', '&', '<', '>', '+', '-', '*'
  ];

  function getRandomGlyph() {
    return MATRIX_GLYPHS[Math.floor(Math.random() * MATRIX_GLYPHS.length)];
  }

  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  // Mouse tracking with trajectory history for smooth trails
  const mouse = {
    x: -500,
    y: -500,
    prevX: -500,
    prevY: -500,
    active: false,
    lastMoveTime: 0
  };

  // Trail history points to allow rain streams to cascade in the wake of cursor moves
  const trailHistory = [];
  const MAX_TRAIL_HISTORY = 20;

  window.addEventListener('mousemove', (e) => {
    mouse.active = true;
    mouse.lastMoveTime = performance.now();
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    trailHistory.push({
      x: e.clientX,
      y: e.clientY,
      time: performance.now()
    });

    if (trailHistory.length > MAX_TRAIL_HISTORY) {
      trailHistory.shift();
    }
  }, { passive: true });

  window.addEventListener('mouseenter', () => {
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Rain Stream Definition
  class MatrixRainColumn {
    constructor(colIndex, colX, startY, speed, length) {
      this.colIndex = colIndex;
      this.x = colX;
      this.headY = startY;
      this.speed = speed;
      this.length = length;
      this.chars = [];
      for (let i = 0; i < this.length; i++) {
        this.chars.push(getRandomGlyph());
      }
      this.opacity = 1.0;
      this.decay = Math.random() * 0.007 + 0.006;
      this.scrambleCounter = 0;
    }

    update() {
      this.headY += this.speed;
      this.opacity -= this.decay;
      this.scrambleCounter++;

      // Decryption scrambling: randomize characters in the stream
      if (this.scrambleCounter % 3 === 0) {
        const idx = Math.floor(Math.random() * this.length);
        this.chars[idx] = getRandomGlyph();
      }
    }

    draw(context, dark, now) {
      if (this.opacity <= 0) return;

      context.save();
      context.font = `700 ${FONT_SIZE}px 'JetBrains Mono', monospace`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';

      for (let i = 0; i < this.length; i++) {
        const charY = this.headY - i * ROW_HEIGHT;
        if (charY < -20 || charY > height + 20) continue;

        // Calculate proximity to current mouse cursor
        const dx = this.x - mouse.x;
        const dy = charY - mouse.y;
        const directDist = Math.sqrt(dx * dx + dy * dy);

        // Also calculate distance to recent mouse trajectory points
        let minTrailDist = directDist;
        for (let t = 0; t < trailHistory.length; t++) {
          const pt = trailHistory[t];
          const age = now - pt.time;
          if (age > 2200) continue;
          const tdx = this.x - pt.x;
          const tdy = charY - pt.y;
          const tdist = Math.sqrt(tdx * tdx + tdy * tdy);
          if (tdist < minTrailDist) {
            minTrailDist = tdist;
          }
        }

        // Spotlight radius: 140px full brightness, soft falloff up to 230px
        let spotAlpha = 0;
        if (minTrailDist < 140) {
          spotAlpha = 1.0;
        } else if (minTrailDist < 230) {
          spotAlpha = 1.0 - (minTrailDist - 140) / 90;
        }

        // Background stream life opacity multiplied by the spatial spotlight mask
        const finalAlpha = this.opacity * spotAlpha;
        if (finalAlpha <= 0.02) continue;

        // Realistic Red Matrix Coloring from the reference image:
        if (i === 0) {
          // Head drop: Neon White-Hot Crimson tip
          if (dark) {
            context.fillStyle = `rgba(255, 240, 245, ${finalAlpha})`;
            context.shadowColor = 'rgba(239, 68, 68, 1)';
            context.shadowBlur = 10;
          } else {
            // High-contrast crimson head in Light Mode
            context.fillStyle = `rgba(220, 38, 38, ${finalAlpha * 0.95})`;
            context.shadowColor = 'rgba(220, 38, 38, 0.7)';
            context.shadowBlur = 5;
          }
        } else if (i < 5) {
          // Upper stream: Brilliant Matrix Crimson Red
          context.fillStyle = dark
            ? `rgba(239, 68, 68, ${finalAlpha * 0.95})`
            : `rgba(220, 38, 38, ${finalAlpha * 0.85})`;
          context.shadowColor = 'rgba(220, 38, 38, 0.6)';
          context.shadowBlur = dark ? 6 : 3;
        } else if (i < 12) {
          // Mid stream: Deep Crimson Red
          context.fillStyle = dark
            ? `rgba(220, 38, 38, ${finalAlpha * 0.85})`
            : `rgba(185, 28, 28, ${finalAlpha * 0.75})`;
          context.shadowColor = 'rgba(185, 28, 28, 0.3)';
          context.shadowBlur = 2;
        } else {
          // Tail stream: Dark blood-red fading out
          const tailFade = 1 - (i - 12) / (this.length - 12);
          const tailAlpha = finalAlpha * tailFade * 0.65;
          context.fillStyle = dark
            ? `rgba(153, 27, 27, ${tailAlpha})`
            : `rgba(127, 29, 29, ${tailAlpha})`;
          context.shadowBlur = 0;
        }

        context.fillText(this.chars[i], this.x, charY);
      }

      context.restore();
    }
  }

  let streams = [];
  const columnCooldown = new Map();

  function spawnStream(targetColX, startY, speedMult = 1.0) {
    const colIndex = Math.floor(targetColX / COL_WIDTH);
    const snappedX = colIndex * COL_WIDTH + COL_WIDTH / 2;

    const now = performance.now();
    const lastTime = columnCooldown.get(colIndex) || 0;
    if (now - lastTime < 90) return; // Prevent over-stacking on the same column
    columnCooldown.set(colIndex, now);

    const speed = (Math.random() * 3.5 + 4.5) * speedMult;
    const length = Math.floor(Math.random() * 12) + 14; // 14 to 26 characters long
    streams.push(new MatrixRainColumn(colIndex, snappedX, startY, speed, length));
  }

  // Click shockwave: Dense burst of falling red matrix rain
  window.addEventListener('click', (e) => {
    const burstCount = 14;
    for (let i = 0; i < burstCount; i++) {
      if (streams.length < 180) {
        const offset = (Math.random() - 0.5) * 220;
        const startY = e.clientY - Math.random() * 120 - 40;
        spawnStream(e.clientX + offset, startY, 1.2);
      }
    }
  }, { passive: true });

  let lastStationaryTime = 0;

  function render(timestamp) {
    ctx.clearRect(0, 0, width, height);

    const dark = isDarkTheme();

    // 1. Draw subtle ambient cybernetic cursor spotlight glow on background
    if (mouse.active && (timestamp - mouse.lastMoveTime < 3500)) {
      ctx.save();
      const glowGrad = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 220
      );
      if (dark) {
        glowGrad.addColorStop(0, 'rgba(239, 68, 68, 0.16)');
        glowGrad.addColorStop(0.5, 'rgba(220, 38, 38, 0.06)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(220, 38, 38, 0.08)');
        glowGrad.addColorStop(0.5, 'rgba(220, 38, 38, 0.03)');
        glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.fillRect(mouse.x - 220, mouse.y - 220, 440, 440);
      ctx.restore();
    }

    // Prune old trail history
    while (trailHistory.length > 0 && timestamp - trailHistory[0].time > 2200) {
      trailHistory.shift();
    }

    // Continuously generate vertical rain columns wherever the mouse is
    if (mouse.active && (timestamp - mouse.lastMoveTime < 4000)) {
      if (timestamp - lastStationaryTime > 45) {
        // Spawn 2-3 dense columns around the cursor
        const spawnCount = Math.floor(Math.random() * 2) + 2;
        for (let s = 0; s < spawnCount; s++) {
          if (streams.length < 150) {
            const offset = (Math.random() - 0.5) * 190;
            const startY = mouse.y - Math.random() * 90 - 20;
            spawnStream(mouse.x + offset, startY, 1.0);
          }
        }
        lastStationaryTime = timestamp;
      }
    }

    // Update and draw all active matrix rain columns in background
    for (let i = streams.length - 1; i >= 0; i--) {
      const stream = streams[i];
      stream.update();
      stream.draw(ctx, dark, timestamp);

      if (stream.opacity <= 0 || (stream.headY - stream.length * ROW_HEIGHT > height + 40)) {
        streams.splice(i, 1);
      }
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();

/**
 * Google Antigravity Interactive Zero-G Physics & Particle Field Engine
 * Inspired by https://antigravity.google
 * 
 * Features:
 * - Weightless zero-gravity upward particle drift (liftoff physics)
 * - Interactive gravitational repulsion & vortex force field around cursor
 * - Delicate neural synapse laser filaments connecting close nodes
 * - Smooth radial Antigravity cursor beacon / ambient luminescence
 * - Zero-G click gravitational shockwave ripple
 * - Dynamic Light/Dark mode palette (Crimson Red, Stark Black, Slate Gray)
 * - Layered in background (z-index: 1) for 100% clean typography readability
 */

(function initAntigravityEngine() {
  // Remove old matrix canvas if it exists
  const oldCanvas = document.getElementById('cursorMatrixCanvas');
  if (oldCanvas) oldCanvas.remove();

  // Create or retrieve Antigravity Canvas
  let canvas = document.getElementById('antigravityCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'antigravityCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1'; // Behind all text, cards, and header
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  // Mouse & Gravitational Physics State
  const mouse = {
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
    speed: 0,
    radius: 170, // Antigravity force field radius
    active: false,
    lastActive: 0
  };

  const shockwaves = [];

  window.addEventListener('mousemove', (e) => {
    mouse.active = true;
    mouse.lastActive = performance.now();
    
    mouse.vx = e.clientX - mouse.x;
    mouse.vy = e.clientY - mouse.y;
    mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseenter', () => {
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Antigravity Shockwave on Click
  window.addEventListener('click', (e) => {
    shockwaves.push({
      x: e.clientX,
      y: e.clientY,
      radius: 5,
      maxRadius: 260,
      strength: 7.5,
      alpha: 1.0
    });
  }, { passive: true });

  // Antigravity Zero-G Particle
  class AntigravityParticle {
    constructor(randomY = true) {
      this.x = Math.random() * width;
      this.y = randomY ? Math.random() * height : height + Math.random() * 40;
      this.size = Math.random() * 2.2 + 1.2; // 1.2px to 3.4px
      
      // Zero-G upward drift velocity
      this.baseVy = -(Math.random() * 0.45 + 0.25); // Gentle upward float
      this.baseVx = (Math.random() - 0.5) * 0.35;
      
      this.vx = this.baseVx;
      this.vy = this.baseVy;
      
      this.mass = Math.random() * 0.8 + 0.6; // Inertia factor
      this.oscillationSpeed = Math.random() * 0.02 + 0.01;
      this.oscillationOffset = Math.random() * Math.PI * 2;
      
      // Node classification:
      // 0: Crimson Red Node
      // 1: Stark Black / Crisp White Node
      // 2: Slate Gray Stardust
      const rand = Math.random();
      if (rand < 0.45) {
        this.type = 0; // Red
      } else if (rand < 0.75) {
        this.type = 1; // Black / White
      } else {
        this.type = 2; // Slate
      }

      this.pulse = Math.random() * Math.PI;
    }

    update(time) {
      // Natural weightless zero-g upward drift with subtle sine wave oscillation
      this.pulse += 0.03;
      const wave = Math.sin(time * this.oscillationSpeed + this.oscillationOffset) * 0.2;
      
      this.vx += (this.baseVx + wave - this.vx) * 0.04;
      this.vy += (this.baseVy - this.vy) * 0.04;

      // Interactive Antigravity Repulsion & Vortex Force from cursor
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 1) {
          const normalX = dx / dist;
          const normalY = dy / dist;
          
          // Repulsion force (falls off smoothly toward the edge)
          const force = ((mouse.radius - dist) / mouse.radius) * (3.8 / this.mass);
          
          // Tangential vortex spin force (creates organic swirling fluid motion)
          const tangentX = -normalY * 0.8;
          const tangentY = normalX * 0.8;

          this.vx += (normalX * force + tangentX * (force * 0.5));
          this.vy += (normalY * force + tangentY * (force * 0.5));
        }
      }

      // Gravitational Shockwaves
      for (let s = 0; s < shockwaves.length; s++) {
        const sw = shockwaves[s];
        const sdx = this.x - sw.x;
        const sdy = this.y - sw.y;
        const sdist = Math.sqrt(sdx * sdx + sdy * sdy);
        const diff = Math.abs(sdist - sw.radius);

        if (diff < 35 && sdist > 1) {
          const push = ((35 - diff) / 35) * sw.strength * sw.alpha;
          this.vx += (sdx / sdist) * push;
          this.vy += (sdy / sdist) * push;
        }
      }

      // Damping / Friction
      this.vx *= 0.95;
      this.vy *= 0.95;

      // Apply velocity
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges smoothly
      if (this.y < -30) {
        this.y = height + 20;
        this.x = Math.random() * width;
      } else if (this.y > height + 30) {
        this.y = -20;
        this.x = Math.random() * width;
      }

      if (this.x < -30) {
        this.x = width + 20;
      } else if (this.x > width + 30) {
        this.x = -20;
      }
    }

    draw(context, dark) {
      context.save();

      let fillStyle, shadowColor, glowBlur;
      const pulsingSize = this.size + Math.sin(this.pulse) * 0.4;

      if (dark) {
        if (this.type === 0) {
          // Crimson Red Glowing Node
          fillStyle = 'rgba(239, 68, 68, 0.9)';
          shadowColor = 'rgba(239, 68, 68, 0.85)';
          glowBlur = 8;
        } else if (this.type === 1) {
          // Electric Star White
          fillStyle = 'rgba(255, 255, 255, 0.85)';
          shadowColor = 'rgba(255, 255, 255, 0.6)';
          glowBlur = 6;
        } else {
          // Slate Blue-Gray Stardust
          fillStyle = 'rgba(148, 163, 184, 0.6)';
          shadowColor = 'transparent';
          glowBlur = 0;
        }
      } else {
        // Light Mode: Vibrant Crimson, Stark Jet Black, Slate Gray
        if (this.type === 0) {
          fillStyle = 'rgba(220, 38, 38, 0.85)';
          shadowColor = 'rgba(220, 38, 38, 0.45)';
          glowBlur = 6;
        } else if (this.type === 1) {
          fillStyle = 'rgba(9, 9, 11, 0.75)';
          shadowColor = 'rgba(9, 9, 11, 0.2)';
          glowBlur = 3;
        } else {
          fillStyle = 'rgba(100, 116, 139, 0.5)';
          shadowColor = 'transparent';
          glowBlur = 0;
        }
      }

      context.shadowColor = shadowColor;
      context.shadowBlur = glowBlur;
      context.fillStyle = fillStyle;

      context.beginPath();
      context.arc(this.x, this.y, Math.max(pulsingSize, 0.8), 0, Math.PI * 2);
      context.fill();

      context.restore();
    }
  }

  // Particle count tuned for silky smooth 60-120fps performance
  const count = Math.min(Math.floor((width * height) / 9500), 125);
  const particles = Array.from({ length: count }, () => new AntigravityParticle(true));

  // Connect close particles with neural synapse laser filaments
  function drawFilaments(context, dark) {
    const maxDistance = 90;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const lineAlpha = (1 - dist / maxDistance) * 0.32;
          context.save();
          context.beginPath();
          context.moveTo(particles[i].x, particles[i].y);
          context.lineTo(particles[j].x, particles[j].y);

          if (dark) {
            if (particles[i].type === 0 || particles[j].type === 0) {
              context.strokeStyle = `rgba(239, 68, 68, ${lineAlpha * 1.2})`;
            } else {
              context.strokeStyle = `rgba(255, 255, 255, ${lineAlpha * 0.7})`;
            }
          } else {
            // Light Mode filaments
            if (particles[i].type === 0 || particles[j].type === 0) {
              context.strokeStyle = `rgba(220, 38, 38, ${lineAlpha * 0.9})`;
            } else {
              context.strokeStyle = `rgba(15, 23, 42, ${lineAlpha * 0.5})`;
            }
          }

          context.lineWidth = 0.75;
          context.stroke();
          context.restore();
        }
      }
    }
  }

  // Main Antigravity Render Loop
  function render(time) {
    ctx.clearRect(0, 0, width, height);
    const dark = isDarkTheme();

    // 1. Draw Google Antigravity Liftoff Beacon / Atmospheric Cursor Halo
    if (mouse.active && (performance.now() - mouse.lastActive < 4000)) {
      ctx.save();
      const haloRadius = 240;
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, haloRadius
      );

      if (dark) {
        gradient.addColorStop(0, 'rgba(239, 68, 68, 0.15)');
        gradient.addColorStop(0.45, 'rgba(220, 38, 38, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(220, 38, 38, 0.09)');
        gradient.addColorStop(0.45, 'rgba(220, 38, 38, 0.03)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(mouse.x - haloRadius, mouse.y - haloRadius, haloRadius * 2, haloRadius * 2);
      ctx.restore();
    }

    // 2. Update and draw Shockwaves
    for (let s = shockwaves.length - 1; s >= 0; s--) {
      const sw = shockwaves[s];
      sw.radius += 5.5;
      sw.alpha = 1.0 - (sw.radius / sw.maxRadius);

      if (sw.alpha <= 0) {
        shockwaves.splice(s, 1);
        continue;
      }

      ctx.save();
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.strokeStyle = dark
        ? `rgba(239, 68, 68, ${sw.alpha * 0.4})`
        : `rgba(220, 38, 38, ${sw.alpha * 0.3})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    }

    // 3. Connect close nodes with neural filaments
    drawFilaments(ctx, dark);

    // 4. Update and render Zero-G particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(time);
      particles[i].draw(ctx, dark);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
})();

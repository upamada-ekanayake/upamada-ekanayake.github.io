/**
 * Neural Synapse Particle Network Animation
 * Adapts to Light Mode (Red, Black, Gray) and Dark Mode dynamically
 */

(function initNeuralCanvas() {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.clientWidth || 600;
    height = canvas.height = parent.clientHeight || 600;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function isDarkTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.baseX = this.x;
      this.baseY = this.y;
      this.size = Math.random() * 2.2 + 1.2;
      this.speedX = (Math.random() - 0.5) * 0.7;
      this.speedY = (Math.random() - 0.5) * 0.7;
      this.type = Math.random(); // 0.0 to 1.0 for styling
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      // Mouse proximity interaction
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * 2.5;
          const directionY = forceDirectionY * force * 2.5;
          this.x += directionX;
          this.y += directionY;
        }
      }
    }

    draw() {
      const dark = isDarkTheme();
      let color, glowColor;

      if (dark) {
        if (this.type > 0.6) {
          color = '#ef4444';
          glowColor = 'rgba(239, 68, 68, 0.8)';
        } else {
          color = '#3b82f6';
          glowColor = 'rgba(59, 130, 246, 0.8)';
        }
      } else {
        // Light Mode: Red, Black, Gray
        if (this.type > 0.7) {
          color = '#dc2626'; // Vibrant red
          glowColor = 'rgba(220, 38, 38, 0.6)';
        } else if (this.type > 0.35) {
          color = '#18181b'; // Stark black
          glowColor = 'rgba(24, 24, 27, 0.3)';
        } else {
          color = '#64748b'; // Slate gray
          glowColor = 'rgba(100, 116, 139, 0.2)';
        }
      }

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = dark ? 10 : 6;
      ctx.shadowColor = glowColor;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  const particleCount = Math.min(Math.floor((width * height) / 8500), 55);
  particles = Array.from({ length: particleCount }, () => new Particle());

  function connect() {
    const maxDistance = 95;
    const dark = isDarkTheme();

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * (dark ? 0.45 : 0.35);
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);

          if (dark) {
            if (particles[a].type > 0.6 || particles[b].type > 0.6) {
              ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
            } else {
              ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            }
          } else {
            // Light mode lines
            if (particles[a].type > 0.7 || particles[b].type > 0.7) {
              ctx.strokeStyle = `rgba(220, 38, 38, ${opacity * 1.2})`;
            } else {
              ctx.strokeStyle = `rgba(15, 23, 42, ${opacity * 0.7})`;
            }
          }

          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    connect();
    requestAnimationFrame(animate);
  }

  animate();
})();

/**
 * Upamada Ekanayake Portfolio — Main UI Interactivity & Theme Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Switcher (Default: Light Mode with Red, Black, and Gray)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const html = document.documentElement;

  // Check saved theme or default to 'light'
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>`;
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      }
    } else {
      html.removeAttribute('data-theme'); // default is light
      if (themeToggleBtn) {
        themeToggleBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>`;
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      }
    }
    localStorage.setItem('portfolio-theme', theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // 2. Navigation Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (category && category.includes(filter))) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Modal Architecture Detail
  const modalBackdrop = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalContent = document.getElementById('modalContent');
  const modalTags = document.getElementById('modalTags');

    const PROJECT_DETAILS = {
    agentforge: {
      title: 'AgentForge — Enterprise AI Workflow Platform',
      subtitle: 'Next.js • FastAPI • Qdrant Vector DB • PostgreSQL • Docker • Ollama/Qwen',
      github: 'https://github.com/upamada-ekanayake/AgentForge',
      live: null,
      content: `
        <p><strong>System Architecture:</strong> Designed and implemented a portfolio-grade autonomous AI workflow platform. Features a clean multi-tier architecture with Next.js frontend, asynchronous FastAPI backend, PostgreSQL transactional store, and Qdrant high-dimensional vector search.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Engineered deterministic agent workflow DAGs with continuous state tracking and real-time execution visualizer.</li>
          <li>Integrated Qdrant vector database for sub-50ms contextual document retrieval and dense embeddings indexing.</li>
          <li>Implemented provider-agnostic local LLM adapter supporting Ollama and Qwen3 with automated fallback paths.</li>
          <li>Set up end-to-end Docker Compose local infrastructure and automated GitHub Actions CI for backend and frontend.</li>
        </ul>
      `,
      tags: ['Next.js', 'FastAPI', 'Qdrant', 'PostgreSQL', 'Docker', 'Ollama', 'Python', 'TypeScript']
    },
    allerguard: {
      title: 'AllerGuard AI — Food Allergen Screening & Audit',
      subtitle: 'TensorFlow • FastAPI • React • EasyOCR • TypeScript • Vite',
      github: 'https://github.com/upamada-ekanayake/AllerGuard-AI',
      live: null,
      content: `
        <p><strong>System Architecture:</strong> Explainable hybrid food safety research prototype combining computer vision OCR, curated medical allergen knowledge graphs, context-aware rule validation, and neural multi-label classification.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Built high-accuracy text extraction pipeline using EasyOCR to parse complex multi-lingual food ingredient labels from camera feeds.</li>
          <li>Trained neural multi-label classification model on ingredient evidence to detect hidden allergens and cross-contamination risks.</li>
          <li>Engineered automated consistency auditing comparing marketing claims against fine-print allergen disclosures with <strong>99.2% accuracy</strong>.</li>
          <li>Rendered personalized allergen risk explanations with transparent confidence scores.</li>
        </ul>
      `,
      tags: ['TensorFlow', 'FastAPI', 'React', 'EasyOCR', 'Explainable AI', 'NLP', 'TypeScript', 'Vite']
    },
    focusguard: {
      title: 'FocusGuard AI — Real-Time Driver Drowsiness Detector',
      subtitle: 'Python • OpenCV • MediaPipe Face Mesh • Real-Time EAR',
      github: 'https://github.com/upamada-ekanayake/-FocusGuard-AI-Drowsiness-Detector-',
      live: null,
      content: `
        <p><strong>System Architecture:</strong> Real-time computer vision driver safety system designed to eliminate fatigue-induced vehicle collisions using facial biometric telemetry.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Utilized MediaPipe Face Mesh tracking <strong>468 facial landmark coordinates</strong> at zero latency on standard consumer webcams.</li>
          <li>Formulated Eye Aspect Ratio (EAR) mathematical calculation to continuously monitor blink frequency and eye closure duration.</li>
          <li>Triggered instantaneous progressive acoustic and visual warning alarms upon sustained closure (EAR &lt; 0.25 threshold).</li>
          <li>Optimized computer vision loop delivering sustained <strong>30+ FPS</strong> with low CPU footprint.</li>
        </ul>
      `,
      tags: ['Python', 'OpenCV', 'MediaPipe', 'Face Mesh', 'Computer Vision', 'Biometrics', 'Real-Time AI']
    },
    flixmate: {
      title: 'FlixMate — AI Movie Booking & Personalization Engine',
      subtitle: 'React • TypeScript • Express.js • PostgreSQL • Prisma • Tailwind CSS',
      github: 'https://github.com/upamada-ekanayake/flixmate-movie-booking-system',
      live: 'https://flixmate-movie-booking-system.vercel.app',
      content: `
        <p><strong>System Architecture:</strong> Full-stack entertainment platform integrating behavioral AI recommendation algorithms, 3D seat scheduling math, atomic database isolation checkouts, dynamic surge pricing, and QR ticketing.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Developed custom movie recommendation engine matching user viewing patterns and genre affinity clusters.</li>
          <li>Engineered interactive 3D auditorium seating map with real-time seat lock and reservation conflict prevention.</li>
          <li>Implemented transactional ACID checkout workflows using Prisma ORM and PostgreSQL with automatic QR ticket generation.</li>
          <li>Deployed to production on Vercel with responsive micro-interactions and sub-second load times.</li>
        </ul>
      `,
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Express.js', 'PostgreSQL', 'Prisma', 'Vite', 'Vercel']
    },
    studentsupport: {
      title: 'Student Support AI — Academic & Mental Health Platform',
      subtitle: 'React • TypeScript • FastAPI • RAG • Scikit-Learn • Tailwind CSS',
      github: 'https://github.com/upamada-ekanayake/student-support-ai-system',
      live: 'https://student-support-ai-system.vercel.app',
      content: `
        <p><strong>System Architecture:</strong> Holistic AI ecosystem engineered for higher education students and faculty, combining RAG document intelligence, predictive machine learning models, and adaptive study scheduling.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Integrated retrieval-augmented generation (RAG) module enabling instant semantic search and Q&A over lecture notes and syllabi.</li>
          <li>Built Scikit-Learn GPA prediction regression engine that identifies academic risk early and recommends targeted interventions.</li>
          <li>Implemented intelligent study planning engine that balances academic workload against stress metrics.</li>
          <li>Delivered comprehensive faculty analytics dashboard monitoring aggregate student success and course retention.</li>
        </ul>
      `,
      tags: ['React', 'TypeScript', 'FastAPI', 'RAG', 'Scikit-Learn', 'Tailwind CSS', 'Vercel']
    },
    stocktrend: {
      title: 'Stock Price Trend Predictor — Market Direction ML',
      subtitle: 'Python • XGBoost • SHAP • LightGBM • Scikit-Learn • Pandas',
      github: 'https://github.com/upamada-ekanayake/stock-price-trend-predictor',
      live: null,
      content: `
        <p><strong>System Architecture:</strong> Production-grade quantitative machine learning pipeline predicting short-term stock market trend directions with time-series feature engineering, market regime detection, and transparent model explainability.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Extracted over 40 financial technical indicators (RSI, MACD, Bollinger Bands, ATR, rolling volatility) across historical equity datasets.</li>
          <li>Trained XGBoost and LightGBM gradient-boosted ensembles with walk-forward cross-validation preventing data leakage.</li>
          <li>Audited model predictions using SHAP TreeExplainer to render waterfall feature importance plots for each market signal.</li>
          <li>Incorporated market regime detection to dynamically adjust model sensitivity across high-volatility and trending regimes.</li>
        </ul>
      `,
      tags: ['Python', 'XGBoost', 'SHAP', 'LightGBM', 'Scikit-Learn', 'Pandas', 'Quantitative ML']
    },
    smartpark: {
      title: 'SMART-PARKAI — Intelligent Vehicle Parking System',
      subtitle: 'Spring Boot • React • PostgreSQL • JWT • QR Validation • Java',
      github: 'https://github.com/upamada-ekanayake/SMART-PARKAI',
      live: 'https://smart-parkai.vercel.app',
      content: `
        <p><strong>System Architecture:</strong> Full-stack smart parking booking platform with enterprise Spring Boot backend, PostgreSQL database, role-based access control, QR ticket verification, and React/Vite slot monitor.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Developed secure RESTful API endpoints in Java Spring Boot with stateless JWT token authentication and role authorization.</li>
          <li>Built interactive 3D multi-level parking map displaying live available/occupied slot telemetry.</li>
          <li>Engineered automated QR code verification mechanism for gate check-in and checkout validation.</li>
          <li>Configured production deployment on Vercel with real-time revenue and parking occupancy analytics.</li>
        </ul>
      `,
      tags: ['Spring Boot', 'Java', 'React', 'PostgreSQL', 'JWT', 'QR Verification', 'Vercel']
    },
    kairos: {
      title: 'Kairos AI — Adaptive Study Momentum System',
      subtitle: 'Google Gemini API • AI Studio • TypeScript • Next.js',
      github: 'https://github.com/upamada-ekanayake/kairos-ai',
      live: null,
      content: `
        <p><strong>System Architecture:</strong> AI-powered study momentum and recovery application built with Google Gemini, designed to help overwhelmed students overcome procrastination and task paralysis.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Engineered adaptive prompt chains with Google Gemini to decompose overwhelming assignments into micro-actions.</li>
          <li>Built cognitive load monitoring system that detects early signs of burnout and schedules restorative focus intervals.</li>
          <li>Developed fluid Next.js interface with dark mode and zero-friction task capture.</li>
          <li>Recognized as a featured Gemini AI Studio ecosystem application.</li>
        </ul>
      `,
      tags: ['Google Gemini', 'AI Studio', 'TypeScript', 'Next.js', 'Cognitive AI', 'Prompt Engineering']
    },
    aurafitness: {
      title: 'AuraFitness (AuraFit) — Predictive AI Fitness Suite',
      subtitle: 'React • TypeScript • FastAPI • TensorFlow • Mobile Architecture',
      github: 'https://github.com/upamada-ekanayake/AuraFitness',
      live: 'https://aura-fitness-kappa.vercel.app',
      content: `
        <p><strong>System Architecture:</strong> Premium end-to-end fitness intelligence platform featuring computer vision form analysis, metabolic calorie estimation, intelligent predictive workout generator, and unified gym management.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Trained predictive machine learning workout recommendation models on over <strong>10,000 workout profiles</strong>.</li>
          <li>Built calorie and metabolic expenditure estimators calibrated across age, gender, and training intensity variables.</li>
          <li>Engineered cross-platform mobile and web client with live telemetry and progress analytics.</li>
          <li>Deployed live production app on Vercel with role-based dashboards for athletes, coaches, and gym administrators.</li>
        </ul>
      `,
      tags: ['React', 'FastAPI', 'TensorFlow', 'Mobile Architecture', 'TypeScript', 'Vercel']
    }
  };

    document.querySelectorAll('.open-details-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = PROJECT_DETAILS[projKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      
      let extraLinks = '<div style="display:flex; gap:12px; margin-top:20px;">';
      if (data.github) {
        extraLinks += `<a href="${data.github}" target="_blank" class="btn btn-primary-gradient" style="padding:8px 18px; font-size:12px; text-decoration:none;">View on GitHub &rarr;</a>`;
      }
      if (data.live) {
        extraLinks += `<a href="${data.live}" target="_blank" class="btn btn-glass-secondary" style="padding:8px 18px; font-size:12px; text-decoration:none;">Open Live Demo &#8599;</a>`;
      }
      extraLinks += '</div>';

      modalContent.innerHTML = data.content + extraLinks;
      modalTags.innerHTML = data.tags.map((t) => `<span class="tech-pill">${t}</span>`).join('');

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // 6. Copy Email to Clipboard with Toast Notification
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toastNotice');

  function showToast(msg) {
    if (!toast) return;
    toast.querySelector('.toast-text').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  copyEmailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'upamadaekanayake@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('✓ Email copied to clipboard: ' + email);
      }).catch(() => {
        showToast('Email: ' + email);
      });
    });
  });

  // 7. Contact Form Interaction
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const email = document.getElementById('senderEmail').value;
      const message = document.getElementById('senderMessage').value;

      const mailtoUrl = `mailto:upamadaekanayake@gmail.com?subject=Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`;
      window.location.href = mailtoUrl;

      showToast('✓ Preparing transmission client...');
      contactForm.reset();
    });
  }

  // 8. Hero Video Play/Pause and Audio Controls
  const heroVideo = document.getElementById('heroVideo');
  const heroVideoToggleBtn = document.getElementById('heroVideoToggleBtn');
  const videoBtnText = document.getElementById('videoBtnText');
  const videoBtnIcon = document.getElementById('videoBtnIcon');

  const heroVideoMuteBtn = document.getElementById('heroVideoMuteBtn');
  const muteBtnText = document.getElementById('muteBtnText');
  const muteBtnIcon = document.getElementById('muteBtnIcon');

  if (heroVideo && heroVideoToggleBtn) {
    heroVideoToggleBtn.addEventListener('click', () => {
      if (heroVideo.paused) {
        heroVideo.play().then(() => {
          if (videoBtnText) videoBtnText.textContent = 'PAUSE';
          if (videoBtnIcon) {
            videoBtnIcon.innerHTML = `
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>`;
          }
          showToast('► Quantum Neural Core: Feed Resumed');
        }).catch(() => {});
      } else {
        heroVideo.pause();
        if (videoBtnText) videoBtnText.textContent = 'PLAY';
        if (videoBtnIcon) {
          videoBtnIcon.innerHTML = `<polygon points="6 4 20 12 6 20 6 4"></polygon>`;
        }
        showToast('⏸ Quantum Neural Core: Feed Paused');
      }
    });
  }

  if (heroVideo && heroVideoMuteBtn) {
    heroVideoMuteBtn.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      if (heroVideo.muted) {
        if (muteBtnText) muteBtnText.textContent = 'MUTED';
        if (muteBtnIcon) {
          muteBtnIcon.innerHTML = `
            <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>`;
        }
        showToast('Audio Muted');
      } else {
        if (muteBtnText) muteBtnText.textContent = 'AUDIO ON';
        if (muteBtnIcon) {
          muteBtnIcon.innerHTML = `
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>`;
        }
        showToast('Audio Enabled');
      }
    });
  }

  // 9. Spatial Cyber Viewport 3D Mouse Parallax Tilt
  const heroWrapper = document.querySelector('.hero-visual-wrapper');
  const viewportCard = document.getElementById('heroViewportCard');

  if (heroWrapper && viewportCard) {
    let ticking = false;

    heroWrapper.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = heroWrapper.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg tilt
          const rotateY = ((x - centerX) / centerX) * 9;

          viewportCard.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    heroWrapper.addEventListener('mouseleave', () => {
      viewportCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
});

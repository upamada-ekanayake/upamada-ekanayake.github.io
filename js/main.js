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
    agentic: {
      title: 'Multi-Agent Autonomous Data Analyst',
      subtitle: 'CrewAI • LangGraph • RAG • OpenAI API • Python',
      content: `
        <p><strong>System Architecture:</strong> Orchestrated an asynchronous multi-agent collective consisting of Specialized Research Agents, Code Synthesis Bots, QA Validators, and Executive Report Writers.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Automated end-to-end PDF market analysis and extraction, decreasing operational processing time by <strong>70%</strong>.</li>
          <li>Engineered resilient vector retrieval pipelines using hybrid dense-sparse RAG to synthesize unstructured corporate intelligence into actionable decision briefs.</li>
          <li>Built stateful cyclic graphs using LangGraph to enable autonomous error-recovery loops and dynamic tool selection.</li>
        </ul>
      `,
      tags: ['CrewAI', 'LangGraph', 'RAG', 'OpenAI API', 'Pandas', 'Python', 'Vector DB']
    },
    vision: {
      title: 'Real-Time Multimodal Vision & Scene Engine',
      subtitle: 'YOLOv11 • Florence-2 • Vision LLMs • OpenCV',
      content: `
        <p><strong>System Architecture:</strong> Integrated cutting-edge YOLOv11 for zero-latency object localization with Florence-2 vision-language foundation models for rich natural language scene synthesis.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Optimized inference pipeline achieving sustained <strong>30 FPS</strong> on edge hardware for industrial defect classification.</li>
          <li>Engineered continuous multi-camera telemetry streaming with zero frame degradation.</li>
          <li>Integrated multimodal scene queries allowing operators to prompt video feeds with natural language questions.</li>
        </ul>
      `,
      tags: ['YOLOv11', 'Florence-2', 'Vision LLMs', 'OpenCV', 'Streamlit', 'Edge AI']
    },
    xai: {
      title: 'Explainable ML Engine for High-Risk Analytics',
      subtitle: 'XGBoost • SHAP • Scikit-Learn • Streamlit',
      content: `
        <p><strong>System Architecture:</strong> High-precision predictive modeling framework with integrated model explainability layers to meet financial audit and compliance mandates.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Achieved <strong>94% ROC-AUC</strong> accuracy on complex, high-risk churn and fraud detection distributions.</li>
          <li>Rendered global and local feature contributions via SHAP TreeExplainer and waterfall breakdowns for immediate stakeholder auditability.</li>
          <li>Built automated feature transformation pipelines handling extreme class imbalance.</li>
        </ul>
      `,
      tags: ['XGBoost', 'SHAP Values', 'Scikit-Learn', 'Feature Engineering', 'Streamlit']
    },
    shuttle: {
      title: 'Smart Shuttle AI System & Dynamic Graph Routing',
      subtitle: 'Team Leader • YOLOv11 • Graph Simulation • Python',
      content: `
        <p><strong>System Architecture:</strong> Campus-wide intelligent passenger dispatch and dynamic bus transit optimization system built on graph-based neural simulations.</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Led a cross-functional engineering squad of 5 to develop computer vision terminal monitoring using YOLOv11.</li>
          <li>Engineered dynamic graph routing algorithms benchmarking a <strong>22% to 25% reduction</strong> in peak-load student passenger wait times.</li>
          <li>Published source code and real-world benchmark dataset openly on GitHub.</li>
        </ul>
      `,
      tags: ['YOLOv11', 'Graph Algorithms', 'Computer Vision', 'Simulation', 'Python']
    },
    webai: {
      title: 'AI-Integrated Business Web Platforms',
      subtitle: 'Next.js • React • Tailwind CSS • Gemini API • Vercel',
      content: `
        <p><strong>System Architecture:</strong> Production client web platforms deployed for commercial enterprises (Score Fitness, Kandy Aluminium).</p>
        <br/>
        <p><strong>Key Engineering Feats:</strong></p>
        <ul style="margin-left: 20px; line-height: 1.8; color: var(--text-secondary);">
          <li>Integrated custom fine-tuned Gemini API conversational agents resulting in a <strong>40% boost</strong> in customer engagement and lead capture.</li>
          <li>Engineered fluid 60 FPS interfaces using Framer Motion and optimized Next.js server components for sub-second load times.</li>
        </ul>
      `,
      tags: ['Next.js', 'Gemini API', 'React', 'Framer Motion', 'Tailwind CSS', 'Vercel']
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
      modalContent.innerHTML = data.content;
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

/**
 * Interactive Cybernetic AI Terminal Emulator
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalBody = document.getElementById('terminalBody');
  const terminalInput = document.getElementById('terminalInput');
  const chips = document.querySelectorAll('.t-chip');

  if (!terminalBody || !terminalInput) return;

  const COMMAND_RESPONSES = {
    help: `
<span style="color:#60a5fa">SYSTEM DIRECTORY OF AVAILABLE COMMANDS:</span>
  <span style="color:#f87171">about</span>        - Profile summary, education & core focus
  <span style="color:#f87171">skills</span>       - AI frameworks, languages, MLOps stack
  <span style="color:#f87171">projects</span>     - Major AI & Machine Learning deployments
  <span style="color:#f87171">research</span>     - Dynamic graph routing & AST research papers
  <span style="color:#f87171">contact</span>      - Direct communication channels & links
  <span style="color:#f87171">status</span>       - Current availability for AI/ML Internships
  <span style="color:#f87171">clear</span>        - Flush terminal buffer
`,
    about: `
<span style="color:#fff; font-weight:600;">UPAMADA EKANAYAKE</span>
AI Engineering Undergraduate at SLIIT (Expected Graduation: 2027)
Location: Pilimathalawa, Sri Lanka
Cumulative GPA: 3.2 / 4.0 | Recent Semester GPA: 3.6 / 4.0
Specialization: Agentic AI workflows (CrewAI, LangGraph), Real-Time Computer Vision (YOLOv11),
Explainable ML (XGBoost + SHAP), and scalable MLOps architectures.
`,
    skills: `
<span style="color:#60a5fa">CORE TECHNICAL MATRIX:</span>
• <strong style="color:#fff">AI & Frameworks:</strong> CrewAI, LangGraph, RAG, YOLOv11, OpenCV, TensorFlow, Scikit-Learn, XGBoost, SHAP
• <strong style="color:#fff">Languages:</strong> Python, Java, SQL, JavaScript, C
• <strong style="color:#fff">Full-Stack & Cloud:</strong> Next.js, React, FastAPI, Flutter, Firebase, Docker, GitHub Actions, Vercel
• <strong style="color:#fff">Data & MLOps:</strong> Model Deployment, REST APIs, Streamlit, Gradio, Pandas, NumPy
`,
    projects: `
<span style="color:#ef4444">FEATURED SYSTEMS:</span>
1. <span style="color:#fff">Multi-Agent Autonomous Data Analyst</span> [CrewAI, LangGraph, RAG] → Cut report generation time by 70%.
2. <span style="color:#fff">Explainable ML Engine for High-Risk Analytics</span> [XGBoost, SHAP] → 94% ROC-AUC accuracy.
3. <span style="color:#fff">Real-Time Multimodal Vision & Scene Engine</span> [YOLOv11, Florence-2] → 30 FPS defect detection.
4. <span style="color:#fff">Smart Shuttle AI System</span> [Team Lead, YOLOv11] → 25% passenger wait time drop.
5. <span style="color:#fff">AI Business Web Platforms</span> [Next.js, Gemini API] → Commercial client engagement +40%.
`,
    research: `
<span style="color:#a855f7">RESEARCH INITIATIVES:</span>
• <strong style="color:#fff">Smart Shuttle Dynamic Graph Routing:</strong> Deep learning simulation for campus transit. Benchmark shows 22% reduction in peak passenger wait times. Code & dataset published.
• <strong style="color:#fff">Barriers to Learning Programming:</strong> AST pattern analysis of syntax comprehension bottlenecks in 1st-year undergraduates.
`,
    contact: `
<span style="color:#60a5fa">SECURE COMMUNICATION PROTOCOL:</span>
• Email: <a href="mailto:upamadaekanayake@gmail.com" style="color:#60a5fa; text-decoration:underline;">upamadaekanayake@gmail.com</a>
• Phone: +94 76 276 3973
• GitHub: <a href="https://github.com/upamada-ekanayake" target="_blank" style="color:#f87171;">github.com/upamada-ekanayake</a>
• LinkedIn: <a href="https://linkedin.com/in/upamada-ekanayake" target="_blank" style="color:#60a5fa;">linkedin.com/in/upamada-ekanayake</a>
• Portfolio: <a href="https://upamada-ekanayake.github.io" target="_blank" style="color:#fff;">upamada-ekanayake.github.io</a>
`,
    status: `
<span style="color:#22c55e">● ACTIVE STATUS:</span> Available for AI Engineering / Machine Learning Internships (2025–2026).
Willing to relocate or work remotely on cutting-edge autonomous agents and vision systems.
`
  };

  function appendOutput(cmd, responseHtml) {
    const cmdLine = document.createElement('div');
    cmdLine.className = 't-output-line';
    cmdLine.innerHTML = `<span style="color:#3b82f6; font-weight:600;">upamada@core:~$</span> <span style="color:#fff;">${escapeHtml(cmd)}</span>`;
    terminalBody.appendChild(cmdLine);

    if (responseHtml) {
      const respLine = document.createElement('div');
      respLine.className = 't-output-line';
      respLine.innerHTML = responseHtml;
      terminalBody.appendChild(respLine);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      terminalBody.innerHTML = '';
      return;
    }

    if (COMMAND_RESPONSES[trimmed]) {
      appendOutput(cmd, COMMAND_RESPONSES[trimmed]);
    } else {
      appendOutput(cmd, `<span style="color:#ef4444">Command not recognized: '${escapeHtml(cmd)}'. Type <span style="color:#60a5fa">'help'</span> for instruction manual.</span>`);
    }
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = terminalInput.value;
      terminalInput.value = '';
      handleCommand(value);
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        handleCommand(cmd);
      }
    });
  });
});

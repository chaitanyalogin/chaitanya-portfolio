import Enhancements from "./Enhancements";

export default function PortfolioPage() {
  return <>

  <a className="skip-link" href="#main">Skip to content</a>
  <svg className="icon-library" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></symbol>
    <symbol id="i-external" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6h12v12"/></symbol>
    <symbol id="i-download" viewBox="0 0 24 24"><path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5"/></symbol>
    <symbol id="i-play" viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
    <symbol id="i-motion" viewBox="0 0 24 24"><path d="M5 12a7 7 0 1 1 7 7M3 17h7M3 21h4M3 8l2 4 4-2"/></symbol>
    <symbol id="i-code" viewBox="0 0 24 24"><path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol>
    <symbol id="i-copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8.1 7.2c-.4 0-.8.7-.8 1.4 0 2.7 3.5 6.3 6.3 6.3.7 0 1.4-.4 1.4-.8l-2-1.4-.9.7c-1.4-.7-2.1-1.4-2.8-2.8l.7-.9-1.4-2.5Z"/></symbol>
    <symbol id="i-github" viewBox="0 0 24 24"><path d="M9 19c-4 .9-4-2-6-2m12 5v-4c0-1 .1-1.4-.5-2 3-.4 6-1.5 6-6A4.8 4.8 0 0 0 19 6.5 4.4 4.4 0 0 0 19 3s-1 0-3 1.5a13 13 0 0 0-8 0C6 3 5 3 5 3a4.4 4.4 0 0 0 0 3.5A4.8 4.8 0 0 0 3.5 10c0 4.5 3 5.6 6 6-.6.6-.5 1.3-.5 2v4"/></symbol>
    <symbol id="i-linkedin" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4"/></symbol>
    <symbol id="i-youtube" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/></symbol>
  </svg>

  <header className="site-header" id="site-header">
    <div className="header-inner">
      <a className="brand" href="#home" aria-label="Chaitanya Kulkarni home"><span className="brand-mark">c<span>.</span></span><span>CHAY<span className="brand-period">.</span></span></a>
      <nav className="main-nav" id="main-nav" aria-label="Main navigation">
        <a href="#work">Work</a><a href="#about">About</a><a href="#studio">Studio</a><a href="#contact">Contact</a>
      </nav>
      <div className="header-actions">
        <button className="motion-button" id="motion-toggle" aria-pressed="false" aria-label="Pause decorative animation"><svg className="icon"><use href="#i-motion"/></svg><span>Motion on</span></button>
        <a className="header-resume" href="/assets/Chaitanyachidambar_S_Kulkarni_Resume.pdf" download>Resume <svg className="icon"><use href="#i-download"/></svg></a>
        <button className="menu-toggle" id="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="main-nav"><svg className="icon"><use href="#i-menu"/></svg></button>
      </div>
    </div>
    <div className="scroll-progress" id="scroll-progress" aria-hidden="true"></div>
  </header>

  <main id="main">
    <section className="hero section-dark" id="home" aria-labelledby="hero-title">
      <div className="hero-grid container">
        <div className="hero-copy">
          <div className="eyebrow hero-intro"><span className="small-dot"></span> CHAITANYA KULKARNI <span className="muted-separator">/</span> BENGALURU</div>
          <h1 id="hero-title">I turn ideas<br />into <span className="serif accent-text">real things.</span></h1>
          <p className="hero-description">Full stack developer. A curious mind behind web applications, Python workflows, music and documentary videos.</p>
          <div className="hero-buttons"><a className="button button-accent" href="#work">Explore my work <svg className="icon"><use href="#i-arrow"/></svg></a><a className="text-link" href="#contact">Let's talk <svg className="icon"><use href="#i-external"/></svg></a></div>
          <div className="availability"><span className="status-dot"></span><span>Available for developer roles</span><span className="availability-location">Bengaluru / Remote</span></div>
        </div>
        <div className="hero-art" id="hero-art" role="img" aria-label="An interactive, rotating three dimensional violet knot representing code and creativity">
          <span className="scene-label">CURIOUS BY DESIGN</span>
          <div className="orbit-guide guide-one" aria-hidden="true"></div><div className="orbit-guide guide-two" aria-hidden="true"></div>
          <div className="scene-fallback" aria-hidden="true"></div>
          <canvas id="orbit-canvas" aria-hidden="true"></canvas>
          <div className="orbit-chip chip-react" aria-hidden="true"><span className="mini-symbol">&#123; &#125;</span><span>React</span></div>
          <div className="orbit-chip chip-node" aria-hidden="true"><span className="mini-symbol">&lt;/&gt;</span><span>Node.js</span></div>
          <div className="orbit-chip chip-create" aria-hidden="true"><span className="mini-symbol">♪</span><span>Create</span></div>
          <div className="scene-bottom"><span className="scene-instruction">MOVE YOUR POINTER TO EXPLORE</span><span className="scene-index">[ 01 / ∞ ]</span></div>
        </div>
      </div>
      <div className="hero-foot container"><a href="#work" className="scroll-cue"><span className="scroll-line"></span> SCROLL TO DISCOVER</a><p>Code meets creativity.<br /><span>And a lot of curiosity.</span></p></div>
    </section>

    <div className="stack-strip" aria-label="Core technologies"><div className="container stack-strip-inner"><span>REACT.JS</span><span className="strip-star" aria-hidden="true">✳</span><span>NODE.JS</span><span className="strip-star" aria-hidden="true">✳</span><span>TYPESCRIPT</span><span className="strip-star" aria-hidden="true">✳</span><span>PYTHON</span><span className="strip-star" aria-hidden="true">✳</span><span>POSTGRESQL</span></div></div>

    <section className="work-section section-light section-pad" id="work" aria-labelledby="work-title">
      <div className="container">
        <div className="section-heading reveal"><div><div className="eyebrow section-index">01 / SELECTED WORK</div><h2 id="work-title">The things<br />I've <span className="serif">built.</span></h2></div><p>Full stack applications, background systems<br className="desktop-break" /> and workflows that turn a problem into a project.</p></div>

        <article className="featured-project reveal">
          <div className="project-preview tilt-surface">
            <div className="preview-caption"><span>FEATURED PROJECT / 01</span><span className="project-window-dots" aria-hidden="true"><i></i><i></i><i></i></span></div>
            <div className="entitlement-window">
              <div className="entitlement-top"><span className="entitlement-logo"><svg className="icon"><use href="#i-code"/></svg> EntitlementCI</span><span className="workspace-pill">SAMPLE WORKSPACE</span></div>
              <div className="entitlement-heading"><div><span className="micro-label">EXPECTED PLAN</span><h3>Enterprise<span className="tiny-arrow">↗</span></h3></div><span className="drift-badge" id="drift-badge">3 discrepancies</span></div>
              <div className="entitlement-table" role="table" aria-label="Sample entitlement comparison">
                <div className="entitlement-row row-head" role="row"><span role="columnheader">Feature</span><span role="columnheader">Expected</span><span role="columnheader">Observed</span><span role="columnheader">Status</span></div>
                <div className="entitlement-row" role="row"><span role="cell">Single sign on</span><span role="cell">Allowed</span><span role="cell" data-observed="Allowed">Denied</span><span className="row-status" role="cell">Drift</span></div>
                <div className="entitlement-row" role="row"><span role="cell">Advanced reports</span><span role="cell">Allowed</span><span role="cell" data-observed="Allowed">Denied</span><span className="row-status" role="cell">Drift</span></div>
                <div className="entitlement-row" role="row"><span role="cell">API request limit</span><span role="cell">500,000</span><span role="cell" data-observed="500,000">50,000</span><span className="row-status" role="cell">Drift</span></div>
              </div>
              <div className="sample-controls"><p id="sample-status" aria-live="polite">A plan upgrade doesn't always mean the application catches up.</p><button className="sample-button" id="sample-toggle">Apply correction <svg className="icon"><use href="#i-arrow"/></svg></button></div>
            </div>
            <p className="preview-footnote">Interactive illustration with sample data</p>
          </div>
          <div className="project-story">
            <div className="project-type"><span className="small-dot"></span> SAAS RELIABILITY / FULL STACK</div>
            <h3>EntitlementCI<span className="project-title-dot">.</span></h3>
            <p className="project-lead">When a subscription promises something the application doesn't deliver.</p>
            <p>Compares expected customer access with real application decisions, groups mismatches into incidents, and resolves them when fresh observations match.</p>
            <div className="tag-list"><span>TypeScript</span><span>React</span><span>Fastify</span><span>PostgreSQL</span><span>Redis / BullMQ</span><span>Docker</span></div>
            <div className="project-evidence"><div><strong>7</strong><span>unit & security tests</span></div><div><strong>18</strong><span>integration checks</span></div><div><strong>1</strong><span>browser flow</span></div></div>
            <div className="project-actions"><button className="button button-dark" data-media="entitlement">Explore the demo <svg className="icon"><use href="#i-external"/></svg></button><a className="text-link" href="https://github.com/chaitanyalogin/entitlementci" target="_blank" rel="noopener noreferrer">View source <svg className="icon"><use href="#i-github"/></svg></a></div>
            <details className="project-details"><summary>A closer look at the engineering <span>+</span></summary><p>A Node SDK records access and usage. A BullMQ worker compares observations using transactional PostgreSQL updates. Duplicate checks, stale event handling, tenant isolation, role based permissions and signed webhooks support the workflow.</p><a href="https://api-production-48225.up.railway.app/" target="_blank" rel="noopener noreferrer">Open the backend and dashboard ↗</a><p className="detail-note">Portfolio application. The reviewer demo uses sample data; the separate hosted application runs the API, database and worker. Test results are documented in the repository.</p></details>
          </div>
        </article>

        <div className="project-grid">
          <article className="project-card reveal">
            <div className="mini-preview pipeline-preview" aria-label="Illustration of the Python video production workflow"><span className="micro-label">PYTHON / FFMPEG / GPU</span><div className="pipeline-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div className="pipeline-steps"><span>Align</span><b>→</b><span>Render</span><b>→</b><span>Master</span></div><span className="preview-mini-caption">WORKFLOW ILLUSTRATION</span></div>
            <div className="project-card-body"><div className="card-index">02 / AUTOMATION</div><h3>Video production pipeline</h3><p>A modular Python workflow for rendering, audio mastering, subtitle alignment and semantic image matching on Kaggle GPU infrastructure.</p><div className="card-footer"><span>Python · FFmpeg · JSON</span><a href="#studio">See the creative work <svg className="icon"><use href="#i-external"/></svg></a></div></div>
          </article>
          <article className="project-card reveal">
            <div className="mini-preview movie-preview" aria-label="Conceptual movie search interface"><div className="movie-brand">MOVIE<span>MASALA</span><svg className="icon"><use href="#i-play"/></svg></div><div className="movie-posters" aria-hidden="true"><div><span>EXPLORE</span><b>Beyond<br />the frame.</b></div><div><span>DISCOVER</span><b>Another<br />perspective.</b></div><div><span>SEARCH</span><b>Your next<br />watch.</b></div></div><span className="preview-mini-caption">INTERFACE ILLUSTRATION</span></div>
            <div className="project-card-body"><div className="card-index">03 / FRONTEND</div><h3>MovieMasala</h3><p>A responsive React movie search application with TMDB API data, category browsing and dynamic card based rendering.</p><div className="card-footer"><span>React · Vite · REST API</span><a href="https://github.com/chaitanyalogin/MovieSearchApp" target="_blank" rel="noopener noreferrer">View source <svg className="icon"><use href="#i-external"/></svg></a></div></div>
          </article>
          <article className="project-card reveal">
            <div className="mini-preview news-preview" aria-label="Conceptual news browsing interface"><div className="news-masthead">The daily <em>perspective.</em></div><div className="news-tabs"><span>WORLD</span><span>TECH</span><span>BUSINESS</span></div><div className="news-layout" aria-hidden="true"><div className="news-photo"><span>A different<br />point of view.</span></div><div className="news-lines"><b>Explore the stories<br />that interest you.</b><i></i><i></i><i></i><i></i></div></div><span className="preview-mini-caption">INTERFACE ILLUSTRATION</span></div>
            <div className="project-card-body"><div className="card-index">04 / FULL STACK</div><h3>News Aggregator</h3><p>Category based news browsing with an Express proxy for third party API requests, environment configuration and CORS handling.</p><div className="card-footer"><span>React · Node.js · Express</span><a href="https://github.com/chaitanyalogin/NewsApp" target="_blank" rel="noopener noreferrer">View source <svg className="icon"><use href="#i-external"/></svg></a></div></div>
          </article>
        </div>
        <a className="all-work-link" href="https://github.com/chaitanyalogin" target="_blank" rel="noopener noreferrer">More experiments live on GitHub <svg className="icon"><use href="#i-external"/></svg></a>
      </div>
    </section>

    <section className="about-section section-dark section-pad" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-top reveal"><div><div className="eyebrow section-index">02 / THE PERSON BEHIND THE CODE</div><h2 id="about-title">Curiosity is<br />the <span className="serif accent-text">common thread.</span></h2></div><div className="about-copy"><p>I'm <strong>Chaitanyachidambar S. Kulkarni</strong>, a full stack developer from Dharwad, now based in Bengaluru.</p><p>My work brings together MERN development, data reporting and Python automation. Outside development, I create songs, music videos and documentaries through <a href="https://www.youtube.com/@thechayshow" target="_blank" rel="noopener noreferrer">The Chay Show</a>.</p><p>I'm pursuing an MCA in Full Stack Development at Jain University and looking for opportunities to contribute to a software team.</p></div></div>
        <div className="capabilities reveal"><div><span className="capability-number">01</span><h3>The interface</h3><p>React.js · JavaScript · TypeScript<br />HTML · CSS · Tailwind · Bootstrap<br />Redux · Context API · Vite</p></div><div><span className="capability-number">02</span><h3>The system</h3><p>Node.js · Express · Fastify · REST APIs<br />MongoDB · PostgreSQL · Prisma · Redis<br />BullMQ · Docker · GitHub Actions</p></div><div><span className="capability-number">03</span><h3>The workflow</h3><p>Python · Pandas · SQL · FFmpeg<br />Power BI · DAX · MySQL<br />Postman · Playwright · Vitest</p></div></div>
        <div className="experience-block">
          <div className="experience-heading reveal"><div className="eyebrow">EXPERIENCE & EDUCATION</div><h3>A path built<br />through practice.</h3><span className="large-asterisk" aria-hidden="true">✳</span></div>
          <div className="timeline">
            <article className="timeline-item reveal"><div className="timeline-date">SEP 2025 TO JUL 2026</div><h4>Software Engineer Intern</h4><span className="timeline-place">HAEGL Technologies / Hubli</span><p>Responsive React components, MERN features, REST API integration, authentication, state management and debugging.</p></article>
            <article className="timeline-item reveal"><div className="timeline-date">JUN 2025 TO JUL 2025</div><h4>Junior Software Engineer</h4><span className="timeline-place">iTriangle Infotech / Bengaluru</span><p>Power BI dashboards for end of line testing, MIS and operational reporting, with MySQL, Python/Pandas, DAX and data validation.</p></article>
            <article className="timeline-item reveal"><div className="timeline-date">EARLIER EXPERIENCE</div><h4>Data Analyst Intern</h4><span className="timeline-place">AI Variant</span><p>Data analysis using SQL, Power BI, Tableau, Excel and Python.</p></article>
            <article className="timeline-item education-item reveal"><div className="timeline-date">CURRENTLY PURSUING</div><h4>Master of Computer Applications</h4><span className="timeline-place">Jain University / Full Stack Development</span><p>Online program. Semesters I and II completed. Additional ExcelR certifications in Data Analytics, Data Science and Core Python Programming.</p></article>
          </div>
        </div>
      </div>
    </section>

    <section className="studio-section section-light section-pad" id="studio" aria-labelledby="studio-title">
      <div className="container">
        <div className="section-heading reveal"><div><div className="eyebrow section-index">03 / OUTSIDE THE TERMINAL</div><h2 id="studio-title">A different<br />kind of <span className="serif">output.</span></h2></div><div className="studio-intro"><p>Song making. Documentary videos. YouTube.<br />The creative side of the same curious mind.</p><a className="text-link" href="https://www.youtube.com/@thechayshow" target="_blank" rel="noopener noreferrer">Visit The Chay Show <svg className="icon"><use href="#i-youtube"/></svg></a></div></div>
        <div className="studio-grid">
          <article className="studio-card reveal"><button className="video-cover song-cover" data-media="song" aria-label="Play Sannata music video"><img src="https://i.ytimg.com/vi/Kd0oh4WuoEE/hqdefault.jpg" alt="Sannata music video thumbnail" loading="lazy" width="480" height="360" /><span className="video-cover-overlay"></span><span className="video-category">01 / MUSIC VIDEO</span><span className="play-disc"><svg className="icon"><use href="#i-play"/></svg></span><span className="video-cover-title">Sannata<span>PLAY THE MUSIC VIDEO ↗</span></span></button><div className="studio-card-caption"><h3>Music, visuals and a story.</h3><p>Song making and music video production through The Chay Show.</p><a href="https://www.youtube.com/watch?v=Kd0oh4WuoEE" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div></article>
          <article className="studio-card reveal"><button className="video-cover documentary-cover" data-media="documentary" aria-label="Play documentary from The Chay Show"><img src="https://i.ytimg.com/vi/TpZORqPD-qQ/hqdefault.jpg" alt="The Chay Show documentary thumbnail" loading="lazy" width="480" height="360" /><span className="video-cover-overlay"></span><span className="video-category">02 / DOCUMENTARY</span><span className="play-disc"><svg className="icon"><use href="#i-play"/></svg></span><span className="video-cover-title">The Chay Show<span>PLAY THE DOCUMENTARY ↗</span></span></button><div className="studio-card-caption"><h3>Questions worth exploring.</h3><p>Documentary storytelling, research and video creation.</p><a href="https://www.youtube.com/watch?v=TpZORqPD-qQ" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div></article>
        </div>
        <div className="studio-note reveal"><svg className="icon"><use href="#i-youtube"/></svg><p>These are my creative projects, alongside my development work.</p><span>THE CHAY SHOW</span></div>
      </div>
    </section>

    <section className="resume-section section-pad" id="resume" aria-labelledby="resume-title">
      <div className="container resume-grid">
        <div className="resume-copy reveal"><div className="eyebrow section-index">04 / TAKE A CLOSER LOOK</div><h2 id="resume-title">The details,<br />in <span className="serif">one page.</span></h2><p>A focused overview of my development experience, projects, skills and ongoing MCA.</p><div className="resume-buttons"><a className="button button-dark" href="/assets/Chaitanyachidambar_S_Kulkarni_Resume.pdf" download>Download resume <svg className="icon"><use href="#i-download"/></svg></a><a className="text-link" href="/assets/Chaitanyachidambar_S_Kulkarni_Resume.pdf" target="_blank" rel="noopener">Open PDF <svg className="icon"><use href="#i-external"/></svg></a></div><a className="word-link" href="/assets/Chaitanyachidambar_S_Kulkarni_Resume.docx" download>Download editable Word version ↗</a><div className="resume-meta"><span>PDF / 1 PAGE</span><span>UPDATED OCT 2026</span></div></div>
        <div className="resume-art reveal" aria-hidden="true"><div className="resume-orbit"></div><div className="resume-paper tilt-surface"><img src="/assets/resume-preview.webp" alt="" loading="lazy" width="680" height="880" /><span className="paper-badge"><svg className="icon"><use href="#i-check"/></svg> Ready to download</span></div><span className="resume-art-label">LESS SCROLLING. MORE CONTEXT.</span></div>
      </div>
    </section>

    <section className="contact-section section-dark section-pad" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-top reveal"><div className="eyebrow section-index">05 / START A CONVERSATION</div><h2 id="contact-title">Got a role?<br />An idea?<br /><span className="serif accent-text">Let's talk.</span></h2><div className="contact-intro"><span className="availability"><span className="status-dot"></span> AVAILABLE IMMEDIATELY</span><p>Open to developer opportunities in Bengaluru or remotely, and conversations about useful things we can build.</p><a className="button button-accent" href="https://wa.me/919591454650?text=Hi%20Chaitanya%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" rel="noopener noreferrer">Message on WhatsApp <svg className="icon"><use href="#i-whatsapp"/></svg></a></div></div>
        <div className="contact-grid reveal"><div className="contact-details"><span className="micro-label">PREFER EMAIL?</span><a className="email-link" href="mailto:chaitanyarocks.kulkarni@gmail.com">chaitanyarocks.kulkarni<span>@gmail.com</span></a><button className="copy-email" id="copy-email"><svg className="icon"><use href="#i-copy"/></svg> Copy email address</button><div className="social-links"><a href="https://github.com/chaitanyalogin" target="_blank" rel="noopener noreferrer"><svg className="icon"><use href="#i-github"/></svg> GitHub <span>↗</span></a><a href="https://www.linkedin.com/in/chaitanyachidambarkulkarni" target="_blank" rel="noopener noreferrer"><svg className="icon"><use href="#i-linkedin"/></svg> LinkedIn <span>↗</span></a><a href="https://www.youtube.com/@thechayshow" target="_blank" rel="noopener noreferrer"><svg className="icon"><use href="#i-youtube"/></svg> YouTube <span>↗</span></a></div><p className="location-note">Based in Bengaluru, Karnataka, India.<br />English · Hindi · Kannada</p></div><form className="contact-form" id="contact-form"><h3>Leave me a little context.</h3><div className="form-row"><label>Your name <input name="name" autoComplete="name" placeholder="Your name" required maxLength="80" /></label><label>Email <span className="optional">(optional)</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength="160" /></label></div><label>Your message<textarea name="message" placeholder="Tell me about the role, project or idea..." rows="4" required maxLength="2000"></textarea></label><div className="form-footer"><p>Opens a draft in WhatsApp.<br />You review it and press send.</p><button className="button button-outline" type="submit">Continue in WhatsApp <svg className="icon"><use href="#i-external"/></svg></button></div></form></div>
      </div>
    </section>
  </main>

  <footer className="site-footer section-dark"><div className="container footer-top"><a className="footer-brand" href="#home">CHAY<span>.</span></a><p>Chaitanyachidambar S. Kulkarni<br /><span>Developer & creator / Bengaluru</span></p><a className="back-top" href="#home">Back to top <svg className="icon"><use href="#i-external"/></svg></a></div><div className="container footer-bottom"><span>© <span id="year">2026</span> Chaitanya Kulkarni</span><span>Built with logic. And a little imagination.</span><span>KEEP EXPLORING ✳</span></div></footer>
  <a className="floating-whatsapp" href="https://wa.me/919591454650?text=Hi%20Chaitanya%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" rel="noopener noreferrer" aria-label="Contact Chaitanya on WhatsApp"><svg className="icon"><use href="#i-whatsapp"/></svg><span>Let's talk</span></a>
  <div className="toast" id="toast" role="status" aria-live="polite"></div>
  <dialog className="media-dialog" id="media-dialog" aria-labelledby="media-dialog-title"><div className="dialog-heading"><div><span className="micro-label" id="media-dialog-label">PROJECT DEMO</span><h2 id="media-dialog-title">EntitlementCI</h2></div><button className="dialog-close" id="media-close" aria-label="Close player"><svg className="icon"><use href="#i-close"/></svg></button></div><div className="media-frame" id="media-frame"></div><div className="dialog-footer"><p id="media-dialog-note"></p><a id="media-external" target="_blank" rel="noopener noreferrer">Open in a new tab <svg className="icon"><use href="#i-external"/></svg></a></div></dialog>
  <noscript><div className="noscript-note">The portfolio and download links work without JavaScript. Open the videos and project using their external links. Enable JavaScript for 3D motion and the WhatsApp message form.</div></noscript>

<Enhancements />
</>;
}

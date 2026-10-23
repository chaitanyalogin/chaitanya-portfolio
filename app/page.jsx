import Enhancements from './Enhancements';
import { CASES, LINKS } from '../lib/portfolio-data';

function Arrow({ diagonal = false }) {
  return <svg className="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} /></svg>;
}
function External({ href, children, className = '' }) {
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer">{children}<Arrow diagonal /></a>;
}
function CaseIllustration() {
  return <div className="case-sheet">
    <div className="sheet-heading"><span className="sheet-wordmark"><span>[</span> TraceCase <span>]</span></span><span className="mono">CASE EXCERPT / 001</span></div>
    <div className="sheet-status"><span className="status-dot" /> A reason to look closer</div>
    <h2>Activity tells one part.<br /><em>Context tells the rest.</em></h2>
    <div className="sheet-figures"><div><span>Declared monthly income</span><strong>₹30,000</strong></div><div><span>Non-salary credits in review</span><strong>₹12,00,000</strong></div></div>
    <div className="pattern" role="img" aria-label="Illustrative review pattern: ten payers, a salary-profile account and closely following onward transfers. This does not trace the debited funds.">
      <div className="payer-group" aria-hidden="true">{Array.from({ length: 10 }, (_, i) => <span key={i} />)}</div><div className="pattern-line" aria-hidden="true" /><div className="account-node" aria-hidden="true">AR</div><div className="pattern-line" aria-hidden="true" /><div className="recipient-group" aria-hidden="true"><span /><span /></div>
      <span className="pattern-label payers-label">10 payers</span><span className="pattern-label account-label">Salary profile</span><span className="pattern-label recipients-label">Onward transfers</span>
    </div>
    <div className="question-note"><span className="mono">THE QUESTION</span><p>What evidence supports the customer’s explanation?</p></div>
    <div className="sheet-footer"><span>Fictional training data</span><a href="#project">Explore the case <Arrow diagonal /></a></div>
  </div>;
}
export default function PortfolioPage() {
  const sample = CASES.C001;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header"><div className="container header-inner">
      <a className="brand" href="#home" aria-label="Chaitanya Kulkarni home"><span className="brand-mark">c<span>.</span></span><span>CHAY<span className="brand-period">.</span><small>AML / KYC PORTFOLIO</small></span></a>
      <nav className="main-nav" id="main-nav" aria-label="Main navigation"><a href="#project">Featured project</a><a href="#approach">Approach</a><a href="#background">Background</a><a href="#contact">Contact</a></nav>
      <a className="header-contact" href="mailto:chaitanyarocks.kulkarni@gmail.com">Let’s connect <Arrow diagonal /></a>
      <button className="menu-toggle" id="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="main-nav"><span /><span /></button>
    </div></header>
    <main id="main">
      <section className="hero" id="home" aria-labelledby="hero-title"><div className="container hero-grid">
        <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> OPEN TO ENTRY-LEVEL AML &amp; KYC ROLES</div>
          <h1 id="hero-title">Look closer.<br /><em>Think clearly.</em></h1>
          <p className="hero-intro">I’m <strong>Chaitanya Kulkarni</strong>, a commerce graduate bringing experience in data validation and reporting to a career in financial crime operations.</p>
          <div className="hero-actions"><a className="button button-primary" href="#project">Explore my AML project <Arrow /></a><a className="quiet-link" href="#contact">Get in touch <Arrow diagonal /></a></div>
          <div className="hero-location"><span>Bengaluru, India</span><span className="text-divider" /><span>Available immediately</span></div>
        </div>
        <div className="hero-visual"><span className="visual-index mono">EVIDENCE BEFORE CONCLUSIONS / 01</span><CaseIllustration /><span className="visual-caption">A glimpse into my independent AML learning project.</span></div>
      </div><div className="container hero-bottom"><span>CHAITANYACHIDAMBAR S. KULKARNI</span><a href="#project">A closer look <span aria-hidden="true">↓</span></a></div></section>
      <div className="credentials-strip"><div className="container credentials-grid"><div><span className="mono">FOUNDATION</span><strong>Bachelor of Commerce</strong></div><div><span className="mono">EXPERIENCE</span><strong>Data validation &amp; reporting</strong></div><div><span className="mono">CURRENT STUDY</span><strong>MCA · Online · Pursuing</strong></div><div><span className="mono">LOOKING FOR</span><strong>AML / KYC / Fraud operations</strong></div></div></div>

      <section className="project-section section-space" id="project" aria-labelledby="project-title"><div className="container">
        <div className="section-topline"><span className="eyebrow">01 / FEATURED WORK</span><span className="section-aside mono"><span className="status-dot" /> LIVE DEMO AVAILABLE</span></div>
        <div className="project-heading"><div><h2 id="project-title">TraceCase<span className="title-period">.</span></h2><p className="project-subtitle">From an unusual pattern to an explained decision.</p></div><p className="project-description">An independent AML investigation workbench. Review fictional customer records, examine transactions, verify assisted analysis and document what should happen next.</p></div>
        <div className="workbench">
          <div className="workbench-bar"><div><span className="mini-mark">tc</span><strong>Investigation desk</strong></div><span className="mono">SYNTHETIC DATA / INTERACTIVE EXCERPT</span></div>
          <div className="workbench-content">
            <div className="case-sidebar"><span className="mono">SELECT A CASE</span><div className="case-tabs" role="tablist" aria-label="Compare fictional investigation cases">
              <button id="tab-C001" type="button" role="tab" aria-selected="true" aria-controls="case-panel" data-case="C001"><span className="mono">C001</span><strong>Anita Rao</strong><small>Unverified collections</small><Arrow /></button>
              <button id="tab-C002" type="button" role="tab" aria-selected="false" aria-controls="case-panel" tabIndex={-1} data-case="C002"><span className="mono">C002</span><strong>Vikram Shah</strong><small>Property sale receipts</small><Arrow /></button>
            </div><p>Similar numbers.<br /><strong>Different evidence.</strong></p></div>
            <div className="case-panel" id="case-panel" role="tabpanel" aria-labelledby="tab-C001" tabIndex={0}>
              <div className="case-panel-top"><span className="mono" data-case-field="reference">{sample.reference}</span><span className="case-evidence-tag" data-case-field="status">{sample.status}</span></div>
              <h3 data-case-field="headline">{sample.headline}</h3>
              <div className="case-metrics"><div><span>Non-salary credits</span><strong data-case-field="credits">{sample.credits}</strong></div><div><span>Vs monthly income</span><strong data-case-field="multiple">{sample.multiple}</strong></div><div><span>Temporal debit ratio</span><strong>95%</strong></div></div>
              <div className="evidence-lines"><div><span className="evidence-key mono">01 / OBSERVE</span><p data-case-field="observe">{sample.observe}</p></div><div><span className="evidence-key mono">02 / VERIFY</span><p data-case-field="verify">{sample.verify}</p></div><div><span className="evidence-key mono">03 / CONSIDER</span><p data-case-field="consider">{sample.consider}</p></div></div>
              <p className="case-caution">The ratio shows timing, not proof that the same funds moved or that a crime occurred.</p>
            </div>
          </div>
          <div className="workbench-footer"><span id="case-status" role="status" aria-live="polite">Showing C001 · Fictional training exercise</span><External href={LINKS.tracecase} className="quiet-link">Open full workbench</External></div>
        </div>
        <div className="project-bottom"><div className="project-deliverables"><span>Evidence-linked findings</span><span>Reviewed decisions</span><span>Investigation report export</span></div><div className="project-links"><External href={LINKS.tracecase} className="button button-primary">Try TraceCase</External><External href={LINKS.tracecaseSource} className="quiet-link">View source</External></div></div>
        <p className="project-disclosure">Independent, AI-assisted learning project · Two fictional cases · No real customer data or regulatory filings · 17 automated workflow checks documented in the repository.</p>
      </div></section>

      <section className="approach-section section-space" id="approach" aria-labelledby="approach-title"><div className="container">
        <div className="approach-heading"><div><span className="eyebrow">02 / THE APPROACH</span><h2 id="approach-title">Good questions.<br /><em>Clear reasoning.</em></h2></div><p>What I’m practising through TraceCase: checking the facts, considering alternatives and writing a decision someone else can follow.</p></div>
        <div className="approach-grid"><article><span className="step-number">01</span><h3>Understand the profile.</h3><p>Start with who the customer is, their expected activity and what changed. An alert begins a review.</p><span className="approach-detail mono">CUSTOMER CONTEXT</span></article><article><span className="step-number">02</span><h3>Challenge the explanation.</h3><p>Separate a statement from corroborating evidence. Check missing information and legitimate explanations.</p><span className="approach-detail mono">EVIDENCE &amp; ALTERNATIVES</span></article><article><span className="step-number">03</span><h3>Explain the next step.</h3><p>Document the reasoning, evidence and limitations behind closing a training alert, requesting information or escalating it.</p><span className="approach-detail mono">DOCUMENTED JUDGMENT</span></article></div>
        <div className="ai-note"><span className="ai-note-mark" aria-hidden="true">✳</span><div><h3>AI assists. The evidence still needs checking.</h3><p>The workbench checks evidence references and requires claim review before an assisted decision is recorded. A valid citation alone does not make a claim correct.</p></div><External href={LINKS.tracecaseSource + '/blob/main/docs/RECRUITER_GUIDE.md'} className="quiet-link">Read the project guide</External></div>
      </div></section>

      <section className="background-section section-space" id="background" aria-labelledby="background-title"><div className="container background-grid">
        <div className="background-intro"><span className="eyebrow">03 / MY BACKGROUND</span><h2 id="background-title">A commerce foundation.<br /><em>A practical mindset.</em></h2><p>I’m Chaitanyachidambar S. Kulkarni. My experience spans software engineering, operational dashboards and data reporting. I’m now pursuing an entry-level opportunity in AML, KYC or financial crime operations.</p><p>TraceCase is where I’m building domain understanding through fictional investigations and evidence review.</p><div className="tools-block"><span className="mono">TOOLS I’VE USED</span><div className="tool-list"><span>Excel</span><span>SQL</span><span>Python / Pandas</span><span>Power BI</span></div></div><a className="quiet-link background-cv" href="/assets/Chaitanyachidambar_S_Kulkarni_Resume.pdf" target="_blank" rel="noopener noreferrer">Background CV · software &amp; reporting <Arrow diagonal /></a></div>
        <div className="background-record"><div className="record-heading"><h3>Experience &amp; education</h3><span className="mono">THE PATH SO FAR</span></div><ol className="timeline">
          <li><span className="timeline-date mono">SEP 2025 – JUL 2026</span><h4>Software Engineer Intern</h4><span className="timeline-place">HAEGL Technologies · Hubballi</span><p>Web portal features, API validation, authentication and application issue diagnosis.</p></li>
          <li><span className="timeline-date mono">JUN – JUL 2025</span><h4>Junior Software Engineer</h4><span className="timeline-place">iTriangle Infotech · Bengaluru</span><p>Operational dashboards, MIS reporting and data validation using MySQL, Python, Pandas and Power BI.</p></li>
          <li><span className="timeline-date mono">EARLIER INTERNSHIP</span><h4>Data Analyst Intern</h4><span className="timeline-place">AI Variant</span><p>Data analysis and reporting using SQL, Excel, Python and dashboard tools.</p></li>
          <li className="education-record"><div><span className="timeline-date mono">2022</span><h4>Bachelor of Commerce</h4><span className="timeline-place">CSI College, Dharwad · CGPA 8.16/10</span></div><div><span className="timeline-date mono">2025 – 2027 · PURSUING</span><h4>Master of Computer Applications</h4><span className="timeline-place">JAIN University · Online program</span></div></li>
        </ol></div>
      </div></section>
      <section className="earlier-work" aria-labelledby="earlier-title"><div className="container"><details><summary><div><span className="eyebrow">ALSO IN MY BACKGROUND</span><h2 id="earlier-title">Earlier software work</h2></div><span className="details-plus" aria-hidden="true">+</span></summary><div className="earlier-content"><div><h3>EntitlementCI</h3><p>A software project that compares expected subscription access with observed application decisions and tracks discrepancies. Built with TypeScript, React and PostgreSQL.</p><span className="small-note">Software project · Separate from my AML learning work</span></div><div className="earlier-links"><External href="https://entitlementci-review.vercel.app/" className="quiet-link">Explore the demo</External><External href="https://github.com/chaitanyalogin/entitlementci" className="quiet-link">View source</External><External href={LINKS.github} className="quiet-link">More on GitHub</External></div></div></details></div></section>

      <section className="contact-section section-space" id="contact" aria-labelledby="contact-title"><div className="container">
        <div className="contact-heading"><div><span className="eyebrow">04 / START A CONVERSATION</span><h2 id="contact-title">Let’s take the<br /><em>next step.</em></h2></div><div><span className="availability"><span className="status-dot" /> AVAILABLE IMMEDIATELY</span><p>Seeking entry-level AML, KYC and financial crime operations roles in Bengaluru or remotely.</p><External href={LINKS.linkedin} className="quiet-link">Connect on LinkedIn</External></div></div>
        <div className="contact-grid"><div className="contact-direct"><span className="mono">EMAIL ME</span><a className="email-link" href="mailto:chaitanyarocks.kulkarni@gmail.com">chaitanyarocks.kulkarni<wbr />@gmail.com</a><button className="copy-email" id="copy-email" type="button">Copy email address <span aria-hidden="true">⧉</span></button><div className="contact-places"><span>Bengaluru, Karnataka</span><span>English · Hindi · Kannada</span></div></div>
          <form className="contact-form" id="contact-form"><h3>Have a role in mind?</h3><div className="form-row"><label>Your name<input name="name" autoComplete="name" placeholder="Your name" required maxLength={80} /></label><label>Work email <span>(optional)</span><input name="email" type="email" autoComplete="email" placeholder="you@company.com" maxLength={160} /></label></div><label>A little about the opportunity<textarea name="message" placeholder="Role, location and the best way to connect…" rows={3} required maxLength={2000} /></label><div className="form-footer"><p>Opens a WhatsApp draft.<br />You review it before sending.</p><button className="button button-outline" type="submit">Prepare message <Arrow diagonal /></button></div></form>
        </div>
      </div></section>
    </main>
    <footer className="site-footer"><div className="container footer-main"><a className="brand" href="#home" aria-label="Back to top"><span className="brand-mark">c<span>.</span></span><span>CHAY.</span></a><p>Chaitanyachidambar S. Kulkarni<br /><span>Commerce graduate · AML / KYC candidate · Bengaluru</span></p><div className="footer-links"><External href={LINKS.github}>GitHub</External><External href={LINKS.linkedin}>LinkedIn</External><External href="https://www.youtube.com/@thechayshow">The Chay Show</External></div></div><div className="container footer-bottom"><span>© <span id="year">2026</span> Chaitanyachidambar S. Kulkarni</span><span>Curiosity, with a little more context.</span><a href="#home">Back to top ↑</a></div></footer>
    <div className="toast" id="toast" role="status" aria-live="polite" />
    <noscript><p className="noscript-note">Project links, case C001, contact links and background information work without JavaScript. Enable JavaScript to compare the cases or prepare a WhatsApp draft.</p></noscript>
    <Enhancements />
  </>;
}


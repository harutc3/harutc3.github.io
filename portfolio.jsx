/* Harutyun Minasyan — Portfolio
   Header: screenshot showcase. Section: career timeline. Gallery: screenshots only.
*/

const { useState, useEffect, useRef, useMemo } = React;

// ------- DATA --------
const SHOTS = [
  "work/01-process-mining.jpg",
  "work/02-3d-heatmap.png",
  "work/03-location-analytics.png",
  "work/04-link-analysis.png",
  "work/05-trading-chart.png",
  "work/06-infographic.png",
  "work/07-news-intel.png",
  "work/08-link-network.png",
  "work/09-timeline-activity.webp",
  "work/10-gantt.webp",
  "work/11-genome-tracks.webp",
  "work/12-machine-oee.webp",
  "work/13-network-graph.png",
  "work/14-ipdr-profile.png",
  "work/15-activity-charts.png",
  "work/16-heatmap-popup.png",
  "work/17-aurora-heatmap.png",
  "work/18-co-movement.png",
];

const TIMELINE = [
  {
    start: "Jun 2024", end: "Now", current: true,
    role: "Software Engineer",
    company: "Datafusion Systems",
    location: "UAE",
    summary: "Designed and shipped large-scale graph and analytics interfaces in Angular for high-volume telecom data. Built complex network and link-analysis visualizations with D3.js and G6.js, tuned for scale via GraphQL APIs.",
    stack: ["Angular", "TypeScript", "D3.js", "G6.js", "GraphQL"],
  },
  {
    start: "Jan 2023", end: "Jul 2024",
    role: "Independent Front-End / Data Viz Engineer",
    company: "Upwork — Freelance",
    location: "Remote",
    summary: "Delivered front-end and visualization engagements for international clients, turning research prototypes into production-ready, performant visual interfaces.",
    stack: ["D3.js", "React", "TypeScript"],
  },
  {
    start: "May 2022", end: "Dec 2022",
    role: "Power BI Custom Visuals Developer",
    company: "Akvelon, Inc. — for Microsoft",
    location: "Armenia",
    summary: "Owned end-to-end implementation of Power BI custom visuals for Microsoft in D3.js. Migrated heavy backend logic into the front end, including in-browser layout computation with Graphviz. Diagnosed and resolved performance bottlenecks across rendering and data-binding paths.",
    stack: ["JavaScript", "TypeScript", "D3.js", "Power BI", "Graphviz"],
  },
  {
    start: "Mar 2022", end: "May 2022",
    role: "Data Visualization Engineer · Product Researcher",
    company: "SuperAnnotate",
    location: "Armenia",
    summary: "Engineered visualizations rendering 2M+ elements with no performance degradation by combining SVG and Canvas. Led visualization research and prototyping to inform product direction.",
    stack: ["JavaScript", "D3.js", "Canvas"],
  },
  {
    start: "Dec 2021", end: "May 2022",
    role: "Data Visualization Engineer (D3.js)",
    company: "Biomotivate",
    location: "USA",
    summary: "Read time-series directly from InfluxDB on the client — no backend layer — with full data cleaning, transformation and reduction in the browser. Optimized hot paths by relocating heavy calculations from per-frame updates into preprocessing.",
    stack: ["JavaScript", "D3.js", "InfluxDB"],
  },
  {
    start: "Jul 2021", end: "Sep 2021",
    role: "Data Visualization Developer",
    company: "Upwork project",
    location: "USA",
    summary: "Force-directed graph visualization for LinkedIn data — a tool to discover potential clients. Built as a PWA with offline mode.",
    stack: ["JavaScript", "D3.js", "PWA"],
  },
  {
    start: "Jul 2021", end: "Sep 2021",
    role: "Front-End Developer (part-time)",
    company: "Buco Business Consulting",
    location: "Germany",
    summary: "Front-end development on enterprise SAP UI projects.",
    stack: ["JavaScript", "SAPUI5"],
  },
  {
    start: "Jan 2018", end: "Dec 2020",
    role: "Front-End & Data Visualization Developer",
    company: "University of Stuttgart",
    location: "Germany",
    summary: "Built a D3.js visualization tool for NLP research — a new technique for researchers to gain insight into AI training data. Co-author of the paper \u201CAnnoXplorer: A Scalable, Integrated Approach for the Visual Analysis of Text Annotations\u201D.",
    stack: ["JavaScript", "D3.js"],
  },
  {
    start: "Apr 2016", end: "Nov 2017",
    role: "Front-End Developer (Intern)",
    company: "DAASI International",
    location: "Germany",
    summary: "Front-end implementation of \u201CLUI 2.0 — LDAP User Interface for Identity & Access Management\u201D.",
    stack: ["JavaScript", "Angular", "PrimeNG"],
  },
];

const EDUCATION = [
  { years: "2016 — 2021", school: "University of T\u00FCbingen", degree: "B.Sc. Informatics", country: "Germany" },
  { years: "2014 — 2015", school: "Polytechnic University of Turin", degree: "M.Sc. Telecommunication Engineering", country: "Italy" },
  { years: "2013 — 2014", school: "State Engineering University of Armenia", degree: "M.Sc. Telecommunication", country: "Armenia" },
  { years: "2009 — 2013", school: "State Engineering University of Armenia", degree: "B.Sc. Radio Engineering & Communications", country: "Armenia" },
];

const STACK = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Python"] },
  { group: "Frameworks", items: ["Angular", "React", "Node.js", "SAPUI5"] },
  { group: "Visualization", items: ["D3.js", "G6.js", "Three.js", "Canvas", "SVG", "WebGL", "Power BI"] },
  { group: "Data & APIs", items: ["GraphQL", "InfluxDB"] },
  { group: "AI Engineering", items: ["Claude Code", "Claude Agents & Subagents", "MCP", "LLM APIs", "Prompt Engineering", "Hugging Face"] },
  { group: "Markup & UI", items: ["HTML5", "CSS3", "Bootstrap", "PWA"] },
  { group: "Languages (spoken)", items: ["English (Professional)", "Russian (Intermediate)", "Armenian (Native)", "German (Intermediate)"] },
];

const STACK_ICONS = {
  "Languages": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6l-5 6 5 6" /><path d="M16 6l5 6-5 6" /><path d="M14 4l-4 16" />
    </svg>
  ),
  "Frameworks": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  ),
  "Visualization": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" /><path d="M6 20V10" /><path d="M11 20V4" /><path d="M16 20v-7" /><path d="M21 20v-4" />
    </svg>
  ),
  "Data & APIs": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
  "AI Engineering": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l3 3M16 16l3 3M19 5l-3 3M8 16l-3 3" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  "Markup & UI": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" />
      <circle cx="6.5" cy="6.5" r="0.6" fill="currentColor" /><circle cx="9" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  "Languages (spoken)": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a13 13 0 010 18" /><path d="M12 3a13 13 0 000 18" />
    </svg>
  ),
};

// ------- UI PRIMITIVES --------

function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${vis ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

function Marquee({ items }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="marquee-item">
            <span className="dot" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = (n) => String(n).padStart(2, "0");
  return <span className="mono">{fmt(now.getUTCHours())}:{fmt(now.getUTCMinutes())}:{fmt(now.getUTCSeconds())} UTC</span>;
}

// ------- HERO (screenshot showcase) --------

function Hero() {
  // big collage strip across the header — three rows scrolling at different speeds
  const rowA = useMemo(() => [...SHOTS, ...SHOTS], []);
  const rowB = useMemo(() => [...SHOTS.slice().reverse(), ...SHOTS.slice().reverse()], []);
  const rowC = useMemo(() => {
    const shifted = [...SHOTS.slice(6), ...SHOTS.slice(0, 6)];
    return [...shifted, ...shifted];
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-strip" aria-hidden="true">
        <div className="strip strip-a">
          {rowA.map((s, i) => <div key={`a-${i}`} className="strip-shot"><img src={s} alt="" loading={i < 6 ? "eager" : "lazy"} /></div>)}
        </div>
        <div className="strip strip-b">
          {rowB.map((s, i) => <div key={`b-${i}`} className="strip-shot"><img src={s} alt="" loading="lazy" /></div>)}
        </div>
        <div className="strip strip-c">
          {rowC.map((s, i) => <div key={`c-${i}`} className="strip-shot"><img src={s} alt="" loading="lazy" /></div>)}
        </div>
        <div className="hero-vignette" />
        <div className="hero-grid-overlay" />
      </div>

      <div className="hero-text">
        <div className="eyebrow mono">
          <span className="status-dot" />
          <span>AVAILABLE FOR SELECT ENGAGEMENTS — Q3 2026</span>
        </div>
        <h1 className="hero-name">
          Harutyun<br />
          Minasyan<span className="accent-dot">.</span>
        </h1>
        <p className="hero-role mono">
          DATA VISUALIZATION ENGINEER<span className="muted"> &nbsp;·&nbsp; YEREVAN / DUBAI</span>
        </p>
        <p className="hero-bio">
          Senior Data Visualization Developer with <strong>10+ years</strong> building
          high-performance dashboards and analytics tools that turn large, complex datasets
          into clear, actionable insights. Expert in JavaScript / TypeScript, React and Angular
          with deep D3.js, G6.js, Canvas &amp; WebGL — from rendering 2M+ elements to shipping
          Power BI custom visuals for Microsoft. I orchestrate <em>AI-driven workflows</em> with
          Claude Code, agents &amp; MCP to ship production-grade interfaces faster.
        </p>
        <div className="hero-actions">
          <a className="btn primary" href="#timeline">
            <span>View career</span>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a className="btn ghost" href="#contact">Get in touch</a>
        </div>
      </div>

      <div className="hero-readout mono">
        <div className="ro-block">
          <div className="ro-k">YRS_EXP</div>
          <div className="ro-v">10+</div>
        </div>
        <div className="ro-block">
          <div className="ro-k">ROLES</div>
          <div className="ro-v">{TIMELINE.length}</div>
        </div>
        <div className="ro-block">
          <div className="ro-k">PROJECTS</div>
          <div className="ro-v">30+</div>
        </div>
        <div className="ro-block ro-clock">
          <div className="ro-k">UTC</div>
          <div className="ro-v"><LiveClock /></div>
        </div>
      </div>

      <Marquee items={[
        "D3.JS", "THREE.JS", "G6.JS", "REACT", "ANGULAR", "TYPESCRIPT",
        "POWER BI", "GRAPHQL", "GRAPHVIZ", "INFLUXDB", "WEBGL", "CANVAS",
        "CLAUDE CODE", "CLAUDE AGENTS", "MCP", "HUGGING FACE", "FORCE LAYOUT", "SVG + CANVAS",
      ]} />
    </section>
  );
}

// ------- TIMELINE --------

function TimelineRow({ item, i, total }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <article ref={ref} className={`tl-row ${vis ? "in" : ""} ${item.current ? "current" : ""}`} style={{ transitionDelay: `${(i % 8) * 70}ms` }}>
      <div className="tl-col tl-when mono">
        <div className="tl-end">{item.end}</div>
        <div className="tl-arrow">↑</div>
        <div className="tl-start">{item.start}</div>
      </div>

      <div className="tl-col tl-rail">
        <div className="tl-line" />
        <div className="tl-node">
          {item.current && <div className="tl-pulse" />}
          <div className="tl-node-dot" />
        </div>
        <div className="tl-index mono">{String(total - i).padStart(2, "0")}</div>
      </div>

      <div className="tl-col tl-body">
        <div className="tl-meta mono">
          <span>{item.company}</span>
          <span className="muted">·</span>
          <span className="muted">{item.location}</span>
          {item.current && <span className="tl-now">CURRENT</span>}
        </div>
        <h3 className="tl-role">{item.role}</h3>
        <p className="tl-summary">{item.summary}</p>
        <div className="tl-stack">
          {item.stack.map(s => <span key={s} className="pill">{s}</span>)}
        </div>
      </div>
    </article>
  );
}

function Timeline() {
  return (
    <section className="timeline" id="timeline">
      <Reveal as="header" className="section-head">
        <div className="sh-left">
          <span className="mono small muted">§01 · CAREER TIMELINE</span>
          <h2>Ten years, three countries, one craft.</h2>
        </div>
        <div className="sh-right mono small muted">
          {TIMELINE.length} ROLES &nbsp;·&nbsp; 2016 — 2026
        </div>
      </Reveal>
      <div className="tl-list">
        {TIMELINE.map((it, i) => <TimelineRow key={i} item={it} i={i} total={TIMELINE.length} />)}
      </div>

      <Reveal as="header" className="section-head">
        <div className="sh-left">
          <span className="mono small muted">§02 · EDUCATION</span>
          <h2>Informatics and telecommunications.</h2>
        </div>
      </Reveal>
      <div className="edu-grid">
        {EDUCATION.map((e, i) => (
          <Reveal key={i} className="edu-card" delay={i * 80}>
            <div className="edu-years mono small muted">{e.years}</div>
            <div className="edu-degree">{e.degree}</div>
            <div className="edu-school mono">{e.school}</div>
            <div className="edu-country mono small muted">{e.country}</div>
          </Reveal>
        ))}
      </div>

      <Reveal as="header" className="section-head">
        <div className="sh-left">
          <span className="mono small muted">§03 · STACK</span>
          <h2>What I work with.</h2>
        </div>
        <div className="sh-right mono small muted">
          {STACK.reduce((n, g) => n + g.items.length, 0)} TOOLS · {STACK.length} CATEGORIES
        </div>
      </Reveal>
      <div className="stack-block">
        {STACK.map((g, i) => (
          <Reveal key={g.group} className="stack-card" delay={(i % 3) * 80}>
            <div className="stack-card-head">
              <span className="mono stack-card-num">/{String(i + 1).padStart(2, "0")}</span>
              <span className="stack-card-glyph" aria-hidden="true">{STACK_ICONS[g.group]}</span>
            </div>
            <div className="stack-card-title">{g.group}</div>
            <div className="stack-card-items">
              {g.items.map(it => <span key={it} className="pill">{it}</span>)}
            </div>
            <div className="stack-card-count mono small muted">{g.items.length} {g.items.length === 1 ? "ITEM" : "ITEMS"}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ------- GALLERY (screenshots only) --------

function Gallery({ onOpen }) {
  return (
    <section className="gallery" id="gallery">
      <div className="gallery-grid">
        {SHOTS.map((s, i) => (
          <Reveal key={s} className={`g-cell ${gallerySpan(i)}`} delay={(i % 8) * 50}>
            <button className="g-shot" onClick={() => onOpen(i)} aria-label={`Open screenshot ${i + 1}`}>
              <img src={s} alt="" loading="lazy" />
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function gallerySpan(i) {
  // intentional rhythm — every 5th wide, every 7th tall
  if (i % 5 === 0) return "span-wide";
  if (i % 7 === 3) return "span-tall";
  return "";
}

// ------- LIGHTBOX --------

function Lightbox({ index, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (index < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrev, onNext]);

  if (index < 0) return null;
  return (
    <div className="lightbox" onClick={onClose}>
      <div className="lb-bare" onClick={e => e.stopPropagation()}>
        <button className="lb-nav lb-prev" onClick={onPrev} aria-label="Previous">←</button>
        <img src={SHOTS[index]} alt="" />
        <button className="lb-nav lb-next" onClick={onNext} aria-label="Next">→</button>
        <button className="lb-nav lb-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="lb-counter mono">{String(index + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}</div>
      </div>
    </div>
  );
}

// ------- CONTACT --------

const CONTACT_CHANNELS = [
  {
    key: "email", label: "Email", value: "harutyun.minasyan@gmail.com",
    href: "mailto:harutyun.minasyan@gmail.com", primary: true,
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 7 9-7" /></svg>,
  },
  {
    key: "linkedin", label: "LinkedIn", value: "/in/harutyun-minasyan",
    href: "https://www.linkedin.com/in/harutyun-minasyan/", external: true,
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.96 3.77-1.96 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.36c0-1.28-.02-2.93-1.78-2.93-1.78 0-2.05 1.39-2.05 2.83V21h-4V9z"/></svg>,
  },
  {
    key: "github", label: "GitHub", value: "@harutc3",
    href: "https://github.com/harutc3", external: true,
    icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.17a11.04 11.04 0 015.79 0c2.21-1.48 3.18-1.17 3.18-1.17.62 1.58.23 2.75.11 3.04.74.8 1.18 1.82 1.18 3.08 0 4.42-2.7 5.39-5.27 5.68.41.35.77 1.05.77 2.12v3.14c0 .31.21.66.8.55A11.5 11.5 0 0012 .5z"/></svg>,
  },
  {
    key: "upwork", label: "Upwork", value: "Top-rated freelancer",
    href: "https://www.upwork.com/freelancers/~010f6a1278e0c39cfa", external: true,
    icon: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/></svg>,
  },
  {
    key: "phone", label: "Phone", value: "+971 50 115 42",
    href: "tel:+971501154200",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>,
  },
];

function Contact() {
  const [copied, setCopied] = useState(false);
  const onCopy = (e) => {
    e.preventDefault();
    const email = "harutyun.minasyan@gmail.com";
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section className="contact" id="contact">
      <Reveal as="header" className="section-head">
        <div className="sh-left">
          <span className="mono small muted">§05 · CONTACT</span>
          <h2>Have a hard data problem?<br /><span className="accent">Let&apos;s talk.</span></h2>
        </div>
        <div className="sh-right mono small muted">
          <span className="status-dot" /> AVAILABLE FOR CONTRACTS · Q2 2026
        </div>
      </Reveal>

      <div className="contact-block">
        <Reveal className="contact-lead">
          <div className="cl-stamp">
            <div className="cl-stamp-head">
              <span className="mono small">PRIMARY CHANNEL</span>
              <span className="cl-stamp-status">
                <span className="status-dot" />
                <span className="mono small">ONLINE · &lt; 24H</span>
              </span>
            </div>
            <div className="cl-stamp-rule" />
          </div>

          <div className="cl-mail">
            <div className="cl-mail-label mono small muted">→ WRITE TO</div>
            <a className="cl-mailto" href="mailto:harutyun.minasyan@gmail.com">
              <span className="cl-mailto-text">
                <span className="cl-local">harutyun.minasyan</span><span className="cl-mailto-domain">@gmail.com</span>
              </span>
              <span className="cl-cursor" aria-hidden="true" />
            </a>
            <div className="cl-actions">
              <button type="button" className={`cl-action cl-copy ${copied ? "is-copied" : ""}`} onClick={onCopy}>
                <span className="cl-action-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 012-2h10" /></svg>
                </span>
                <span className="cl-action-label">Copy address</span>
                <span className="cl-action-confirm mono">COPIED</span>
              </button>
              <a className="cl-action cl-open" href="mailto:harutyun.minasyan@gmail.com">
                <span className="cl-action-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>
                </span>
                <span className="cl-action-label">Open in mail</span>
              </a>
            </div>
          </div>

          <div className="cl-foot">
            <div className="cl-foot-row">
              <span className="mono small muted">BASED IN</span>
              <span className="cl-foot-v">Yerevan, AM · UAE-ready</span>
            </div>
            <div className="cl-foot-row">
              <span className="mono small muted">REMOTE</span>
              <span className="cl-foot-v">UTC+4 · overlap with EU, Asia &amp; US-East</span>
            </div>
            <div className="cl-foot-row">
              <span className="mono small muted">LANGUAGES</span>
              <span className="cl-foot-v">EN · RU · HY · DE</span>
            </div>
          </div>
        </Reveal>

        <Reveal className="contact-channels" delay={120}>
          <div className="cc-head mono small muted">
            <span>CHANNEL</span>
            <span>HANDLE</span>
          </div>
          {CONTACT_CHANNELS.filter(c => !c.primary).map(c => (
            <a key={c.key}
               className="cc-row"
               href={c.href}
               {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}>
              <span className="cc-icon" aria-hidden="true">{c.icon}</span>
              <span className="cc-label mono">{c.label}</span>
              <span className="cc-value">{c.value}</span>
              <span className="cc-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
              </span>
            </a>
          ))}
        </Reveal>
      </div>
      <Reveal delay={240} className="footer">
        <div className="mono small muted">© 2026 Harutyun Minasyan · Crafted with care, shipped with agents.</div>
        <a className="mono small to-top" href="#top">↑ TO TOP</a>
      </Reveal>
    </section>
  );
}

// ------- TOP CHROME --------

function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`topbar ${scrolled ? "scrolled" : ""}`}>
      <div className="tb-left mono">
        <span className="logo-mark">◆</span>
        <span>HM</span>
        <span className="muted">/</span>
        <span className="muted">PORTFOLIO_v2.26</span>
      </div>
      <nav className="tb-nav mono">
        <a href="#timeline">Timeline</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="tb-right mono">
        <span className="status-dot" />
        <span>Available</span>
      </div>
    </header>
  );
}

// ------- TWEAKS --------

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "amber",
  "stripSpeed": "slow",
  "showCrosshair": true
}/*EDITMODE-END*/;

const ACCENT_PRESETS = {
  amber:   { h: 80,  c: 0.15, label: "Amber" },
  cyan:    { h: 220, c: 0.13, label: "Cyan" },
  magenta: { h: 350, c: 0.16, label: "Magenta" },
  lime:    { h: 130, c: 0.16, label: "Lime" },
};

const SPEED_PRESETS = {
  slow:   { a: "120s", b: "150s", c: "180s" },
  normal: { a: "70s",  b: "90s",  c: "110s" },
  fast:   { a: "40s",  b: "55s",  c: "65s"  },
};

function Tweaks({ tw, setTweak }) {
  useEffect(() => {
    const a = ACCENT_PRESETS[tw.accent] || ACCENT_PRESETS.amber;
    document.documentElement.style.setProperty("--acc-h", a.h);
    document.documentElement.style.setProperty("--acc-c", a.c);
    const sp = SPEED_PRESETS[tw.stripSpeed] || SPEED_PRESETS.normal;
    document.documentElement.style.setProperty("--strip-a", sp.a);
    document.documentElement.style.setProperty("--strip-b", sp.b);
    document.documentElement.style.setProperty("--strip-c", sp.c);
    document.documentElement.dataset.crosshair = tw.showCrosshair ? "on" : "off";
  }, [tw]);
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent">
        <TweakRadio
          value={tw.accent}
          onChange={v => setTweak("accent", v)}
          options={Object.entries(ACCENT_PRESETS).map(([k, v]) => ({ value: k, label: v.label }))}
        />
      </TweakSection>
      <TweakSection label="Header strip speed">
        <TweakRadio
          value={tw.stripSpeed}
          onChange={v => setTweak("stripSpeed", v)}
          options={[
            { value: "slow", label: "Slow" },
            { value: "normal", label: "Normal" },
            { value: "fast", label: "Fast" },
          ]}
        />
      </TweakSection>
      <TweakSection label="Hero">
        <TweakToggle
          label="Show crosshair overlay"
          value={tw.showCrosshair}
          onChange={v => setTweak("showCrosshair", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// ------- APP --------

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Timeline />
        <Contact />
      </main>
      <Tweaks tw={tw} setTweak={setTweak} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

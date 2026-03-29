// ══════════════════════════════════════
//  STATE
// ══════════════════════════════════════
let currentMode = "recruiter";
let currentTheme = "dark";

// Must be strings (quoted). Unquoted values are treated as variable names and break the whole script.
const EMAILJS_PUBLIC_KEY = "_mVsGaH3y7ZsWd0xb";
const EMAILJS_SERVICE_ID = "service_illukxu";
const EMAILJS_TEMPLATE_ID = "template_avlvnf4";
let emailJsInitialized = false;
function initEmailJsIfNeeded() {
  const key = EMAILJS_PUBLIC_KEY;
  if (!key || emailJsInitialized) return;
  if (typeof emailjs === "undefined") {
    throw new Error(
      "EmailJS did not load. Ensure the EmailJS script runs before script.js."
    );
  }
  emailjs.init({ publicKey: key });
  emailJsInitialized = true;
}

// ══════════════════════════════════════
//  CURSOR (recruiter only)
// ══════════════════════════════════════
const rCursor = document.getElementById("rCursor");
const rRing = document.getElementById("rCursorRing");
document.addEventListener("mousemove", (e) => {
  rCursor.style.left = e.clientX + "px";
  rCursor.style.top = e.clientY + "px";
  rRing.style.left = e.clientX + "px";
  rRing.style.top = e.clientY + "px";
});
document
  .querySelectorAll(
    "a,button,.r-chip,.r-sys-card,.r-contact-link,.r-ptag,.theme-opt,.mode-btn"
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => rRing.classList.add("hover"));
    el.addEventListener("mouseleave", () => rRing.classList.remove("hover"));
  });

// ══════════════════════════════════════
//  THEME
// ══════════════════════════════════════
function setTheme(t, options = {}) {
  const { persist = true } = options;
  const root = document.documentElement;
  const activeTheme = root.getAttribute("data-theme");
  const themeLightEl = document.getElementById("themeLight");
  const themeDarkEl = document.getElementById("themeDark");
  const isAlreadyApplied =
    currentTheme === t &&
    activeTheme === t &&
    themeLightEl?.classList.contains("active") === (t === "light") &&
    themeDarkEl?.classList.contains("active") === (t === "dark");

  if (isAlreadyApplied) return;

  // Disable transitions briefly so theme change feels instant.
  root.classList.add("theme-switching");
  currentTheme = t;
  root.setAttribute("data-theme", t);
  themeLightEl?.classList.toggle("active", t === "light");
  themeDarkEl?.classList.toggle("active", t === "dark");
  if (persist) {
    try {
      localStorage.setItem("pf-theme", t);
    } catch (e) {}
  }
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      root.classList.remove("theme-switching");
    });
  });
}

// ══════════════════════════════════════
//  MODE TOGGLE
// ══════════════════════════════════════
function toggleMode() {
  currentMode = currentMode === "recruiter" ? "dev" : "recruiter";
  document.documentElement.setAttribute("data-mode", currentMode);

  const iconContainer = document.getElementById("modeIco");

  // Define the SVG paths (Minified for performance)
  const devIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-laptop-icon lucide-laptop"><path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/><path d="M20.054 15.987H3.946"/></svg>`;

  const recruiterIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h1.5" /><path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>`;
  // Swap icons based on what the user will switch TO
  iconContainer.innerHTML = currentMode === "dev" ? recruiterIcon : devIcon;

  if (currentMode === "dev") {
    notify(
      "dev",
      "Dev Mode Active",
      "VS Code view · Press Ctrl+P for command palette"
    );
  } else {
    notify("recruiter", "Recruiter Mode", "Welcome to Recruiter view.");
    // ... existing reveal logic
  }
}
// function toggleMode() {
//   currentMode = currentMode === "recruiter" ? "dev" : "recruiter";
//   document.documentElement.setAttribute("data-mode", currentMode);
//   // Icon shows what you'll SWITCH TO
//   document.getElementById("modeIco").textContent =
//     currentMode === "dev" ? "👔" : "💻";

//   if (currentMode === "dev") {
//     setTheme("dark");
//     notify(
//       "💻",
//       "Dev Mode Active",
//       "VS Code view · Press Ctrl+P for command palette"
//     );
//   } else {
//     notify("👔", "Recruiter Mode", "Cyberpunk portfolio view restored");
//     setTimeout(() => {
//       document
//         .querySelectorAll(".reveal")
//         .forEach((el) => revealObs.observe(el));
//       document
//         .querySelectorAll(".r-prog-bar")
//         .forEach((b) => progObs.observe(b));
//     }, 200);
//   }
// }

// ══════════════════════════════════════
//  MOBILE NAV
// ══════════════════════════════════════
function toggleMobNav() {
  document.getElementById("rMobileNav").classList.toggle("open");
}
function closeMobNav() {
  document.getElementById("rMobileNav").classList.remove("open");
}

// ══════════════════════════════════════
//  TYPING BADGE
// ══════════════════════════════════════
const badge = document.getElementById("rBadge");
if (badge) {
  const text = "Available for opportunities";
  const dot = document.createElement("span");
  dot.style.cssText =
    "display:inline-block;width:6px;height:6px;background:var(--accent);border-radius:50%;animation:pulse 2s ease infinite;margin-right:8px;flex-shrink:0;vertical-align:middle";
  badge.appendChild(dot);
  let i = 0;
  const type = () => {
    if (i < text.length) {
      badge.appendChild(document.createTextNode(text[i++]));
      setTimeout(type, 55);
    }
  };
  setTimeout(type, 500);
}

// ══════════════════════════════════════
//  VS CODE FILE CONTENTS
// ══════════════════════════════════════
const devFiles = {
  about: `<span class="cmt">// about.component.ts — About section only</span>
<span class="kw">import</span> <span class="pun">{</span>
  <span class="fn">Component</span><span class="pun">,</span>
  <span class="fn">ChangeDetectionStrategy</span><span class="pun">,</span>
  <span class="fn">signal</span><span class="pun">,</span>
  <span class="fn">computed</span><span class="pun">,</span>
<span class="pun">}</span> <span class="kw">from</span> <span class="str">'@angular/core'</span><span class="pun">;</span>

<span class="kw">type</span> <span class="cls">ProgressItem</span> <span class="op">=</span> <span class="pun">{</span>
  <span class="prp">label</span><span class="pun">:</span>   <span class="typ">string</span><span class="pun">;</span>
  <span class="prp">percent</span><span class="pun">:</span> <span class="typ">number</span><span class="pun">;</span>
<span class="pun">};</span>

<span class="kw">type</span> <span class="cls">Award</span> <span class="op">=</span> <span class="pun">{</span>
  <span class="prp">title</span><span class="pun">:</span> <span class="typ">string</span><span class="pun">;</span>
  <span class="prp">sub</span><span class="pun">:</span>   <span class="typ">string</span><span class="pun">;</span>
  <span class="prp">desc</span><span class="pun">:</span>  <span class="typ">string</span><span class="pun">;</span>
<span class="pun">};</span>

<span class="kw">const</span> <span class="prp">ABOUT_AWARD</span><span class="pun">:</span> <span class="cls">Award</span> <span class="op">=</span> <span class="pun">{</span>
  <span class="prp">title</span><span class="pun">:</span> <span class="str">'Hackathon Winner'</span><span class="pun">,</span>
  <span class="prp">sub</span><span class="pun">:</span>   <span class="str">'Flair Labs Hackathon 2023 - Team Clippers'</span><span class="pun">,</span>
  <span class="prp">desc</span><span class="pun">:</span>  <span class="str">\`Contributed as the Front-End Developer for Team Clippers.
delivering an award-winning solution under tight deadlines.
Built production-ready user interfaces rapidly while maintaining high standards for code quality, performance, and user experience.
Developed and enhanced data-driven dashboards by integrating query-based datasets with Grafana visualizations.
Enabled real-time monitoring and actionable insights through well-structured dashboard design and optimized data presentation.\`</span><span class="pun">,</span>
<span class="pun">};</span>

<span class="dec">@Component</span><span class="pun">({</span>
  <span class="prp">selector</span><span class="pun">:</span>        <span class="str">'app-about'</span><span class="pun">,</span>
  <span class="prp">standalone</span><span class="pun">:</span>      <span class="kw">true</span><span class="pun">,</span>
  <span class="prp">templateUrl</span><span class="pun">:</span>     <span class="str">'./about.component.html'</span><span class="pun">,</span>
  <span class="prp">styleUrl</span><span class="pun">:</span>        <span class="str">'./about.component.scss'</span><span class="pun">,</span>
  <span class="prp">changeDetection</span><span class="pun">:</span> <span class="fn">ChangeDetectionStrategy</span><span class="pun">.</span><span class="prp">OnPush</span><span class="pun">,</span>
<span class="pun">})</span>
<span class="kw">export class</span> <span class="cls">AboutComponent</span> <span class="pun">{</span>
  <span class="cmt">// Hero — same copy as Recruiter &lt;p class="r-hero-title"&gt; + description</span>
  <span class="kw">protected readonly</span> <span class="prp">heroTitle</span> <span class="op">=</span> <span class="fn">signal</span><span class="pun">(</span>
    <span class="str">'Software Engineer · Frontend Developer | Angular · React · Node.js'</span>
  <span class="pun">);</span>
  <span class="kw">protected readonly</span> <span class="prp">heroDescription</span> <span class="op">=</span> <span class="fn">signal</span><span class="pun">(</span><span class="str">\`Focused on building high-scale, responsive web applications using 
  Angular and React. I leverage System Design principles to create modular UI components and efficient 
  data-fetching strategies that reduce latency and improve developer velocity.\`</span>
<span class="pun">);</span>

  <span class="cmt">// Profile card (r-profile-tags / r-profile-info)</span>
  <span class="kw">protected readonly</span> <span class="prp">profileTags</span> <span class="op">=</span> <span class="pun">[</span>
    <span class="str">'Angular'</span><span class="pun">,</span> <span class="str">'React'</span><span class="pun">,</span> <span class="str">'TypeScript'</span><span class="pun">,</span> <span class="str">'Node.js'</span><span class="pun">,</span> <span class="str">'MongoDB'</span><span class="pun">,</span> <span class="str">'Responsive Design'</span>
  <span class="pun">];</span>
  <span class="kw">protected readonly</span> <span class="prp">locationLine</span> <span class="op">=</span>
    <span class="str">'India · Open to Remote | Hybrid | On-site'</span><span class="pun">;</span>
  <span class="kw">protected readonly</span> <span class="prp">availability</span> <span class="op">=</span> <span class="str">'Actively looking'</span><span class="pun">;</span>
  <span class="kw">protected readonly</span> <span class="prp">badgeText</span> <span class="op">=</span> <span class="str">'Available for opportunities'</span><span class="pun">;</span>

  <span class="cmt">// Stats row labels (r-stats-row)</span>
  <span class="kw">protected readonly</span> <span class="prp">statLabels</span> <span class="op">=</span> <span class="pun">[</span>
    <span class="str">'Years Experience'</span><span class="pun">,</span> <span class="str">'Technologies'</span><span class="pun">,</span> <span class="str">'Hackathon Winner'</span><span class="pun">,</span> <span class="str">'Lines of Impact'</span>
  <span class="pun">];</span>

  <span class="cmt">// About section text (01 — About)</span>
  <span class="kw">protected readonly</span> <span class="prp">aboutIntro</span> <span class="op">=</span> <span class="fn">computed</span><span class="pun">(() =&gt;</span>
    <span class="str">\`I'm a Software Engineer with \${this.experienceFull()} of
experience in designing, testing, and delivering scalable front-end solutions
within Agile environments. I specialize in building modular UI
using Angular, with strong focus on performance, responsive design, and UX optimization,
while consistently following industry best practices.\`</span>
  <span class="pun">);</span>

  <span class="kw">protected readonly</span> <span class="prp">aboutStack</span> <span class="op">=</span> <span class="fn">signal</span><span class="pun">(</span><span class="str">\`My expertise spans the full MEAN stack (MongoDB,
Express.js, Angular, and Node.js) along with hands-on experience
in React and modern frontend tooling.\`</span><span class="pun">);</span>

  <span class="cmt">// Progress bars and award card</span>
  <span class="kw">protected readonly</span> <span class="prp">progressItems</span><span class="pun">:</span> <span class="cls">ProgressItem</span><span class="pun">[]</span> <span class="op">=</span> <span class="prp">PROGRESS_ITEMS</span><span class="pun">;</span>
  <span class="kw">protected readonly</span> <span class="prp">award</span><span class="pun">:</span> <span class="cls">Award</span> <span class="op">=</span> <span class="prp">ABOUT_AWARD</span><span class="pun">;</span>

  <span class="cmt">// Experience helpers (kept in sync with recruiter stats)</span>
  <span class="kw">private readonly</span> <span class="prp">startDate</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Date</span><span class="pun">(</span><span class="str">'2022-11-22'</span><span class="pun">);</span>

  <span class="kw">protected readonly</span> <span class="prp">experienceFull</span> <span class="op">=</span> <span class="fn">computed</span><span class="pun">(() =&gt; {</span>
    <span class="kw">const</span> <span class="prp">now</span> <span class="op">=</span> <span class="kw">new</span> <span class="fn">Date</span><span class="pun">();</span>
    <span class="kw">let</span> <span class="prp">years</span>  <span class="op">=</span> <span class="prp">now</span><span class="pun">.</span><span class="fn">getFullYear</span><span class="pun">()</span> <span class="op">-</span> <span class="prp">this</span><span class="pun">.</span><span class="prp">startDate</span><span class="pun">.</span><span class="fn">getFullYear</span><span class="pun">();</span>
    <span class="kw">let</span> <span class="prp">months</span> <span class="op">=</span> <span class="prp">now</span><span class="pun">.</span><span class="fn">getMonth</span><span class="pun">()</span>    <span class="op">-</span> <span class="prp">this</span><span class="pun">.</span><span class="prp">startDate</span><span class="pun">.</span><span class="fn">getMonth</span><span class="pun">();</span>

    <span class="kw">if</span> <span class="pun">(</span><span class="prp">months</span> <span class="op">&lt;</span> <span class="num">0</span><span class="pun">)</span> <span class="pun">{</span>
      <span class="prp">years</span><span class="op">--</span><span class="pun">;</span>
      <span class="prp">months</span> <span class="op">+=</span> <span class="num">12</span><span class="pun">;</span>
    <span class="pun">}</span>
    <span class="kw">return</span> <span class="str">\`\${years} years and \${months} months\`</span><span class="pun">;</span>
  <span class="pun">});</span>

  <span class="cmt">// Fallback default to show expected value in the UI</span>
  <span class="kw">protected readonly</span> <span class="prp">experienceDecimal</span> <span class="op">=</span> <span class="fn">signal</span><span class="pun">(</span><span class="str">'3.7'</span><span class="pun">);</span>
<span class="pun">}</span>
<span class="cblink"></span>`,
  skills: `<span class="cmt">// skills.component.ts — Skills &amp; Stack (section id="r-skills")</span>
<span class="kw">import</span> <span class="pun">{</span>
  <span class="fn">Component</span><span class="pun">,</span>
  <span class="fn">ChangeDetectionStrategy</span><span class="pun">,</span>
<span class="pun">}</span> <span class="kw">from</span> <span class="str">'@angular/core'</span><span class="pun">;</span>

<span class="kw">type</span> <span class="cls">SkillCategory</span> <span class="op">=</span> <span class="pun">{</span>
  <span class="prp">name</span><span class="pun">:</span>  <span class="typ">string</span><span class="pun">;</span>
  <span class="prp">chips</span><span class="pun">:</span> <span class="typ">string</span><span class="pun">[];</span>
<span class="pun">};</span>

<span class="kw">const</span> <span class="prp">SKILL_CATEGORIES</span><span class="pun">:</span> <span class="cls">SkillCategory</span><span class="pun">[]</span> <span class="op">=</span> <span class="pun">[</span>
  <span class="pun">{</span>
    <span class="prp">name</span><span class="pun">:</span> <span class="str">'Frontend'</span><span class="pun">,</span>
    <span class="prp">chips</span><span class="pun">:</span> <span class="pun">[</span>
      <span class="str">'Angular'</span><span class="pun">,</span>
      <span class="str">'React'</span><span class="pun">,</span>
      <span class="str">'JavaScript'</span><span class="pun">,</span>
      <span class="str">'HTML'</span><span class="pun">,</span>
      <span class="str">'CSS'</span><span class="pun">,</span>
      <span class="str">'SCSS'</span><span class="pun">,</span>
      <span class="str">'LESS'</span><span class="pun">,</span>
      <span class="str">'Bootstrap'</span><span class="pun">,</span>
      <span class="str">'Tailwind CSS / CSS Modules'</span><span class="pun">,</span>
      <span class="str">'Responsive Design'</span><span class="pun">,</span>
      <span class="str">'RxJS'</span><span class="pun">,</span>
      <span class="str">'NgRx'</span><span class="pun">,</span>
      <span class="str">'Web Performance'</span><span class="pun">,</span>
      <span class="str">'Core Web Vitals'</span><span class="pun">,</span>
      <span class="str">'Storybook'</span><span class="pun">,</span>
      <span class="str">'Flutter'</span><span class="pun">,</span>
    <span class="pun">],</span>
  <span class="pun">},</span>
  <span class="pun">{</span>
    <span class="prp">name</span><span class="pun">:</span> <span class="str">'Backend'</span><span class="pun">,</span>
    <span class="prp">chips</span><span class="pun">:</span> <span class="pun">[</span>
      <span class="str">'Node.JS'</span><span class="pun">,</span>
      <span class="str">'Express.JS'</span><span class="pun">,</span>
      <span class="str">'TypeScript'</span><span class="pun">,</span>
      <span class="str">'REST APIs'</span><span class="pun">,</span>
      <span class="str">'API Integration'</span><span class="pun">,</span>
      <span class="str">'JWT Auth'</span><span class="pun">,</span>
    <span class="pun">],</span>
  <span class="pun">},</span>
  <span class="pun">{</span>
    <span class="prp">name</span><span class="pun">:</span> <span class="str">'Databases'</span><span class="pun">,</span>
    <span class="prp">chips</span><span class="pun">:</span> <span class="pun">[</span><span class="str">'MySQL'</span><span class="pun">,</span> <span class="str">'MongoDB'</span><span class="pun">],</span>
  <span class="pun">},</span>
  <span class="pun">{</span>
    <span class="prp">name</span><span class="pun">:</span> <span class="str">'Cloud'</span><span class="pun">,</span>
    <span class="prp">chips</span><span class="pun">:</span> <span class="pun">[</span><span class="str">'Firebase'</span><span class="pun">,</span> <span class="str">'AWS S3'</span><span class="pun">,</span> <span class="str">'AWS EC2'</span><span class="pun">],</span>
  <span class="pun">},</span>
  <span class="pun">{</span>
    <span class="prp">name</span><span class="pun">:</span> <span class="str">'Tools & DevOps'</span><span class="pun">,</span>
    <span class="prp">chips</span><span class="pun">:</span> <span class="pun">[</span><span class="str">'Docker'</span><span class="pun">,</span> <span class="str">'Git'</span><span class="pun">,</span> <span class="str">'M-files'</span><span class="pun">],</span>
  <span class="pun">},</span>
  <span class="pun">{</span>
    <span class="prp">name</span><span class="pun">:</span> <span class="str">'Monitoring'</span><span class="pun">,</span>
    <span class="prp">chips</span><span class="pun">:</span> <span class="pun">[</span><span class="str">'Grafana'</span><span class="pun">],</span>
  <span class="pun">},</span>
  <span class="pun">{</span>
    <span class="prp">name</span><span class="pun">:</span> <span class="str">'Testing'</span><span class="pun">,</span>
    <span class="prp">chips</span><span class="pun">:</span> <span class="pun">[</span>
      <span class="str">'Jest'</span><span class="pun">,</span>
      <span class="str">'Jasmine'</span><span class="pun">,</span>
      <span class="str">'Vitest'</span><span class="pun">,</span>
      <span class="str">'React Testing Library'</span><span class="pun">,</span>
    <span class="pun">],</span>
  <span class="pun">},</span>
   <span class="pun">{</span>
    <span class="prp">name</span><span class="pun">:</span> <span class="str">'No-Code'</span><span class="pun">,</span>
    <span class="prp">chips</span><span class="pun">:</span> <span class="pun">[</span><span class="str">'FlutterFlow'</span><span class="pun">],</span>
  <span class="pun">},</span>
<span class="pun">];</span>

<span class="kw">const</span> <span class="prp">TOTAL_SKILL_COUNT</span><span class="pun">:</span> <span class="typ">number</span> <span class="op">=</span>
  <span class="prp">SKILL_CATEGORIES</span><span class="pun">.</span><span class="fn">reduce</span><span class="pun">((</span><span class="prp">sum</span><span class="pun">,</span> <span class="prp">cat</span><span class="pun">)</span> <span class="op">=&gt;</span> <span class="prp">sum</span> <span class="op">+</span> <span class="prp">cat</span><span class="pun">.</span><span class="prp">chips</span><span class="pun">.</span><span class="prp">length</span><span class="pun">,</span> <span class="num">0</span><span class="pun">);</span>

<span class="dec">@Component</span><span class="pun">({</span>
  <span class="prp">selector</span><span class="pun">:</span>        <span class="str">'app-skills'</span><span class="pun">,</span>
  <span class="prp">standalone</span><span class="pun">:</span>      <span class="kw">true</span><span class="pun">,</span>
  <span class="prp">templateUrl</span><span class="pun">:</span>     <span class="str">'./skills.component.html'</span><span class="pun">,</span>
  <span class="prp">styleUrl</span><span class="pun">:</span>        <span class="str">'./skills.component.scss'</span><span class="pun">,</span>
  <span class="prp">changeDetection</span><span class="pun">:</span> <span class="fn">ChangeDetectionStrategy</span><span class="pun">.</span><span class="prp">OnPush</span><span class="pun">,</span>
<span class="pun">})</span>
<span class="kw">export class</span> <span class="cls">SkillsComponent</span> <span class="pun">{</span>
  <span class="kw">protected readonly</span> <span class="prp">categories</span><span class="pun">:</span>  <span class="cls">SkillCategory</span><span class="pun">[]</span> <span class="op">=</span> <span class="prp">SKILL_CATEGORIES</span><span class="pun">;</span>
  <span class="kw">protected readonly</span> <span class="prp">totalSkills</span><span class="pun">:</span> <span class="typ">number</span>         <span class="op">=</span> <span class="prp">TOTAL_SKILL_COUNT</span><span class="pun">;</span>

  <span class="kw">protected</span> <span class="fn">trackByName</span><span class="pun">(</span><span class="prp">_i</span><span class="pun">:</span> <span class="typ">number</span><span class="pun">,</span> <span class="prp">cat</span><span class="pun">:</span> <span class="cls">SkillCategory</span><span class="pun">):</span> <span class="typ">string</span> <span class="pun">{</span>
    <span class="kw">return</span> <span class="prp">cat</span><span class="pun">.</span><span class="prp">name</span><span class="pun">;</span>
  <span class="pun">}</span>

  <span class="kw">protected</span> <span class="fn">trackByChip</span><span class="pun">(</span><span class="prp">_i</span><span class="pun">:</span> <span class="typ">number</span><span class="pun">,</span> <span class="prp">chip</span><span class="pun">:</span> <span class="typ">string</span><span class="pun">):</span> <span class="typ">string</span> <span class="pun">{</span>
    <span class="kw">return</span> <span class="prp">chip</span><span class="pun">;</span>
  <span class="pun">}</span>
<span class="pun">}</span>
<span class="cblink"></span>`,
  experience: `<span class="cmt">// experience.component.ts </span>
<span class="kw">import</span> <span class="pun">{</span>
  <span class="fn">Component</span><span class="pun">,</span>
  <span class="fn">ChangeDetectionStrategy</span>
<span class="pun">}</span> <span class="kw">from</span> <span class="str">'@angular/core'</span><span class="pun">;</span>

<span class="kw">type</span> <span class="cls">ExperienceEntry</span> <span class="op">=</span> <span class="pun">{</span>
  <span class="prp">role</span><span class="pun">:</span>      <span class="typ">string</span><span class="pun">;</span>
  <span class="prp">company</span><span class="pun">:</span>   <span class="typ">string</span><span class="pun">;</span>
  <span class="prp">period</span><span class="pun">:</span>    <span class="typ">string</span><span class="pun">;</span>
  <span class="prp">location</span><span class="pun">:</span>  <span class="typ">string</span><span class="pun">;</span>
  <span class="prp">summary</span><span class="pun">:</span>   <span class="typ">string</span><span class="pun">;</span>
  <span class="prp">tags</span><span class="pun">:</span>      <span class="typ">string</span><span class="pun">[];</span>
<span class="pun">};</span>

<span class="kw">const</span> <span class="prp">EXPERIENCE_TIMELINE</span><span class="pun">:</span> <span class="cls">ExperienceEntry</span><span class="pun">[]</span> <span class="op">=</span> <span class="pun">[</span>
  <span class="pun">{</span>
    <span class="prp">role</span><span class="pun">:</span>    <span class="str">'Software Engineer'</span><span class="pun">,</span>
    <span class="prp">company</span><span class="pun">:</span> <span class="str">'Flair Labs · Full-time'</span><span class="pun">,</span>
    <span class="prp">period</span><span class="pun">:</span>  <span class="str">'May 2024 - Present'</span><span class="pun">,</span>
    <span class="prp">location</span><span class="pun">:</span> <span class="str">'Mumbai, India'</span><span class="pun">,</span>
    <span class="prp">summary</span><span class="pun">:</span> <span class="str">\`Designed, developed, and delivered scalable front-end solutions within Agile environments,<br/>focusing on modular and maintainable Angular-based UI architectures. Built responsive and<br/>performance-optimized interfaces with a strong emphasis on user experience. Contributed to<br/>full-stack feature development across multiple product lines, leveraging Angular component<br/>lifecycle and state management while working within the broader MEAN stack. Collaborated<br/>closely with cross-functional teams and senior engineers to deliver high-quality features in<br/>a fast-paced product environment.\`</span><span class="pun">,</span>
    <span class="prp">tags</span><span class="pun">:</span>    <span class="pun">[</span>
      <span class="str">'Angular'</span><span class="pun">,</span>
      <span class="str">'TypeScript'</span><span class="pun">,</span>
      <span class="str">'Node.js'</span><span class="pun">,</span>
      <span class="str">'MongoDB'</span><span class="pun">,</span>
      <span class="str">'React'</span><span class="pun">,</span>
      <span class="str">'Docker'</span><span class="pun">,</span>
      <span class="str">'Agile'</span>
    <span class="pun">]</span>
  <span class="pun">},</span>
  <span class="pun">{</span>
    <span class="prp">role</span><span class="pun">:</span>    <span class="str">'Associate Software Engineer'</span><span class="pun">,</span>
    <span class="prp">company</span><span class="pun">:</span> <span class="str">'Flair Labs · Full-time'</span><span class="pun">,</span>
    <span class="prp">period</span><span class="pun">:</span>  <span class="str">'Nov 2022 - May 2024 (1 yr 7 mos)'</span><span class="pun">,</span>
    <span class="prp">location</span><span class="pun">:</span> <span class="str">'Mumbai, India'</span><span class="pun">,</span>
    <span class="prp">summary</span><span class="pun">:</span> <span class="str">\`Contributed to full-stack feature development and UI implementation across multiple<br/>product lines. Gained hands-on experience with Angular, including component lifecycle and<br/>state management. Developed a strong understanding of UI responsiveness and the broader<br/>MEAN stack while collaborating closely with senior engineers in a fast-paced product<br/>environment.\`</span><span class="pun">,</span>
    <span class="prp">tags</span><span class="pun">:</span>    <span class="pun">[</span>
      <span class="str">'Elixir'</span><span class="pun">,</span>
      <span class="str">'Angular CLI'</span><span class="pun">,</span>
      <span class="str">'TypeScript'</span><span class="pun">,</span>
      <span class="str">'AngularJS'</span><span class="pun">,</span>
      <span class="str">'REST APIs'</span><span class="pun">,</span>
      <span class="str">'Spring Boot'</span>
    <span class="pun">]</span>
  <span class="pun">},</span>
  <span class="pun">{</span>
    <span class="prp">role</span><span class="pun">:</span>    <span class="str">'Software Engineer Intern'</span><span class="pun">,</span>
    <span class="prp">company</span><span class="pun">:</span> <span class="str">'Flair Labs · Internship'</span><span class="pun">,</span>
    <span class="prp">period</span><span class="pun">:</span>  <span class="str">'Aug 2022 - Nov 2022 (4 mos)'</span><span class="pun">,</span>
    <span class="prp">location</span><span class="pun">:</span> <span class="str">'Mumbai, India'</span><span class="pun">,</span>
    <span class="prp">summary</span><span class="pun">:</span> <span class="str">\`Kickstarted my professional journey at Flair Labs, contributing to<br/>frontend / backend development tasks and learning production-level engineering<br/>practices. Rapidly onboarded onto the Elixir ecosystem and delivered<br/>features alongside the core team.\`</span><span class="pun">,</span>
    <span class="prp">tags</span><span class="pun">:</span>    <span class="pun">[</span>
      <span class="str">'Software Development Life Cycle'</span><span class="pun">,</span>
      <span class="str">'Elixir'</span><span class="pun">,</span>
      <span class="str">'Spring Boot'</span><span class="pun">,</span>
      <span class="str">'Phoenix Framework'</span>
    <span class="pun">]</span>
  <span class="pun">},</span>
  <span class="pun">{</span>
    <span class="prp">role</span><span class="pun">:</span>    <span class="str">'Web Development Intern'</span><span class="pun">,</span>
    <span class="prp">company</span><span class="pun">:</span> <span class="str">'Cloud Counselage Pvt. Ltd. · Internship'</span><span class="pun">,</span>
    <span class="prp">period</span><span class="pun">:</span>  <span class="str">'Mar 2020 - Jul 2020 (5 mos)'</span><span class="pun">,</span>
    <span class="prp">location</span><span class="pun">:</span> <span class="str">'Mumbai, India'</span><span class="pun">,</span>
    <span class="prp">summary</span><span class="pun">:</span> <span class="str">\`Built and maintained web application features during an early internship, gaining<br/>hands-on experience in full-stack development.<br/><br/>Implemented backend integrations using Node.js to support application functionality.<br/><br/>Designed and developed a chatbot system that answered user queries about the company's &amp; their application and functioned as an automated FAQ assistant.\`</span><span class="pun">,</span>
    <span class="prp">tags</span><span class="pun">:</span>    <span class="pun">[</span>
      <span class="str">'HTML / CSS'</span><span class="pun">,</span>
      <span class="str">'Node.JS'</span><span class="pun">,</span>
      <span class="str">'JavaScript'</span><span class="pun">,</span>
      <span class="str">'Web Development'</span>
    <span class="pun">]</span>
  <span class="pun">}</span>
<span class="pun">];</span>

<span class="dec">@Component</span><span class="pun">({</span>
  <span class="prp">selector</span><span class="pun">:</span>        <span class="str">'app-experience'</span><span class="pun">,</span>
  <span class="prp">standalone</span><span class="pun">:</span>      <span class="kw">true</span><span class="pun">,</span>
  <span class="prp">templateUrl</span><span class="pun">:</span>     <span class="str">'./experience.component.html'</span><span class="pun">,</span>
  <span class="prp">styleUrl</span><span class="pun">:</span>        <span class="str">'./experience.component.scss'</span><span class="pun">,</span>
  <span class="prp">changeDetection</span><span class="pun">:</span> <span class="fn">ChangeDetectionStrategy</span><span class="pun">.</span><span class="prp">OnPush</span><span class="pun">,</span>
<span class="pun">})</span>
<span class="kw">export class</span> <span class="cls">ExperienceComponent</span> <span class="pun">{</span>
  <span class="kw">protected readonly</span> <span class="prp">timeline</span><span class="pun">:</span> <span class="cls">ExperienceEntry</span><span class="pun">[]</span> <span class="op">=</span> <span class="prp">EXPERIENCE_TIMELINE</span><span class="pun">;</span>
<span class="pun">}</span>
<span class="cblink"></span>`,
  //   projects: `<span class="cmt">// projects.component.ts — what I've shipped</span>
  // <span class="kw">import</span> <span class="pun">{</span> <span class="fn">Component</span><span class="pun">,</span> <span class="fn">signal</span> <span class="pun">}</span> <span class="kw">from</span> <span class="str">'@angular/core'</span><span class="pun">;</span>

  // <span class="kw">interface</span> <span class="cls">Project</span> <span class="pun">{</span>
  // <span class="prp">name</span><span class="pun">:</span>   <span class="typ">string</span><span class="pun">;</span>
  // <span class="prp">desc</span><span class="pun">:</span>   <span class="typ">string</span><span class="pun">;</span>
  // <span class="prp">stack</span><span class="pun">:</span>  <span class="typ">string</span><span class="pun">[];</span>
  // <span class="prp">status</span><span class="pun">:</span> <span class="str">'live'</span> <span class="op">|</span> <span class="str">'wip'</span> <span class="op">|</span> <span class="str">'archived'</span><span class="pun">;</span>
  // <span class="pun">}</span>

  // <span class="dec">@Component</span><span class="pun">({</span> <span class="prp">selector</span><span class="pun">:</span> <span class="str">'app-projects'</span><span class="pun">,</span> <span class="prp">standalone</span><span class="pun">:</span> <span class="kw">true</span> <span class="pun">})</span>
  // <span class="kw">export class</span> <span class="cls">ProjectsComponent</span> <span class="pun">{</span>

  // <span class="prp">selected</span> <span class="op">=</span> <span class="fn">signal</span><span class="pun">&lt;</span><span class="typ">number</span><span class="pun">&gt;(</span><span class="num">0</span><span class="pun">);</span>

  // <span class="prp">projects</span><span class="pun">:</span> <span class="cls">Project</span><span class="pun">[]</span> <span class="op">=</span> <span class="pun">[</span>
  // <span class="pun">{</span>
  // <span class="prp">name</span><span class="pun">:</span>   <span class="str">'Flair Labs Hackathon App'</span><span class="pun">,</span>
  // <span class="prp">desc</span><span class="pun">:</span>   <span class="str">'Award-winning app — 48 hr sprint'</span><span class="pun">,</span>
  // <span class="prp">stack</span><span class="pun">:</span>  <span class="pun">[</span><span class="str">'React'</span><span class="pun">,</span><span class="str">'Node.js'</span><span class="pun">,</span><span class="str">'Firebase'</span><span class="pun">],</span>
  // <span class="prp">status</span><span class="pun">:</span> <span class="str">'live'</span><span class="pun">,</span>
  // <span class="pun">},</span>
  // <span class="pun">{</span>
  // <span class="prp">name</span><span class="pun">:</span>   <span class="str">'Angular Component Library'</span><span class="pun">,</span>
  // <span class="prp">desc</span><span class="pun">:</span>   <span class="str">'Accessible reusable UI — Angular 17'</span><span class="pun">,</span>
  // <span class="prp">stack</span><span class="pun">:</span>  <span class="pun">[</span><span class="str">'Angular'</span><span class="pun">,</span><span class="str">'TypeScript'</span><span class="pun">,</span><span class="str">'SCSS'</span><span class="pun">],</span>
  // <span class="prp">status</span><span class="pun">:</span> <span class="str">'wip'</span><span class="pun">,</span>
  // <span class="pun">},</span>
  // <span class="pun">{</span>
  // <span class="prp">name</span><span class="pun">:</span>   <span class="str">'MEAN Stack Dashboard'</span><span class="pun">,</span>
  // <span class="prp">desc</span><span class="pun">:</span>   <span class="str">'Analytics + Grafana integration'</span><span class="pun">,</span>
  // <span class="prp">stack</span><span class="pun">:</span>  <span class="pun">[</span><span class="str">'Angular'</span><span class="pun">,</span><span class="str">'Node.js'</span><span class="pun">,</span><span class="str">'MongoDB'</span><span class="pun">,</span><span class="str">'Grafana'</span><span class="pun">],</span>
  // <span class="prp">status</span><span class="pun">:</span> <span class="str">'live'</span><span class="pun">,</span>
  // <span class="pun">},</span>
  // <span class="pun">];</span>
  // <span class="pun">}</span>
  // <span class="cblink"></span>`,
  contact: `<span class="cmt">// contact.component.ts — Angular-style contact section (no raw email)</span>
<span class="kw">import</span> <span class="pun">{</span>
  <span class="fn">Component</span><span class="pun">,</span>
  <span class="fn">ChangeDetectionStrategy</span>
<span class="pun">}</span> <span class="kw">from</span> <span class="str">'@angular/core'</span><span class="pun">;</span>

<span class="kw">type</span> <span class="cls">ContactLink</span> <span class="op">=</span> <span class="pun">{</span>
  <span class="prp">label</span><span class="pun">:</span> <span class="typ">string</span><span class="pun">;</span>
  <span class="prp">href</span><span class="pun">:</span>  <span class="typ">string</span><span class="pun">;</span>
<span class="pun">};</span>

<span class="kw">const</span> <span class="prp">CONTACT_HEADLINE</span> <span class="op">=</span> <span class="str">"Let's build something great."</span><span class="pun">;</span>

<span class="kw">const</span> <span class="prp">CONTACT_BODY</span> <span class="op">=</span> <span class="str">'Open to full-time opportunities, freelance projects, and interesting collaborations.<br/>Let\'s talk about how I can help bring your ideas to life.'</span><span class="pun">;</span>

<span class="kw">const</span> <span class="prp">CONTACT_LINKS</span><span class="pun">:</span> <span class="cls">ContactLink</span><span class="pun">[]</span> <span class="op">=</span> <span class="pun">[</span>
  <span class="pun">{</span>
    <span class="prp">label</span><span class="pun">:</span> <span class="str">'LinkedIn'</span><span class="pun">,</span>
    <span class="prp">href</span><span class="pun">:</span>  <span class="str">'https://www.linkedin.com/in/chandani-mourya-dev/'</span>
  <span class="pun">},</span>
  <span class="pun">{</span>
    <span class="prp">label</span><span class="pun">:</span> <span class="str">'GitHub'</span><span class="pun">,</span>
    <span class="prp">href</span><span class="pun">:</span>  <span class="str">'https://github.com/ChandaniM'</span>
  <span class="pun">}</span>
<span class="pun">];</span>

<span class="dec">@Component</span><span class="pun">({</span>
  <span class="prp">selector</span><span class="pun">:</span>        <span class="str">'app-contact'</span><span class="pun">,</span>
  <span class="prp">standalone</span><span class="pun">:</span>      <span class="kw">true</span><span class="pun">,</span>
  <span class="prp">templateUrl</span><span class="pun">:</span>     <span class="str">'./contact.component.html'</span><span class="pun">,</span>
  <span class="prp">styleUrl</span><span class="pun">:</span>        <span class="str">'./contact.component.scss'</span><span class="pun">,</span>
  <span class="prp">changeDetection</span><span class="pun">:</span> <span class="fn">ChangeDetectionStrategy</span><span class="pun">.</span><span class="prp">OnPush</span><span class="pun">,</span>
<span class="pun">})</span>
<span class="kw">export class</span> <span class="cls">ContactComponent</span> <span class="pun">{</span>
  <span class="cmt">// Static portfolio copy — easy to scan and edit in one place</span>
  <span class="kw">protected readonly</span> <span class="prp">headline</span> <span class="op">=</span> <span class="prp">CONTACT_HEADLINE</span><span class="pun">;</span>
  <span class="kw">protected readonly</span> <span class="prp">body</span>     <span class="op">=</span> <span class="prp">CONTACT_BODY</span><span class="pun">;</span>

  <span class="cmt">// Public links only — email stays in Recruiter view mail link</span>
  <span class="kw">protected readonly</span> <span class="prp">links</span><span class="pun">:</span> <span class="cls">ContactLink</span><span class="pun">[]</span> <span class="op">=</span> <span class="prp">CONTACT_LINKS</span><span class="pun">;</span>
<span class="pun">}</span>
<span class="cblink"></span>`,
  readme: `<span class="cmt"># Chandani Mourya — Software Engineer · Frontend Developer</span>

<span class="str">## Who I am</span>
Hey <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-icon"><path d="M8 13V4a2 2 0 1 1 4 0v6"/><path d="M12 5a2 2 0 1 1 4 0v6"/><path d="M16 7a2 2 0 1 1 4 0v5a7 7 0 0 1-7 7h-1.5a6.5 6.5 0 0 1-6.41-5.18L4 11"/><path d="M4 8a2 2 0 0 1 4 0v5"/></svg> I'm Chandani — <span class="kw">Software Engineer · Frontend Developer</span> (Angular · React · Node.js) at <span class="kw">Flair Labs</span>, <span class="kw">Mumbai, India</span>.  
<span class="kw">Open to Remote | Hybrid | On-site</span> · <span class="kw">Actively looking</span>.

Focused on building high-scale, responsive web applications using Angular and React.
I leverage System Design principles to create modular UI components and efficient data-fetching strategies that reduce latency and improve developer velocity.

I'm a Software Engineer with experience in designing, testing, and delivering scalable front-end solutions within Agile environments. 
I specialize in building modular UI using Angular, with strong focus on performance, responsive design, and UX optimization, while consistently following industry best practices.

My expertise spans the full MEAN stack (MongoDB, Express.js, Angular, and Node.js) along with hands-on experience in React and modern frontend tooling.

<span class="str">## Experience</span>
<span class="cmt">// Same timeline as Recruiter view</span>

<span class="kw">Software Engineer</span> — Flair Labs · Full-time · Mumbai, India · <span class="num">May 2024 – Present</span>  
Designed, developed, and delivered scalable front-end solutions within Agile environments, focusing on modular and maintainable Angular-based UI architectures. Built responsive and performance-optimized interfaces with a strong emphasis on user experience. Contributed to full-stack feature development across multiple product lines, leveraging Angular component lifecycle and state management while working within the broader MEAN stack. Collaborated closely with cross-functional teams and senior engineers to deliver high-quality features in a fast-paced product environment.

<span class="kw">Associate Software Engineer</span> — Flair Labs · Full-time · Mumbai, India · <span class="num">Nov 2022 – May 2024</span>  
Contributed to full-stack feature development and UI implementation across multiple product lines. Gained hands-on experience with Angular, including component lifecycle and state management. Developed a strong understanding of UI responsiveness and the broader MEAN stack while collaborating closely with senior engineers in a fast-paced product environment.

<span class="kw">Software Engineer Intern</span> — Flair Labs · Internship · Mumbai, India · <span class="num">Aug 2022 – Nov 2022</span>  
Kickstarted my professional journey at Flair Labs, contributing to frontend / backend development tasks and learning production-level engineering practices. Rapidly onboarded onto the Elixir ecosystem and delivered features alongside the core team.

<span class="kw">Web Development Intern</span> — Cloud Counselage Pvt. Ltd. · Internship · Mumbai, India · <span class="num">Mar 2020 – Jul 2020</span>  
Built and maintained web application features during an early internship, gaining hands-on experience in full-stack development. Implemented backend integrations using Node.js to support application functionality. Designed and developed a chatbot system that answered user queries about the company's &amp; their application and functioned as an automated FAQ assistant.

<span class="str">## Education</span>
<span class="kw">B.E. Information Technology</span> — Saraswati College of Engineering, Kharghar · <span class="num">2019 – 2022</span> · CGPA <span class="num">8.66</span>

<span class="kw">Diploma in Information Technology</span> — Vidyalankar Polytechnic · <span class="num">2016 – 2019</span> · <span class="num">84.04%</span>

<span class="kw">Maharashtra State Board</span> — Shri Sanatan Dharam High School &amp; Junior College · <span class="num">2016</span>

<span class="str">## Hackathon</span>
<span class="kw">Hackathon Winner</span> — Flair Labs Hackathon 2023 · Team Clippers  
Contributed as the Front-End Developer for Team Clippers, delivering an award-winning solution under tight deadlines. Built production-ready user interfaces rapidly while maintaining high standards for code quality, performance, and user experience. Developed and enhanced data-driven dashboards by integrating query-based datasets with Grafana visualizations. Enabled real-time monitoring and actionable insights through well-structured dashboard design and optimized data presentation.

<span class="str">## Skills &amp; Stack</span>
<span class="cmt">// Mirrors <span class="kw">skills.component.ts</span> / Recruiter Skills section</span>
Frontend, Backend, Databases, Cloud, Tools &amp; DevOps, Monitoring, Testing, No-Code — see open tabs.

<span class="str">## Navigating This Portfolio</span>
<span class="cmt">// <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lightbulb-icon lucide-lightbulb"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>Tips to explore this workspace</span>

  Press <span class="kw">Ctrl+P</span> (or <span class="kw">Cmd+P</span> on Mac) → Open Command Palette  
  Switch between <span class="kw">About</span> / <span class="kw">Skills</span> / <span class="kw">Experience</span> / <span class="kw">Contact</span> instantly  
  Toggle <span class="kw">Recruiter Mode</span> ↔ <span class="kw">Dev Mode</span> from the side bar  
  Switch <span class="kw">Light</span> ↔ <span class="kw">Dark</span> theme from the toggle  

<span class="str flex-center">## Folder Structure</span>
src/
├── About/
├── Skills/
├── Experience/
└── Contact/
├── README.md

<span class="str">## Contact</span>
Let's build something great. Open to full-time opportunities, freelance projects, and interesting collaborations. Let's talk about how I can help bring your ideas to life.

<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:middle;margin-right:4px"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> <span class="str">linkedin.com/in/chandani-mourya-dev</span>  
<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:middle;margin-right:4px"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> <span class="str">github.com/ChandaniM</span>    

<span class="cmt">// Thanks for exploring the workspace — feel free to reach out to me from contact page inside recruiter mode.!</span>
<span class="cblink"></span>`,
  //   readme: `<span class="cmt"># Chandani Mourya — Frontend Engineer</span>

  // <span class="str">## Live Demo</span>
  // <span class="kw">https://chandanimourya.web.app</span>

  // <span class="str">## Overview</span>
  // Angular · React · TypeScript · MEAN Stack Developer
  // 3+ years building scalable, performant web applications.

  // <span class="str">## Dev Mode Tip</span>
  // <span class="cmt">> Press Ctrl + P (or Cmd + P on Mac) to open the</span>
  // <span class="cmt">> Command Palette — switch files</span>
  // <br/>
  // <span class="cmt">> You can Toggle themes accordingly  and navigate sections instantly. Switch in both </span>
  // Switch modes → Recruiter / Dev
  // Toggle theme → Light / Dark

  // <span class="str">## Features</span>
  // - Dual mode — Recruiter &amp; VS Code Dev view
  // - Light &amp; Dark theme toggle
  // - Command Palette — Ctrl+P / Cmd+P
  // - SSR enabled — fast load + SEO ready
  // - Angular 21 Signals for state management
  // - Fully responsive on all screen sizes

  // <span class="str">## Tech Stack</span>
  // Frontend  → Angular, React, TypeScript, SCSS, RxJS
  // Backend   → Node.js, Express.js, MongoDB, MySQL
  // Cloud     → Firebase, AWS S3, AWS EC2
  // DevOps    → Docker, Git, Grafana
  // Testing   → Jest, Jasmine, Vitest, React Testing Library
  // Tools     → VS Code, Postman, M-files, FlutterFlow

  // <span class="str">## 📂 Folder Structure for dev mode</span>
  // src/
  // ├──src/
  // |   ├── About/
  // |   ├── Skills/
  // |   ├── Experience/
  // |   └── Contact/
  // ├── README.md

  // <span class="str">## 🏆 Highlights</span>
  // • 🥇 Winner — Flair Labs Hackathon 2023
  // • 📈 Improved Lighthouse scores by 40%
  // • 🧩 Built modular Angular component libraries
  // • ⚡ Production-ready apps under tight deadlines

  // <span class="str">## 🧠 Philosophy</span>
  // - Clean architecture over quick hacks
  // - Reusable component-driven systems
  // - Performance-first mindset
  // - Developer experience matters

  // <span class="str">## 📬 Contact</span>
  // 📧 <span class="str">chandanimourya5@gmail.com</span>
  // 💼 <span class="str">linkedin.com/in/chandani-mourya-dev</span>
  // 🐙 <span class="str">github.com/ChandaniM</span>

  // <span class="cmt">// Thanks for exploring the workspace 👋</span>
  // <span class="cblink"></span>`,
};

// PANELS
const devPanels = {
  terminal: `
<div class="tl"><span class="tp">➜</span><span class="tpa"> ~/portfolio</span><span class="tc"> git status</span></div>
<div class="tl"><span class="ts">On branch main — nothing to commit, working tree clean ✓</span></div>
<div class="tl" style="margin-top:4px"><span class="tp">➜</span><span class="tpa"> ~/portfolio</span><span class="tc"> ng build --configuration production</span></div>
<div class="tl"><span class="ti">✔ Building Angular application...</span></div>
<div class="tl"><span class="ts">✔ Build complete — dist/portfolio (248 KB gzipped)</span></div>
<div class="tl" style="margin-top:4px"><span class="tp">➜</span><span class="tpa"> ~/portfolio</span><span class="tc"> firebase deploy</span></div>
<div class="tl"><span class="ts">✔ Deploy complete! 🎉  https://devportfolio.web.app</span></div>
<div class="tl" style="margin-top:4px"><span class="tp">➜</span><span class="tpa"> ~/portfolio</span><span class="tc"> <span class="cblink" style="margin-left:0"></span></span></div>`,
  problems: `<div class="tl"><span class="ts">✔ No problems detected in workspace</span></div><div class="tl" style="margin-top:5px"><span class="ti">TypeScript strict · ESLint: 0 errors · Prettier: formatted</span></div>`,
  output: `<div class="tl"><span class="ti">Angular CLI · http://localhost:4200/ · Watching for changes...</span></div><div class="tl"><span class="tw">Tip: Press Ctrl+P to open Command Palette</span></div>`,
};

// CMD PALETTE
const cpCmds = [
  {
    ic: "TS",
    lb: "about.component.ts",
    kb: "",
    fn: () => devTab("about"),
  },
  {
    ic: "TS",
    lb: "skills.component.ts",
    kb: "",
    fn: () => devTab("skills"),
  },
  {
    ic: "TS",
    lb: "experience.component.ts",
    kb: "",
    fn: () => devTab("experience"),
  },
  {
    ic: "TS",
    lb: "contact.component.ts",
    kb: "",
    fn: () => devTab("contact"),
  },
  { ic: "MD", lb: "README.md", kb: "", fn: () => devTab("readme") },
  {
    ic: "RM",
    lb: "Switch to Recruiter Mode",
    kb: "⌘⇧R",
    fn: () => {
      if (currentMode === "dev") toggleMode();
      closeCp();
    },
  },
  { ic: "LT", lb: "Light Theme", kb: "", fn: () => setTheme("light") },
  { ic: "DT", lb: "Dark Theme", kb: "", fn: () => setTheme("dark") },
  {
    ic: "@",
    lb: "Copy Email",
    kb: "",
    fn: () => {
      const email = "chandani.mourya.dev@gmail.com";

      copyToClipboard(email)
        .then(() => notify("email", "Copied!"))
        .catch(() => notify("error", "Failed", "Could not copy"));
    },
  },
  // {
  //   ic: "HK",
  //   lb: "Hackathon Achievement",
  //   kb: "",
  //   fn: () => notify("trophy", "Winner!", "Flair Labs 2023 — Team Clippers"),
  // },
];

function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    return new Promise((resolve, reject) => {
      try {
        document.execCommand("copy");
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }
}

const tabNames = {
  about: "about.component.ts",
  skills: "skills.component.ts",
  experience: "experience.component.ts",
  // projects: "projects.component.ts",
  contact: "contact.component.ts",
  readme: "README.md",
};

function devTab(tab) {
  document
    .querySelectorAll(".vsc-tab")
    .forEach((t) => t.classList.toggle("active", t.dataset.tab === tab));
  document.querySelectorAll(".vsc-file").forEach((f) => {
    f.classList.toggle(
      "active",
      f.textContent.trim().startsWith(tabNames[tab]?.split(".")[0]) ||
        (tab === "readme" && f.textContent.includes("README"))
    );
  });
  document.getElementById("devBread").textContent = tabNames[tab] || tab;
  renderDevCode(tab);
}

function renderDevCode(tab) {
  const html = devFiles[tab] || devFiles.about;
  const lines = html.split("\n");
  let ln = "";
  lines.forEach((_, i) => (ln += `<span>${i + 1}</span>`));
  document.getElementById("devLnum").innerHTML = ln;
  document.getElementById("devCode").innerHTML = lines
    .map(
      (l) =>
        `<div class="vsc-line"><span class="vsc-line-c">${
          l || " "
        }</span></div>`
    )
    .join("");
  document.getElementById(
    "devStatusCur"
  ).textContent = `Ln ${lines.length}, Col 1`;
  const mm = [
    "l a",
    "m",
    "s",
    "l",
    "m b",
    "l",
    "s",
    "m",
    "l a",
    "m",
    "s b",
    "l",
    "m",
    "s",
    "l",
    "m",
    "l a",
    "s",
    "m",
    "l g",
    "s",
    "m",
    "l",
    "s",
  ];
  document.getElementById("devMinimap").innerHTML =
    '<div class="vsc-mm-vp"></div>' +
    mm.map((c) => `<div class="vsc-mm-l ${c}"></div>`).join("");
}

function switchPanel(name, el) {
  document
    .querySelectorAll(".vsc-ptab")
    .forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("devPanel").innerHTML = devPanels[name] || "";
}

document.getElementById("devCode").addEventListener("click", (e) => {
  const line = e.target.closest(".vsc-line");
  if (!line) return;
  document
    .querySelectorAll(".vsc-line")
    .forEach((l) => l.classList.remove("hl"));
  line.classList.add("hl");
  const idx = [...line.parentElement.children].indexOf(line) + 1;
  document.getElementById("devStatusCur").textContent = `Ln ${idx}, Col 1`;
});

// CMD PALETTE
let cpOpen = false,
  cpSel = 0;
function openCmd() {
  if (currentMode !== "dev") return;
  cpOpen = true;
  cpSel = 0;
  document.getElementById("cmdPalette").classList.add("open");
  document.getElementById("cpIn").value = "";
  renderCp("");
  setTimeout(() => document.getElementById("cpIn").focus(), 40);
}
function closeCp() {
  cpOpen = false;
  document.getElementById("cmdPalette").classList.remove("open");
}
function renderCp(q) {
  const filt = cpCmds.filter((c) =>
    c.lb.toLowerCase().includes(q.toLowerCase())
  );
  let h = '<div class="cp-sec">Commands & Files</div>';
  filt.forEach((c, i) => {
    const lbl = q
      ? c.lb.replace(new RegExp(q, "gi"), (m) => `<em>${m}</em>`)
      : c.lb;
    h += `<div class="cp-it ${
      i === cpSel ? "sel" : ""
    }" onclick="runCp(${cpCmds.indexOf(c)})"><span class="cp-it-ic">${
      c.ic
    }</span><span class="cp-it-lb">${lbl}</span>${
      c.kb ? `<span class="cp-it-kb">${c.kb}</span>` : ""
    }</div>`;
  });
  document.getElementById("cpRes").innerHTML = h;
}
function runCp(i) {
  cpCmds[i]?.fn();
  closeCp();
}
document.getElementById("cpIn").addEventListener("input", (e) => {
  cpSel = 0;
  renderCp(e.target.value);
});
document.getElementById("cpIn").addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCp();
  if (e.key === "Enter") {
    const its = document.querySelectorAll(".cp-it");
    if (its[cpSel]) its[cpSel].click();
  }
  if (e.key === "ArrowDown") {
    cpSel = Math.min(cpSel + 1, cpCmds.length - 1);
    renderCp(document.getElementById("cpIn").value);
  }
  if (e.key === "ArrowUp") {
    cpSel = Math.max(cpSel - 1, 0);
    renderCp(document.getElementById("cpIn").value);
  }
});
document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "p") {
    e.preventDefault();
    openCmd();
  }
  if (e.key === "Escape" && cpOpen) closeCp();
});
document.addEventListener("click", (e) => {
  if (cpOpen && !e.target.closest(".cmd-palette")) closeCp();
});

// NOTIFICATIONS
function notify(kind, tt, bd) {
  const iconMap = {
    welcome:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-icon"><path d="M8 13V4a2 2 0 1 1 4 0v6"/><path d="M12 5a2 2 0 1 1 4 0v6"/><path d="M16 7a2 2 0 1 1 4 0v5a7 7 0 0 1-7 7h-1.5a6.5 6.5 0 0 1-6.41-5.18L4 11"/><path d="M4 8a2 2 0 0 1 4 0v5"/></svg>',
    dev: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-laptop-icon lucide-laptop"><path d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"/><path d="M20.054 15.987H3.946"/></svg>',
    recruiter:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h1.5" /><path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>',
    email:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-icon"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>',
    trophy:
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy-icon"><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v6a5 5 0 0 1-10 0z"/><path d="M5 9a2 2 0 0 1-2-2V5h4"/><path d="M19 9a2 2 0 0 0 2-2V5h-4"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  };
  const iconSvg = iconMap[kind] || iconMap.info;
  document.getElementById("nIco").innerHTML = iconSvg;
  document.getElementById("nTt").textContent = tt;
  document.getElementById("nBd").textContent = bd;
  const n = document.getElementById("notif");
  n.classList.add("show");
  setTimeout(() => n.classList.remove("show"), 5000);
}
function closeNotif() {
  document.getElementById("notif").classList.remove("show");
}

// SCROLL REVEAL
const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
);

const progObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("animated");
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));
document.querySelectorAll(".r-prog-bar").forEach((b) => progObs.observe(b));

// ACTIVE NAV on scroll
const rSections = document.querySelectorAll(".layer-recruiter section[id]");
const rNavLinks = document.querySelectorAll(".r-nav-links a");
document.getElementById("layerRec").addEventListener("scroll", () => {
  let cur = "";
  rSections.forEach((s) => {
    if (document.getElementById("layerRec").scrollTop >= s.offsetTop - 120)
      cur = s.id;
  });
  rNavLinks.forEach((a) => {
    a.style.color = a.getAttribute("href") === "#" + cur ? "var(--accent)" : "";
  });
});

function calculateExperience(dateString, format = "short") {
  const from = new Date(dateString);
  const now = new Date();

  let years = now.getFullYear() - from.getFullYear();
  let months = now.getMonth() - from.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }
  console.log(years, months);

  const decimal = parseFloat(`${years}.${months}`);

  switch (format) {
    case "full":
      return `${years} years and ${months} months`;

    case "decimal":
      return decimal;

    case "decimalPlus":
      return decimal + "+";

    case "short":
      return `${years}yr ${months}mon`;

    default:
      return `${years}yr ${months}mon`;
  }
}

const skillCategories = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-icon lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
    name: "Frontend",
    chips: [
      "Angular",
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "SCSS",
      "LESS",
      "Bootstrap",
      "Tailwind CSS / CSS Modules",
      "Responsive Design",
      "RxJS",
      "NgRx",
      "Web Performance",
      "Core Web Vitals",
      "Storybook",
      "Flutter",
    ],
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-device-desktop-code"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.5 16h-8.5a1 1 0 0 1 -1 -1v-10a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v8" /><path d="M7 20h4" /><path d="M9 16v4" /><path d="M20 21l2 -2l-2 -2" /><path d="M17 17l-2 2l2 2" /></svg>`,
    name: "Backend",
    chips: [
      "Node.JS",
      "Express.JS",
      "TypeScript",
      "REST APIs",
      "API Integration",
      "JWT Auth",
    ],
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-database-icon lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>`,
    name: "Databases",
    chips: ["MySQL", "MongoDB"],
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cloud-icon lucide-cloud"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    name: "Cloud",
    chips: ["Firebase", "AWS S3", "AWS EC2"],
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wrench-icon lucide-wrench"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/></svg>`,
    name: "Tools & DevOps",
    chips: ["Docker", "Git", "M-files"],
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chart-area-icon lucide-chart-area"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z"/></svg>`,
    name: "Monitoring",
    chips: ["Grafana"],
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-test-tube-diagonal-icon lucide-test-tube-diagonal"><path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3"/><path d="m16 2 6 6"/><path d="M12 16H4"/></svg>`,
    name: "Testing",
    chips: ["Jest", "Jasmine", "Vitest", "React Testing Library"],
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-monitor-icon lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
    name: "No-Code",
    chips: ["FlutterFlow"],
  },
];

const grid = document.getElementById("skillsGrid");

skillCategories.forEach((category, index) => {
  // Card
  const card = document.createElement("div");
  card.className = "r-skill-cat";
  card.style.animationDelay = `${index * 80}ms`;

  // Icon
  const icon = document.createElement("span");
  icon.className = "r-skill-ico";
  icon.innerHTML = category.icon;

  // Category name
  const name = document.createElement("div");
  name.className = "r-skill-cat-name";
  name.textContent = category.name;

  // Chip list
  const chipList = document.createElement("div");
  chipList.className = "r-chip-list";

  category.chips.forEach((label) => {
    const chip = document.createElement("span");
    chip.className = "r-chip";
    chip.textContent = label;
    chipList.appendChild(chip);
  });

  card.appendChild(icon);
  card.appendChild(name);
  card.appendChild(chipList);
  grid.appendChild(card);
});

// ══════════════════════════════════════
//  CONTACT FORM (template log + EmailJS)
// ══════════════════════════════════════
function getContactIntentLabel() {
  const sel = document.getElementById("cf-intent");
  if (!sel) return "";
  const opt = sel.options[sel.selectedIndex];
  const label = opt?.text?.trim() || "";
  return label || sel.value || "";
}
function buildContactInquiryEmail(v) {
  const submitted = new Date().toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const phoneDisplay = v.phone ? v.phone : "Not Provided";
  const messageDisplay = v.message || "(No message provided)";

  return `Hello Chandani,

You have received a new inquiry from your portfolio website. The details are below:

──────────────────────────────
CONTACT INFORMATION
──────────────────────────────
Name: ${v.name}
Email: ${v.email}
Phone: ${phoneDisplay}

──────────────────────────────
INQUIRY DETAILS
──────────────────────────────
Intent: ${v.intentLabel}

Message:
${messageDisplay}

──────────────────────────────
SUBMISSION DETAILS
──────────────────────────────
Submitted: ${submitted}
Source: Portfolio Website
──────────────────────────────

You can reply directly to this email to respond to the sender.

Regards,
Your Portfolio System`;
}

function setContactSubmitBusy(busy) {
  const btn = document.getElementById("cf-submit");
  const txt = document.getElementById("cf-submit-txt");
  const ico = document.getElementById("cf-submit-ico");
  const spin = document.getElementById("cf-spinner");
  if (!btn) return;
  btn.disabled = busy;
  if (txt) txt.style.display = busy ? "none" : "";
  if (ico) ico.style.display = busy ? "none" : "";
  if (spin) spin.style.display = busy ? "inline-flex" : "none";
}

function setupContactForm() {
  const form = document.getElementById("r-contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;

    const intentLabel = getContactIntentLabel();
    const formValues = {
      name: document.getElementById("cf-name")?.value?.trim() || "",
      email: document.getElementById("cf-email")?.value?.trim() || "",
      phone: document.getElementById("cf-phone")?.value?.trim() || "",
      intentLabel,
      message: document.getElementById("cf-message")?.value?.trim() || "",
    };

    const subject = `New Inquiry - ${intentLabel} from ${formValues.name}`;
    const body = buildContactInquiryEmail(formValues);

    console.log("[Contact inquiry] Subject:", subject);
    console.log("[Contact inquiry] Email body:\n\n" + body);

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      notify(
        "info",
        "EmailJS not configured",
        "Set EMAILJS_PUBLIC_KEY (from .env), EMAILJS_SERVICE_ID, and EMAILJS_TEMPLATE_ID in script.js, or set window.__EMAILJS_*__ before this script."
      );
      return;
    }

    setContactSubmitBusy(true);
    try {
      initEmailJsIfNeeded();
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          // Use in EmailJS → template "Subject" field: {{subject}} (required for inbox subject line)
          subject,
          title: subject,
          message: body,
          from_name: formValues.name,
          reply_to: formValues.email,
          user_email: formValues.email,
          phone: formValues.phone || "Not Provided",
          intent: formValues.intentLabel,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      notify(
        "email",
        "Message sent",
        "Thanks — your inquiry was delivered. I'll get back to you soon."
      );
      form.reset();
    } catch (err) {
      const detail =
        err?.text ||
        err?.message ||
        (typeof err === "string" ? err : JSON.stringify(err));
      console.error("[EmailJS] send failed:", err);
      notify(
        "info",
        "Send failed",
        detail || "Please try again or email me directly."
      );
    } finally {
      setContactSubmitBusy(false);
    }
  });
}

// ══════════════════════════════════════
//  INIT
// ══════════════════════════════════════
(function init() {
  const totalSkills =
    skillCategories.reduce((t, c) => t + c.chips.length, 0) + "+";
  console.log(totalSkills, "skills");
  document.getElementById("total-skill-count").textContent = totalSkills;
  document.getElementById("total-experience-full-value").textContent =
    calculateExperience("22 August 2022", "full");
  document.getElementById("se-duration").textContent = calculateExperience(
    "2024-06-20",
    "short"
  );
  document.getElementById("total-experience").textContent = calculateExperience(
    "22 August 2022",
    "decimalPlus"
  );
  document.getElementById("total-year-experience").textContent =
    calculateExperience("22 August 2022", "decimalPlus");
  let savedTheme = "dark";
  try {
    const persistedTheme = localStorage.getItem("pf-theme");
    savedTheme = persistedTheme || "dark";
    if (!persistedTheme) {
      localStorage.setItem("pf-theme", "dark");
    }
  } catch (e) {}
  setTheme(savedTheme, { persist: false });
  setupContactForm();
  renderDevCode("about");
  document.getElementById("devPanel").innerHTML = devPanels.terminal;
  setTimeout(
    () =>
      notify(
        "welcome",
        "Welcome!",
        "Use the top-right toggle for theme and the side button to switch Dev/Recruiter mode."
      ),
    120
  );
})();

// ══════════════════════════════════════
//  STATE
// ══════════════════════════════════════
let currentMode = "recruiter";
let currentTheme = "dark";
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
function setTheme(t) {
  currentTheme = t;
  document.documentElement.setAttribute("data-theme", t);
  document
    .getElementById("themeLight")
    .classList.toggle("active", t === "light");
  document.getElementById("themeDark").classList.toggle("active", t === "dark");
  try {
    localStorage.setItem("pf-theme", t);
  } catch (e) {}
}

// ══════════════════════════════════════
//  MODE TOGGLE
// ══════════════════════════════════════
function toggleMode() {
  currentMode = currentMode === "recruiter" ? "dev" : "recruiter";
  document.documentElement.setAttribute("data-mode", currentMode);
  // Icon shows what you'll SWITCH TO
  document.getElementById("modeIco").textContent =
    currentMode === "dev" ? "👔" : "💻";

  if (currentMode === "dev") {
    setTheme("dark");
    notify(
      "💻",
      "Dev Mode Active",
      "VS Code view · Press Ctrl+P for command palette"
    );
  } else {
    notify("👔", "Recruiter Mode", "Cyberpunk portfolio view restored");
    setTimeout(() => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => revealObs.observe(el));
      document
        .querySelectorAll(".r-prog-bar")
        .forEach((b) => progObs.observe(b));
    }, 200);
  }
}

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
  about: `<span class="cmt">// about.component.ts — who I am</span>
<span class="kw">import</span> <span class="pun">{</span> <span class="fn">Component</span><span class="pun">,</span> <span class="fn">OnInit</span> <span class="pun">}</span> <span class="kw">from</span> <span class="str">'@angular/core'</span><span class="pun">;</span>

<span class="dec">@Component</span><span class="pun">({</span>
<span class="prp">selector</span><span class="pun">:</span>    <span class="str">'app-about'</span><span class="pun">,</span>
<span class="prp">standalone</span><span class="pun">:</span>  <span class="kw">true</span><span class="pun">,</span>
<span class="prp">templateUrl</span><span class="pun">:</span> <span class="str">'./about.component.html'</span><span class="pun">,</span>
<span class="pun">})</span>
<span class="kw">export class</span> <span class="cls">AboutComponent</span> <span class="kw">implements</span> <span class="typ">OnInit</span> <span class="pun">{</span>

<span class="kw">readonly</span> <span class="prp">name</span><span class="pun">:</span>        <span class="typ">string</span>  <span class="op">=</span> <span class="str">'Frontend Engineer'</span><span class="pun">;</span>
<span class="kw">readonly</span> <span class="prp">stack</span><span class="pun">:</span>       <span class="typ">string</span>  <span class="op">=</span> <span class="str">'MEAN Stack · React · Angular'</span><span class="pun">;</span>
<span class="kw">readonly</span> <span class="prp">experience</span><span class="pun">:</span>  <span class="typ">string</span>  <span class="op">=</span> <span class="str">'3 years 5 months'</span><span class="pun">;</span>
<span class="kw">readonly</span> <span class="prp">available</span><span class="pun">:</span>   <span class="typ">boolean</span> <span class="op">=</span> <span class="kw">true</span><span class="pun">;</span>
<span class="kw">readonly</span> <span class="prp">location</span><span class="pun">:</span>    <span class="typ">string</span>  <span class="op">=</span> <span class="str">'India 🇮🇳'</span><span class="pun">;</span>

<span class="prp">specializations</span><span class="pun">:</span> <span class="typ">string</span><span class="pun">[]</span> <span class="op">=</span> <span class="pun">[</span>
<span class="str">'Angular Architecture'</span><span class="pun">,</span>    <span class="str">'React Ecosystem'</span><span class="pun">,</span>
<span class="str">'MEAN Stack Development'</span><span class="pun">,</span>  <span class="str">'System Design'</span><span class="pun">,</span>
<span class="str">'Performance Optimization'</span><span class="pun">,</span><span class="str">'Responsive UI Engineering'</span><span class="pun">,</span>
<span class="pun">];</span>

<span class="prp">achievement</span> <span class="op">=</span> <span class="pun">{</span>
<span class="prp">title</span><span class="pun">:</span> <span class="str">'Winner — Flair Labs Hackathon 2023'</span><span class="pun">,</span>
<span class="prp">team</span><span class="pun">:</span>  <span class="str">'Team Clippers'</span><span class="pun">,</span>
<span class="prp">award</span><span class="pun">:</span> <span class="kw">true</span><span class="pun">,</span>
<span class="pun">};</span>

<span class="fn">ngOnInit</span><span class="pun">():</span> <span class="typ">void</span> <span class="pun">{</span>
<span class="fn">console</span><span class="pun">.</span><span class="fn">log</span><span class="pun">(</span><span class="str">'👋 Hey! Open console for easter eggs.'</span><span class="pun">);</span>
<span class="fn">console</span><span class="pun">.</span><span class="fn">log</span><span class="pun">(</span><span class="str">'📧 chandanimourya5@gmail.com'</span><span class="pun">);</span>
<span class="pun">}</span>
<span class="pun">}</span>
<span class="cblink"></span>`,
  skills: `<span class="cmt">// skills.component.ts — the full stack</span>
<span class="kw">import</span> <span class="pun">{</span> <span class="fn">Component</span> <span class="pun">}</span> <span class="kw">from</span> <span class="str">'@angular/core'</span><span class="pun">;</span>

<span class="kw">interface</span> <span class="cls">Skill</span> <span class="pun">{</span>
<span class="prp">name</span><span class="pun">:</span>  <span class="typ">string</span><span class="pun">;</span>
<span class="prp">level</span><span class="pun">:</span> <span class="str">'expert'</span> <span class="op">|</span> <span class="str">'advanced'</span> <span class="op">|</span> <span class="str">'proficient'</span><span class="pun">;</span>
<span class="prp">years</span><span class="pun">:</span> <span class="typ">number</span><span class="pun">;</span>
<span class="pun">}</span>

<span class="dec">@Component</span><span class="pun">({</span> <span class="prp">selector</span><span class="pun">:</span> <span class="str">'app-skills'</span><span class="pun">,</span> <span class="prp">standalone</span><span class="pun">:</span> <span class="kw">true</span> <span class="pun">})</span>
<span class="kw">export class</span> <span class="cls">SkillsComponent</span> <span class="pun">{</span>

<span class="prp">frontend</span><span class="pun">:</span> <span class="cls">Skill</span><span class="pun">[]</span> <span class="op">=</span> <span class="pun">[</span>
<span class="pun">{</span> <span class="prp">name</span><span class="pun">:</span><span class="str">'Angular'</span><span class="pun">,</span>    <span class="prp">level</span><span class="pun">:</span><span class="str">'expert'</span><span class="pun">,</span>     <span class="prp">years</span><span class="pun">:</span><span class="num">3.5</span> <span class="pun">},</span>
<span class="pun">{</span> <span class="prp">name</span><span class="pun">:</span><span class="str">'React'</span><span class="pun">,</span>      <span class="prp">level</span><span class="pun">:</span><span class="str">'advanced'</span><span class="pun">,</span>   <span class="prp">years</span><span class="pun">:</span><span class="num">2</span>   <span class="pun">},</span>
<span class="pun">{</span> <span class="prp">name</span><span class="pun">:</span><span class="str">'TypeScript'</span><span class="pun">,</span> <span class="prp">level</span><span class="pun">:</span><span class="str">'expert'</span><span class="pun">,</span>     <span class="prp">years</span><span class="pun">:</span><span class="num">3</span>   <span class="pun">},</span>
<span class="pun">{</span> <span class="prp">name</span><span class="pun">:</span><span class="str">'SCSS/LESS'</span><span class="pun">,</span>  <span class="prp">level</span><span class="pun">:</span><span class="str">'expert'</span><span class="pun">,</span>     <span class="prp">years</span><span class="pun">:</span><span class="num">3.5</span> <span class="pun">},</span>
<span class="pun">{</span> <span class="prp">name</span><span class="pun">:</span><span class="str">'Bootstrap'</span><span class="pun">,</span>  <span class="prp">level</span><span class="pun">:</span><span class="str">'expert'</span><span class="pun">,</span>     <span class="prp">years</span><span class="pun">:</span><span class="num">3</span>   <span class="pun">},</span>
<span class="pun">];</span>

<span class="prp">backend</span><span class="pun">:</span> <span class="cls">Skill</span><span class="pun">[]</span> <span class="op">=</span> <span class="pun">[</span>
<span class="pun">{</span> <span class="prp">name</span><span class="pun">:</span><span class="str">'Node.JS'</span><span class="pun">,</span>    <span class="prp">level</span><span class="pun">:</span><span class="str">'advanced'</span><span class="pun">,</span>   <span class="prp">years</span><span class="pun">:</span><span class="num">3</span>   <span class="pun">},</span>
<span class="pun">{</span> <span class="prp">name</span><span class="pun">:</span><span class="str">'Express.JS'</span><span class="pun">,</span> <span class="prp">level</span><span class="pun">:</span><span class="str">'advanced'</span><span class="pun">,</span>   <span class="prp">years</span><span class="pun">:</span><span class="num">3</span>   <span class="pun">},</span>
<span class="pun">{</span> <span class="prp">name</span><span class="pun">:</span><span class="str">'MongoDB'</span><span class="pun">,</span>    <span class="prp">level</span><span class="pun">:</span><span class="str">'advanced'</span><span class="pun">,</span>   <span class="prp">years</span><span class="pun">:</span><span class="num">3</span>   <span class="pun">},</span>
<span class="pun">{</span> <span class="prp">name</span><span class="pun">:</span><span class="str">'MySQL'</span><span class="pun">,</span>      <span class="prp">level</span><span class="pun">:</span><span class="str">'proficient'</span><span class="pun">,</span> <span class="prp">years</span><span class="pun">:</span><span class="num">2</span>   <span class="pun">},</span>
<span class="pun">{</span> <span class="prp">name</span><span class="pun">:</span><span class="str">'Firebase'</span><span class="pun">,</span>   <span class="prp">level</span><span class="pun">:</span><span class="str">'advanced'</span><span class="pun">,</span>   <span class="prp">years</span><span class="pun">:</span><span class="num">2</span>   <span class="pun">},</span>
<span class="pun">];</span>

<span class="prp">tools</span><span class="pun">:</span> <span class="typ">string</span><span class="pun">[]</span> <span class="op">=</span> <span class="pun">[</span>
<span class="str">'Docker'</span><span class="pun">,</span> <span class="str">'Git'</span><span class="pun">,</span> <span class="str">'Grafana'</span><span class="pun">,</span>
<span class="str">'FlutterFlow'</span><span class="pun">,</span> <span class="str">'Flutter'</span><span class="pun">,</span> <span class="str">'M-files'</span><span class="pun">,</span>
<span class="pun">];</span>
<span class="pun">}</span>
<span class="cblink"></span>`,
  experience: `<span class="cmt">// experience.component.ts — work history</span>
<span class="kw">import</span> <span class="pun">{</span> <span class="fn">Component</span> <span class="pun">}</span> <span class="kw">from</span> <span class="str">'@angular/core'</span><span class="pun">;</span>

<span class="kw">interface</span> <span class="cls">Job</span> <span class="pun">{</span>
<span class="prp">role</span><span class="pun">:</span>        <span class="typ">string</span><span class="pun">;</span>
<span class="prp">company</span><span class="pun">:</span>    <span class="typ">string</span><span class="pun">;</span>
<span class="prp">period</span><span class="pun">:</span>     <span class="typ">string</span><span class="pun">;</span>
<span class="prp">highlights</span><span class="pun">:</span> <span class="typ">string</span><span class="pun">[];</span>
<span class="prp">award</span><span class="op">?</span><span class="pun">:</span>     <span class="typ">string</span><span class="pun">;</span>
<span class="pun">}</span>

<span class="dec">@Component</span><span class="pun">({</span> <span class="prp">selector</span><span class="pun">:</span> <span class="str">'app-experience'</span><span class="pun">,</span> <span class="prp">standalone</span><span class="pun">:</span> <span class="kw">true</span> <span class="pun">})</span>
<span class="kw">export class</span> <span class="cls">ExperienceComponent</span> <span class="pun">{</span>

<span class="prp">timeline</span><span class="pun">:</span> <span class="cls">Job</span><span class="pun">[]</span> <span class="op">=</span> <span class="pun">[</span>
<span class="pun">{</span>
<span class="prp">role</span><span class="pun">:</span>     <span class="str">'Software Engineer — Frontend'</span><span class="pun">,</span>
<span class="prp">company</span><span class="pun">:</span> <span class="str">'Current Employer'</span><span class="pun">,</span>
<span class="prp">period</span><span class="pun">:</span>  <span class="str">'2021 → Present (3 yrs 5 mos)'</span><span class="pun">,</span>
<span class="prp">highlights</span><span class="pun">:</span> <span class="pun">[</span>
  <span class="str">'Built modular Angular component libraries'</span><span class="pun">,</span>
  <span class="str">'Improved Lighthouse scores by 40%'</span><span class="pun">,</span>
  <span class="str">'Led responsive design system adoption'</span><span class="pun">,</span>
<span class="pun">],</span>
<span class="pun">},</span>
<span class="pun">{</span>
<span class="prp">role</span><span class="pun">:</span>     <span class="str">'Frontend Lead — Team Clippers'</span><span class="pun">,</span>
<span class="prp">company</span><span class="pun">:</span> <span class="str">'Flair Labs Hackathon'</span><span class="pun">,</span>
<span class="prp">period</span><span class="pun">:</span>  <span class="str">'2023 (48 hour sprint)'</span><span class="pun">,</span>
<span class="prp">highlights</span><span class="pun">:</span> <span class="pun">[</span>
  <span class="str">'Sole frontend dev — full UI in 48 hrs'</span><span class="pun">,</span>
  <span class="str">'Production-ready code under pressure'</span><span class="pun">,</span>
<span class="pun">],</span>
<span class="prp">award</span><span class="pun">:</span> <span class="str">'🏆 1st Place Winner'</span><span class="pun">,</span>
<span class="pun">},</span>
<span class="pun">];</span>
<span class="pun">}</span>
<span class="cblink"></span>`,
  projects: `<span class="cmt">// projects.component.ts — what I've shipped</span>
<span class="kw">import</span> <span class="pun">{</span> <span class="fn">Component</span><span class="pun">,</span> <span class="fn">signal</span> <span class="pun">}</span> <span class="kw">from</span> <span class="str">'@angular/core'</span><span class="pun">;</span>

<span class="kw">interface</span> <span class="cls">Project</span> <span class="pun">{</span>
<span class="prp">name</span><span class="pun">:</span>   <span class="typ">string</span><span class="pun">;</span>
<span class="prp">desc</span><span class="pun">:</span>   <span class="typ">string</span><span class="pun">;</span>
<span class="prp">stack</span><span class="pun">:</span>  <span class="typ">string</span><span class="pun">[];</span>
<span class="prp">status</span><span class="pun">:</span> <span class="str">'live'</span> <span class="op">|</span> <span class="str">'wip'</span> <span class="op">|</span> <span class="str">'archived'</span><span class="pun">;</span>
<span class="pun">}</span>

<span class="dec">@Component</span><span class="pun">({</span> <span class="prp">selector</span><span class="pun">:</span> <span class="str">'app-projects'</span><span class="pun">,</span> <span class="prp">standalone</span><span class="pun">:</span> <span class="kw">true</span> <span class="pun">})</span>
<span class="kw">export class</span> <span class="cls">ProjectsComponent</span> <span class="pun">{</span>

<span class="prp">selected</span> <span class="op">=</span> <span class="fn">signal</span><span class="pun">&lt;</span><span class="typ">number</span><span class="pun">&gt;(</span><span class="num">0</span><span class="pun">);</span>

<span class="prp">projects</span><span class="pun">:</span> <span class="cls">Project</span><span class="pun">[]</span> <span class="op">=</span> <span class="pun">[</span>
<span class="pun">{</span>
<span class="prp">name</span><span class="pun">:</span>   <span class="str">'Flair Labs Hackathon App'</span><span class="pun">,</span>
<span class="prp">desc</span><span class="pun">:</span>   <span class="str">'Award-winning app — 48 hr sprint'</span><span class="pun">,</span>
<span class="prp">stack</span><span class="pun">:</span>  <span class="pun">[</span><span class="str">'React'</span><span class="pun">,</span><span class="str">'Node.js'</span><span class="pun">,</span><span class="str">'Firebase'</span><span class="pun">],</span>
<span class="prp">status</span><span class="pun">:</span> <span class="str">'live'</span><span class="pun">,</span>
<span class="pun">},</span>
<span class="pun">{</span>
<span class="prp">name</span><span class="pun">:</span>   <span class="str">'Angular Component Library'</span><span class="pun">,</span>
<span class="prp">desc</span><span class="pun">:</span>   <span class="str">'Accessible reusable UI — Angular 17'</span><span class="pun">,</span>
<span class="prp">stack</span><span class="pun">:</span>  <span class="pun">[</span><span class="str">'Angular'</span><span class="pun">,</span><span class="str">'TypeScript'</span><span class="pun">,</span><span class="str">'SCSS'</span><span class="pun">],</span>
<span class="prp">status</span><span class="pun">:</span> <span class="str">'wip'</span><span class="pun">,</span>
<span class="pun">},</span>
<span class="pun">{</span>
<span class="prp">name</span><span class="pun">:</span>   <span class="str">'MEAN Stack Dashboard'</span><span class="pun">,</span>
<span class="prp">desc</span><span class="pun">:</span>   <span class="str">'Analytics + Grafana integration'</span><span class="pun">,</span>
<span class="prp">stack</span><span class="pun">:</span>  <span class="pun">[</span><span class="str">'Angular'</span><span class="pun">,</span><span class="str">'Node.js'</span><span class="pun">,</span><span class="str">'MongoDB'</span><span class="pun">,</span><span class="str">'Grafana'</span><span class="pun">],</span>
<span class="prp">status</span><span class="pun">:</span> <span class="str">'live'</span><span class="pun">,</span>
<span class="pun">},</span>
<span class="pun">];</span>
<span class="pun">}</span>
<span class="cblink"></span>`,
  contact: `<span class="cmt">// contact.component.ts — reach out!</span>

<span class="cmt">/*
*  📧  chandanimourya5@gmail.com
*  💼  https://www.linkedin.com/in/chandani-mourya-dev/
*  🐙  https://github.com/ChandaniM
*
*  Open to: full-time · freelance · consulting
*  Response: within 24 hours · IST (UTC +5:30)
*/</span>

<span class="prp">$availability</span><span class="pun">:</span>   <span class="grn">open</span><span class="pun">;</span>
<span class="prp">$response-time</span><span class="pun">:</span> <span class="str">'24 hours'</span><span class="pun">;</span>
<span class="prp">$open-to</span><span class="pun">:</span>       <span class="str">'full-time, freelance, consulting'</span><span class="pun">;</span>
<span class="prp">$preferred</span><span class="pun">:</span>     <span class="str">'Angular, React, MEAN Stack'</span><span class="pun">;</span>

<span class="fn">.contact-me</span> <span class="pun">{</span>
<span class="prp">display</span><span class="pun">:</span>        <span class="imp">flex</span><span class="pun">;</span>
<span class="prp">flex-direction</span><span class="pun">:</span> <span class="imp">column</span><span class="pun">;</span>
<span class="prp">gap</span><span class="pun">:</span>            <span class="num">16px</span><span class="pun">;</span>
<span class="pun">}</span>
<span class="cblink"></span>`,
  readme: `<span class="cmt"># 👋 Chandani Mourya — Frontend Engineer</span>

<span class="str">## 🚀 Overview</span>
Angular · React · TypeScript · MEAN Stack Developer  
3+ years building scalable, performant web applications.

<span class="str">## 🧠 Philosophy</span>
- Clean architecture over quick hacks  
- Reusable component-driven systems  
- Performance-first mindset  
- Developer experience matters  

<span class="str">## 🏆 Highlights</span>
• 🥇 Winner — Flair Labs Hackathon 2023  
• 📈 Improved Lighthouse scores by 40%  
• 🧩 Built modular Angular component libraries  
• ⚡ Production-ready apps under tight deadlines  

<span class="str">## 🛠 Tech Stack</span>
Frontend  → Angular, React, TypeScript, SCSS  
Backend   → Node.js, Express, MongoDB  
DevOps    → Docker, Firebase, Grafana  
Tools     → Git, VS Code, Postman  

<span class="str">## 📂 Workspace Commands</span>
Press <span class="kw">Ctrl + P</span> → Open Command Palette  
Switch modes → 👔 Recruiter / 💻 Dev  
Toggle theme → ☀️ / 🌙  

<span class="str">## 📬 Contact</span>
📧 chandanimourya5@gmail.com  
💼 LinkedIn  
🐙 GitHub  

<span class="cmt">// Thanks for exploring the workspace 👋</span>
<span class="cblink"></span>`,
  //   readme: `<span class="cmt"># 👋 Frontend Engineer Portfolio</span>

  // <span class="str">## Stack</span>
  // Angular · React · TypeScript · Node.js
  // MongoDB · MySQL · Firebase · Docker · Grafana

  // <span class="str">## Experience</span>
  // <span class="num">3</span> years <span class="num">5</span> months — MEAN Stack & React Developer
  // 🏆 Winner — Flair Labs Hackathon <span class="num">2023</span>

  // <span class="str">## Quick Start</span>
  // git clone https://github.com/ChandaniM/portfolio
  // npm install && ng serve

  // <span class="str">## Contact</span>
  // 📧 chandanimourya5@gmail.com
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
    ic: "📄",
    lb: "about.component.ts",
    kb: "",
    fn: () => devTab("about"),
  },
  {
    ic: "🛠️",
    lb: "skills.component.ts",
    kb: "",
    fn: () => devTab("skills"),
  },
  {
    ic: "💼",
    lb: "experience.component.ts",
    kb: "",
    fn: () => devTab("experience"),
  },
  {
    ic: "🚀",
    lb: "projects.component.ts",
    kb: "",
    fn: () => devTab("projects"),
  },
  {
    ic: "📬",
    lb: "contact.component.ts",
    kb: "",
    fn: () => devTab("contact"),
  },
  { ic: "📖", lb: "README.md", kb: "", fn: () => devTab("readme") },
  {
    ic: "👔",
    lb: "Switch to Recruiter Mode",
    kb: "⌘⇧R",
    fn: () => {
      if (currentMode === "dev") toggleMode();
      closeCp();
    },
  },
  { ic: "☀️", lb: "Light Theme", kb: "", fn: () => setTheme("light") },
  { ic: "🌙", lb: "Dark Theme", kb: "", fn: () => setTheme("dark") },
  {
    ic: "📧",
    lb: "Copy Email",
    kb: "",
    fn: () => notify("📧", "Copied!", "chandanimourya5@gmail.com"),
  },
  {
    ic: "🏆",
    lb: "Hackathon Achievement",
    kb: "",
    fn: () => notify("🏆", "Winner!", "Flair Labs 2023 — Team Clippers"),
  },
];

const tabNames = {
  about: "about.component.ts",
  skills: "skills.component.ts",
  experience: "experience.component.ts",
  projects: "projects.component.ts",
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
function notify(ico, tt, bd) {
  document.getElementById("nIco").textContent = ico;
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

  const decimal = (years + months / 12).toFixed(1);

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
    icon: "🖥️",
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
    ],
  },
  {
    icon: "⚙️",
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
    icon: "🗄️",
    name: "Databases",
    chips: ["MySQL", "MongoDB"],
  },
  {
    icon: "☁️",
    name: "Cloud",
    chips: ["Firebase", "AWS S3", "AWS EC2"],
  },
  {
    icon: "🛠️",
    name: "Tools & DevOps",
    chips: ["Docker", "Git", "M-files"],
  },
  {
    icon: "📊",
    name: "No-Code & Monitoring",
    chips: ["FlutterFlow", "Flutter", "Grafana"],
  },
  {
    icon: "🧪",
    name: "Testing",
    chips: ["Jest", "Jasmine", "Vitest", "React Testing Library"],
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
  icon.textContent = category.icon;

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
//  INIT
// ══════════════════════════════════════
(function init() {
  document.getElementById("total-experience-full-value").textContent =
    calculateExperience("2022-11-22", "full");
  document.getElementById("se-duration").textContent = calculateExperience(
    "2024-06-20",
    "short"
  );
  document.getElementById("total-experience").textContent = calculateExperience(
    "2022-11-22",
    "decimal"
  );
  document.getElementById("total-year-experience").textContent =
    calculateExperience("2022-11-22", "decimalPlus");
  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem("pf-theme") || "dark";
  } catch (e) {}
  setTheme(savedTheme);
  renderDevCode("about");
  document.getElementById("devPanel").innerHTML = devPanels.terminal;
  setTimeout(
    () =>
      notify(
        "👋",
        "Welcome!",
        "Use ☀️🌙 to toggle theme · 💻 to switch to Dev Mode"
      ),
    1200
  );
})();

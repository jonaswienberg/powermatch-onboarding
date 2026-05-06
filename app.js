/* ============================================================
   PowerMatch Onboarding — App (Soft variant)
   Vanilla JS. Hash routing. localStorage state.
   Three surfaces: trainee, manager dashboard, content authoring.
   ============================================================ */

/* ---------- SUPABASE ---------- */
const SUPABASE_URL = 'https://cvxjrzkbkuayqhmuxnbz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2eGpyemtia3VheXFobXV4bmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwOTAzMTksImV4cCI6MjA5MzY2NjMxOX0.kGnu5mai1KnQMcY64zHcOMc3nawULKVOEsITvWPZ4es';
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ---------- STORAGE ---------- */
const STORAGE = {
  USERS: 'pm_users',
  SESSION: 'pm_session',
  PROGRESS_PREFIX: 'pm_progress_',
  CONTENT_OVERRIDES: 'pm_content_overrides',
  PENDING_MAGIC: 'pm_pending_magic'
};
const ADMIN_EMAIL = 'jw@powermatch.dk';

const load = (k, def = null) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? def; }
  catch { return def; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const remove = (k) => localStorage.removeItem(k);

/* ---------- CONTENT (with overrides) ---------- */
function getContent() {
  const overrides = load(STORAGE.CONTENT_OVERRIDES, {});
  const c = JSON.parse(JSON.stringify(CONTENT));
  Object.keys(overrides).forEach(modId => {
    if (c.modules[modId]) {
      const ov = overrides[modId];
      if (ov.title) c.modules[modId].title = ov.title;
      if (ov.subtitle) c.modules[modId].subtitle = ov.subtitle;
      if (ov.questions) c.modules[modId].questions = ov.questions;
      if (ov.reflections) c.modules[modId].reflections = ov.reflections;
    }
  });
  return c;
}

/* ---------- SEED demo trainees ---------- */
(function seed() {
  const users = load(STORAGE.USERS, {});
  if (Object.keys(users).length === 0) {
    const demo = {
      'mette.ho@powermatch.dk': { name: 'Mette Holm', role: 'hr', createdAt: Date.now() - 86400000 * 12 },
      'kasper.j@powermatch.dk': { name: 'Kasper Jensen', role: 'salg', createdAt: Date.now() - 86400000 * 8 },
      'sara.l@powermatch.dk': { name: 'Sara Lundgaard', role: 'kundeservice', createdAt: Date.now() - 86400000 * 5 },
      'thomas.b@powermatch.dk': { name: 'Thomas Berg', role: 'csm', createdAt: Date.now() - 86400000 * 2 },
      'nadia.k@powermatch.dk': { name: 'Nadia Kristensen', role: 'hr', createdAt: Date.now() - 86400000 * 18 }
    };
    save(STORAGE.USERS, demo);

    const mette = {
      velkommen: { complete: true, score: 6, total: 6, slidesSeen: 17, reflections: { r1: 'Jeg blev overrasket over hvor meget data der ligger bag matchingen.', r2: 'Den direkte tilgang til håndværkere — vi taler deres sprog.', r3: 'Ved at sikre at hver kandidat bliver mødt af et menneske, ikke bare data.' }, completedAt: Date.now() - 86400000 * 9 },
      branche: { complete: true, score: 7, total: 7, slidesSeen: 15, reflections: { r1: 'Murer — den direkte stil minder mig om min onkel.', r2: 'Mindre HR-sprog, mere direkte og konkret tale.' }, completedAt: Date.now() - 86400000 * 6 },
      matches: { complete: false, score: 3, total: 5, slidesSeen: 4, reflections: {}, completedAt: null }
    };
    save(STORAGE.PROGRESS_PREFIX + 'mette.ho@powermatch.dk', mette);

    const kasper = {
      velkommen: { complete: true, score: 5, total: 6, slidesSeen: 17, reflections: { r1: '518-timersmodellen — den er smart.', r2: 'Vi løser et reelt problem, ikke bare et CV-marked.', r3: 'Ved at tage KT\'erne seriøst og sikre god data fra start.' }, completedAt: Date.now() - 86400000 * 7 },
      branche: { complete: true, score: 6, total: 7, slidesSeen: 15, reflections: {}, completedAt: Date.now() - 86400000 * 5 },
      kt: { complete: false, score: 0, total: 0, slidesSeen: 8, reflections: {}, completedAt: null }
    };
    save(STORAGE.PROGRESS_PREFIX + 'kasper.j@powermatch.dk', kasper);

    const sara = {
      velkommen: { complete: true, score: 6, total: 6, slidesSeen: 17, reflections: {}, completedAt: Date.now() - 86400000 * 4 },
      branche: { complete: false, score: 0, total: 0, slidesSeen: 6, reflections: {}, completedAt: null }
    };
    save(STORAGE.PROGRESS_PREFIX + 'sara.l@powermatch.dk', sara);

    const nadia = {
      velkommen: { complete: true, score: 6, total: 6, slidesSeen: 17, reflections: {}, completedAt: Date.now() - 86400000 * 16 },
      branche: { complete: true, score: 7, total: 7, slidesSeen: 15, reflections: {}, completedAt: Date.now() - 86400000 * 14 },
      matches: { complete: true, score: 5, total: 5, slidesSeen: 7, reflections: { r1: 'Lønforskelle og pauser i CV — der vil jeg være mere skarp.' }, completedAt: Date.now() - 86400000 * 10 },
      screening: { complete: true, score: 5, total: 5, slidesSeen: 6, reflections: {}, completedAt: Date.now() - 86400000 * 6 }
    };
    save(STORAGE.PROGRESS_PREFIX + 'nadia.k@powermatch.dk', nadia);
  }

  // Backfill realistic timings for demo trainees (idempotent)
  const demoProfiles = {
    'mette.ho@powermatch.dk': 'medium',
    'kasper.j@powermatch.dk': 'fast',
    'sara.l@powermatch.dk': 'medium',
    'thomas.b@powermatch.dk': 'medium',
    'nadia.k@powermatch.dk': 'slow'
  };
  Object.entries(demoProfiles).forEach(([email, profile]) => {
    const u = (load(STORAGE.USERS, {}))[email];
    if (!u) return;
    const p = load(STORAGE.PROGRESS_PREFIX + email, {});
    let changed = false;
    Object.keys(p).forEach(moduleId => {
      if (!p[moduleId].timings) {
        const t = makeRealisticTimings(moduleId, p[moduleId], profile);
        if (t) { p[moduleId].timings = t; changed = true; }
      }
    });
    if (changed) save(STORAGE.PROGRESS_PREFIX + email, p);
  });
})();

function makeRealisticTimings(moduleId, mp, profile) {
  if (typeof CONTENT === 'undefined' || !CONTENT.modules[moduleId]) return null;
  const mod = CONTENT.modules[moduleId];
  const profiles = {
    fast:   { slideMin: 3000,  slideMax: 12000, qMin: 2500, qMax: 7000,  ref: 32000, refSpread: 18000, skimChance: 0.30 },
    medium: { slideMin: 11000, slideMax: 24000, qMin: 6000, qMax: 13000, ref: 75000, refSpread: 30000, skimChance: 0.08 },
    slow:   { slideMin: 19000, slideMax: 42000, qMin: 9000, qMax: 22000, ref: 110000, refSpread: 35000, skimChance: 0.0  }
  };
  const cfg = profiles[profile] || profiles.medium;
  let seed = (moduleId + profile).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };

  const slides = {};
  const slidesCount = Math.min(mp.slidesSeen ?? mod.slides.length, mod.slides.length);
  for (let i = 0; i < slidesCount; i++) {
    const skim = rand() < cfg.skimChance;
    const base = skim ? 1500 + rand() * 2500 : cfg.slideMin + rand() * (cfg.slideMax - cfg.slideMin);
    slides[i] = Math.round(base);
  }
  const questions = {};
  if (mp.quizAnswers) {
    Object.keys(mp.quizAnswers).forEach(qid => {
      const q = mod.questions.find(x => x.id === qid);
      const wrong = q && mp.quizAnswers[qid] !== q.correct;
      const base = wrong && rand() < 0.4
        ? cfg.qMin + rand() * (cfg.qMax - cfg.qMin) * 1.6
        : cfg.qMin + rand() * (cfg.qMax - cfg.qMin);
      questions[qid] = Math.round(base);
    });
  }
  const hasReflection = mp.reflections && Object.keys(mp.reflections).filter(k => mp.reflections[k]).length > 0;
  const reflectionTime = hasReflection ? Math.round(cfg.ref + rand() * cfg.refSpread) : 0;
  const totalActiveMs = Object.values(slides).reduce((a, b) => a + b, 0)
    + Object.values(questions).reduce((a, b) => a + b, 0)
    + reflectionTime;
  return { slides, questions, reflection: reflectionTime, summary: 0, totalActiveMs };
}

/* ---------- SESSION / PROGRESS ---------- */
function currentSession() { return load(STORAGE.SESSION); }
function isAdmin() {
  const s = currentSession();
  return s && s.email === ADMIN_EMAIL;
}
async function logout() {
  try { await sb.auth.signOut(); } catch (e) { /* ignore */ }
  remove(STORAGE.SESSION);
  remove(STORAGE.PENDING_MAGIC);
  navigate('/');
}

function getProgress(email) { return load(STORAGE.PROGRESS_PREFIX + email, {}); }
function saveProgress(email, p) { save(STORAGE.PROGRESS_PREFIX + email, p); }
function moduleProgress(email, moduleId) {
  const p = getProgress(email);
  return p[moduleId] || { complete: false, score: 0, total: 0, slidesSeen: 0, reflections: {}, completedAt: null };
}
function setModuleProgress(email, moduleId, partial) {
  const p = getProgress(email);
  p[moduleId] = { ...moduleProgress(email, moduleId), ...partial };
  saveProgress(email, p);
}

/* ---------- ROUTER ---------- */
const ROUTES = [];
function route(pattern, handler) { ROUTES.push({ pattern, handler }); }
function navigate(path) { location.hash = '#' + path; }
function dispatch() {
  const path = location.hash.replace(/^#/, '') || '/';
  for (const r of ROUTES) {
    const m = matchRoute(r.pattern, path);
    if (m) { r.handler(m.params, path); return; }
  }
  navigate('/');
}
function matchRoute(pattern, path) {
  const pp = pattern.split('/').filter(Boolean);
  const ap = path.split('/').filter(Boolean);
  if (pp.length !== ap.length) return null;
  const params = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(':')) params[pp[i].slice(1)] = decodeURIComponent(ap[i]);
    else if (pp[i] !== ap[i]) return null;
  }
  return { params };
}
window.addEventListener('hashchange', () => {
  if (typeof recordStepTime === 'function') recordStepTime();
  dispatch();
});
window.addEventListener('beforeunload', () => {
  if (typeof recordStepTime === 'function') recordStepTime();
});

/* ---------- HELPERS ---------- */
const $app = document.getElementById('app');
function render(html) { $app.innerHTML = html; }

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 2400);
}

function timeAgo(ts) {
  const d = (Date.now() - ts) / 1000;
  if (d < 60) return 'lige nu';
  if (d < 3600) return Math.round(d/60) + ' min siden';
  if (d < 86400) return Math.round(d/3600) + ' timer siden';
  if (d < 86400 * 30) return Math.round(d/86400) + ' dage siden';
  return new Date(ts).toLocaleDateString('da-DK');
}
function formatDuration(ms) {
  if (!ms || ms < 1000) return '0s';
  const s = Math.round(ms / 1000);
  if (s < 60) return s + 's';
  const m = Math.floor(s / 60);
  const remS = s % 60;
  if (m < 60) return remS > 0 ? `${m}m ${remS}s` : `${m}m`;
  const h = Math.floor(m / 60);
  const remM = m % 60;
  return remM > 0 ? `${h}t ${remM}m` : `${h}t`;
}
function formatDurationShort(ms) {
  if (!ms || ms < 1000) return '<1s';
  const s = Math.round(ms / 1000);
  if (s < 60) return s + 's';
  const m = Math.floor(s / 60);
  const remS = s % 60;
  return remS > 0 ? `${m}m${remS.toString().padStart(2,'0')}s` : `${m}m`;
}

function todayLabel() {
  const days = ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'];
  const d = new Date();
  return `DK · ${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getFullYear()).slice(2)}`;
}

/* ---------- TOPBAR ---------- */
function topbar(active = '') {
  const s = currentSession();
  if (!s) return '';
  const initials = s.name ? s.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase() : s.email[0].toUpperCase();
  const c = getContent();
  const roleLabel = s.role === 'admin' ? 'Admin' : (c.tracks[s.role]?.label || 'Trainee');

  const adminLinks = isAdmin() ? `
    <a href="#" class="${active==='manager'?'active':''}" onclick="event.preventDefault();navigate('/manager')">Manager</a>
    <a href="#" class="${active==='author'?'active':''}" onclick="event.preventDefault();navigate('/author')">Indhold</a>
  ` : '';

  return `
    <header class="s-tb">
      <div class="s-tb-brand" onclick="navigate('/')" style="cursor:pointer">
        <div class="s-tb-mark" aria-hidden="true"></div>
        <div class="s-tb-name">PowerMatch <span>/ Onboarding</span></div>
      </div>
      <nav class="s-tb-nav">
        <a href="#" class="${active==='home'?'active':''}" onclick="event.preventDefault();navigate('/')">Læring</a>
        ${adminLinks}
      </nav>
      <div class="s-tb-right">
        <span class="s-tb-clock">${todayLabel()}</span>
        <span class="s-tb-user">
          <span class="s-tb-user-text">
            <span class="s-tb-user-name">${escapeHtml(s.name || s.email)}</span>
            <span class="s-tb-user-role">${escapeHtml(roleLabel)}</span>
          </span>
          <span class="s-tb-avatar">${initials}</span>
        </span>
        <a href="#" onclick="event.preventDefault();logout()" style="font-size:11px;color:var(--pm-mute)">Log ud</a>
      </div>
    </header>
  `;
}

/* ============================================================
   ROUTE: LOGIN / HOME
   ============================================================ */
route('/', () => {
  if (window._needsOnboarding) {
    return renderOnboarding(window._needsOnboarding);
  }
  const s = currentSession();
  if (!s) return renderLogin();
  return renderHome();
});

function renderLogin() {
  const pending = load(STORAGE.PENDING_MAGIC);
  if (pending) {
    render(`
      <div class="s-surface">
        <div class="s-login">
          <div class="s-login-left">
            <div class="s-login-top">
              <div style="display:flex;align-items:center;gap:12px">
                <div class="s-tb-mark" aria-hidden="true"></div>
                <span style="font-weight:600;color:var(--pm-ink)">PowerMatch</span>
              </div>
              <span>EST. 2018 / KBH</span>
            </div>
            <h1>Tjek din<br><em>indbakke.</em></h1>
            <div class="s-login-credits">
              <div class="vol">SENDT TIL<br>${escapeHtml(pending.email).toUpperCase()}<br>VOL. 2026</div>
            </div>
          </div>
          <div class="s-login-right">
            <div class="s-login-form">
              <div class="sup">— Magic link på vej</div>
              <h2>Tjek din indbakke</h2>
              <p class="lede">Vi har sendt et magic link til ${escapeHtml(pending.email)}. Åbn mailen og klik på linket for at logge ind. Du kan lukke denne fane bagefter.</p>
              <div class="s-magic-sent">
                <strong>Magic link sendt</strong>
                <span style="font-size:13px">${escapeHtml(pending.email)}</span>
              </div>
              <div class="alt">Modtog du ikke mailen inden for et par minutter? Tjek dit spam-filter, eller <a href="#" onclick="event.preventDefault();cancelMagic()">brug en anden mail</a>.</div>
            </div>
          </div>
        </div>
      </div>
    `);
    return;
  }

  render(`
    <div class="s-surface">
      <div class="s-login">
        <div class="s-login-left">
          <div class="s-login-top">
            <div style="display:flex;align-items:center;gap:12px">
              <div class="s-tb-mark" aria-hidden="true"></div>
              <span style="font-weight:600;color:var(--pm-ink)">PowerMatch</span>
            </div>
            <span>EST. 2018 / KBH</span>
          </div>
          <h1>Lær din<br>nye <em>verden</em><br>at kende.</h1>
          <div class="s-login-credits">
            <div class="stat">
              <span class="num">6</span>
              <span class="lbl">Moduler</span>
            </div>
            <div class="stat">
              <span class="num">~2t</span>
              <span class="lbl">Total tid</span>
            </div>
            <div class="vol">ONBOARDING<br>N°01<br>VOL. 2026</div>
          </div>
        </div>
        <div class="s-login-right">
          <div class="s-login-form">
            <div class="sup">— Adgang for medarbejdere</div>
            <h2>Log ind</h2>
            <p class="lede">Brug din PowerMatch-konto. Vi sender dig et magic link, så du slipper for at huske et kodeord.</p>
            <form id="login-form">
              <div class="field">
                <label>E-mail</label>
                <input id="email" class="s-input" type="email" placeholder="dit.navn@powermatch.dk" required autocomplete="email" />
              </div>
              <button type="submit" class="s-btn s-btn-ink s-btn-arrow">Send magic link</button>
            </form>
            <div class="alt">Første gang? Du bliver bedt om dit navn og rolle, når du er logget ind.</div>
          </div>
        </div>
      </div>
    </div>
  `);

  document.getElementById('login-form').addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    if (!email) return;
    const btn = e.target.querySelector('button[type="submit"]');
    const originalLabel = btn.innerHTML;
    btn.disabled = true;
    btn.textContent = 'Sender...';
    const redirectTo = window.location.origin + window.location.pathname;
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo }
    });
    btn.disabled = false;
    btn.innerHTML = originalLabel;
    if (error) {
      alert('Kunne ikke sende magic link: ' + error.message);
      return;
    }
    save(STORAGE.PENDING_MAGIC, { email, ts: Date.now() });
    renderLogin();
  });
}

// Magic link confirmation is now handled by Supabase via the redirect URL.
// Kept as a safe no-op for backwards-compatibility.
window.confirmMagic = function () {};

window.cancelMagic = async function () {
  try { await sb.auth.signOut(); } catch (e) { /* ignore */ }
  remove(STORAGE.PENDING_MAGIC);
  delete window._needsOnboarding;
  renderLogin();
};

function renderOnboarding(email) {
  const isAdminUser = email === ADMIN_EMAIL;
  render(`
    <div class="s-surface">
      <div class="s-login">
        <div class="s-login-left">
          <div class="s-login-top">
            <div style="display:flex;align-items:center;gap:12px">
              <div class="s-tb-mark" aria-hidden="true"></div>
              <span style="font-weight:600;color:var(--pm-ink)">PowerMatch</span>
            </div>
            <span>SETUP</span>
          </div>
          <h1>${isAdminUser ? 'Velkommen,<br><em>admin.</em>' : 'Lad os blive<br><em>bekendte.</em>'}</h1>
        </div>
        <div class="s-login-right">
          <div class="s-login-form" style="max-width:460px">
            <div class="sup">— ${isAdminUser ? 'Admin-konto' : 'Første login'}</div>
            <h2>${isAdminUser ? 'Næsten klar' : 'Du og din rolle'}</h2>
            <p class="lede">${isAdminUser ? 'Som admin har du adgang til manager-dashboard og indholdsredigering.' : 'Et par ting, så vi kan give dig den rigtige onboarding.'}</p>
            <form id="setup-form">
              <div class="field">
                <label>Dit navn</label>
                <input id="name" class="s-input" type="text" placeholder="Fornavn Efternavn" required />
              </div>
              ${isAdminUser ? '' : `
                <div class="field">
                  <label>Din rolle</label>
                  <div class="s-role-picker">
                    ${Object.values(getContent().tracks).map(t => `
                      <button type="button" class="s-role-card" data-role="${t.id}">
                        <div class="ico">${roleIcon(t.id)}</div>
                        <h3>${escapeHtml(t.label)}</h3>
                        <p>${escapeHtml(t.tagline)}</p>
                      </button>
                    `).join('')}
                  </div>
                  <input type="hidden" id="role" value="" required />
                </div>
              `}
              <button type="submit" class="s-btn s-btn-ink s-btn-arrow">Færdig</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `);

  if (!isAdminUser) {
    document.querySelectorAll('.s-role-card').forEach(c => {
      c.addEventListener('click', () => {
        document.querySelectorAll('.s-role-card').forEach(x => x.classList.remove('active'));
        c.classList.add('active');
        document.getElementById('role').value = c.dataset.role;
      });
    });
  }

  document.getElementById('setup-form').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const role = isAdminUser ? 'admin' : document.getElementById('role').value;
    if (!name || !role) return alert('Vælg en rolle først.');
    const users = load(STORAGE.USERS, {});
    users[email] = { name, role, createdAt: Date.now() };
    save(STORAGE.USERS, users);
    save(STORAGE.SESSION, { email, name, role });
    remove(STORAGE.PENDING_MAGIC);
    delete window._needsOnboarding;
    toast('Velkommen ombord ' + name.split(' ')[0]);
    navigate('/');
  });
}

function roleIcon(id) {
  const map = {
    hr:           `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>`,
    salg:         `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    kundeservice: `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    csm:          `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  };
  return map[id] || '';
}

/* ============================================================
   ROUTE: HOME
   ============================================================ */
function renderHome() {
  const s = currentSession();
  const c = getContent();
  let modules = [];
  let trackLabel = 'Onboarding';

  if (s.role === 'admin') {
    modules = Object.values(c.modules).sort((a, b) => a.order - b.order);
    trackLabel = 'Admin · Alle moduler';
  } else {
    const track = c.tracks[s.role];
    if (!track) return navigate('/');
    trackLabel = track.label;
    modules = track.modules.map(id => c.modules[id]).filter(Boolean);
  }

  const progress = getProgress(s.email);
  const completed = modules.filter(m => progress[m.id]?.complete).length;
  const totalQuestions = modules.reduce((sum, m) => sum + (m.questions?.length || 0), 0);
  const correctTotal = modules.reduce((sum, m) => sum + (progress[m.id]?.score || 0), 0);
  const answeredTotal = modules.reduce((sum, m) => sum + (progress[m.id]?.total || 0), 0);
  const accuracy = answeredTotal ? Math.round((correctTotal / answeredTotal) * 100) : null;

  let nextModuleId = null;
  for (const m of modules) {
    if (!progress[m.id]?.complete) { nextModuleId = m.id; break; }
  }
  const nextMod = nextModuleId ? c.modules[nextModuleId] : null;
  const firstNonCompleteId = nextModuleId; // alias for moduleCardHTML

  // total time across modules
  let totalActiveMs = 0;
  modules.forEach(m => {
    const t = progress[m.id]?.timings;
    if (t?.totalActiveMs) totalActiveMs += t.totalActiveMs;
  });

  const firstName = s.name?.split(' ')[0] || 'der';
  const pct = modules.length ? Math.round((completed / modules.length) * 100) : 0;

  render(`
    ${topbar('home')}
    <div class="s-home">
      <div class="s-hero">
        <div class="s-hero-top">
          <span>${escapeHtml(trackLabel)} · ${modules.length} moduler</span>
          <span>${todayLabel().split('·')[1].trim()}</span>
        </div>
        <h1>Velkommen<br>tilbage, <em>${escapeHtml(firstName)}.</em></h1>
        <div class="s-hero-meta">
          <p class="s-hero-lede">${nextMod
            ? `Du er ${pct}% gennem din onboarding. Næste op er <span class="yel">${escapeHtml(nextMod.title)}</span> — ${escapeHtml(nextMod.subtitle || '')}.`
            : `Du er igennem alle dine moduler. <span class="yel">Sygt flot.</span>`}</p>
          <div class="s-hero-stats">
            <div class="s-hero-stat">
              <div class="lbl">Færdig</div>
              <div class="num">${pct}%</div>
              <div class="sub">${completed} / ${modules.length} moduler</div>
            </div>
            <div class="s-hero-stat">
              <div class="lbl">Score</div>
              <div class="num">${accuracy != null ? accuracy + '%' : '—'}</div>
              <div class="sub">Quiz-snit</div>
            </div>
            <div class="s-hero-stat">
              <div class="lbl">Tid</div>
              <div class="num">${totalActiveMs > 0 ? formatDurationShort(totalActiveMs) : '—'}</div>
              <div class="sub">aktivt brugt</div>
            </div>
          </div>
        </div>
      </div>

      <div class="s-sec-head">
        <h2>Dit læringsspor</h2>
        <span class="meta">${modules.length} moduler · ${totalQuestions} spørgsmål</span>
      </div>

      <div class="s-mod-list">
        ${modules.map((m, i) => moduleCardHTML(m, i, progress, modules, firstNonCompleteId)).join('')}
      </div>
    </div>
  `);
}

function moduleCardHTML(m, idx, progress, allModules, firstNonCompleteId) {
  const p = progress[m.id] || { complete: false, score: 0, total: 0, slidesSeen: 0 };
  const totalQ = m.questions?.length || 0;
  const totalSlides = m.slides?.length || 0;
  const totalSteps = totalSlides + totalQ + (m.reflections?.length ? 1 : 0);
  const completedSteps = Math.min(totalSteps, (p.slidesSeen || 0) + (p.score || 0) + (Object.keys(p.reflections || {}).length ? 1 : 0));
  const pct = p.complete ? 100 : Math.round((completedSteps / Math.max(1, totalSteps)) * 100);

  const prevModule = idx > 0 ? allModules[idx - 1] : null;
  const locked = !isAdmin() && prevModule && !(progress[prevModule.id]?.complete);

  // Status:
  //   done = complete (white card, green pip)
  //   now  = the FIRST uncompleted module (yellow card) — only one at a time
  //   locked = uncompleted with locked predecessor (faded — non-admin only)
  //   ''     = available: white card, neutral pip (admin's other modules; or future modules unlocked)
  let status = '';
  let statusLabel = 'Klar';
  if (p.complete) { status = 'done'; statusLabel = 'Gennemført'; }
  else if (m.id === firstNonCompleteId) { status = 'now'; statusLabel = 'I gang'; }
  else if (locked) { status = 'locked'; statusLabel = 'Låst'; }

  const num = String(m.order).padStart(2, '0');
  const action = locked ? '' : `onclick="navigate('/module/${m.id}')"`;

  return `
    <div class="s-mod ${status}" ${action} ${locked ? 'aria-disabled="true"' : 'role="button" tabindex="0"'}>
      <div class="s-mod-num">${num}</div>
      <div>
        <h3>${escapeHtml(m.title)}</h3>
        <div class="sub">${escapeHtml(m.subtitle || '')}</div>
      </div>
      <div class="s-mod-meta">
        <span><strong>${escapeHtml(m.duration || '')}</strong></span>
        <span>${totalSlides} slides · ${totalQ} spørgsmål</span>
      </div>
      <div class="s-mod-prog">
        <div class="bar"><div class="fill" style="width:${pct}%"></div></div>
        <div class="meta-line">
          <span class="s-pip ${status}">${statusLabel}</span>
          <span>${pct}%</span>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end">
        <span class="s-mod-arrow" aria-hidden="true">→</span>
      </div>
    </div>
  `;
}

/* ============================================================
   ROUTE: MODULE PLAYER
   ============================================================ */
route('/module/:id', ({ id }) => {
  const s = currentSession();
  if (!s) return navigate('/');
  const c = getContent();
  const module = c.modules[id];
  if (!module) return navigate('/');
  startPlayer(module);
});

let PLAYER = null;
function startPlayer(module) {
  const s = currentSession();
  const hasReflections = module.reflections?.length > 0;
  const steps = [];
  module.slides.forEach((sl, i) => steps.push({ kind: 'slide', i, data: sl }));
  module.questions.forEach((q, i) => steps.push({ kind: 'question', i, data: q }));
  if (hasReflections) steps.push({ kind: 'reflection' });
  steps.push({ kind: 'summary' });

  const stored = moduleProgress(s.email, module.id);
  const isRetake = stored.complete;
  PLAYER = {
    module,
    steps,
    idx: 0,
    answers: isRetake ? {} : (stored.quizAnswers || {}),
    correct: 0,
    reflections: isRetake ? {} : (stored.reflections || {}),
    seenSlides: new Set(),
    summaryWritten: false,
    timings: isRetake ? emptyTimings() : (stored.timings || emptyTimings()),
    stepEnteredAt: null,
    firstStartedAt: stored.firstStartedAt || Date.now()
  };
  if (!isRetake) recomputeCorrect();
  renderPlayer();
}

function emptyTimings() {
  return { slides: {}, questions: {}, reflection: 0, summary: 0, totalActiveMs: 0 };
}

const MAX_DWELL_MS = 30 * 60 * 1000;
const MIN_DWELL_MS = 250;

function recordStepTime() {
  if (!PLAYER || !PLAYER.stepEnteredAt) return;
  const elapsed = Date.now() - PLAYER.stepEnteredAt;
  PLAYER.stepEnteredAt = null;
  if (elapsed < MIN_DWELL_MS || elapsed > MAX_DWELL_MS) return;

  const step = PLAYER.steps[PLAYER.idx];
  const t = PLAYER.timings;
  if (step.kind === 'slide') {
    t.slides[step.i] = (t.slides[step.i] || 0) + elapsed;
  } else if (step.kind === 'question') {
    t.questions[step.data.id] = (t.questions[step.data.id] || 0) + elapsed;
  } else if (step.kind === 'reflection') {
    t.reflection = (t.reflection || 0) + elapsed;
  } else if (step.kind === 'summary') {
    t.summary = (t.summary || 0) + elapsed;
  }
  t.totalActiveMs = (t.totalActiveMs || 0) + elapsed;

  const s = currentSession();
  if (s) {
    setModuleProgress(s.email, PLAYER.module.id, {
      timings: t,
      firstStartedAt: PLAYER.firstStartedAt
    });
  }
}

let TAB_HIDDEN_AT = null;
document.addEventListener('visibilitychange', () => {
  if (!PLAYER) return;
  if (document.hidden) {
    TAB_HIDDEN_AT = Date.now();
  } else if (TAB_HIDDEN_AT) {
    const hiddenDuration = Date.now() - TAB_HIDDEN_AT;
    if (PLAYER.stepEnteredAt) PLAYER.stepEnteredAt += hiddenDuration;
    TAB_HIDDEN_AT = null;
  }
});

function renderPlayer() {
  const { module, steps, idx } = PLAYER;
  const step = steps[idx];
  const totalSlides = module.slides.length;
  const totalQ = module.questions.length;

  if (step.kind === 'slide') PLAYER.seenSlides.add(step.i);

  // Step rail (segments)
  const rail = steps.slice(0, totalSlides + totalQ).map((st, i) => {
    if (i < idx) return 'done';
    if (i === idx) return 'now';
    return '';
  });

  let chrome, body;

  if (step.kind === 'slide') {
    chrome = playerChrome(module, step.i + 1, totalSlides, 'SLIDE', rail);
    body = renderSlide(step.data, step.i, totalSlides);
  } else if (step.kind === 'question') {
    chrome = playerChrome(module, step.i + 1, totalQ, 'QUIZ', rail);
    body = renderQuestion(step.data, step.i, totalQ);
  } else if (step.kind === 'reflection') {
    chrome = playerChrome(module, 1, 1, 'REFLEKSION', rail);
    body = renderReflections();
  } else if (step.kind === 'summary') {
    chrome = '';
    body = renderSummary();
  }

  // Determine which surface wrapper
  const wrapClass = step.kind === 'question' ? 's-quiz' : step.kind === 'summary' ? 's-summary' : 's-player';

  // Foot controls
  let foot = '';
  if (step.kind === 'summary') {
    // summary has its own buttons
    foot = '';
  } else if (step.kind === 'question') {
    // built into renderQuestion
    foot = '';
  } else {
    const isLastSlide = step.kind === 'slide' && step.i === module.slides.length - 1;
    const lbl = step.kind === 'reflection' ? 'Næste' : (isLastSlide && totalQ > 0) ? 'Start quiz' : (isLastSlide && totalQ === 0) ? 'Afslut modul' : 'Næste';
    const handler = step.kind === 'reflection' ? 'playerSubmitReflection()' : 'playerNext()';
    foot = `
      <div class="s-player-foot">
        ${idx > 0 ? `<button class="s-btn s-btn-soft" onclick="playerPrev()">← Forrige</button>` : `<button class="s-btn s-btn-ghost" disabled>← Forrige</button>`}
        <div class="center">tryk <kbd>→</kbd> for næste · <kbd>esc</kbd> for at lukke</div>
        <button class="s-btn s-btn-ink s-btn-arrow" onclick="${handler}">${lbl}</button>
      </div>
    `;
  }

  render(`
    ${topbar('home')}
    <div class="${wrapClass}">
      ${chrome}
      ${body}
      ${foot}
    </div>
  `);

  if (step.kind === 'slide') {
    const s = currentSession();
    setModuleProgress(s.email, module.id, { slidesSeen: PLAYER.seenSlides.size });
  }

  PLAYER.stepEnteredAt = Date.now();
}

function playerChrome(module, currStep, totalStep, kindLabel, rail) {
  const s = currentSession();
  const numLabel = `MODUL ${String(module.order).padStart(2, '0')}`;
  const stepDisplay = String(currStep).padStart(2, '0');
  const totalDisplay = String(totalStep).padStart(2, '0');
  return `
    <div class="s-player-head">
      <div class="s-crumb">
        <button class="s-back" aria-label="Tilbage" onclick="navigate('/')">←</button>
        <span>${numLabel} · ${escapeHtml(module.title)}</span>
      </div>
      <div class="s-title-line">
        <span class="num">${kindLabel}</span>
        <span class="name">${escapeHtml(module.subtitle || module.title)}</span>
      </div>
      <div class="s-step-counter"><span>${stepDisplay}</span><span class="total"> / ${totalDisplay}</span></div>
    </div>
    <div class="s-step-rail">
      ${rail.map(s => `<div class="seg ${s}"></div>`).join('')}
    </div>
  `;
}

window.playerNext = function () {
  recordStepTime();
  PLAYER.idx = Math.min(PLAYER.steps.length - 1, PLAYER.idx + 1);
  renderPlayer();
};
window.playerPrev = function () {
  recordStepTime();
  PLAYER.idx = Math.max(0, PLAYER.idx - 1);
  renderPlayer();
};

/* ---------- SLIDE RENDERERS ---------- */
function renderSlide(s, i, total) {
  switch (s.kind) {
    case 'cover': return slideCover(s);
    case 'agenda': return slideAgenda(s);
    case 'three-up': return slideThreeUp(s);
    case 'feature-grid': return slideFeatureGrid(s);
    case 'split': return slideSplit(s);
    case 'people': return slidePeople(s);
    case 'statement': return slideStatement(s);
    case 'numbered': return slideNumbered(s);
    case 'pains-vs-pros': return slidePainsVsPros(s);
    case 'icons-row': return slideIconsRow(s);
    case 'two-up': return slideTwoUp(s);
    case 'org': return slideOrg(s);
    case 'dna': return slideDna(s);
    case 'bullets': return slideBullets(s);
    case 'profile': return slideProfile(s);
    case 'flow': return slideFlow(s);
    case 'good-bad': return slideGoodBad(s);
    case 'gangefaktor': return slideGangefaktor(s);
    case 'mirror': return slideMirror(s);
    case 'closing': return slideMirror(s);
    case 'four-step': return slideFourStep(s);
    default: return slideBullets({ title: s.title, items: s.items || [] });
  }
}

function slideMetaBar(eyebrow) {
  return `
    <div class="s-slide-meta l">
      <span>POWERMATCH / ONBOARDING</span>
      <span>·</span>
      <span>${escapeHtml((eyebrow || '').toUpperCase())}</span>
    </div>
    <div class="s-slide-meta r">VOL. 2026</div>
  `;
}

function slideCover(s) {
  return `
    <div class="s-slide cover">
      ${slideMetaBar(s.eyebrow || 'Modul')}
      <div class="s-slide-eyebrow">${escapeHtml(s.eyebrow || 'Modul')}</div>
      <h1 class="lede" style="font-size:80px;margin-bottom:24px">${escapeHtml(s.title)}</h1>
      <p class="lede-body" style="font-size:18px;max-width:620px">${escapeHtml(s.body || '')}</p>
    </div>
  `;
}

function slideAgenda(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Agenda</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-num-list">
        ${s.items.map((it, i) => `
          <div class="item">
            <div class="n">${String(i+1).padStart(2,'0')}</div>
            <div>${escapeHtml(it)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function slideThreeUp(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Tre punkter</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-three">
        ${s.items.map((it, i) => `
          <div class="s-three-item">
            <div class="s-three-ico">
              <span style="font-family:var(--f-mono);font-weight:600;font-size:13px">${i+1}</span>
            </div>
            <div class="s-three-h">${escapeHtml(it.text.split('.')[0])}.</div>
            <div class="s-three-b">${escapeHtml(it.text)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function slideFeatureGrid(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Hovedpunkter</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-three">
        ${s.items.map(it => `
          <div class="s-three-item">
            <div class="s-three-ico"><span style="font-family:var(--f-mono);font-size:11px;font-weight:600">${escapeHtml(it.tag.slice(0,2))}</span></div>
            <div class="s-three-h">${escapeHtml(it.tag)}</div>
            <div class="s-three-b">${escapeHtml(it.text)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function slideSplit(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">${escapeHtml(s.title)}</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-three" style="grid-template-columns:1fr 1fr">
        <div class="s-three-item" style="background:${s.left.tone === 'yellow' ? 'var(--pm-yellow)' : 'var(--pm-paper)'}">
          <div class="s-three-h">${escapeHtml(s.left.title)}</div>
          ${s.left.body ? `<div class="s-three-b">${escapeHtml(s.left.body)}</div>` : ''}
        </div>
        <div class="s-three-item" style="background:${s.right.tone === 'yellow' ? 'var(--pm-yellow)' : 'var(--pm-paper)'}">
          <div class="s-three-h">${escapeHtml(s.right.title)}</div>
          ${s.right.body ? `<div class="s-three-b">${escapeHtml(s.right.body)}</div>` : ''}
        </div>
      </div>
      ${s.footer ? `<p style="margin-top:20px;font-family:var(--f-display);font-weight:600;font-size:18px">${escapeHtml(s.footer)}</p>` : ''}
    </div>
  `;
}

function slidePeople(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">${escapeHtml(s.title)}</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-people-grid">
        ${s.people.map(p => `
          <div class="s-person">
            <h3>${escapeHtml(p.name)}</h3>
            <ul>${p.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function slideStatement(s) {
  return `
    <div class="s-slide statement s-statement">
      ${slideMetaBar('Hovedbudskab')}
      <p class="text">${escapeHtml(s.text)}</p>
    </div>
  `;
}

function slideNumbered(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Skridt for skridt</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      ${s.body ? `<p class="lede-body">${escapeHtml(s.body)}</p>` : ''}
      <div class="s-num-list">
        ${s.items.map((it, i) => `
          <div class="item">
            <div class="n">${i+1}</div>
            <div>${escapeHtml(it)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function slidePainsVsPros(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">${escapeHtml(s.title)}</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-pains-grid">
        <div>
          <h4>${escapeHtml(s.left.title)}</h4>
          <ul>${s.left.items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
        </div>
        <div>
          <h4>${escapeHtml(s.right.title)}</h4>
          <ul>${s.right.items.map(i => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  `;
}

function slideIconsRow(s) {
  const icons = {
    'Tømrer': `<svg viewBox="0 0 32 32" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 8L8 22M22 8l4 4M22 8l-2-2M8 22l-2 2M22 8l-6-6"/></svg>`,
    'Murer': `<svg viewBox="0 0 32 32" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="6" width="10" height="6"/><rect x="14" y="6" width="14" height="6"/><rect x="4" y="12" width="14" height="6"/><rect x="18" y="12" width="10" height="6" fill="currentColor"/><rect x="4" y="18" width="10" height="6"/><rect x="14" y="18" width="14" height="6"/></svg>`,
    'Elektriker': `<svg viewBox="0 0 32 32" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4h10l2 12-7 12-7-12 2-12z"/><path d="M14 22h4M14 26h4"/></svg>`,
    'VVS': `<svg viewBox="0 0 32 32" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h12v8h12"/><path d="M14 6h8v6h-8z"/></svg>`,
    'Maler': `<svg viewBox="0 0 32 32" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="8" width="20" height="6" rx="2"/><path d="M16 14v8M16 22h-3v6h3"/></svg>`
  };
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">${escapeHtml(s.subtitle || s.title)}</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-icons-row">
        ${s.items.map(it => `
          <div class="item">
            <div class="ico">${icons[it] || it[0]}</div>
            <div class="label">${escapeHtml(it)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function slideTwoUp(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">${escapeHtml(s.eyebrow || s.title)}</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-three" style="grid-template-columns:1fr 1fr">
        ${s.items.map((it, i) => `
          <div class="s-three-item">
            <div class="s-three-ico"><span style="font-family:var(--f-mono);font-weight:600;font-size:14px">${i+1}</span></div>
            <div class="s-three-b" style="font-size:15px">${escapeHtml(it)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function slideOrg(s) {
  const icons = {
    'HR / Screening': `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>`,
    'Salg': `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    'Kundeservice': `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
    'Administration': `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>`
  };
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">${escapeHtml(s.title)}</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-org-grid">
        ${s.roles.map(r => `
          <div class="s-org-card">
            <div class="ico">${icons[r.label] || ''}</div>
            <div class="lbl">${escapeHtml(r.label)}</div>
            <div class="desc">${escapeHtml(r.desc)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function slideDna(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Værdier</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-dna-grid">
        ${s.values.map((v, i) => `
          <div class="s-dna-item">
            <div class="n">${String(i+1).padStart(2,'0')}</div>
            <div>${escapeHtml(v)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function slideBullets(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">${escapeHtml(s.title)}</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-bullets">
        ${(s.items || []).map(it => `<div class="item">${escapeHtml(it)}</div>`).join('')}
      </div>
    </div>
  `;
}

function slideProfile(s) {
  const profIcons = {
    hammer: `<svg viewBox="0 0 32 32" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 6l-2-2-7 7 4 4 7-7-2-2zM13 11l-9 9 4 4 9-9"/></svg>`,
    brick: `<svg viewBox="0 0 32 32" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="6" width="10" height="6"/><rect x="14" y="6" width="14" height="6"/><rect x="4" y="12" width="14" height="6"/><rect x="18" y="12" width="10" height="6"/><rect x="4" y="18" width="10" height="6"/><rect x="14" y="18" width="14" height="6"/></svg>`,
    bulb: `<svg viewBox="0 0 32 32" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M16 4a8 8 0 0 0-5 14v4h10v-4a8 8 0 0 0-5-14z"/><path d="M13 28h6"/></svg>`,
    pipe: `<svg viewBox="0 0 32 32" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 14h12v8h12"/></svg>`,
    roller: `<svg viewBox="0 0 32 32" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="4" y="6" width="20" height="8" rx="2"/><path d="M14 14v6h6v8"/></svg>`
  };
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Fagprofil</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      ${s.icon && profIcons[s.icon] ? `<div class="s-profile-icon">${profIcons[s.icon]}</div>` : ''}
      <div class="s-profile-grid">
        <div class="s-profile-col">
          <h4>Profil</h4>
          <ul><li>${escapeHtml(s.profile)}</li></ul>
        </div>
        <div class="s-profile-col">
          <h4>Arbejdsopgaver</h4>
          <ul>${s.tasks.map(t => `<li>${escapeHtml(t)}</li>`).join('')}</ul>
        </div>
        <div class="s-profile-col">
          <h4>Vigtigt at vide</h4>
          <ul>${s.notes.map(n => `<li>${escapeHtml(n)}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  `;
}

function slideFlow(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Flow</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      ${s.body ? `<p class="lede-body">${escapeHtml(s.body)}</p>` : ''}
      <div class="s-flow-row">
        ${s.steps.map((st, i) => `<div class="step">${i+1}. ${escapeHtml(st)}</div>`).join('')}
      </div>
    </div>
  `;
}

function slideGoodBad(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Sammenligning</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      ${s.quote ? `<p class="lede-body" style="font-style:italic;border-left:4px solid var(--pm-yellow);padding-left:18px;margin-bottom:6px">${escapeHtml(s.quote)}</p>` : ''}
      <div class="s-good-bad">
        <div class="col good">
          <div class="check">✓ ${escapeHtml(s.good.title)}</div>
          <ul>${s.good.items.map(i => `<li>→ ${escapeHtml(i)}</li>`).join('')}</ul>
        </div>
        <div class="col bad">
          <div class="check">✗ ${escapeHtml(s.bad.title)}</div>
          <ul>${s.bad.items.map(i => `<li>→ ${escapeHtml(i)}</li>`).join('')}</ul>
        </div>
      </div>
    </div>
  `;
}

function slideGangefaktor(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Prissætning</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      ${s.body ? `<p class="lede-body">${escapeHtml(s.body)}</p>` : ''}
      <div class="s-gf-table">
        <div class="row head"><span>Fag</span><span>Faktor</span></div>
        ${s.rows.map(r => `<div class="row"><span>${escapeHtml(r.fag)}</span><span>${escapeHtml(r.faktor)}</span></div>`).join('')}
        ${s.note ? `<div class="note">${escapeHtml(s.note)}</div>` : ''}
      </div>
    </div>
  `;
}

function slideMirror(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Samtaleteknik</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      ${s.body ? `<p class="lede-body">${escapeHtml(s.body)}</p>` : ''}
      ${s.examples ? `<div class="s-examples">${s.examples.map(e => `<div class="ex">${escapeHtml(e)}</div>`).join('')}</div>` : ''}
    </div>
  `;
}

function slideFourStep(s) {
  return `
    <div class="s-slide">
      ${slideMetaBar(s.title)}
      <div class="s-slide-eyebrow">Flow</div>
      <h1 class="lede">${escapeHtml(s.title)}</h1>
      <div class="s-four-step">
        ${s.steps.map(st => `
          <div class="step">
            <span class="tag">${escapeHtml(st.tag)}</span>
            <div class="body">${escapeHtml(st.body)}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ---------- QUESTION ---------- */
function renderQuestion(q, idx, total) {
  const answered = PLAYER.answers[q.id];
  const totalCorrect = PLAYER.correct;
  const correctSoFar = String(totalCorrect).padStart(2,'0');
  const totalSoFar = String(idx + (answered != null ? 1 : 0)).padStart(2,'0');

  return `
    <div class="s-quiz-card">
      <div class="s-quiz-eyebrow">
        <div class="left">
          <span class="pill">Spørgsmål ${String(idx+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}</span>
          <strong>${escapeHtml(PLAYER.module.title)}</strong>
        </div>
        <span>Vælg ét svar</span>
      </div>
      <h2 class="s-quiz-q">${escapeHtml(q.q)}</h2>
      <div class="s-quiz-opts">
        ${q.options.map((opt, i) => {
          let cls = '';
          let statusText = '';
          if (answered != null) {
            if (i === q.correct) { cls = 'correct'; statusText = '✓ Korrekt'; }
            if (i === answered && i !== q.correct) { cls = 'wrong'; statusText = '× Dit svar'; }
          }
          const letter = String.fromCharCode(65 + i);
          return `
            <button class="s-quiz-opt ${cls}" ${answered != null ? 'disabled' : `onclick="playerAnswer('${q.id}', ${i})"`}>
              <span class="letter">${letter}</span>
              <span>${escapeHtml(opt)}</span>
              <span class="status">${statusText}</span>
            </button>
          `;
        }).join('')}
      </div>
      ${answered != null ? `
        <div class="s-quiz-feedback ${answered === q.correct ? 'right' : 'wrong'}">
          <div class="lbl">Forklaring —</div>
          <div class="body">${escapeHtml(q.explanation)}</div>
        </div>
      ` : ''}
      <div class="s-quiz-foot">
        <span style="font-size:12px;color:var(--pm-mute);letter-spacing:0.06em;text-transform:uppercase;font-weight:500">Score så langt: ${correctSoFar} / ${totalSoFar}</span>
        ${answered != null
          ? `<button class="s-btn s-btn-ink s-btn-arrow" onclick="playerNext()">Næste</button>`
          : `<span style="font-size:12px;color:var(--pm-mute)">Klik et svar — du kan ikke ændre det bagefter</span>`}
      </div>
    </div>
  `;
}

function recomputeCorrect() {
  PLAYER.correct = Object.entries(PLAYER.answers).reduce((sum, [qid, ans]) => {
    const q = PLAYER.module.questions.find(x => x.id === qid);
    return sum + (q && ans === q.correct ? 1 : 0);
  }, 0);
}

window.playerAnswer = function (qId, idx) {
  recordStepTime();
  PLAYER.answers[qId] = idx;
  recomputeCorrect();
  const s = currentSession();
  setModuleProgress(s.email, PLAYER.module.id, {
    quizAnswers: PLAYER.answers,
    score: PLAYER.correct,
    total: PLAYER.module.questions.length
  });
  renderPlayer();
};

/* ---------- REFLECTIONS ---------- */
function renderReflections() {
  const reflections = PLAYER.module.reflections || [];
  return `
    <div class="s-slide">
      ${slideMetaBar('Refleksion')}
      <div class="s-slide-eyebrow">Refleksion</div>
      <h1 class="lede">Tag et øjeblik.</h1>
      <p class="lede-body">Skriv kort. Det er ikke en eksamen — det er for din egen skyld og for vores forståelse af, hvordan onboardingen fungerer.</p>
      <div style="margin-top:28px;display:flex;flex-direction:column;gap:12px">
        ${reflections.map(r => `
          <div class="s-refl-card">
            <label for="ref-${r.id}">${escapeHtml(r.prompt)}</label>
            <textarea id="ref-${r.id}" placeholder="Skriv her...">${escapeHtml(PLAYER.reflections[r.id] || '')}</textarea>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.playerSubmitReflection = function () {
  const reflections = PLAYER.module.reflections || [];
  reflections.forEach(r => {
    const v = document.getElementById('ref-' + r.id)?.value.trim();
    if (v) PLAYER.reflections[r.id] = v;
  });
  const s = currentSession();
  setModuleProgress(s.email, PLAYER.module.id, { reflections: PLAYER.reflections });
  playerNext();
};

/* ---------- SUMMARY ---------- */
function renderSummary() {
  const total = PLAYER.module.questions.length;
  const score = PLAYER.correct;
  const pct = total ? Math.round((score / total) * 100) : 100;
  const totalTime = PLAYER.timings?.totalActiveMs || 0;
  const slidesSeen = PLAYER.seenSlides.size;
  const totalSlides = PLAYER.module.slides.length;
  const refCount = Object.keys(PLAYER.reflections).filter(k => PLAYER.reflections[k]).length;

  let line = '';
  if (total === 0) line = 'Modulet er gennemført. Solidt arbejde.';
  else if (pct >= 90) line = 'Fantastisk. Du har styr på det.';
  else if (pct >= 70) line = 'Solid. Vend evt. tilbage til de spørgsmål du fik forkert.';
  else line = 'Tag gerne modulet igen — særligt de slides der hører til de forkerte svar.';

  if (!PLAYER.summaryWritten) {
    const s = currentSession();
    setModuleProgress(s.email, PLAYER.module.id, {
      complete: true,
      score: PLAYER.correct,
      total,
      completedAt: Date.now(),
      slidesSeen: PLAYER.module.slides.length,
      quizAnswers: PLAYER.answers,
      reflections: PLAYER.reflections
    });
    PLAYER.summaryWritten = true;
  }

  const s = currentSession();
  const firstName = s.name?.split(' ')[0] || 'der';

  // figure out next module
  const c = getContent();
  let nextMod = null;
  if (s.role === 'admin') {
    const all = Object.values(c.modules).sort((a, b) => a.order - b.order);
    const idx = all.findIndex(m => m.id === PLAYER.module.id);
    if (idx >= 0 && idx < all.length - 1) nextMod = all[idx + 1];
  } else {
    const track = c.tracks[s.role];
    if (track) {
      const list = track.modules.map(id => c.modules[id]).filter(Boolean);
      const idx = list.findIndex(m => m.id === PLAYER.module.id);
      if (idx >= 0 && idx < list.length - 1) nextMod = list[idx + 1];
    }
  }

  return `
    <div class="s-player-head">
      <div class="s-crumb">
        <button class="s-back" aria-label="Tilbage" onclick="navigate('/')">←</button>
        <span>MODUL ${String(PLAYER.module.order).padStart(2,'0')} · Færdig</span>
      </div>
      <div class="s-title-line">
        <span class="num">RESULTAT</span>
        <span class="name">Du gjorde det.</span>
      </div>
      <div class="s-step-counter"><span style="color:var(--pm-green)">●</span> Bestået</div>
    </div>
    <div class="s-summary-hero">
      <div class="eb">Modul ${String(PLAYER.module.order).padStart(2,'0')} · ${escapeHtml(PLAYER.module.title)} — gennemført</div>
      <h1>Godt klaret,<br><em>${escapeHtml(firstName)}.</em></h1>
      <p class="body">${escapeHtml(line)}</p>
      <div class="actions">
        ${nextMod
          ? `<button class="s-btn s-btn-ink s-btn-arrow" onclick="navigate('/module/${nextMod.id}')">Næste modul — ${escapeHtml(nextMod.title)}</button>`
          : `<button class="s-btn s-btn-ink s-btn-arrow" onclick="navigate('/')">Tilbage til oversigten</button>`}
        <button class="s-btn s-btn-soft" onclick="navigate('/module/${PLAYER.module.id}')">Tag igen</button>
      </div>
    </div>
    <div class="s-summary-grid">
      ${total > 0 ? `
        <div class="s-summary-cell">
          <div class="lbl">Quiz-score</div>
          <div class="num">${pct}<small>%</small></div>
          <div class="sub">${score} af ${total} rigtige</div>
        </div>` : ''}
      <div class="s-summary-cell">
        <div class="lbl">Tid brugt</div>
        <div class="num">${totalTime > 0 ? formatDurationShort(totalTime) : '—'}</div>
        <div class="sub">aktivt på modulet</div>
      </div>
      <div class="s-summary-cell">
        <div class="lbl">Slides set</div>
        <div class="num">${slidesSeen}<small>/${totalSlides}</small></div>
        <div class="sub">${slidesSeen === totalSlides ? 'Alle læst — ingen oversprunget' : 'Ikke alle læst'}</div>
      </div>
      ${PLAYER.module.reflections?.length ? `
        <div class="s-summary-cell">
          <div class="lbl">Refleksion</div>
          <div class="num" style="font-size:32px;line-height:1.1">${refCount > 0 ? 'Indsendt' : 'Sprunget over'}</div>
          <div class="sub">${refCount}/${PLAYER.module.reflections.length} prompter besvaret</div>
        </div>
      ` : ''}
    </div>
  `;
}

window.playerFinish = function () {
  navigate('/');
};

/* ============================================================
   ROUTE: MANAGER DASHBOARD
   ============================================================ */
route('/manager', () => {
  if (!isAdmin()) return navigate('/');
  renderManager();
});
route('/manager/:email', ({ email }) => {
  if (!isAdmin()) return navigate('/');
  renderManager(email);
});

function renderManager(detailEmail = null) {
  const c = getContent();
  const users = load(STORAGE.USERS, {});
  const trainees = Object.entries(users).filter(([e]) => e !== ADMIN_EMAIL);

  let totalCount = 0, totalCompleted = 0, totalScoreSum = 0, totalScoreN = 0;
  let traineesInProgress = 0;
  trainees.forEach(([email, u]) => {
    const track = c.tracks[u.role];
    if (!track) return;
    const modules = track.modules.map(id => c.modules[id]).filter(Boolean);
    const p = getProgress(email);
    let userCompleted = 0;
    modules.forEach(m => {
      if (p[m.id]?.complete) { userCompleted++; totalCompleted++; }
      totalCount++;
      const mp = p[m.id];
      if (mp?.complete && mp.total) {
        totalScoreSum += (mp.score / mp.total);
        totalScoreN++;
      }
    });
    if (userCompleted > 0) traineesInProgress++;
  });
  const completionPct = totalCount ? Math.round((totalCompleted / totalCount) * 100) : 0;
  const avgScore = totalScoreN ? Math.round((totalScoreSum / totalScoreN) * 100) : 0;
  const sparkPath = "M0,18 L20,14 L40,16 L60,10 L80,12 L100,6 L120,8 L140,4 L160,6 L180,2";

  render(`
    ${topbar('manager')}
    <div class="s-dash">
      <div class="s-dash-hero">
        <div class="s-dash-hero-top">
          <span>${trainees.length} trainees · 4 tracks</span>
          <span>Uge ${getISOWeek()} / ${new Date().getFullYear()}</span>
        </div>
        <h1>${trainees.length} nye<br>stemmer i <em>røret.</em></h1>
      </div>

      <div class="s-kpi-row">
        <div class="s-kpi accent">
          <div class="lbl">Aktive trainees</div>
          <div class="num">${String(trainees.length).padStart(2,'0')}</div>
          <div class="delta up">↑ I gang i denne uge</div>
        </div>
        <div class="s-kpi">
          <div class="lbl">Gennemførselsrate</div>
          <div class="num">${completionPct}<small>%</small></div>
          <svg viewBox="0 0 180 22" class="s-spark" preserveAspectRatio="none">
            <path d="${sparkPath}" stroke="var(--pm-ink)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="180" cy="2" r="3" fill="var(--pm-ink)"/>
          </svg>
          <div class="delta up">${totalCompleted}/${totalCount} moduler i alt</div>
        </div>
        <div class="s-kpi">
          <div class="lbl">Quiz-snit</div>
          <div class="num">${avgScore}<small>%</small></div>
          <div class="delta flat">— på tværs af moduler</div>
        </div>
        <div class="s-kpi">
          <div class="lbl">I gang</div>
          <div class="num">${String(traineesInProgress).padStart(2,'0')}</div>
          <div class="delta flat">trainees aktive</div>
        </div>
      </div>

      <div class="s-dash-section">
        <div class="s-dash-section-head">
          <h2>Alle trainees</h2>
          <div class="filters">
            <span class="chip active">Alle</span>
            <span class="chip">På sporet</span>
            <span class="chip">Bør følges</span>
            <span class="chip">Bagud</span>
          </div>
        </div>
        <div class="s-tt-head">
          <div>№</div>
          <div>Navn</div>
          <div>Aktuelt modul</div>
          <div>Fremgang</div>
          <div>Quiz-snit</div>
          <div></div>
        </div>
        <div class="s-tt">
          ${trainees.length === 0
            ? `<div class="s-empty">Ingen trainees endnu. Tilføj dem ved at få dem til at logge ind med deres mail.</div>`
            : trainees.map(([email, u], i) => traineeRowHTML(email, u, c, i)).join('')}
        </div>
      </div>
    </div>
    ${detailEmail && users[detailEmail] ? renderTraineeDrawer(detailEmail, users[detailEmail], c) : ''}
  `);
}

function getISOWeek() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function traineeRowHTML(email, user, c, idx) {
  const track = c.tracks[user.role];
  const trackLabel = track ? track.label : '—';
  const modules = track ? track.modules.map(id => c.modules[id]).filter(Boolean) : [];
  const p = getProgress(email);
  const completed = modules.filter(m => p[m.id]?.complete).length;
  const pct = modules.length ? Math.round((completed / modules.length) * 100) : 0;

  // Find current module
  let currentModule = null;
  let currentSlideInfo = '';
  for (const m of modules) {
    if (!p[m.id]?.complete) {
      currentModule = m;
      const mp = p[m.id];
      currentSlideInfo = mp?.slidesSeen ? `kap. ${mp.slidesSeen} af ${m.slides.length}` : 'ikke startet';
      break;
    }
  }
  if (!currentModule) {
    currentModule = modules[modules.length - 1];
    currentSlideInfo = 'alle moduler færdige';
  }

  let totalScore = 0, totalQ = 0;
  modules.forEach(m => {
    const mp = p[m.id];
    if (mp?.complete && mp.total) { totalScore += mp.score; totalQ += mp.total; }
  });
  const scorePct = totalQ ? Math.round((totalScore / totalQ) * 100) : null;
  const scoreCls = scorePct == null ? '' : scorePct >= 80 ? 'high' : scorePct < 60 ? 'low' : '';
  const initials = user.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();

  return `
    <div class="s-trow" onclick="navigate('/manager/${encodeURIComponent(email)}')">
      <div class="idx">${String(idx+1).padStart(2,'0')}</div>
      <div class="person">
        <div class="pavatar">${initials}</div>
        <div>
          <div class="pname">${escapeHtml(user.name)}</div>
          <div class="prole">${escapeHtml(trackLabel)} · ${escapeHtml(email)}</div>
        </div>
      </div>
      <div>
        <div class="pmod-now">${escapeHtml(currentModule ? currentModule.title : '—')}</div>
        <div class="pmod-stub">${escapeHtml(currentSlideInfo)}</div>
      </div>
      <div class="pbar">
        <div class="b"><div class="f" style="width:${pct}%"></div></div>
        <div class="pbar-meta">
          <span>${completed}/${modules.length}</span>
          <span>${pct}%</span>
        </div>
      </div>
      <div class="pscore ${scoreCls}">
        ${scorePct != null ? `${scorePct}<span class="of">%</span>` : '<span class="of">—</span>'}
      </div>
      <div class="pend"><span style="color:var(--pm-mute)">→</span></div>
    </div>
  `;
}

function renderTraineeDrawer(email, user, c) {
  const track = c.tracks[user.role];
  const modules = track ? track.modules.map(id => c.modules[id]).filter(Boolean) : [];
  const p = getProgress(email);
  const initials = user.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase();

  // metrics
  const completedCount = modules.filter(m => p[m.id]?.complete).length;
  const startedCount = modules.filter(m => p[m.id]?.slidesSeen > 0).length;

  let totalAnswered = 0, totalRight = 0;
  modules.forEach(m => {
    const mp = p[m.id];
    if (mp?.quizAnswers) {
      Object.entries(mp.quizAnswers).forEach(([qid, ans]) => {
        const q = m.questions.find(x => x.id === qid);
        if (q) { totalAnswered++; if (ans === q.correct) totalRight++; }
      });
    }
  });
  const accuracy = totalAnswered ? Math.round((totalRight / totalAnswered) * 100) : null;

  const allReflections = [];
  modules.forEach(m => {
    const mp = p[m.id];
    if (!mp?.reflections) return;
    Object.entries(mp.reflections).forEach(([rid, text]) => {
      if (!text) return;
      const ref = m.reflections?.find(r => r.id === rid);
      if (ref) {
        allReflections.push({
          moduleTitle: m.title, prompt: ref.prompt, text,
          wordCount: text.trim().split(/\s+/).filter(Boolean).length
        });
      }
    });
  });

  const wrongAnswers = [];
  modules.forEach(m => {
    const mp = p[m.id];
    if (!mp?.quizAnswers) return;
    m.questions.forEach(q => {
      const ans = mp.quizAnswers[q.id];
      if (ans != null && ans !== q.correct) {
        wrongAnswers.push({ moduleTitle: m.title, q, theirAnswer: ans });
      }
    });
  });

  let lastActivity = null;
  Object.values(p).forEach(mp => {
    if (mp.completedAt && (!lastActivity || mp.completedAt > lastActivity)) lastActivity = mp.completedAt;
  });
  const lastActivityLabel = lastActivity ? timeAgo(lastActivity) : 'Ikke startet';
  const joinedDays = user.createdAt ? Math.max(1, Math.floor((Date.now() - user.createdAt) / 86400000)) : null;
  const joinedLabel = joinedDays != null ? `${joinedDays} ${joinedDays === 1 ? 'dag' : 'dage'}` : '—';

  let totalActiveMs = 0;
  modules.forEach(m => {
    const t = p[m.id]?.timings;
    if (t?.totalActiveMs) totalActiveMs += t.totalActiveMs;
  });

  const overallStatus = completedCount === modules.length && modules.length > 0
    ? 'Gennemført alle moduler'
    : startedCount === 0
      ? 'Ikke startet endnu'
      : `${completedCount} af ${modules.length} moduler gennemført`;

  // engagement cards (per module that has timings)
  const engCards = modules
    .filter(m => {
      const t = p[m.id]?.timings;
      return t && (t.totalActiveMs || Object.keys(t.slides || {}).length || Object.keys(t.questions || {}).length);
    })
    .map(m => engagementCardHTML(m, p[m.id], p[m.id].timings))
    .join('');

  return `
    <div class="s-drawer-scrim open" onclick="navigate('/manager')"></div>
    <aside class="s-drawer open">
      <button class="s-drawer-close" onclick="navigate('/manager')" aria-label="Luk">✕</button>

      <header class="s-drawer-header">
        <div class="avatar-xl">${initials}</div>
        <div class="meta">
          <span class="role-badge">${escapeHtml(track ? track.label : 'Ukendt rolle')}</span>
          <h2>${escapeHtml(user.name)}</h2>
          <div class="email-line">${escapeHtml(email)}</div>
        </div>
        <div class="stats-col">
          <div><span class="lbl">På PowerMatch</span><strong>${joinedLabel}</strong></div>
          <div><span class="lbl">Sidst aktiv</span><strong>${escapeHtml(lastActivityLabel)}</strong></div>
        </div>
      </header>

      <section class="s-dr-kpis s-dr-kpis-5">
        <div class="s-dr-kpi accent">
          <div class="lbl">Moduler</div>
          <div class="num">${completedCount}<small style="font-size:18px;color:rgba(0,0,0,0.45)">/${modules.length}</small></div>
        </div>
        <div class="s-dr-kpi">
          <div class="lbl">Quiz-præcision</div>
          <div class="num">${accuracy != null ? accuracy + '%' : '—'}</div>
        </div>
        <div class="s-dr-kpi">
          <div class="lbl">Total tid</div>
          <div class="num">${totalActiveMs > 0 ? formatDurationShort(totalActiveMs) : '—'}</div>
        </div>
        <div class="s-dr-kpi">
          <div class="lbl">Spørgsmål rigtigt</div>
          <div class="num">${totalRight}/${totalAnswered || 0}</div>
        </div>
        <div class="s-dr-kpi">
          <div class="lbl">Refleksioner</div>
          <div class="num">${allReflections.length}</div>
        </div>
      </section>

      <section class="s-dr-block">
        <h3>Track-fremgang · <span style="color:var(--pm-ink);font-weight:600">${escapeHtml(overallStatus)}</span></h3>
        <div class="s-dr-timeline">
          ${modules.map((m, i) => {
            const mp = p[m.id];
            const status = mp?.complete ? 'done' : (mp?.slidesSeen > 0 ? 'now' : 'locked');
            const sub = mp?.complete
              ? (mp.total ? `${mp.score}/${mp.total} korrekte` : 'Gennemført')
              : (mp?.slidesSeen ? `${mp.slidesSeen}/${m.slides.length} slides` : 'Ikke startet');
            return `
              <div class="s-dr-tl-step ${status}">
                <div class="dot"></div>
                <div class="line"></div>
                <div class="lbl">${escapeHtml(m.title)}</div>
                <div class="sub">${escapeHtml(sub)}</div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <section class="s-dr-block">
        <h3>Modul-detaljer</h3>
        ${modules.map(m => {
          const mp = p[m.id];
          const totalSlides = m.slides.length;
          const slidesSeen = mp?.slidesSeen || 0;
          const slidePct = Math.round((slidesSeen / Math.max(1, totalSlides)) * 100);
          const score = mp?.score || 0;
          const total = mp?.total || 0;
          const qPct = total ? Math.round((score / total) * 100) : 0;
          const moduleTime = mp?.timings?.totalActiveMs || 0;
          return `
            <div class="s-dr-mod">
              <div class="s-dr-mod-head">
                <div class="name"><span class="idx-num">MODUL ${String(m.order).padStart(2,'0')}</span>${escapeHtml(m.title)}</div>
                ${moduleTime > 0 ? `<span style="font-family:var(--f-mono);font-size:11px;color:var(--pm-mute)">${formatDuration(moduleTime)}</span>` : ''}
              </div>
              <div class="s-dr-mod-metrics">
                <div class="s-dr-mod-metric">
                  <div class="lbl">Slides set</div>
                  <div class="row">
                    <div class="bar"><div class="f" style="width:${slidePct}%"></div></div>
                    <div class="v">${slidesSeen}/${totalSlides}</div>
                  </div>
                </div>
                <div class="s-dr-mod-metric">
                  <div class="lbl">Quiz</div>
                  <div class="row">
                    <div class="bar"><div class="f" style="width:${qPct}%;background:${qPct >= 80 ? 'var(--pm-green)' : qPct < 60 && total ? 'var(--pm-red)' : 'var(--pm-ink)'}"></div></div>
                    <div class="v">${total ? `${score}/${total}` : `0/${m.questions.length}`}</div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </section>

      ${engCards ? `
        <section class="s-dr-block">
          <h3>Tid og engagement <span style="color:var(--pm-mute);font-weight:500">· Sekund-præcis</span></h3>
          <div class="s-eng-legend">
            <span><span class="swatch" style="background:var(--pm-ink)"></span>Slide</span>
            <span><span class="swatch" style="background:var(--pm-green)"></span>Spørgsmål rigtigt</span>
            <span><span class="swatch" style="background:var(--pm-red)"></span>Spørgsmål forkert</span>
            <span style="color:var(--pm-mute)">Bjælkens højde = tid brugt</span>
          </div>
          ${engCards}
        </section>
      ` : ''}

      ${wrongAnswers.length > 0 ? `
        <section class="s-dr-block">
          <h3>Skal repeteres · <span style="color:var(--pm-red);font-weight:600">${wrongAnswers.length}</span></h3>
          ${wrongAnswers.map(w => `
            <div class="s-review">
              <span class="mod-tag">${escapeHtml(w.moduleTitle)}</span>
              <div class="q">${escapeHtml(w.q.q)}</div>
              <div class="answer-row bad">
                <span class="ind">✗</span>
                <div><span class="label">Svarede</span>${escapeHtml(w.q.options[w.theirAnswer])}</div>
              </div>
              <div class="answer-row good">
                <span class="ind">✓</span>
                <div><span class="label">Korrekt</span>${escapeHtml(w.q.options[w.q.correct])}</div>
              </div>
              <div class="explain">${escapeHtml(w.q.explanation)}</div>
            </div>
          `).join('')}
        </section>
      ` : ''}

      <section class="s-dr-block">
        <h3>Refleksioner · ${allReflections.length}</h3>
        ${allReflections.length === 0
          ? `<div class="s-empty">Ingen refleksioner skrevet endnu.</div>`
          : allReflections.map(a => `
            <div class="s-refl-item">
              <div class="meta">
                <span>${escapeHtml(a.moduleTitle)}</span>
                <span class="wc">${a.wordCount} ord</span>
              </div>
              <div class="prompt">${escapeHtml(a.prompt)}</div>
              <div class="text">${escapeHtml(a.text)}</div>
            </div>
          `).join('')}
      </section>

      <section class="s-dr-block">
        <h3>Alle quiz-svar</h3>
        ${(() => {
          const blocks = [];
          modules.forEach(m => {
            const mp = p[m.id];
            if (!mp?.quizAnswers || Object.keys(mp.quizAnswers).length === 0) return;
            let modRight = 0, modTotal = 0;
            const items = m.questions.map(q => {
              const ans = mp.quizAnswers[q.id];
              if (ans == null) return null;
              modTotal++;
              const ok = ans === q.correct;
              if (ok) modRight++;
              return `
                <div class="s-qlog-item ${ok ? 'ok' : 'no'}">
                  <span class="ind">${ok ? '✓' : '✗'}</span>
                  <div>
                    <div>${escapeHtml(q.q)}</div>
                    <div class="their">Svarede: ${escapeHtml(q.options[ans])}</div>
                  </div>
                </div>
              `;
            }).filter(Boolean).join('');
            const pct = modTotal ? Math.round((modRight / modTotal) * 100) : 0;
            const scoreCls = pct >= 80 ? 'high' : pct < 60 ? 'low' : '';
            blocks.push(`
              <div class="s-qlog-mod">
                <h4>
                  <span>${escapeHtml(m.title)}</span>
                  <span class="score ${scoreCls}">${modRight}/${modTotal} · ${pct}%</span>
                </h4>
                ${items}
              </div>
            `);
          });
          return blocks.length ? blocks.join('') : `<div class="s-empty">Ingen quiz-svar endnu.</div>`;
        })()}
      </section>
    </aside>
  `;
}

/* ---------- engagement card helper ---------- */
function engagementCardHTML(m, mp, t) {
  const SKIM_THRESHOLD = 5000;
  const FAST_Q_THRESHOLD = 3500;
  const STRIP_HEIGHT = 56;

  const slideEntries = Object.entries(t.slides || {})
    .map(([i, ms]) => ({ i: parseInt(i, 10), ms }))
    .sort((a, b) => a.i - b.i);
  const questionEntries = m.questions.map(q => {
    const ms = t.questions?.[q.id] || 0;
    const ans = mp.quizAnswers?.[q.id];
    const answered = ans != null;
    const correct = answered && ans === q.correct;
    return { q, ms, answered, correct };
  }).filter(e => e.ms > 0);

  const maxMs = Math.max(...slideEntries.map(s => s.ms), ...questionEntries.map(q => q.ms), 1);
  const slideTotal = slideEntries.reduce((s, e) => s + e.ms, 0);
  const slideAvg = slideEntries.length ? slideTotal / slideEntries.length : 0;
  const qTotal = questionEntries.reduce((s, e) => s + e.ms, 0);
  const qAvg = questionEntries.length ? qTotal / questionEntries.length : 0;
  const reflectionMs = t.reflection || 0;

  let badge = { cls: 'idle', label: 'Ikke nok data' };
  if (slideEntries.length >= 3) {
    if (slideAvg >= 18000) badge = { cls: 'good', label: 'Grundig' };
    else if (slideAvg >= 9000) badge = { cls: 'mid', label: 'Solid' };
    else badge = { cls: 'warn', label: 'Hurtig' };
  }

  const flags = [];
  const skimmedCount = slideEntries.filter(e => e.ms < SKIM_THRESHOLD).length;
  const fastQs = questionEntries.filter(e => e.ms < FAST_Q_THRESHOLD).length;
  const fastWrongQs = questionEntries.filter(e => e.ms < FAST_Q_THRESHOLD && e.answered && !e.correct).length;
  if (skimmedCount > 0) flags.push({ cls: 'warn', text: `${skimmedCount} ${skimmedCount === 1 ? 'slide' : 'slides'} skimmet (< ${SKIM_THRESHOLD/1000}s)` });
  if (fastWrongQs > 0) flags.push({ cls: 'warn', text: `${fastWrongQs} hurtige forkerte svar — sandsynligvis gæt` });
  else if (fastQs > 0) flags.push({ cls: 'warn', text: `${fastQs} hurtige svar (< ${FAST_Q_THRESHOLD/1000}s)` });
  if (slideEntries.length >= 5 && skimmedCount === 0 && slideAvg >= 18000) flags.push({ cls: 'good', text: 'Læser grundigt igennem' });
  if (reflectionMs >= 90000) flags.push({ cls: 'good', text: 'Tager refleksionen alvorligt' });
  else if (reflectionMs > 0 && reflectionMs < 30000) flags.push({ cls: 'warn', text: 'Kort tid på refleksionen' });

  const slideBars = slideEntries.map(e => {
    const h = Math.max(8, Math.round((e.ms / maxMs) * STRIP_HEIGHT));
    const skim = e.ms < SKIM_THRESHOLD;
    return `<div class="s-eng-bar ${skim ? 'skim' : ''}" style="height:${h}px">
      <span class="tip">Slide ${e.i + 1}: ${formatDurationShort(e.ms)}${skim ? ' · skimmet' : ''}</span>
    </div>`;
  }).join('');
  const questionBars = questionEntries.map((e, idx) => {
    const h = Math.max(8, Math.round((e.ms / maxMs) * STRIP_HEIGHT));
    const cls = e.answered ? (e.correct ? 'q-ok' : 'q-no') : '';
    const fast = e.ms < FAST_Q_THRESHOLD;
    return `<div class="s-eng-bar ${cls} ${fast ? 'skim' : ''}" style="height:${h}px">
      <span class="tip">Spørgsmål ${idx + 1}: ${formatDurationShort(e.ms)}${e.answered ? (e.correct ? ' · korrekt' : ' · forkert') : ''}</span>
    </div>`;
  }).join('');

  const strip = (slideBars || questionBars) ? `
    <div class="s-eng-strip">
      ${slideBars}
      ${slideBars && questionBars ? '<div class="s-eng-bar divider"></div>' : ''}
      ${questionBars}
    </div>
  ` : '';

  return `
    <div class="s-eng-card">
      <div class="head">
        <strong>${escapeHtml(m.title)}</strong>
        <span class="s-eng-badge ${badge.cls}">${badge.label}</span>
      </div>
      <div class="totals">
        <span>Total<strong>${formatDuration(t.totalActiveMs || 0)}</strong></span>
        ${slideEntries.length ? `<span>Snit pr. slide<strong>${formatDurationShort(slideAvg)}</strong></span>` : ''}
        ${questionEntries.length ? `<span>Snit pr. spørgsmål<strong>${formatDurationShort(qAvg)}</strong></span>` : ''}
        ${reflectionMs ? `<span>Refleksion<strong>${formatDurationShort(reflectionMs)}</strong></span>` : ''}
      </div>
      ${strip}
      ${flags.length ? `
        <div class="s-eng-flags">
          ${flags.map(f => `<span class="flag ${f.cls}">${escapeHtml(f.text)}</span>`).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

/* ============================================================
   ROUTE: AUTHORING LAYER
   ============================================================ */
route('/author', () => {
  if (!isAdmin()) return navigate('/');
  const c = getContent();
  const firstId = Object.keys(c.modules)[0];
  navigate('/author/' + firstId);
});
route('/author/:id', ({ id }) => {
  if (!isAdmin()) return navigate('/');
  renderAuthor(id);
});

function renderAuthor(activeId) {
  const c = getContent();
  const overrides = load(STORAGE.CONTENT_OVERRIDES, {});
  const module = c.modules[activeId];
  if (!module) return navigate('/author');
  const tracksList = Object.values(c.tracks);

  render(`
    ${topbar('author')}
    <div class="s-auth">
      <aside class="s-auth-side">
        ${tracksList.map(t => `
          <div class="group">
            <h4>${escapeHtml(t.label)}</h4>
            ${t.modules.map(mid => {
              const m = c.modules[mid]; if (!m) return '';
              const isActive = mid === activeId;
              const isOverridden = !!overrides[mid];
              return `
                <button class="s-auth-tree-item ${isActive ? 'active' : ''}" onclick="navigate('/author/${mid}')">
                  <span class="n">${String(m.order).padStart(2,'0')}</span>
                  <span>${escapeHtml(m.title)}</span>
                  <span class="ind">${isOverridden ? 'EDIT' : ''}</span>
                </button>
              `;
            }).join('')}
          </div>
        `).join('')}
      </aside>

      <main class="s-auth-main">
        <div class="s-auth-main-head">
          <div>
            <div class="title">MODUL ${String(module.order).padStart(2,'0')} · INDHOLD</div>
            <h2>${escapeHtml(module.title)}</h2>
          </div>
          <div class="s-auth-actions">
            <span class="s-auth-status">Auto-gem</span>
            <button class="s-btn s-btn-soft" onclick="resetAuthor('${activeId}')">Nulstil</button>
            <button class="s-btn s-btn-ink" onclick="saveAuthor('${activeId}')">Gem</button>
          </div>
        </div>

        <div class="s-ed-block focus">
          <div class="s-ed-block-head">
            <div class="s-ed-block-tag"><span class="n">META</span> Modul-information</div>
          </div>
          <input id="author-title" class="s-ed-input" value="${escapeHtml(module.title)}" placeholder="Modul-titel" />
          <input id="author-subtitle" class="s-ed-input" style="font-size:16px;font-weight:500;color:var(--pm-mute)" value="${escapeHtml(module.subtitle || '')}" placeholder="Undertitel" />
        </div>

        <div style="margin-top:32px">
          <h3 style="font-family:var(--f-mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--pm-mute);margin-bottom:14px">Spørgsmål</h3>
          <div id="questions-editor">
            ${module.questions.map((q, i) => questionEditorHTML(q, i)).join('')}
          </div>
          <div class="s-add-row">
            <button class="s-add-btn" onclick="addQuestion()">
              <span class="ico">+</span>
              <span>Tilføj spørgsmål</span>
            </button>
          </div>
        </div>

        <div style="margin-top:32px">
          <h3 style="font-family:var(--f-mono);font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:var(--pm-mute);margin-bottom:14px">Refleksionsprompter</h3>
          <div id="reflections-editor">
            ${(module.reflections || []).map((r, i) => reflectionEditorHTML(r, i)).join('')}
          </div>
          <div class="s-add-row">
            <button class="s-add-btn" onclick="addReflection()">
              <span class="ico">+</span>
              <span>Tilføj refleksion</span>
            </button>
          </div>
        </div>
      </main>

      <aside class="s-auth-right">
        <h4>Inspector</h4>
        <div class="s-insp-block">
          <div class="s-insp-row"><span class="k">Modul</span><span class="v">№ ${String(module.order).padStart(2,'0')}</span></div>
          <div class="s-insp-row"><span class="k">Track</span><span class="v">${escapeHtml((c.tracks[module.track] || { label: module.track }).label || module.track)}</span></div>
          <div class="s-insp-row"><span class="k">Slides</span><span class="v">${module.slides.length}</span></div>
          <div class="s-insp-row"><span class="k">Spørgsmål</span><span class="v">${module.questions.length}</span></div>
          <div class="s-insp-row"><span class="k">Refleksioner</span><span class="v">${module.reflections?.length || 0}</span></div>
          <div class="s-insp-row"><span class="k">Varighed</span><span class="v">${escapeHtml(module.duration || '—')}</span></div>
        </div>
        <div class="s-insp-block">
          <h4 style="margin-bottom:12px">Tilstand</h4>
          <div style="font-size:12px;color:var(--pm-mute);line-height:1.55">
            ${overrides[activeId] ? 'Modulet har lokale ændringer. Klik <strong style="color:var(--pm-ink)">Gem</strong> for at lægge dem live, eller <strong style="color:var(--pm-ink)">Nulstil</strong> for at gå tilbage til original.' : 'Modulet er som standard. Dine ændringer gemmes lokalt indtil du klikker Gem.'}
          </div>
        </div>
      </aside>
    </div>
  `);
}

function questionEditorHTML(q, idx) {
  return `
    <div class="s-ed-block" data-qidx="${idx}">
      <div class="s-ed-block-head">
        <div class="s-ed-block-tag"><span class="n">Q${String(idx+1).padStart(2,'0')}</span> Spørgsmål ${idx+1}</div>
        <div class="s-ed-block-actions">
          <button onclick="removeQuestion(${idx})" style="color:var(--pm-red)">Slet</button>
        </div>
      </div>
      <textarea data-field="q" rows="2" class="s-ed-input" style="font-family:var(--f-display);font-weight:600;font-size:22px;letter-spacing:-0.02em;line-height:1.2;resize:none">${escapeHtml(q.q)}</textarea>
      ${[0,1,2].map(i => `
        <div class="s-ed-opt">
          <input type="radio" name="correct-${idx}" ${q.correct === i ? 'checked' : ''} data-correct="${i}" />
          <span class="letter">${String.fromCharCode(65+i)}</span>
          <input type="text" data-field="opt-${i}" value="${escapeHtml(q.options[i] || '')}" placeholder="Svarmulighed" />
          <span class="correct-tag">${q.correct === i ? '✓ Korrekt' : ''}</span>
        </div>
      `).join('')}
      <div class="s-ed-explanation">
        <div class="lbl">Forklaring (vises efter svar)</div>
        <textarea data-field="explanation" rows="3">${escapeHtml(q.explanation)}</textarea>
      </div>
    </div>
  `;
}

function reflectionEditorHTML(r, idx) {
  return `
    <div class="s-ed-block" data-ridx="${idx}">
      <div class="s-ed-block-head">
        <div class="s-ed-block-tag"><span class="n">R${String(idx+1).padStart(2,'0')}</span> Refleksion ${idx+1}</div>
        <div class="s-ed-block-actions">
          <button onclick="removeReflection(${idx})" style="color:var(--pm-red)">Slet</button>
        </div>
      </div>
      <input type="text" data-rfield="prompt" class="s-ed-input" style="font-size:18px" value="${escapeHtml(r.prompt)}" placeholder="Refleksionsprompt..." />
    </div>
  `;
}

window.addQuestion = function () {
  const wrap = document.getElementById('questions-editor');
  const idx = wrap.children.length;
  const q = { id: 'new' + Date.now(), q: '', options: ['', '', ''], correct: 0, explanation: '' };
  wrap.insertAdjacentHTML('beforeend', questionEditorHTML(q, idx));
};
window.removeQuestion = function (idx) {
  const wrap = document.getElementById('questions-editor');
  wrap.children[idx].remove();
  Array.from(wrap.children).forEach((el, i) => {
    el.dataset.qidx = i;
    el.querySelector('.s-ed-block-tag .n').textContent = 'Q' + String(i+1).padStart(2,'0');
    el.querySelector('.s-ed-block-tag').lastChild.textContent = ' Spørgsmål ' + (i+1);
    el.querySelector('.s-ed-block-actions button').setAttribute('onclick', `removeQuestion(${i})`);
    el.querySelectorAll('.s-ed-opt input[type="radio"]').forEach(r => r.name = `correct-${i}`);
  });
};
window.addReflection = function () {
  const wrap = document.getElementById('reflections-editor');
  const idx = wrap.children.length;
  const r = { id: 'new' + Date.now(), prompt: '' };
  wrap.insertAdjacentHTML('beforeend', reflectionEditorHTML(r, idx));
};
window.removeReflection = function (idx) {
  const wrap = document.getElementById('reflections-editor');
  wrap.children[idx].remove();
  Array.from(wrap.children).forEach((el, i) => {
    el.dataset.ridx = i;
    el.querySelector('.s-ed-block-tag .n').textContent = 'R' + String(i+1).padStart(2,'0');
    el.querySelector('.s-ed-block-tag').lastChild.textContent = ' Refleksion ' + (i+1);
    el.querySelector('.s-ed-block-actions button').setAttribute('onclick', `removeReflection(${i})`);
  });
};

window.saveAuthor = function (moduleId) {
  const overrides = load(STORAGE.CONTENT_OVERRIDES, {});
  const title = document.getElementById('author-title').value.trim();
  const subtitle = document.getElementById('author-subtitle').value.trim();

  const questions = Array.from(document.querySelectorAll('#questions-editor .s-ed-block')).map((el, i) => {
    const q = el.querySelector('[data-field="q"]').value.trim();
    const options = [0,1,2].map(j => el.querySelector(`[data-field="opt-${j}"]`).value.trim());
    const correctEl = el.querySelector(`input[name="correct-${i}"]:checked`);
    const correct = correctEl ? parseInt(correctEl.dataset.correct) : 0;
    const explanation = el.querySelector('[data-field="explanation"]').value.trim();
    return { id: 'q' + i + '_' + moduleId, q, options, correct, explanation };
  });

  const reflections = Array.from(document.querySelectorAll('#reflections-editor .s-ed-block')).map((el, i) => ({
    id: 'r' + (i+1),
    prompt: el.querySelector('[data-rfield="prompt"]').value.trim()
  })).filter(r => r.prompt);

  overrides[moduleId] = { title, subtitle, questions, reflections };
  save(STORAGE.CONTENT_OVERRIDES, overrides);
  toast('Gemt');
};

window.resetAuthor = function (moduleId) {
  if (!confirm('Sikker? Det fjerner dine ændringer for dette modul.')) return;
  const overrides = load(STORAGE.CONTENT_OVERRIDES, {});
  delete overrides[moduleId];
  save(STORAGE.CONTENT_OVERRIDES, overrides);
  renderAuthor(moduleId);
  toast('Nulstillet');
};

/* ---------- BOOT ---------- */
window.navigate = navigate;
window.logout = logout;

// Bridge a Supabase session into the app's local session shape.
// If the email isn't known to this device yet, mark them for onboarding.
function applySupabaseSession(session) {
  if (session && session.user && session.user.email) {
    const email = session.user.email.toLowerCase();
    const users = load(STORAGE.USERS, {});
    const user = users[email];
    if (user) {
      save(STORAGE.SESSION, { email, name: user.name, role: user.role });
      delete window._needsOnboarding;
      remove(STORAGE.PENDING_MAGIC);
    } else {
      remove(STORAGE.SESSION);
      window._needsOnboarding = email;
    }
  } else {
    remove(STORAGE.SESSION);
    delete window._needsOnboarding;
  }
}

let _bootDispatched = false;
sb.auth.onAuthStateChange((event, session) => {
  applySupabaseSession(session);
  if (!_bootDispatched) {
    _bootDispatched = true;
    dispatch();
    return;
  }
  if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
    if (event === 'SIGNED_IN') {
      const s = currentSession();
      if (s) toast('Du er logget ind');
    }
    navigate('/');
    dispatch();
  }
});

// Fallback: if onAuthStateChange somehow doesn't fire (very rare), boot anyway.
setTimeout(() => {
  if (!_bootDispatched) {
    _bootDispatched = true;
    dispatch();
  }
}, 1500);

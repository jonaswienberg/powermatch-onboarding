/* global React */

// ============================================================
// SOFT — TopBar (rounded chrome)
// ============================================================
function SoftTopBar({ active = "Hjem", surface = "trainee" }) {
  const navTrainee = ["Hjem", "Moduler", "Min profil"];
  const navManager = ["Oversigt", "Trainees", "Indhold", "Rapporter"];
  const navAuthor = ["Moduler", "Bibliotek", "Indstillinger"];
  const nav = surface === "manager" ? navManager : surface === "author" ? navAuthor : navTrainee;
  const userInitials = surface === "manager" ? "ML" : surface === "author" ? "JS" : "AK";
  const userName = surface === "manager" ? "Mette Larsen" : surface === "author" ? "Julie Sørensen" : "Anders Kjær";
  const userRole = surface === "manager" ? "Manager" : surface === "author" ? "Editor" : "Trainee";

  return (
    <header className="s-tb">
      <div className="s-tb-brand">
        <div className="s-tb-mark" aria-hidden="true"></div>
        <div className="s-tb-name">PowerMatch <span>/ Onboarding</span></div>
      </div>
      <nav className="s-tb-nav">
        {nav.map((n) => (
          <a key={n} href="#" className={n === active ? "active" : ""}>{n}</a>
        ))}
      </nav>
      <div className="s-tb-right">
        <span className="s-tb-clock">DK · 04.05.26</span>
        <span className="s-tb-user">
          <span className="s-tb-user-text">
            <span className="s-tb-user-name">{userName}</span>
            <span className="s-tb-user-role">{userRole}</span>
          </span>
          <span className="s-tb-avatar">{userInitials}</span>
        </span>
      </div>
    </header>
  );
}

// ============================================================
// SOFT — LOGIN
// ============================================================
function SoftLogin() {
  return (
    <div className="s-surface">
      <div className="s-login">
        <div className="s-login-left">
          <div className="s-login-top">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div className="s-tb-mark" aria-hidden="true"></div>
              <span style={{ fontWeight: 600, color: "var(--pm-ink)" }}>PowerMatch</span>
            </div>
            <span>EST. 2018 / KBH</span>
          </div>
          <h1>Lær din<br />nye <em>verden</em><br />at kende.</h1>
          <div className="s-login-credits">
            <div className="stat">
              <span className="num">12</span>
              <span className="lbl">Moduler</span>
            </div>
            <div className="stat">
              <span className="num">~6t</span>
              <span className="lbl">Total tid</span>
            </div>
            <div className="vol">
              ONBOARDING<br />N°01<br />VOL. 2026
            </div>
          </div>
        </div>
        <div className="s-login-right">
          <div className="s-login-form">
            <div className="sup">— Adgang for medarbejdere</div>
            <h2>Log ind</h2>
            <p className="lede">Brug din PowerMatch-konto. Vi sender dig et magic link, så du slipper for at huske et kodeord.</p>
            <div className="field">
              <label>E-mail</label>
              <input className="s-input" defaultValue="anders@powermatch.dk" />
            </div>
            <button className="s-btn s-btn-ink s-btn-arrow">Send magic link</button>
            <div className="alt">Spørgsmål? Skriv til onboarding@powermatch.dk</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SOFT — TRAINEE HOME
// ============================================================
function SoftTraineeHome() {
  const modules = [
    { idx: "01", title: "Velkommen til PowerMatch", sub: "Vores historie, mission og kunder.", duration: "12 min", chapters: "8 kapitler", status: "done", pct: 100 },
    { idx: "02", title: "Introduktion til byggebranchen", sub: "Sådan fungerer det danske håndværkermarked.", duration: "24 min", chapters: "14 kapitler", status: "now", pct: 42 },
    { idx: "03", title: "Vores produkt — fra A til Z", sub: "Matchningsmotoren, app'en og platformen.", duration: "32 min", chapters: "18 kapitler", status: "locked", pct: 0 },
    { idx: "04", title: "Salgsmetodikken", sub: "Sådan taler vi med håndværkere og kunder.", duration: "28 min", chapters: "16 kapitler", status: "locked", pct: 0 },
    { idx: "05", title: "Compliance & GDPR", sub: "Det du skal vide før du ringer ud.", duration: "18 min", chapters: "10 kapitler", status: "locked", pct: 0 }
  ];

  return (
    <div className="s-surface">
      <SoftTopBar active="Hjem" surface="trainee" />
      <div className="s-home" style={{ overflowY: "auto", flex: 1 }}>
        <div className="s-hero">
          <div className="s-hero-top">
            <span>Onboarding · uge 02 af 04</span>
            <span>04.05.2026 — Mandag</span>
          </div>
          <h1>Velkommen<br />tilbage, <em>Anders.</em></h1>
          <div className="s-hero-meta">
            <p className="s-hero-lede">Du er 42% gennem modul 02. Forventet afslutning fredag. Tag kapitel 5 af 14 nu — det handler om <span className="yel">gangefaktor</span> og prissætning.</p>
            <div className="s-hero-stats">
              <div className="s-hero-stat">
                <div className="lbl">Færdig</div>
                <div className="num">17%</div>
                <div className="sub">2 / 12 moduler</div>
              </div>
              <div className="s-hero-stat">
                <div className="lbl">Score</div>
                <div className="num">94%</div>
                <div className="sub">Quiz-snit</div>
              </div>
              <div className="s-hero-stat">
                <div className="lbl">Streak</div>
                <div className="num">5d</div>
                <div className="sub">i træk</div>
              </div>
            </div>
          </div>
        </div>

        <div className="s-sec-head">
          <h2>Dit læringsspor</h2>
          <span className="meta">12 moduler · ~6t total</span>
        </div>

        <div className="s-mod-list">
          {modules.map((m) => (
            <div key={m.idx} className={`s-mod ${m.status}`}>
              <div className="s-mod-num">{m.idx}</div>
              <div>
                <h3>{m.title}</h3>
                <div className="sub">{m.sub}</div>
              </div>
              <div className="s-mod-meta">
                <span><strong>{m.duration}</strong></span>
                <span>{m.chapters}</span>
              </div>
              <div className="s-mod-prog">
                <div className="bar"><div className="fill" style={{ width: `${m.pct}%` }}></div></div>
                <div className="meta-line">
                  <span className={`s-pip ${m.status}`}>
                    {m.status === "done" ? "Gennemført" : m.status === "now" ? "I gang" : "Låst"}
                  </span>
                  <span>{m.pct}%</span>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <span className="s-mod-arrow" aria-hidden="true">→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="s-side">
          <div className="s-mentor">
            <div className="s-card-eyebrow">— Din mentor</div>
            <div className="s-mentor-id">
              <div className="s-mentor-avatar">SB</div>
              <div>
                <div className="s-mentor-name">Sara Blomqvist</div>
                <div className="s-mentor-role">Senior Account Executive</div>
              </div>
            </div>
            <div className="s-mentor-rows">
              <div className="row"><span className="k">Næste 1:1</span><span className="v">Tor 08.05 · 14:00</span></div>
              <div className="row"><span className="k">Slack</span><span className="v">@sara.b</span></div>
              <div className="row"><span className="k">Skygges</span><span className="v">3 opkald</span></div>
            </div>
          </div>
          <div className="s-upnext">
            <div>
              <div className="s-card-eyebrow">— Up next</div>
              <div className="s-upnext-meta">KAP. 05 / 14</div>
              <div className="s-upnext-name">Gangefaktor & prissætning</div>
            </div>
            <button className="s-btn s-btn-yellow s-btn-arrow">Fortsæt</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SOFT — MODULE PLAYER
// ============================================================
function SoftModulePlayer() {
  const segs = Array.from({ length: 14 }, (_, i) => i < 4 ? "done" : i === 4 ? "now" : "");

  return (
    <div className="s-surface">
      <SoftTopBar active="Moduler" surface="trainee" />
      <div className="s-player" style={{ overflowY: "auto" }}>
        <div className="s-player-head">
          <div className="s-crumb">
            <button className="s-back" aria-label="Tilbage">←</button>
            <span>Modul 02 · Byggebranchen</span>
          </div>
          <div className="s-title-line">
            <span className="num">KAP. 05</span>
            <span className="name">Gangefaktor & prissætning</span>
          </div>
          <div className="s-step-counter">
            <span>05</span><span className="total"> / 14</span>
          </div>
        </div>

        <div className="s-step-rail">
          {segs.map((s, i) => <div key={i} className={`seg ${s}`}></div>)}
        </div>

        <div className="s-slide">
          <div className="s-slide-meta l">
            <span>POWERMATCH / ONBOARDING</span>
            <span>·</span>
            <span>MODUL 02 — KAP 05</span>
          </div>
          <div className="s-slide-meta r">SLIDE 03 / 07</div>

          <div className="s-slide-eyebrow">Branchekendskab — prissætning</div>
          <h1 className="lede">Hvad er en <em>gangefaktor</em>, og hvorfor afgør den om håndværkeren tjener penge?</h1>
          <p className="lede-body">Gangefaktoren er det tal, en håndværker ganger sin indkøbspris med for at lande på en udsalgspris. Den dækker spild, transport, fortjeneste, garanti, administration. Lavt tal = farligt. Højt tal = stolt.</p>

          <div className="s-three">
            <div className="s-three-item">
              <div className="s-three-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0B0C" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M12 3v18" /></svg>
              </div>
              <div className="s-three-h">Indkøbspris × faktor</div>
              <div className="s-three-b">En vandhane købt til 800 kr. ganges med f.eks. 1,8 og lander på 1.440 kr. til kunden.</div>
            </div>
            <div className="s-three-item">
              <div className="s-three-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0B0C" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              </div>
              <div className="s-three-h">Branche-spænd</div>
              <div className="s-three-b">VVS ligger typisk på 1,6–2,2. El svinger 1,8–2,5. Murer ofte 1,4–1,8 — afhænger af materiale.</div>
            </div>
            <div className="s-three-item">
              <div className="s-three-ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B0B0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l8-16 8 16M8 14h8" /></svg>
              </div>
              <div className="s-three-h">Det den dækker</div>
              <div className="s-three-b">Spild, transport, garantireservation, administration, fortjeneste, og — meget vigtigt — risiko.</div>
            </div>
          </div>
        </div>

        <div className="s-player-foot">
          <button className="s-btn s-btn-soft">← Forrige</button>
          <div className="center">tryk <kbd>→</kbd> for næste · <kbd>esc</kbd> for at lukke</div>
          <button className="s-btn s-btn-ink s-btn-arrow">Næste</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SOFT — COVER
// ============================================================
function SoftCoverSlide() {
  return (
    <div className="s-surface">
      <SoftTopBar active="Moduler" surface="trainee" />
      <div className="s-player" style={{ overflowY: "auto" }}>
        <div className="s-player-head">
          <div className="s-crumb">
            <button className="s-back" aria-label="Tilbage">←</button>
            <span>Modul 02 · Byggebranchen</span>
          </div>
          <div className="s-title-line">
            <span className="num">KAP. 01</span>
            <span className="name">Forsiden</span>
          </div>
          <div className="s-step-counter">
            <span>01</span><span className="total"> / 14</span>
          </div>
        </div>

        <div className="s-step-rail">
          {Array.from({ length: 14 }, (_, i) => <div key={i} className={`seg ${i === 0 ? "now" : ""}`}></div>)}
        </div>

        <div className="s-slide cover">
          <div className="s-slide-meta l">
            <span>POWERMATCH / ONBOARDING</span>
            <span>·</span>
            <span>MODUL 02</span>
          </div>
          <div className="s-slide-meta r">VOL. 2026 — N°02</div>

          <div className="s-slide-eyebrow">Modul 02 — Branchen</div>
          <h1 className="lede" style={{ fontSize: 80, marginBottom: 28 }}>
            Introduktion til <em>byggebranchen.</em>
          </h1>
          <p className="lede-body" style={{ fontSize: 18, maxWidth: 620 }}>
            En guidet tur gennem håndværker-Danmark — hvordan markedet fungerer, hvem der bestemmer, og hvor PowerMatch passer ind. 24 minutter. 14 kapitler. En quiz til sidst.
          </p>

          <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "end", paddingTop: 48, position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", gap: 36 }}>
              <div>
                <div className="s-eyebrow" style={{ marginBottom: 6 }}>Forfatter</div>
                <div style={{ fontFamily: "var(--f-display)", fontWeight: 600, fontSize: 16 }}>Mads Bjerregaard</div>
              </div>
              <div>
                <div className="s-eyebrow" style={{ marginBottom: 6 }}>Sidst opdateret</div>
                <div style={{ fontFamily: "var(--f-display)", fontWeight: 600, fontSize: 16 }}>12.04.2026</div>
              </div>
              <div>
                <div className="s-eyebrow" style={{ marginBottom: 6 }}>Forventet tid</div>
                <div style={{ fontFamily: "var(--f-display)", fontWeight: 600, fontSize: 16 }}>~24 min</div>
              </div>
            </div>
            <button className="s-btn s-btn-ink s-btn-arrow">Start modul</button>
          </div>
        </div>

        <div className="s-player-foot">
          <button className="s-btn s-btn-ghost" disabled>← Forrige</button>
          <div className="center">tryk <kbd>→</kbd> for at starte</div>
          <button className="s-btn s-btn-ink s-btn-arrow">Start</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SOFT — QUIZ
// ============================================================
function SoftQuizSurface() {
  const opts = [
    { l: "A", t: "Den procentdel håndværkeren betaler i moms til staten.", state: "" },
    { l: "B", t: "Tallet en håndværker ganger indkøbsprisen med for at finde sin udsalgspris.", state: "correct" },
    { l: "C", t: "Et fast brancheloft, som Dansk Byggeri bestemmer hvert kvartal.", state: "wrong" },
    { l: "D", t: "Den rabat kunden får ved at booke direkte gennem PowerMatch.", state: "" }
  ];

  return (
    <div className="s-surface">
      <SoftTopBar active="Moduler" surface="trainee" />
      <div className="s-quiz" style={{ overflowY: "auto" }}>
        <div className="s-player-head">
          <div className="s-crumb">
            <button className="s-back" aria-label="Tilbage">←</button>
            <span>Modul 02 · Quiz</span>
          </div>
          <div className="s-title-line">
            <span className="num">QUIZ</span>
            <span className="name">Tjek din forståelse</span>
          </div>
          <div className="s-step-counter"><span>03</span><span className="total"> / 06</span></div>
        </div>

        <div className="s-quiz-card">
          <div className="s-quiz-eyebrow">
            <div className="left">
              <span className="pill">Spørgsmål 03 / 06</span>
              <strong>Branchekendskab</strong>
            </div>
            <span>Vælg ét svar</span>
          </div>

          <h2 className="s-quiz-q">Hvad beskriver en <em>gangefaktor</em> bedst?</h2>

          <div className="s-quiz-opts">
            {opts.map((o) => (
              <button key={o.l} className={`s-quiz-opt ${o.state}`}>
                <span className="letter">{o.l}</span>
                <span>{o.t}</span>
                <span className="status">
                  {o.state === "correct" && "✓ Korrekt"}
                  {o.state === "wrong" && "× Dit svar"}
                </span>
              </button>
            ))}
          </div>

          <div className="s-quiz-feedback">
            <div className="lbl">Forklaring —</div>
            <div className="body">Gangefaktoren samler håndværkerens reelle omkostninger — spild, transport, garantireservation, administration — plus fortjenesten, i ét enkelt tal. Den varierer typisk fra 1,4 til 2,5 afhængigt af fag.</div>
          </div>

          <div className="s-quiz-foot">
            <span style={{ fontSize: 12, color: "var(--pm-mute)", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>Score så langt: 02 / 03</span>
            <button className="s-btn s-btn-ink s-btn-arrow">Næste spørgsmål</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SOFT — SUMMARY
// ============================================================
function SoftSummarySurface() {
  return (
    <div className="s-surface">
      <SoftTopBar active="Moduler" surface="trainee" />
      <div className="s-summary" style={{ overflowY: "auto" }}>
        <div className="s-player-head">
          <div className="s-crumb">
            <button className="s-back" aria-label="Tilbage">←</button>
            <span>Modul 02 — Færdig</span>
          </div>
          <div className="s-title-line">
            <span className="num">RESULTAT</span>
            <span className="name">Du gjorde det.</span>
          </div>
          <div className="s-step-counter"><span style={{ color: "var(--pm-green)" }}>● </span>Bestået</div>
        </div>

        <div className="s-summary-hero">
          <div className="eb">Modul 02 / Byggebranchen — gennemført</div>
          <h1>Godt klaret,<br /><em>Anders.</em></h1>
          <p className="body">Du forstår nu hvordan håndværker-økonomien virker, hvilke beslutninger en mester tager hver morgen, og hvor PowerMatch tilfører værdi. På til modul 03 — produktet.</p>
          <div className="actions">
            <button className="s-btn s-btn-ink s-btn-arrow">Næste modul</button>
            <button className="s-btn s-btn-soft">Gennemse kapitler</button>
          </div>
        </div>

        <div className="s-summary-grid">
          <div className="s-summary-cell">
            <div className="lbl">Quiz-score</div>
            <div className="num">94<small>%</small></div>
            <div className="sub">17 af 18 rigtige · over snittet (88%)</div>
          </div>
          <div className="s-summary-cell">
            <div className="lbl">Tid brugt</div>
            <div className="num">22<small>m</small></div>
            <div className="sub">Estimeret 24 min · 2 min hurtigere</div>
          </div>
          <div className="s-summary-cell">
            <div className="lbl">Kapitler</div>
            <div className="num">14<small>/14</small></div>
            <div className="sub">Alle læst — ingen oversprunget</div>
          </div>
          <div className="s-summary-cell">
            <div className="lbl">Reflektion</div>
            <div className="num" style={{ fontSize: 32, lineHeight: 1.1 }}>Indsendt</div>
            <div className="sub">"Mester-perspektivet var en øjenåbner…"</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SOFT — MANAGER DASHBOARD
// ============================================================
function SoftManagerDashboard() {
  const trainees = [
    { idx: "01", initials: "AK", name: "Anders Kjær", role: "AE — Cohort '26.01", now: "Modul 02 / Byggebranchen", stub: "kap. 5 af 14", pct: 42, score: 94, status: "track" },
    { idx: "02", initials: "FS", name: "Frederikke Sand", role: "AE — Cohort '26.01", now: "Modul 03 / Produktet", stub: "kap. 12 af 18", pct: 67, score: 91, status: "track" },
    { idx: "03", initials: "JT", name: "Johan Thomsen", role: "SDR — Cohort '26.01", now: "Modul 02 / Byggebranchen", stub: "kap. 9 af 14", pct: 64, score: 78, status: "watch" },
    { idx: "04", initials: "LC", name: "Liva Christoffersen", role: "AE — Cohort '26.02", now: "Modul 04 / Salgsmetodik", stub: "kap. 3 af 16", pct: 19, score: 88, status: "track" },
    { idx: "05", initials: "MV", name: "Mikkel Vinding", role: "SDR — Cohort '26.01", now: "Modul 02 / Byggebranchen", stub: "kap. 2 af 14", pct: 14, score: 62, status: "behind" },
    { idx: "06", initials: "OB", name: "Olivia Brink", role: "AE — Cohort '26.02", now: "Modul 01 / Velkommen", stub: "kap. 6 af 8", pct: 75, score: 100, status: "track" }
  ];

  const sparkPath = "M0,18 L20,14 L40,16 L60,10 L80,12 L100,6 L120,8 L140,4 L160,6 L180,2";

  const statusChip = (s) =>
    s === "track" ? <span className="s-chip s-chip-green s-chip-dot">På sporet</span>
    : s === "watch" ? <span className="s-chip s-chip-dot" style={{ color: "var(--pm-mute)" }}>Følg</span>
    : <span className="s-chip s-chip-red s-chip-dot">Bagud</span>;

  return (
    <div className="s-surface">
      <SoftTopBar active="Trainees" surface="manager" />
      <div className="s-dash" style={{ overflowY: "auto", flex: 1, position: "relative" }}>
        <div className="s-dash-hero">
          <div className="s-dash-hero-top">
            <span>Cohort '26.01 + '26.02 · 18 trainees</span>
            <span>Uge 18 / 2026</span>
          </div>
          <h1>18 nye<br />stemmer i <em>røret.</em></h1>
        </div>

        <div className="s-kpi-row">
          <div className="s-kpi accent">
            <div className="lbl">Aktive trainees</div>
            <div className="num">18</div>
            <div className="delta up">↑ 4 vs. forrige cohort</div>
          </div>
          <div className="s-kpi">
            <div className="lbl">Gennemførselsrate</div>
            <div className="num">87<small>%</small></div>
            <svg viewBox="0 0 180 22" className="s-spark" preserveAspectRatio="none">
              <path d={sparkPath} stroke="var(--pm-ink)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="180" cy="2" r="3" fill="var(--pm-ink)" />
            </svg>
            <div className="delta up">↑ 6 pp · uge over uge</div>
          </div>
          <div className="s-kpi">
            <div className="lbl">Quiz-snit</div>
            <div className="num">88<small>%</small></div>
            <div className="delta flat">— uændret</div>
          </div>
          <div className="s-kpi">
            <div className="lbl">Risk flags</div>
            <div className="num">02</div>
            <div className="delta down">↓ Mikkel V., Johan T.</div>
          </div>
        </div>

        <div className="s-dash-section">
          <div className="s-dash-section-head">
            <h2>Alle trainees</h2>
            <div className="filters">
              <span className="chip active">Alle</span>
              <span className="chip">På sporet</span>
              <span className="chip">Bør følges</span>
              <span className="chip">Bagud</span>
            </div>
          </div>

          <div className="s-tt-head">
            <div>№</div>
            <div>Navn</div>
            <div>Aktuelt modul</div>
            <div>Fremgang</div>
            <div>Quiz-snit</div>
            <div></div>
          </div>
          <div className="s-tt">
            {trainees.map((t) => (
              <div key={t.idx} className="s-trow">
                <div className="idx">{t.idx}</div>
                <div className="person">
                  <div className="pavatar">{t.initials}</div>
                  <div>
                    <div className="pname">{t.name}</div>
                    <div className="prole">{t.role}</div>
                  </div>
                </div>
                <div>
                  <div className="pmod-now">{t.now}</div>
                  <div className="pmod-stub">{t.stub}</div>
                </div>
                <div className="pbar">
                  <div className="b"><div className="f" style={{ width: `${t.pct}%`, background: t.status === "behind" ? "var(--pm-red)" : "var(--pm-ink)" }}></div></div>
                  <div className="pbar-meta">
                    {statusChip(t.status)}
                    <span className="tnum">{t.pct}%</span>
                  </div>
                </div>
                <div className="pscore">{t.score}<span className="of">/100</span></div>
                <div className="pend">
                  <span className="s-mod-arrow" aria-hidden="true">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SOFT — DRAWER
// ============================================================
function SoftManagerDrawer() {
  const segs = [
    { lbl: "Velkommen", sub: "M01", state: "done" },
    { lbl: "Branchen", sub: "M02", state: "now" },
    { lbl: "Produktet", sub: "M03", state: "" },
    { lbl: "Salg", sub: "M04", state: "" },
    { lbl: "Compliance", sub: "M05", state: "" }
  ];

  const mods = [
    { idx: "01", name: "Velkommen til PowerMatch", pct: 100, score: 96 },
    { idx: "02", name: "Introduktion til byggebranchen", pct: 42, score: 94 },
    { idx: "03", name: "Vores produkt — fra A til Z", pct: 0, score: null },
    { idx: "04", name: "Salgsmetodikken", pct: 0, score: null }
  ];

  const eng = [];
  for (let i = 0; i < 60; i++) {
    let cls = "";
    let h = 30 + ((i * 13) % 28);
    if (i === 14 || i === 28 || i === 42) { cls = "q-ok"; h = 50; }
    if (i === 35) { cls = "q-no"; h = 50; }
    if (i === 22 || i === 23 || i === 50 || i === 51) { cls = "skim"; h = 14; }
    eng.push({ cls, h });
  }

  return (
    <div className="s-surface" style={{ position: "relative" }}>
      <SoftTopBar active="Trainees" surface="manager" />
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div className="s-dash" style={{ filter: "blur(2px)", opacity: 0.5, pointerEvents: "none", height: "100%", overflow: "hidden" }}>
          <div className="s-dash-hero">
            <div className="s-dash-hero-top">
              <span>Cohort '26.01 + '26.02 · 18 trainees</span>
              <span>Uge 18 / 2026</span>
            </div>
            <h1>18 nye<br />stemmer i <em>røret.</em></h1>
          </div>
          <div className="s-kpi-row">
            <div className="s-kpi accent"><div className="lbl">Aktive</div><div className="num">18</div></div>
            <div className="s-kpi"><div className="lbl">Gennemført</div><div className="num">87<small>%</small></div></div>
            <div className="s-kpi"><div className="lbl">Quiz</div><div className="num">88<small>%</small></div></div>
            <div className="s-kpi"><div className="lbl">Risk</div><div className="num">02</div></div>
          </div>
        </div>

        <div className="s-drawer-frame">
          <div className="s-drawer-scrim"></div>
          <div className="s-drawer">
            <div className="s-drawer-top">
              <span className="s-chip">Trainee · Cohort '26.01</span>
              <span className="s-drawer-close" aria-label="Luk">×</span>
            </div>

            <div className="s-drawer-id">
              <div className="avatar-xl">AK</div>
              <div>
                <h2>Anders Kjær</h2>
                <div className="meta-line">
                  <span className="s-chip"><strong>AE</strong> · Account Executive</span>
                  <span className="s-chip">Startede 21.04.26</span>
                  <span className="s-chip">Mentor: <strong style={{ marginLeft: 4 }}>Sara B.</strong></span>
                </div>
              </div>
            </div>

            <div className="s-dr-kpis">
              <div className="s-dr-kpi accent">
                <div className="lbl">Fremgang</div>
                <div className="num">17%</div>
              </div>
              <div className="s-dr-kpi">
                <div className="lbl">Quiz-snit</div>
                <div className="num">94%</div>
              </div>
              <div className="s-dr-kpi">
                <div className="lbl">Tid total</div>
                <div className="num">3t 14m</div>
              </div>
              <div className="s-dr-kpi">
                <div className="lbl">Streak</div>
                <div className="num">5d</div>
              </div>
            </div>

            <div className="s-dr-block">
              <h3>Læringsspor</h3>
              <div className="s-dr-timeline">
                {segs.map((s, i) => (
                  <div key={i} className={`s-dr-tl-step ${s.state}`}>
                    <div className="dot"></div>
                    <div className="line"></div>
                    <div className="lbl">{s.lbl}</div>
                    <div className="sub">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="s-dr-block">
              <h3>Modul-by-modul</h3>
              {mods.map((m) => (
                <div key={m.idx} className="s-dr-mod">
                  <div className="s-dr-mod-head">
                    <div className="name"><span className="idx-num">{m.idx}</span>{m.name}</div>
                    <span className={`s-chip ${m.pct === 100 ? "s-chip-green" : m.pct > 0 ? "s-chip-yellow" : ""}`}>
                      {m.pct === 100 ? "✓ Færdig" : m.pct > 0 ? "I gang" : "Ikke start"}
                    </span>
                  </div>
                  <div className="s-dr-mod-metrics">
                    <div className="s-dr-mod-metric">
                      <div className="lbl">Fremgang</div>
                      <div className="row">
                        <div className="bar"><div className="f" style={{ width: `${m.pct}%` }}></div></div>
                        <div className="v">{m.pct}%</div>
                      </div>
                    </div>
                    <div className="s-dr-mod-metric">
                      <div className="lbl">Quiz</div>
                      <div className="row">
                        <div className="bar"><div className="f" style={{ width: `${m.score || 0}%`, background: m.score >= 90 ? "var(--pm-green)" : "var(--pm-ink)" }}></div></div>
                        <div className="v">{m.score ? `${m.score}%` : "—"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="s-dr-block">
              <h3>Engagement — modul 02</h3>
              <div className="s-eng-strip">
                {eng.map((b, i) => (
                  <div key={i} className={`s-eng-bar ${b.cls}`} style={{ height: `${b.h}px` }}></div>
                ))}
              </div>
              <div className="s-eng-legend">
                <span><span className="swatch" style={{ background: "var(--pm-ink)" }}></span>Læsning</span>
                <span><span className="swatch" style={{ background: "rgba(20,20,26,0.10)" }}></span>Skim</span>
                <span><span className="swatch" style={{ background: "var(--pm-green)" }}></span>Quiz ✓</span>
                <span><span className="swatch" style={{ background: "var(--pm-red)" }}></span>Quiz ×</span>
              </div>
            </div>

            <div className="s-dr-block">
              <h3>Forkerte svar — til opfølgning</h3>
              <div className="s-rev">
                <div className="meta">M02 · Branchen · Q03</div>
                <div className="q">Hvad er en typisk gangefaktor for el-arbejde?</div>
                <div className="ans-row bad">
                  <div className="lbl">Svar</div>
                  <div className="v">"1,1 — 1,3"</div>
                </div>
                <div className="ans-row good">
                  <div className="lbl">Korrekt</div>
                  <div className="v">"1,8 — 2,5"</div>
                </div>
                <div className="why">El-faget har højere risiko og garantireservation end mange andre fag, og gangefaktoren afspejler det. Anbefaling: gennemgå kapitel 5 sammen.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SOFT — AUTHORING
// ============================================================
function SoftAuthoringSurface() {
  const tree = [
    { idx: "01", name: "Velkommen til PowerMatch", state: "published" },
    { idx: "02", name: "Introduktion til byggebranchen", state: "editing", active: true },
    { idx: "03", name: "Vores produkt — fra A til Z", state: "draft" },
    { idx: "04", name: "Salgsmetodikken", state: "draft" },
    { idx: "05", name: "Compliance & GDPR", state: "review" }
  ];

  const chapters = [
    "01 — Forsiden",
    "02 — Hvorfor håndværkermarkedet",
    "03 — De fem fag",
    "04 — En dag som mester",
    "05 — Gangefaktor & prissætning",
    "06 — Kundetyper og pains",
    "07 — Quiz"
  ];

  return (
    <div className="s-surface">
      <SoftTopBar active="Indhold" surface="author" />
      <div className="s-auth">
        <aside className="s-auth-side">
          <div className="group">
            <h4>— Moduler · 12</h4>
            {tree.map((m) => (
              <button key={m.idx} className={`s-auth-tree-item ${m.active ? "active" : ""}`}>
                <span className="n">{m.idx}</span>
                <span>{m.name}</span>
                <span className="ind">{m.state === "published" ? "PUB" : m.state === "editing" ? "EDIT" : m.state === "review" ? "REV" : "DRAFT"}</span>
              </button>
            ))}
          </div>
          <div className="group">
            <h4>— Modul 02 · kapitler</h4>
            {chapters.map((c, i) => (
              <button key={i} className={`s-auth-tree-item ${i === 4 ? "active" : ""}`}>
                <span className="n" style={{ visibility: "hidden" }}>·</span>
                <span style={{ fontSize: 12 }}>{c}</span>
                <span className="ind" style={{ visibility: i === 4 ? "visible" : "hidden" }}>EDIT</span>
              </button>
            ))}
          </div>
          <button className="s-add-btn" style={{ width: "100%" }}>
            <span className="ico">+</span>
            Nyt kapitel
          </button>
        </aside>

        <main className="s-auth-main">
          <div className="s-auth-main-head">
            <div>
              <div className="title">Modul 02 / Kapitel 05</div>
              <h2>Gangefaktor &amp; <em>prissætning.</em></h2>
            </div>
            <div className="s-auth-actions">
              <span className="s-auth-status">Auto-gemt · 14:08</span>
              <button className="s-btn s-btn-soft">Preview</button>
              <button className="s-btn s-btn-ink">Publicér</button>
            </div>
          </div>

          <div className="s-ed-block focus">
            <div className="s-ed-block-head">
              <div className="s-ed-block-tag">
                <span className="n">01</span>
                <span>Slide · Lede + brødtekst</span>
              </div>
              <div className="s-ed-block-actions">
                <button>↑</button><button>↓</button><button>Dupl.</button><button>Slet</button>
              </div>
            </div>
            <input className="s-ed-input" defaultValue="Hvad er en gangefaktor, og hvorfor afgør den om håndværkeren tjener penge?" />
            <textarea className="s-ed-textarea" rows="3" defaultValue="Gangefaktoren er det tal, en håndværker ganger sin indkøbspris med for at lande på en udsalgspris. Den dækker spild, transport, fortjeneste, garanti, administration. Lavt tal = farligt. Højt tal = stolt."></textarea>
          </div>

          <div className="s-ed-block">
            <div className="s-ed-block-head">
              <div className="s-ed-block-tag">
                <span className="n">02</span>
                <span>Slide · Tre kolonner</span>
              </div>
              <div className="s-ed-block-actions">
                <button>↑</button><button>↓</button><button>Dupl.</button><button>Slet</button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { h: "Indkøbspris × faktor", b: "En vandhane købt til 800 kr. ganges med 1,8 og lander på 1.440 kr. til kunden." },
                { h: "Branche-spænd", b: "VVS 1,6–2,2. El 1,8–2,5. Murer 1,4–1,8 — afhænger af materiale." },
                { h: "Det den dækker", b: "Spild, transport, garanti, administration, fortjeneste, og — vigtigt — risiko." }
              ].map((c, i) => (
                <div key={i} style={{ padding: 14, background: "var(--pm-card)", borderRadius: "var(--r-2)" }}>
                  <input style={{ background: "transparent", border: 0, outline: 0, fontFamily: "var(--f-display)", fontWeight: 600, fontSize: 14, letterSpacing: "-0.015em", width: "100%", marginBottom: 6 }} defaultValue={c.h} />
                  <textarea style={{ background: "transparent", border: 0, outline: 0, fontSize: 12, lineHeight: 1.5, width: "100%", resize: "none", color: "var(--pm-mute)" }} rows="3" defaultValue={c.b}></textarea>
                </div>
              ))}
            </div>
          </div>

          <div className="s-ed-block">
            <div className="s-ed-block-head">
              <div className="s-ed-block-tag">
                <span className="n">03</span>
                <span>Quiz · enkelt svar</span>
              </div>
              <div className="s-ed-block-actions">
                <button>↑</button><button>↓</button><button>Dupl.</button><button>Slet</button>
              </div>
            </div>
            <input className="s-ed-input" style={{ fontSize: 20 }} defaultValue="Hvad beskriver en gangefaktor bedst?" />
            {[
              { l: "A", t: "Den procentdel håndværkeren betaler i moms til staten.", correct: false },
              { l: "B", t: "Tallet en håndværker ganger indkøbsprisen med for at finde sin udsalgspris.", correct: true },
              { l: "C", t: "Et fast brancheloft, som Dansk Byggeri bestemmer hvert kvartal.", correct: false },
              { l: "D", t: "Den rabat kunden får ved at booke direkte gennem PowerMatch.", correct: false }
            ].map((o) => (
              <div key={o.l} className="s-ed-opt">
                <input type="radio" name="quiz-correct" defaultChecked={o.correct} />
                <span className="letter">{o.l}</span>
                <input type="text" defaultValue={o.t} />
                <span className="correct-tag">{o.correct ? "✓ KORREKT" : ""}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: 14, background: "var(--pm-card)", borderRadius: "var(--r-2)" }}>
              <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pm-mute)", marginBottom: 6 }}>Forklaring (vises efter svar)</div>
              <textarea style={{ background: "transparent", border: 0, outline: 0, fontSize: 13, lineHeight: 1.5, width: "100%", resize: "none" }} rows="2" defaultValue="Gangefaktoren samler omkostninger plus fortjeneste i ét tal. Varierer typisk fra 1,4 til 2,5."></textarea>
            </div>
          </div>

          <div className="s-add-row">
            <button className="s-add-btn"><span className="ico">¶</span>Tekst</button>
            <button className="s-add-btn"><span className="ico">⊞</span>Kolonner</button>
            <button className="s-add-btn"><span className="ico">?</span>Quiz</button>
          </div>
        </main>

        <aside className="s-auth-right">
          <h4>— Egenskaber</h4>

          <div className="s-insp-block">
            <div className="s-insp-row">
              <div className="k">Status</div>
              <div className="s-insp-toggle">
                <button>Draft</button>
                <button className="active">Edit</button>
                <button>Pub</button>
              </div>
            </div>
            <div className="s-insp-row">
              <div className="k">Sprog</div>
              <div className="v">Dansk</div>
            </div>
            <div className="s-insp-row">
              <div className="k">Forfatter</div>
              <div className="v">Mads B.</div>
            </div>
            <div className="s-insp-row">
              <div className="k">Sidst gemt</div>
              <div className="v" style={{ fontFamily: "var(--f-mono)", fontWeight: 400, fontSize: 12 }}>14:08 · 04.05</div>
            </div>
            <div className="s-insp-row">
              <div className="k">Version</div>
              <div className="v" style={{ fontFamily: "var(--f-mono)", fontWeight: 400, fontSize: 12 }}>v3.2.1</div>
            </div>
          </div>

          <h4>— Slide-indstillinger</h4>
          <div className="s-insp-block">
            <div className="s-insp-row">
              <div className="k">Layout</div>
              <select className="s-insp-input">
                <option>Lede + brødtekst</option>
                <option>To kolonner</option>
                <option>Tre kolonner</option>
                <option>Forside</option>
              </select>
            </div>
            <div className="s-insp-row">
              <div className="k">Baggrund</div>
              <div className="s-insp-toggle">
                <button className="active">Hvid</button>
                <button>Gul</button>
                <button>Sort</button>
              </div>
            </div>
            <div className="s-insp-row">
              <div className="k">Eyebrow</div>
              <input className="s-insp-input" defaultValue="Branchekendskab" />
            </div>
          </div>

          <h4>— Tags</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20, padding: "0 6px" }}>
            <span className="s-chip">prissætning</span>
            <span className="s-chip">økonomi</span>
            <span className="s-chip">vvs</span>
            <span className="s-chip" style={{ borderStyle: "dashed", border: "1.5px dashed rgba(20,20,26,0.20)", background: "transparent" }}>+ tilføj</span>
          </div>

          <h4>— Forhåndsvisning</h4>
          <div style={{ background: "var(--pm-card-soft)", borderRadius: "var(--r-2)", padding: 14, fontSize: 11, lineHeight: 1.4, margin: "0 6px" }}>
            <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--pm-mute)", marginBottom: 8 }}>Branchekendskab</div>
            <div style={{ fontFamily: "var(--f-display)", fontWeight: 600, fontSize: 14, letterSpacing: "-0.018em", lineHeight: 1.1 }}>Hvad er en <em style={{ fontStyle: "italic", fontWeight: 400, background: "var(--pm-yellow)", padding: "0 5px", borderRadius: 5 }}>gangefaktor</em>?</div>
            <div style={{ marginTop: 8, color: "var(--pm-mute)", fontSize: 10, lineHeight: 1.5 }}>Tallet en håndværker ganger sin indkøbspris med…</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, {
  SoftTopBar,
  SoftLogin,
  SoftTraineeHome,
  SoftModulePlayer,
  SoftCoverSlide,
  SoftQuizSurface,
  SoftSummarySurface,
  SoftManagerDashboard,
  SoftManagerDrawer,
  SoftAuthoringSurface
});

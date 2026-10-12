/* Concept D · Same Court. Vanilla JS, no dependencies. Nothing leaves the page:
   no storage, no cookies, no network calls. Every form is a demo. */
(() => {
  'use strict';

  /* ------------------------------------------------------------------
     Every string the script shows, keyed by page language (<html lang>).
     Any other language falls back to de.
     ------------------------------------------------------------------ */
  const STRINGS = {
    en: {
      locale: 'en-GB',
      langNotice: 'The French version is coming soon.',
      msg: {
        required: 'Please fill this in.',
        email: 'That email address doesn’t look quite right. Mind checking it?',
        satzung: 'Please accept the Satzung and Beitragsordnung to apply.',
        session: 'Please pick a session.',
        dob: 'Please enter a real date of birth.'
      },
      phTitle: 'Placeholder: to be confirmed',
      videoDemo: 'Demo: VIDEO 01 will play here from our own server once it exists. Nothing is loaded from elsewhere.',
      sessionName: {
        S1: 'Open Play',
        S2: 'First Serve (free taster)',
        S3: 'First Serve, family-friendly',
        S4: 'Kitchen School, week 1 of 4',
        S5: 'First Serve'
      },
      hero: { play: 'Play', pause: 'Pause', playLabel: 'Play slideshow', pauseLabel: 'Pause slideshow' },
      gensLabel: 'Six players, six ages. Scrolls sideways.',
      sessShown: (n) => `${n} session${n === 1 ? '' : 's'} shown.`,
      sessNone: 'No sessions match these filters.',
      tonightOn: 'Show the on state',
      tonightOff: 'Show the off state',
      aiSample: 'AI sample',
      nearby: 'Also playing nearby · not run by us.',
      pin: {
        freiburg: (ph) => `<strong>Freiburg · ${ph('[Venue TBC]')}</strong>. Our venue: all five sample sessions this month are here. Open in maps: link added once the venue is confirmed.`,
        racketzone: (ph, nearby) => `<strong>FT 1844 RACKETzone Freiburg.</strong> ${nearby}`,
        basel: (ph, nearby) => `<strong>Pickleball Hub Basel.</strong> ${nearby}`,
        giebenach: (ph, nearby) => `<strong>Public courts Giebenach.</strong> ${nearby}`,
        liestal: (ph, nearby) => `<strong>Liestal.</strong> ${nearby}`,
        strasbourg: (ph, nearby) => `<strong>Alsace clubs ${ph('[to confirm]')}: Strasbourg.</strong> ${nearby}`,
        guebwiller: (ph, nearby) => `<strong>Alsace clubs ${ph('[to confirm]')}: Guebwiller.</strong> ${nearby}`
      },
      voteInfo: (town, n) => `<strong>${town}: ${n} votes</strong> <span class="sample">Sample</span>. At 50 we plan a free Pickle Pop-up. <a href="#voteTitle" data-vote-town="${town}">Vote for ${town}</a>`,
      voteOther: 'Thanks. We’ve noted a vote for another town. (Demo: nothing was sent.)',
      voteDone: (town, n) => `${town} now has ${n} votes. At 50 we plan a free Pickle Pop-up. Share the link and we’ll get there faster.`,
      voteAria: (town, n) => `Town vote: ${town}, ${n} votes`,
      trial: {
        stepPick: 'Step 1 of 2 · Pick a session',
        stepAbout: 'Step 2 of 2 · About you',
        waitlisted: 'On the waitlist',
        booked: 'Booked',
        joinWaitlist: 'Join the waitlist',
        saveSpot: 'Save my spot',
        titleFree: 'Book your free first session',
        titleSpot: 'Save your spot',
        doneWaitTitle: (first) => `You’re on the waitlist, ${first}.`,
        doneSpotTitle: (first) => `You’re in, ${first}!`,
        spotSaved: 'Spot saved',
        waitCap: 'We’ll keep a paddle ready.',
        spotCap: 'See you on court.',
        shareTaster: 'a free pickleball taster',
        shareSession: (name) => `a pickleball session (${name})`,
        shareText: (what, day, start) => `I’ve booked ${what} on ${day}, ${start}. Come too?`,
        shareTextWait: (what, day, start) => `I’m on the waitlist for ${what} on ${day}, ${start}. Come too?`,
        copied: (text) => `Copied: “${text}”`,
        copyThis: (text) => `Copy this: “${text}”`
      },
      member: {
        names: ['You', 'Membership', 'Payment', 'Confirm'],
        step: (n, name) => `Step ${n} of 4 · ${name}`,
        sent: 'Application sent',
        thanks: (first) => `Thanks, ${first}.`,
        labels: { name: 'Name', dob: 'Date of birth', address: 'Address', email: 'Email', language: 'Language', membership: 'Membership', guardian: 'Guardian', fee: 'Joining fee', payment: 'Payment' },
        price: (tier) => `${tier} · €[__] / year`,
        feeValue: '€0 (First 100, founder #038, sample)',
        sepa: 'SEPA direct debit',
        transfer: 'Bank transfer'
      },
      newsOk: 'Check your inbox. We’ve sent you a confirmation link. (Demo: nothing was sent.)',
      contactOk: 'Thanks. [Name] will reply within 2 working days (target). (Demo: nothing was sent.)',
      volunteer: (roles) => `I’d like to help with: ${roles}.`
    },
    de: {
      locale: 'de-DE',
      langNotice: 'Die französische Version folgt.',
      msg: {
        required: 'Bitte füll dieses Feld aus.',
        email: 'Diese E-Mail-Adresse sieht nicht ganz richtig aus. Magst du sie noch mal prüfen?',
        satzung: 'Für den Antrag musst du die Satzung und die Beitragsordnung anerkennen.',
        session: 'Bitte wähl einen Termin.',
        dob: 'Dieses Datum sieht nicht ganz richtig aus. Magst du es noch mal prüfen?'
      },
      phTitle: 'Platzhalter: wird noch bestätigt',
      videoDemo: 'Demo: VIDEO 01 läuft hier von unserem eigenen Server, sobald es fertig ist. Kein YouTube, kein Tracking.',
      sessionName: {
        S1: 'Open Play',
        S2: 'First Serve (kostenloses Schnuppertraining)',
        S3: 'First Serve, familienfreundlich',
        S4: 'Kitchen School, Woche 1 von 4',
        S5: 'First Serve'
      },
      hero: { play: 'Abspielen', pause: 'Pause', playLabel: 'Diashow abspielen', pauseLabel: 'Diashow anhalten' },
      gensLabel: 'Sechs Menschen, sechs Lebensalter. Seitlich scrollbar.',
      sessShown: (n) => (n === 1 ? '1 Termin wird angezeigt.' : `${n} Termine werden angezeigt.`),
      sessNone: 'Keine Termine passen zu diesen Filtern.',
      tonightOn: 'AN-Zustand zeigen',
      tonightOff: 'AUS-Zustand zeigen',
      aiSample: 'KI-Beispielbild',
      nearby: 'Auch in der Nähe · nicht von uns organisiert.',
      pin: {
        freiburg: (ph) => `<strong>Freiburg · ${ph('[Ort folgt]')}</strong>. Unser Spielort: Alle fünf Beispieltermine in diesem Monat finden hier statt. In Karten öffnen: Der Link folgt, sobald der Spielort feststeht.`,
        racketzone: (ph, nearby) => `<strong>FT 1844 RACKETzone Freiburg.</strong> ${nearby}`,
        basel: (ph, nearby) => `<strong>Pickleball Hub Basel.</strong> ${nearby}`,
        giebenach: (ph, nearby) => `<strong>Öffentliche Felder in Giebenach.</strong> ${nearby}`,
        liestal: (ph, nearby) => `<strong>Liestal.</strong> ${nearby}`,
        strasbourg: (ph, nearby) => `<strong>Clubs im Elsass ${ph('[noch zu bestätigen]')}: Straßburg.</strong> ${nearby}`,
        guebwiller: (ph, nearby) => `<strong>Clubs im Elsass ${ph('[noch zu bestätigen]')}: Guebwiller.</strong> ${nearby}`
      },
      voteInfo: (town, n) => `<strong>${town}: ${n} Stimmen</strong> <span class="sample">Beispiel</span>. Ab 50 Stimmen planen wir ein kostenloses Pickle Pop-up. <a href="#voteTitle" data-vote-town="${town}">Für ${town} abstimmen</a>`,
      voteOther: 'Danke! Wir haben eine Stimme für einen anderen Ort notiert. Schreib uns über das Kontaktformular, welcher es ist. (Demo: Es wurde nichts gesendet.)',
      voteDone: (town, n) => `${town} hat jetzt ${n} Stimmen. Ab 50 planen wir ein kostenloses Pickle Pop-up. Teil den Link, dann geht’s schneller.`,
      voteAria: (town, n) => `${town}: ${n} Stimmen. Abstimmung zeigen`,
      trial: {
        stepPick: 'Schritt 1 von 2 · Termin wählen',
        stepAbout: 'Schritt 2 von 2 · Über dich',
        waitlisted: 'Auf der Warteliste',
        booked: 'Bestätigt',
        joinWaitlist: 'Auf die Warteliste',
        saveSpot: 'Platz sichern',
        titleFree: 'Kostenloses Schnuppertraining buchen',
        titleSpot: 'Platz sichern',
        doneWaitTitle: (first) => `Du stehst auf der Warteliste, ${first}.`,
        doneSpotTitle: (first) => `Du bist dabei, ${first}!`,
        spotSaved: 'Platz gesichert',
        waitCap: 'Wir halten ein Paddle für dich bereit.',
        spotCap: 'Bis bald auf dem Feld.',
        shareTaster: 'ein kostenloses Pickleball-Schnuppertraining',
        shareSession: (name) => `einen Pickleball-Termin (${name})`,
        shareText: (what, day, start) => `Ich habe ${what} am ${day}, um ${start} Uhr gebucht. Kommst du mit?`,
        shareTextWait: (what, day, start) => `Ich stehe auf der Warteliste für ${what} am ${day}, um ${start} Uhr. Kommst du mit?`,
        copied: (text) => `Kopiert. Einfach in einen Chat einfügen: „${text}“`,
        copyThis: (text) => `Kopier diesen Text: „${text}“`
      },
      member: {
        names: ['Über dich', 'Mitgliedschaft', 'Zahlung', 'Bestätigen'],
        step: (n, name) => `Schritt ${n} von 4 · ${name}`,
        sent: 'Antrag gesendet',
        thanks: (first) => `Danke, ${first}.`,
        labels: { name: 'Name', dob: 'Geburtsdatum', address: 'Anschrift', email: 'E-Mail', language: 'Sprache', membership: 'Mitgliedschaft', guardian: 'Erziehungsberechtigte Person', fee: 'Aufnahmegebühr', payment: 'Zahlung' },
        langNames: { DE: 'Deutsch', FR: 'Französisch', EN: 'Englisch' },
        price: (tier) => `${({ Adult: 'Erwachsene', Reduced: 'Ermäßigt', Youth: 'Jugend', Family: 'Familie', 'Supporting member': 'Fördermitglied' })[tier] || tier} · [__]\u00a0€ / Jahr`,
        feeValue: '0\u00a0€ (First 100, Gründungsmitglied Nr.\u00a0038, Beispiel)',
        sepa: 'SEPA-Lastschrift',
        transfer: 'Überweisung'
      },
      newsOk: 'Schau in dein Postfach. Wir haben dir einen Bestätigungslink geschickt. (Demo: Es wurde nichts gesendet.)',
      contactOk: 'Danke! [Name] antwortet dir innerhalb von 2 Werktagen (unser Ziel). (Demo: Es wurde nichts gesendet.)',
      volunteer: (roles) => `Ich möchte gern mithelfen: ${roles}.`
    }
  };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const html = document.documentElement;
  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => reduceMQ.matches;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const T = STRINGS[(html.lang || '').slice(0, 2)] || STRINGS.de;
  const fmt = {
    date: new Intl.DateTimeFormat(T.locale, { weekday: 'short', day: 'numeric', month: 'short' }),
    year: new Intl.DateTimeFormat(T.locale, { year: 'numeric' }),
    time: new Intl.DateTimeFormat(T.locale, { hour: '2-digit', minute: '2-digit' }),
    num: new Intl.NumberFormat(T.locale)
  };

  // Sample sessions (October 2026). Names live in STRINGS; dates and times are formatted per locale.
  const SESSIONS = {
    S1: { at: new Date(2026, 9, 13, 19, 0), ends: new Date(2026, 9, 13, 20, 30), taster: false, full: false },
    S2: { at: new Date(2026, 9, 15, 18, 30), ends: new Date(2026, 9, 15, 20, 0), taster: true, full: false },
    S3: { at: new Date(2026, 9, 17, 10, 0), ends: new Date(2026, 9, 17, 11, 30), taster: true, full: true },
    S4: { at: new Date(2026, 9, 20, 19, 0), ends: new Date(2026, 9, 20, 20, 30), taster: false, full: false },
    S5: { at: new Date(2026, 9, 22, 18, 30), ends: new Date(2026, 9, 22, 20, 0), taster: true, full: false }
  };
  const sessionDay = (s) => fmt.date.format(s.at);
  const sessionSpan = (s) => `${fmt.time.format(s.at)}–${fmt.time.format(s.ends)}`;

  /* ------------------------------------------------------------------
     Toast (role=status; moves into the top open dialog so it stays visible)
     ------------------------------------------------------------------ */
  const toast = $('#toast');
  const toastMsg = $('#toastMsg');
  const toastX = $('#toastX');
  let toastTimer = 0;
  function topDialog() {
    const open = $$('dialog[open]');
    return open.length ? open[open.length - 1] : null;
  }
  function showToast(text) {
    const host = topDialog() || document.body;
    if (toast.parentElement !== host) host.appendChild(toast);
    toastMsg.textContent = '';
    toast.classList.remove('is-empty');
    toastX.hidden = false;
    requestAnimationFrame(() => { toastMsg.textContent = text; });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 5000);
  }
  function hideToast() {
    clearTimeout(toastTimer);
    const hadFocus = toast.contains(document.activeElement);
    toast.classList.add('is-empty');
    toastMsg.textContent = '';
    toastX.hidden = true;
    if (hadFocus) { const d = topDialog(); (d || $('#main')).focus({ preventScroll: true }); }
  }
  toastX.addEventListener('click', hideToast);

  /* ------------------------------------------------------------------
     Dialogs
     ------------------------------------------------------------------ */
  function lockPage() { html.classList.add('locked'); document.body.classList.add('dialog-open'); }
  function unlockIfNone() {
    if (!$$('dialog[open]').length) { html.classList.remove('locked'); document.body.classList.remove('dialog-open'); }
  }
  function openDialog(dlg, opener) {
    if (!dlg || dlg.open) return;
    dlg._opener = opener || document.activeElement;
    dlg.showModal();
    lockPage();
  }
  $$('dialog').forEach((dlg) => {
    dlg.addEventListener('close', () => {
      if (toast.parentElement === dlg) document.body.appendChild(toast);
      unlockIfNone();
      const o = dlg._opener;
      dlg._opener = null;
      if (o && document.contains(o) && typeof o.focus === 'function') o.focus({ preventScroll: true });
    });
    // click on the backdrop closes slide-overs and sheets
    dlg.addEventListener('click', (e) => {
      if (e.target !== dlg || !dlg.classList.contains('sheet')) return;
      const r = dlg.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) dlg.close();
    });
  });

  document.addEventListener('click', (e) => {
    const closer = e.target.closest('[data-close]');
    if (closer) { const d = closer.closest('dialog'); if (d) d.close(); return; }

    const toastBtn = e.target.closest('[data-toast]');
    if (toastBtn) { e.preventDefault(); showToast(toastBtn.dataset.toast); return; }

    const opener = e.target.closest('[data-open]');
    if (!opener) return;
    e.preventDefault();
    const key = opener.dataset.open;
    const dlg = document.getElementById('dlg-' + key);
    if (!dlg) return;
    let returnTo = opener;
    // opening something from the mobile menu: close the menu, return focus to the menu button later
    const menu = $('#dlg-menu');
    if (menu.open && menu.contains(opener)) { returnTo = menu._opener; menu._opener = null; menu.close(); }
    if (key === 'trial') trial.prepare(opener.dataset.session || null);
    if (key === 'member') member.prepare();
    if (key === 'login') login.prepare();
    openDialog(dlg, returnTo);
    if (key === 'trial') trial.focusStart();
    if (key === 'member') $('#mFirst').focus();
    if (key === 'login') $('#lEmail').focus();
  });

  // mobile menu links: close, then scroll to the section
  $$('[data-close-nav]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const menu = $('#dlg-menu');
      menu._opener = null;
      menu.close();
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  });

  // in-page links: smooth scroll (instant with reduced motion), focus moves to the target
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || a.hasAttribute('data-close-nav') || a.hasAttribute('data-lightbox')) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.getElementById(id.slice(1));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    const focusable = target.matches('a, button, input, select, textarea, [tabindex]');
    if (!focusable) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (history.pushState) history.pushState(null, '', id);
  });

  /* ------------------------------------------------------------------
     Language switcher: DE and EN are links between the two pages;
     the FR button is a stub that shows a notice.
     ------------------------------------------------------------------ */
  $$('button.lang__btn').forEach((b) => b.addEventListener('click', () => showToast(T.langNotice)));

  /* ------------------------------------------------------------------
     Header: transparent over the hero, paper afterwards
     ------------------------------------------------------------------ */
  const header = $('#siteHeader');
  const hero = $('#top');
  if (header && hero) {
    // Transparent only at the very top: the scrim that keeps header text readable lives in the
    // hero slides and scrolls away with them, so the paper header returns as soon as the page moves.
    const setOver = () => {
      const bottom = hero.getBoundingClientRect().bottom;
      header.classList.toggle('is-over', window.scrollY < 8 && bottom > header.offsetHeight + 1);
    };
    setOver();
    if ('IntersectionObserver' in window) {
      const hio = new IntersectionObserver(setOver, { rootMargin: `-${header.offsetHeight}px 0px 0px 0px`, threshold: [0, 0.01] });
      hio.observe(hero);
    }
    let hraf = 0;
    const queue = () => { if (!hraf) hraf = requestAnimationFrame(() => { hraf = 0; setOver(); }); };
    window.addEventListener('resize', queue, { passive: true });
    window.addEventListener('scroll', queue, { passive: true });
  }

  /* ------------------------------------------------------------------
     Hero slideshow: 3 photos, ~6 s each, Ken Burns, pause/play,
     stops by itself after three rounds; off with reduced motion.
     ------------------------------------------------------------------ */
  const slideshow = (() => {
    const slides = $$('.hero__slide');
    const dots = $$('.hero__dots span');
    const controls = $('#heroControls');
    const btn = $('#heroPause');
    const DUR = 6000, ROUNDS = 3;
    let idx = 0, timer = 0, playing = false, shown = 0;
    if (!slides.length || !controls) return null;

    function show(i) {
      slides.forEach((s, k) => {
        const was = s.classList.contains('is-active');
        s.classList.toggle('is-active', k === i);
        if (was && k !== i) {
          s.classList.add('is-leaving');
          setTimeout(() => s.classList.remove('is-leaving'), 2000);
        }
      });
      dots.forEach((d, k) => d.classList.toggle('is-on', k === i));
      idx = i;
    }
    function setBtn() {
      btn.setAttribute('aria-label', playing ? T.hero.pauseLabel : T.hero.playLabel);
      btn.querySelector('use').setAttribute('href', playing ? '#i-pause' : '#i-play');
      btn.querySelector('.hero__pause-txt').textContent = playing ? T.hero.pause : T.hero.play;
      hero.classList.toggle('is-paused', !playing);
    }
    function tick() {
      shown++;
      if (shown >= slides.length * ROUNDS) { show(0); stop(); return; }
      show((idx + 1) % slides.length);
      timer = setTimeout(tick, DUR);
    }
    function play() {
      if (reduced()) return;
      playing = true;
      if (shown >= slides.length * ROUNDS) shown = 0;
      hero.classList.add('kb');
      setBtn();
      clearTimeout(timer);
      timer = setTimeout(tick, DUR);
    }
    function stop() { playing = false; clearTimeout(timer); setBtn(); }
    btn.addEventListener('click', () => (playing ? stop() : play()));

    function init() {
      if (reduced()) {
        stop(); show(0); hero.classList.remove('kb');
        controls.hidden = true;
      } else {
        controls.hidden = false;
        play();
      }
    }
    reduceMQ.addEventListener ? reduceMQ.addEventListener('change', init) : reduceMQ.addListener(init);
    init();
    return { stop };
  })();

  /* ------------------------------------------------------------------
     Photo reveal (clip-path wipe) as large photos enter
     ------------------------------------------------------------------ */
  const wipes = $$('.wipe');
  const finishWipe = (el) => {
    const done = () => { el.classList.add('wipe-done'); el.removeEventListener('transitionend', onEnd); };
    const onEnd = (e) => { if (e.target === el && e.pseudoElement === '::before') done(); };
    el.addEventListener('transitionend', onEnd);
    setTimeout(done, 1600);
  };
  if (!reduced() && 'IntersectionObserver' in window) {
    const wio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        finishWipe(en.target);
        en.target.classList.add('is-in');
        wio.unobserve(en.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -12% 0px' });
    wipes.forEach((el) => wio.observe(el));
  } else {
    wipes.forEach((el) => el.classList.add('is-in', 'wipe-done'));
  }

  /* ------------------------------------------------------------------
     Generations swipe row: "1 / 6" hint + ruler highlight
     ------------------------------------------------------------------ */
  const gensScroller = $('#gensScroller');
  if (gensScroller) {
    const items = $$('.gen', gensScroller);
    const marks = $$('.ruler__mark');
    const count = $('#gensCount');
    const hintTxt = $('.gens__hint-txt');
    let raf = 0;
    const update = () => {
      raf = 0;
      const scrollable = gensScroller.scrollWidth > gensScroller.clientWidth + 4;
      if (scrollable) {
        gensScroller.setAttribute('tabindex', '0');
        gensScroller.setAttribute('role', 'region');
        gensScroller.setAttribute('aria-label', T.gensLabel);
      } else {
        gensScroller.removeAttribute('tabindex');
        gensScroller.removeAttribute('role');
        gensScroller.removeAttribute('aria-label');
      }
      if (!scrollable) { marks.forEach((m) => m.classList.remove('is-on')); return; }
      const left = gensScroller.getBoundingClientRect().left;
      let best = 0, bestD = Infinity;
      const pad = parseFloat(getComputedStyle(gensScroller.firstElementChild).paddingLeft) || 0;
      items.forEach((it, i) => {
        const d = Math.abs(it.getBoundingClientRect().left - left - pad);
        if (d < bestD) { bestD = d; best = i; }
      });
      const atEnd = gensScroller.scrollLeft + gensScroller.clientWidth >= gensScroller.scrollWidth - 4;
      if (atEnd) best = Math.max(best, items.length - 1);
      if (count) count.textContent = `${best + 1} / ${items.length}`;
      if (hintTxt) hintTxt.style.visibility = best === items.length - 1 ? 'hidden' : '';
      marks.forEach((m, i) => m.classList.toggle('is-on', i === best));
    };
    gensScroller.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    window.addEventListener('resize', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------
     Sessions: filters, empty state, Tonight tile
     ------------------------------------------------------------------ */
  const filterBtns = $$('[data-filter]');
  const cards = $$('.sess');
  const empty = $('#sessEmpty');
  const fStatus = $('#filterStatus');
  const activeFilters = new Set();
  function applyFilters() {
    let n = 0;
    cards.forEach((c) => {
      const tags = (c.dataset.tags || '').split(/\s+/);
      const ok = [...activeFilters].every((f) => tags.includes(f));
      c.hidden = !ok;
      if (ok) n++;
    });
    empty.hidden = n > 0;
    fStatus.textContent = n ? T.sessShown(n) : T.sessNone;
  }
  filterBtns.forEach((b) => b.addEventListener('click', () => {
    const on = b.getAttribute('aria-pressed') !== 'true';
    b.setAttribute('aria-pressed', String(on));
    on ? activeFilters.add(b.dataset.filter) : activeFilters.delete(b.dataset.filter);
    applyFilters();
  }));
  $('#clearFilters').addEventListener('click', () => {
    activeFilters.clear();
    filterBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    applyFilters();
    filterBtns[0].focus();
  });
  const tToggle = $('#tonightToggle');
  tToggle.addEventListener('click', () => {
    const off = tToggle.getAttribute('aria-pressed') !== 'true';
    tToggle.setAttribute('aria-pressed', String(off));
    tToggle.textContent = off ? T.tonightOn : T.tonightOff;
    $('#tonightOn').hidden = off;
    $('#tonightOff').hidden = !off;
    $('#tonight').setAttribute('aria-labelledby', off ? 'tonightTitleOff' : 'tonightTitle');
  });

  /* ------------------------------------------------------------------
     Court hotspots (photo 06)
     ------------------------------------------------------------------ */
  const spots = $$('.spot');
  const notes = $$('.note');
  const rules = $$('.rules li');
  const wideMQ = window.matchMedia('(min-width: 900px)');
  function closeNotes() {
    spots.forEach((s) => s.setAttribute('aria-expanded', 'false'));
    notes.forEach((n) => { n.hidden = true; n.style.removeProperty('--nx'); n.style.removeProperty('--ny'); n.classList.remove('note--left'); });
    rules.forEach((r) => r.classList.remove('is-hl'));
  }
  spots.forEach((s) => s.addEventListener('click', () => {
    const wasOpen = s.getAttribute('aria-expanded') === 'true';
    closeNotes();
    if (wasOpen) return;
    s.setAttribute('aria-expanded', 'true');
    const note = document.getElementById(s.getAttribute('aria-controls'));
    note.hidden = false;
    const x = parseFloat(s.style.getPropertyValue('--x'));
    const y = parseFloat(s.style.getPropertyValue('--y'));
    if (wideMQ.matches) {
      note.style.setProperty('--nx', x + '%');
      note.style.setProperty('--ny', y + '%');
      note.classList.toggle('note--left', x > 58);
    }
    const n = parseInt(s.dataset.note, 10);
    if (n && rules[n - 1]) rules[n - 1].classList.add('is-hl');
  }));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !topDialog() && spots.some((s) => s.getAttribute('aria-expanded') === 'true')) {
      const open = spots.find((s) => s.getAttribute('aria-expanded') === 'true');
      closeNotes();
      open.focus();
    }
  });

  /* video placeholder */
  $('#videoBtn').addEventListener('click', () => showToast(T.videoDemo));

  /* ------------------------------------------------------------------
     Gallery lightbox
     ------------------------------------------------------------------ */
  const lb = $('#dlg-lightbox');
  const lbImg = $('#lbImg');
  const tiles = $$('[data-lightbox]');
  let lbI = 0;
  function renderLb() {
    const a = tiles[lbI];
    const img = a.querySelector('img');
    lbImg.src = a.getAttribute('href');
    lbImg.alt = img.alt;
    lbImg.width = img.width; lbImg.height = img.height;
    $('#lbTag').textContent = `${T.aiSample} · ${a.querySelector('.ai-tag').dataset.code}`;
    $('#lbCap').textContent = a.dataset.caption;
    $('#lbCount').textContent = `${lbI + 1} / ${tiles.length}`;
  }
  tiles.forEach((a, i) => a.addEventListener('click', (e) => {
    e.preventDefault();
    lbI = i;
    renderLb();
    openDialog(lb, a);
  }));
  const lbStep = (d) => { lbI = (lbI + d + tiles.length) % tiles.length; renderLb(); };
  $('#lbPrev').addEventListener('click', () => lbStep(-1));
  $('#lbNext').addEventListener('click', () => lbStep(1));
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); lbStep(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); lbStep(-1); }
  });
  lb.addEventListener('close', () => { lbImg.removeAttribute('src'); });

  /* ------------------------------------------------------------------
     Map pins + town vote
     ------------------------------------------------------------------ */
  const PH = (t) => `<span class="ph" title="${T.phTitle}">${t}</span>`;
  const votes = { loerrach: ['Lörrach', 43], offenburg: ['Offenburg', 28], konstanz: ['Konstanz', 19], waldshut: ['Waldshut-Tiengen', 11], vs: ['Villingen-Schwenningen', 9], emmendingen: ['Emmendingen', 7] };
  const mapScroll = $('.map-scroll');
  let mapAuto = -1;
  function centreMap() {
    if (!mapScroll || mapScroll.scrollWidth <= mapScroll.clientWidth + 4) return;
    if (mapAuto !== -1 && mapScroll.scrollLeft !== mapAuto) return; // the visitor has moved it
    const box = mapScroll.getBoundingClientRect();
    const pin = $('.pin--venue').getBoundingClientRect();
    const label = $('.m-label--venue').getBoundingClientRect();
    const mid = (Math.min(pin.left, label.left) + Math.max(pin.right, label.right)) / 2 - box.left + mapScroll.scrollLeft;
    mapScroll.scrollLeft = Math.max(0, Math.round(mid - mapScroll.clientWidth / 2));
    mapAuto = mapScroll.scrollLeft;
  }
  centreMap();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(centreMap);
  const mapInfo = $('#mapInfo');
  const pins = $$('.pin');
  pins.forEach((p) => {
    p.setAttribute('aria-pressed', 'false');
    p.addEventListener('click', () => {
      pins.forEach((o) => o.setAttribute('aria-pressed', String(o === p)));
      const k = p.dataset.pin;
      if (votes[k]) {
        const [town, n] = votes[k];
        mapInfo.innerHTML = T.voteInfo(town, fmt.num.format(n));
      } else {
        mapInfo.innerHTML = T.pin[k](PH, T.nearby);
      }
    });
  });
  const voteForm = $('#voteForm');
  const voteTown = $('#voteTown');
  mapInfo.addEventListener('click', (e) => {
    const a = e.target.closest('[data-vote-town]');
    if (!a) return;
    e.preventDefault();
    voteTown.value = a.dataset.voteTown;
    voteTown.focus();
  });
  voteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#voteEmail');
    const ok = $('#voteOk');
    if (email.value.trim() && !EMAIL_RE.test(email.value.trim())) {
      ok.textContent = '';
      setErr(email, T.msg.email);
      email.focus();
      return;
    }
    setErr(email, '');
    const town = voteTown.value;
    if (town === 'Other') {
      ok.textContent = T.voteOther;
      return;
    }
    const li = $(`#votesList [data-town="${town}"]`);
    const nEl = li.querySelector('.votes__n');
    const n = parseInt(nEl.textContent, 10) + 1;
    nEl.textContent = String(n);
    li.querySelector('.votes__bar span').style.width = Math.min(100, n * 2) + '%';
    li.classList.add('is-new');
    const listN = $(`[data-list-town="${town}"] .map-list__n`);
    if (listN) listN.textContent = String(n);
    const key = Object.keys(votes).find((k) => votes[k][0] === town);
    if (key) {
      votes[key][1] = n;
      const pin = $(`.pin[data-pin="${key}"]`);
      if (pin) pin.setAttribute('aria-label', T.voteAria(town, fmt.num.format(n)));
    }
    ok.textContent = T.voteDone(town, fmt.num.format(n));
  });

  /* ------------------------------------------------------------------
     Shared form helpers
     ------------------------------------------------------------------ */
  function setErr(input, msg) {
    const err = document.getElementById(input.id + 'Err');
    if (msg) {
      input.setAttribute('aria-invalid', 'true');
      if (err) { err.textContent = msg; err.hidden = false; }
    } else {
      input.removeAttribute('aria-invalid');
      if (err) { err.textContent = ''; err.hidden = true; }
    }
  }
  function check(input, kind) {
    const v = (input.value || '').trim();
    let msg = '';
    if (kind === 'required' || kind === 'email') { if (!v) msg = T.msg.required; }
    if (!msg && kind === 'email' && !EMAIL_RE.test(v)) msg = T.msg.email;
    setErr(input, msg);
    return !msg;
  }
  /** fields: [[input, kind], ...] → returns true when all valid; focuses first invalid */
  function validate(fields) {
    let first = null;
    fields.forEach(([el, kind]) => { if (!check(el, kind) && !first) first = el; });
    if (first) first.focus();
    return !first;
  }
  // clear an error as soon as the field becomes valid
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.getAttribute && el.getAttribute('aria-invalid') === 'true' && el.id) {
      const kind = el.type === 'email' ? 'email' : 'required';
      if ((el.value || '').trim() && (kind !== 'email' || EMAIL_RE.test(el.value.trim()))) setErr(el, '');
    }
  });

  /* ------------------------------------------------------------------
     Trial booking (First Serve)
     ------------------------------------------------------------------ */
  const trial = (() => {
    const dlg = $('#dlg-trial');
    const form = $('#trialForm');
    const stepTxt = $('#trialStep');
    const steps = { 1: $('[data-wstep="1"]', dlg), 2: $('[data-wstep="2"]', dlg), 3: $('[data-wstep="3"]', dlg) };
    const submit = $('#trialSubmit');
    const waitNote = $('#waitNote');
    const minor = $('#tMinor');
    const guardian = $('#tGuardian');
    const friendsVal = $('#friendsVal');
    const stepBtns = $$('.stepper__btn', dlg);
    const titleEl = $('#trialTitle');
    let friends = 0, current = 1, sessionId = null;

    function go(n) {
      current = n;
      Object.entries(steps).forEach(([k, el]) => { el.hidden = Number(k) !== n; });
      const s = SESSIONS[sessionId];
      if (n === 1) stepTxt.textContent = T.trial.stepPick;
      if (n === 2) stepTxt.textContent = T.trial.stepAbout;
      if (n === 3) stepTxt.textContent = s && s.full ? T.trial.waitlisted : T.trial.booked;
      dlg.querySelector('.sheet__body').scrollTop = 0;
    }
    function selected() { const r = $('input[name="session"]:checked', form); return r ? r.value : null; }
    function syncMode() {
      sessionId = selected();
      const full = sessionId && SESSIONS[sessionId].full;
      submit.textContent = full ? T.trial.joinWaitlist : T.trial.saveSpot;
      waitNote.hidden = !full;
      const s = sessionId && SESSIONS[sessionId];
      titleEl.textContent = !s ? T.trial.titleFree : s.full ? T.trial.joinWaitlist : s.taster ? T.trial.titleFree : T.trial.titleSpot;
    }
    function setFriends(v) {
      friends = Math.max(0, Math.min(2, v));
      friendsVal.textContent = String(friends);
      stepBtns[0].disabled = friends === 0;
      stepBtns[1].disabled = friends === 2;
    }
    function prepare(preselect) {
      form.reset();
      setFriends(0);
      guardian.hidden = true;
      $$('[aria-invalid]', dlg).forEach((el) => setErr(el, ''));
      sessionError('');
      if (preselect) { const r = $(`input[name="session"][value="${preselect}"]`, form); if (r) r.checked = true; }
      syncMode();
      go(1);
    }
    function focusStart() {
      const r = $('input[name="session"]:checked', form) || $('input[name="session"]', form);
      if (r) r.focus();
    }
    const sessionErr = $('#sessionErr');
    function sessionError(msg) {
      sessionErr.textContent = msg; sessionErr.hidden = !msg;
      $$('input[name="session"]', form).forEach((r) => { if (msg) r.setAttribute('aria-invalid', 'true'); else r.removeAttribute('aria-invalid'); });
    }

    form.addEventListener('change', (e) => {
      if (e.target.name === 'session') { syncMode(); sessionError(''); }
      if (e.target === minor) {
        guardian.hidden = !minor.checked;
        if (!minor.checked) { setErr($('#tgName'), ''); setErr($('#tgEmail'), ''); }
      }
    });
    stepBtns.forEach((b) => b.addEventListener('click', () => setFriends(friends + Number(b.dataset.step))));
    $('[data-wnext]', dlg).addEventListener('click', () => {
      if (!selected()) { sessionError(T.msg.session); $('input[name="session"]', form).focus(); return; }
      go(2);
      $('#tFirst').focus();
    });
    $('[data-wback]', dlg).addEventListener('click', () => { go(1); focusStart(); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (current === 1) { $('[data-wnext]', dlg).click(); return; }
      const fields = [[$('#tFirst'), 'required'], [$('#tEmail'), 'email']];
      if (minor.checked) fields.push([$('#tgName'), 'required'], [$('#tgEmail'), 'email']);
      if (!validate(fields)) return;
      const s = SESSIONS[sessionId];
      const first = $('#tFirst').value.trim();
      $('#doneSession').textContent = `${T.sessionName[sessionId]} · ${sessionDay(s)} ${fmt.year.format(s.at)} · ${sessionSpan(s)}`;
      const title = $('#doneTitle');
      if (s.full) {
        title.textContent = T.trial.doneWaitTitle(first);
        $('#doneWait').hidden = false;
        $('#doneBadge').textContent = T.trial.waitlisted;
        $('#doneCap').textContent = T.trial.waitCap;
        $('#doneCancel').hidden = true;
        $('#doneBring').hidden = true;
      } else {
        title.textContent = T.trial.doneSpotTitle(first);
        $('#doneWait').hidden = true;
        $('#doneBadge').textContent = T.trial.spotSaved;
        $('#doneCap').textContent = T.trial.spotCap;
        $('#doneCancel').hidden = false;
        $('#doneBring').hidden = false;
      }
      go(3);
      title.focus();
    });

    $('#shareBtn').addEventListener('click', async () => {
      const id = SESSIONS[sessionId] ? sessionId : 'S2';
      const s = SESSIONS[id];
      const what = s.taster ? T.trial.shareTaster : T.trial.shareSession(T.sessionName[id]);
      const text = s.full
        ? T.trial.shareTextWait(what, sessionDay(s), fmt.time.format(s.at))
        : T.trial.shareText(what, sessionDay(s), fmt.time.format(s.at));
      try {
        if (navigator.share) { await navigator.share({ text }); return; }
      } catch (err) { if (err && err.name === 'AbortError') return; }
      try {
        await navigator.clipboard.writeText(text);
        showToast(T.trial.copied(text));
      } catch (err) {
        showToast(T.trial.copyThis(text));
      }
    });
    return { prepare, focusStart };
  })();

  /* ------------------------------------------------------------------
     Membership application (4 steps)
     ------------------------------------------------------------------ */
  const member = (() => {
    const dlg = $('#dlg-member');
    const form = $('#memForm');
    const stepTxt = $('#memStepTxt');
    const names = T.member.names;
    const prog = $$('#memProgress li');
    const dob = $('#mDob');
    const dobParts = [$('#mDobD'), $('#mDobM'), $('#mDobY')];
    const dobDate = () => {
      const [d, m, y] = dobParts.map((el) => parseInt(el.value, 10));
      if (!d || !m || !y || y < 1900) return null;
      const dt = new Date(y, m - 1, d);
      if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
      return dt;
    };
    const dobText = () => dobParts.map((el) => el.value.trim().padStart(el === dobParts[2] ? 4 : 2, '0')).join('.');
    function setDobErr(msg) {
      dobParts.forEach((el) => { if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid'); });
      const err = $('#mDobErr');
      err.textContent = msg; err.hidden = !msg;
    }
    const guardian = $('#mGuardian');
    let current = 1, autoYouth = false;

    function age(d) {
      if (!d) return null;
      const now = new Date();
      let a = now.getFullYear() - d.getFullYear();
      const m = now.getMonth() - d.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--;
      return a;
    }
    function go(n) {
      current = n;
      $$('[data-mstep]', dlg).forEach((el) => { el.hidden = Number(el.dataset.mstep) !== n; });
      prog.forEach((li, i) => {
        li.classList.toggle('is-done', i < n - 1 || n === 5);
        li.classList.toggle('is-current', i === n - 1);
        if (i === n - 1) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
      stepTxt.textContent = n <= 4 ? T.member.step(n, names[n - 1]) : T.member.sent;
      dlg.querySelector('.sheet__body').scrollTop = 0;
      const firstField = n <= 4 ? $(`[data-mstep="${n}"] input:not([disabled]), [data-mstep="${n}"] select`, dlg) : null;
      if (firstField) firstField.focus();
    }
    function prepare() {
      form.reset();
      autoYouth = false;
      guardian.hidden = true;
      $('#familyNote').hidden = true;
      $('#sepaBlock').hidden = false;
      $('#transferBlock').hidden = true;
      $$('[aria-invalid]', dlg).forEach((el) => setErr(el, ''));
      setErr($('#mAccept'), '');
      setDobErr('');
      go(1);
    }
    function syncAge() {
      const a = age(dobDate());
      const isMinor = a !== null && a >= 0 && a < 18;
      guardian.hidden = !isMinor;
      const youth = $('input[name="tier"][value="Youth"]', form);
      if (isMinor && !youth.checked) { youth.checked = true; autoYouth = true; }
      if (!isMinor && autoYouth) { $('input[name="tier"][value="Adult"]', form).checked = true; autoYouth = false; }
      syncTier();
    }
    function syncTier() {
      const t = $('input[name="tier"]:checked', form);
      $('#familyNote').hidden = !(t && t.value === 'Family');
    }
    dobParts.forEach((el) => el.addEventListener('input', () => {
      syncAge();
      if (el.getAttribute('aria-invalid') === 'true' && dobDate()) setDobErr('');
    }));
    form.addEventListener('change', (e) => {
      if (e.target.name === 'tier') { autoYouth = false; syncTier(); }
      if (e.target.name === 'pay') {
        const sepa = e.target.value === 'sepa';
        $('#sepaBlock').hidden = !sepa;
        $('#transferBlock').hidden = sepa;
      }
      if (e.target.id === 'mAccept' && e.target.checked) setErr(e.target, '');
    });

    function validStep(n) {
      if (n === 1) {
        const f = [[$('#mFirst'), 'required'], [$('#mLast'), 'required'], [$('#mStreet'), 'required'],
          [$('#mPost'), 'required'], [$('#mTown'), 'required'], [$('#mEmail'), 'email']];
        if (!guardian.hidden) f.push([$('#mgName'), 'required'], [$('#mgEmail'), 'email']);
        const fieldsOk = validate(f);
        const empty = dobParts.some((el) => !el.value.trim());
        const a = age(dobDate());
        const dobMsg = empty ? T.msg.required : (a === null || a < 0 || a > 120) ? T.msg.dob : '';
        setDobErr(dobMsg);
        if (dobMsg) {
          const firstBad = f.find(([el]) => el.getAttribute('aria-invalid') === 'true');
          const dobFirst = dobParts.find((el) => !el.value.trim()) || dobParts[0];
          // focus whichever invalid field comes first in the form
          if (!firstBad || (dobFirst.compareDocumentPosition(firstBad[0]) & Node.DOCUMENT_POSITION_FOLLOWING)) dobFirst.focus();
          return false;
        }
        return fieldsOk;
      }
      if (n === 4) {
        const acc = $('#mAccept');
        if (!acc.checked) { setErr(acc, T.msg.satzung); acc.focus(); return false; }
        setErr(acc, '');
      }
      return true;
    }
    function buildSummary() {
      const v = (id) => $(id).value.trim();
      const tier = $('input[name="tier"]:checked', form).value;
      const pay = $('input[name="pay"]:checked', form).value === 'sepa' ? T.member.sepa : T.member.transfer;
      const lang = $('input[name="mlang"]:checked', form).value;
      const L = T.member.labels;
      const rows = [
        [L.name, `${v('#mFirst')} ${v('#mLast')}`],
        [L.dob, dobText()],
        [L.address, `${v('#mStreet')}, ${v('#mPost')} ${v('#mTown')}, ${$('#mCountry').value}`],
        [L.email, v('#mEmail')],
        [L.language, (T.member.langNames && T.member.langNames[lang]) || lang],
        [L.membership, T.member.price(tier)],
        [L.fee, T.member.feeValue],
        [L.payment, pay]
      ];
      if (!guardian.hidden) rows.splice(4, 0, [L.guardian, `${v('#mgName')} · ${v('#mgEmail')}`]);
      const dl = $('#memSummary');
      dl.textContent = '';
      rows.forEach(([k, val]) => {
        const div = document.createElement('div');
        const dt = document.createElement('dt'); dt.textContent = k;
        const dd = document.createElement('dd'); dd.textContent = val;
        div.append(dt, dd); dl.append(div);
      });
    }
    $$('[data-mnext]', dlg).forEach((b) => b.addEventListener('click', () => {
      if (!validStep(current)) return;
      const next = current + 1;
      if (next === 3) {
        const holder = $('#mHolder');
        if (!holder.value.trim() || holder.dataset.auto === '1') {
          holder.value = `${$('#mFirst').value.trim()} ${$('#mLast').value.trim()}`.trim();
          holder.dataset.auto = '1';
        }
      }
      if (next === 4) buildSummary();
      go(next);
    }));
    $('#mHolder').addEventListener('input', (e) => { e.target.dataset.auto = '0'; });
    $$('[data-mback]', dlg).forEach((b) => b.addEventListener('click', () => go(current - 1)));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (current < 4) { $(`[data-mstep="${current}"] [data-mnext]`, dlg).click(); return; }
      if (!validStep(4)) return;
      $('#memDoneTitle').textContent = T.member.thanks($('#mFirst').value.trim());
      go(5);
      $('#memDoneTitle').focus();
    });
    return { prepare };
  })();

  /* ------------------------------------------------------------------
     Member login + dashboard preview
     ------------------------------------------------------------------ */
  const login = (() => {
    const form = $('#loginForm');
    function prepare() {
      form.reset();
      form.hidden = false;
      setErr($('#lEmail'), '');
      $('#loginSent').hidden = true;
      $('#loginStart').hidden = false;
      $('#dash').hidden = true;
    }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate([[$('#lEmail'), 'email']])) return;
      form.hidden = true;
      $('#loginSent').hidden = false;
      $('#loginSentMsg').focus();
    });
    $('#previewDash').addEventListener('click', () => {
      $('#loginStart').hidden = true;
      $('#dash').hidden = false;
      $('#dashHi').focus();
    });
    return { prepare };
  })();

  /* ------------------------------------------------------------------
     Newsletter + contact + volunteer chips
     ------------------------------------------------------------------ */
  $('#newsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = $('#newsOk');
    if (!validate([[$('#newsEmail'), 'email']])) { ok.textContent = ''; return; }
    ok.textContent = T.newsOk;
  });
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = $('#contactOk');
    if ($('#cWebsite').value) return; // honeypot
    if (!validate([[$('#cName'), 'required'], [$('#cEmail'), 'email'], [$('#cMsg'), 'required']])) { ok.textContent = ''; return; }
    ok.textContent = T.contactOk;
  });
  $$('.vol-chips .chip').forEach((c) => c.addEventListener('click', () => {
    c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true'));
  }));
  $$('[data-topic]').forEach((a) => a.addEventListener('click', () => {
    const sel = $('#cTopic');
    sel.value = a.dataset.topic;
    if (a.dataset.topic === 'Volunteering') {
      const roles = $$('.vol-chips .chip[aria-pressed="true"]').map((c) => c.textContent.trim());
      const msg = $('#cMsg');
      if (roles.length && !msg.value.trim()) msg.value = T.volunteer(roles.join(', '));
    }
  }));
})();

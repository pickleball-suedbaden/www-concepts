/* Concept A: Paddle Passport. Vanilla JS, no build step. Every form is a demo: nothing leaves the page.
   The only thing stored is one non-personal demo flag (pp-demo-stamp) for the passport stamp. */
(() => {
  'use strict';

  /* Every string the script writes, per page language. The page's <html lang> picks the table; German is the default. */
  const STRINGS = {
    en: {
      locale: 'en-GB',
      phTitle: 'Placeholder: to be confirmed',
      frNotice: 'The French version is coming soon.',
      msg: {
        req: 'Please fill this in.',
        email: 'That email address doesn’t look quite right. Mind checking it?',
        satzung: 'Please accept the Satzung and Beitragsordnung to apply.',
        session: 'Please pick a session.',
        date: 'Please check this date.'
      },
      freeFirst: 'Free first time',
      freeTaster: 'a free pickleball taster',
      trialTitle: { free: 'BOOK A FREE TASTER', paid: 'BOOK A SESSION' },
      submit: { save: 'Save my spot', waitlist: 'Join the waitlist' },
      sessions: {
        S1: { svc: 'Open Play', status: '8 of 16 left', share: 'pickleball Open Play',
          fare: (p) => `Members €0 · <span class="nw">Guests ${p('€[__]')}</span>` },
        S2: { svc: 'First Serve', status: '6 of 16 left' },
        S3: { svc: 'First Serve, family-friendly', status: 'Full · waitlist' },
        S4: { svc: 'Kitchen School, week 1 of 4', status: 'Last 3 of 12', share: 'the pickleball Kitchen School (week 1 of 4)',
          fare: (p) => `4-week course: <span class="nw">Members ${p('€[__]')} ·</span> <span class="nw">Guests ${p('€[__]')}</span>` },
        S5: { svc: 'First Serve', status: '10 of 16 left' }
      },
      confirm: {
        waitlistTitle: (first) => `You’re on the waitlist, ${first}.`,
        inTitle: (first) => `You’re in, ${first}!`,
        waitNo: 'No. 3',
        one: '1',
        oneWith: (n) => `1 (+${n})`,
        admitWaitlist: 'WAITLIST',
        admit: 'ADMIT',
        seeStamp: 'See my passport stamp',
        done: 'Done'
      },
      ics: (short, time) => `Demo: you’d download an .ics calendar file for ${short}, ${time}.`,
      shareText: (what, short, time) => `I’ve booked ${what} on ${short}, ${time}. Come too?`,
      copied: (text) => `Copied to share: “${text}”`,
      copyThis: (text) => `Copy this to share: “${text}”`,
      stamp: {
        line: (date) => `FIRST SERVE · ${date} · FREIBURG ·`,
        collected: 'Stamp 1 collected (demo)',
        reset: 'Reset demo',
        first: 'Get your first stamp',
        next: 'Book your next visit'
      },
      board: {
        showing: (n, total) => `Showing ${n} of ${total} departures.`,
        none: 'No departures match these filters.'
      },
      member: {
        summary: { name: 'Name', dob: 'Date of birth', address: 'Address', email: 'Email', language: 'Language', guardian: 'Guardian', membership: 'Membership', payment: 'Payment' },
        address: (street, zip, town, country) => `${street}, ${zip} ${town}, ${country}`,
        guardian: (name, email) => `${name} (${email})`,
        fee: (tier) => `${tier} · €[__] / year · joining fee €0 (First 100)`,
        sepa: 'SEPA direct debit',
        transfer: 'Bank transfer',
        thanksBefore: (first) => `Thanks, ${first}. We’ll confirm by email within `,
        thanksAfter: '. Your membership starts once the board approves it.'
      },
      voting: {
        sample: 'Your votes · sample',
        nearby: 'Also playing nearby · not run by us',
        voteFor: (town) => `Vote for ${town}`,
        votesSoFar: (n) => `${n} votes so far. At 50 we plan a free Pickle Pop-up.`,
        back: 'Back to our venue',
        pinLabel: (town, n) => `${town}: ${n} votes. Show the vote`,
        other: 'Thanks for voting. Tell us your town through the contact form and we’ll add it to the map.',
        result: (town, n) => `${town} now has ${n} votes. At 50 we plan a free Pickle Pop-up. Share the link and we’ll get there faster.`
      },
      neighbours: {
        'nb-racketzone': { name: 'FT 1844 RACKETzone Freiburg', body: 'FT 1844 RACKETzone Freiburg: not run by us. Another place to play in Freiburg.' },
        'nb-basel': { name: 'Pickleball Hub Basel', body: 'Pickleball Hub Basel: not run by us. Friends across the border.' },
        'nb-giebenach': { name: 'Public courts Giebenach', body: 'Public courts in Giebenach: not run by us. Friends across the border.' },
        'nb-liestal': { name: 'Liestal', body: 'Liestal: not run by us. Friends across the border.' },
        'nb-strasbourg': { name: 'Strasbourg', body: 'An Alsace club in Strasbourg [to confirm]: not run by us. Friends across the border.' },
        'nb-guebwiller': { name: 'Guebwiller', body: 'An Alsace club in Guebwiller [to confirm]: not run by us. Friends across the border.' }
      },
      contactNote: (note) => `I’d like to help with: ${note}.`,
      rules: {
        service: ['Rule 1 · Service box:', 'Serve underhand, diagonally across the court.'],
        baseline: ['Rule 2 · Two bounces:', 'Let it bounce once on each side before anyone volleys. That’s the two-bounce rule.'],
        kitchen: ['Rule 3 · Kitchen:', 'Don’t volley from the kitchen: the 2.13 m (7 ft) zone on each side of the net. Step in any time, but there the ball has to bounce first.']
      },
      tonight: { showOn: 'Show ON state (demo)', showOff: 'Show OFF state (demo)' }
    },
    de: {
      locale: 'de-DE',
      phTitle: 'Platzhalter: wird noch bestätigt',
      frNotice: 'Die französische Version folgt.',
      msg: {
        req: 'Bitte füll dieses Feld aus.',
        email: 'Diese E-Mail-Adresse sieht nicht ganz richtig aus. Magst du sie noch mal prüfen?',
        satzung: 'Für den Antrag musst du die Satzung und die Beitragsordnung anerkennen.',
        session: 'Bitte wähl einen Termin.',
        date: 'Dieses Datum sieht nicht ganz richtig aus. Magst du es noch mal prüfen?'
      },
      freeFirst: 'Erster Termin kostenlos',
      freeTaster: 'ein kostenloses Pickleball-Schnuppertraining',
      trialTitle: { free: 'KOSTENLOS SCHNUPPERN', paid: 'TERMIN BUCHEN' },
      submit: { save: 'Platz sichern', waitlist: 'Auf die Warteliste' },
      sessions: {
        S1: { svc: 'Open Play', status: 'noch 8 von 16 frei', share: 'einen Platz beim Pickleball-Open-Play',
          fare: (p) => `Mitglieder 0\u00a0€ · <span class="nw">Gäste ${p('[__]\u00a0€')}</span>` },
        S2: { svc: 'First Serve', status: 'noch 6 von 16 frei' },
        S3: { svc: 'First Serve, familienfreundlich', status: 'Ausgebucht · Warteliste' },
        S4: { svc: 'Kitchen School, Woche 1 von 4', status: 'Nur noch 3 von 12', share: 'einen Platz in der Pickleball-Kitchen-School (Woche 1 von 4)',
          fare: (p) => `4-Wochen-Kurs: <span class="nw">Mitglieder ${p('[__]\u00a0€')} ·</span> <span class="nw">Gäste ${p('[__]\u00a0€')}</span>` },
        S5: { svc: 'First Serve', status: 'noch 10 von 16 frei' }
      },
      confirm: {
        waitlistTitle: (first) => `Du stehst auf der Warteliste, ${first}.`,
        inTitle: (first) => `Du bist dabei, ${first}!`,
        waitNo: 'Nr.\u00a03',
        one: '1',
        oneWith: (n) => `1 (+${n})`,
        admitWaitlist: 'WARTE\u00adLISTE',
        admit: 'EINLASS',
        seeStamp: 'Meinen Stempel ansehen',
        done: 'Fertig'
      },
      ics: (short, time) => `Demo: Hier würde eine Kalenderdatei (.ics) für ${short}, ${time}\u00a0Uhr heruntergeladen.`,
      shareText: (what, short, time) => `Ich habe ${what} am ${short}, um ${time}\u00a0Uhr gebucht. Kommst du mit?`,
      copied: (text) => `Zum Teilen kopiert: „${text}“`,
      copyThis: (text) => `Kopier das zum Teilen: „${text}“`,
      stamp: {
        line: (date) => `FIRST SERVE · ${date} · FREIBURG ·`,
        collected: 'Stempel 1 gesammelt (Demo)',
        reset: 'Demo zurücksetzen',
        first: 'Ersten Stempel holen',
        next: 'Nächsten Besuch buchen'
      },
      board: {
        showing: (n, total) => `Angezeigte Abfahrten: ${n} von ${total}.`,
        none: 'Keine Abfahrten passen zu diesen Filtern.'
      },
      member: {
        summary: { name: 'Name', dob: 'Geburtsdatum', address: 'Anschrift', email: 'E-Mail', language: 'Sprache', guardian: 'Erziehungsberechtigte Person', membership: 'Mitgliedschaft', payment: 'Zahlung' },
        address: (street, zip, town, country) => `${street}, ${zip} ${town}, ${country}`,
        guardian: (name, email) => `${name} (${email})`,
        fee: (tier) => `${{ Adult: 'Erwachsene', Reduced: 'Ermäßigt', Youth: 'Jugend', Family: 'Familie', 'Supporting member': 'Fördermitglied' }[tier] || tier} · [__]\u00a0€ / Jahr · Aufnahmegebühr 0\u00a0€ (First 100)`,
        sepa: 'SEPA-Lastschrift',
        transfer: 'Überweisung',
        thanksBefore: (first) => `Danke, ${first}. Du bekommst innerhalb von `,
        thanksAfter: ' eine Bestätigung per E-Mail. Deine Mitgliedschaft beginnt, sobald der Vorstand zugestimmt hat.'
      },
      voting: {
        sample: 'Eure Stimmen · Beispiel',
        nearby: 'Auch in der Nähe · nicht von uns organisiert',
        voteFor: (town) => `Für ${town} abstimmen`,
        votesSoFar: (n) => `Bisher ${n} Stimmen. Ab 50 planen wir ein kostenloses Pickle Pop-up.`,
        back: 'Zurück zu unserem Spielort',
        pinLabel: (town, n) => `${town}: ${n} Stimmen. Abstimmung zeigen`,
        other: 'Danke fürs Abstimmen! Schreib uns deinen Ort über das Kontaktformular, dann nehmen wir ihn in die Karte auf.',
        result: (town, n) => `${town} hat jetzt ${n} Stimmen. Ab 50 planen wir ein kostenloses Pickle Pop-up. Teil den Link, dann geht’s schneller.`
      },
      neighbours: {
        'nb-racketzone': { name: 'FT 1844 RACKETzone Freiburg', body: 'FT 1844 RACKETzone Freiburg: nicht von uns organisiert. Noch ein Ort zum Spielen in Freiburg.' },
        'nb-basel': { name: 'Pickleball Hub Basel', body: 'Pickleball Hub Basel: nicht von uns organisiert. Befreundet über die Grenze hinweg.' },
        'nb-giebenach': { name: 'Öffentliche Felder Giebenach', body: 'Öffentliche Pickleball-Felder in Giebenach: nicht von uns organisiert. Befreundet über die Grenze hinweg.' },
        'nb-liestal': { name: 'Liestal', body: 'Liestal: nicht von uns organisiert. Befreundet über die Grenze hinweg.' },
        'nb-strasbourg': { name: 'Straßburg', body: 'Ein Club im Elsass, in Straßburg [noch zu bestätigen]: nicht von uns organisiert. Befreundet über die Grenze hinweg.' },
        'nb-guebwiller': { name: 'Guebwiller', body: 'Ein Club im Elsass, in Guebwiller [noch zu bestätigen]: nicht von uns organisiert. Befreundet über die Grenze hinweg.' }
      },
      contactNote: (note) => `Ich möchte mithelfen: ${note}.`,
      rules: {
        service: ['Regel 1 · Aufschlagfeld:', 'Aufschlag von unten, diagonal über das Feld.'],
        baseline: ['Regel 2 · Zwei Aufsprünge:', 'Der Ball muss auf jeder Seite einmal aufspringen, bevor jemand ihn aus der Luft schlagen darf. Das ist die Two-Bounce-Regel.'],
        kitchen: ['Regel 3 · Kitchen:', 'Kein Volley aus der Kitchen, der 2,13\u00a0m tiefen Zone auf jeder Seite des Netzes. Hineingehen darfst du jederzeit, aber dort muss der Ball erst aufspringen.']
      },
      tonight: { showOn: 'AN-Zustand zeigen (Demo)', showOff: 'AUS-Zustand zeigen (Demo)' }
    }
  };
  const LANG = Object.prototype.hasOwnProperty.call(STRINGS, document.documentElement.lang) ? document.documentElement.lang : 'de';
  const T = STRINGS[LANG];
  const MSG = T.msg;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = () => (reduceMotion() ? 'auto' : 'smooth');

  /* Dates, times and numbers go through Intl with the page language. */
  const fmt = (options) => new Intl.DateTimeFormat(T.locale, options);
  const fmtNum = (n) => new Intl.NumberFormat(T.locale).format(n);
  const upper = (text) => text.toLocaleUpperCase(T.locale);
  const dateOf = (iso) => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d); };
  const clock = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return fmt({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(2000, 0, 1, h, m)); };
  /* Fares are static, trusted markup (placeholders wrapped as .ph); nothing user-typed goes through innerHTML. */
  const placeholder = (text) => `<span class="ph ph-s" title="${T.phTitle}">${text}</span>`;

  /* Sample slots: dates and times only. Their text comes from the table above. */
  const SLOTS = {
    S1: { iso: '2026-10-13', time: '19:00', end: '20:30', full: false, free: false, firstServe: false },
    S2: { iso: '2026-10-15', time: '18:30', end: '20:00', full: false, free: true, firstServe: true },
    S3: { iso: '2026-10-17', time: '10:00', end: '11:30', full: true, free: true, firstServe: true },
    S4: { iso: '2026-10-20', time: '19:00', end: '20:30', full: false, free: false, firstServe: false },
    S5: { iso: '2026-10-22', time: '18:30', end: '20:00', full: false, free: true, firstServe: true }
  };
  const SESSIONS = {};
  Object.keys(SLOTS).forEach((id) => {
    const slot = SLOTS[id];
    const copy = T.sessions[id];
    const d = dateOf(slot.iso);
    const short = fmt({ weekday: 'short', day: 'numeric', month: 'short' }).format(d);
    SESSIONS[id] = {
      ...slot,
      svc: copy.svc,
      status: copy.status,
      share: copy.share,
      fare: copy.fare ? copy.fare(placeholder) : T.freeFirst,
      day: upper(short),
      short,
      date: `${short} ${fmt({ year: 'numeric' }).format(d)}`,
      stamp: upper(fmt({ day: 'numeric', month: 'short' }).format(d)),
      time: clock(slot.time),
      end: clock(slot.end)
    };
  });

  /* ---------- Toast ---------- */
  const toastBox = $('[data-toast-box]');
  const toastMsg = $('[data-toast-msg]');
  const toastX = $('[data-toast-close]');
  let toastTimer = 0;
  function hideToast() {
    toastBox.dataset.state = 'off';
    toastX.tabIndex = -1;
  }
  function toast(text) {
    const host = dialogStack[dialogStack.length - 1] || document.body;
    if (toastBox.parentElement !== host) host.appendChild(toastBox);
    /* In a phone bottom sheet the toast sits just under the sheet header, clear of the buttons below. */
    const head = host !== document.body && host.querySelector('.dlg-head');
    if (head) toastBox.style.setProperty('--toast-top', `${Math.round(head.getBoundingClientRect().bottom + 8)}px`);
    toastMsg.textContent = '';
    window.requestAnimationFrame(() => { toastMsg.textContent = text; });
    toastBox.dataset.state = 'on';
    toastX.tabIndex = 0;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(hideToast, 5000);
  }
  toastX.addEventListener('click', hideToast);

  /* ---------- Dialogs ---------- */
  const dialogStack = [];
  const openers = new WeakMap();
  const skipReturn = new WeakSet();
  const menuBtn = $('.menu-btn');

  function openDialog(name, opener) {
    const dlg = document.getElementById('dlg-' + name);
    if (!dlg || dlg.open) return dlg;
    openers.set(dlg, opener || document.activeElement);
    hideToast();
    dlg.showModal();
    dialogStack.push(dlg);
    document.documentElement.classList.add('modal-open');
    if (name === 'menu' && menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    const body = $('.dlg-body', dlg);
    if (body) body.scrollTop = 0;
    return dlg;
  }

  $$('dialog').forEach((dlg) => {
    dlg.addEventListener('close', () => {
      const i = dialogStack.indexOf(dlg);
      if (i > -1) dialogStack.splice(i, 1);
      if (toastBox.parentElement === dlg) { hideToast(); document.body.appendChild(toastBox); }
      if (!dialogStack.length) document.documentElement.classList.remove('modal-open');
      if (dlg.id === 'dlg-menu' && menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
      const op = openers.get(dlg);
      openers.delete(dlg);
      if (skipReturn.has(dlg)) { skipReturn.delete(dlg); }
      else if (op && op.isConnected && typeof op.focus === 'function') { window.setTimeout(() => op.focus({ preventScroll: true }), 0); }
      dlg.dispatchEvent(new CustomEvent('dlg-closed'));
    });
    dlg.addEventListener('click', (e) => {
      if (e.target !== dlg) return;
      const r = dlg.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) dlg.close();
    });
  });

  /* ---------- Validation helpers ---------- */
  function errEl(input) {
    const id = input.id + '-err';
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement('p');
      el.className = 'err'; el.id = id; el.hidden = true;
      const anchor = input.closest('.check, .stepper') || input;
      anchor.insertAdjacentElement('afterend', el);
    }
    return el;
  }
  function setErr(input, text) {
    const el = errEl(input);
    const ids = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (text) {
      el.textContent = text; el.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      if (!ids.includes(el.id)) { ids.push(el.id); input.setAttribute('aria-describedby', ids.join(' ')); }
    } else {
      el.textContent = ''; el.hidden = true;
      input.removeAttribute('aria-invalid');
    }
  }
  function fieldError(el) {
    if (el.closest('[hidden]') || el.disabled || el.type === 'radio' || el.closest('.hp')) return '';
    const req = el.required || el.hasAttribute('data-req-when-shown');
    if (el.type === 'checkbox') return req && !el.checked ? (el.id === 'm-accept' ? MSG.satzung : MSG.req) : '';
    const v = el.value.trim();
    if (req && !v) return MSG.req;
    if (v && el.type === 'email' && !EMAIL_RE.test(v)) return MSG.email;
    if (el.type === 'date' && v && (el.validity.rangeUnderflow || el.validity.rangeOverflow || el.validity.badInput)) return MSG.date;
    return '';
  }
  function validate(container) {
    let first = null;
    $$('input, select, textarea', container).forEach((el) => {
      if (el.type === 'radio' || el.closest('.hp')) return;
      const msg = fieldError(el);
      if (!el.closest('[hidden]')) setErr(el, msg);
      else if (el.hasAttribute('aria-invalid')) setErr(el, '');
      if (msg && !first) first = el;
    });
    if (first) first.focus();
    return !first;
  }
  function clearErrors(container) {
    $$('[aria-invalid="true"]', container).forEach((el) => setErr(el, ''));
    $$('.err', container).forEach((el) => { el.hidden = true; el.textContent = ''; });
  }
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.matches && el.matches('[aria-invalid="true"]') && !fieldError(el)) setErr(el, '');
  });
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el.matches && el.matches('[aria-invalid="true"]') && !fieldError(el)) setErr(el, '');
  });

  /* ---------- Global click handling ---------- */
  document.addEventListener('click', (e) => {
    const closeBtn = e.target.closest('[data-close]');
    if (closeBtn) { const d = closeBtn.closest('dialog'); if (d) d.close(); return; }

    const opener = e.target.closest('[data-open]');
    if (opener) {
      e.preventDefault();
      const name = opener.dataset.open;
      if (name !== 'menu') {
        const menu = $('#dlg-menu');
        if (menu && menu.open && opener.closest('#dlg-menu')) { skipReturn.add(menu); menu.close(); }
      }
      if (name === 'trial') openTrial(opener.dataset.session, opener);
      else if (name === 'member') openMember(opener);
      else if (name === 'login') openLogin(opener);
      else openDialog(name, opener);
      return;
    }

    const toaster = e.target.closest('[data-toast]');
    if (toaster) { toast(toaster.dataset.toast); return; }

    /* DE and EN are real links between the two pages; French is a stub that only shows a notice. */
    const frStub = e.target.closest('[data-lang-stub]');
    if (frStub) { toast(T.frNotice); return; }

    const topicBtn = e.target.closest('[data-contact-topic]');
    if (topicBtn) { goToContact(topicBtn.dataset.contactTopic, topicBtn.dataset.contactNote); return; }

    const scroller = e.target.closest('[data-scroll-to]');
    if (scroller) { scrollToSection(scroller.dataset.scrollTo); return; }

    const anchor = e.target.closest('a[href^="#"]:not([data-menu-link]):not(.skip)');
    if (anchor && anchor.getAttribute('href').length > 1 && $(anchor.getAttribute('href'))) {
      e.preventDefault();
      history.replaceState(null, '', anchor.getAttribute('href'));
      scrollToSection(anchor.getAttribute('href'));
      return;
    }

    const menuLink = e.target.closest('[data-menu-link]');
    if (menuLink) {
      e.preventDefault();
      const menu = $('#dlg-menu');
      skipReturn.add(menu);
      /* Scroll once the menu has really closed and the page scroll lock is gone. */
      menu.addEventListener('close', () => window.requestAnimationFrame(() => scrollToSection(menuLink.getAttribute('href'))), { once: true });
      menu.close();
    }
  });

  function focusHeading(section) {
    const h = section && (section.querySelector('h2') || section);
    if (!h) return;
    if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
    h.focus({ preventScroll: true });
  }
  function scrollToSection(sel) {
    const target = $(sel);
    if (!target) return;
    target.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    focusHeading(target);
  }

  /* ---------- Departures board: filters ---------- */
  const board = $('[data-board]');
  if (board) {
    const chips = $$('[data-filter]', board);
    const items = $$('[data-session]', board).filter((el) => el.matches('tr, li'));
    const table = $('.board-table', board);
    const passes = $('.passes', board);
    const empty = $('[data-empty]', board);
    const status = $('[data-filter-status]', board);
    const active = new Set();
    const apply = () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === 'all' ? active.size === 0 : active.has(c.dataset.filter))));
      let shown = 0;
      items.forEach((el) => {
        const ok = [...active].every((f) => el.dataset[f] === '1');
        el.hidden = !ok;
        if (ok && el.tagName === 'TR') shown++;
      });
      table.hidden = shown === 0;
      passes.hidden = shown === 0;
      empty.hidden = shown !== 0;
      status.textContent = shown ? T.board.showing(fmtNum(shown), fmtNum(5)) : T.board.none;
    };
    chips.forEach((c) => c.addEventListener('click', () => {
      const f = c.dataset.filter;
      if (f === 'all') active.clear();
      else if (active.has(f)) active.delete(f);
      else active.add(f);
      apply();
    }));
    $('[data-filter-reset]', board).addEventListener('click', () => { active.clear(); apply(); chips[0].focus(); });
  }

  /* ---------- Split-flap flip-in (once, when the board enters view) ---------- */
  const flipBoards = $$('.mini-board, [data-board]');
  if (!reduceMotion() && 'IntersectionObserver' in window) {
    flipBoards.forEach((b) => {
      $$('.flap i', b).forEach((tile, i) => tile.style.setProperty('--d', String(i)));
      b.dataset.flip = 'ready';
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const target = en.target;
        target.dataset.flip = 'go';
        io.unobserve(target);
        /* Drop the finished animation so the tiles become plain static elements again. */
        window.setTimeout(() => { target.dataset.flip = 'done'; }, $$('.flap i', target).length * 40 + 450);
      });
    }, { threshold: 0.2 });
    flipBoards.forEach((b) => io.observe(b));
  }

  /* ---------- Passport stamp (one demo flag in localStorage) ---------- */
  const STAMP_KEY = 'pp-demo-stamp';
  const stamp1 = $('.stamp[data-stamp="1"]');
  const stampStatus = $('[data-stamp-status]');
  const stampText = $('[data-stamp-text]');
  const stampCta = $('.pp-cta .btn');
  const store = {
    get() { try { return window.localStorage.getItem(STAMP_KEY); } catch (err) { return null; } },
    set() { try { window.localStorage.setItem(STAMP_KEY, '1'); } catch (err) { /* storage blocked: demo still works in memory */ } },
    clear() { try { window.localStorage.removeItem(STAMP_KEY); } catch (err) { /* ignore */ } }
  };
  function renderStampStatus() {
    stampStatus.textContent = '';
    const msg = document.createElement('span');
    msg.textContent = T.stamp.collected;
    const reset = document.createElement('button');
    reset.type = 'button'; reset.className = 'link-btn'; reset.textContent = T.stamp.reset;
    reset.addEventListener('click', () => {
      stamp1.classList.remove('is-stamped', 'is-landing');
      stampStatus.textContent = '';
      store.clear();
      if (stampCta) { stampCta.textContent = T.stamp.first; stampCta.focus(); }
    });
    stampStatus.append(msg, reset);
  }
  function applyStamp(stampDate, animate) {
    if (stampText) stampText.textContent = T.stamp.line(stampDate);
    stamp1.classList.remove('is-landing');
    stamp1.classList.add('is-stamped');
    if (animate && !reduceMotion()) {
      void stamp1.offsetWidth;
      stamp1.classList.add('is-landing');
      window.setTimeout(() => stamp1.classList.remove('is-landing'), 400);
    }
    renderStampStatus();
    if (stampCta) stampCta.textContent = T.stamp.next;
  }
  if (store.get() === '1') applyStamp(SESSIONS.S2.stamp, false);

  /* ---------- Trial booking (First Serve) ---------- */
  const trialDlg = $('#dlg-trial');
  const trial = { session: null, step: 1, booked: false, stamped: false };
  const tSteps = $$('.step', trialDlg);
  const tStations = $$('[data-stations] li', trialDlg);
  const headPass = $('[data-head-pass]', trialDlg);
  const tTitle = $('[data-trial-title]', trialDlg);
  const tForm1 = $('form[data-step="1"]', trialDlg);
  const tForm2 = $('form[data-step="2"]', trialDlg);
  const tSubmit = $('[data-trial-submit]', trialDlg);
  const waitNote = $('[data-wait-note]', trialDlg);
  const sessionErr = $('#t-session-err');
  const friends = $('#t-friends');

  function setSession(id) {
    trial.session = id;
    const s = SESSIONS[id];
    const radio = $(`input[name="t-session"][value="${id}"]`, trialDlg);
    if (radio) radio.checked = true;
    $('[data-hp-day]', trialDlg).textContent = s.day;
    $('[data-hp-time]', trialDlg).textContent = s.time;
    $('[data-hp-svc]', trialDlg).textContent = s.svc;
    $('[data-hp-fare]', trialDlg).innerHTML = s.fare;
    $('[data-hp-status]', trialDlg).textContent = s.status;
    tTitle.textContent = s.free ? T.trialTitle.free : T.trialTitle.paid;
    tSubmit.textContent = s.full ? T.submit.waitlist : T.submit.save;
    waitNote.hidden = !s.full;
    sessionErr.hidden = true;
    $$('input[name="t-session"]', trialDlg).forEach((r) => r.removeAttribute('aria-invalid'));
  }
  function trialStep(n, focus = true) {
    trial.step = n;
    tSteps.forEach((s) => { s.hidden = Number(s.dataset.step) !== n; });
    tStations.forEach((li) => {
      const st = Number(li.dataset.st);
      li.classList.toggle('is-done', st < n);
      li.classList.toggle('is-current', st === n);
      if (st === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    /* On the confirmation the big boarding pass is the hero, so the header strip steps aside. */
    headPass.hidden = !(n === 2 && trial.session);
    $('.hp-change', trialDlg).hidden = n === 3;
    $('.dlg-body', trialDlg).scrollTop = 0;
    if (!focus) return;
    if (n === 1) { const r = $('input[name="t-session"]:checked', trialDlg) || $('input[name="t-session"]', trialDlg); r.focus(); }
    if (n === 2) $('#t-first').focus();
    if (n === 3) $('[data-step="3"]', trialDlg).focus({ preventScroll: true });
  }
  function openTrial(sessionId, opener) {
    tForm1.reset(); tForm2.reset();
    clearErrors(trialDlg);
    $('[data-guardian]', trialDlg).hidden = true;
    trial.session = null; trial.booked = false; trial.stamped = false;
    waitNote.hidden = true;
    tSubmit.textContent = T.submit.save;
    tTitle.textContent = T.trialTitle.free;
    openDialog('trial', opener);
    if (sessionId && SESSIONS[sessionId]) { setSession(sessionId); trialStep(2); }
    else trialStep(1);
  }
  $$('input[name="t-session"]', trialDlg).forEach((r) => r.addEventListener('change', () => setSession(r.value)));
  $('[data-goto="1"]', trialDlg).addEventListener('click', () => trialStep(1));
  tForm1.addEventListener('submit', (e) => {
    e.preventDefault();
    const picked = $('input[name="t-session"]:checked', trialDlg);
    if (!picked) {
      sessionErr.textContent = MSG.session; sessionErr.hidden = false;
      $$('input[name="t-session"]', trialDlg).forEach((r) => { r.setAttribute('aria-invalid', 'true'); r.setAttribute('aria-describedby', 't-session-err'); });
      $('input[name="t-session"]', trialDlg).focus();
      return;
    }
    setSession(picked.value);
    trialStep(2);
  });
  $$('[data-stepper]', trialDlg).forEach((b) => b.addEventListener('click', () => {
    const v = Math.min(2, Math.max(0, (parseInt(friends.value, 10) || 0) + Number(b.dataset.stepper)));
    friends.value = String(v);
  }));
  friends.addEventListener('change', () => {
    friends.value = String(Math.min(2, Math.max(0, parseInt(friends.value, 10) || 0)));
  });
  $('[data-u18]', trialDlg).addEventListener('change', (e) => {
    const g = $('[data-guardian]', trialDlg);
    g.hidden = !e.target.checked;
    if (!e.target.checked) clearErrors(g);
  });
  tForm2.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate(tForm2)) return;
    const s = SESSIONS[trial.session];
    const first = $('#t-first').value.trim();
    const n = Math.min(2, Math.max(0, parseInt(friends.value, 10) || 0));
    const done = $('[data-step="3"]', trialDlg);
    $('[data-bp-svc]', done).textContent = upper(s.svc);
    $('[data-bp-title]', done).textContent = s.full ? T.confirm.waitlistTitle(first) : T.confirm.inTitle(first);
    $('[data-bp-date]', done).textContent = s.date;
    $('[data-bp-time]', done).textContent = `${s.time}–${s.end}`;
    $('[data-bp-fare]', done).innerHTML = s.fare;
    const stub = $('[data-bp-stub]', done);
    stub.classList.toggle('is-wait', s.full);
    $('[data-bp-admit]', done).textContent = s.full ? T.confirm.admitWaitlist : T.confirm.admit;
    $('[data-bp-n]', done).textContent = s.full ? T.confirm.waitNo : (n ? T.confirm.oneWith(fmtNum(n)) : T.confirm.one);
    $('[data-done-wait]', done).hidden = !s.full;
    $$('[data-done-ok]', done).forEach((p) => { p.hidden = s.full; });
    /* Waitlist: no calendar entry and no "I've booked" invite to share. */
    $('[data-done-actions]', done).hidden = s.full;
    /* Only a First Serve booking earns the passport stamp. */
    trial.booked = !s.full && s.firstServe;
    $('[data-finish]', done).textContent = trial.booked ? T.confirm.seeStamp : T.confirm.done;
    trialStep(3);
  });
  $('[data-ics]', trialDlg).addEventListener('click', () => {
    const s = SESSIONS[trial.session];
    toast(T.ics(s.short, s.time));
  });
  $('[data-share]', trialDlg).addEventListener('click', () => {
    const s = SESSIONS[trial.session];
    const what = s.free ? T.freeTaster : s.share;
    const text = T.shareText(what, s.short, s.time);
    const copy = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => toast(T.copied(text)), () => toast(T.copyThis(text)));
      } else toast(T.copyThis(text));
    };
    /* Phones get the native share sheet; desktops copy the invite, which is what people do there anyway. */
    if (navigator.share && window.matchMedia('(pointer: coarse)').matches) navigator.share({ text }).catch((err) => { if (!err || err.name !== 'AbortError') copy(); });
    else copy();
  });
  $('[data-finish]', trialDlg).addEventListener('click', () => trialDlg.close());
  trialDlg.addEventListener('close', () => {
    if (!trial.booked || trial.stamped) return;
    trial.stamped = true;
    skipReturn.add(trialDlg);
    const s = SESSIONS[trial.session];
    store.set();
    const section = $('#passport');
    window.setTimeout(() => {
      section.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
      focusHeading(section);
      window.setTimeout(() => applyStamp(s.stamp, true), reduceMotion() ? 0 : 520);
    }, 30);
  });

  /* ---------- Membership application ---------- */
  const memberDlg = $('#dlg-member');
  const mSteps = $$('.step', memberDlg);
  const rail = $('[data-rail]', memberDlg);
  const railLis = $$('.rail-stations li', memberDlg);
  const dob = $('#m-dob');
  let youthAuto = false;

  function memberStep(n) {
    mSteps.forEach((s) => { s.hidden = Number(s.dataset.step) !== n; });
    rail.style.setProperty('--step', String(Math.min(n, 4) - 1));
    railLis.forEach((li) => {
      const st = Number(li.dataset.st);
      li.classList.toggle('is-done', st < n);
      li.classList.toggle('is-current', st === n);
      if (st === n) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
    });
    $('.dlg-body', memberDlg).scrollTop = 0;
    const done = $('[data-step="5"]', memberDlg);
    done.classList.toggle('is-on', n === 5);
    if (n === 1) $('#m-first').focus();
    else if (n === 2) ($('input[name="m-tier"]:checked', memberDlg) || $('input[name="m-tier"]', memberDlg)).focus();
    else if (n === 3) $('input[name="m-pay"]:checked', memberDlg).focus();
    else if (n === 4) $('#m-accept').focus();
    else done.focus({ preventScroll: true });
  }
  function ageOn(value) {
    const [y, m, d] = value.split('-').map(Number);
    if (!y || !m || !d) return null;
    const now = new Date();
    let age = now.getFullYear() - y;
    if ((now.getMonth() + 1) * 100 + now.getDate() < m * 100 + d) age--;
    return age;
  }
  function syncAge() {
    const age = dob.value ? ageOn(dob.value) : null;
    const minor = age !== null && age < 18;
    const g = $('[data-m-guardian]', memberDlg);
    g.hidden = !minor;
    if (!minor) clearErrors(g);
    const youth = $('input[name="m-tier"][value="Youth"]', memberDlg);
    if (minor && !youth.checked) { youth.checked = true; youthAuto = true; syncTier(); }
    if (!minor && youthAuto) { $('input[name="m-tier"][value="Adult"]', memberDlg).checked = true; youthAuto = false; syncTier(); }
  }
  function syncTier() {
    const t = $('input[name="m-tier"]:checked', memberDlg);
    $('[data-family-note]', memberDlg).hidden = !(t && t.value === 'Family');
  }
  function syncPay() {
    const sepa = $('input[name="m-pay"]:checked', memberDlg).value === 'sepa';
    $('[data-sepa]', memberDlg).hidden = !sepa;
    $('[data-transfer]', memberDlg).hidden = sepa;
  }
  function openMember(opener) {
    $$('form', memberDlg).forEach((f) => f.reset());
    clearErrors(memberDlg);
    youthAuto = false;
    $('[data-m-guardian]', memberDlg).hidden = true;
    syncTier(); syncPay();
    openDialog('member', opener);
    memberStep(1);
  }
  dob.addEventListener('change', syncAge);
  dob.addEventListener('input', syncAge);
  $$('input[name="m-tier"]', memberDlg).forEach((r) => r.addEventListener('change', () => { youthAuto = false; syncTier(); }));
  $$('input[name="m-pay"]', memberDlg).forEach((r) => r.addEventListener('change', syncPay));
  $$('[data-back]', memberDlg).forEach((b) => b.addEventListener('click', () => {
    const cur = Number(b.closest('.step').dataset.step);
    memberStep(cur - 1);
  }));
  function summaryRow(dl, label, value) {
    const row = document.createElement('div');
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = value;
    row.append(dt, dd); dl.append(row);
  }
  function buildSummary() {
    const v = (id) => $(id).value.trim();
    const dl = $('[data-summary]', memberDlg);
    const L = T.member.summary;
    dl.textContent = '';
    summaryRow(dl, L.name, `${v('#m-first')} ${v('#m-last')}`);
    summaryRow(dl, L.dob, fmt({ day: '2-digit', month: '2-digit', year: 'numeric' }).format(dateOf(v('#m-dob'))));
    summaryRow(dl, L.address, T.member.address(v('#m-street'), v('#m-zip'), v('#m-town'), $('#m-country').value));
    summaryRow(dl, L.email, v('#m-email'));
    summaryRow(dl, L.language, $('input[name="m-lang"]:checked', memberDlg).nextElementSibling.textContent);
    if (!$('[data-m-guardian]', memberDlg).hidden) summaryRow(dl, L.guardian, T.member.guardian(v('#m-g-name'), v('#m-g-email')));
    summaryRow(dl, L.membership, T.member.fee($('input[name="m-tier"]:checked', memberDlg).value));
    summaryRow(dl, L.payment, $('input[name="m-pay"]:checked', memberDlg).value === 'sepa' ? T.member.sepa : T.member.transfer);
  }
  $$('form.step', memberDlg).forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    const n = Number(f.dataset.step);
    if (!validate(f)) return;
    if (n === 1) {
      $('[data-sepa-holder]', memberDlg).textContent = `${$('#m-first').value.trim()} ${$('#m-last').value.trim()}`;
    }
    if (n === 3) buildSummary();
    if (n === 4) {
      const thanks = $('[data-member-thanks]', memberDlg);
      const ph = thanks.querySelector('.ph');
      thanks.textContent = T.member.thanksBefore($('#m-first').value.trim());
      thanks.append(ph, T.member.thanksAfter);
    }
    memberStep(n + 1);
  }));

  /* ---------- Member login ---------- */
  const loginDlg = $('#dlg-login');
  const loginForm = $('[data-login-form]', loginDlg);
  const loginSent = $('[data-login-sent]', loginDlg);
  const loginDash = $('[data-login-dash]', loginDlg);
  function openLogin(opener) {
    loginForm.reset(); clearErrors(loginForm);
    loginForm.hidden = false; loginSent.hidden = true; loginDash.hidden = true;
    openDialog('login', opener);
    $('#l-email').focus();
  }
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate(loginForm)) return;
    loginForm.hidden = true; loginSent.hidden = false; loginSent.focus({ preventScroll: true });
  });
  $('[data-login-preview]', loginDlg).addEventListener('click', () => {
    loginSent.hidden = true; loginDash.hidden = false;
    $('.dlg-body', loginDlg).scrollTop = 0;
    loginDash.focus({ preventScroll: true });
  });

  /* ---------- Kitchen strip ---------- */
  const kitchen = $('[data-kitchen]');
  if (kitchen) {
    const out = $('[data-rule-output]', kitchen);
    const btns = $$('[data-zone]', kitchen).filter((b) => b.tagName === 'BUTTON');
    btns.forEach((b) => b.addEventListener('click', () => {
      const z = b.dataset.zone;
      kitchen.dataset.zone = z;
      btns.forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.zone === z)));
      out.textContent = '';
      const strong = document.createElement('b'); strong.textContent = T.rules[z][0];
      out.append(strong, ' ' + T.rules[z][1]);
    }));
  }

  /* ---------- Coming from…? ---------- */
  const from = $('[data-from]');
  if (from) {
    const picks = $$('[data-from-pick]', from);
    const lines = $$('[data-from-line]', from);
    const show = (key) => {
      picks.forEach((p) => p.setAttribute('aria-pressed', String(p.dataset.fromPick === key)));
      lines.forEach((l) => l.classList.toggle('is-on', l.dataset.fromLine === key));
    };
    picks.forEach((p) => p.addEventListener('click', () => show(p.dataset.fromPick)));
    show('tennis');
  }

  /* ---------- Packing list ---------- */
  const packing = $('[data-packing]');
  if (packing) {
    const boxes = $$('[data-pack]', packing);
    const go = $('[data-pack-go]', packing);
    const sync = () => go.classList.toggle('is-on', boxes.every((b) => b.checked));
    boxes.forEach((b) => b.addEventListener('change', sync));
    sync();
  }

  /* ---------- Map pins, venue card, town vote ---------- */
  const votes = { 'Lörrach': 43, 'Offenburg': 28, 'Konstanz': 19, 'Waldshut-Tiengen': 11, 'Villingen-Schwenningen': 9, 'Emmendingen': 7 };
  let otherVotes = 0;
  const card = $('[data-venue-card]');
  const cardDefault = $('[data-vc-default]');
  const cardAlt = $('[data-vc-alt]');
  const pins = $$('.pin');
  const voteSelect = $('#vote-town');

  function markActive(key, town) {
    pins.forEach((p) => p.classList.toggle('is-active', p.dataset.pin === key && (!town || p.dataset.town === town)));
  }
  function revealCard() {
    const r = card.getBoundingClientRect();
    if (r.top > window.innerHeight - 120 || r.bottom < 80) card.scrollIntoView({ behavior: scrollBehavior(), block: 'nearest' });
  }
  function showVenue() {
    cardAlt.hidden = true; cardDefault.hidden = false;
    markActive('venue');
  }
  function altCard(kickerClass, kicker, title, body, action) {
    cardAlt.textContent = '';
    const k = document.createElement('p'); k.className = 'vc-kicker';
    const sw = document.createElement('span'); sw.className = 'lg ' + kickerClass; sw.setAttribute('aria-hidden', 'true');
    k.append(sw, kicker);
    const h = document.createElement('h3'); h.className = 'vc-title'; h.textContent = title;
    const p = document.createElement('p'); p.className = 'vc-body'; p.textContent = body;
    cardAlt.append(k, h, p);
    if (action) cardAlt.append(action);
    const back = document.createElement('button');
    back.type = 'button'; back.className = 'link-btn vc-back'; back.textContent = T.voting.back;
    back.style.minHeight = '44px';
    back.addEventListener('click', () => { showVenue(); const pin = $('.pin-ours'); if (pin) pin.focus(); });
    cardAlt.append(document.createElement('br'), back);
    cardDefault.hidden = true; cardAlt.hidden = false;
  }
  function showPin(key, town) {
    if (key === 'venue') { showVenue(); revealCard(); return; }
    if (key === 'vote') {
      const n = votes[town];
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'btn btn-navy btn-sm'; btn.textContent = T.voting.voteFor(town);
      btn.addEventListener('click', () => {
        voteSelect.value = town;
        $('#vote').scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
        voteSelect.focus({ preventScroll: true });
      });
      altCard('lg-vote', T.voting.sample, town, T.voting.votesSoFar(fmtNum(n)), btn);
      markActive('vote', town);
    } else if (T.neighbours[key]) {
      altCard('lg-nb', T.voting.nearby, T.neighbours[key].name, T.neighbours[key].body);
      markActive(key);
    }
    revealCard();
  }
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-pin]');
    if (t) showPin(t.dataset.pin, t.dataset.town);
  });
  markActive('venue');

  /* Phones: the neighbour and vote pins are too close to tap apart, so they become plain markers (CSS) and
     leave the tab order; the list under the map carries the same content. */
  const phone = window.matchMedia('(max-width: 767px)');
  const syncPins = () => {
    $$('.pin-nb, .pin-vote').forEach((p) => {
      if (phone.matches) { p.tabIndex = -1; p.setAttribute('aria-hidden', 'true'); }
      else { p.removeAttribute('tabindex'); p.removeAttribute('aria-hidden'); }
    });
  };
  syncPins();
  if (phone.addEventListener) phone.addEventListener('change', syncPins);

  const voteForm = $('[data-vote]');
  voteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate(voteForm)) return;
    const town = voteSelect.value;
    const result = $('[data-vote-result]', voteForm);
    if (town === 'Other') {
      otherVotes++;
      result.textContent = T.voting.other;
    } else {
      votes[town]++;
      const n = votes[town];
      $$(`[data-count-for="${town}"]`).forEach((el) => { el.textContent = fmtNum(n); });
      $$(`.pin-vote[data-town="${town}"]`).forEach((p) => p.setAttribute('aria-label', T.voting.pinLabel(town, fmtNum(n))));
      result.textContent = T.voting.result(town, fmtNum(n));
      if (!cardAlt.hidden && $('.vc-title', cardAlt) && $('.vc-title', cardAlt).textContent === town) showPin('vote', town);
    }
    $('#vote-email').value = '';
  });

  /* ---------- Newsletter ---------- */
  const nl = $('[data-newsletter]');
  if (nl) {
    const form = $('[data-nl-form]', nl);
    const done = $('[data-nl-done]', nl);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate(form)) return;
      form.hidden = true; done.hidden = false; done.focus();
    });
  }

  /* ---------- Contact ---------- */
  const contact = $('[data-contact]');
  const topicSel = $('#c-topic');
  const TOPIC_ROLE = {
    'General': 'chair', 'Press': 'chair', 'Trying pickleball': 'sport', 'Membership and fees': 'treasurer',
    'Groups and companies': 'vice', 'Sponsoring': 'vice', 'Venues and councils': 'venues',
    'Volunteering': 'secretary', 'Child protection (confidential)': 'kinderschutz'
  };
  function syncTopic() {
    const role = TOPIC_ROLE[topicSel.value];
    $$('.contact-list [data-role]').forEach((d) => d.classList.toggle('is-match', d.dataset.role === role));
  }
  topicSel.addEventListener('change', syncTopic);
  syncTopic();
  function goToContact(topic, note) {
    const opt = Array.from(topicSel.options).find((o) => o.value === topic);
    if (opt) topicSel.value = topic;
    syncTopic();
    const msg = $('#c-msg');
    if (note && !msg.value.trim()) msg.value = T.contactNote(note);
    const done = $('[data-contact-done]', contact);
    if (!done.hidden) { done.hidden = true; }
    $('#contact').scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    topicSel.focus({ preventScroll: true });
  }
  contact.addEventListener('submit', (e) => {
    e.preventDefault();
    if ($('#c-website').value) return; /* honeypot: quietly ignore bots */
    if (!validate(contact)) return;
    const done = $('[data-contact-done]', contact);
    $$('input:not(#c-website), textarea', contact).forEach((el) => { el.value = ''; });
    done.hidden = false; done.focus();
  });
  $('[data-contact-again]', contact).addEventListener('click', () => {
    $('[data-contact-done]', contact).hidden = true;
    $('#c-name').focus();
  });

  /* ---------- Tonight tile: show the OFF design state on demand ---------- */
  const tonight = $('[data-tonight]');
  const tonightToggle = $('[data-tonight-toggle]');
  if (tonight && tonightToggle) {
    tonightToggle.addEventListener('click', () => {
      const off = tonight.dataset.state !== 'off';
      tonight.dataset.state = off ? 'off' : 'on';
      tonightToggle.textContent = off ? T.tonight.showOn : T.tonight.showOff;
    });
  }

  /* ---------- Concept badge: on phones it waits until the hero has scrolled away (CSS reads .badge-later) ---------- */
  const hero = $('#top');
  if (hero && 'IntersectionObserver' in window) {
    const root = document.documentElement;
    root.classList.add('badge-later');
    /* The root is the lower 40% of the viewport: once the hero's end has risen above it, the badge shows. */
    new IntersectionObserver((entries) => {
      root.classList.toggle('badge-later', entries[entries.length - 1].isIntersecting);
    }, { rootMargin: '-60% 0px 0px 0px' }).observe(hero);
  }
})();

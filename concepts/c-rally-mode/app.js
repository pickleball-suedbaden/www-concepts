/* Pickleball Südbaden e.V. · Concept C: Rally Mode
   Vanilla JS, no libraries. Nothing leaves the page; no storage, no cookies.
   Motion only in: hero, 60-second court, headline landings, success moments,
   founders' counter, button pop. Reduced motion: all of it off. */
(() => {
  'use strict';
  const root = document.documentElement;

  /* ------------------------------------------------------------------
     Copy the script writes to the page, per language. The page language comes from
     <html lang>; a page language without a table uses de. Entries that build markup
     take ph (the placeholder wrapper) or the values they need.
     ------------------------------------------------------------------ */
  const STRINGS = {
    en: {
      phTitle: 'Placeholder: to be confirmed',
      close: 'Close',
      done: 'Done',
      free: 'Free first time',
      frNotice: 'The French version is coming soon.',
      req: 'Please fill this in.',
      email: "That email address doesn't look quite right. Mind checking it?",
      satzung: 'Please accept the Satzung and Beitragsordnung to apply.',
      checkDob: 'Please check the date of birth.',
      session: 'Please choose a session.',
      town: 'Please choose a town.',
      money: (ph) => `<span class="nw">€${ph('[__]')}</span>`,
      venueLine: (ph) => `${ph('[Venue TBC]')}, ${ph('[Street TBC]')}, Freiburg`,
      priceFor: (p) => `Price: ${p}`,
      sess: {
        S1: { name: 'Open Play', date: 'Tue 13 Oct 2026', short: 'Tue 13 Oct', time: '19:00–20:30', title: 'Book Open Play', share: 'Open Play', price: (eur) => `<span class="nw">Members €0</span> · <span class="nw">Guests ${eur}</span>` },
        S2: { name: 'First Serve (free taster)', date: 'Thu 15 Oct 2026', short: 'Thu 15 Oct', time: '18:30–20:00' },
        S3: { name: 'First Serve, family-friendly', date: 'Sat 17 Oct 2026', short: 'Sat 17 Oct', time: '10:00–11:30' },
        S4: { name: 'Kitchen School, week 1 of 4', date: 'Tue 20 Oct 2026', short: 'Tue 20 Oct', time: '19:00–20:30', title: 'Book Kitchen School (4 weeks)', share: 'Kitchen School, week 1,', price: (eur) => `4-week course: <span class="nw">Members ${eur}</span> · <span class="nw">Guests ${eur}</span>` },
        S5: { name: 'First Serve', date: 'Thu 22 Oct 2026', short: 'Thu 22 Oct', time: '18:30–20:00' },
      },
      leftWord: (n) => (n === 1 ? 'spot left' : 'spots left'),
      seatsOf: (n, cap) => `${n === 1 ? 'spot left' : 'spots left'} <span class="cap-of">of ${cap}</span>`,
      yours: (n) => (n === 1 ? '1 is yours' : `${n} are yours`),
      full: 'Full',
      waitlistLabel: 'waitlist:',
      fullWaiting: (n) => `Full: waitlist (${n} waiting)`,
      fullJoin: 'Full: join the waitlist',
      waitLine: 'Full, which is a good sign. Join the waitlist.',
      joinWaitlist: 'Join the waitlist',
      waitFor: (name, short) => `for ${name}, ${short}`,
      showing: (n, total) => `Showing ${n} of ${total} sessions.`,
      noMatch: 'No sessions match these filters.',
      tnOn: 'Show the ON state',
      tnOff: 'Show the OFF state',
      trialSteps: ['Session', 'About you', 'Done'],
      saveSpot: 'Save my spot',
      bookFree: 'Book your free first session',
      onWaitTitle: (f) => `You're on the waitlist, ${f}.`,
      inTitle: (f) => `You're in, ${f}!`,
      onWaitWin: "You're on the list.",
      inWin: "You're in! 1–0 to you.",
      waitDone: (pos) => `<p><b>You're number ${pos} on the waitlist.</b> We'll email you the moment a spot opens.</p>`,
      doors: "<p>Doors open 10 minutes early. Bring indoor shoes with non-marking soles. We'll bring the paddles.</p>",
      addCal: 'Add to calendar (.ics)',
      sendFriend: 'Send to a friend',
      cantMake: "<p class=\"small\"><b>Can't make it?</b> Use the link in your email to free up your spot for someone on the waitlist.</p>",
      shareFree: (at) => `I've booked a free pickleball taster on ${at}. Come too?`,
      shareBooked: (what, at) => `I've booked ${what} on ${at}. Come too?`,
      copied: (t) => `Copied: "${t}"`,
      copyManual: (t) => `Copy this and send it: "${t}"`,
      memSteps: ['You', 'Membership', 'Payment', 'Confirm'],
      tiers: { adult: 'Adult', reduced: 'Reduced', youth: 'Youth (under 18)', family: 'Family', supporting: 'Supporting member' },
      youthNote: 'Youth membership is for under-18s. By your date of birth you can choose Adult or Reduced.',
      underageNote: "You're under 18, so Youth, or Family with your household, is the usual choice.",
      labels: { name: 'Name', dob: 'Date of birth', address: 'Address', email: 'Email', language: 'Language', guardian: 'Guardian', membership: 'Membership', payment: 'Payment', edit: 'Edit' },
      memberLine: (tier, eur) => `${tier} · ${eur} / year · joining fee €0 (First 100)`,
      sepa: 'SEPA direct debit (demo: no bank details collected)',
      transfer: 'Bank transfer: we email the details after approval',
      memT: 'Application sent (demo)',
      memThanks: (first, ph) => `<p>Thanks, ${first}. We'll confirm by email within ${ph('[7 days, TBC]')}. Your membership starts once the board approves it.</p><p class="small">Membership fees are not tax-deductible.</p>`,
      loginT: 'Member login',
      dashT: 'Member area (preview)',
      nlOk: "Check your inbox. We've sent you a confirmation link. (Demo: nothing was sent.)",
      who: {
        'General': 'Chair',
        'Trying pickleball': 'Sport and coaching',
        'Membership and fees': 'Treasurer',
        'Groups and companies': 'Sport and coaching',
        'Venues and councils': 'Venue partnerships',
        'Sponsoring': 'Vice-chair',
        'Press': 'Chair',
        'Volunteering': 'Secretary',
        'Child protection (confidential)': 'Child protection contact',
      },
      heardFrom: (role, ph) => `You'll hear from ${ph('[Name]')}, ${role}.`,
      cOk: (role, ph) => `Thanks. ${ph('[Name]')} (${role}) will reply within 2 working days (target). (Demo: nothing was sent.)`,
      voteOther: "Thanks. Tell us your town in the contact form below and we'll count it. (Demo: nothing was sent.)",
      voteDone: (town, n) => `${town} now has ${n} votes. At 50 we plan a free Pickle Pop-up. Share the link and we'll get there faster.`,
      pins: {
        us: (ph) => `<b>Freiburg · ${ph('[Venue TBC]')}.</b> Our home hall: First Serve, Open Play and Kitchen School all happen here.`,
        racket: () => '<b>FT 1844 RACKETzone, Freiburg.</b> Also playing nearby. Not run by us · to confirm with partners.',
        basel: () => '<b>Pickleball Hub Basel.</b> Also playing nearby. Not run by us · to confirm with partners.',
        giebenach: () => '<b>Public courts in Giebenach, and Liestal.</b> Not run by us · to confirm with partners.',
        strasbourg: (ph) => `<b>Strasbourg: Alsace clubs ${ph('[to confirm]')}.</b> Not run by us · to confirm with partners.`,
        guebwiller: (ph) => `<b>Guebwiller: Alsace clubs ${ph('[to confirm]')}.</b> Not run by us · to confirm with partners.`,
      },
      pinVotes: (k, n) => `<b>${k}: ${n} votes.</b> At 50 we plan a free Pickle Pop-up. ${k} is selected in the vote form.`,
      foundersAria: (n) => `${n} of 100 founding spots taken (sample)`,
      progress: (i, n, label) => `Step ${i + 1} of ${n}: ${label}`,
      stepLive: (i, title) => `Step ${i + 1} of 5: ${title}.`,
      caCount: (i) => `Step ${i + 1} of 5 · about 60 seconds in all`,
      next: 'Next',
      finish: 'Finish',
      courtOpen: 'The 60-second court',
      courtClosed: 'Play the 60-second court',
      inStamp: 'In!',
      outStamp: 'Out!',
      goodStamp: 'Good!',
      faultStamp: 'Fault!',
      dinkStamp: 'Dink!',
      serveHint: 'Diagonal, like a handshake across the court.',
      rallyOn: '<span class="fb-loud">Rally on!</span> One bounce on each side, then volleys are allowed.',
      rallyOnLive: 'Bounce 1, bounce 2, now you may volley.',
      goodVolley: "<span class=\"fb-loud\">Good volley.</span> That's the rule that makes pickleball clever.",
      goodVolleyLive: "Good volley. That's the rule that makes pickleball clever.",
      fault: '<span class="fb-loud bad">Fault!</span> You volleyed from inside the kitchen. Step back behind the line. In here, the ball has to bounce first.',
      faultLive: 'Fault! You volleyed from inside the kitchen. Step back behind the line. In here, the ball has to bounce first.',
      dinkSoft: ["<span class=\"fb-loud\">That's a dink.</span> Welcome to the clever part of pickleball.", "That's a dink. Welcome to the clever part of pickleball."],
      dinkMid: ['Softer… softer…', 'Softer… softer…'],
      dinkHard: ['<span class="fb-loud bad">Too hard,</span> that one\'s out.', "Too hard, that one's out."],
      zoneSoft: 'Soft: it drops into the kitchen',
      zoneMid: 'Medium: it lands mid-court',
      zoneHard: 'Hard: it flies out',
      scoreStart: (side) => `Start of the game: <b>0–0–2</b>. The first serving side starts with its second server, so the call ends in 2. ${side}`,
      sideNear: 'Your side (white) serves.',
      sideFar: 'The navy side serves.',
      pointWon: 'Point to the serving side. Same server serves again.',
      rallyLost: 'Rally lost. No point: the partner, server 2, serves now.',
      sideOut: 'Side out! The other side serves now, so the call flips.',
      gameWon: (s, r) => `<span class="fb-loud">Game!</span> ${s}–${r}: 11 or more, won by 2.`,
      gameWonLive: (s, r) => `Game! ${s} to ${r}.`,
      gameLabel: 'Game',
      callIs: (c) => `The call is <b>${c}</b>.`,
      callIsLive: (c) => `The call is ${c}.`,
      newGame: 'New game. The call is 0–0–2.',
      eggGame: 'Game!',
      eggWin: "Game! Imagine what you'll do with a real paddle.",
      tryFree: 'Try it free',
      dropped: (n) => `Dropped at ${n}`,
      toasts: {
        video: 'Demo: VIDEO 01 will play from our own server once it exists. No YouTube, no tracking.',
        schedule: 'Demo: the full schedule would open here, with every session for the next 8 weeks.',
        factsheet: 'Demo: the one-page venue fact sheet (PDF) would download here.',
        houserules: 'Demo: the chat house rules would open here. Short version: be kind, stay on topic, no ads.',
        ics: 'Demo: an .ics calendar file would download here.',
        cancel: "Demo: you'd free up your spot, and the next person on the waitlist would get it.",
        paddle: 'Demo: a loan paddle is reserved for Thursday. Collect it from the host.',
        rota: "Demo: you're on the net set-up rota for Thu 22 Oct. Thank you!",
        profile: 'Demo: your profile and consent settings would open here.',
        demo: 'Demo.',
      },
      rsvp: (event) => `Demo: you'd get a confirmation email for ${event}.`,
      docPdf: (doc) => `Demo: the ${doc} PDF would open here.`,
    },
    de: {
      phTitle: 'Platzhalter: wird noch bestätigt',
      close: 'Schließen',
      done: 'Fertig',
      free: 'Erster Termin kostenlos',
      frNotice: 'Die französische Version folgt.',
      req: 'Bitte füll dieses Feld aus.',
      email: 'Diese E-Mail-Adresse sieht nicht ganz richtig aus. Magst du sie noch mal prüfen?',
      satzung: 'Für den Antrag musst du die Satzung und die Beitragsordnung anerkennen.',
      checkDob: 'Bitte prüf das Geburtsdatum.',
      session: 'Bitte wähl einen Termin.',
      town: 'Bitte wähl einen Ort.',
      money: (ph) => `<span class="nw">${ph('[__]')}&nbsp;€</span>`,
      venueLine: (ph) => `${ph('[Ort folgt]')}, ${ph('[Straße folgt]')}, Freiburg`,
      priceFor: (p) => `Preis: ${p}`,
      sess: {
        S1: { name: 'Open Play', date: 'Di., 13. Okt. 2026', short: 'Di., 13. Okt.', time: '19:00–20:30', title: 'Open Play buchen', share: 'Open Play', price: (eur) => `<span class="nw">Mitglieder 0&nbsp;€</span> · <span class="nw">Gäste ${eur}</span>` },
        S2: { name: 'First Serve (kostenloses Schnuppertraining)', date: 'Do., 15. Okt. 2026', short: 'Do., 15. Okt.', time: '18:30–20:00' },
        S3: { name: 'First Serve, familienfreundlich', date: 'Sa., 17. Okt. 2026', short: 'Sa., 17. Okt.', time: '10:00–11:30' },
        S4: { name: 'Kitchen School, Woche 1 von 4', date: 'Di., 20. Okt. 2026', short: 'Di., 20. Okt.', time: '19:00–20:30', title: 'Kitchen School buchen (4 Wochen)', share: 'Kitchen School, Woche 1', price: (eur) => `4-Wochen-Kurs: <span class="nw">Mitglieder ${eur}</span> · <span class="nw">Gäste ${eur}</span>` },
        S5: { name: 'First Serve', date: 'Do., 22. Okt. 2026', short: 'Do., 22. Okt.', time: '18:30–20:00' },
      },
      leftWord: (n) => (n === 1 ? 'Platz frei' : 'Plätze frei'),
      seatsOf: (n, cap) => `von ${cap} Plätzen frei`,
      yours: (n) => (n === 1 ? '1 Platz für dich' : `${n} Plätze für dich`),
      full: 'Ausgebucht',
      waitlistLabel: 'Warteliste:',
      fullWaiting: (n) => `Ausgebucht · Warteliste: ${n}`,
      fullJoin: 'Ausgebucht: Komm auf die Warteliste',
      waitLine: 'Ausgebucht, ein gutes Zeichen. Komm auf die Warteliste.',
      joinWaitlist: 'Auf die Warteliste',
      waitFor: (name, short) => `für ${name}, ${short}`,
      showing: (n, total) => (n === total ? `Alle ${total} Termine werden angezeigt.` : n === 1 ? `1 von ${total} Terminen wird angezeigt.` : `${n} von ${total} Terminen werden angezeigt.`),
      noMatch: 'Keine Termine passen zu diesen Filtern.',
      tnOn: 'AN-Zustand zeigen',
      tnOff: 'AUS-Zustand zeigen',
      trialSteps: ['Termin', 'Über dich', 'Bestätigt'],
      saveSpot: 'Platz sichern',
      bookFree: 'Kostenloses Schnuppertraining buchen',
      onWaitTitle: (f) => `Du stehst auf der Warteliste, ${f}.`,
      inTitle: (f) => `Du bist dabei, ${f}!`,
      onWaitWin: 'Du stehst auf der Liste.',
      inWin: 'Du bist dabei! 1:0\u00a0für\u00a0dich.',
      waitDone: (pos) => `<p><b>Du bist Nummer ${pos} auf der Warteliste.</b> Sobald ein Platz frei wird, schreiben wir dir eine E-Mail.</p>`,
      doors: '<p>Einlass ist 10 Minuten vor Beginn. Bring Hallenschuhe mit nicht abfärbender Sohle mit. Die Paddles bringen wir mit.</p>',
      addCal: 'In den Kalender (.ics)',
      sendFriend: 'Einladung weiterschicken',
      cantMake: '<p class="small"><b>Du kannst doch nicht?</b> Gib deinen Platz über den Link in deiner E-Mail frei, dann rückt jemand von der Warteliste nach.</p>',
      shareFree: (at) => `Ich bin beim kostenlosen Pickleball-Schnuppertraining dabei: ${at} Uhr. Kommst du mit?`,
      shareBooked: (what, at) => `Ich bin dabei: ${what}, ${at} Uhr. Kommst du mit?`,
      copied: (t) => `Kopiert: „${t}“`,
      copyManual: (t) => `Kopier den Text und schick ihn weiter: „${t}“`,
      memSteps: ['Über dich', 'Mitgliedschaft', 'Zahlung', 'Bestätigen'],
      tiers: { adult: 'Erwachsene', reduced: 'Ermäßigt', youth: 'Jugend (unter 18)', family: 'Familie', supporting: 'Fördermitglied' },
      youthNote: 'Die Jugendmitgliedschaft gilt für alle unter 18. Laut deinem Geburtsdatum bist du schon volljährig und kannst „Erwachsene“ oder „Ermäßigt“ wählen.',
      underageNote: 'Du bist unter 18, deshalb passt meist „Jugend“ oder „Familie“ (mit deinem Haushalt).',
      labels: { name: 'Name', dob: 'Geburtsdatum', address: 'Anschrift', email: 'E-Mail', language: 'Sprache', guardian: 'Erziehungsberechtigte Person', membership: 'Mitgliedschaft', payment: 'Zahlung', edit: 'Ändern' },
      memberLine: (tier, eur) => `${tier} · ${eur} / Jahr · Aufnahmegebühr 0&nbsp;€ (First 100)`,
      sepa: 'SEPA-Lastschrift (Demo: Es werden keine Bankdaten erfasst)',
      transfer: 'Überweisung: Die Bankverbindung schicken wir dir nach der Aufnahme per E-Mail',
      memT: 'Antrag gesendet (Demo)',
      memThanks: (first, ph) => `<p>Danke, ${first}. Du bekommst innerhalb von ${ph('[7 Tagen, vorläufig]')} eine Bestätigung per E-Mail. Deine Mitgliedschaft beginnt, sobald der Vorstand zugestimmt hat.</p><p class="small">Mitgliedsbeiträge sind nicht steuerlich absetzbar.</p>`,
      loginT: 'Mitglieder-Login',
      dashT: 'Mitgliederbereich (Vorschau)',
      nlOk: 'Schau in dein Postfach. Wir haben dir einen Bestätigungslink geschickt. (Demo: Es wurde nichts gesendet.)',
      who: {
        'General': 'Vorsitz',
        'Trying pickleball': 'Sport und Training',
        'Membership and fees': 'Finanzen',
        'Groups and companies': 'Sport und Training',
        'Venues and councils': 'Hallen und Kommunen',
        'Sponsoring': 'stellvertretender Vorsitz',
        'Press': 'Vorsitz',
        'Volunteering': 'Schriftführung',
        'Child protection (confidential)': 'Ansprechperson Kinderschutz',
      },
      heardFrom: (role, ph) => `Geht an ${ph('[Name]')}, ${role}.`,
      cOk: (role, ph) => `Danke! ${ph('[Name]')} (${role}) antwortet dir innerhalb von 2 Werktagen (unser Ziel). (Demo: Es wurde nichts gesendet.)`,
      voteOther: 'Danke fürs Abstimmen! Schreib uns deinen Ort über das Kontaktformular unten, dann zählen wir ihn mit. (Demo: Es wurde nichts gesendet.)',
      voteDone: (town, n) => `${town} hat jetzt ${n} Stimmen. Ab 50 planen wir ein kostenloses Pickle Pop-up. Teil den Link, dann geht’s schneller.`,
      pins: {
        us: (ph) => `<b>Freiburg · ${ph('[Ort folgt]')}.</b> Unsere Heimhalle: Hier finden First Serve, Open Play und die Kitchen School statt.`,
        racket: () => '<b>FT 1844 RACKETzone, Freiburg.</b> Auch in der Nähe. Nicht von uns organisiert · Angaben noch mit den Partnern abzustimmen.',
        basel: () => '<b>Pickleball Hub Basel.</b> Auch in der Nähe. Nicht von uns organisiert · Angaben noch mit den Partnern abzustimmen.',
        giebenach: () => '<b>Öffentliche Felder in Giebenach, außerdem Liestal.</b> Nicht von uns organisiert · Angaben noch mit den Partnern abzustimmen.',
        strasbourg: (ph) => `<b>Straßburg: Clubs im Elsass ${ph('[noch zu bestätigen]')}.</b> Nicht von uns organisiert · Angaben noch mit den Partnern abzustimmen.`,
        guebwiller: (ph) => `<b>Guebwiller: Clubs im Elsass ${ph('[noch zu bestätigen]')}.</b> Nicht von uns organisiert · Angaben noch mit den Partnern abzustimmen.`,
      },
      pinVotes: (k, n) => `<b>${k}: ${n} Stimmen.</b> Ab 50 planen wir ein kostenloses Pickle Pop-up. ${k} ist im Abstimmungsformular schon ausgewählt.`,
      foundersAria: (n) => `${n} von 100 Gründungsplätzen vergeben (Beispiel)`,
      progress: (i, n, label) => `Schritt ${i + 1} von ${n}: ${label}`,
      stepLive: (i, title) => `Schritt ${i + 1} von 5: ${title}.`,
      caCount: (i) => `Schritt ${i + 1} von 5 · insgesamt etwa 60 Sekunden`,
      next: 'Weiter',
      finish: 'Fertig',
      courtOpen: 'Der 60-Sekunden-Court',
      courtClosed: 'Ab auf den 60-Sekunden-Court',
      inStamp: 'Drin!',
      outStamp: 'Aus!',
      goodStamp: 'Gut!',
      faultStamp: 'Fehler!',
      dinkStamp: 'Dink!',
      serveHint: 'Diagonal, wie ein Handschlag übers Feld.',
      rallyOn: '<span class="fb-loud">Ballwechsel läuft!</span> Auf jeder Seite einmal aufspringen, dann ist Volley erlaubt.',
      rallyOnLive: 'Aufsprung 1, Aufsprung 2, jetzt ist Volley erlaubt.',
      goodVolley: '<span class="fb-loud">Guter Volley.</span> Genau diese Regel macht Pickleball so raffiniert.',
      goodVolleyLive: 'Guter Volley. Genau diese Regel macht Pickleball so raffiniert.',
      fault: '<span class="fb-loud bad">Fehler!</span> Du hast den Ball in der Kitchen aus der Luft geschlagen. Geh hinter die Linie zurück: Hier drin muss der Ball erst aufspringen.',
      faultLive: 'Fehler! Du hast den Ball in der Kitchen aus der Luft geschlagen. Geh hinter die Linie zurück: Hier drin muss der Ball erst aufspringen.',
      dinkSoft: ['<span class="fb-loud">Das ist ein Dink.</span> Willkommen im raffinierten Teil von Pickleball.', 'Das ist ein Dink. Willkommen im raffinierten Teil von Pickleball.'],
      dinkMid: ['Weicher … weicher …', 'Weicher … weicher …'],
      dinkHard: ['<span class="fb-loud bad">Zu hart,</span> der geht ins Aus.', 'Zu hart, der geht ins Aus.'],
      zoneSoft: 'Weich: Er fällt in die Kitchen',
      zoneMid: 'Mittel: Er landet mitten im Feld',
      zoneHard: 'Hart: Er fliegt ins Aus',
      scoreStart: (side) => `Spielbeginn: <b>0–0–2</b>. Die Seite, die zuerst aufschlägt, beginnt mit ihrer zweiten Person, deshalb endet die Ansage auf 2. ${side}`,
      sideNear: 'Deine Seite (weiß) schlägt auf.',
      sideFar: 'Die dunkelblaue Seite schlägt auf.',
      pointWon: 'Punkt für die aufschlagende Seite. Dieselbe Person schlägt noch mal auf.',
      rallyLost: 'Ballwechsel verloren. Kein Punkt: Jetzt schlägt die zweite Person im Team auf.',
      sideOut: 'Aufschlagwechsel! Jetzt schlägt die andere Seite auf, deshalb dreht sich die Ansage.',
      gameWon: (s, r) => `<span class="fb-loud">Spiel!</span> ${s}:${r}. Mindestens 11 Punkte, mit 2 Punkten Vorsprung.`,
      gameWonLive: (s, r) => `Spiel! ${s} zu ${r}.`,
      gameLabel: 'Spiel',
      callIs: (c) => `Die Ansage lautet <b>${c}</b>.`,
      callIsLive: (c) => `Die Ansage lautet ${c}.`,
      newGame: 'Neues Spiel. Die Ansage lautet 0–0–2.',
      eggGame: 'Spiel!',
      eggWin: 'Spiel! Stell dir vor, was du erst mit einem echten Paddle schaffst.',
      tryFree: 'Kostenlos ausprobieren',
      dropped: (n) => `Bei ${n} runtergefallen`,
      toasts: {
        video: 'Demo: VIDEO 01 läuft von unserem eigenen Server, sobald es fertig ist. Kein YouTube, kein Tracking.',
        schedule: 'Demo: Hier würde sich der vollständige Spielplan öffnen, mit allen Terminen der nächsten 8 Wochen.',
        factsheet: 'Demo: Hier würde das einseitige Hallen-Infoblatt (PDF) heruntergeladen.',
        houserules: 'Demo: Hier würden sich die Chat-Regeln öffnen. Kurzfassung: freundlich bleiben, beim Thema bleiben, keine Werbung.',
        ics: 'Demo: Hier würde eine Kalenderdatei (.ics) heruntergeladen.',
        cancel: 'Demo: Dein Platz würde frei, und die nächste Person auf der Warteliste bekäme ihn.',
        paddle: 'Demo: Für Donnerstag würde ein Leih-Paddle für dich zurückgelegt. Du bekämst es bei der Spielleitung.',
        rota: 'Demo: Du bist für den Netzaufbau am Do., 22. Okt. eingetragen. Danke!',
        profile: 'Demo: Hier würden sich dein Profil und deine Einwilligungen öffnen.',
        demo: 'Demo.',
      },
      rsvp: (event) => `Demo: Du bekämst jetzt eine Bestätigung per E-Mail für ${event}.`,
      docPdf: (doc) => `Demo: Hier würde sich ${doc} als PDF öffnen.`,
    },
  };
  const L = STRINGS[root.lang] || STRINGS.de;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
  const motionOK = () => !mqReduce.matches;
  const isPhone = () => innerWidth < 768;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PH = (t) => `<span class="ph" title="${L.phTitle}">${t}</span>`;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ------------------------------------------------------------------
     Sample state (memory only)
     ------------------------------------------------------------------ */
  const EUR = L.money(PH);
  // Session state only. Names, dates, times and prices are in STRINGS.
  const SESS = {
    S1: { cap: 16, left: 8, wait: 0, mine: 0, free: false },
    S2: { cap: 16, left: 6, wait: 0, mine: 0, free: true },
    S3: { cap: 16, left: 0, wait: 2, mine: 0, free: true },
    S4: { cap: 12, left: 3, wait: 0, mine: 0, free: false },
    S5: { cap: 16, left: 10, wait: 0, mine: 0, free: true },
  };
  const VOTES = { 'Lörrach': 43, 'Offenburg': 28, 'Konstanz': 19, 'Waldshut-Tiengen': 11, 'Villingen-Schwenningen': 9, 'Emmendingen': 7 };
  let founders = 37;

  /* ------------------------------------------------------------------
     Toast (global, plus one inside each dialog so it shows above the modal)
     ------------------------------------------------------------------ */
  const toastEl = $('#toast'), toastMsg = $('#toastMsg');
  let toastT;
  function hideToast(el = toastEl) { el.classList.remove('show'); const m = el.querySelector('p'); if (m) m.textContent = ''; }
  function toast(html) {
    const dlg = topDialog();
    const el = (dlg && dlg.querySelector('.sh-toast')) || toastEl;
    if (el !== toastEl) { const h = $('.sh-head', dlg); el.style.setProperty('--sh-top', `${(h ? h.offsetHeight : 0) + 10}px`); }
    const msg = el.querySelector('p');
    msg.innerHTML = html;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => hideToast(el), 5000);
  }
  $('#toastX').addEventListener('click', () => hideToast());

  const TOASTS = L.toasts;

  /* ------------------------------------------------------------------
     Dialogs: native <dialog>, showModal, Esc, focus return, scroll lock
     ------------------------------------------------------------------ */
  const dialogs = {};
  let stack = [];
  const topDialog = () => stack[stack.length - 1] || null;
  $$('dialog').forEach((d) => {
    dialogs[d.id.replace('dlg-', '')] = d;
    if (d.classList.contains('sheet')) {
      const t = document.createElement('div');
      t.className = 'sh-toast';
      t.setAttribute('role', 'status');
      t.innerHTML = `<p></p><button type="button" class="sh-toast-x" aria-label="${L.close}">×</button>`;
      t.lastChild.addEventListener('click', () => hideToast(t));
      d.appendChild(t);
    }
    d.addEventListener('close', () => {
      stack = stack.filter((x) => x !== d);
      if (!stack.length) root.classList.remove('locked', 'dialog-open');
      const o = d._opener;
      if (o && document.contains(o) && !o.closest('dialog:not([open])')) o.focus({ preventScroll: true });
      (AFTER[d.id] || (() => {}))(d);
    });
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); });
  });

  const PREP = {}, AFTER = {};
  function openDialog(name, opener, opts = {}) {
    const d = dialogs[name];
    if (!d || d.open) return;
    d._opener = opener || document.activeElement;
    (PREP[name] || (() => {}))(d, opts);
    d.showModal();
    stack.push(d);
    root.classList.add('locked', 'dialog-open');
    const first = d.querySelector('[data-autofocus]');
    if (first) first.focus();
  }

  /* ------------------------------------------------------------------
     Global click delegation
     ------------------------------------------------------------------ */
  document.addEventListener('click', (e) => {
    const t = e.target;
    const opener = t.closest('[data-open]');
    if (opener) {
      e.preventDefault();
      if (opener.closest('.menu-sheet') && dialogs.menu.open && opener.dataset.open !== 'menu') {
        dialogs.menu._opener = null; dialogs.menu.close();
      }
      openDialog(opener.dataset.open, opener, { session: opener.dataset.session, tier: opener.dataset.tier });
    }
    const closer = t.closest('[data-close]');
    if (closer) { const d = closer.closest('dialog'); if (d) { if (closer.tagName === 'A') d._opener = null; d.close(); } }
    const tb = t.closest('[data-toast]');
    if (tb) {
      const k = tb.dataset.toast;
      if (k === 'rsvp') toast(L.rsvp(esc(tb.dataset.event)));
      else if (k === 'doc') toast(L.docPdf(esc(tb.dataset.doc)));
      else toast(TOASTS[k] || TOASTS.demo);
    }
    const pop = t.closest('.pop');
    if (pop) burst(pop);
    const top = t.closest('[data-topic]');
    if (top) goContact(top.dataset.topic, top.dataset.msg);
    const foc = t.closest('a[data-focus]');
    if (foc) { e.preventDefault(); scrollToEl($(foc.getAttribute('href')), $(foc.dataset.focus)); }
    const ex = t.closest('[data-expand-court]');
    if (ex) expandCourt(true);
    // in-page anchors: smooth only when motion is allowed
    const a = t.closest('a[href^="#"]');
    if (a && !e.defaultPrevented && a.getAttribute('href').length > 1) {
      const el = document.getElementById(a.getAttribute('href').slice(1));
      if (el) { e.preventDefault(); scrollToEl(el, el.matches('section') ? (el.querySelector('h1, h2') || el) : el); }
    }
  });

  function scrollToEl(el, focusEl) {
    if (!el) return;
    el.scrollIntoView({ behavior: motionOK() ? 'smooth' : 'auto', block: 'start' });
    const f = focusEl || el;
    if (!f.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(f.tagName)) f.setAttribute('tabindex', '-1');
    setTimeout(() => f.focus({ preventScroll: true }), motionOK() ? 450 : 0);
  }

  /* button pop: three speed lines, 200 ms */
  $$('.btn-red').forEach((b) => { if (!b.closest('dialog')) b.classList.add('pop'); });
  function burst(btn) {
    if (!motionOK() || !btn.animate) return;
    const s = document.createElement('span');
    s.className = 'burst';
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<svg viewBox="0 0 64 40"><use href="#i-speed"/></svg>';
    btn.appendChild(s);
    s.animate([{ opacity: 0, transform: 'scaleX(-1) translateX(-4px)' }, { opacity: 1, offset: .35 }, { opacity: 0, transform: 'scaleX(-1) translateX(-16px)' }], { duration: 200, easing: 'ease-out' }).finished.then(() => s.remove(), () => s.remove());
  }

  /* ------------------------------------------------------------------
     Language switch: DE and EN are links between the two pages. FR is a stub:
     the ball bounces onto it and a notice shows.
     ------------------------------------------------------------------ */
  $$('.lang').forEach((l) => {
    l.addEventListener('click', (e) => {
      if (!e.target.closest('button[data-lang="fr"]')) return;
      toast(L.frNotice);
      if (!motionOK()) return;
      l.style.setProperty('--li', 1);
      l.dataset.at = 'fr';
      clearTimeout(l._t);
      l._t = setTimeout(() => { l.style.removeProperty('--li'); delete l.dataset.at; }, 1300);
    });
  });

  /* ------------------------------------------------------------------
     Session cards: capacity as balls
     ------------------------------------------------------------------ */
  const BALL_SVG = '<svg viewBox="0 0 100 100"><use href="#i-ball"/></svg>';
  function renderCap(id) {
    const s = SESS[id];
    const li = $(`.sess[data-id="${id}"]`);
    if (!li) return;
    const balls = $('.cap-balls', li);
    const taken = s.cap - s.left - s.mine;
    let html = '';
    for (let i = 0; i < taken; i++) html += '<i class="t"></i>';
    for (let i = 0; i < s.mine; i++) html += `<i class="y">${BALL_SVG}</i>`;
    for (let i = 0; i < s.left; i++) html += '<i class="f"></i>';
    balls.innerHTML = html;
  }
  function syncSession(id) {
    const s = SESS[id];
    const li = $(`.sess[data-id="${id}"]`);
    renderCap(id);
    const txt = $('.cap-txt', li);
    const mine = s.mine ? ` · <span class="cap-you">${L.yours(s.mine)}</span>` : '';
    if (s.left > 0) txt.innerHTML = `<b data-left="${id}">${s.left}</b> ${L.seatsOf(s.left, s.cap)}${mine}`;
    else txt.innerHTML = `<b>${L.full}</b> · ${L.waitlistLabel} <b data-wait="${id}">${s.wait}</b>${mine}`;
    const opt = $(`[data-optleft="${id}"]`);
    if (opt) opt.textContent = s.left > 0 ? `${s.left} ${L.leftWord(s.left)}` : L.fullWaiting(s.wait);
    if (id === 'S2') {
      $$('[data-left="S2"]').forEach((n) => { if (!n.closest('.sc')) n.textContent = s.left; });
      const left = $('#heroChip .nc-left');
      if (left) left.innerHTML = s.left > 0 ? `<span data-left="S2">${s.left}</span> ${L.leftWord(s.left)}` : L.fullJoin;
    }
  }
  function toWaitSide(id) {
    const li = $(`.sess[data-id="${id}"]`);
    const card = $('.sc', li);
    const swap = () => {
      li.classList.add('is-full');
      card.classList.add('sc-wait');
      const shoes = $('.sc-shoes', card);
      if (shoes) { shoes.className = 'sc-waitline'; shoes.textContent = L.waitLine; }
      const btn = $('.sc-btn', card);
      btn.className = 'btn btn-navy sc-btn';
      btn.innerHTML = `${L.joinWaitlist}<span class="vh"> ${L.waitFor(esc(L.sess[id].name), L.sess[id].short)}</span>`;
      syncSession(id);
    };
    if (!motionOK() || !card.animate) return swap();
    card.animate([{ transform: 'perspective(900px) rotateY(0)' }, { transform: 'perspective(900px) rotateY(90deg)' }], { duration: 200, easing: 'ease-in' }).finished.then(() => {
      swap();
      card.animate([{ transform: 'perspective(900px) rotateY(-90deg)' }, { transform: 'perspective(900px) rotateY(0)' }], { duration: 200, easing: 'ease-out' });
    });
  }
  function dropMine(id) {
    const li = $(`.sess[data-id="${id}"]`);
    const ball = li && $$('.cap-balls .y', li).pop();
    if (!ball || !motionOK() || !ball.animate) return;
    ball.animate([
      { transform: 'translateY(-70px)', opacity: 0, easing: 'cubic-bezier(.5,0,.9,.5)' },
      { transform: 'translateY(0) scale(1.2,.8)', opacity: 1, offset: .62, easing: 'ease-out' },
      { transform: 'translateY(-8px)', offset: .8, easing: 'ease-in' },
      { transform: 'none' },
    ], { duration: 560 });
  }
  Object.keys(SESS).forEach(syncSession);

  /* filters */
  const filterSet = new Set();
  const sessItems = $$('.sess');
  function applyFilters() {
    let shown = 0;
    sessItems.forEach((li) => {
      const tags = li.dataset.tags.split(' ');
      const ok = [...filterSet].every((f) => tags.includes(f));
      li.hidden = !ok;
      if (ok) shown++;
    });
    $$('[data-filter]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.filter === 'all' ? String(!filterSet.size) : String(filterSet.has(b.dataset.filter))));
    $('#sessEmpty').hidden = shown > 0;
    $('#sessMore').hidden = !shown;
    $('#sessCount').textContent = shown ? L.showing(shown, sessItems.length) : L.noMatch;
    const list = $('#sessList');
    if (list.scrollLeft) list.scrollLeft = 0;
  }
  $$('[data-filter]').forEach((b) => b.addEventListener('click', () => {
    const f = b.dataset.filter;
    if (f === 'all') filterSet.clear();
    else if (filterSet.has(f)) filterSet.delete(f);
    else filterSet.add(f);
    applyFilters();
  }));
  $('[data-filter-reset]').addEventListener('click', () => { filterSet.clear(); applyFilters(); $('[data-filter="all"]').focus(); });

  const tn = $('#tonight'), tnBtn = $('#tnToggle');
  tnBtn.addEventListener('click', () => {
    const off = tn.dataset.state === 'on';
    tn.dataset.state = off ? 'off' : 'on';
    tnBtn.setAttribute('aria-pressed', String(off));
    tnBtn.textContent = off ? L.tnOn : L.tnOff;
  });

  /* ------------------------------------------------------------------
     Forms: shared validation
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
    return !msg;
  }
  function check(input, { required = true, email = false } = {}) {
    const v = input.value.trim();
    if (required && !v) return setErr(input, L.req);
    if (email && v && !EMAIL.test(v)) return setErr(input, L.email);
    return setErr(input, '');
  }
  function firstInvalid(scope) {
    const f = $('[aria-invalid="true"]', scope);
    if (f) f.focus();
    return !f;
  }
  // clear an error as soon as the person fixes it
  document.addEventListener('input', (e) => {
    const t = e.target;
    if (t.getAttribute && t.getAttribute('aria-invalid') === 'true') {
      const v = t.type === 'checkbox' ? t.checked : t.value.trim();
      if (v && (t.type !== 'email' || EMAIL.test(t.value.trim()))) setErr(t, '');
    }
  });

  /* zones progress inside dialogs */
  function setZones(d, i, n, labels) {
    const z = $('.zones', d);
    if (z) { z.style.setProperty('--i', i); z.dataset.at = i; }
    const sr = $('[data-progress]', d);
    if (sr) sr.textContent = L.progress(i, n, labels[i]);
  }
  function doneFoot(d, show) {
    const foot = $('.sh-foot', d);
    foot.hidden = show;
    let done = $('.sh-done-foot', d);
    if (show && !done) {
      done = document.createElement('div');
      done.className = 'sh-foot sh-done-foot';
      done.innerHTML = `<span></span><button type="button" class="btn btn-navy" data-close>${L.done}</button>`;
      foot.after(done);
    }
    if (done) done.hidden = !show;
  }

  /* ------------------------------------------------------------------
     Trial booking (First Serve)
     ------------------------------------------------------------------ */
  const dT = dialogs.trial, fT = $('#trialForm');
  const T = { step: 0, done: false, friends: 0, last: null };
  const T_LABELS = L.trialSteps;
  function trialSel() { const r = $('input[name="session"]:checked', fT); return r ? r.value : null; }
  function trialWait() { const id = trialSel(); return id && SESS[id].left <= 0; }
  function trialStep(i) {
    T.step = i;
    $$('.step', fT).forEach((s) => { s.hidden = Number(s.dataset.step) !== i; });
    setZones(dT, i, 3, T_LABELS);
    $('[data-back]', dT).hidden = i === 0;
    $('[data-next]', dT).hidden = i !== 0;
    const sub = $('[data-submit]', dT);
    sub.hidden = i !== 1;
    sub.textContent = trialWait() ? L.joinWaitlist : L.saveSpot;
    $('[data-privacy]', dT).hidden = i !== 1;
    $('#trialWaitNote').hidden = !trialWait();
    const sel = trialSel();
    $('#trialT').textContent = trialWait() ? L.joinWaitlist : (sel && L.sess[sel].title) || L.bookFree;
    $('.sh-body', dT).scrollTop = 0;
  }
  PREP.trial = (d, o) => {
    if (T.done) {
      fT.reset(); T.done = false; T.friends = 0; $('#tFriends').textContent = '0';
      $('#tGuardian').hidden = true; $('#tU18').setAttribute('aria-expanded', 'false');
      $('#trialDone').hidden = true; fT.hidden = false; doneFoot(d, false);
      $$('[aria-invalid]', fT).forEach((i) => setErr(i, ''));
    }
    // a plain "Try it free" always lands on a free taster
    const cur = trialSel();
    const id = o.session || (cur && SESS[cur].free ? cur : 'S2');
    const r = $(`input[name="session"][value="${id}"]`, fT);
    if (r) r.checked = true;
    trialStep(0);
    friendsBtns();
  };
  fT.addEventListener('change', (e) => {
    if (e.target.name === 'session') trialStep(T.step);
    if (e.target.id === 'tU18') {
      const on = e.target.checked;
      $('#tGuardian').hidden = !on;
      e.target.setAttribute('aria-expanded', String(on));
      if (!on) ['tGName', 'tGEmail'].forEach((id) => setErr($('#' + id), ''));
    }
  });
  $('[data-next]', dT).addEventListener('click', () => {
    if (!trialSel()) { $('#trialSessErr').textContent = L.session; $('#trialSessErr').hidden = false; return; }
    trialStep(1);
    $('#tFirst').focus();
  });
  $('[data-back]', dT).addEventListener('click', () => { trialStep(0); const r = $('input[name="session"]:checked', fT); if (r) r.focus(); });
  function friendsBtns() {
    $('[data-step-friend="-1"]', dT).disabled = T.friends <= 0;
    $('[data-step-friend="1"]', dT).disabled = T.friends >= 2;
  }
  $$('[data-step-friend]', dT).forEach((b) => b.addEventListener('click', () => {
    T.friends = Math.max(0, Math.min(2, T.friends + Number(b.dataset.stepFriend)));
    $('#tFriends').textContent = T.friends;
    friendsBtns();
    if (b.disabled) $(`[data-step-friend="${-Number(b.dataset.stepFriend)}"]`, dT).focus();
  }));
  fT.addEventListener('submit', (e) => {
    e.preventDefault();
    if (T.step !== 1) return;
    check($('#tFirst'));
    check($('#tEmail'), { email: true });
    if ($('#tU18').checked) { check($('#tGName')); check($('#tGEmail'), { email: true }); }
    if (!firstInvalid(fT)) return;
    const id = trialSel(), s = SESS[id], c = L.sess[id], first = $('#tFirst').value.trim();
    const waitlist = s.left <= 0;
    let pos = 0;
    if (waitlist) { s.wait += 1; pos = s.wait; } else { s.left -= 1; s.mine += 1; }
    T.done = true;
    T.last = { id, waitlist, becameFull: !waitlist && s.left === 0 };
    syncSession(id);
    $('#trialT').textContent = waitlist ? L.onWaitTitle(first) : L.inTitle(first);
    setZones(dT, 2, 3, T_LABELS);
    $('#trialWinT').textContent = waitlist ? L.onWaitWin : L.inWin;
    const facts = `<div class="done-facts"><b>${esc(c.name)}</b><span>${c.date} · ${c.time}</span><span>${s.free ? L.free : L.priceFor(c.price(EUR))}</span><span>${L.venueLine(PH)}</span></div>`;
    $('#trialDoneBody').innerHTML = waitlist
      ? `${L.waitDone(pos)}${facts}`
      : `${facts}
         ${L.doors}
         <div class="done-actions"><button type="button" class="btn btn-navy" data-toast="ics">${L.addCal}</button><button type="button" class="btn btn-quiet" id="shareBtn">${L.sendFriend}</button></div>
         ${L.cantMake}`;
    fT.hidden = true;
    const done = $('#trialDone');
    done.hidden = false;
    doneFoot(dT, true);
    const win = $('.win', done);
    win.classList.remove('go');
    if (motionOK()) { void win.offsetWidth; win.classList.add('go'); }
    done.focus();
    const sb = $('#shareBtn');
    if (sb) sb.addEventListener('click', () => share(id));
  });
  async function share(id) {
    const c = L.sess[id], at = `${c.short}, ${c.time.split('–')[0]}`;
    const text = SESS[id].free ? L.shareFree(at) : L.shareBooked(c.share, at);
    try {
      if (navigator.share) { await navigator.share({ text }); return; }
      throw new Error('no share');
    } catch (err) {
      if (err && err.name === 'AbortError') return;
      try { await navigator.clipboard.writeText(text); toast(L.copied(esc(text))); }
      catch { toast(L.copyManual(esc(text))); }
    }
  }
  AFTER['dlg-trial'] = () => {
    if (!T.last) return;
    const { id, waitlist, becameFull } = T.last;
    T.last = null;
    if (!waitlist) setTimeout(() => dropMine(id), 120);
    if (becameFull) setTimeout(() => toWaitSide(id), motionOK() ? 760 : 0);
  };

  /* ------------------------------------------------------------------
     Membership application
     ------------------------------------------------------------------ */
  const dM = dialogs.member, fM = $('#memForm');
  const M = { step: 0, done: false, autoYouth: false };
  const M_LABELS = L.memSteps;
  const TIER = L.tiers;
  function ageOn(dob) {
    const d = new Date(dob + 'T00:00:00');
    if (isNaN(d)) return null;
    const now = new Date();
    let a = now.getFullYear() - d.getFullYear();
    if (now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) a--;
    return a;
  }
  function isMinor() { const a = ageOn($('#mDob').value); return a !== null && a < 18; }
  function memStep(i) {
    M.step = i;
    $$('.step', fM).forEach((s) => { s.hidden = Number(s.dataset.step) !== i; });
    setZones(dM, i, 4, M_LABELS);
    $('[data-back]', dM).hidden = i === 0;
    $('[data-next]', dM).hidden = i === 3;
    $('[data-submit]', dM).hidden = i !== 3;
    $('[data-privacy]', dM).hidden = i !== 3;
    $('.sh-body', dM).scrollTop = 0;
    if (i === 2) {
      const h = $('#mHolder'), name = `${$('#mFirst').value.trim()} ${$('#mLast').value.trim()}`.trim();
      if (!h.value || h.dataset.auto) { h.value = name; h.dataset.auto = '1'; }
    }
    if (i === 1) tierNote();
    if (i === 3) buildSummary();
  }
  // Youth follows the date of birth while we chose it; a calm note flags a tier that doesn't match the age
  const tierR = (v) => $(`input[name="tier"][value="${v}"]`, fM);
  function tierNote() {
    const a = ageOn($('#mDob').value), tier = $('input[name="tier"]:checked', fM).value, n = $('#mTierNote');
    let msg = '';
    if (a !== null && a >= 18 && tier === 'youth') msg = L.youthNote;
    else if (a !== null && a >= 0 && a < 18 && !['youth', 'family'].includes(tier)) msg = L.underageNote;
    n.textContent = msg;
    n.hidden = !msg;
  }
  PREP.member = (d, o) => {
    if (M.done) {
      fM.reset(); M.done = false; M.autoYouth = false; $('#memDone').hidden = true; fM.hidden = false; doneFoot(d, false);
      $('#mGuardian').hidden = true; $('#sepaBlock').hidden = false; $('#transferNote').hidden = true; $('#mFamilyNote').hidden = true;
      $$('[aria-invalid]', fM).forEach((i) => setErr(i, ''));
    }
    if (o.tier) { const r = tierR(o.tier); if (r) { r.checked = true; M.autoYouth = false; } $('#mFamilyNote').hidden = o.tier !== 'family'; }
    $('#mFounderNo').textContent = `#${String(founders + 1).padStart(3, '0')}`;
    memStep(0);
  };
  $('#mDob').addEventListener('change', () => {
    const minor = isMinor();
    $('#mGuardian').hidden = !minor;
    if (minor) {
      if (!tierR('youth').checked) { tierR('youth').checked = true; M.autoYouth = true; }
    } else {
      ['mGName', 'mGEmail'].forEach((id) => setErr($('#' + id), ''));
      if (M.autoYouth && tierR('youth').checked) tierR('adult').checked = true;
      M.autoYouth = false;
    }
    $('#mFamilyNote').hidden = !tierR('family').checked;
    tierNote();
  });
  fM.addEventListener('change', (e) => {
    if (e.target.name === 'tier') { M.autoYouth = false; $('#mFamilyNote').hidden = e.target.value !== 'family'; tierNote(); }
    if (e.target.name === 'pay') { const sepa = e.target.value === 'sepa'; $('#sepaBlock').hidden = !sepa; $('#transferNote').hidden = sepa; }
    if (e.target.id === 'mHolder') delete e.target.dataset.auto;
  });
  function validateMem(i) {
    if (i === 0) {
      ['mFirst', 'mLast', 'mStreet', 'mZip', 'mTown'].forEach((id) => check($('#' + id)));
      const dob = $('#mDob');
      if (!dob.value) setErr(dob, L.req);
      else if (ageOn(dob.value) === null || ageOn(dob.value) < 0 || ageOn(dob.value) > 120) setErr(dob, L.checkDob);
      else setErr(dob, '');
      check($('#mEmail'), { email: true });
      if (isMinor()) { check($('#mGName')); check($('#mGEmail'), { email: true }); }
      return firstInvalid($('.step[data-step="0"]', fM));
    }
    return true;
  }
  $('[data-next]', dM).addEventListener('click', () => {
    if (!validateMem(M.step)) return;
    memStep(Math.min(3, M.step + 1));
    const s = $(`.step[data-step="${M.step}"]`, fM);
    const f = $('input:not([disabled]), select', s);
    if (f) f.focus();
  });
  $('[data-back]', dM).addEventListener('click', () => { memStep(Math.max(0, M.step - 1)); const f = $(`.step[data-step="${M.step}"] input`, fM); if (f) f.focus(); });
  function buildSummary() {
    const v = (id) => esc($('#' + id).value.trim());
    const lang = { de: 'Deutsch', fr: 'Français', en: 'English' }[$('input[name="mlang"]:checked', fM).value];
    const tier = $('input[name="tier"]:checked', fM).value;
    const pay = $('input[name="pay"]:checked', fM).value;
    const lb = L.labels;
    const rows = [
      [lb.name, `${v('mFirst')} ${v('mLast')}`, 0],
      [lb.dob, esc($('#mDob').value.split('-').reverse().join(root.lang === 'de' ? '.' : '/')), 0],
      [lb.address, `${v('mStreet')}, ${v('mZip')} ${v('mTown')}, ${v('mCountry')}`, 0],
      [lb.email, v('mEmail'), 0],
      [lb.language, lang, 0],
    ];
    if (isMinor()) rows.push([lb.guardian, `${v('mGName')} · ${v('mGEmail')}`, 0]);
    rows.push([lb.membership, L.memberLine(TIER[tier], EUR), 1]);
    rows.push([lb.payment, pay === 'sepa' ? L.sepa : L.transfer, 2]);
    $('#memSummary').innerHTML = rows.map(([k, val, st]) => `<div><dt>${k}</dt><dd>${val}</dd><dd><button type="button" class="linkbtn" data-edit="${st}">${lb.edit}<span class="vh"> ${root.lang === 'de' ? k : k.toLowerCase()}</span></button></dd></div>`).join('');
  }
  $('#memSummary').addEventListener('click', (e) => {
    const b = e.target.closest('[data-edit]');
    if (b) { memStep(Number(b.dataset.edit)); const f = $(`.step[data-step="${M.step}"] input`, fM); if (f) f.focus(); }
  });
  fM.addEventListener('submit', (e) => {
    e.preventDefault();
    if (M.step !== 3) return;
    const acc = $('#mAccept');
    setErr(acc, acc.checked ? '' : L.satzung);
    if (!acc.checked) { acc.focus(); return; }
    const first = $('#mFirst').value.trim();
    founders += 1;
    const no = `#${String(founders).padStart(3, '0')}`;
    M.done = true;
    $('#memT').textContent = L.memT;
    $('#memWinNo').textContent = no;
    $('#memDoneBody').innerHTML = L.memThanks(esc(first), PH);
    fM.hidden = true;
    const done = $('#memDone');
    done.hidden = false;
    doneFoot(dM, true);
    done.focus();
    setFounders(founders);
  });
  PREP.member.reset = () => {};

  /* ------------------------------------------------------------------
     Member login and dashboard preview
     ------------------------------------------------------------------ */
  PREP.login = () => {
    $('#loginForm').hidden = false; $('#loginSent').hidden = true; $('#dash').hidden = true;
    $('#loginT').textContent = L.loginT;
    setErr($('#lEmail'), '');
  };
  $('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!check($('#lEmail'), { email: true })) { $('#lEmail').focus(); return; }
    $('#loginForm').hidden = true;
    $('#loginSent').hidden = false;
    $('#loginSent').focus();
  });
  $('#loginPreview').addEventListener('click', () => {
    $('#loginSent').hidden = true;
    $('#dash').hidden = false;
    $('#loginT').textContent = L.dashT;
    $('#dash').focus();
  });

  /* ------------------------------------------------------------------
     Newsletter, contact, town vote
     ------------------------------------------------------------------ */
  $('#newsletter').addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = check($('#nlEmail'), { email: true });
    $('#nlOk').textContent = '';
    if (!ok) { $('#nlEmail').focus(); return; }
    $('#nlOk').textContent = L.nlOk;
  });

  const WHO = L.who;
  const cTopic = $('#cTopic');
  const whoLine = () => { $('#cTopicWho').innerHTML = L.heardFrom(WHO[cTopic.value], PH); };
  cTopic.addEventListener('change', whoLine);
  whoLine();
  function goContact(topic, msg) {
    cTopic.value = topic;
    whoLine();
    const m = $('#cMsg');
    if (!m.value.trim() || m.dataset.auto) { m.value = msg ? msg + ' ' : ''; m.dataset.auto = '1'; }
    scrollToEl($('#contact-form'), m);
  }
  $('#cMsg').addEventListener('input', (e) => { delete e.target.dataset.auto; });
  $('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#cOk').textContent = '';
    check($('#cName')); check($('#cEmail'), { email: true }); check($('#cMsg'));
    if (!firstInvalid(e.target)) return;
    if ($('#cWebsite').value) return; // honeypot
    $('#cOk').innerHTML = L.cOk(WHO[cTopic.value], PH);
  });

  function renderBuckets() {
    $$('.bk').forEach((g) => {
      const n = VOTES[g.dataset.town] || 0;
      const k = Math.min(3, Math.max(1, Math.ceil(n / 15)));
      const pos = [[-5, 2], [5, 2], [0, -6]];
      $('.bk-balls', g).innerHTML = pos.slice(0, k).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5"/>`).join('');
    });
    $$('[data-votes]').forEach((b) => { b.textContent = VOTES[b.dataset.votes]; });
  }
  renderBuckets();
  const voteTown = $('#voteTown');
  function pickTown(town, focus = true) {
    voteTown.value = town;
    setErr(voteTown, '');
    if (focus) voteTown.focus();
  }
  $('#voteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#voteOk').textContent = '';
    const t = voteTown.value;
    if (!t) { setErr(voteTown, L.town); voteTown.focus(); return; }
    setErr(voteTown, '');
    const em = $('#voteEmail');
    if (!check(em, { required: false, email: true })) { em.focus(); return; }
    if (t === 'Other') { $('#voteOk').textContent = L.voteOther; return; }
    VOTES[t] += 1;
    renderBuckets();
    const g = $(`.bk[data-town="${t}"]`);
    if (g && motionOK()) {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('r', '6'); c.setAttribute('cx', '0'); c.setAttribute('cy', '-4');
      $('.bk-balls', g).appendChild(c);
      c.animate([{ transform: 'translateY(-70px)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1, offset: .7 }, { transform: 'translateY(-6px)', offset: .85 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 600, easing: 'ease-in' }).finished.then(() => setTimeout(() => c.remove(), 900));
    }
    $('#voteOk').textContent = L.voteDone(t, VOTES[t]);
  });
  $$('[data-vote-town]').forEach((b) => b.addEventListener('click', () => pickTown(b.dataset.voteTown)));
  const PINS = L.pins;
  $$('.pin').forEach((p) => p.addEventListener('click', () => {
    $$('.pin.on').forEach((x) => x.classList.remove('on'));
    p.classList.add('on');
    const k = p.dataset.pin;
    if (PINS[k]) { $('#pinInfo').innerHTML = PINS[k](PH); return; }
    $('#pinInfo').innerHTML = L.pinVotes(esc(k), VOTES[k]);
    pickTown(k, false);
  }));

  /* ------------------------------------------------------------------
     First 100: flip-digit counter (000 → 037, once)
     ------------------------------------------------------------------ */
  const tiles = $$('#flipCounter .ft');
  function setFounders(n, animate = false) {
    const s = String(n).padStart(3, '0');
    tiles.forEach((t, i) => {
      if (t.textContent !== s[i]) {
        t.textContent = s[i];
        if (animate) { t.classList.remove('tick'); void t.offsetWidth; t.classList.add('tick'); }
      }
    });
    $('#flipCounter').setAttribute('aria-label', L.foundersAria(n));
    $('#nextFounder').textContent = `#${String(n + 1).padStart(3, '0')}`;
  }
  if (motionOK() && 'IntersectionObserver' in window) {
    tiles.forEach((t) => { t.textContent = '0'; });
    const io = new IntersectionObserver((ents) => {
      if (!ents.some((x) => x.isIntersecting)) return;
      io.disconnect();
      let n = 0;
      const target = founders;
      const tick = () => {
        n = Math.min(target, n + (n < 30 ? 3 : 1));
        setFounders(n, true);
        if (n < target) setTimeout(tick, 70);
      };
      setTimeout(tick, 150);
    }, { threshold: .6 });
    io.observe($('#flipCounter'));
  }

  /* ------------------------------------------------------------------
     I've played… chips
     ------------------------------------------------------------------ */
  const playedList = $('#playedList');
  $$('[data-played]').forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.played;
    $$('[data-played]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    $$('[data-played-a]', playedList).forEach((d) => d.classList.toggle('is-on', d.dataset.playedA === k));
    playedList.classList.add('has-pick');
    const hint = $('#playedHint');
    if (hint) hint.hidden = true;
  }));

  /* ------------------------------------------------------------------
     Court teaser (phones): the court opens with one tap
     ------------------------------------------------------------------ */
  const courtMore = $('#courtMore'), teaser = $('#courtTeaser');
  courtMore.classList.add('is-collapsed');
  function expandCourt(open) {
    const on = open === undefined ? courtMore.classList.contains('is-collapsed') : open;
    courtMore.classList.toggle('is-collapsed', !on);
    teaser.setAttribute('aria-expanded', String(on));
    $('.ct-title', teaser).textContent = on ? L.courtOpen : L.courtClosed;
  }
  teaser.addEventListener('click', () => {
    const opening = courtMore.classList.contains('is-collapsed');
    expandCourt(opening);
    // phones: land on the step text, so the instruction and the whole court share one screen
    if (opening) setTimeout(() => $('.ca-step.is-active .st-title').scrollIntoView({ behavior: motionOK() ? 'smooth' : 'auto', block: 'start' }), 30);
  });

  /* ------------------------------------------------------------------
     The 60-second court
     ------------------------------------------------------------------ */
  const app = $('#courtApp');
  const cBall = $('#cBall'), cPath = $('#cPath'), cMarks = $('#cMarks'), stamp = $('#stamp');
  const fb = $('#caFeedback'), live = $('#courtLive');
  const steps = $$('.ca-step', app), tabs = $$('[data-goto]', app);
  const NS = 'http://www.w3.org/2000/svg';
  let step = 0, run = 0, anims = [];
  // Ball spots at each player's paddle. Phones show the court in portrait, where the pictograms are
  // turned upright, so their paddles sit elsewhere in court coordinates.
  const P_LAND = { serve: [42, 180], p2: [24, 70], p3: [480, 58], p4: [482, 184], kp: [240, 124], kb: [164, 124], dk: [184, 124] };
  const P_PORT = { serve: [37, 201], p2: [34, 46], p3: [488, 44], p4: [491, 166], kp: [245, 147], kb: [169, 147], dk: [189, 147] };
  const mqPortrait = matchMedia('(max-width: 767px)');
  let P = mqPortrait.matches ? P_PORT : P_LAND;
  const caBack = $('#caBack'), caNext = $('#caNext');
  const setBall = (x, y, s = 1) => { cBall.style.transform = `translate(${x}px, ${y}px) scale(${s})`; };
  function say(html, text) { fb.innerHTML = html; live.textContent = ''; setTimeout(() => { live.textContent = text; }, 40); }
  function showStamp(txt, bad) {
    stamp.textContent = txt; stamp.classList.toggle('bad', !!bad); stamp.classList.add('show');
    if (motionOK() && stamp.animate) stamp.animate([{ opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1 }], { duration: 220, easing: 'cubic-bezier(.3,1.5,.5,1)' });
  }
  function clearCourt() {
    run++;
    anims.forEach((a) => a.cancel()); anims = [];
    cPath.setAttribute('d', ''); cMarks.innerHTML = ''; stamp.classList.remove('show');
    $$('.serve-box', app).forEach((b) => b.classList.remove('picked-good', 'picked-bad'));
    $$('.cs-side', app).forEach((r) => r.classList.remove('on'));
    $('#plKmove').style.transform = '';
    $$('#bounceTicker span').forEach((s) => s.classList.remove('on'));
    fb.innerHTML = '';
  }
  const quad = (a, c, b, t) => [(1 - t) * (1 - t) * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0], (1 - t) * (1 - t) * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1]];
  function ctrl(a, b, lift = 60) { return [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - lift]; }
  function flight(a, b, dur, lift = 60, peak = 1.35) {
    const c = ctrl(a, b, lift), frames = [];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12, [x, y] = quad(a, c, b, t), s = 1 + (peak - 1) * Math.sin(Math.PI * t);
      frames.push({ transform: `translate(${x}px, ${y}px) scale(${s})` });
    }
    setBall(b[0], b[1]);
    if (!motionOK() || !cBall.animate) return Promise.resolve();
    const an = cBall.animate(frames, { duration: dur, easing: 'linear' });
    anims.push(an);
    return an.finished.catch(() => {});
  }
  function pathD(pts, lift = 60) {
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) { const c = ctrl(pts[i - 1], pts[i], lift); d += ` Q${c[0]} ${c[1]} ${pts[i][0]} ${pts[i][1]}`; }
    return d;
  }
  function mark(x, y, kind = 'ring') {
    if (kind === 'x') {
      const g = document.createElementNS(NS, 'g');
      g.innerHTML = `<path class="mark-x" d="M${x - 9} ${y - 9}L${x + 9} ${y + 9}M${x + 9} ${y - 9}L${x - 9} ${y + 9}"/>`;
      cMarks.appendChild(g);
    } else {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('class', 'mark-ring'); c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', 12);
      cMarks.appendChild(c);
    }
  }
  const SETUP = [
    () => { setBall(...P.serve); say('', ''); fb.innerHTML = ''; },
    () => { setBall(...P.serve); },
    () => { setBall(...P.p3); },
    () => { $('#plKmove').style.transform = 'translateX(-56px)'; dink(); },
    () => { renderScore(''); },
  ];
  function goto(i, user = false) {
    step = Math.max(0, Math.min(4, i));
    clearCourt();
    app.dataset.step = step;
    steps.forEach((s, k) => s.classList.toggle('is-active', k === step));
    tabs.forEach((t, k) => { if (k === step) t.setAttribute('aria-current', 'step'); else t.removeAttribute('aria-current'); t.classList.toggle('done', k < step); });
    $('.ca-progress', app).style.setProperty('--p', step / 4);
    $('#caCount').textContent = L.caCount(step);
    // step 1 has no Back: hide it but keep its slot, so Next never moves
    if (step === 0 && document.activeElement === caBack) caNext.focus();
    caBack.classList.toggle('is-off', step === 0);
    caNext.textContent = step === 4 ? L.finish : L.next;
    SETUP[step]();
    if (!user) return;
    // tell screen readers which step is showing, with its rule (and the scoring intro)
    const sec = steps[step], txt = [
      L.stepLive(step, $('.st-title', sec).textContent.replace(/^\s*\d+\s*/, '').trim()),
      $('.st-rule', sec).textContent,
      $('.st-do', sec) ? $('.st-do', sec).innerText : '',
      step === 4 ? fb.textContent : '',
    ].filter(Boolean).join(' ');
    live.textContent = '';
    setTimeout(() => { live.textContent = txt; }, 40);
    // phones: the step text sits above the court, so bring it into view
    if (isPhone()) {
      const t = $('.st-title', sec), r = t.getBoundingClientRect();
      if (r.top < 72 || r.top > innerHeight * .6) t.scrollIntoView({ block: 'start', behavior: motionOK() ? 'smooth' : 'auto' });
    }
  }
  tabs.forEach((t) => t.addEventListener('click', () => goto(Number(t.dataset.goto), true)));
  caBack.addEventListener('click', () => goto(step - 1, true));
  mqPortrait.addEventListener('change', () => { P = mqPortrait.matches ? P_PORT : P_LAND; goto(step); });
  caNext.addEventListener('click', () => {
    if (step < 4) { goto(step + 1, true); return; }
    const ec = $('#endcard .ec-title');
    scrollToEl($('#endcard'), ec);
    if (motionOK() && ec.animate) ec.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.04, .94)' }, { transform: 'scale(1)' }], { duration: 260, delay: 420 });
  });

  // 1 serve
  $$('.serve-box', app).forEach((b) => b.addEventListener('click', async () => {
    clearCourt();
    const good = b.dataset.serve === 'good', me = run;
    const to = good ? [440, 62] : [440, 182];
    cPath.setAttribute('d', pathD([P.serve, to], 70));
    const word = good ? L.inStamp : L.outStamp;
    say('', '');
    await flight(P.serve, to, 620, 70);
    if (me !== run) return;
    b.classList.add(good ? 'picked-good' : 'picked-bad');
    mark(to[0], to[1], good ? 'ring' : 'x');
    showStamp(word, !good);
    say(`<span class="fb-loud${good ? '' : ' bad'}">${word}</span> ${L.serveHint}`, `${word} ${L.serveHint}`);
  }));

  // 2 two bounces
  $('#playPoint').addEventListener('click', async () => {
    clearCourt();
    const me = run;
    const B1 = [430, 74], C = P.p3, B2 = [120, 98], D = P.p2, E = [470, 176];
    cPath.setAttribute('d', pathD([P.serve, B1, C, B2, D, E], 50));
    const tick = (n) => $(`#bounceTicker [data-b="${n}"]`).classList.add('on');
    if (!motionOK()) {
      [B1, B2].forEach((p) => mark(...p)); [1, 2, 3].forEach(tick); setBall(...E);
    } else {
      setBall(...P.serve);
      await flight(P.serve, B1, 520, 70); if (me !== run) return; mark(...B1); tick(1);
      await flight(B1, C, 220, 20, 1.15); if (me !== run) return;
      await flight(C, B2, 560, 70); if (me !== run) return; mark(...B2); tick(2);
      await flight(B2, D, 220, 20, 1.15); if (me !== run) return;
      await flight(D, E, 560, 50); if (me !== run) return; tick(3);
    }
    say(L.rallyOn, L.rallyOnLive);
  });

  // 3 the kitchen
  $$('[data-kitchen]', app).forEach((b) => b.addEventListener('click', async () => {
    clearCourt();
    const me = run, back = b.dataset.kitchen === 'back';
    const kp = $('#plKmove');
    setBall(...P.p3);
    if (back) {
      if (motionOK() && kp.animate) { const a = kp.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-76px)' }], { duration: 380, easing: 'ease-out' }); anims.push(a); await a.finished.catch(() => {}); if (me !== run) return; }
      kp.style.transform = 'translateX(-76px)';
    }
    const to = back ? P.kb : P.kp;
    cPath.setAttribute('d', pathD([P.p3, to], 40));
    await flight(P.p3, to, 560, 40, 1.3);
    if (me !== run) return;
    if (back) {
      showStamp(L.goodStamp);
      say(L.goodVolley, L.goodVolleyLive);
    } else {
      const fl = $('#kFlash');
      if (motionOK() && fl.animate) anims.push(fl.animate([{ opacity: 0 }, { opacity: .45 }, { opacity: 0 }], { duration: 700 }));
      mark(...P.kp, 'x');
      showStamp(L.faultStamp, true);
      say(L.fault, L.faultLive);
    }
  }));

  // 4 the dink
  const range = $('#dinkRange');
  function dinkZone(v) { return v <= 33 ? 'soft' : v <= 66 ? 'mid' : 'hard'; }
  function dink(announce = false) {
    const v = Number(range.value);
    const z = dinkZone(v);
    const x = z === 'soft' ? 292 + v * 1.4 : z === 'mid' ? 362 + (v - 34) * 3.4 : 532 + (v - 67) * 0.36;
    const a = P.dk, b = [x, 132];
    const lift = 20 + v * 0.7;
    cPath.setAttribute('d', pathD([a, b], lift));
    cMarks.innerHTML = '';
    mark(b[0], b[1], z === 'hard' ? 'x' : 'ring');
    setBall(...b);
    range.setAttribute('aria-valuetext', z === 'soft' ? L.zoneSoft : z === 'mid' ? L.zoneMid : L.zoneHard);
    const T = { soft: L.dinkSoft, mid: L.dinkMid, hard: L.dinkHard }[z];
    if (announce) say(T[0], T[1]); else fb.innerHTML = T[0];
    stamp.classList.remove('show');
    if (z === 'soft') { stamp.textContent = L.dinkStamp; stamp.classList.remove('bad'); stamp.classList.add('show'); }
  }
  range.addEventListener('input', () => dink(false));
  range.addEventListener('change', () => dink(true));

  // 5 scoring
  const S = { serve: 0, recv: 0, server: 2, side: 'near' };
  const callTxt = () => `${S.serve}–${S.recv}–${S.server}`;
  const won = () => S.serve >= 11 && S.serve - S.recv >= 2;
  function renderScore(msg, text) {
    const el = $('#scoreCall');
    el.textContent = won() ? `${L.gameLabel} · ${S.serve}${root.lang === 'de' ? ':' : '–'}${S.recv}` : callTxt();
    el.classList.toggle('game', won());
    $('#sideNear').classList.toggle('on', S.side === 'near');
    $('#sideFar').classList.toggle('on', S.side === 'far');
    const pos = S.side === 'near' ? (S.server === 1 ? P.serve : P.p2) : (S.server === 1 ? P.p4 : P.p3);
    setBall(...pos);
    $$('[data-rally="serve"], [data-rally="recv"]', app).forEach((b) => { b.disabled = won(); });
    if (msg) say(msg, text);
    else fb.innerHTML = L.scoreStart(S.side === 'near' ? L.sideNear : L.sideFar);
  }
  $$('[data-rally]', app).forEach((b) => b.addEventListener('click', () => {
    const k = b.dataset.rally;
    let m;
    if (k === 'reset') { Object.assign(S, { serve: 0, recv: 0, server: 2, side: 'near' }); renderScore(); live.textContent = L.newGame; return; }
    if (k === 'serve') { S.serve += 1; m = L.pointWon; }
    else if (S.server === 1) { S.server = 2; m = L.rallyLost; }
    else { [S.serve, S.recv] = [S.recv, S.serve]; S.server = 1; S.side = S.side === 'near' ? 'far' : 'near'; m = L.sideOut; }
    if (won()) renderScore(L.gameWon(S.serve, S.recv), L.gameWonLive(S.serve, S.recv));
    else renderScore(`${m} ${L.callIs(callTxt())}`, `${m} ${L.callIsLive(callTxt())}`);
  }));

  goto(0);

  /* ------------------------------------------------------------------
     Hero router: serve-to-route
     ------------------------------------------------------------------ */
  const routerCourt = $('#routerCourt');
  const OPP = { new: 'cross', play: 'member', member: 'play', cross: 'new' };
  async function serveInto(btn) {
    if (!motionOK() || !btn.animate) return;
    const from = $(`.svc[data-route="${OPP[btn.dataset.route]}"]`, routerCourt);
    const rc = routerCourt.getBoundingClientRect(), a = from.getBoundingClientRect(), b = btn.getBoundingClientRect();
    const ax = a.left - rc.left + a.width / 2, ay = a.top - rc.top + a.height / 2, bx = b.left - rc.left + b.width / 2, by = b.top - rc.top + b.height / 2;
    const ball = document.createElement('span');
    ball.className = 'serve-ball';
    ball.innerHTML = '<svg viewBox="0 0 100 100" width="26" height="26"><use href="#i-ball"/></svg>';
    routerCourt.appendChild(ball);
    const frames = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10, x = ax + (bx - ax) * t, y = ay + (by - ay) * t - Math.sin(Math.PI * t) * 46, s = 1 + .5 * Math.sin(Math.PI * t);
      frames.push({ transform: `translate(${x}px, ${y}px) scale(${s})` });
    }
    await ball.animate(frames, { duration: 300, easing: 'ease-in' }).finished.catch(() => {});
    await ball.animate([{ transform: `translate(${bx}px, ${by}px) scale(1.2, .8)` }, { transform: `translate(${bx}px, ${by}px) scale(1)`, opacity: 0 }], { duration: 160 }).finished.catch(() => {});
    ball.remove();
  }
  $$('.svc', routerCourt).forEach((b) => b.addEventListener('click', async () => {
    await serveInto(b);
    const r = b.dataset.route;
    if (r === 'new') { expandCourt(true); scrollToEl($('#game'), $('#gameTitle')); }
    else if (r === 'play') { filterSet.clear(); filterSet.add('open'); applyFilters(); scrollToEl($('#sessions'), $('#sessTitle')); }
    else if (r === 'member') openDialog('login', b);
    else if (r === 'cross') scrollToEl($('#crossborder'));
  }));

  /* ------------------------------------------------------------------
     The travelling ball (≥ 768 px, motion allowed) + hero intro + egg
     ------------------------------------------------------------------ */
  const trav = $('#traveller'), tvX = $('.tv-x', trav), tvY = $('.tv-y', trav), tvS = $('.tv-s', trav), tvBall = $('.tv-ball', trav), tvSpeed = $('.tv-speed', trav);
  const heroSlot = $('#slotHero');
  const slots = $$('.ball-slot');
  const egg = $('#rallyEgg'), eggCount = $('#eggCount');
  let home = heroSlot, busy = false, lastHop = 0, pendT = 0, introRunning = false, mode = '';
  const travelOn = () => mode === 'travel';
  const rectOf = (el) => { const r = el.getBoundingClientRect(); return { x: r.left + scrollX, y: r.top + scrollY, w: r.width, h: r.height, vt: r.top }; };
  function place(r) { Object.assign(trav.style, { left: r.x + 'px', top: r.y + 'px', width: r.w + 'px', height: r.h + 'px' }); }
  const headingOf = (slot) => slot.closest('h1, h2, .foot-game');
  function squashType(h) {
    if (!h || !h.animate || !motionOK()) return;
    if (CSS.supports('font-stretch', '75%')) h.animate([{ fontStretch: '87.5%' }, { fontStretch: '75%' }, { fontStretch: '87.5%' }], { duration: 220, easing: 'ease-out' });
    else h.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(.94)' }, { transform: 'scaleX(1)' }], { duration: 220 });
  }
  function squash(k = 1) {
    return tvS.animate([{ transform: 'scale(1,1)' }, { transform: `scale(${1 + .15 * k},${1 - .2 * k})`, offset: .45 }, { transform: 'scale(1,1)' }], { duration: 120, easing: 'ease-out' }).finished.catch(() => {});
  }
  function speed(angle, dur) {
    const flip = Math.abs(angle) > 90 ? ' scaleY(-1)' : '';
    tvSpeed.style.transform = `rotate(${angle}deg)${flip}`;
    tvSpeed.animate([{ opacity: 0 }, { opacity: .95, offset: .15 }, { opacity: 0 }], { duration: dur, easing: 'ease-out' });
  }
  function settle(slot) {
    slots.forEach((s) => { s.classList.toggle('is-home', s === slot); s.classList.remove('is-target'); });
    trav.classList.remove('fly');
    home = slot;
    positionEgg();
  }
  async function hop(to) {
    busy = true; lastHop = performance.now();
    const from = home, a = rectOf(from), b = rectOf(to);
    let sx = a.x + a.w / 2, sy = a.y + a.h / 2;
    const top = scrollY, bot = scrollY + innerHeight;
    if (sy < top - 30) sy = top - 50; else if (sy > bot + 30) sy = bot + 50;
    const ex = b.x + b.w / 2, ey = b.y + b.h / 2, dx = sx - ex, dy = sy - ey;
    place(b);
    trav.classList.add('fly');
    from.classList.remove('is-home');
    to.classList.add('is-target'); // a landing mark only where the ball is about to land
    egg.hidden = true;
    const D = 450, apex = Math.min(dy, 0) - 90, k = Math.max(.35, Math.min(2.4, a.w / b.w));
    speed(Math.atan2(-dy, -dx) * 180 / Math.PI, D);
    tvBall.animate([{ transform: `scale(${k})` }, { transform: 'scale(1)' }], { duration: D, easing: 'ease-in-out' });
    const ax = tvX.animate([{ transform: `translateX(${dx}px)` }, { transform: 'translateX(0)' }], { duration: D, easing: 'linear' });
    const ay = tvY.animate([
      { transform: `translateY(${dy}px)`, easing: 'cubic-bezier(.2,.6,.35,1)' },
      { transform: `translateY(${apex}px)`, offset: dy < 0 ? .22 : .45, easing: 'cubic-bezier(.55,0,.95,.5)' },
      { transform: 'translateY(0)' },
    ], { duration: D });
    await Promise.all([ax.finished, ay.finished]).catch(() => {});
    squashType(headingOf(to));
    await squash();
    settle(to);
    busy = false;
    schedule();
  }
  function target() {
    const line = innerHeight * .4;
    let t = slots[0];
    for (const s of slots) { if (s.offsetParent === null) continue; if (s.getBoundingClientRect().top < line) t = s; else break; }
    return t;
  }
  function schedule() {
    if (!travelOn() || introRunning) return;
    const t = target();
    if (t === home || busy) return;
    const since = performance.now() - lastHop;
    if (since < 600) { clearTimeout(pendT); pendT = setTimeout(schedule, 600 - since); return; }
    hop(t);
  }

  async function intro() {
    introRunning = true;
    root.classList.add('intro');
    const b = rectOf(heroSlot);
    place(b);
    trav.classList.add('fly');
    const dx0 = innerWidth - b.x + 40, dy0 = -Math.min(240, b.vt + b.h);
    speed(180, 640);
    const ax = tvX.animate([{ transform: `translateX(${dx0}px)` }, { transform: 'translateX(0)' }], { duration: 640, easing: 'cubic-bezier(.25,.6,.5,1)' });
    const ay = tvY.animate([{ transform: `translateY(${dy0}px)` }, { transform: 'translateY(0)' }], { duration: 640, easing: 'cubic-bezier(.5,0,.9,.5)' });
    await Promise.all([ax.finished, ay.finished]).catch(() => {});
    squashType(heroSlot.closest('h1'));
    await squash(1.2);
    const bounce = (h, d) => tvY.animate([
      { transform: 'translateY(0)', easing: 'cubic-bezier(.2,.6,.4,1)' },
      { transform: `translateY(${-h}px)`, offset: .5, easing: 'cubic-bezier(.6,0,.8,.4)' },
      { transform: 'translateY(0)' },
    ], { duration: d }).finished.catch(() => {});
    await bounce(110, 520); await squash(.8);
    for (const [h, d] of [[42, 340], [22, 270], [10, 210]]) { await bounce(h, d); await squash(.35); }
    root.classList.remove('intro');
    introRunning = false;
    settle(heroSlot);
    schedule();
  }

  /* tap-to-rally Easter egg (hero ball, motion allowed) */
  let eggN = 0, eggT = 0;
  function positionEgg() {
    const show = motionOK() && home === heroSlot && !introRunning;
    egg.hidden = !show;
    if (!show) return;
    const r = rectOf(heroSlot);
    egg.style.left = (r.x + r.w / 2 - 32) + 'px';
    egg.style.top = (r.y + r.h / 2 - 32) + 'px';
  }
  egg.addEventListener('click', () => {
    if (!motionOK()) return;
    eggN += 1;
    const sb = $('.slot-ball', heroSlot);
    sb.getAnimations().forEach((a) => a.cancel());
    sb.animate([
      { transform: 'translateY(0)', easing: 'cubic-bezier(.2,.7,.4,1)' },
      { transform: 'translateY(-95px)', offset: .5, easing: 'cubic-bezier(.6,0,.8,.4)' },
      { transform: 'translateY(0)' },
    ], { duration: 760 });
    clearTimeout(eggT);
    if (eggN >= 11) {
      eggCount.textContent = L.eggGame;
      toast(`${L.eggWin} <button type="button" class="linkbtn-light" data-open="trial">${L.tryFree}</button>`);
      eggN = 0;
      eggT = setTimeout(() => { eggCount.textContent = ''; }, 2500);
      return;
    }
    eggCount.textContent = String(eggN);
    eggT = setTimeout(() => {
      eggCount.textContent = eggN > 1 ? L.dropped(eggN) : '';
      eggN = 0;
      eggT = setTimeout(() => { eggCount.textContent = ''; }, 1600);
    }, 1050);
  });

  /* phones: H2 balls drop in once (balls already passed appear without animation) */
  function drops() {
    if (mode !== 'drop') return;
    const h = innerHeight;
    slots.forEach((s) => {
      if (s === heroSlot || s.classList.contains('dropped')) return;
      const r = s.getBoundingClientRect();
      if (r.bottom < 0) s.classList.add('dropped', 'settled');
      else if (r.top < h * .88) s.classList.add('dropped');
    });
  }

  /* rally bar (≥ 1024 px) */
  const rbBall = $('.rb-ball'), rb = $('.rally-bar');
  function rally() {
    if (!motionOK() || innerWidth < 1024) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? Math.min(1, scrollY / max) : 0;
    rbBall.style.transform = `translateX(${p * (rb.clientWidth - 11)}px)`;
  }

  function setMode() {
    const m = !motionOK() ? 'still' : isPhone() ? 'drop' : 'travel';
    if (m === mode) return;
    mode = m;
    root.classList.toggle('travel', m === 'travel');
    root.classList.toggle('dropmode', m === 'drop');
    if (m === 'drop') drops();
    if (m === 'travel') { const t = target(); settle(t); }
    if (m === 'still') { trav.classList.remove('fly'); root.classList.remove('intro'); introRunning = false; }
    positionEgg();
  }

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; rally(); schedule(); drops(); });
  }, { passive: true });
  let rzT;
  addEventListener('resize', () => { clearTimeout(rzT); rzT = setTimeout(() => { setMode(); positionEgg(); rally(); }, 120); });
  mqReduce.addEventListener('change', () => { setMode(); });

  // start once fonts are in (positions depend on the type)
  const fontsReady = document.fonts && document.fonts.ready ? Promise.race([document.fonts.ready, wait(1800)]) : Promise.resolve();
  fontsReady.then(() => {
    setMode();
    rally();
    const atTop = (!location.hash || location.hash === '#top' || location.hash === '#main') && scrollY < 120;
    if (motionOK() && atTop && trav.animate) intro();
    else { if (mode === 'travel') settle(target()); positionEgg(); }
  });
})();

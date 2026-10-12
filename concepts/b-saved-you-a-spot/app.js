/* Pickleball Südbaden e.V. · Concept B: Saved You a Spot
   Vanilla JS, no build step. Every form is a demo: nothing leaves the page,
   nothing is written to storage or URLs. The visitor's name lives in memory only. */
(() => {
  'use strict';

  /* ---------- user-facing text, one table per language ----------
     The language comes from <html lang>; anything unknown falls back to German.
     Placeholders in [brackets] are shown as highlighted placeholders on the page.
     Values in {braces} are filled in by the script. */
  const STRINGS = {
    en: {
      'toast.frNotice': 'The French version is coming soon.',
      'toast.copied': 'Copied. Paste it into any chat.',
      'toast.copyFailed': "Couldn't copy here. Select the text and copy it yourself.",
      'ph.title': 'Placeholder: to be confirmed',

      'val.required': 'Please fill this in.',
      'val.email': "That email address doesn't look quite right. Mind checking it?",
      'val.dob': "That date doesn't look quite right. Mind checking it?",
      'val.satzung': 'Please accept the Satzung and Beitragsordnung to apply.',

      'hero.cta': 'Try it free',
      'hero.ctaName': 'Save my spot, {name} →',
      'hero.court': 'A pickleball doubles court seen from above, with three sample players, Anna, Jonas and Gisela, and you, {name}, in the fourth spot',
      'you.empty': 'You?',
      'you.emptyMeta': 'Fourth player',
      'you.savedMeta': 'Saved for you',
      'you.generic': 'You',

      'trial.title': 'Save your spot',
      'trial.titleWait': 'Join the waitlist',
      'trial.kickerFree': 'First Serve · free taster',
      'trial.kickerPaid': 'Book a session · paid',
      'trial.ptagWait': 'On the list',
      'trial.ptagDone': "You're in",
      'trial.next1': 'Next: about you',
      'trial.next2': 'Save my spot',
      'trial.next2Wait': 'Join the waitlist',
      'trial.next3': 'Done',
      'trial.full': 'Full: waitlist',
      'trial.cost': 'Cost:',
      'ptag.done': ' (done)',

      'sess.free': '{free} of {total} spots free',
      'sess.full': 'Full · waitlist: {wait}',
      'sess.meta': '{time} · [Venue TBC], Freiburg · Host speaks {langs}',
      'sess.S1.title': 'Open Play',
      'sess.S1.price': 'Members €0 · Guests €[__]',
      'sess.S2.title': 'First Serve',
      'sess.S2.price': 'Free first time',
      'sess.S3.title': 'First Serve, family-friendly',
      'sess.S3.price': 'Free first time',
      'sess.S4.title': 'Kitchen School, week 1 of 4',
      'sess.S4.price': '4-week course: Members €[__] · Guests €[__]',
      'sess.S5.title': 'First Serve',
      'sess.S5.price': 'Free first time',
      'seats.label': 'Seats at {title}, {long}: {free} of {total} free. Use the arrow keys to move between empty seats.',

      'done.ownPaddle': 'own paddle',
      'done.loanPaddle': 'loan paddle',
      'done.friend1': ' · 1 friend',
      'done.friends': ' · {n} friends',
      'done.kSession': 'Session',
      'done.kWhen': 'When',
      'done.kWhere': 'Where',
      'done.kHost': 'Host',
      'done.kCost': 'Cost',
      'done.kBringing': 'Bringing',
      'done.where': '[Venue TBC], [Street TBC], Freiburg',
      'done.host': '[Host name] · speaks {langs}',
      'done.bringing': 'Indoor shoes · {paddle}{friends}',
      'done.waitlist': "You're on the waitlist, {first}.",
      'done.in': "You're in, {first}!",
      'invite.saved': '{first} saved you a spot at pickleball: {when}, {start}.',
      'invite.firstFree': ' First session free.',
      'invite.taster': "I've booked a free pickleball taster on {short}, {start}. Book your own free spot and come too?",
      'invite.session': "I've booked a pickleball session on {short}, {start}. Book your own spot and come too?",
      'invite.subjectSaved': 'Pickleball? I saved you a spot',
      'invite.subjectCome': 'Pickleball? Come too',
      'invite.send': 'Send to a friend',
      'invite.copy': 'Copy invite',

      'mem.next1': 'Next: membership',
      'mem.next2': 'Next: payment',
      'mem.next3': 'Next: confirm',
      'mem.send': 'Send my application',
      'mem.done': 'Done',
      'mem.optin': 'These are optional, and you can change them any time in the member area.',
      'mem.optinMinor': "These are optional, and you can change them any time in the member area. We never show under-18s' names on the founders' wall.",
      'mem.picked': "You picked spot #{spot}. Numbers go in order of joining, so you'd be founder <strong>#{num}</strong>.",
      'mem.founderOnly': "You'd be founder <strong>#{num}</strong>.",
      'mem.thanks': "Thanks, {first}. We'll confirm by email within [7 days, TBC]. Your membership starts once the board approves it.",
      'mem.wallShown': "Your tag is on the founders' wall now, with your first name and town, in this browser tab only.",
      'mem.wallMinor': "Your number #{num} is reserved for you. We never show under-18s' names on the founders' wall.",
      'mem.wallHidden': "Your number #{num} is reserved for you. Your name stays off the founders' wall unless you choose to show it.",
      'sum.name': 'Name',
      'sum.born': 'Born',
      'sum.address': 'Address',
      'sum.email': 'Email',
      'sum.language': 'Language',
      'sum.membership': 'Membership',
      'sum.fee': '€[__] / year',
      'sum.founderLabel': 'Founder',
      'sum.founder': '#{num} · joining fee €0 (sample)',
      'sum.payment': 'Payment',
      'sum.guardian': 'Guardian',
      'sum.transfer': 'Bank transfer',
      'sum.sepa': 'SEPA direct debit',

      'login.title': 'Member login',
      'login.corner': "Members' corner",

      'role.chair': 'Chair',
      'role.sport': 'Sport and coaching',
      'role.treasurer': 'Treasurer',
      'role.venues': 'Venue partnerships',
      'role.vice': 'Vice-chair',
      'role.child': 'Child protection',
      'contact.goesTo': 'Goes to [Name], {role}.',
      'contact.thanks': 'Thanks. [Name] ({role}) will reply within 2 working days (target). (Demo: nothing was sent.)',
      'contact.again': 'Write another message',

      'vote.other': "Thanks. We've noted {name}. When a town reaches 50 votes we plan a free Pickle Pop-up there. (Demo: nothing was sent.)",
      'vote.reached': "{town} now has {n} votes. That's enough: we'll plan a free Pickle Pop-up there. (Demo: nothing was sent.)",
      'vote.progress': "{town} now has {n} votes. At 50 we plan a free Pickle Pop-up. Share the link and we'll get there faster.",

      'filter.none': 'No sessions match these filters',
      'filter.all': 'Showing all {n} sessions',
      'filter.some': 'Showing {shown} of {n} sessions',

      'tonight.on': 'ON',
      'tonight.off': 'OFF',
      'tonight.detailOn': 'First Serve · 18:30 · nets up 18:15',
      'tonight.detailOff': 'next session Tue 20 Oct',
      'tonight.showOff': 'Show the OFF state',
      'tonight.showOn': 'Show the ON state',

      'wall.anon': "<strong>#{num}</strong> · Founder · that's you. Your name stays off the wall (this tab only).",
      'wall.you': "<strong>#{num}</strong> · {name} · {town} · that's you (in this tab only)",
      'wall.other': '<strong>#{num}</strong> · {name} · {town} · joined {when} (sample)',
      'wall.labelYou': "#{num} {name}, {town}, that's you",
      'wall.labelAnon': "#{num} Founder, that's you",
      'wall.founder': 'Founder',
      'wall.claim': 'You?',
      'wall.claimLabel': '#{num} You? Free spot, apply to become a founding member',
      'wall.showAll': 'Show all 100',
      'wall.showFewer': 'Show fewer',

      'map.votingK': 'Towns voting · sample',
      'map.votesOf': '{n} of 50 votes for a free Pickle Pop-up.',
      'map.voteFor': 'Vote for {town}',
      'map.homeK': 'Our home',
      'map.homeT': 'Freiburg · [Venue TBC]',
      'map.homeD': 'Sessions on Tuesdays, Thursdays and Saturdays (sample). Open in maps: link added once the venue is confirmed.',
      'map.nearK': 'Also playing nearby · not run by us',
      'map.nearD': 'Not run by us. We list it so you can play more often.',
      'map.racketzone': 'FT 1844 RACKETzone Freiburg',
      'map.basel': 'Pickleball Hub Basel',
      'map.giebenach': 'Public courts, Giebenach',
      'map.liestal': 'Liestal',
      'map.strasbourg': 'Strasbourg · Alsace club [to confirm]',
      'map.guebwiller': 'Guebwiller · Alsace club [to confirm]',

      'quiz.r0.h': 'Rung 0. Most of the club is right here.',
      'quiz.r0.racket': 'First Serve is made for you, and your racket sense will carry over fast.',
      'quiz.r0.new': 'First Serve is made for you: a host, a loan paddle and other first-timers.',
      'quiz.r1.h': 'Rung 1. You can rally.',
      'quiz.r1.t': 'Kitchen School is your next step: four Tuesdays, one skill a week.',
      'quiz.r2.h': 'Rung 2. You know the kitchen.',
      'quiz.r2.t': "Open Play is where you'll meet the regulars, with partners grouped by rung.",

      'demo.loanPaddle': 'Demo: a loan paddle would be waiting for you on Thursday.',
      'demo.drivers': 'Demo: drivers from your town would see your request.',
      'demo.ics': 'Demo: in the live site this downloads an .ics file for your calendar.',
      'demo.chat': 'Demo: the chat link is added once the club has chosen an app.',
      'demo.conduct': "Demo: the code of conduct is a draft and isn't part of this concept yet.",
      'demo.calendar': "Demo: the full calendar isn't part of this concept yet. In the live site it lists every session for the season.",
      'demo.houseRules': "Demo: the house rules aren't part of this concept yet. Short version: be kind, no ads, no politics.",
      'demo.pressKit': 'Demo: the press kit is coming soon.',
      'demo.sponsor': "Demo: the sponsor information isn't part of this concept yet.",
      'demo.factSheet': "Demo: the venue fact sheet isn't part of this concept yet.",
      'demo.video': 'Demo: the video will play from our own server once it exists. No YouTube, no tracking.',
      'demo.document': "Demo: this document isn't part of the concept yet.",
      'demo.netSetup': "Demo: you'd be down for net set-up on Thu 22 Oct.",
      'demo.dinkDrink': "Demo: you'd get a confirmation email for Dink & Drink.",
      'demo.foundersCup': "Demo: you'd get a confirmation email for the Founders' Cup.",
      'demo.popUp': "Demo: you'd get a confirmation email for the Pickle Pop-up in Lörrach.",
      'demo.worldDay': "Demo: you'd get a confirmation email for the World Pickleball Day open day.",
      'demo.threeCountries': "Demo: you'd get an email when the Three Countries Open is confirmed.",
      'demo.leaveWaitlist': "Demo: you'd leave the waitlist.",
      'demo.liftOffer': 'Demo: your lift offer would appear on the board.',
      'demo.waitlistNext': 'Demo: your spot would go to the next person on the waitlist.',
    },
    de: {
      'toast.frNotice': 'Die französische Version folgt.',
      'toast.copied': 'Kopiert. Einfach in einen Chat einfügen.',
      'toast.copyFailed': 'Kopieren hat hier nicht geklappt. Markier den Text und kopier ihn selbst.',
      'ph.title': 'Platzhalter: wird noch bestätigt',

      'val.required': 'Bitte füll dieses Feld aus.',
      'val.email': 'Diese E-Mail-Adresse sieht nicht ganz richtig aus. Magst du sie noch mal prüfen?',
      'val.dob': 'Dieses Datum sieht nicht ganz richtig aus. Magst du es noch mal prüfen?',
      'val.satzung': 'Für den Antrag musst du die Satzung und die Beitragsordnung anerkennen.',

      'hero.cta': 'Kostenlos ausprobieren',
      'hero.ctaName': 'Platz sichern, {name} →',
      'hero.court': 'Ein Pickleball-Doppelfeld von oben, mit Namensschildern für Anna, Jonas und Gisela (Beispielnamen) und für dich, {name}, auf dem vierten Platz',
      'you.empty': 'Du?',
      'you.emptyMeta': 'Platz vier',
      'you.savedMeta': 'Für dich frei',
      'you.generic': 'Du',

      'trial.title': 'Sichere dir deinen Platz',
      'trial.titleWait': 'Auf die Warteliste',
      'trial.kickerFree': 'First Serve · kostenloses Schnuppertraining',
      'trial.kickerPaid': 'Termin buchen · kostenpflichtig',
      'trial.ptagWait': 'Auf der Liste',
      'trial.ptagDone': 'Bestätigt',
      'trial.next1': 'Weiter: über dich',
      'trial.next2': 'Platz sichern',
      'trial.next2Wait': 'Auf die Warteliste',
      'trial.next3': 'Fertig',
      'trial.full': 'Ausgebucht: Warteliste',
      'trial.cost': 'Kosten:',
      'ptag.done': ' (erledigt)',

      'sess.free': '{free} von {total} Plätzen frei',
      'sess.full': 'Ausgebucht · Warteliste: {wait}',
      'sess.meta': '{time} · [Ort folgt], Freiburg · Spielleitung spricht {langs}',
      'sess.S1.title': 'Open Play',
      'sess.S1.price': 'Mitglieder 0\u00a0€ · Gäste [__]\u00a0€',
      'sess.S2.title': 'First Serve',
      'sess.S2.price': 'Erster Termin kostenlos',
      'sess.S3.title': 'First Serve, familienfreundlich',
      'sess.S3.price': 'Erster Termin kostenlos',
      'sess.S4.title': 'Kitchen School, Woche 1 von 4',
      'sess.S4.price': '4-Wochen-Kurs: Mitglieder [__]\u00a0€ · Gäste [__]\u00a0€',
      'sess.S5.title': 'First Serve',
      'sess.S5.price': 'Erster Termin kostenlos',
      'seats.label': 'Plätze bei {title}, {long}: {free} von {total} frei. Mit den Pfeiltasten wechselst du zwischen freien Plätzen.',

      'done.ownPaddle': 'eigenes Paddle',
      'done.loanPaddle': 'Leih-Paddle',
      'done.friend1': ' · 1 Begleitperson',
      'done.friends': ' · {n} Begleitpersonen',
      'done.kSession': 'Termin',
      'done.kWhen': 'Wann',
      'done.kWhere': 'Wo',
      'done.kHost': 'Leitung',
      'done.kCost': 'Kosten',
      'done.kBringing': 'Dabei',
      'done.where': '[Ort folgt], [Straße folgt], Freiburg',
      'done.host': '[Name] · spricht {langs}',
      'done.bringing': 'Hallenschuhe · {paddle}{friends}',
      'done.waitlist': 'Du stehst auf der Warteliste, {first}.',
      'done.in': 'Du bist dabei, {first}!',
      'invite.saved': '{first} hat dir einen Platz beim Pickleball freigehalten: am {when}, um {start} Uhr.',
      'invite.firstFree': ' Der erste Termin ist kostenlos.',
      'invite.taster': 'Ich habe ein kostenloses Pickleball-Schnuppertraining am {short}, um {start} Uhr gebucht. Kommst du mit? Dein Platz ist auch kostenlos.',
      'invite.session': 'Ich habe einen Pickleball-Termin am {short}, um {start} Uhr gebucht. Kommst du mit? Sicher dir einfach auch einen Platz.',
      'invite.subjectSaved': 'Pickleball? Ich hab dir einen Platz freigehalten',
      'invite.subjectCome': 'Pickleball? Komm mit',
      'invite.send': 'Einladung weiterschicken',
      'invite.copy': 'Einladung kopieren',

      'mem.next1': 'Weiter: Mitgliedschaft',
      'mem.next2': 'Weiter: Zahlung',
      'mem.next3': 'Weiter: Antrag prüfen',
      'mem.send': 'Antrag absenden',
      'mem.done': 'Fertig',
      'mem.optin': 'Das ist freiwillig, und du kannst es im Mitgliederbereich jederzeit ändern.',
      'mem.optinMinor': 'Das ist freiwillig, und du kannst es im Mitgliederbereich jederzeit ändern. Namen von Minderjährigen zeigen wir nie an der Gründungswand.',
      'mem.picked': 'Du hast Platz #{spot} gewählt. Die Nummern werden in der Reihenfolge der Anträge vergeben, du wärst also Gründungsmitglied <strong>Nr. {num}</strong>.',
      'mem.founderOnly': 'Du wärst Gründungsmitglied <strong>Nr. {num}</strong>.',
      'mem.thanks': 'Danke, {first}. Du bekommst innerhalb von [7 Tagen, vorläufig] eine Bestätigung per E-Mail. Deine Mitgliedschaft beginnt, sobald der Vorstand zugestimmt hat.',
      'mem.wallShown': 'Dein Namensschild hängt jetzt an der Gründungswand, mit deinem Vornamen und Ort, aber nur in diesem Browser-Tab.',
      'mem.wallMinor': 'Deine Gründungsnummer {num} ist für dich reserviert. Namen von Minderjährigen zeigen wir nie an der Gründungswand.',
      'mem.wallHidden': 'Deine Gründungsnummer {num} ist für dich reserviert. Dein Name erscheint nur dann an der Gründungswand, wenn du das möchtest.',
      'sum.name': 'Name',
      'sum.born': 'Geboren',
      'sum.address': 'Anschrift',
      'sum.email': 'E-Mail',
      'sum.language': 'Sprache',
      'sum.membership': 'Mitgliedschaft',
      'sum.fee': '[__]\u00a0€ / Jahr',
      'sum.founderLabel': 'Gründungsnummer',
      'sum.founder': '#{num} · Aufnahmegebühr 0\u00a0€ (Beispiel)',
      'sum.payment': 'Zahlung',
      'sum.guardian': 'Erziehungsberechtigte Person',
      'sum.transfer': 'Überweisung',
      'sum.sepa': 'SEPA-Lastschrift',

      'login.title': 'Mitglieder-Login',
      'login.corner': 'Mitgliederbereich',

      'role.chair': 'Vorsitz',
      'role.sport': 'Sport und Training',
      'role.treasurer': 'Finanzen',
      'role.venues': 'Hallen und Kommunen',
      'role.vice': 'stellvertretender Vorsitz',
      'role.child': 'Kinderschutz',
      'contact.goesTo': 'Geht an [Name], {role}.',
      'contact.thanks': 'Danke! [Name] ({role}) antwortet dir innerhalb von 2 Werktagen (unser Ziel). (Demo: Es wurde nichts gesendet.)',
      'contact.again': 'Noch eine Nachricht schreiben',

      'vote.other': 'Danke! Wir haben {name} notiert. Sobald ein Ort 50 Stimmen erreicht, planen wir dort ein kostenloses Pickle Pop-up. (Demo: Es wurde nichts gesendet.)',
      'vote.reached': '{town} hat jetzt {n} Stimmen. Das reicht: Wir planen dort ein kostenloses Pickle Pop-up. (Demo: Es wurde nichts gesendet.)',
      'vote.progress': '{town} hat jetzt {n} Stimmen. Ab 50 planen wir ein kostenloses Pickle Pop-up. Teil den Link, dann geht’s schneller.',

      'filter.none': 'Keine Termine passen zu diesen Filtern',
      'filter.all': 'Alle {n} Termine werden angezeigt',
      'filter.some': 'Angezeigte Termine: {shown} von {n}',

      'tonight.on': 'AN',
      'tonight.off': 'AUS',
      'tonight.detailOn': 'First Serve · 18:30 · Netze stehen ab 18:15',
      'tonight.detailOff': 'nächster Termin Di., 20. Okt.',
      'tonight.showOff': 'AUS-Zustand zeigen',
      'tonight.showOn': 'AN-Zustand zeigen',

      'wall.anon': '<strong>#{num}</strong> · Gründungsmitglied · das bist du. Dein Name erscheint nicht an der Wand (nur in diesem Tab).',
      'wall.you': '<strong>#{num}</strong> · {name} · {town} · das bist du (nur in diesem Tab)',
      'wall.other': '<strong>#{num}</strong> · {name} · {town} · dabei seit {when} (Beispiel)',
      'wall.labelYou': '#{num} {name}, {town}, das bist du',
      'wall.labelAnon': '#{num} Gründungsmitglied, das bist du',
      'wall.founder': 'Mitglied',
      'wall.claim': 'Du?',
      'wall.claimLabel': '#{num} Du? Freier Platz, jetzt Gründungsmitglied werden',
      'wall.showAll': 'Alle 100 zeigen',
      'wall.showFewer': 'Weniger zeigen',

      'map.votingK': 'Abstimmung läuft · Beispiel',
      'map.votesOf': '{n} von 50 Stimmen für ein kostenloses Pickle Pop-up.',
      'map.voteFor': 'Für {town} abstimmen',
      'map.homeK': 'Unser Spielort',
      'map.homeT': 'Freiburg · [Ort folgt]',
      'map.homeD': 'Termine dienstags, donnerstags und samstags (Beispiel). In Karten öffnen: Link folgt, sobald der Spielort feststeht.',
      'map.nearK': 'Auch in der Nähe · nicht von uns organisiert',
      'map.nearD': 'Nicht von uns organisiert. Wir listen es hier auf, damit du öfter spielen kannst.',
      'map.racketzone': 'FT 1844 RACKETzone Freiburg',
      'map.basel': 'Pickleball Hub Basel',
      'map.giebenach': 'Öffentliche Felder in Giebenach',
      'map.liestal': 'Liestal',
      'map.strasbourg': 'Straßburg · Verein im Elsass [noch zu bestätigen]',
      'map.guebwiller': 'Guebwiller · Verein im Elsass [noch zu bestätigen]',

      'quiz.r0.h': 'Sprosse 0. Hier steht fast der ganze Verein.',
      'quiz.r0.racket': 'First Serve ist wie für dich gemacht, und dein Ballgefühl aus anderen Rückschlagsportarten hilft dir schnell weiter.',
      'quiz.r0.new': 'First Serve ist wie für dich gemacht: mit Spielleitung, Leih-Paddle und lauter anderen Neulingen.',
      'quiz.r1.h': 'Sprosse 1. Du hältst den Ball im Spiel.',
      'quiz.r1.t': 'Dein nächster Schritt ist die Kitchen School: vier Dienstage, ein Thema pro Woche.',
      'quiz.r2.h': 'Sprosse 2. Du kennst die Kitchen.',
      'quiz.r2.t': 'Beim Open Play triffst du die Stammrunde; die Paarungen richten sich nach der Sprosse.',

      'demo.loanPaddle': 'Demo: Für Donnerstag würde ein Leih-Paddle für dich zurückgelegt.',
      'demo.drivers': 'Demo: Wer aus deinem Ort fährt, würde deine Anfrage sehen.',
      'demo.ics': 'Demo: Hier würde eine Kalenderdatei (.ics) heruntergeladen.',
      'demo.chat': 'Demo: Der Chat-Link kommt, sobald der Verein eine App gewählt hat.',
      'demo.conduct': 'Demo: Der Verhaltenskodex ist ein Entwurf und noch nicht Teil dieses Konzepts.',
      'demo.calendar': 'Demo: Der vollständige Kalender ist noch nicht Teil dieses Konzepts. Auf der fertigen Website stehen dort alle Termine der Saison.',
      'demo.houseRules': 'Demo: Die Hausregeln sind noch nicht Teil dieses Konzepts. Kurzfassung: freundlich bleiben, keine Werbung, keine Politik.',
      'demo.pressKit': 'Demo: Die Pressemappe folgt bald.',
      'demo.sponsor': 'Demo: Die Infos zum Sponsoring sind noch nicht Teil dieses Konzepts.',
      'demo.factSheet': 'Demo: Das Hallen-Infoblatt ist noch nicht Teil dieses Konzepts.',
      'demo.video': 'Demo: Das Video läuft von unserem eigenen Server, sobald es fertig ist. Kein YouTube, kein Tracking.',
      'demo.document': 'Demo: Dieses Dokument ist noch nicht Teil des Konzepts.',
      'demo.netSetup': 'Demo: Du wärst für den Netzaufbau am Do., 22. Okt. eingetragen.',
      'demo.dinkDrink': 'Demo: Du bekämst jetzt eine Bestätigung per E-Mail für Dink & Drink.',
      'demo.foundersCup': 'Demo: Du bekämst jetzt eine Bestätigung per E-Mail für den Founders’ Cup.',
      'demo.popUp': 'Demo: Du bekämst jetzt eine Bestätigung per E-Mail für das Pickle Pop-up in Lörrach.',
      'demo.worldDay': 'Demo: Du bekämst jetzt eine Bestätigung per E-Mail für den Tag der offenen Tür zum World Pickleball Day.',
      'demo.threeCountries': 'Demo: Du bekämst eine E-Mail, sobald das Three Countries Open feststeht.',
      'demo.leaveWaitlist': 'Demo: Du würdest die Warteliste verlassen.',
      'demo.liftOffer': 'Demo: Dein Mitfahrangebot würde in der Mitfahrbörse erscheinen.',
      'demo.waitlistNext': 'Demo: Dein Platz würde an die nächste Person auf der Warteliste gehen.',
    },
  };

  const LANG = STRINGS[document.documentElement.lang] ? document.documentElement.lang : 'de';
  const STR = STRINGS[LANG];
  const LOC = LANG === 'en' ? 'en-GB' : 'de-DE';
  const fill = (s, vars) => (vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : s);
  const t = (key, vars) => fill(STR[key], vars);
  const PH = (text) => `<span class="ph" title="${t('ph.title')}">${text}</span>`;
  // for innerHTML: wraps [bracketed] text in the placeholder style; tp() also fills {vars} (escape those yourself)
  const phify = (s) => s.replace(/\[[^\]]*\]/g, (m) => PH(m));
  const tp = (key, vars) => fill(phify(STR[key]), vars);
  const N = (n) => new Intl.NumberFormat(LOC).format(n);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- sample data ---------- */
  const SESSIONS = {
    S1: { id: 'S1', date: '2026-10-13', start: '19:00', time: '19:00–20:30', langs: 'DE · EN', total: 16, free: 8, wait: 0, taster: false },
    S2: { id: 'S2', date: '2026-10-15', start: '18:30', time: '18:30–20:00', langs: 'DE · EN', total: 16, free: 6, wait: 0, taster: true },
    S3: { id: 'S3', date: '2026-10-17', start: '10:00', time: '10:00–11:30', langs: 'DE · FR · EN', total: 16, free: 0, wait: 2, taster: true },
    S4: { id: 'S4', date: '2026-10-20', start: '19:00', time: '19:00–20:30', langs: 'DE · EN', total: 12, free: 3, wait: 0, taster: false },
    S5: { id: 'S5', date: '2026-10-22', start: '18:30', time: '18:30–20:00', langs: 'DE · FR', total: 16, free: 10, wait: 0, taster: true },
  };
  const dayShort = new Intl.DateTimeFormat(LOC, { weekday: 'short', day: 'numeric', month: 'short' });
  const dayLong = new Intl.DateTimeFormat(LOC, { weekday: 'long', day: 'numeric', month: 'long' });
  const dayName = new Intl.DateTimeFormat(LOC, { weekday: 'short' });
  const dayNum = new Intl.DateTimeFormat(LOC, { day: 'numeric' });
  const monthYear = new Intl.DateTimeFormat(LOC, { month: 'short', year: 'numeric' }).format(new Date(2026, 9, 1));
  for (const s of Object.values(SESSIONS)) {
    const d = new Date(s.date + 'T12:00:00');
    s.short = dayShort.format(d);
    s.long = dayLong.format(d);
    s.wd = dayName.format(d);
    s.dn = dayNum.format(d);
  }
  const titleOf = (s) => t(`sess.${s.id}.title`);
  const priceOf = (s) => tp(`sess.${s.id}.price`);
  const VOTES = { 'Lörrach': 43, 'Offenburg': 28, 'Konstanz': 19, 'Waldshut-Tiengen': 11, 'Villingen-Schwenningen': 9, 'Emmendingen': 7 };
  const TOPIC_TO = {
    'General': 'chair', 'Trying pickleball': 'sport', 'Membership and fees': 'treasurer',
    'Groups and companies': 'sport', 'Venues and councils': 'venues', 'Sponsoring': 'vice',
    'Press': 'chair', 'Volunteering': 'sport', 'Child protection (confidential)': 'child',
  };
  const roleOf = (topic) => t('role.' + (TOPIC_TO[topic] || 'chair'));
  let visitorName = '';
  let nextFree = 38;
  let founders = 37;

  /* ---------- toast ---------- */
  const openDialogs = [];
  $$('.toast').forEach((el) => {
    el.hidden = false;
    const x = $('.toast__x', el);
    x.hidden = true;
    x.addEventListener('click', () => hideToast(el));
  });
  function hideToast(el) {
    el.classList.remove('is-shown', 'is-in');
    $('.toast__x', el).hidden = true;
    clearTimeout(el._timer);
    el._clear = setTimeout(() => { if (!el.classList.contains('is-shown')) $('.toast__msg', el).textContent = ''; }, 300);
  }
  function toast(msg) {
    const top = openDialogs[openDialogs.length - 1];
    const box = (top && $('.toast', top)) || $('#toast');
    clearTimeout(box._timer); clearTimeout(box._clear);
    $('.toast__msg', box).textContent = msg;
    $('.toast__x', box).hidden = false;
    box.classList.remove('is-in'); void box.offsetWidth;
    box.classList.add('is-shown', 'is-in');
    box._timer = setTimeout(() => hideToast(box), 5000);
  }

  /* ---------- dialogs ---------- */
  const beforeOpen = {};
  const afterOpen = {};
  function openDialog(id, opener, opts = {}) {
    const dlg = document.getElementById('dlg-' + id);
    if (!dlg || typeof dlg.showModal !== 'function') return;
    const menu = $('#dlg-menu');
    if (id !== 'menu' && menu.open) { opener = $('.menu-btn'); menu._silent = true; menu.close(); }
    if (dlg.open) return;
    dlg._opener = opener || document.activeElement;
    // a seat or wall tag is replaced once booked or claimed: fall back to that row's "Save my spot"
    // button, or to the new tag in the same wall slot (looked up at close time)
    const slot = dlg._opener && dlg._opener.closest ? dlg._opener.closest('.srow, .wt') : null;
    dlg._fallback = slot ? () => $(slot.matches('.wt') ? '.wt__b' : '.srow__seats .btn', slot) : null;
    if (beforeOpen[id]) beforeOpen[id](dlg, opts);
    dlg.showModal();
    const body = $('.sheet__body', dlg);
    if (body) body.scrollTop = 0;
    openDialogs.push(dlg);
    document.documentElement.classList.add('is-locked');
    if (afterOpen[id]) afterOpen[id](dlg, opts);
  }
  $$('dialog.sheet').forEach((dlg) => {
    dlg.addEventListener('close', () => {
      const i = openDialogs.indexOf(dlg);
      if (i > -1) openDialogs.splice(i, 1);
      if (!openDialogs.length) document.documentElement.classList.remove('is-locked');
      $$('.toast', dlg).forEach(hideToast);
      if (dlg._silent) { dlg._silent = false; const after = dlg._after; dlg._after = null; if (after) after(); return; }
      // getClientRects (not offsetParent) so fixed-position openers such as the concept badge count as visible
      const usable = (el) => el && el.isConnected && el.getClientRects().length > 0;
      const target = [dlg._opener, dlg._fallback && dlg._fallback()].find(usable) || $$('.head-cta, .menu-btn').find(usable);
      if (target) target.focus({ preventScroll: true });
    });
    dlg.addEventListener('click', (e) => {
      if (e.target !== dlg) return;
      const r = dlg.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
    });
    $$('[data-close]', dlg).forEach((b) => b.addEventListener('click', () => dlg.close()));
  });

  /* ---------- global click delegation ---------- */
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open]');
    if (opener) {
      e.preventDefault();
      openDialog(opener.dataset.open, opener, { session: opener.dataset.session, tier: opener.dataset.tier, spot: opener.dataset.spot });
      return;
    }
    const toastEl = e.target.closest('[data-toast]');
    if (toastEl) { toast(t(toastEl.dataset.toast)); return; }
    if (e.target.closest('[data-lang-notice]')) { toast(t('toast.frNotice')); return; }
    const c = e.target.closest('[data-contact]');
    if (c) { goContact(c.dataset.contact, c.dataset.msg || ''); }
  });

  /* ---------- mobile menu: close, then scroll ---------- */
  $$('[data-menu-link]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = a.getAttribute('href').slice(1);
    const menu = $('#dlg-menu');
    menu._silent = true;
    menu._after = () => goTo(id);
    menu.close();
  }));
  function goTo(id) {
    const sec = document.getElementById(id);
    if (!sec) return;
    const h = $('h2', sec) || sec;
    if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1');
    sec.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    h.focus({ preventScroll: true });
  }

  /* ---------- hero name tag ---------- */
  const heroName = $('#hero-name');
  const heroCta = $('#hero-cta');
  const youTag = $('#you-tag');
  const heroCourt = $('#hero-court');
  const courtLabel = heroCourt.getAttribute('aria-label');
  let nameTimer;
  function applyName() {
    const v = heroName.value.trim().replace(/\s+/g, ' ').slice(0, 20);
    const had = !!visitorName;
    visitorName = v;
    heroCta.textContent = v ? t('hero.ctaName', { name: v }) : t('hero.cta');
    if (v) {
      youTag.classList.remove('tag--empty');
      $('#you-name').textContent = v;
      $('#you-meta').textContent = t('you.savedMeta');
      heroCourt.setAttribute('aria-label', t('hero.court', { name: v }));
      if (!had && !reduced()) { youTag.classList.remove('is-pressing'); void youTag.offsetWidth; youTag.classList.add('is-pressing'); }
    } else {
      youTag.classList.add('tag--empty');
      $('#you-name').textContent = t('you.empty');
      $('#you-meta').textContent = t('you.emptyMeta');
      heroCourt.setAttribute('aria-label', courtLabel);
    }
  }
  heroName.addEventListener('input', () => { clearTimeout(nameTimer); nameTimer = setTimeout(applyName, 140); });
  youTag.addEventListener('animationend', () => youTag.classList.remove('is-pressing'));
  $('#name-form').addEventListener('submit', (e) => {
    e.preventDefault();
    clearTimeout(nameTimer); applyName();
    openDialog('trial', heroCta, { session: 'S2' });
  });

  /* ---------- form helpers ---------- */
  function setErr(input, msg) {
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    const el = document.getElementById(input.id + '-err');
    if (el) { el.textContent = msg || ''; el.hidden = !msg; }
    if (!msg) input.removeAttribute('aria-invalid');
  }
  function validate(list) {
    let first = null;
    for (const [input, kind] of list) {
      if (!input || input.closest('[hidden]')) continue;
      let msg = '';
      if (kind === 'check') { if (!input.checked) msg = input._msg || t('val.required'); }
      else {
        const v = input.value.trim();
        if (kind !== 'email-opt' && !v) msg = t('val.required');
        else if ((kind === 'email' || kind === 'email-opt') && v && !EMAIL.test(v)) msg = t('val.email');
        else if (kind === 'dob' && v && (new Date(v) > new Date() || new Date(v).getFullYear() < 1900)) msg = t('val.dob');
      }
      setErr(input, msg);
      if (msg && !first) first = input;
    }
    if (first) first.focus();
    return !first;
  }
  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.getAttribute && el.getAttribute('aria-invalid') === 'true') setErr(el, '');
  });
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el.getAttribute && el.getAttribute('aria-invalid') === 'true') setErr(el, '');
  });
  function setProgress(list, step) {
    $$('.ptag', list).forEach((p, i) => {
      p.classList.toggle('is-current', i + 1 === step);
      p.classList.toggle('is-done', i + 1 < step);
      if (i + 1 === step) p.setAttribute('aria-current', 'step'); else p.removeAttribute('aria-current');
      let sr = $('.sr-only', p);
      if (i + 1 < step) { if (!sr) { sr = document.createElement('span'); sr.className = 'sr-only'; p.appendChild(sr); } sr.textContent = t('ptag.done'); }
      else if (sr) sr.remove();
    });
  }
  function withLoader(loader, done, cb) {
    loader.hidden = false; done.hidden = true;
    setTimeout(() => { loader.hidden = true; done.hidden = false; cb(); }, reduced() ? 50 : 700);
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* fall through */ }
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    (openDialogs[openDialogs.length - 1] || document.body).appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }

  /* ---------- trial booking ---------- */
  const trial = { step: 1, session: 'S2', friends: 0, wait: false };
  const tForm = $('#trial-form');
  const tNext = $('#trial-next');
  const tBack = $('#trial-back');
  function renderSessionRadios() {
    $('#trial-sessions').innerHTML = Object.values(SESSIONS).map((s) => {
      const status = s.free > 0
        ? `<span class="sess__s">${t('sess.free', { free: N(s.free), total: N(s.total) })}</span>`
        : `<span class="sess__s sess__s--full">${t('sess.full', { wait: N(s.wait) })}</span>`;
      return `<label class="sess"><input type="radio" name="t-session" value="${s.id}"${s.id === trial.session ? ' checked' : ''}><span class="sess__d" aria-hidden="true"><span class="sess__wd">${s.wd}</span><span class="sess__dn">${s.dn}</span></span><span><span class="sess__t">${escapeHtml(titleOf(s))}<span class="sr-only">, ${s.long}</span></span><span class="sess__m">${tp('sess.meta', { time: s.time, langs: s.langs })}</span><span class="sess__p">${priceOf(s)}</span>${status}</span></label>`;
    }).join('');
  }
  function trialStep(step) {
    trial.step = step;
    $$('.step', tForm).forEach((s) => { s.hidden = +s.dataset.step !== step; });
    setProgress($('#trial-ptags'), step);
    const s = SESSIONS[trial.session];
    trial.wait = s.free <= 0;
    $('#trial-title').textContent = trial.wait ? t('trial.titleWait') : t('trial.title');
    $$('[data-kicker="trial"]').forEach((k) => { k.textContent = s.taster ? t('trial.kickerFree') : t('trial.kickerPaid'); });
    $('#trial-ptags .ptag:last-child .ptag__t').textContent = trial.wait ? t('trial.ptagWait') : t('trial.ptagDone');
    tBack.hidden = step !== 2;
    $('#trial-privacy').hidden = step !== 2;
    tNext.textContent = step === 1 ? t('trial.next1') : step === 2 ? (trial.wait ? t('trial.next2Wait') : t('trial.next2')) : t('trial.next3');
    tNext.hidden = false;
    if (step === 2) {
      $('#trial-chosen').innerHTML = `<strong>${escapeHtml(titleOf(s))}</strong> · ${s.short} · ${s.time}${trial.wait ? ` · <strong>${t('trial.full')}</strong>` : ''}<br>${t('trial.cost')} <strong>${priceOf(s)}</strong>`;
      $('#trial-s2-h').focus();
    }
    $('.sheet__body', tForm).scrollTop = 0;
  }
  beforeOpen.trial = (dlg, opts) => {
    tForm.reset();
    $$('[aria-invalid]', tForm).forEach((el) => setErr(el, ''));
    trial.session = opts.session && SESSIONS[opts.session] ? opts.session : (trial.session || 'S2');
    trial.friends = 0;
    $('#t-friends').textContent = '0';
    syncStepper();
    $('#t-guardian').hidden = true;
    if (visitorName) $('#t-first').value = visitorName;
    renderSessionRadios();
    $('#trial-loader').hidden = true; $('#trial-done').hidden = true;
    trialStep(1);
  };
  afterOpen.trial = () => { const r = $('#trial-sessions input:checked'); if (r) r.focus(); };
  $('#trial-sessions').addEventListener('change', (e) => { if (e.target.name === 't-session') trial.session = e.target.value; });
  tBack.addEventListener('click', () => { trialStep(1); const r = $('#trial-sessions input:checked'); if (r) r.focus(); });
  $('#t-u18').addEventListener('change', (e) => { $('#t-guardian').hidden = !e.target.checked; });
  function syncStepper() {
    $$('.stepper__b', tForm).forEach((b) => { const by = +b.dataset.stepBy; b.disabled = (by < 0 && trial.friends <= 0) || (by > 0 && trial.friends >= 2); });
  }
  $$('.stepper__b', tForm).forEach((b) => b.addEventListener('click', () => {
    trial.friends = Math.max(0, Math.min(2, trial.friends + +b.dataset.stepBy));
    $('#t-friends').textContent = N(trial.friends);
    syncStepper();
    if (b.disabled) (b.dataset.stepBy === '1' ? b.previousElementSibling.previousElementSibling : b.nextElementSibling.nextElementSibling).focus();
  }));
  tForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (trial.step === 1) {
      const r = $('#trial-sessions input:checked');
      if (!r) return;
      trial.session = r.value;
      trialStep(2);
      return;
    }
    if (trial.step === 2) {
      const ok = validate([[$('#t-first'), 'req'], [$('#t-email'), 'email'], [$('#t-g-name'), 'req'], [$('#t-g-email'), 'email']]);
      if (!ok) return;
      trialStep(3);
      tNext.hidden = true;
      withLoader($('#trial-loader'), $('#trial-done'), finishTrial);
      return;
    }
    $('#dlg-trial').close();
  });
  function finishTrial() {
    const s = SESSIONS[trial.session];
    const first = $('#t-first').value.trim().slice(0, 30);
    tNext.hidden = false;
    $('#done-tag-name').textContent = first;
    $('#done-tag-meta').textContent = `${titleOf(s)} · ${s.short}`;
    const paddle = (tForm.querySelector('input[name="t-paddle"]:checked') || {}).value === 'no' ? t('done.ownPaddle') : t('done.loanPaddle');
    const friends = trial.friends ? (trial.friends > 1 ? t('done.friends', { n: N(trial.friends) }) : t('done.friend1')) : '';
    $('#done-note').innerHTML = `<dl>
      <div><dt>${t('done.kSession')}</dt><dd>${escapeHtml(titleOf(s))}</dd></div>
      <div><dt>${t('done.kWhen')}</dt><dd>${s.long} · ${s.time}</dd></div>
      <div><dt>${t('done.kWhere')}</dt><dd>${tp('done.where')}</dd></div>
      <div><dt>${t('done.kHost')}</dt><dd>${tp('done.host', { langs: s.langs })}</dd></div>
      <div><dt>${t('done.kCost')}</dt><dd>${priceOf(s)}</dd></div>
      <div><dt>${t('done.kBringing')}</dt><dd>${tp('done.bringing', { paddle, friends })}</dd></div></dl>`;
    if (trial.wait) {
      s.wait += 1;
      $('#done-h').textContent = t('done.waitlist', { first });
      $('#wait-n').textContent = N(s.wait);
      $('#done-booked').hidden = true; $('#done-wait').hidden = false;
      $$(`[data-wait-text="${s.id}"]`).forEach((el) => { el.textContent = N(s.wait); });
    } else {
      $('#done-h').textContent = t('done.in', { first });
      $('#done-booked').hidden = false; $('#done-wait').hidden = true;
      const saved = trial.friends > 0;
      const msg = saved
        ? `${t('invite.saved', { first, when: s.long, start: s.start })}${s.taster ? t('invite.firstFree') : ''}`
        : s.taster
          ? t('invite.taster', { short: s.short, start: s.start })
          : t('invite.session', { short: s.short, start: s.start });
      $('#invite-msg').textContent = msg;
      $('#invite-mail').href = `mailto:?subject=${encodeURIComponent(saved ? t('invite.subjectSaved') : t('invite.subjectCome'))}&body=${encodeURIComponent(msg)}`;
      $('#invite-share').textContent = navigator.share ? t('invite.send') : t('invite.copy');
      bookSeat(s);
    }
    $('#done-h').focus();
  }
  $('#invite-share').addEventListener('click', async () => {
    const text = $('#invite-msg').textContent;
    if (navigator.share) { try { await navigator.share({ text }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
    toast((await copyText(text)) ? t('toast.copied') : t('toast.copyFailed'));
  });
  $('#invite-copy').addEventListener('click', async () => {
    toast((await copyText($('#invite-msg').textContent)) ? t('toast.copied') : t('toast.copyFailed'));
  });
  function bookSeat(s) {
    s.free = Math.max(0, s.free - 1);
    $$(`[data-free-text="${s.id}"]`).forEach((el) => { el.textContent = N(s.free); });
    const group = $(`.seats[data-seats="${s.id}"]`);
    if (group) {
      const seat = $('button.seat', group);
      if (seat) {
        const span = document.createElement('span');
        span.className = 'seat is-taken' + (reduced() ? '' : ' is-pop');
        span.setAttribute('aria-hidden', 'true');
        seat.replaceWith(span);
        const nextSeat = $('button.seat', group);
        if (nextSeat) nextSeat.tabIndex = 0;
        group.setAttribute('aria-label', t('seats.label', { title: titleOf(s), long: s.long, free: N(s.free), total: N(s.total) }));
      }
    }
    applyFilters(false);
  }

  /* ---------- membership application ---------- */
  const mem = { step: 1 };
  const mForm = $('#member-form');
  const mNext = $('#member-next');
  const mBack = $('#member-back');
  const pad3 = (n) => String(n).padStart(3, '0');
  const MEM_NEXT = ['', 'mem.next1', 'mem.next2', 'mem.next3', 'mem.send', 'mem.done'];
  function memberStep(step) {
    mem.step = step;
    $$('.step', mForm).forEach((s) => { s.hidden = +s.dataset.step !== step; });
    setProgress($('#member-ptags'), Math.min(step, 5));
    mBack.hidden = step < 2 || step > 4;
    $('#member-privacy').hidden = step > 4;
    mNext.textContent = t(MEM_NEXT[step]);
    mNext.hidden = false;
    $('.sheet__body', mForm).scrollTop = 0;
    const h = $(`.step[data-step="${step}"] .step__h`, mForm);
    if (h && step > 1) h.focus();
    if (step === 3 && !$('#m-holder').value) $('#m-holder').value = `${$('#m-first').value.trim()} ${$('#m-last').value.trim()}`.trim();
    if (step === 4) { buildSummary(); syncWallOptin(); }
  }
  function ageFrom(v) {
    const d = new Date(v); if (isNaN(d)) return null;
    const now = new Date();
    let a = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) a--;
    return a;
  }
  $('#m-dob').addEventListener('change', () => {
    const a = ageFrom($('#m-dob').value);
    const minor = a !== null && a >= 0 && a < 18;
    $('#m-guardian').hidden = !minor;
    syncWallOptin();
    const youth = $('input[name="m-tier"][value="youth"]', mForm);
    if (minor) youth.checked = true;
    else if (a !== null && youth.checked) $('input[name="m-tier"][value="adult"]', mForm).checked = true;
    syncFamily();
  });
  function syncWallOptin() {
    const minor = !$('#m-guardian').hidden;
    $('#m-wall-row').hidden = minor;
    if (minor) $('#m-wall').checked = false;
    $('#m-optin-hint').textContent = minor ? t('mem.optinMinor') : t('mem.optin');
  }
  function syncFamily() { $('#m-family-note').hidden = (mForm.querySelector('input[name="m-tier"]:checked') || {}).value !== 'family'; }
  mForm.addEventListener('change', (e) => {
    if (e.target.name === 'm-tier') syncFamily();
    if (e.target.name === 'm-pay') { const sepa = e.target.value === 'sepa'; $('#m-sepa').hidden = !sepa; $('#m-transfer').hidden = sepa; }
  });
  function buildSummary() {
    const tierEl = mForm.querySelector('input[name="m-tier"]:checked');
    const tier = tierEl ? $('.tier__n', tierEl.closest('.tier')).textContent : '';
    const pay = (mForm.querySelector('input[name="m-pay"]:checked') || {}).value === 'transfer' ? t('sum.transfer') : t('sum.sepa');
    const lang = (mForm.querySelector('input[name="m-lang"]:checked') || {}).value || 'EN';
    const minor = !$('#m-guardian').hidden;
    const esc = escapeHtml;
    // each value is HTML: user input is escaped, the fee line comes from the table
    const rows = [
      [t('sum.name'), esc(`${$('#m-first').value} ${$('#m-last').value}`)],
      [t('sum.born'), esc($('#m-dob').value ? new Date($('#m-dob').value).toLocaleDateString(LOC, { day: 'numeric', month: 'long', year: 'numeric' }) : '')],
      [t('sum.address'), esc(`${$('#m-street').value}, ${$('#m-pc').value} ${$('#m-town').value}, ${$('#m-country').value}`)],
      [t('sum.email'), esc($('#m-email').value)],
      [t('sum.language'), esc(lang)],
      [t('sum.membership'), `${esc(tier)} · ${tp('sum.fee')}`],
      [t('sum.founderLabel'), t('sum.founder', { num: pad3(nextFree) })],
      [t('sum.payment'), esc(pay)],
    ];
    if (minor) rows.splice(2, 0, [t('sum.guardian'), esc(`${$('#m-g-name').value} (${$('#m-g-email').value})`)]);
    $('#m-summary').innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  }
  beforeOpen.member = (dlg, opts) => {
    if (mem.step === 5) { mForm.reset(); $('#m-guardian').hidden = true; $('#m-sepa').hidden = false; $('#m-transfer').hidden = true; $('#m-holder').value = ''; syncWallOptin(); }
    $$('[aria-invalid]', mForm).forEach((el) => setErr(el, ''));
    if (visitorName && !$('#m-first').value) $('#m-first').value = visitorName;
    if (opts.tier) { const r = $(`input[name="m-tier"][value="${opts.tier}"]`, mForm); if (r) r.checked = true; }
    syncFamily();
    const hello = $('#founder-hello');
    const spot = +opts.spot;
    if (spot && spot !== nextFree) {
      hello.hidden = false;
      hello.innerHTML = t('mem.picked', { spot: pad3(spot), num: pad3(nextFree) });
    } else if (spot) {
      hello.hidden = false;
      hello.innerHTML = t('mem.founderOnly', { num: pad3(nextFree) });
    } else hello.hidden = true;
    $('#member-loader').hidden = true; $('#member-done').hidden = true;
    memberStep(1);
  };
  afterOpen.member = () => { $('#m-first').focus(); };
  mBack.addEventListener('click', () => memberStep(mem.step - 1));
  $('#m-satzung')._msg = t('val.satzung');
  mForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const s = mem.step;
    if (s === 1) {
      const ok = validate([[$('#m-first'), 'req'], [$('#m-last'), 'req'], [$('#m-dob'), 'dob'], [$('#m-g-name'), 'req'], [$('#m-g-email'), 'email'], [$('#m-street'), 'req'], [$('#m-pc'), 'req'], [$('#m-town'), 'req'], [$('#m-country'), 'req'], [$('#m-email'), 'email']]);
      if (ok) memberStep(2);
      return;
    }
    if (s === 2 || s === 3) { memberStep(s + 1); return; }
    if (s === 4) {
      if (!validate([[$('#m-satzung'), 'check']])) return;
      memberStep(5);
      mNext.hidden = true;
      withLoader($('#member-loader'), $('#member-done'), finishMember);
      return;
    }
    $('#dlg-member').close();
  });
  function finishMember() {
    const first = $('#m-first').value.trim().slice(0, 30);
    const town = $('#m-town').value.trim().slice(0, 30);
    const num = nextFree;
    mNext.hidden = false;
    $('#mdone-num').textContent = '#' + pad3(num);
    $('#mdone-name').textContent = first;
    $('#mdone-town').textContent = town;
    $('#mdone-p').innerHTML = tp('mem.thanks', { first: escapeHtml(first) });
    // the wall shows a name only with an explicit opt-in, and never for under-18s (in memory only)
    const minor = !$('#m-guardian').hidden;
    const show = !minor && $('#m-wall').checked;
    const n3 = pad3(num);
    $('#mdone-wall').textContent = show
      ? t('mem.wallShown')
      : minor
        ? t('mem.wallMinor', { num: n3 })
        : t('mem.wallHidden', { num: n3 });
    $('#mdone-h').focus();
    const li = wallTags[num - 1];
    if (li) {
      li.className = 'wt wt--filled is-new';
      const label = show ? t('wall.labelYou', { num: n3, name: first, town }) : t('wall.labelAnon', { num: n3 });
      li.innerHTML = `<button class="wt__b" type="button" tabindex="-1" data-founder="${num}" data-you="1"${show ? ` data-name="${escapeHtml(first)}" data-town="${escapeHtml(town)}"` : ' data-anon="1"'} aria-label="${escapeHtml(label)}"><span class="wt__num">#${n3}</span> <span class="wt__name">${show ? escapeHtml(first) : t('wall.founder')}</span>${show ? ` <span class="wt__town">${escapeHtml(town)}</span>` : ''}</button>`;
    }
    founders += 1; nextFree += 1;
    const nli = wallTags[nextFree - 1];
    if (nli) {
      nli.classList.add('wt--next');
      const b = $('.wt__b', nli);
      if (b && !$('.wt__name', b)) { b.insertAdjacentHTML('beforeend', ` <span class="wt__name">${t('wall.claim')}</span>`); b.setAttribute('aria-label', t('wall.claimLabel', { num: pad3(nextFree) })); }
    }
    updateWallWindow();
    $('#counter-n').textContent = N(founders);
    $('#counter-sr').textContent = N(founders);
    $$('[data-next-free]').forEach((el) => { el.textContent = pad3(nextFree); });
  }

  /* ---------- member login ---------- */
  beforeOpen.login = () => {
    $('#login-form').reset(); setErr($('#l-email'), '');
    $('#login-form').hidden = false; $('#login-sent').hidden = true;
    $('#login-view').hidden = false; $('#dash-view').hidden = true;
  };
  $('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate([[$('#l-email'), 'email']])) return;
    $('#login-form').hidden = true; $('#login-sent').hidden = false;
    $('#login-sent-msg').focus();
  });
  $('#login-preview').addEventListener('click', () => {
    $('#login-view').hidden = true; $('#dash-view').hidden = false;
    $('#login-title').textContent = t('login.corner');
    $('#dash-h').focus();
  });
  $('#dlg-login').addEventListener('close', () => { $('#login-title').textContent = t('login.title'); });

  /* Page forms ship with disabled submit buttons, so with JS off not even Enter submits them. */
  $$('#letter-form [type="submit"], #contact-form [type="submit"], #vote-form [type="submit"]').forEach((b) => { b.disabled = false; });

  /* ---------- newsletter ---------- */
  $('#letter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate([[$('#nl-email'), 'email']])) return;
    e.target.hidden = true;
    const s = $('#letter-success'); s.hidden = false; s.focus();
  });

  /* ---------- contact ---------- */
  const topicSel = $('#c-topic');
  function syncTopic() {
    $('#c-topic-to').innerHTML = tp('contact.goesTo', { role: roleOf(topicSel.value) });
    $$('#contacts .ctag').forEach((c) => c.classList.toggle('is-active', c.dataset.topics.split('|').includes(topicSel.value)));
  }
  topicSel.addEventListener('change', syncTopic);
  syncTopic();
  function goContact(topic, msg) {
    const form = $('#contact-form');
    if (form.hidden) { form.hidden = false; form.reset(); $('#contact-success').hidden = true; }
    if (topic && TOPIC_TO[topic]) topicSel.value = topic;
    syncTopic();
    const ta = $('#c-msg');
    if (msg && (!ta.value.trim() || ta._prefilled === ta.value)) { ta.value = msg; ta._prefilled = msg; }
    $('#contact').scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    setTimeout(() => { ta.focus({ preventScroll: true }); try { ta.setSelectionRange(ta.value.length, ta.value.length); } catch (e) { /* ignore */ } }, reduced() ? 0 : 450);
  }
  $('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if ($('#c-website').value) return; // honeypot
    if (!validate([[$('#c-name'), 'req'], [$('#c-email'), 'email'], [$('#c-msg'), 'req']])) return;
    const role = roleOf(topicSel.value);
    e.target.hidden = true;
    const s = $('#contact-success');
    s.innerHTML = `${tp('contact.thanks', { role })} <button class="linkish" type="button" id="contact-again">${t('contact.again')}</button>`;
    s.hidden = false; s.focus();
    $('#contact-again').addEventListener('click', () => { e.target.reset(); e.target.hidden = false; s.hidden = true; syncTopic(); $('#c-name').focus(); });
  });

  /* ---------- town vote ---------- */
  const voteTown = $('#vote-town');
  voteTown.addEventListener('change', () => { $('#vote-other-field').hidden = voteTown.value !== 'other'; });
  function syncVotes(active) {
    for (const [town, n] of Object.entries(VOTES)) {
      $$(`[data-votes="${town}"]`).forEach((el) => { el.textContent = N(n); });
      const bar = $(`.bar[data-bar="${town}"]`);
      if (bar) { $('.bar__fill', bar).style.setProperty('--p', Math.min(100, n * 2) + '%'); bar.classList.toggle('is-active', town === active); }
      const tag = $(`.m-vote[data-vote-town="${town}"]`);
      if (tag) tag.classList.toggle('is-active', town === active);
    }
  }
  $('#vote-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const other = voteTown.value === 'other';
    if (!validate([[voteTown, 'req'], [$('#vote-other'), 'req'], [$('#vote-email'), 'email-opt']])) return;
    const s = $('#vote-success');
    if (other) {
      const name = $('#vote-other').value.trim().slice(0, 40);
      s.textContent = t('vote.other', { name });
    } else {
      const town = voteTown.value;
      VOTES[town] += 1;
      syncVotes(town);
      const n = VOTES[town];
      s.textContent = n >= 50
        ? t('vote.reached', { town, n: N(n) })
        : t('vote.progress', { town, n: N(n) });
    }
    s.hidden = false; s.focus();
    e.target.reset();
    $('#vote-other-field').hidden = true;
  });

  /* ---------- session filters ---------- */
  const F = { beginners: false, weekend: false, fr: false, free: false, rung: null };
  const rows = $$('#sessions .srow');
  function applyFilters(announce = true) {
    let shown = 0;
    rows.forEach((row) => {
      const s = SESSIONS[row.dataset.id];
      const levels = row.dataset.levels.split(' ').map(Number);
      const ok = (!F.beginners || levels.includes(0))
        && (!F.weekend || row.dataset.weekend === '1')
        && (!F.fr || row.dataset.fr === '1')
        && (!F.free || s.free > 0)
        && (F.rung === null || levels.includes(F.rung));
      row.hidden = !ok;
      if (ok) shown++;
    });
    const any = F.beginners || F.weekend || F.fr || F.free || F.rung !== null;
    $$('.filters .chip').forEach((c) => {
      const k = c.dataset.filter;
      const on = k === 'all' ? !any : k === 'rung' ? F.rung !== null : F[k];
      c.setAttribute('aria-pressed', String(!!on));
    });
    const rc = $('#rung-chip');
    rc.hidden = F.rung === null;
    if (F.rung !== null) $('#rung-chip-n').textContent = N(F.rung);
    $('#sessions-empty').hidden = shown > 0;
    $('#sessions').hidden = shown === 0;
    const status = $('#filter-status');
    const text = shown === 0
      ? t('filter.none')
      : !any
        ? t('filter.all', { n: N(rows.length) })
        : t('filter.some', { shown: N(shown), n: N(rows.length) });
    if (announce || status.textContent !== text) status.textContent = text;
  }
  $$('.filters .chip').forEach((c) => c.addEventListener('click', () => {
    const k = c.dataset.filter;
    if (k === 'all') { F.beginners = F.weekend = F.fr = F.free = false; F.rung = null; }
    else if (k === 'rung') { F.rung = null; c.blur(); $('.filters .chip[data-filter="all"]').focus(); }
    else F[k] = !F[k];
    applyFilters();
  }));
  $('[data-filter-reset]').addEventListener('click', () => {
    F.beginners = F.weekend = F.fr = F.free = false; F.rung = null;
    applyFilters();
    $('.filters .chip[data-filter="all"]').focus();
  });

  /* ---------- Tonight tile ---------- */
  $('#tonight-toggle').addEventListener('click', (e) => {
    const tonight = $('#tonight');
    const on = tonight.dataset.state !== 'on';
    tonight.dataset.state = on ? 'on' : 'off';
    $('#tonight-state').innerHTML = `<span class="lamp" aria-hidden="true"></span>${on ? t('tonight.on') : t('tonight.off')}`;
    $('#tonight-detail').textContent = on ? t('tonight.detailOn') : t('tonight.detailOff');
    e.target.textContent = on ? t('tonight.showOff') : t('tonight.showOn');
  });

  /* ---------- roving focus for seats and the founders' wall ---------- */
  function roving(container, selector, colsFn) {
    container.addEventListener('keydown', (e) => {
      const items = $$(selector, container).filter((el) => el.offsetParent !== null);
      const i = items.indexOf(document.activeElement);
      if (i < 0) return;
      const cols = colsFn ? colsFn(items) : 1;
      let j;
      switch (e.key) {
        case 'ArrowRight': j = i + 1; break;
        case 'ArrowLeft': j = i - 1; break;
        case 'ArrowDown': j = i + cols; break;
        case 'ArrowUp': j = i - cols; break;
        case 'Home': j = 0; break;
        case 'End': j = items.length - 1; break;
        default: return;
      }
      e.preventDefault();
      j = Math.max(0, Math.min(items.length - 1, j));
      items.forEach((el) => { el.tabIndex = -1; });
      items[j].tabIndex = 0;
      items[j].focus();
    });
    container.addEventListener('focusin', (e) => {
      if (!e.target.matches(selector)) return;
      $$(selector, container).forEach((el) => { el.tabIndex = el === e.target ? 0 : -1; });
    });
  }
  $$('.seats').forEach((g) => roving(g, 'button.seat'));
  const wall = $('#wall');
  roving(wall, '.wt__b', (items) => { const top = items[0].parentElement.offsetTop; let n = 0; for (const it of items) { if (it.parentElement.offsetTop !== top) break; n++; } return n || 1; });

  /* ---------- founders' wall ---------- */
  /* Phones show a 20-tag window: #001–#010, a gap, then five founders before the next free number,
     the claim tag ("You?") and free spots, so the invitation is always in view before expanding. */
  const wallTags = $$('#wall .wt');
  const wallGap = document.createElement('li');
  wallGap.className = 'wall-gap';
  wallGap.setAttribute('aria-hidden', 'true');
  function updateWallWindow() {
    const head = 10;
    const start = Math.max(head + 1, Math.min(nextFree - 5, wallTags.length - 9));
    wallTags.forEach((li, i) => { const n = i + 1; li.classList.toggle('in-win', n <= head || (n >= start && n < start + 10)); });
    wallGap.hidden = start <= head + 1;
    if (!wallGap.hidden) {
      wallGap.textContent = `#${pad3(head + 1)}–#${pad3(start - 1)}`;
      wall.insertBefore(wallGap, wallTags[start - 1]);
    }
  }
  updateWallWindow();

  const pop = $('#wall-pop');
  const canPop = typeof pop.showPopover === 'function';
  if (!canPop) pop.hidden = true;
  let popAnchor = null, popY = 0;
  const popOpen = () => (canPop ? pop.matches(':popover-open') : !pop.hidden);
  function closePop() { popAnchor = null; if (canPop) { try { pop.hidePopover(); } catch (e) { /* closed */ } } else pop.hidden = true; }
  // above its tag, caret pointing at it, kept inside the wall's width; below only when there's no room above
  function placePop() {
    if (!popAnchor) return;
    const r = popAnchor.getBoundingClientRect();
    const w = wall.getBoundingClientRect();
    const pw = pop.offsetWidth, ph = pop.offsetHeight;
    const minL = Math.max(8, w.left), maxL = Math.max(minL, Math.min(window.innerWidth - 8, w.right) - pw);
    const cx = r.left + r.width / 2;
    const left = Math.min(Math.max(minL, cx - pw / 2), maxL);
    let top = r.top - ph - 10;
    const below = top < 72;
    if (below) top = r.bottom + 10;
    pop.classList.toggle('is-below', below);
    pop.style.left = left + 'px'; pop.style.top = top + 'px';
    pop.style.setProperty('--caret-x', Math.min(pw - 16, Math.max(16, cx - left)) + 'px');
  }
  wall.addEventListener('click', (e) => {
    const b = e.target.closest('.wt__b[data-founder]');
    if (!b) return;
    const num = pad3(+b.dataset.founder);
    pop.innerHTML = b.dataset.anon
      ? t('wall.anon', { num })
      : b.dataset.you
        ? t('wall.you', { num, name: escapeHtml(b.dataset.name), town: escapeHtml(b.dataset.town) })
        : t('wall.other', { num, name: b.dataset.name, town: b.dataset.town, when: monthYear });
    if (canPop) { closePop(); pop.showPopover(); } else pop.hidden = false;
    popAnchor = b; popY = window.scrollY;
    placePop();
  });
  // a small momentum scroll right after a tap keeps the popover (it follows its tag); a real scroll closes it
  window.addEventListener('scroll', () => {
    if (!popAnchor || !popOpen()) return;
    if (Math.abs(window.scrollY - popY) > 40) closePop(); else placePop();
  }, { passive: true });
  window.addEventListener('resize', () => { if (popAnchor && popOpen()) placePop(); });
  const more = $('#wall-more');
  more.setAttribute('aria-expanded', 'false');
  more.addEventListener('click', () => {
    const before = more.getBoundingClientRect().top;
    const all = wall.classList.toggle('is-all');
    more.textContent = all ? t('wall.showFewer') : t('wall.showAll');
    more.setAttribute('aria-expanded', String(all));
    // collapsing from the bottom of the full wall would strand the reader past it: keep the button where it was
    if (!all && before >= 0 && before < window.innerHeight) {
      const shift = more.getBoundingClientRect().top - before;
      if (shift) window.scrollBy({ top: shift, behavior: 'instant' });
    }
  });

  /* counter (counts up once) and brush underlines (draw once) on entering view.
     A frame-throttled scroll check also catches anything scrolled past quickly. */
  const counterN = $('#counter-n');
  let counted = false;
  function countUp() {
    counted = true;
    if (reduced()) return;
    const to = founders; const t0 = performance.now(); const dur = 1100;
    counterN.textContent = N(0);
    const tick = () => {
      const p = Math.min(1, Math.max(0, (performance.now() - t0) / dur));
      counterN.textContent = N(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(() => { counterN.textContent = N(founders); }, dur + 80);
  }
  const brushes = $$('.brush');
  if (reduced()) brushes.forEach((b) => b.classList.add('is-drawn'));
  let ticking = false;
  function checkReveal() {
    ticking = false;
    const vh = window.innerHeight;
    brushes.forEach((b) => {
      if (b.classList.contains('is-drawn')) return;
      const r = b.getBoundingClientRect();
      if (r.top < vh * 0.92) b.classList.add('is-drawn');
    });
    if (!counted) { const r = counterN.getBoundingClientRect(); if (r.top < vh * 0.85) countUp(); }
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(checkReveal); } }, { passive: true });
  window.addEventListener('resize', checkReveal);
  requestAnimationFrame(() => requestAnimationFrame(checkReveal));

  /* ---------- sticky bar after the hero ---------- */
  const bar = $('#sticky-bar');
  const setBar = (on) => { bar.classList.toggle('is-on', on); document.documentElement.classList.toggle('bar-on', on); };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => { setBar(!entries[0].isIntersecting); }, { rootMargin: '-96px 0px 0px 0px' }).observe($('.hero'));
  } else setBar(true);

  /* ---------- tap the kitchen: rules diagram ---------- */
  const rulesFig = $('#rules');
  function setRule(n) {
    const cur = rulesFig.dataset.rule;
    const next = cur === n ? '' : n;
    rulesFig.dataset.rule = next;
    $$('.rule').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.rule === next)));
    $$('.rule-pin').forEach((p) => p.classList.toggle('is-on', p.dataset.pin === next));
  }
  $$('.rule').forEach((b) => b.addEventListener('click', () => setRule(b.dataset.rule)));
  $$('.rule-pin').forEach((p) => p.addEventListener('click', () => setRule(p.dataset.pin)));

  /* ---------- ladder quiz ---------- */
  const quiz = { a: {} };
  const qsteps = $$('#quiz-steps .qstep');
  function showQ(n) {
    qsteps.forEach((q) => { q.hidden = +q.dataset.q !== n; });
    $('#quiz-result').hidden = true;
    if (n > 1) $(`#q${n}`).focus();
  }
  qsteps.forEach((q) => $$('[data-answer]', q).forEach((b) => b.addEventListener('click', () => {
    const n = +q.dataset.q;
    quiz.a[n] = b.dataset.answer;
    if (n < 3) showQ(n + 1);
    else showResult();
  })));
  function showResult() {
    const rung = quiz.a[1] === 'no' ? 0 : quiz.a[3] === 'yes' ? 2 : 1;
    quiz.rung = rung;
    const txt = {
      0: [t('quiz.r0.h'), quiz.a[2] === 'yes' ? t('quiz.r0.racket') : t('quiz.r0.new')],
      1: [t('quiz.r1.h'), t('quiz.r1.t')],
      2: [t('quiz.r2.h'), t('quiz.r2.t')],
    }[rung];
    qsteps.forEach((q) => { q.hidden = true; });
    $('#quiz-rung').textContent = txt[0];
    $('#quiz-txt').textContent = txt[1];
    $('#quiz-result').hidden = false;
    $('#quiz-rung').focus();
    $$('.mtag--you').forEach((m) => m.remove());
    $$('.rung').forEach((r) => r.classList.remove('is-you'));
    const r = $(`.rung[data-rung="${rung}"]`);
    if (r) {
      r.classList.add('is-you');
      const m = document.createElement('span');
      m.className = 'mtag mtag--you' + (reduced() ? '' : ' is-pressing');
      m.style.setProperty('--rot', '-2deg');
      m.textContent = visitorName || t('you.generic');
      $('.rung__tags', r).prepend(m);
    }
  }
  $('#quiz-show').addEventListener('click', () => {
    F.rung = quiz.rung;
    applyFilters();
    goTo('play');
  });
  $('#quiz-again').addEventListener('click', () => {
    quiz.a = {};
    $$('.mtag--you').forEach((m) => m.remove());
    $$('.rung').forEach((r) => r.classList.remove('is-you'));
    showQ(1);
    $('#q1').focus();
  });

  /* ---------- map pins ---------- */
  const NEAR = { k: 'map.nearK', d: 'map.nearD' };
  const PINS = {
    freiburg: { k: 'map.homeK', t: 'map.homeT', d: 'map.homeD' },
    racketzone: { ...NEAR, t: 'map.racketzone' },
    basel: { ...NEAR, t: 'map.basel' },
    giebenach: { ...NEAR, t: 'map.giebenach' },
    liestal: { ...NEAR, t: 'map.liestal' },
    strasbourg: { ...NEAR, t: 'map.strasbourg' },
    guebwiller: { ...NEAR, t: 'map.guebwiller' },
  };
  $$('.pin').forEach((p) => p.addEventListener('click', () => {
    $$('.pin').forEach((q) => q.setAttribute('aria-pressed', String(q === p)));
    const id = p.dataset.pin;
    const box = $('#map-detail');
    if (id.startsWith('vote:')) {
      const town = id.slice(5);
      box.innerHTML = `<p class="map-detail__k">${t('map.votingK')}</p><p class="map-detail__t">${town}</p><p class="map-detail__d">${t('map.votesOf', { n: N(VOTES[town]) })}</p><button class="btn btn--line btn--sm" type="button" id="vote-for">${t('map.voteFor', { town })}</button>`;
      $('#vote-for').addEventListener('click', () => {
        voteTown.value = town; $('#vote-other-field').hidden = true;
        $('#vote').scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' });
        voteTown.focus({ preventScroll: true });
      });
    } else {
      const d = PINS[id];
      box.innerHTML = `<p class="map-detail__k">${tp(d.k)}</p><p class="map-detail__t">${tp(d.t)}</p><p class="map-detail__d">${tp(d.d)}</p>`;
    }
  }));
  $$('.pin').forEach((p) => p.setAttribute('aria-pressed', 'false'));
  const mapPan = $('#map-pan');
  const mapShell = $('#map-shell');
  const MAP_START = 140;
  function syncMapFades() {
    const max = mapPan.scrollWidth - mapPan.clientWidth;
    mapShell.classList.toggle('can-left', max > 2 && mapPan.scrollLeft > 4);
    mapShell.classList.toggle('can-right', max > 2 && mapPan.scrollLeft < max - 4);
  }
  if (mapPan.scrollWidth > mapPan.clientWidth + 2) mapPan.scrollLeft = MAP_START;
  mapPan.addEventListener('scroll', () => {
    syncMapFades();
    if (Math.abs(mapPan.scrollLeft - MAP_START) > 8) mapShell.classList.add('is-panned');
  }, { passive: true });
  window.addEventListener('resize', syncMapFades);
  syncMapFades();

  /* ---------- photo row: keyboard-scrollable when it is a swipe row (phones) ---------- */
  const photos = $('#photos');
  const mqPhotos = window.matchMedia('(max-width: 639.98px)');
  const syncPhotos = () => { if (mqPhotos.matches) photos.tabIndex = 0; else photos.removeAttribute('tabindex'); };
  if (mqPhotos.addEventListener) mqPhotos.addEventListener('change', syncPhotos);
  syncPhotos();
})();

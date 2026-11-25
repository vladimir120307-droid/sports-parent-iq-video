/*
 * Sports Parent IQ: all game content in one place.
 *
 * Edit this file to change questions, answers, scores, types or clips.
 * The engine (index.html) never needs to change for new content.
 *
 * Each answer gives 2 points to its `type` and 1 point to its `also` type, if it has one.
 * The result shows the top type, the top three as percentages and one blurred bar for the
 * rest. `iq` moves the Sports Parent IQ, which starts at `baseIQ`. Before the result, the player
 * enters an email or leaves for the KSNN article for their type (`articles` below).
 *
 * A moment with a `clip` plays video and stops on the question frame; the picked
 * answer plays its own `clip` if it has one. A moment with a `still` is an illustrated
 * scene: the art comes alive with camera motion, light and `ambience`. An answer without
 * a clip reacts with a camera move to its `focus` [x%, y%, zoom] of the frame on screen,
 * its `stamp` and its `quip`. A moment with both plays the clip and keeps the still for
 * when the clip can't load. `focus` is in % of the art or clip; set it on the last frame
 * of the clip when there is one, since that's the frame the question sits on. The scene's
 * `ambience` plays under the clip too. A phone taller than 9:16 crops the sides of a clip,
 * so `frame` [x%, y%] says which part to keep in view (50, 50 keeps the middle).
 * Every file is optional: whatever isn't there is skipped, so the game always plays
 * through. Files go in clips/, stills/ and types/ under the names below. media.json lists
 * the files that exist (import_to_game.py rebuilds it), so a missing clip is never even
 * requested; without media.json the game simply tries every file.
 *
 * Each visit plays `visit.scenes` scenes from `moments`, and a visitor sees every scene once
 * before any repeats (kept in the browser). With `onlyReady`, a scene joins the rotation once
 * its clip or still exists. ?scenes=all plays from every scene, ?scenes=ride,coach plays
 * those, ?fresh forgets which scenes this browser has seen.
 */
window.GAME = {
  baseIQ: 100,
  shotClock: 30,            // seconds per question (a moment can override)
  visit: { scenes: 5, onlyReady: true },

  // One announcer per visit, picked at random from those whose intro and verdict clips exist.
  // `back` is the "welcome back" intro for a returning visitor; without it they hear the intro.
  hosts: [
    { intro: { clip: "clips/host_intro.mp4" }, verdict: { clip: "clips/host_verdict.mp4" }, back: { clip: "clips/host_back.mp4" } },
    { intro: { clip: "clips/host_woman_intro.mp4" }, verdict: { clip: "clips/host_woman_verdict.mp4" }, back: { clip: "clips/host_woman_back.mp4" } },
    { intro: { clip: "clips/host_latino_intro.mp4" }, verdict: { clip: "clips/host_latino_verdict.mp4" }, back: { clip: "clips/host_latino_back.mp4" } }
  ],
  portraits: "types/{key}.jpg",                  // KSNN's own art for each type
  reveals: "clips/reveal_{key}.mp4",             // each type's reveal clip, looped and muted behind the result

  moments: [
    {
      id: "walkback", time: "8:04 PM", title: "The Walk Back", where: "Saturday, after the final game", tone: "dusk",
      setup: "They lost in an 8 to 0 shutout. Halfway to the car and very quietly:",
      shot: "Empty field at dusk, one light on, your kid stops walking.",
      clip: "clips/m4_setup.mp4", credit: "new clips of the same characters",
      q: "\"I think I might want to quit.\" Your first words?",
      // Order and answer C from KSNN's notes of 2026-11-19; C has its own clip (calm nod, a yawn, home hand in hand).
      a: [
        { t: "\"Tell me more. What's stopped being fun?\"", type: "supporter", iq: 8, clip: "clips/m4_b.mp4", quip: "That's a home run. No coaching required." },
        { t: "\"After everything we've paid for?\"", type: "rage", also: "overly", iq: -8, clip: "clips/m4_a.mp4", quip: "The invoice is talking. And it wants a refund." },
        { t: "\"Don't make a rushed decision. Sleep on it.\"", type: "balance", also: "mellow", iq: 6, clip: "clips/m4_c.mp4", quip: "Smart call. Nobody makes big decisions after an 8 to 0." },
        { t: "\"I'll talk to the coach. We'll fix this by Monday.\"", clip: "clips/m4_e.mp4", type: "overly", iq: -6,
          stamp: { label: "OVERRULED", sub: "HE DIDN'T ASK", cls: "yellow" }, quip: "Whoa, Coach Mom. He asked for ears, not a task force." },
        { t: "\"Whatever you choose, I'm still your biggest fan.\"", type: "cheerleader", iq: 6, clip: "clips/m4_d.mp4", quip: "No uniform needed. You're already on their team." }
      ]
    },
    {
      id: "ride", time: "4:35 PM", title: "The Ride Home", where: "After the game", tone: "dusk",
      setup: "On the last drive, your son missed the open receiver. The ride home is a bit awkward.",
      shot: "Dad drives one-handed, replaying the play. In the back seat, his son stares out the window.",
      clip: "clips/ride.mp4", still: "stills/ride.jpg", ambience: "car",
      q: "He's waiting to see what you'll say. You...",
      a: [
        { t: "Go through the last drive, play by play.", clip: "clips/ride_a.mp4", type: "carcoach", iq: -8, focus: [66, 36, 1.7],
          stamp: { label: "POST-GAME SHOW", sub: "NOBODY ASKED", cls: "red" }, quip: "Welcome to the car. Today's analyst has no mute button." },
        { t: "Rant about the ref, the coach and the other team's parents.", clip: "clips/ride_b.mp4", type: "rage", also: "carcoach", iq: -6, focus: [66, 34, 1.85],
          stamp: { label: "FLAG ON THE PLAY", sub: "UNSPORTSMANLIKE", cls: "red" }, quip: "Three complaints, one car ride. What a special team." },
        { t: "\"Tacos or burgers? Your call.\"", clip: "clips/ride_c.mp4", type: "balance", iq: 8, focus: [29, 41, 1.6],
          stamp: { label: "GOOD CALL", sub: "TACOS", cls: "green" }, quip: "Tacos. And he's smiling." },
        { t: "\"I loved watching you out there. Want to talk about it, or nah?\"", clip: "clips/ride_d.mp4", type: "supporter", also: "grateful", iq: 8, focus: [29, 41, 1.75],
          stamp: { label: "SAFE ZONE", sub: "NO PRESSURE", cls: "green" }, quip: "Perfect answer. And 'nah' is a complete sentence." },
        { t: "Remain silent. Surely, the problem will go away.", clip: "clips/ride_e.mp4", type: "mellow", iq: -4, focus: [30, 43, 1.6],
          stamp: { label: "RADIO SILENCE", sub: "AWKWARD", cls: "yellow" }, quip: "Now he's wondering how disappointed you are in him." }
      ]
    },
    {
      id: "coach", time: "6:10 PM", title: "The Yelling Coach", where: "Tuesday practice", tone: "day",
      setup: "The coach has been on your son for ten minutes. Now he's yelling in his face, while your son just takes it.",
      shot: "The coach yells up into your son's face. You're at the fence.",
      clip: "clips/coach.mp4", still: "stills/coach.jpg", ambience: "morning", frame: [75, 50],
      q: "Your son looks over at you. What do you do?",
      a: [
        { t: "Hop the fence and get in the coach's face.", clip: "clips/coach_a.mp4", type: "rage", iq: -6, focus: [29, 48, 1.4],
          stamp: { label: "EJECTED", sub: "TWO-MAN SHOW", cls: "red" }, quip: "Congratulations. Now the kid has two coaches to worry about." },
        { t: "Film it. This is going online tonight.", clip: "clips/coach_b.mp4", type: "phone", also: "overly", iq: -4, focus: [65, 46, 1.35],
          stamp: { label: "GONE VIRAL", sub: "10K VIEWS", cls: "yellow" }, quip: "Ten thousand views by morning. He still has practice tomorrow." },
        { t: "Catch his eye, nod, and talk with him right after practice.", clip: "clips/coach_c.mp4", type: "supporter", iq: 8, focus: [84, 41, 1.6],
          stamp: { label: "I SEE YOU", sub: "STANDING TALL", cls: "green" }, quip: "That little nod said, 'I've got you.'" },
        { t: "\"Coaches yell. It builds character.\"", clip: "clips/coach_d.mp4", type: "mellow", iq: -4, focus: [84, 43, 1.45],
          stamp: { label: "LOOKED AWAY", sub: "WARNING", cls: "yellow" }, quip: "He looked over for a reason." },
        { t: "Talk to the other parents tonight and take it to the league together.", clip: "clips/coach_e.mp4", type: "teamplayer", also: "overly", iq: 6, focus: [55, 50, 1.2],
          stamp: { label: "TEAM MOVE", sub: "ASSIST", cls: "green" }, quip: "A team effort. For once, the adults are acting like a team." }
      ]
    },
    {
      id: "skating", time: "5:10 AM", title: "The Price of the Dream", where: "Practice before Sunrise", tone: "morning",
      setup: "The coach just handed you next season's plan: private lessons, two competitions out of state, a new costume. The total cost is more than your car.",
      shot: "A dark rink at dawn. Your daughter, already in skates, waits for your answer.",
      clip: "clips/skating.mp4", still: "stills/skating.jpg", ambience: "rink",
      q: "\"Coach thinks I can make regionals!\" She's waiting for your answer. You...",
      a: [
        { t: "Book all of it, plus a choreographer.", clip: "clips/skating_a.mp4", type: "overly", also: "cheerleader", iq: -6, focus: [78, 52, 1.6],
          stamp: { label: "ALL IN", sub: "MAXED OUT", cls: "yellow" }, quip: "Dream big. Credit card, brace for impact." },
        { t: "\"Fine. But no more two-footed landings.\"", clip: "clips/skating_b.mp4", type: "carcoach", iq: -6, focus: [40, 52, 1.7],
          stamp: { label: "PRESSURE", sub: "WARNING", cls: "red" }, quip: "Every jump now comes with a financial performance review." },
        { t: "Sit down with the coach and plan what you can really afford.", clip: "clips/skating_c.mp4", type: "balance", also: "supporter", iq: 8, focus: [45, 42, 1.2],
          stamp: { label: "GAME PLAN", sub: "SMART", cls: "green" }, quip: "A realistic plan beats a triple axel on your credit card." },
        { t: "Hug her first. \"Whatever we decide, I love watching you skate.\"", clip: "clips/skating_d.mp4", type: "grateful", also: "supporter", iq: 8, focus: [57, 45, 1.4],
          stamp: { label: "BIG PICTURE", sub: "NICE", cls: "green" }, quip: "She'll remember the hug longer than the scores." },
        { t: "\"It's just skating. Let's see how you feel in the spring.\"", clip: "clips/skating_e.mp4", type: "mellow", iq: -2, focus: [40, 51, 1.55],
          stamp: { label: "PUNTED", sub: "LATER", cls: "yellow" }, quip: "Spring? She asked for an answer, not a weather forecast." }
      ]
    },
    {
      // Reworked 2026-11-12 at Jay's request: the injury worry. The "Who Do You Trust?" version is saved in m1_script.md.
      id: "skate", time: "11:20 AM", title: "One More Try", where: "Saturday at the skate park", tone: "day",
      setup: "All morning your daughter has been trying to drop in on the big bowl. Last month a boy broke his arm here. On her last try, she slams hard.",
      shot: "The bowl. She sits up holding her wrist, grabs her board and looks up at you.",
      clip: "clips/skate.mp4", still: "stills/skate.jpg", ambience: "crowd",
      q: "\"I almost had it. One more?\" She wants one more try. You...",
      a: [
        { t: "\"That's it, no more skateboarding. It's too dangerous.\"", clip: "clips/skate_a.mp4", type: "overly", iq: -6, focus: [37, 42, 1.6],
          stamp: { label: "GROUNDED", sub: "BANNED", cls: "yellow" }, quip: "Safe today. Next year she skates where you can't see her." },
        { t: "\"You leaned back. Shake it off and commit this time.\"", clip: "clips/skate_b.mp4", type: "carcoach", iq: -6, focus: [42, 56, 1.7],
          stamp: { label: "PLAY THROUGH IT", sub: "WARNING", cls: "red" }, quip: "Maybe check the wrist before giving the next TED Talk." },
        { t: "Check her wrist first. If it's fine, wrist guards on and one more on the small bowl.", clip: "clips/skate_c.mp4", type: "balance", also: "supporter", iq: 8, focus: [38, 50, 1.45],
          stamp: { label: "SMART SEND", sub: "SMART", cls: "green" }, quip: "Smart call: safety gear, smaller bowl, bigger confidence." },
        { t: "Ask the older skaters to show her how to fall safely.", clip: "clips/skate_d.mp4", type: "teamplayer", also: "supporter", iq: 8, focus: [66, 30, 1.6],
          stamp: { label: "LEARN TO FALL", sub: "SMART", cls: "green" }, quip: "Learn to fall first. Gravity is undefeated." },
        { t: "\"YOU'VE GOT THIS! SEND IT!\"", clip: "clips/skate_e.mp4", type: "cheerleader", iq: 2, focus: [37, 33, 1.8],
          stamp: { label: "SEND IT", sub: "ALL HEART", cls: "green" }, quip: "Love the enthusiasm. Less hype, more helmet." }
      ]
    },
    // <m2-scenes> written by ksnn-genkit/m2/build_m2_kit.py from m2_data.py: edit there, then run the builder.
    {
      id: "trust", time: "8:40 AM", title: "Who Do You Trust?", where: "Saturday at the driving range", tone: "morning",
      setup: "Your daughter just hit her first real drive at the driving range. A guy walks over: she's got talent, and he does \"pro coaching.\" $120 an hour, cash.",
      shot: "Her drive soars down the range. A golf instructor in a visor steps up to her mom with a business card: \"She's a natural! Private lessons, one-twenty an hour.\" She looks at her mom.",
      clip: "clips/trust.mp4", still: "stills/trust.jpg", ambience: "morning",
      q: "She's looking at you. You...",
      a: [
        { t: "Book him three days a week and start looking for sponsors.", type: "overly", iq: -6, clip: "clips/trust_a.mp4",
          stamp: { label: "SIGNED", sub: "NO QUESTIONS", cls: "yellow" }, quip: "You never asked who he is. She'll be with him every Saturday." },
        { t: "Scream \"THAT'S MY GIRL!\" so the whole range hears it.", type: "cheerleader", iq: 6, clip: "clips/trust_b.mp4",
          stamp: { label: "HYPE", sub: "ALL HEART", cls: "green" }, quip: "Every golfer on the range knows her name now." },
        { t: "Ask the range pros which coaches and junior programs they trust.", type: "teamplayer", also: "supporter", iq: 8, clip: "clips/trust_c.mp4",
          stamp: { label: "LOCAL KNOWLEDGE", sub: "SMART", cls: "green" }, quip: "They point you to a free junior clinic on Sundays." },
        { t: "Point out her grip was off. Then ask about his rates.", type: "carcoach", also: "overly", iq: -6, clip: "clips/trust_d.mp4",
          stamp: { label: "INSTANT REPLAY", sub: "WARNING", cls: "red" }, quip: "She hit her first real drive. You reviewed the grip." },
        { t: "\"Golf's supposed to be fun.\" Thanks, but no thanks.", type: "mellow", also: "balance", iq: 2, clip: "clips/trust_e.mp4",
          stamp: { label: "NO PRESSURE", sub: "CHILL", cls: "green" }, quip: "She's a little bummed, but the range is still her happy place." }
      ]
    },
    {
      id: "bench", time: "7:30 PM", title: "Bench Time", where: "League semifinal", tone: "day",
      setup: "Last set. Your daughter hasn't played a single point. The sponsor's kid hasn't left the court.",
      shot: "The last rally ends and the team celebrates. On the bench, the girl in a clean jersey claps along, then looks up at her moms.",
      clip: "clips/bench.mp4", still: "stills/bench.jpg", ambience: "crowd",
      q: "Final whistle. You...",
      a: [
        { t: "Catch the coach in the parking lot. You have notes.", type: "overly", also: "rage", iq: -8, clip: "clips/bench_a.mp4",
          stamp: { label: "PRESSER", sub: "PARKING LOT", cls: "red" }, quip: "The coach now takes the long way to his car." },
        { t: "Send a long paragraph to the team group chat.", type: "phone", also: "rage", iq: -6, clip: "clips/bench_b.mp4",
          stamp: { label: "SENT", sub: "LONG PARAGRAPH", cls: "red" }, quip: "Seen by 14. Liked by nobody." },
        { t: "Ask her how she feels before you say a word.", type: "supporter", iq: 8, clip: "clips/bench_c.mp4",
          stamp: { label: "LISTENER", sub: "EARS ON", cls: "green" }, quip: "She was mad. Now she's mad and heard." },
        { t: "Tell her you saw her cheering every point from the bench.", type: "teamplayer", also: "cheerleader", iq: 6, clip: "clips/bench_d.mp4",
          stamp: { label: "BENCH MVP", sub: "NOTICED", cls: "green" }, quip: "Loudest kid on the bench. You noticed." },
        { t: "Shrug it off. Ice cream fixes most things.", type: "mellow", also: "balance", iq: 2, clip: "clips/bench_e.mp4",
          stamp: { label: "CHILL", sub: "SOFT SERVE", cls: "yellow" }, quip: "It fixes a lot. Maybe ask her, too." }
      ]
    },
    {
      id: "badcall", time: "6:52 PM", title: "The Bad Call", where: "Rec league final", tone: "day",
      setup: "Tie game, three seconds left. The ref calls a foul on your son that nobody else saw. The bleachers explode.",
      shot: "The whistle, the foul signal, the bleachers erupt. The boy throws his hands up and looks straight at his dad.",
      clip: "clips/badcall.mp4", still: "stills/badcall.jpg", ambience: "crowd",
      q: "Everybody's on their feet. You...",
      a: [
        { t: "Tell the ref exactly what you think. Loudly.", type: "rage", iq: -8, clip: "clips/badcall_a.mp4",
          stamp: { label: "TECHNICAL", sub: "T'D UP", cls: "red" }, quip: "The ref heard. So did your son." },
        { t: "Check the replay on your phone. Twice.", type: "phone", iq: -4, clip: "clips/badcall_b.mp4",
          stamp: { label: "BUFFERING", sub: "STILL LOADING", cls: "yellow" }, quip: "They shot the free throws while you were buffering." },
        { t: "Start a chant for your team to drown out the boos.", type: "cheerleader", iq: 6, clip: "clips/badcall_c.mp4",
          stamp: { label: "CROWD WORK", sub: "LOUD AND PROUD", cls: "green" }, quip: "Your whole side joins in. Even the bench looks up." },
        { t: "Calm down the dad screaming next to you.", type: "teamplayer", iq: 8, clip: "clips/badcall_d.mp4",
          stamp: { label: "PEACEKEEPER", sub: "ASSIST", cls: "green" }, quip: "One less grown-up yelling. The kids notice." },
        { t: "Shrug. Bad calls happen, and there's pizza after.", type: "mellow", also: "balance", iq: 4, clip: "clips/badcall_e.mp4",
          stamp: { label: "UNBOTHERED", sub: "PIZZA AFTER", cls: "green" }, quip: "Unbothered. Pizza's still on." }
      ]
    },
    {
      id: "eyesup", time: "10:15 AM", title: "Eyes Up", where: "Saturday soccer", tone: "morning",
      setup: "Your daughter just scored her first goal ever. Before anyone can reach her, she turns to the stands to find you.",
      shot: "The ball rolls in. She throws her arms up, spins away from her teammates and searches the sideline for her mom.",
      clip: "clips/eyesup.mp4", still: "stills/eyesup.jpg", ambience: "crowd",
      q: "Where are you?",
      a: [
        { t: "On my feet, screaming her name.", type: "cheerleader", iq: 8, clip: "clips/eyesup_a.mp4",
          stamp: { label: "FIRST GOAL", sub: "SHE FOUND YOU", cls: "green" }, quip: "She found you in half a second." },
        { t: "Looking down. That email couldn't wait.", type: "phone", iq: -8, clip: "clips/eyesup_b.mp4",
          stamp: { label: "MISSED IT", sub: "INBOX ZERO", cls: "red" }, quip: "She waved. Then she stopped waving." },
        { t: "Filming it, so the whole family sees it tonight.", type: "phone", also: "grateful", iq: -2, clip: "clips/eyesup_c.mp4",
          stamp: { label: "ON FILM", sub: "ROLLING", cls: "yellow" }, quip: "Great footage. She was looking for your face, not your phone." },
        { t: "Already yelling at her to get back on defense.", type: "carcoach", also: "rage", iq: -6, clip: "clips/eyesup_d.mp4",
          stamp: { label: "COACH MODE", sub: "GET BACK", cls: "red" }, quip: "She's eight. It was her first goal." },
        { t: "Clapping, eyes on her, hand on your heart.", type: "grateful", iq: 8, clip: "clips/eyesup_e.mp4",
          stamp: { label: "CAUGHT IT", sub: "EYES UP", cls: "green" }, quip: "She'll remember that look." }
      ]
    },
    {
      id: "tryouts", time: "8:05 PM", title: "The List", where: "Travel hockey tryouts", tone: "night",
      setup: "The travel team roster just went up online. You scroll it twice. Your grandson's name isn't there, and he's standing right next to you.",
      shot: "In the rink lobby, grandma scrolls the roster on her phone, then scrolls back up. Reading over her shoulder, the boy's face falls.",
      clip: "clips/tryouts.mp4", still: "stills/tryouts.jpg", ambience: "rink",
      q: "First thing you do?",
      a: [
        { t: "Email the club director before he even finds out.", type: "overly", also: "phone", iq: -6, clip: "clips/tryouts_a.mp4",
          stamp: { label: "ESCALATED", sub: "9:02 PM", cls: "yellow" }, quip: "Sent at 9:02. He found out at 9:03." },
        { t: "Tell him those coaches don't know what they're doing.", type: "rage", iq: -4, clip: "clips/tryouts_b.mp4",
          stamp: { label: "BLAME GAME", sub: "FOUL", cls: "red" }, quip: "Now he won't trust the next coach either." },
        { t: "Hug him first. Ask what he wants to do next.", type: "supporter", iq: 8, clip: "clips/tryouts_c.mp4",
          stamp: { label: "NEXT SEASON", sub: "HUG FIRST", cls: "green" }, quip: "He wants to try again next year. With you." },
        { t: "Rec league with his friends, and free Saturdays. Not bad.", type: "balance", also: "mellow", iq: 6, clip: "clips/tryouts_d.mp4",
          stamp: { label: "NEW PLAN", sub: "FREE SATURDAYS", cls: "green" }, quip: "Turns out free Saturdays are pretty great." },
        { t: "Thank the coaches for the tryout anyway.", type: "grateful", also: "teamplayer", iq: 4, clip: "clips/tryouts_e.mp4",
          stamp: { label: "CLASS ACT", sub: "THANK YOU", cls: "green" }, quip: "They remember families like yours. So does he." }
      ]
    },
    {
      id: "teeball", time: "9:30 AM", title: "Wrong Way", where: "Tee-ball, age five", tone: "morning",
      setup: "Your son finally hits the ball off the tee... and runs straight to third base. The whole crowd is yelling directions.",
      shot: "He whacks the ball, drops the bat and sprints the wrong way while the bleachers yell. He stomps on third and beams at his dads.",
      clip: "clips/teeball.mp4", still: "stills/teeball.jpg", ambience: "crowd",
      q: "He's standing on third, beaming. You...",
      a: [
        { t: "Yell \"FIRST BASE! THE OTHER WAY!\" with everybody else.", type: "rage", also: "carcoach", iq: -4, clip: "clips/teeball_a.mp4",
          stamp: { label: "WRONG WAY", sub: "CROWD NOISE", cls: "red" }, quip: "He's five. He heard twenty adults and chose third." },
        { t: "Cheer like he just hit a grand slam.", type: "cheerleader", iq: 6, clip: "clips/teeball_b.mp4",
          stamp: { label: "GRAND SLAM", sub: "TECHNICALLY NO", cls: "green" }, quip: "Wrong base. Right reaction." },
        { t: "Laugh, wave, and show him first base after the inning.", type: "supporter", also: "balance", iq: 8, clip: "clips/teeball_c.mp4",
          stamp: { label: "SAFE", sub: "AT THIRD", cls: "green" }, quip: "He'll find first base next time. He found you this time." },
        { t: "Sign him up for a base-running clinic tonight.", type: "overly", iq: -6, clip: "clips/teeball_d.mp4",
          stamp: { label: "CLINIC BOOKED", sub: "AGE FIVE", cls: "yellow" }, quip: "Base-running clinic at five. He just wanted the snack." },
        { t: "You missed it. You were taking a photo of the team snacks.", type: "phone", iq: -4, clip: "clips/teeball_e.mp4",
          stamp: { label: "SNACK CAM", sub: "MISSED IT", cls: "yellow" }, quip: "Great snack photo. The best play of the season happened behind it." }
      ]
    },
    {
      id: "xc", time: "11:10 AM", title: "The DQ", where: "First cross-country meet", tone: "day",
      setup: "Your daughter crosses the line first in her first cross-country race. Then an official walks over: disqualified, she cut inside a flag. She doesn't know yet.",
      shot: "Out of breath, she waves at her mom with a huge smile. Behind her, the official's hand stays up.",
      clip: "clips/xc.mp4", still: "stills/xc.jpg", ambience: "crowd",
      q: "She's waving at you from the finish chute. You...",
      a: [
        { t: "March to the officials' tent with the rulebook open on your phone.", type: "overly", also: "rage", iq: -6, clip: "clips/xc_a.mp4",
          stamp: { label: "APPEAL", sub: "DENIED", cls: "yellow" }, quip: "The ruling stands. Your speech gets its own heat." },
        { t: "Wave back big. Talk about the flag later, away from the course.", type: "supporter", iq: 8, clip: "clips/xc_b.mp4",
          stamp: { label: "BIG WAVE", sub: "TALK LATER", cls: "green" }, quip: "She got her moment. The flag can wait till lunch." },
        { t: "Yell \"YOU CUT THE FLAG!\" across the finish area.", type: "carcoach", also: "rage", iq: -6, clip: "clips/xc_c.mp4",
          stamp: { label: "BREAKING NEWS", sub: "WHOLE FINISH AREA", cls: "red" }, quip: "Breaking news, delivered across the whole finish area." },
        { t: "Thank the official. Volunteers make the meet happen.", type: "grateful", also: "teamplayer", iq: 6, clip: "clips/xc_d.mp4",
          stamp: { label: "THANK YOU", sub: "VOLUNTEERS", cls: "green" }, quip: "She sees you thank the official. Lesson learned, no lecture." },
        { t: "Shrug. It's a kids' race, not the Olympics.", type: "mellow", iq: -2, clip: "clips/xc_e.mp4",
          stamp: { label: "NO BIG DEAL", sub: "SHRUG", cls: "yellow" }, quip: "True. She still needs someone to tell her before she sees the board." }
      ]
    },
    {
      id: "gym", time: "4:55 PM", title: "Twenty Hours a Week", where: "Outside the gym", tone: "dusk",
      setup: "Twenty hours a week. Your daughter used to love gymnastics. Tonight, on the bench outside the gym, she's crying and won't go in.",
      shot: "On the bench outside the gym, in her team jacket, she hugs her gym bag and wipes her eyes: \"I don't want to go in.\"",
      clip: "clips/gym.mp4", still: "stills/gym.jpg",
      q: "\"I don't want to go in.\" Practice starts in five minutes. You...",
      a: [
        { t: "\"Tears are part of it. Champions push through.\"", type: "carcoach", iq: -6, clip: "clips/gym_a.mp4",
          stamp: { label: "PUSH THROUGH", sub: "WARNING", cls: "red" }, quip: "Pep talk received. Joy not found." },
        { t: "Skip practice. Get smoothies and ask what's going on.", type: "balance", also: "supporter", iq: 8, clip: "clips/gym_b.mp4",
          stamp: { label: "TIMEOUT", sub: "SMOOTHIE TALK", cls: "green" }, quip: "Twenty hours a week, and one smoothie got the real answer." },
        { t: "Let her skip, no questions. You'll figure it out later.", type: "mellow", iq: -2, clip: "clips/gym_c.mp4",
          stamp: { label: "SKIPPED", sub: "NO QUESTIONS", cls: "yellow" }, quip: "Skipped. The reason is still sitting on that bench." },
        { t: "Sit close and hug her. \"I love you more than any medal.\"", type: "grateful", also: "supporter", iq: 8, clip: "clips/gym_d.mp4",
          stamp: { label: "BIG PICTURE", sub: "NO MEDAL NEEDED", cls: "green" }, quip: "No medal for this one. It's the one she'll keep." },
        { t: "\"You can do hard things! Go show 'em!\"", type: "cheerleader", iq: 2, clip: "clips/gym_e.mp4",
          stamp: { label: "GO GET 'EM", sub: "WRONG MOMENT", cls: "yellow" }, quip: "Big energy, wrong moment. She needed quiet." }
      ]
    },
    {
      id: "wrestling", time: "8:20 PM", title: "Making Weight", where: "Night before weigh-ins", tone: "night",
      setup: "Weigh-ins are tomorrow. Your son is two pounds over and wants to skip dinner and run in a sweatsuit tonight.",
      shot: "He steps off the scale, laces his running shoes by the door and pulls his hood tight: \"Two pounds. I'll run it off.\"",
      clip: "clips/wrestling.mp4", still: "stills/wrestling.jpg",
      q: "\"Two pounds. I'll run it off.\" You...",
      a: [
        { t: "Help him plan it: sauna, spit cup, no water till morning.", type: "overly", also: "carcoach", iq: -8, clip: "clips/wrestling_a.mp4",
          stamp: { label: "CUT PLAN", sub: "DANGER", cls: "red" }, quip: "That's not a plan. That's a trip to urgent care." },
        { t: "\"Eat dinner. Wrestle up a weight class if you have to.\"", type: "balance", also: "supporter", iq: 8, clip: "clips/wrestling_b.mp4",
          stamp: { label: "FUEL UP", sub: "HEALTH FIRST", cls: "green" }, quip: "He's fed, he's fine, and he wrestles tomorrow either way." },
        { t: "Text his coach and ask what's safe.", type: "teamplayer", also: "balance", iq: 6, clip: "clips/wrestling_c.mp4",
          stamp: { label: "ASK THE COACH", sub: "SMART", cls: "green" }, quip: "Turns out the coach has a rule: nobody cuts like that." },
        { t: "Shrug and go back to the game on TV.", type: "mellow", iq: -4, clip: "clips/wrestling_d.mp4",
          stamp: { label: "NOT MY MATCH", sub: "SHRUG", cls: "yellow" }, quip: "He's running laps in a sweatsuit. You're watching overtime." },
        { t: "Run the laps with him, cheering every step.", type: "cheerleader", iq: -2, clip: "clips/wrestling_e.mp4",
          stamp: { label: "TEAM SPIRIT", sub: "WRONG RACE", cls: "yellow" }, quip: "Great energy. Wrong race." }
      ]
    },
    {
      id: "allstars", time: "5:40 PM", title: "All-Stars", where: "After practice", tone: "dusk",
      setup: "All-star picks just came out. Your daughter's best friend made it. Your daughter didn't.",
      shot: "Her best friend squeals and hugs her. She smiles stiffly, walks to her mom by the car and shrugs: \"It's fine.\"",
      clip: "clips/allstars.mp4", still: "stills/allstars.jpg", ambience: "morning",
      q: "\"It's fine.\" It's not fine. You...",
      a: [
        { t: "\"That coach plays favorites. Everybody knows it.\"", type: "rage", iq: -6, clip: "clips/allstars_a.mp4",
          stamp: { label: "FAVORITES", sub: "FOUL BALL", cls: "red" }, quip: "Now she's mad at the coach. And a little at her best friend." },
        { t: "\"Let's text your friend congrats together.\"", type: "teamplayer", also: "grateful", iq: 8, clip: "clips/allstars_b.mp4",
          stamp: { label: "TEAMMATE", sub: "CLASSY", cls: "green" }, quip: "Hardest text she'll send all year. Classiest, too." },
        { t: "\"Want to hit some extra balls this weekend? Only if you want.\"", type: "supporter", also: "balance", iq: 6, clip: "clips/allstars_c.mp4",
          stamp: { label: "YOUR CALL", sub: "NO PRESSURE", cls: "green" }, quip: "She said yes. Then she picked the pizza." },
        { t: "Post a long comment on the league's page about \"politics.\"", type: "phone", also: "rage", iq: -6, clip: "clips/allstars_d.mp4",
          stamp: { label: "POSTED", sub: "40 REPLIES", cls: "red" }, quip: "Forty replies by bedtime. Zero all-star spots." },
        { t: "\"I'm proud of your whole season. Every game.\"", type: "grateful", iq: 8, clip: "clips/allstars_e.mp4",
          stamp: { label: "PROUD", sub: "EVERY GAME", cls: "green" }, quip: "She rolled her eyes. Then she smiled at the window." }
      ]
    },
    {
      id: "latehit", time: "3:20 PM", title: "Late Hit", where: "Lacrosse, third quarter", tone: "day",
      setup: "A kid on the other team hits your son late and hard. No flag. He's slow to get up.",
      shot: "A late hit, no flag. The boy gets up slowly, fixes his helmet and looks toward his dad in the stands.",
      clip: "clips/latehit.mp4", still: "stills/latehit.jpg", ambience: "crowd",
      q: "He's up, looking at the stands. You...",
      a: [
        { t: "Yell at the ref, the kid and the kid's parents, in that order.", type: "rage", iq: -8, clip: "clips/latehit_a.mp4",
          stamp: { label: "HAT TRICK", sub: "OF YELLING", cls: "red" }, quip: "Three targets. Zero penalties. One embarrassed son." },
        { t: "Thumbs up from the stands. \"You okay?\" Wait for his nod.", type: "supporter", iq: 8, clip: "clips/latehit_b.mp4",
          stamp: { label: "CHECK-IN", sub: "THUMBS UP", cls: "green" }, quip: "Thumbs up back. The game goes on, and so does he." },
        { t: "Ask the trainer to check him, even if he says he's fine.", type: "balance", also: "supporter", iq: 8, clip: "clips/latehit_c.mp4",
          stamp: { label: "SAFETY FIRST", sub: "SMART", cls: "green" }, quip: "Better safe than sorry. The trainer agrees." },
        { t: "Start filming in case it happens again.", type: "phone", also: "overly", iq: -4, clip: "clips/latehit_d.mp4",
          stamp: { label: "RECORDING", sub: "EVIDENCE", cls: "yellow" }, quip: "You got great footage. Nobody else did anything." },
        { t: "Tell him at the next break to hit that kid back.", type: "carcoach", also: "rage", iq: -8, clip: "clips/latehit_e.mp4",
          stamp: { label: "PAYBACK", sub: "PENALTY", cls: "red" }, quip: "That's not coaching. That's a penalty with extra steps." }
      ]
    },
    {
      id: "linecall", time: "1:45 PM", title: "The Line Call", where: "Junior tournament", tone: "day",
      setup: "Kids call their own lines. Match point: your daughter calls a ball out. From your seat, it was clearly in.",
      shot: "The ball lands on the line. \"Out!\" The other girl turns and looks straight up at the mom.",
      clip: "clips/linecall.mp4", still: "stills/linecall.jpg", ambience: "morning",
      q: "The other girl looks right at you. You...",
      a: [
        { t: "Stay quiet. Her call, her match.", type: "mellow", iq: -4, clip: "clips/linecall_a.mp4",
          stamp: { label: "NO COMMENT", sub: "LOOKED AWAY", cls: "yellow" }, quip: "Quiet now. Loud in her head on the ride home." },
        { t: "After the match, tell her what you saw, just the two of you.", type: "supporter", also: "balance", iq: 8, clip: "clips/linecall_b.mp4",
          stamp: { label: "STRAIGHT TALK", sub: "JUST US", cls: "green" }, quip: "Hard talk. Good talk. She says sorry to the other girl." },
        { t: "Tell the other girl's parents their daughter played a great match.", type: "grateful", also: "teamplayer", iq: 6, clip: "clips/linecall_c.mp4",
          stamp: { label: "RESPECT", sub: "BOTH SIDES", cls: "green" }, quip: "Class in the stands. Both families noticed." },
        { t: "Call out: \"Sweetie, that was in. Give her the point.\"", type: "teamplayer", also: "overly", iq: 4, clip: "clips/linecall_d.mp4",
          stamp: { label: "FAIR PLAY", sub: "OUT LOUD", cls: "yellow" }, quip: "Point replayed. Respect on both sides. Her cheeks are red." },
        { t: "Rush down and tell the tournament official yourself.", type: "overly", iq: -2, clip: "clips/linecall_e.mp4",
          stamp: { label: "STEPPED IN", sub: "OVERSTEP", cls: "yellow" }, quip: "Honest. Also: her match, her call, and now your scene." }
      ]
    },
    {
      id: "secondplace", time: "2:30 PM", title: "Personal Best", where: "Track meet, 400 meters", tone: "day",
      setup: "Your son runs his best time ever and finishes second. He's jumping up and down.",
      shot: "Past the finish line he stares at the clock, then jumps up and down and jogs to his dad at the fence, beaming.",
      clip: "clips/secondplace.mp4", still: "stills/secondplace.jpg", ambience: "crowd",
      q: "He runs over to you. You...",
      a: [
        { t: "\"Great time! But you went out way too slow.\"", type: "carcoach", iq: -6, clip: "clips/secondplace_a.mp4",
          stamp: { label: "SPLITS", sub: "NOBODY ASKED", cls: "red" }, quip: "He came over with a PR. He left with homework." },
        { t: "Hug him: \"Best time ever! I'm so proud of you!\"", type: "cheerleader", also: "grateful", iq: 8, clip: "clips/secondplace_b.mp4",
          stamp: { label: "PERSONAL BEST", sub: "PROUD DAD", cls: "green" }, quip: "Personal best, personally celebrated." },
        { t: "Pull up the winner's splits on your phone.", type: "phone", also: "carcoach", iq: -4, clip: "clips/secondplace_c.mp4",
          stamp: { label: "SCOUTING", sub: "PHONE OUT", cls: "yellow" }, quip: "He's still celebrating. You're scouting the competition." },
        { t: "Go find the kid who won and congratulate him too.", type: "teamplayer", iq: 6, clip: "clips/secondplace_d.mp4",
          stamp: { label: "GOOD SPORT", sub: "RESPECT", cls: "green" }, quip: "Your son jogs over to shake his hand, too." },
        { t: "\"Second, huh? Ice cream either way.\"", type: "mellow", also: "balance", iq: 2, clip: "clips/secondplace_e.mp4",
          stamp: { label: "SOFT SERVE", sub: "SECOND IS FINE", cls: "yellow" }, quip: "Ice cream's good. \"Best time ever\" would've been better." }
      ]
    },
    {
      id: "thefall", time: "4:10 PM", title: "The Fall", where: "Cheer regionals", tone: "day",
      setup: "Your daughter is the flyer, and she falls during the big stunt. Her team still takes third. She won't look at anyone.",
      shot: "The routine ends. The flyer walks off the mat with her head down, holding back tears, toward her mom in her wheelchair.",
      clip: "clips/thefall.mp4", still: "stills/thefall.jpg", ambience: "crowd",
      q: "She walks off the mat toward you. You...",
      a: [
        { t: "\"Third with a fall. Imagine first without it!\"", type: "carcoach", iq: -4, clip: "clips/thefall_a.mp4",
          stamp: { label: "THE MATH", sub: "BAD TIMING", cls: "red" }, quip: "The math checks out. The timing doesn't." },
        { t: "Wrap her in a hug and say nothing for a while.", type: "supporter", also: "grateful", iq: 8, clip: "clips/thefall_b.mp4",
          stamp: { label: "HUG FIRST", sub: "WORDS LATER", cls: "green" }, quip: "The hug said everything. She'll talk when she's ready." },
        { t: "Lead the whole parent section in a cheer for the team.", type: "cheerleader", also: "teamplayer", iq: 4, clip: "clips/thefall_c.mp4",
          stamp: { label: "HYPE SQUAD", sub: "LOUD", cls: "green" }, quip: "Third place never sounded so loud. She cracks a smile." },
        { t: "Ice pack, pajamas, movie night. Practice can wait till Monday.", type: "balance", also: "mellow", iq: 6, clip: "clips/thefall_d.mp4",
          stamp: { label: "REST DAY", sub: "MOVIE NIGHT", cls: "green" }, quip: "Ice pack, popcorn, rest. She's back on the mat Monday." },
        { t: "Thank her teammates for catching her.", type: "grateful", also: "teamplayer", iq: 8, clip: "clips/thefall_e.mp4",
          stamp: { label: "GOOD CATCH", sub: "BASES", cls: "green" }, quip: "Her bases got a thank-you. They'll catch her again." }
      ]
    },
    {
      id: "fence", time: "5:10 PM", title: "At the Fence", where: "Youth baseball, after the semifinal", tone: "dusk", group: "conflict",
      setup: "Your team just lost the semifinal. At the fence, another dad is screaming in his son's face. The boy is shaking, and you're standing right there.",
      shot: "After the loss, a dad leans over the dugout fence and yells at his son, who wipes his eyes. His teammate, right next to him, turns and looks at his own dad.",
      clip: "clips/fence.mp4", still: "stills/fence.jpg", ambience: "crowd",
      q: "Your son is looking at you. You...",
      a: [
        { t: "Get in his face. See how he likes it.", type: "rage", iq: -8, clip: "clips/fence_a.mp4",
          stamp: { label: "ROUND TWO", sub: "TWO DADS", cls: "red" }, quip: "Now two grown men are yelling. Both boys stare at the dirt." },
        { t: "Step in calmly: \"Hey, coach wants the boys. Give him a minute.\"", type: "teamplayer", also: "supporter", iq: 8, clip: "clips/fence_b.mp4",
          stamp: { label: "TIMEOUT", sub: "COOLED DOWN", cls: "green" }, quip: "He stopped mid-sentence. The boy got a minute to breathe." },
        { t: "Film it. Everyone should see this.", type: "phone", also: "overly", iq: -6, clip: "clips/fence_c.mp4",
          stamp: { label: "RECORDING", sub: "NOT HELPING", cls: "red" }, quip: "Great footage. Nobody helped the boy." },
        { t: "Look away. Not your kid, not your business.", type: "mellow", iq: -4, clip: "clips/fence_d.mp4",
          stamp: { label: "LOOKED AWAY", sub: "NOT MY KID", cls: "yellow" }, quip: "Not your kid. But your kid watched you look away." },
        { t: "Once he's gone, tell the boy: \"Tough game. You played hard.\"", type: "supporter", also: "teamplayer", iq: 6, clip: "clips/fence_e.mp4",
          stamp: { label: "KIND WORDS", sub: "RIGHT ON TIME", cls: "green" }, quip: "One kind grown-up after a bad day. He'll remember who it was." }
      ]
    },
    {
      id: "shove", time: "11:20 AM", title: "The Shove", where: "Youth football, second quarter", tone: "day", group: "conflict",
      setup: "Two dads behind you have argued since kickoff. Now they're up, chest to chest, and one shoves the other. The ref stops the game.",
      shot: "The argument behind her turns into a shove. The whistle blows, the game stops, and her son takes off his helmet and looks up at his mom.",
      clip: "clips/shove.mp4", still: "stills/shove.jpg", ambience: "crowd",
      q: "Every kid on the field is staring at the stands. You...",
      a: [
        { t: "Jump in and pick a side. Red hoodie started it.", type: "rage", also: "overly", iq: -8, clip: "clips/shove_a.mp4",
          stamp: { label: "PILE ON", sub: "THREE NOW", cls: "red" }, quip: "Now it's three grown-ups. The kids are still waiting." },
        { t: "Yell to your son: \"Eyes on the field! Not your problem!\"", type: "carcoach", iq: -4, clip: "clips/shove_b.mp4",
          stamp: { label: "EYES FRONT", sub: "COACH MODE", cls: "yellow" }, quip: "He's ten. The scariest thing here is in the stands." },
        { t: "Get the league official up here, and get the kids' game going again.", type: "teamplayer", also: "balance", iq: 8, clip: "clips/shove_c.mp4",
          stamp: { label: "CALLED IT IN", sub: "GAME ON", cls: "green" }, quip: "Two dads went to the parking lot. The kids got their game back." },
        { t: "Start a cheer for the kids. Drown them out.", type: "cheerleader", also: "teamplayer", iq: 4, clip: "clips/shove_d.mp4",
          stamp: { label: "DROWN IT OUT", sub: "LOUDER", cls: "green" }, quip: "Nobody can hear the dads anymore. The kids hear you." },
        { t: "Catch your son's eye. Calm smile, thumbs-up: keep playing.", type: "balance", also: "mellow", iq: 6, clip: "clips/shove_e.mp4",
          stamp: { label: "STEADY", sub: "EYES ON HIM", cls: "green" }, quip: "Two grown-ups lost it. He saw that you didn't." }
      ]
    },
    {
      id: "belttest", time: "10:45 AM", title: "Belt Test", where: "Karate belt test", tone: "day",
      setup: "Your son, 7, gets halfway through his form, forgets the next move and freezes in front of everyone.",
      shot: "Mid-form he stops, eyes wide, lower lip trembling, and looks over at his mom.",
      clip: "clips/belttest.mp4", still: "stills/belttest.jpg",
      q: "He looks at you, about to cry. You...",
      a: [
        { t: "Mouth the next move and act it out from your seat.", type: "overly", also: "carcoach", iq: -4, clip: "clips/belttest_a.mp4",
          stamp: { label: "PARENT FORM", sub: "JUDGES SAW", cls: "yellow" }, quip: "Helpful? Sure. The judges saw your whole form, too." },
        { t: "Give him a calm nod and a big breath, like you practiced.", type: "supporter", iq: 8, clip: "clips/belttest_b.mp4",
          stamp: { label: "DEEP BREATH", sub: "STEADY", cls: "green" }, quip: "One breath. He remembers the next move." },
        { t: "Film it for grandma. You can always retake it.", type: "phone", iq: -2, clip: "clips/belttest_c.mp4",
          stamp: { label: "FOR GRANDMA", sub: "ROLLING", cls: "yellow" }, quip: "Grandma gets the video. He wanted your face." },
        { t: "Smile. Pass or retest, it's pizza night.", type: "balance", also: "mellow", iq: 6, clip: "clips/belttest_d.mp4",
          stamp: { label: "PIZZA NIGHT", sub: "NO PRESSURE", cls: "green" }, quip: "Pass or retest, pizza's on. He relaxes and finishes." },
        { t: "Thumbs up and a proud smile. It's his first test.", type: "grateful", also: "cheerleader", iq: 6, clip: "clips/belttest_e.mp4",
          stamp: { label: "THUMBS UP", sub: "FIRST TEST", cls: "green" }, quip: "White belt or yellow, he'll remember that thumbs-up." }
      ]
    },
    {
      id: "tenth", time: "2:15 PM", title: "One Tenth", where: "Gymnastics meet, beam scores", tone: "day", group: "conflict",
      setup: "Your daughter's beam score beats her daughter's by one tenth. The other mom storms over and gets right in your face: your girl \"wobbled,\" and \"everyone saw it.\"",
      shot: "The scores go up. Another mom storms over in the stands and points a finger inches from her face. Down on the floor, both girls look up at their moms.",
      clip: "clips/tenth.mp4", still: "stills/tenth.jpg", ambience: "crowd",
      q: "Both girls are watching from the floor. You...",
      a: [
        { t: "Stand up and give it right back. Louder.", type: "rage", iq: -8, clip: "clips/tenth_a.mp4",
          stamp: { label: "REMATCH", sub: "IN THE STANDS", cls: "red" }, quip: "Two moms, one scoreboard, zero winners." },
        { t: "Ignore her and call down to your daughter: \"Arms up on the landing!\"", type: "carcoach", iq: -4, clip: "clips/tenth_b.mp4",
          stamp: { label: "ARMS UP", sub: "NOT NOW", cls: "yellow" }, quip: "She wasn't thinking about landings. She was watching you." },
        { t: "Cheer for BOTH girls so the whole gym hears it.", type: "cheerleader", iq: 4, clip: "clips/tenth_c.mp4",
          stamp: { label: "BOTH GIRLS", sub: "LOUD AND PROUD", cls: "green" }, quip: "Two girls, one big cheer. Even the judges smiled." },
        { t: "Smile: \"Your daughter was beautiful on beam. They both were.\"", type: "grateful", also: "mellow", iq: 8, clip: "clips/tenth_d.mp4",
          stamp: { label: "HIGH BEAM", sub: "CLASS ACT", cls: "green" }, quip: "You took the high beam. She had nothing left to say." },
        { t: "Ask the coach to settle it with her, away from the girls.", type: "teamplayer", iq: 6, clip: "clips/tenth_e.mp4",
          stamp: { label: "COACH'S CALL", sub: "NOT HERE", cls: "green" }, quip: "Settled in the hallway. The girls went back to stretching." }
      ]
    },
    {
      id: "groupchat", time: "11:40 PM", title: "The Group Chat", where: "The team group chat", tone: "night",
      setup: "The team parent group chat explodes: someone thinks the coach's son gets too many minutes. Everyone wants your take.",
      shot: "In bed, lit by her buzzing phone, she scrolls with rising eyebrows while her husband snores.",
      clip: "clips/groupchat.mp4", still: "stills/groupchat.jpg",
      q: "47 unread messages. You...",
      a: [
        { t: "Reply with a color-coded spreadsheet of everyone's minutes.", type: "overly", also: "phone", iq: -6, clip: "clips/groupchat_a.mp4",
          stamp: { label: "SPREADSHEET", sub: "COLOR-CODED", cls: "yellow" }, quip: "Color-coded and unanswerable. The coach just left the chat." },
        { t: "Pile on with a voice message. A long one.", type: "rage", also: "phone", iq: -6, clip: "clips/groupchat_b.mp4",
          stamp: { label: "VOICE MEMO", sub: "4 MINUTES", cls: "red" }, quip: "Four minutes of voice memo. Zero minutes of playing time." },
        { t: "Mute the chat and go to sleep.", type: "mellow", also: "balance", iq: 2, clip: "clips/groupchat_c.mp4",
          stamp: { label: "MUTED", sub: "GOOD NIGHT", cls: "yellow" }, quip: "Peaceful night. By morning, someone forwarded it all to the coach." },
        { t: "Suggest the parents talk to the coach in person, calmly.", type: "teamplayer", iq: 8, clip: "clips/groupchat_d.mp4",
          stamp: { label: "IN PERSON", sub: "CALMLY", cls: "green" }, quip: "One calm meeting, and the chat finally goes quiet." },
        { t: "Post one line: \"Thanks, Coach, for giving up every Saturday.\"", type: "grateful", also: "teamplayer", iq: 6, clip: "clips/groupchat_e.mp4",
          stamp: { label: "THANKS, COACH", sub: "ONE LINE", cls: "green" }, quip: "One thank-you. Then three more. The chat calms down." }
      ]
    },
    {
      id: "dinner", time: "6:45 PM", title: "The One You Missed", where: "Family dinner", tone: "dusk",
      setup: "You missed today's game for work. At dinner, your son can't stop talking about his first goal.",
      shot: "Still in his jersey, he acts out the goal with a dinner roll around the table, \"And then BOOM! Top corner!\", then looks at his dad.",
      clip: "clips/dinner.mp4", still: "stills/dinner.jpg",
      q: "\"And then BOOM! Top corner!\" You...",
      a: [
        { t: "Ask why he didn't pass instead.", type: "carcoach", iq: -6, clip: "clips/dinner_a.mp4",
          stamp: { label: "FILM REVIEW", sub: "AT DINNER", cls: "red" }, quip: "First goal ever, and it got a film review." },
        { t: "Put your fork down and listen to the whole story. Twice.", type: "grateful", also: "cheerleader", iq: 8, clip: "clips/dinner_b.mp4",
          stamp: { label: "ENCORE", sub: "TELL IT AGAIN", cls: "green" }, quip: "The second telling was even better. The goal got bigger." },
        { t: "Check your work email under the table.", type: "phone", iq: -8, clip: "clips/dinner_c.mp4",
          stamp: { label: "INBOX", sub: "UNDER THE TABLE", cls: "red" }, quip: "He saw the glow. The story's over." },
        { t: "Jump up and celebrate like you were there.", type: "cheerleader", iq: 6, clip: "clips/dinner_d.mp4",
          stamp: { label: "GOOOAL!", sub: "LIVING ROOM", cls: "green" }, quip: "Living room goal celebration. The neighbors heard it." },
        { t: "\"Next Saturday, I'll be there.\" Then actually block it off.", type: "balance", iq: 6, clip: "clips/dinner_e.mp4",
          stamp: { label: "SAVE THE DATE", sub: "FRONT ROW", cls: "green" }, quip: "Calendar blocked. Front row next Saturday." }
      ]
    },
    // </m2-scenes>
  ],

  // Used when the shot clock runs out on a moment without its own timeoutPick. `quip` is the line at the bottom.
  timeout: { type: "phone", iq: -4, quip: "Time's Up!" },

  // The email screen before the result: an email shows the result, "No thanks" opens KSNN's
  // article for the player's type. Placeholders (KSNN's home page) until KSNN sends the links.
  articles: {
    rage:        "https://ksnn.net/",
    phone:       "https://ksnn.net/",
    carcoach:    "https://ksnn.net/",
    overly:      "https://ksnn.net/",
    mellow:      "https://ksnn.net/",
    cheerleader: "https://ksnn.net/",
    supporter:   "https://ksnn.net/",
    balance:     "https://ksnn.net/",
    teamplayer:  "https://ksnn.net/",
    grateful:    "https://ksnn.net/"
  },

  // Where the email goes. Empty: nothing leaves the page (demo). Set `endpoint` to KSNN's form or
  // webhook URL. "json" posts {email, type, typeName, iq, band, mix, scenes, page, time};
  // "form" posts the same fields form-encoded, which suits mailing-list signup forms. `extra`
  // adds fixed fields (a list id, a tag). A failed post never blocks the result.
  email: { endpoint: "", format: "json", extra: {} },

  // Names and `desc` come from KSNN's two charts. `line` sits on the card; `tone` colors it.
  types: {
    rage:        { name: "The Rage Parent", tone: "bad",
                   line: "You bring the energy. All of it. To everyone.",
                   desc: "Loud, intense and always “coaching” from the sidelines. Criticizes refs, coaches and other parents. Turns every game into a drama.",
                   plus: "Nobody cares about the game more than you do.", watch: "Your kid can hear you. So can the next field.",
                   reveal: { clip: "clip.mp4", seg: [11.30, 13.65] } },
    phone:       { name: "The Phone Zone Parent", tone: "bad",
                   line: "You've attended every game, in the legal sense.",
                   desc: "More focused on their phone than the game. Scrolling, texting, posting and missing every moment that really matters.",
                   plus: "You show up, week after week, and that counts.", watch: "They look for you after a good play." },
    carcoach:    { name: "The Car Coach", tone: "bad",
                   line: "The post-game analysis is mandatory and has no exit.",
                   desc: "Replays every play, missed opportunity and “what if” on the ride home. A coach in the car, too, usually with a little extra analysis.",
                   plus: "You really do know the game.", watch: "The ride home is the part they remember." },
    overly:      { name: "The Overly Involved Parent", tone: "bad",
                   line: "You have a spreadsheet for the snack schedule. And a backup.",
                   desc: "Schedules, organizes, fundraises, communicates, coordinates and never misses a detail. It's all about being “the best parent”, and sometimes it's just too much.",
                   plus: "Nothing falls through the cracks with you around.", watch: "Sometimes they just need you in the stands." },
    mellow:      { name: "The Mellow Parent", tone: "mid",
                   line: "It's a game, not a recruiting event, and you act like it.",
                   desc: "Shows up, supports and cheers, but keeps it positive and low-key. They know it's just a game, not a college recruiting event. They're there for the journey, not just the scoreboard.",
                   plus: "Your calm keeps the whole sideline calm.", watch: "Low-key is great, until something needs your voice." },
    cheerleader: { name: "The Cheerleader", tone: "good",
                   line: "Positive. Loud. Inspiring!",
                   desc: "Brings the energy, cheers the loudest and believes in their child, no matter the score. They lift everyone up, on and off the field.",
                   plus: "You make the whole team feel seen.", watch: "Sometimes they just need you quiet and close." },
    supporter:   { name: "The Supporter", tone: "good",
                   line: "Present. Patient. Powerful.",
                   desc: "Shows up, listens, encourages and believes in their child, through the wins, the losses and the tough days. They're a steady source of strength.",
                   plus: "Your kid plays with less fear because of you.", watch: "Tell them out loud. They can't read your calm." },
    balance:     { name: "The Balance Builder", tone: "good",
                   line: "Balanced. Real. Smart.",
                   desc: "Knows sports are important, but also keeps life in balance. They encourage rest, school, friends and family, because they know it's a bigger picture.",
                   plus: "Your kid gets to be a whole person.", watch: "Check in sometimes. They may want more than you think." },
    teamplayer:  { name: "The Team Player", tone: "good",
                   line: "Respectful. Helpful. Game focused.",
                   desc: "Supports not just their own child, but the whole team. They respect coaches, other parents and rival teams. They know it's about the kids, not just their own.",
                   plus: "You make the team better without touching the ball.", watch: "Your own kid still wants your eyes on them." },
    grateful:    { name: "The Grateful Parent", tone: "good",
                   line: "Thankful. Positive. Present.",
                   desc: "Sees the big picture. They appreciate the coaches, the opportunities, the community and most of all, the chance to watch their child grow.",
                   plus: "Your kid will remember how you made it feel.", watch: "It's OK to admit when a Saturday was rough." }
  },

  bands: [
    { min: 118, label: "Hall of Fame" },
    { min: 100, label: "Starting Lineup" },
    { min: 84,  label: "Second String" },
    { min: 0,   label: "Red Card" }
  ]
};

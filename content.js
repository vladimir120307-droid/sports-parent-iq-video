/*
 * Sports Parent IQ, milestone 1 build: all game content in one place.
 *
 * Edit this file to change questions, answers, scores, types or clips.
 * The engine (index.html) never needs to change for new content.
 *
 * Each answer gives 2 points to its `type` and 1 point to its `also` type, if it has one.
 * The result shows the top type and the top three as percentages. `iq` moves the
 * Sideline IQ, which starts at `baseIQ`.
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
 * through. Files go in clips/, stills/ and types/ under the names below.
 */
window.GAME = {
  baseIQ: 100,
  shotClock: 20,            // seconds per question (a moment can override)

  // One announcer per visit, picked at random. The woman and the Hispanic anchor go here once their clips exist.
  hosts: [
    { intro: { clip: "clips/host_intro.mp4" }, verdict: { clip: "clips/host_verdict.mp4" } }
  ],
  portraits: "types/{key}.jpg",                  // KSNN's own art for each type
  reveals: "clips/reveal_{key}.mp4",             // KSNN's animated type cards, looped and muted behind the result

  moments: [
    {
      time: "8:04 PM", title: "The Walk Back", where: "Saturday, after the final", tone: "dusk",
      setup: "They lost 2 to 1. The field is empty and one light is still on. Halfway to the car, very quietly:",
      shot: "Empty field at dusk, one light on, your kid stops walking.",
      clip: "clips/m4_setup.mp4", credit: "new clips of the same characters",
      q: "\"I think I might want to quit.\" Your first words?",
      a: [
        { t: "\"After everything we've paid for?\"", type: "rage", also: "overly", iq: -8, clip: "clips/m4_a.mp4", quip: "The invoice is talking. And it wants a refund." },
        { t: "\"Tell me more. What's stopped being fun?\"", type: "supporter", iq: 8, clip: "clips/m4_b.mp4", quip: "That's a home run. No coaching required." },
        { t: "\"Thanks for telling me. I've loved every season.\"", type: "grateful", iq: 8, clip: "clips/m4_c.mp4", quip: "That's the kind of win that stays with you." },
        { t: "\"Whatever you choose, I'm still your biggest fan.\"", type: "cheerleader", iq: 6, clip: "clips/m4_d.mp4", quip: "No uniform needed. You're already on their team." },
        { t: "\"I'll talk to the coach. We'll fix this by Monday.\"", type: "overly", iq: -6,
          stamp: { label: "OVERRULED", sub: "HE DIDN'T ASK", cls: "yellow" }, quip: "Whoa, Coach Mom. He asked for ears, not a task force." }
      ]
    },
    {
      time: "4:35 PM", title: "The Ride Home", where: "After the game", tone: "dusk",
      setup: "On the last drive, your son missed the open receiver. The truck is very quiet.",
      shot: "Dad drives one-handed, replaying the play. In the back seat, his son stares out the window.",
      clip: "clips/ride.mp4", still: "stills/ride.jpg", ambience: "car",
      q: "He's waiting to see what you'll say. You...",
      a: [
        { t: "Go through the last drive, play by play.", type: "carcoach", iq: -8, focus: [66, 36, 1.7],
          stamp: { label: "POST-GAME SHOW", sub: "NOBODY ASKED", cls: "red" }, quip: "Welcome to the car. Today's analyst has no mute button." },
        { t: "Rant about the ref, the coach and the other team's parents.", type: "rage", also: "carcoach", iq: -6, focus: [66, 34, 1.85],
          stamp: { label: "FLAG ON THE PLAY", sub: "UNSPORTSMANLIKE", cls: "red" }, quip: "Three complaints, one car ride. What a special team." },
        { t: "\"Tacos or burgers? Your call.\"", type: "balance", iq: 8, focus: [29, 41, 1.6],
          stamp: { label: "GOOD CALL", sub: "TACOS", cls: "green" }, quip: "Tacos. And he's smiling." },
        { t: "\"I loved watching you out there. Want to talk about it, or nah?\"", type: "supporter", also: "grateful", iq: 8, focus: [29, 41, 1.75],
          stamp: { label: "SAFE ZONE", sub: "NO PRESSURE", cls: "green" }, quip: "Perfect answer. And 'nah' is a complete sentence." },
        { t: "Take that work call. It'll be quick.", type: "phone", iq: -4, focus: [30, 43, 1.5],
          stamp: { label: "ON HOLD", sub: "WORK CALL", cls: "yellow" }, quip: "Quick call. Long silence. Your co-pilot checked out." }
      ]
    },
    {
      time: "6:10 PM", title: "The Yelling Coach", where: "Tuesday practice", tone: "day",
      setup: "The coach has been on your son for ten minutes. Now he's in his face, finger out, yelling. Your son is a head taller than him and just takes it.",
      shot: "The coach yells up into your son's face. You're at the fence.",
      clip: "clips/coach.mp4", still: "stills/coach.jpg", ambience: "morning", frame: [75, 50],
      q: "Your son looks over at you. What do you do?",
      a: [
        { t: "Hop the fence and get in the coach's face.", type: "rage", iq: -6, focus: [29, 48, 1.4],
          stamp: { label: "EJECTED", sub: "TWO-MAN SHOW", cls: "red" }, quip: "Congratulations. Now the kid has two coaches to worry about." },
        { t: "Film it. This is going online tonight.", type: "phone", also: "overly", iq: -4, focus: [65, 46, 1.35],
          stamp: { label: "GONE VIRAL", sub: "10K VIEWS", cls: "yellow" }, quip: "Ten thousand views by morning. He still has practice tomorrow." },
        { t: "Catch his eye, nod, and talk with him right after practice.", type: "supporter", iq: 8, focus: [84, 41, 1.6],
          stamp: { label: "I SEE YOU", sub: "STANDING TALL", cls: "green" }, quip: "That little nod said, 'I've got you.'" },
        { t: "\"Coaches yell. It builds character.\"", type: "mellow", iq: -4, focus: [84, 43, 1.45],
          stamp: { label: "LOOKED AWAY", sub: "WARNING", cls: "yellow" }, quip: "He looked over for a reason." },
        { t: "Talk to the other parents tonight and take it to the league together.", type: "teamplayer", also: "overly", iq: 6, focus: [55, 50, 1.2],
          stamp: { label: "TEAM MOVE", sub: "ASSIST", cls: "green" }, quip: "A team effort. For once, the adults are acting like a team." }
      ]
    },
    {
      time: "5:10 AM", title: "The Price of the Dream", where: "The ice rink", tone: "morning",
      setup: "The coach just handed you next season's plan: private lessons, two competitions out of state, a new costume. The total is more than your car.",
      shot: "A dark rink at dawn. Your daughter, already in skates, waits for your answer.",
      clip: "clips/skating.mp4", still: "stills/skating.jpg", ambience: "rink",
      q: "\"Coach thinks I can make regionals!\" She's waiting for your answer. You...",
      a: [
        { t: "Book all of it, plus a choreographer.", type: "overly", also: "cheerleader", iq: -6, focus: [78, 52, 1.6],
          stamp: { label: "ALL IN", sub: "MAXED OUT", cls: "yellow" }, quip: "Dream big. Credit card, brace for impact." },
        { t: "\"Fine. But no more two-footed landings.\"", type: "carcoach", iq: -6, focus: [40, 52, 1.7],
          stamp: { label: "PRESSURE", sub: "WARNING", cls: "red" }, quip: "Every jump now comes with a financial performance review." },
        { t: "Sit down with the coach and plan what you can really afford.", type: "balance", also: "supporter", iq: 8, focus: [45, 42, 1.2],
          stamp: { label: "GAME PLAN", sub: "SMART", cls: "green" }, quip: "A realistic plan beats a triple axel on your credit card." },
        { t: "Hug her first. \"Whatever we decide, I love watching you skate.\"", type: "grateful", also: "supporter", iq: 8, focus: [57, 45, 1.4],
          stamp: { label: "BIG PICTURE", sub: "NICE", cls: "green" }, quip: "She'll remember the hug longer than the scores." },
        { t: "\"It's just skating. Let's see how you feel in the spring.\"", type: "mellow", iq: -2, focus: [40, 51, 1.55],
          stamp: { label: "PUNTED", sub: "LATER", cls: "yellow" }, quip: "Spring? She asked for an answer, not a weather forecast." }
      ]
    },
    {
      // Reworked 2026-11-12 at Jay's request: the injury worry. The "Who Do You Trust?" version is saved in m1_script.md.
      time: "11:20 AM", title: "One More Try", where: "Saturday at the skate park", tone: "day",
      setup: "All morning your daughter has been trying to drop in on the big bowl. Last month a boy broke his arm here. On her last try, she slams hard.",
      shot: "The bowl. She sits up holding her wrist, grabs her board and looks up at you.",
      clip: "clips/skate.mp4", still: "stills/skate.jpg", ambience: "crowd",
      q: "\"I almost had it. One more?\" She wants one more try. You...",
      a: [
        { t: "\"That's it, no more skateboarding. It's too dangerous.\"", type: "overly", iq: -6, focus: [37, 42, 1.6],
          stamp: { label: "GROUNDED", sub: "BANNED", cls: "yellow" }, quip: "Safe today. Next year she skates where you can't see her." },
        { t: "\"You leaned back. Shake it off and commit this time.\"", type: "carcoach", iq: -6, focus: [42, 56, 1.7],
          stamp: { label: "PLAY THROUGH IT", sub: "WARNING", cls: "red" }, quip: "Maybe check the wrist before giving the next TED Talk." },
        { t: "Check her wrist first. If it's fine, wrist guards on and one more on the small bowl.", type: "balance", also: "supporter", iq: 8, focus: [38, 50, 1.45],
          stamp: { label: "SMART SEND", sub: "SMART", cls: "green" }, quip: "Smart call: safety gear, smaller bowl, bigger confidence." },
        { t: "Ask the older skaters to show her how to fall safely.", type: "teamplayer", also: "supporter", iq: 8, focus: [66, 30, 1.6],
          stamp: { label: "LEARN TO FALL", sub: "SMART", cls: "green" }, quip: "Learn to fall first. Gravity is undefeated." },
        { t: "\"YOU'VE GOT THIS! SEND IT!\"", type: "cheerleader", iq: 2, focus: [37, 33, 1.8],
          stamp: { label: "SEND IT", sub: "ALL HEART", cls: "green" }, quip: "Love the enthusiasm. Less hype, more helmet." }
      ]
    }
  ],

  // Used when the shot clock runs out on a moment without its own timeoutPick.
  timeout: { type: "phone", iq: -4, quip: "Shot clock ran out. Somewhere, a phone screen lit up." },

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

/*
 * Sports Parent IQ - all game content in one place.
 *
 * Edit this file to change questions, answers, scores, types or clips.
 * The engine (index.html) never needs to change for new content.
 *
 * A moment with a `clip` plays video. It plays `setupSegs` of that file (or
 * the whole file), the last frame stays up for the question, and then the
 * picked answer plays either its `seg` of the same file or its own `clip`.
 * A moment with a `still` is an illustrated scene: the art comes alive with
 * camera motion, light, drifting motes and `ambience` sound, and each answer
 * reacts with a camera move to its `focus` [x%, y%, zoom] and its `stamp`.
 * If that moment's own clips are added later, they play instead. `live` gives
 * a moment a second, live-action set of clips (an answer without one keeps its
 * line over the frozen frame). At the end, `reveals` names one looping clip per
 * type that plays behind the result card; without it the type's `reveal`
 * segment or its portrait is used. Every file is optional: whatever isn't
 * there is simply skipped, so the game always plays through. Files go in
 * clips/, stills/ and types/ under the names below; nothing in index.html
 * needs to change.
 */
window.GAME = {
  baseIQ: 100,
  shotClock: 10,            // seconds per question (a moment can override)

  intro:   { clip: "clips/host_intro.mp4" },     // the host opens the show (first run only)
  verdict: { clip: "clips/host_verdict.mp4" },   // the host builds up the result, then the type lands
  portraits: "types/{key}.jpg",                  // one square portrait per parent type, by type key
  reveals: "clips/reveal_{key}.mp4",             // one short clip per type, looped and muted behind the result card

  moments: [
    {
      time: "7:42 AM", title: "Snack Duty", where: "Saturday morning", tone: "morning",
      setup: "The team arrives in 18 minutes. The group chat is already asking.",
      shot: "A parent walks up with the snack cooler and twelve kids swarm it.",
      clip: "clips/m1_setup.mp4", credit: "new clips of the same characters",   // optional: plays whole, ends on the question frame
      still: "stills/m1.jpg", ambience: "morning",   // the illustrated scene
      q: "Snack duty is yours. You...",
      a: [
        { t: "Bring orange slices and remember the kid with the allergy.", type: "teamplayer", iq: 6, clip: "clips/m1_a.mp4", focus: [28, 57, 1.7],
          stamp: { label: "SNACK MVP", sub: "LEGEND", cls: "green" }, quip: "Legend behavior. Orange slices forever." },
        { t: "Bring the snacks and the loudest cheer in the league.", type: "cheerleader", iq: 6, clip: "clips/m1_b.mp4", focus: [80, 50, 1.6],
          stamp: { label: "HYPE SQUAD", sub: "LOUD AND PROUD", cls: "green" }, quip: "Even the other team likes you." },
        { t: "Hand out snacks, plus a quick word on everyone's footwork.", type: "carcoach", iq: -4, clip: "clips/m1_c.mp4", focus: [66, 66, 1.8],
          stamp: { label: "COACH MODE", sub: "WARNING", cls: "yellow" }, quip: "They're seven. The orange slice was enough." },
        { t: "Swap with someone. Your other kid has a thing, and that's fine.", type: "balance", iq: 4, clip: "clips/m1_d.mp4", focus: [16, 22, 1.7],
          stamp: { label: "SMART SWAP", sub: "GOOD CALL", cls: "green" }, quip: "You can't be at two fields. You've checked." }
      ]
    },
    {
      time: "2:15 PM", title: "The Bench", where: "Semifinal", tone: "day",
      setup: "Second half. Your kid hasn't left the bench. Twelve parents are watching you watch.",
      shot: "Your kid on the bench, you in the bleachers, staring at the coach.",
      clip: "clips/m2_setup.mp4", credit: "new clips of the same characters",
      still: "stills/m2.jpg", ambience: "crowd",
      q: "Where are your eyes?",
      a: [
        { t: "On the coach. We need to discuss minutes.", type: "control", iq: -8, clip: "clips/m2_a.mp4", focus: [62, 15, 1.9],
          stamp: { label: "DECLINED", sub: "MEETING REQUEST", cls: "red" }, quip: "Your calendar invite has been declined." },
        { t: "On my phone. Is it over?", type: "scroller", iq: -6, clip: "clips/m2_b.mp4", focus: [52, 52, 1.8],
          stamp: { label: "MISSED IT", sub: "ERROR", cls: "yellow" }, quip: "Fourth quarter. They waved at you twice." },
        { t: "On the whole team. Someone's kid just made a great pass.", type: "teamplayer", iq: 8, clip: "clips/m2_c.mp4", focus: [74, 24, 1.35],
          stamp: { label: "TEAM EYES", sub: "ASSIST", cls: "green" }, quip: "That kid's parent was on their phone, by the way." },
        { t: "On the loud dad across the field. I'm about to set him straight.", type: "bully", iq: -8, clip: "clips/m2_d.mp4", focus: [92, 10, 1.8],
          stamp: { label: "OUT OF LINE", sub: "UNSPORTSMANLIKE", cls: "red" }, quip: "You two should really get a room. Or a referee." }
      ]
    },
    {
      time: "3:40 PM", title: "The Bad Call", where: "Bottom of the 3rd", tone: "day",
      setup: "Your kid is catching. The ref just waved off a play everyone saw.",
      clip: "clip.mp4", credit: "KSNN's own clip",
      shotClock: 6,
      setupSegs: [[0.40, 5.00], [5.95, 6.62]],   // megaphone, pointing, then the ref looks over
      q: "The ref looks your way. What do you do?",
      timeoutPick: 0,                            // too slow: the megaphone decides
      timeoutQuip: "Too slow. The megaphone decided for you.",
      a: [
        { t: "Keep yelling. He blew that call!", type: "rager", iq: -8, seg: [8.70, 10.90],
          stamp: { label: "RED CARD", sub: "EJECTED", cls: "red" }, quip: "The ref saw that. So did your kid." },
        { t: "Glare at him. Say nothing.", type: "control", iq: -4, seg: [7.35, 8.60],
          stamp: { label: "SILENT FURY", sub: "WARNING", cls: "yellow" }, quip: "You said nothing. Your face said everything." },
        { t: "Cross your arms. Let it go.", type: "supporter", iq: 6, seg: [11.30, 13.65],
          stamp: { label: "LET IT GO", sub: "NICE", cls: "green" }, quip: "Arms crossed, mouth closed. That counts as progress." }
      ]
    },
    {
      time: "8:04 PM", title: "The Walk Back", where: "After the final", tone: "dusk",
      setup: "They lost 2 to 1. The field is empty and one light is still on. Halfway to the car, very quietly:",
      shot: "Empty field at dusk, one light on, your kid stops walking.",
      clip: "clips/m4_setup.mp4", credit: "new clips of the same characters",   // plays whole, ends on the question frame
      live: { clip: "clips/real_setup.mp4", a: ["clips/real_a.mp4", "clips/real_b.mp4", "clips/real_c.mp4", "clips/real_d.mp4"] },
      q: "\"I think I might want to quit.\" Your first words?",
      a: [
        { t: "\"After everything we've paid for?\"", type: "rager", iq: -8, clip: "clips/m4_a.mp4", quip: "Oof. The invoice has entered the chat." },
        { t: "\"Tell me more. What's stopped being fun?\"", type: "supporter", iq: 8, clip: "clips/m4_b.mp4", quip: "That's the whole playbook, right there." },
        { t: "\"Thanks for telling me. I've loved every season.\"", type: "grateful", iq: 8, clip: "clips/m4_c.mp4", quip: "Somebody's going to remember that one." },
        { t: "\"Whatever you choose, I'm still your biggest fan.\"", type: "cheerleader", iq: 6, clip: "clips/m4_d.mp4", quip: "Foam finger optional. Message received." }
      ]
    },
    {
      time: "8:11 PM", title: "The Ride Home", where: "Twelve minutes to go", tone: "night",
      setup: "The back seat is very quiet. Somebody has to pick what's playing.",
      shot: "Back seat at night, your kid slowly puts on headphones.",
      clip: "clips/m5_setup.mp4", credit: "new clips of the same characters",
      q: "What's playing on the ride home?",
      a: [
        { t: "Me, breaking down the second half.", type: "carcoach", iq: -8, clip: "clips/m5_a.mp4", quip: "Fun fact: the back seat has no exit." },
        { t: "Whatever they pick. We're stopping for fries.", type: "balance", iq: 8, clip: "clips/m5_b.mp4", quip: "Fries: undefeated since forever." },
        { t: "A list of what the coach got wrong.", type: "control", iq: -6, clip: "clips/m5_c.mp4", quip: "The coach would love your notes. No, really." },
        { t: "\"I loved watching you play.\" Then quiet.", type: "grateful", iq: 8, clip: "clips/m5_d.mp4", quip: "Six words. Best thing said all day." }
      ]
    }
  ],

  // Used when the shot clock runs out on a moment without its own timeoutPick.
  timeout: { type: "scroller", iq: -4, quip: "Shot clock ran out. Somewhere, a phone screen lit up." },

  types: {
    // `reveal` is the fallback while clips/reveal_rager.mp4 isn't there: a segment of KSNN's own clip.
    rager:       { name: "The Rager",           line: "You bring the energy. All of it. To everyone.", plus: "Nobody cares about the game more than you do.", watch: "Your kid can hear you. So can the next field.", reveal: { clip: "clip.mp4", seg: [11.30, 13.65] } },
    scroller:    { name: "The Scroller",        line: "You've attended every game, in the legal sense.", plus: "You show up, week after week, and that counts.", watch: "They look for you after a good play." },
    carcoach:    { name: "The Car Coach",       line: "The post-game analysis is mandatory and has no exit.", plus: "You really do know the game.", watch: "The ride home is the part they remember." },
    control:     { name: "The Control Freak",   line: "You have thoughts on the rotation, and a shared doc.", plus: "Nothing falls through the cracks with you around.", watch: "Coaches coach. Kids play. You get to watch." },
    bully:       { name: "The Sideline Bully",  line: "You've never lost an argument with a stranger's dad.", plus: "You'd go to war for your kid.", watch: "Kids copy what you do on the sideline." },
    cheerleader: { name: "The Cheerleader",     line: "Every kid on the field knows your voice, in a good way.", plus: "You make the whole team feel seen.", watch: "Sometimes they just need you to be quiet and close." },
    supporter:   { name: "The Supporter",       line: "Calm, steady, and always there with a water bottle.", plus: "Your kid plays with less fear because of you.", watch: "Tell them out loud. They can't read your calm." },
    balance:     { name: "The Balance Builder", line: "Sports matter here. So do fries, sleep and homework.", plus: "Your kid gets to be a whole person.", watch: "Check in sometimes. They may want more than you think." },
    teamplayer:  { name: "The Team Player",     line: "You know every kid's name, and which ones forgot cleats.", plus: "You make the team better without ever touching the ball.", watch: "Your own kid still wants your eyes on them." },
    grateful:    { name: "The Grateful Parent", line: "You know these seasons go fast, and you act like it.", plus: "Your kid will remember how you made it feel.", watch: "It's OK to admit when a Saturday was rough." }
  },

  bands: [
    { min: 118, label: "Hall of Fame" },
    { min: 100, label: "Starting Lineup" },
    { min: 84,  label: "Second String" },
    { min: 0,   label: "Red Card" }
  ]
};

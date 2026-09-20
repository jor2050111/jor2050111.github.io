# Blackout Broadcast: verification

September 20, 2026. Local build on `codex/blackout-broadcast`.
Baseline before this build: `5996890`. Identify the delivered build with
`git log -1 -- games/bpc170/ch04`.

Preview: http://127.0.0.1:8765/games/bpc170/ch04/
Server: existing `python3 -m http.server 8765 --bind 127.0.0.1` serving the site
root. Its process working directory was verified before reusing it.
Runtime: Node v26.8.2. Browser: Ego Lite Chrome 152.0.0.0 on macOS.
Exact browser version is in the ignored `supplemental-checks.json` evidence.

## Rules

`npm test`: 15 tests passed. No package installation required.
`node --check game.js` and `git diff --check`: passed.

Covered: two successful strategies in each authored shift; independent live
sources; crew overbooking; prior-evidence requirement; jobs finishing after
the current program; backup completing before a scheduled failure; remaining
mirrored-drive failure; separate local music unaffected by archive loss;
preview failure without PC failure; return verification and cable isolation;
no invented return image from a stopped PC; complete but unsuccessful shifts;
program variety; invalid, duplicate, unavailable, and post-completion actions;
and deep non-mutation of supplied state and plans.

## Browser checks

Browser commands used `ego-browser nodejs` with TaskSpace 3, Page p1.
All gameplay used real button, keyboard, or CDP touch events. Snapshot access
was read-only. No gameplay state was injected or altered for a win.

| Check | Result and evidence |
| --- | --- |
| Desktop pointer play | Passed at 1365 × 1000: invalid source, empty block, hint, rewind, recovery, archive backup, all categories, full late-shift success |
| Crew overbooking | Passed: band plus investigation displays a 3-of-2 error without advancing |
| Keyboard-only full shift | Passed with Tab and Space, using backup-first late-shift plan. Help and closing credits dismissed with Escape. Rewind, re-air, and restart passed |
| Reduced motion | Passed with OS preference emulated to reduce before load. Zero running animations at completion |
| Storage blocked | Passed full keyboard run with localStorage getter throwing SecurityError before game load |
| Touch gameplay | Passed early show at 390 × 844 with actual touchStart/touchEnd events on controls. 22 touch starts observed at successful completion. Native shift select was set through the browser selectOption API before the touch playthrough |
| Failed ending | Passed touch run: six attempts to air unavailable footage produced 0 filled blocks, no categories, no saved archive, and an honest incomplete ending |
| Help and recovery | Help opens and closes, Escape returns focus to Help. Hints, rewind, replay, and restart work |
| Completion focus | Native close first restores its trigger. After the close handler settles, focus reaches the visible closing-credits button, verified with waitForFunction |
| Celebration lifetime | Success effect ends; closing message remains until dismissed. Close removes celebration class and restores focus |
| Manual motion pause | Passed on the rotating-record scene. Pause reports zero running animations |
| Sound | Starts off. Toggle on/off exercised without runtime errors. Audio listening not verified |
| Authored scenes | Interview, band, record, moon, city, music bars, ident, and no-signal render through selected programs. City, moon, initial, and closing-credit screenshots inspected |
| Viewports | At 320, 390, 640, 850, 1024, 1365 pixels, document width matches viewport and all visible buttons are at least 44 pixels high |
| Local assets and return link | HTML, CSS, all three JS modules, and chapter return URL returned 200 |
| Runtime errors | Zero collected errors or unhandled rejections in final instrumented keyboard, touch-success, and touch-failure runs |
| Contrast spot checks | Seven solid text/background pairs: minimum 5.91:1. This is not a complete audit of gradients, every state, or every graphic |
| Browser zoom | Not run; narrow viewports do not establish zoom conformance |
| Screen reader, other browser engines, physical phone | Not run |

The game now returns focus and scroll position to the audience screen after
each block, so the scene reward and result can be seen. A visible link takes
players back to the program choices. This revision preceded the final keyboard
and touch runs.

Two initial keyboard harness attempts were incomplete. The first did not
commit its intended native shift selection, then attempted a job against the
wrong event schedule. The second completed the game but lost its error
collector because browser CDP setup does not persist across CLI rounds.
The final run selected the default shift, installed and asserted collectors
within the same round before play, and supplies the reported results.

## Reproduction and evidence

Evidence folder at the site root, ignored by Git:
`output/playwright/blackout-broadcast/`.

- `keyboard-checks.json`: full keyboard success, blocked storage, reduced motion,
  no runtime errors, rewind, restart. Its immediate native focus observation
  precedes the settled-focus check in the touch run.
- `touch-test.mjs` and `touch-checks.json`: complete early-shift touch run,
  unsuccessful ending, viewport measurements, assets, and settled modal focus.
- `supplemental-checks.json`: manual pause and browser version. The additional city scene is recorded in its screenshot.
- Screenshots: `desktop-initial.png`, `desktop-win.png`, `desktop-city.png`,
  `phone-initial.png`, `phone-controls.png`, `phone-film.png`, `phone-win.png`.

The touch harness ran as:

```sh
ego-browser nodejs < output/playwright/blackout-broadcast/touch-test.mjs
```

It uses the completed session's TaskSpace ID. A future session needs a new
space created once for that new goal and its ID substituted before execution.
The keyboard harness used a heredoc with Tab/Space only for gameplay and
read-only active-element inspection to choose Tab counts.

Late shift, recovery-first fixture:

1. People after dark + Read startup evidence.
2. The record room + Recover and verify playback.
3. Midnight frequencies + Protect the film archive.
4. Small moon, big plans, with no crew job.
5. People after dark + Check the transmitter return.
6. Electric rooftop, with no crew job.

Early shift fixture: same first three blocks, then People after dark + Check
return, Small moon + Test known-good cable, and Electric rooftop.
An alternative late opening is ident + archive copy, then interview + evidence,
record room + recovery, film, interview + return, band. All are covered by rules.

Runtime payload is about 53 KB uncompressed across HTML, CSS, and three JS
modules. No raster, downloaded font, or external runtime dependency is needed.

## Human review and release

Final review of saved screenshots found two cosmetic issues: hiding line
breaks on narrow screens joined adjacent words, and the ident's decorative
subtitle overlapped its lower-third caption. Added whitespace and hid that
decorative subtitle at narrow widths. A final rule review also restricted
the return-feed hint to a recovered PC, so it never recommends an unavailable
job. That hint guard has a passing rule regression assertion.

These final changes were made after the browser was handed over with the
result tab retained. Further browser access reported the space was no longer
agent-controlled and stopped. No workaround was attempted. The final cosmetic
adjustments and hint change have not been browser-rechecked. Screenshots and
full playthrough evidence above precede those small final changes.

Mr. Vega selected the concept. Instructor game-feel review of this build is
pending. First-play duration is an unverified 6–8 minute estimate. Student
comprehension, transfer of learning, and learning gains have not been measured.

Publication: not authorized or performed. No live URL or live-runtime checks
are claimed. Canvas: no update, embed, Student View, or HTML round-trip check.

# Breeze Lab: verification

September 19, 2026. Local build, not released.
Preview: http://localhost:8765/games/bpc170/ch03/
Server: `python3 -m http.server 8765 --bind 127.0.0.1` from the site root.

## Rules

`npm test`: 12 tests passed. No package installation.
`node --check game.js`, `node --check rules.js`, and `git diff --check`: passed.

Covered: recoverable initial state, obstruction improvement without noise,
paired versus same-direction fans, passive exchange with fans off, speed/noise
tradeoff, cooler and airflow bottlenecks, all three discovery fixtures,
alternate successful fan positions and directions, noisy light-load builds,
workload isolation, invalid-state rejection, and non-mutating evaluation.

## Browser checks

Chrome 152.0.0.0 through ego-browser on macOS, Node v26.8.2.
Desktop viewport: 1365 × 1050. Touch viewport: 390 × 844.

| Check | Result |
| --- | --- |
| Initial failure, hint, recovery, all three discoveries | Passed using actual buttons |
| Compact cooler limit under heavy workload | Passed, remains reduced pace until sufficient cooler selected |
| Notebook restore and undo | Passed, returns exact prior workload/configuration |
| Help and celebration dismissal | Passed with Escape, focus returns to trigger |
| Keyboard-only complete run | Passed using Tab and Space from the initial state through all three discoveries, then Escape and restart |
| Touch emulation | Passed using CDP touchStart/touchEnd, 24 observed touch events, no debug-state edits |
| Narrow layout and overflow | Passed at 320, 390, 640, 850, 1024, and 1365 CSS pixels. No horizontal overflow, all visible buttons at least 44 px tall |
| Reduced motion and optional sound | OS reduce preference yielded zero running animations at completion. Manual pause also stopped motion. Sound starts off, toggle on/test/off produced no runtime errors. Audio listening not verified |
| Blocked storage | Complete keyboard playthrough passed with localStorage getter throwing SecurityError |
| Runtime errors and asset responses | Zero captured errors or unhandled rejections during instrumented keyboard and touch runs. CSS and all three JS modules returned 200 |
| Reset, replay, notebook bound | Reset clears configuration history, notebook, discoveries, and test count. A subsequent full playthrough passed. Notebook retains latest six tests |
| Celebration lifetime | Message remains after effects end. Escape and return button dismiss it and restore Test focus. Effects stop within 1.4 seconds |
| Mobile readings revision | Complete replay passed after adding sticky live readings. At 390 px, bar remains at viewport top while controls are visible, without horizontal overflow |
| Text contrast spot checks | Seven principal text/background pairs measured 5.35:1 or higher. Not a full contrast audit of every state or SVG part |
| Browser zoom | Not run. Narrow-viewport checks are not a zoom audit |
| VoiceOver or other assistive technology | Not run |
| Safari, Firefox, Edge, physical phone | Not run |

Evidence lives in ignored `output/playwright/breeze-lab/` at the site root.
Screenshots: `desktop-initial.png`, `desktop-win.png`, `phone-initial.png`,
`phone-controls.png`, and `phone-win.png`. Final desktop initial and mobile
controls/win screenshots were visually inspected. `keyboard-checks.json` and
`touch-checks.json` contain state, response, layout, and runtime evidence.

The first desktop test harness reached completion, restore, and help checks,
then failed because its error collector was unavailable after a browser round.
The collector was installed before reload within each later test round, and
its presence was asserted before the keyboard run. Later runs supply the
runtime-error evidence. An initial local-server connection timed out before
the server responded. The subsequent localhost preview and asset checks passed.

Runtime payload: 56,663 bytes across HTML, CSS, and three JavaScript modules,
before compression, with no raster assets or third-party runtime requests.

### Reproduce the main completion

1. Test the initial state: reduced pace, no discovery.
2. Clear cables, choose rear exhaust, and test: Quiet Creator.
3. Choose Photo studio and Balanced fans, then test: Studio Steady.
4. Choose Animation render, top exhaust, and Boost. The compact cooler
   still limits pace. Choose Tower and test: Heavy Lifter and celebration.
5. Close the message. Restore an earlier experiment, undo the restore, and
   restart. The sandbox remains usable throughout.

Keyboard run uses only Tab, Space, and Escape for these actions. Mobile run
dispatches touch events to the real controls. Read-only snapshot inspection
verifies results. No test awards discoveries by modifying application state.

## Human review and release

Instructor game-feel review: pending. Student playtime, comprehension, and
transfer of learning: not measured. Estimated 4–6 minutes only.

Publication authorization: none. Live asset and browser checks: not run.
Canvas changes: none. Canvas Student View and saved embed: not tested.

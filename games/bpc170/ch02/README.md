# Campus Festival

Status: live, published September 18, 2026, from commit `3df82f7`.
Documentation reconciled September 19, 2026.

Mr. Vega accepted and published the first encounter: two installations and two cables. This is the current complete release scope. Its roughly two-minute estimate still needs student playtesting. No player countdown is used. Transfer targets belong to the simulated data copy. The original under-eight-minute progression remains an optional expansion, not unfinished required work.

## Play locally

From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [the local game](http://127.0.0.1:8765/games/bpc170/ch02/).

Use an HTTP server because the game loads JavaScript modules. Opening the HTML as a file is not supported. Students can play [the live Chapter 02 game](https://jor2050111.github.io/games/bpc170/ch02/). The repository currently publishes `main` from its root, so pushing runtime changes is a release action. The release turn verified the Pages build commit and exact served bytes of all seven runtime files. A separate live-browser playthrough was not recorded.

## Implemented

- Original festival art with code-drawn mural and stage rewards.
- Two transfer stations, one 5 Gbps cable, and one 480 Mbps cable.
- Explicit connector and supported-mode rules, ideal transfer calculations, and visible results.
- Cable selection and assignment, automatic swapping, undo, reset, three hints, and a finish recap.
- Native keyboard controls and tap controls, with no dragging requirement.
- Reduced motion, optional synthesized sound, and a modal help panel.
- Prominent How to play orientation and a collapsible transfer explanation above the courtyard.
- A dismissible win celebration with a staggered title, animated festival badge, two confetti bursts, and a victory chime when sound is enabled. Reduced motion shows a static win message.
- Local storage for preferences only. Blocked storage does not prevent play.
- No account, gradebook, analytics, or runtime third-party requests.

Both stations use independent host-to-drive USB connections. A successful transfer readies media for the installation. It does not represent USB powering the entire festival or a direct USB-only display connection.

## Verification

```sh
cd games/bpc170/ch02
npm test
```

No package installation is required. Tests use Node's built-in test runner. See `QA.md` for the browser checks and limitations.

`window.__CAMPUS_FESTIVAL__.snapshot()` exposes a read-only copy of gameplay state for inspection. Tests exercise actual buttons and keyboard/touch events to establish completion.

## File responsibilities

| File | Purpose |
| --- | --- |
| `index.html`, `styles.css` | Semantic interface, layout, and visual scene |
| `game.js` | Interaction state, feedback, rendering, and audio |
| `celebration.js` | Win choreography, finite confetti, and motion cleanup |
| `rules.js` | Compatibility, transfer estimates, and inventory rules |
| `levels.js` | Authored equipment and encounter data |
| `assets/festival.png` | Original AI-generated festival illustration |
| `tests/rules.test.js` | Compatibility, math, inventory, and solution tests |

The illustration was generated with the built-in image tool for this project. Connector diagrams and reward graphics are authored SVG. The illustration is about 2.7 MB, exceeding the proposed 2 MB initial-asset target. Image optimization remains an optional improvement to the shipped build. See [SOURCES.md](SOURCES.md) for provenance and technical boundaries.

The win choreography draws on the [HyperFrames reference](https://github.com/heygen-com/hyperframes) supplied during playtesting. This live interaction uses the browser's animation API and canvas directly. It does not install HyperFrames or Remotion or require a rendered video. Effects last up to 4.6 seconds, stop on dismissal, and respect the reduced-motion setting and OS preference. The readable win message has no time limit.

## Canvas embed

[CANVAS-EMBED.html](CANVAS-EMBED.html) preserves Mr. Vega's working `69rem` pattern with the accepted descriptive iframe title and usage-date credit. He reported the original pattern working in Canvas. The two wording corrections are prepared here, but their saved Canvas state has not been verified. No Canvas page was edited during this documentation work.

## Limits and future work

The game has instructor approval, not evidence of measured learning gains. Student playtime and comprehension, physical phones, other browser engines, full assistive-technology review, and formal contrast/zoom checks remain unverified. See [QA.md](QA.md) for the dated evidence.

Additional encounters and a new host-bottleneck scenario are optional ideas. Mr. Vega chose to proceed to another chapter after this release. For future games, start with [the games workflow](../../README.md) and [catalog](../../GAME-CATALOG.md). This chapter's primary family is Puzzle, so the next BPC170 game must use another family.

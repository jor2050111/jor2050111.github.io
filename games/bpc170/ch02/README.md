# Campus Festival: first playable encounter

Status: local prototype ready for Mr. Vega's playtest, September 18, 2026.

The approved full game targets under eight minutes. This build implements the first encounter from plan stage 2: two installations and two cables. Its roughly two-minute estimate needs human playtesting. No player countdown is used. Transfer targets belong to the simulated data copy.

## Play locally

From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [the local game](http://127.0.0.1:8765/games/bpc170/ch02/).

Use an HTTP server because the game loads JavaScript modules. Opening the HTML as a file is not supported. The intended public address is [the Chapter 02 game](https://jor2050111.github.io/games/bpc170/ch02/), but this prototype has not been published. The repository currently publishes `main` from its root, so pushing this folder is a release action.

## Implemented

- Original festival art with code-drawn mural and stage rewards.
- Two transfer stations, one 5 Gbps cable, and one 480 Mbps cable.
- Explicit connector and supported-mode rules, ideal transfer calculations, and visible results.
- Cable selection and assignment, automatic swapping, undo, reset, three hints, and a finish recap.
- Native keyboard controls and tap controls, with no dragging requirement.
- Reduced motion, optional synthesized sound, and a modal help panel.
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
| `rules.js` | Compatibility, transfer estimates, and inventory rules |
| `levels.js` | Authored equipment and encounter data |
| `assets/festival.png` | Original AI-generated festival illustration |
| `tests/rules.test.js` | Compatibility, math, inventory, and solution tests |

The illustration was generated with the built-in image tool for this project. Connector diagrams and reward graphics are authored SVG. The illustration is about 2.7 MB. The prototype exceeds the proposed 2 MB initial-asset target, so an optimized release asset remains a task for the full build.

## Next decision

Play the encounter and judge the interaction before adding levels. Is selecting, swapping, and testing satisfying? Does the scene reward make success feel worthwhile? Does the task feel like a puzzle or too much like a worksheet?

After that review, build the remaining progression and alternate finale from `GAME-PLAN.md`. A representative student pilot, full browser/accessibility checks, release asset optimization, and public deployment remain later stages.

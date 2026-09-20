# Blackout Broadcast

Status: live, accepted and published September 20, 2026. Runtime `a2499ea`.
BPC170 Chapter 04: Troubleshooting PC Hardware.
Primary family: Strategy / management.

Program six blocks of independent television with two crew members. Live
shows occupy crew. Recorded programs free them for investigation and recovery,
but depend on working playback and readable recordings. Keep six blocks on
air, share a story, music, and a film, and protect a separate archive copy.

Optional, individual, ungraded, and untimed. Estimated first play: 6–8 minutes,
not measured with students. Events advance only when the player airs a block.

## Play locally

From the site repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open [Blackout Broadcast](http://127.0.0.1:8765/games/bpc170/ch04/).
Use HTTP because the page imports JavaScript modules.

## Implemented scope

- Two authored shifts: The late shift (boot-entry fault) and The early show
  (POST/memory fault), with different archive and preview event timing.
- Seven programs with independent live, local playback, and archive sources.
- Five crew jobs, completed after the current program and before its event.
- Multiple successful running orders, meaningful empty-block consequences,
  crew-capacity checks, hints, a notebook, and a complete shift log.
- Rewind any block, restart, switch shifts, and closing credits for every
  outcome. Success gets its own visible message and short celebration.
- Original animated CSS scenes, motion pause, OS reduced motion, optional
  synthesized sound, native keyboard and touch controls.
- No account, storage, analytics, backend, or external runtime assets.

The audience screen shows the last aired program. The separate preview fault
appears in the notebook. Recorded playout is held by a fictional station
policy until the transmitter return is checked. A failed monitor does not
stop the PC. Return verification permits playback before cable replacement.

## Verification and files

```sh
cd games/bpc170/ch04
npm test
```

Node's built-in test runner requires no installation. See [QA.md](QA.md) for
browser evidence and limits. `window.__BLACKOUT_BROADCAST__.snapshot()`
returns a deep copy for inspection, with no game-state setter.

| File | Responsibility |
| --- | --- |
| `levels.js` | Shift schedules, startup evidence, and program catalog |
| `rules.js` | Crew constraints, program readiness, events, and outcomes |
| `game.js` | Controls, rendering, rewind history, audio, and dialogs |
| `index.html`, `styles.css` | Semantic page, layouts, original broadcast art |
| `tests/rules.test.js` | Successful strategies, causal boundaries, invalid plans |
| `GAME-PLAN.md`, `SOURCES.md`, `QA.md` | Design, provenance, verification |

## Review and publication

Mr. Vega accepted the game and explicitly authorized GitHub publication on
September 20. GitHub Pages deployed runtime commit `a2499ea`, and all five
runtime files matched the local release. [Play the live game](https://jor2050111.github.io/games/bpc170/ch04/).
See QA.md for the live gameplay record. No Canvas update was requested or made.
Human playtime, student enjoyment, learning gains, and full accessibility
conformance remain unverified.

The Last Copy and Mirrorfall remain unassigned future candidates in
[the catalog](../../GAME-CATALOG.md), alongside Premiere Night.

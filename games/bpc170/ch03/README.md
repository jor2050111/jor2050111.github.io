# Breeze Lab

Status: live, accepted and published September 19, 2026. Runtime commit `5610498`.
BPC170 Chapter 03: Installing System Devices.

A creative sandbox about fan direction, clear airflow, and CPU cooling.
Estimated playtime is 4–6 minutes, unverified with students. Untimed,
optional, individual, and ungraded.

## Play locally

From the site repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://localhost:8765/games/bpc170/ch03/.
Use HTTP because JavaScript modules do not support a direct file preview.
Return link: `../../../slides/bpc170/ch03/`.
Student URL: https://jor2050111.github.io/games/bpc170/ch03/
No Canvas embed has been applied.

## Play loop

Clear the cable path, choose fan directions, adjust speed and cooler, then
compare workloads. Readings change immediately. Test saves an experiment.
Discover three different kinds of successful builds, with multiple valid
configurations. The notebook keeps six tests and can restore earlier designs.
Undo, hints, help, restart, and continued play after completion are included.

Native buttons support keyboard and touch. Motion can be paused, and the
system reduced-motion setting is respected. Optional sound starts off.
No data is stored or transmitted. Reloading clears the visit's progress.

The figures are illustrative game units, not temperatures, watts, or real
hardware specifications. See the explanation in the game and `SOURCES.md`.

## Verification and files

```sh
cd games/bpc170/ch03
npm test
```

Node's built-in runner needs no package installation.

| File | Responsibility |
| --- | --- |
| `index.html`, `styles.css` | Accessible controls, layout, live vector diagram |
| `game.js` | State, interaction, notebook, audio, and celebration |
| `rules.js` | Deterministic comparison model and discovery eligibility |
| `levels.js` | Workloads, cooler choices, speed choices, initial state |
| `tests/rules.test.js` | Rule boundaries, tradeoffs, recovery, alternate designs |
| `GAME-PLAN.md`, `SOURCES.md`, `QA.md` | Decisions, provenance, verification |

`window.__BREEZE_LAB__.snapshot()` returns a copy of state for inspection.
QA must complete the game using actual controls, not debug-state edits.

Known fixtures: clear path, front intake, rear exhaust, top off, compact
cooler, Quiet fans earns Quiet Creator. Balanced fans with Photo studio earns
Studio Steady. Add top exhaust, Tower, and Boost for Animation render to earn
Heavy Lifter. Reverse and alternate fan arrangements are also accepted.

## Review and release

See `QA.md` for exact checks and outstanding human testing. No learning-gain
or full accessibility-conformance claim is made. Mr. Vega reviewed the local
build and explicitly requested publication on September 19, 2026. GitHub Pages
built runtime commit `5610498`, and all five live runtime files matched local
SHA-256 hashes. The chapter return link returned HTTP 200. A separate live
browser playthrough was blocked by a browser permission prompt and was not
performed. The earlier complete browser playthroughs were local.

Premiere Night and The Last Copy remain future BPC170 candidates in
`../../GAME-CATALOG.md`, with no chapter assigned.

# BPC170 Chapter 03: Breeze Lab

Status: Ready for local playtest. Selected by Mr. Vega on September 19, 2026.
Scope: build the selected brainstorming option as a local game. Publication
and Canvas editing are not authorized.

## Chapter context

Installing System Devices. The current chapter slides and older Module 03
both cover airflow and CPU cooling. See `SOURCES.md` for locations and limits.

## Learning through play

| Concept | Player action | Consequence | Evidence of understanding |
| --- | --- | --- | --- |
| Intake and exhaust | Change each fan's direction or turn it off | Arrows and cooling capacity change | Compare directed exchange with passive-vent reliance |
| Clear airflow | Move the cable bundle out of the path | More cooling at unchanged fan noise | Improve a build without increasing fan speed |
| CPU-to-case cooling path | Change cooler size and workload | The weaker stage limits cooling | Solve a cooler limit without adding case fans blindly |

Optional, individual, untimed, and ungraded. Estimated first play: 4–6 minutes,
not yet observed with students. Memory installation, storage, power-supply
sizing, thermal-paste application, and liquid cooling are outside this game.

## Mechanic decision

| Candidate | Family | Main loop | Decision |
| --- | --- | --- | --- |
| Breeze Lab | Creative sandbox | Alter, observe, test, compare, restore | Selected by Mr. Vega |
| Premiere Night | Strategy / management | Schedule jobs across production rounds | Retained for future chapter fit |
| The Last Copy | Narrative adventure | Investigate and preserve a filmmaker's archive | Retained for future chapter fit |

Chapter 02 is Puzzle. No later game is currently cataloged. Chapter 03's
Creative sandbox meets the rotation rule. Multiple directions and cooling
configurations can earn each discovery. Goals encourage experimentation,
without a fixed layout or a single required sequence. Candidates remain in
`../../GAME-CATALOG.md` with no assigned future chapter.

## Playable scope

The opening invites the player to clear an obstructed cable path. Changing
controls immediately changes readings and the diagram. Testing saves a
snapshot and can earn one of three discoveries:

- Quiet Creator: light workload, sufficient cooling, low fan noise.
- Studio Steady: photo workload, sufficient cooling.
- Heavy Lifter: render workload, sufficient cooling.

The notebook retains six tests and can restore any retained build. Undo
reverts configuration changes, including restores, without erasing earned
discoveries. Start fresh clears the notebook and discoveries. No preferences
or gameplay are stored between visits. Three adaptive hints are unlimited.

All three discoveries open a dismissible celebration. Its message persists
until dismissed, its effects end within 1.4 seconds, and focus returns to Test.
The sandbox remains playable afterward. Audio is optional and initially off.
Motion can be paused, and the OS reduced-motion preference takes precedence.

## Art direction

A cream and sage workbench with a live vector cutaway, copper-colored cable
bundle, blue intake arrows, amber exhaust arrows, and a small plant outside
the computer. This is an abstract fictional desk, not a Phoenix location or
Phoenix College depiction. No local architecture or reference photos are used.
SVG keeps parts and direction labels aligned with the current configuration.

## Rules and technical limits

Rules are dimensionless comparisons, not engineering estimates. Separate
subject logic (`rules.js`), authored data (`levels.js`), and browser controls
(`game.js`). Cooling is the lower of case capacity and cooler capacity.
Passive vents prevent all-intake/all-exhaust configurations from being
represented as sealed boxes. Noise is a qualitative game indicator.

No real temperatures, power ratings, fluid simulations, or purchase guidance
are inferred. Documentation and in-game disclosure state these limits.

## Review and release

Local preview: http://localhost:8765/games/bpc170/ch03/
See `QA.md` for actual checks. Mr. Vega's game-feel review remains pending.
Publishing requires current-game authorization. Pushing this repository's
main branch can publish through Pages, so this build stays local.

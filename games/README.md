# Educational game workshop

Open a future Codex task in this directory:

`/Users/vega/Documents/code/jor2050111.github.io/games/`

Use this prompt:

> Read AGENTS.md and follow the educational game workflow. Help me build the
> next optional course game. Start by asking which course and chapter.

Or name the course and chapter in that prompt to skip intake. Codex should
find the chapter sources, select two or three concepts, choose a game type
that differs from neighboring games, and build a local version to playtest.
No globally installed skill or previous conversation is required. The
repository-local skill is loaded through `AGENTS.md`.

## Where to look

| File | Use |
| --- | --- |
| [Workflow](educational-game-builder/SKILL.md) | Intake, concept selection, art, build, testing, and release |
| [Source discovery](educational-game-builder/references/source-discovery.md) | Find the right chapter without assuming every course has the same structure |
| [Game catalog](GAME-CATALOG.md) | Track primary mechanics and prevent consecutive repeats |
| [Templates](educational-game-builder/templates/) | Chapter plan, source record, QA, README, course map, and Canvas embed |
| [Lessons from Chapter 02](educational-game-builder/references/ch02-retrospective.md) | What worked, what changed, and what remains unverified |
| [Workflow validation](educational-game-builder/references/workflow-validation.md) | Artifact checks, scenario review, and limits of this documentation pass |
| [Canvas and release guide](educational-game-builder/references/release-and-canvas.md) | Local preview, deployment checks, and the accepted Canvas pattern |
| [BPC170 context](bpc170/COURSE.md) | Verified source locations and course-specific constraints |
| [Campus Festival](bpc170/ch02/README.md) | The first shipped example, including its limits |

## Defaults

One browser page, two or three concepts, optional and ungraded. Aim for a
complete first play under eight minutes. Keep play untimed unless a timer
serves a demonstrated purpose. Chapter 02 is a complete two-minute encounter,
not a requirement to make every game that short or use the same scene.

Reuse accessible controls and verification techniques when useful. Select
each game's mechanic from its learning goal. Do not clone Chapter 02's puzzle
or build a universal game engine before a recurring need appears.

## Current release

[Campus Festival, BPC170 Chapter 02](https://jor2050111.github.io/games/bpc170/ch02/)
was published September 18, 2026, from commit `3df82f7`. Its HTML, CSS,
JavaScript modules, and illustration were verified against the local release.
The [QA record](bpc170/ch02/QA.md) separates that verification from checks that
remain outstanding.

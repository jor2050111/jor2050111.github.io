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
| [Creative-play standard](educational-game-builder/references/creative-play.md) | Future games must offer play beyond existing simulation labs |
| [Source discovery](educational-game-builder/references/source-discovery.md) | Find the right chapter without assuming every course has the same structure |
| [Game catalog](GAME-CATALOG.md) | Track primary mechanics and prevent consecutive repeats |
| [Templates](educational-game-builder/templates/) | Chapter plan, source record, QA, README, course map, and Canvas embed |
| [Lessons from Chapter 02](educational-game-builder/references/ch02-retrospective.md) | What worked, what changed, and what remains unverified |
| [Workflow validation](educational-game-builder/references/workflow-validation.md) | Artifact checks, scenario review, and limits of this documentation pass |
| [Canvas and release guide](educational-game-builder/references/release-and-canvas.md) | Local preview, deployment checks, and the accepted Canvas pattern |
| [BPC170 context](bpc170/COURSE.md) | Verified source locations and course-specific constraints |
| [BPC270 agent start](bpc270/README.md) | Future-game intake and structure, with no game selected |
| [BPC270 context](bpc270/COURSE.md) | Verified chapter map, shared Module 1, and missing-source boundaries |
| [September 20 workflow review](WORKFLOW-REVIEW.md) | BPC170 progress, fresh rule checks, and remaining evidence gaps |
| [Campus Festival](bpc170/ch02/README.md) | The first shipped example, including its limits |
| [Breeze Lab](bpc170/ch03/README.md) | Chapter 03 creative sandbox, published September 19 |
| [Blackout Broadcast](bpc170/ch04/README.md) | Chapter 04 strategy game, published September 20 |

## Defaults

For BPC270, open a future task here or in `games/bpc270/` and use:

> Follow the educational-game-builder workflow for BPC270. Read its COURSE.md
> and the shared GAME-CATALOG.md. Ask which chapter I want, verify its sources,
> and build a locally testable game. Publication is a separate step.

If a chapter is supplied, skip that question. Workflow setup and review do
not require chapter intake. The BPC270 folder currently holds guidance only.

One browser page, two or three concepts, optional and ungraded. Aim for a
complete first play under eight minutes. Keep play untimed unless a timer
serves a demonstrated purpose. Chapter 02 is a complete two-minute encounter,
not a requirement to make every game that short or use the same scene.

Reuse accessible controls and verification techniques when useful. Select
each game's mechanic from its learning goal. Do not clone Chapter 02's puzzle
or build a universal game engine before a recurring need appears.

Mr. Vega's September 19 direction: make future games more creative and move
beyond students' existing simulation labs. A hardware configurator or repair
exercise with an attractive scene is not sufficient. Compare three distinct
game ideas, explain what makes each worth playing, and connect chapter
concepts to choices with visible consequences. See the creative-play standard.
The accepted Chapter 02 and Chapter 03 games remain historical examples,
not a required format for the rest of the course.

## Current releases

[Blackout Broadcast, BPC170 Chapter 04](https://jor2050111.github.io/games/bpc170/ch04/)
was accepted and published September 20, 2026, from runtime commit `a2499ea`.
See its [QA record](bpc170/ch04/QA.md) for local and live verification.

[Breeze Lab, BPC170 Chapter 03](https://jor2050111.github.io/games/bpc170/ch03/)
was accepted and published September 19, 2026, from runtime commit `5610498`.
All five runtime files matched the local release. See its
[QA record](bpc170/ch03/QA.md) for verification and remaining checks.

[Campus Festival, BPC170 Chapter 02](https://jor2050111.github.io/games/bpc170/ch02/)
was published September 18, 2026, from commit `3df82f7`. Its HTML, CSS,
JavaScript modules, and illustration were verified against the local release.
The [QA record](bpc170/ch02/QA.md) separates that verification from checks that
remain outstanding.

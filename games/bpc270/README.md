# BPC270 future game workspace

Status: structure ready, September 20, 2026. No game selected or built.

Start with [AGENTS.md](AGENTS.md), [COURSE.md](COURSE.md), the shared
[workflow](../educational-game-builder/SKILL.md), and
[catalog](../GAME-CATALOG.md). These files supply context without requiring
the conversation that created this folder.

## Future task prompt

> Follow the educational-game-builder workflow for BPC270. Read COURSE.md
> and the shared catalog. Ask which chapter I want if I have not named it.
> Verify that chapter's materials, compare three distinct game concepts,
> and build a locally testable version. Keep publication as a separate step.

Naming a chapter in that prompt removes the intake question. This setup
request does not authorize a future build or publication.

## When a game is requested

1. Verify the chapter title and mapping using COURSE.md and actual materials.
   Read the selected deck and source sections. Do not use titles alone as
   learning objectives or assume every folder's README is current.
2. Check BPC270 folders and catalog reservations. Compare both neighboring
   games in course order. With no neighbors, no family is excluded by rotation.
3. Compare three distinct concepts under the shared creative-play standard.
   Choose two or three concepts that affect play. Record the selected design
   in the shared catalog. Ideas alone are not chapter reservations.
4. Only then create `chNN/` and populate the shared documentation templates.
   Implement a small complete loop with rules, scenario data, and presentation
   separated as the workflow describes.
5. Run rule and browser checks. Record exact results and unmet checks. Present
   the local game for playtesting, then reconcile feedback and documentation.
6. Commit the scoped build. Release and Canvas editing require their own
   authorization and verification under the shared release guide.

## Chapter structure, created only for an authorized build

```text
bpc270/
  AGENTS.md
  COURSE.md
  README.md
  chNN/                 # Future chapter, not created by this setup
    GAME-PLAN.md
    SOURCES.md
    QA.md
    README.md
    index.html
    styles.css
    rules.js
    levels.js
    game.js
    package.json
    tests/rules.test.js
    assets/             # Only when the game needs local assets
    CANVAS-EMBED.html    # Only when a handoff snippet is prepared
```

Reuse [shared templates](../educational-game-builder/templates/). Fill them
with this game's evidence, fix relative links for their destination, and leave
QA checks Pending until performed. Do not copy a sibling's passing results.
The runtime filenames are a useful default, not a requirement to create an
engine, install dependencies, or add empty asset folders.

From the site repository root, future local previews use:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Future preview pattern: `http://127.0.0.1:8765/games/bpc270/chNN/`.
This is a path convention, not an existing playable URL. Inspect an existing
server before reuse. Store browser evidence in the site root's ignored
`output/playwright/<game-name>/` folder and reproducible steps in chapter QA.

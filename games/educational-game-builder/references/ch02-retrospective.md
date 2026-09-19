# Campus Festival retrospective

Reviewed September 19, 2026, against the shipped files, existing QA record,
Mr. Vega's feedback in this task, and the publication verification. This is
process evidence from one game, not a student learning study.

## What shipped

One optional, untimed BPC170 Chapter 02 connection puzzle. Two installations
share a limited inventory of two cables. File size and supported transfer
modes determine whether each target is met. About two minutes is the current
estimate. The build shipped September 18 from `3df82f7`.

The approved early plan proposed a larger progression under eight minutes.
Mr. Vega accepted and published the smaller encounter, then chose to move to
another chapter. The remaining levels are ideas, not unfinished release work.

## Decisions to retain

| Observation | Reusable decision | Concrete example |
| --- | --- | --- |
| Learning produced a visible consequence | Map a concept to an action and outcome before selecting art | A cable fits but misses the mural's transfer target |
| Small playable scope allowed useful review | Build one complete loop before expanding | Two stations and two cables were enough to judge selection and swapping |
| The tiny question mark did not orient students | Show How to play as a prominent label | Gold button plus a short Start here instruction |
| A successful calculation felt too quiet | Design a distinct, accessible win state | Scene transformation, animated title and badge, finite confetti, optional chime |
| The supporting math was useful but below the action | Place collapsible help before or beside decisions | Transfer explanation above the courtyard |
| Complex animation frameworks were unnecessary here | Choose the smallest implementation that serves the effect | Browser animation API and canvas, with effects cancelled on dismissal |
| Rule tests could isolate misconceptions | Separate domain rules from rendering | 11 tests cover shared modes, units, assignments, and winning/losing arrangements |
| A screenshot alone cannot prove play works | Test using actual controls and inspect state | Successful, unsuccessful, keyboard, touch, undo, and blocked-storage runs |
| Canvas sizing advice did not match the final editor outcome | Retain the user-tested snippet and label its scope | `69rem` accepted for Chapter 02, not prescribed for all games |
| Documentation remained at prototype status after release | Update status in all entry documents during closeout | README, plan, QA, catalog, and publication record agree |

## New standing preferences from this review

Within a course, consecutive games must use different primary game families.
Changing cable art or the setting would still create another puzzle. The
catalog now reserves Chapter 02 as Puzzle, which excludes that family for the
next BPC170 game. No Chapter 03 mechanic has been selected.

When a future scene could show Phoenix, Arizona, or Phoenix College, ask for
Mr. Vega's reference images before drawing or generating it. Existing Campus
Festival art is an original generated desert-campus illustration. The artifact
record contains no user-supplied location references. Do not treat it as an
accurate picture of Phoenix College or silently use it as the campus model for
future games. This preference does not require retroactive art changes.

## Boundaries and unfinished verification

- The 2.7 MB illustration exceeded the proposed 2 MB initial asset target.
  Measure and optimize future images. This review does not change the live art.
- The host-bottleneck rule is unit-tested, but the released encounter uses
  fast hosts. It does not demonstrate student transfer to a new slow-host case.
- Automated Chromium and touch emulation are not actual phone, Safari,
  Firefox, Edge, or assistive-technology testing.
- The two-minute estimate and educational value have not been established by
  a representative student pilot. User approval is not evidence of learning gains.
- Publication was verified by deployment status and exact served file bytes.
  No separate live-browser completion test was recorded in the release turn.
- The accepted Canvas snippet is user-reported working. No automated Canvas
  Student View audit was performed.

Keep these limits in the [chapter QA record](../../bpc170/ch02/QA.md). Do not
upgrade them to Passed when copying the workflow to another chapter.

## Practical reuse

Reuse the help/settings patterns, rule/data separation, deterministic test
fixtures, state inspection, reduced-motion behavior, and release verification
when appropriate. Reuse visual assets only when the new scene and permissions
fit. Do not copy this game's runtime into every chapter, impose its file names
on every mechanic, or build a universal engine yet.

The supplied game-building article was useful for experience-first design,
visual iteration, reproducible states, and real-control tests. Its planetary
engine, scale, and hosting examples did not become requirements. Its original
temporary file may disappear. This summary carries forward the applicable
lessons without making that article a dependency for future builds.

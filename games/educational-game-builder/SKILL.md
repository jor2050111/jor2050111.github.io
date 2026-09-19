---
name: educational-game-builder
description: Build and revise short, optional browser games from course chapter materials, with varied mechanics, source-grounded rules, accessible play, local testing, and documented release steps.
---

# Educational game builder

Work from the `games/` directory in this repository. Read this skill for game
work, not ordinary chapter readings or graded quiz authoring. The default
outcome is a polished, locally testable single-page game for Mr. Vega to try.
Publishing and Canvas editing require their own authorization.

## 1. Establish the target and find context

If missing, ask: "Which course and chapter are we building a game for?"
Accept a module name or title when the course does not use chapter numbers.
Normalize a code such as BPC170 to `bpc170`, and Chapter 2 to `ch02`.
Do not assume that a module number equals a textbook chapter number.

Read applicable workspace instructions and the current teaching profile.
Use the existing HQ task workflow when available. Read the selected course's
`COURSE.md`, the catalog, and any existing chapter README before writing.
Use [source discovery](references/source-discovery.md) to locate current
student materials and supporting references. Record paths, sections, dates,
and any discrepancies in the chapter's `SOURCES.md`.

Make progress from verified local sources. Ask only for genuinely missing or
ambiguous course context. Do not ask Mr. Vega to supply paths you can find.
Do not invent missing content from a chapter number or another course.

## 2. Choose learning through play

Select two or three concepts. For each, state the player action, consequence,
and evidence of understanding. Educational reasoning must change what
happens in the game. A multiple-choice worksheet with confetti is insufficient.
Optional, ungraded, individual play and a first run under eight minutes are
defaults. Estimated playtime is provisional until observed. Timers need a
reason tied to play, not artificial urgency. Support untimed access.

Read [the catalog](../GAME-CATALOG.md) and enforce its rotation rule before
choosing a mechanic. Compare both neighboring games in course order.
Choose by the dominant player action, not the theme or implementation library.
For BPC170 Chapter 03, Puzzle is excluded by the shipped Chapter 02 game.

Compare two or three concise concepts and recommend the strongest fit. Use
the [plan template](templates/GAME-PLAN.md) to make the decision reviewable.
When the user requests a build, choose a reasonable direction and build the
first playable interaction without demanding approval of routine choices.
When the user requests only brainstorming or a plan, stop at that scope.
Respect any explicit design review checkpoint already agreed in the session.

## 3. Establish art direction and ask for local references

Describe the visual style, scene, controls, and visible success reward before
spending effort on final art. Keep the tone welcoming and appropriate for
community college students. Do not infer interests from gender.

If the scene could depict Phoenix, Arizona, or Phoenix College, ask Mr. Vega
before generating or drawing it:

> This scene could use Phoenix or Phoenix College imagery. Do you have
> reference photos or images you would like me to base it on? You can attach
> them or give me their local paths. You can also tell me to proceed without
> references using a fictional setting inspired by the area.

This is an image-intake question, not a publication approval. Ask in normal
conversation where attachments are possible. A text-only question tool must
not be used to request uploads. Wait for references or an explicit decision
to proceed without them before producing that location-specific art.
Silence is not permission to invent campus architecture. Continue rules,
layout with neutral placeholders, source research, and tests meanwhile.
If imagery and permission were already supplied for this game, do not ask again.

Inspect the images before using them. Record what should be preserved, whether
the result is a faithful depiction or fictional interpretation, and the allowed
use. Do not add identifiable students or publish source photos by default.
Record references and generated outputs in `SOURCES.md`. Keep private
reference files outside this public repository unless sharing is authorized.
Use the available image-generation skill/tool for raster artwork. Use SVG or
CSS for diagrams and simple effects when clearer. Avoid baking UI text into art.

## 4. Build a complete small loop

Create `games/<course>/<chapter>/`. Copy the documentation templates and fill
them with real decisions. Use a static page with local assets and relative
links unless the mechanic justifies more tooling. One page need not mean one
physical file. Do not add a backend, accounts, analytics, or AI API at runtime
for an optional chapter game without an explicit need and authorization.

Separate subject rules, authored scenario data, and rendering. Check technical
claims before encoding them as rules. Use deterministic fixtures or seeds,
known successful and unsuccessful runs, and inspectable read-only state.
Debug shortcuts cannot substitute for a playthrough with real controls.

Build one satisfying loop first: orient, act, observe, recover, succeed, replay.
Make How to play visible as words. Keep support explanations close to the
action and collapsible. Include useful hints and a clear restart. Let mistakes
teach through specific consequences, not penalties or shaming.

Plan the success state from the beginning. Use a visible scene change plus a
short celebration appropriate to the game. Keep its message until dismissed,
provide static reduced-motion feedback, restore focus, and stop effects on
dismissal or restart. Sound starts off. Use native animation for small live
effects. HyperFrames or Remotion is an optional choice for authored video,
not a required dependency or automatic reason to add a rendering framework.

Build keyboard and touch access with the first interaction. Provide an
alternative to dragging and precision timing. Use readable labels, visible
focus, large targets, text alongside color, and meaningful status announcements.
Storage failure must not prevent play. Measure asset delivery size and optimize
large images before release when possible. Two MB is an initial target, not a
claim that Chapter 02 achieved it.

## 5. Test and iterate with Mr. Vega

Use [the QA template](templates/QA.md). Exercise meaningful subject-rule
boundaries, each authored scenario, the real browser controls, and recovery.
Test desktop and narrow frames, keyboard-only completion, touch emulation,
reduced motion, sound-off play, unavailable storage, and runtime errors.
Include completed and failed states, help, hints, undo where supported,
restart, celebration dismissal, and replay. Inspect visuals as well as DOM.

Use the currently available browser skill and tools. Record exact commands,
browser, viewport, state, expected outcome, and observed result. Do not claim
screen-reader conformance, real-phone testing, learning gains, or a human
playtime estimate based only on automated checks. Mark remaining checks Pending
or Not run with a reason. Keep screenshots in the repository's ignored output
folder, and record paths and commit identifiers in `QA.md`.

Show the local playable URL and ask for feedback about how it feels to play.
Apply concrete browser comments, then retest affected paths and core completion.
Expand only if the agreed scope needs more content. A small game the user
accepts can be the final product. Do not silently turn an early five-level
proposal into unfinished mandatory work.

## 6. Record and release the agreed outcome

Use [release and Canvas guidance](references/release-and-canvas.md).
Keep README, plan status, source record, QA, and catalog consistent with the
actual build. Separate live scope, tested behavior, known limitations, and
deferred ideas. Use the provided [README template](templates/README.md).

Commit scoped work. A new game's prior sibling release does not authorize its
publication. When release is authorized, verify branch settings and pending
commits, push the intended files, wait for deployment, and verify the actual
student URL and runtime assets. Record live gameplay checks separately from
HTTP/hash checks. Prepare a Canvas embed if useful, but do not edit a course
or reuse its ID by assumption. Close the HQ task with paths and evidence.

For lessons behind these choices, read [the Chapter 02 retrospective](references/ch02-retrospective.md).

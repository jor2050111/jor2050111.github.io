# Educational game workflow review

Reviewed September 20, 2026, America/Phoenix. Baseline: `cc31ef6`.
Scope: BPC170 workflow progress and BPC270 agent structure. No game runtime,
slide, Canvas page, or deployment changed in this review.

## Assessment

The workflow is producing complete, documented games and has improved across
three releases. Mechanics rotate, rules have meaningful tests, and Chapter 04
adds live interaction checks beyond file delivery. It is ready to support a
BPC270 build when requested. Student learning and broad accessibility remain
unmeasured, so release success alone does not establish teaching effectiveness.

| Game | Design progress | Fresh rule result | Existing browser/release evidence |
| --- | --- | --- | --- |
| [Campus Festival](bpc170/ch02/README.md) | Puzzle, one accepted encounter | 11/11 passed | Local keyboard/touch, failure/recovery, motion/storage checks. Published file hashes verified. No recorded live playthrough |
| [Breeze Lab](bpc170/ch03/README.md) | Creative sandbox, three discoveries and alternate builds | 12/12 passed | Local full keyboard/touch runs and notebook recovery. Published file hashes verified. No recorded live playthrough |
| [Blackout Broadcast](bpc170/ch04/README.md) | Strategy/management, two shifts with competing production and recovery choices | 15/15 passed | Local access/recovery checks plus live failure, rewind, success, refresh, and final revision checks |

Each chapter contains a plan, sources, QA, README, separated rules/scenarios/UI,
and tracked rule tests. The catalog agrees with current release records.
The accepted three-game sequence is Puzzle → Creative sandbox → Strategy /
management. BPC270 correctly starts an independent sequence.

Chapter 04 best demonstrates the newer creative-play direction. Choosing a
program consumes the same crew needed for recovery and preservation, changing
what can air later. Its tests verify multiple successful schedules in each
shift. Breeze Lab still centers on settings and readings. It remains an
accepted historical game, but should not become BPC270's default interface.
Sources: [Chapter 04 plan](bpc170/ch04/GAME-PLAN.md),
[tests](bpc170/ch04/tests/rules.test.js), and
[creative-play standard](educational-game-builder/references/creative-play.md).

## Findings, ranked by impact

1. **Medium: accessibility and learning validation remain incomplete.**
   All three QA records leave screen readers, physical phones, other browser
   engines, zoom, and student playtime/comprehension unverified. A learner using
   VoiceOver or zoom can encounter behavior the current tests never exercised.
   This is an evidence gap, not a demonstrated conformance failure. Prioritize
   a focused assistive-technology/zoom pass and a small observed student trial
   before making broader access or learning claims. Sources:
   `bpc170/ch02/QA.md:35`, `bpc170/ch03/QA.md:39`, and
   `bpc170/ch04/QA.md:53`.
2. **Medium: browser regression checks are not portable from Git alone.**
   Rule tests are tracked, but browser evidence and the saved Chapter 04 touch
   harness live under ignored `output/playwright/`. A new checkout can run
   `npm test` yet cannot rerun that exact browser harness from tracked files.
   Chapter 04 does preserve manual reproduction steps and explains its
   session-specific TaskSpace dependency. A future improvement is a small,
   tracked browser smoke harness, keeping screenshots and run outputs ignored.
   Source: `bpc170/ch04/QA.md:69` and `git ls-files bpc170`.
3. **Low: first-game asset delivery still exceeds the initial target.**
   Campus Festival's PNG is 2,825,270 bytes, and the seven runtime files total
   2,877,548 bytes before compression. The image alone exceeds the proposed
   2 MB budget and can slow an uncached mobile load. Breeze Lab is 56,663 bytes,
   Blackout Broadcast 53,063 bytes. Image optimization is a separate runtime
   change requiring visual verification and release authorization. Source:
   `bpc170/ch02/assets/festival.png` and `bpc170/ch02/QA.md:43`.
4. **Low, addressed here: workflow entry guidance had stale or ambiguous state.**
   The original workflow validation still described the next chapter as the
   first full trial, the course context treated Chapter 03 as an unreviewed
   source lead, and the skill's chapter intake also appeared to apply to
   setup-only requests. Added a current review link, updated course context,
   separated setup from build intake, and removed a fixed Chapter 03 rotation
   example in favor of the current catalog. Historical QA remains unchanged.

Findings 1–3 are follow-up opportunities, not retroactive rejection of the
accepted games or authorization to expand this task into runtime changes.

## Checks performed in this review

- `npm test --prefix bpc170/ch02`: 11 passed, zero failures.
- `npm test --prefix bpc170/ch03`: 12 passed, zero failures.
- `npm test --prefix bpc170/ch04`: 15 passed, zero failures.
- `node --check` on all 10 chapter runtime JavaScript files: passed.
- Inspected current plans, sources, QA, catalog, file structure, and Git log.
- Confirmed local browser evidence exists. Read Breeze Lab's keyboard result
  and Blackout Broadcast's live result. Parsed their additional saved JSON
  records. Blackout Broadcast records six filled blocks, a saved archive,
  retry/rewind, reset, and no captured runtime errors.
- Compared BPC270's index, all 13 deck titles, and 12 older module headings.
  Read the course outline and sampled Chapter 11 and Chapter 23 material to
  identify intake, version, and assessment boundaries.

The browser/release evidence above comes from prior dated runs inspected here.
No fresh browser playthrough, live URL fetch, screen-reader check, student trial,
or full technical audit of every source claim was performed. Passing rule tests
does not establish that the rendered controls work or that students learn.

## BPC270 structure delivered

- [AGENTS.md](bpc270/AGENTS.md): entry instructions for a task opened in BPC270.
- [COURSE.md](bpc270/COURSE.md): verified source map and sequence boundaries.
- [README.md](bpc270/README.md): future prompt, build steps, and folder contract.
- Shared skill, templates, and catalog remain the single workflow. No second
  engine, copied template set, game selection, or chapter reservation was added.

BPC270's index points to shared Module 1, then Chapters 11–23. Older modules
11–22 exist. Chapter 23 lacks an older module in that collection. Chapter 24
has no local deck there. These gaps remain explicit instead of being filled
with guessed objectives. No chapter folder or game asset was created.

## Structure validation

Completed before committing:

- 72 relative Markdown links resolve across all nine new/changed documents.
- All 13 deck titles and 12 older module headings match the BPC270 source map.
- Shared Module 1 exists. Missing Chapter 23/24 source boundaries match disk.
- No BPC270 chapter folder, catalog game row, or unfilled template token exists.
- `git diff --check` passes.
- All 36 tracked existing BPC170 chapter files remain byte-identical to
  baseline `cc31ef6`, including runtime assets, tests, and chapter documents.

The initial comparison included an untracked Finder `.DS_Store` file and stopped
because that file has no Git baseline. Rerunning against `git ls-files` passed
for all tracked chapter files. No file was deleted or changed to make it pass.

The following future requests were desk-checked against the new entry guidance:

| Request | Expected path |
| --- | --- |
| Set up BPC270 workflow | Update guidance only, no chapter question or game |
| Build a BPC270 game | Ask only for chapter |
| Build BPC270 Chapter 12 | Read ch12/module12, inspect neighbors, compare concepts, build locally |
| Build BPC270 Module 1 | Verify shared introduction and course mapping before planning |
| Build BPC270 Chapter 24 | Search actual course sources, clarify only if still missing |
| Publish a completed game | Verify that game's authorization and the full pending release range |

These are document decision-path checks. A fresh independent Codex build from
the BPC270 scaffold has not run because no BPC270 game was requested.

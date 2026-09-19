# Workflow validation

September 19, 2026. Documentation and intake review. No new game or Canvas
page was built by this validation, and no independent agent trial was run.

## Artifact checks

- Skill frontmatter and required fields checked with the skill-creator
  `quick_validate.py` helper. Use a Python environment with PyYAML. The system
  and bundled Python environments lacked it, so validation used `uv run
  --with pyyaml` without adding a dependency to the game.
- Relative Markdown links checked against the local filesystem.
- The populated Chapter 02 embed parsed with Python's HTML parser. Verified
  one iframe, the correct URL, descriptive title, `69rem` height, and a matching
  new-tab link with `noopener`. No template tokens remain in that snippet.
- All seven Chapter 02 runtime files compared byte for byte with `3df82f7`.
  Documentation work leaves the playable build unchanged.
- Student URL returned HTTP 200 and matched released `index.html`.
- Git whitespace check completed before commit.

## Scenario review

These are desk checks of the written decision paths, not claims that a fresh
Codex session has executed every branch.

| Starting request | Expected decision path in the workflow |
| --- | --- |
| "Build the next game" from `games/` | Read AGENTS, ask course and chapter, do not assume BPC170 from the catalog |
| "Build BPC170 Chapter 03" | Read BPC170 course map, verify actual ch03/module03 content, inspect catalog, exclude Puzzle, make a local playable version |
| "Build a CIS133 chapter game" with chapter missing | Ask only for chapter, locate the actual course materials, create its course map, do not inherit BPC170's mechanics or CompTIA credit |
| Insert a game between two existing course games | Compare both closest neighbors by course sequence, including reserved designs, not build date |
| Chapter 03 had no game and Chapter 04 is next | Chapter 02 is still the prior game, so Puzzle remains excluded |
| New art direction shows a Phoenix College courtyard | Ask for reference images before producing that scene, continue rules/tests with neutral placeholders while awaiting the answer |
| User says "proceed without reference images" | Use a fictional local interpretation and record the response, without claiming campus accuracy |
| A source file or course mapping is missing | Try the course's metadata/location guidance, then ask for the missing source instead of inventing objectives |
| "Build a testable game" after Chapter 02 was published | Commit a local build, do not inherit publication authorization from Chapter 02 |
| User accepts one encounter from a larger initial plan | Update actual scope and status, retain extra encounters as optional ideas |

## Next validation opportunity

The next actual chapter build is the first end-to-end trial of this extracted
workflow. Record where it required extra clarification, repeated context
searches, or unnecessary ceremony. Make narrow improvements from that evidence.
Do not replace human playtesting or browser checks with this document review.

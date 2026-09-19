# BPC170 Chapter 02: Optional browser game plan

Design direction approved September 18, 2026. Current release status updated September 19, 2026.

**Outcome:** Mr. Vega approved and published the two-installation encounter as *Campus Festival* on September 18, commit `3df82f7`. The current release takes about two minutes, provisionally. The larger progression below is the original design proposal, retained as context and optional expansion ideas. It is not a list of unfinished release requirements. See [README.md](README.md), [QA.md](QA.md), and [the reusable workflow](../../README.md) for current status.

**Original recommendation:** Build *Signal Festival*, a short, untimed connection puzzle. The shipped title is *Campus Festival*. Players arrange a limited set of cables, test their choices, and bring an illustrated campus festival to life. Correct hardware reasoning is how players solve the puzzle.

Mr. Vega approved this plan, the Campus Festival setting, and a target under eight minutes. Play is untimed by default. A timer may be considered only if playtesting shows it improves engagement. Individual play, phone and laptop support, and no grades remain the scope. The first-encounter review occurred, followed by orientation and celebration revisions and publication. Additional levels were not requested for the accepted release.

## 1. Purpose and scope

Give students a reason to experiment with three Chapter 02 ideas:

1. A connector's shape does not establish its capabilities.
2. A compatible transfer path is limited by its slowest participating link.
3. File sizes use bytes, while connection rates commonly use bits per second.

The chapter covers motherboard installation and legacy interfaces too. This first game deliberately selects the cable and transfer material. Board installation, ESD procedures, component repair, and comprehensive exam review remain outside its scope.

The intended game directory is this folder:

`/Users/vega/Documents/code/jor2050111.github.io/games/bpc170/ch02/`

The student URL is [the live Chapter 02 game](https://jor2050111.github.io/games/bpc170/ch02/). See `README.md` for the preview command and current scope. Sections 2 through 11 retain the original proposal and research, with planned features distinguished by the current-outcome note above.

## 2. What the sources suggest

The [current slides](https://jor2050111.github.io/slides/bpc170/ch02/) supply a useful progression: the slow-copy warm-up, bits and bytes, connector shapes, then transfer speeds. Slides 3 and 5–7 are the strongest foundation for this game. The local HTML and live response had identical SHA-256 hashes during this review.

The supplied article recommends starting with the player experience, iterating on a small playable interaction, and exposing repeatable test states. Those practices fit this project. Its large 3D worlds, rendering systems, and Sites deployment example are reference material, not requirements for this game.

[Habgood and Ainsworth's study](https://shura.shu.ac.uk/3556/) supports putting the learning inside the play mechanics. Its participants were children learning mathematics. It offers a design rationale, not proof that our game will engage community college students or improve their learning.

[USB-IF guidance](https://www.usb.org/sites/default/files/usb_type-c_language_product_and_packaging_guidelines_20230320.pdf) distinguishes connector form from performance and describes slower USB 2.0 operation when a compatible connection includes a USB 2.0 component. This supports both the first concept and the bottleneck mechanic.

[Game Accessibility Guidelines](https://gameaccessibilityguidelines.com/full-list/) support simple controls, interactive instruction, contextual help, and alternatives to precise timing. The game should make thoughtful choices satisfying without requiring fast hands.

## 3. Concept choices

| Concept | What students do | Strength | Concern |
| --- | --- | --- | --- |
| **Signal Festival: recommended** | Allocate cables across small media stations and watch the festival scene develop | Visible rewards, short puzzles, strong fit to the slow-copy lesson | Must feel like a puzzle toy, with discovery and meaningful choices |
| Signal Outpost | Use the same connection rules to prepare exploration drones | Strong visual identity and playful setting | Story can obscure which hardware rules are real |
| Motherboard Mosaic | Fit board and expansion shapes into a compact spatial puzzle | Direct spatial reasoning about form factors and slots | Can drift toward the installation exercises students already have |

These are directions to discuss, not three games to build. The recommendation is one cohesive game with a small set of puzzles.

## 4. The player experience

The opening screen shows a compact illustrated campus festival at dusk. Three installations await their media: an animated mural, a music stage, and a projection garden. Successful puzzles add movement and detail to the scene. Music is optional and off until enabled.

The student-facing invitation is short:

> Bring the festival to life. Pick your connections, test your plan, and see what changes. About 5–8 minutes. Optional practice, no course points.

Players inspect a source, cable, and destination. Each has a readable specification label. They select a cable, then its endpoints. A **Test** button runs a short visual preview and reports the result. **Undo**, **Try again**, and **Hint** remain available.

The challenge comes from limited inventory and competing needs. Assigning the fastest cable to a small transfer may leave a large transfer waiting. Players can rearrange everything and try again. More than one valid arrangement should be accepted when the rules allow it.

All planning is untimed. Any completion target belongs to the simulated transfer, not the student's response time. A 33-second transfer is previewed briefly with its calculated duration displayed. Students never need to sit through a deliberately slow copy.

This is a puzzle board with a changing scene. It has no service tickets, repair checklist, component disassembly, or procedural installation scoring.

### One concrete encounter

A festival station needs a 2 GB media pack. Its host and destination support 10 Gbps USB transfers. Two cables look alike. One supports 480 Mbps, and the other supports 5 Gbps.

The player tries the first cable. The preview moves slowly and marks that cable as the limiting link. A brief explanation appears: "These connectors fit. This cable limits the transfer to 480 Mbps."

The player swaps the cable and tests again. The new ideal transfer estimate is 3.2 seconds, compared with about 33 seconds before. The installation displays the completed artwork.

The next encounter changes the host to a 480 Mbps port. Swapping cables alone no longer helps. That change checks whether the player understood the relationship.

The visible formula, available when wanted, is:

`2 GB × 8 = 16 Gb; 16 Gb ÷ 5 Gbps = 3.2 seconds`

The interface explains that these are ideal estimates. Actual copies take longer. It offers the conversion tool instead of requiring mental arithmetic for every move.

## 5. Learning built into play

| Learning target | Player action | Feedback | Evidence of understanding |
| --- | --- | --- | --- |
| Distinguish fit from capability | Inspect labels on matching USB-C connectors and select a suitable cable | A fitting connection may still be too slow for the stated transfer target | Solve a new arrangement where the shapes stay the same but the specifications change |
| Identify a limiting link | Reassign cables or choose another available port | The host, cable, or destination that sets the limit is identified after a test | Improve a transfer when the limiting component changes between puzzles |
| Relate bytes to bits | Compare file sizes with rates using an optional conversion strip | Show GB to Gb conversion and an ideal completion estimate | Allocate scarce capacity sensibly when one file is substantially larger |

The third target is a small supporting mechanic. If early playtests show too much reading or arithmetic, ship the first two targets and retain the conversion only in the explanation panel.

### Proposed progression

| Encounter | New idea | Intended time |
| --- | --- | --- |
| First connection | Learn selection, test, and undo through one guided action | 30–45 seconds |
| Same shape, different result | Compare two USB-C cables with different declared rates | About 1 minute |
| Fast cable, slow port | Discover a host bottleneck | About 1 minute |
| Small file, big file | Use the bytes-to-bits aid to compare transfer needs | About 1 minute |
| Festival finale | Allocate a limited cable set across three independent transfers | 2–3 minutes |
| Replay or finish | Try one handcrafted alternate finale or read the short recap | Optional |

The total is a target to validate through play, not a promised duration. Use five encounters and one alternate finale before considering procedural levels.

### A solvable finale fixture

For an initial test fixture, all three independent host-device pairs support 10 Gbps. Each uses its own controller and compatible USB-C endpoints. Available cables are one 5 Gbps cable and two 480 Mbps cables. All equipment capabilities and file sizes are visible.

| Station | File size | Ideal target | Working assignment | Ideal result |
| --- | --- | --- | --- | --- |
| Mural | 2 GB | Within 4 seconds | 5 Gbps cable | 3.2 seconds |
| Stage | 0.5 GB | Within 10 seconds | 480 Mbps cable | About 8.33 seconds |
| Garden | 0.05 GB | Within 2 seconds | 480 Mbps cable | About 0.83 seconds |

The two slower cables are interchangeable. A faster cable cannot improve a separate slow host or destination. The scene reward represents completed media delivery, not data cables supplying electrical power to the festival.

## 6. What makes it worth playing

- Visible transformation after each success, with the finale combining earlier rewards.
- Short test-and-revise cycles with a satisfying response to every action.
- Limited resources that create a decision beyond selecting the largest number.
- A gradual reduction in hints, with help always available.
- An alternate finale that tests understanding through new values and positions.
- A finish state students can reach without perfect first attempts.

Avoid public rankings, penalties for hints, lives, punitive sounds, and reflex scoring. Completion and optional optimization provide enough structure for this pilot.

Use a welcoming illustrated style with mature typography and restrained humor. Include varied people if characters appear. Do not infer interests from gender or require familiarity with gaming conventions. The quality target is a small, polished puzzle that feels responsive and complete.

## 7. Accuracy boundaries

The source material is useful instructional context, but individual hardware claims must be checked before turning them into rules.

- Treat USB-C as a connector description. Store supported protocols and rates separately.
- Validate endpoint fit and compatible supported modes before computing a transfer rate. A universal `min()` across arbitrary devices would accept invalid connections.
- For the curated USB scenarios, use the highest mode supported by the complete connection. Then apply the ideal transfer calculation.
- Use decimal GB, Gb, Mbps, and Gbps consistently. Explain uppercase B versus lowercase b.
- The slides' 20 GB example gives about 333 seconds at 480 Mbps, or 5 minutes 33 seconds, before overhead. Use "about six minutes" only as a rough comparison, not an exact answer key.
- Restrict the pilot to independent transfers with stated capabilities. Shared hub bandwidth, storage throughput, power negotiation, adapters, Thunderbolt, and display transport add complexity beyond these puzzles.
- Do not imply that cable color proves speed or that USB-C guarantees video, a particular power level, or Thunderbolt.
- Use original art and connector diagrams. Keep the supplied article and course reference assets out of the public game package unless reuse rights are established.

These boundaries apply to the proposed game. This task does not revise the existing slides or reference documents.

## 8. Accessibility and device support

Target WCAG 2.1 AA and adopt the additional WCAG 2.2 guidance on [alternatives to dragging](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html).

Use native HTML controls for all decisions. The illustrated board can use SVG, while a readable connection list exposes the same state and actions. Both views operate the same game.

Support keyboard-only completion, visible focus, tap-select/tap-connect, clear status announcements, and screen-reader access to labels, results, hints, and undo. Dragging may be added as a convenience later. It must never be required.

Use text and shape alongside color, large touch targets, readable contrast, reduced motion, a static preview option, and persistent sound settings. Avoid flashing. Test portrait phones, small laptops, zoom, and VoiceOver with the full puzzle, not only the start screen.

No login, names, email addresses, gradebook, or custom tracking are needed. Save only settings and optional progress in the browser. If storage is blocked or unavailable, the game must still work for that session.

## 9. Technical approach and publication

Use HTML, CSS, JavaScript modules, and SVG for this first puzzle. A 3D engine would add work without improving the chosen interaction. Separate the game rules, level data, and presentation so we can test each part and change the theme later.

Planned files:

```text
games/bpc170/ch02/
  index.html
  styles.css
  game.js
  rules.js
  levels.js
  assets/
  tests/
  README.md
  GAME-PLAN.md
```

One page can contain an opening screen, puzzle states, and a finish screen without page reloads. It need not be one physical file. Use relative asset paths and no runtime CDN or external API dependency. Initial transferred assets should aim below 2 MB, subject to measurement.

[GitHub Pages serves static HTML, CSS, and JavaScript](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages). The repository's Pages API currently reports a built site, publishing from `main` at `/` with the legacy build type. No games directory existed before this plan. Verify those settings again when releasing.

Build and review locally first. After Mr. Vega selects the design and authorizes the release step, publish the tested files through the existing repository process. Verify the exact trailing-slash URL, assets, refresh behavior, touch controls, and a complete playthrough on the live site. Canvas linking is a separate later action.

## 10. Build in reviewable stages

1. **Choose the experience.** Confirm theme, duration, and whether the third learning target earns its complexity. Produce one visual mockup with the intended controls and real chapter terminology.
2. **Build one playable encounter.** Implement two transfers competing for one fast cable, test, undo, hints, and a scene reward. Include keyboard and touch controls immediately. Mr. Vega plays it before more levels are made.
3. **Judge the interaction.** If the choices feel obvious, repetitive, or worksheet-like, revise the mechanic. More art cannot fix an uninteresting decision.
4. **Complete the short game.** Add the planned progression, alternate finale, coherent art, optional audio, local progress, and the recap.
5. **Verify and pilot.** Run rule tests and browser checks. Arrange a small voluntary playtest through Mr. Vega, then revise from observed behavior.
6. **Publish and verify.** Release the reviewed build to the requested address, check it live, and record the tested version.

Borrow the article's testability practice at this scale: named puzzle fixtures, deterministic outcomes, and inspectable development state. Automated browser tests must also use the real controls. Loading a solved fixture alone does not test gameplay.

## 11. Definition of ready

**Correctness:** Test incompatible endpoints, same-shape/different-rate cables, host and destination bottlenecks, unit conversion, multiple valid solutions, inventory reuse prevention, undo/reset, completion logic, and unavailable browser storage. Every authored puzzle must have a verified solution.

**Usability:** Complete a full run using only keyboard and only touch. Check phone portrait, laptop layout, zoom, reduced motion, sound-off play, and screen-reader announcements. No clipped controls, dead ends, or console errors.

**Educational value:** A fresh final arrangement should require the same reasoning with changed labels or values. In a voluntary pilot, ask players to explain what limited one transfer and what the cable change accomplished. A celebratory screen by itself is not evidence of learning.

**Enjoyment:** Observe whether players experiment, understand the reward, and voluntarily try the alternate finale. Ask what felt satisfying and what felt like homework. Do not assume enjoyment from time on page.

Suggested pilot: 5–8 volunteers with varied gaming experience and device use. Desired early signals are that most can start without instructor explanation, finish in the target window, and explain the bottleneck in an unfamiliar example. Treat this as formative feedback, not a causal study of learning gains. Keep observations anonymous and outside the game.

## 12. Chapters 03–10

Chapter 02 now supplies a documented example of accessible controls, testing, and deployment. The reusable workflow has been extracted. Shared runtime components should be extracted only after later games demonstrate a recurring need. A representative student pilot remains unperformed.

Future chapters must use different primary game families for consecutive games within the same course, as requested September 19. Read [GAME-CATALOG.md](../../GAME-CATALOG.md) before selecting a mechanic. Ask Mr. Vega for reference images before producing a new scene that could depict Phoenix, Arizona, or Phoenix College. These rules and the full cross-course process now live in [the workflow](../../educational-game-builder/SKILL.md). Do not build a universal chapter-game engine before learning which parts students enjoy and which abstractions hold up.

## Source record

- User-supplied article: `/Users/vega/Desktop/temp-to-delete-later/article-gpt-astra-games.md`.
- Source module: `/Users/vega/Documents/code/co-professor/01-teaching/01-bpc170-hardware-config/bpc170-old-reference-docs/modules/module02/module02.md`, especially Lesson 2A, Interfaces, Binary Data Storage and Transfer Units, USB Connector Types, and USB Standards.
- Local slide deck: `/Users/vega/Documents/code/jor2050111.github.io/slides/bpc170/ch02/index.html`.
- Live/local deck SHA-256 on review: `92578395faade0b6f8186c87b4b482cc1da07544bbc03a8aac753895d0f3afc5`.
- Current Pages settings: `gh api repos/jor2050111/jor2050111.github.io/pages`.
- Teaching preferences checked against `/Users/vega/Documents/code/co-professor/_Reference/Vega-AI-Workflow-Profile.md` and the supplied current working instructions.
- External research is linked beside the relevant claims above.

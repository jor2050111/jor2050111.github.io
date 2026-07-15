# HTML Slide Deck Project Instructions

These instructions apply to every file under `slides/`. Follow the repository
and global instructions too. When rules differ, use the most specific current
instruction.

## Project contract

- Build browser-based Phoenix College classroom decks.
- Preserve the shared runtime in `shared/deck.css`, `shared/brand.css`, and
  `shared/deck.js`.
- Keep decks in `slides/<course>/<chapter>/index.html` with local assets beside
  the deck.
- Draft by default. Do not deploy, publish, or push changes unless the user asks.
- Do not replace this architecture with a self-contained slide framework or a
  third-party template runtime.

## Read before authoring

Read these files before creating or revising a deck:

1. `README.md`
2. `shared/visual-style.md`
3. The target course landing page and the nearest completed chapter deck
4. `shared/brand.css` when choosing or changing a palette
5. `../scripts/validate-decks` before changing shared behavior or markup rules

Preserve unrelated changes in the worktree.

## Define the communication job

Before selecting layouts or visuals, write one internal planning sentence:

> By the end, [audience] should [understand or do] because [central takeaway].

Then identify:

- The course level and students' likely prior knowledge
- The delivery mode and time available
- The opening question or problem
- The evidence, examples, and practice students need
- The final application, decision, or action

Default to a live, instructor-led classroom deck that still communicates its
main claims when students review it without narration.

## Build a teaching narrative

- Give each slide one teaching job and one main message.
- Use a claim, question, or action as the title. Avoid topic labels such as
  "Results" or "Background" when a clear takeaway is available.
- Make the sequence cumulative. Each slide should answer a question from the
  prior slide or create the need for the next one.
- Use this classroom arc unless the content calls for another structure:
  context or hook, learning target, concept progression, guided practice,
  application, retrieval check, and next action.
- Use one minute per slide as a planning check, not a fixed quota. Split any
  slide that needs several minutes or contains competing messages.
- Introduce a complex process in stages before showing the complete model.
- Put essential meaning on the slide. Put delivery cues, timing, examples to
  say aloud, and optional detail in `data-notes`.
- Keep planning language and production notes out of visible slide copy.
- End by resolving the opening question through synthesis, application, an exit
  ticket, or a clear lab handoff. Do not end on an unframed detail.

## Control content density

- Prefer short, audience-facing phrases over paragraphs.
- Remove content that the presenter will not discuss or students do not need.
- Keep the title slide minimal.
- Use the shared type scale. Split content before reducing font size.
- Never allow a one-line title or banner to wrap unexpectedly.
- Use panels only when they clarify comparison, sequence, or grouping. Do not
  make every slide a grid of interface-like cards.
- Keep supporting details in notes or clearly labeled appendix slides when they
  would overload the main lesson.

## Select visuals with purpose

- Use a visual when it explains, demonstrates, compares, or focuses attention.
- Prefer one strong visual over several decorative elements.
- Avoid generic stock photos and unrelated icons.
- Use one icon or illustration style throughout a deck.
- Keep visual treatments consistent across photos, diagrams, and generated art.
- Add concise visible credit for external images, quotations, and data. Record
  the full source in notes or a source slide when needed.
- Never invent a quotation, source, statistic, person, or outcome.

For data slides:

- State the insight in the title.
- Show one main comparison or trend per chart.
- Use an accent color to focus attention and keep other marks neutral.
- Label important values directly when that improves reading.
- Do not paste spreadsheet screenshots.
- Explain what the evidence means and why it matters to students.

## Apply the visual system

- Start with `phoenix-classic` unless the topic supports another palette in
  `shared/visual-style.md`.
- Keep one palette and a small set of recurring layout cues for the full deck.
- Use asymmetry, depth, texture, or bold type only when they reinforce the
  lesson. Treat visual trends as options, not requirements.
- Use motion only to reveal a sequence, show change, or direct attention.
- Keep key content understandable when motion is unavailable.
- Do not auto-advance slides.
- Keep lesson-critical assets local when licensing allows.
- Add a static backup slide for any video, live site, or interactive demo that
  could fail in the classroom.

If the user requests a new visual direction, create up to three title-slide
previews with real deck content. Make the choices meaningfully different. Do
not place template names, option labels, or process notes inside the preview.
After the user chooses, extend one coherent system across the deck.

## Meet the accessibility baseline

- Target WCAG 2.1 AA contrast. Use at least 4.5:1 for normal text and 3:1 for
  large text and essential graphic boundaries.
- Do not rely on color alone. Pair color with a label, position, pattern, or
  icon.
- Give meaningful images concise alt text. Use empty alt text for decorative
  images.
- Give custom diagrams a useful accessible name with `role="img"` and
  `aria-label` when native text does not provide the same meaning.
- Keep DOM order aligned with reading order.
- Preserve visible focus, keyboard controls, touch targets, reduced-motion
  support, and mobile safe areas.
- Preserve the current narrow-screen behavior. Slides may reflow and scroll so
  students can access all content on a phone.
- Avoid flashing, rapid motion, all-cap paragraphs, underlining for emphasis,
  and long italic passages.

## Use the repository workflow

From the repository root, scaffold a deck with:

```bash
./scripts/create-deck cis215 ch02 "Data Collection and Preparation"
```

The script must not replace an existing chapter. After authoring:

1. Add the chapter to its course landing page.
   - Give the chapter card a `data-card-palette` value that exactly matches the
     deck's `data-palette` value.
   - Use the shared catalog card system to carry that palette into the card's
     surface, accent, action, and focus treatment. Each card should feel tied to
     its deck while the card layout, spacing, typography, and interaction stay
     unified with the course landing page.
   - When a deck palette changes, update its landing-page card in the same
     change. Do not leave a new or revised chapter with the default card colors.
2. Add a new course to `slides/index.html` when needed.
3. Run `./scripts/validate-decks`.
4. Serve the repository through a local web server.
5. Inspect every slide at full size, not only in a contact sheet.

## Required QA

Check the complete deck at desktop 16:9, a smaller laptop viewport, and a phone
viewport. Verify:

- One active slide at startup
- No overflow, clipping, overlap, or unexpected title wrapping
- Readable charts, code, tables, labels, citations, and figure text
- Working keyboard, touch, navigation, history, notes, and reveal controls
- Logical focus order and useful accessible names
- Accurate notes and timing that add up to the class period
- Working local assets and links
- Useful mobile reflow and scroll behavior
- Reduced-motion behavior
- Consistent palette, typography, spacing, icon style, and source credits
- No machine-specific paths, placeholders, or internal production text

Fix all unintended layout and runtime issues before delivery.

## Third-party reference boundary

The `zarazhangrui/frontend-slides` project may serve as design research. Its
visual preview process, progressive template inspection, and rendered-slide QA
are useful ideas. Do not install or apply its runtime by default. Its single-file
output, fixed non-reflowing phone stage, external font rules, and Vercel workflow
conflict with this repository. Translate useful design ideas into the local
Phoenix College tokens, components, and GitHub Pages workflow.

If a third-party template library is consulted, inspect its index first, then
review only the shortlisted previews. Read the full design instructions for the
selected reference only. Do not copy demo content or load a full template pack
into this repository.

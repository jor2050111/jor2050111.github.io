# Slide quality standard (Phoenix College decks)

You are building or revising a deck in slides/<course>/<chNN>/.
AGENTS.md and shared/visual-style.md stay authoritative. This standard
sets the execution bar. Serve the repo locally and VIEW each canonical
slide below in a browser before authoring. Do not calibrate from
markup alone.

## Canonical slides (the bar)

- /slides/cis133/ch04/#slide-15  hex pairs tinted in the headline, key
  rows restate them, light-mixing illustration carries the concept
- /slides/cis133/ch08/#slide-3   three device widths on one test bench,
  bold tinted lead-ins
- /slides/cis133/ch07/#slide-12  taped wireframe print, caption states
  the takeaway, not a description
- /slides/cis133/ch12/#slide-12  client, receiver, database relay with
  gold term lead-ins and one-line definitions
- /slides/cis133/ch09/#slide-4   POUR rows: colored monogram tile,
  term, short definition
- /slides/cis133/ch03/#slide-11  rotated stamp-label chips as category
  headings instead of plain headers
- /slides/cis215/ch01/#slide-12  code cell vs Markdown cell panels,
  syntax-colored code blocks
- /slides/cis215/ch02/#slide-8   Jupyter cell mockups with [ ]:
  gutters, mode borders, blinking caret, 3D keycaps
- /slides/cis215/ch03/#slide-13  if/elif ladder, score 85 traced,
  winner chip gold, skipped branches dashed and dimmed
- /slides/cis215/ch04/#slide-15  predict the row counts, then a
  Reveal answer button
- /slides/cis215/ch05/#slide-13  CSS bar chart, gold focus bar, direct
  value labels, claim in the title, the groupby line below
- /slides/cis215/ch06/#slide-16  'West', 'west', '  WEST  ' flow
  through .str.strip and .str.title into one clean category

## Ten patterns

1. Mechanism made visible. When a slide teaches a process, structure,
   or transformation, build ONE visual that enacts it: a flow, ladder,
   relay, or scene in which the change happens. Every visual must
   explain, compare, demonstrate, or focus attention. The only
   exception is the chapter motif in the background. A text-panel
   grid describing a mechanism is below the bar.
2. Spatial correspondence. Arrange elements in the order the content
   runs. Pipelines and transformations read left to right from messy
   to clean. Decision chains and code execution read top to bottom.
   Hierarchies place the parent above its children. Position teaches
   the sequence, and the aria-label narrates the same order.
3. Semantic color. Tint a term, pair, bar, or chip only to bind it to
   a role, state, syntax, or relationship. Repeat that exact color
   wherever the item reappears in labels, keys, and explanations.
   Pair every color with a label, shape, or position. Use the
   functional colors (success green, danger red) only with their
   meanings. No decorative recoloring.
4. Heading as demo. When the claim can demonstrate itself, let it:
   color the pairs inside the hex code, put the two keys in the two
   sentences. The title is the first diagram.
5. One traced value. Ground each concept slide in one concrete value
   and follow it through: a score of 85, $442.23, three messy
   spellings of West. No generic placeholders.
6. Concrete technical objects. Rebuild tool surfaces (notebook cells,
   keycaps, browser chrome, address bars, terminal prompts) as small
   CSS constructions in deck colors, faithful enough that students
   recognize the tool they use. Draw technical objects in their
   canonical shapes: database cylinder, server rack, record card,
   window chrome. Screenshots are banned for lesson-critical UI.
7. Quiet wayfinding. Every slide carries the compact corner label:
   COURSE · section number when the slide maps to the textbook,
   COURSE · short topic otherwise. One corner per course, consistent
   for the whole deck, never louder than the content. Keep the slide
   count and progress line.
8. Predict, commit, reveal. About every 5-7 instructional minutes,
   when the content supports one, add a low-stakes check: students
   commit to a prediction, then a Reveal answer button shows the
   result plus a one-line why. Use the shared reveal control. Never
   force a quiz onto content that lacks a real prediction.
9. Framed evidence, takeaway caption. Mount illustrations in the
   chapter's frame device (taped print, browser window, bench). The
   figcaption states the conclusion the student should keep. Custom
   diagrams get role="img" and an aria-label that narrates the same
   story.
10. One chapter motif. Give each chapter a single physical metaphor
    tied to its topic and carry it through backgrounds, frames, and
    the brand glyph. Paint corner art as background layers, never as
    positioned boxes (positioned overflow creates a focus scroll
    trap).

## Course identity

- CIS133 leans tactile: paper, tape, desks, benches, doorways, device
  scenes. The craft of building pages should feel physical.
- CIS215 leans kinetic: flows, transformations, decision logic,
  charts, and code-to-result pairs. Data should feel like it moves.
- Crossing over is allowed when the teaching job calls for it. The
  content device stays true to the course even when the texture
  borrows.

## Implementation idioms

- Code: pre.code with span classes keyword, function, string,
  comment. Show real, runnable lines. Important code targets 24-28 px
  at 1920x1080. The shared .code scale delivers this. Never downsize
  code locally to make it fit. Split the example or the slide.
  Gutter labels and small chips may sit below the target.
- Term lists: bold tinted term, then a definition of ten words or
  fewer. One line per term.
- Data slides: claim in the title, accent on the one mark that proves
  it, direct value labels, the producing code line beneath the chart.
- data-notes carry timing, talk track, and the visual credit line.

## Process

1. Plan content first per AGENTS.md (teaching job, one message per
   slide). Then storyboard: for every slide, write the pattern that
   carries it. If no pattern fits, redesign the slide before building.
2. Not every slide needs a signature visual, and no card grid repeats
   deck-wide. Every slide needs patterns 3, 5, and 7 as hygiene.
   Each concept cluster needs at least one pattern-1 or pattern-6
   slide, and each deck needs at least one pattern-8 check. Variety
   follows the teaching job.
3. QA per AGENTS.md at three viewports. Zero unexpected title wraps,
   zero overflow, reveal and keyboard controls working, reduced
   motion respected.

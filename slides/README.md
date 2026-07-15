# HTML Presentation Library

This directory contains browser-based classroom presentations. Shared styles and controls keep each course deck consistent while allowing course-specific content.

Future agents must read `AGENTS.md` and `shared/visual-style.md` before creating
or revising a deck. `AGENTS.md` defines the authoring, accessibility, and QA
contract. This README explains the repository workflow.

## Published pages

- Presentation library: `https://jor2050111.github.io/slides/`
- CIS133 presentations: `https://jor2050111.github.io/slides/cis133/`
- CIS133 Chapter 1: `https://jor2050111.github.io/slides/cis133/ch01/`
- CIS215 presentations: `https://jor2050111.github.io/slides/cis215/`
- CIS215 Chapter 1: `https://jor2050111.github.io/slides/cis215/ch01/`

## Directory pattern

```text
slides/
├── AGENTS.md
├── index.html
├── cis133/
│   ├── index.html
│   └── ch01/
│       ├── assets/
│       └── index.html
├── cis215/
│   ├── index.html
│   └── ch01/
│       ├── index.html
│       └── previews/
└── shared/
    ├── brand.css
    ├── catalog.css
    ├── deck.css
    ├── deck.js
    └── visual-style.md
```

Use a lowercase course slug and chapter slug for each deck. For example, Chapter 2 belongs in `slides/cis215/ch02/`.

## Choose a brand palette

New decks start with `phoenix-classic`. Choose one of six brand palettes by
changing the `data-palette` value on the deck's `body` element:

```html
<body data-deck-title="CIS215: Data Preparation"
  data-palette="twilight-data">
```

Available values are `phoenix-classic`, `midnight-gold`, `twilight-data`,
`canvas-light`, `canyon-sand`, and `golden-hour`. See
`shared/visual-style.md` for the color map, selection guidance, and contrast
rules. Keep one palette for the full deck and match the page's `theme-color`
meta value to that palette's dark field.

## Create and check decks

From the repository root:

```bash
./scripts/create-deck cis215 ch02 "Data Collection and Preparation"
./scripts/validate-decks
```

The creation script will not replace an existing deck. Add the new chapter to the course landing page after you finish its content.

## Authoring workflow

### 1. Define the deck's job

Write one internal planning sentence before choosing layouts:

> By the end, [students] should [understand or do] because [central takeaway].

Identify the course level, class length, prior knowledge, opening question,
practice students need, and final application.

### 2. Plan the learning progression

Build a cumulative sequence instead of a list of topics. A common classroom arc
is:

1. Context or opening question
2. Learning target
3. Concept progression with concrete examples
4. Guided practice or retrieval checks
5. Application or lab handoff
6. Exit ticket or synthesis

Give each slide one teaching job. Use a claim, question, or action as its title.
Use one minute per slide as a pacing check and split slides that carry competing
messages.

### 3. Scaffold and select a palette

Create the chapter with `./scripts/create-deck`, then choose one palette from
`shared/visual-style.md`. Preserve the shared runtime and course directory
pattern. Do not copy a third-party slide runtime into a chapter.

### 4. Author content and notes

- Write visible copy for students.
- Keep the main claim understandable without narration.
- Put timing, prompts to say aloud, and optional detail in `data-notes`.
- Use meaningful visuals and accessible names.
- Credit external images, quotations, and data when you add them.
- Split content before shrinking type.
- Use motion only to explain sequence, change, or focus.

### 5. Validate and inspect

Run `./scripts/validate-decks`, then serve the repository locally and inspect
every slide at full size. Check desktop 16:9, a smaller laptop viewport, a phone
viewport, notes, reveal controls, keyboard input, touch controls, reduced motion,
and URL history. Fix overflow, clipping, overlap, broken links, unreadable
labels, and unexpected title wrapping before delivery.

## Third-party design references

External template libraries can inform visual exploration, but the Phoenix
College shared runtime remains authoritative. When a new visual direction is
requested, agents may create up to three title-slide previews using real deck
content. After a direction is selected, translate it into the local palette,
type, layout, accessibility, and navigation system.

Do not install or use `zarazhangrui/frontend-slides` as the default runtime for
this project. Its single-file and fixed-stage rules conflict with the shared
responsive architecture. Its preview workflow and full-slide QA practices may
be used as references.

## Presentation controls

- Right arrow, Space, or Page Down: next slide
- Left arrow or Page Up: previous slide
- Home or End: first or last slide
- N: show or hide presenter notes
- Browser Back or Forward: move through slide history

The shared runtime stores the current slide in the URL. You can copy a URL such as `#slide-6` to open a presentation at that slide.

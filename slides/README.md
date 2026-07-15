# HTML Presentation Library

This directory contains browser-based classroom presentations. Shared styles and controls keep each course deck consistent while allowing course-specific content.

## Published pages

- Presentation library: `https://jor2050111.github.io/slides/`
- CIS133 presentations: `https://jor2050111.github.io/slides/cis133/`
- CIS133 Chapter 1: `https://jor2050111.github.io/slides/cis133/ch01/`
- CIS215 presentations: `https://jor2050111.github.io/slides/cis215/`
- CIS215 Chapter 1: `https://jor2050111.github.io/slides/cis215/ch01/`

## Directory pattern

```text
slides/
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

## Presentation controls

- Right arrow, Space, or Page Down: next slide
- Left arrow or Page Up: previous slide
- Home or End: first or last slide
- N: show or hide presenter notes
- Browser Back or Forward: move through slide history

The shared runtime stores the current slide in the URL. You can copy a URL such as `#slide-6` to open a presentation at that slide.

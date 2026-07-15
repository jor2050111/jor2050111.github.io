# Phoenix College Technical Classroom Style

## Style prompt

Create a confident, approachable technical classroom presentation for Phoenix College. Use Phoenix College navy as the foundation, warm gold for attention and participation, and pale blue for supporting visuals. Make technical work feel practical and human. Favor crisp typography, open space, clear hierarchy, and purposeful diagrams over decorative effects. The deck should feel active and focused.

Course-specific diagrams, labels, and examples may extend this base style. Keep shared controls and accessibility behavior consistent across every deck.

## Colors

| Token | Hex | Use |
|---|---|---|
| Phoenix navy | `#002e5d` | Primary background, headings, navigation |
| Phoenix gold | `#ffc845` | Emphasis, active state, key words |
| Data blue | `#0374b5` | Supporting process and data marks |
| Canvas | `#f7f4ec` | Warm light slide background |
| Ink | `#03488f` | Body text on light slides |
| Mist | `#edf5fa` | Secondary panels and rules |
| Canyon | `#7c3626` | Sonoran earth accent and warm dark field |

`shared/brand.css` is the source of truth for these values, their ramps,
functional colors, and the six presentation palettes below.

### Presentation palettes

Choose one palette for a deck. Set its name with `data-palette` on the `body`
element. The shared components will apply the selected colors without changing
the slide markup. Match the page's `theme-color` meta value to the palette's
dark field.

```html
<body data-deck-title="CIS215: Data Preparation"
  data-palette="twilight-data">
```

| Palette | Dark field | Accent | Support | Light field | Text | Soft panel | Best fit |
|---|---|---|---|---|---|---|---|
| `phoenix-classic` | `#002e5d` | `#ffc845` | `#0374b5` | `#f7f4ec` | `#03488f` | `#edf5fa` | Default Phoenix College identity |
| `midnight-gold` | `#001a36` | `#ffd573` | `#1d5ea3` | `#e3ecf5` | `#001a36` | `#bcd0e6` | High-focus technical lessons and code |
| `twilight-data` | `#03488f` | `#ffc845` | `#025a8c` | `#edf5fa` | `#001a36` | `#bcd0e6` | Analytics, process, and evidence |
| `canvas-light` | `#002e5d` | `#ffc845` | `#025a8c` | `#e3f2fa` | `#001a36` | `#bcd0e6` | Calm instruction and Canvas-connected topics |
| `canyon-sand` | `#7c3626` | `#ffd573` | `#03488f` | `#f4e7e1` | `#5e2a1d` | `#ece6d6` | Reflection, people, ethics, and Arizona context |
| `golden-hour` | `#002e5d` | `#ffc845` | `#7c3626` | `#fff0cf` | `#001a36` | `#ffe3a3` | Workshops, participation, and milestone moments |

Use `phoenix-classic` when the topic does not suggest another choice. Keep one
palette for the full deck. Use layout, imagery, and slide type to create variety
within it.

### Extended color ramps

- Navy: `#001a36`, `#002e5d`, `#033a72`, `#03488f`, `#1d5ea3`,
  `#4d80ba`, `#86a8d1`, `#bcd0e6`, `#e3ecf5`
- Gold: `#b8860b`, `#e0a92e`, `#ffc845`, `#ffd573`, `#ffe3a3`,
  `#fff0cf`
- Canvas blue: `#0374b5`, hover `#025a8c`, tint `#e3f2fa`
- Canyon: `#5e2a1d`, `#7c3626`, `#9a4a36`, tint `#f4e7e1`
- Sand: `#ffffff`, `#fbf9f3`, `#f7f4ec`, `#ece6d6`, `#d9d1bd`,
  `#b3a98f`, `#7d7560`

### Functional colors

| State | Hex | Use |
|---|---|---|
| Success | `#2f7d54` | Correct states and confirmed completion |
| Warning | `#c9821f` | Caution and items that need attention |
| Danger | `#a6321f` | Errors and destructive outcomes |
| Info | `#0374b5` | Links, information, and interactive accents |

Keep status colors tied to their meaning. Do not replace a palette accent with a
status color for decoration.

### Color safety

- Use the listed text color on the listed light field.
- Use white on the dark field and the dark field color on the accent.
- Use `#b8860b` only for decorative marks. It does not pass for small text on a
  light field.
- Pair color with labels, position, or icons. Do not make meaning depend on color
  alone.

## Typography

- Display: Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif
- Body: Avenir Next, Avenir, Helvetica Neue, Arial, sans-serif
- Code: SFMono-Regular, Menlo, Consolas, monospace
- Use sentence case. Keep headlines short. Use weight and scale before adding decoration.

## Layout and motion

- Use 16:9 classroom slides with a quiet progress line and persistent slide count.
- Give each slide one central idea. Split content when ideas compete for attention.
- Use gentle opacity and vertical transitions. Respect reduced-motion preferences.
- Pair color with labels, position, or icons so meaning never depends on color alone.
- Allow vertical scrolling on narrow screens so content stays available.

## Avoid

- Dense dashboards, ornamental gradients, tiny type, auto-advancing slides, and decorative stock photos
- More than three new ideas on one slide
- Color-only instructions or feedback

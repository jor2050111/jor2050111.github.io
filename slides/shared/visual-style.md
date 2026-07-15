# Phoenix College Technical Classroom Style

## Design priorities

Make decisions in this order:

1. Student outcome
2. Main claim or question
3. Evidence, example, or practice
4. Narrative position in the lesson
5. Layout and visual treatment

Style supports the teaching message. A trend, effect, or template does not set
the message.

## Style prompt

Create a confident, approachable technical classroom presentation for Phoenix College. Use Phoenix College navy as the foundation, warm gold for attention and participation, and pale blue for supporting visuals. Make technical work feel practical and human. Favor crisp typography, open space, clear hierarchy, and purposeful diagrams over decorative effects. The deck should feel active and focused.

Course-specific diagrams, labels, and examples may extend this base style. Keep shared controls and accessibility behavior consistent across every deck.

## Narrative and density

- Give each slide one central message and one teaching job.
- Use a claim, question, or action as the slide title.
- Keep visible text concise so students can listen and look at the same time.
- Use one minute per slide as a planning check, not a quota.
- Break complex ideas into a short sequence before showing the complete model.
- Let the main claim stand without narration. Keep talk tracks and optional
  detail in presenter notes.
- Open with a reason to care and close by resolving that opening through
  practice, synthesis, or a clear next action.
- Keep the title slide minimal.
- Split a crowded slide before reducing type or tightening spacing.

Use low density for live instruction: large claims, one main visual, short
prompts, and frequent practice. Add enough on-slide context for students who
review the deck later. Use appendix slides or presenter notes for details that
would interrupt the class sequence.

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
- Use no more than the display, body, and code roles above in one deck.
- Do not shrink the shared type scale to make content fit. Split the slide.
- Keep one-line titles and banners on one line at the intended desktop size.
- Avoid all-cap paragraphs, underlining for emphasis, and long italic passages.

## Visual storytelling

- Prefer one strong visual that advances the lesson.
- Use photos, diagrams, charts, code, and examples as evidence, not decoration.
- Use panels only when they clarify comparison, sequence, or grouping.
- Keep one photo treatment, illustration approach, and icon style per deck.
- Add visible source credit for external images, quotations, and data.
- Keep full source details in notes or a source slide when needed.
- Use authentic or subject-specific images. Avoid generic stock scenes.
- Use bold type, asymmetry, texture, and depth as accents when they reinforce the
  topic.

### Data slides

- Put the main insight in the title.
- Show one main comparison, relationship, or trend per chart.
- Highlight the relevant mark with the deck accent and keep other marks neutral.
- Label key values directly when this makes the chart easier to read.
- Choose the chart form that matches the claim.
- Avoid spreadsheet screenshots and crowded legends.
- Explain what the evidence means and why it matters.

## Layout and motion

- Use 16:9 classroom slides with a quiet progress line and persistent slide count.
- Give each slide one central idea. Split content when ideas compete for attention.
- Use gentle opacity and vertical transitions. Respect reduced-motion preferences.
- Use motion only to reveal a sequence, show change, or direct attention.
- Keep the core message available when motion is disabled or an export is static.
- Pair color with labels, position, or icons so meaning never depends on color alone.
- Allow vertical scrolling on narrow screens so content stays available.

## Visual direction previews

When the user asks for a new visual direction, build up to three title-slide
previews with real deck content. Include one restrained Phoenix College option
and alternatives that differ in typography, composition, or atmosphere. Do not
place template names, style labels, or production notes inside the preview.
Extend only the selected direction across the final deck.

## Avoid

- Dense dashboards, ornamental gradients, tiny type, auto-advancing slides, and decorative stock photos
- More than three new ideas on one slide
- Color-only instructions or feedback
- Spreadsheet screenshots, mixed icon styles, and decorative animation
- Repeating the same card grid on most slides
- External slide frameworks that bypass the shared runtime

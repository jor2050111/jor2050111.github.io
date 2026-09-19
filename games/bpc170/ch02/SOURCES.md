# Campus Festival: sources and asset provenance

Current record: September 19, 2026. BPC170 Chapter 02, Installing Motherboards
and Connectors. Chapter title confirmed in the local slide deck.

## Instructional sources

| Source | Sections used | Role |
| --- | --- | --- |
| [Local Chapter 02 deck](../../../slides/bpc170/ch02/index.html) and [student slides](https://jor2050111.github.io/slides/bpc170/ch02/) | Slow-copy warm-up, bits and bytes, connector shapes, transfer speeds. Original review identified slides 3 and 5 through 7 | Chapter scope and vocabulary |
| `/Users/vega/Documents/code/co-professor/01-teaching/01-bpc170-hardware-config/bpc170-old-reference-docs/modules/module02/module02.md` | Lesson 2A, Interfaces, Binary Data Storage and Transfer Units, USB Connector Types, USB Standards | Supporting context used to build the slides |
| [USB-IF language and packaging guidance](https://www.usb.org/sites/default/files/usb_type-c_language_product_and_packaging_guidelines_20230320.pdf) | Connector form and supported performance | Technical grounding from the original plan |
| [Original plan](GAME-PLAN.md) | Source record, accuracy boundaries, educational rationale | Details of the September 18 research, with citations |

The slide deck matched the live source during the original review, SHA-256
`92578395faade0b6f8186c87b4b482cc1da07544bbc03a8aac753895d0f3afc5`.
That is a dated observation, not a guarantee that future deck versions match.

## Rules and boundaries

The shipped encounter teaches connector shape versus capability and allocation
of limited transfer speed, with bits/bytes as supporting reasoning. Both
host-to-drive pairs support the modeled USB modes. Each connection operates
independently. Ideal time uses decimal units: `sizeGB * 8 / rateGbps`.
The complete path must share a supported mode before calculating transfer time.

Winning arrangement: Cable A (5 Gbps) to the 2 GB mural, 3.2 seconds against
a 4-second target. Cable B (0.48 Gbps) to the 0.5 GB stage, about 8.33 seconds
against a 10-second target. The reversed arrangement fails the mural target.
These are authored test values, not measured hardware copy speeds.

Actual transfers involve overhead. Completed transfers ready the media, not
electrical power for the festival. Slow-host and slow-destination behavior is
covered in rule tests, but those cases are not additional shipped encounters.
Motherboard repair, comprehensive exam review, and vendor lab simulation are
outside this game's scope.

## Assets and tools

| Asset / element | Origin | Limits |
| --- | --- | --- |
| `assets/festival.png` | Original illustration generated with the built-in image tool during the September 18 build | Fictional desert-campus scene. No supplied location-reference photos are documented. Not a verified depiction of Phoenix College. Exact generating model/version not recorded |
| Cable diagrams and installation rewards | Authored SVG | Illustrative, not vendor product photography |
| Win badge and confetti | SVG, native browser animation, and canvas code | No HyperFrames or Remotion runtime |
| Optional audio | Synthesized browser audio | No external recording or music asset |
| Code and iteration | OpenAI Codex, used September 18, 2026 | Usage date, not a claimed model release date |

Mr. Vega supplied [HyperFrames](https://github.com/heygen-com/hyperframes) as a
motion-design reference. The game uses its own short live effects.

The temporary article at
`/Users/vega/Desktop/temp-to-delete-later/article-gpt-astra-games.md` informed the
experience-first and testable-build approach. It is not required for replay or
future builds. Applicable lessons are retained in the
[retrospective](../../educational-game-builder/references/ch02-retrospective.md).

The [Canvas snippet](CANVAS-EMBED.html) preserves Mr. Vega's course attribution
to CompTIA CertMaster and credits Codex with a usage date. That attribution
does not claim endorsement, grant a reuse license, or mean proprietary course
illustrations were included in the public game.

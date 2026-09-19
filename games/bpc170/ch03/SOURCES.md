# Breeze Lab: sources and provenance

Reviewed September 19, 2026. BPC170 Chapter 03: Installing System Devices.

## Sources

| Source | Sections read | Use and limits |
| --- | --- | --- |
| `../../../slides/bpc170/ch03/index.html` | Chapter targets, airflow, CPU cooling, and full deck context | Current student scope. Chapter README contains starter text, so the populated HTML was used. |
| `/Users/vega/Documents/code/co-professor/01-teaching/01-bpc170-hardware-config/bpc170-old-reference-docs/modules/module03/module03.md` | Lesson 3A cooling plus chapter context | Older background. Not copied into the public game. |
| [Intel: PC cooling](https://www.intel.com/content/www/us/en/gaming/resources/pc-cooling-the-importance-of-keeping-your-pc-cool.html) | CPU cooling, airflow, pressure, cable management | Independent support for the three concepts, accessed September 19, 2026. |
| [Intel: throttling](https://www.intel.com/content/www/us/en/support/articles/000088048/processors.html) | Definition and cooling checks | Supports showing reduced pace when cooling is insufficient. No hardware-specific threshold is used. |

Intake/exhaust direction and obstructions affect airflow. CPU cooling and case
ventilation both matter. Workload heat and inadequate cooling can affect pace.
These qualitative relationships inform the model. The numerical coefficients
below are authored game choices, not values from Intel or the textbook.

## Model definition

All quantities are dimensionless. Each active fan location represents one fan.
Fan strength is 0.8, 1.1, or 1.45 for Quiet, Balanced, or Boost. A clear path
has factor 1. A crowded path has factor 0.6.

```
exchange = (0.6 * max(intake_count, exhaust_count)
            + min(intake_count, exhaust_count)) * strength * path_factor
case_capacity = round(14 + exchange * 24)
cooler_capacity = 55 (compact) or 90 (tower)
available_cooling = min(case_capacity, cooler_capacity)
workload_demand = 30 (writing), 55 (photo), or 80 (render)
full_pace = available_cooling >= workload_demand
```

The base capacity and unmatched-fan term represent passive-vent exchange.
The diagram changes direction but does not calculate actual airflow fields.
Real chassis are not symmetric, and these alternate paths are not a claim
that all real fan placements are equally effective. The model assumes fixed
room conditions and working, correctly installed CPU coolers. Cooler fan
behavior is included in the cooler's authored capacity, separate from the
case-fan speed control. Dust and GPU cooling are excluded.

Noise uses active case-fan count times speed weight (1, 2, or 3), plus one for
the tower cooler. Scores up to 3 are Low, up to 6 Medium, and above 6 High.
This is not a dB prediction or a general claim about tower coolers.

## Source discrepancies

The slide rail chart labels both +3.3 V at 20 A and +5 V at 20 A with 130 W.
Individual products are 66 W and 100 W. The shared 130 W ceiling needs its
own label. This was surfaced in brainstorming. No slide was edited, and the
game does not model PSU rails. Future hardware-specific content needs its
own current verification, rather than inheriting older module claims.

## Assets

All illustration, arrows, icons, and rewards are original project-authored
SVG/CSS created September 19, 2026. System fonts only. No downloaded fonts,
generated raster image, licensed source illustrations, or private photos.
The desk and plant are fictional, without location-specific imagery.

Optional tones are synthesized through the browser Web Audio API. No audio
recordings, analytics, accounts, or runtime third-party requests are used.
Intel and chapter links load only when the player follows them.

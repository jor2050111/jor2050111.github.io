# Blackout Broadcast: sources and model boundaries

Reviewed September 20, 2026. BPC170 Chapter 04: Troubleshooting PC Hardware.

## Sources read

| Source | Sections | Use |
| --- | --- | --- |
| `../../../slides/bpc170/ch04/index.html` | Full deck, startup checkpoints, drive health, RAID, display isolation | Current chapter scope |
| `/Users/vega/Documents/code/co-professor/01-teaching/01-bpc170-hardware-config/bpc170-old-reference-docs/modules/module04/module04.md` | Overview; 4A boot/device options; 4B POST, boot, drive reliability, RAID; 4C missing video and physical cabling | Supporting chapter background |
| [Seagate NAS OS 4: RAID](https://www.seagate.com/manuals/network-storage/business-storage-nas-os-4/raid-modes/) | Separate backup recommendation, RAID 0/1/5 boundaries | Limits of redundancy and separate copies |
| [AMD: Troubleshooting Common Boot Failures](https://www.amd.com/en/resources/support-articles/faqs/PIBRMATS1.html) | Startup failure distinctions | Independent startup reference |
| `../../educational-game-builder/references/creative-play.md` | User direction and previously observed vendor clip | Distinct play beyond fixed installation tasks |

The private source module is not copied into the public game folder.
No proprietary screenshots, text passages, or recordings are reused.

## Authored assumptions

The fictional station has independent live sources, a playback PC, a separate
two-drive RAID 1 archive, and an independent transmitter return. The archive
starts degraded with one drive failed. Losing its remaining drive makes the
volume unavailable. A verified separate copy can feed working playback.

Archive copying is independent of the playback PC and finishes before the
scheduled failure event. Capacity and transfer duration are abstracted. A
completed copy includes a test restore. This does not promise that every
failing drive is safely recoverable or that a failing array remains readable.

Both startup faults are deterministic. The late shift has completed POST, a
detected OS disk, and a boot entry targeting a removed disk. Selecting an
existing valid internal entry and verifying startup fixes this authored case.
A USB device being first does not universally prevent later boot entries.

The early shift has loose RAM after an upgrade. Its fictional board's own
indicator guide and a powered-off inspection identify the issue. No universal
beep pattern is taught. Recovery includes powering down before reseating and
verifying afterward. Only the selected source determines the startup fault.

The preview cable fault never stops the PC. Holding recorded programs until
the return is checked is a fictional verification policy, labeled in the
interface. Replacing only the cable keeps monitor, source, and input constant.

Scheduled block events are not predictions from S.M.A.R.T. data. Two crew and
one/two-person job costs are game resources, not technical staffing guidance.

## Source discrepancies kept out of rules

The deck says fans and steady LEDs clear the PSU. Its supporting POST section
explicitly notes that fans can receive power while a PSU fault prevents
startup. This game requires further evidence. It also avoids treating a logo
alone as proof of completed POST, red LEDs as universal drive identification,
RAID as backup, or a dark monitor as proof of OS failure. No slides were edited.

## Assets and tools

Original HTML/CSS scenes and marks authored with Codex, September 20, 2026.
The station, characters, and model city are fictional. No Phoenix, Arizona,
or Phoenix College architecture is depicted. System fonts only. Optional
tones use Web Audio and start off. No stored progress, accounts, external
assets, analytics, or runtime API requests.

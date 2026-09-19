# Local preview, release, and Canvas

## Local review

Serve the site root over HTTP so module imports and relative links work:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Use a free port if that port is occupied. Inspect an existing server before
reusing it. The expected path is `/games/<course>/<chapter>/`. Opening a module
game through `file://` is not a supported preview. Keep the server command,
test command, and exact preview URL in the chapter README.

## Publication

As verified September 19, 2026, this repository publishes GitHub Pages from
`main` at `/`. Recheck before a release:

```sh
git status --short --branch
git remote -v
gh api repos/jor2050111/jor2050111.github.io/pages
git fetch origin
git log --oneline origin/main..HEAD
git diff --stat origin/main..HEAD
```

Commit reviewed, scoped work. Do not push a new game or runtime revision before
publication is authorized. An approval to build locally is not approval to
publish. Since a push can publish every pending commit, inspect the entire
range, including unrelated games. Preserve other people's work. Reuse current
authorization when it clearly covers the release instead of asking again.

After an authorized push, check deployment status and the built commit:

```sh
gh api repos/jor2050111/jor2050111.github.io/pages/builds/latest
```

This command matches the current legacy Pages setup. If the build type changes,
use the corresponding Actions deployment status. A successful Git push is not
proof the URL is live. Wait in bounded intervals. If the build fails, report
the actual error and preserve the release state for repair.

Verify the trailing-slash student URL, all runtime assets and imports, and
relative return links. Compare published bytes or hashes with the release
files where the host serves them unchanged. Run a live success/retry flow and
refresh check when browser access is available. Record exactly which checks
ran. If only HTTP/hash checks ran, do not describe that as a live playthrough.
Update README, QA, catalog, and HQ status, including date and release commit.

## Canvas embed: the accepted Chapter 02 pattern

Mr. Vega reported this pattern working in Canvas on September 19, 2026:

```html
<iframe
    style="width: 100%; height: 69rem; border: 0px none currentcolor;"
    title="Campus Festival: BPC170 Chapter 02 optional game"
    src="https://jor2050111.github.io/games/bpc170/ch02/"
    loading="lazy"
    allowfullscreen="allowfullscreen"></iframe>
```

The reusable [embed template](../templates/CANVAS-EMBED.html) and the populated
[Chapter 02 embed](../../bpc170/ch02/CANVAS-EMBED.html) include the surrounding
orientation and credits. The game-specific title and "Used September 18, 2026"
credit wording were accepted corrections. The stored snippet is ready to paste.
We have not verified that those two corrections were saved in Canvas.

Earlier recommendations used `80vh` with a `40rem` minimum, then `65vh` with
minimum/maximum limits. The first appeared too tall in Mr. Vega's screenshot.
He subsequently reported editor restrictions and chose the fixed `69rem`
pattern. Do not reinstate earlier advice or claim that a particular CSS
property is universally prohibited by Canvas. This was user-observed behavior,
not a controlled Canvas sanitizer test.

For another game, start with the simple accepted markup and fit the height to
that game's content. `69rem` is a known Chapter 02 setting, not a universal
height. Shorter playtime does not imply a shorter rendered page. Changing the
iframe height changes its viewport, not the size of game controls.

Check the saved page, not just HTML in the editor. In Student View, check a
narrow course-content column, internal scrolling, the cable/control area or
equivalent, help and win dialogs, keyboard focus, and the new-tab link. On a
phone, retain the new-tab option. Cross-origin content does not automatically
resize the parent iframe. Do not add parent-page scripts on the assumption
that Canvas will retain them.

The header should say optional, approximate duration, and whether it is timed
or graded. Use an accurate iframe title. Credit sources and tools actually
used, and record a usage date instead of inventing a release/version date.
Do not copy CompTIA credits into an unrelated course. Do not claim a license
for generated media or reference material without a basis.

Preparing an embed does not authorize a Canvas update. If asked to publish in
Canvas, resolve the exact target course and page, show the scoped plan, and
verify the saved HTML with a round trip. Never infer a course ID from BPC170's
example or another course's template.

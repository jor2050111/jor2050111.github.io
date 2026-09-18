# First playable verification

September 18, 2026. Local HTTP preview, Node 26.8.2, Chromium through ego-browser.

## Passed

- All 11 Node rule tests: same-shape/different-rate cables, file-size conversion, slow host, slow destination, incompatible shapes, no common mode, missing cable, swapping, empty-slot moves, invalid inventory, and verified winning/losing arrangements.
- Unsuccessful browser playthrough: mural 33.3 seconds, stage 0.8 seconds. Mural misses its 4-second target.
- Successful browser playthrough: mural 3.2 seconds, stage 8.3 seconds. Both targets met and both visual rewards displayed.
- Swapping and undo restore earlier assignments and clear stale results.
- Full keyboard-only playthrough using Tab, Enter, and Space.
- Help opens with the keyboard, closes with Escape, and returns focus to its trigger.
- Full touch-event playthrough at 390 × 844 using browser touch emulation.
- OS reduced-motion preference disables animation and removes the preview delay.
- Full playthrough with local storage access throwing SecurityError.
- No runtime errors or unhandled promise rejections during the instrumented playthrough.
- Local stylesheet, entry script, and illustration returned HTTP 200. Imported rule and level modules executed through the full playthrough.
- No horizontal overflow at 320, 390, 640, 1024, and 1280 CSS pixels in tested states.
- No visible button below 44 pixels in height in the phone layout.
- JavaScript syntax check and Git whitespace check passed.

The transfer preview lasts 1.6 seconds with motion enabled. Its bar shows the fraction of a file transferable within that station's target. It is not a real-time copy timer.

## Evidence

Local screenshots are in the repository's ignored `output/playwright/campus-festival/` folder. These include desktop and phone views and the success state. They are development evidence, not shipped game assets.

## Still requires human or release testing

- Mr. Vega's judgment of the game feel and scene reward.
- Student playtime and comprehension. The two-minute encounter estimate is provisional.
- Actual phone hardware, Safari, Firefox, and Edge.
- VoiceOver or another screen reader with the entire interaction. Semantic controls and status announcements are implemented, but browser automation is not a screen-reader audit.
- Formal contrast and zoom review across the completed game's states.
- Listening to the optional synthesized audio on representative devices.
- Reducing the illustration's delivery size toward the proposed 2 MB asset budget.
- The remaining planned encounters, alternate finale, and public URL verification.

This record describes prototype checks. It does not claim full WCAG conformance or readiness for student release.

## Playtest revision: orientation and celebration

Three comments from Mr. Vega applied on September 18, 2026:

1. Replaced the small question-mark control with a gold How to play button and a short Start here orientation above the courtyard.
2. Added a full-screen win message with an animated title and badge, confetti, and the optional victory chime.
3. Moved the existing collapsible transfer explanation above the courtyard, preserving its content.

Verification:

- All 11 rule tests still pass. Both JavaScript entry files pass syntax checks.
- Help opens from its new location. Escape closes it and restores focus.
- Expanded math content remains above the courtyard.
- An unsuccessful transfer arrangement never opens the win dialog.
- A successful arrangement opens the celebration with the expected completion state.
- Motion finishes within the 4.6-second effect duration. The message remains until dismissed.
- Escape restores focus to Test. The visible return button dismisses the dialog and cancels active effects.
- OS reduced-motion mode shows the win message with no running animations or confetti loop.
- Desktop and 390-pixel phone win states visually inspected. Phone card fits within the viewport.
- Orientation and math controls reflow without horizontal overflow at 320, 390, and 640 pixels.
- No runtime errors or unhandled rejections observed in the instrumented revision playthrough.

Screenshots: `celebration-desktop.png`, `celebration-phone.png`, and `orientation-revision.png` in the same ignored evidence folder. This revision remains local and unpublished.

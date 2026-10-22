#!/usr/bin/env python3
"""Structural and fact-drift checks for one CIS137 slide deck.

Usage:
    python3 scripts/check-cis137-deck.py ch03 [--chapters-dir DIR]
                                              [--canon FILE]

Why this exists: the generic audit harness (scripts/audit-deck.mjs)
checks layout and copy hygiene for any course. CIS137 decks add rules
the harness cannot know: notes timing must run continuously to minute
55, corner labels may cite only H2 section numbers, every number and
name on a slide must exist in the chapter source or the Copperwind
canon, vendor names stay off slides, and each deck links course.css.
A verifier agent runs this before reading the deck by hand, so the
mechanical misses never reach the human review.

Exit code 1 when any error is found. "Not found" numbers are reported
as warnings because some legitimate values (a count the slide derives
from the chapter) will not match a literal in the source. A verifier
rules on each one.
"""

import argparse
import html
import os
import re
import sys
from html.parser import HTMLParser

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_CHAPTERS = os.path.expanduser(
    "~/Documents/code/textbooks/cis137/book/chapters")
DEFAULT_CANON = os.path.expanduser(
    "~/Documents/code/textbooks/cis137/docs/part-structure.md")

VENDORS = [
    "ChatGPT", "OpenAI", "Gemini", "Google", "Copilot", "Microsoft",
    "Claude", "Anthropic", "Perplexity", "Midjourney", "DALL", "Stable "
    "Diffusion", "Grok", "Llama", "Meta AI", "Mistral", "Bing", "Siri",
    "Alexa",
]
PALETTE_DARK = {
    "phoenix-classic": "#002e5d", "midnight-gold": "#001a36",
    "twilight-data": "#03488f", "canvas-light": "#002e5d",
    "canyon-sand": "#7c3626", "golden-hour": "#002e5d",
}
# Numbers that appear on every deck for reasons outside the chapter.
ALLOW_NUMBERS = {"55", "137", "1", "2", "3", "4", "5", "6", "7", "8",
                 "9", "10", "11", "12", "01", "02", "03", "04", "05",
                 "06", "07", "08", "09"}


class _CopyText(HTMLParser):
    """Collect visible text, skipping pre, code, and any element whose
    class carries 'verbatim' (chapter quotes keep their own punctuation).
    A regex cannot do this because verbatim paragraphs nest spans."""

    SKIP = {"pre", "code", "script", "style"}

    def __init__(self):
        super().__init__()
        self.parts = []
        self.stack = []  # True when the element (or an ancestor) is skipped

    def handle_starttag(self, tag, attrs):
        classes = dict(attrs).get("class", "") or ""
        skipped = (tag in self.SKIP or "verbatim" in classes.split()
                   or (self.stack and self.stack[-1]))
        self.stack.append(bool(skipped))

    def handle_endtag(self, tag):
        if self.stack:
            self.stack.pop()

    def handle_data(self, data):
        if not (self.stack and self.stack[-1]):
            self.parts.append(data)


def copy_text(fragment):
    parser = _CopyText()
    parser.feed(fragment)
    return re.sub(r"\s+", " ", " ".join(parser.parts))


def strip_tags(fragment):
    text = re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", fragment,
                  flags=re.S | re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    return html.unescape(re.sub(r"\s+", " ", text)).strip()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("chapter", help="chNN")
    parser.add_argument("--chapters-dir", default=DEFAULT_CHAPTERS)
    parser.add_argument("--canon", default=DEFAULT_CANON)
    args = parser.parse_args()

    ch = args.chapter
    num = int(re.sub(r"\D", "", ch))
    deck_dir = os.path.join(REPO, "slides", "cis137", ch)
    deck_path = os.path.join(deck_dir, "index.html")
    if not os.path.exists(deck_path):
        print(f"ERROR missing deck: {deck_path}")
        return 1
    source_path = os.path.join(args.chapters_dir, f"chapter-{num:02d}.md")
    source = open(source_path, encoding="utf-8").read() if os.path.exists(
        source_path) else ""
    canon = open(args.canon, encoding="utf-8").read() if os.path.exists(
        args.canon) else ""
    if not source:
        print(f"WARN chapter source not found at {source_path}; "
              "fact checks skipped")
    corpus = (source + "\n" + canon).lower()
    corpus_digits = re.sub(r"[,\s]", "", corpus)

    deck = open(deck_path, encoding="utf-8").read()
    errors, warnings, info = [], [], []

    # Structure.
    slides = re.findall(r"<section\b[^>]*class=\"[^\"]*\bslide\b[^\"]*\"[^>]*>.*?</section>",
                        deck, flags=re.S)
    n = len(slides)
    info.append(f"slides: {n}")
    if not 18 <= n <= 24:
        warnings.append(f"slide count {n} outside 18-24")
    active = len(re.findall(r"class=\"[^\"]*\bslide\b[^\"]*\bactive\b", deck))
    if active != 1:
        errors.append(f"{active} slides carry the active class (expected 1)")
    if 'href="../course.css"' not in deck:
        errors.append("course.css is not linked")
    if 'href="chapter.css"' not in deck:
        warnings.append("chapter.css is not linked")
    pal = re.search(r'data-palette="([^"]+)"', deck)
    theme = re.search(r'name="theme-color" content="([^"]+)"', deck)
    if pal and theme and pal.group(1) in PALETTE_DARK:
        if theme.group(1).lower() != PALETTE_DARK[pal.group(1)]:
            errors.append(f"theme-color {theme.group(1)} does not match "
                          f"{pal.group(1)} dark field {PALETTE_DARK[pal.group(1)]}")
    info.append(f"palette: {pal.group(1) if pal else 'none'}")

    reveals = len(re.findall(r'class="reveal"', deck))
    answers = len(re.findall(r'class="answer"', deck))
    info.append(f"reveal checks: {reveals}")
    if reveals != answers:
        errors.append(f"{reveals} reveal buttons but {answers} .answer blocks")
    if not 3 <= reveals <= 4:
        warnings.append(f"{reveals} reveal checks (3-4 expected)")
    if re.search(r">\s*\?\s*<", deck):
        warnings.append("a lone ? chip appears (placeholder reveal pattern)")

    # Per-slide notes, timing, labels.
    prev_end = 0
    last_end = None
    allowed_brand = re.compile(
        rf"^(Phoenix College · CIS137|CIS137 · Chapter {num}|CIS137 · Lab {num}A|"
        rf"CIS137 · {num}\.[1-4]|CIS137 · [A-Za-z][A-Za-z ,'-]{{1,28}})$")
    vendor_hits = []
    for i, s in enumerate(slides, 1):
        notes_m = re.search(r'data-notes="([^"]*)"', s)
        notes = html.unescape(notes_m.group(1)) if notes_m else ""
        if not notes.strip():
            errors.append(f"slide {i}: no data-notes")
        t = re.search(r"Time:\s*(\d+)\s*-\s*(\d+)\s*minutes", notes)
        if not t:
            errors.append(f"slide {i}: notes have no 'Time: a-b minutes' line")
        else:
            a, b = int(t.group(1)), int(t.group(2))
            if a != prev_end:
                warnings.append(f"slide {i}: Time starts at {a}, previous slide ended at {prev_end}")
            if b <= a:
                errors.append(f"slide {i}: Time range {a}-{b} does not advance")
            prev_end = b
            last_end = b
        brand = re.search(r'class="brand"[^>]*>(.*?)</div>', s, flags=re.S)
        brand_text = strip_tags(brand.group(1)) if brand else ""
        if not brand_text:
            errors.append(f"slide {i}: no .brand corner label")
        elif not allowed_brand.match(brand_text):
            warnings.append(f"slide {i}: corner label '{brand_text}' is not an allowed form")
        visible = strip_tags(s)
        for v in VENDORS:
            if re.search(rf"\b{re.escape(v)}\b", visible + " " + notes):
                vendor_hits.append(f"slide {i}: '{v}'")
        if "—" in s:
            errors.append(f"slide {i}: em dash")
        # Semicolons outside verbatim/code.
        if ";" in copy_text(s):
            warnings.append(f"slide {i}: semicolon in visible copy outside .verbatim")
    if last_end != 55:
        errors.append(f"notes end at minute {last_end}, expected 55")
    for hit in vendor_hits:
        errors.append(f"vendor name on {hit}")

    # Images.
    assets_dir = os.path.join(deck_dir, "assets")
    refs = re.findall(r'src="assets/([^"]+)"', deck)
    for ref in refs:
        p = os.path.join(assets_dir, ref)
        if not os.path.exists(p):
            errors.append(f"referenced image missing: assets/{ref}")
        elif os.path.getsize(p) < 100_000:
            warnings.append(f"assets/{ref} is only {os.path.getsize(p)} bytes (failed render?)")
    if os.path.isdir(assets_dir):
        for f in sorted(os.listdir(assets_dir)):
            if f.endswith(".png") and f not in refs:
                warnings.append(f"assets/{f} is not referenced by the deck")
        if refs and not os.path.exists(os.path.join(assets_dir, "image-prompts.md")):
            warnings.append("assets/image-prompts.md missing (prompts not saved)")
    info.append(f"images referenced: {len(refs)}")
    for m in re.finditer(r"<img\b([^>]*)>", deck):
        attrs = m.group(1)
        if 'alt=' not in attrs:
            errors.append(f"img without alt: {attrs[:60]}")
    for m in re.finditer(r'<figure class="visual-art print-frame">(.*?)</figure>', deck, flags=re.S):
        if "<figcaption" not in m.group(1):
            errors.append("print-frame figure without figcaption")
    for m in re.finditer(r'role="img"(?![^>]*aria-label)', deck):
        errors.append("role=\"img\" without aria-label")

    # Fact drift: numbers and years in visible copy that the source lacks.
    if source:
        misses = set()
        for i, s in enumerate(slides, 1):
            visible = strip_tags(s)
            for tok in re.findall(r"\$?\d[\d,]*(?:\.\d+)?%?", visible):
                plain = tok.replace(",", "").replace("$", "").rstrip("%")
                if plain in ALLOW_NUMBERS or len(plain) < 2:
                    continue
                if plain not in corpus_digits:
                    misses.add(f"slide {i}: {tok}")
        for miss in sorted(misses):
            warnings.append(f"number not found in chapter or canon: {miss}")
        # Capitalized two-word names that look like people.
        names = set()
        corpus_words = set(re.findall(r"[a-z]+", corpus))
        stop = {"reveal", "hide", "stored", "suggested", "sample", "run",
                "step", "entry", "before", "after", "lead", "size", "teams",
                "who", "you", "yes", "no", "not", "notes", "prompt",
                "response", "check", "sort", "assistant", "chat", "part",
                "exit", "ticket", "oct", "october", "cap", "added", "hedge",
                "holds", "contradicted", "unverifiable", "verified"}
        for i, s in enumerate(slides, 1):
            visible = strip_tags(s)
            for nm in re.findall(r"\b([A-Z][a-z]{2,} [A-Z][a-z]{2,})\b", visible):
                a, b = nm.lower().split()
                if a in stop or b in stop:
                    continue
                # A name is suspicious only when a word of it never
                # appears in the chapter or the canon at all.
                if a not in corpus_words or b not in corpus_words:
                    names.add(f"slide {i}: {nm}")
        for nm in sorted(names):
            warnings.append(f"name not found in chapter or canon: {nm}")

    for line in info:
        print(f"INFO  {line}")
    for w in warnings:
        print(f"WARN  {w}")
    for e in errors:
        print(f"ERROR {e}")
    print(f"\n{len(errors)} error(s), {len(warnings)} warning(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())

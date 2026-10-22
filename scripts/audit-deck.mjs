#!/usr/bin/env node
// Headless QA audit for one slide deck.
//
// Usage:
//   node scripts/audit-deck.mjs cis137/ch01 [--out DIR] [--shots]
//        [--base http://127.0.0.1:8137] [--viewports 1920x1080,1280x720,390x844]
//
// Why this exists: AGENTS.md requires every deck to be checked at three
// viewports for overflow, clipping, broken images, working reveals, and
// clean copy. Doing that by hand for 20 slides times three viewports is
// where earlier sessions lost time, and the BPC170 harness lived in a
// session scratchpad and was lost. This copy lives in the repo.
//
// Playwright is resolved from the global npm root (npm install -g
// playwright; npx playwright install chromium), so the repo keeps no
// node_modules. Serve the repo first: python3 -m http.server 8137.
//
// Exit code 1 when any error-level finding exists.

import { createRequire } from "node:module";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
function loadPlaywright() {
    try {
        return require("playwright");
    } catch {
        const globalRoot = execSync("npm root -g").toString().trim();
        return require(path.join(globalRoot, "playwright"));
    }
}

const args = process.argv.slice(2);
const deck = args.find((a) => !a.startsWith("--"));
if (!deck) {
    console.error("Usage: node scripts/audit-deck.mjs <course>/<chNN> [--out DIR] [--shots]");
    process.exit(2);
}
function opt(name, fallback) {
    const i = args.indexOf(name);
    return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
}
const base = opt("--base", "http://127.0.0.1:8137");
const outDir = opt("--out", path.join("slides", "output", "audit", deck.replace("/", "-")));
const shots = args.includes("--shots");
const viewports = opt("--viewports", "1920x1080,1280x720,390x844")
    .split(",")
    .map((v) => v.split("x").map(Number));

const BANNED_WORDS = [
    "spot-on", "spot on", "indeed", "delve", "dive", "embark", "nuances",
    "journey", "tapestry", "navigate", "crucial", "real-world", "soft skills",
    "workplace readiness",
];
const FILLER = [
    "basically", "actually", "really", "very", "quite", "somewhat", "rather",
    "in order to", "at this point in time", "during the course of",
    "at the end of the day", "moving forward", "it is important to note",
    "it should be mentioned", "it is worth noting",
];
const PRODUCTION_TEXT = [
    "/Users/", "/private/tmp", "TODO", "lorem ipsum", "Replace this",
    "placeholder", "FIXME", "XXX",
];

const findings = [];
function add(level, where, message) {
    findings.push({ level, where, message });
}

// Static checks on the HTML source.
const deckPath = path.join("slides", deck, "index.html");
const html = fs.readFileSync(deckPath, "utf8");
// Verbatim chapter quotes and code may legitimately contain a word like
// "placeholder", so the production-text scan skips those elements.
const scanHtml = html
    .replace(/<(pre|code)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
    .replace(/<(\w+)\b[^>]*class="[^"]*\bverbatim\b[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, " ");
for (const token of PRODUCTION_TEXT) {
    if (scanHtml.includes(token)) {
        add("error", "source", `Production text or machine path found: "${token}"`);
    }
}
if (/—/.test(html)) {
    const count = (html.match(/—/g) || []).length;
    add("error", "source", `Em dash (U+2014) appears ${count} time(s) in the deck source`);
}

const pw = loadPlaywright();
const browser = await pw.chromium.launch();
const url = `${base}/slides/${deck}/`;
const summary = { deck, url, viewports: {}, slides: 0, notesMinutes: null };

for (const [width, height] of viewports) {
    const vpName = `${width}x${height}`;
    const context = await browser.newContext({
        viewport: { width, height },
        reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (m) => {
        if (m.type() === "error") consoleErrors.push(m.text());
    });
    page.on("pageerror", (e) => consoleErrors.push(String(e)));
    const failedRequests = [];
    page.on("requestfailed", (r) => failedRequests.push(r.url()));

    await page.goto(`${url}#slide-1`, { waitUntil: "load" });
    await page.waitForSelector(".slide.active", { timeout: 10000 });

    const slideCount = await page.evaluate(() => document.querySelectorAll(".slide").length);
    const activeAtStart = await page.evaluate(() => document.querySelectorAll(".slide.active").length);
    if (activeAtStart !== 1) {
        add("error", `${vpName} startup`, `${activeAtStart} active slides at startup (expected 1)`);
    }
    summary.slides = slideCount;
    const vpReport = { slides: [], consoleErrors, failedRequests };

    const isPhone = width < 760;
    for (let i = 1; i <= slideCount; i += 1) {
        if (i > 1) {
            // deck.js listens for hashchange, so drive navigation through the URL.
            await page.evaluate((n) => { window.location.hash = `#slide-${n}`; }, i);
        }
        await page.waitForFunction(
            (n) => {
                const slides = [...document.querySelectorAll(".slide")];
                return slides.findIndex((s) => s.classList.contains("active")) === n - 1;
            },
            i,
            { timeout: 5000 }
        );
        // The shared runtime fades a slide in over 360 ms. Wait it out so
        // screenshots show the final state, not a half-faded frame.
        await page.waitForTimeout(450);

        const check = await page.evaluate(({ isPhone, BANNED_WORDS, FILLER }) => {
            const slide = document.querySelector(".slide.active");
            const out = { errors: [], warnings: [], info: [] };
            const rect = slide.getBoundingClientRect();
            const docWide = document.documentElement.scrollWidth > window.innerWidth + 1;
            if (docWide) out.errors.push(`document scrolls horizontally (${document.documentElement.scrollWidth}px > ${window.innerWidth}px)`);
            if (slide.scrollWidth > slide.clientWidth + 1) {
                out.errors.push(`slide content wider than slide (${slide.scrollWidth} > ${slide.clientWidth})`);
            }
            if (!isPhone && slide.scrollHeight > slide.clientHeight + 1) {
                out.errors.push(`slide content taller than slide (${slide.scrollHeight} > ${slide.clientHeight}), clipped`);
            }
            // Children poking outside the slide box on the right or left.
            const els = [...slide.querySelectorAll("*")].filter((el) => {
                const cs = getComputedStyle(el);
                return cs.display !== "none" && cs.visibility !== "hidden" && el.getClientRects().length > 0;
            });
            for (const el of els) {
                const r = el.getBoundingClientRect();
                if (r.width === 0 && r.height === 0) continue;
                if (r.right > rect.right + 1 || r.left < rect.left - 1) {
                    const tag = el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ")[0] : "");
                    out.errors.push(`element outside slide horizontally: ${tag} (left ${Math.round(r.left)}, right ${Math.round(r.right)}, slide right ${Math.round(rect.right)})`);
                    if (out.errors.length > 12) break;
                }
                // Text overflowing its own box (long unbroken strings).
                const cs = getComputedStyle(el);
                if (el.children.length === 0 && el.textContent.trim() && cs.overflow !== "visible" && el.scrollWidth > el.clientWidth + 2) {
                    out.warnings.push(`text overflows its box: ${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 40)}"`);
                }
            }
            // One-line chrome that must not wrap.
            for (const sel of [".brand", ".eyebrow", ".slide-number"]) {
                for (const el of slide.querySelectorAll(sel)) {
                    const cs = getComputedStyle(el);
                    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
                    const lines = Math.round(el.getBoundingClientRect().height / lh);
                    if (lines > 1 && !isPhone) out.warnings.push(`${sel} wraps to ${lines} lines: "${el.textContent.trim().slice(0, 50)}"`);
                }
            }
            // Title line counts (info) and mid-word breaks.
            for (const el of slide.querySelectorAll("h1, h2")) {
                const cs = getComputedStyle(el);
                const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.1;
                const lines = Math.round(el.getBoundingClientRect().height / lh);
                out.info.push(`${el.tagName.toLowerCase()} ${lines} line(s): "${el.textContent.trim().slice(0, 60)}"`);
                if (lines > 3 && !isPhone) out.warnings.push(`${el.tagName.toLowerCase()} wraps to ${lines} lines`);
            }
            // Images and accessible names.
            for (const img of slide.querySelectorAll("img")) {
                if (!img.complete || img.naturalWidth === 0) out.errors.push(`broken image: ${img.getAttribute("src")}`);
                if (!img.hasAttribute("alt")) out.errors.push(`image without alt attribute: ${img.getAttribute("src")}`);
            }
            for (const el of slide.querySelectorAll('[role="img"]')) {
                if (!el.getAttribute("aria-label")) out.errors.push(`role="img" without aria-label`);
            }
            // Copy checks on visible text plus notes, excluding code and verbatim samples.
            const clone = slide.cloneNode(true);
            clone.querySelectorAll("pre, code, .verbatim, .slide-number").forEach((n) => n.remove());
            const visible = clone.textContent.replace(/\s+/g, " ");
            const notes = slide.dataset.notes || "";
            const text = `${visible} ${notes}`;
            if (/;/.test(visible)) out.warnings.push("semicolon in visible copy");
            if (/—/.test(text)) out.errors.push("em dash in copy or notes");
            const lower = text.toLowerCase();
            for (const w of BANNED_WORDS) {
                const re = new RegExp(`(^|[^a-z-])${w.replace(/[-\\/^$*+?.()|[\]{}]/g, "\\$&")}([^a-z-]|$)`, "i");
                if (re.test(lower)) out.warnings.push(`banned word: "${w}"`);
            }
            for (const w of FILLER) {
                const re = new RegExp(`(^|[^a-z-])${w.replace(/[-\\/^$*+?.()|[\]{}]/g, "\\$&")}([^a-z-]|$)`, "i");
                if (re.test(lower)) out.warnings.push(`filler: "${w}"`);
            }
            if (!notes.trim()) out.warnings.push("no data-notes");
            const brand = slide.querySelector(".brand");
            if (!brand || !brand.textContent.trim()) out.warnings.push("no .brand corner label");
            const timeMatch = notes.match(/Time:\s*(\d+)\s*-\s*(\d+)/);
            out.timeEnd = timeMatch ? Number(timeMatch[2]) : null;
            out.reveals = slide.querySelectorAll(".reveal").length;
            return out;
        }, { isPhone, BANNED_WORDS, FILLER });

        // Exercise reveal buttons and re-check overflow in the open state.
        if (check.reveals > 0) {
            const reveals = await page.$$(".slide.active .reveal");
            for (const button of reveals) {
                await button.click();
                await page.waitForTimeout(60);
                const open = await page.evaluate(() => {
                    const slide = document.querySelector(".slide.active");
                    const shown = slide.querySelectorAll(".answer.show").length;
                    const isPhone = window.innerWidth < 760;
                    const clipped = !isPhone && slide.scrollHeight > slide.clientHeight + 1;
                    return { shown, clipped, sh: slide.scrollHeight, ch: slide.clientHeight };
                });
                if (open.shown === 0) check.errors.push("reveal button did not show an .answer");
                if (open.clipped) check.errors.push(`slide clipped with the answer open (${open.sh} > ${open.ch})`);
                if (shots) {
                    const dir = path.join(outDir, vpName);
                    fs.mkdirSync(dir, { recursive: true });
                    await page.screenshot({ path: path.join(dir, `slide-${String(i).padStart(2, "0")}-reveal.png`), fullPage: isPhone });
                }
                await button.click();
                await page.waitForTimeout(40);
            }
        }

        if (shots) {
            const dir = path.join(outDir, vpName);
            fs.mkdirSync(dir, { recursive: true });
            await page.screenshot({ path: path.join(dir, `slide-${String(i).padStart(2, "0")}.png`), fullPage: isPhone });
        }

        // Phone scroll-end state: the fixed nav must not cover the last content.
        if (isPhone) {
            const end = await page.evaluate(() => {
                window.scrollTo(0, document.documentElement.scrollHeight);
                const slide = document.querySelector(".slide.active");
                const content = slide.querySelector(".content") || slide;
                const nav = document.querySelector(".nav");
                const cRect = content.getBoundingClientRect();
                const nRect = nav ? nav.getBoundingClientRect() : null;
                const covered = nRect && cRect.bottom > nRect.top + 2 && cRect.left < nRect.right && cRect.right > nRect.left;
                return { covered: Boolean(covered), contentBottom: Math.round(cRect.bottom), navTop: nRect ? Math.round(nRect.top) : null };
            });
            if (end.covered) check.warnings.push(`phone scroll end: content bottom ${end.contentBottom} runs under the nav (top ${end.navTop}); add bottom padding`);
            if (shots) {
                const dir = path.join(outDir, vpName);
                await page.screenshot({ path: path.join(dir, `slide-${String(i).padStart(2, "0")}-end.png`), fullPage: false });
            }
            await page.evaluate(() => window.scrollTo(0, 0));
        }

        for (const e of check.errors) add("error", `${vpName} slide ${i}`, e);
        for (const w of check.warnings) add("warning", `${vpName} slide ${i}`, w);
        vpReport.slides.push({ slide: i, info: check.info, timeEnd: check.timeEnd, reveals: check.reveals });
        if (check.timeEnd && (summary.notesMinutes === null || check.timeEnd > summary.notesMinutes)) {
            summary.notesMinutes = check.timeEnd;
        }
    }

    // Keyboard controls: ArrowRight from slide 1 must land on slide 2.
    await page.evaluate(() => { window.location.hash = "#slide-1"; });
    await page.waitForTimeout(80);
    await page.mouse.click(Math.floor(width / 2), Math.floor(height / 2));
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(120);
    const afterArrow = await page.evaluate(() => {
        const slides = [...document.querySelectorAll(".slide")];
        return slides.findIndex((s) => s.classList.contains("active")) + 1;
    });
    if (afterArrow !== 2 && slideCount > 1) add("error", `${vpName}`, `ArrowRight from slide 1 landed on slide ${afterArrow} (expected 2)`);

    // Notes toggle works.
    await page.keyboard.press("n");
    await page.waitForTimeout(60);
    const notesOpen = await page.evaluate(() => document.querySelector("#notes")?.classList.contains("open"));
    if (!notesOpen) add("error", `${vpName}`, "N key did not open presenter notes");
    await page.keyboard.press("n");

    for (const e of consoleErrors) add("error", `${vpName} console`, e);
    for (const r of failedRequests) add("error", `${vpName} network`, `request failed: ${r}`);
    summary.viewports[vpName] = vpReport;
    await context.close();
}

await browser.close();

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "audit.json"), JSON.stringify({ summary, findings }, null, 2));

const errors = findings.filter((f) => f.level === "error");
const warnings = findings.filter((f) => f.level === "warning");
console.log(`Deck: ${deck}  slides: ${summary.slides}  notes end at minute: ${summary.notesMinutes ?? "n/a"}`);
console.log(`Viewports: ${viewports.map((v) => v.join("x")).join(", ")}`);
console.log(`Errors: ${errors.length}  Warnings: ${warnings.length}`);
for (const f of errors) console.log(`  ERROR    ${f.where}: ${f.message}`);
for (const f of warnings) console.log(`  warning  ${f.where}: ${f.message}`);
console.log(`Report: ${path.join(outDir, "audit.json")}${shots ? `  Screenshots: ${outDir}/<viewport>/` : ""}`);
process.exit(errors.length ? 1 : 0);

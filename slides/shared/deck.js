(() => {
    const deck = document.querySelector(".deck");
    const slides = [...document.querySelectorAll(".slide")];

    if (!deck || slides.length === 0) {
        return;
    }

    const progress = document.createElement("div");
    const notes = document.querySelector("#notes");
    const notesContent = document.querySelector("#notes-content");
    const notesButton = document.querySelector("#toggle-notes");
    const previousButton = document.querySelector("#previous");
    const nextButton = document.querySelector("#next");
    const deckTitle = document.body.dataset.deckTitle || document.title;
    let current = 0;

    progress.className = "progress";
    progress.setAttribute("aria-hidden", "true");
    deck.append(progress);

    function normalizeIndex(index) {
        return (index + slides.length) % slides.length;
    }

    function indexFromHash() {
        const match = window.location.hash.match(/^#slide-(\d+)$/);
        if (!match) {
            return 0;
        }

        return Math.min(Math.max(Number(match[1]) - 1, 0), slides.length - 1);
    }

    function syncUrl(index, replace = false) {
        const nextHash = `#slide-${index + 1}`;
        if (window.location.hash === nextHash) {
            return;
        }

        const method = replace ? "replaceState" : "pushState";
        window.history[method]({ slide: index + 1 }, "", nextHash);
    }

    function updateSlide(index, options = {}) {
        current = normalizeIndex(index);

        slides.forEach((slide, slideIndex) => {
            const active = slideIndex === current;
            let number = slide.querySelector(".slide-number");

            slide.classList.toggle("active", active);
            slide.setAttribute("aria-hidden", String(!active));
            slide.setAttribute(
                "aria-label",
                `Slide ${slideIndex + 1} of ${slides.length}`
            );

            if (!number) {
                number = document.createElement("div");
                number.className = "slide-number";
                number.setAttribute("aria-hidden", "true");
                slide.append(number);
            }
            number.textContent = `${slideIndex + 1} / ${slides.length}`;
        });

        progress.style.width = `${((current + 1) / slides.length) * 100}%`;
        if (notesContent) {
            const note = slides[current].dataset.notes
                || "No presenter notes for this slide.";
            notesContent.textContent = note.replace(/\\n/g, "\n");
        }
        document.title = `${current + 1}/${slides.length} · ${deckTitle}`;

        if (options.syncUrl !== false) {
            syncUrl(current);
        }
    }

    function toggleNotes() {
        if (!notes || !notesButton) {
            return;
        }

        const open = notes.classList.toggle("open");
        notesButton.setAttribute("aria-pressed", String(open));
        notesButton.setAttribute(
            "aria-label",
            open ? "Hide presenter notes" : "Show presenter notes"
        );
    }

    function isInteractiveTarget(target) {
        return target instanceof Element && Boolean(
            target.closest(
                "a, button, input, select, textarea, [contenteditable='true']"
            )
        );
    }

    previousButton?.addEventListener("click", () => updateSlide(current - 1));
    nextButton?.addEventListener("click", () => updateSlide(current + 1));
    notesButton?.addEventListener("click", toggleNotes);

    document.querySelectorAll(".reveal").forEach((button, index) => {
        const answer = button.nextElementSibling;
        if (!answer) {
            return;
        }

        if (!answer.id) {
            answer.id = `answer-${index + 1}`;
        }
        button.setAttribute("aria-controls", answer.id);

        button.addEventListener("click", () => {
            const isOpen = answer.classList.toggle("show");
            button.setAttribute("aria-expanded", String(isOpen));
            button.textContent = isOpen ? "Hide answer" : "Reveal answer";
        });
    });

    document.addEventListener("keydown", (event) => {
        if (isInteractiveTarget(event.target)) {
            return;
        }

        if (["ArrowRight", "PageDown", " "].includes(event.key)) {
            event.preventDefault();
            updateSlide(current + 1);
        } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
            event.preventDefault();
            updateSlide(current - 1);
        } else if (event.key.toLowerCase() === "n") {
            toggleNotes();
        } else if (event.key === "Home") {
            updateSlide(0);
        } else if (event.key === "End") {
            updateSlide(slides.length - 1);
        }
    });

    window.addEventListener("hashchange", () => {
        updateSlide(indexFromHash(), { syncUrl: false });
    });
    window.addEventListener("popstate", () => {
        updateSlide(indexFromHash(), { syncUrl: false });
    });

    current = indexFromHash();
    updateSlide(current, { syncUrl: false });
    syncUrl(current, true);
})();

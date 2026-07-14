  
    (() => {
      const slides = [...document.querySelectorAll('.slide')];
      const progress = document.createElement('div');
      progress.className = 'progress';
      document.querySelector('.deck').append(progress);
      const notes = document.querySelector('#notes');
      const notesContent = document.querySelector('#notes-content');
      const notesButton = document.querySelector('#toggle-notes');
      let current = 0;

      function updateSlide(index) {
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
          const active = slideIndex === current;
          slide.classList.toggle('active', active);
          slide.setAttribute('aria-hidden', String(!active));
          let number = slide.querySelector('.slide-number');
          if (!number) {
            number = document.createElement('div');
            number.className = 'slide-number';
            slide.append(number);
          }
          number.textContent = `${slideIndex + 1} / ${slides.length}`;
        });
        progress.style.width = `${((current + 1) / slides.length) * 100}%`;
        notesContent.innerHTML = (slides[current].dataset.notes || 'No presenter notes for this slide.').replace(/\\n/g, '<br>');
        document.title = `${current + 1}/${slides.length} · CIS215: Introduction to Data Analysis`;
        window.location.hash = `slide-${current + 1}`;
      }

      function toggleNotes() {
        const open = notes.classList.toggle('open');
        notesButton.setAttribute('aria-pressed', String(open));
        notesButton.setAttribute('aria-label', open ? 'Hide presenter notes' : 'Show presenter notes');
      }

      document.querySelector('#previous').addEventListener('click', () => updateSlide(current - 1));
      document.querySelector('#next').addEventListener('click', () => updateSlide(current + 1));
      notesButton.addEventListener('click', toggleNotes);
      document.querySelectorAll('.reveal').forEach((button) => {
        button.addEventListener('click', () => {
          const answer = button.nextElementSibling;
          const isOpen = answer.classList.toggle('show');
          button.setAttribute('aria-expanded', String(isOpen));
          button.textContent = isOpen ? 'Hide answer' : 'Reveal answer';
        });
      });
      document.addEventListener('keydown', (event) => {
        if (['ArrowRight', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); updateSlide(current + 1); }
        if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); updateSlide(current - 1); }
        if (event.key.toLowerCase() === 'n') toggleNotes();
        if (event.key === 'Home') updateSlide(0);
        if (event.key === 'End') updateSlide(slides.length - 1);
      });
      const hashMatch = window.location.hash.match(/slide-(\d+)/);
      updateSlide(hashMatch ? Math.min(Math.max(Number(hashMatch[1]) - 1, 0), slides.length - 1) : 0);
    })();
  
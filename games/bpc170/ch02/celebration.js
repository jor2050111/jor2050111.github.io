// A live, dismissible reward. It never changes puzzle state or completion.
export function createCelebration({ reducedMotion }) {
  const dialog = document.querySelector('#win-dialog');
  const canvas = document.querySelector('#win-confetti');
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let animations = [];

  function stopMotion() {
    cancelAnimationFrame(frame);
    frame = 0;
    animations.forEach(animation => animation.cancel());
    animations = [];
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    dialog.dataset.animating = 'false';
  }

  function animate(selector, keyframes, options) {
    const element = dialog.querySelector(selector);
    if (element.animate) animations.push(element.animate(keyframes, options));
  }

  function confetti() {
    const context = canvas.getContext('2d');
    if (!context) return;
    const width = innerWidth;
    const height = innerHeight;
    const scale = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    const colors = ['#ffcc5c', '#f39c73', '#88bca1', '#fff3d5', '#efbccc'];
    let seed = 17002;
    const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
    const particles = Array.from({ length: width < 600 ? 90 : 150 }, (_, index) => {
      const side = index % 2;
      return {
        x: side ? width * 0.95 : width * 0.05,
        y: height * 0.82,
        vx: (side ? -1 : 1) * width * (0.1 + random() * 0.33),
        vy: -height * (0.55 + random() * 0.38),
        delay: (index % 3 === 0 ? 0.65 : 0.14) + random() * 0.18,
        size: 5 + random() * 7,
        spin: (random() - 0.5) * 13,
        color: colors[index % colors.length],
        ribbon: index % 5 === 0,
      };
    });
    let start;
    function draw(timestamp) {
      if (!dialog.open || reducedMotion()) { stopMotion(); return; }
      start ??= timestamp;
      const elapsed = (timestamp - start) / 1000;
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        const age = elapsed - particle.delay;
        if (age < 0) continue;
        const x = particle.x + particle.vx * age + Math.sin(age * 4) * 18;
        const y = particle.y + particle.vy * age + height * 0.23 * age * age;
        if (y > height + 30) continue;
        context.save();
        context.globalAlpha = Math.min(1, Math.max(0, 4.6 - elapsed));
        context.translate(x, y);
        context.rotate(age * particle.spin);
        context.scale(1, 0.55 + Math.abs(Math.cos(age * 5)) * 0.45);
        context.fillStyle = particle.color;
        context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * (particle.ribbon ? 3.3 : 0.65));
        context.restore();
      }
      if (elapsed < 4.6) frame = requestAnimationFrame(draw);
      else stopMotion();
    }
    frame = requestAnimationFrame(draw);
  }

  function play() {
    stopMotion();
    if (!dialog.open) dialog.showModal();
    if (reducedMotion()) return;
    dialog.dataset.animating = 'true';
    animate('.win-card', [
      { opacity: 0, transform: 'translateY(28px) scale(.94)' },
      { opacity: 1, transform: 'translateY(0) scale(1)' },
    ], { duration: 420, easing: 'cubic-bezier(.16,1,.3,1)' });
    animate('.win-medal', [
      { transform: 'scale(.3) rotate(-30deg)', opacity: 0 },
      { transform: 'scale(1.12) rotate(7deg)', opacity: 1, offset: 0.65 },
      { transform: 'scale(1) rotate(0deg)', opacity: 1 },
    ], { duration: 720, delay: 100, fill: 'backwards', easing: 'cubic-bezier(.2,.8,.3,1)' });
    animate('#win-title span', [
      { transform: 'translateX(-24px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 },
    ], { duration: 420, delay: 170, fill: 'backwards', easing: 'ease-out' });
    animate('#win-title em', [
      { transform: 'translateX(26px)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 },
    ], { duration: 520, delay: 250, fill: 'backwards', easing: 'cubic-bezier(.22,1,.36,1)' });
    animate('.win-score', [
      { transform: 'scale(.8)', opacity: 0 }, { transform: 'scale(1)', opacity: 1 },
    ], { duration: 300, delay: 430, fill: 'backwards', easing: 'ease-out' });
    confetti();
  }

  document.querySelector('#close-win').addEventListener('click', () => dialog.close());
  document.querySelector('#win-done').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', stopMotion);
  motionPreference.addEventListener('change', () => { if (motionPreference.matches) stopMotion(); });
  return { play };
}

// Subtle twinkling gold specks drifting over the scene — purely decorative,
// echoes the lit "map" dots already baked into the background photo.
(function () {
  const canvas = document.getElementById('stars');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let w, h, dots;

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.round((w * h) / 22000);
    dots = Array.from({ length: count }, () => ({
      x: rand(0, w),
      y: rand(0, h * 0.55), // keep them mostly in the upper "map" region
      r: rand(0.4, 1.4),
      baseAlpha: rand(0.15, 0.65),
      phase: rand(0, Math.PI * 2),
      speed: rand(0.4, 1.1)
    }));
  }

  function tick(t) {
    ctx.clearRect(0, 0, w, h);
    const time = t / 1000;
    for (const d of dots) {
      const twinkle = (Math.sin(time * d.speed + d.phase) + 1) / 2;
      const alpha = d.baseAlpha * (0.35 + 0.65 * twinkle);
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(243, 216, 145, ${alpha.toFixed(3)})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  window.addEventListener('resize', resize);
  resize();

  if (!prefersReducedMotion) {
    requestAnimationFrame(tick);
  }
})();

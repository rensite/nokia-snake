const KEY_DIRECTIONS = {
  ArrowLeft: { x: -1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
  ArrowRight: { x: 1, y: 0 },
  ArrowDown: { x: 0, y: 1 },
  a: { x: -1, y: 0 }, A: { x: -1, y: 0 },
  w: { x: 0, y: -1 }, W: { x: 0, y: -1 },
  d: { x: 1, y: 0 },  D: { x: 1, y: 0 },
  s: { x: 0, y: 1 },  S: { x: 0, y: 1 },
};

const SWIPE_THRESHOLD_PX = 24;

export function attachInput({ target, onDirection, onTogglePause, onResume, onAutoPause, signal }) {
  const opts = signal ? { signal } : undefined;

  document.addEventListener('keydown', (e) => {
    const dir = KEY_DIRECTIONS[e.key];
    if (dir) {
      e.preventDefault();
      onDirection(dir);
      onResume();
      return;
    }
    if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
      onTogglePause();
    } else if (e.key === ' ') {
      e.preventDefault();
      onResume();
    }
  }, opts);

  let touchStart = null;
  target.addEventListener('touchstart', (e) => {
    const t = e.changedTouches[0];
    touchStart = { x: t.clientX, y: t.clientY };
  }, signal ? { signal, passive: true } : { passive: true });

  target.addEventListener('touchend', (e) => {
    if (!touchStart) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.x;
    const dy = t.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX && Math.abs(dy) < SWIPE_THRESHOLD_PX) {
      onTogglePause();
      return;
    }
    const dir = Math.abs(dx) > Math.abs(dy)
      ? { x: Math.sign(dx), y: 0 }
      : { x: 0, y: Math.sign(dy) };
    onDirection(dir);
    onResume();
  }, opts);

  target.addEventListener('click', () => onTogglePause(), opts);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) onAutoPause();
  }, opts);
  window.addEventListener('blur', () => onAutoPause(), opts);
}

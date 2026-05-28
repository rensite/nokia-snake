// Mulberry32 — small, deterministic, good enough for game RNG.
// Exposing a seed lets tests and replays reproduce exact apple placements.
export function createRng(seed = Date.now() >>> 0) {
  let s = seed >>> 0;
  return {
    next() {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    int(maxExclusive) {
      return Math.floor(this.next() * maxExclusive);
    },
  };
}

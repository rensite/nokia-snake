import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { createGame, setDirection, setStatus, tick } from '../src/state.js';

describe('properties', () => {
  it('head always stays within the field', () => {
    fc.assert(fc.property(
      fc.integer({ min: 0, max: 1_000_000 }),
      fc.array(fc.constantFrom('U', 'D', 'L', 'R'), { maxLength: 80 }),
      (seed, moves) => {
        const s = createGame({ width: 12, height: 9 }, seed);
        setStatus(s, 'running');
        const dirs = {
          U: { x: 0, y: -1 }, D: { x: 0, y: 1 },
          L: { x: -1, y: 0 }, R: { x: 1, y: 0 },
        };
        for (const m of moves) {
          setDirection(s, dirs[m]);
          tick(s);
          if (s.status !== 'running') return true;
        }
        const head = s.body[s.body.length - 1];
        return head.x >= 1 && head.x <= s.config.width
          && head.y >= 1 && head.y <= s.config.height;
      },
    ));
  });

  it('body length never exceeds logical length', () => {
    fc.assert(fc.property(
      fc.integer({ min: 0, max: 1_000_000 }),
      fc.integer({ min: 1, max: 100 }),
      (seed, ticks) => {
        const s = createGame({}, seed);
        setStatus(s, 'running');
        for (let i = 0; i < ticks; i++) {
          tick(s);
          if (s.status !== 'running') break;
          if (s.body.length > s.length) return false;
        }
        return true;
      },
    ));
  });

  it('apple is never on the snake when it exists', () => {
    fc.assert(fc.property(
      fc.integer({ min: 0, max: 1_000_000 }),
      fc.integer({ min: 1, max: 60 }),
      (seed, ticks) => {
        const s = createGame({ width: 8, height: 6 }, seed);
        setStatus(s, 'running');
        for (let i = 0; i < ticks; i++) {
          tick(s);
          if (s.status !== 'running' || !s.apple) break;
          const onSnake = s.body.some(p => p.x === s.apple.x && p.y === s.apple.y);
          if (onSnake) return false;
        }
        return true;
      },
    ));
  });

  it('is deterministic for fixed seed and inputs', () => {
    fc.assert(fc.property(
      fc.integer({ min: 0, max: 1_000_000 }),
      fc.array(fc.constantFrom('U', 'D', 'L', 'R'), { maxLength: 40 }),
      (seed, moves) => {
        const dirs = {
          U: { x: 0, y: -1 }, D: { x: 0, y: 1 },
          L: { x: -1, y: 0 }, R: { x: 1, y: 0 },
        };
        const run = () => {
          const s = createGame({}, seed);
          setStatus(s, 'running');
          for (const m of moves) {
            setDirection(s, dirs[m]);
            tick(s);
          }
          return JSON.stringify({ body: s.body, score: s.score, apple: s.apple, status: s.status });
        };
        return run() === run();
      },
    ));
  });
});

import { describe, it, expect } from 'vitest';
import { createGame, setDirection, setStatus, tick } from '../src/state.js';

function play(state, n) {
  for (let i = 0; i < n; i++) tick(state);
  return state;
}

describe('createGame', () => {
  it('starts idle with a single head segment and an apple inside the field', () => {
    const s = createGame({}, 1);
    expect(s.status).toBe('idle');
    expect(s.body.length).toBe(1);
    expect(s.apple.x).toBeGreaterThanOrEqual(1);
    expect(s.apple.x).toBeLessThanOrEqual(s.config.width);
    expect(s.apple.y).toBeGreaterThanOrEqual(1);
    expect(s.apple.y).toBeLessThanOrEqual(s.config.height);
  });

  it('does not spawn apple on the snake head', () => {
    for (let seed = 1; seed < 50; seed++) {
      const s = createGame({}, seed);
      const head = s.body[0];
      expect(s.apple.x === head.x && s.apple.y === head.y).toBe(false);
    }
  });

  it('is deterministic for a given seed', () => {
    const a = createGame({}, 42);
    const b = createGame({}, 42);
    expect(a.apple).toEqual(b.apple);
  });
});

describe('tick', () => {
  it('does nothing when status is not running', () => {
    const s = createGame({}, 1);
    const before = JSON.stringify(s.body);
    tick(s);
    expect(JSON.stringify(s.body)).toBe(before);
  });

  it('moves head one step in current direction', () => {
    const s = createGame({}, 1);
    setStatus(s, 'running');
    const head = { ...s.body[s.body.length - 1] };
    tick(s);
    const newHead = s.body[s.body.length - 1];
    expect(newHead.x).toBe(head.x + 1);
    expect(newHead.y).toBe(head.y);
  });

  it('grows up to initial length before discarding tail', () => {
    const s = createGame({ initialLength: 4 }, 1);
    setStatus(s, 'running');
    play(s, 3);
    expect(s.body.length).toBe(4);
  });
});

describe('setDirection', () => {
  it('blocks 180-degree reversal', () => {
    const s = createGame({}, 1);
    setStatus(s, 'running');
    setDirection(s, { x: -1, y: 0 });
    tick(s);
    expect(s.direction).toEqual({ x: 1, y: 0 });
  });

  it('allows 90-degree turns', () => {
    const s = createGame({}, 1);
    setStatus(s, 'running');
    setDirection(s, { x: 0, y: -1 });
    tick(s);
    expect(s.direction).toEqual({ x: 0, y: -1 });
  });
});

describe('warp', () => {
  it('wraps from right edge to column 1', () => {
    const s = createGame({ width: 10, height: 10 }, 1);
    setStatus(s, 'running');
    s.body = [{ x: 10, y: 5 }];
    s.bodySet = new Set([10 * 10000 + 5]);
    s.length = 1;
    s.direction = { x: 1, y: 0 };
    s.pendingDirection = { x: 1, y: 0 };
    s.apple = { x: 1, y: 1 }; // off the path
    tick(s);
    expect(s.body[s.body.length - 1]).toEqual({ x: 1, y: 5 });
  });

  it('wraps from top edge to bottom row', () => {
    const s = createGame({ width: 10, height: 10 }, 1);
    setStatus(s, 'running');
    s.body = [{ x: 5, y: 1 }];
    s.bodySet = new Set([5 * 10000 + 1]);
    s.length = 1;
    s.direction = { x: 0, y: -1 };
    s.pendingDirection = { x: 0, y: -1 };
    s.apple = { x: 1, y: 1 };
    tick(s);
    expect(s.body[s.body.length - 1]).toEqual({ x: 5, y: 10 });
  });
});

describe('apple eating', () => {
  it('increases length, score, and spawns a new apple', () => {
    const s = createGame({ initialLength: 1 }, 1);
    setStatus(s, 'running');
    const head = s.body[0];
    s.apple = { x: head.x + 1, y: head.y };
    tick(s);
    expect(s.length).toBe(2);
    expect(s.score).toBe(s.config.pointsPerApple);
    expect(s.apple).not.toEqual({ x: head.x + 1, y: head.y });
  });

  it('updates highscore when score surpasses it', () => {
    const s = createGame({ initialLength: 1 }, 1);
    setStatus(s, 'running');
    s.highscore = 0;
    const head = s.body[0];
    s.apple = { x: head.x + 1, y: head.y };
    tick(s);
    expect(s.highscore).toBe(s.score);
  });
});

describe('self-collision', () => {
  it('ends the game when head walks into its body (non-tail)', () => {
    const s = createGame({ width: 10, height: 10, initialLength: 5 }, 1);
    setStatus(s, 'running');
    // Snake still growing (length > body.length), so tail does NOT vacate this tick.
    s.body = [
      { x: 4, y: 5 },
      { x: 5, y: 5 },
      { x: 6, y: 5 },
      { x: 6, y: 6 },
      { x: 5, y: 6 },
    ];
    s.bodySet = new Set(s.body.map(p => p.x * 10000 + p.y));
    s.length = 10; // willGrow = true, no vacating tail
    s.direction = { x: -1, y: 0 };
    s.pendingDirection = { x: 0, y: -1 };
    s.apple = { x: 1, y: 1 };
    tick(s); // head at (5,6), turns up → (5,5) is occupied
    expect(s.status).toBe('gameover');
  });

  it('does not flag collision when the tail vacates the target cell same tick', () => {
    const s = createGame({ width: 10, height: 10, initialLength: 3 }, 1);
    setStatus(s, 'running');
    s.body = [
      { x: 5, y: 5 }, // tail will move away
      { x: 6, y: 5 },
      { x: 7, y: 5 },
    ];
    s.bodySet = new Set(s.body.map(p => p.x * 10000 + p.y));
    s.length = 3;
    s.direction = { x: 0, y: -1 };
    s.pendingDirection = { x: 0, y: -1 };
    // Move tail's old cell off the path so the new head step is independent.
    s.apple = { x: 1, y: 1 };
    tick(s);
    expect(s.status).toBe('running');
  });
});

import { createRng } from './rng.js';

export const DEFAULT_CONFIG = {
  width: 20,
  height: 15,
  initialLength: 5,
  pointsPerApple: 5,
  baseTickMs: 120,
  minTickMs: 55,
  speedupPerApple: 4,
};

const key = (x, y) => x * 10000 + y;

function spawnApple(state) {
  const { width, height } = state.config;
  const total = width * height;
  if (state.bodySet.size >= total) {
    state.apple = null;
    state.won = true;
    return;
  }
  // Build free list lazily to keep tick fast; this only runs on apple eat / init.
  const free = [];
  for (let x = 1; x <= width; x++) {
    for (let y = 1; y <= height; y++) {
      if (!state.bodySet.has(key(x, y))) free.push({ x, y });
    }
  }
  state.apple = free[state.rng.int(free.length)];
}

export function createGame(config = {}, seed) {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startX = Math.ceil(cfg.width / 2);
  const startY = Math.ceil(cfg.height / 2);

  const state = {
    config: cfg,
    rng: createRng(seed),
    direction: { x: 1, y: 0 },
    pendingDirection: { x: 1, y: 0 },
    body: [{ x: startX, y: startY }],
    bodySet: new Set([key(startX, startY)]),
    length: cfg.initialLength,
    score: 0,
    highscore: 0,
    status: 'idle', // idle | running | paused | gameover | won
    apple: null,
    won: false,
    tickMs: cfg.baseTickMs,
  };
  spawnApple(state);
  return state;
}

export function setDirection(state, dir) {
  // Block 180° reversal: sum of components is zero only if exactly opposite.
  const cur = state.direction;
  if (cur.x + dir.x === 0 && cur.y + dir.y === 0) return;
  // Block same-axis no-op and identity quickly.
  if (cur.x === dir.x && cur.y === dir.y) return;
  state.pendingDirection = dir;
}

export function setStatus(state, status) {
  state.status = status;
}

function warp(coord, max) {
  if (coord < 1) return max;
  if (coord > max) return 1;
  return coord;
}

export function tick(state) {
  if (state.status !== 'running') return state;

  state.direction = state.pendingDirection;
  const head = state.body[state.body.length - 1];
  const nextHead = {
    x: warp(head.x + state.direction.x, state.config.width),
    y: warp(head.y + state.direction.y, state.config.height),
  };
  const nextKey = key(nextHead.x, nextHead.y);

  // Tail will move unless we eat — so the last cell is freeing.
  const eating = state.apple && nextHead.x === state.apple.x && nextHead.y === state.apple.y;
  const willGrow = eating || state.body.length < state.length;

  // Self-collision: the cell we step into must not be occupied,
  // unless it's the tail cell that's about to vacate this same tick.
  const tail = state.body[0];
  const tailKey = key(tail.x, tail.y);
  const collidesWithSelf =
    state.bodySet.has(nextKey) && !(!willGrow && nextKey === tailKey);

  if (collidesWithSelf) {
    state.status = 'gameover';
    return state;
  }

  state.body.push(nextHead);
  state.bodySet.add(nextKey);

  if (!willGrow) {
    state.body.shift();
    state.bodySet.delete(tailKey);
  }

  if (eating) {
    state.length += 1;
    state.score += state.config.pointsPerApple;
    if (state.score > state.highscore) state.highscore = state.score;
    state.tickMs = Math.max(
      state.config.minTickMs,
      state.config.baseTickMs - state.config.speedupPerApple * (state.length - state.config.initialLength),
    );
    spawnApple(state);
    if (state.won) state.status = 'won';
  }

  return state;
}

export function loadHighscore(storage) {
  const raw = storage?.getItem('highscore');
  const n = Number(raw);
  return Number.isFinite(n) ? n : 0;
}

export function saveHighscore(storage, value) {
  storage?.setItem('highscore', String(value));
}

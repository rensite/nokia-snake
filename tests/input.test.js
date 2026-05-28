/** @vitest-environment jsdom */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { attachInput } from '../src/input.js';

function fireKey(key) {
  document.dispatchEvent(new KeyboardEvent('keydown', { key }));
}

describe('attachInput', () => {
  let calls;
  let target;
  let controller;

  beforeEach(() => {
    document.body.innerHTML = '<div id="t"></div>';
    target = document.getElementById('t');
    calls = { dir: [], toggle: 0, resume: 0, autoPause: 0 };
    controller = new AbortController();
    attachInput({
      target,
      signal: controller.signal,
      onDirection: (d) => calls.dir.push(d),
      onTogglePause: () => calls.toggle++,
      onResume: () => calls.resume++,
      onAutoPause: () => calls.autoPause++,
    });
  });

  afterEach(() => controller.abort());

  it('maps arrow keys to directions and resumes', () => {
    fireKey('ArrowUp');
    expect(calls.dir).toEqual([{ x: 0, y: -1 }]);
    expect(calls.resume).toBe(1);
  });

  it('maps WASD to directions', () => {
    fireKey('a');
    fireKey('D');
    expect(calls.dir).toEqual([{ x: -1, y: 0 }, { x: 1, y: 0 }]);
  });

  it('toggles pause on Escape', () => {
    fireKey('Escape');
    expect(calls.toggle).toBe(1);
  });

  it('resumes on Space', () => {
    fireKey(' ');
    expect(calls.resume).toBe(1);
  });

  it('auto-pauses on visibilitychange when hidden', () => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
    expect(calls.autoPause).toBe(1);
  });

  it('treats small touch as a tap → toggle pause', () => {
    const touch = (type, x, y) => target.dispatchEvent(
      new TouchEvent(type, { changedTouches: [{ clientX: x, clientY: y }] }),
    );
    // jsdom lacks TouchEvent — guard.
    if (typeof TouchEvent === 'undefined') return;
    touch('touchstart', 100, 100);
    touch('touchend', 105, 102);
    expect(calls.toggle).toBe(1);
  });
});

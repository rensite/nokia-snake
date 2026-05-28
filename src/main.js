import '../assets/normalize.css';
import '../assets/style.css';
import { createGame, setDirection, setStatus, tick, loadHighscore, saveHighscore } from './state.js';
import { createRenderer } from './render.js';
import { attachInput } from './input.js';

const field = document.querySelector('[data-snake]');
const scoreNode = document.querySelector('.jsScore');
const highscoreNode = document.querySelector('.jsHighscore');

let state = createGame();
state.highscore = loadHighscore(window.localStorage);

const renderer = createRenderer(field);

function resume() {
  if (state.status === 'gameover' || state.status === 'won') {
    state = createGame();
    state.highscore = loadHighscore(window.localStorage);
  }
  setStatus(state, 'running');
}

function pause() {
  if (state.status === 'running') setStatus(state, 'paused');
}

function togglePause() {
  if (state.status === 'running') pause();
  else resume();
}

attachInput({
  target: field,
  onDirection: (d) => setDirection(state, d),
  onTogglePause: togglePause,
  onResume: resume,
  onAutoPause: pause,
});

let last = performance.now();
let accumulator = 0;

function frame(now) {
  const dt = now - last;
  last = now;
  if (state.status === 'running') {
    accumulator += dt;
    while (accumulator >= state.tickMs) {
      accumulator -= state.tickMs;
      const prevHi = state.highscore;
      tick(state);
      if (state.highscore !== prevHi) saveHighscore(window.localStorage, state.highscore);
      if (state.status !== 'running') {
        accumulator = 0;
        break;
      }
    }
  } else {
    accumulator = 0;
  }
  renderer.render(state, scoreNode, highscoreNode);
  requestAnimationFrame(frame);
}

renderer.render(state, scoreNode, highscoreNode);
requestAnimationFrame(frame);

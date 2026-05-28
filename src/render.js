const CELL_PX = 20;

export function createRenderer(root) {
  const pool = [];
  let appleNode = null;
  let lastDims = { width: 0, height: 0 };

  function ensureFieldSize({ width, height }) {
    if (lastDims.width === width && lastDims.height === height) return;
    lastDims = { width, height };
    root.style.width = `${width * CELL_PX}px`;
    root.style.height = `${height * CELL_PX}px`;
    root.style.display = 'grid';
    root.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    root.style.gridTemplateRows = `repeat(${height}, 1fr)`;
  }

  function placeAt(node, x, y) {
    node.style.gridColumnStart = String(x);
    node.style.gridRowStart = String(y);
  }

  function syncPool(needed) {
    while (pool.length < needed) {
      const div = document.createElement('div');
      div.className = 'pixel';
      div.style.width = `${CELL_PX}px`;
      div.style.height = `${CELL_PX}px`;
      root.appendChild(div);
      pool.push(div);
    }
    while (pool.length > needed) {
      const node = pool.pop();
      node.remove();
    }
  }

  function ensureApple() {
    if (appleNode) return appleNode;
    appleNode = document.createElement('div');
    appleNode.className = 'apple pixel';
    appleNode.style.width = `${CELL_PX}px`;
    appleNode.style.height = `${CELL_PX}px`;
    root.appendChild(appleNode);
    return appleNode;
  }

  return {
    render(state, scoreNode, highscoreNode) {
      ensureFieldSize(state.config);
      syncPool(state.body.length);
      for (let i = 0; i < state.body.length; i++) {
        placeAt(pool[i], state.body[i].x, state.body[i].y);
      }
      if (state.apple) {
        placeAt(ensureApple(), state.apple.x, state.apple.y);
        appleNode.style.display = '';
      } else if (appleNode) {
        appleNode.style.display = 'none';
      }
      if (scoreNode) scoreNode.textContent = String(state.score);
      if (highscoreNode) highscoreNode.textContent = String(state.highscore);
      root.classList.toggle('pause', state.status !== 'running');
      root.classList.toggle('gameover', state.status === 'gameover');
    },
  };
}

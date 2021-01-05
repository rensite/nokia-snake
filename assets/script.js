(function() {
    const TAIL = 5;

    const GAME = {
        selector: document.querySelector('[data-snake]'),
        density: 20,
        dimensions: { x: 20, y: 15 },
        direction: { x: 1, y: 0 },
        isPaused: true,
        timer: null,
    }

    const SNAKE = {
        head: { x: 0, y: 0 },
        body: [],
        tail: TAIL,
    }

    const SCORE = {
        current: {
            selector: document.querySelector('.jsScore'),
            value: 0,
        },
        highscore: {
            selector: document.querySelector('.jsHighscore'),
            value: 0,
        },
        point: 5,
    }

    const APPLE = { x: 0, y: 0 };

    /*
        37 - left
        38 - up
        39 - right
        40 - down
    */
    const DIRECTIONS = {
        37: { x: -1, y: 0 },
        38: { x: 0, y: -1 },
        39: { x: 1, y: 0 },
        40: { x: 0, y: 1 },
    };

    let init = () => {
        const width = GAME.dimensions.x * GAME.density;
        const height = GAME.dimensions.y * GAME.density;

        GAME.selector.style.width = `${width}px`;
        GAME.selector.style.height = `${height}px`;
        GAME.selector.style.display = `grid`;
        GAME.selector.style.gridTemplateColumns = `repeat(${GAME.dimensions.x}, 1fr)`;
        GAME.selector.style.gridTemplateRows = `repeat(${GAME.dimensions.y}, 1fr)`;
        GAME.selector.innerHTML = '';

        SNAKE.head.x = Math.ceil(GAME.dimensions.x / 2) - Math.ceil(SNAKE.tail / 2);
        SNAKE.head.y = Math.ceil(GAME.dimensions.y / 2);

        SCORE.highscore.value = localStorage.getItem('highscore') || 0;

        updateScore(true);
        putApple();
        document.addEventListener('keydown', controller);
        engine();
    }

    // Game engine
    let engine = () => {
        SNAKE.head.x += GAME.direction.x;
        SNAKE.head.y += GAME.direction.y;

        checkInjure();
        warpPosition();
        eatApple();

        SNAKE.body.push({ ...SNAKE.head });

        while (SNAKE.body.length > SNAKE.tail) {
            SNAKE.body.shift();
        }

        refreshScene();
    }

    // Keys Controller
    let controller = (e) => {
        if (e.keyCode in DIRECTIONS) {
            if (GAME.direction.x + DIRECTIONS[e.keyCode].x !== 0 && GAME.direction.y + DIRECTIONS[e.keyCode].y !== 0) {
                GAME.direction = DIRECTIONS[e.keyCode];
            }

            runGame();
        } else if ( e.keyCode === 27) {
            // ESC - pauses
            stopGame();
        }  else if ( e.keyCode === 32) {
            // SPACE - continues
            runGame();
        }
    }

    // Start the game
    let runGame = () => {
        if (GAME.isPaused) {
            GAME.selector.classList.remove('pause');
            GAME.timer = setInterval(engine, 1000 / 10);
            GAME.isPaused = false;
        }
    }

    // Stop the game
    let stopGame = () => {
        GAME.isPaused = true;
        GAME.selector.classList.add('pause');
        clearInterval(GAME.timer);
        GAME.timer = null;
    }

    // Put the apple
    let putApple = () => {
        if (!document.querySelector('.apple')) {
            const appleNode = document.createElement('div');
            appleNode.classList.add('apple');
            GAME.selector.appendChild(appleNode.cloneNode(true));
        }

        const apple = document.querySelector('.apple');

        APPLE.x = Math.floor(Math.random() * (GAME.dimensions.x - 1)) + 1;
        APPLE.y = Math.floor(Math.random() * (GAME.dimensions.y - 1)) + 1;

        apple.setAttribute('style', `
            grid-row-start: ${APPLE.y};
            grid-column-start: ${APPLE.x};
        `);
    }

    // Scores
    let updateScore = ( reset = false ) => {
        SCORE.current.value = ( reset ? 0 : SCORE.current.value + SCORE.point);

        if (SCORE.current.value > SCORE.highscore.value) {
            SCORE.highscore.value = SCORE.current.value;
        }

        SCORE.current.selector.textContent = SCORE.current.value;
        SCORE.highscore.selector.textContent = SCORE.highscore.value;
        localStorage.setItem('highscore', SCORE.highscore.value);
    }

    // Teleport snake on edge
    let warpPosition = () => {
        if (SNAKE.head.x > GAME.dimensions.x) {
            SNAKE.head.x = 1;
        } else if (SNAKE.head.x < 0) {
            SNAKE.head.x = GAME.dimensions.x;
        } else if (SNAKE.head.y > GAME.dimensions.y) {
            SNAKE.head.y = 1;
        } else if (SNAKE.head.y < 0) {
            SNAKE.head.y = GAME.dimensions.y;
        }
    }

    // Render frame
    let refreshScene = () => {
        document.querySelectorAll('.pixel')
            .forEach((node) => {
                node.remove();
            });

        const pixel = document.createElement("div");
        pixel.classList.add('pixel')
        pixel.setAttribute('style', `
            width: ${GAME.density}px;
            height: ${GAME.density}px;
        `);

        for (let i = 0; i < SNAKE.body.length; i++) {
            pixel.setAttribute('style', `
                grid-row-start: ${SNAKE.body[i].y};
                grid-column-start: ${SNAKE.body[i].x};
            `);
            GAME.selector.appendChild(pixel.cloneNode(true));
        }
    }

    // Check if the apple is eaten
    let eatApple = () => {
        if (SNAKE.head.x === APPLE.x && SNAKE.head.y === APPLE.y) {
            SNAKE.tail++;
            updateScore();
            putApple();
        }
    }

    // Check if self injured
    let checkInjure = () => {
        for (let i = 0; i < SNAKE.body.length; i++ ) {
            if (SNAKE.body[i].x === SNAKE.head.x && SNAKE.body[i].y === SNAKE.head.y) {
                SNAKE.tail = TAIL;
                updateScore(true);
            }
        }
    }

    init();
})();
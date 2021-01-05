(function() {
    let gc = 20,
        ts = 20,
        px = py = 10,
        vx = vy = 0,
        ax = ay = 0,
        trail = [],
        tail = 5,
        score = {
            current: 0,
            highscore: window.localStorage.getItem('highscore') || 0
        },
        rate = 5,
        pause = false,
        timer;

    document.querySelector('.jsHighscore').innerText = score.highscore;

    let debug = document.querySelector('.jsDebug');
    function debugMsg(msg) {
        debug.innerText = msg;
    }

    function createField(gc = 20, ts = 20, selector = ".jsField") {
      let fieldSide = gc * ts;
      let field = document.querySelector(selector);
      field.style.width = fieldSide + "px";
      field.style.height = fieldSide + "px";
      field.innerHTML = '';
      
      let div = document.createElement("div");
      div.classList.add('pixel');
      div.setAttribute("style", "width: " + ts + "px; height: " + ts + "px;");
      
      for (let i = 0; i<(gc*gc); i++) {
        field.appendChild(div.cloneNode(true));
      }
    }

    function keyPush(e) {
        switch(e.keyCode) {
            case 37:
                if (vx !== 1) { vx = -1; vy = 0; }
                break;
            case 38:
                if (vy !== 1) { vx = 0; vy = -1; }
                break;
            case 39:
                if (vx !== -1) { vx = 1; vy = 0; }
                break;
            case 40:
                if (vy !== -1) { vx = 0; vy = 1; }
                break;
            case 27:
                runStop();
                break;
        }
    }

    function clearField(cls) {
        document.querySelectorAll('.' + cls).forEach(function(element) {
            element.classList.remove(cls);
        });
    }

    function eatApple() {
        score.current += rate;
        if (score.highscore < score.current) {
            score.highscore = score.current;
        }

        putApple();
        tail++;
    }

    function putApple() {
        let cls = 'apple';
        ax = Math.floor(Math.random() * gc);
        ay = Math.floor(Math.random() * gc);

        if (ax === 10 && ay === 10) {
            ax = Math.floor(Math.random() * (gc / 2)) - 1;
            ay = Math.floor(Math.random() * (gc / 2)) - 1;
        }

        clearField(cls);
        pos = (ay * gc) + ax;
        document.querySelectorAll('.pixel')[pos].classList.add(cls);
    }

    function draw() {
        let cls = 'trail';
        clearField(cls);
        let pixels = document.querySelectorAll('.pixel');
        let pos = 0;

        for (let i=0; i<trail.length; i++) {
            pos = (trail[i].y * gc) + trail[i].x;
            pixels[pos].classList.add(cls);
        }
    }

    function runStop() {
        let app = document.querySelector('.jsApp');

        if (timer) {
            pause = true;
            clearInterval(timer);
            timer = false;
            app.classList.add('pause');
        } else {
            pause = false;
            timer = setInterval(game, 1000 / 10);
            app.classList.remove('pause');
        }
    }

    function checkInjure(vx, vy) {
        if ((vx + vy) === 0) {
            return false;
        }

        for (let i=0; i<trail.length; i++ ) {
            if (trail[i].x === (px + vx) && trail[i].y === (py + vy)) {
                tail = 5;
                score.current = 0;
                document.querySelector('.jsCurrent').innerText = score.current;
                window.localStorage.setItem('highscore', score.highscore);
                break;
            }
        }

        return false;
    }

    function game() {
        checkInjure(vx, vy);

        px += vx;
        py += vy;

        // warp
        if (px > (gc - 1)) { px = 0; }
        if (px < 0) { px = (gc - 1); }
        if (py > (gc - 1)) { py = 0; }
        if (py < 0) { py = (gc - 1); }



        // if apple eaten
        if (px === ax && py === ay) {
            eatApple();
            document.querySelector('.jsCurrent').innerText = score.current;
            document.querySelector('.jsHighscore').innerText = score.highscore;
        }

        trail.push({x: px, y: py});

        while (trail.length > tail) {
            trail.shift();
        }

        if (!document.querySelector('.apple')) {
            putApple();
        }

        draw();
        // debugMsg(vx + ' ' + vy);
    }

    createField(gc, ts);
    document.addEventListener('keydown', keyPush);
    runStop();
  })();